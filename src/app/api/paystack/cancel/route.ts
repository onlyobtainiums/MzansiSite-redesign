import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { sites, subscriptions } from "@/db/schema";
import { disableSubscription } from "@/lib/paystack";
import { getAuthedUser } from "@/server/auth";
import { AuthError } from "@/lib/firebase/server";

/**
 * Customer-initiated cancel: disables auto-renew on Paystack.
 * The site stays live until the paid period ends, then Paystack's
 * webhook suspends it automatically when the next invoice fails.
 */
export async function POST(request: Request) {
  try {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { ok: false, error: "Payments are not configured yet.", configured: false },
        { status: 503 },
      );
    }

    const user = await getAuthedUser(request);
    const body = await request.json().catch(() => null);
    const siteId = typeof body?.siteId === "number" ? body.siteId : null;
    if (!siteId) return NextResponse.json({ ok: false, error: "siteId is required." }, { status: 400 });

    const [site] = await db
      .select()
      .from(sites)
      .where(and(eq(sites.id, siteId), eq(sites.userId, user.id)))
      .limit(1);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });

    const [sub] = await db
      .select()
      .from(subscriptions)
      .where(eq(subscriptions.siteId, siteId))
      .limit(1);
    if (!sub || sub.status !== "active") {
      return NextResponse.json({ ok: false, error: "No active subscription on this site." }, { status: 400 });
    }
    if (!sub.paystackSubscriptionCode || !sub.paystackEmailToken) {
      return NextResponse.json(
        { ok: false, error: "Subscription is still being set up — try again in a moment." },
        { status: 409 },
      );
    }

    await disableSubscription(sub.paystackSubscriptionCode, sub.paystackEmailToken);

    // Mark locally; the webhook confirms when auto-renew actually stops
    await db
      .update(subscriptions)
      .set({ status: "past_due", updatedAt: new Date() })
      .where(eq(subscriptions.id, sub.id));

    return NextResponse.json({
      ok: true,
      message: "Auto-renew cancelled. Your site stays live until the end of the paid period.",
      currentPeriodEnd: sub.nextPaymentDate,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 401 });
    }
    console.error("Cancel subscription failed", error);
    return NextResponse.json({ ok: false, error: "Could not cancel — try again." }, { status: 500 });
  }
}
