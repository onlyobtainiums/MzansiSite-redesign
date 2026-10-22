import { describe, it, expect, vi } from "vitest";

vi.mock("next/font/google", () => ({
  Syne: () => ({ variable: "syne" }),
  Instrument_Serif: () => ({ variable: "instrument" }),
  Space_Grotesk: () => ({ variable: "grotesk" }),
}));

import React from "react";
import { renderToString } from "react-dom/server";
import ForgeTemplate from "@/templates/forge/Template";
import SavannaTemplate from "@/templates/savanna/Template";
import MarketTemplate from "@/templates/market/Template";
import VelvetTemplate from "@/templates/velvet/Template";
import { getDemoSiteData } from "@/templates/demo-data";

function render(industry: string, overrides: Record<string, unknown> = {}) {
  const site = getDemoSiteData({ industry, ...overrides }, { isDemo: true }) as any;
  return renderToString(React.createElement(ForgeTemplate, { site }));
}

describe("Forge — industry concept routing", () => {
  it("routes electrician to the Circuit design (angular, high-contrast, COC-focused)", () => {
    const html = render("electrician");
    // Distinctive Circuit palette
    expect(html).toContain("#0f172a"); // deep slate
    expect(html).toContain("#ea580c"); // safety orange
    // COC certificate section prominent
    expect(html).toContain("COC certificate");
    expect(html).toContain("Certified.");
    // Sharp corners — no rounded utility on primary cards
    expect(html).toContain("rounded-none");
    // Emergency top bar in orange
    expect(html).toContain("24/7 emergencies");
    // Not the legacy Forge hazard stripes
    expect(html).not.toContain("#ffc400");
    expect(html).not.toContain("Sorted.");
  });

  it("routes plumber to the Flow design (water-inspired, booking-centred)", () => {
    const html = render("plumber");
    // Distinctive Flow palette
    expect(html).toContain("#0f4c5c"); // deep blue
    expect(html).toContain("#2dd4bf"); // water teal
    // Booking CTA front and centre
    expect(html).toContain("Book a plumber");
    expect(html).toContain("Book a visit");
    // Water-themed Droplet icon (renders as lucide-droplet class)
    expect(html).toContain("lucide-droplet");
    expect(html).toContain("Dependable.");
    // Rounded soft shapes (not sharp)
    expect(html).toContain("rounded-full");
    expect(html).toContain("rounded-3xl");
    // Not the electrician's angular design
    expect(html).not.toContain("#ea580c");
    expect(html).not.toContain("rounded-none");
  });

  it("routes carpenter to the Grain design (crafted, warm, editorial gallery)", () => {
    const html = render("carpenter");
    // Distinctive Grain palette
    expect(html).toContain("#a67c52"); // warm wood
    expect(html).toContain("#f8f4ec"); // cream
    expect(html).toContain("#2d241e"); // dark ink
    // Editorial hero with overlapping project cards
    expect(html).toContain("Built to last.");
    expect(html).toContain("Custom woodwork from Mzansi.");
    // Project gallery as hero (distinct from service-first layouts)
    expect(html).toContain("Project");
    expect(html).toContain("The workshop");
    // Warm material feel — no safety yellow
    expect(html).not.toContain("#ffc400");
    expect(html).not.toContain("#0f172a");
  });

  it("routes construction to the Blueprint design (architectural, strong grid, quote CTA)", () => {
    const html = render("construction");
    // Distinctive Blueprint palette
    expect(html).toContain("#1a1a1a"); // concrete
    expect(html).toContain("#f59e0b"); // accent orange
    // Blueprint grid overlay on hero
    expect(html).toContain("40px 40px"); // grid background
    // Strong architectural copy
    expect(html).toContain("Built strong.");
    expect(html).toContain("Construction done right.");
    // Quote CTA front and centre
    expect(html).toContain("Request a quote");
    expect(html).toContain("Ready to build?");
    // Masonry-style project grid
    expect(html).toContain("Build");
    // Not legacy Forge
    expect(html).not.toContain("#ffc400");
    expect(html).not.toContain("Sorted.");
  });

  it("falls back to legacy Forge for non-priority industries (handyman, painter, etc.)", () => {
    for (const industry of ["handyman", "painter", "roofer", "solar", "security", "storage"]) {
      const html = render(industry);
      // Legacy Forge hazard stripes
      expect(html).toContain("#ffc400"); // safety yellow
      expect(html).toContain("#16181a"); // coal
      expect(html).toContain("Sorted.");
      // Legacy Forge section structure
      expect(html).toContain("Services &");
      expect(html).toContain("Recent work");
      // Not any of the four new concepts
      expect(html).not.toContain("#0f172a"); // electrician slate
      expect(html).not.toContain("#0f4c5c"); // plumber blue
      expect(html).not.toContain("#a67c52"); // carpenter wood
      expect(html).not.toContain("#1a1a1a"); // construction concrete
    }
  });
});

describe("Forge — industry-specific business data preservation", () => {
  it("electrician renders real business name, services, prices, WhatsApp", () => {
    const html = render("electrician", { businessName: "Mokoena Electrical" });
    expect(html).toContain("Mokoena Electrical");
    expect(html).toContain("R850"); // COC certificate price
    expect(html).toContain("R950"); // DB board repair
    expect(html).toContain("wa.me");
    expect(html).toContain("Roodepoort, Johannesburg");
  });

  it("plumber renders real business name, services, prices, WhatsApp", () => {
    const html = render("plumber", { businessName: "Dlamini Plumbing" });
    expect(html).toContain("Dlamini Plumbing");
    expect(html).toContain("R450"); // emergency call-out
    expect(html).toContain("R950"); // geyser repair
    expect(html).toContain("wa.me");
    expect(html).toContain("Centurion, Pretoria");
  });

  it("carpenter renders real business name, services, prices, WhatsApp", () => {
    const html = render("carpenter", { businessName: "Makwela Woodworks" });
    expect(html).toContain("Makwela Woodworks");
    expect(html).toContain("R4,500/m"); // built-in wardrobe
    expect(html).toContain("R6,500/m"); // kitchen cupboards
    expect(html).toContain("wa.me");
    expect(html).toContain("Midrand, Gauteng");
  });

  it("construction renders real business name, services, prices, WhatsApp", () => {
    const html = render("construction", { businessName: "Kagiso Construction & Civils" });
    // Ampersand is HTML-escaped in renderToString output
    expect(html).toContain("Kagiso Construction &amp; Civils");
    expect(html).toContain("R8,500/m²"); // home extensions
    expect(html).toContain("R45,000"); // kitchen renovation
    expect(html).toContain("wa.me");
    expect(html).toContain("Midrand, Gauteng");
  });

  it("uploads (hero, gallery, logo) are preserved, not replaced by demo imagery", () => {
    const uploadedHero = "https://res.cloudinary.com/demo/image/upload/v1/custom-hero.jpg";
    const uploadedGallery = [
      "https://res.cloudinary.com/demo/image/upload/v1/g1.jpg",
      "https://res.cloudinary.com/demo/image/upload/v1/g2.jpg",
    ];
    const customLogo = "https://res.cloudinary.com/demo/image/upload/v1/logo.png";

    // Logo is rendered by all four concepts (nav + footer).
    for (const industry of ["electrician", "plumber", "carpenter", "construction"]) {
      const site = getDemoSiteData({ industry }, { isDemo: true }) as any;
      const withUploads = { ...site, logoUrl: customLogo };
      const html = renderToString(React.createElement(ForgeTemplate, { site: withUploads }));
      expect(html).toContain(customLogo);
    }

    // Hero image is rendered by electrician, plumber and construction.
    // Carpenter uses gallery images for its editorial hero instead.
    for (const industry of ["electrician", "plumber", "construction"]) {
      const site = getDemoSiteData({ industry }, { isDemo: true }) as any;
      const withUploads = { ...site, heroImageUrl: uploadedHero };
      const html = renderToString(React.createElement(ForgeTemplate, { site: withUploads }));
      expect(html).toContain(uploadedHero);
    }

    // Gallery images appear in concepts that render a project gallery grid
    // (carpenter, construction). Electrician and Plumber render only the hero image.
    for (const industry of ["carpenter", "construction"]) {
      const site = getDemoSiteData({ industry }, { isDemo: true }) as any;
      const withUploads = { ...site, galleryUrls: uploadedGallery };
      const html = renderToString(React.createElement(ForgeTemplate, { site: withUploads }));
      expect(html).toContain(uploadedGallery[0]);
    }
  });
});

describe("Forge — regression: non-Forge templates unchanged", () => {
  it("Coffee Shop (Savanna) still renders with its own design", () => {
    const coffee = getDemoSiteData({ industry: "coffeeShop" }, { isDemo: true }) as any;
    const html = renderToString(React.createElement(SavannaTemplate, { site: coffee }));
    expect(html).toContain("Freshly roasted");
    expect(html).toContain("Today&#x27;s menu");
  });

  it("Bakery (Market) still renders with its own design", () => {
    const bakery = getDemoSiteData({ industry: "bakery" }, { isDemo: true }) as any;
    const html = renderToString(React.createElement(MarketTemplate, { site: bakery }));
    // Apostrophe is HTML-escaped in renderToString output
    expect(html).toContain("Noma&#x27;s Home Bakery");
    expect(html).toContain("R85"); // sourdough loaf
  });

  it("Barber (Velvet) still renders with its own design", () => {
    const barber = getDemoSiteData({ industry: "barber" }, { isDemo: true }) as any;
    const html = renderToString(React.createElement(VelvetTemplate, { site: barber }));
    // Barber variant copy (check existing velvet-barber.test.ts for reference)
    expect(html).toContain("Stay");
    expect(html).toContain("respected");
    expect(html).toContain("Cuts &amp; grooming");
    expect(html).toContain("#0f1113"); // charcoal
    expect(html).toContain("#c9a25a"); // brass
  });
});

describe("Forge — mobile safeguards present in all four concepts", () => {
  it("no fixed desktop widths that would cause overflow at 320px", () => {
    for (const industry of ["electrician", "plumber", "carpenter", "construction"]) {
      const html = render(industry);
      expect(html).not.toMatch(/w-\[1200px\]|w-\[1440px\]/);
      // Responsive containers present
      expect(html).toContain("max-w-6xl");
    }
  });

  it("break-words and min-w-0 handling for long names/prices", () => {
    const longName = {
      businessName: "A Really Long Trade Business Name That Could Overflow A Narrow Phone Screen",
      services: [
        {
          name: "Extraordinarily long service name that tests wrapping at 320px width",
          price: "from R1,200.00",
          description: "A very long description that must wrap inside the card.",
        },
      ],
    };
    for (const industry of ["electrician", "plumber", "carpenter", "construction"]) {
      const html = render(industry, longName);
      expect(html).toContain("Extraordinarily long service name");
      expect(html).toContain("from R1,200.00");
      expect(html).toContain("break-words");
      expect(html).toContain("min-w-0");
    }
  });
});
