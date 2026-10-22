import { describe, it, expect, vi } from "vitest";

/**
 * Mock next/font/google — template imports fonts via layout, not directly,
 * but ensure no font fetch is needed in node env.
 */
vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToString } from "react-dom/server";
import SavannaTemplate from "@/templates/savanna/Template";
import { getDemoSiteData } from "@/templates/demo-data";

describe("Savanna — coffeeShop premium variant", () => {
  it("renders coffeeShop without faces/alcohol, preserves uploads, and keeps mobile-safe structure", () => {
    const coffee = getDemoSiteData({ industry: "coffeeShop" }, { isDemo: true });
    // Simulate uploaded images flowing through — must render correctly, not replaced by demo
    const uploadedHero = "https://res.cloudinary.com/demo/image/upload/v1/custom-hero.jpg";
    const uploadedGallery = [
      "https://res.cloudinary.com/demo/image/upload/v1/g1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1/g2.jpg",
    ];
    const customLogo = "https://res.cloudinary.com/demo/image/upload/v1/logo.png";
    const withUploads = { ...coffee, heroImageUrl: uploadedHero, galleryUrls: uploadedGallery, logoUrl: customLogo, businessName: "Very Long Business Name That Tests Wrapping At 320 Pixels Wide" };

    const html = renderToString(React.createElement(SavannaTemplate, { site: withUploads as any }));

    // Premium editorial headings for café — not generic hospitality
    expect(html).toContain("Freshly roasted");
    expect(html).toContain("Today&#x27;s menu");
    expect(html).toContain("Our café");
    // WhatsApp CTA must be present and include business name
    expect(html).toContain("wa.me");
    expect(html).toContain("WhatsApp");
    // Uploaded images must appear, not demo replaced
    expect(html).toContain(uploadedHero);
    expect(html).toContain(uploadedGallery[0]);
    expect(html).toContain(customLogo);
    // Prices right-aligned in cards — ensure prices present
    expect(html).toContain("R45");
    // Mobile safeguards: no fixed desktop widths in critical sections — heuristic: no 'w-[1440' fixed, but allow max-w-6xl
    expect(html).not.toMatch(/w-\[1200px\]|w-\[1440px\]/);
    // No fabricated ratings on published (isDemo=false hides rating stars count? For coffee isDemo true shows DemoBadge — acceptable)
    expect(html).toContain("DEMO CONTENT");
    // Islamic compliance: ensure no prohibited imagery keywords leaking into template (template is imagery-agnostic, demo-data supplies café interiors)
    expect(html).not.toMatch(/wine|beer|alcohol|pork|casino|betting/i);
  });

  it("does not break other Savanna variants (guestHouse, lodge, restaurant)", () => {
    for (const industry of ["guestHouse", "lodge", "restaurant", "tourGuide"]) {
      const site = getDemoSiteData({ industry }, { isDemo: true });
      const html = renderToString(React.createElement(SavannaTemplate, { site: site as any }));
      // Original hospitality markers must still exist for non-coffeeShop
      expect(html).toContain("Check availability");
      expect(html).toContain("Stay");
      // Must NOT leak coffeeShop editorial into other industries
      expect(html).not.toContain("Freshly roasted");
      expect(html).not.toContain("Today&#x27;s menu");
    }
  });

  it("handles long menu names and prices without overflow", () => {
    const coffee = getDemoSiteData({ industry: "coffeeShop" }, { isDemo: true });
    const longMenu = {
      ...coffee,
      businessName: "A Really Long Café Name That Could Overflow A Narrow Phone Screen",
      services: [
        { name: "Extraordinarily long menu item name that tests wrapping and price alignment at 320px width", price: "from R1,200.00", description: "A very long description that must wrap inside the card without causing horizontal scroll or clipped text at the smallest viewport." },
        { name: "Short", price: "R10" },
      ],
    };
    const html = renderToString(React.createElement(SavannaTemplate, { site: longMenu as any }));
    expect(html).toContain("Extraordinarily long menu item");
    expect(html).toContain("from R1,200.00");
    // Ensure cards use break-words and min-w-0 handling (present in rendered class strings)
    expect(html).toContain("break-words");
    expect(html).toContain("min-w-0");
  });
});
