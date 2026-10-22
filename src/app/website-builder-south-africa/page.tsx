import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { ComparisonTable, GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "Website Builder South Africa — MzansiSite",
  description:
    "South African website builder for small businesses, salons, braiders, barbers and nail techs. Services, prices, location and WhatsApp booking in ~60 seconds. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-builder-south-africa" },
  openGraph: { title: "Website Builder South Africa — MzansiSite", description: "Services, prices, location and WhatsApp booking for Mzansi businesses. Free to build, R149.99/m to publish.", url: `${SITE_URL}/website-builder-south-africa`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website Builder South Africa"
      description=""
      h1="Website builder made for South Africa"
      intro="MzansiSite is built for how Mzansi actually does business: customers ask on WhatsApp, compare prices, check opening hours, then book. Build your site in about 60 seconds — services, prices, location and a big tap-to-chat button — preview it free, publish at R149.99/m when you're ready. No laptop needed, works on your phone, six ready-made templates (Velvet, Forge, Savanna, Praxis, Market, Vital) and a cancel-anytime subscription."
      canonicalPath="/website-builder-south-africa"
      breadcrumb={[
        { name: "Home", item: `${SITE_URL}/` },
        { name: "Website builder South Africa", item: `${SITE_URL}/website-builder-south-africa` },
      ]}
    >
      <section aria-labelledby="why-local" className="space-y-6">
        <h2 id="why-local" className="font-display text-2xl font-extrabold uppercase tracking-tight">Why a local builder fits better</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-ink/70">
          You don't need another generic drag-and-drop that defaults to dollars and Stripe. Your customers search <em>website for salon near me</em> and expect
          ZAR prices, South African suburbs, WhatsApp not a web form, and hours that reflect load-shedding realities. MzansiSite keeps it simple: one page with
          everything a first-time visitor needs — no app catalogs to wade through, no 40-minute tutorial.
        </p>
        <FeatureGrid
          items={[
            { title: "ZAR, WhatsApp-first", body: "Prices default to ZAR and your call-to-action is a WhatsApp message with a pre-filled enquiry (e.g. “Hi, I want to book cornrows on Saturday”). Customers tap, chat, book — you close in the app you already live in." },
            { title: "Phone-friendly from the first tap", body: "Most Mzansi customers browse on mobile. Every template is responsive, loads fast on mid-range data connections, and surfaces hours, address and booking before the fold." },
            { title: "Six templates, not sixty decisions", body: "Velvet (beauty), Forge (barbershop grit), Savanna (warm earthy), Praxis (clean services), Market (retail), Vital (wellness). Each has live demo data you can try before building yours — no account needed for the preview." },
            { title: "R149.99/m to publish, free to try", body: "Build and preview with no card. Publish when you're happy — same R149.99/m for every business (the amount actually charged). Cancel anytime in Paystack, no setup fee." },
          ]}
        />
      </section>

      <section aria-labelledby="how-it-works" className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 id="how-it-works" className="font-display text-xl font-extrabold uppercase tracking-tight">How it works</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink/80">
          <li><strong>Pick a template</strong> — hover any card on <Link href="/#demo" className="underline">our live demo</Link> to see the real layout, then continue in the builder.</li>
          <li><strong>Add your services</strong> — name (e.g. “Knotless shoulder”) and price (R450). Hours (Mon–Sun) and suburbs you cover.</li>
          <li><strong>Drop your WhatsApp</strong> — we turn it into a <Link href="/whatsapp-booking-website" className="underline">WhatsApp booking button</Link> with hours-aware labels (“Open now — chat on WhatsApp” vs “Closed — message us”).</li>
          <li><strong>Publish to your subdomain</strong> — yoursite.mzansisite.co.za (custom domain hook available in dashboard) the moment you confirm Paystack.</li>
        </ol>
        <p className="mt-4 text-xs text-ink/50">No hidden tiers. What you see in the editor is what Google indexes — server-rendered HTML for every customer site.</p>
      </section>

      <section aria-labelledby="who-for" className="mt-12">
        <h2 id="who-for" className="font-display text-xl font-extrabold uppercase tracking-tight">Built for Mzansi traders and beauty pros</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">One tool, tailored wording per industry — because a braider's menu (knotless, feed-in, install + curl) isn't a barber's menu (fade levels + beard sculpt).</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Link href="/website-for-salons" className="rounded-2xl border-2 border-ink/10 bg-white p-5 hover:border-ink"><strong className="text-sm">Salons →</strong><p className="mt-1 text-xs text-ink/60">Washes, treatments, colour, bridal — gallery + price menu in one scroll.</p></Link>
          <Link href="/website-for-braiders" className="rounded-2xl border-2 border-ink/10 bg-white p-5 hover:border-ink"><strong className="text-sm">Braiders →</strong><p className="mt-1 text-xs text-ink/60">Length-based pricing, duration estimates, “book via WhatsApp” per style.</p></Link>
          <Link href="/website-for-barbers" className="rounded-2xl border-2 border-ink/10 bg-white p-5 hover:border-ink"><strong className="text-sm">Barbers →</strong><p className="mt-1 text-xs text-ink/60">Fades, shaves, beard work — walk-in hours + chairs.</p></Link>
          <Link href="/website-for-nail-technicians" className="rounded-2xl border-2 border-ink/10 bg-white p-5 hover:border-ink"><strong className="text-sm">Nail technicians →</strong><p className="mt-1 text-xs text-ink/60">Manicures, acrylics, gel, art — sets by design + refill pricing.</p></Link>
        </div>
        <p className="mt-4 text-sm"><Link href="/website-for-small-businesses" className="font-bold underline">Also: plumbers, cleaners, electricians, tutors and other trades →</Link> · For a full comparison see pricing below.</p>
      </section>

      <ComparisonTable />

      <GbpPopiaBlock />

      <section className="mt-12 rounded-2xl bg-ink p-6 text-bone md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Ready to put your WhatsApp on the web?</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone/70">Six templates, phone-first editor, live preview before you pay. Your next customer is already on Google — give them a page worth clicking.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/#demo" className="rounded-full bg-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink">Build free — preview my site</Link>
          <Link href="/#pricing" className="rounded-full border-2 border-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-bone">Pricing — always R149.99/m</Link>
        </div>
      </section>

      <div className="mt-12">
        <Faq
          items={[
            { q: "Do I need a laptop or designer?", a: "No. The editor and your live site are both phone-friendly. Build, preview and publish from your phone — templates provide typography so you don’t need a designer. If you can type your business name, suburb and WhatsApp number, you can create a site." },
            { q: "What counts as a template — and which should I pick?", a: "Six styles ship: Velvet (beauty), Forge (barbershop grit), Savanna (warm earthy), Praxis (clean services), Market (retail), Vital (wellness). Each is a full layout (fonts, colours, sections) optimised for its trade. Preview all six before publishing; you can switch before you pay." },
            { q: "How is R149.99 different from R29 or free builders?", a: "HostAfrica advertises R29.70 for 3 months then R99/mo and 1Grid from R129/mo — those are page-count tiers (10 pages, 35 pages, unlimited). MzansiSite is a single flat R149.99/mo for one clear page with WhatsApp-first setup, hosting, SSL and a MzansiSite subdomain included. Check the comparison table above (verified 22 Oct 2026) for current prices." },
            { q: "Can I use my own .co.za domain?", a: "Every published site gets a subdomain (yoursite.mzansisite.co.za). A custom-domain connector is available in the dashboard after publishing; point your DNS as shown. You keep the subdomain as well." },
            { q: "Will my site show on Google and AI answers?", a: "Customer sites are server-rendered HTML (not hidden behind JS) and linked from the platform — indexable once published. Keep services, hours, prices and suburb mentions fresh. MzansiSite adds canonical, Organization/WebSite/SoftwareApplication and BreadcrumbList structured data — it does not guarantee Google rankings or AI citations; those depend on the search provider." },
            { q: "Do I need a Google Business Profile too?", a: "Yes, separately. Claim your free profile at business.google.com, add category, hours, photos and your MzansiSite link. A complete profile can appear in Maps/local pack within days. MzansiSite does not create your GBP for you." },
          ]}
        />
      </div>
    </SeoPageShell>
  );
}
