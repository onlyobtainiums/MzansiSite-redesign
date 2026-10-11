import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { payments, sites, subscriptions } from "@/db/schema";
import { verifyWebhookSignature, type PaystackWebhookEvent } from "@/lib/paystack";

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
        // Persist the recurring payment
        await db
          .insert(payments)
          .values({
            paystackReference: event.data.reference,
            amountCents: event.data.amount,
            currency: "ZAR",
            status: "success",
            paidAt: event.data.paid_at ? new Date(event.data.paid_at) : new Date(),
          })
          .onConflictDoNothing();

        // Keep subscription current + publish the linked site
        if (sub?.subscription_code) {
          const nextPayment = sub.next_payment_date ? new Date(sub.next_payment_date) : undefined;
          await db
            .update(subscriptions)
            .set({
              status: "active",
              nextPaymentDate: nextPayment,
              updatedAt: new Date(),
            })
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code));

          const [subRow] = await db
            .select()
            .from(subscriptions)
            .where(eq(subscriptions.paystackSubscriptionCode, sub.subscription_code))
            .limit(1);

          if (subRow?.siteId) {
            await db
              .update(sites)
              .set({ status: "active", updatedAt: new Date() })
              .where(eq(sites.id, subRow.siteId));
          }
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
