// import { ExistingScripts } from "@/scripts";

export const ExistingScripts = {
  dev: "/static/js/dev-mc288ha5.js",
  store: "/static/js/store-rxpxgh4w.js",
  "utils/link": "/static/js/utils/link-pb3y9g29.js",
  "utils/rpc": "/static/js/utils/rpc-k0qpaqhb.js",
  "worker/main": "/static/js/worker/main-62jeh17w.js",
  "worker/shared": "/static/js/worker/shared-6r7jzf20.js",
};

if (window.SharedWorker) {
  const worker = new SharedWorker(ExistingScripts["worker/shared"]); // Path to your Shared Worker script
  worker.port.start();

  // Listen for messages from the worker (count updates)
  worker.port.addEventListener("message", (event) => {
    console.log(`count: ${event.data}`);
  });
} else {
  console.error("Shared Workers are not supported in this browser.");
}
