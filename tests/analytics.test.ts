/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import React from 'react';

vi.mock('@next/third-parties/google', () => ({
  GoogleAnalytics: ({ gaId }: { gaId: string }) =>
    React.createElement('div', { 'data-ga-id': gaId }, `GA:${gaId}`),
}));

/**
 * GA4 safety tests — ensure no PII leaks, no duplicate tags, correct ID handling.
 */

describe('lib/analytics — GA4 helpers', () => {
  const origEnv = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  afterEach(() => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = origEnv;
    vi.restoreAllMocks();
    // clean window.gtag
    if (typeof window !== 'undefined') {
      delete (window as any).gtag;
    }
  });

  it('getGtagId returns valid env ID', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-W3123L8FLP';
    const { getGtagId } = await import('@/lib/analytics');
    expect(getGtagId()).toBe('G-W3123L8FLP');
  });

  it('getGtagId returns undefined for invalid ID', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'invalid';
    vi.resetModules();
    const { getGtagId } = await import('@/lib/analytics');
    expect(getGtagId()).toBeUndefined();
  });

  it('getGtagId returns undefined when not set', async () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    vi.resetModules();
    const { getGtagId } = await import('@/lib/analytics');
    expect(getGtagId()).toBeUndefined();
  });

  it('VERIFIED_GA_ID is G-W3123L8FLP', async () => {
    const { VERIFIED_GA_ID } = await import('@/lib/analytics');
    expect(VERIFIED_GA_ID).toBe('G-W3123L8FLP');
  });

  it('isAnalyticsConfigured respects env', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-W3123L8FLP';
    vi.resetModules();
    const { isAnalyticsConfigured } = await import('@/lib/analytics');
    expect(isAnalyticsConfigured()).toBe(true);

    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    vi.resetModules();
    const { isAnalyticsConfigured: is2 } = await import('@/lib/analytics');
    expect(is2()).toBe(false);
  });

  it('trackEvent no-ops when gtag missing', async () => {
    delete (window as any).gtag;
    const { trackEvent } = await import('@/lib/analytics');
    expect(() => trackEvent('test_event', { foo: 'bar' })).not.toThrow();
  });

  it('trackEvent sends safe params and strips PII', async () => {
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('lead_submitted', {
      trade: 'plumbing',
      email: 'secret@example.com',
      phone: '0821234567',
      whatsapp: '0821234567',
      paystackReference: 'ref_123',
      firebaseUid: 'uid123',
      custom: 'ok',
    });

    expect(gtag).toHaveBeenCalledWith('event', 'lead_submitted', {
      trade: 'plumbing',
      custom: 'ok',
    });
    // Ensure blocked keys not sent
    const sent = gtag.mock.calls[0][2] as Record<string, unknown>;
    expect(sent).not.toHaveProperty('email');
    expect(sent).not.toHaveProperty('phone');
    expect(sent).not.toHaveProperty('paystackReference');
  });

  it('trackEvent drops overly long strings (avoids leaking site JSON)', async () => {
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    const { trackEvent } = await import('@/lib/analytics');

    trackEvent('test', {
      short: 'ok',
      long: 'a'.repeat(200),
    });

    expect(gtag).toHaveBeenCalledWith('event', 'test', { short: 'ok' });
  });

  it('trackEvent handles undefined params', async () => {
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    const { trackEvent } = await import('@/lib/analytics');
    trackEvent('page_view');
    expect(gtag).toHaveBeenCalledWith('event', 'page_view', {});
  });

  it('analyticsEvents wrappers call trackEvent with correct names', async () => {
    const gtag = vi.fn();
    (window as any).gtag = gtag;
    const { analyticsEvents } = await import('@/lib/analytics');

    analyticsEvents.builderStarted({ templateId: 'velvet' });
    expect(gtag).toHaveBeenCalledWith('event', 'builder_started', { templateId: 'velvet' });

    analyticsEvents.beginCheckout({ planCode: 'mzansisite-monthly' });
    expect(gtag).toHaveBeenCalledWith('event', 'begin_checkout', { plan_code: 'mzansisite-monthly' });

    analyticsEvents.purchaseCompleted({ planCode: 'mzansisite-monthly' });
    expect(gtag).toHaveBeenCalledWith('event', 'purchase', { plan_code: 'mzansisite-monthly' });
  });
});

describe('components/analytics/GoogleAnalytics — single installation', () => {
  it('renders GoogleAnalytics with env ID or fallback', async () => {
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = 'G-W3123L8FLP';
    vi.resetModules();

    const { default: GA4 } = await import('@/components/analytics/GoogleAnalytics');
    const ReactMod = await import('react');
    const { renderToString } = await import('react-dom/server');

    const html = renderToString(ReactMod.createElement(GA4));
    expect(html).toContain('G-W3123L8FLP');
    expect(html).toContain('data-ga-id');
  });

  it('falls back to verified ID when env not set', async () => {
    delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    vi.resetModules();

    const { default: GA4 } = await import('@/components/analytics/GoogleAnalytics');
    const ReactMod = await import('react');
    const { renderToString } = await import('react-dom/server');

    const html = renderToString(ReactMod.createElement(GA4));
    // Should fallback to G-W3123L8FLP, not render nothing
    expect(html).toContain('G-W3123L8FLP');
  });

  it('does not render duplicate scripts — single GA4 component', async () => {
    // Verify layout only includes one GA4 import (wrapper) and not a direct next/third-parties import
    const fs = await import('fs');
    const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
    // Should import GA4 wrapper once and render <GA4 /> once
    expect(layout.includes("@/components/analytics/GoogleAnalytics")).toBe(true);
    expect((layout.match(/<GA4/g) || []).length).toBe(1);
    // Must not directly import from @next/third-parties/google in layout — that's the wrapper's job
    expect(layout.includes("@next/third-parties/google")).toBe(false);
    expect(layout.includes("<GoogleAnalytics")).toBe(false);
  });

  it('layout does not contain manual gtag scripts', async () => {
    const fs = await import('fs');
    const layout = fs.readFileSync('src/app/layout.tsx', 'utf8');
    expect(layout).not.toContain('googletagmanager');
    expect(layout).not.toContain('gtag(');
    expect(layout).not.toContain('page_view');
  });

  it('no existing duplicate tags in repo', async () => {
    const { execSync } = await import('child_process');
    // Search for any other gtag/GA installation outside our new files
    const out = execSync(
      'grep -r "googletagmanager\\|gtag(" --include="*.ts" --include="*.tsx" src --exclude-dir=analytics 2>&1 | grep -v "lib/analytics.ts" | grep -v "components/analytics" || true',
      { encoding: 'utf8' }
    );
    // Should find no other installations
    const lines = out.trim() ? out.trim().split('\n').filter(Boolean) : [];
    // Allow only our analytics helper's gtag call
    const unexpected = lines.filter((l: string) => !l.includes('lib/analytics'));
    expect(unexpected.length).toBe(0);
  });
});
