"use client";

import { useState } from "react";
import type { SiteData } from "@/templates/types";
import { getDemoSiteData } from "@/templates/demo-data";

/* ——— Plumber (forge) — V1 is the base Flow component ——— */
import Plumber from "@/templates/forge/plumber";
import PlumberV2ServicesFirst from "@/templates/forge/variants/plumber/V2ServicesFirst";
import PlumberV3TrustFirst from "@/templates/forge/variants/plumber/V3TrustFirst";
import PlumberV4GalleryFirst from "@/templates/forge/variants/plumber/V4GalleryFirst";
import PlumberV5AboutFirst from "@/templates/forge/variants/plumber/V5AboutFirst";
import PlumberV6BookingFirst from "@/templates/forge/variants/plumber/V6BookingFirst";

/* ——— Barber (velvet) ——— */
import BarberVariant1 from "@/templates/velvet/barber-variants/Variant1";
import BarberVariant2 from "@/templates/velvet/barber-variants/Variant2";
import BarberVariant3 from "@/templates/velvet/barber-variants/Variant3";
import BarberVariant4 from "@/templates/velvet/barber-variants/Variant4";
import BarberVariant5 from "@/templates/velvet/barber-variants/Variant5";
import BarberVariant6 from "@/templates/velvet/barber-variants/Variant6";

/* ——— Hair Salon (velvet) — V1 is Hero-First ——— */
import HairSalonV1HeroFirst from "@/templates/velvet/hair-salon-variants/V1HeroFirst";
import HairSalonV2ServicesFirst from "@/templates/velvet/hair-salon-variants/V2ServicesFirst";
import HairSalonV3TrustFirst from "@/templates/velvet/hair-salon-variants/V3TrustFirst";
import HairSalonV4GalleryFirst from "@/templates/velvet/hair-salon-variants/V4GalleryFirst";
import HairSalonV5AboutFirst from "@/templates/velvet/hair-salon-variants/V5AboutFirst";
import HairSalonV6BookingFirst from "@/templates/velvet/hair-salon-variants/V6BookingFirst";

type IndustryKey = "plumber" | "barber" | "hairSalon";
type VariantKey = 1 | 2 | 3 | 4 | 5 | 6;

interface IndustryDef {
  key: IndustryKey;
  label: string;
  template: "forge" | "velvet";
  components: Record<VariantKey, React.ComponentType<{ site: SiteData }>>;
  description: string;
}

const industries: IndustryDef[] = [
  {
    key: "plumber",
    label: "Plumber",
    template: "forge",
    description:
      "Forge — Flow (water-inspired, booking-centred). Deep blue + teal, rounded soft shapes.",
    components: {
      1: Plumber,
      2: PlumberV2ServicesFirst,
      3: PlumberV3TrustFirst,
      4: PlumberV4GalleryFirst,
      5: PlumberV5AboutFirst,
      6: PlumberV6BookingFirst,
    },
  },
  {
    key: "barber",
    label: "Barber",
    template: "velvet",
    description:
      "Velvet — Executive (charcoal + brass). Skin fades, beard sculpting, clean shaves.",
    components: {
      1: BarberVariant1,
      2: BarberVariant2,
      3: BarberVariant3,
      4: BarberVariant4,
      5: BarberVariant5,
      6: BarberVariant6,
    },
  },
  {
    key: "hairSalon",
    label: "Hair Salon",
    template: "velvet",
    description:
      "Velvet — Hero-First (cream + gold). Editorial luxe, arched photography, treatment menu.",
    components: {
      1: HairSalonV1HeroFirst,
      2: HairSalonV2ServicesFirst,
      3: HairSalonV3TrustFirst,
      4: HairSalonV4GalleryFirst,
      5: HairSalonV5AboutFirst,
      6: HairSalonV6BookingFirst,
    },
  },
];

const variantLabels: Record<VariantKey, string> = {
  1: "V1 — Default (fallback)",
  2: "V2 — Services-First",
  3: "V3 — Trust-First",
  4: "V4 — Gallery-First",
  5: "V5 — About-First",
  6: "V6 — Booking-First",
};

const VARIANT_KEYS: VariantKey[] = [1, 2, 3, 4, 5, 6];

export function VariantClient() {
  const [industryKey, setIndustryKey] = useState<IndustryKey>("plumber");
  const [variant, setVariant] = useState<VariantKey>(1);
  const [view, setView] = useState<"desktop" | "mobile">("desktop");

  const industry = industries.find((i) => i.key === industryKey)!;
  const VariantComponent = industry.components[variant];
  const isMobile = view === "mobile";

  const site = getDemoSiteData({
    industry: industryKey,
    isDemo: true,
  }) as SiteData;

  return (
    <div className="min-h-screen bg-[#0f172a] text-[#f8fafc] font-sans">
      {/* Dev-only banner — active production protection, not a hidden link */}
      <div className="bg-[#ea580c]/10 border border-[#ea580c]/30 px-4 py-3">
        <div className="mx-auto max-w-6xl flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#ea580c]">
          <span className="flex items-center gap-1">⚠</span>
          DEV-ONLY INDUSTRY VARIANT COMPARISON — 404 IN PRODUCTION
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6">
        {/* Industry selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {industries.map((ind) => (
            <button
              key={ind.key}
              onClick={() => {
                setIndustryKey(ind.key);
                setVariant(1);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all border ${
                industryKey === ind.key
                  ? "bg-[#ea580c] text-[#0f172a] border-[#ea580c] shadow-[0_0_0_4px_rgba(234,88,12,0.3)]"
                  : "bg-[#1e293b] text-[#cbd5e1] border-[#334155]/50 hover:border-[#ea580c]/50 hover:text-[#f8fafc]"
              }`}
            >
              {ind.label}
            </button>
          ))}
        </div>

        {/* Industry info */}
        <div className="mb-8 p-6 bg-[#1e293b] border border-[#334155] rounded-none">
          <h2 className="text-xl font-display font-extrabold tracking-tight uppercase mb-2">
            {industry.label} — V{variant} {variantLabels[variant]}
          </h2>
          <p className="text-sm leading-relaxed text-[#94a3b8]">
            {industry.description}
          </p>
          <p className="mt-3 text-[10px] font-bold tracking-[0.2em] text-[#ea580c] uppercase">
            Business data: {site.businessName} · {site.area} · {site.hours} ·
            WhatsApp: {site.whatsapp} · isDemo: {String(site.isDemo)}
          </p>
          <p className="mt-2 text-[10px] text-[#64748b]">
            Variant {variant} selected. V1 is the default fallback when
            designVariant is undefined; the Template dispatch preserves this
            for all three industries.
          </p>
        </div>

        {/* Variant selector */}
        <div className="flex flex-wrap gap-2 mb-6">
          {VARIANT_KEYS.map((v) => (
            <button
              key={v}
              onClick={() => setVariant(v)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.14em] transition-all border ${
                variant === v
                  ? "bg-[#ea580c] text-[#0f172a] border-[#ea580c] shadow-[0_0_0_4px_rgba(234,88,12,0.3)]"
                  : "bg-[#1e293b] text-[#cbd5e1] border-[#334155]/50 hover:border-[#ea580c]/50 hover:text-[#f8fafc]"
              }`}
            >
              {variantLabels[v]}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="flex gap-3 mb-6">
          {["desktop", "mobile"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v as "desktop" | "mobile")}
              className={`px-4 py-2 rounded-none text-xs font-bold uppercase tracking-[0.14em] transition-all border ${
                view === v
                  ? "bg-[#ea580c] text-[#0f172a] border-[#ea580c]"
                  : "bg-[#1e293b] text-[#cbd5e1] border-[#334155]/50"
              }`}
            >
              {v.charAt(0).toUpperCase() + v.slice(1)} view
            </button>
          ))}
        </div>

        {/* Variant rendering */}
        <div
          className={`relative min-h-[800px] ${
            isMobile ? "mx-auto max-w-xs" : "mx-auto max-w-6xl"
          } border border-[#334155] bg-[#1e293b] overflow-hidden`}
        >
          {isMobile ? (
            <div className="mx-auto max-w-xs">
              <VariantComponent site={site} />
            </div>
          ) : (
            <VariantComponent site={site} />
          )}
        </div>

        {/* Mobile view note */}
        {isMobile && (
          <div className="mt-4 p-4 bg-[#1e293b]/50 border border-[#334155]/50 rounded-none text-[10px] text-[#64748b]">
            Narrow mobile simulation (~375px container). Variants use
            container-query breakpoints (bp-sm/bp-md/bp-lg).
          </div>
        )}
      </div>
    </div>
  );
}
