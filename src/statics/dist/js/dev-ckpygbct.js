import {
  hc
} from "./chunk-341nqc1c.js";

// src/client/module/dev.ts
var client = hc("http://localhost:7777");
var DevStore = {
  tree: [],
  updateTree(data) {
    this.tree = data;
  },
  init() {
    if (!location.origin.includes("localhost"))
      return;
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
    console.log(ws);
    ws.addEventListener("open", () => {
      console.log("WebSocket connection opened.");
    });
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
      location.reload();
    };
  }
};
document.addEventListener("alpine:init", () => {
  Alpine.store("dev", DevStore);
  DevStore.init();
});
