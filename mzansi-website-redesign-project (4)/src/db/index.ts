import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

/**
 * Lazy database connection with proper caching in ALL environments.
 *
 * Previous bug: pool was only cached in development (NODE_ENV !== "production"),
 * causing every Vercel request to create a new Pool and exhaust connections.
 *
 * Fix: cache in globalThis always, which survives across requests in the same
 * serverless function instance on Vercel.
 */

const globalForDb = globalThis as typeof globalThis & {
  __mzansiPool?: Pool;
  __mzansiDb?: NodePgDatabase;
};

function getPool(): Pool {
  if (globalForDb.__mzansiPool) {
    return globalForDb.__mzansiPool;
  }

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL is not set. Add it in Vercel → Settings → Environment Variables.",
    );
  }

  const pool = new Pool({
    connectionString: databaseUrl,
    max: 5, // Vercel serverless: keep pool small
  });

  // Cache in ALL environments (including production on Vercel)
  globalForDb.__mzansiPool = pool;
  return pool;
}

function getDb(): NodePgDatabase {
  if (globalForDb.__mzansiDb) {
    return globalForDb.__mzansiDb;
  }

  const instance = drizzle(getPool());
  globalForDb.__mzansiDb = instance;
  return instance;
}

/** Lazy pool — only connects when first queried at runtime. */
export const pool = new Proxy({} as Pool, {
  get(_target, prop, receiver) {
    return Reflect.get(getPool(), prop, receiver);
  },
});

/** Lazy drizzle client — only connects when first queried at runtime. */
export const db = new Proxy({} as NodePgDatabase, {
  get(_target, prop, receiver) {
    return Reflect.get(getDb(), prop, receiver);
  },
});
