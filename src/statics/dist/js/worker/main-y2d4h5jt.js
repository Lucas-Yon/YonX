// src/client/module/worker/main.ts
var ExistingScripts = {
  dev: "/static/js/dev-x3jh5kx9.js",
  store: "/static/js/store-rxpxgh4w.js",
  "utils/rpc": "/static/js/utils/rpc-k0qpaqhb.js",
  "worker/main": "/static/js/worker/main-wc6zgnzj.js",
  "worker/shared": "/static/js/worker/shared-6r7jzf20.js"
};
if (window.SharedWorker) {
  const worker = new SharedWorker(ExistingScripts["worker/shared"]);
  worker.port.start();
  worker.port.addEventListener("message", (event) => {
    console.log(`Received count from worker: ${event.data}`);
  });
} else {
  console.error("Shared Workers are not supported in this browser.");
}
export {
  ExistingScripts
};
