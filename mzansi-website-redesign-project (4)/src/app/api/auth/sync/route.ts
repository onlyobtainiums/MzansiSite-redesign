import { NextResponse } from "next/server";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";

export const dynamic = "force-dynamic";

/** Mirrors a signed-in Firebase user into Postgres. Called right after login. */
export async function POST(request: Request) {
  try {
    const user = await getAuthedUser(request);
    return NextResponse.json({ ok: true, userId: user.id });
  } catch (error) {
    // AuthError = expected (missing/bad token, not configured)
    if (error instanceof AuthError) {
      const status = error.code === "not-configured" ? 503 : 401;
      return NextResponse.json({ ok: false, error: error.message }, { status });
    }

    // ANY other error — log it and still return JSON, never let it crash to HTML
    const message = error instanceof Error ? error.message : "Unknown server error";
    console.error("Auth sync failed:", message, error);
    return NextResponse.json(
      { ok: false, error: `Could not sync your account: ${message}` },
      { status: 500 },
    );
  }
}
