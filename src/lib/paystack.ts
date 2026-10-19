/**
 * Thin Paystack API wrapper. Server-side only — never expose the secret key.
 * Docs: https://paystack.com/docs/api
 *
 * Stage 6 wires these into routes + webhooks; everything here is safe to
 * import in any stage because calls only fire when explicitly invoked.
 */

import crypto from "crypto";

const BASE = "https://api.paystack.co";

export function paystackConfigured(): boolean {
  return Boolean(process.env.PAYSTACK_SECRET_KEY);
}

async function paystackFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("PAYSTACK_SECRET_KEY is not configured");

  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  const data = await res.json();
  if (!res.ok || data.status === false) {
    throw new Error(data.message ?? `Paystack request failed (${res.status})`);
  }
  return data as T;
}

export interface InitializeTransactionResponse {
  status: true;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

/** Start a subscription checkout for the monthly plan. */
export async function initializeSubscription(params: {
  email: string;
  amountCents: number;
  planCode: string;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}) {
  return paystackFetch<InitializeTransactionResponse>("/transaction/initialize", {
    method: "POST",
    body: JSON.stringify({
      email: params.email,
      amount: params.amountCents,
      currency: "ZAR",
      plan: params.planCode,
      reference: params.reference,
      callback_url: params.callbackUrl,
      metadata: params.metadata ?? {},
    }),
  });
}

export interface VerifyTransactionResponse {
  status: true;
  data: {
    reference: string;
    amount: number;
    currency: string;
    status: "success" | "failed" | "abandoned" | string;
    paid_at: string | null;
    customer: { email: string; customer_code: string };
    metadata?: Record<string, unknown>;
    /** Present when the transaction started a recurring subscription. */
    subscription?: {
      status: string;
      subscription_code: string;
      email_token: string;
      next_payment_date: string;
    };
  };
}

/** Confirm a payment after callback/webhook. */
export async function verifyTransaction(reference: string) {
  return paystackFetch<VerifyTransactionResponse>(`/transaction/verify/${encodeURIComponent(reference)}`);
}

/** Disable auto-renew on a subscription (customer-initiated cancel). */
export async function disableSubscription(code: string, token: string) {
  return paystackFetch("/subscription/disable", {
    method: "POST",
    body: JSON.stringify({ code, token }),
  });
}

/** Get a subscription's current state from Paystack. */
export async function getSubscription(code: string) {
  return paystackFetch<{
    status: true;
    data: {
      status: string; // active | non-renewing | attention | cancelled
      customer: { customer_code: string; email: string };
      next_payment_date: string;
      createdAt: string;
    };
  }>(`/subscription/${encodeURIComponent(code)}`);
}

/** Verify webhook signature (x-paystack-signature header). */
export function verifyWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature) return false;
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) return false;
  const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
  return hash === signature;
}

/** Webhook event shapes we care about. */
export interface PaystackWebhookEvent {
  event: string;
  data: {
    reference: string;
    amount: number;
    currency?: string;
    customer: { customer_code: string; email: string };
    subscription?: { status: string; subscription_code: string; email_token: string; next_payment_date: string };
    metadata?: Record<string, unknown>;
    paid_at?: string;
  };
}
