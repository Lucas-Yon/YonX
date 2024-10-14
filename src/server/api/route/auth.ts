import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HonoApp, type AppContext } from "@/HonoApp";
import type { Context } from "hono";
import { credentials, users } from "@/server/db/schema/auth";
import { eq } from "drizzle-orm";
import {
  createSession,
  deleteSessionTokenCookie,
  generateSessionToken,
  setSessionTokenCookie,
  invalidateSession,
} from "@/server/auth/auth";
const Hono = new HonoApp();
Hono.addAuthMiddleware("/logout");
const app = Hono.app;

// TODO - Add error handling for auth

function redirectPath(c: AppContext | Context, email: string) {
  return c.redirect(`/${c.req.path.split("/")[3]}?error=0&email=${email}`);
}

const validator = zValidator(
  "query",
  z.object({ email: z.string().email(), password: z.string() }),
  (result, c) => {
    // if something is wrong with the input return error
    if (!result.success) {
      return redirectPath(c, result.data.email);
    }
  }
);

app
  .get("/login", validator, async (c) => {
    const data = c.req.valid("query");
    const [existingUser] = await c.var.db
      .select()
      .from(credentials)
      .where(() => eq(credentials.email, data.email.toLowerCase()));
    if (!existingUser) {
      return redirectPath(c, data.email);
    }
    const validPassword = await Bun.password.verify(
      data.password,
      existingUser.hashed_password
    );
    if (!validPassword) {
      return redirectPath(c, data.email);
    }
    const token = generateSessionToken();
    const session = await createSession(token, existingUser.user_id);
    setSessionTokenCookie(token, session.expires_at, c);
    return c.redirect("/welcome");
  })
  .get("/register", validator, async (c) => {
    const data = c.req.valid("query");
    const user_id = crypto.randomUUID();
    const hashed_password = await Bun.password.hash(data.password);
    try {
      await c.var.db.transaction(async (tx) => {
        await tx.insert(users).values({
          id: user_id,
          email: data.email,
        });
        await tx.insert(credentials).values({
          hashed_password,
          user_id: user_id,
          email: data.email,
        });
      });
    } catch (error) {
      return redirectPath(c, data.email);
    }
    const token = generateSessionToken();
    const session = await createSession(token, user_id);
    setSessionTokenCookie(token, session.expires_at, c);
    return c.redirect("/welcome");
  })
  .get("/logout", async (c) => {
    const session_id = (await c.var.getSession(c)).session?.id;
    if (session_id) {
      await invalidateSession(session_id);
      await deleteSessionTokenCookie(c);
    }
    return c.redirect("/login");
  });

export default app;
