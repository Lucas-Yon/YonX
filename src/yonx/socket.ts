import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import type { WSContext } from "hono/ws";
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

// Set to store active WebSocket connections
const activeConnections = new Set<WSContext<ServerWebSocket<undefined>>>();

// Create a single watcher for all connections
const watcher = chokidar.watch(`src`, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true,
});

const debouncedReload = debounce(() => {
  const message = JSON.stringify({ reload: true });
  activeConnections.forEach((ws) => {
    ws.send(message);
  });
}, 500);

watcher
  .on("add", (path) => {
    console.log(`File added: ${path}`);
    debouncedReload();
  })
  .on("change", (path) => {
    console.log(`File changed: ${path}`);
    debouncedReload();
  })
  .on("unlink", (path) => {
    console.log(`File deleted: ${path}`);
    debouncedReload();
  });

const wsDev = app.get(
  "/ws",
  upgradeWebSocket(() => {
    const routes = inspectRoutes(MainApp.app);

    return {
      onOpen(_, ws) {
        activeConnections.add(ws);
        ws.send(JSON.stringify({ routes }));
      },
      onMessage: () => {
        // Handle incoming messages if needed
      },

      /**
       * Handles the WebSocket connection close event by removing the WebSocket from the active connections.
       */
      onClose: (_, ws) => {
        activeConnections.delete(ws);
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
