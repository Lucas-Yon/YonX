import { HonoApp } from "@/HonoApp";

const Hono = new HonoApp();

Hono.addMultipleMiddleware("/*", [
  {
    // authAdapters: ["some-test-string"],
    simpleCacheAdapters: [3000],
  },
]);

const userRoutes = Hono.app
  .get("/get", async (c) => {
    return c.json({
      user: Math.random(),
    });
  })
  .get("/update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default userRoutes;
