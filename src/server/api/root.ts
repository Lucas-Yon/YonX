import { Hono } from "hono";
import userRoute from "./route/user";

const app = new Hono().basePath("/api");

const routes = app.route("/users", userRoute);

export type AppType = typeof routes;
export default app;
