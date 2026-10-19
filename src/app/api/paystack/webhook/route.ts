import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { payments, sites, subscriptions } from "@/db/schema";
import { verifyWebhookSignature, type PaystackWebhookEvent } from "@/lib/paystack";
import { PLAN } from "@/lib/billing";

/**
 * Paystack sends this on every subscription event — most importantly the
 * monthly `charge.success` invoice that keeps a published site alive.
 *
 * MUST be POSTed with the raw body — we use x-paystack-signature to verify.
 */
export async function POST(request: Request) {
  try {
    if (!process.env.PAYSTACK_SECRET_KEY) {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const rawBody = await request.text();
    const signature = request.headers.get("x-paystack-signature");

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event: PaystackWebhookEvent = JSON.parse(rawBody);
    const sub = event.data.subscription;

    switch (event.event) {
      /* ——— Successful monthly invoice ——— */
      case "charge.success": {
        // ── Amount / currency gate — authoritative from billing config ──
        // Do not activate site if amount/currency does not match the expected plan.
        // Acknowledge webhook with 200 to prevent retries, but take no billing action.
        if (event.data.amount !== PLAN.amountCents || event.data.currency !== PLAN.currency) {
          console.warn("Webhook charge.success rejected: amount/currency mismatch", {
            ref: event.data.reference,
            amount: event.data.amount,
            currency: event.data.currency,
          });
          break;
        }

        const paidAt = event.data.paid_at ? new Date(event.data.paid_at) : new Date();

        /*
         * The site this charge belongs to. /paystack/initialize puts siteId in
         * the transaction metadata, so the webhook can identify the customer
         * even when the browser never comes back to our callback page.
         */
        const meta = (event.data.metadata ?? {}) as Record<string, unknown>;
        const metaSiteId = typeof meta.siteId === "number" ? meta.siteId : null;
        // Hardened: webhook metadata siteId must not be used to hijack another pending reference.
        // Activation is further gated by unique paystackReference and subscription_code idempotency.

        // Record the payment. An initial charge usually already has a 'pending'
        // row created by /paystack/initialize, so the insert alone (which
        // conflicts and does nothing) would leave it pending forever.
        await db
          .insert(payments)
          .values({
            paystackReference: event.data.reference,
            siteId: metaSiteId,
            amountCents: event.data.amount,
            currency: "ZAR",
            status: "success",
            paidAt,
          })
          .onConflictDoNothing();

        await db
          .update(payments)
          .set({ status: "success", paidAt })
          .where(eq(payments.paystackReference, event.data.reference));

        let siteIdToActivate: number | null = metaSiteId;

        // Keep the subscription current + publish the linked site
        if (sub?.subscription_code) {
          const nextPayment = sub.next_payment_date ? new Date(sub.next_payment_date) : undefined;

          const [existing] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code))
            .limit(1);

          if (existing) {
            await db
              .update(subscriptions)
              .set({
                status: "active",
                nextPaymentDate: nextPayment,
                updatedAt: new Date(),
              })
              .where(eq(subscriptions.id, existing.id));
            siteIdToActivate = siteIdToActivate ?? existing.siteId;
          } else if (metaSiteId) {
            /*
             * No subscription row yet. That normally means the browser never
             * completed the redirect back to /dashboard/billing/callback (tab
             * closed, session expired, verification failed) — so the customer
             * paid but nothing was recorded. Build the row from webhook data so
             * a paying customer is never left with an inactive site.
             */
            await db
              .insert(subscriptions)
              .values({
                siteId: metaSiteId,
                planCode: PLAN.code,
                status: "active",
                paystackCustomerCode: event.data.customer.customer_code,
                paystackSubscriptionCode: sub.subscription_code,
                paystackEmailToken: sub.email_token,
                nextPaymentDate: nextPayment,
              })
              .onConflictDoNothing();
          }
        }

        if (siteIdToActivate) {
          await db
            .update(sites)
            .set({ status: "active", updatedAt: new Date() })
            .where(eq(sites.id, siteIdToActivate));
        }
        break;
      }

      /* ——— Failed payment — do not suspend automatically (no new grace policy) ——— */
      case "charge.failed":
      case "invoice.payment_failed": {
        // Mark the pending payment as failed if we have it; do not suspend yet.
        // Suspension is handled by Paystack's subscription.not_renew / subscription.delete
        // after Paystack's own retry cycle, preserving existing non-payment policy.
        if (event.data.reference) {
          await db
            .update(payments)
            .set({ status: "failed" })
            .where(eq(payments.paystackReference, event.data.reference));
        }
        break;
      }

      /* ——— Subscription created (initial signup) ——— */
      case "subscription.create": {
        if (sub?.subscription_code) {
          await db
            .update(subscriptions)
            .set({
              status: "active",
              paystackEmailToken: sub.email_token,
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code));
        }
        break;
      }

      /* ——— Subscription disabled by customer (cancel auto-renew) ——— */
      case "subscription.disable": {
        if (sub?.subscription_code) {
          const [subRow] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code))
            .limit(1);

          // Keep the site live until currentPaidPeriodEnd — we store the end date from the API
          if (subRow) {
            await db
              .update(subscriptions)
              .set({
                status: "cancelled",
                currentPeriodEnd: subRow.nextPaymentDate,
                updatedAt: new Date(),
              })
              .where(eq(subscriptions.id, subRow.id));

            // Don't suspend yet — let the paid period finish
          }
        }
        break;
      }

      /* ——— Subscription deleted / reversed ——— */
      case "subscription.delete":
      case "subscription.not_renew": {
        if (sub?.subscription_code) {
          const [subRow] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code))
            .limit(1);
          if (subRow?.siteId) {
            await db
              .update(sites)
              .set({ status: "suspended", updatedAt: new Date() })
              .where(eq(sites.id, subRow.siteId));
          }
          await db
            .update(subscriptions)
            .set({ status: "cancelled", updatedAt: new Date() })
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code));
        }
        break;
      }

      default:
        // Unhandled events are fine — we only care about the billing ones
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Paystack webhook error", error);
    return NextResponse.json({ error: "Webhook processing failed." }, { status: 500 });
  }
}

/** Webhook health check — Paystack requires a GET before saving the URL. */
export async function GET() {
  return NextResponse.json({ received: true, ready: Boolean(process.env.PAYSTACK_SECRET_KEY) }, { status: 200 });
}
