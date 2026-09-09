'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { memorialUrl } from '@/lib/deepLink';
import { MemorialProfile } from '@/types/memorial';
import QRCode from 'qrcode';
import { QrCode, Download, Printer, Copy, Check, Sparkles, ShieldCheck, ShoppingBag } from 'lucide-react';

interface QrStonePlaqueModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
  onOpenStore?: () => void;
}

export const QrStonePlaqueModal: React.FC<QrStonePlaqueModalProps> = ({
  isOpen,
  onClose,
  memorial,
  onOpenStore,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [plaqueTheme, setPlaqueTheme] = useState<'porcelain' | 'brass' | 'slate'>('porcelain');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Built from the record, not from the current address bar: the plaque is
  // engraved for one person and must resolve to them wherever it is opened.
  const pageUrl = memorialUrl(memorial.id);

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(
        pageUrl,
        {
          width: 360,
          margin: 1,
          color: {
            dark: plaqueTheme === 'slate' ? '#18191A' : plaqueTheme === 'brass' ? '#221910' : '#1A1816',
            light: '#FFFFFF',
          },
        },
        (err, url) => {
          if (!err && url) {
            setQrDataUrl(url);
          }
        }
      );
    }
  }, [isOpen, plaqueTheme, pageUrl]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.download = `${memorial.slug}-remembered-gold-plaque.png`;
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div data-modal="overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div data-modal="panel" className="bg-[#FAF8F5] text-[#1E1B18] border-2 border-[#2B2724] max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 relative">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-2 mb-4 pb-3 border-b border-[#D6CBB8]">
          <div className="flex items-start gap-3 min-w-0">
            <div className="p-2.5 border border-[#C5A059]/60 bg-[#F5EFE0] shadow-2xs">
              <QrCode className="w-5 h-5 text-[#8F6B2C]" />
            </div>
            <div className="min-w-0">
              {/* The spec badge is chrome. On a phone it wraps to two lines and
                  costs more room than the title it decorates. */}
              <div className="hidden sm:flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-widest text-[#855F24] bg-[#F5ECDA] border border-[#DFC491] px-2 py-0.5 font-bold flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#C5A059]" />{t.modals.qr.specLabel}</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#1E1B18] mt-0.5">{t.modals.qr.title}</h3>
              <p className="text-xs font-serif italic text-[#5E574E]">{t.modals.qr.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[#2B2724] hover:bg-[#2B2724] hover:text-white px-2.5 py-1 text-xs border border-[#D0C5B2] transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Material & Finish Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-5 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-[#787163] uppercase text-[11px] font-bold">{t.modals.qr.finishLabel}</span>
            <div className="inline-flex p-0.5 bg-[#EFE9DC] border border-[#D0C5B2]">
              <button
                onClick={() => setPlaqueTheme('porcelain')}
                className={`px-3 py-1 text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  plaqueTheme === 'porcelain' 
                    ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' 
                    : 'text-[#423C36] hover:bg-[#E2D8C6]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#FAF8F3] border border-[#C5A059]"></span>
                <span>{t.modals.qr.finishIvory}</span>
              </button>
              <button
                onClick={() => setPlaqueTheme('brass')}
                className={`px-3 py-1 text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  plaqueTheme === 'brass' 
                    ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' 
                    : 'text-[#423C36] hover:bg-[#E2D8C6]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#E5CA85]"></span>
                <span>{t.modals.qr.finishBrass}</span>
              </button>
              <button
                onClick={() => setPlaqueTheme('slate')}
                className={`px-3 py-1 text-[11px] transition cursor-pointer flex items-center gap-1 ${
                  plaqueTheme === 'slate' 
                    ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' 
                    : 'text-[#423C36] hover:bg-[#E2D8C6]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#18191A] border border-[#C5A059]"></span>
                <span>{t.modals.qr.finishSlate}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-[#855F24] font-semibold bg-[#F7EEDB] border border-[#E2CE9F] px-2 py-0.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>{t.modals.qr.weatherproof}</span>
          </div>
        </div>

        {/* MASTER PHYSICAL PLAQUE RENDER BOX (With Ultra-Refined Gold Inset Framing) */}
        <div
          ref={printRef}
          className={`p-6 sm:p-9 mb-5 text-center transition-all relative shadow-xl overflow-hidden ${
            plaqueTheme === 'slate'
              ? 'bg-[#181A1C] text-[#FAF8F5] border-4 border-[#0F1011]'
              : plaqueTheme === 'brass'
              ? 'bg-gradient-to-br from-[#F5EBD6] via-[#EFE0C2] to-[#E5D2AC] text-[#291F13] border-4 border-[#826027]'
              : 'bg-[#FAF8F2] text-[#1A1816] border-4 border-[#24211D]'
          }`}
        >
          {/* Subtle outer stone/porcelain bevel ring */}
          <div className={`p-4 sm:p-6 relative border-2 ${
            plaqueTheme === 'slate'
              ? 'border-[#C5A059]/40 bg-[#1F2225]'
              : plaqueTheme === 'brass'
              ? 'border-[#9E7836] bg-[#F7EFE1]/70'
              : 'border-[#24211D]/90 bg-[#FAF8F2]'
          }`}>
            
            {/* Fine Inset Antique Gold Filigree Hairline with 4 Corner Accents */}
            <div className={`absolute inset-2 border ${
              plaqueTheme === 'slate'
                ? 'border-[#D4AF37]/50'
                : plaqueTheme === 'brass'
                ? 'border-[#A37B30]/60'
                : 'border-[#C5A059]/70'
            } pointer-events-none`}>
              {/* Corner 1: Top-Left */}
              <span className="absolute -top-1.5 -left-1.5 text-[9px] leading-none text-[#C5A059] select-none font-serif">✦</span>
              {/* Corner 2: Top-Right */}
              <span className="absolute -top-1.5 -right-1.5 text-[9px] leading-none text-[#C5A059] select-none font-serif">✦</span>
              {/* Corner 3: Bottom-Left */}
              <span className="absolute -bottom-1.5 -left-1.5 text-[9px] leading-none text-[#C5A059] select-none font-serif">✦</span>
              {/* Corner 4: Bottom-Right */}
              <span className="absolute -bottom-1.5 -right-1.5 text-[9px] leading-none text-[#C5A059] select-none font-serif">✦</span>
            </div>

            {/* Plaque Masthead with subtle gold glow */}
            <div className="mb-3 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span className="h-[1px] w-6 bg-[#C5A059]/50"></span>
                <p className={`text-[9px] sm:text-[10px] tracking-[0.32em] uppercase font-mono font-bold ${
                  plaqueTheme === 'slate' ? 'text-[#E5C77C]' : 'text-[#8A6324]'
                }`}>{t.modals.qr.brandLine}</p>
                <span className="h-[1px] w-6 bg-[#C5A059]/50"></span>
              </div>

              <h4 className={`font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight ${
                plaqueTheme === 'slate' ? 'text-white' : 'text-[#181614]'
              }`}>
                {memorial.fullName}
              </h4>

              <div className="flex items-center justify-center gap-2 pt-0.5">
                <p className={`text-xs font-mono tracking-wider ${
                  plaqueTheme === 'slate' ? 'text-[#C5A059]' : 'text-[#694D20]'
                }`}>
                  {memorial.birthDate.split(' ').pop()} — {memorial.deathDate.split(' ').pop()}
                </p>
              </div>
            </div>

            {/* Recessed Ceramic / Metal QR Bed with Gold Inset Rim */}
            <div className="relative inline-block my-2">
              <div className={`p-3 border-2 ${
                plaqueTheme === 'slate'
                  ? 'border-[#C5A059]/70 bg-white shadow-[0_0_15px_rgba(197,160,89,0.15)]'
                  : plaqueTheme === 'brass'
                  ? 'border-[#A37B30] bg-white shadow-xs'
                  : 'border-[#C5A059]/80 bg-white shadow-xs'
              }`}>
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Living Memory QR Code"
                    className="w-36 h-36 sm:w-40 sm:h-40 object-contain mx-auto"
                  />
                ) : (
                  <div className="w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center text-xs font-mono text-[#2B2724]">{t.modals.qr.generating}</div>
                )}
              </div>
            </div>

            {/* Epigraph & Direction */}
            <div className="mt-3 space-y-1.5 max-w-md mx-auto">
              <p className={`text-xs font-serif italic leading-relaxed ${
                plaqueTheme === 'slate' ? 'text-[#E5DFD5]' : 'text-[#3E3831]'
              }`}>{t.modals.qr.scanHint}</p>

              <div className="flex items-center justify-center gap-1.5 pt-1">
                <span className="text-[10px] text-[#C5A059] select-none">✦</span>
                <p className={`text-[10px] font-mono tracking-wider ${
                  plaqueTheme === 'slate' ? 'text-white/60' : 'text-[#7D7362]'
                }`}>
                  {pageUrl.replace(/^https?:\/\//, '')}
                </p>
                <span className="text-[10px] text-[#C5A059] select-none">✦</span>
              </div>
            </div>

          </div>
        </div>

        {/* Physical Plaque Specifications & Order Prompt */}
        <div className="p-3 bg-[#F2EDE2] border border-[#D5C9B3] mb-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5 text-left">
            <span className="font-mono uppercase font-bold text-[10px] text-[#694D20] block">{t.modals.qr.fabricationLabel}</span>
            <p className="font-serif text-[#4A4338] text-[11px]">{t.modals.qr.fabricationBody}</p>
          </div>

          {onOpenStore && (
            <button
              onClick={() => {
                onClose();
                onOpenStore();
              }}
              className="px-3.5 py-1.5 bg-[#855F24] hover:bg-[#6D4D1B] text-white text-[11px] font-mono uppercase tracking-wider font-bold shrink-0 transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#F3E0BA]" />
              <span>{t.modals.qr.order}</span>
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#D6CBB8]">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D0C5B2] hover:border-[#2B2724] bg-white text-xs font-mono transition text-[#2B2724] cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#2A7545]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied to Clipboard' : 'Copy Permanent URL'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-[#D0C5B2] hover:border-[#2B2724] bg-white text-xs font-mono transition text-[#2B2724] cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.modals.qr.print}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#2B2724] hover:bg-[#423C37] text-[#FAF8F5] text-xs font-mono uppercase transition font-bold shadow-2xs cursor-pointer border border-[#2B2724]"
            >
              <Download className="w-3.5 h-3.5 text-[#DFC491]" />
              <span>{t.modals.qr.download}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

