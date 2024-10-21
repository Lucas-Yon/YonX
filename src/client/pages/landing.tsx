import { HonoApp } from "@/HonoApp";

const app = new HonoApp().app;

app.get("/landing", async (c) => {
  return await c.render(<div>oo</div>);
});

export default app;
