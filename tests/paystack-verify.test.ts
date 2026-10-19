import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

/**
 * Step 1 payment-integrity tests for /api/paystack/verify
 * Covers: underpayment, wrong currency, reference mismatch, pending ownership,
 * metadata mismatch, failed status, invalid reference.
 */

vi.mock("@/lib/paystack", async (importOriginal) => {
  const orig = (await importOriginal()) as any;
  return {
    ...orig,
    verifyTransaction: vi.fn(),
  };
});

vi.mock("@/server/auth", () => ({
  getAuthedUser: vi.fn(),
}));

vi.mock("@/lib/content-policy", () => ({
  validateForPublish: vi.fn().mockReturnValue({
    allowed: true,
    blocked: false,
    flagged: false,
    errors: [],
    warnings: [],
  }),
}));

vi.mock("@/lib/firebase/server", () => ({
  AuthError: class AuthError extends Error {
    code: string;
    constructor(code: string, msg: string) {
      super(msg);
      this.code = code;
    }
  },
}));

// DB mock state
let paymentsSelectResult: any[] = [];
let sitesSelectResult: any[] = [];
let subscriptionsSelectResult: any[] = [];
let updateCalls: any[] = [];
let sitesUpdatePayload: any[] = [];

function makeUpdateChain() {
  return {
    set: (vals: any) => ({
      where: (..._args: any[]) => {
        updateCalls.push(vals);
        if (vals && vals.status === "active") sitesUpdatePayload.push(vals);
        return Promise.resolve([] as any);
      },
    }),
  };
}
function makeInsertChain() {
  return {
    values: (vals: any) => ({
      onConflictDoNothing: () => Promise.resolve([] as any),
      returning: () => Promise.resolve([vals]),
    }),
  };
}

vi.mock("@/db", () => {
  return {
    db: {
      select: () => ({
        from: (table: any) => {
          const isPayments = table && typeof table.paystackReference !== "undefined";
          const isSites = table && typeof table.slug !== "undefined";
          const isSubscriptions = table && typeof table.paystackSubscriptionCode !== "undefined";
          if (isPayments) {
            return { where: () => ({ limit: () => Promise.resolve(paymentsSelectResult) }) };
          }
          if (isSites) {
            return { where: () => ({ limit: () => Promise.resolve(sitesSelectResult) }) };
          }
          if (isSubscriptions) {
            return { where: () => ({ limit: () => Promise.resolve(subscriptionsSelectResult) }) };
          }
          return { where: () => ({ limit: () => Promise.resolve([]) }) };
        },
      }),
      update: () => makeUpdateChain(),
      insert: () => makeInsertChain(),
    },
  };
});

import { POST } from "@/app/api/paystack/verify/route";
import { PLAN } from "@/lib/billing";
import { verifyTransaction } from "@/lib/paystack";
import { getAuthedUser } from "@/server/auth";

const mockUser = {
  id: 42,
  firebaseUid: "uid_test_123",
  email: "test@example.com",
  displayName: "Test User",
  createdAt: new Date(),
};

describe("POST /api/paystack/verify — payment integrity", () => {
  beforeEach(() => {
    process.env.PAYSTACK_SECRET_KEY = "sk_test_dummy";
    vi.mocked(verifyTransaction).mockReset();
    vi.mocked(getAuthedUser).mockResolvedValue(mockUser as any);

    paymentsSelectResult = [
      {
        id: 1,
        paystackReference: "mzansi_100_123",
        siteId: 100,
        amountCents: 14999,
        currency: "ZAR",
        status: "pending",
      },
    ];
    sitesSelectResult = [
      {
        id: 100,
        userId: 42,
        slug: "test-site",
        businessName: "Test Business",
        tagline: "Tag",
        industry: "Hair Salon",
        area: "Cape Town",
        hours: "9-5",
        whatsapp: "0821234567",
        phone: "0821234567",
        email: "test@example.com",
        status: "draft",
        services: [],
        socials: {},
      },
    ];
    subscriptionsSelectResult = [];
    updateCalls = [];
    sitesUpdatePayload = [];
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  function makeRequest(body: any) {
    return new Request("http://localhost/api/paystack/verify", {
      method: "POST",
      headers: { authorization: "Bearer dummy-token" },
      body: JSON.stringify(body),
    });
  }

  it("rejects underpayment (amount !== 14999)", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: 14998,
        currency: "ZAR",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(402);
    expect(json.error).toMatch(/Amount mismatch/);
    expect(json.error).toMatch(/R149\.99/);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("rejects wrong currency (USD instead of ZAR)", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: 14999,
        currency: "USD",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(402);
    expect(json.error).toMatch(/Currency mismatch/);
    expect(json.error).toMatch(/ZAR/);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("rejects reference mismatch (Paystack returns different reference)", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_999_DIFFERENT",
        amount: 14999,
        currency: "ZAR",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(402);
    expect(json.error).toMatch(/reference mismatch/i);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("rejects pending-payment ownership mismatch (reference belongs to other site)", async () => {
    paymentsSelectResult = [
      {
        id: 1,
        paystackReference: "mzansi_999_123",
        siteId: 999,
        amountCents: 14999,
        currency: "ZAR",
        status: "pending",
      },
    ];
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_999_123",
        amount: 14999,
        currency: "ZAR",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_999_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toMatch(/does not match this site/);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("rejects metadata siteId mismatch", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: 14999,
        currency: "ZAR",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 200 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toMatch(/metadata.*does not match/i);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("rejects failed payment status", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: 14999,
        currency: "ZAR",
        status: "failed",
        paid_at: null,
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(402);
    expect(json.error).toMatch(/not successful/i);
    expect(sitesUpdatePayload.length).toBe(0);
  });

  it("succeeds on valid payment and activates site", async () => {
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: PLAN.amountCents,
        currency: PLAN.currency,
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
        subscription: {
          status: "active",
          subscription_code: "SUB_xxx",
          email_token: "tok_xxx",
          next_payment_date: new Date(Date.now() + 30 * 86400000).toISOString(),
        },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(sitesUpdatePayload.some((p) => p.status === "active")).toBe(true);
  });

  it("returns 400 when reference missing", async () => {
    const res = await POST(makeRequest({ reference: "", siteId: 100 }));
    expect(res.status).toBe(400);
    expect(vi.mocked(verifyTransaction)).not.toHaveBeenCalled();
  });

  it("does not allow reference for site belonging to another user", async () => {
    sitesSelectResult = [];
    vi.mocked(verifyTransaction).mockResolvedValue({
      status: true,
      message: "ok",
      data: {
        reference: "mzansi_100_123",
        amount: 14999,
        currency: "ZAR",
        status: "success",
        paid_at: new Date().toISOString(),
        customer: { email: "test@example.com", customer_code: "CUS_xxx" },
        metadata: { siteId: 100 },
      },
    } as any);

    const res = await POST(makeRequest({ reference: "mzansi_100_123", siteId: 100 }));
    const json: any = await res.json();
    expect(res.status).toBe(404);
    expect(json.error).toMatch(/Site not found/);
  });
});
