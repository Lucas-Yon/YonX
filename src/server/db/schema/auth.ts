import { text, integer } from "drizzle-orm/sqlite-core";
import { createTable } from "../createTable";
import { sql } from "drizzle-orm";

export const users = createTable("user", {
  id: text().primaryKey().unique(),
  email: text().notNull(),
  hashedPassword: text(),
  email_verified: integer({ mode: "boolean" }).default(false),
  email_valid: integer().default(0),
  created_at: text().default(sql`(current_timestamp)`),
  name: text(),
});

export const credentials = createTable("credential", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  user_id: text()
    .notNull()
    .references(() => users.id),
  email: text().unique(),
  email_verified: integer({ mode: "boolean" }).default(false).notNull(),
  hashed_password: text().notNull(),
});

export const oauthAccounts = createTable("oauth_account", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  user_id: text()
    .notNull()
    .references(() => users.id),
  email: text().notNull(),
  email_verified: integer({ mode: "boolean" }).default(false).notNull(),
  provider: text().notNull(),
  provider_account_id: text().notNull(),
});

export const sessions = createTable("session", {
  id: text().primaryKey(),
  user_id: text()
    .notNull()
    .references(() => users.id),
  expires_at: text("timestamp").notNull(),
});
