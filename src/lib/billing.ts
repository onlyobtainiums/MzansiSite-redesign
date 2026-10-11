/**
 * Billing constants. The subscription plan itself is created once on the
 * Paystack dashboard (or via /plan API) and its code stored in env.
 */
export const PLAN = {
  code: process.env.PAYSTACK_PLAN_CODE ?? "mzansisite-monthly",
  name: "MzansiSite Monthly",
  /** R149.99 in cents — Paystack ZAR amounts are in kobo/cents. */
  amountCents: 14999,
  currency: "ZAR",
  interval: "monthly",
} as const;

export function formatRand(cents: number): string {
  return `R${(cents / 100).toFixed(2).replace(/\.00$/, "")}`;
}
