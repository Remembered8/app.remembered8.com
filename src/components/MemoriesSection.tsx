'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, MemoryLetter } from '@/types/memorial';
import { Feather, Wand2, Sparkles, Pin } from 'lucide-react';

interface MemoriesSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddMemory: (memory: Omit<MemoryLetter, 'id' | 'isApproved'>) => void;
}

export const MemoriesSection: React.FC<MemoriesSectionProps> = ({ memorial, onAddMemory,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [showAddModal, setShowAddModal] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [relation, setRelation] = useState('Friend');
  const [content, setContent] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [isEnhancingAI, setIsEnhancingAI] = useState(false);
  const [aiNotice, setAiNotice] = useState<string | null>(null);

  const relations = [
    'Daughter',
    'Son',
    'Spouse / Life Partner',
    'Sibling',
    'Grandchild',
    'Student / Mentee',
    'Colleague',
    'Childhood Friend',
    'Neighbor',
    'Friend & Admirer',
  ];

  const handleAIEnhance = async () => {
    if (!content.trim()) {
      return;
    }

    setIsEnhancingAI(true);
    try {
      const res = await fetch('/api/gemini/enhance-memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personName: memorial.fullName,
          relation: relation,
          rawMemory: content,
        }),
      });

      if (!res.ok) throw new Error('AI memory polish error');
      const data = await res.json();
      if (data.enhancedText) {
        setContent(data.enhancedText);
        setAiNotice('Your reflection has been refined with literary grace and emotional clarity.');
        setTimeout(() => setAiNotice(null), 6000);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsEnhancingAI(false);
    }
  };

  const handleSaveMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !content.trim()) return;

    onAddMemory({
      authorName: authorName.trim(),
      relation: relation.trim(),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
      content: content.trim(),
      photoUrl: photoUrl.trim() || undefined,
      isHighlighted: false,
    });

    setAuthorName('');
    setContent('');
    setPhotoUrl('');
    setShowAddModal(false);
  };

  return (
    <section id="memories" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">{t.sections.memories.sectionLabel}</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">{t.sections.memories.title}</h2>
            <p className="text-xs font-serif italic text-[#555555] mt-0.5">{t.sections.memories.subtitle}</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition self-start sm:self-auto cursor-pointer"
            id="write-memory-letter-btn"
          >
            <Feather className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.sections.memories.writeTribute}</span>
          </button>
        </div>

        {/* Stream of Letters */}
        <div className="space-y-6">
          {memorial.memories.map((memory) => (
            <article
              key={memory.id}
              className="p-6 sm:p-8 bg-white border border-[#111111]/20 hover:border-[#111111] shadow-xs relative transition-all"
            >
              {/* Pinned Marker */}
              {memory.pinned && (
                <div className="absolute top-4 right-4 flex items-center gap-1 text-[10px] font-mono border border-[#111111] px-2 py-0.5 bg-[#111111] text-white uppercase tracking-wider">
                  <Pin className="w-2.5 h-2.5 fill-current rotate-45" />
                  <span>{t.sections.memories.featured}</span>
                </div>
              )}

              {/* Letter Content */}
              <div className="relative mb-4">
                <p className="font-serif text-base sm:text-lg text-[#222222] leading-relaxed italic">
                  &ldquo;{memory.content}&rdquo;
                </p>
              </div>

              {/* Photo Attachment if present */}
              {memory.photoUrl && (
                <div className="my-4 max-w-sm border border-[#111111]/20 overflow-hidden">
                  <img
                    src={memory.photoUrl}
                    alt="Memory artifact"
                    className="w-full h-44 object-cover archival-bw"
                  />
                </div>
              )}

              {/* Author Signature */}
              <div className="flex items-center justify-between pt-4 border-t border-[#111111]/15 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-sm text-[#111111]">
                    {memory.authorName}
                  </span>
                  <span className="font-mono text-[#666666] text-xs">
                    &bull; {memory.relation}
                  </span>
                </div>

                <time className="text-[#666666] font-mono text-xs">
                  {memory.date}
                </time>
              </div>

            </article>
          ))}
        </div>

      </div>

      {/* Write Memory Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#111111] max-w-xl w-full p-6 sm:p-8 border-2 border-[#111111] shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#111111]">
              <div className="flex items-center gap-2">
                <Feather className="w-5 h-5 text-[#111111]" />
                <h3 className="font-serif-display text-2xl font-bold text-[#111111]">
                  Leave a Tribute for {memorial.fullName}
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs cursor-pointer"
              >
                ✕
              </button>
            </div>

            <p className="text-xs font-serif italic text-[#555555] mb-4">{t.sections.memories.prompt}</p>

            {aiNotice && (
              <div className="mb-4 p-3 bg-[#FAF8F5] border border-[#111111]/30 text-xs font-serif flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-black shrink-0" />
                <span>{aiNotice}</span>
              </div>
            )}

            <form onSubmit={handleSaveMemory} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.memories.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={t.sections.memories.namePlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.memories.relationLabel}</label>
                  <select
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                  >
                    {relations.map((rel) => (
                      <option key={rel} value={rel}>{rel}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-[#333333]">{t.sections.memories.bodyLabel}</label>
                  <button
                    type="button"
                    onClick={handleAIEnhance}
                    disabled={isEnhancingAI}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-black hover:underline disabled:opacity-50 cursor-pointer"
                    title={t.sections.memories.polishTitle}
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>{isEnhancingAI ? 'Refining...' : 'Refine with AI'}</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={5}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={t.sections.memories.bodyPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.memories.photoLabel}</label>
                <input
                  type="url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  placeholder={t.sections.memories.photoPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono text-xs"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#555555] hover:text-[#111111] cursor-pointer"
                >{t.sections.memories.cancel}</button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono uppercase bg-[#111111] text-white hover:bg-[#333333] transition cursor-pointer"
                >{t.sections.memories.publish}</button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
