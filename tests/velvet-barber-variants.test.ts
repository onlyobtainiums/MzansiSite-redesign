import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import VelvetTemplate from "../src/templates/velvet/Template";
import { getDemoSiteData } from "../src/templates/demo-data";
import { isValidDesignVariant, DESIGN_VARIANTS } from "../src/templates/types";
import { BARBER_VARIANTS } from "../src/templates/velvet/barberVariants";

describe("Barber design variants — foundation + pilot", () => {
  const variants = [1, 2, 3, 4, 5, 6] as const;

  it("has 6 barber variants defined with distinct names", () => {
    expect(BARBER_VARIANTS.length).toBe(6);
    const names = BARBER_VARIANTS.map((v) => v.name);
    expect(new Set(names).size).toBe(6);
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
    // ensure data carries variant
    expect(site.designVariant).toBe(variant);
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Sharp &amp; Sons");
    expect(html.length).toBeGreaterThan(500);
  });

  it("variant 1 (Executive) contains distinctive charcoal/brass markers", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Executive Cuts", designVariant: 1 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Stay");
    expect(html).toContain("sharp");
    expect(html).toContain("Walk-ins welcome");
  });

  it("variant 2 (Minimalist) contains minimal markers", () => {
    const site = getDemoSiteData({ industry: "barber", designVariant: 2 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Cuts &amp; care");
  });

  it("variant 3 (Classic) contains heritage markers", () => {
    const site = getDemoSiteData({ industry: "barber", designVariant: 3 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Heritage");
  });

  it("variant 4 (Urban) contains urban markers", () => {
    const site = getDemoSiteData({ industry: "barber", designVariant: 4 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    // Urban has "Cut" and neon red hard shadow
    expect(html).toContain("Live sharp");
  });

  it("variant 5 (Studio) contains studio markers", () => {
    const site = getDemoSiteData({ industry: "barber", designVariant: 5 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Soft light");
  });

  it("variant 6 (Bold) contains bold markers", () => {
    const site = getDemoSiteData({ industry: "barber", designVariant: 6 }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("don’t");
  });

  it("legacy default: undefined designVariant falls back to variant 1 appearance", () => {
    const site = getDemoSiteData({ industry: "barber", businessName: "Legacy Cuts" }, { isDemo: false });
    // simulate legacy site without designVariant column
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    // Should still render variant 1 (Executive) markers
    expect(html).toContain("Stay");
    expect(html).toContain("sharp");
    expect(html).toContain("Legacy Cuts");
  });

  it("non-barber industry ignores barber variants (coffeeShop still Savanna)", async () => {
    const { default: SavannaTemplate } = await import("../src/templates/savanna/Template");
    const site = getDemoSiteData({ industry: "coffeeShop", businessName: "Brew & Bean", designVariant: 3 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(SavannaTemplate, { site }));
    expect(html).toContain("Brew &amp; Bean");
    // Should NOT contain barber-specific markers like "Stay sharp"
    expect(html).not.toContain("Stay sharp");
  });

  it("velvet non-barber (hairSalon) renders velvet core, not barber", () => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Naledi Hair", designVariant: 6 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Naledi Hair");
    // hairSalon should not have barber's "Stay sharp"
    expect(html).not.toContain("Stay sharp");
  });

  it("gallery and services persist across variants", () => {
    for (const variant of variants) {
      const site = getDemoSiteData({ industry: "barber", designVariant: variant }, { isDemo: false });
      expect(site.services.length).toBeGreaterThan(0);
      expect(site.galleryUrls.length).toBeGreaterThan(0);
      const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
      // Every variant should list at least one service name and price
      expect(html).toContain(site.services[0].name);
      expect(html).toContain(site.services[0].price);
    }
  });
});
