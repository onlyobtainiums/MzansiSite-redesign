/**
 * Upgrade handoff — honest by construction.
 *
 * This prototype does NOT fake a payment or a success screen. It explains the
 * path and exposes the seam where MzansiSite's existing subscription flow
 * plugs in: the platform verifies payment server-side, then re-opens the
 * editor with the plan's limits (see config/limits.ts → resolvePaidPhotoLimit).
 */
import { useState } from 'react';
import { ArrowRight, BadgeCheck, CreditCard, Lock, X } from 'lucide-react';
import { beginSubscriptionHandoff } from '../lib/handoff';

export default function UpgradeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [handoffNote, setHandoffNote] = useState<string | null>(null);
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#17130d]/70 p-4 backdrop-blur-sm"
      role="dialog" aria-modal="true" aria-labelledby="upgrade-title"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="mz-fade-up w-full max-w-lg overflow-hidden rounded-2xl bg-[#f5f1e8] text-[#17130d] shadow-2xl">
        <div className="flex items-start justify-between bg-[#17130d] px-6 py-5 text-[#f5f1e8]">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#b9662a]">Upgrade path</p>
            <h2 id="upgrade-title" className="mt-1 font-velvet text-2xl font-light">Unlock the full editor</h2>
          </div>
          <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full border border-[#f5f1e8]/25 hover:border-[#b9662a] hover:text-[#b9662a]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-6 text-[13.5px] leading-relaxed">
          <ol className="space-y-3">
            {[
              { icon: CreditCard, t: 'Choose a plan on MzansiSite', d: 'Subscriptions and billing stay on the MzansiSite platform — this prototype never processes payments.' },
              { icon: BadgeCheck, t: 'Platform verifies payment', d: 'The existing platform confirms your subscription server-side and returns you here with a verified session. We never trust a “success” URL alone.' },
              { icon: Lock, t: 'Full editor unlocks', d: 'More photo slots (set by your plan, not hard-coded), extra pages and publishing — according to your actual plan limits.' },
            ].map((s, i) => (
              <li key={i} className="flex gap-3.5 rounded-xl border border-[#17130d]/10 bg-white p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#b9662a]/15 text-[#b9662a]">
                  <s.icon className="h-4.5 w-4.5" aria-hidden />
                </span>
                <span>
                  <span className="block font-bold">{i + 1}. {s.t}</span>
                  <span className="mt-0.5 block text-[#17130d]/65">{s.d}</span>
                </span>
              </li>
            ))}
          </ol>

          <p className="rounded-xl border border-dashed border-[#b9662a]/50 bg-[#b9662a]/10 px-4 py-3 text-[12.5px] font-semibold text-[#8a4d1e]">
            This demo stops at the free preview. Buttons below show where the platform handoff happens —
            no payment is simulated and nothing is marked “paid”.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setHandoffNote(beginSubscriptionHandoff())}
              className="inline-flex items-center gap-2 rounded-full bg-[#17130d] px-6 py-3 text-sm font-bold text-[#f5f1e8] transition-transform hover:-translate-y-0.5"
            >
              Start subscription on MzansiSite <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={onClose} className="rounded-full border border-[#17130d]/25 px-6 py-3 text-sm font-bold hover:border-[#17130d]">
              Keep previewing free
            </button>
          </div>
          {handoffNote && (
            <p role="status" className="rounded-lg bg-[#17130d] px-4 py-3 text-[12px] font-semibold leading-relaxed text-[#f5f1e8]">
              {handoffNote}
            </p>
          )}
          <p className="text-[11.5px] text-[#17130d]/50">
            Your temporary preview content stays untouched while you decide.
          </p>
        </div>
      </div>
    </div>
  );
}
