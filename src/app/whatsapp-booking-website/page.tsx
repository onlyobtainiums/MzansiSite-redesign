import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo";
import { SeoPageShell, FeatureGrid, Faq } from "@/components/SeoPageShell";
import { GbpPopiaBlock } from "@/components/SeoHelpers";

export const metadata: Metadata = {
  title: "WhatsApp Booking Website — Book from WhatsApp | MzansiSite",
  description: "Add a WhatsApp booking button to your South African business website. Tap-to-chat, pre-filled messages, hours-aware labels. Free to build, R149.99/m to publish.",
  alternates: { canonical: "/whatsapp-booking-website" },
  openGraph: { url: `${SITE_URL}/whatsapp-booking-website`, type: "website" },
};

export default function Page() {
  return (
    <SeoPageShell
      title="WhatsApp booking website"
      description=""
      h1="WhatsApp booking website — your DM becomes your checkout"
      intro="South Africans book on WhatsApp — not email forms. MzansiSite turns your profile link into a proper site: services, prices, hours and a big tap-to-chat button that pre-fills ‘Hi, I'd like to book…’ plus the service name. Hours-aware labels (‘Open now — chat on WhatsApp’ vs ‘Closed — leave a message’) set expectations before they tap. Works on any South African number, free to build, R149.99/m to publish."
      canonicalPath="/whatsapp-booking-website"
      breadcrumb={[{ name: "Home", item: `${SITE_URL}/` }, { name: "WhatsApp booking website", item: `${SITE_URL}/whatsapp-booking-website` }]}
    >
      <section aria-labelledby="wa-how">
        <h2 id="wa-how" className="font-display text-2xl font-extrabold uppercase tracking-tight">How the WhatsApp booking button works</h2>
        <FeatureGrid items={[
          { title: "Tap-to-chat link", body: "We build a wa.me link from your number (e.g. 082 123 4567 → wa.me/27821234567) with a message template you set in the editor. No API, no BSP fees — it's the same WhatsApp you already use." },
          { title: "Pre-filled by service", body: "Every service row can deep-link separately: ‘Hi Zama, I'd like to book Knotless waist — Sat 10am?’ — so you know what they want before ‘hi’." },
          { title: "Hours-aware wording", body: "Your listed Mon–Sun hours drive the label: ‘Open now — 08:00–18:00 · Chat on WhatsApp’ vs ‘Closed — message us for tomorrow’. No false urgency." },
          { title: "Server-rendered, fast on mobile", body: "Your page is plain HTML (not hidden behind JS overlays) — Google reads the hours, prices and number; customers on mid-range data still load the chat button first." },
        ]} />
      </section>

      <section className="mt-12 rounded-2xl border-2 border-ink bg-white p-6 md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Setup in the editor (no BSP needed)</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-ink/80">
          <li>Enter your WhatsApp number (South African mobile, e.g. 0 7x/8x …). We strip spaces and add the +27 country code to the link — customers never see raw formatting.</li>
          <li>Write your default message: “Hi, I'd like to book [service] on [date] at [time].” The builder inserts the service name when they tap from a row.</li>
          <li>Set hours (Mon–Sun) — the page badge flips between open/closed automatically; update anytime.</li>
          <li>Publish to yoursite.mzansisite.co.za — your button is live; test it from a real phone before you share the link on Instagram/bio. Add your Google Business Profile link for Maps.</li>
        </ol>
        <p className="mt-4 text-xs text-ink/50">You close the sale in WhatsApp — MzansiSite doesn't take a commission or intermediate the chat. No BSP API needed; this is a tap-to-chat link, not an automated bot.</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Who benefits most</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink/70">Any business where quoting and scheduling happen in chat — which on Mzansi is most of them. Beauty pros (see <Link href="/website-for-salons" className="underline">salons</Link>, <Link href="/website-for-braiders" className="underline">braiders</Link>, <Link href="/website-for-nail-technicians" className="underline">nail technicians</Link>, <Link href="/website-for-barbers" className="underline">barbers</Link>) close faster when every price row has its own pre-filled WhatsApp prompt. Traders and home services (<Link href="/website-for-small-businesses" className="underline">trades & home services</Link>) use the same pattern with call-out or per-hour lines. See the <Link href="/website-builder-south-africa" className="underline">South African builder overview</Link> for the full offer.</p>
      </section>

      <section className="mt-12 rounded-2xl bg-ink p-6 text-bone md:p-8">
        <h2 className="font-display text-xl font-extrabold uppercase tracking-tight">Turn “DM for bookings” into a bookable page</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-bone/70">Stop answering ‘where are you / what do you charge’ ten times a day. Answer once, on a page Google and AI search can actually read.</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link href="/#demo" className="rounded-full bg-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-ink">Add WhatsApp to my site — free</Link>
          <Link href="/#pricing" className="rounded-full border-2 border-bone px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] text-bone">R149.99/m — publish when ready</Link>
        </div>
      </section>

      <GbpPopiaBlock />

      <div className="mt-12"><Faq items={[
        { q: "Do customers need WhatsApp Business to book?", a: "They need WhatsApp (personal or Business) — the link opens whichever they have. You can use Business features on your side, but it's not required. No BSP or API setup." },
        { q: "Is this different from booking apps like Booklink or Fresha?", a: "Yes. Booklink (from R79/mo) and Fresha are booking calendars with reminders. MzansiSite is a website with a WhatsApp button — customers choose a service and message you. Use both if you need a calendar: link your booking app in the MzansiSite description." },
        { q: "Can I track where chats come from?", a: "Add UTM params to your share link (e.g. ?utm_source=instagram). GA4 in MzansiSite fires a whatsapp_booking_click event so you see the source in Analytics alongside the chat — never including phone or personal data." },
        { q: "What about POPIA and client data?", a: "You're still the responsible party — only collect what you need in chat and keep personal data off the public page. Don't publish clients' phone numbers, addresses or IDs on the site. See POPIA note above." },
        { q: "Will this work during load-shedding?", a: "Edit your hours in the dashboard when power/water affects you; the open/closed badge updates instantly. Customers see ‘Closed — message for tomorrow’ instead of calling a dead line." },
      ]} /></div>
    </SeoPageShell>
  );
}
