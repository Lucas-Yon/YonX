import { Hono } from "hono";
import { env } from "./env";
import { db } from "./server/db";
import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import { logger } from "hono/logger";
import { validateRequest, SessionValidationResult } from "./server/auth/auth";
import { sleep } from "bun";

export type Env = {
  Variables: {
    db: typeof db;
    session?: SessionValidationResult;
    getSession: typeof validateRequest;
  };
  Bindings: typeof env;
};

export type BindingOptions = {
  path?: string;
  auth?: boolean;
};

export type AppContext = Context<Env>;

export class HonoApp {
  public app: Hono<Env>;

  constructor(options?: BindingOptions) {
    this.app = new Hono<Env>();

    if (!options?.path) {
      return;
    }
    if (options?.auth) {
      this.addAuthMiddleware(options.path);
    }
  }

  public addGlobalMiddleware() {
    // Logger middleware
    this.app.use(logger());

    // Database and environment setup middleware (db,redis,env,etc...)
    this.app.use(
      createMiddleware<Env>(async (c, next) => {
        //await sleep(1000); // Simulate some async setup
        c.env = env;
        c.set("db", db);
        c.set("getSession", validateRequest);
        await next();
      })
    );
  }

  public addAuthMiddleware(path: string) {
    this.app.use(
      path, // Use the provided path or a default
      createMiddleware<Env>(async (c, next) => {
        const session = await validateRequest(c);
        if (!session.user) {
          return c.redirect("/login");
        }
        c.set("session", session);
        await next();
      })
    );
  }

  public redirectIfAuthentificated(paths: string[]) {
    paths.forEach((path) => {
      this.app.use(
        path,
        createMiddleware<Env>(async (c, next) => {
          const session = await validateRequest(c);
          if (session.user) {
            return c.redirect("/welcome");
          }
          await next();
        })
      );
    });
  }
}
