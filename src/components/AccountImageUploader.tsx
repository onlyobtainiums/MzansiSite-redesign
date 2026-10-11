"use client";

import { useCallback, useRef, useState } from "react";
import { Clock3, ImagePlus, Loader2, Trash2, UploadCloud } from "lucide-react";
import { uploadToCloudinary, type UploadKind } from "@/lib/cloudinary-upload";

export interface LocalImage {
  /** Either the persisted cloudinary URL or a local object URL blob. */
  url: string;
  isLocal: boolean;
}

interface UploaderProps {
  kind: UploadKind;
  images: LocalImage[];
  onChange: (imgs: LocalImage[]) => void;
  maxCount: number;
  maxBytes: number;
  /** Called with progress state so parent can show global banners. */
  onActivity?: (text: string | null) => void;
  className?: string;
}

export default function AccountImageUploader({
  kind,
  images,
  onChange,
  maxCount,
  maxBytes,
  onActivity,
  className = "",
}: UploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [err, setErr] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const remaining = maxCount - images.length;
  const label = kind === "logo" ? "logo" : "photo";

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      setErr(null);
      const list = Array.from(files).slice(0, remaining);
      if (list.length === 0) {
        setErr(`You already have ${maxCount} ${label}${maxCount > 1 ? "s" : ""}. Delete one to add more.`);
        return;
      }

      for (const file of list) {
        if (file.size > maxBytes) {
          setErr(`"${file.name}" is too big (max ${Math.round(maxBytes / 1024 / 1024)}MB for a ${label}).`);
          continue;
        }
        if (!file.type.startsWith("image/")) {
          setErr(`"${file.name}" isn’t an image.`);
          continue;
        }

        const localUrl = URL.createObjectURL(file);
        setBusy(true);
        onActivity?.(`Uploading ${label}…`);
        try {
          const result = await uploadToCloudinary(file, kind, setProgress);
          onChange([...images, { url: result.url, isLocal: false }]);
          onActivity?.(kind === "logo" ? "Logo uploaded." : "Photo added.");
        } catch (e) {
          setErr(e instanceof Error ? e.message : "Upload failed.");
          onActivity?.(null);
        } finally {
          setBusy(false);
          setProgress(0);
          URL.revokeObjectURL(localUrl);
        }
      }
    },
    [images, kind, label, maxBytes, maxCount, remaining, onActivity, onChange],
  );

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const moveToFront = (from: number) => {
    if (from <= 0) return;
    const copy = [...images];
    const [target] = copy.splice(from, 1);
    onChange([target, ...copy]);
  };

  const onDropSlot = (to: number) => {
    if (dragIndex === null || dragIndex === to) return;
    const copy = [...images];
    const [moved] = copy.splice(dragIndex, 1);
    copy.splice(to, 0, moved);
    onChange(copy);
    setDragIndex(to);
  };

  return (
    <div className={className}>
      {/* Upload trigger */}
      <div className="flex items-center justify-between gap-3 rounded-2xl border-2 border-dashed border-ink/15 bg-white/50 px-4 py-3.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy || remaining <= 0}
          className={`flex items-center gap-2.5 rounded-full border-2 border-ink px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-300 ${
            busy || remaining <= 0 ? "opacity-40" : "bg-ink text-bone hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#ff4d00]"
          }`}
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
          {busy ? `${progress}%` : `Add ${label}${kind === "logo" ? "" : ` (${remaining} left)`}`}
        </button>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-ink/35">
          JPG / PNG · ≤{Math.round(maxBytes / 1024 / 1024)}MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple={kind !== "logo"}
          className="hidden"
          onChange={(e) => void handleFiles(e.target.files)}
        />
      </div>

      {err && (
        <p className="mz-in-up mt-2 text-xs font-medium text-flame-deep" style={{ ["--mz-dur" as string]: "0.4s", ["--mz-from" as string]: "-4px" }}>
          {err}
        </p>
      )}

      {/* Slots */}
      <div className={`mt-3 grid gap-3 ${kind === "logo" ? "grid-cols-1 max-w-[140px]" : "grid-cols-3"}`}>
        {Array.from({ length: maxCount }).map((_, slot) => {
          const img = images[slot];
          return (
            <div
              key={slot}
              onDragOver={(e) => { e.preventDefault(); onDropSlot(slot); }}
              className={`group relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                img ? "border-ink/12 bg-ink/5" : "border-dashed border-ink/10 bg-white/40"
              } ${kind === "logo" ? "aspect-square" : "aspect-[4/5]"}`}
            >
              {img ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img.url} alt="" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Front badge = hero/cover — draggable to reorder */}
                  {kind === "gallery" && slot === 0 && (
                    <span className="absolute left-2 top-2 rounded-md bg-ink px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-bone">
                      Cover
                    </span>
                  )}
                  {/* Actions */}
                  <button
                    type="button"
                    aria-label={`Delete ${label} ${slot + 1}`}
                    onClick={() => removeAt(slot)}
                    className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full border border-ink/10 bg-white text-ink/40 opacity-0 transition-all duration-300 hover:text-flame group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                  {kind === "gallery" && slot > 0 && (
                    <button
                      type="button"
                      aria-label="Make cover photo"
                      onClick={() => moveToFront(slot)}
                      className="absolute bottom-2 left-2 right-2 rounded-md bg-white/90 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-ink opacity-0 transition-all duration-300 hover:bg-ink hover:text-bone group-hover:opacity-100"
                    >
                      Make cover
                    </button>
                  )}
                  {/* Drag grip for reordering */}
                  {kind === "gallery" && images.length > 1 && (
                    <span
                      draggable
                      onDragStart={() => setDragIndex(slot)}
                      onDragEnd={() => setDragIndex(null)}
                      className="absolute left-1/2 top-2 h-1.5 w-6 -translate-x-1/2 cursor-grab rounded-full bg-white/70 opacity-0 transition-all group-hover:opacity-100"
                      title="Drag to reorder"
                    />
                  )}
                </>
              ) : (
                <div className="grid h-full place-items-center text-ink/20">
                  <UploadCloud className="h-5 w-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {kind === "gallery" && images.length > 0 && (
        <p className="mt-2.5 flex items-center gap-1.5 text-[10px] font-medium text-ink/40">
          <Clock3 className="h-3 w-3" /> First image is your main photo. Drag to reorder or delete to replace.
        </p>
      )}
    </div>
  );
}
