
  import app from "@/binding";
  import login from "./login";
import landing from "./landing";
    


  app.route("/", login);
app.route("/", landing);

  export default app;
  