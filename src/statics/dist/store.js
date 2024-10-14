// ../statics/dev/store.ts
class TextStoreImpl {
  value;
  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
    console.log("123");
  }
  async updateLocalStorage(message) {
    if (typeof message !== "string") {
      return;
    }
    const miaou = "12";
    this.value = message;
    console.log(message, miaou);
    localStorage.setItem("value", this.value);
  }
}
document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl);
});
