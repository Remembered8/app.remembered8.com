'use client';

import React, { useState } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { 
  X, Copy, Check, Sparkles, Code2, Database, Layout, Heart, 
  Flame, Award, ArrowRight, PlusCircle, CheckCircle2, QrCode,
  Share2, Camera, Calendar, User, Compass, ExternalLink
} from 'lucide-react';

interface PetsDeveloperSpecModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  onEnshrinePet?: (pet: MemorialProfile) => void;
  onViewCreatedPet?: (petId: string) => void;
  onSelectCreatedPet?: (petName: string) => void;
}

interface PetEntry {
  id: string;
  name: string;
  species: string;
  speciesIcon: string;
  breed: string;
  honorTitle: string;
  years: string;
  story: string;
  photoUrl: string;
  candleCount: number;
}

const SAMPLE_PET_AVATARS = [
  { key: 'photoDog', icon: '🐕', url: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600' },
  { key: 'photoTabby', icon: '🐈', url: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=600' },
  { key: 'photoShepherd', icon: '🦮', url: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&q=80&w=600' },
  { key: 'photoBlackCat', icon: '🐈‍⬛', url: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&q=80&w=600' },
  { key: 'photoDove', icon: '🕊️', url: 'https://images.unsplash.com/photo-1522858547137-f1dcec554f55?auto=format&fit=crop&q=80&w=600' },
  { key: 'photoHorse', icon: '🐎', url: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&q=80&w=600' },
] as const;

export const PetsDeveloperSpecModal: React.FC<PetsDeveloperSpecModalProps> = ({
  isOpen,
  onClose,
  onEnshrinePet,
  onViewCreatedPet,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [mainView, setMainView] = useState<'create' | 'spec'>('create');
  const [copied, setCopied] = useState(false);
  const [specTab, setSpecTab] = useState<'overview' | 'routes' | 'schema' | 'heroes'>('overview');

  // Form states for creating a pet
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [honorTitle, setHonorTitle] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [deathDate, setDeathDate] = useState('');
  const [story, setStory] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string>(SAMPLE_PET_AVATARS[0].url);
  const [submittedPet, setSubmittedPet] = useState<PetEntry | null>(null);

  if (!isOpen) return null;

  const handleCreatePet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petName.trim()) return;

    const petId = 'pet-' + petName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Date.now();
    const cleanPhoto = photoUrl.trim() || SAMPLE_PET_AVATARS[0].url;

    const newPet: PetEntry = {
      id: petId,
      name: petName.trim(),
      species,
      speciesIcon: species === 'Dog' ? '🐕' : species === 'Cat' ? '🐈' : species === 'Bird' ? '🕊️' : species === 'Horse' ? '🐎' : '🐾',
      breed: breed.trim() || 'Faithful Companion',
      honorTitle: honorTitle.trim() || 'Beloved Family Guardian',
      years: `${birthYear || '—'} – ${deathDate || 'Forever Remembered'}`,
      story: story.trim() || 'A cherished soul who brought warmth, unwavering loyalty, and everlasting joy to our lives.',
      photoUrl: cleanPhoto,
      candleCount: 1,
    };

    setSubmittedPet(newPet);

    // Also persist into real MemorialProfile if handler provided
    if (onEnshrinePet) {
      const fullMemorial: MemorialProfile = {
        id: petId,
        slug: petId,
        fullName: petName.trim(),
        category: 'animal_companion',
        species,
        breed: breed.trim() || 'Faithful Companion',
        honorTitle: honorTitle.trim() || 'Beloved Family Guardian',
        birthDate: birthYear.trim() || '2016',
        deathDate: deathDate.trim() || '2025',
        birthPlace: 'Earth Sanctuary',
        restingPlace: 'Rainbow Bridge Meadow',
        profession: `${species} Companion & Family Guardian`,
        lifeQuote: story.trim() || 'Their devotion echoes forever across the Rainbow Bridge.',
        heroImage: cleanPhoto,
        biography: `${petName.trim()} was a deeply treasured ${species.toLowerCase()} (${breed.trim() || 'faithful companion'}).\n\n${story.trim() || 'They brought endless loyalty, pure friendship, and boundless joy to our family hearth. Their paws walked beside us, and their spirit rests eternally in light.'}`,
        candleCount: 1,
        visitedTodayCount: 1,
        privacy: 'public',
        adminEmail: 'guardian@pets.remembered.8',
        importantDates: [
          {
            id: `date-${Date.now()}-1`,
            title: 'Family Day / Adoption Celebration',
            date: '04-12',
            type: 'birthday',
            formattedDate: 'April 12'
          },
          {
            id: `date-${Date.now()}-2`,
            title: 'Rainbow Bridge Vigil',
            date: '10-04',
            type: 'anniversary',
            formattedDate: 'October 4'
          }
        ],
        todayActivity: [
          {
            id: `act-${Date.now()}`,
            actor: 'Family Guardian',
            action: 'enshrined their beloved companion in the eternal sanctuary',
            timeAgo: 'Just now',
            type: 'memory'
          }
        ],
        timelineEvents: [
          {
            id: `t-${Date.now()}-1`,
            year: parseInt(birthYear) || 2016,
            date: birthYear || 'Adoption Day',
            title: 'Joined the Family Hearth',
            description: 'Began an unforgettable journey of unconditional devotion, walks, and loving companionship.',
            category: 'life'
          },
          {
            id: `t-${Date.now()}-2`,
            year: parseInt(deathDate) || 2025,
            date: deathDate || 'Rainbow Bridge',
            title: 'Crossed the Rainbow Bridge',
            description: 'Their physical journey ended, but their memory is preserved eternally in the Sanctuary.',
            category: 'milestone'
          }
        ],
        gallery: [
          {
            id: `photo-${Date.now()}`,
            url: cleanPhoto,
            caption: `${petName.trim()} &mdash; Cherished Companion Portrait`,
            year: deathDate || 'Eternal',
            isDocument: false
          }
        ],
        audioRecordings: [],
        videos: [],
        memories: [
          {
            id: `mem-${Date.now()}`,
            authorName: 'Loving Guardian',
            relation: 'Family Member',
            date: 'Today',
            content: story.trim() || 'Thank you for every joyful tail wag, every warm purr, and your steadfast loyalty. Run free across the meadow.',
            isApproved: true,
            isHighlighted: true
          }
        ],
        familyTree: [],
        timeCapsules: [],
        treeDonations: []
      };

      onEnshrinePet(fullMemorial);
    }
  };

  const handleResetForm = () => {
    setSubmittedPet(null);
    setPetName('');
    setBreed('');
    setHonorTitle('');
    setBirthYear('');
    setDeathDate('');
    setStory('');
  };

  const fullSpecMarkdown = `# PETS.REMEMBERED.8 — TECHNICAL & ARCHITECTURAL SPECIFICATION
Version: 1.0.0
Target Domain: pets.remembered.8 (Sister Pavilion to Remembered)
Purpose: Dedicated Digital Memorial Sanctuary for Faithful Companions & Animal Heroes

--------------------------------------------------
1. SYSTEM OVERVIEW & ARCHITECTURAL PHILOSOPHY
--------------------------------------------------
- Sister portal to the primary 'Remembered' historical human archive.
- Aesthetic Tone: Warm, empathetic, dignified, and everlasting. 
  Deep emerald forest (#0E1A13) meets warm honey-amber (#E5A93C) and organic oat-ivory (#FAF7F2).
- Key Focus:
  1) Animal Heroes (Search & Rescue K-9s, War Pigeons, Sled Champions, Space Pioneers)
  2) Family Companion Memorials (Dogs, Cats, Horses, Birds, Rabbits, Rescued Souls)
  3) Rainbow Bridge Eternal Meadow (Virtual candle vigils & tribute flowers)
  4) Granite/Wood QR Memorial Plaques for resting places & collars.

--------------------------------------------------
2. ROUTE HIERARCHY & SITEMAP
--------------------------------------------------
- / (Sanctuary Homepage)
  * Masthead with live counter of enshrined souls & illuminated candles.
  * Curated heroic dossiers (e.g. Proteo, Hachiko, Balto, Laika).
  * Filterable Registry: [All, Search & Rescue K-9, Eternal Devotion, Arctic Sled, Veterans, Feline Mascots].
  * "Enshrine a Beloved Companion" primary call-to-action wizard.
  * Link back to human archive: remembered.8

- /companion/:id (Memorial Dossier)
  * Hero Portrait with species badge, breed, lifespan & resting sanctuary.
  * Pawprint Vigil (Illuminating a candle / leaving a tribute).
  * Story of Devotion & Heroism (Multi-chapter biography).
  * Pawprint Media Gallery (High-res archival photos, video clips).
  * Sound Archive (Bark, purr, mission audio or owner voice recordings).
  * Pack & Lineage Tree (Handler, pack mates, mother, offspring).
  * Visitor Tribute Ledger (Condolence letters, virtual meadow clover & wreaths).

- /enshrine (Companion Creation Wizard)
  * Step 1: Identity (Name, Species, Breed, Lifespan, Honor Title/Nickname).
  * Step 2: Portrait & Archival Media Upload.
  * Step 3: Story, Favorite Habits & Memories.
  * Step 4: Resting Meadow / Rainbow Bridge Dedication.
  * Step 5: Granite QR Plaque generation.

- /heroes (Hall of Valor)
  * Filter for service animals (Disaster Response K-9s, Guide Dogs, Military Animals).

--------------------------------------------------
3. DATABASE SCHEMA (FIRESTORE / POSTGRESQL)
--------------------------------------------------
Collection: 'pet_memorials'
{
  id: string;                      // slug, e.g. 'proteo-k9'
  fullName: string;                // e.g. 'Proteo'
  species: 'dog' | 'cat' | 'horse' | 'bird' | 'bear' | 'other';
  breed?: string;                  // e.g. 'German Shepherd'
  honorTitle?: string;             // e.g. 'Hero of the 2023 Kahramanmaraş Earthquake'
  birthDate: string;               // e.g. '2013'
  deathDate: string;               // e.g. 'February 10, 2023'
  restingPlace?: string;           // e.g. 'Mexico Military Cemetery & Adiyaman Memorial'
  heroImage: string;               // High-res photo URL
  lifeQuote?: string;              // Epigraph or tribute quote
  biography: string;               // Full narrative
  candleCount: number;             // Digital vigil tally
  serviceType?: 'search_and_rescue' | 'service_dog' | 'historical_pioneer' | 'beloved_companion';
  familyPack?: [                   // Companion lineage
    { id: string; name: string; relation: 'handler' | 'pack_mate' | 'child' | 'mother' }
  ];
  gallery: string[];               // Image URLs
  soundArchive?: [
    { title: string; audioUrl: string; duration: string }
  ];
  tributes: [
    { id: string; author: string; flower: string; message: string; timestamp: number }
  ];
  qrPlaqueCode: string;            // Direct stone plaque link
  createdAt: timestamp;
  updatedAt: timestamp;
}

--------------------------------------------------
4. CURATED HEROIC ANIMAL REGISTRY (15 PRE-SEEDED RECORDS)
--------------------------------------------------
1. Proteo (2013-2023) - Mexican Army Search & Rescue K-9, saved lives in 2023 Türkiye earthquake.
2. Hachiko (1923-1935) - Japanese Akita who waited 9 years at Shibuya Station.
3. Balto & Togo (1925) - Siberian Huskies leading the 1925 Great Serum Run to Nome, Alaska.
4. Laika (1954-1957) - Cosmic Pioneer, first living creature to orbit the Earth in Sputnik 2.
5. Fido (1941-1958) - Italian mixed-breed dog who waited 14 years at the bus stop for his fallen owner.
6. Greyfriars Bobby (1856-1872) - Skye Terrier in Edinburgh who guarded his owner's grave for 14 years.
7. Cher Ami (1918) - WWI War Carrier Pigeon awarded the French Croix de Guerre for saving 194 soldiers.
8. Smoky (1943-1957) - Yorkshire Terrier WWI combat hero and first recorded therapy dog.
9. Wojtek (1942-1963) - Syrian Brown Bear enlisted as a corporal in the Polish II Corps.
10. Diesel (2008-2015) - French National Police assault dog who gave her life in the Saint-Denis raid.
11. Sergeant Stubby (1916-1926) - Most decorated American war dog of WWI.
12. Simon (1947-1949) - Royal Navy cat awarded the Dickin Medal on HMS Amethyst.
13. Barry der Menschenretter (1800-1814) - Great St. Bernard rescue dog who saved over 40 alpine lives.
14. Judy (1936-1950) - English Pointer who survived Japanese POW camps and protected fellow prisoners.
15. Endal (1995-2009) - Golden Retriever service dog, capable of operating ATMs and chip cards for his paralyzed veteran owner.
`;

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullSpecMarkdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div data-modal="overlay" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div data-modal="panel" className="bg-[#FAF8F5] border-2 border-[#1E1B18] w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden font-serif">
        
        {/* Modal Top Masthead */}
        <div className="bg-[#0E1A13] text-[#FAF8F5] p-4 sm:p-5 border-b-2 border-[#1E1B18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl sm:text-3xl p-2 bg-[#172B1E] border border-[#2E583F] rounded-md">
              🐾
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] bg-[#D97706] text-[#0E1712] px-2 py-0.5 font-bold">{t.modals.petsSpec.gateway}</span>
                <span className="text-xs font-mono text-[#FDE68A] font-semibold">pets.remembered.8</span>
              </div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-white mt-0.5">{t.modals.petsSpec.pavilion}</h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-white/10 rounded-sm text-white/70 hover:text-white transition cursor-pointer"
              title={t.modals.petsSpec.close}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Primary Navigation Switches: Enshrine vs Developer Spec */}
        <div className="bg-[#F0EBE0] border-b border-[#D8CEBA] px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMainView('create')}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer rounded-xs ${
                mainView === 'create'
                  ? 'bg-[#142C1D] text-[#86EFAC] border border-[#244A32] shadow-xs'
                  : 'bg-white/70 text-[#554D40] hover:text-[#111111] hover:bg-white'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{t.modals.petsSpec.enshrineTab}</span>
            </button>

            <button
              onClick={() => setMainView('spec')}
              className={`px-3.5 py-1.5 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer rounded-xs ${
                mainView === 'spec'
                  ? 'bg-[#142C1D] text-[#86EFAC] border border-[#244A32] shadow-xs'
                  : 'bg-white/70 text-[#554D40] hover:text-[#111111] hover:bg-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-[#E5A93C]" />
              <span>{t.modals.petsSpec.specTab}</span>
            </button>
          </div>

          {mainView === 'spec' && (
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-[#D97706] hover:bg-[#F59E0B] text-[#0E1712] text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 transition cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#0E1712]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Spec Copied!' : 'Copy Architecture Spec'}</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">

          {/* VIEW 1: ENSHRINE A BELOVED PET FORM */}
          {mainView === 'create' && (
            <div>
              {submittedPet ? (
                /* Success Enshrinement Plaque */
                <div className="max-w-xl mx-auto bg-[#112017] border-2 border-[#D97706] text-[#FAF8F5] p-6 sm:p-8 shadow-2xl rounded-xs relative overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />
                  
                  <div className="text-center space-y-3 mb-6 relative z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D97706] text-[#0E1712] text-[10px] font-mono uppercase tracking-widest font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />{t.modals.petsSpec.enshrined}</span>
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FDE68A]">
                      Eternal Memorial for {submittedPet.name} {submittedPet.speciesIcon}
                    </h3>
                    <p className="font-serif italic text-xs text-[#C5BBA4]">{t.modals.petsSpec.rainbowQuote}</p>
                  </div>

                  {/* Memorial Card */}
                  <div className="border border-[#284E36] bg-[#162D20] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 relative z-10 shadow-inner">
                    <img
                      src={submittedPet.photoUrl}
                      alt={submittedPet.name}
                      referrerPolicy="no-referrer"
                      className="w-28 h-28 sm:w-32 sm:h-32 object-cover border-2 border-[#D97706] shadow-md shrink-0"
                    />
                    <div className="space-y-1.5 text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <span className="text-xs font-mono uppercase bg-[#102318] text-[#86EFAC] px-2 py-0.5 border border-[#285038] font-bold">
                          {submittedPet.species} • {submittedPet.breed}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-xl text-[#FAF8F5]">
                        {submittedPet.name}
                      </h4>
                      <p className="text-xs font-mono text-[#FDE68A]">
                        {submittedPet.honorTitle}
                      </p>
                      <p className="text-[11px] font-mono text-[#8AA895]">
                        {submittedPet.years}
                      </p>
                      <p className="text-xs font-serif text-[#D4CDBC] italic line-clamp-3 pt-1">
                        &ldquo;{submittedPet.story}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Action row */}
                  <div className="mt-6 pt-4 border-t border-[#23442F] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono relative z-10">
                    <div className="flex items-center gap-2 text-[#86EFAC]">
                      <QrCode className="w-4 h-4 text-[#FDE68A]" />
                      <span>{t.modals.petsSpec.plaqueLinked}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {onViewCreatedPet && (
                        <button
                          onClick={() => {
                            onViewCreatedPet(submittedPet.id);
                            onClose();
                          }}
                          className="px-4 py-2 bg-[#86EFAC] hover:bg-[#A7F3D0] text-[#0A180F] font-bold uppercase transition cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <span>{t.modals.petsSpec.openDossier}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        onClick={handleResetForm}
                        className="px-4 py-2 bg-[#D97706] hover:bg-[#F59E0B] text-[#0E1712] font-bold uppercase transition cursor-pointer"
                      >{t.modals.petsSpec.enshrineAnother}</button>
                    </div>
                  </div>
                </div>
              ) : (
                /* The Enshrinement Form */
                <form onSubmit={handleCreatePet} className="max-w-2xl mx-auto space-y-5">
                  <div className="border-b border-[#D8CEBA] pb-3 text-center sm:text-left">
                    <div className="flex items-center gap-2 justify-center sm:justify-start mb-1">
                      <span className="text-[10px] font-mono uppercase tracking-[0.25em] bg-[#142C1D] text-[#86EFAC] px-2 py-0.5 font-bold">{t.modals.petsSpec.registrationBadge}</span>
                      <span className="text-xs font-mono text-[#8A7E6B]">{t.modals.petsSpec.registryLabel}</span>
                    </div>
                    <h3 className="font-serif-display text-2xl font-bold text-[#1E1B18]">{t.modals.petsSpec.formTitle}</h3>
                    <p className="text-xs font-serif text-[#635A4D] mt-0.5">{t.modals.petsSpec.formIntro}</p>
                  </div>

                  {/* Quick Photo Selector */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold">{t.modals.petsSpec.photoStep}</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-2">
                      {SAMPLE_PET_AVATARS.map((av, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setPhotoUrl(av.url)}
                          className={`border p-1 text-center transition cursor-pointer group ${
                            photoUrl === av.url ? 'border-[#142C1D] bg-[#E8E1D5] ring-2 ring-[#D97706]' : 'border-[#D0C5B2] hover:border-[#142C1D] bg-white'
                          }`}
                        >
                          <img src={av.url} alt={t.modals.petsSpec[av.key]} className="w-full h-12 object-cover mb-1" referrerPolicy="no-referrer" />
                          <span className="text-[10px] font-mono text-[#111111] truncate block">{av.icon} {t.modals.petsSpec[av.key].split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>
                    <input
                      type="url"
                      placeholder={t.modals.petsSpec.urlPlaceholder}
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-mono"
                    />
                  </div>

                  {/* Identity row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.nameLabel}</label>
                      <input
                        type="text"
                        required
                        placeholder={t.modals.petsSpec.namePlaceholder}
                        value={petName}
                        onChange={(e) => setPetName(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-serif"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.speciesLabel}</label>
                      <select
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-serif cursor-pointer"
                      >
                        <option value="Dog">{t.modals.petsSpec.speciesDog}</option>
                        <option value="Cat">{t.modals.petsSpec.speciesCat}</option>
                        <option value="Bird">{t.modals.petsSpec.speciesBird}</option>
                        <option value="Horse">{t.modals.petsSpec.speciesHorse}</option>
                        <option value="Rabbit">{t.modals.petsSpec.speciesRabbit}</option>
                        <option value="Other">{t.modals.petsSpec.speciesOther}</option>
                      </select>
                    </div>
                  </div>

                  {/* Breed & Title */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.breedLabel}</label>
                      <input
                        type="text"
                        placeholder={t.modals.petsSpec.breedPlaceholder}
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-serif"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.honorLabel}</label>
                      <input
                        type="text"
                        placeholder={t.modals.petsSpec.honorPlaceholder}
                        value={honorTitle}
                        onChange={(e) => setHonorTitle(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-serif"
                      />
                    </div>
                  </div>

                  {/* Lifespan Dates */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.joinedLabel}</label>
                      <input
                        type="text"
                        placeholder={t.modals.petsSpec.joinedPlaceholder}
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.passingLabel}</label>
                      <input
                        type="text"
                        placeholder={t.modals.petsSpec.passingPlaceholder}
                        value={deathDate}
                        onChange={(e) => setDeathDate(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  {/* Memory Narrative */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4337] font-bold mb-1">{t.modals.petsSpec.memoryLabel}</label>
                    <textarea
                      rows={3}
                      placeholder={t.modals.petsSpec.memoryPlaceholder}
                      value={story}
                      onChange={(e) => setStory(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#C8BCAB] focus:border-[#142C1D] focus:outline-none font-serif"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#7D7364]">{t.modals.petsSpec.storedNote}</span>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#142C1D] hover:bg-[#1C3E29] text-[#86EFAC] text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-2 shadow-md transition cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FDE68A]" />
                      <span>{t.modals.petsSpec.submit}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* VIEW 2: DEVELOPER ARCHITECTURE SPECIFICATION */}
          {mainView === 'spec' && (
            <div className="space-y-6">
              {/* Internal Tab Navigator for Spec */}
              <div className="flex border-b border-[#D8CEBA] pb-2 gap-2">
                <button
                  onClick={() => setSpecTab('overview')}
                  className={`px-3 py-1 text-xs font-mono uppercase font-bold transition cursor-pointer ${
                    specTab === 'overview' ? 'border-b-2 border-[#142C1D] text-[#142C1D]' : 'text-[#7D7364] hover:text-[#111111]'
                  }`}
                >{t.modals.petsSpec.tabOverview}</button>
                <button
                  onClick={() => setSpecTab('schema')}
                  className={`px-3 py-1 text-xs font-mono uppercase font-bold transition cursor-pointer ${
                    specTab === 'schema' ? 'border-b-2 border-[#142C1D] text-[#142C1D]' : 'text-[#7D7364] hover:text-[#111111]'
                  }`}
                >{t.modals.petsSpec.tabSchema}</button>
                <button
                  onClick={() => setSpecTab('heroes')}
                  className={`px-3 py-1 text-xs font-mono uppercase font-bold transition cursor-pointer ${
                    specTab === 'heroes' ? 'border-b-2 border-[#142C1D] text-[#142C1D]' : 'text-[#7D7364] hover:text-[#111111]'
                  }`}
                >{t.modals.petsSpec.tabSeed}</button>
              </div>

              {specTab === 'overview' && (
                <div className="space-y-4">
                  <div className="bg-[#142C1D] text-[#FAF8F5] p-4 border border-[#244A32] space-y-2">
                    <h4 className="font-mono text-xs uppercase tracking-widest text-[#FDE68A] font-bold">{t.modals.petsSpec.strategyTitle}</h4>
                    <p className="text-xs font-serif leading-relaxed text-[#D1E7D8]">
                      <strong>pets.remembered.8</strong>{t.modals.petsSpec.strategyIntro}<strong>remembered.8</strong>{t.modals.petsSpec.strategyOutro}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-[#D8CEBA] bg-white p-4 space-y-2">
                      <h5 className="font-mono text-xs uppercase text-[#142C1D] font-bold">{t.modals.petsSpec.sitemapTitle}</h5>
                      <ul className="text-xs font-mono space-y-1 text-[#443E35]">
                        <li><code className="text-[#D97706] font-bold">/</code>{t.modals.petsSpec.routeHome}</li>
                        <li><code className="text-[#D97706] font-bold">/companion/:id</code>{t.modals.petsSpec.routeCompanion}</li>
                        <li><code className="text-[#D97706] font-bold">/enshrine</code>{t.modals.petsSpec.routeEnshrine}</li>
                        <li><code className="text-[#D97706] font-bold">/heroes</code>{t.modals.petsSpec.routeHeroes}</li>
                        <li><code className="text-[#D97706] font-bold">/meadow</code>{t.modals.petsSpec.routeMeadow}</li>
                      </ul>
                    </div>

                    <div className="border border-[#D8CEBA] bg-white p-4 space-y-2">
                      <h5 className="font-mono text-xs uppercase text-[#142C1D] font-bold">{t.modals.petsSpec.tokensTitle}</h5>
                      <ul className="text-xs font-mono space-y-1 text-[#443E35]">
                        <li><span className="inline-block w-3 h-3 bg-[#0E1A13] border border-black mr-1.5 align-middle" /> Background: #0E1A13 (Dark Forest)</li>
                        <li><span className="inline-block w-3 h-3 bg-[#FAF7F2] border border-black mr-1.5 align-middle" /> Canvas: #FAF7F2 (Warm Oat)</li>
                        <li><span className="inline-block w-3 h-3 bg-[#22C55E] border border-black mr-1.5 align-middle" /> Consecration: #22C55E & #86EFAC</li>
                        <li><span className="inline-block w-3 h-3 bg-[#E5A93C] border border-black mr-1.5 align-middle" /> Vigil Amber: #E5A93C & #FDE68A</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {specTab === 'schema' && (
                <div className="bg-[#121B15] text-[#86EFAC] p-4 font-mono text-xs overflow-x-auto border border-[#244A32] shadow-inner">
                  <pre className="text-[11px] leading-relaxed">
{`// Firestore / PostgreSQL Collection: 'pet_memorials'
{
  id: string;                      // slug, e.g. 'proteo-k9'
  fullName: string;                // e.g. 'Proteo'
  species: 'dog' | 'cat' | 'horse' | 'bird' | 'bear' | 'other';
  breed?: string;                  // e.g. 'German Shepherd'
  honorTitle?: string;             // e.g. 'Hero of the 2023 Kahramanmaraş Earthquake'
  birthDate: string;               // e.g. '2013'
  deathDate: string;               // e.g. 'February 10, 2023'
  restingPlace?: string;           // e.g. 'Mexico Military Cemetery & Adiyaman Memorial'
  heroImage: string;               // High-res photo URL
  lifeQuote?: string;              // Epigraph or tribute quote
  biography: string;               // Full narrative
  candleCount: number;             // Digital vigil tally
  serviceType?: 'search_and_rescue' | 'service_dog' | 'historical_pioneer' | 'beloved_companion';
  familyPack?: [
    { id: string; name: string; relation: 'handler' | 'pack_mate' | 'child' | 'mother' }
  ];
  gallery: string[];
  soundArchive?: [
    { title: string; audioUrl: string; duration: string }
  ];
  tributes: [
    { id: string; author: string; flower: string; message: string; timestamp: number }
  ];
  qrPlaqueCode: string;            // Direct stone plaque link
  createdAt: timestamp;
  updatedAt: timestamp;
}`}
                  </pre>
                </div>
              )}

              {specTab === 'heroes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    { name: 'Proteo', icon: '🐕', role: 'K-9 Rescue Hero (2023 Türkiye Quake)', desc: 'Gave his life finding survivors in the rubble of Adiyaman.' },
                    { name: 'Hachiko', icon: '🐕', role: 'Monument of Loyalty (Tokyo)', desc: 'Waited 9 years, 9 months and 15 days at Shibuya Station.' },
                    { name: 'Balto & Togo', icon: '🦮', role: '1925 Serum Run Champions (Alaska)', desc: 'Braved blizzards to deliver diphtheria antitoxin to Nome.' },
                    { name: 'Laika', icon: '🚀', role: 'Cosmic Pioneer (Sputnik 2, 1957)', desc: 'First living earthling in orbit, opening the stars to humanity.' },
                    { name: 'Fido', icon: '🐕', role: 'Italian Sentinel of Devotion', desc: 'Waited 14 years at the Tuscan bus stop for his fallen owner.' },
                    { name: 'Cher Ami', icon: '🕊️', role: 'WWI Carrier Pigeon Hero', desc: 'Saved 194 soldiers of the Lost Battalion despite enemy fire.' },
                  ].map((hero, i) => (
                    <div key={i} className="border border-[#D8CEBA] bg-white p-3 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{hero.icon}</span>
                        <h5 className="font-serif font-bold text-sm text-[#111111]">{hero.name}</h5>
                      </div>
                      <p className="font-mono text-[10px] text-[#D97706] font-bold">{hero.role}</p>
                      <p className="font-serif text-[11px] text-[#554E42] italic">{hero.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Status Bar */}
        <div className="bg-[#EDE6D8] border-t border-[#D0C5B2] px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#5E5446]">
            <span>{t.modals.petsSpec.sisterTarget}</span>
            <span className="font-bold text-[#142C1D] underline">pets.remembered.8</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleCopy}
              className="text-[#D97706] hover:text-[#B45309] font-bold uppercase transition cursor-pointer"
            >
              {copied ? '✓ Architecture Copied' : 'Copy All Specs for Developer'}
            </button>
            <span className="text-[#B5A996]">•</span>
            <button
              onClick={onClose}
              className="text-[#142C1D] hover:underline font-bold uppercase cursor-pointer"
            >{t.modals.petsSpec.closeGateway}</button>
          </div>
        </div>

      </div>
    </div>
  );
};
