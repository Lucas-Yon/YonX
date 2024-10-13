import { drizzle } from "drizzle-orm/bun-sqlite";
import { Database } from "bun:sqlite";
import * as authSchema from "@/server/db/schema/auth";

const sqlite = new Database("sqlite.db");
export const db = drizzle(sqlite, { schema: { ...authSchema } });
