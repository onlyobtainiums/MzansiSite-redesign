import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "Website for Trades & Home Services in South Africa — MzansiSite",
  description: "Website for plumbers, electricians, cleaners, garden and home services in South Africa. Services, prices, suburbs and WhatsApp booking. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-small-businesses" },
  openGraph: { url: `${SITE_URL}/website-for-small-businesses`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for trades & home services"
      description=""
      h1="Website for trades & home services — one page that answers before they call"
      intro="Whether you’re a plumber in Polokwane, an electrician in Pretoria, a cleaner in Cape Town or a gardener in Durban, customers want the same thing: what you do, what it costs, where you operate, how to book — without a phone call. MzansiSite is a one-page site (services, prices, suburbs, hours, WhatsApp button) built in ~60 seconds on your phone. Market and Praxis templates suit trades and home services with plain, trustworthy layouts. Free to build, R149.99/m to publish."
      canonicalPath="/website-for-small-businesses"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "Trades & home services", item: `${SITE_URL}/website-for-small-businesses` }]}
    >
      <section aria-labelledby="smallbiz-why">
        <h2 id="smallbiz-why" className="font-display text-2xl font-extrabold uppercase tracking-tight">A site that fits a one-person trade</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">Narrowed to trades and home services (to avoid overlapping with the main builder page which covers all industries). If you’re a tutor, photographer or coach, start at <Link href="/website-builder-south-africa" className="underline">website builder South Africa</Link> and pick the Market/Praxis template from there — same builder, different wording.</p>
        <FeatureGrid items={[
          { title: "Services as you quote them", body: "‘Geyser replacement (labour) R850 · Call-out R350 incl. 30 min · Spares quoted after inspection’ — write it as you speak on the phone; customers arrive aligned." },
          { title: "Area you actually cover", body: "List suburbs/municipalities you drive to (‘Serving Roodepoort, Randburg, Fourways — beyond 15km call-out quoted’). Honest radius avoids wasted trips. Add your Google Business Profile service area separately." },
          { title: "Hours + WhatsApp, not a form", body: "Mon–Sat hours with an ‘Open now — chat on WhatsApp’ label vs ‘Closed — send a message for tomorrow’. No inbox to monitor separately." },
          { title: "Proof without a portfolio", body: "A few phone-shot jobs via Cloudinary are enough — Market tiles them tight; Praxis keeps it spare. Add a one-line guarantee (‘Neat work — payment on completion’) and only use photos you own." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Who this page is for (narrowed — trades & home services)</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">This guide is now focused on trades and home services to remove overlap with the broad <Link href="/website-builder-south-africa" className="underline">website builder South Africa</Link> page. Beauty pros use tailored pages; other professions start from the builder overview.</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm leading-relaxed text-ink/80">
          <li className="rounded-xl bg-bone p-3">🔧 <strong>Trades:</strong> plumbers, electricians, handymen, locksmiths, tillers, painters, pest control — call-out + labour lines. Garden and removals fit here.</li>
          <li className="rounded-xl bg-bone p-3">🍰 <strong>Food & home:</strong> bakers, caterers, cleaners, laundry — per-item or per-room pricing. Garden/pool services included.</li>
        </ul>
        <p className="mt-4 text-sm">Beauty-specific? Jump to <Link href="/website-for-salons" className="underline">salons</Link>, <Link href="/website-for-barbers" className="underline">barbers</Link>, <Link href="/website-for-braiders" className="underline">braiders</Link> or <Link href="/website-for-nail-technicians" className="underline">nail technicians</Link> for wording matched to those menus. Tutors/photographers/creatives → <Link href="/website-builder-south-africa" className="underline">builder overview</Link>.</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">What to write (trades example)</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-ink/10 bg-white p-5">
            <h3 className="text-sm font-bold">About you (two sentences)</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">“Sithole Plumbing in Durban — geysers & leak repair since 2021. Serving Umlazi, Isipingo & Chatsworth, Mon–Sat.” Short, locatable beats a slogan.</p>
          </div>
          <div className="rounded-2xl border-2 border-ink/10 bg-white p-5">
            <h3 className="text-sm font-bold">How booking works</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">“Tap WhatsApp, send address + job. We quote in chat — you say yes, we dispatch today.” Clear steps convert faster than ‘Contact us’.</p>
          </div>
        </div>
      </section>

      <GbpPopiaBlock />

      <div className="mt-12"><Faq items={[
        { q: "I’m a tutor/photographer — is this page for me?", a: "This narrowed page is for trades & home services. Start at website builder South Africa — same builder, same price (R149.99/m), pick Market/Praxis and add per-hour or package rows there. We narrowed to avoid duplicate targeting." },
        { q: "I have no logo — can I still publish?", a: "Yes. Your business name and a phone-shot cover are enough to go live. Templates provide typography so you don’t need a designer. Only publish photos you own." },
        { q: "What if my call-out radius changes?", a: "Edit suburbs in the dashboard — changes are instant and server-rendered, so Google sees the new area on next crawl. Keep your Google Business Profile service area in sync." },
        { q: "Can customers pay on the site?", a: "Your customer CTA is WhatsApp; you handle payment as you already do (EFT, cash, Yoco). Your own MzansiSite subscription is R149.99/m via Paystack — not your client’s payment." },
      ]} /></div>
    </SeoPageShell>
  );
}
