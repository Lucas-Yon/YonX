import { migrate } from "drizzle-orm/bun-sqlite/migrator";

import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";

async function main() {
  const sqlite = new Database("sqlite.db");
  const db = drizzle(sqlite);
  await migrate(db, { migrationsFolder: "./src/server/db/lib/migrations" });
}

main();
