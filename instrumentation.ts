/**
 * Next.js instrumentation hook — runs once per server start.
 *
 * `onRequestError` fires for EVERY unhandled server error, and logs the full
 * stack to the platform logs (Vercel → your project → Logs). Without this,
 * a crash can surface only as a generic error page with nothing useful in the
 * console, which is exactly the situation that made
 * "Server error — check Vercel Function Logs for details." impossible to debug.
 *
 * Errors we already handle and log ourselves (see the [db] prefixed lines in
 * src/db/index.ts) will not appear here — only genuinely unhandled ones.
 */
export async function onRequestError(
  error: unknown,
  request: { path?: string; method?: string },
  context: { routePath?: string; routeType?: string; routerKind?: string },
) {
  const e = error as { message?: string; stack?: string; digest?: string; code?: string };

  console.error(
    `[request-error] ${request?.method ?? "?"} ${request?.path ?? "?"} ` +
      `(route: ${context?.routePath ?? "?"}, type: ${context?.routeType ?? "?"})`,
  );
  console.error(`[request-error] code=${e?.code ?? "n/a"} digest=${e?.digest ?? "n/a"}`);
  console.error(`[request-error] ${e?.message ?? String(error)}`);
  if (e?.stack) console.error(`[request-error] stack:\n${e.stack}`);
}
