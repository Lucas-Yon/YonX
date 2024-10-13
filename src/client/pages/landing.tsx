import Header from "@/client/header";
import app from "@/binding";

app.get("/ii", async (c) => {
  return await c.html(
    <Header>
      <div>oo</div>
    </Header>
  );
});

export default app;
