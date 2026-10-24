import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import VelvetTemplate from "../src/templates/velvet/Template";
import { getDemoSiteData } from "../src/templates/demo-data";
import { isValidDesignVariant, DESIGN_VARIANTS } from "../src/templates/types";
import { BARBER_VARIANTS } from "../src/templates/velvet/barberVariants";

describe("Barber design variants — Phase 2 six-template families", () => {
  const variants = [1, 2, 3, 4, 5, 6] as const;

  it("has 6 barber variants defined with distinct names", () => {
    expect(BARBER_VARIANTS.length).toBe(6);
    const names = BARBER_VARIANTS.map((v) => v.name);
    expect(new Set(names).size).toBe(6);
    expect(names).toEqual(["Velvet", "Forge", "Savanna", "Praxis", "Market", "Vital"]);
  });

  it("each variant has a distinct strategy", () => {
    const strategies = BARBER_VARIANTS.map((v) => v.strategy);
    expect(new Set(strategies).size).toBe(6);
  });

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

  it.each(variants)("variant %s renders without crash and contains business name", (variant) => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Sharp & Sons", designVariant: variant }, { isDemo: false });
    expect(site.designVariant).toBe(variant);
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Sharp &amp; Sons");
    expect(html.length).toBeGreaterThan(500);
  });

  it("variant 1 (Velvet) contains hero-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Velvet Cuts", designVariant: 1 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Velvet Cuts");
    expect(html).toContain("The Menu");
    expect(html).toContain("The chair is waiting");
  });

  it("variant 2 (Forge) contains services-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Forge Cuts", designVariant: 2 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Forge Cuts");
    expect(html).toContain("Services &amp; prices");
    expect(html).toContain("The Menu");
  });

  it("variant 3 (Savanna) contains trust-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Savanna Cuts", designVariant: 3 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Savanna Cuts");
    expect(html).toContain("Standards at the chair");
    expect(html).toContain("Plan your visit");
  });

  it("variant 4 (Praxis) contains gallery-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Praxis Cuts", designVariant: 4 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Praxis Cuts");
    expect(html).toContain("Selected frames");
    expect(html).toContain("Behind those frames");
  });

  it("variant 5 (Market) contains about-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Market Cuts", designVariant: 5 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Market Cuts");
    expect(html).toContain("Our story, first");
    expect(html).toContain("Who we are");
  });

  it("variant 6 (Vital) contains enquiry-first markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Vital Cuts", designVariant: 6 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Vital Cuts");
    expect(html).toContain("Need a cut? Start with one message.");
    expect(html).toContain("Enquiry form");
  });

  it("legacy default: undefined designVariant falls back to variant 1 (Velvet)", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Legacy Cuts" }, { isDemo: false });
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Legacy Cuts");
    expect(html).toContain("The Menu");
    expect(html.length).toBeGreaterThan(500);
  });

  it("non-barber industry ignores barber variants (coffeeShop still Savanna)", async () => {
    const { default: SavannaTemplate } = await import("../src/templates/savanna/Template");
    const site = getDemoSiteData({ industry: "coffeeShop", businessName: "Brew & Bean", designVariant: 3 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(SavannaTemplate, { site }));
    expect(html).toContain("Brew &amp; Bean");
    expect(html).not.toContain("The Menu");
  });

  it("velvet non-barber (hairSalon) renders velvet core, not barber", () => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Naledi Hair", designVariant: 6 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Naledi Hair");
    expect(html).not.toContain("The Menu");
  });

  it("gallery and services persist across variants", () => {
    for (const variant of variants) {
      const site = getDemoSiteData({ industry: "barber", designVariant: variant }, { isDemo: false });
      expect(site.services.length).toBeGreaterThan(0);
      expect(site.galleryUrls.length).toBeGreaterThan(0);
      const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
      expect(html).toContain(site.services[0].name);
      expect(html).toContain(site.services[0].price);
    }
  });
});
