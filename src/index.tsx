import { HonoApp } from "./HonoApp";
import { serveStatic } from "hono/bun";
import api from "@/server/api/root";
import pages from "@/client/pages/root";
import App from "@/client/header";
import Sharp from "sharp";
const Hono = new HonoApp();

console.log(Sharp, "oo");

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

// app.on(["GET", "POST"], ["/images/:name"], async (c) => {
//   const { name } = c.req.param();
//   console.log(name);
//   const image = await Bun.file(`/statics/dist/images/${name}`);
//   return c.
// });

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
    onFound: async (_path, c) => {
      try {
        if (!_path.includes("images")) return;
        const { w, h, rotate, quality } = c.req.query();
        console.log(w, h);
        if (!w || !h) return;
        const file = await Bun.file(_path);
        const arrayBuffer = await file.arrayBuffer();
        const image = Sharp(arrayBuffer);
        image.resize({ height: parseInt(h), width: parseInt(w) });
        if (rotate) {
          image.rotate(parseInt(rotate), {
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          });
        }
        const processedBuffer = await image
          .webp({ quality: parseInt(quality) ?? 90 })
          .toBuffer();
        c.res = new Response(processedBuffer, {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "image/webp",
            "Content-Length": `${processedBuffer.byteLength}`,
          },
        });
      } catch (err) {
        console.error("Error processing image:", err);
      }
    },
    rewriteRequestPath: (path) =>
      path.replace(/^\/static/, "./src/statics/dist"),
  })
);

export default {
  port: 3000,
  fetch: app.fetch,
  app: app,
};
