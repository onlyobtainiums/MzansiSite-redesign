/**
 * Preview studio — the working free preview.
 *
 * • Six design pills: switching keeps ALL preview data (context-owned).
 * • Mobile / desktop device frames: templates respond to frame width via
 *   CSS container queries (no fake "mobile views").
 * • Editor changes render live. Everything is labelled temporary.
 */
import { useRef, useState } from 'react';
import { ArrowLeft, Crown, History, Monitor, Smartphone } from 'lucide-react';
import { cn } from '../utils/cn';
import { useStudio, type Device } from '../state/StudioContext';
import { TEMPLATES, templateById } from '../templates/registry';
import type { EditorTab } from '../types';
import EditorPanel from '../components/EditorPanel';
import UpgradeModal from '../components/UpgradeModal';

export default function PreviewStudio() {
  const s = useStudio();
  const active = templateById(s.activeTemplate);
  const Template = active.component;
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const editorAnchor = useRef<HTMLDivElement>(null);

  const requestEdit = (tab: EditorTab) => {
    s.openEditorTab(tab);
    editorAnchor.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div
      className="min-h-screen font-['Inter']"
      style={{
        backgroundColor: '#575046',
        backgroundImage:
          'radial-gradient(1200px 500px at 85% -10%, rgba(185,102,42,0.25), transparent 60%), repeating-linear-gradient(-45deg, rgba(255,255,255,0.022) 0 2px, transparent 2px 9px)',
      }}
    >
      {/* ------------------------------------------------ chrome */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#17130d] text-[#f5f1e8]">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-3 px-4 py-3 md:px-8">
          <button
            onClick={s.backToChooser}
            className="inline-flex items-center gap-2 rounded-full border border-[#f5f1e8]/25 px-4 py-2 text-[12.5px] font-bold transition-colors hover:border-[#b9662a] hover:text-[#b9662a]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Designs
          </button>
          <div className="hidden items-center gap-2 text-[13px] font-bold md:flex">
            <span className="text-[#b9662a]">MzansiSite Studio</span>
            <span className="text-[#f5f1e8]/40">/</span>
            <span>{active.name}</span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f5f1e8]/70">
              {active.strategy}
            </span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            {s.dirty && (
              <span className="hidden items-center gap-1.5 rounded-full bg-amber-400/15 px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wide text-amber-300 sm:inline-flex">
                <History className="h-3 w-3" /> Temporary preview — not saved
              </span>
            )}
            <button
              onClick={() => setUpgradeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#b9662a] px-4 py-2 text-[12.5px] font-bold text-[#17130d] transition-transform hover:-translate-y-0.5"
            >
              <Crown className="h-3.5 w-3.5" /> Unlock full editing
            </button>
          </div>
        </div>

        {/* design pills + device toggle */}
        <div className="border-t border-white/10 bg-[#1f1a12]">
          <div className="mx-auto flex max-w-[1500px] items-center gap-2 overflow-x-auto px-4 py-2.5 md:px-8 [scrollbar-width:none]">
            <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.18em] text-[#f5f1e8]/40">Design</span>
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => s.setActiveTemplate(t.id)}
                aria-pressed={t.id === s.activeTemplate}
                className={cn(
                  'flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12px] font-bold transition-colors',
                  t.id === s.activeTemplate
                    ? 'border-[#b9662a] bg-[#b9662a] text-[#17130d]'
                    : 'border-[#f5f1e8]/20 text-[#f5f1e8]/65 hover:border-[#f5f1e8]/50 hover:text-[#f5f1e8]',
                )}
              >
                <span className="flex gap-0.5" aria-hidden>
                  {t.chips.map((c) => (
                    <span key={c} className="h-2.5 w-2.5 rounded-full border border-black/20" style={{ background: c }} />
                  ))}
                </span>
                {t.name}
              </button>
            ))}

            <div className="ml-auto flex shrink-0 items-center gap-1 rounded-full border border-[#f5f1e8]/20 p-1" role="group" aria-label="Preview device">
              {([['mobile', Smartphone, 'Mobile'], ['desktop', Monitor, 'Desktop']] as [Device, typeof Monitor, string][]).map(([d, Icon, label]) => (
                <button
                  key={d}
                  aria-pressed={s.device === d}
                  onClick={() => s.setDevice(d)}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-bold transition-colors',
                    s.device === d ? 'bg-[#f5f1e8] text-[#17130d]' : 'text-[#f5f1e8]/60 hover:text-[#f5f1e8]',
                  )}
                >
                  <Icon className="h-3.5 w-3.5" /> <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------ workspace */}
      <main className="mx-auto grid max-w-[1500px] gap-6 px-4 py-6 md:px-8 lg:grid-cols-[400px_minmax(0,1fr)]">
        <div ref={editorAnchor} className="lg:sticky lg:top-[132px] lg:h-[calc(100vh-160px)] lg:min-h-[560px]">
          <EditorPanel />
        </div>

        <div className="min-w-0">
          <div className="mb-3 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.18em] text-white/60">
            <span>Live preview — {s.device === 'mobile' ? 'phone width (390px)' : 'desktop width'}</span>
            <span className="hidden sm:inline">Edits appear instantly · sample content is labelled</span>
          </div>
          <DeviceFrame device={s.device} url={`preview.mzansisite.co.za/${active.id.toLowerCase()}`}>
            <Template business={s.business} logo={s.logo} photos={s.photos} onEditRequest={requestEdit} />
          </DeviceFrame>
        </div>
      </main>

      <UpgradeModal open={upgradeOpen} onClose={() => setUpgradeOpen(false)} />
    </div>
  );
}

/* ------------------------------------------------------------------ */

function DeviceFrame({ device, url, children }: { device: Device; url: string; children: React.ReactNode }) {
  const mobile = device === 'mobile';
  return (
    <div
      className={cn('mx-auto transition-[max-width] duration-500 ease-out motion-reduce:transition-none')}
      style={{ maxWidth: mobile ? 392 : '100%' }}
    >
      <div
        className={cn(
          'overflow-hidden bg-white shadow-2xl ring-1 ring-black/20',
          mobile ? 'rounded-[2.2rem] border-[6px] border-[#17130d]' : 'rounded-xl border border-[#17130d]/25',
        )}
      >
        {/* chrome bar */}
        {mobile ? (
          <div className="relative flex h-9 items-center justify-center bg-[#17130d]">
            <span className="h-4 w-24 rounded-full bg-black ring-1 ring-white/10" aria-hidden />
          </div>
        ) : (
          <div className="flex h-10 items-center gap-3 border-b border-black/10 bg-[#eae5d9] px-4">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full bg-[#d9501e]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#c9a227]/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#55602f]/70" />
            </span>
            <span className="mx-auto flex w-full max-w-sm items-center justify-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold text-[#17130d]/60">
              {url}
            </span>
            <span className="w-10" aria-hidden />
          </div>
        )}
        {/* viewport */}
        <div className={cn('mz-frame-scroll overflow-y-auto bg-white', mobile ? 'h-[72vh]' : 'h-[74vh]')}>
          {children}
        </div>
      </div>
      <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/45">
        {mobile ? 'Scroll inside the phone to explore the page' : 'Scroll inside the window to explore the page'}
      </p>
    </div>
  );
}
