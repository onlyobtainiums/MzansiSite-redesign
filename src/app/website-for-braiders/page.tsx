import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";

export const metadata: Metadata = {
  title: "Website for Braiders in South Africa — MzansiSite",
  description: "Braider website with length-based pricing, durations and WhatsApp booking. Knotless, cornrows, feed-in, installs. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/website-for-braiders" },
  openGraph: { url: `${SITE_URL}/website-for-braiders`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="Website for braiders"
      description=""
      h1="Website for braiders — length, time and price on one page"
      intro="No one books braids without knowing length, duration and total — your DMs prove it. MzansiSite gives braiders a one-page site where every style lists length, time and price (e.g. Knotless waist — 4.5 hrs — R850) and a WhatsApp button that pre-fills the style name. Velvet and Savanna templates suit hair with warm photography and airy price tables. Free to build, R149.99/m to publish."
      canonicalPath="/website-for-braiders"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "Website for braiders", item: `${SITE_URL}/website-for-braiders` }]}
    >
      <section aria-labelledby="braid-menu">
        <h2 id="braid-menu" className="font-display text-2xl font-extrabold uppercase tracking-tight">The menu that stops the ‘how much?’ ping-pong</h2>
        <FeatureGrid items={[
          { title: "Style × length × price", body: "‘Knotless shoulder R550 (3h) · Mid-back R700 (4h) · Waist R850 (5h)’ — three columns, no mystery. Customers add extensions and choose a date in WhatsApp without you retyping the menu ten times a day." },
          { title: "Installs + curl vs straight", body: "List variants as rows: ‘Feed-in 6 cornrows R280 · With curly ends +R80’. Plain text keeps it searchable and comparable." },
          { title: "Calendar honesty", body: "Hours Mon–Sat, closed Sunday — plus a note: ‘DM before 17:00 for next-day braids’. Auto ‘open/closed’ badge on your WhatsApp CTA matches your stated hours." },
          { title: "Texture-accurate photos", body: "Show your hands' work — tight close-ups, not over-edited stock — uploaded via dashboard. Savanna's warm crop suits coily and braided textures." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Copy you can paste</h2>
        <ul className="mt-4 grid gap-4 md:grid-cols-2 text-sm leading-relaxed">
          <li className="rounded-xl bg-bone p-4"><strong>Policy:</strong> “50% WhatsApp deposit secures date — balance on completion. Free reschedule 24h ahead.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>What to bring:</strong> “Washed & detangled, no product. Extensions included unless listed ‘+ extensions’.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Location:</strong> “Home studio in Berea — address shared after booking. Mobile in Durban North Fridays.”</li>
          <li className="rounded-xl bg-bone p-4"><strong>Duration guard:</strong> “Times are estimates — thick/long hair may add 30 min. We confirm in chat before you come.”</li>
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">More than braids</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">Do frontals/closures, ponytails or natural hair treatments alongside braids? Add them as extra services — same price-row pattern. Running a full salon, not only braids, fits better on the <Link href="/website-for-salons" className="underline">salons page</Link>; doing beard-and-fade next door belongs on <Link href="/website-for-barbers" className="underline">barbers</Link>.</p>
        <Link href="/whatsapp-booking-website" className="mt-4 inline-block text-sm font-bold underline">How the WhatsApp button pre-fills style + price →</Link>
      </section>

      <div className="mt-12"><Faq items={[
        { q: "Can I hide prices until they message?", a: "You can, but you'll get fewer qualified chats. Showing R-counts filters window-shoppers and shortens your closing time." },
        { q: "How do I list ‘price from…’ fairly?", a: "Use ‘From R550 (shoulder, extensions incl.)’ and explain variables (length, thickness, add-on curl) in the line below. Honest ranges perform better than ‘DM for price’." },
        { q: "Will my site work on cheap data?", a: "Your published page is light HTML — not a heavy app — so it loads and chats on mid-range phones and data. Images are optimised via Cloudinary." },
      ]} /></div>
    </SeoPageShell>
  );
}
