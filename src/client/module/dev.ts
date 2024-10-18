import { hc } from "hono/client";
import type { AppDev } from "@/yonx/socket";
import yonxConfig from "yonx.config";

const socketDevPort = yonxConfig.codegen.devsocket.port;
const socketDevEnabled = yonxConfig.codegen.devsocket.enabled;

const client = hc<AppDev>(`http://localhost:${socketDevPort}`);

interface Store {
  tree: {
    path: string;
    method: string;
    name: string;
    isMiddleware: boolean;
  }[]; // or specify the type of the array elements
  updateTree(data: Store["tree"]): void;
  init(): void;
}

const DevStore: Store = {
  tree: [],

  updateTree(data: Store["tree"]) {
    this.tree = data;
  },

  init() {
    if (!location.origin.includes("localhost") || !socketDevEnabled) return;
    const ws = client.ws.$ws(0);
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if ("routes" in data) {
        this.updateTree(JSON.parse(event.data).routes);
      }

      if ("reload" in data) {
        location.reload();
      }
    };
    //test125888
    console.log(ws);
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened..");
    });

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      // full bug;
      // location.reload();
    };
  },
};

// Initialize Alpine store with the DevStore object
document.addEventListener("alpine:init", () => {
  Alpine.store("dev", DevStore);
  DevStore.init();
});
