import binding from "@/binding";

const app = binding();

app.get("/muscu", async (c) => {
  return await c.html(<div>flavito</div>);
});

app.get("/login", async (c) => {
  return await c.html(<div>flavito</div>);
});

export default app;
