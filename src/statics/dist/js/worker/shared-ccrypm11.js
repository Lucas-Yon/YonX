// src/client/module/worker/shared.ts
var count = 0;
var ports = [];
function broadcastCount() {
  ports.forEach((port) => {
    port.postMessage(count);
  });
}
setInterval(() => {
  count++;
  console.log("Worker count: " + count);
  broadcastCount();
}, 1000);
self.addEventListener("connect", (event) => {
  const port = event.ports[0];
  ports.push(port);
  port.postMessage(count);
  port.start();
});
