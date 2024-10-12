import { Calculate } from "../../test";
interface TextStore {
  value: string;
  updateLocalStorage(message: string): void;
}

class TextStoreImpl implements TextStore {
  value: string;

  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
    Calculate(0, 0);
    console.log("12");
  }

  updateLocalStorage(message: unknown) {
    if (typeof message !== "string") {
      return;
    }
    this.value = message;
    console.log(message);
    localStorage.setItem("value", this.value);
  }
}

document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl());
});

const yolo: string = "yo";
