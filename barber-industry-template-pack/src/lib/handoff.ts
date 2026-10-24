/**
 * Subscription handoff seam — the ONLY place the free preview meets billing.
 *
 * Production contract (implemented by the host platform, not this prototype):
 *
 *  1. beginSubscriptionHandoff()
 *     Redirects to the platform's existing checkout, e.g.
 *       location.assign(`${PLATFORM_URL}/billing/subscribe?return=<editor>&industry=barber`)
 *
 *  2. The platform processes payment and verifies it SERVER-SIDE.
 *     It then re-opens the editor with a signed session token.
 *
 *  3. applyVerifiedSubscription(session) is called by the host with a
 *     server-verified session. The editor then uses session.photoLimit etc.
 *     (via config/limits.ts) instead of the free-preview constant.
 *
 * A success URL parameter alone must never unlock anything.
 */

export interface VerifiedSubscriptionSession {
  plan: string;        // decided by the platform's billing catalogue
  photoLimit: number;  // the plan's actual photo limit — injected, not hard-coded
  token: string;       // server-verified session token
}

export interface PaidEditorBoot {
  session: VerifiedSubscriptionSession;
  /** initial content carried over from the free preview */
  previewContent: unknown;
}

export function beginSubscriptionHandoff(): string {
  console.info(
    '[MzansiSite handoff] In production this redirects to the platform checkout and ' +
      'returns only after server-side verification. The prototype stops here by design.',
  );
  return 'Prototype boundary: the checkout URL is supplied by the MzansiSite platform in production. Nothing was charged and no “payment success” state was shown.';
}

/** Host-platform entry point placeholder (never called in the prototype). */
export function applyVerifiedSubscription(_session: VerifiedSubscriptionSession): never {
  throw new Error('Subscriptions are verified by the MzansiSite platform, not by this prototype.');
}
