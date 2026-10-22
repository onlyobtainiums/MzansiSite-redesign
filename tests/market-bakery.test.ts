import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToString } from "react-dom/server";
import MarketTemplate from "@/templates/market/Template";
import { getDemoSiteData } from "@/templates/demo-data";

describe("Market — bakery premium artisan variant", () => {
  it("renders bakery with warm artisan copy, preserves uploads, and stays mobile-safe", () => {
    const bakery = getDemoSiteData({ industry: "bakery" }, { isDemo: true });
    const uploadedHero = "https://res.cloudinary.com/demo/image/upload/v1/bakery-hero.jpg";
    const uploadedGallery = [
      "https://res.cloudinary.com/demo/image/upload/v1/b1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1/b2.jpg",
    ];
    const customLogo = "https://res.cloudinary.com/demo/image/upload/v1/bakery-logo.png";
    const withUploads = {
      ...bakery,
      heroImageUrl: uploadedHero,
      galleryUrls: uploadedGallery,
      logoUrl: customLogo,
      businessName: "Very Long Bakery Name That Tests Wrapping At 320 Pixels Wide",
    } as any;

    const html = renderToString(React.createElement(MarketTemplate, { site: withUploads }));

    // Bakery-specific editorial — not generic Market
    expect(html).toContain("Baked before");
    expect(html).toContain("sunrise");
    expect(html).toContain("Shop the counter");
    expect(html).toContain("From the oven");
    expect(html).toContain("The oven");
    // Flour/water/salt story
    expect(html).toContain("Flour, water, salt");
    // Warm artisan palette cues present (class strings contain warm tokens)
    expect(html).toContain("#fffbf0");
    expect(html).toContain("#2b1608");
    // WhatsApp ordering preserved
    expect(html).toContain("wa.me");
    expect(html).toContain("WhatsApp");
    // Uploaded replacements preserved, not demo-overwritten
    expect(html).toContain(uploadedHero);
    expect(html).toContain(uploadedGallery[0]);
    expect(html).toContain(customLogo);
    // Prices present (bakery prices)
    expect(html).toContain("R85");
    // No fixed desktop widths introduced
    expect(html).not.toMatch(/w-\[1200px\]|w-\[1440px\]/);
    // Islamic compliance — no prohibited content keywords
    expect(html).not.toMatch(/wine|beer|alcohol|pork|casino|betting/i);
    // Demo badge when isDemo
    // bakery uses same DemoBadge component
    expect(html).toContain("DEMO CONTENT");
    // Mobile safeguards present
    expect(html).toContain("break-words");
    expect(html).toContain("min-w-0");
  });

  it("does not break other Market variants (grocery, hardware, pharmacy)", () => {
    for (const industry of ["grocery", "hardware", "pharmacy"]) {
      const site = getDemoSiteData({ industry } as any, { isDemo: true });
      const html = renderToString(React.createElement(MarketTemplate, { site: site as any }));
      // Original Market markers still present
      expect(html).toContain("The good stuff");
      expect(html).toContain("Fair prices");
      expect(html).toContain("Shop the line-up");
      // Must NOT leak bakery artisan copy
      expect(html).not.toContain("Baked before");
      expect(html).not.toContain("Flour, water, salt");
    }
  });

  it("handles long bake names and prices without overflow", () => {
    const bakery = getDemoSiteData({ industry: "bakery" } as any, { isDemo: true });
    const longBake = {
      ...bakery,
      businessName: "A Really Long Bakery Name That Could Overflow A Narrow Phone Screen",
      services: [
        {
          name: "Extraordinarily long bake item name that tests wrapping and price alignment at 320px width for bakery cards",
          price: "from R1,200.00",
          description: "A very long description that must wrap inside the bakery card without causing horizontal scroll or clipped text.",
        },
        { name: "Short", price: "R10" },
      ],
    } as any;
    const html = renderToString(React.createElement(MarketTemplate, { site: longBake }));
    expect(html).toContain("Extraordinarily long bake item");
    expect(html).toContain("from R1,200.00");
    expect(html).toContain("break-words");
    expect(html).toContain("min-w-0");
  });

  it("uses verified bakery pexels images (no 1070850/461428 broken ids)", () => {
    const bakery = getDemoSiteData({ industry: "bakery" } as any, { isDemo: true });
    // New verified IDs must be present
    expect(bakery.heroImageUrl).toContain("1571075");
    for (const url of bakery.galleryUrls) {
      // must not contain broken ids
      expect(url).not.toContain("1070850");
      expect(url).not.toContain("461428");
      // 2915282 was abstract non-bakery — also retired
      expect(url).not.toContain("2915282");
    }
    // Should contain one of the new verified ids
    const blob = bakery.galleryUrls.join(" ");
    expect(blob).toMatch(/1571075|1079020|4881596/);
  });
});
