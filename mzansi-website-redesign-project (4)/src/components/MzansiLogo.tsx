import Image from "next/image";

interface MzansiLogoProps {
  /** px size for the icon circle (default 36) */
  size?: number;
  /** Show the "MzansiSite" wordmark next to the icon */
  wordmark?: boolean;
  className?: string;
}

export default function MzansiLogo({ size = 36, wordmark = true, className = "" }: MzansiLogoProps) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/mzansi-logo.svg"
        alt="MzansiSite logo"
        width={size}
        height={size}
        className="shrink-0"
        priority
      />
      {wordmark && (
        <span className="font-display text-xl font-extrabold tracking-tight leading-none">
          Mzansi<span className="text-flame">Site</span>
        </span>
      )}
    </span>
  );
}
