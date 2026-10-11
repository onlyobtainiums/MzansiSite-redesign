"use client";

import Link from "next/link";
import MzansiLogo from "@/components/MzansiLogo";
import { ArrowLeft, Check, CreditCard, ShieldCheck, XCircle } from "lucide-react";
import { formatRand, PLAN } from "@/lib/billing";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function BillingPage() {
  return (
    <div className="grain relative min-h-screen bg-bone text-ink">
      <header className="border-b-2 border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/"><MzansiLogo size={36} wordmark /></Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <div className="mz-in-up" style={{ ["--mz-dur" as string]: "0.8s" }}>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-flame">
            <CreditCard className="h-4 w-4" /> Billing & publishing
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight md:text-5xl">
            One plan. {formatRand(PLAN.amountCents)}/month.
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ink/60">
            You'll be charged {formatRand(PLAN.amountCents)}/month starting when you publish this site. Auto-renew runs
            until you disable it — cancelling keeps it online until the end of the paid month. Drafts stay free forever.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-3xl border-2 border-ink bg-ink p-8 text-bone shadow-[10px_10px_0_#ff4d00]">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">{PLAN.name}</p>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-6xl font-extrabold tracking-tight">{formatRand(PLAN.amountCents)}</span>
                <span className="text-sm font-semibold text-bone/50">/month</span>
              </div>
              <ul className="mt-6 space-y-2.5">
                {["Hosting & SSL", "WhatsApp booking button", "Logo + 6 photo gallery", "Unlimited edits", "Cancel anytime"].map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-bone/80">
                    <Check className="h-4 w-4 text-wa" /> {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-4">
              <div className="rounded-2xl border-2 border-ink/12 bg-white/60 p-5">
                <p className="flex items-center gap-2 text-sm font-bold">
                  <ShieldCheck className="h-4.5 w-4.5 text-wa-deep" /> Secured by Paystack
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/50">
                  Card, EFT and Instant EFT supported. Monthly subscription, no setup fees, no contracts.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-gold/60 bg-gold/10 p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-ink/80">
                  <XCircle className="h-4.5 w-4.5 text-gold" /> Checkout activates next stage
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-ink/55">
                  Add <code className="rounded bg-ink/5 px-1 text-[10px]">PAYSTACK_SECRET_KEY</code> and{" "}
                  <code className="rounded bg-ink/5 px-1 text-[10px]">PAYSTACK_PLAN_CODE</code> to go live — see
                  .env.example.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
