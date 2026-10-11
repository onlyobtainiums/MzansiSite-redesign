"use client";

import Link from "next/link";
import MzansiLogo from "@/components/MzansiLogo";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronLeft,
  Clock,
  Globe,
  Loader2,
  MapPin,
  MessageCircle,
  
} from "lucide-react";
import { useAuth } from "@/lib/firebase/AuthProvider";
import { apiFetch } from "@/lib/api-fetch";
import { INDUSTRY_LIST } from "@/templates/industries";
import { TEMPLATES } from "@/templates/registry";
import AccountImageUploader, { type LocalImage } from "@/components/AccountImageUploader";

const EASE = [0.22, 1, 0.36, 1] as const;

const STEPS = ["Industry", "Business info", "Photos", "Socials & review"] as const;
const GALLERY_MAX = 6;
const GALLERY_MAX_BYTES = 8 * 1024 * 1024;
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

export default function NewSiteWizard() {
  const router = useRouter();
  const { user, loading, getToken } = useAuth();

  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState<string | null>(null);
  const [businessName, setBusinessName] = useState("");
  const [tagline, setTagline] = useState("");
  const [area, setArea] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [hours, setHours] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [website, setWebsite] = useState("");
  const [logo, setLogo] = useState<LocalImage[]>([]);
  const [gallery, setGallery] = useState<LocalImage[]>([]);
  const [activity, setActivity] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const template = industry ? TEMPLATES.find((t) => t.id === INDUSTRY_LIST.find((i) => i.key === industry)?.templateId) : null;

  if (!loading && !user) {
    router.replace("/auth");
    return null;
  }

  const validateStep = (): boolean => {
    setError(null);
    if (step === 0 && !industry) return fail("Pick the industry closest to your business.");
    if (step === 1) {
      if (businessName.trim().length < 2) return fail("What's your business called?");
      if (area.trim().length < 2) return fail("Where are you based? e.g. Soweto, Johannesburg");
      if (whatsapp.replace(/\D/g, "").length < 9) return fail("Enter a valid WhatsApp number — it's your booking button.");
    }
    return true;
  };
  const fail = (msg: string) => { setError(msg); return false; };

  const next = () => { if (validateStep()) setStep((s) => Math.min(3, s + 1)); };

  const create = async () => {
    const token = await getToken();
    if (!token || creating) return;
    setCreating(true);
    setError(null);
    try {
      const { res, data } = await apiFetch<{ ok: boolean; site?: unknown; error?: string }>(
        "/api/sites",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            businessName, tagline, industry, area, whatsapp, hours, email,
            logoUrl: logo.find((l) => !l.isLocal)?.url,
            galleryUrls: gallery.filter((g) => !g.isLocal).map((g) => g.url),
            heroImageUrl: gallery.find((g) => !g.isLocal)?.url,
            socials: { instagram, facebook, tiktok, website },
          }),
        },
      );
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Could not create your site.");
      router.replace("/dashboard");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not create your site.");
      setCreating(false);
    }
  };

  const inputCls =
    "w-full rounded-xl border-2 border-ink/12 bg-white px-4 py-3 text-sm font-medium outline-none transition-colors placeholder:text-ink/30 focus:border-ink";
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-ink/50";

  return (
    <div className="grain relative min-h-screen bg-bone text-ink">
      {/* Header */}
      <header className="border-b-2 border-ink/10">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4">
          <Link href="/"><MzansiLogo size={36} wordmark /></Link>
          <Link href="/dashboard" className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink">
            <ChevronLeft className="h-4 w-4" /> Dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 md:py-14">
        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2.5">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full border-2 font-display text-xs font-extrabold transition-all duration-300 ${
                    i < step
                      ? "border-wa bg-wa text-white"
                      : i === step
                        ? "border-ink bg-ink text-bone"
                        : "border-ink/15 text-ink/30"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span className={`hidden text-[11px] font-bold uppercase tracking-[0.14em] sm:block ${i === step ? "text-ink" : "text-ink/35"}`}>
                  {label}
                </span>
                {i < STEPS.length - 1 && <span className="mx-2 hidden h-px w-10 bg-ink/15 md:block lg:w-20" />}
              </div>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ——— STEP 1: Industry ——— */}
          {step === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5, ease: EASE }}>
              <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">What kind of business?</h1>
              <p className="mt-2 text-sm text-ink/55">
                We match you to a purpose-built template.{" "}
                <Link href="/templates" className="font-semibold text-flame underline underline-offset-4">Preview all 6 designs</Link>, then pick.
              </p>
              <div className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {INDUSTRY_LIST.map((ind) => {
                  const t = TEMPLATES.find((tt) => tt.id === ind.templateId);
                  const active = industry === ind.key;
                  return (
                    <button
                      key={ind.key}
                      onClick={() => setIndustry(ind.key)}
                      className={`group flex items-center justify-between rounded-2xl border-2 px-4.5 py-3.5 text-left transition-all duration-300 ${
                        active ? "border-ink bg-ink text-bone shadow-[5px_5px_0_#ff4d00]" : "border-ink/12 bg-white/60 hover:border-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full" style={{ backgroundColor: t?.accent ?? "#888" }} />
                        <div>
                          <p className="text-sm font-bold">{ind.label}</p>
                          <p className={`text-[10px] font-semibold uppercase tracking-[0.12em] ${active ? "text-bone/50" : "text-ink/35"}`}>
                            {t?.name} template
                          </p>
                        </div>
                      </div>
                      {active && <Check className="h-4.5 w-4.5 text-gold" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ——— STEP 2: Business info ——— */}
          {step === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5, ease: EASE }}>
              <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Tell us about <span className="serif-i normal-case text-flame">{businessName.trim() || "your business"}</span>
              </h1>
              {template && (
                <p className="mt-2 text-sm text-ink/55">
                  Template: <span className="font-semibold text-ink">{template.name}</span> — {template.family}
                </p>
              )}
              <div className="mt-8 space-y-5">
                <div>
                  <label className={labelCls}>Business name *</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/30" />
                    <input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Naledi's Braids" className={`${inputCls} pl-11`} maxLength={60} />
                  </div>
                </div>
                <div>
                  <label className={labelCls}>Tagline <span className="text-ink/30">(optional — we&apos;ll write one)</span></label>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Where Soweto gets beautiful." className={inputCls} maxLength={140} />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Area & city *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/30" />
                      <input value={area} onChange={(e) => setArea(e.target.value)} placeholder="Soweto, Johannesburg" className={`${inputCls} pl-11`} maxLength={80} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>WhatsApp number *</label>
                    <div className="relative">
                      <MessageCircle className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/30" />
                      <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="082 123 4567" className={`${inputCls} pl-11`} maxLength={20} inputMode="tel" />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelCls}>Trading hours <span className="text-ink/30">(optional)</span></label>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-ink/30" />
                      <input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="Mon – Sat · 08:00 – 17:00" className={`${inputCls} pl-11`} maxLength={60} />
                    </div>
                  </div>
                  <div>
                    <label className={labelCls}>Email <span className="text-ink/30">(optional)</span></label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hello@business.co.za" className={inputCls} maxLength={120} />
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ——— STEP 3: Photos & logo ——— */}
          {step === 2 && (
            <motion.div key="s2" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5, ease: EASE }}>
              <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Show off your <span className="serif-i normal-case text-flame">work.</span>
              </h1>
              <p className="mt-2 text-sm text-ink/55">
                Upload a logo and up to 6 photos of your business. These appear instantly in your website preview.
              </p>

              {activity && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 flex items-center gap-2 rounded-xl border border-wa/30 bg-wa/10 px-4 py-3 text-sm font-medium text-wa-deep"
                >
                  <Loader2 className="h-4 w-4 animate-spin" /> {activity}
                </motion.p>
              )}

              {/* Logo */}
              <div className="mt-8 rounded-2xl border-2 border-ink/12 bg-white/60 p-6">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">Your logo</p>
                <p className="mb-4 text-xs text-ink/45">Square images work best. We show it in your site navbar and footer.</p>
                <AccountImageUploader
                  kind="logo"
                  images={logo}
                  onChange={setLogo}
                  maxCount={1}
                  maxBytes={LOGO_MAX_BYTES}
                  onActivity={setActivity}
                />
              </div>

              {/* Gallery */}
              <div className="mt-5 rounded-2xl border-2 border-ink/12 bg-white/60 p-6">
                <div className="mb-1 flex items-baseline justify-between">
                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-ink/50">Gallery photos</p>
                  <p className="text-[10px] font-semibold text-ink/40">{gallery.length}/6</p>
                </div>
                <p className="mb-4 text-xs text-ink/45">
                  Your first photo becomes the site cover. Rearrange by dragging; delete to free a slot.
                </p>
                <AccountImageUploader
                  kind="gallery"
                  images={gallery}
                  onChange={setGallery}
                  maxCount={GALLERY_MAX}
                  maxBytes={GALLERY_MAX_BYTES}
                  onActivity={setActivity}
                />
              </div>
            </motion.div>
          )}

          {/* ——— STEP 4: Socials & review ——— */}
          {step === 3 && (
            <motion.div key="s3" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: 0.5, ease: EASE }}>
              <h1 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                Socials, then <span className="serif-i normal-case text-flame">shap shap.</span>
              </h1>
              <p className="mt-2 text-sm text-ink/55">All optional — link the profiles you already run.</p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {[
                  ["Instagram", instagram, setInstagram, "https://instagram.com/yourbiz"],
                  ["Facebook", facebook, setFacebook, "https://facebook.com/yourbiz"],
                  ["TikTok", tiktok, setTiktok, "https://tiktok.com/@yourbiz"],
                  ["Website", website, setWebsite, "https://yourcurrentsite.co.za"],
                ].map(([label, value, set, placeholder]) => (
                  <div key={label as string}>
                    <label className={labelCls}>{label as string}</label>
                    <input
                      value={value as string}
                      onChange={(e) => (set as (v: string) => void)(e.target.value)}
                      placeholder={placeholder as string}
                      className={inputCls}
                      maxLength={200}
                    />
                  </div>
                ))}
              </div>

              {/* Review card */}
              <div className="mt-9 rounded-2xl border-2 border-ink bg-ink p-6 text-bone">
                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
                  <CheckCircle2 className="h-4 w-4" /> Review your site
                </p>
                <div className="mt-4 grid grid-cols-1 gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
                  {[
                    ["Business", businessName],
                    ["Industry", INDUSTRY_LIST.find((i) => i.key === industry)?.label ?? "—"],
                    ["Template", template ? `${template.name} · ${template.family}` : "—"],
                    ["Based in", area],
                    ["WhatsApp", whatsapp],
                    ["Logo", logo.length ? "Uploaded ✓" : "None — letter mark used"],
                    ["Photos", gallery.length ? `${gallery.length} uploaded` : "Design photos for now — upload later"],
                    ["Starter content", "Services & prices prefilled — edit anytime"],
                  ].map(([k, v]) => (
                    <p key={k} className="flex items-baseline justify-between gap-3 border-b border-bone/10 pb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-bone/40">{k}</span>
                      <span className="truncate text-right font-semibold">{v}</span>
                    </p>
                  ))}
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-bone/50">
                  <Globe className="h-4 w-4 text-wa" /> Saved as a free draft · Publish anytime for R149.99/month
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} className="mt-6 rounded-xl border border-flame/40 bg-flame/10 px-4 py-3 text-sm font-medium text-flame-deep">
            {error}
          </motion.p>
        )}

        {/* Footer controls */}
        <div className="mt-10 flex items-center justify-between">
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} className="flex items-center gap-2 rounded-full border-2 border-ink/15 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition-all hover:border-ink">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button onClick={next} className="group flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#ff4d00]">
              Continue <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              onClick={() => void create()}
              disabled={creating}
              className="flex items-center gap-2.5 rounded-full bg-flame px-8 py-4 font-display text-sm font-bold uppercase tracking-[0.14em] text-bone transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-10px_rgba(255,77,0,0.65)] disabled:opacity-60 disabled:hover:translate-y-0"
            >
              {creating ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <CheckCircle2 className="h-4.5 w-4.5" />}
              Create my site — free
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
