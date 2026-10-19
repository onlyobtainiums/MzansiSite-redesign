import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import crypto from "crypto";

vi.mock("@/lib/paystack", async (importOriginal) => {
  const orig = (await importOriginal()) as any;
  return {
    ...orig,
    verifyWebhookSignature: vi.fn(),
  };
});

let paymentsInsertCalls: any[] = [];
let paymentsUpdateCalls: any[] = [];
let subscriptionsSelectResult: any[] = [];
let subscriptionsInsertCalls: any[] = [];
let subscriptionsUpdateCalls: any[] = [];
let sitesUpdateCalls: any[] = [];

vi.mock("@/db", () => {
  return {
    db: {
      select: () => ({
        from: (table: any) => {
          const isSubscriptions = table && typeof table.paystackSubscriptionCode !== "undefined";
          if (isSubscriptions) {
            return { where: () => ({ limit: () => Promise.resolve(subscriptionsSelectResult) }) };
          }
          return { where: () => ({ limit: () => Promise.resolve([]) }) };
        },
      }),
      insert: (table: any) => {
        const isPayments = table && typeof table.paystackReference !== "undefined";
        const isSubscriptions = table && typeof table.paystackSubscriptionCode !== "undefined";
        return {
          values: (vals: any) => {
            if (isPayments) paymentsInsertCalls.push(vals);
            if (isSubscriptions) subscriptionsInsertCalls.push(vals);
            return { onConflictDoNothing: () => Promise.resolve([] as any) };
          },
        };
      },
      update: (table: any) => {
        const isPayments = table && typeof table.paystackReference !== "undefined";
        const isSites = table && typeof table.slug !== "undefined";
        const isSubscriptions = table && typeof table.paystackSubscriptionCode !== "undefined";
        return {
          set: (vals: any) => ({
            where: (..._args: any[]) => {
              if (isPayments) paymentsUpdateCalls.push(vals);
              if (isSites) sitesUpdateCalls.push(vals);
              if (isSubscriptions) subscriptionsUpdateCalls.push(vals);
              return Promise.resolve([] as any);
            },
          }),
        };
      },
    },
  };
});

import { POST } from "@/app/api/paystack/webhook/route";
import { PLAN } from "@/lib/billing";
import { verifyWebhookSignature } from "@/lib/paystack";

function signBody(body: string, secret: string) {
  return crypto.createHmac("sha512", secret).update(body).digest("hex");
}

describe("POST /api/paystack/webhook — payment integrity & idempotency", () => {
  const secret = "sk_test_webhook_secret_123";

  beforeEach(() => {
    process.env.PAYSTACK_SECRET_KEY = secret;
    paymentsInsertCalls = [];
    paymentsUpdateCalls = [];
    subscriptionsSelectResult = [];
    subscriptionsInsertCalls = [];
    subscriptionsUpdateCalls = [];
    sitesUpdateCalls = [];
    vi.mocked(verifyWebhookSignature).mockImplementation((rawBody: string, sig: string | null) => {
      if (!sig) return false;
      const hash = crypto.createHmac("sha512", secret).update(rawBody).digest("hex");
      return hash === sig;
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function makeWebhookRequest(event: string, data: any, opts?: { tamperSignature?: boolean; noSignature?: boolean }) {
    const body = JSON.stringify({ event, data });
    const sig = opts?.noSignature ? null : opts?.tamperSignature ? "invalid_sig" : signBody(body, secret);
    const headers: Record<string, string> = { "content-type": "application/json" };
    if (sig) headers["x-paystack-signature"] = sig;
    return new Request("http://localhost/api/paystack/webhook", {
      method: "POST",
      headers,
      body,
    });
  }

  it("rejects invalid webhook signature (401)", async () => {
    const req = makeWebhookRequest(
      "charge.success",
      {
        reference: "ref_123",
        amount: PLAN.amountCents,
        currency: PLAN.currency,
        customer: { customer_code: "CUS_x", email: "a@b.com" },
        metadata: { siteId: 1 },
        paid_at: new Date().toISOString(),
      },
      { tamperSignature: true }
    );

    const res = await POST(req);
    expect(res.status).toBe(401);
    expect(paymentsInsertCalls.length).toBe(0);
    expect(sitesUpdateCalls.length).toBe(0);
  });

  it("rejects missing signature (401)", async () => {
    const req = makeWebhookRequest(
      "charge.success",
      {
        reference: "ref_123",
        amount: PLAN.amountCents,
        currency: PLAN.currency,
        customer: { customer_code: "CUS_x", email: "a@b.com" },
        metadata: { siteId: 1 },
      },
      { noSignature: true }
    );

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("ignores charge.success with underpayment (no activation)", async () => {
    const req = makeWebhookRequest("charge.success", {
      reference: "ref_under",
      amount: 5000,
      currency: "ZAR",
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 1 },
      paid_at: new Date().toISOString(),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(paymentsInsertCalls.length).toBe(0);
    expect(sitesUpdateCalls.length).toBe(0);
    expect(paymentsUpdateCalls.length).toBe(0);
  });

  it("ignores charge.success with wrong currency", async () => {
    const req = makeWebhookRequest("charge.success", {
      reference: "ref_wrong_curr",
      amount: PLAN.amountCents,
      currency: "USD",
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 1 },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(paymentsInsertCalls.length).toBe(0);
    expect(sitesUpdateCalls.length).toBe(0);
  });

  it("records successful charge.success with correct amount and activates site", async () => {
    subscriptionsSelectResult = [];
    const req = makeWebhookRequest("charge.success", {
      reference: "ref_ok_1",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 42 },
      paid_at: new Date().toISOString(),
      subscription: {
        subscription_code: "SUB_ok_1",
        email_token: "tok_1",
        next_payment_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        status: "active",
      },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(paymentsInsertCalls.length).toBe(1);
    expect(paymentsInsertCalls[0].paystackReference).toBe("ref_ok_1");
    expect(paymentsInsertCalls[0].amountCents).toBe(PLAN.amountCents);
    expect(sitesUpdateCalls.length).toBe(1);
    expect(sitesUpdateCalls[0].status).toBe("active");
    expect(subscriptionsInsertCalls.length).toBe(1);
    expect(subscriptionsInsertCalls[0].siteId).toBe(42);
  });

  it("handles duplicate charge.success idempotently (no duplicate payment record beyond conflict handling)", async () => {
    subscriptionsSelectResult = [{ id: 10, siteId: 42, paystackSubscriptionCode: "SUB_dup", status: "active" }];

    const payload = {
      reference: "ref_dup_same",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 42 },
      paid_at: new Date().toISOString(),
      subscription: {
        subscription_code: "SUB_dup",
        email_token: "tok_dup",
        next_payment_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        status: "active",
      },
    };

    const req1 = makeWebhookRequest("charge.success", payload);
    const res1 = await POST(req1);
    expect(res1.status).toBe(200);
    expect(paymentsInsertCalls.length).toBe(1);
    expect(sitesUpdateCalls.length).toBe(1);

    const prevInsertCount = paymentsInsertCalls.length;
    const prevSiteCount = sitesUpdateCalls.length;

    const req2 = makeWebhookRequest("charge.success", payload);
    const res2 = await POST(req2);
    expect(res2.status).toBe(200);
    expect(paymentsInsertCalls.length).toBe(prevInsertCount + 1);
    expect(subscriptionsInsertCalls.length).toBe(0);
    expect(sitesUpdateCalls.length).toBe(prevSiteCount + 1);
    expect(paymentsInsertCalls[0].paystackReference).toBe(paymentsInsertCalls[1].paystackReference);
  });

  it("duplicate with tampered metadata cannot activate wrong site (uses existing subscription siteId)", async () => {
    subscriptionsSelectResult = [{ id: 10, siteId: 42, paystackSubscriptionCode: "SUB_tamper", status: "active" }];

    const payloadTampered = {
      reference: "ref_tamper",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 999 },
      paid_at: new Date().toISOString(),
      subscription: {
        subscription_code: "SUB_tamper",
        email_token: "tok_tamper",
        next_payment_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        status: "active",
      },
    };

    const req = makeWebhookRequest("charge.success", payloadTampered);
    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(subscriptionsInsertCalls.length).toBe(0);
    expect(sitesUpdateCalls.length).toBe(1);
  });

  it("handles charge.failed without suspending site", async () => {
    const req = makeWebhookRequest("charge.failed", {
      reference: "ref_fail_1",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(paymentsUpdateCalls.length).toBe(1);
    expect(paymentsUpdateCalls[0].status).toBe("failed");
    expect(sitesUpdateCalls.length).toBe(0);
  });

  it("handles invoice.payment_failed without suspending site", async () => {
    const req = makeWebhookRequest("invoice.payment_failed", {
      reference: "ref_inv_fail",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(paymentsUpdateCalls.length).toBe(1);
    expect(paymentsUpdateCalls[0].status).toBe("failed");
    expect(sitesUpdateCalls.length).toBe(0);
    expect(subscriptionsUpdateCalls.length).toBe(0);
  });

  it("does not create duplicate payment record on retry (insert on conflict does nothing)", async () => {
    const payload = {
      reference: "ref_no_dup",
      amount: PLAN.amountCents,
      currency: PLAN.currency,
      customer: { customer_code: "CUS_x", email: "a@b.com" },
      metadata: { siteId: 7 },
      paid_at: new Date().toISOString(),
    };

    const req = makeWebhookRequest("charge.success", payload);
    await POST(req);
    expect(paymentsInsertCalls.length).toBe(1);

    const req2 = makeWebhookRequest("charge.success", payload);
    await POST(req2);
    expect(paymentsInsertCalls.length).toBe(2);
    expect(paymentsInsertCalls[0].paystackReference).toBe(paymentsInsertCalls[1].paystackReference);
  });
});
