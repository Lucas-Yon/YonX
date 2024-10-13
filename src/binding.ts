import { Hono } from "hono";
import { env } from "./env";
import { db } from "./server/db";
import { createMiddleware } from "hono/factory";

type Env = {
  Variables: {
    db: typeof db;
  };
  Bindings: typeof env;
};

const app = new Hono<Env>();

const mw = createMiddleware<Env>(async (c, next) => {
  c.env = env;
  c.set("db", db);

  await next();
});

app.use(mw);

export default app;
