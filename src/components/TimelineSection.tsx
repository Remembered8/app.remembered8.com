'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, TimelineMilestone, MilestoneCategory } from '@/types/memorial';
import { Plus, MapPin } from 'lucide-react';

interface TimelineSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddMilestone: (milestone: Omit<TimelineMilestone, 'id'>) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ memorial, onAddMilestone,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newYear, setNewYear] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MilestoneCategory>('life');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const categories = [
    { id: 'all', label: 'All Eras' },
    { id: 'life', label: 'Life & Turning Points' },
    { id: 'career', label: 'Vocation & Academia' },
    { id: 'family', label: 'Lineage & Kinship' },
    { id: 'creation', label: 'Works & Milestones' },
  ];

  const filteredEvents = memorial.timelineEvents.filter((ev) => {
    if (selectedCategory === 'all') return true;
    return ev.category === selectedCategory;
  });

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newYear.trim() || !newTitle.trim() || !newDescription.trim()) return;

    onAddMilestone({
      year: newYear.trim(),
      title: newTitle.trim(),
      category: newCategory,
      description: newDescription.trim(),
      location: newLocation.trim() || undefined,
    });

    setNewYear('');
    setNewTitle('');
    setNewDescription('');
    setNewLocation('');
    setShowAddModal(false);
  };

  return (
    <section id="timeline" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-6">
        
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">{t.sections.timeline.sectionLabel}</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">{t.sections.timeline.title}</h2>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition self-start sm:self-auto cursor-pointer"
            id="add-timeline-milestone-btn"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>{t.sections.timeline.recordMilestone}</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-mono uppercase tracking-wider transition border cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#555555] hover:text-[#111111] border-[#111111]/20'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Chronological Archival Stream */}
        <div className="space-y-4 pt-2">
          {filteredEvents.map((milestone) => (
            <div
              key={milestone.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 bg-white border border-[#111111]/20 hover:border-[#111111] transition shadow-xs"
            >
              {/* Year & Category Badge */}
              <div className="md:col-span-3 flex md:flex-col justify-between md:justify-start items-start gap-2 border-b md:border-b-0 md:border-r border-[#111111]/15 pb-2 md:pb-0 md:pr-4">
                <span className="font-serif-display text-3xl font-bold text-[#111111]">
                  {milestone.year}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider bg-[#FAF8F5] border border-[#111111]/20 px-2 py-0.5 text-[#555555]">
                  {milestone.category}
                </span>
              </div>

              {/* Event Content */}
              <div className="md:col-span-9 space-y-1.5">
                <h3 className="text-base sm:text-lg font-serif font-bold text-[#111111]">
                  {milestone.title}
                </h3>
                <p className="text-xs sm:text-sm font-serif text-[#444444] leading-relaxed">
                  {milestone.description}
                </p>

                {(milestone.location || milestone.date) && (
                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[#777777] pt-2 border-t border-[#111111]/10">
                    {milestone.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#111111]" />
                        {milestone.location}
                      </span>
                    )}
                    {milestone.date && (
                      <span>Date: {milestone.date}</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Add Milestone Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFFFF] text-[#111111] max-w-lg w-full p-6 sm:p-8 border-2 border-[#111111] shadow-2xl">
            <div className="border-b border-[#111111] pb-3 mb-4">
              <span className="text-[10px] font-mono uppercase text-[#777777]">{t.sections.timeline.archiveRecord}</span>
              <h3 className="font-serif-display text-xl font-bold">{t.sections.timeline.recordModalTitle}</h3>
            </div>
            
            <form onSubmit={handleSaveMilestone} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.timeline.yearLabel}</label>
                  <input
                    type="text"
                    required
                    value={newYear}
                    onChange={(e) => setNewYear(e.target.value)}
                    placeholder="1984"
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.timeline.categoryLabel}</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MilestoneCategory)}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                  >
                    <option value="life">{t.sections.timeline.categories.life}</option>
                    <option value="career">{t.sections.timeline.categories.career}</option>
                    <option value="family">{t.sections.timeline.categories.family}</option>
                    <option value="creation">{t.sections.timeline.categories.creation}</option>
                    <option value="travel">{t.sections.timeline.categories.travel}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.timeline.titleLabel}</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder={t.sections.timeline.titlePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.timeline.locationLabel}</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  placeholder={t.sections.timeline.locationPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.timeline.descriptionLabel}</label>
                <textarea
                  required
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder={t.sections.timeline.descriptionPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#555555] hover:text-[#111111] cursor-pointer"
                >{t.sections.timeline.cancel}</button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono uppercase bg-[#111111] text-white hover:bg-[#333333] transition cursor-pointer"
                >{t.sections.timeline.commit}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
