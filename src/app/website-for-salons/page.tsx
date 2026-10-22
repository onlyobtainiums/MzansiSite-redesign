import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "Website for Salons in South Africa — MzansiSite",
  description: "Salon website with services, prices, gallery and WhatsApp booking. Velvet & Vital templates for cuts, treatments, colour and bridal. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-salons" },
  openGraph: { url: `${SITE_URL}/website-for-salons`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for salons"
      description=""
      h1="Website for salons — services and prices on one scroll"
      intro="Customers searching “salon near me” want three things fast: what you do, what it costs, how to book. MzansiSite gives your salon a single-page site with your price menu, hours, suburbs and a big WhatsApp button — preview free, publish at R149.99/m. Velvet and Vital templates were built for beauty with soft tones and gallery-first layouts."
      canonicalPath="/website-for-salons"
      breadcrumb={[
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Website for salons", item: `${SITE_URL}/website-for-salons` },
      ]}
    >
      <section aria-labelledby="salon-menu">
        <h2 id="salon-menu" className="font-display text-2xl font-extrabold uppercase tracking-tight">A price menu customers actually read</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-ink/70">Salons lose enquiries when prices live only in DMs. List every service once — customers choose in peace and message ready to book.</p>
        <FeatureGrid
          items={[
            { title: "Price by service, clearly", body: "Wash & blow (R180), silk press (R320), colour + treatment (R650), bridal trial + day. Add duration per row so clients know whether they're booking a 30-min trim or a 3-hour colour." },
            { title: "Gallery that earns trust", body: "Upload before/after-friendly photos via Cloudinary. Velvet crops to warm portraits; Vital keeps it clinical-clean for product shelves and retail. Only use photos you own or have permission to publish." },
            { title: "WhatsApp per service", body: "Your main booking button pre-fills with the page, but any service can deep-link too (‘Hi, I'd like to book silk press Sat 10am’). Lower friction than a form." },
            { title: "Hours + suburbs that rank", body: "Mon–Sat hours with an ‘open now’ label, serviced suburbs and suburb mentions — the details Google and customers expect before they visit." },
          ]}
        />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Starter wording for your salon</h2>
        <p className="mt-2 text-sm text-ink/60">Copy-paste and edit — keep it plain, South African, true.</p>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
          <li className="rounded-xl bg-bone p-4"><strong>About:</strong> “Cape Town salon on Long Street serving washes, treatments, colour and braids. Walk-ins welcome for cuts, bookings preferred for colour.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>How to book:</strong> “Tap WhatsApp, tell us the service + day. We confirm price and slot in chat — no account needed.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>What to bring:</strong> “For colour, arrive with clean, dry hair. Patch test free 48h before for first-time tint.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Retail:</strong> “Ask about take-home aftercare — we stock what we use.”</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Why MzansiSite for salons</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">No plugins, no maintenance. Your salon site is server-rendered HTML — indexable the day you publish — with the same six professional templates every Mzansi business uses. Preview every change before anyone pays. Need <Link href="/website-for-braiders" className="underline">braid-specific pricing</Link> or <Link href="/website-for-nail-technicians" className="underline">nail sets by design</Link>? Those have their own guides.</p>
        <p className="mt-4 text-sm"><Link href="/whatsapp-booking-website" className="underline font-bold">Learn how the WhatsApp booking button works →</Link></p>
      </section>

      <GbpPopiaBlock />

      <div className="mt-12"><Faq items={[
        { q: "Can I show different prices per stylist?", a: "Yes — list senior vs junior pricing as separate rows (e.g. ‘Cut — senior R280 / junior R180’). Clear labels avoid confusion in WhatsApp and keep prices searchable." },
        { q: "Do you handle online payments?", a: "Your primary CTA is WhatsApp (free, zero commission). Paid checkout via Paystack is for your subscription (R149.99/m); client payments stay in your existing method (EFT, cash, Yoco) until you add your own booking tool." },
        { q: "What about load-shedding hours?", a: "Edit your hours anytime in the dashboard. Add a note in your description (‘We update hours during outages — message before you come’). Changes publish instantly and are re-indexed on next crawl." },
        { q: "How do I stop ‘DM for price’ without scaring clients?", a: "Publish a full menu with durations: Wash & blow R180 (45 min), Silk press R320 (90 min), Colour + treatment R650 (3 hr). Invite ‘Ask in WhatsApp if unsure between two services’ — you filter window-shoppers but keep approachable." },
        { q: "Do I need Instagram if I have a website?", a: "Keep both. Instagram gets discovery; your website gives prices, hours and WhatsApp in one link for your bio. Put your MzansiSite subdomain in your bio and Google Business Profile website field." },
        { q: "Can I add my Google reviews?", a: "Yes — add your Google Business Profile review link in the dashboard. Link to reviews rather than copying screenshots; it preserves freshness and trust without faking ratings." },
      ]} /></div>
    </SeoPageShell>
  );
}
