import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono();
const userRoutes = app
  .post("/get", async (c) => {
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
