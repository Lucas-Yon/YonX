// ../test.ts
function Calculate(x, y) {
  return x + y;
}

// ../statics/dev/store.ts
class TextStoreImpl {
  value;
  constructor() {
    this.value = localStorage.getItem("value") || "kappa";
    Calculate(0, 0);
    console.log("12");
  }
  updateLocalStorage(message) {
    if (typeof message !== "string") {
      return;
    }
    this.value = message;
    console.log(message);
    localStorage.setItem("value", this.value);
  }
}
document.addEventListener("alpine:init", () => {
  Alpine.store("text", new TextStoreImpl);
});
