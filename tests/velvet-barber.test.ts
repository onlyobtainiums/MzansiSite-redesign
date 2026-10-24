import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import VelvetTemplate from "@/templates/velvet/Template";
import { getDemoSiteData } from "@/templates/demo-data";

describe("Velvet — barber six-template families (Phase 2)", () => {
  const variants = [1, 2, 3, 4, 5, 6] as const;

  it.each(variants)("variant %s renders barber with distinct family markers and preserves uploads", (variant) => {
    const barber = getDemoSiteData({ industry: "barber" }, { isDemo: true });
    const uploadedHero = "https://res.cloudinary.com/demo/image/upload/v1/barber-hero.jpg";
    const uploadedGallery = [
      "https://res.cloudinary.com/demo/image/upload/v1/b1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1/b2.jpg",
    ];
    const customLogo = "https://res.cloudinary.com/demo/image/upload/v1/barber-logo.png";
    const withUploads = {
      ...barber,
      designVariant: variant,
      heroImageUrl: uploadedHero,
      galleryUrls: uploadedGallery,
      logoUrl: customLogo,
      businessName: "Very Long Barber Shop Name That Tests Wrapping At 320 Pixels Wide",
    } as any;

    const html = renderToString(React.createElement(VelvetTemplate, { site: withUploads }));

    // Business name present
    expect(html).toContain("Very Long Barber Shop Name That Tests Wrapping At 320 Pixels Wide");
    // WhatsApp booking preserved
    expect(html).toContain("wa.me");
    expect(html).toContain("WhatsApp");
    // Uploads preserved
    // At least one uploaded gallery image is rendered by every variant
    expect(html).toContain(uploadedGallery[0]);
    expect(html).toContain(customLogo);
    // heroImageUrl used as hero in Variant 1 (Velvet)
    if (variant === 1) {
      expect(html).toContain(uploadedHero);
    }
    // Prices present (barber)
    expect(html).toContain("R120");
    expect(html).toContain("R90");
    // No fixed desktop widths
    expect(html).not.toMatch(/w-\[1200px\]|w-\[1440px\]/);
    // Islamic compliance — no prohibited keywords
    expect(html).not.toMatch(/wine|beer|alcohol|pork|casino|betting/i);
    // Sample labels when isDemo
    expect(html).toContain("Sample");
    // Each variant has distinctive family-specific markers
    const familyMarkers: Record<number, string[]> = {
      1: ["The Menu", "The chair is waiting"], // Velvet — hero-first
      2: ["Services &amp; prices", "The Menu"], // Forge — services-first
      3: ["Standards at the chair", "Plan your visit"], // Savanna — trust-first
      4: ["Selected frames", "Behind those frames"], // Praxis — gallery-first
      5: ["Our story, first", "Who we are"], // Market — about-first
      6: ["Need a cut? Start with one message.", "Enquiry form"], // Vital — enquiry-first
    };
    for (const marker of familyMarkers[variant]) {
      expect(html).toContain(marker);
    }
  });

  it("does not break other Velvet variants (hairSalon, spa, eventPlanner)", () => {
    for (const industry of ["hairSalon", "spa", "florist", "eventPlanner"]) {
      const site = getDemoSiteData({ industry } as any, { isDemo: true });
      const html = renderToString(React.createElement(VelvetTemplate, { site: site as any }));
      // Original Velvet markers still present for non-barber
      expect(html).toContain("The menu");
      expect(html).toContain("Services &amp; pricing");
      // Must NOT leak barber copy
      expect(html).not.toContain("Stay sharp");
      expect(html).not.toContain("Cuts &amp; grooming");
    }
  });

  it("handles long cut names and prices without overflow", () => {
    const barber = getDemoSiteData({ industry: "barber" } as any, { isDemo: true });
    const longCut = {
      ...barber,
      designVariant: 1,
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
    // Mobile safeguards present in the rendered output
    expect(html).toContain("break-words");
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
