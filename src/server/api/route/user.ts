import { z } from "zod";
import binding from "@/binding";

const app = binding();

const userRoutes = app
  .get("/get", async (c) => {
    return c.json({
      user: "coucou ",
    });
  })
  .post("update", async (c) => {
    return c.json({
      user: "blabla",
    });
  });

export default userRoutes;
