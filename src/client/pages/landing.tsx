import { HonoApp } from "@/HonoApp";

const Hono = new HonoApp();

const Page = Hono.app.get("/landing/:test/yolo", async (c) => {
  return await c.render(<div>oo</div>);
});

export default Page;
