import Header from "@/client/header";
import binding from "@/binding";

const app = binding();

app.get("/ii", async (c) => {
  return await c.html(
    <Header>
      <div>oo</div>
    </Header>
  );
});

export default app;
