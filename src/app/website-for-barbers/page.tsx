import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";

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
          { title: "Chairs + walk-in hours", body: "‘3 chairs · Walk-ins — Tue–Sat 08:00–18:00 · Sun 09:00–13:00’ — the sentence regulars Screenshot. Add ‘Appointment via WhatsApp’ vs walk-in clearly." },
          { title: "Shop proof over stock photos", body: "Your cuts on your heads — upload via dashboard. Forge frames tight crops of fresh fades; customers trust the chair, not a catalogue." },
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

      <div className="mt-12"><Faq items={[
        { q: "Can I show barber names?", a: "Yes — add a Services-like section (e.g. ‘Barbers: Teboho — fades, Sipho — shaves’). Keep it as plain text so Google reads it, not only an image." },
        { q: "Do you do slot booking?", a: "Your CTA is WhatsApp — customers pick a time in chat and you confirm. No extra fees, no double-booked calendar to manage." },
        { q: "Will Google find my shop?", a: "Published sites are plain HTML with hours, suburb and services — indexable without JavaScript tricks. Keep prices and hours fresh for best coverage." },
      ]} /></div>
    </SeoPageShell>
  );
}
