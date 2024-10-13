import { Hono } from "hono";
import Header from "@/client/header";

const app = new Hono();

app.get("/", async (c) => {
  return await c.html(
    <Header>
      <div>oo</div>
    </Header>
  );
});

export default app;
