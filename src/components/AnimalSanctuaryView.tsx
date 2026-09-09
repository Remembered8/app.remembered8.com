'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { 
  Heart, 
  Flame, 
  Search, 
  Sparkles, 
  Award, 
  Compass, 
  Plus, 
  Calendar, 
  MapPin, 
  ArrowRight,
  Shield,
  Star,
  Feather
} from 'lucide-react';

interface AnimalSanctuaryViewProps {
  language?: Language;
  memorials: MemorialProfile[];
  onSelectMemorial: (memorial: MemorialProfile) => void;
  onOpenCreate: () => void;
  onLightCandle: (memorialId: string) => void;
  onOpenSearch: () => void;
}

type SanctuaryFilter = 'all' | 'rescue' | 'devotion' | 'space' | 'arctic' | 'war' | 'urban';

export const AnimalSanctuaryView: React.FC<AnimalSanctuaryViewProps> = ({
  memorials,
  onSelectMemorial,
  onOpenCreate,
  onLightCandle,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedFilter, setSelectedFilter] = useState<SanctuaryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract all animal memorials
  const animalMemorials = memorials.filter((m) => m.category === 'animal_companion');

  // Filter based on sub-tags or queries
  const filteredMemorials = animalMemorials.filter((m) => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchesText = 
        m.fullName.toLowerCase().includes(q) ||
        (m.species && m.species.toLowerCase().includes(q)) ||
        (m.breed && m.breed.toLowerCase().includes(q)) ||
        (m.honorTitle && m.honorTitle.toLowerCase().includes(q)) ||
        (m.biography && m.biography.toLowerCase().includes(q)) ||
        (m.birthPlace && m.birthPlace.toLowerCase().includes(q));
      if (!matchesText) return false;
    }

    // Category filter
    if (selectedFilter === 'rescue') {
      return (
        m.id === 'proteo-k9' || 
        m.id === 'diesel-raid' || 
        m.id === 'barry-stbernard' ||
        (m.honorTitle && m.honorTitle.toLowerCase().includes('rescue')) ||
        (m.profession && m.profession.toLowerCase().includes('rescue'))
      );
    }
    if (selectedFilter === 'devotion') {
      return (
        m.id === 'hachiko' || 
        m.id === 'fido-italy' || 
        m.id === 'greyfriars-bobby' ||
        (m.profession && m.profession.toLowerCase().includes('loyalty')) ||
        (m.profession && m.profession.toLowerCase().includes('fidelity'))
      );
    }
    if (selectedFilter === 'space') {
      return (
        m.id === 'laika-space' ||
        (m.profession && m.profession.toLowerCase().includes('space')) ||
        (m.profession && m.profession.toLowerCase().includes('pioneer'))
      );
    }
    if (selectedFilter === 'arctic') {
      return (
        m.id === 'balto-alaska' || 
        m.id === 'togo-sled-hero' ||
        (m.profession && m.profession.toLowerCase().includes('sled'))
      );
    }
    if (selectedFilter === 'war') {
      return (
        m.id === 'cher-ami' || 
        m.id === 'wojtek-bear' || 
        m.id === 'sergeant-stubby' ||
        (m.profession && m.profession.toLowerCase().includes('war')) ||
        (m.profession && m.profession.toLowerCase().includes('artillery'))
      );
    }
    if (selectedFilter === 'urban') {
      return (
        m.id === 'tombili-kadikoy' || 
        m.id === 'gli-hagiasophia' || 
        m.id === 'street-cat-bob' ||
        (m.profession && m.profession.toLowerCase().includes('mascot'))
      );
    }

    return true;
  });

  // Calculate totals
  const totalCandles = animalMemorials.reduce((sum, m) => sum + (m.candleCount || 0), 0);

  return (
    <div className="min-h-screen bg-[#0E1712] text-[#F3EFE6] font-serif selection:bg-[#2D5038] selection:text-[#F3EFE6]">
      
      {/* 1. Sanctuary Hero Pavilion Banner */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 border-b border-[#244230] overflow-hidden">
        
        {/* Subtle Ambient Background Gradients */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-600 via-[#132219] to-transparent" />
        <div className="absolute -top-24 right-0 w-96 h-96 bg-[#C88A35]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Top Archival Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-[#244230]/70 text-xs font-mono">
            <div className="flex items-center gap-2 text-[#86EFAC]">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="tracking-widest uppercase font-bold">{t.modals.sanctuary.badge}</span>
            </div>
            <div className="flex items-center gap-4 text-[#A3B899]">
              <span>{animalMemorials.length} Historical & Companion Memorials</span>
              <span>•</span>
              <span className="text-[#FDE68A] flex items-center gap-1 font-bold">
                <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                {totalCandles.toLocaleString()} Memorial Vigils Lit
              </span>
            </div>
          </div>

          {/* Main Display Header */}
          <div className="mt-8 text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#172B1E] border border-[#2E583F] rounded-full text-xs font-mono text-[#86EFAC]">
              <span>🐾</span>
              <span>{t.modals.sanctuary.subtitle}</span>
            </div>
            
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#FAF8F5] leading-tight">{t.modals.sanctuary.title}</h1>
            
            <p className="text-base sm:text-lg text-[#C5BBA4] font-serif italic max-w-2xl mx-auto leading-relaxed">{t.modals.sanctuary.quote}</p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 font-mono text-xs">
              <button
                onClick={onOpenCreate}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-[#C88A35] hover:bg-[#DE9D45] text-[#0E1712] font-bold tracking-wider uppercase transition shadow-lg hover:shadow-amber-500/20 cursor-pointer"
                id="sanctuary-create-memorial-btn"
              >
                <Plus className="w-4 h-4" />
                <span>{t.modals.sanctuary.openMemorial}</span>
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-12 max-w-4xl mx-auto bg-[#142319] border border-[#2E4E37] p-4 shadow-xl">
            <div className="flex flex-col md:flex-row gap-3">
              
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#7A957F] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.modals.sanctuary.searchPlaceholder}
                  className="w-full pl-9 pr-4 py-2 bg-[#0B140F] border border-[#284431] text-xs font-mono text-[#F3EFE6] placeholder-[#5D7A62] focus:outline-none focus:border-[#86EFAC] transition"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7A957F] hover:text-white"
                  >{t.modals.sanctuary.clear}</button>
                )}
              </div>

            </div>

            {/* Filter Pills */}
            <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-3 border-t border-[#233C2A] text-xs font-mono">
              <span className="text-[#6D8772] text-[11px] uppercase mr-1">{t.modals.sanctuary.filterLabel}</span>
              
              {[
                { id: 'all', label: t.modals.sanctuary.filters.all, icon: Star },
                { id: 'rescue', label: t.modals.sanctuary.filters.rescue, icon: Shield },
                { id: 'devotion', label: t.modals.sanctuary.filters.fidelity, icon: Heart },
                { id: 'space', label: t.modals.sanctuary.filters.cosmic, icon: Sparkles },
                { id: 'arctic', label: t.modals.sanctuary.filters.sled, icon: Compass },
                { id: 'war', label: t.modals.sanctuary.filters.veterans, icon: Award },
                { id: 'urban', label: t.modals.sanctuary.filters.mascots, icon: Feather },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = selectedFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedFilter(tab.id as SanctuaryFilter)}
                    className={`px-2.5 py-1 flex items-center gap-1 transition rounded-xs cursor-pointer ${
                      isActive
                        ? 'bg-[#86EFAC] text-[#0E1712] font-bold shadow-xs'
                        : 'bg-[#0E1B13] text-[#A5C2A9] hover:bg-[#1E3626] hover:text-[#FAF8F5] border border-[#233F2B]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 2. Grid of Animal Memorial Profiles */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        
        {/* Results Header */}
        <div className="flex items-center justify-between pb-4 mb-8 border-b border-[#244230] text-xs font-mono text-[#99B39F]">
          <span>{t.modals.sanctuary.displaying}<strong className="text-[#FAF8F5]">{filteredMemorials.length}</strong> Sanctuary Registries
            {selectedFilter !== 'all' && ` in selected domain`}
          </span>
          <span className="text-[11px] text-[#7A957F]">{t.modals.sanctuary.clickHint}</span>
        </div>

        {/* The Memorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemorials.map((memorial) => {
            return (
              <article
                key={memorial.id}
                onClick={() => onSelectMemorial(memorial)}
                className="group flex flex-col bg-[#14231A] border border-[#2E4E37] hover:border-[#86EFAC] transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-emerald-950/50 cursor-pointer overflow-hidden relative"
              >
                
                {/* Photo Top Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0A120D] border-b border-[#284431]">
                  <img
                    src={memorial.heroImage}
                    alt={memorial.fullName}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800';
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                  />

                  {/* Gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#14231A] via-transparent to-transparent opacity-80" />

                  {/* Species Tag Top-Left */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0E1B13]/90 backdrop-blur-xs border border-[#2D5038] text-[10px] font-mono font-bold text-[#86EFAC] tracking-wider uppercase">
                    🐾 {memorial.species || 'Companion'}
                  </div>

                  {/* Candle Count Pill Top-Right */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#14231A]/90 backdrop-blur-xs border border-[#443722] text-[10px] font-mono font-bold text-[#FDE68A] flex items-center gap-1">
                    <Flame className="w-3 h-3 text-[#F59E0B]" />
                    <span>{memorial.candleCount.toLocaleString()}</span>
                  </div>

                  {/* Breed pill bottom left */}
                  {memorial.breed && (
                    <div className="absolute bottom-2 left-2.5 text-[11px] font-mono text-[#D5CBB5] bg-[#0E1712]/80 px-1.5 py-0.2 border border-[#2E4E37]">
                      {memorial.breed}
                    </div>
                  )}
                </div>

                {/* Card Content Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div className="space-y-2">
                    {/* Honor Title Ribbon */}
                    {memorial.honorTitle && (
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#C88A35] font-bold truncate" title={memorial.honorTitle}>
                        {memorial.honorTitle}
                      </p>
                    )}

                    {/* Name */}
                    <h3 className="font-serif-display text-2xl font-bold text-[#FAF8F5] group-hover:text-[#86EFAC] transition leading-tight">
                      {memorial.fullName}
                    </h3>

                    {/* Life Journey (Years & Resting Place) */}
                    <div className="pt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#8FA895]">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#5D7A62]" />
                        {memorial.birthDate} &mdash; {memorial.deathDate}
                      </span>
                      {memorial.restingPlace && (
                        <span className="flex items-center gap-1 truncate max-w-[200px]" title={memorial.restingPlace}>
                          <MapPin className="w-3 h-3 text-[#5D7A62] shrink-0" />
                          <span className="truncate">{memorial.restingPlace.split('&')[0]}</span>
                        </span>
                      )}
                    </div>

                    {/* Life Quote */}
                    {memorial.lifeQuote && (
                      <blockquote className="text-xs font-serif italic text-[#C5BBA4] line-clamp-2 border-l-2 border-[#C88A35]/60 pl-2.5 py-0.5 mt-2">
                        &ldquo;{memorial.lifeQuote}&rdquo;
                      </blockquote>
                    )}
                  </div>

                  {/* Bottom Actions inside Card */}
                  <div className="pt-3 border-t border-[#233C2A] flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onLightCandle(memorial.id);
                      }}
                      className="inline-flex items-center gap-1 text-[#FDE68A] hover:text-[#F59E0B] px-2 py-1 bg-[#1F2C1F] hover:bg-[#2A3F2C] border border-[#3E4A35] transition rounded-xs cursor-pointer"
                      title={t.modals.sanctuary.lightVigilTitle}
                    >
                      <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
                      <span>{t.modals.sanctuary.lightVigil}</span>
                    </button>

                    <div className="inline-flex items-center gap-1 text-[#86EFAC] group-hover:translate-x-1 transition font-bold">
                      <span>{t.modals.sanctuary.viewChronicle}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>

                </div>

              </article>
            );
          })}
        </div>

        {/* Empty Search Fallback */}
        {filteredMemorials.length === 0 && (
          <div className="text-center py-16 bg-[#142319] border border-[#2E4E37] p-8 space-y-4">
            <span className="text-4xl">🐾</span>
            <h3 className="font-serif-display text-2xl font-bold text-[#FAF8F5]">{t.modals.sanctuary.emptyTitle}</h3>
            <p className="text-sm font-mono text-[#8FA895] max-w-md mx-auto">{t.modals.sanctuary.emptyBody}</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="px-4 py-2 bg-[#86EFAC] text-[#0E1712] font-mono text-xs font-bold uppercase transition"
            >{t.modals.sanctuary.resetFilters}</button>
          </div>
        )}

        {/* 3. Consecrated Rainbow Bridge & Dedicated Pet Tribute Section */}
        <div className="mt-16 bg-gradient-to-r from-[#172B1E] via-[#1A3324] to-[#172B1E] border border-[#34583F] p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="flex items-center gap-2 text-[#FDE68A] text-xs font-mono uppercase tracking-widest font-bold">
              <Sparkles className="w-4 h-4 text-[#F59E0B]" />
              <span>{t.modals.sanctuary.service}</span>
            </div>

            <h2 className="font-serif-display text-3xl sm:text-4xl font-black text-[#FAF8F5] leading-tight">{t.modals.sanctuary.ownTitle}</h2>

            <p className="font-serif text-base text-[#D4C9B3] leading-relaxed">{t.modals.sanctuary.ownBody}</p>

            <div className="pt-2 flex flex-wrap items-center gap-4 font-mono text-xs">
              <button
                onClick={onOpenCreate}
                className="px-5 py-2.5 bg-[#C88A35] hover:bg-[#DE9D45] text-[#0E1712] font-bold tracking-wider uppercase transition cursor-pointer shadow-md"
              >{t.modals.sanctuary.consecrate}</button>
            </div>
          </div>
        </div>

      </section>

      {/* 4. Solemn Footer */}
      <footer className="py-8 border-t border-[#244230] text-center font-mono text-xs text-[#6B8570]">
        <div className="max-w-4xl mx-auto px-4 space-y-2">
          <p className="flex items-center justify-center gap-1.5">
            <span>{t.modals.sanctuary.covenant}</span>
            <span>•</span>
            <span>{t.modals.sanctuary.allRemembered}</span>
          </p>
          <p className="text-[11px] text-[#4F6854]">
            Remembered Living Archival Registry &copy; {new Date().getFullYear()} • Sanctuary Pavilion
          </p>
        </div>
      </footer>

    </div>
  );
};
