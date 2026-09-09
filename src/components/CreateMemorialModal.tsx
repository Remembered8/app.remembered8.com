'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile, PrivacyLevel } from '@/types/memorial';
import { Plus, Check, X, ArrowLeft, ArrowRight, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react';

interface CreateMemorialModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  onCreateMemorial: (memorial: MemorialProfile) => void;
  existingMemorials?: MemorialProfile[];
  onSelectExisting?: (memorial: MemorialProfile) => void;
}

export const CreateMemorialModal: React.FC<CreateMemorialModalProps> = ({
  isOpen,
  onClose,
  onCreateMemorial,
  existingMemorials = [],
  onSelectExisting,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Data
  const [category, setCategory] = useState<'civilian' | 'historical' | 'animal_companion'>('civilian');
  const [species, setSpecies] = useState('');
  const [breed, setBreed] = useState('');
  const [honorTitle, setHonorTitle] = useState('');

  const [fullName, setFullName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [restingPlace, setRestingPlace] = useState('');
  const [profession, setProfession] = useState('');
  const [heroImage, setHeroImage] = useState('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop');

  const [lifeQuote, setLifeQuote] = useState('');
  const [biography, setBiography] = useState('');
  const [rawNotes, setRawNotes] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  // Duplicate Check
  const matchingDuplicates = fullName.trim().length >= 3
    ? existingMemorials.filter(m => m.fullName.toLowerCase().includes(fullName.trim().toLowerCase()))
    : [];

  const [milestones, setMilestones] = useState<Array<{ year: string; title: string; description: string }>>([]);
  const [privacy, setPrivacy] = useState<PrivacyLevel>('public');
  const [adminEmail, setAdminEmail] = useState('');

  if (!isOpen) return null;

  // AI Biography & Motto Generator
  const handleGenerateAIBiography = async () => {
    if (!fullName.trim()) {
      alert('Please enter the full name first.');
      return;
    }

    setIsGeneratingAI(true);
    try {
      const res = await fetch('/api/gemini/biography', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          birthYear: birthDate,
          deathYear: deathDate,
          profession,
          hometown: birthPlace,
          memories: rawNotes,
        }),
      });

      if (!res.ok) throw new Error('AI biography generation failed');
      const data = await res.json();
      if (data.lifeQuote) setLifeQuote(data.lifeQuote);
      if (data.biography) setBiography(data.biography);
      if (data.suggestedMilestones && data.suggestedMilestones.length > 0) {
        setMilestones(data.suggestedMilestones);
      }
    } catch (err) {
      console.error(err);
      // Fallback
      if (category === 'animal_companion') {
        setLifeQuote('With unconditional devotion, silent loyalty, and joyful steps, they left an indelible pawprint upon our hearts.');
        setBiography(`${fullName} was an extraordinary companion who exemplified unconditional loyalty, courage, and pure affection. The memories shared and the bond created will remain cherished in our hearts forever.`);
      } else {
        setLifeQuote('Throughout life, they instilled compassion, integrity, and warmth in all who knew them.');
        setBiography(`${fullName} was an esteemed individual who dedicated their life to family, vocation, and community. Their enduring legacy continues to inspire loved ones and future generations.`);
      }
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmitFinal = () => {
    if (!fullName.trim()) return;

    const slug = fullName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newMemorial: MemorialProfile = {
      id: `memorial-${Date.now()}`,
      slug: slug || `memorial-${Date.now()}`,
      fullName: fullName.trim(),
      category,
      species: species.trim() || (category === 'animal_companion' ? 'Companion' : undefined),
      breed: breed.trim() || undefined,
      honorTitle: honorTitle.trim() || undefined,
      birthDate: birthDate.trim() || '1950',
      deathDate: deathDate.trim() || '2025',
      birthPlace: birthPlace.trim() || 'Unknown',
      restingPlace: restingPlace.trim() || 'Sanctuary of Rest',
      profession: profession.trim() || (category === 'animal_companion' ? 'Faithful Companion' : 'Honored Life'),
      lifeQuote: lifeQuote.trim() || (category === 'animal_companion' ? 'Remembered forever for unwavering loyalty, gentle spirit, and pure love.' : 'A beacon of hope and devotion for future generations.'),
      heroImage: heroImage.trim(),
      biography: biography.trim() || `The living archival dossier dedicated to the life and memory of ${fullName}.`,
      candleCount: 1,
      visitedTodayCount: 1,
      privacy,
      adminEmail: adminEmail.trim() || 'family@remembered.life',
      importantDates: [
        {
          id: 'date-b',
          title: t.modals.create.birthdayLabel,
          date: '01-01',
          type: 'birthday',
          formattedDate: birthDate || 'Birthday',
        },
        {
          id: 'date-a',
          title: t.modals.create.anniversaryLabel,
          date: '12-31',
          type: 'anniversary',
          formattedDate: deathDate || 'Remembrance Day',
        },
      ],
      todayActivity: [
        {
          id: 'act-init',
          actor: 'Family Custodian',
          action: 'opened the registry and lit the first memorial candle.',
          timeAgo: 'Just now',
          type: 'candle',
        },
      ],
      timelineEvents: milestones.map((m, idx) => ({
        id: `ml-${idx}`,
        year: m.year,
        title: m.title,
        category: 'milestone',
        description: m.description,
      })),
      gallery: [
        {
          id: 'g-init',
          url: heroImage,
          caption: `Archival portrait of ${fullName}.`,
          year: deathDate ? deathDate.split(' ').pop() : undefined,
        },
      ],
      audioRecordings: [],
      videos: [],
      memories: [],
      familyTree: [
        {
          id: 'f-self',
          name: fullName,
          relationType: 'spouse',
          relationLabel: 'Primary Person',
        },
      ],
    };

    onCreateMemorial(newMemorial);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-[#111111] border-2 border-[#111111] max-w-2xl w-full p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#111111] shrink-0">
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#666666]">
              {t.modals.create.stepLabel.replace('{step}', String(step))}
            </span>
            <h3 className="font-serif-display text-2xl font-bold text-[#111111]">{t.modals.create.title}</h3>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-black hover:bg-black hover:text-white px-2 py-0.5 text-xs cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="grid grid-cols-4 gap-1 py-3 border-b border-[#111111]/20 shrink-0">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1 transition-all ${
                s <= step ? 'bg-[#111111]' : 'bg-[#111111]/15'
              }`}
            />
          ))}
        </div>

        {/* Body Content by Step */}
        <div className="flex-1 overflow-y-auto py-5 pr-1 space-y-4">
          
          {/* STEP 1: Basic Information */}
          {step === 1 && (
            <div className="space-y-4">
              
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1.5 font-bold">{t.modals.create.categoryLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'civilian', label: t.modals.create.catFamily, desc: t.modals.create.catFamilyDesc },
                    { id: 'historical', label: t.modals.create.catHistoric, desc: t.modals.create.catHistoricDesc },
                    { id: 'animal_companion', label: t.modals.create.catAnimal, desc: t.modals.create.catAnimalDesc },
                  ].map((cat) => (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => {
                        setCategory(cat.id as any);
                        if (cat.id === 'animal_companion' && heroImage.includes('photo-1544005313')) {
                          setHeroImage('https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=1200&auto=format&fit=crop');
                        }
                      }}
                      className={`p-2.5 text-left border transition cursor-pointer ${
                        category === cat.id
                          ? 'border-[#111111] bg-[#111111] text-white shadow-xs'
                          : 'border-[#CCCCCC] bg-[#FAF8F5] text-[#333333] hover:border-[#888888]'
                      }`}
                    >
                      <span className="block text-xs font-mono font-bold">{cat.label}</span>
                      <span className={`block text-[10px] mt-0.5 ${category === cat.id ? 'text-gray-300' : 'text-gray-500'}`}>
                        {cat.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">
                  {category === 'animal_companion' ? 'Animal Name / Companion Name*' : 'Full Name*'}
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    category === 'animal_companion'
                      ? 'e.g. Proteo, Hachiko, Pamuk, Baron, Rex'
                      : 'e.g. Nikola Tesla, Eleanor Roosevelt, Arthur Pendelton'
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif"
                />
              </div>

              {category === 'animal_companion' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#FAF8F3] border border-[#D5C9B7]">
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#333333] mb-1">{t.modals.create.speciesLabel}</label>
                    <input
                      type="text"
                      value={species}
                      onChange={(e) => setSpecies(e.target.value)}
                      placeholder={t.modals.create.speciesPlaceholder}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#333333] mb-1">{t.modals.create.breedLabel}</label>
                    <input
                      type="text"
                      value={breed}
                      onChange={(e) => setBreed(e.target.value)}
                      placeholder={t.modals.create.breedPlaceholder}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[#333333] mb-1">{t.modals.create.honorLabel}</label>
                    <input
                      type="text"
                      value={honorTitle}
                      onChange={(e) => setHonorTitle(e.target.value)}
                      placeholder={t.modals.create.honorPlaceholder}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Duplicate Detection Alert */}
              {matchingDuplicates.length > 0 && (
                <div className="p-3 bg-amber-50 border border-amber-400 text-amber-950 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold font-mono">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>{t.modals.create.duplicateNotice}</span>
                  </div>
                  <p className="font-serif text-amber-900 leading-relaxed">{t.modals.create.duplicateBody}</p>
                  <div className="space-y-1.5 pt-1">
                    {matchingDuplicates.map((dup) => (
                      <div key={dup.id} className="flex items-center justify-between bg-white p-2 border border-amber-300">
                        <div className="font-serif">
                          <span className="font-bold text-black">{dup.fullName}</span>
                          <span className="text-[11px] font-mono text-[#666666] ml-2">({dup.birthDate} - {dup.deathDate})</span>
                        </div>
                        {onSelectExisting && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectExisting(dup);
                              onClose();
                            }}
                            className="px-2 py-1 bg-[#111111] text-white text-[10px] font-mono uppercase tracking-wider hover:bg-black cursor-pointer"
                          >{t.modals.create.viewExisting}</button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.birthLabel}</label>
                  <input
                    type="text"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    placeholder={t.modals.create.birthPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.deathLabel}</label>
                  <input
                    type="text"
                    required
                    value={deathDate}
                    onChange={(e) => setDeathDate(e.target.value)}
                    placeholder={t.modals.create.deathPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.birthplaceLabel}</label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder={t.modals.create.birthplacePlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.restingLabel}</label>
                  <input
                    type="text"
                    value={restingPlace}
                    onChange={(e) => setRestingPlace(e.target.value)}
                    placeholder={t.modals.create.restingPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">
                  {category === 'animal_companion' ? 'Mission, Role & Companionship' : 'Profession & Legacy'}
                </label>
                <input
                  type="text"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  placeholder={
                    category === 'animal_companion'
                      ? 'e.g. Search & Rescue K-9, Faithful Companion & Guardian'
                      : 'e.g. Physicist, Inventor & Electrical Engineer'
                  }
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.portraitLabel}</label>
                <input
                  type="url"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder={t.modals.create.portraitPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Life Narrative & AI Curation */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="p-3 bg-[#FAF8F5] border border-[#111111]">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-black text-xs font-mono uppercase font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.modals.create.aiLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleGenerateAIBiography}
                    disabled={isGeneratingAI}
                    className="px-3 py-1 bg-black text-white text-xs font-mono uppercase hover:bg-[#333333] transition disabled:opacity-50 cursor-pointer"
                  >
                    {isGeneratingAI ? 'Composing...' : 'Curate with AI Biographer'}
                  </button>
                </div>
                <p className="text-[11px] font-serif italic text-[#555555] mb-2">{t.modals.create.aiHint}</p>
                <textarea
                  rows={2}
                  value={rawNotes}
                  onChange={(e) => setRawNotes(e.target.value)}
                  placeholder={t.modals.create.aiSeedPlaceholder}
                  className="w-full px-3 py-2 text-xs bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.quoteLabel}</label>
                <input
                  type="text"
                  value={lifeQuote}
                  onChange={(e) => setLifeQuote(e.target.value)}
                  placeholder={t.modals.create.quotePlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] outline-none font-serif italic"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.biographyLabel}</label>
                <textarea
                  rows={6}
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder={t.modals.create.biographyPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-serif leading-relaxed outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Timeline */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-xs font-serif italic text-[#555555]">{t.modals.create.milestonesHint}</p>

              {milestones.length === 0 ? (
                <div className="p-6 text-center border border-[#111111]/20 text-[#666666] text-xs font-serif italic">{t.modals.create.noMilestones}</div>
              ) : (
                <div className="space-y-1.5">
                  {milestones.map((m, i) => (
                    <div key={i} className="p-2.5 bg-white border border-[#111111]/20 flex items-center justify-between text-xs">
                      <div>
                        <strong className="mr-2 font-mono text-black font-bold">{m.year}</strong>
                        <span className="text-[#111111] font-serif">{m.title}</span>
                      </div>
                      <button
                        onClick={() => setMilestones(milestones.filter((_, idx) => idx !== i))}
                        className="text-[#666666] hover:text-black font-mono text-xs px-1 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  const year = prompt('Year (e.g. 1974):');
                  const title = prompt('Milestone Title (e.g. Published Breakthrough Patent):');
                  if (year && title) {
                    setMilestones([...milestones, { year, title, description: `${title} took place.` }]);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#111111] hover:bg-[#FAF8F5] text-xs font-mono uppercase transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-black" />
                <span>{t.modals.create.addMilestone}</span>
              </button>
            </div>
          )}

          {/* STEP 4: Privacy and Family Guardian */}
          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1">{t.modals.create.guardianEmailLabel}</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder={t.modals.create.guardianEmailPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-mono outline-none"
                />
                <span className="text-[11px] text-[#666666] font-serif italic mt-1 block">{t.modals.create.guardianEmailHint}</span>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-2">{t.modals.create.privacyLabel}</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white border border-[#111111]/30 cursor-pointer hover:bg-[#FAF8F5] transition">
                    <input
                      type="radio"
                      name="createPrivacy"
                      checked={privacy === 'public'}
                      onChange={() => setPrivacy('public')}
                      className="accent-black"
                    />
                    <div className="text-xs">
                      <span className="font-mono uppercase font-bold text-[#111111]">{t.modals.create.privacyPublic}</span>
                      <p className="text-[#555555] font-serif mt-0.5">{t.modals.create.privacyPublicDesc}</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-white border border-[#111111]/30 cursor-pointer hover:bg-[#FAF8F5] transition">
                    <input
                      type="radio"
                      name="createPrivacy"
                      checked={privacy === 'family_only'}
                      onChange={() => setPrivacy('family_only')}
                      className="accent-black"
                    />
                    <div className="text-xs">
                      <span className="font-mono uppercase font-bold text-[#111111]">{t.modals.create.privacyPrivate}</span>
                      <p className="text-[#555555] font-serif mt-0.5">{t.modals.create.privacyPrivateDesc}</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer Controls */}
        <div className="pt-3 border-t border-[#111111]/20 flex items-center justify-between shrink-0 font-mono text-xs">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => (s - 1) as any)}
              className="flex items-center gap-1 px-3 py-1.5 border border-[#111111] hover:bg-[#FAF8F5] uppercase transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.modals.create.previous}</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 1 && !fullName.trim()) {
                  alert('Please provide the full name first.');
                  return;
                }
                setStep((s) => (s + 1) as any);
              }}
              className="flex items-center gap-1 px-4 py-1.5 bg-[#111111] text-white hover:bg-[#333333] uppercase transition cursor-pointer"
            >
              <span>{t.modals.create.next}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitFinal}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-[#111111] text-white hover:bg-[#333333] uppercase font-bold transition cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>{t.modals.create.save}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
