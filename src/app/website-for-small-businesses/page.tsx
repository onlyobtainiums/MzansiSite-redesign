import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";

export const metadata: Metadata = {
  title: "Website for Small Businesses in South Africa — MzansiSite",
  description: "Small business website with services, prices, location and WhatsApp booking. Traders, cleaners, tutors, photographers and more. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-small-businesses" },
  openGraph: { url: `${SITE_URL}/website-for-small-businesses`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for small businesses"
      description=""
      h1="Website for small businesses — one page that answers before they call"
      intro="Whether you're a plumber in Polokwane, a tutor in Pretoria or a baker in Paarl, customers want the same thing: what you do, what it costs, where you operate, how to book — without a phone call. MzansiSite is a one-page site (services, prices, location, hours, WhatsApp button) built in ~60 seconds on your phone. Market and Praxis templates suit trades and services with plain, trustworthy layouts. Free to build, R149.99/m to publish."
      canonicalPath="/website-for-small-businesses"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "Website for small businesses", item: `${SITE_URL}/website-for-small-businesses` }]}
    >
      <section aria-labelledby="smallbiz-why">
        <h2 id="smallbiz-why" className="font-display text-2xl font-extrabold uppercase tracking-tight">A site that fits a one-person business</h2>
        <FeatureGrid items={[
          { title: "Services as you quote them", body: "‘Geyser replacement (labour) R850 · Call-out R350 incl. 30 min · Spares quoted after inspection’ — write it as you speak on the phone; customers arrive aligned." },
          { title: "Area you actually cover", body: "List suburbs/municipalities you drive to (‘Serving Roodepoort, Randburg, Fourways — beyond 15km call-out quoted’). Honest radius avoids wasted trips." },
          { title: "Hours + WhatsApp, not a form", body: "Mon–Sat hours with an ‘Open now — chat on WhatsApp’ label vs ‘Closed — send a message for tomorrow’. No inbox to monitor separately." },
          { title: "Proof without a portfolio site", body: "A few phone-shot jobs via Cloudinary are enough — Market tiles them tight; Praxis keeps it spare. Add a one-line guarantee (‘Neat work — payment on completion’)." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Who this page is for</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink/70">MzansiSite suits any small business where the sale starts in chat — then a human closes. Beauty pros get tailored pages; here we mean everyone else:</p>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 text-sm leading-relaxed text-ink/80">
          <li className="rounded-xl bg-bone p-3">🔧 <strong>Trades:</strong> plumbers, electricians, handymen, locksmiths, tillers, painters, pest control — call-out + labour lines.</li>
          <li className="rounded-xl bg-bone p-3">🍰 <strong>Food & home:</strong> bakers, caterers, cleaners, laundry, garden, removals — per-item or per-room pricing.</li>
          <li className="rounded-xl bg-bone p-3">🎓 <strong>Skills:</strong> tutors, driving schools, music teachers, coaches, translators — per-hour rates + availability table.</li>
          <li className="rounded-xl bg-bone p-3">📸 <strong>Creative:</strong> photographers, decorators, DJs/MCs, makeup artists, tailors — packages (bronze/silver) + WhatsApp brief.</li>
        </ul>
        <p className="mt-4 text-sm">Beauty-specific? Jump to <Link href="/website-for-salons" className="underline">salons</Link>, <Link href="/website-for-barbers" className="underline">barbers</Link>, <Link href="/website-for-braiders" className="underline">braiders</Link> or <Link href="/website-for-nail-technicians" className="underline">nail technicians</Link> for wording matched to those menus.</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">What to write</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-ink/10 bg-white p-5">
            <h3 className="text-sm font-bold">About you (two sentences)</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">“Sithole Tutoring in Durban — maths & physics Grade 8–12, since 2021. Lessons in Umlazi or online, afternoons & Saturdays.” Short, locatable beats a slogan.</p>
          </div>
          <div className="rounded-2xl border-2 border-ink/10 bg-white p-5">
            <h3 className="text-sm font-bold">How booking works</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">“Tap WhatsApp, send address + job. We quote in chat — you say yes, we dispatch today.” Clear steps convert faster than ‘Contact us’.</p>
          </div>
        </div>
      </section>

      <div className="mt-12"><Faq items={[
        { q: "I have no logo — can I still publish?", a: "Yes. Your business name and a phone-shot cover are enough to go live. Templates provide typography so you don't need a designer." },
        { q: "What if my prices change often?", a: "Edit anytime in the dashboard — changes are instant and server-rendered, so Google sees the new price on next crawl." },
        { q: "Can customers pay on the site?", a: "Your customer CTA is WhatsApp; you handle payment as you already do (EFT, cash, Yoco). Your own MzansiSite subscription is R149.99/m via Paystack." },
      ]} /></div>
    </SeoPageShell>
  );
}
