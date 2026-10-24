/**
 * Barber template pack — shared atoms (adapted for MzansiSite).
 * Mirrors the pack's src/components/kit.tsx but reuses MzansiSite's waLink.
 */

import { MessageCircle } from "lucide-react";
import { cn } from "./cn";
import type { SiteData } from "@/templates/types";
import { waLink } from "@/templates/types";

/**
 * Small honesty label used wherever sample content could be mistaken for real.
 */
export function SamplePill({ className, label = "Sample" }: { className?: string; label?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-current/40 px-2 py-[2px]",
        "text-[10px] font-semibold uppercase tracking-[0.14em] opacity-80 align-middle",
        className,
      )}
    >
      {label}
    </span>
  );
}

/** Circle monogram fallback when no logo has been uploaded. */
export function Monogram({ name, className }: { name: string; className?: string }) {
  const initials = (name || "YB")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      aria-hidden
      className={cn(
        "grid place-items-center rounded-full border border-current/50 font-semibold",
        className,
      )}
    >
      {initials}
    </span>
  );
}

/** Logo image if uploaded, otherwise a monogram. Shared so all designs agree. */
export function BrandMark({
  logo,
  name,
  className,
  imgClassName,
}: {
  logo: string | null;
  name: string;
  className?: string;
  imgClassName?: string;
}) {
  if (logo) {
    return (
      <span className={cn("grid place-items-center overflow-hidden rounded-full bg-white", className)}>
        <img src={logo} alt={`${name} logo`} className={cn("h-full w-full object-cover", imgClassName)} />
      </span>
    );
  }
  return <Monogram name={name} className={className} />;
}

/**
 * The pack's primary action. Renders as a real wa.me link when a number
 * exists; as an honest placeholder chip when it does not.
 */
export function WhatsAppAction({
  whatsapp,
  message,
  label = "Enquire on WhatsApp",
  className,
  iconClassName,
}: {
  whatsapp: string;
  message: string;
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  const has = whatsapp.replace(/\D/g, "").length >= 10;
  const icon = <MessageCircle className={cn("h-4 w-4 shrink-0", iconClassName)} aria-hidden />;
  if (!has) {
    return (
      <span
        className={cn(
          "inline-flex cursor-not-allowed items-center gap-2 border border-dashed border-current/50 px-5 py-3 text-sm font-semibold opacity-80",
          className,
        )}
        title="Add your WhatsApp number in the editor to activate this button"
      >
        {icon} WhatsApp number not added yet
      </span>
    );
  }
  return (
    <a
      href={waLink(whatsapp, message)}
      target="_blank"
      rel="noreferrer"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export const defaultEnquiry = (businessName: string) =>
  `Hi ${businessName || "there"}, I'd like to enquire about a cut. (Sent from my MzansiSite demo website)`;

/** Helper to render a WhatsAppAction for a SiteData record. */
export function WhatsAppActionForSite({
  site,
  label = "Enquire on WhatsApp",
  className,
  iconClassName,
}: {
  site: SiteData;
  label?: string;
  className?: string;
  iconClassName?: string;
}) {
  return (
    <WhatsAppAction
      whatsapp={site.whatsapp}
      message={defaultEnquiry(site.businessName)}
      label={label}
      className={className}
      iconClassName={iconClassName}
    />
  );
}
