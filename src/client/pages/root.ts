import { HonoApp } from "@/HonoApp";
import login from "./login";
import register from "./register";
import component from "./component";
import landing from "./landing";

const app = new HonoApp().app.basePath(":lang/");
export const Pages = app.route("/", login)
.route("/", register)
.route("/", component)
.route("/", landing);


export default app;