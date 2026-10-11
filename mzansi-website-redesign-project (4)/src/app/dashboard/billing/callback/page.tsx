"use client";

import Link from "next/link";
import MzansiLogo from "@/components/MzansiLogo";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, ShieldCheck, TriangleAlert } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as const;

type State = "verifying" | "success" | "failed";

function CallbackContent() {
  const router = useRouter();
  const params = useSearchParams();
  const reference = params.get("reference") ?? params.get("trxref");
  const siteId = params.get("siteId") ? Number(params.get("siteId")) : undefined;

  const [state, setState] = useState<State>("verifying");
  const [message, setMessage] = useState("Confirming your payment with Paystack…");
  const [siteName, setSiteName] = useState<string | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (!reference) {
      setState("failed");
      setMessage("No payment reference came back from Paystack — try publishing again.");
      return;
    }

    void (async () => {
      try {
        // Verify server-side — the token lives in the browser session via cookies
        const res = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference, siteId }),
        });
        const ct = res.headers.get("content-type") || "";
        if (!ct.includes("application/json")) {
          throw new Error(`Server returned ${res.status}. Check Vercel logs.`);
        }
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.error ?? "Payment could not be verified.");

        setState("success");
        setMessage(`${data.site.businessName} is now live at ${data.site.slug}.mzansisite.co.za`);
        setSiteName(data.site.businessName);
        setTimeout(() => router.replace("/dashboard"), 2500);
      } catch (e) {
        setState("failed");
        setMessage(e instanceof Error ? e.message : "Payment could not be verified — contact support if you were charged.");
      }
    })();
  }, [reference, siteId, router]);

  return (
    <div className="grain relative min-h-screen bg-ink text-bone">
      <header className="absolute inset-x-0 top-0 z-10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <Link href="/"><MzansiLogo size={36} wordmark className="[&_span]:text-bone" /></Link>
        </div>
      </header>

      <main className="relative grid min-h-screen place-items-center px-5">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
          style={{
            background:
              state === "success"
                ? "radial-gradient(circle, rgba(31,191,95,0.25), transparent 65%)"
                : state === "failed"
                  ? "radial-gradient(circle, rgba(255,77,0,0.25), transparent 65%)"
                  : "radial-gradient(circle, rgba(227,167,47,0.18), transparent 65%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative w-full max-w-md rounded-3xl border-2 border-bone/15 bg-ink-soft/80 p-10 text-center backdrop-blur-xl"
        >
          {state === "verifying" && (
            <>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-gold/30 bg-gold/10">
                <Loader2 className="h-8 w-8 animate-spin text-gold" />
              </span>
              <h1 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">Almost live</h1>
              <p className="mt-3 text-sm text-bone/60">{message}</p>
            </>
          )}

          {state === "success" && (
            <>
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-wa/40 bg-wa/15"
              >
                <CheckCircle2 className="h-8 w-8 text-wa" />
              </motion.span>
              <h1 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">
                {siteName ? `Welcome to the web,` : "You're live"}
              </h1>
              {siteName && <p className="mt-1 font-serif text-3xl italic text-flame">{siteName}</p>}
              <p className="mt-3 text-sm text-bone/60">{message}</p>
              <p className="mt-5 flex items-center justify-center gap-2 text-xs text-bone/40">
                <ShieldCheck className="h-4 w-4 text-wa" /> Subscription active · R149.99/month · Redirecting you…
              </p>
            </>
          )}

          {state === "failed" && (
            <>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-flame/40 bg-flame/10">
                <TriangleAlert className="h-8 w-8 text-flame" />
              </span>
              <h1 className="mt-6 font-display text-2xl font-extrabold uppercase tracking-tight">Not quite</h1>
              <p className="mt-3 text-sm leading-relaxed text-bone/60">{message}</p>
              <Link
                href="/dashboard"
                className="mt-7 inline-flex items-center gap-2 rounded-full bg-flame px-7 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5"
              >
                <ArrowLeft className="h-4 w-4" /> Back to dashboard
              </Link>
            </>
          )}
        </motion.div>
      </main>
    </div>
  );
}

export default function BillingCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center bg-ink text-bone">
          <Loader2 className="h-8 w-8 animate-spin text-gold" />
        </div>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}
