// ../src/statics/dev/store.ts
class TextStoreImpl {
  value;
  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
  }
  async updateLocalStorage(message) {
    if (typeof message !== "string") {
      return;
    }
    this.value = message;
    localStorage.setItem("value", this.value);
  }
}
document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl);
});
