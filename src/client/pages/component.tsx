import { HonoApp } from "@/HonoApp";
import Tabs from "../components/ui/tabs";

const Hono = new HonoApp();

const Page = Hono.app.get("/component", async (c) => {
  return await c.render(
    <div>
      <Tabs />
    </div>
  );
});

export default Page;
