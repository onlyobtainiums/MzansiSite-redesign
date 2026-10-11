/**
 * Node-runtime-only instrumentation.
 *
 * Kept in its own file and imported dynamically from instrumentation.ts so the
 * Edge runtime bundle never sees `process.on` (which Edge does not support and
 * which would otherwise fail the build).
 */

export function installCrashLogging() {
  /*
   * Capture process-level crashes with a real stack.
   *
   * Node's default behaviour for an unhandled `error` event or an uncaught
   * exception prints a terse line and tears the process down. The platform then
   * returns a non-JSON 500 page, which the UI can only report as
   * "Server error — check Vercel Function Logs for details." with no clue what
   * actually failed.
   *
   * These handlers don't prevent the crash, they guarantee the REASON reaches
   * the logs, prefixed so it is easy to find. Anything logged as [fatal] is a
   * genuine bug worth reporting.
   */
  process.on("uncaughtException", (err: Error & { code?: string }) => {
    console.error(`[fatal] uncaughtException code=${err?.code ?? "n/a"}: ${err?.message ?? err}`);
    if (err?.stack) console.error(`[fatal] stack:\n${err.stack}`);
  });

  process.on("unhandledRejection", (reason: unknown) => {
    const e = reason as { message?: string; code?: string; stack?: string };
    console.error(
      `[fatal] unhandledRejection code=${e?.code ?? "n/a"}: ${e?.message ?? String(reason)}`,
    );
    if (e?.stack) console.error(`[fatal] stack:\n${e.stack}`);
  });

  console.log("[instrumentation] crash logging installed (nodejs runtime)");
}
