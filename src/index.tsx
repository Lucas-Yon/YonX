import { HonoApp } from "./HonoApp";
import { serveStatic } from "hono/bun";
import api from "@/server/api/root";
import pages from "@/client/pages/root";
import App from "@/client/header";

const Hono = new HonoApp();

Hono.addGlobalMiddleware();
// Hono.redirectIfAuthentificated(["/login", "/register"]);

const app = Hono.app;

// api -> api/route/action
app.route("/", App);

app.route("/", api);

// pages -> client/pages/*
app.route("/", pages);

Hono.addMultipleMiddleware("/welcome", [
  {
    authAdapters: ["some-test-string"],
    simpleCacheAdapters: [100000],
  },
]);

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
app.on(
  "GET",
  ["/static/js/*", "/static/css/*"],
  serveStatic({
    root: "./",
    onFound: (_path, c) => {
      c.header("Cache-Control", `public, immutable, max-age=31536000`);
    },
    rewriteRequestPath: (path) =>
      path.replace(/^\/static/, "./src/statics/dist"),
  })
);

app.get(
  "/static/*",
  serveStatic({
    root: "./",

    rewriteRequestPath: (path) =>
      path.replace(/^\/static/, "./src/statics/dist"),
  })
);

export default {
  port: 3000,
  fetch: app.fetch,
  app: app,
};
