import { HonoApp } from "@/HonoApp";

const Hono = new HonoApp({ path: "/get", auth: true });

Hono.addAuthMiddleware("/update");

const userRoutes = Hono.app
  .get("/get", async (c) => {
    return c.json({
      user: c.env.TEST,
    });
  })
  .get("/update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default userRoutes;
