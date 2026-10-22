import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Syne, Instrument_Serif, Space_Grotesk } from "next/font/google";
import GA4 from "@/components/analytics/GoogleAnalytics";
import { SITE_URL } from "@/lib/seo";
import { OrganizationJsonLd, WebSiteJsonLd, SoftwareApplicationJsonLd } from "@/components/SEOJsonLd";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-serif",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FF4D00",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MzansiSite — Turn WhatsApp into your online storefront",
    template: "%s | MzansiSite",
  },
  description:
    "A professional website for your South African business — services, prices, location and a WhatsApp booking button. Free to build, preview first, R149.99/month to publish.",
  applicationName: "MzansiSite",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: `${SITE_URL}/`,
    siteName: "MzansiSite",
    title: "MzansiSite — Turn WhatsApp into your online storefront",
    description:
      "Services, prices, location and a big WhatsApp booking button — built in about 60 seconds for South African salons, barbers, braiders, nail techs and small businesses.",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "MzansiSite — Websites for Mzansi businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MzansiSite — Turn WhatsApp into your online storefront",
    description:
      "Website builder for South African small businesses. Free to build, preview first, R149.99/month to publish.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "Business",
  creator: "MzansiSite",
  publisher: "MzansiSite",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className={`${syne.variable} ${instrument.variable} ${grotesk.variable}`}>
      <body className="bg-bone text-ink antialiased">
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <SoftwareApplicationJsonLd />
        {children}
        {/* Single GA4 installation — configured via NEXT_PUBLIC_GA_MEASUREMENT_ID (fallback G-W3123L8FLP). */}
        <GA4 />
      </body>
    </html>
  );
}
