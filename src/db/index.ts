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
    // Fail fast if the database is unreachable. `pg` defaults this to 0
    // (infinite), so a request would hang until the platform kills the
    // function — and a platform kill returns a non-JSON error page, which the
    // UI reports as the unhelpful "Server error — check Vercel Function Logs".
    // 5s leaves room for cold start + auth on Vercel's shorter timeout tiers,
    // so the route's own catch block wins and the user gets a real message.
    connectionTimeoutMillis: 5_000,
    // Drop idle sockets ourselves before the database, Vercel, or an upstream
    // NAT kills them from under us. Keeps the pool from holding dead clients.
    idleTimeoutMillis: 30_000,
    allowExitOnIdle: true,
  });

  /**
   * CRITICAL — this listener is what stops the serverless function from being
   * killed, and its absence was the cause of the
   * "Server error — check Vercel Function Logs for details." screen.
   *
   * `pg` emits an `error` event on the Pool when a client that is sitting
   * IDLE loses its connection. That happens routinely in production: the
   * database restarts or hits its idle timeout, and on Vercel the platform
   * freezes/suspends the function instance between requests, so the pooled TCP
   * connection is already dead the next time the instance is woken up.
   *
   * Node treats an `'error'` event with no registered listener as an uncaught
   * exception and TERMINATES the process. The crash happens asynchronously,
   * outside any request handler, so no `try/catch` in a route can ever catch
   * it — the platform just returns its non-JSON 500 crash page, which
   * `apiFetch()` renders as "Server error — check Vercel Function Logs".
   *
   * Attaching a listener downgrades that crash to a logged warning. The dead
   * client is evicted from the pool automatically and the next query simply
   * opens a fresh connection.
   */
  pool.on("error", (err) => {
    console.error("[db] Idle client error (pool recovered):", err.message);
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
