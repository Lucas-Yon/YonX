import { HonoApp } from "./HonoApp";
import { getConnInfo, serveStatic } from "hono/bun";
import api from "@/server/api/root";
import pages from "@/client/pages/root";
import App from "@/client/header";
import Sharp from "sharp";
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

app.on(
  ["GET", "POST"],
  [
    "/images/:name",
    "/images/:size/:name",
    "/images/:size/:q/:name",
    "/images/:size/:q/:rotate/:name",
  ],
  async (c) => {
    try {
      const info = getConnInfo(c);
      console.log(
        info.remote.address,
        info.remote.port,
        info.remote.addressType
      );
      const name = c.req.param("name");
      const size = c.req.param("size");
      const rotate = c.req.param("rotate");
      const quality = c.req.param("q");
      const arrayBuffer = await Bun.file(
        `src/statics/dist/images/${name}`
      ).arrayBuffer();
      const image = Sharp(arrayBuffer);
      if (size) {
        const [width, height] = size.split("x").map((x) => parseInt(x));
        if (width > 1920 || height > 1080) {
          return c.notFound();
        }
        image.resize(width, height);
      }
      if (rotate) {
        const cleanRotate = parseInt(rotate);
        image.rotate(cleanRotate > 360 ? 0 : cleanRotate, {
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        });
      }
      const cleanQuality = quality ? parseInt(quality) : 90;
      const processedBuffer = await image
        .webp({ quality: cleanQuality < 100 ? cleanQuality : 90 })
        .toBuffer();

      c.res = new Response(processedBuffer, {
        status: 200,
        statusText: "OK",
        headers: {
          "Content-Type": "image/webp",
        },
      });
    } catch (error) {
      console.log(error);
      return c.notFound();
    }
  }
);

app.get(
  "/static/*",
  serveStatic({
    root: "./",
    onFound: async (_path, c) => {
      try {
        if (!_path.includes("images")) return;
        const { w, h, rotate, quality } = c.req.query();
        console.log("yolo");
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
          .webp({ quality: quality ? parseInt(quality) : 90 })
          .toBuffer();
        c.res = new Response(processedBuffer, {
          status: 200,
          statusText: "OK",
          headers: {
            "Content-Type": "image/webp",
            "Content-Length": `${processedBuffer.byteLength}`,
            "Cache-Control": `public, immutable, max-age=31536000`,
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
