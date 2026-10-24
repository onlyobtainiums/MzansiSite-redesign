/**
 * Editor panel — every change lands instantly in the shared StudioContext,
 * so the visible template (and every other design) updates immediately.
 * Everything here is TEMPORARY by design: no persistence, clearly labelled.
 */
import { useState } from 'react';
import {
  BadgeCheck, Clock, History, Plus, RotateCcw, Trash2, User, Briefcase, Images,
} from 'lucide-react';
import { cn } from '../utils/cn';
import { useStudio } from '../state/StudioContext';
import { LogoUploader, PhotoUploader } from './uploaders';
import { validateWhatsApp } from '../lib/utils';
import type { EditorTab } from '../types';

const TABS: { id: EditorTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'business', label: 'Business', icon: User },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'media', label: 'Photos & logo', icon: Images },
];

export default function EditorPanel() {
  const { editorTab, setEditorTab, dirty, resetAll } = useStudio();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <section
      aria-label="Edit preview content"
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#17130d]/12 bg-white shadow-sm"
    >
      <div className="border-b border-[#17130d]/10 px-4 pb-0 pt-4">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-[15px] font-extrabold tracking-tight">Your details</h2>
          {dirty && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
              <History className="h-3 w-3" /> Temporary — not saved
            </span>
          )}
        </div>
        <p className="mt-1 text-[12px] leading-relaxed text-[#17130d]/55">
          Edits update the preview instantly. They live in this browser session only — no account, no save button.
        </p>
        <div className="mt-3 flex gap-1" role="tablist" aria-label="Editor sections">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={editorTab === t.id}
              onClick={() => setEditorTab(t.id)}
              className={cn(
                'flex items-center gap-1.5 rounded-t-lg border-b-2 px-3 py-2.5 text-[12.5px] font-bold transition-colors',
                editorTab === t.id
                  ? 'border-[#b9662a] text-[#17130d]'
                  : 'border-transparent text-[#17130d]/50 hover:text-[#17130d]',
              )}
            >
              <t.icon className="h-3.5 w-3.5" aria-hidden /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mz-frame-scroll min-h-0 flex-1 overflow-y-auto p-4">
        {editorTab === 'business' && <BusinessTab />}
        {editorTab === 'services' && <ServicesTab />}
        {editorTab === 'media' && <MediaTab />}
      </div>

      <div className="border-t border-[#17130d]/10 p-3">
        <button
          onClick={() => {
            if (!confirmReset) { setConfirmReset(true); setTimeout(() => setConfirmReset(false), 3500); return; }
            resetAll();
            setConfirmReset(false);
          }}
          className={cn(
            'flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-[12.5px] font-bold transition-colors',
            confirmReset ? 'bg-red-600 text-white' : 'border border-[#17130d]/15 text-[#17130d]/60 hover:border-[#17130d]/40',
          )}
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {confirmReset ? 'Tap again to restore all sample content' : 'Restore sample content'}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#17130d]/60">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-[11.5px] text-[#17130d]/50">{hint}</span>}
    </label>
  );
}

const inputCls =
  'w-full rounded-xl border border-[#17130d]/15 bg-[#f8f5ee] px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[#b9662a]';

function BusinessTab() {
  const s = useStudio();
  const b = s.business;
  const [waError, setWaError] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <Field label="Business name">
        <input className={inputCls} value={b.name} placeholder="e.g. The Gilded Comb"
          onChange={(e) => s.updateBusiness({ name: e.target.value })} />
      </Field>
      <Field label="One-liner / tagline">
        <input className={inputCls} value={b.tagline} placeholder="Sharp cuts, honest prices, no rush."
          onChange={(e) => s.updateBusiness({ tagline: e.target.value })} />
      </Field>
      <Field label="Story / about" hint="Blank lines start new paragraphs. Designs like Market lead with this.">
        <textarea className={cn(inputCls, 'min-h-[110px] resize-y')} value={b.description}
          onChange={(e) => s.updateBusiness({ description: e.target.value })} />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <Field label="WhatsApp number" hint="International format is safest: +27 82 555 0147">
          <input
            className={cn(inputCls, waError && 'border-red-400')}
            value={b.whatsapp}
            inputMode="tel"
            placeholder="+27 82 555 0147"
            aria-invalid={!!waError}
            onChange={(e) => { s.updateBusiness({ whatsapp: e.target.value }); setWaError(null); }}
            onBlur={() => {
              if (!b.whatsapp.trim()) return setWaError(null);
              const check = validateWhatsApp(b.whatsapp);
              setWaError(check.ok ? null : check.message);
            }}
          />
          {waError && <span className="mt-1 block text-[12px] font-semibold text-red-700">{waError}</span>}
        </Field>
        <Field label="Phone (display)">
          <input className={inputCls} value={b.phone} placeholder="021 555 0147"
            onChange={(e) => s.updateBusiness({ phone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={inputCls} type="email" value={b.email} placeholder="you@shop.co.za"
            onChange={(e) => s.updateBusiness({ email: e.target.value })} />
        </Field>
        <Field label="Area / suburb + city">
          <input className={inputCls} value={b.area} placeholder="De Waterkant, Cape Town"
            onChange={(e) => s.updateBusiness({ area: e.target.value })} />
        </Field>
      </div>
      <Field label="Street address">
        <input className={inputCls} value={b.address} placeholder="41 Jarvis Street"
          onChange={(e) => s.updateBusiness({ address: e.target.value })} />
      </Field>

      {/* hours */}
      <fieldset>
        <legend className="mb-2 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#17130d]/60">
          <Clock className="h-3.5 w-3.5" /> Opening hours
        </legend>
        <div className="space-y-2">
          {b.hours.map((h) => (
            <div key={h.id} className="flex items-center gap-2">
              <input className={cn(inputCls, 'w-[38%]')} value={h.label} placeholder="Mon – Fri" aria-label="Days"
                onChange={(e) => s.updateHour(h.id, { label: e.target.value })} />
              <input className={inputCls} value={h.value} placeholder="08:30 – 18:00" aria-label="Hours"
                onChange={(e) => s.updateHour(h.id, { value: e.target.value })} />
              <button onClick={() => s.removeHourRow(h.id)} aria-label="Remove hours row"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#17130d]/15 text-[#17130d]/50 hover:border-red-300 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button onClick={s.addHourRow}
            className="flex items-center gap-2 rounded-xl border border-dashed border-[#17130d]/25 px-4 py-2.5 text-[12.5px] font-bold text-[#17130d]/60 hover:border-[#b9662a] hover:text-[#b9662a]">
            <Plus className="h-4 w-4" /> Add hours row (e.g. public holidays)
          </button>
        </div>
      </fieldset>

      {/* credentials — honesty module */}
      <fieldset className="rounded-xl border border-[#17130d]/12 bg-[#f8f5ee] p-3.5">
        <legend className="flex items-center gap-2 px-1 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#17130d]/60">
          <BadgeCheck className="h-3.5 w-3.5" /> Credentials (real ones only)
        </legend>
        <p className="mb-3 text-[12px] leading-relaxed text-[#17130d]/55">
          Add genuine qualifications, certificates or memberships. The designs never invent these —
          leave empty and they simply say so.
        </p>
        <div className="space-y-2">
          {b.credentials.map((c, i) => (
            <div key={i} className="flex items-center gap-2">
              <input className={inputCls} value={c} placeholder="e.g. Services SETA-accredited barbering certificate"
                aria-label={`Credential ${i + 1}`}
                onChange={(e) => s.setCredential(i, e.target.value)} />
              <button onClick={() => s.removeCredential(i)} aria-label={`Remove credential ${i + 1}`}
                className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-[#17130d]/15 text-[#17130d]/50 hover:border-red-300 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
          <button onClick={s.addCredential}
            className="flex items-center gap-2 rounded-xl border border-dashed border-[#17130d]/25 px-4 py-2.5 text-[12.5px] font-bold text-[#17130d]/60 hover:border-[#b9662a] hover:text-[#b9662a]">
            <Plus className="h-4 w-4" /> Add a real credential
          </button>
        </div>
      </fieldset>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function ServicesTab() {
  const s = useStudio();
  return (
    <div className="space-y-4">
      <p className="rounded-xl border border-[#b9662a]/40 bg-[#b9662a]/10 px-3.5 py-2.5 text-[12px] font-semibold leading-relaxed text-[#8a4d1e]">
        These started as <strong>sample services &amp; prices</strong>. Replace every one with your real menu before publishing — designs label them as samples until you do.
      </p>
      {s.business.services.map((svc, i) => (
        <div key={svc.id} className="relative rounded-xl border border-[#17130d]/12 bg-white p-3.5 shadow-sm">
          <p className="mb-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#17130d]/40">Service {i + 1}</p>
          <div className="grid grid-cols-[1fr_110px] gap-2">
            <input className={inputCls} value={svc.name} placeholder="Skin Fade" aria-label="Service name"
              onChange={(e) => s.updateService(svc.id, { name: e.target.value })} />
            <input className={inputCls} value={svc.price} placeholder="R190" aria-label="Price"
              onChange={(e) => s.updateService(svc.id, { price: e.target.value })} />
          </div>
          <input className={cn(inputCls, 'mt-2')} value={svc.category} placeholder="Category — Cuts, Beard…" aria-label="Category"
            onChange={(e) => s.updateService(svc.id, { category: e.target.value })} />
          <input className={cn(inputCls, 'mt-2')} value={svc.description} placeholder="One-line description (optional)" aria-label="Description"
            onChange={(e) => s.updateService(svc.id, { description: e.target.value })} />
          <button onClick={() => s.removeService(svc.id)} aria-label={`Remove ${svc.name || `service ${i + 1}`}`}
            className="absolute right-2.5 top-2.5 grid h-7 w-7 place-items-center rounded-lg border border-[#17130d]/15 text-[#17130d]/50 hover:border-red-300 hover:text-red-600">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button onClick={s.addService}
        className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#17130d]/25 px-4 py-3 text-[13px] font-bold text-[#17130d]/60 hover:border-[#b9662a] hover:text-[#b9662a]">
        <Plus className="h-4 w-4" /> Add a service
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */

function MediaTab() {
  return (
    <div className="space-y-6">
      <p className="rounded-xl bg-[#f8f5ee] px-3.5 py-2.5 text-[12px] leading-relaxed text-[#17130d]/60">
        Uploads appear in <strong>every</strong> design instantly and stay put when you switch templates.
        In this free preview they’re stored in memory only — nothing leaves your browser and nothing is saved.
      </p>
      <LogoUploader />
      <PhotoUploader />
    </div>
  );
}
