/**
 * Studio state — single source of truth for the whole prototype.
 *
 * Everything is kept in memory (React state) on purpose: this is the FREE
 * PREVIEW. Nothing is persisted to a server or to localStorage, so the UI can
 * honestly say "previews are temporary and not saved". The paid editor would
 * receive this same shape from the platform after subscription verification.
 */
import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type {
  BusinessData,
  EditorTab,
  HourRow,
  PhotoItem,
  ServiceItem,
  StudioContent,
  TemplateId,
} from '../types';
import { freshSampleContent, SAMPLE_PHOTOS } from '../data/barberPack';
import { PREVIEW_PHOTO_LIMIT } from '../config/limits';
import { uid } from '../lib/utils';

export type View = 'chooser' | 'studio';
export type Device = 'mobile' | 'desktop';

interface StudioState extends StudioContent {
  view: View;
  device: Device;
  editorTab: EditorTab;
  activeTemplate: TemplateId;
  /** true once the visitor has edited anything (drives "unsaved changes" hints) */
  dirty: boolean;
  rotationPaused: boolean;

  // navigation
  openStudio: (template: TemplateId) => void;
  backToChooser: () => void;
  setActiveTemplate: (id: TemplateId) => void;
  setDevice: (d: Device) => void;
  setEditorTab: (t: EditorTab) => void;
  setRotationPaused: (p: boolean) => void;
  openEditorTab: (tab: EditorTab) => void;

  // business fields
  updateBusiness: (patch: Partial<BusinessData>) => void;
  updateService: (id: string, patch: Partial<ServiceItem>) => void;
  addService: () => void;
  removeService: (id: string) => void;
  updateHour: (id: string, patch: Partial<HourRow>) => void;
  addHourRow: () => void;
  removeHourRow: (id: string) => void;
  setCredential: (index: number, value: string) => void;
  addCredential: () => void;
  removeCredential: (index: number) => void;

  // media
  setLogo: (dataUrl: string | null) => void;
  addPhotos: (items: Omit<PhotoItem, 'id'>[]) => void;
  removePhoto: (id: string) => void;
  replacePhoto: (id: string, src: string) => void;

  resetAll: () => void;
}

const StudioCtx = createContext<StudioState | null>(null);

export function StudioProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>('chooser');
  const [device, setDevice] = useState<Device>('desktop');
  const [editorTab, setEditorTab] = useState<EditorTab>('business');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('velvet');
  const [rotationPaused, setRotationPaused] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [content, setContent] = useState<StudioContent>(() => ({
    business: freshSampleContent(),
    logo: null,
    photos: SAMPLE_PHOTOS,
  }));

  const touch = useCallback((mut: (c: StudioContent) => StudioContent) => {
    setContent((c) => mut(c));
    setDirty(true);
  }, []);

  const openStudio = useCallback((template: TemplateId) => {
    setActiveTemplate(template);
    setView('studio');
    setRotationPaused(true); // never rotate while inspecting/editing
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  }, []);

  const backToChooser = useCallback(() => {
    setView('chooser');
    requestAnimationFrame(() => window.scrollTo({ top: 0 }));
  }, []);

  const openEditorTab = useCallback((tab: EditorTab) => {
    setEditorTab(tab);
  }, []);

  const api: StudioState = useMemo(
    () => ({
      view, device, editorTab, activeTemplate, dirty, rotationPaused,
      business: content.business, logo: content.logo, photos: content.photos,

      openStudio, backToChooser,
      setActiveTemplate, setDevice, setEditorTab, setRotationPaused, openEditorTab,

      updateBusiness: (patch) =>
        touch((c) => ({ ...c, business: { ...c.business, ...patch } })),

      updateService: (id, patch) =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            services: c.business.services.map((s) => (s.id === id ? { ...s, ...patch } : s)),
          },
        })),
      addService: () =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            services: [
              ...c.business.services,
              { id: uid(), category: 'Cuts', name: '', price: '', description: '' },
            ],
          },
        })),
      removeService: (id) =>
        touch((c) => ({
          ...c,
          business: { ...c.business, services: c.business.services.filter((s) => s.id !== id) },
        })),

      updateHour: (id, patch) =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            hours: c.business.hours.map((h) => (h.id === id ? { ...h, ...patch } : h)),
          },
        })),
      addHourRow: () =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            hours: [...c.business.hours, { id: uid(), label: '', value: '' }],
          },
        })),
      removeHourRow: (id) =>
        touch((c) => ({
          ...c,
          business: { ...c.business, hours: c.business.hours.filter((h) => h.id !== id) },
        })),

      setCredential: (index, value) =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            credentials: c.business.credentials.map((v, i) => (i === index ? value : v)),
          },
        })),
      addCredential: () =>
        touch((c) => ({
          ...c,
          business: { ...c.business, credentials: [...c.business.credentials, ''] },
        })),
      removeCredential: (index) =>
        touch((c) => ({
          ...c,
          business: {
            ...c.business,
            credentials: c.business.credentials.filter((_, i) => i !== index),
          },
        })),

      setLogo: (dataUrl) => touch((c) => ({ ...c, logo: dataUrl })),
      addPhotos: (items) =>
        touch((c) => {
          const room = Math.max(0, PREVIEW_PHOTO_LIMIT - c.photos.length);
          const accepted = items.slice(0, room).map((it) => ({ ...it, id: uid() }));
          return { ...c, photos: [...c.photos, ...accepted] };
        }),
      removePhoto: (id) => touch((c) => ({ ...c, photos: c.photos.filter((p) => p.id !== id) })),
      replacePhoto: (id, src) =>
        touch((c) => ({
          ...c,
          photos: c.photos.map((p) =>
            p.id === id ? { ...p, src, sample: false, alt: `${c.business.name || 'Shop'} photo` } : p,
          ),
        })),

      resetAll: () => {
        setContent({ business: freshSampleContent(), logo: null, photos: SAMPLE_PHOTOS });
        setDirty(false);
      },
    }),
    [view, device, editorTab, activeTemplate, dirty, rotationPaused, content, openStudio, backToChooser, openEditorTab, touch],
  );

  return <StudioCtx.Provider value={api}>{children}</StudioCtx.Provider>;
}

export function useStudio(): StudioState {
  const ctx = useContext(StudioCtx);
  if (!ctx) throw new Error('useStudio must be used inside StudioProvider');
  return ctx;
}
