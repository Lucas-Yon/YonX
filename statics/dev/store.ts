import { client } from "@/client/utils/rpc";
interface TextStore {
  value: string;
  updateLocalStorage(message: unknown): void;
}

class TextStoreImpl implements TextStore {
  value: string;

  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
    console.log("123");
  }

  async updateLocalStorage(message: unknown) {
    if (typeof message !== "string") {
      return;
    }
    const res = await client.api.users.get.$post({ json: { name: message } });
    console.log(res);
    this.value = message;
    console.log(message);
    localStorage.setItem("value", this.value);
  }
}

document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl());
});
