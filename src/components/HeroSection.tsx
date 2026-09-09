'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { memorialUrl } from '@/lib/deepLink';
import { MemorialProfile } from '@/types/memorial';
import { Plus, Share2, Check, Volume2, Flame, Calendar, MapPin, Sparkles, Feather, FileText, QrCode, Camera } from 'lucide-react';

interface HeroSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onLightCandle: () => void;
  hasLitCandle: boolean;
  onOpenWriteMemory: () => void;
  onScrollToVoice: () => void;
  onOpenQr: () => void;
  onOpenObituaryCard?: () => void;
  onOpenSocialStudio?: () => void;
  onGoToSanctuary?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  memorial,
  onLightCandle,
  hasLitCandle,
  onOpenWriteMemory,
  onScrollToVoice,
  onOpenQr,
  onOpenObituaryCard,
  onOpenSocialStudio,
  onGoToSanctuary,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(memorialUrl(memorial.id));
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isAnimal = memorial.category === 'animal_companion';
  const displayTitle = memorial.honorTitle || memorial.profession || (memorial as any).title || '';
  const displayQuote = memorial.lifeQuote || (memorial as any).quote || '';

  return (
    <section 
      id="hero" 
      className={
        isAnimal
          ? "bg-[#0E1A13] text-[#F3EFE8] pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#244230] relative overflow-hidden"
          : "bg-[#F8F8F5] text-[#111111] pt-6 pb-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111]"
      }
    >
      {/* Background ambient accents for animal companions */}
      {isAnimal && (
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 via-[#132219] to-transparent" />
      )}

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Top Return link for animal sanctuary */}
        {isAnimal && onGoToSanctuary && (
          <div className="mb-4 pb-3 border-b border-[#244230] flex items-center justify-between text-xs font-mono">
            <button
              onClick={onGoToSanctuary}
              className="inline-flex items-center gap-1.5 text-[#86EFAC] hover:text-white transition cursor-pointer font-bold"
            >
              <span>{t.sections.hero.backToSanctuary}</span>
            </button>
            <span className="text-[#A3B899] text-[11px]">{t.sections.hero.animalBadge}</span>
          </div>
        )}

        {/* Broadsheet 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column Left: Archival Portrait (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div 
              className={
                isAnimal
                  ? "w-full bg-[#14231A] p-3 border-2 border-[#C88A35]/80 shadow-2xl relative"
                  : "w-full bg-white p-3 border-2 border-[#111111] shadow-md relative"
              }
            >
              
              <div 
                className={
                  isAnimal
                    ? "relative aspect-[4/5] w-full overflow-hidden bg-[#0A120D] border border-[#2D5038]"
                    : "relative aspect-[4/5] w-full overflow-hidden bg-[#EAEAE6] border border-[#111111]/30"
                }
              >
                <img
                  src={memorial.heroImage}
                  alt={memorial.fullName}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = isAnimal
                      ? 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                  }}
                  className="w-full h-full object-cover object-[center_20%] group-hover:scale-102 transition-transform duration-700"
                />
                
                {/* Archival Stamp */}
                <div 
                  className={
                    isAnimal
                      ? "absolute top-2 right-2 px-2.5 py-0.5 bg-[#0B150F]/90 backdrop-blur-xs text-[#86EFAC] border border-[#2D5038] text-[10px] font-mono tracking-widest uppercase font-bold"
                      : "absolute top-2 right-2 px-2 py-0.5 bg-[#111111] text-white text-[10px] font-mono tracking-widest uppercase"
                  }
                >
                  {isAnimal ? t.sections.hero.sanctuaryRecord : t.sections.hero.archivalRecord}
                </div>
              </div>

              {/* Caption Under Portrait */}
              <div 
                className={
                  isAnimal
                    ? "mt-3 pt-2 border-t border-[#2D5038] flex items-center justify-between text-xs font-serif italic text-[#C5BBA4]"
                    : "mt-3 pt-2 border-t border-[#111111]/20 flex items-center justify-between text-xs font-serif italic text-[#555555]"
                }
              >
                <span className="truncate max-w-[240px]">{displayTitle}</span>
                <span className={`font-mono not-italic text-[10px] ${isAnimal ? 'text-[#8FA895]' : 'text-[#777777]'}`}>
                  {t.sections.hero.registryPrefix}{memorial.id}
                </span>
              </div>
            </div>

            {/* Quick Share, Social Media Studio & Obituary Card action under photo */}
            <div 
              className={`w-full mt-3 flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${
                isAnimal ? 'text-[#8FA895]' : 'text-[#555555]'
              }`}
            >
              <button
                onClick={handleShare}
                className={`inline-flex items-center gap-1 hover:underline cursor-pointer ${
                  isAnimal ? 'text-[#FAF8F5]' : 'text-[#111111]'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? t.sections.hero.linkCopied : t.sections.hero.share}</span>
              </button>

              <div className="flex items-center gap-1.5">
                {onOpenSocialStudio && (
                  <button
                    onClick={onOpenSocialStudio}
                    className={
                      isAnimal
                        ? "inline-flex items-center gap-1 text-[#86EFAC] hover:text-white font-bold border border-[#2E583F] bg-[#172B1E] hover:bg-[#203D2A] px-2 py-0.5 transition rounded-xs cursor-pointer shadow-xs"
                        : "inline-flex items-center gap-1 text-[#0F291E] hover:text-white font-bold border border-[#1E4D38] bg-[#D1FAE5]/70 hover:bg-[#0F291E] px-2 py-0.5 transition rounded-xs cursor-pointer shadow-2xs"
                    }
                    title={t.sections.hero.socialKitTitle}
                  >
                    <Camera className={`w-3.5 h-3.5 ${isAnimal ? 'text-[#86EFAC]' : 'text-[#059669]'}`} />
                    <span>{t.sections.hero.socialKit}</span>
                  </button>
                )}

                {onOpenObituaryCard && (
                  <button
                    onClick={onOpenObituaryCard}
                    className={
                      isAnimal
                        ? "inline-flex items-center gap-1 text-[#FDE68A] hover:text-white font-bold border border-[#5A4E31] bg-[#2A261C] px-2 py-0.5 transition cursor-pointer"
                        : "inline-flex items-center gap-1 text-amber-900 hover:text-black font-bold border border-amber-800/40 bg-amber-50 px-2 py-0.5 transition cursor-pointer"
                    }
                    title={t.sections.hero.obituaryCardTitle}
                  >
                    <FileText className={`w-3.5 h-3.5 ${isAnimal ? 'text-[#F59E0B]' : 'text-amber-800'}`} />
                    <span>{t.sections.hero.obituaryCard}</span>
                  </button>
                )}

                {onOpenQr && (
                  <button
                    onClick={onOpenQr}
                    className={
                      isAnimal
                        ? "inline-flex items-center gap-1 text-[#FAF8F5] hover:text-[#86EFAC] font-bold border border-[#2D5038] bg-[#122419] px-2 py-0.5 transition cursor-pointer"
                        : "inline-flex items-center gap-1 text-[#222222] hover:text-black font-bold border border-[#C5BCAE] bg-[#EFE9DD] px-2 py-0.5 transition cursor-pointer"
                    }
                    title={t.sections.hero.qrPlaqueTitle}
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>{t.sections.hero.qrPlaque}</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Column Right: Profile Details & Candle Action (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            
            {/* Header Titles */}
            <div className={`border-b ${isAnimal ? 'border-[#244230]' : 'border-[#111111]'} pb-4`}>
              <span 
                className={`text-[10px] uppercase font-mono tracking-[0.25em] block mb-1 ${
                  isAnimal ? 'text-[#86EFAC] font-bold' : 'text-[#666666]'
                }`}
              >
                {isAnimal
                  ? '🐾 MONUMENT OF DEVOTION & FAITHFUL ANIMAL HEROES • EARTH SANCTUARY'
                  : 'OFFICIAL LIVING ARCHIVE • BIOGRAPHICAL REGISTRY'}
              </span>
              <h1 
                className={`font-serif-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight ${
                  isAnimal ? 'text-[#FAF8F5]' : 'text-[#111111]'
                }`}
              >
                {memorial.fullName}
              </h1>
              <p 
                className={`font-serif text-lg sm:text-xl italic mt-1 ${
                  isAnimal ? 'text-[#D2C8B5]' : 'text-[#444444]'
                }`}
              >
                {displayTitle}
              </p>
              {isAnimal && (memorial.species || memorial.breed || memorial.honorTitle) && (
                <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-xs">
                  {memorial.species && (
                    <span className="px-2 py-0.5 bg-[#1B3324] text-[#86EFAC] border border-[#2D583F] rounded-xs font-semibold">
                      🐾 Species: {memorial.species}
                    </span>
                  )}
                  {memorial.breed && (
                    <span className="px-2 py-0.5 bg-[#2D281D] text-[#FDE68A] border border-[#5A4E31] rounded-xs">
                      Breed: {memorial.breed}
                    </span>
                  )}
                  {memorial.honorTitle && (
                    <span className="px-2 py-0.5 bg-[#3B2912] text-[#FDBA74] border border-[#7C4A1A] rounded-xs font-semibold truncate max-w-[280px]">
                      🎖️ {memorial.honorTitle}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Vital Statistics (Dates & Locations) */}
            <div 
              className={`grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b font-serif ${
                isAnimal ? 'border-[#244230] text-[#FAF8F5]' : 'border-[#111111]/20 text-[#111111]'
              }`}
            >
              <div className="space-y-0.5">
                <span className={`text-[10px] uppercase font-mono block ${isAnimal ? 'text-[#8FA895]' : 'text-[#777777]'}`}>
                  {isAnimal ? 'Cherished Lifetime' : 'Life Journey'}
                </span>
                <p className="text-sm font-bold flex items-center gap-1.5">
                  <Calendar className={`w-3.5 h-3.5 ${isAnimal ? 'text-[#86EFAC]' : 'text-[#111111]'}`} />
                  <span>{memorial.birthDate} &mdash; {memorial.deathDate}</span>
                </p>
              </div>

              {memorial.restingPlace && (
                <div className="space-y-0.5">
                  <span className={`text-[10px] uppercase font-mono block ${isAnimal ? 'text-[#8FA895]' : 'text-[#777777]'}`}>
                    {isAnimal ? 'Eternal Meadow & Memorial' : 'Eternal Resting Place'}
                  </span>
                  <p className="text-sm font-bold flex items-center gap-1.5">
                    <MapPin className={`w-3.5 h-3.5 ${isAnimal ? 'text-[#86EFAC]' : 'text-[#111111]'}`} />
                    <span className="truncate">{memorial.restingPlace}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Epigraph / Quote */}
            {displayQuote && (
              <div 
                className={
                  isAnimal
                    ? "p-4 bg-[#14231A] border-l-4 border-[#C88A35] shadow-md"
                    : "p-4 bg-white border-l-4 border-[#111111] shadow-xs"
                }
              >
                <blockquote 
                  className={`font-serif text-base sm:text-lg italic leading-relaxed ${
                    isAnimal ? 'text-[#EFE7D5]' : 'text-[#222222]'
                  }`}
                >
                  &ldquo;{displayQuote}&rdquo;
                </blockquote>
              </div>
            )}

            {/* Digital Candle & Memory Action Box */}
            <div 
              className={
                isAnimal
                  ? "p-5 bg-[#14231A] border border-[#2D5038] shadow-xl space-y-4"
                  : "p-5 bg-white border border-[#111111] shadow-sm space-y-4"
              }
            >
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b ${isAnimal ? 'border-[#244230]' : 'border-[#111111]/15'} pb-3`}>
                <div>
                  <span 
                    className={`text-[10px] uppercase font-mono tracking-widest block ${
                      isAnimal ? 'text-[#8FA895]' : 'text-[#777777]'
                    }`}
                  >
                    {isAnimal ? t.sections.hero.pawTributeVigil : t.sections.hero.tributeVigil}
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span 
                      className={`font-serif-display text-3xl font-bold ${
                        isAnimal ? 'text-[#FDE68A]' : 'text-[#111111]'
                      }`}
                    >
                      {memorial.candleCount.toLocaleString()}
                    </span>
                    <span 
                      className={`text-xs font-serif italic ${
                        isAnimal ? 'text-[#C5BBA4]' : 'text-[#555555]'
                      }`}
                    >{t.sections.hero.candlesTribute}</span>
                  </div>
                </div>

                <button
                  onClick={onLightCandle}
                  className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-mono uppercase tracking-wider transition border cursor-pointer ${
                    isAnimal
                      ? hasLitCandle
                        ? 'bg-[#1E3624] text-[#FDE68A] border-[#3E684A] shadow-[0_0_12px_rgba(253,230,138,0.4)]'
                        : 'bg-[#C88A35] hover:bg-[#DE9D45] text-[#0E1712] font-bold border-[#E5AA54] shadow-md'
                      : hasLitCandle
                        ? 'bg-[#111111] text-amber-400 border-[#111111] shadow-[0_0_10px_rgba(245,158,11,0.5)]'
                        : 'bg-white hover:bg-[#111111] text-[#111111] hover:text-white border-[#111111]'
                  }`}
                  id="digital-candle-button"
                >
                  <Flame className={`w-4 h-4 ${hasLitCandle ? 'fill-amber-400 text-amber-400' : ''}`} />
                  <span>{hasLitCandle ? 'Vigil Candle Lit (Recorded)' : 'Light a Memorial Candle'}</span>
                </button>
              </div>

              {/* Action Links */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <button
                  onClick={onOpenWriteMemory}
                  className={`inline-flex items-center gap-1.5 font-mono uppercase hover:underline font-bold ${
                    isAnimal ? 'text-[#86EFAC]' : 'text-[#111111]'
                  }`}
                  id="hero-write-memory-btn"
                >
                  <Feather className="w-3.5 h-3.5" />
                  <span>{isAnimal ? 'Leave a Pawprint Tribute Letter &rarr;' : 'Leave a Tribute Letter &rarr;'}</span>
                </button>

                {memorial.audioRecordings.length > 0 && (
                  <button
                    onClick={onScrollToVoice}
                    className={`inline-flex items-center gap-1.5 font-mono uppercase ${
                      isAnimal ? 'text-[#C5BBA4] hover:text-[#FAF8F5]' : 'text-[#444444] hover:text-[#111111]'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Listen to Oral Archive ({memorial.audioRecordings.length})</span>
                  </button>
                )}
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
