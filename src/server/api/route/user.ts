import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import app from "@/binding";

const userRoutes = app
  .get("/get", async (c) => {
    return c.json({
      user: "blabla",
    });
  })
  .post("update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default userRoutes;
