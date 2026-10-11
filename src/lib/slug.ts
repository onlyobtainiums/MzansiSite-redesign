/** URL-safe slug from a business name + short random suffix for uniqueness. */
export function makeSlug(businessName: string): string {
  const base = businessName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "site";
  const suffix = Math.random().toString(36).slice(2, 6);
  return `${base}-${suffix}`;
}
