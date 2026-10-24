import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ForgeTemplate from "@/templates/forge/Template";
import { getDemoSiteData } from "@/templates/demo-data";
import { isValidDesignVariant, DESIGN_VARIANTS } from "@/templates/types";

describe("Plumber design variants — pilot (V1 preserved, V2–V6 new)", () => {
  const variants = [1, 2, 3, 4, 5, 6] as const;

  function render(industry: string, overrides: Record<string, unknown> = {}, isDemo = false) {
    const site = getDemoSiteData({ industry, ...overrides }, { isDemo }) as any;
    return renderToStaticMarkup(React.createElement(ForgeTemplate, { site }));
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

  it("V1 preserves existing Flow design — unchanged output", () => {
    const site = getDemoSiteData({ industry: "plumber" }, { isDemo: false }) as any;
    expect(site.designVariant).toBeUndefined();
    const html = render("plumber");
    // Distinctive Flow palette (deep blue + water teal)
    expect(html).toContain("#0f4c5c");
    expect(html).toContain("#2dd4bf");
    // Booking CTA front and centre
    expect(html).toContain("Book a plumber");
    // Water-themed Droplet icon
    expect(html).toContain("lucide-droplet");
    // Not the electrician's angular design
    expect(html).not.toContain("#ea580c");
    expect(html).not.toContain("rounded-none");
  });

  it.each(variants)("variant %d renders without crash and contains business name", (variant) => {
    const site = getDemoSiteData({ industry: "plumber", businessName: "Dlamini Plumbing", designVariant: variant }, { isDemo: false });
    expect(site.designVariant).toBe(variant);
    const html = render("plumber", { businessName: "Dlamini Plumbing", designVariant: variant });
    expect(html).toContain("Dlamini Plumbing");
    expect(html.length).toBeGreaterThan(500);
  });

  it("V2 (Services-First) contains services-first structure", () => {
    const html = render("plumber", { designVariant: 2 });
    // Services section comes first
    expect(html).toContain("What we fix");
    // Hero image below copy (h-64)
    expect(html).toContain("h-64");
    // Per-service WhatsApp CTA "Book this"
    expect(html).toContain("Book this");
    // Coverage area section
    expect(html).toContain("Coverage area");
  });

  it("V3 (Trust-First) contains reviews-first structure when review data exists", () => {
    const html = render("plumber", {
      designVariant: 3,
      reviewItems: [{ quote: "Great service.", name: "Jane D.", label: "Emergency" }],
    }, true);
    // Reviews section leads
    expect(html).toContain("Client feedback");
    // Soft oval testimonial cards (rounded-full)
    expect(html).toContain("rounded-full");
    // Star ratings visible
    expect(html).toContain("fill-[#2dd4bf]");
    // Trust badges section
    expect(html).toContain("Why Dlamini is trusted");
    // Review quote present
    expect(html).toContain("Great service.");
    expect(html).toContain("Jane D.");
  });

  it("V3 (Trust-First) shows honest empty state when no review data exists", () => {
    const html = render("plumber", { designVariant: 3 });
    // No fabricated reviews — empty state heading
    expect(html).toContain("Client feedback");
    expect(html).toContain("No reviews yet. Be the first to share your experience");
    // Should NOT contain fabricated review content
    expect(html).not.toContain("Mr. Botha");
  });

  it("V3 (Trust-First) shows honest empty state when reviewItems is empty array", () => {
    const html = render("plumber", { designVariant: 3, reviewItems: [] });
    expect(html).toContain("Client feedback");
    expect(html).toContain("No reviews yet");
  });

  it("V4 (Gallery-First) contains gallery-first structure", () => {
    const html = render("plumber", { designVariant: 4 });
    // Gallery leads above fold
    expect(html).toContain("Recent jobs");
    // Overlay CTA on gallery items
    expect(html).toContain("Book this");
    // Hamburger-only nav
    expect(html).toContain("hidden items-center gap-7");
    // Asymmetrical image crops
    expect(html).toContain("group-hover:scale-105");
  });

  it("V5 (About-First) contains narrative-first structure", () => {
    const html = render("plumber", { designVariant: 5 });
    // About story leads
    expect(html).toContain("Our story");
    // Narrative text about local service
    expect(html).toContain("Pipes that");
    // Services below hero
    expect(html).toContain("What we fix");
  });

  it("V6 (Booking-First) contains sticky booking bar at top", () => {
    const html = render("plumber", { designVariant: 6 });
    // Sticky booking bar (fixed position)
    expect(html).toContain("fixed top-0 left-0 right-0");
    // WhatsApp booking CTA prominent
    expect(html).toContain("Book now on WhatsApp");
    // Rounded-full service cards
    expect(html).toContain("rounded-full");
    // Hero below booking bar
    expect(html).toContain("pt-24");
  });

  it("V6 WhatsApp message does not fabricate emergency availability", () => {
    // The plumber demo data has "24/7 Emergency call-outs" as hours
    const site = getDemoSiteData({ industry: "plumber" }, { isDemo: false }) as any;
    expect(site.hours).toContain("24/7");
    // The quote link message includes emergency status based on actual data
    // (URL-encoded in the wa.me href: "Emergency: yes" -> "Emergency%3A%20yes")
    const html = render("plumber", { designVariant: 6 });
    expect(html).toContain("Emergency%3A%20yes");
  });

  it("renders real business data (not fabricated) across all variants", () => {
    for (const variant of variants) {
      const html = render("plumber", { designVariant: variant });
      expect(html).toContain("Dlamini Plumbing");
      expect(html).toContain("Centurion, Pretoria");
      expect(html).toContain("wa.me");
      // Real prices from demo data
      expect(html).toContain("R450"); // Emergency call-out price
      expect(html).toContain("R950"); // Geyser repair price
    }
  });

  it("undefined designVariant falls back to V1 (legacy default)", () => {
    const site = getDemoSiteData({ industry: "plumber", businessName: "Legacy Plumbing" }, { isDemo: false });
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = render("plumber", { businessName: "Legacy Plumbing" });
    // Should render V1 Flow markers
    expect(html).toContain("Legacy Plumbing");
    expect(html).toContain("#0f4c5c");
    expect(html).toContain("#2dd4bf");
  });

  it("non-plumber industries ignore plumber variants (electrician unchanged)", () => {
    const html = render("electrician");
    expect(html).not.toContain("Book a plumber");
    expect(html).not.toContain("Dependable.");
  });
});
