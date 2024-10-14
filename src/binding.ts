import { Hono } from "hono";
import { env } from "./env";
import { db } from "./server/db";
import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import { basicAuth } from "hono/basic-auth";

export type Env = {
  Variables: {
    db: typeof db;
  };
  Bindings: typeof env;
};

function binding(options?: { basicAuth?: boolean }) {
  const app = new Hono<Env>();
  app.use(
    createMiddleware<Env>(async (c, next) => {
      c.env = env;
      c.set("db", db);
      // return c.json({ ok: true });

      await next();
    })
  );
  if (options?.basicAuth === false) {
    app.use(
      "/*",
      basicAuth({
        username: "flavien",
        password: "ok",
      })
    );
  }

  return app;
}

export type AppContext = Context<Env>;

export default binding;
