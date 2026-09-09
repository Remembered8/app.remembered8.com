'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { Search, X, ArrowRight } from 'lucide-react';

interface SearchExploreModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorials: MemorialProfile[];
  onSelectMemorial: (memorial: MemorialProfile) => void;
}

export const SearchExploreModal: React.FC<SearchExploreModalProps> = ({
  isOpen,
  onClose,
  memorials,
  onSelectMemorial,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [query, setQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [professionFilter, setProfessionFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'historical' | 'civilian' | 'animal_companion'>('all');

  if (!isOpen) return null;

  const filteredMemorials = memorials.filter((m) => {
    const matchQuery =
      m.fullName.toLowerCase().includes(query.toLowerCase()) ||
      m.profession.toLowerCase().includes(query.toLowerCase()) ||
      m.birthPlace.toLowerCase().includes(query.toLowerCase()) ||
      (m.species && m.species.toLowerCase().includes(query.toLowerCase())) ||
      (m.breed && m.breed.toLowerCase().includes(query.toLowerCase())) ||
      (m.honorTitle && m.honorTitle.toLowerCase().includes(query.toLowerCase())) ||
      m.biography.toLowerCase().includes(query.toLowerCase());

    const matchCity = !cityFilter || m.birthPlace.toLowerCase().includes(cityFilter.toLowerCase()) || m.restingPlace.toLowerCase().includes(cityFilter.toLowerCase());
    const matchProfession = !professionFilter || m.profession.toLowerCase().includes(professionFilter.toLowerCase());

    const matchCategory =
      categoryFilter === 'all'
        ? true
        : categoryFilter === 'animal_companion'
        ? m.category === 'animal_companion'
        : categoryFilter === 'historical'
        ? m.isVerifiedHistoric && m.category !== 'animal_companion'
        : !m.isVerifiedHistoric && m.category !== 'animal_companion';

    return matchQuery && matchCity && matchProfession && matchCategory;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-3xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-[#111111] bg-[#FAF8F5]">
              <Search className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#111111]">{t.modals.search.title}</h3>
              <p className="text-xs font-serif italic text-[#555555]">{t.modals.search.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Search Input and Filters */}
        <div className="py-4 space-y-3 shrink-0">
          <div className="relative">
            <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.modals.search.placeholder}
              className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
            {[
              { id: 'all', label: t.modals.search.filterAll },
              { id: 'historical', label: t.modals.search.filterHistoric },
              { id: 'civilian', label: t.modals.search.filterFamily },
              { id: 'animal_companion', label: t.modals.search.filterAnimals },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id as any)}
                className={`px-2.5 py-1 text-xs border transition cursor-pointer font-bold ${
                  categoryFilter === cat.id
                    ? 'bg-[#111111] text-white border-[#111111]'
                    : 'bg-[#FAF8F5] text-[#333333] border-[#CCCCCC] hover:border-[#111111]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#666666] uppercase mr-1">{t.modals.search.featured}</span>
            {['Proteo', 'Hachiko', 'Tombili', 'Baris Manco', 'Sabahattin Ali', 'Ataturk', 'Laika', 'K-9'].map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2 py-0.5 border border-[#111111]/20 hover:border-[#111111] text-xs hover:bg-[#FAF8F5] transition cursor-pointer"
              >
                {tag}
              </button>
            ))}
            {(query || cityFilter || professionFilter || categoryFilter !== 'all') && (
              <button
                onClick={() => {
                  setQuery('');
                  setCityFilter('');
                  setProfessionFilter('');
                  setCategoryFilter('all');
                }}
                className="text-black underline ml-auto text-xs cursor-pointer"
              >{t.modals.search.clearFilters}</button>
            )}
          </div>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto space-y-2 py-2 pr-1">
          {filteredMemorials.length === 0 ? (
            <div className="text-center py-12 text-[#666666] text-xs font-serif italic">{t.modals.search.empty}</div>
          ) : (
            filteredMemorials.map((memorial) => (
              <div
                key={memorial.id}
                onClick={() => {
                  onSelectMemorial(memorial);
                  onClose();
                }}
                className="group cursor-pointer p-3 sm:p-4 bg-white hover:bg-[#FAF8F5] border border-[#111111]/20 hover:border-[#111111] transition-all flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={memorial.heroImage}
                    alt={memorial.fullName}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 object-cover shrink-0 border border-[#111111]/30"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif font-bold text-base text-[#111111] group-hover:underline truncate">
                        {memorial.fullName}
                      </h4>
                      {memorial.category === 'animal_companion' ? (
                        <span className="text-[10px] bg-[#EAE2D2] text-[#6E4F18] border border-[#D0C09E] px-1.5 py-0.2 font-mono rounded-xs shrink-0">
                          🐾 {memorial.species || 'Companion'}
                        </span>
                      ) : (
                        <span className="text-xs text-[#666666] font-mono">
                          ({memorial.birthDate.split(' ').pop()} &mdash; {memorial.deathDate.split(' ').pop()})
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#555555] font-serif truncate">
                      {memorial.category === 'animal_companion' && memorial.honorTitle
                        ? `${memorial.honorTitle} • ${memorial.birthPlace}`
                        : `${memorial.profession} • ${memorial.birthPlace}`}
                    </p>

                    <p className="text-[11px] text-[#777777] font-serif italic truncate mt-0.5">
                      &ldquo;{memorial.lifeQuote}&rdquo;
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right hidden sm:block font-mono text-xs">
                    <span className="text-black font-medium">{memorial.candleCount} Candles</span>
                    <p className="text-[10px] text-[#666666]">{memorial.memories.length} Letters</p>
                  </div>

                  <span className="p-2 border border-[#111111]/30 group-hover:bg-[#111111] group-hover:text-white transition">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-[#111111]/20 flex items-center justify-between text-xs text-[#666666] shrink-0 font-mono">
          <span>{memorials.length} Perpetual Records Preserved</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 border border-[#111111] hover:bg-[#111111] hover:text-white text-xs uppercase transition cursor-pointer"
          >{t.modals.search.close}</button>
        </div>

      </div>
    </div>
  );
};
