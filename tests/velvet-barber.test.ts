import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToString } from "react-dom/server";
import VelvetTemplate from "@/templates/velvet/Template";
import { getDemoSiteData } from "@/templates/demo-data";

describe("Velvet — barber premium charcoal/brass variant", () => {
  it("renders barber with distinct barber copy, preserves uploads, and stays mobile-safe", () => {
    const barber = getDemoSiteData({ industry: "barber" }, { isDemo: true });
    const uploadedHero = "https://res.cloudinary.com/demo/image/upload/v1/barber-hero.jpg";
    const uploadedGallery = [
      "https://res.cloudinary.com/demo/image/upload/v1/b1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1/b2.jpg",
    ];
    const customLogo = "https://res.cloudinary.com/demo/image/upload/v1/barber-logo.png";
    const withUploads = {
      ...barber,
      heroImageUrl: uploadedHero,
      galleryUrls: uploadedGallery,
      logoUrl: customLogo,
      businessName: "Very Long Barber Shop Name That Tests Wrapping At 320 Pixels Wide",
    } as any;

    const html = renderToString(React.createElement(VelvetTemplate, { site: withUploads }));

    // Barber-specific editorial — not generic Velvet/beauty (hero has span markup between words)
    expect(html).toContain("Stay");
    expect(html).toContain("sharp");
    expect(html).toContain("Stay respected");
    expect(html).toContain("Cuts &amp; grooming");
    expect(html).toContain("The chair");
    expect(html).toContain("Walk-ins welcome");
    // Brass/charcoal palette tokens
    expect(html).toContain("#0f1113");
    expect(html).toContain("#fdf8f2");
    expect(html).toContain("#c9a25a");
    // WhatsApp booking preserved
    expect(html).toContain("wa.me");
    expect(html).toContain("WhatsApp");
    // Uploads preserved
    expect(html).toContain(uploadedHero);
    expect(html).toContain(uploadedGallery[0]);
    expect(html).toContain(customLogo);
    // Prices present (barber)
    expect(html).toContain("R120");
    expect(html).toContain("R90");
    // No fixed desktop widths
    expect(html).not.toMatch(/w-\[1200px\]|w-\[1440px\]/);
    // Islamic compliance — no prohibited keywords
    expect(html).not.toMatch(/wine|beer|alcohol|pork|casino|betting/i);
    // Demo badge when isDemo
    expect(html).toContain("DEMO CONTENT");
    // Mobile safeguards present
    expect(html).toContain("break-words");
    expect(html).toContain("min-w-0");
  });

  it("does not break other Velvet variants (hairSalon, spa, eventPlanner)", () => {
    for (const industry of ["hairSalon", "spa", "florist", "eventPlanner"]) {
      const site = getDemoSiteData({ industry } as any, { isDemo: true });
      const html = renderToString(React.createElement(VelvetTemplate, { site: site as any }));
      // Original Velvet markers still present for non-barber
      expect(html).toContain("The menu");
      expect(html).toContain("Services &amp; pricing");
      // Must NOT leak barber charcoal copy
      expect(html).not.toContain("Stay sharp");
      expect(html).not.toContain("Cuts &amp; grooming");
    }
  });

  it("handles long cut names and prices without overflow", () => {
    const barber = getDemoSiteData({ industry: "barber" } as any, { isDemo: true });
    const longCut = {
      ...barber,
      businessName: "A Really Long Barber Name That Could Overflow A Narrow Phone Screen",
      services: [
        {
          name: "Extraordinarily long barber service name that tests wrapping and price alignment at 320px width",
          price: "from R1,200.00",
          description: "A very long description that must wrap inside the barber card without causing horizontal scroll.",
        },
        { name: "Short", price: "R10" },
      ],
    } as any;
    const html = renderToString(React.createElement(VelvetTemplate, { site: longCut }));
    expect(html).toContain("Extraordinarily long barber service");
    expect(html).toContain("from R1,200.00");
    expect(html).toContain("break-words");
    expect(html).toContain("min-w-0");
  });

  it("uses verified barber pexels images (no 1813272/3212167 broken/people ids)", () => {
    const barber = getDemoSiteData({ industry: "barber" } as any, { isDemo: true });
    expect(barber.heroImageUrl).toContain("897271");
    for (const url of barber.galleryUrls) {
      expect(url).not.toContain("1813272"); // people barbershop
      expect(url).not.toContain("3212167"); // 404
      expect(url).not.toContain("3993446"); // hands
      expect(url).not.toContain("3184296"); // office people
    }
    const blob = barber.galleryUrls.join(" ");
    expect(blob).toMatch(/897271|10775078|13809242|7697221|1319460|4449799/);
  });
});
