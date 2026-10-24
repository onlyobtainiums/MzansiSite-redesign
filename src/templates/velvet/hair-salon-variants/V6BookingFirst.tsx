"use client";

import { useMemo, useState } from "react";
import { Check, Clock, Copy, Info, Mail, MapPin, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import type { SiteData } from "@/templates/types";
import { mailLink, telLink, waLink } from "@/templates/types";
import { cn } from "../barber-variants/shared/cn";
import { SmartImage } from "../barber-variants/shared/SmartImage";
import { BrandMark, SamplePill } from "../barber-variants/shared/kit";

const COCOA = "#332217";
const WA = "#1faf57";

const SAMPLE_PHOTOS = [
  { id: "s1", src: "/images/barber-pack/hero-chair.jpg", alt: "Styling chairs and brass-framed mirrors in a sunlit salon interior", sample: true },
  { id: "s2", src: "/images/barber-pack/tools-flatlay.jpg", alt: "Salon scissors, brushes and colour tools arranged on sage linen", sample: true },
  { id: "s3", src: "/images/barber-pack/interior-warm.jpg", alt: "Elegant salon interior with round mirrors and soft lighting", sample: true },
  { id: "s4", src: "/images/barber-pack/products-shelf.jpg", alt: "Salon shelves stocked with hair care products", sample: true },
  { id: "s5", src: "/images/barber-pack/razor-detail.jpg", alt: "Backwash stations and product display in a bright salon", sample: true },
  { id: "s6", src: "/images/barber-pack/pole-street.jpg", alt: "Waiting lounge with leather seating and marble floors", sample: true },
];

const LENGTHS = ["Short", "Medium", "Long"];
const TEXTURES = ["Straight", "Wavy", "Curly", "Coily", "Not sure"];

export default function HairSalonVariant6({ site }: { site: SiteData }) {
  const name = site.businessName || "Your Hair Studio";
  const photos = site.galleryUrls.length
    ? site.galleryUrls.map((url, i) => ({ id: `p${i}`, src: url, alt: `${name} photo ${i + 1}`, sample: false }))
    : SAMPLE_PHOTOS;
  const waDigits = site.whatsapp.replace(/\D/g, "");
  const hasWa = waDigits.length >= 10;

  const [clientName, setClientName] = useState("");
  const [length, setLength] = useState("");
  const [texture, setTexture] = useState("");
  const [service, setService] = useState("");
  const [when, setWhen] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState<{ name?: string; service?: string }>({});
  const [drafted, setDrafted] = useState(false);
  const [copied, setCopied] = useState(false);

  const serviceOptions = useMemo(() => site.services.map((s) => s.name).filter(Boolean), [site.services]);

  const composed = useMemo(() => {
    const lines = [
      `Hi ${name}, new hair enquiry from the website:`,
      `• Name: ${clientName || "—"}`,
      length ? `• Hair length: ${length}` : null,
      texture ? `• Texture: ${texture}` : null,
      service ? `• Interested in: ${service}` : null,
      when ? `• Preferred time: ${when}` : null,
      note ? `• Notes: ${note}` : null,
      "(This is an enquiry — please reply to confirm availability and a final quote.)",
    ].filter(Boolean);
    return lines.join("\n");
  }, [clientName, length, texture, service, when, note, name]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: typeof errors = {};
    if (!clientName.trim()) errs.name = "Please add your name so the studio knows who is asking.";
    if (!service) errs.service = "Choose a service, or “Not sure yet”.";
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(waLink(site.whatsapp, composed), "_blank", "noopener");
    setDrafted(true);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(composed);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy your enquiry:", composed);
    }
  }

  return (
    <div className="@container bg-[#f6f1ea] font-sans text-[#332217]">
      {/* top bar */ }
      <header className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 @md:px-10">
        <p className="flex items-center gap-2.5 text-[15px] font-extrabold tracking-tight">
          <BrandMark logo={site.logoUrl ?? null} name={name} className="h-9 w-9 text-[10px]" />
          {name}
        </p>
        <div className="flex items-center gap-4 text-[12px] font-semibold text-[#332217]/70">
          <span className="hidden @sm:inline">{site.hours || "Add opening hours"}</span>
          {site.phone && (
            <a href={telLink(site.phone)} className="grid h-9 w-9 place-items-center rounded-full border border-[#332217]/25" aria-label="Phone the studio">
              <Phone className="h-4 w-4" />
            </a>
          )}
        </div>
      </header>

      <main className="px-5 pb-14 pt-6 @md:px-10 @md:pt-10">
        <div className="grid gap-10 @lg:grid-cols-[1.05fr_1fr] @lg:items-start">
          {/* contact panel */ }
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-white" style={{ background: COCOA }}>
              <MessageCircle className="h-3.5 w-3.5" aria-hidden /> Hair studio · {site.area || "your area"}
            </p>
            <h1 className="text-[clamp(2.1rem,5.6cqw,4rem)] font-extrabold leading-[1.02] tracking-[-0.02em]">
              Hair consult leads: length, texture, goals.
            </h1>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-[#332217]/70">
              {site.tagline || "Add your one-liner in the editor."} Tell us about your hair and we’ll draft a WhatsApp
              enquiry — the studio confirms by reply.
            </p>

            <div className="mt-8 max-w-md space-y-3">
              {hasWa ? (
                <a
                  href={waLink(site.whatsapp, `Hi ${name}, I'd like to book a hair appointment.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl px-5 py-4 text-white shadow-lg shadow-[#1faf57]/30 transition-transform hover:-translate-y-0.5"
                  style={{ background: WA }}
                >
                  <MessageCircle className="h-6 w-6 shrink-0" aria-hidden />
                  <span>
                    <span className="block text-[15px] font-extrabold">WhatsApp us · {site.whatsapp}</span>
                    <span className="block text-[12px] font-medium text-white/80">Usually the fastest way to reach the studio</span>
                  </span>
                </a>
              ) : (
                <p className="rounded-2xl border-2 border-dashed border-[#332217]/30 px-5 py-4 text-sm font-semibold text-[#332217]/60">
                  Add your WhatsApp number in the editor to switch this button live.
                </p>
              )}
              <div className="grid grid-cols-2 gap-3">
                {site.phone ? (
                  <a href={telLink(site.phone)} className="flex items-center gap-2.5 rounded-2xl border border-[#332217]/25 bg-white px-4 py-3.5 text-[13px] font-bold transition-colors hover:border-[#332217]">
                    <Phone className="h-4 w-4 shrink-0" aria-hidden /> {site.phone}
                  </a>
                ) : (
                  <span className="flex items-center gap-2.5 rounded-2xl border border-dashed border-[#332217]/25 px-4 py-3.5 text-[13px] font-semibold text-[#332217]/50">
                    <Phone className="h-4 w-4" /> Phone not added
                  </span>
                )}
                {site.email ? (
                  <a href={mailLink(site.email)} className="flex items-center gap-2.5 rounded-2xl border border-[#332217]/25 bg-white px-4 py-3.5 text-[13px] font-bold transition-colors hover:border-[#332217]">
                    <Mail className="h-4 w-4 shrink-0" aria-hidden /> Email us
                  </a>
                ) : (
                  <span className="flex items-center gap-2.5 rounded-2xl border border-dashed border-[#332217]/25 px-4 py-3.5 text-[13px] font-semibold text-[#332217]/50">
                    <Mail className="h-4 w-4" /> Email not added
                  </span>
                )}
              </div>
            </div>

            <ul className="mt-7 space-y-2.5 text-[13px] font-semibold text-[#332217]/75">
              <li className="flex items-center gap-2.5"><ShieldCheck className="h-4 w-4" style={{ color: WA }} /> An enquiry is not a confirmed appointment — the studio replies first.</li>
              <li className="flex items-center gap-2.5"><Clock className="h-4 w-4" style={{ color: WA }} /> We answer during shop hours (listed below).</li>
              <li className="flex items-center gap-2.5"><Info className="h-4 w-4" style={{ color: WA }} /> No payment is ever taken through this page.</li>
            </ul>
          </div>

          {/* enquiry form */ }
          <form onSubmit={submit} noValidate className="rounded-2xl border border-[#332217]/15 bg-white p-6 shadow-[0_24px_60px_-30px_rgba(51,34,23,0.4)] @md:p-8">
            <h2 className="text-xl font-extrabold tracking-tight">Hair consult enquiry</h2>
            <p className="mt-1 text-[12.5px] text-[#332217]/60">
              Fill this in and we’ll open WhatsApp with your message drafted. Nothing sends until you press send.
            </p>

            <label className="mt-6 block">
              <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Your name *</span>
              <input
                value={clientName}
                onChange={(e) => { setClientName(e.target.value); if (errors.name) setErrors({ ...errors, name: undefined }); }}
                placeholder="e.g. Zola M."
                className={cn("w-full rounded-xl border bg-[#f6f1ea] px-4 py-3 text-sm outline-none transition-colors focus:border-[#1faf57]", errors.name ? "border-red-400" : "border-[#332217]/20")}
                aria-invalid={!!errors.name}
              />
              {errors.name && <span className="mt-1 block text-[12px] font-semibold text-red-600">{errors.name}</span>}
            </label>

            <fieldset className="mt-5">
              <legend className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Service *</legend>
              <div className="flex flex-wrap gap-2">
                {[...serviceOptions, "Not sure yet"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={service === s}
                    onClick={() => { setService(s); if (errors.service) setErrors({ ...errors, service: undefined }); }}
                    className={cn(
                      "rounded-full border px-3.5 py-1.5 text-[12.5px] font-bold transition-colors",
                      service === s ? "border-transparent text-white" : "border-[#332217]/25 text-[#332217]/75 hover:border-[#332217]",
                    )}
                    style={service === s ? { background: COCOA } : undefined}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.service && <span className="mt-1 block text-[12px] font-semibold text-red-600">{errors.service}</span>}
            </fieldset>

            <div className="mt-5 grid gap-3 @md:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Hair length</span>
                <div className="flex flex-wrap gap-2">
                  {LENGTHS.map((l) => (
                    <button
                      key={l}
                      type="button"
                      aria-pressed={length === l}
                      onClick={() => setLength(l)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[12px] font-bold transition-colors",
                        length === l ? "border-transparent text-white" : "border-[#332217]/25 text-[#332217]/75 hover:border-[#332217]",
                      )}
                      style={length === l ? { background: COCOA } : undefined}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Hair texture</span>
                <div className="flex flex-wrap gap-2">
                  {TEXTURES.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={texture === t}
                      onClick={() => setTexture(t)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-[12px] font-bold transition-colors",
                        texture === t ? "border-transparent text-white" : "border-[#332217]/25 text-[#332217]/75 hover:border-[#332217]",
                      )}
                      style={texture === t ? { background: COCOA } : undefined}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </label>
            </div>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Preferred day &amp; time (optional)</span>
              <input
                value={when}
                onChange={(e) => setWhen(e.target.value)}
                placeholder="e.g. Saturday morning, after 10"
                className="w-full rounded-xl border border-[#332217]/20 bg-[#f6f1ea] px-4 py-3 text-sm outline-none transition-colors focus:border-[#1faf57]"
              />
            </label>

            <label className="mt-5 block">
              <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#332217]/70">Anything else? (optional)</span>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="Reference photo? Questions about colour maintenance?"
                className="w-full resize-none rounded-xl border border-[#332217]/20 bg-[#f6f1ea] px-4 py-3 text-sm outline-none transition-colors focus:border-[#1faf57]"
              />
            </label>

            {hasWa ? (
              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-4 text-[15px] font-extrabold text-white transition-transform hover:-translate-y-0.5"
                style={{ background: WA }}
              >
                <Send className="h-4 w-4" aria-hidden /> Draft my WhatsApp enquiry
              </button>
            ) : (
              <p className="mt-6 rounded-xl border-2 border-dashed border-[#332217]/30 px-4 py-3.5 text-center text-[13px] font-semibold text-[#332217]/60">
                The studio needs a WhatsApp number before this form can send — add one in the editor.
              </p>
            )}
            <button type="button" onClick={copy} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#332217]/20 px-5 py-3 text-[13px] font-bold text-[#332217]/75 transition-colors hover:border-[#332217]">
              {copied ? <Check className="h-4 w-4 text-[#1faf57]" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied to clipboard" : "Copy enquiry text instead"}
            </button>

            {drafted && (
              <p role="status" className="mt-4 flex items-start gap-2.5 rounded-xl bg-[#1faf57]/12 px-4 py-3 text-[12.5px] font-semibold leading-relaxed text-[#332217]">
                <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: WA }} />
                WhatsApp opened with your enquiry drafted. Press send there — and remember, the studio
                confirms your time by reply. Nothing is booked yet.
              </p>
            )}
          </form>
        </div>

        {/* proof band */ }
        {photos.length > 0 && (
          <div className="mt-14">
            <div className="mb-4 flex items-center gap-3">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#332217]/60">Inside the studio</p>
              {photos.some((p) => p.sample) && <SamplePill label="Sample photos" />}
            </div>
            <div className="grid grid-cols-2 gap-3 @md:grid-cols-4">
              {photos.slice(0, 4).map((p) => (
                <SmartImage key={p.id} src={p.src} alt={p.alt} className="aspect-[4/3] w-full rounded-xl" />
              ))}
            </div>
          </div>
        )}

        {/* info tiles */ }
        <div className="mt-14 grid gap-4 @md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#332217]/60">
              <Clock className="h-4 w-4" /> Shop hours
            </p>
            <ul className="space-y-2">
              {site.hours ? (
                site.hours.split(/ · |\n/).map((row, i) => {
                  const parts = row.trim().split(/\s{2,}|(?<=[a-zA-Z])\s+(?=\d)/);
                  const label = parts.length >= 2 ? parts[0].trim() : row.trim();
                  const value = parts.length >= 2 ? parts.slice(1).join(" ").trim() : "";
                  return (
                    <li key={i} className="flex justify-between gap-4 text-sm">
                      <span className="font-bold">{label}</span>
                      <span className="text-[#332217]/70">{value || "—"}</span>
                    </li>
                  );
                })
              ) : null}
            </ul>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#332217]/60">
              <MapPin className="h-4 w-4" /> Where to sit
            </p>
            <p className="text-sm font-bold">{site.area || "Add your address"}</p>
            <p className="text-sm text-[#332217]/70">{site.area || "Your area"}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.area} ${site.area}`)}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-extrabold underline decoration-[#1faf57] decoration-2 underline-offset-4"
            >
              Get directions
            </a>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <p className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#332217]/60">
              Services <SamplePill label="Sample prices" />
            </p>
            <ul className="space-y-2">
              {site.services.slice(0, 4).map((s) => (
                <li key={s.name} className="flex justify-between gap-4 text-sm">
                  <span className="font-bold">{s.name}</span><span className="text-[#332217]/70">{s.price}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[12px] text-[#332217]/55">Full menu shared on enquiry.</p>
          </div>
        </div>
      </main>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#332217]/12 px-5 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#332217]/50 @md:px-10">
        <span>{name}</span>
        <span>Design: Vital · MzansiSite demo — enquiries are not confirmed appointments</span>
      </footer>
    </div>
  );
}
