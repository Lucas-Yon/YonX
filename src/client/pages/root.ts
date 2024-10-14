import binding from "@/binding";
import login from "./login";
import landing from "./landing";
import flavitomuscu from "./flavito/muscu";
const app = binding();
app.route("/", login);
app.route("/", landing);
app.route("/flavito", flavitomuscu);
export default app;
