'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { Clock, MessageSquare, Image as ImageIcon, Flame, Heart } from 'lucide-react';

interface TodaySectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddFlower: (flowerType: string) => void;
  onOpenWriteMemory: () => void;
}

export const TodaySection: React.FC<TodaySectionProps> = ({
  memorial,
  onAddFlower,
  onOpenWriteMemory,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedFlower, setSelectedFlower] = useState<string | null>(null);
  const [flowerSent, setFlowerSent] = useState(false);

  const isAnimal = memorial.category === 'animal_companion';

  const f = t.sections.today.flowers;
  const flowers = isAnimal
    ? [
        { id: 'white-lily', name: f.whiteLily, symbol: '🌸', meaning: f.whiteLilyMeaningAnimal },
        { id: 'meadow-clover', name: f.meadowClover, symbol: '🌿', meaning: f.meadowCloverMeaning },
        { id: 'golden-blossom', name: f.goldenGarland, symbol: '🌼', meaning: f.goldenGarlandMeaning },
        { id: 'pawprint-wreath', name: f.pawprintWreath, symbol: '🐾', meaning: f.pawprintWreathMeaning },
      ]
    : [
        { id: 'white-lily', name: f.whiteLily, symbol: '🌸', meaning: f.whiteLilyMeaning },
        { id: 'carnation', name: f.carnation, symbol: '🌺', meaning: f.carnationMeaning },
        { id: 'olive', name: f.olive, symbol: '🌿', meaning: f.oliveMeaning },
        { id: 'rose', name: f.rose, symbol: '🕊️', meaning: f.roseMeaning },
      ];

  const handleSendFlower = (flower: { id: string; name: string }) => {
    setSelectedFlower(flower.name);
    onAddFlower(flower.name);
    setFlowerSent(true);
    setTimeout(() => {
      setFlowerSent(false);
    }, 4000);
  };

  return (
    <section className={`${isAnimal ? 'bg-[#F4F1EA]' : 'bg-[#F8F8F5]'} py-10 px-4 sm:px-6 lg:px-8 text-[#111111] border-b ${isAnimal ? 'border-[#2D4E37]/30' : 'border-[#111111]/20'}`}>
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className={`flex flex-col md:flex-row md:items-end justify-between gap-4 border-b ${isAnimal ? 'border-[#2D4E37]' : 'border-[#111111]'} pb-4 mb-6`}>
          <div>
            <div className={`flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.2em] ${isAnimal ? 'text-[#3E6548] font-bold' : 'text-[#666666]'} mb-1`}>
              <Clock className="w-3.5 h-3.5" />
              <span>
                {isAnimal ? '🐾 SANCTUARY VISITS & TRIBUTE LOG' : 'DAILY VISITS & TRIBUTE LOG'} • {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            </div>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#111111] font-bold">
              {isAnimal ? t.sections.today.whoRemop : t.sections.today.whoRemembered}
            </h2>
            <p className="text-xs font-serif italic text-[#555555] mt-0.5">
              {isAnimal
                ? '“Until one has loved an animal, a part of one’s soul remains unawakened.”'
                : '“A person is never truly gone as long as their name is spoken and remembered.”'}
            </p>
          </div>

          {/* Leave a Traditional Tribute Action */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[#555555] mr-1 hidden sm:inline">
              {isAnimal ? 'Offer a Nature Tribute:' : 'Offer a Tribute:'}
            </span>
            {flowers.map((f) => (
              <button
                key={f.id}
                onClick={() => handleSendFlower(f)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs bg-white hover:bg-[#111111] hover:text-white border ${
                  isAnimal ? 'border-[#2D4E37]/40 hover:border-[#2D4E37]' : 'border-[#111111]/30 hover:border-[#111111]'
                } transition text-[#222222] shadow-2xs font-mono cursor-pointer`}
                title={`${f.name} (${f.meaning})`}
              >
                <span>{f.symbol}</span>
                <span>{f.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tribute Notification Alert */}
        {flowerSent && (
          <div className="mb-6 p-3 bg-[#FAF8F5] border border-[#111111] text-xs flex items-center justify-between animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <span>🕊️</span>
              <span className="font-serif italic">{selectedFlower} tribute recorded in the ledger. May their memory be a blessing.</span>
            </div>
            <span className="text-[10px] font-mono uppercase font-bold text-white bg-black px-2 py-0.5">{t.sections.today.recorded}</span>
          </div>
        )}

        {/* Activity Feed Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {memorial.todayActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-3 p-3 bg-white border border-[#111111]/15 hover:border-[#111111] transition shadow-2xs"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-[#FAF8F5] border border-[#111111]/20 text-[#111111] shrink-0 font-mono text-xs">
                {activity.type === 'memory' && <MessageSquare className="w-3.5 h-3.5 text-[#111111]" />}
                {activity.type === 'photo' && <ImageIcon className="w-3.5 h-3.5 text-[#111111]" />}
                {activity.type === 'flower' && <span>🌸</span>}
                {activity.type === 'candle' && <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />}
                {activity.type === 'visit' && <Heart className="w-3.5 h-3.5 text-rose-600" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs font-serif font-bold text-[#111111] truncate">
                    {activity.actor}
                  </h4>
                  <span className="text-[10px] text-[#777777] shrink-0 font-mono">{activity.timeAgo}</span>
                </div>
                <p className="text-xs font-serif text-[#444444] leading-snug truncate">
                  {activity.action}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={onOpenWriteMemory}
            className="text-xs font-mono uppercase text-[#111111] hover:underline font-bold cursor-pointer"
          >{t.sections.today.contribute}</button>
        </div>

      </div>
    </section>
  );
};
