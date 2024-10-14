import Header from "@/client/header";
import { HonoApp } from "@/HonoApp";

const app = new HonoApp().app;

app.get("/ii", async (c) => {
  return await c.html(
    <Header>
      <div>oo</div>
    </Header>
  );
});

export default app;
