import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "Website for Nail Technicians in South Africa — MzansiSite",
  description: "Nail tech website with sets, refills, art and WhatsApp booking. Prices by shape/length/design. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-nail-technicians" },
  openGraph: { url: `${SITE_URL}/website-for-nail-technicians`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for nail technicians"
      description=""
      h1="Website for nail technicians — sets, art and refills that sell themselves"
      intro="Nails are visual — customers screenshot your art then ask ‘how much for this set?’ MzansiSite gives nail technicians a gallery-forward one-page site with prices by shape, length and design plus a WhatsApp button per look. Vital template is made for nails and lashes with clean grids and soft neutrals. Free to build, R149.99/m to publish."
      canonicalPath="/website-for-nail-technicians"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "Website for nail technicians", item: `${SITE_URL}/website-for-nail-technicians` }]}
    >
      <section aria-labelledby="nail-prices">
        <h2 id="nail-prices" className="font-display text-2xl font-extrabold uppercase tracking-tight">Price the art, not just the acrylic</h2>
        <FeatureGrid items={[
          { title: "Sets by design complexity", body: "‘Acrylic short almond — plain R250 · French +R40 · Chrome/art per nail +R15 · XL +R80’ — rows beat captions. Customers pick length and extras without you pricing in your head late at night." },
          { title: "Refills with timelines", body: "‘GEL refill 2 weeks R150 · 3 weeks R180 · Soak-off + new set R280’. Clear refill windows prevent the ‘can you fix my 6-week set’ surprise." },
          { title: "Gallery as menu", body: "Group your Cloudinary shots by look (French, chrome, 3D) — Vital renders tight squares that double as a pick-list. Caption each with the exact surcharge so screenshots stay shoppable. Only post photos you own with client consent." },
          { title: "Booking that respects your table", body: "Hours Mon–Sat with ‘Open now — WhatsApp to book’ vs ‘Closed — message for tomorrow’. Include ‘Nails at home studio — address on booking’ so you keep privacy until committed." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Wording that avoids rework</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
          <li className="rounded-xl bg-bone p-4"><strong>Aftercare:</strong> “Oil daily, gloves for dishes. Lift within 48h — come back free, not a redo 3 weeks later.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Deposits:</strong> “R50 WhatsApp deposit secures your slot — balance after set. Move once free if 24h notice.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Allergy note:</strong> “Tell us about prior reactions — we can switch base for sensitive clients.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Add-ons:</strong> “Lash clusters, toe acrylic, nail art charms — listed under Services so Google picks them up.”</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Beauty siblings, different pages</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">Also doing hair? Your <Link href="/website-for-salons" className="underline">salon site</Link> and <Link href="/website-for-braiders" className="underline">braider menu</Link> use the same builder but phrased for hair-length pricing; <Link href="/website-for-barbers" className="underline">barbers</Link> focuses on fades. Keep nails here for clarity — customers skim, not study.</p>
        <Link href="/whatsapp-booking-website" className="mt-3 inline-block text-sm font-bold underline">How the WhatsApp button turns a screenshot into a booking →</Link>
      </section>

      <GbpPopiaBlock />

      <div className="mt-12"><Faq items={[
        { q: "Should I list every nail design?", a: "List base sets, then surcharges per technique (‘chrome per nail’, ‘encapsulated art’) — gallery photos fill gaps. Price rows keep quoting fast and make screenshots searchable." },
        { q: "How do I handle walk-ins with a full book?", a: "Be explicit: ‘Appointment only — WhatsApp for next slot’ vs ‘Walk-ins 10:00–14:00’. Your hours line sets expectations before they travel. Update in dashboard anytime." },
        { q: "What about hygiene credibility?", a: "Add plainly: ‘Tools disinfected, liners single-use, hand wash on arrival’. It builds trust without inventing certifications — don’t claim sterilisation certificates you don’t hold." },
        { q: "How do I price male clients fairly?", a: "Only if you serve them — ‘Gel mani (men) R180’ as its own row performs better than vague ‘unisex’. Keep wording factual, no assumptions." },
        { q: "Do I need many Instagram followers to get bookings?", a: "No. Your site link in bio converts existing followers; a Google Business Profile with your suburb and hours brings new local searches. Focus on 10 Google reviews, not 10k followers." },
      ]} /></div>
    </SeoPageShell>
  );
}
