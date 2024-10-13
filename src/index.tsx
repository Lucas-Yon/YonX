import app from "./binding";
import { serveStatic } from "hono/bun";
import api from "@/server/api/root";
import pages from "@/client/pages/root";

// api -> api/route/action
app.route("/", api);

// pages -> client/pages/*
app.route("/", pages);

// When writing client side file in /statics/dev with a .ts extension
// bun will automatically compile and write the corresponding .js file in /statics/dist
// so that we can serve it statically with the following route
app.get(
  "/static/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/static/, "/statics/dist"),
  })
);

export default app;
