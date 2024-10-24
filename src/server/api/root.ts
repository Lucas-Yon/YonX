import { HonoApp } from "@/HonoApp";
import userRoute from "./route/user";
import authRoute from "./route/auth";

// We use basePath to prefix all endpoint with /api.
// This way we can avoid having to prefix every single route with /api.
const Hono = new HonoApp();

const app = Hono.app.basePath("/api");

// For example, the route /users will be accessible at /api/users

const routes = app.route("/users", userRoute).route("/auth", authRoute);

export type AppType = typeof routes;
export default app;
