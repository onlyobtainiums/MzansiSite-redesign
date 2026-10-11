import { MessageCircle, Globe } from "lucide-react";
import type { SVGProps } from "react";
import type { SiteData } from "./types";
import { waLink } from "./types";

/* ——— Inline brand icons (lucide no longer ships brand marks) ——— */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 1 1-2.31-2.83v-3.5a6.37 6.37 0 1 0 5.76 6.33V8.69a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.12z" />
    </svg>
  );
}

/** Floating WhatsApp button every published site carries. */
export function WhatsAppFab({ site, accent = "#1fbf5f" }: { site: SiteData; accent?: string }) {
  return (
    <a
      href={waLink(site.whatsapp, `Hi ${site.businessName}! I found your website and I'd like to enquire.`)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-[0_14px_30px_-8px_rgba(18,140,75,0.7)] transition-transform duration-300 hover:scale-110"
      style={{ backgroundColor: accent }}
    >
      <MessageCircle className="h-6 w-6 fill-white" style={{ color: accent }} />
    </a>
  );
}

/** Logo or monogram tile for template navbars. */
export function LogoBlock({
  site,
  className = "",
}: {
  site: SiteData;
  className?: string;
}) {
  if (site.logoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={site.logoUrl} alt={site.businessName} className={`h-10 w-auto max-w-[140px] object-contain ${className}`} />;
  }
  const initials = site.businessName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center text-sm font-bold ${className}`}>{initials}</span>
  );
}

/** Social icon row — only renders networks the owner filled in. */
export function SocialRow({
  site,
  iconClassName = "",
  linkClassName = "",
}: {
  site: SiteData;
  iconClassName?: string;
  linkClassName?: string;
}) {
  const links = [
    { key: "instagram", url: site.socials.instagram, Icon: InstagramIcon, label: "Instagram" },
    { key: "facebook", url: site.socials.facebook, Icon: FacebookIcon, label: "Facebook" },
    { key: "tiktok", url: site.socials.tiktok, Icon: TikTokIcon, label: "TikTok" },
    { key: "website", url: site.socials.website, Icon: Globe, label: "Website" },
  ].filter((l) => l.url);

  if (links.length === 0) return null;
  return (
    <div className="flex items-center gap-3">
      {links.map(({ key, url, Icon, label }) => (
        <a
          key={key}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className={`transition-transform duration-300 hover:-translate-y-0.5 ${linkClassName}`}
        >
          <Icon className={`h-[18px] w-[18px] ${iconClassName}`} />
        </a>
      ))}
    </div>
  );
}
