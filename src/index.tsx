import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import Header from "./client/header";
import api from "@/server/api/root";

const app = new Hono();
app.get(
  "/static/*",
  serveStatic({
    root: "./",
    rewriteRequestPath: (path) => path.replace(/^\/static/, "/statics/dist"),
  })
);
// api -> api/route/action
app.route("/", api);

app.get("/", async (c) => {
  return await c.html(
    <Header>
      <div>oo</div>
    </Header>
  );
});

app.get("test1", async (c) => {
  return await c.html(
    <Header>
      <div
        x-data
        class="flex flex-col items-center justify-center h-screen bg-gray-100"
      >
        <div class="w-full max-w-xs text-center mb-6">
          <h1 class="text-2xl font-semibold text-gray-800 mb-4">
            <span x-text="$store.text.value"></span>
          </h1>
        </div>
        <div class="w-full max-w-xs mb-4">
          <input
            type="text"
            x-on:keyup="$store.text.updateLocalStorage($refs.textme.value)"
            x-ref="textme"
            placeholder="Enter text..."
            class="w-full p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <a href="/test2">
          <button class="w-full p-3 text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300">
            Go to test2
          </button>
        </a>
      </div>
    </Header>
  );
});

export default app;
