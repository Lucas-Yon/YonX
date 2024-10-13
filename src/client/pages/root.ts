
import { Hono } from "hono";
import landing from "./landing";
  

const app = new Hono().basePath("/");

app.route("/", landing);

export default app;
