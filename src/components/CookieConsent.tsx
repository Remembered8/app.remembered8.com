'use client';

import React, { useEffect, useState } from 'react';
import { Cookie, ShieldCheck, BarChart3, Megaphone, X } from 'lucide-react';
import { Language } from '@/lib/i18n';
import {
  getConsent,
  hasDecided,
  hydrateConsent,
  onConsentChange,
  setConsent,
} from '@/lib/consent';
import { startAnalytics } from '@/lib/analytics';

interface CookieConsentProps {
  language: Language;
  /** Opens the privacy / cookie policy notice from inside the banner. */
  onOpenPolicy: () => void;
}

const COPY = {
  en: {
    title: 'Cookies & measurement',
    body: 'We use strictly necessary cookies to run this archive. With your permission we also measure how the archive is used and how visitors find it, so we can keep improving it. You can change your mind at any time from the footer.',
    manage: 'Manage preferences',
    acceptAll: 'Accept all',
    rejectAll: 'Reject non-essential',
    save: 'Save choices',
    policy: 'Privacy & cookie policy',
    back: 'Back',
    close: 'Close',
    necessaryTitle: 'Strictly necessary',
    necessaryDesc: 'Keeps your language choice, your consent decision and the memorial data you enter on this device. Never used for tracking. Cannot be switched off.',
    necessaryState: 'Always on',
    analyticsTitle: 'Analytics',
    analyticsDesc: 'Google Analytics 4 and Microsoft Clarity. Anonymised page views, aggregated traffic sources and interaction heatmaps that show which parts of the archive people actually use.',
    marketingTitle: 'Marketing',
    marketingDesc: 'Meta (Facebook) Pixel. Measures whether a visit came from one of our campaigns and lets us reach people who may want to build a memorial.',
    settingsTitle: 'Cookie preferences',
  },
  tr: {
    title: 'Çerezler ve ölçümleme',
    body: 'Bu arşivin çalışması için zorunlu çerezleri kullanıyoruz. İzniniz olursa arşivin nasıl kullanıldığını ve ziyaretçilerin bizi nasıl bulduğunu da ölçerek geliştirmeye devam ediyoruz. Kararınızı dilediğiniz zaman alt bilgi bölümünden değiştirebilirsiniz.',
    manage: 'Tercihleri yönet',
    acceptAll: 'Tümünü kabul et',
    rejectAll: 'Zorunlu olmayanları reddet',
    save: 'Seçimleri kaydet',
    policy: 'Gizlilik ve çerez politikası',
    back: 'Geri',
    close: 'Kapat',
    necessaryTitle: 'Zorunlu',
    necessaryDesc: 'Dil tercihinizi, çerez kararınızı ve bu cihazda girdiğiniz kütük verilerini saklar. Takip amacıyla asla kullanılmaz. Kapatılamaz.',
    necessaryState: 'Her zaman açık',
    analyticsTitle: 'Analitik',
    analyticsDesc: 'Google Analytics 4 ve Microsoft Clarity. Anonimleştirilmiş sayfa görüntülemeleri, toplu trafik kaynakları ve arşivin hangi bölümlerinin gerçekten kullanıldığını gösteren etkileşim haritaları.',
    marketingTitle: 'Pazarlama',
    marketingDesc: 'Meta (Facebook) Pixel. Bir ziyaretin kampanyalarımızdan gelip gelmediğini ölçer ve kütük oluşturmak isteyebilecek kişilere ulaşmamızı sağlar.',
    settingsTitle: 'Çerez tercihleri',
  },
} as const;

interface CategoryRowProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  locked?: boolean;
  lockedLabel?: string;
  onToggle?: (next: boolean) => void;
}

const CategoryRow: React.FC<CategoryRowProps> = ({
  icon,
  title,
  description,
  checked,
  locked = false,
  lockedLabel,
  onToggle,
}) => (
  <div className="flex gap-3 border border-[#E5E5DF] bg-white p-3">
    <div className="mt-0.5 text-[#111111]">{icon}</div>
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111]">
          {title}
        </span>
        {locked ? (
          <span className="font-mono text-[10px] uppercase tracking-wider text-[#777777]">
            {lockedLabel}
          </span>
        ) : (
          <button
            type="button"
            role="switch"
            aria-checked={checked}
            aria-label={title}
            onClick={() => onToggle?.(!checked)}
            className={`relative h-5 w-10 shrink-0 border transition-colors cursor-pointer ${
              checked ? 'border-[#111111] bg-[#111111]' : 'border-[#BBBBB5] bg-[#F0F0EA]'
            }`}
          >
            <span
              className={`absolute top-0.5 h-3.5 w-3.5 bg-white transition-transform ${
                checked ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        )}
      </div>
      <p className="font-serif text-xs leading-relaxed text-[#555555]">{description}</p>
    </div>
  </div>
);

/**
 * GDPR / KVKK consent banner.
 *
 * Renders nothing once a decision for the current consent version exists; the
 * footer's "cookie preferences" link re-opens it by dispatching
 * `remembered:open-consent`.
 */
export const CookieConsent: React.FC<CookieConsentProps> = ({ language, onOpenPolicy }) => {
  const t = COPY[language];

  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Boot: restore any previous decision, start the tag layer, then decide
  // whether the banner needs to be shown at all.
  useEffect(() => {
    hydrateConsent();
    startAnalytics();

    const state = getConsent();
    setAnalytics(state.analytics);
    setMarketing(state.marketing);
    setVisible(!hasDecided());

    const unsubscribe = onConsentChange((next) => {
      setAnalytics(next.analytics);
      setMarketing(next.marketing);
    });

    return unsubscribe;
  }, []);

  // Re-open from anywhere in the app (footer link, policy modal).
  useEffect(() => {
    const open = () => {
      const state = getConsent();
      setAnalytics(state.analytics);
      setMarketing(state.marketing);
      setShowDetails(true);
      setVisible(true);
    };
    window.addEventListener('remembered:open-consent', open);
    return () => window.removeEventListener('remembered:open-consent', open);
  }, []);

  if (!visible) return null;

  const decide = (next: { analytics: boolean; marketing: boolean }) => {
    setConsent(next);
    setVisible(false);
    setShowDetails(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label={t.title}
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4"
    >
      <div className="mx-auto max-w-3xl border border-[#111111] bg-[#FAF8F5] shadow-[0_-4px_24px_rgba(0,0,0,0.14)]">
        <div className="flex items-start gap-3 border-b border-[#111111]/15 px-4 py-3">
          <Cookie size={18} className="mt-0.5 shrink-0 text-[#111111]" />
          <div className="flex-1">
            <h2 className="font-serif-display text-base font-black tracking-tight text-[#111111]">
              {showDetails ? t.settingsTitle : t.title}
            </h2>
          </div>
          {hasDecided() && (
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label={t.close}
              className="text-[#777777] hover:text-[#111111] cursor-pointer"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="max-h-[52vh] overflow-y-auto px-4 py-3">
          {showDetails ? (
            <div className="space-y-2">
              <CategoryRow
                icon={<ShieldCheck size={16} />}
                title={t.necessaryTitle}
                description={t.necessaryDesc}
                checked
                locked
                lockedLabel={t.necessaryState}
              />
              <CategoryRow
                icon={<BarChart3 size={16} />}
                title={t.analyticsTitle}
                description={t.analyticsDesc}
                checked={analytics}
                onToggle={setAnalytics}
              />
              <CategoryRow
                icon={<Megaphone size={16} />}
                title={t.marketingTitle}
                description={t.marketingDesc}
                checked={marketing}
                onToggle={setMarketing}
              />
            </div>
          ) : (
            <p className="font-serif text-sm leading-relaxed text-[#333333]">{t.body}</p>
          )}

          <button
            type="button"
            onClick={onOpenPolicy}
            className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[#555555] underline underline-offset-2 hover:text-[#111111] cursor-pointer"
          >
            {t.policy}
          </button>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#111111]/15 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => setShowDetails((prev) => !prev)}
            className="min-h-11 inline-flex items-center font-mono text-[11px] uppercase tracking-wider text-[#555555] underline underline-offset-2 hover:text-[#111111] cursor-pointer"
          >
            {showDetails ? t.back : t.manage}
          </button>

          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={() => decide({ analytics: false, marketing: false })}
              className="min-h-11 inline-flex items-center justify-center border border-[#111111] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
            >
              {t.rejectAll}
            </button>
            {showDetails && (
              <button
                type="button"
                onClick={() => decide({ analytics, marketing })}
                className="min-h-11 inline-flex items-center justify-center border border-[#111111] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-[#111111] transition-colors hover:bg-[#111111] hover:text-white cursor-pointer"
              >
                {t.save}
              </button>
            )}
            <button
              type="button"
              onClick={() => decide({ analytics: true, marketing: true })}
              className="min-h-11 inline-flex items-center justify-center bg-[#111111] px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-85 cursor-pointer"
            >
              {t.acceptAll}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/** Re-opens the consent banner in preferences mode from anywhere in the app. */
export function openConsentPreferences(): void {
  window.dispatchEvent(new Event('remembered:open-consent'));
}
