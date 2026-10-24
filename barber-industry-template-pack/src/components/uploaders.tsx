/**
 * Upload widgets with real validation, preview, replace & remove.
 *
 * Limits here are FREE PREVIEW limits (6 photos / 1 logo). The paid editor
 * receives its limit from the platform — see config/limits.ts.
 */
import { useRef, useState } from 'react';
import { ImagePlus, RefreshCw, Trash2, TriangleAlert, Upload } from 'lucide-react';
import { cn } from '../utils/cn';
import { useStudio } from '../state/StudioContext';
import { ACCEPTED_IMAGE_TYPES, MAX_IMAGE_BYTES, PREVIEW_LOGO_LIMIT, PREVIEW_PHOTO_LIMIT } from '../config/limits';
import { fileToDataURL, validateImageFile } from '../lib/utils';

const ACCEPT = ACCEPTED_IMAGE_TYPES.join(',');

function ErrorList({ errors, onClear }: { errors: string[]; onClear: () => void }) {
  if (!errors.length) return null;
  return (
    <div role="alert" className="rounded-xl border border-red-300 bg-red-50 p-3 text-[12.5px] text-red-800">
      <p className="flex items-center gap-2 font-bold"><TriangleAlert className="h-3.5 w-3.5" /> Couldn’t add those files</p>
      <ul className="mt-1.5 list-disc space-y-1 pl-6">
        {errors.map((e, i) => <li key={i}>{e}</li>)}
      </ul>
      <button onClick={onClear} className="mt-2 font-bold underline underline-offset-2">Dismiss</button>
    </div>
  );
}

export function LogoUploader() {
  const { logo, setLogo, business } = useStudio();
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  async function onPick(file: File | undefined) {
    if (!file) return;
    const err = validateImageFile(file);
    if (err) return setErrors([err]);
    setErrors([]);
    setLogo(await fileToDataURL(file));
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          {logo ? (
            <>
              <img src={logo} alt="Your logo preview" className="h-full w-full rounded-full border border-[#17130d]/15 object-cover" />
              <button
                onClick={() => setLogo(null)}
                aria-label="Remove logo"
                className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-[#17130d] text-white shadow"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </>
          ) : (
            <button
              onClick={() => inputRef.current?.click()}
              className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-[#17130d]/30 text-[#17130d]/50 transition-colors hover:border-[#b9662a] hover:text-[#b9662a]"
            >
              <Upload className="h-4 w-4" />
              <span className="text-[9px] font-bold uppercase tracking-wide">Logo</span>
            </button>
          )}
        </div>
        <div className="text-[12.5px] leading-relaxed text-[#17130d]/60">
          <p className="font-bold text-[#17130d]">Business logo ({PREVIEW_LOGO_LIMIT} max)</p>
          <p>JPG, PNG or WebP, up to {MAX_IMAGE_BYTES / 1024 / 1024} MB. Shows in the header of every design.
            Without a logo we use your initials.</p>
          {logo && (
            <button onClick={() => inputRef.current?.click()} className="mt-1 inline-flex items-center gap-1 font-bold text-[#b9662a] hover:underline">
              <RefreshCw className="h-3 w-3" /> Replace logo
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          aria-label={`Upload logo for ${business.name || 'your business'}`}
          onChange={(e) => { void onPick(e.target.files?.[0]); e.target.value = ''; }}
        />
      </div>
      <div className="mt-3"><ErrorList errors={errors} onClear={() => setErrors([])} /></div>
    </div>
  );
}

export function PhotoUploader() {
  const { photos, addPhotos, removePhoto, replacePhoto } = useStudio();
  const [errors, setErrors] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const replaceId = useRef<string | null>(null);
  const full = photos.length >= PREVIEW_PHOTO_LIMIT;

  async function onPick(files: FileList | null) {
    if (!files?.length) return;
    const errs: string[] = [];
    const accepted: { src: string; alt: string; sample: boolean }[] = [];
    let slots = PREVIEW_PHOTO_LIMIT - photos.length;
    for (const f of Array.from(files)) {
      const err = validateImageFile(f);
      if (err) { errs.push(err); continue; }
      if (slots <= 0) { errs.push(`Free preview holds ${PREVIEW_PHOTO_LIMIT} photos — remove one to add another (paid plans allow more).`); break; }
      accepted.push({ src: await fileToDataURL(f), alt: f.name.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' '), sample: false });
      slots--;
    }
    if (accepted.length) addPhotos(accepted);
    setErrors(errs);
  }

  async function onReplace(files: FileList | null) {
    const f = files?.[0];
    const id = replaceId.current;
    if (!f || !id) return;
    const err = validateImageFile(f);
    if (err) return setErrors([err]);
    setErrors([]);
    replacePhoto(id, await fileToDataURL(f));
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-bold">Shop photos</p>
        <p className={cn('text-[11px] font-bold uppercase tracking-wide', full ? 'text-[#b9662a]' : 'text-[#17130d]/50')}>
          {photos.length} / {PREVIEW_PHOTO_LIMIT} free-preview slots
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2.5">
        {photos.map((p) => (
          <div key={p.id} className="group relative">
            <img src={p.src} alt={p.alt} className="aspect-square w-full rounded-xl border border-[#17130d]/10 object-cover" />
            {p.sample && (
              <span className="absolute left-1.5 top-1.5 rounded-full bg-[#17130d]/80 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
                Sample
              </span>
            )}
            <div className="absolute inset-x-1.5 bottom-1.5 flex gap-1 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
              <button
                aria-label={`Replace photo: ${p.alt}`}
                onClick={() => { replaceId.current = p.id; replaceRef.current?.click(); }}
                className="grid h-7 flex-1 place-items-center rounded-lg bg-white/95 text-[#17130d] shadow"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
              <button
                aria-label={`Remove photo: ${p.alt}`}
                onClick={() => removePhoto(p.id)}
                className="grid h-7 flex-1 place-items-center rounded-lg bg-[#17130d]/90 text-white shadow"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        {!full && (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex aspect-square flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-[#17130d]/30 text-[#17130d]/50 transition-colors hover:border-[#b9662a] hover:text-[#b9662a]"
          >
            <ImagePlus className="h-5 w-5" />
            <span className="px-2 text-center text-[10px] font-bold uppercase tracking-wide">Add photo</span>
          </button>
        )}
      </div>

      {full && (
        <p className="mt-2 rounded-lg bg-[#b9662a]/10 px-3 py-2 text-[12px] font-semibold text-[#8a4d1e]">
          Preview is full. Remove a photo to add another — higher photo limits come with a subscription, set by the MzansiSite platform.
        </p>
      )}
      <p className="mt-2 text-[11.5px] leading-relaxed text-[#17130d]/55">
        Tip: removing the bundled sample photos is fine — they’re placeholders. JPG, PNG or WebP, max 4 MB each.
      </p>

      <div className="mt-3"><ErrorList errors={errors} onClear={() => setErrors([])} /></div>

      <input ref={inputRef} type="file" multiple accept={ACCEPT} className="hidden" aria-label="Add shop photos"
        onChange={(e) => { void onPick(e.target.files); e.target.value = ''; }} />
      <input ref={replaceRef} type="file" accept={ACCEPT} className="hidden" aria-hidden tabIndex={-1}
        onChange={(e) => { void onReplace(e.target.files); e.target.value = ''; }} />
    </div>
  );
}
