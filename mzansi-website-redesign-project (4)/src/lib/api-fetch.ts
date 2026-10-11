"use client";

/**
 * Safe JSON fetch that never throws "Unexpected token '<'".
 * If the server returns HTML (e.g. a Vercel 500 page), this extracts
 * a useful error message instead of crashing on JSON.parse.
 */
export async function apiFetch<T = Record<string, unknown>>(
  url: string,
  init?: RequestInit,
): Promise<{ res: Response; data: T }> {
  const res = await fetch(url, init);

  const contentType = res.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    // Server returned HTML or something else — extract what we can
    const text = await res.text().catch(() => "");
    console.error(`[apiFetch] ${url} returned ${res.status} with content-type: ${contentType}`);
    if (text.length > 0) {
      console.error(`[apiFetch] Response body (first 300 chars): ${text.slice(0, 300)}`);
    }

    throw new Error(
      res.status === 500
        ? "Server error — check Vercel Function Logs for details."
        : res.status === 404
          ? `API route not found: ${url}`
          : `Server returned HTTP ${res.status} (not JSON). Check server logs.`,
    );
  }

  const data = (await res.json()) as T;
  return { res, data };
}
