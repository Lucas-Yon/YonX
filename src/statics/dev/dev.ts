import { hc } from "hono/client";
import type { AppDev } from "@/yonx/socket";

const client = hc<AppDev>("http://localhost:7777");

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
      console.log("WebSocket connection opened.");
    });

    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      location.reload();
    };
  },
};

// Initialize Alpine store with the DevStore object
document.addEventListener("alpine:init", () => {
  Alpine.store("dev", DevStore);
  DevStore.init();
});
