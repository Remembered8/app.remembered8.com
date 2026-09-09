'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, TimeCapsule } from '@/types/memorial';
import { Lock, Unlock, Key, Clock, ShieldCheck, FileText, Mic, Video, Plus, Calendar, AlertCircle } from 'lucide-react';

interface TimeCapsuleSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddCapsule: (capsule: TimeCapsule) => void;
}

export const TimeCapsuleSection: React.FC<TimeCapsuleSectionProps> = ({
  memorial,
  onAddCapsule,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [recipient, setRecipient] = useState('');
  const [unlockDate, setUnlockDate] = useState('2035-10-29');
  const [content, setContent] = useState('');
  const [capsuleType, setCapsuleType] = useState<TimeCapsule['type']>('letter');

  const defaultCapsules: TimeCapsule[] = memorial.timeCapsules || [
    {
      id: 'capsule-1',
      title: 'Testamentary Letter to Be Opened on My Grandchildren\'s 18th Birthday',
      author: memorial.fullName,
      recipient: 'For the Family & Descendants',
      unlockDate: '2030-01-02',
      isLocked: true,
      type: 'letter',
      contentPreview: 'Reflections on maintaining integrity through life\'s trials, memories from the early piano days in Moda, and the timeless spiritual values entrusted to you...',
      sealedAt: '1998-12-15',
      notaryVerificationCode: 'ARC-NOTARY-9918274-B',
    },
    {
      id: 'capsule-2',
      title: 'Voice Message for 2050 & Guiding Wisdom for Future Generations',
      author: memorial.fullName,
      recipient: 'For Future Generations Worldwide',
      unlockDate: '2050-05-19',
      isLocked: true,
      type: 'audio_testament',
      contentPreview: 'A 12-minute private studio audio recording on peace, harmony with nature, and mutual empathy across borders.',
      sealedAt: '1995-04-23',
      notaryVerificationCode: 'ARC-NOTARY-772183-A',
    }
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newCap: TimeCapsule = {
      id: `cap-${Date.now()}`,
      title: title.trim(),
      author: 'Family Guardian',
      recipient: recipient.trim() || 'For the Whole Family',
      unlockDate: unlockDate || '2035-01-01',
      isLocked: true,
      type: capsuleType,
      contentPreview: content.substring(0, 100) + '...',
      fullContent: content,
      sealedAt: new Date().toISOString().split('T')[0],
      notaryVerificationCode: `REM-SEAL-${Math.floor(100000 + Math.random() * 900000)}`,
    };

    onAddCapsule(newCap);
    setIsAdding(false);
    setTitle('');
    setRecipient('');
    setContent('');
  };

  return (
    <section id="time-capsule" className="bg-[#FAF8F5] py-12 px-4 sm:px-6 lg:px-8 border-b-2 border-[#111111] text-[#111111]">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#111111] pb-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] mb-1">
              <Key className="w-3.5 h-3.5 text-amber-800" />
              <span>{t.sections.capsules.sectionLabel}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#111111]">{t.sections.capsules.title}</h2>
            <p className="text-xs font-serif italic text-[#555555] mt-1">{t.sections.capsules.subtitle}</p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition shrink-0 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.sections.capsules.sealNew}</span>
          </button>
        </div>

        {/* Add Form (if open) */}
        {isAdding && (
          <form onSubmit={handleSave} className="mb-8 p-6 bg-white border-2 border-[#111111] shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-[#111111]/20 pb-2">
              <h3 className="font-serif font-bold text-lg text-[#111111] flex items-center gap-2">
                <Lock className="w-4 h-4 text-amber-800" />
                <span>{t.sections.capsules.modalTitle}</span>
              </h3>
              <button type="button" onClick={() => setIsAdding(false)} className="text-xs font-mono cursor-pointer">✕</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#555555] mb-1">{t.sections.capsules.titleLabel}</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.sections.capsules.titlePlaceholder}
                  className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 font-serif"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#555555] mb-1">{t.sections.capsules.recipientLabel}</label>
                <input
                  type="text"
                  required
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder={t.sections.capsules.recipientPlaceholder}
                  className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 font-serif"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[#555555] mb-1">{t.sections.capsules.unlockLabel}</label>
                <input
                  type="date"
                  required
                  value={unlockDate}
                  onChange={(e) => setUnlockDate(e.target.value)}
                  className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-[#555555] mb-1">{t.sections.capsules.formatLabel}</label>
                <select
                  value={capsuleType}
                  onChange={(e) => setCapsuleType(e.target.value as any)}
                  className="w-full px-3 py-1.5 text-xs border border-[#111111]/30 font-mono bg-white cursor-pointer"
                >
                  <option value="letter">{t.sections.capsules.formatLetter}</option>
                  <option value="audio_testament">{t.sections.capsules.formatAudio}</option>
                  <option value="video_confession">{t.sections.capsules.formatVideo}</option>
                  <option value="document">{t.sections.capsules.formatDocument}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[#555555] mb-1">{t.sections.capsules.contentLabel}</label>
              <textarea
                rows={4}
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.sections.capsules.contentPlaceholder}
                className="w-full px-3 py-2 text-xs border border-[#111111]/30 font-serif"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[10px] font-mono text-[#777777] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>{t.sections.capsules.encryptionNote}</span>
              </span>
              <button
                type="submit"
                className="px-4 py-2 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider font-bold cursor-pointer"
              >{t.sections.capsules.seal}</button>
            </div>
          </form>
        )}

        {/* Capsules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {defaultCapsules.map((cap) => {
            const unlockYear = cap.unlockDate.split('-')[0];
            return (
              <div
                key={cap.id}
                className="p-6 bg-white border-2 border-[#111111] shadow-sm relative flex flex-col justify-between"
              >
                {/* Stamp & Lock Badge */}
                <div className="flex items-center justify-between border-b border-[#111111]/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-[#FAF8F5] border border-[#111111]">
                      <Lock className="w-4 h-4 text-amber-900" />
                    </span>
                    <div>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-[#777777] block">{t.sections.capsules.trustBadge}</span>
                      <span className="text-xs font-mono font-bold text-amber-950">
                        Scheduled Release: {cap.unlockDate} ({unlockYear})
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-mono uppercase font-bold">{t.sections.capsules.sealed}</span>
                </div>

                {/* Body */}
                <div className="space-y-3 mb-6">
                  <h4 className="font-serif-display text-xl font-bold text-[#111111] leading-snug">
                    {cap.title}
                  </h4>

                  <div className="flex items-center gap-2 text-xs font-serif text-[#666666]">
                    <span>{t.sections.capsules.recipient}<strong>{cap.recipient}</strong></span>
                    <span>&bull;</span>
                    <span>{t.sections.capsules.sealedBy}<strong>{cap.author}</strong></span>
                  </div>

                  <div className="p-3 bg-[#FAF8F5] border border-dashed border-[#111111]/30 text-xs font-serif italic text-[#444444] leading-relaxed">
                    &ldquo;{cap.contentPreview}&rdquo;
                  </div>
                </div>

                {/* Footer / Notary Verification */}
                <div className="pt-3 border-t border-[#111111]/15 flex items-center justify-between text-[10px] font-mono text-[#777777]">
                  <span>Seal Code: {cap.notaryVerificationCode}</span>
                  <span className="text-amber-900 font-bold">{t.sections.capsules.awaitingRelease}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
