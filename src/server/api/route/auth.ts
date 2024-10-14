import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import app from "@/binding";

const authRoutes = app
  .post(
    "/login",
    zValidator("form", z.object({ email: z.number(), password: z.string() })),
    async (c) => {
      const data = c.req.valid("form");
      console.log(data);
      return c.redirect("/welcome");
    }
  )
  .post("update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default authRoutes;
