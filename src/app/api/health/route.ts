import { db } from "@/db";
import { sql } from "drizzle-orm";
import { unwrapError } from "@/lib/errors";

export const dynamic = "force-dynamic";

/**
 * Health & configuration diagnostic.
 *
 * Safe to expose: it reports only whether each environment variable is SET
 * (never its value), plus the DB connection result. This exists so a
 * deployment problem can be identified in one page load instead of digging
 * through Vercel Function Logs.
 */

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
        "DATABASE_URL is unreachable from Vercel (e.g. it still points at 127.0.0.1/localhost, " +
        "which only works on your own machine), or the database has an IP allowlist that does " +
        "not include Vercel.",
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

  switch (code) {
    case "ECONNREFUSED":
      return {
        code: "ECONNREFUSED",
        hint:
          "Nothing is listening at that host and port. If DATABASE_URL still points at " +
          "127.0.0.1 / localhost, that is the problem — on Vercel it must be your hosted " +
          "database's public connection string.",
      };
    case "ENOTFOUND":
      return {
        code: "ENOTFOUND",
        hint: "That database hostname does not resolve. Check DATABASE_URL for a typo.",
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
      return { code, hint: "Authentication failed — wrong username or password in DATABASE_URL." };
    case "3D000":
      return { code, hint: "Connected, but that database does not exist. Check the db name in DATABASE_URL." };
    case "42P01":
      return {
        code,
        hint:
          "Connected, but the tables are missing. Run `npx drizzle-kit push` against this database.",
      };
    case "57P03":
      return { code, hint: "The database is starting up or unavailable. Try again in a moment." };
    default:
      return {
        code: code ?? "UNKNOWN",
        hint:
          "Unrecognised database error. The full error is in Vercel → Logs for this " +
          "deployment (it will be prefixed with [db]).",
      };
  }
}

export async function GET() {
  const env: Record<string, boolean> = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
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

  const required = ["DATABASE_URL", "FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY"];
  const missingRequired = required.filter((k) => !env[k]);
  const missingOptional = Object.keys(env).filter((k) => !env[k] && !required.includes(k));

  const started = Date.now();
  let database: Record<string, unknown>;

  try {
    await db.execute(sql`select 1`);
    database = { ok: true, latencyMs: Date.now() - started };
  } catch (error) {
    // Unwrap Drizzle's wrapper to reach the real Postgres/libuv error.
    const { code: rawCode, combined } = unwrapError(error);
    const { code, hint } = diagnose(rawCode, combined);
    database = { ok: false, latencyMs: Date.now() - started, code, hint };
    console.error("[db] Health check failed:", rawCode ?? "", combined);
  }

  const ok = missingRequired.length === 0 && database.ok === true;

  return Response.json(
    {
      ok,
      database,
      env: { set: env, missingRequired, missingOptional },
      note:
        "This endpoint reports only whether each variable is SET, never its value. " +
        "Required: DATABASE_URL and the three server-side Firebase variables. " +
        "Optional: Paystack (payments) and Cloudinary (image uploads) — the app runs " +
        "without them, those features just stay disabled.",
    },
    { status: 200, headers: { "cache-control": "no-store" } },
  );
}
