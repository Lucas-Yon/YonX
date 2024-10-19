let count = 0;
const ports: MessagePort[] = [];

// Broadcast the count to all connected ports (tabs)
function broadcastCount() {
  ports.forEach((port) => {
    port.postMessage(count);
  });
}

// Start counting every second
setInterval(() => {
  count++;
  console.log("Worker count: " + count);
  broadcastCount();
}, 1000);

self.addEventListener("connect", (event) => {
  //@ts-ignore
  const port = event.ports[0];
  ports.push(port);

  // Send initial count to the new connection
  port.postMessage(count);

  // Listen for disconnection events
  port.start();
});
