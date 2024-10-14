import { client } from "@/client/utils/rpc";
interface TextStore {
  value: string;
  updateLocalStorage(message: unknown): void;
}

class TextStoreImpl implements TextStore {
  value: string;

  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
  }

  async updateLocalStorage(message: unknown) {
    if (typeof message !== "string") {
      return;
    }
    // const res = await client.api.users.get.$get({ json: { name: message } });
    this.value = message;
    localStorage.setItem("value", this.value);
  }
}

document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl());
});
