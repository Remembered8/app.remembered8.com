'use client';

import React from 'react';
import { Language } from '@/lib/i18n';

interface FooterManifestoProps {
  onOpenCreate: () => void;
  onOpenSearch: () => void;
  language: Language;
  onOpenPrivacy: () => void;
  onOpenCookiePolicy: () => void;
  onOpenCookiePreferences: () => void;
}

const COPY = {
  en: {
    descriptor: 'A dignified, enduring digital archive of human remembrance across generations.',
    create: '+ Create Memorial Dossier',
    search: 'Search Registry Archive',
    tone: 'Solemn Respect • Open Public Registry',
    privacy: 'Privacy Notice',
    cookiePolicy: 'Cookie Policy',
    cookiePreferences: 'Cookie Preferences',
    copyright: 'Universal Archive of Human & Family Memory',
    motto: '“A life remembered is never lost.”',
  },
  tr: {
    descriptor: 'Kuşaklar boyu süren, saygın ve kalıcı bir insan anısı arşivi.',
    create: '+ Anma Kütüğü Oluştur',
    search: 'Kütük Arşivinde Ara',
    tone: 'Saygılı Anma • Açık Kamusal Kütük',
    privacy: 'Aydınlatma Metni',
    cookiePolicy: 'Çerez Politikası',
    cookiePreferences: 'Çerez Tercihleri',
    copyright: 'Evrensel İnsan ve Aile Hafızası Arşivi',
    motto: '“Hatırlanan bir hayat asla kaybolmaz.”',
  },
} as const;

export const FooterManifesto: React.FC<FooterManifestoProps> = ({
  onOpenCreate,
  onOpenSearch,
  language,
  onOpenPrivacy,
  onOpenCookiePolicy,
  onOpenCookiePreferences,
}) => {
  const t = COPY[language];

  return (
    <footer className="bg-[#FAF8F5] text-[#111111] py-8 px-4 sm:px-6 lg:px-8 mt-12 border-t-2 border-[#111111]">
      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-[#111111]/20">

          {/* Logo & Descriptor */}
          <div className="text-center md:text-left space-y-1">
            <span className="font-serif-display font-black tracking-tight text-xl text-[#111111] block">
              THE REMEMBERED
            </span>
            <p className="text-xs font-serif text-[#666666] italic">{t.descriptor}</p>
          </div>

          {/* Minimal Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono uppercase tracking-wider">
            <button
              onClick={onOpenCreate}
              className="hover:underline font-bold text-[#111111] cursor-pointer"
            >
              {t.create}
            </button>
            <span className="text-[#111111]/30">&bull;</span>
            <button
              onClick={onOpenSearch}
              className="hover:underline text-[#555555] cursor-pointer"
            >
              {t.search}
            </button>
            <span className="text-[#111111]/30">&bull;</span>
            <span className="text-[#777777]">{t.tone}</span>
          </div>

        </div>

        {/* Legal & consent links */}
        <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-4 text-[11px] font-mono uppercase tracking-wider">
          <button onClick={onOpenPrivacy} className="hover:underline text-[#555555] cursor-pointer">
            {t.privacy}
          </button>
          <span className="text-[#111111]/30">&bull;</span>
          <button
            onClick={onOpenCookiePolicy}
            className="hover:underline text-[#555555] cursor-pointer"
          >
            {t.cookiePolicy}
          </button>
          <span className="text-[#111111]/30">&bull;</span>
          <button
            onClick={onOpenCookiePreferences}
            className="hover:underline text-[#555555] cursor-pointer"
          >
            {t.cookiePreferences}
          </button>
        </div>

        {/* Colophon & Copyright */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[#777777]">
          <span>
            {t.copyright} &copy; {new Date().getFullYear()}
          </span>
          <span>{t.motto}</span>
        </div>

      </div>
    </footer>
  );
};
