import { Hono } from "hono";
import { env } from "./env";
import { db } from "./server/db";
import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import { logger } from "hono/logger";
import { every, except } from "hono/combine";

import { validateRequest, SessionValidationResult } from "./server/auth/auth";

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
  private globalEnabled: boolean = false;

  constructor() {
    this.app = new Hono<Env>();
  }
  /**
   * Enables the global middleware of the app. This adds a logger and some environment
   * variables to the context. You can add more variable using c.set but they also
   * need to be added to type Env.
   *
   * This function throw an error if already called.
   */
  public addGlobalMiddleware() {
    if (this.globalEnabled) {
      throw new Error("Global middleware already enabled");
    }
    // Logger middleware
    this.app.use(logger());

    // Database and environment setup middleware (db,redis,env,etc...)
    this.app.use(
      createMiddleware<Env>(async (c, next) => {
        // await Bun.sleep(1000); // Simulate some async setup
        c.env = env;
        c.set("db", db);
        c.set("getSession", validateRequest);
        await next();
      })
    );

    this.globalEnabled = true;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //
  // ALL ADAPTERS SHOULD HAVE "Adapters" AT THE END OF THEIR NAME
  // TO BE AVAILABLE THROUGH addMiddleware / addMultipleMiddleware
  //
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  public authAdapters(test: string) {
    return createMiddleware<Env>(async (c, next) => {
      const session = await validateRequest(c);
      if (!session.user) {
        return c.redirect("/login", 302);
      }
      c.set("session", session);
      await next();
    });
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  //
  // THOSE METHODS BELOW ARE FIX, DON'T EDIT UNLESS YOU REALLY KNOW WHAT YOU ARE DOING
  //
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  public addMiddleware<M extends MiddlewareNames<HonoApp>>(
    path: string,
    config: { [K in M]: Parameters<HonoApp[K]> },
    exclude?: string | string[]
  ) {
    const [[methodName, args]] = Object.entries(config) as [
      [M, Parameters<HonoApp[M]>]
    ];
    const method = this[methodName] as (
      ...args: Parameters<HonoApp[M]>
    ) => ReturnType<HonoApp[M]>;

    if (exclude) {
      //@ts-ignore
      return this.app.use(path, except(exclude, method(...args)));
    }

    // @ts-ignore
    return this.app.use(path, method(...args));
  }

  public async addMultipleMiddleware(
    path: string,
    configs: {
      [M in MiddlewareNames<HonoApp>]?: Parameters<HonoApp[M]>;
    }[],
    exclude?: string | string[]
  ) {
    const middlewares = configs.map((config) => {
      const [methodName, args] = Object.entries(config)[0] as [
        MiddlewareNames<HonoApp>,
        any[]
      ];
      const method = this[methodName] as (
        ...args: any[]
      ) => ReturnType<HonoApp[MiddlewareNames<HonoApp>]>;
      return method(...args);
    });
    // @ts-ignore
    if (exclude) return this.app.use(path, except(exclude, ...middlewares));

    // @ts-ignore
    return this.app.use(path, every(...middlewares));
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

type MiddlewareNames<T> = {
  [K in keyof T]: K extends string
    ? K extends `${string}Adapters`
      ? T[K] extends (...args: any) => any
        ? K
        : never
      : never
    : never;
}[keyof T];
