import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "Website for Barbers in South Africa — MzansiSite",
  description: "Barbershop website with fades, shaves, beard services, chair hours and WhatsApp booking. Forge template for bold barbers. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-barbers" },
  openGraph: { url: `${SITE_URL}/website-for-barbers`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for barbers"
      description=""
      h1="Website for barbers — fades up front, booking one tap away"
      intro="Barbers win on walk-ins and regulars — your site just has to answer ‘what's the fade cost, are you open, how do I get there?’ in one glance. MzansiSite gives your shop a sharp single-page site with services, prices, chair hours and a WhatsApp button. Forge template was made for barbershops: bold type, dark tones, chair-first layout. Free to build, R149.99/m to publish."
      canonicalPath="/website-for-barbers"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "Website for barbers", item: `${SITE_URL}/website-for-barbers` }]}
    >
      <section aria-labelledby="barber-prices">
        <h2 id="barber-prices" className="font-display text-2xl font-extrabold uppercase tracking-tight">Price the way barbers actually price</h2>
        <FeatureGrid items={[
          { title: "Fades by level", body: "Skin fade R120, mid fade R100, taper R90 — list them as rows, not paragraphs. Customers self-select and arrive knowing the price." },
          { title: "Beard & shave as add-ons", body: "Cut + beard sculpt R150, hot-towel shave R120, line-up R50. Show bundles so regulars can pick the usual in two taps." },
          { title: "Chairs + walk-in hours", body: "‘3 chairs · Walk-ins — Tue–Sat 08:00–18:00 · Sun 09:00–13:00’ — the sentence regulars screenshot. Add ‘Appointment via WhatsApp’ vs walk-in clearly." },
          { title: "Shop proof over stock photos", body: "Your cuts on your heads — upload via dashboard. Only publish photos you own; ask clients before posting. Forge frames tight crops of fresh fades." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">What to put on your page</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
          <li className="rounded-xl bg-bone p-4"><strong>Services:</strong> Cut, fade, beard trim/shave, kids, enhancements. One price each — update in dashboard anytime.</li>
          <li className="rounded-xl bg-bone p-4"><strong>Hours that close deals:</strong> “Open now — Tap WhatsApp to hold a chair” vs “Closed — DM us for tomorrow” (auto-labelled by your listed hours).</li>
          <li className="rounded-xl bg-bone p-4"><strong>Suburbs you draw from:</strong> e.g. Braamfontein, Auckland Park, Parktown — short list, honest radius. Helps ‘barber near me’ discovery.</li>
          <li className="rounded-xl bg-bone p-4"><strong>House rule:</strong> “No appointments? We seat walk-ins by queue — WhatsApp to ask current wait.”</li>
        </ul>
        <p className="mt-4 text-sm">Salon overlap? <Link href="/website-for-salons" className="underline">Salons page</Link> covers colour/bridal, <Link href="/website-for-braiders" className="underline">Braiders</Link> covers installs — barbers stay focused on cuts.</p>
      </section>

      <section className="mt-12 rounded-2xl bg-ink p-6 text-bone md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">A page your regulars save to their home screen</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone/70">Server-rendered, mobile-fast, WhatsApp-native. Build on your phone before the next customer sits down.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/#demo" className="rounded-full bg-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink">Start my barber site — free</Link>
          <Link href="/website-builder-south-africa" className="rounded-full border-2 border-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-bone">How MzansiSite works</Link>
        </div>
      </section>

      <GbpPopiaBlock />

      <div className="mt-12"><Faq items={[
        { q: "Walk-ins vs WhatsApp bookings — which should I push?", a: "Push both. List ‘Walk-ins welcome — queue at shop’ and ‘WhatsApp to hold a chair’ as two rows. Regulars will tap to check wait time instead of calling; walk-ins still see you’re open." },
        { q: "Can I show barber names and chair count?", a: "Yes — add a plain-text line: ‘Barbers: Teboho — fades, Sipho — shaves · 3 chairs’. Keep it as text (not only an image) so Google reads it for ‘barber near me’." },
        { q: "How do I reduce no-shows without a booking app?", a: "Add to your policy: ‘WhatsApp to confirm 1 hour before — unconfirmed chair released’. It’s free, SA-standard, and respects POPIA (only message people who booked)." },
        { q: "Do you do slot booking or calendars?", a: "Your CTA is WhatsApp — customers pick a time in chat and you confirm. No extra fees, no double-booked calendar to manage. If you need deposits, handle them in chat as you already do." },
        { q: "Will Google find my shop if I’m in a township?", a: "Yes if your hours, suburb and services are plain text and your Google Business Profile is claimed at business.google.com with the same details. Keep updates weekly." },
      ]} /></div>
    </SeoPageShell>
  );
}
