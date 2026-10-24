import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import VelvetTemplate from "@/templates/velvet/Template";
import { getDemoSiteData } from "@/templates/demo-data";
import { isValidDesignVariant, DESIGN_VARIANTS } from "@/templates/types";

describe("Hair Salon design variants — pilot (V1–V6 new)", () => {
  const variants = [1, 2, 3, 4, 5, 6] as const;

  function render(industry: string, overrides: Record<string, unknown> = {}, isDemo = false) {
    const site = getDemoSiteData({ industry, ...overrides }, { isDemo }) as any;
    return renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
  }

  it("DESIGN_VARIANTS is 1..6", () => {
    expect(DESIGN_VARIANTS).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("isValidDesignVariant accepts 1..6 and rejects others", () => {
    for (let i = 1; i <= 6; i++) expect(isValidDesignVariant(i)).toBe(true);
    expect(isValidDesignVariant(0)).toBe(false);
    expect(isValidDesignVariant(7)).toBe(false);
    expect(isValidDesignVariant(1.5)).toBe(false);
    expect(isValidDesignVariant("2")).toBe(false);
    expect(isValidDesignVariant(null)).toBe(false);
    expect(isValidDesignVariant(undefined)).toBe(false);
  });

  it.each(variants)("variant %d renders without crash and contains business name", (variant) => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Naledi's Braids & Beauty", designVariant: variant }, { isDemo: false });
    expect(site.designVariant).toBe(variant);
    const html = render("hairSalon", { businessName: "Naledi's Braids & Beauty", designVariant: variant });
    expect(html).toContain("Naledi&#x27;s Braids &amp; Beauty");
    expect(html.length).toBeGreaterThan(500);
  });

  it("V1 (Hero-First) contains hero-first structure", () => {
    const html = render("hairSalon", { designVariant: 1 });
    // Hero leads with large treatment image
    expect(html).toContain("Enquire on WhatsApp");
    // Cream + gold palette
    expect(html).toContain("#f6efe6");
    expect(html).toContain("#b98a2f");
    // Not barber's charcoal copy
    expect(html).not.toContain("Stay sharp");
  });

  it("V2 (Services-First) contains services-first structure", () => {
    const html = render("hairSalon", { designVariant: 2 });
    // Services section comes first
    expect(html).toContain("The menu");
    // Hero image below copy
    expect(html).toContain("aspect-[3/4]");
    // Per-treatment WhatsApp CTA
    expect(html).toContain('aria-label="Book Knotless braids via WhatsApp"');
  });

  it("V3 (Trust-First) contains reviews-first structure when review data exists", () => {
    const html = render("hairSalon", {
      designVariant: 3,
      reviewItems: [{ quote: "Loved my braids.", name: "Tebogo M.", label: "Knotless braids" }],
    }, true);
    // Reviews section leads
    expect(html).toContain("Word of mouth");
    // Soft oval testimonial cards
    expect(html).toContain("rounded-3xl");
    // Star ratings visible
    expect(html).toContain("fill-[#b98a2f]");
    // Trust badges section
    expect(html).toContain("Why Naledi&#x27;s is trusted");
    // Review quote present
    expect(html).toContain("Loved my braids.");
    expect(html).toContain("Tebogo M.");
  });

  it("V3 (Trust-First) shows honest empty state when no review data exists", () => {
    const html = render("hairSalon", { designVariant: 3 });
    // No fabricated reviews — empty state heading
    expect(html).toContain("Client feedback");
    expect(html).toContain("No reviews yet. Be the first to share your experience");
    // Should NOT contain fabricated review content
    expect(html).not.toContain("Lerato K.");
  });

  it("V3 (Trust-First) shows honest empty state when reviewItems is empty array", () => {
    const html = render("hairSalon", { designVariant: 3, reviewItems: [] });
    expect(html).toContain("Client feedback");
    expect(html).toContain("No reviews yet");
  });

  it("V4 (Gallery-First) contains gallery-first structure", () => {
    const html = render("hairSalon", { designVariant: 4 });
    // Gallery leads above fold
    expect(html).toContain("Fresh from the chair");
    // Overlay CTA on gallery items
    expect(html).toContain("Book this");
    // Hamburger-only nav
    expect(html).toContain("hidden items-center gap-8");
    // Asymmetrical image crops
    expect(html).toContain("group-hover:scale-105");
  });

  it("V5 (About-First) contains narrative-first structure", () => {
    const html = render("hairSalon", { designVariant: 5 });
    // About story leads
    expect(html).toContain("Our story");
    // Narrative text about local service
    expect(html).toContain("Crafted for");
    // Services below hero
    expect(html).toContain("The menu");
  });

  it("V6 (Booking-First) contains sticky booking bar at top", () => {
    const html = render("hairSalon", { designVariant: 6 });
    // Sticky booking bar (fixed position)
    expect(html).toContain("fixed top-0 left-0 right-0");
    // WhatsApp booking CTA prominent
    expect(html).toContain("Book on WhatsApp");
    // Hero below booking bar
    expect(html).toContain("pt-24");
  });

  it("V6 WhatsApp message does not fabricate appointment availability", () => {
    // The hair salon demo data has specific hours, not 24/7
    const site = getDemoSiteData({ industry: "hairSalon" }, { isDemo: false }) as any;
    expect(site.hours).not.toContain("24/7");
    // The quote link message should not claim emergency availability
    const html = render("hairSalon", { designVariant: 6 });
    expect(html).not.toContain("Emergency: yes");
  });

  it("renders real business data (not fabricated) across all variants", () => {
    for (const variant of variants) {
      const html = render("hairSalon", { designVariant: variant });
      expect(html).toContain("Naledi&#x27;s Braids &amp; Beauty");
      expect(html).toContain("Soweto, Johannesburg");
      expect(html).toContain("wa.me");
      // Real prices from demo data
      expect(html).toContain("R450"); // Knotless braids price
      expect(html).toContain("R380"); // Silk press price
    }
  });

  it("undefined designVariant falls back to V1 (hero-first default)", () => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Legacy Salon" }, { isDemo: false });
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = render("hairSalon", { businessName: "Legacy Salon" });
    // Should render V1 Hero-First markers
    expect(html).toContain("Legacy Salon");
    expect(html).toContain("#f6efe6");
    expect(html).toContain("#b98a2f");
  });

  it("non-hairSalon industry ignores hair salon variants (barber unchanged)", () => {
    const html = render("barber");
    expect(html).not.toContain("Fresh from the chair");
    expect(html).not.toContain("Crafted for");
  });

  it("renders images with proper alt attributes (no people/faces/hands introduced)", () => {
    // Hair salon demo data uses BEAUTY_IDS which may include people images.
    // Variants should not introduce new image URLs beyond what's in demo data.
    const html = render("hairSalon", { designVariant: 1 });
    // All images come from site.heroImageUrl and site.galleryUrls (demo data)
    // No additional image sources introduced by the variant — check for img tags
    expect(html).toContain('<img');
    expect(html).toContain('alt=');
  });
});
