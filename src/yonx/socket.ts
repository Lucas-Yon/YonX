import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { inspectRoutes } from "hono/dev";
import { HonoApp } from "@/HonoApp";
import MainApp from "@/index";
import { debounce } from "./utils";
import chokidar from "chokidar";
import yonxConfig from "yonx.config";

if (!yonxConfig.codegen.devsocket.enabled) {
  console.log("DevSocket disabled");
  process.exit();
}

const app = new HonoApp().app;

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const wsDev = app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const routes = inspectRoutes(MainApp.app);

    return {
      onOpen(evt, ws) {
        ws.send(JSON.stringify({ routes }));
        const watcherReloadUser = chokidar.watch(`src`, {
          ignored: /(^|[\/\\])\../, // ignore dotfiles
          persistent: true,
          ignoreInitial: true,
        });
        const debouncedReload = debounce((ws: ServerWebSocket) => {
          ws.send(JSON.stringify({ reload: true }));
        }, 500);
        watcherReloadUser
          .on("add", (path) => {
            debouncedReload(ws);
          })
          .on("change", (path) => {
            debouncedReload(ws);
          })
          .on("unlink", (path) => {
            debouncedReload(ws);
          });
      },
      onMessage: (event, ws) => {
        // console.log(ws, event);
      },
    };
  })
);

export default {
  port: yonxConfig.codegen.devsocket.port,
  fetch: app.fetch,
  websocket,
};

export type AppDev = typeof wsDev;
