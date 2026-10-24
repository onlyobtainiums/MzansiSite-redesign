# MzansiSite Studio — Barber Template Pack (v1)

Six genuinely different, working barber-business website designs for South African barbershops,
wrapped in a template **selector with auto-rotation** and a **live personalisation preview**.

This is deliverable 1 of a repeatable system: Barber only. The same architecture (registry +
shared content context + per-industry sample data) is intended to scale to 52+ industries.

---

## 1. The six template families

| Family   | Strategy        | Composition highlights                                                                 |
|----------|-----------------|----------------------------------------------------------------------------------------|
| Velvet   | Hero-first      | Full-bleed editorial hero, oversized serif wordmark, meta strip, numbered menu, frames, visit block |
| Forge    | Services-first  | Price list IS the hero: category filter tabs, dotted leaders, mono prices, enquiry band, shop cards |
| Savanna  | Trust-first     | Identity card first, hours/location/contact grids, service standards, **honest credentials module** |
| Praxis   | Gallery-first   | Featured frame, masonry portfolio, caption-labelled services, **real empty states** for no photos |
| Market   | About-first     | Chaptered story with drop-cap, dashed kraft cards, illustrated map card, story fallbacks |
| Vital    | Enquiry-first   | Contact panel + working WhatsApp enquiry form; **never claims a booking is confirmed** |

Templates are pure renderers (`src/templates/<family>/<Family>Template.tsx`) driven by
`TemplateProps`. They respond to **container width** (Tailwind CSS container queries), so the
same component renders its mobile layout in a 390px frame and desktop layout at full width.

## 2. Features

- **Design selector** — 6.5s auto-rotation with progress bar, prev/next, six named direct-select
  pills, pause/play. Pauses on hover, focus or touch, and stays paused after any manual choice
  until you press play. Auto-rotation is completely off under `prefers-reduced-motion`.
- **Working preview personalisation** — business name, tagline, story, WhatsApp, phone, email,
  address, area, opening hours (add/remove rows), services + prices + categories (add/edit/remove),
  credentials, 1 logo upload, up to 6 photo uploads with replace/remove.
- **Live, lossless switching** — all content lives in `StudioContext`; switching designs keeps
  every keystroke and upload. Uploads are validated (JPG/PNG/WebP, ≤ 4 MB) with readable errors.
- **Mobile / desktop device frames** — real responsive behaviour via container queries, with
  browser/phone chrome and internal scrolling.
- **Honest upgrade path** — the "Unlock full editing" modal explains the platform flow and shows
  exactly where the seam is. No fake payment, no fake success screen, no invented plan limits.
- **Honest content everywhere** — sample prices/photos/story are visibly labelled; the pack ships
  zero reviews, ratings, awards, or invented credentials; enquiries are never framed as bookings.

## 3. Setup

```bash
npm install
npm run dev      # local dev
npm run build    # production build (single-file dist/index.html, assets inlined)
```

Requires Node 18+. No environment variables, APIs or services are needed for the prototype.

## 4. Structure & file map

```
src/
  App.tsx                      View shell: chooser ⇄ studio
  types.ts                     Shared contracts: BusinessData, ServiceItem, PhotoItem, TemplateProps…
  vite-env.d.ts
  config/
    limits.ts                  PREVIEW_PHOTO_LIMIT = 6 (free preview only); resolvePaidPhotoLimit()
                               — PAID limits are injected by the platform, never hard-coded
  data/
    barberPack.ts              Labelled SAMPLE content (services, prices, hours, sample photos)
  state/
    StudioContext.tsx          Single source of truth (in-memory on purpose — "temporary & unsaved")
  lib/
    utils.ts                   wa.me links, image validation, file→dataURL, paragraphs…
    handoff.ts                 beginSubscriptionHandoff() / applyVerifiedSubscription() seam
  chooser/
    DesignChooser.tsx          Auto-rotating selector + ScaledStage (live scaled template renders)
  studio/
    PreviewStudio.tsx          Chrome, design pills, device toggle, DeviceFrame
  components/
    EditorPanel.tsx            Tabs: Business / Services / Photos & logo (+ reset with confirm)
    uploaders.tsx              LogoUploader + PhotoUploader (validate, preview, replace, remove)
    UpgradeModal.tsx           Honest upgrade/handoff dialog
    kit.tsx                    Shared atoms: BrandMark, SamplePill, WhatsAppAction
    SmartImage.tsx             Shimmer→fade image
  templates/
    registry.ts                TEMPLATES list: id, name, strategy, blurb, palette, component
    velvet/VelvetTemplate.tsx
    forge/ForgeTemplate.tsx
    savanna/SavannaTemplate.tsx
    praxis/PraxisTemplate.tsx
    market/MarketTemplate.tsx
    vital/VitalTemplate.tsx
  assets/samples/              Bundled demo photography (inlined at build)
index.html / src/index.css     Fonts, per-family type classes, motion-safe keyframes
```

## 5. Data flow & persistence (important)

- Content changes are **in-memory React state only** — nothing is written to a server or
  localStorage. The UI says so ("Temporary — not saved"), and a reset restores sample content.
- The free preview enforces **6 photos / 1 logo** (`config/limits.ts`). Paid-editor limits come from
  the platform via `resolvePaidPhotoLimit(plan)` — this prototype returns `null` until wired up.
- WhatsApp actions build real `wa.me/<number>?text=…` links. Vital's form **drafts** a WhatsApp
  message; copy states that the shop confirms by reply. There is no booking system in this pack.

## 6. Integrating a template into an existing Next.js app

Each template family is self-contained. Example with Velvet:

1. **Copy the module**: `src/templates/velvet/VelvetTemplate.tsx`, plus shared atoms from
   `src/components/kit.tsx` and `src/components/SmartImage.tsx` (or swap `SmartImage` for
   `next/image` — keep its wrapper API).
2. **Provide props**: render with `{ business, logo, photos, onEditRequest }` shaped per
   `src/types.ts`. In production these come from your CMS/database, not `data/barberPack.ts`.
3. **Fonts**: add the family's fonts (see `src/index.css`) via `next/font/google` and map them onto
   the family classes (`font-velvet`, `font-forge`, …).
4. **Responsive behaviour**: templates use CSS container queries (`@container`, `@md:`, `cqw` units).
   Tailwind v4 supports these natively; on Tailwind v3 add `@tailwindcss/container-queries`. If you
   prefer viewport breakpoints, swap `@md:` → `md:` (drop the `cqw` font sizes too).
5. **Links**: `wa.me`, `tel:` and `mailto:` helpers live in `src/lib/utils.ts`; Google Maps links use
   the no-key `maps/search/?api=1&query=` URL scheme.
6. **Upgrade seam**: host checkout → server-side verification → call the editor with a
   `VerifiedSubscriptionSession` (see `src/lib/handoff.ts`). Never unlock on a URL flag alone.

To add the next industry: duplicate `data/barberPack.ts`, regenerate sample imagery under the
no-people rule, and reuse the selector/studio/registry unchanged.

## 7. Limitations (by design, for the prototype)

- No persistence, accounts, or publishing; no payment processing or plan enforcement.
- Photos are embedded as data URLs in memory — large libraries would need real storage in the
  paid editor.
- Six photos in preview; the paid plan limits are **platform-injected** (not in this codebase).
- Templates render single-page compositions (the pack's scope); multi-page is a platform concern.
- Google Fonts load at runtime; offline, system fallbacks apply.

## 8. Concise test checklist

**Selector**
- [ ] Rotates every ~6.5s with progress bar; loops 1→6 in order.
- [ ] Prev/next and all six named pills jump correctly and pause auto-rotation.
- [ ] Pause/play toggles; hover/focus/touch pauses; never auto-resumes after manual choice.
- [ ] `prefers-reduced-motion` → no auto-rotation, no slide animation, notice shown.
- [ ] "Personalise this design" opens the studio on the shown design.

**Preview & editing**
- [ ] All six designs render at device widths 390px and desktop without horizontal overflow.
- [ ] Switching designs keeps name/services/prices/photos/logo edits intact.
- [ ] Logo upload shows in every design; remove restores the monogram fallback.
- [ ] Photo upload ≤ 6 works; 7th rejected with a clear message; >4MB and non-image rejected.
- [ ] Replace and remove work per photo; removing all photos triggers Praxis's empty state with a working "Open photo uploads" button.
- [ ] Bad WhatsApp numbers show a validation hint; empty number swaps CTAs to honest placeholders.
- [ ] "Restore sample content" needs two taps and resets everything; the "Temporary — not saved" badge appears after any edit and clears on reset.

**Honesty rules**
- [ ] Prices/photos/story show "Sample" labels until edited; no reviews/ratings anywhere.
- [ ] Vital's form validates, drafts WhatsApp text, and states that an enquiry is not a booking.
- [ ] Upgrade modal shows the handoff path only; clicking the platform CTA shows the prototype boundary note (no fake success).

**Build**
- [ ] `npm run build` succeeds; single-file output includes the bundled sample images.
