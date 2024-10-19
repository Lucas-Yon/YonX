// import { ExistingScripts } from "@/scripts";

export const ExistingScripts = {
  dev: "/static/js/dev-x3jh5kx9.js",
  store: "/static/js/store-rxpxgh4w.js",
  "utils/rpc": "/static/js/utils/rpc-k0qpaqhb.js",
  "worker/main": "/static/js/worker/main-wc6zgnzj.js",
  "worker/shared": "/static/js/worker/shared-6r7jzf20.js",
};

if (window.SharedWorker) {
  const worker = new SharedWorker(ExistingScripts["worker/shared"]); // Path to your Shared Worker script
  worker.port.start();

  // Listen for messages from the worker (count updates)
  worker.port.addEventListener("message", (event) => {
    console.log(`Received count from worker: ${event.data}`);
  });
} else {
  console.error("Shared Workers are not supported in this browser.");
}

// @ts-ignore
// document.getElementById("navButton").addEventListener("click", () => {
//   history.pushState(null, null, "/page2"); // Change URL to /page2
//   loadPage("page2"); // Function to load new content
// });

// // Function to load new content
// async function managePageChange(page:string) {
//   const page = await fetch("/register");
//   console.log(page);
//   // Logic to load new page content dynamically
// }
