import { NextResponse } from "next/server";
import { initializeSubscription, paystackConfigured } from "@/lib/paystack";
import { PLAN } from "@/lib/billing";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { payments, sites, subscriptions } from "@/db/schema";

/**
 * Starts a R149.99/month subscription checkout for a signed-in customer's site.
 * Records a pending payment so /verify can reconcile it after callback.
 */
export async function POST(request: Request) {
  try {
    if (!paystackConfigured()) {
      return NextResponse.json(
        { ok: false, error: "Payments are not configured yet — add PAYSTACK_SECRET_KEY.", configured: false },
        { status: 503 },
      );
    }

    const user = await getAuthedUser(request);
    const body = await request.json().catch(() => null);
    const siteId = typeof body?.siteId === "number" ? body.siteId : null;

    if (!siteId) {
      return NextResponse.json({ ok: false, error: "siteId is required." }, { status: 400 });
    }

    const [site] = await db
      .select()
      .from(sites)
      .where(and(eq(sites.id, siteId), eq(sites.userId, user.id)))
      .limit(1);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });
    if (site.status === "active") {
      return NextResponse.json({ ok: false, error: "This site is already published." }, { status: 400 });
    }

    const email = user.email;
    const reference = `mzansi_${siteId}_${Date.now()}`;
    const origin = new URL(request.url).origin;

    const tx = await initializeSubscription({
      email,
      amountCents: PLAN.amountCents,
      planCode: PLAN.code,
      reference,
      callbackUrl: `${origin}/dashboard/billing/callback?siteId=${siteId}`,
      metadata: { siteId, plan: PLAN.code, firebaseUid: user.firebaseUid },
    });

    // Record so verify can claim it after the redirect
    await db
      .insert(payments)
      .values({
        paystackReference: reference,
        siteId,
        amountCents: PLAN.amountCents,
        currency: "ZAR",
        status: "pending",
      })
      .onConflictDoNothing();

    return NextResponse.json({ ok: true, authorizationUrl: tx.data.authorization_url, reference });
  } catch (error) {
    const fail = error instanceof AuthError;
    if (fail) return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
    console.error("Paystack initialize failed", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Could not start payment." },
      { status: 502 },
    );
  }
}
