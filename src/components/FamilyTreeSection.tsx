'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, FamilyNode, FamilyRelationType } from '@/types/memorial';
import { ArrowUp, ArrowDown, UserPlus } from 'lucide-react';

interface FamilyTreeSectionProps {
  language?: Language;
  memorial: MemorialProfile;
  onAddFamilyMember: (member: Omit<FamilyNode, 'id'>) => void;
  onSelectMemorialById?: (id: string) => void;
}

export const FamilyTreeSection: React.FC<FamilyTreeSectionProps> = ({
  memorial,
  onAddFamilyMember,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [relationType, setRelationType] = useState<FamilyRelationType>('child');
  const [relationLabel, setRelationLabel] = useState('Daughter');
  const [years, setYears] = useState('');
  const [notes, setNotes] = useState('');

  // Group family nodes by generation
  const parents = memorial.familyTree.filter((f) => f.relationType === 'father' || f.relationType === 'mother' || f.relationType === 'grandparent' || f.relationType === 'ancestor');
  const partnersAndSiblings = memorial.familyTree.filter((f) => f.relationType === 'spouse' || f.relationType === 'sibling');
  const children = memorial.familyTree.filter((f) => f.relationType === 'child');
  const grandchildren = memorial.familyTree.filter((f) => f.relationType === 'grandchild');

  const handleRelationTypeChange = (type: FamilyRelationType) => {
    setRelationType(type);
    switch (type) {
      case 'father': setRelationLabel('Father'); break;
      case 'mother': setRelationLabel('Mother'); break;
      case 'spouse': setRelationLabel('Spouse / Life Partner'); break;
      case 'sibling': setRelationLabel('Sibling'); break;
      case 'child': setRelationLabel('Child'); break;
      case 'grandchild': setRelationLabel('Grandchild'); break;
      case 'grandparent': setRelationLabel('Grandparent'); break;
      default: setRelationLabel('Relative');
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddFamilyMember({
      name: name.trim(),
      relationType,
      relationLabel: relationLabel.trim(),
      years: years.trim() || undefined,
      notes: notes.trim() || undefined,
    });

    setName('');
    setYears('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <section id="family" className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-[#111111] border-b border-[#111111]/20">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-[#111111] pb-3">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#666666] block mb-1">{t.sections.family.sectionLabel}</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl text-[#111111] font-bold">{t.sections.family.title}</h2>
            <p className="text-xs font-serif italic text-[#555555] mt-0.5">{t.sections.family.subtitle}</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#111111] hover:bg-[#333333] text-white text-xs font-mono uppercase tracking-wider transition self-start sm:self-auto cursor-pointer"
            id="add-family-member-btn"
          >
            <UserPlus className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.sections.family.addRecord}</span>
          </button>
        </div>

        {/* Generational Tree Canvas */}
        <div className="flex flex-col items-center space-y-6 pt-2">
          
          {/* Generation 1: Parents / Ancestors */}
          {parents.length > 0 && (
            <div className="w-full">
              <div className="text-center text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-3 flex items-center justify-center gap-1">
                <ArrowUp className="w-3 h-3 text-[#111111]" />
                <span>{t.sections.family.preceding}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {parents.map((p) => (
                  <div
                    key={p.id}
                    className="p-3.5 bg-white border border-[#111111]/20 text-center min-w-[150px] shadow-xs"
                  >
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#777777] block mb-0.5">
                      {p.relationLabel}
                    </span>
                    <h4 className="font-serif text-sm font-bold text-[#111111]">
                      {p.name}
                    </h4>
                    {p.years && (
                      <p className="text-[11px] text-[#666666] font-mono mt-0.5">
                        {p.years}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Connection Line */}
          <div className="w-px h-6 bg-[#111111]/30"></div>

          {/* Generation 2: Center Person & Partners / Siblings */}
          <div className="w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              
              {/* SIBLINGS */}
              {partnersAndSiblings.filter(s => s.relationType === 'sibling').map((sib) => (
                <div
                  key={sib.id}
                  className="p-3.5 bg-white border border-[#111111]/20 text-center min-w-[150px] shadow-xs"
                >
                  <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mb-0.5">
                    {sib.relationLabel}
                  </span>
                  <h4 className="font-serif text-sm text-[#111111] font-medium">
                    {sib.name}
                  </h4>
                  {sib.years && (
                    <p className="text-[11px] text-[#666666] font-mono mt-0.5">
                      {sib.years}
                    </p>
                  )}
                </div>
              ))}

              {/* CENTER MEMORIAL PERSON */}
              <div className="p-5 bg-[#111111] text-white text-center min-w-[220px] shadow-md relative border border-[#111111]">
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-amber-300 bg-white/10 px-2 py-0.5 inline-flex items-center gap-1.5 mb-1.5">
                  <span className="w-1.5 h-1.5 bg-amber-400"></span>{t.sections.family.anchor}</span>
                <h3 className="font-serif-display text-lg font-bold text-white mb-0.5">
                  {memorial.fullName}
                </h3>
                <p className="text-xs text-white/70 font-mono">
                  {memorial.birthDate.split(' ').pop()} — {memorial.deathDate.split(' ').pop()}
                </p>
              </div>

              {/* SPOUSE / PARTNERS */}
              {partnersAndSiblings.filter(s => s.relationType === 'spouse').map((sp) => (
                <div
                  key={sp.id}
                  className="p-3.5 bg-white border border-[#111111]/20 text-center min-w-[150px] shadow-xs"
                >
                  <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mb-0.5">
                    {sp.relationLabel}
                  </span>
                  <h4 className="font-serif text-sm text-[#111111] font-medium">
                    {sp.name}
                  </h4>
                  {sp.years && (
                    <p className="text-[11px] text-[#666666] font-mono mt-0.5">
                      {sp.years}
                    </p>
                  )}
                </div>
              ))}

            </div>
          </div>

          {/* Connection Line */}
          <div className="w-px h-6 bg-[#111111]/30"></div>

          {/* Generation 3: Children & Grandchildren */}
          {(children.length > 0 || grandchildren.length > 0) ? (
            <div className="w-full">
              <div className="text-center text-[10px] font-mono uppercase tracking-wider text-[#666666] mb-3 flex items-center justify-center gap-1">
                <ArrowDown className="w-3 h-3 text-[#111111]" />
                <span>{t.sections.family.next}</span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="p-3.5 bg-white border border-[#111111]/20 text-center min-w-[150px] shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mb-0.5">
                      {child.relationLabel}
                    </span>
                    <h4 className="font-serif text-sm text-[#111111] font-medium">
                      {child.name}
                    </h4>
                    {child.years && (
                      <p className="text-[11px] text-[#666666] font-mono mt-0.5">
                        {child.years}
                      </p>
                    )}
                  </div>
                ))}

                {grandchildren.map((gc) => (
                  <div
                    key={gc.id}
                    className="p-3.5 bg-white border border-[#111111]/20 text-center min-w-[150px] shadow-xs"
                  >
                    <span className="text-[10px] font-mono text-[#777777] uppercase tracking-wider block mb-0.5">
                      {gc.relationLabel}
                    </span>
                    <h4 className="font-serif text-sm text-[#111111] font-medium">
                      {gc.name}
                    </h4>
                    {gc.years && (
                      <p className="text-[11px] text-[#666666] font-mono mt-0.5">
                        {gc.years}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Family Tree Extension Invitation Banner */
            <div className="w-full max-w-xl mx-auto mt-4 p-4 bg-[#FAF8F5] border border-[#D5CAB7] text-center space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-[#855327] font-bold block">{t.sections.family.registryLabel}</span>
              <p className="text-xs font-serif text-[#5E574E]">
                The genealogical lineage circles for {memorial.fullName} are open for expansion by family descendants and archival trustees.
              </p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#2B2724] text-[#2B2724] hover:bg-[#2B2724] hover:text-white text-[11px] font-mono uppercase font-bold transition shadow-2xs cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>{t.sections.family.addPrompt}</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Add Family Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white text-[#111111] max-w-md w-full p-6 sm:p-8 border-2 border-[#111111] shadow-2xl">
            <h3 className="font-serif-display text-2xl text-[#111111] mb-1 font-bold">{t.sections.family.modalTitle}</h3>
            <p className="text-xs font-serif italic text-[#555555] mb-4">
              Record a kinship or generational connection to {memorial.fullName}.
            </p>

            <form onSubmit={handleSaveMember} className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.family.relationLabel}</label>
                <select
                  value={relationType}
                  onChange={(e) => handleRelationTypeChange(e.target.value as FamilyRelationType)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-mono outline-none"
                >
                  <option value="father">{t.sections.family.relations.father}</option>
                  <option value="mother">{t.sections.family.relations.mother}</option>
                  <option value="spouse">{t.sections.family.relations.spouse}</option>
                  <option value="sibling">{t.sections.family.relations.sibling}</option>
                  <option value="child">{t.sections.family.relations.child}</option>
                  <option value="grandchild">{t.sections.family.relations.grandchild}</option>
                  <option value="grandparent">{t.sections.family.relations.grandparent}</option>
                  <option value="ancestor">{t.sections.family.relations.ancestor}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.family.nameLabel}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.sections.family.namePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.family.lifespanLabel}</label>
                <input
                  type="text"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  placeholder={t.sections.family.lifespanPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.sections.family.noteLabel}</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={t.sections.family.notePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#111111]/15">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-xs font-mono text-[#555555] hover:text-[#111111] cursor-pointer"
                >{t.sections.family.cancel}</button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-mono uppercase bg-[#111111] text-white hover:bg-[#333333] transition cursor-pointer"
                >{t.sections.family.save}</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
