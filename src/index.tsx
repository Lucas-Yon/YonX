import { HonoApp } from "./HonoApp";
import { serveStatic } from "hono/bun";
import api from "@/server/api/root";
import pages from "@/client/pages/root";
import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { inspectRoutes } from "hono/dev";

const Hono = new HonoApp();

Hono.addGlobalMiddleware();
Hono.redirectIfAuthentificated(["/login", "/register"]);

const app = Hono.app;

// api -> api/route/action
app.route("/", api);

// pages -> client/pages/*
app.route("/", pages);

Hono.addMiddleware("/welcome", {
  authAdapters: ["some-test-string"],
});

app.get("/welcome", async (c) => {
  return await c.html(
    <div>
      <h1>{`welcome ${c.var.session?.user?.email}`}</h1>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
});

// When writing client side file in /statics/dev with a .ts extension
// bun will automatically compile and write the corresponding .js file in /statics/dist
// so that we can serve it statically with the following route
app.get(
  "/static/*",
  serveStatic({
    root: "./",

    rewriteRequestPath: (path) =>
      path.replace(/^\/static/, "./src/statics/dist"),
  })
);

// app.get("/dev", async (c) => {
//   return await c.html(dev(app));
// });

export default {
  port: 3000,
  fetch: app.fetch,
  app: app,
};
