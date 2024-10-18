import { Hono } from "hono";
import { env } from "./env";
import { db } from "./server/db";
import { createMiddleware } from "hono/factory";
import type { Context } from "hono";
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import { cors } from "hono/cors";
import { contextStorage } from "hono/context-storage";
import { every, except } from "hono/combine";
import {
  validateRequest,
  type SessionValidationResult,
} from "./server/auth/auth";
import { getLocale, getDictionary } from "./yonx/i18n";
import { requestId } from "hono/request-id";
import type { StatusCode } from "hono/utils/http-status";
import { i18n } from "@/i18n/i18n.config";
import yonxConfig from "yonx.config";

export type Env = {
  Variables: {
    db: typeof db;
    session?: SessionValidationResult;
    getSession: typeof validateRequest;
    env: typeof env;
    i18n?: {
      languages: typeof i18n.locales;
      userLanguage: (typeof i18n.locales)[number];
      getDictionary: typeof getDictionary;
    };
    theme?: string;
  };
  Bindings: undefined;
};
type CacheEntry = {
  body: string;
  headers: Headers;
  status: number;
  expiry: number;
};

const simpleCacheStore = new Map<string, CacheEntry>();
let globalEnabled = false;

export class HonoApp {
  public app: Hono<Env>;

  constructor() {
    this.app = new Hono<Env>({});
  }
  /**
   * Enables the global middleware of the app. This adds a logger and some environment
   * variables to the context. You can add more variable using c.set but they also
   * need to be added to type Env.
   *
   * This function throw an error if already called.
   */
  public addGlobalMiddleware() {
    if (globalEnabled) {
      throw new Error("Global middleware already enabled");
    }
    // Logger middleware
    this.app.use(logger());
    this.app.use(csrf());
    this.app.use(cors());

    // Context middleware to generate scripts ect...
    this.app.use(contextStorage());
    this.app.use("*", requestId());
    if (yonxConfig.i18n.enabled === true) {
      this.app.use("*", this.i18nAdapters());
    }
    // Database and environment setup middleware (db,redis,env,etc...)
    this.app.use(
      createMiddleware<Env>(async (c, next) => {
        // await Bun.sleep(1000); // Simulate some async setup

        // get theme from query if exist wtf ?
        c.set("theme", c.req.query("theme"));
        // c.env = env;
        c.set("db", db);
        c.set("getSession", validateRequest);
        c.set("env", env);
        await next();
      })
    );

    globalEnabled = true;
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

  public i18nAdapters() {
    return createMiddleware<Env>(async (c, next) => {
      if (
        c.req.method === "GET" &&
        !yonxConfig.i18n.skipValidation.some((word) =>
          c.req.path.startsWith(word)
        )
      ) {
        const lang = c.req.path.split("/")[1] as (typeof i18n.locales)[number];
        if (i18n.locales.includes(lang)) {
          c.set("i18n", {
            languages: i18n.locales,
            userLanguage: lang,
            getDictionary: getDictionary,
          });
        } else {
          const newLang = getLocale(c.req.raw);
          return c.redirect(
            `/${newLang}${c.req.url.replace(/^https?:\/\/[^\/]+/, "")}`
          );
        }
      }

      await next();
    });
  }

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

  public simpleCacheAdapters(ttl: number = 60000) {
    return createMiddleware<Env>(async (c, next) => {
      const key = c.req.url;
      const cachedResponse = simpleCacheStore.get(key);
      // console.table(simpleCacheStore);

      if (cachedResponse && cachedResponse.expiry > Date.now()) {
        c.header("X-Cache", "HIT");
        cachedResponse.headers.forEach((value, name) => {
          c.header(name, value);
        });
        c.status(cachedResponse.status as StatusCode);
        return c.body(cachedResponse.body);
      }

      await next();

      const responseBody = await c.res.clone().text();
      const responseHeaders = new Headers(c.res.headers);

      simpleCacheStore.set(key, {
        body: responseBody,
        headers: responseHeaders,
        status: c.res.status,
        expiry: Date.now() + ttl,
      });

      c.header("X-Cache", "MISS");
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
    let middlewares: any = [];
    for (const [key, value] of Object.entries(configs[0])) {
      const methodName = key as MiddlewareNames<HonoApp>;
      const method = this[methodName] as (
        ...args: any[]
      ) => ReturnType<HonoApp[MiddlewareNames<HonoApp>]>;
      middlewares.push(method(...value));
    }

    if (exclude) return this.app.use(path, except(exclude, ...middlewares));

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

export type AppContext = Context<Env>;
