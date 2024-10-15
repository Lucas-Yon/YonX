import { hc } from "hono/client";
import type { AppDev } from "@/index";

const client = hc<AppDev>("http://localhost:3000");

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
      this.updateTree(JSON.parse(event.data).routes);
    };

    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened.");
    });
  },
};

// Initialize Alpine store with the DevStore object
document.addEventListener("alpine:init", () => {
  Alpine.store("dev", DevStore);
  DevStore.init();
});
