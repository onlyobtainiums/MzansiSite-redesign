import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Syne, Instrument_Serif, Space_Grotesk } from "next/font/google";
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

export const metadata: Metadata = {
  title: "MzansiSite — Turn WhatsApp into your online storefront",
  description:
    "A professional website for your South African business — services, prices, location and a WhatsApp booking button. Free to build, preview first, R149/month to publish.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${instrument.variable} ${grotesk.variable}`}>
      <body className="bg-bone text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
