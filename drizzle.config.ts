import { defineConfig } from "drizzle-kit";
// import { env } from "@/env";

export default defineConfig({
  dialect: "sqlite", // Added dialect parameter
  schema: "./src/server/db/schema",
  out: "./src/server/db/lib/migrations",
  tablesFilter: [`yonx_*`],
  dbCredentials: {
    url: "sqlite.db",
  },
});
