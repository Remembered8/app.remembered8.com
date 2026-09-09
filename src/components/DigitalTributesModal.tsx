'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { 
  X, Sparkles, Heart, Check, ArrowRight, ShieldCheck, TreePine, BookOpen, 
  Flame, Flower2, Award, Landmark, Lock, Gift, Sprout, CheckCircle2
} from 'lucide-react';

interface DigitalTributesModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
}

interface TributeItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconType: 'flower' | 'tree' | 'book' | 'eternal_candle';
  price: string;
  badge: string;
  impactNote: string;
  themeColor: string;
  accentBg: string;
  tagline: string;
}

export const DigitalTributesModal: React.FC<DigitalTributesModalProps> = ({
  isOpen,
  onClose,
  memorial,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedTribute, setSelectedTribute] = useState<string>('tree');
  const [donorName, setDonorName] = useState('');
  const [donorNote, setDonorNote] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const tributes: TributeItem[] = [
    {
      id: 'flower',
      title: t.modals.tributes.items.flowers,
      subtitle: t.modals.tributes.items.flowersSub,
      description: 'A permanent ivory wreath seal is affixed to the memorial dossier with your condolence inscription in gold foil lettering.',
      iconType: 'flower',
      price: '$15',
      badge: 'TIMELESS ELEGANCE',
      impactNote: 'Your name appears in the guestbook with a distinct tribute badge.',
      themeColor: '#D97706',
      accentBg: 'bg-amber-950/20 border-amber-500/30 text-amber-200',
      tagline: 'Enduring Emotional Bond'
    },
    {
      id: 'tree',
      title: t.modals.tributes.items.tree,
      subtitle: t.modals.tributes.items.treeSub,
      description: 'Three living saplings are planted in an official Memorial Forest in their honor, linked to the registry via a verifiable archival code.',
      iconType: 'tree',
      price: '$45',
      badge: 'MOST PREFERRED',
      impactNote: 'A living breath for the earth and an everlasting nature tribute.',
      themeColor: '#10B981',
      accentBg: 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200',
      tagline: 'Living Ecological Legacy'
    },
    {
      id: 'book',
      title: t.modals.tributes.items.book,
      subtitle: t.modals.tributes.items.bookSub,
      description: 'Donates five world classics book volumes stamped with their name to an underprivileged village or community school library.',
      iconType: 'book',
      price: '$65',
      badge: 'COMMUNITY EDUCATION',
      impactNote: 'Direct and meaningful support for the literacy of future generations.',
      themeColor: '#38BDF8',
      accentBg: 'bg-sky-950/20 border-sky-500/30 text-sky-200',
      tagline: 'Empowering Young Minds'
    },
    {
      id: 'eternal_candle',
      title: t.modals.tributes.items.candle,
      subtitle: t.modals.tributes.items.candleSub,
      description: 'An immortal golden brass lamp emblem pinned to the head of the dossier, burning 365 days a year with an archival patron seal.',
      iconType: 'eternal_candle',
      price: '$95',
      badge: 'PERPETUAL FLAME',
      impactNote: 'The first radiant beacon greeting every visitor to the archive.',
      themeColor: '#F59E0B',
      accentBg: 'bg-yellow-950/20 border-yellow-500/30 text-yellow-200',
      tagline: 'An Unextinguished Light'
    },
  ];

  if (!isOpen) return null;

  const handleSubmitTribute = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 2800);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'flower': return <Flower2 className="w-6 h-6 text-amber-300" />;
      case 'tree': return <TreePine className="w-6 h-6 text-emerald-400" />;
      case 'book': return <BookOpen className="w-6 h-6 text-sky-300" />;
      case 'eternal_candle': return <Flame className="w-6 h-6 text-yellow-400 fill-yellow-400/30" />;
      default: return <Sparkles className="w-6 h-6 text-emerald-300" />;
    }
  };

  const activeTributeObj = tributes.find(t => t.id === selectedTribute) || tributes[1];

  return (
    <div data-modal="overlay" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Emerald Garden Ecosystem Modal */}
      <div data-modal="panel" className="bg-[#0B1A13] text-[#ECFDF5] border-2 border-[#1E4D38] w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl rounded-sm overflow-hidden ring-1 ring-emerald-500/20">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#1A3D2D] bg-[#0E231A] flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 rounded-full bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] bg-emerald-800/80 text-emerald-100 px-2 py-0.5 font-bold rounded-xs border border-emerald-600/40">{t.modals.tributes.badge}</span>
                <span className="text-xs font-mono text-emerald-400/70 hidden sm:inline-block">{t.modals.tributes.subtitle}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-emerald-50 mt-0.5">
                Memorial Endowment for {memorial.fullName}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 border border-[#1A3D2D] bg-[#132E22] hover:bg-emerald-900 text-emerald-200 hover:text-white flex items-center justify-center transition rounded-xs cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
          
          {isSuccess ? (
            <div className="p-10 text-center bg-[#0D291E] border-2 border-emerald-500/50 space-y-4 rounded-xs shadow-2xl animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.5)]">
                <Check className="w-9 h-9" />
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-50">{t.modals.tributes.recorded}</h3>
              <p className="text-sm font-serif text-emerald-200/90 max-w-md mx-auto leading-relaxed">{t.modals.tributes.esteemed}<span className="font-bold text-white">{donorName || 'Supporter'}</span>{t.modals.tributes.tributeOf}<span className="text-emerald-300 font-semibold">{activeTributeObj.title}</span> in memory of {memorial.fullName} has been permanently inscribed into the registry.
              </p>
              <div className="inline-block px-4 py-1.5 bg-emerald-950/60 border border-emerald-600/40 text-xs font-mono text-emerald-300 rounded-full">
                Registry Seal Code: #{Date.now().toString().slice(-6)}
              </div>
            </div>
          ) : (
            <>
              {/* Botanical Info Banner */}
              <div className="p-4 bg-gradient-to-r from-[#122B20] to-[#0D2219] border-l-3 border-emerald-400 text-xs font-serif text-emerald-100/90 leading-relaxed rounded-r-xs shadow-inner">
                <p>{t.modals.tributes.body}</p>
              </div>

              {/* 4 Colored Tribute Offerings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tributes.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedTribute(item.id)}
                    className={`p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between rounded-xs relative overflow-hidden ${
                      selectedTribute === item.id
                        ? 'border-emerald-400 bg-[#133024] shadow-[0_0_20px_rgba(16,185,129,0.25)] ring-2 ring-emerald-400/30'
                        : 'border-[#1E4333] bg-[#0E241B] hover:border-emerald-600/70 hover:bg-[#112A20]'
                    }`}
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-[#1A3D2D] border border-emerald-600/40 flex items-center justify-center">
                            {getIcon(item.iconType)}
                          </div>
                          <div>
                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-300 block">
                              {item.badge}
                            </span>
                            <span className="text-[10px] text-emerald-400/70 font-serif italic">
                              {item.tagline}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-mono font-bold text-lg text-emerald-50 block">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      <h4 className="font-serif font-bold text-base text-emerald-50 leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-xs font-serif text-emerald-200/80 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3.5 border-t border-emerald-900/60 mt-3 text-[11px] font-mono text-emerald-300/90 flex items-center justify-between">
                      <span>✦ {item.impactNote}</span>
                      {selectedTribute === item.id && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Donor Form */}
              <form onSubmit={handleSubmitTribute} className="p-5 bg-[#0E241B] border border-[#1E4333] rounded-xs space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#1A3D2D] pb-2.5">
                  <span className="font-mono text-xs font-bold uppercase text-emerald-300 tracking-wider">{t.modals.tributes.contributorSection}</span>
                  <span className="text-[11px] font-mono text-emerald-400">{t.modals.tributes.selected}<strong className="text-white">{activeTributeObj.title}</strong> ({activeTributeObj.price})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-mono text-emerald-300/90 mb-1">{t.modals.tributes.nameLabel}</label>
                    <input
                      type="text"
                      required
                      placeholder={t.modals.tributes.namePlaceholder}
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                      className="w-full p-2.5 text-xs border border-[#1E4333] bg-[#07140E] text-emerald-50 placeholder-emerald-700 focus:outline-hidden focus:border-emerald-400 font-serif rounded-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-emerald-300/90 mb-1">{t.modals.tributes.noteLabel}</label>
                    <input
                      type="text"
                      placeholder={t.modals.tributes.notePlaceholder}
                      value={donorNote}
                      onChange={(e) => setDonorNote(e.target.value)}
                      className="w-full p-2.5 text-xs border border-[#1E4333] bg-[#07140E] text-emerald-50 placeholder-emerald-700 focus:outline-hidden focus:border-emerald-400 font-serif rounded-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#1A3D2D]">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400/80">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>{t.modals.tributes.encryption}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#07140E] text-xs font-mono uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 rounded-xs shadow-[0_0_15px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    <span>{t.modals.tributes.submit}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </>
          )}

        </div>

      </div>
    </div>
  );
};
