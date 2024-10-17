import {
  client
} from "./utils/rpc-k0qpaqhb.js";
import"./chunk-341nqc1c.js";

// src/client/module/store.ts
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
