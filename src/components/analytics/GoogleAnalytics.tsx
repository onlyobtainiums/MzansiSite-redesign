'use client';

import { GoogleAnalytics } from '@next/third-parties/google';
import { getGtagId } from '@/lib/analytics';

/**
 * GA4 wrapper — single installation point for the whole app.
 *
 * - Reads NEXT_PUBLIC_GA_MEASUREMENT_ID (public env, not a secret).
 * - Validates format (G-XXXXXXXXXX) to avoid misconfiguration.
 * - Falls back to verified ID G-W3123L8FLP if env is not set, so tracking
 *   works even when the env var is missing (env still preferred for
 *   staging/test overrides).
 * - Renders nothing when no valid ID can be resolved — no scripts, no network.
 * - Uses @next/third-parties/google which handles App Router navigation
 *   correctly without duplicate page_view events (it listens to
 *   usePathname/useSearchParams internally).
 *
 * Do NOT add a second gtag script or manual page_view tracking elsewhere.
 * Do NOT add Google Tag Manager in addition to this — choose one tag system.
 * Preserves existing Meta Pixel (if any) — this component does not interfere
 * with fbq or other marketing pixels.
 */
export default function GA4() {
  const envId = getGtagId();
  // Fallback to verified Measurement ID; env var takes precedence when set.
  const gaId = envId ?? 'G-W3123L8FLP';

  if (!gaId || !/^G-[A-Z0-9]{4,}$/i.test(gaId)) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'test') {
      // eslint-disable-next-line no-console
      console.debug('[analytics] GA4 not configured — set NEXT_PUBLIC_GA_MEASUREMENT_ID=G-W3123L8FLP in env');
    }
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
