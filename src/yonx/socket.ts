import { createBunWebSocket } from "hono/bun";
import type { ServerWebSocket } from "bun";
import { inspectRoutes } from "hono/dev";
import { watch } from "fs";
import { HonoApp } from "@/HonoApp";
import MainApp from "@/index";

const debounce = (fn: Function, ms = 1000) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

const debouncedReload = debounce((ws: ServerWebSocket) => {
  console.log("yolol");
  ws.send(JSON.stringify({ reload: true }));
}, 500);

const app = new HonoApp().app;

let watcher: any;

const { upgradeWebSocket, websocket } = createBunWebSocket<ServerWebSocket>();

const wsDev = app.get(
  "/ws",
  upgradeWebSocket((c) => {
    const routes = inspectRoutes(MainApp.app);

    return {
      onOpen(evt, ws) {
        ws.send(JSON.stringify({ routes }));
        watcher = watch("src", { recursive: true }, async (event, filename) => {
          if (
            filename &&
            !filename.includes("yonx") &&
            !filename.endsWith(".js")
          ) {
            // ws.send(JSON.stringify({ reload: true }));
            // const debouncedReload = debounce(() => {
            //   console.log("yolol");
            //   ws.send(JSON.stringify({ reload: true }));
            // }, 1500);

            debouncedReload(ws);
          }
        });
      },
      onMessage: (event, ws) => {
        // console.log(ws, event);
      },
    };
  })
);

process.on("SIGINT", () => {
  // close watcher if it is defined
  if (watcher) {
    console.log("Closing watcher...");
    watcher.close();
  } else {
    console.log("No watcher to close.");
  }
  process.exit(0);
});

export default {
  port: 7777,
  fetch: app.fetch,
  websocket,
};

// Bun.serve({
//   port: 7777,
//   fetch: app.fetch,
//   // @ts-ignore
//   websocket,
// });

export type AppDev = typeof wsDev;
