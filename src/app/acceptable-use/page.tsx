import Link from "next/link";
import { ACCEPTABLE_USE_POLICY_TEXT, MERCHANT_DECLARATION_TEXT } from "@/lib/content-policy";

export const metadata = {
  title: "Acceptable Use Policy — MzansiSite",
  description: "MzansiSite Acceptable Use Policy — what businesses can and cannot publish.",
};

export default function AcceptableUsePage() {
  return (
    <div className="min-h-screen bg-bone text-ink">
      <div className="mx-auto max-w-3xl px-6 py-10 md:py-14">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.18em] text-flame hover:underline">
          ← Back to home
        </Link>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight md:text-4xl">
          Acceptable Use Policy
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-ink/60">
          Last updated: 18 October 2025. This policy applies to all content published through MzansiSite.
          It supplements our Terms and does not claim halal certification or issue religious rulings.
        </p>

        <div className="mt-8 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Business content</h2>
          <div className="prose prose-sm mt-4 max-w-none whitespace-pre-wrap text-sm leading-relaxed text-ink/80">
            {ACCEPTABLE_USE_POLICY_TEXT}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border-2 border-ink/15 bg-white p-6 md:p-8">
          <h2 className="font-display text-lg font-bold uppercase tracking-tight">Merchant declaration</h2>
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/70">
            {MERCHANT_DECLARATION_TEXT}
          </p>
        </div>

        <div className="mt-6 rounded-xl border border-ink/10 bg-white p-5 text-sm leading-relaxed text-ink/60">
          <p className="font-bold text-ink">How enforcement works</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Automated checks block clearly prohibited offerings (alcohol, gambling, sexual services, recreational intoxicants, etc.) with an actionable error.</li>
            <li>Ambiguous cases are flagged for administrator review — your site stays as a draft until reviewed.</li>
            <li>Placeholder or demo contact numbers and emails are blocked from publishing.</li>
            <li>We apply conservative defaults where scholars differ and we do not claim halal certification.</li>
          </ul>
          <p className="mt-3 text-xs text-ink/40">Questions? Contact support from your dashboard before publishing.</p>
        </div>
      </div>
    </div>
  );
}
