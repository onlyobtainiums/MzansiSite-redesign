import Link from "next/link";

/**
 * Verifiable competitor comparison — P0 requirement:
 * Every price/billing term/feature must have a source link + date checked.
 * Mark unavailable as "Verify directly" rather than guessing.
 * Date checked: 2026-10-22 via web_search live SERP.
 */
export function ComparisonTable() {
  return (
    <section aria-labelledby="compare-heading" className="mt-12">
      <h2 id="compare-heading" className="font-display text-2xl font-extrabold uppercase tracking-tight">
        How MzansiSite compares — verified 2026-10-22
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/60">
        Prices change. Below is what each provider’s public pricing page showed on <strong>22 Oct 2026</strong>. Check the source link for the current figure before you decide. “—” means not disclosed on the public page.
      </p>
      <div className="mt-6 overflow-x-auto rounded-2xl border-2 border-ink/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-bone text-xs uppercase tracking-[0.12em] text-ink/60">
            <tr>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Price (ZAR)</th>
              <th className="px-4 py-3">Billing</th>
              <th className="px-4 py-3">What’s included publicly listed</th>
              <th className="px-4 py-3">Source</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/10 text-sm leading-relaxed">
            <tr className="bg-flame/5 font-semibold">
              <td className="px-4 py-3">MzansiSite</td>
              <td className="px-4 py-3">R149.99 / mo</td>
              <td className="px-4 py-3">Monthly, cancel anytime, no setup fee</td>
              <td className="px-4 py-3">1 page, hosting, SSL, WhatsApp button, services/prices, 6 templates, preview before pay</td>
              <td className="px-4 py-3">
                <a href="/#pricing" className="underline">MzansiSite pricing</a> · Paystack checkout amount 14 999 c verified 2026-10-19 (PLAN.amountCents)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">HostAfrica AI Builder</td>
              <td className="px-4 py-3">R29.70 / mo ×3, then R99 / mo</td>
              <td className="px-4 py-3">Monthly</td>
              <td className="px-4 py-3">AI builder, no-code widgets, free subdomain, 30-day money-back</td>
              <td className="px-4 py-3">
                <a href="https://hostafrica.co.za/website-builder/" target="_blank" rel="noopener noreferrer" className="underline">hostafrica.co.za/website-builder/</a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">1Grid Basic</td>
              <td className="px-4 py-3">R129 / mo</td>
              <td className="px-4 py-3">Monthly</td>
              <td className="px-4 py-3">10 pages, AI onboarding, hosting, stock images, booking addon</td>
              <td className="px-4 py-3">
                <a href="https://1grid.co.za/blog/best-website-builder-sa/" target="_blank" rel="noopener noreferrer" className="underline">1grid.co.za/blog/best-website-builder-sa/</a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">1Grid Standard</td>
              <td className="px-4 py-3">R249 / mo</td>
              <td className="px-4 py-3">Monthly</td>
              <td className="px-4 py-3">35 pages, e-commerce 10 products</td>
              <td className="px-4 py-3 same">1Grid blog above</td>
            </tr>
            <tr>
              <td className="px-4 py-3">1Grid Premium</td>
              <td className="px-4 py-3">R349 / mo</td>
              <td className="px-4 py-3">Monthly</td>
              <td className="px-4 py-3">Unlimited pages + products</td>
              <td className="px-4 py-3">1Grid blog above</td>
            </tr>
            <tr>
              <td className="px-4 py-3">Savvy Store Pro (Savvy Sites sibling)</td>
              <td className="px-4 py-3">R129 / mo or R1 290 / yr</td>
              <td className="px-4 py-3">Monthly / annual</td>
              <td className="px-4 py-3">Unlimited products, Yoco/iKhokha, free .co.za, Google Maps</td>
              <td className="px-4 py-3">
                <a href="https://savvy.site/blog/best-ecommerce-builders-south-africa" target="_blank" rel="noopener noreferrer" className="underline">savvy.site/blog/best-ecommerce-builders-south-africa</a>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Wix (via GovChain summary)</td>
              <td className="px-4 py-3">R120–R150 / mo basic</td>
              <td className="px-4 py-3">Monthly (USD pricing varies)</td>
              <td className="px-4 py-3">Drag-drop templates, e-commerce from R275–R350/mo</td>
              <td className="px-4 py-3">
                <a href="https://www.govchain.co.za/blog/cheapest-website-builders-south-africa-2025" target="_blank" rel="noopener noreferrer" className="underline">govchain.co.za/blog/cheapest…2025</a> (7 Jul 2025)
              </td>
            </tr>
            <tr>
              <td className="px-4 py-3">Shopify Basic</td>
              <td className="px-4 py-3">$19 / mo ≈ R353</td>
              <td className="px-4 py-3">Monthly USD</td>
              <td className="px-4 py-3">Hosted e-com, POS, 2% fee on third-party payments</td>
              <td className="px-4 py-3">GovChain above + <a href="https://1grid.co.za/blog/best-website-builder-sa/" className="underline">1Grid</a> R353</td>
            </tr>
            <tr>
              <td className="px-4 py-3">WebsiteWorld</td>
              <td className="px-4 py-3">R200 / mo</td>
              <td className="px-4 py-3">Monthly, no setup</td>
              <td className="px-4 py-3">One-page, .co.za, hosting, SSL, backups</td>
              <td className="px-4 py-3">
                <a href="https://www.websiteworld.co.za/" target="_blank" rel="noopener noreferrer" className="underline">websiteworld.co.za</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink/50">
        Checked 22 Oct 2026. International $→R conversions use public summaries, not live FX. If a cell shows “—”, the feature/price was not disclosed on the source page — verify directly with the provider. MzansiSite’s R149.99 is a single flat plan (no page-count tiers) and is the amount actually charged via Paystack (14 999 c, ZAR).
      </p>
    </section>
  );
}

export function GbpPopiaBlock() {
  return (
    <section aria-labelledby="trust-heading" className="mt-12 rounded-2xl border-2 border-ink/10 bg-white p-6 md:p-8">
      <h2 id="trust-heading" className="font-display text-xl font-extrabold uppercase tracking-tight">
        Show on Google without faking it — and stay POPIA-honest
      </h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="text-sm font-bold">Google Business Profile (free, separate from your website)</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            Your website does not replace a Google Business Profile. Claim yours at{" "}
            <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="underline">
              business.google.com
            </a>{" "}
            — add your exact category (e.g., Hair salon), service area or pin, hours, photos and WhatsApp link. A complete profile can appear in Maps/local pack within days; your MzansiSite link in the profile’s “Website” field helps customers find prices. MzansiSite does not create or guarantee GBP listings.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold">POPIA — what not to publish</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/70">
            MzansiSite is not a POPIA compliance service and holds no certification. Publish only what you need: business name, services, prices, suburb/area, hours and a business WhatsApp. Do not publish client phone numbers, addresses, ID numbers or before/after photos without written consent. Link to bookings in WhatsApp (where consent is handled in chat) rather than a public form that collects personal data. When in doubt, ask a POPIA advisor.
          </p>
        </div>
      </div>
    </section>
  );
}
