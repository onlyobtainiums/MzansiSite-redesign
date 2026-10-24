import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import ForgeTemplate from "../src/templates/forge/Template";
import VelvetTemplate from "../src/templates/velvet/Template";
import { getDemoSiteData } from "../src/templates/demo-data";
import { isValidDesignVariant, DESIGN_VARIANTS } from "../src/templates/types";
import { PLUMBER_VARIANTS } from "../src/templates/forge/plumberVariants";
import { HAIR_SALON_VARIANTS } from "../src/templates/velvet/hairSalonVariants";

const VARIANTS = [1, 2, 3, 4, 5, 6] as const;

describe("Plumber design variants V1–V6 (Forge)", () => {
  it("has 6 plumber variants defined with distinct names", () => {
    expect(PLUMBER_VARIANTS.length).toBe(6);
    const names = PLUMBER_VARIANTS.map((v) => v.name);
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

  it.each(VARIANTS)("plumber variant %s renders without crash and contains business name", (variant) => {
    const site = getDemoSiteData(
      { industry: "plumber", businessName: "Dlamini Plumbing", designVariant: variant },
      { isDemo: false },
    );
    expect(site.designVariant).toBe(variant);
    const html = renderToStaticMarkup(React.createElement(ForgeTemplate, { site }));
    expect(html).toContain("Dlamini Plumbing");
    expect(html.length).toBeGreaterThan(500);
  });

  it("each plumber variant produces genuinely different HTML (not recolors)", () => {
    const htmls = VARIANTS.map((v) => {
      const site = getDemoSiteData(
        { industry: "plumber", businessName: "Dlamini Plumbing", designVariant: v },
        { isDemo: false },
      );
      return renderToStaticMarkup(React.createElement(ForgeTemplate, { site }));
    });
    const unique = new Set(htmls);
    expect(unique.size).toBe(6);
  });

  it("legacy default: undefined designVariant falls back to plumber V1 (Flow)", () => {
    const site = getDemoSiteData({ industry: "plumber", businessName: "Legacy Plumbing" }, { isDemo: false });
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = renderToStaticMarkup(React.createElement(ForgeTemplate, { site }));
    expect(html).toContain("Legacy Plumbing");
    expect(html.length).toBeGreaterThan(500);
  });

  it("services and gallery persist across all plumber variants", () => {
    for (const variant of VARIANTS) {
      const site = getDemoSiteData({ industry: "plumber", designVariant: variant }, { isDemo: false });
      expect(site.services.length).toBeGreaterThan(0);
      expect(site.galleryUrls.length).toBeGreaterThan(0);
      const html = renderToStaticMarkup(React.createElement(ForgeTemplate, { site }));
      expect(html).toContain(site.services[0].name);
      expect(html).toContain(site.services[0].price);
    }
  });

  it("non-plumber Forge industries do not render plumber variants", () => {
    const electrician = getDemoSiteData({ industry: "electrician", businessName: "Mokoena Electrical", designVariant: 3 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(ForgeTemplate, { site: electrician }));
    expect(html).toContain("Mokoena Electrical");
    // Should not contain plumber-specific Flow design water droplet emphasis
    expect(html).not.toContain("Dependable.");
  });
});

describe("Hair Salon design variants V1–V6 (Velvet)", () => {
  it("has 6 hair salon variants defined with distinct names", () => {
    expect(HAIR_SALON_VARIANTS.length).toBe(6);
    const names = HAIR_SALON_VARIANTS.map((v) => v.name);
    expect(new Set(names).size).toBe(6);
  });

  it.each(VARIANTS)("hair salon variant %s renders without crash and contains business name", (variant) => {
    const site = getDemoSiteData(
      { industry: "hairSalon", businessName: "Naledi Hair", designVariant: variant },
      { isDemo: false },
    );
    expect(site.designVariant).toBe(variant);
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Naledi Hair");
    expect(html.length).toBeGreaterThan(500);
  });

  it("each hair salon variant produces genuinely different HTML (not recolors)", () => {
    const htmls = VARIANTS.map((v) => {
      const site = getDemoSiteData(
        { industry: "hairSalon", businessName: "Naledi Hair", designVariant: v },
        { isDemo: false },
      );
      return renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    });
    const unique = new Set(htmls);
    expect(unique.size).toBe(6);
  });

  it("legacy default: undefined designVariant falls back to hair salon V1 (Hero First)", () => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Legacy Salon" }, { isDemo: false });
    delete (site as unknown as Record<string, unknown>).designVariant;
    expect(site.designVariant).toBeUndefined();
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Legacy Salon");
    expect(html.length).toBeGreaterThan(500);
  });

  it("services and gallery persist across all hair salon variants", () => {
    for (const variant of VARIANTS) {
      const site = getDemoSiteData({ industry: "hairSalon", designVariant: variant }, { isDemo: false });
      expect(site.services.length).toBeGreaterThan(0);
      expect(site.galleryUrls.length).toBeGreaterThan(0);
      const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
      expect(html).toContain(site.services[0].name);
      expect(html).toContain(site.services[0].price);
    }
  });

  it("hair salon does not render barber variants", () => {
    const site = getDemoSiteData({ industry: "hairSalon", businessName: "Naledi Hair", designVariant: 4 as never }, { isDemo: false });
    const html = renderToStaticMarkup(React.createElement(VelvetTemplate, { site }));
    expect(html).toContain("Naledi Hair");
    // Should not contain barber-specific markers like "Stay sharp"
    expect(html).not.toContain("Stay sharp");
  });
});
