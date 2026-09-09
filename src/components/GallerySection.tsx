'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, ArchivalItem } from '@/types/memorial';
import { FileText, X, Plus, MapPin, ZoomIn, Wand2 } from 'lucide-react';

interface GallerySectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddArchivalItem: (item: Omit<ArchivalItem, 'id'>) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ memorial, onAddArchivalItem,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [filter, setFilter] = useState<'all' | 'photos' | 'documents'>('all');
  const [activeItem, setActiveItem] = useState<ArchivalItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form states for new archival item
  const [newUrl, setNewUrl] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newYear, setNewYear] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [isDocument, setIsDocument] = useState(false);
  const [isAnalyzingAI, setIsAnalyzingAI] = useState(false);

  const filteredItems = memorial.gallery.filter((item) => {
    if (filter === 'photos') return !item.isDocument;
    if (filter === 'documents') return item.isDocument;
    return true;
  });

  const handleAISuggestCaption = async () => {
    if (!newCaption.trim() && !newYear.trim()) {
      return;
    }

    setIsAnalyzingAI(true);
    try {
      const res = await fetch('/api/gemini/analyze-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          personName: memorial.fullName,
          approximateYear: newYear,
          promptContext: newCaption,
        }),
      });

      if (!res.ok) throw new Error('AI analysis error');
      const data = await res.json();
      if (data.caption) {
        setNewCaption(data.caption + (data.historicalContext ? ` — ${data.historicalContext}` : ''));
      }
    } catch {
      setNewCaption(`Rare historical record from the ${newYear || 'vintage'} family archive of ${memorial.fullName}.`);
    } finally {
      setIsAnalyzingAI(false);
    }
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUrl.trim() || !newCaption.trim()) return;

    onAddArchivalItem({
      url: newUrl.trim(),
      caption: newCaption.trim(),
      year: newYear.trim() || undefined,
      location: newLocation.trim() || undefined,
      isDocument,
    });

    setNewUrl('');
    setNewCaption('');
    setNewYear('');
    setNewLocation('');
    setIsDocument(false);
    setShowAddModal(false);
  };

  return (
    <section id="gallery" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-6">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">{t.sections.gallery.sectionLabel}</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">{t.sections.gallery.title}</h2>
            <p className="text-xs font-serif italic text-[#555555] mt-0.5">{t.sections.gallery.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {/* Filter Pills */}
            <div className="flex items-center gap-1 text-xs font-mono">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 uppercase tracking-wider transition border cursor-pointer ${filter === 'all' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#555555] hover:text-[#111111] border-[#111111]/20'}`}
              >
                All ({memorial.gallery.length})
              </button>
              <button
                onClick={() => setFilter('photos')}
                className={`px-3 py-1 uppercase tracking-wider transition border cursor-pointer ${filter === 'photos' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#555555] hover:text-[#111111] border-[#111111]/20'}`}
              >{t.sections.gallery.tabPhotos}</button>
              <button
                onClick={() => setFilter('documents')}
                className={`px-3 py-1 uppercase tracking-wider transition border cursor-pointer ${filter === 'documents' ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#555555] hover:text-[#111111] border-[#111111]/20'}`}
              >{t.sections.gallery.tabDocuments}</button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition cursor-pointer"
              id="add-photo-btn"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{t.sections.gallery.addRecord}</span>
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer flex flex-col bg-white border border-[#111111]/20 hover:border-[#111111] p-3 transition shadow-xs"
            >
              {/* Image Box */}
              <div className="relative aspect-[4/3] w-full bg-[#EAEAE6] overflow-hidden border border-[#111111]/15">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-full object-cover object-[center_25%] archival-bw group-hover:scale-102 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Year/Doc Tag */}
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  {item.year && (
                    <span className="px-2 py-0.5 bg-black/85 text-white text-[10px] font-mono">
                      {item.year}
                    </span>
                  )}
                  {item.isDocument && (
                    <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono border border-black flex items-center gap-1 shadow-2xs">
                      <FileText className="w-2.5 h-2.5 text-[#111111]" />
                      <span>{t.sections.gallery.documentShort}</span>
                    </span>
                  )}
                </div>

                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white text-black shadow-md">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Caption */}
              <div className="p-2 space-y-1">
                <p className="font-serif text-sm text-[#222222] line-clamp-2 leading-snug">
                  {item.caption}
                </p>
                {item.location && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[#777777]">
                    <MapPin className="w-3 h-3 text-[#111111]" />
                    {item.location}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full bg-white text-[#111111] border-2 border-[#111111] overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-3 right-3 z-20 p-1.5 bg-white text-black border border-black hover:bg-black hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Preview */}
            <div className="flex-1 bg-[#F5F5F2] flex items-center justify-center p-4 overflow-hidden border-b md:border-b-0 md:border-r border-[#111111]">
              <img
                src={activeItem.url}
                alt={activeItem.caption}
                className="max-h-[70vh] w-auto object-contain archival-bw border border-[#111111]/20 shadow"
              />
            </div>

            {/* Details Sidebar */}
            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-white text-[#111111]">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {activeItem.year && (
                    <span className="px-2 py-0.5 bg-black text-white text-xs font-mono">
                      {activeItem.year}
                    </span>
                  )}
                  {activeItem.isDocument && (
                    <span className="text-xs font-mono border border-black px-2 py-0.5 text-black flex items-center gap-1">
                      <FileText className="w-3 h-3" />{t.sections.gallery.documentBadge}</span>
                  )}
                </div>

                <h3 className="font-serif text-lg font-bold text-[#111111] leading-snug mb-3">
                  {activeItem.caption}
                </h3>

                {activeItem.location && (
                  <p className="text-xs font-mono text-[#666666] flex items-center gap-1.5 mb-6">
                    <MapPin className="w-3.5 h-3.5 text-black" />
                    <span>{activeItem.location}</span>
                  </p>
                )}

                <div className="p-3 bg-[#FAF8F5] border border-[#111111]/15 text-xs font-serif text-[#444444] space-y-1">
                  <div className="font-mono uppercase font-bold text-[10px] text-[#111111]">{t.sections.gallery.verification}</div>
                  <p className="italic">
                    This visual asset is preserved in the {memorial.fullName} Living Memorial Archive under official preservation standards.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#111111]/20 flex items-center justify-between text-xs font-mono text-[#666666]">
                <span>Archive: #{memorial.slug}</span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-3 py-1 bg-black text-white text-xs hover:bg-[#333333] transition cursor-pointer"
                >{t.sections.gallery.close}</button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* Add Archival Photo Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#111111] max-w-lg w-full p-6 sm:p-8 border-2 border-[#111111] shadow-2xl">
            <div className="border-b border-[#111111] pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase text-[#777777]">{t.sections.gallery.intake}</span>
              <h3 className="font-serif-display text-2xl font-bold text-[#111111]">{t.sections.gallery.modalTitle}</h3>
            </div>

            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.gallery.urlLabel}</label>
                <input
                  type="url"
                  required
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder={t.sections.gallery.urlPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.gallery.yearLabel}</label>
                  <input
                    type="text"
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder={t.sections.gallery.yearPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.gallery.locationLabel}</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder={t.sections.gallery.locationPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-mono uppercase text-[#333333]">{t.sections.gallery.captionLabel}</label>
                  <button
                    type="button"
                    onClick={handleAISuggestCaption}
                    disabled={isAnalyzingAI}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-black hover:underline disabled:opacity-50 cursor-pointer"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>{isAnalyzingAI ? 'Analyzing...' : 'Suggest Caption'}</span>
                  </button>
                </div>
                <textarea
                  required
                  rows={3}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder={t.sections.gallery.captionPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isDocumentCheckbox"
                  checked={isDocument}
                  onChange={(e) => setIsDocument(e.target.checked)}
                  className="accent-black"
                />
                <label htmlFor="isDocumentCheckbox" className="text-xs font-serif text-[#333333] cursor-pointer">{t.sections.gallery.isDocument}</label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#555555] hover:text-[#111111] cursor-pointer"
                >{t.sections.gallery.cancel}</button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono uppercase bg-[#111111] text-white hover:bg-[#333333] transition cursor-pointer"
                >{t.sections.gallery.commit}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
