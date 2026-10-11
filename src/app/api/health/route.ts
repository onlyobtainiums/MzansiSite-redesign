import { db } from "@/db";
import { sql } from "drizzle-orm";
import { unwrapError } from "@/lib/errors";

export const dynamic = "force-dynamic";

/**
 * Full deployment diagnostic.
 *
 * Safe to expose: it reports only whether each environment variable is SET
 * (never its value), plus pass/fail results for each subsystem. It exists so a
 * broken deployment can be diagnosed from one page load instead of digging
 * through Vercel Function Logs.
 *
 * Each check is isolated in its own try/catch and nothing is imported at the
 * top of this file that could fail at load time — a crashing dependency must
 * show up as a failed check, not take this endpoint down with it.
 */

const EXPECTED_TABLES = ["leads", "payments", "sites", "subscriptions", "users"];

/** Turn a raw connection error into something actionable. */
function diagnose(code: string | undefined, message: string): { code: string; hint: string } {
  const msg = message ?? "";

  /*
   * Check the message BEFORE the code: `pg`'s connect-timeout error is a bare
   * Error with no `code` property, and an unreachable host is by far the most
   * common misconfiguration, so it must not fall through to UNKNOWN.
   */
  if (/connection timeout|Connection terminated due to connection timeout/i.test(msg)) {
    return {
      code: "CONNECT_TIMEOUT",
      hint:
        "Could not open a connection to the database before the 5s limit. Either the host in " +
        "DATABASE_URL is unreachable from Vercel, or the database has an IP allowlist that does " +
        "not include Vercel. If the host is 127.0.0.1/localhost, that only works on your own machine.",
    };
  }
  if (/self.signed certificate|sslmode|SSL/i.test(msg)) {
    return {
      code: code ?? "SSL",
      hint:
        "SSL/TLS problem. Most hosted Postgres providers require SSL — append " +
        "`?sslmode=require` to DATABASE_URL.",
    };
  }
  if (/Invalid URL|Invalid connection string/i.test(msg)) {
    return {
      code: "MALFORMED_URL",
      hint:
        "DATABASE_URL is not a valid connection string. Check for a leftover placeholder such as " +
        "[YOUR-PASSWORD], and make sure the password has no unescaped @ : / # characters.",
    };
  }

  switch (code) {
    case "ECONNREFUSED":
      return {
        code: "ECONNREFUSED",
        hint:
          "Nothing is listening at that host and port. If DATABASE_URL still points at " +
          "127.0.0.1 / localhost, that is the problem — on Vercel it must be your hosted " +
          "database's connection string.",
      };
    case "ENOTFOUND":
      return {
        code: "ENOTFOUND",
        hint:
          "That database hostname does not resolve. Check DATABASE_URL for a typo. NOTE: " +
          "Supabase's direct connection (db.<ref>.supabase.co) is IPv6-only and fails on Vercel — " +
          "use the pooler host instead.",
      };
    case "ETIMEDOUT":
    case "TimeoutError":
      return {
        code: "ETIMEDOUT",
        hint:
          "The database did not answer in time. Either the host is unreachable from Vercel, " +
          "or the database is behind an IP allowlist that does not include Vercel.",
      };
    case "28P01":
    case "28000":
      return {
        code,
        hint:
          "Authentication failed — wrong database password. If you just reset the Supabase " +
          "password, allow a minute for it to propagate, then check both the app and the pooler.",
      };
    case "3D000":
      return {
        code,
        hint: "Connected, but that database does not exist. Supabase's default database name is `postgres`.",
      };
    case "42P01":
      return {
        code,
        hint:
          "Connected, but the tables are missing. Run the SQL from supabase-setup.sql in the " +
          "Supabase SQL Editor (or `npm run db:push`).",
      };
    case "57P03":
      return { code, hint: "The database is starting up or unavailable. Try again in a moment." };
    default:
      return {
        code: code ?? "UNKNOWN",
        hint:
          "Unrecognised database error. The full error is in Vercel → Logs for this deployment " +
          "(it will be prefixed with [db]).",
      };
  }
}

export async function GET() {
  const env: Record<string, boolean> = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    DIRECT_URL: Boolean(process.env.DIRECT_URL),
    FIREBASE_PROJECT_ID: Boolean(process.env.FIREBASE_PROJECT_ID),
    FIREBASE_CLIENT_EMAIL: Boolean(process.env.FIREBASE_CLIENT_EMAIL),
    FIREBASE_PRIVATE_KEY: Boolean(process.env.FIREBASE_PRIVATE_KEY),
    NEXT_PUBLIC_FIREBASE_API_KEY: Boolean(process.env.NEXT_PUBLIC_FIREBASE_API_KEY),
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: Boolean(process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN),
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: Boolean(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    NEXT_PUBLIC_FIREBASE_APP_ID: Boolean(process.env.NEXT_PUBLIC_FIREBASE_APP_ID),
    PAYSTACK_SECRET_KEY: Boolean(process.env.PAYSTACK_SECRET_KEY),
    PAYSTACK_PLAN_CODE: Boolean(process.env.PAYSTACK_PLAN_CODE),
    CLOUDINARY_CLOUD_NAME: Boolean(process.env.CLOUDINARY_CLOUD_NAME),
    CLOUDINARY_API_KEY: Boolean(process.env.CLOUDINARY_API_KEY),
    CLOUDINARY_API_SECRET: Boolean(process.env.CLOUDINARY_API_SECRET),
  };

  const required = [
    "DATABASE_URL",
    "FIREBASE_PROJECT_ID",
    "FIREBASE_CLIENT_EMAIL",
    "FIREBASE_PRIVATE_KEY",
    "NEXT_PUBLIC_FIREBASE_API_KEY",
    "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
    "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
    "NEXT_PUBLIC_FIREBASE_APP_ID",
  ];
  const missingRequired = required.filter((k) => !env[k]);
  const missingOptional = Object.keys(env).filter((k) => !env[k] && !required.includes(k));

  /* ─── Check 1: can we reach the database at all? ─── */
  const started = Date.now();
  let database: Record<string, unknown>;
  let tables: Record<string, unknown> = { checked: false };

  try {
    await db.execute(sql`select 1`);
    database = { ok: true, latencyMs: Date.now() - started };

    /* ─── Check 2: do the tables exist? (is the schema pushed?) ─── */
    try {
      const res = await db.execute<{ table_name: string }>(
        sql`select table_name from information_schema.tables where table_schema = 'public'`,
      );
      const found = (res.rows ?? []).map((r) => r.table_name);
      const missing = EXPECTED_TABLES.filter((t) => !found.includes(t));
      tables = {
        checked: true,
        ok: missing.length === 0,
        found,
        missing,
        hint:
          missing.length === 0
            ? undefined
            : "Tables are missing. Run supabase-setup.sql in the Supabase SQL Editor " +
              "(or `npm run db:push`). This alone will make the dashboard fail.",
      };
    } catch (error) {
      const { code, combined } = unwrapError(error);
      tables = { checked: true, ok: false, code, reason: combined };
    }
  } catch (error) {
    const { code: rawCode, combined } = unwrapError(error);
    const { code, hint } = diagnose(rawCode, combined);
    database = { ok: false, latencyMs: Date.now() - started, code, hint };
    console.error("[db] Health check failed:", rawCode ?? "", combined);
  }

  /* ─── Check 3: does firebase-admin load and initialise? ───
   * The dashboard depends on this module; /api/health deliberately does not
   * import it at the top of the file, so that a load-time failure here is
   * reported as a failed check instead of crashing the whole endpoint.
   */
  let firebaseAdmin: Record<string, unknown>;
  try {
    const mod = await import("@/lib/firebase/server");
    const configured = mod.adminConfigured();
    const app = mod.getAdminApp();
    firebaseAdmin = {
      moduleLoaded: true,
      configured,
      initialised: Boolean(app),
      hint: !configured
        ? "FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY are not all set."
        : app
          ? undefined
          : "Credentials are present but initialisation failed — check the [db]/Firebase line " +
            "in Vercel → Logs. The usual cause is a malformed FIREBASE_PRIVATE_KEY; it must " +
            "contain the BEGIN/END header lines with \\n escapes intact.",
    };
  } catch (error) {
    const { combined } = unwrapError(error);
    firebaseAdmin = {
      moduleLoaded: false,
      reason: combined.slice(0, 400),
      hint:
        "firebase-admin failed to LOAD. This is what breaks the dashboard while leaving this " +
        "page working. Send this whole response to diagnose further.",
    };
  }

  const ok =
    missingRequired.length === 0 &&
    database.ok === true &&
    tables.ok === true &&
    firebaseAdmin.initialised === true;

  return Response.json(
    {
      ok,
      database,
      tables,
      firebaseAdmin,
      env: { set: env, missingRequired, missingOptional },
      note:
        "This endpoint reports only whether each variable is SET, never its value. " +
        "Required: DATABASE_URL, the three server-side Firebase variables, and the four " +
        "NEXT_PUBLIC_FIREBASE_* web-app variables (those must exist at BUILD time). " +
        "Paystack and Cloudinary are optional — the app runs without them.",
    },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
