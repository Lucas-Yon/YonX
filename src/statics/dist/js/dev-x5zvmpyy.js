import {
  hc
} from "./chunk-341nqc1c.js";

// yonx.config.ts
var yonxConfig = {
  codegen: {
    jsmodule: {
      enabled: true,
      devPath: "src/client/module",
      distPath: "src/statics/dist"
    },
    pages: {
      enabled: true,
      pagesPath: "src/client/pages"
    },
    devsocket: {
      enabled: true,
      port: 7777
    },
    cssmodule: {
      enabled: true,
      devPath: "src/client/css",
      distPath: "src/statics/dist"
    }
  }
};
var yonx_config_default = yonxConfig;

// src/client/module/dev.ts
var socketDevPort = yonx_config_default.codegen.devsocket.port;
var socketDevEnabled = yonx_config_default.codegen.devsocket.enabled;
var client = hc(`http://localhost:${socketDevPort}`);
var DevStore = {
  tree: [],
  updateTree(data) {
    this.tree = data;
  },
  init() {
    if (!location.origin.includes("localhost") || !socketDevEnabled)
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
      console.log("WebSocket connection opened..");
    });
    ws.onclose = () => {
      console.log("WebSocket connection closed.");
    };
  }
};
document.addEventListener("alpine:init", () => {
  Alpine.store("dev", DevStore);
  DevStore.init();
});
