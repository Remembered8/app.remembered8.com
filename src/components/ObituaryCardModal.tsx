'use client';

import React, { useState, useRef } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { Download, Share2, Sparkles, Check, Image as ImageIcon, Smartphone, Square, QrCode } from 'lucide-react';
import QRCode from 'qrcode';

interface ObituaryCardModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
}

export const ObituaryCardModal: React.FC<ObituaryCardModalProps> = ({
  isOpen,
  onClose,
  memorial,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [aspectRatio, setAspectRatio] = useState<'story' | 'square'>('story');
  const [theme, setTheme] = useState<'classic_slate' | 'editorial_cream' | 'gold_bordered'>('editorial_cream');
  const [ceremonyDetails, setCeremonyDetails] = useState('Memorial service & gathering details will be announced.');
  const [qrUrl, setQrUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      const shareUrl = `${window.location.origin}/?id=${memorial.id}`;
      QRCode.toDataURL(shareUrl, {
        width: 240,
        margin: 1,
        color: {
          dark: '#111111',
          light: '#FFFFFF',
        },
      }).then(setQrUrl).catch(console.error);
    }
  }, [isOpen, memorial.id]);

  if (!isOpen) return null;

  const handleDownload = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[95vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111] shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666]">{t.modals.obituary.generatorLabel}</span>
            <h3 className="font-serif-display text-2xl font-bold text-[#111111]">{t.modals.obituary.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Controls: Format & Theme */}
        <div className="py-3 border-b border-[#111111]/20 grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-[#666666] uppercase">{t.modals.obituary.formatLabel}</span>
            <button
              onClick={() => setAspectRatio('story')}
              className={`px-3 py-1 border border-[#111111] transition flex items-center gap-1 cursor-pointer ${
                aspectRatio === 'story' ? 'bg-[#111111] text-white font-bold' : 'bg-white text-black'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>{t.modals.obituary.formatStory}</span>
            </button>
            <button
              onClick={() => setAspectRatio('square')}
              className={`px-3 py-1 border border-[#111111] transition flex items-center gap-1 cursor-pointer ${
                aspectRatio === 'square' ? 'bg-[#111111] text-white font-bold' : 'bg-white text-black'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>{t.modals.obituary.formatSquare}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#666666] uppercase">{t.modals.obituary.themeLabel}</span>
            <button
              onClick={() => setTheme('editorial_cream')}
              className={`px-2.5 py-1 border border-[#111111] cursor-pointer ${theme === 'editorial_cream' ? 'bg-[#111111] text-white' : 'bg-[#FAF8F5]'}`}
            >{t.modals.obituary.themeCream}</button>
            <button
              onClick={() => setTheme('classic_slate')}
              className={`px-2.5 py-1 border border-[#111111] cursor-pointer ${theme === 'classic_slate' ? 'bg-[#111111] text-white' : 'bg-[#111111] text-white/70'}`}
            >{t.modals.obituary.themeDark}</button>
          </div>
        </div>

        {/* Ceremony note input */}
        <div className="py-2 shrink-0">
          <label className="block text-[10px] font-mono uppercase text-[#666666] mb-1">{t.modals.obituary.inscription}</label>
          <input
            type="text"
            value={ceremonyDetails}
            onChange={(e) => setCeremonyDetails(e.target.value)}
            className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 font-serif focus:border-[#111111] outline-none"
          />
        </div>

        {/* Visual Card Preview Box */}
        <div className="flex-1 overflow-y-auto py-3 flex justify-center items-center bg-[#ECECE8] p-4 border border-[#111111]/20">
          
          <div
            ref={cardRef}
            className={`transition-all duration-300 relative shadow-2xl flex flex-col justify-between p-6 text-center ${
              aspectRatio === 'story'
                ? 'w-[280px] sm:w-[320px] aspect-[9/16]'
                : 'w-[280px] sm:w-[320px] aspect-square'
            } ${
              theme === 'classic_slate'
                ? 'bg-[#111111] text-white border-2 border-white/20'
                : 'bg-[#F8F8F5] text-[#111111] border-2 border-[#111111]'
            }`}
          >
            {/* Double Line Framing */}
            <div className="border border-current p-4 h-full flex flex-col justify-between">
              
              {/* Card Top Stamp */}
              <div>
                <span className={`text-[8px] font-mono tracking-[0.3em] uppercase block mb-1 ${
                  theme === 'classic_slate' ? 'text-white/70' : 'text-[#666666]'
                }`}>{t.modals.obituary.inMemoriam}</span>
                <div className="w-12 h-px bg-current mx-auto my-1.5" />
              </div>

              {/* Center Portrait & Name */}
              <div className="my-auto space-y-2">
                <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full overflow-hidden border-2 border-current p-0.5">
                  <img
                    src={memorial.heroImage}
                    alt={memorial.fullName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <h4 className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight">
                  {memorial.fullName}
                </h4>

                <p className={`text-[10px] font-mono ${
                  theme === 'classic_slate' ? 'text-white/80' : 'text-[#555555]'
                }`}>
                  {memorial.birthDate.split(' ').pop()} &mdash; {memorial.deathDate.split(' ').pop()}
                </p>

                <p className={`text-xs font-serif italic max-w-[220px] mx-auto line-clamp-2 ${
                  theme === 'classic_slate' ? 'text-white/90' : 'text-[#333333]'
                }`}>
                  &ldquo;{memorial.lifeQuote}&rdquo;
                </p>

                {ceremonyDetails && (
                  <p className={`text-[10px] font-serif border-t border-current/20 pt-1.5 max-w-[220px] mx-auto ${
                    theme === 'classic_slate' ? 'text-white/80' : 'text-[#444444]'
                  }`}>
                    {ceremonyDetails}
                  </p>
                )}
              </div>

              {/* Card Bottom QR & Link */}
              <div className="pt-2 border-t border-current/20 flex items-center justify-between gap-2">
                <div className="text-left text-[8px] font-mono leading-tight">
                  <span className="block font-bold">{t.modals.obituary.preserveLegacy}</span>
                  <span className={theme === 'classic_slate' ? 'text-white/60' : 'text-[#777777]'}>
                    remembered.life/{memorial.slug}
                  </span>
                </div>

                {qrUrl && (
                  <img
                    src={qrUrl}
                    alt="QR"
                    className="w-10 h-10 border border-current bg-white p-0.5"
                  />
                )}
              </div>

            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-[#111111]/20 flex items-center justify-between text-xs font-mono shrink-0">
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-[#111111]/30 hover:border-[#111111] transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copied ? 'Link Copied' : 'Share Archive Link'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-[#111111] hover:bg-[#333333] text-white uppercase font-bold transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{t.modals.obituary.download}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
