/**
 * Minimal cn() utility — merges class names conditionally.
 * MzansiSite does not depend on clsx/tailwind-merge, so this small helper
 * covers the pack's usage (static strings + conditional objects).
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
