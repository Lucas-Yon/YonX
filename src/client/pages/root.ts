import { HonoApp } from "@/HonoApp";
import login from "./login";
import register from "./register";
import landing from "./landing";

const app = new HonoApp().app.basePath(":lang/");

app.route("/", login);
app.route("/", register);
app.route("/", landing);

export default app;