document.addEventListener("alpine:init", () => {
  Alpine.store("text", {
    value: localStorage.getItem("value") || "kappa",

    updateLocalStorage(message) {
      this.value = message;
      console.log(message);
      localStorage.setItem("value", this.value);
    },
  });
  console.log(Alpine.$data);
});
