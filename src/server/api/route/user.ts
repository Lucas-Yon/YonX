import { HonoApp } from "@/HonoApp";

const Hono = new HonoApp();

Hono.addMiddleware("/get", {
  authAdapters: ["some-test-string"],
});

const userRoutes = Hono.app
  .get("/get", async (c) => {
    return c.json({
      user: c.var.env.TEST,
    });
  })
  .get("/update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default userRoutes;
