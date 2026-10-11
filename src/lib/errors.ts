/**
 * Error unwrapping helper.
 *
 * Why this exists: Drizzle wraps every failed query in its own error, so the
 * error a route catches looks like this —
 *
 *   Error: "Failed query: select 1\nparams: "
 *     └── cause: Error: "Connection terminated due to connection timeout"
 *           └── cause: Error: "Connection terminated unexpectedly"
 *
 * Inspecting only `error.message` therefore loses the actual reason. This
 * walks the whole `cause` chain so the real cause (and its Postgres error
 * code, which lives on the innermost error) is available to callers.
 */

export interface ErrorDetails {
  /** First error code found anywhere in the chain (e.g. ECONNREFUSED, 28P01). */
  code?: string;
  /** Every distinct message in the chain, outermost first. */
  messages: string[];
  /** All messages joined — use this for pattern matching. */
  combined: string;
}

export function unwrapError(error: unknown): ErrorDetails {
  const messages: string[] = [];
  let code: string | undefined;
  let current: unknown = error;
  const seen = new Set<unknown>();

  while (current && typeof current === "object" && !seen.has(current)) {
    seen.add(current);
    const e = current as { code?: unknown; message?: unknown; cause?: unknown };

    if (typeof e.code === "string" && !code) code = e.code;
    if (typeof e.message === "string" && e.message && !messages.includes(e.message)) {
      messages.push(e.message);
    }
    current = e.cause;
  }

  if (messages.length === 0) messages.push(String(error));
  return { code, messages, combined: messages.join(" | ") };
}

/**
 * A short, human-readable reason suitable for showing in a UI. Prefers the
 * most specific (deepest) message that isn't Drizzle's generic wrapper.
 */
export function describeError(error: unknown): string {
  const { messages } = unwrapError(error);
  const specific = messages.filter((m) => !/^Failed query:/i.test(m));
  const best = specific[0] ?? messages[0] ?? "Unknown error";
  // Keep it to one tidy line
  return best.replace(/\s+/g, " ").trim().slice(0, 300);
}
