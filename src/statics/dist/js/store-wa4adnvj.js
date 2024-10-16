import {
  hc
} from "./chunk-341nqc1c.js";

// src/client/utils/rpc.ts
var client = hc("http://localhost:3000/");

// src/statics/dev/store.ts
class TextStoreImpl {
  value;
  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
  }
  async updateLocalStorage(message) {
    console.log(message, "message");
    if (typeof message !== "string") {
      return;
    }
    const res = await client.api.users.get.$get({ json: { name: message } });
    this.value = message;
    localStorage.setItem("value", this.value);
  }
}
document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl);
});
