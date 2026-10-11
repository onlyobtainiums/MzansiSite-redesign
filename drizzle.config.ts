import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

/*
 * Load .env.local then .env (drizzle-kit does not read them automatically).
 * These must run before process.env is read below.
 */
config({ path: [".env.local", ".env"], quiet: true });

/*
 * Connection used for schema changes (drizzle-kit push / generate).
 *
 * Deliberately prefers DIRECT_URL over DATABASE_URL: on Supabase the app's
 * DATABASE_URL points at the transaction pooler (port 6543), and that mode
 * cannot run the multi-statement DDL that schema changes require. Use the
 * session pooler (port 5432 on the pooler host) or the direct connection here.
 */
const url = process.env.DIRECT_URL ?? process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "No database URL found. Set DIRECT_URL (or DATABASE_URL) in .env.local, " +
      "e.g. postgresql://postgres.<project-ref>:<password>@aws-0-<region>.pooler.supabase.com:5432/postgres",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
});
