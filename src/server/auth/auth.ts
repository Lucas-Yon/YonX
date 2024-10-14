import { GitHub, Google } from "arctic";
import { db } from "@/server/db";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import {
  sessions,
  users,
  type Session,
  type User,
} from "@/server/db/schema/auth";
import { eq } from "drizzle-orm";
import { sha256 } from "@oslojs/crypto/sha2";
import type { AppContext } from "@/binding";
import { getCookie, setCookie, deleteCookie } from "hono/cookie";

const SESSION_REFRESH_INTERVAL_MS = 1000 * 60 * 60 * 24 * 15;
const SESSION_MAX_DURATION_MS = SESSION_REFRESH_INTERVAL_MS * 2;

// export const github = new GitHub(
//   env.GITHUB_CLIENT_ID,
//   env.GITHUB_CLIENT_SECRET
// );

// export const googleAuth = new Google(
//   env.GOOGLE_CLIENT_ID,
//   env.GOOGLE_CLIENT_SECRET,
//   `${env.HOST_NAME}/api/login/google/callback`
// );

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

export async function createSession(
  token: string,
  user_id: User["id"]
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Session = {
    id: sessionId,
    user_id,
    expires_at: new Date(Date.now() + SESSION_MAX_DURATION_MS).toISOString(),
  };
  await db.insert(sessions).values(session);
  return session;
}

export async function validateRequest(
  c: AppContext
): Promise<SessionValidationResult> {
  // setup getting the session token
  const sessionToken = getSessionToken(c);
  if (!sessionToken) {
    return { session: null, user: null };
  }
  return validateSessionToken(sessionToken);
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const sessionInDb = await db.query.sessions.findFirst({
    where: eq(sessions.id, sessionId),
  });

  if (!sessionInDb) {
    return { session: null, user: null };
  }

  const expiresAt = new Date(sessionInDb.expires_at);
  if (Date.now() >= expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, sessionInDb.id));
    return { session: null, user: null };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.id, sessionInDb.user_id),
  });

  if (!user) {
    await db.delete(sessions).where(eq(sessions.id, sessionInDb.id));
    return { session: null, user: null };
  }

  if (Date.now() >= expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    const newExpiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await db
      .update(sessions)
      .set({
        expires_at: newExpiresAt.toISOString(),
      })
      .where(eq(sessions.id, sessionInDb.id));
    sessionInDb.expires_at = newExpiresAt.toISOString();
  }

  return { session: sessionInDb, user };
}

export async function invalidateSession(
  session_id: Session["id"]
): Promise<void> {
  await db.delete(sessions).where(eq(sessions.id, session_id));
}

export async function invalidateUserSessions(
  user_id: User["id"]
): Promise<void> {
  await db.delete(sessions).where(eq(users.id, user_id));
}

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

const SESSION_COOKIE_NAME = "session";

export function setSessionTokenCookie(
  token: string,
  expiresAt: string | Date,
  c: AppContext
): void {
  setCookie(c, SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: typeof expiresAt === "string" ? new Date(expiresAt) : expiresAt,
    path: "/",
  });
}

export function deleteSessionTokenCookie(c: AppContext): void {
  deleteCookie(c, SESSION_COOKIE_NAME);
}

export function getSessionToken(c: AppContext): string | undefined {
  return getCookie(c, SESSION_COOKIE_NAME);
}

// export const getCurrentUser = cache(async () => {
//   const { user } = await validateRequest();
//   return user ?? undefined;
// });

// export const assertAuthenticated = async () => {
//   const user = await getCurrentUser();
//   if (!user) {
//     throw new AuthenticationError();
//   }
//   return user;
// };

export async function setSession(user_id: Session["user_id"], c: AppContext) {
  const token = generateSessionToken();
  const session = await createSession(token, user_id);
  setSessionTokenCookie(token, session.expires_at, c);
}
