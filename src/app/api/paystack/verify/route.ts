import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { payments, sites, subscriptions, users } from "@/db/schema";
import { verifyTransaction } from "@/lib/paystack";
import { PLAN } from "@/lib/billing";
import { AuthError } from "@/lib/firebase/server";

interface VerifyBody {
  reference?: string;
  siteId?: number;
}

/**
 * After Paystack redirects back to our callback page we verify the payment
 * server-side, persist it, activate the subscription and publish the site.
 */
export async function POST(request: Request) {
  try {
    const header = request.headers.get("authorization") ?? "";
    if (!header.startsWith("Bearer ")) {
      return NextResponse.json({ ok: false, error: "Sign in to continue." }, { status: 401 });
    }

    const body = (await request.json().catch(() => null)) as VerifyBody | null;
    const reference = body?.reference?.trim();
    if (!reference) {
      return NextResponse.json({ ok: false, error: "Payment reference is required." }, { status: 400 });
    }

    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json(
        { ok: false, error: "Payments are not configured yet — add PAYSTACK_SECRET_KEY.", configured: false },
        { status: 503 },
      );
    }

    const tx = await verifyTransaction(reference);
    if (tx.data.status !== "success") {
      await db
        .update(payments)
        .set({ status: "failed" })
        .where(eq(payments.paystackReference, reference));
      return NextResponse.json({ ok: false, error: "Payment was not successful — try again." }, { status: 402 });
    }

    // Resolve the site from payment metadata
    const siteId =
      body?.siteId ??
      (tx.data.metadata && typeof tx.data.metadata.siteId === "number" ? tx.data.metadata.siteId : null);
    if (!siteId) {
      return NextResponse.json({ ok: false, error: "Could not match the payment to a site." }, { status: 400 });
    }

    const [site] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
    if (!site) return NextResponse.json({ ok: false, error: "Site not found." }, { status: 404 });

    // Claim the payment record
    await db
      .update(payments)
      .set({ siteId, status: "success", paidAt: new Date(tx.data.paid_at ?? Date.now()) })
      .where(eq(payments.paystackReference, reference));

    // Persist the Paystack customer + activate the monthly subscription
    const customerCode = tx.data.customer.customer_code;
    let subscriptionCode: string | undefined;
    let nextPayment: Date | undefined;

    if (tx.data.subscription) {
      subscriptionCode = tx.data.subscription.subscription_code;
      if (tx.data.subscription.next_payment_date) {
        nextPayment = new Date(tx.data.subscription.next_payment_date);
      }
    }

    if (subscriptionCode) {
      const emailToken = tx.data.subscription!.email_token;
      await db
        .insert(subscriptions)
        .values({
          siteId,
          planCode: PLAN.code,
          status: "active",
          paystackCustomerCode: customerCode,
          paystackSubscriptionCode: subscriptionCode,
          paystackEmailToken: emailToken,
          nextPaymentDate: nextPayment,
          createdAt: new Date(),
        })
        .onConflictDoNothing({ target: subscriptions.id });
    }

    // Go live
    await db
      .update(sites)
      .set({ status: "active", publishedAt: new Date(), updatedAt: new Date() })
      .where(eq(sites.id, siteId));

    const [updatedSite] = await db.select().from(sites).where(eq(sites.id, siteId)).limit(1);
    return NextResponse.json({ ok: true, site: updatedSite });
  } catch (error) {
    console.error("Paystack verify failed", error);
    const msg = error instanceof Error ? error.message : "Payment verification failed.";
    const code = error instanceof AuthError ? 401 : 500;
    return NextResponse.json({ ok: false, error: msg }, { status: code });
  }
}
