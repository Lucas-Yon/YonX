// src/client/module/worker/shared.ts
function broadcastCount() {
  ports.forEach((port) => {
    port.postMessage(count);
  });
}
var count = 0;
var ports = [];
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
