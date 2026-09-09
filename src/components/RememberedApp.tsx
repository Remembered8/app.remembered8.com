'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MemorialProfile, MemoryLetter, TimelineMilestone, ArchivalItem, AudioStory, VideoStory, FamilyNode, TimeCapsule, TreeDonation } from '@/types/memorial';
import { INITIAL_MEMORIALS } from '@/data/memorials';
import { Language, TRANSLATIONS, parseLanguage } from '@/lib/i18n';
import { readMemorialIdFromUrl, syncUrlToMemorial } from '@/lib/deepLink';
import * as registry from '@/lib/registry';
import {
  LANGUAGE_STORAGE_KEY,
  LEGACY_MEMORIALS_STORAGE_KEYS,
  MEMORIALS_STORAGE_KEY,
} from '@/lib/storage';
import { Navbar } from '@/components/Navbar';
import { BroadsheetLandingHome } from '@/components/BroadsheetLandingHome';
import { ReminderNotificationBanner } from '@/components/ReminderNotificationBanner';
import { HeroSection } from '@/components/HeroSection';
import { TodaySection } from '@/components/TodaySection';
import { BiographySection } from '@/components/BiographySection';
import { TimelineSection } from '@/components/TimelineSection';
import { GallerySection } from '@/components/GallerySection';
import { VoiceArchiveSection } from '@/components/VoiceArchiveSection';
import { MemoriesSection } from '@/components/MemoriesSection';
import { TimeCapsuleSection } from '@/components/TimeCapsuleSection';
import { MemorialTreeDonationSection } from '@/components/MemorialTreeDonationSection';
import { FamilyTreeSection } from '@/components/FamilyTreeSection';
import { FooterManifesto } from '@/components/FooterManifesto';
import { QrStonePlaqueModal } from '@/components/QrStonePlaqueModal';
import { ObituaryCardModal } from '@/components/ObituaryCardModal';
import { AdminPanelModal } from '@/components/AdminPanelModal';
import { SearchExploreModal } from '@/components/SearchExploreModal';
import { CreateMemorialModal } from '@/components/CreateMemorialModal';
import { MonetizationStoreModal } from '@/components/MonetizationStoreModal';
import { FamilyGuardiansModal } from '@/components/FamilyGuardiansModal';
import { MemorialLiveEventModal } from '@/components/MemorialLiveEventModal';
import { DigitalTributesModal } from '@/components/DigitalTributesModal';
import { InstitutionalHeritageModal } from '@/components/InstitutionalHeritageModal';
import { SocialMediaStudioModal } from '@/components/SocialMediaStudioModal';
import { PetsDeveloperSpecModal } from '@/components/PetsDeveloperSpecModal';
import { CookieConsent, openConsentPreferences } from '@/components/CookieConsent';
import { LegalNoticeModal } from '@/components/LegalNoticeModal';
import { Flame, MessageSquarePlus, Volume2, QrCode, Search, Heart, ShoppingBag, Users } from 'lucide-react';

export default function RememberedApp({ initialMemorial }: { initialMemorial?: MemorialProfile }) {
  const isBrowser = typeof window !== 'undefined';

  const [memorials, setMemorials] = useState<MemorialProfile[]>(() => {
    if (!isBrowser) {
      return initialMemorial
        ? [initialMemorial, ...INITIAL_MEMORIALS.filter((m) => m.id !== initialMemorial.id)]
        : INITIAL_MEMORIALS;
    }

    // The server already resolved the dossier for a deep link; start from it so
    // the first paint is the right person rather than a flash of the default.
    if (initialMemorial) {
      const seeded = INITIAL_MEMORIALS.filter((m) => m.id !== initialMemorial.id);
      return [initialMemorial, ...seeded];
    }

    try {
      // Clear legacy outdated keys that held mixed Turkish text or broken image URLs
      LEGACY_MEMORIALS_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));

      const saved = localStorage.getItem(MEMORIALS_STORAGE_KEY);
      if (saved) {
        const parsed: MemorialProfile[] = JSON.parse(saved);
        const seedMap = new Map<string, MemorialProfile>();
        INITIAL_MEMORIALS.forEach((m) => seedMap.set(m.id, m));

        parsed.forEach((m) => {
          const seed = seedMap.get(m.id);
          if (seed) {
            // Guarantee fresh English texts, titles, quotes and working image URLs from seed
            seedMap.set(m.id, { 
              ...m,
              ...seed, // Fresh pure English text & quotes always take priority!
              candleCount: Math.max(seed.candleCount, m.candleCount || 0),
              visitedTodayCount: Math.max(seed.visitedTodayCount, m.visitedTodayCount || 0),
              memories: m.memories && m.memories.length > seed.memories.length ? m.memories : seed.memories,
              todayActivity: m.todayActivity && m.todayActivity.length > seed.todayActivity.length ? m.todayActivity : seed.todayActivity,
            });
          } else {
            // Keep user-created custom memorials (e.g. from Enshrine modal)
            seedMap.set(m.id, m);
          }
        });
        return Array.from(seedMap.values());
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MEMORIALS;
  });

  // A deep link (QR plaque, shared URL, social card) names its dossier in ?id=.
  const [currentId, setCurrentId] = useState<string>(
    () => initialMemorial?.id || readMemorialIdFromUrl() || 'albert-einstein'
  );
  const [viewMode, setViewMode] = useState<'home' | 'profile'>(() =>
    initialMemorial || readMemorialIdFromUrl() ? 'profile' : 'home'
  );
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hasLitCandle, setHasLitCandle] = useState<boolean>(false);
  // Remembered choice first, then the browser's own preference, then English.
  const [language, setLanguage] = useState<Language>(() => {
    // The server has no stored preference and no navigator; it renders English
    // and the effect below reconciles once the client takes over.
    if (!isBrowser) return 'en';
    try {
      const stored = parseLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
      if (stored) return stored;
    } catch {
      // Private mode or blocked storage: fall through to detection.
    }
    return parseLanguage(typeof navigator !== 'undefined' ? navigator.language : null) ?? 'en';
  });
  const [isPetsSpecOpen, setIsPetsSpecOpen] = useState(false);

  // Whether a Worker with a bound database is answering. Null while unknown.
  // When false the app still runs, but only against this device's own storage,
  // and the UI says so rather than implying a dossier reached anyone else.
  const [registryOnline, setRegistryOnline] = useState<boolean | null>(null);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'tr' : 'en');
  };

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isObituaryCardOpen, setIsObituaryCardOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [isGuardiansModalOpen, setIsGuardiansModalOpen] = useState(false);
  const [isLiveEventOpen, setIsLiveEventOpen] = useState(false);
  const [isTributesOpen, setIsTributesOpen] = useState(false);
  const [isHeritageOpen, setIsHeritageOpen] = useState(false);
  const [heritageInitialTab, setHeritageInitialTab] = useState<'archive' | 'api'>('archive');
  const [isSocialStudioOpen, setIsSocialStudioOpen] = useState(false);
  const [targetMemorialForModal, setTargetMemorialForModal] = useState<MemorialProfile | null>(null);
  const [isLegalOpen, setIsLegalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState<'privacy' | 'cookies'>('privacy');

  // Pull the shared registry in, so dossiers other people created are visible
  // here. Seed data stays as the floor: if the registry is unreachable the
  // archive still renders instead of showing an empty page.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const online = await registry.isRegistryAvailable();
      if (cancelled) return;
      setRegistryOnline(online);
      if (!online) return;

      try {
        const summaries = await registry.fetchMemorialSummaries();
        if (cancelled) return;

        const known = new Set(INITIAL_MEMORIALS.map((m) => m.id));
        const missing = summaries.filter((s) => !known.has(s.id));
        const fetched = await Promise.all(missing.map((s) => registry.fetchMemorial(s.id)));
        if (cancelled) return;

        const extra = fetched.filter((m): m is MemorialProfile => Boolean(m));
        if (extra.length) {
          setMemorials((prev) => {
            const byId = new Map(prev.map((m) => [m.id, m]));
            extra.forEach((m) => byId.set(m.id, m));
            return Array.from(byId.values());
          });
        }
      } catch (error) {
        console.error('Could not load the registry:', error);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // A deep link may name a dossier this device has never seen. Fetch it rather
  // than silently falling back to whoever happens to be first in the list.
  useEffect(() => {
    if (registryOnline !== true) return;
    if (memorials.some((m) => m.id === currentId)) return;

    let cancelled = false;
    (async () => {
      try {
        const fetched = await registry.fetchMemorial(currentId);
        if (!cancelled && fetched) {
          setMemorials((prev) => [fetched, ...prev.filter((m) => m.id !== fetched.id)]);
        }
      } catch (error) {
        console.error('Could not load that dossier:', error);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [registryOnline, currentId, memorials]);

  // Keep <html lang> in step with the chosen language, and remember the choice.
  //
  // The lang attribute is not only for screen readers and search engines: CSS
  // text-transform is locale-sensitive, and Turkish capitalises "i" as "İ".
  // Under lang="en" an uppercased "Gizlilik" renders as "GIZLILIK".
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // The choice still holds for this session.
    }
  }, [language]);

  // Keep the address bar in step with what is on screen, so the page can be
  // shared or reloaded, and make the back button walk between dossiers.
  const urlReconciled = useRef(false);
  useEffect(() => {
    // Replace on the first pass so arriving on a deep link leaves no duplicate
    // entry; push afterwards so the back button walks between dossiers.
    syncUrlToMemorial(viewMode === 'profile' ? currentId : null, {
      replace: !urlReconciled.current,
    });
    urlReconciled.current = true;
  }, [viewMode, currentId]);

  useEffect(() => {
    const onPop = () => {
      const id = readMemorialIdFromUrl();
      if (id) {
        setCurrentId(id);
        setViewMode('profile');
      } else {
        setViewMode('home');
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Push edits back to the registry, but only for dossiers this device holds
  // the edit token for. Seeded historical records are curated and the server
  // refuses to rewrite them; attempting it would just log 403s.
  //
  // Debounced because the editing surfaces mutate on every keystroke and each
  // save ships the whole document.
  const pendingSave = useRef<number | null>(null);
  useEffect(() => {
    if (registryOnline !== true) return;

    const mine = memorials.filter((m) => registry.canEdit(m.id));
    if (!mine.length) return;

    if (pendingSave.current) window.clearTimeout(pendingSave.current);
    pendingSave.current = window.setTimeout(() => {
      mine.forEach((memorial) => {
        registry
          .saveMemorial(memorial)
          .catch((error) => console.error(`Could not save ${memorial.id}:`, error));
      });
    }, 1200);

    return () => {
      if (pendingSave.current) window.clearTimeout(pendingSave.current);
    };
  }, [memorials, registryOnline]);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(MEMORIALS_STORAGE_KEY, JSON.stringify(memorials));
    } catch (e) {
      console.error(e);
    }
  }, [memorials]);

  const currentMemorial = memorials.find((m) => m.id === currentId) || memorials[0];

  // Helper to update active memorial in list
  const updateActiveMemorial = (updater: (prev: MemorialProfile) => MemorialProfile) => {
    setMemorials((prevList) =>
      prevList.map((item) => (item.id === currentMemorial.id ? updater(item) : item))
    );
  };

  // Light candle action
  const handleLightCandle = () => {
    setHasLitCandle(true);

    // A candle is the one write a stranger may make without holding the edit
    // token, so it goes to the registry as a contribution rather than as an
    // edit. The local count below updates regardless, so the gesture is never
    // swallowed by a network problem.
    if (registryOnline) {
      registry
        .addContribution(currentMemorial.id, { kind: 'candle' })
        .catch((error) => console.error('Could not record the candle:', error));
    }

    updateActiveMemorial((prev) => {
      const newCandleCount = prev.candleCount + 1;
      const newVisitedCount = prev.visitedTodayCount + 1;
      const newActivity = [
        {
          id: `act-${Date.now()}`,
          actor: 'A Visitor',
          action: 'silently lit a memorial candle.',
          timeAgo: 'Just now',
          type: 'candle' as const,
        },
        ...prev.todayActivity,
      ];

      return {
        ...prev,
        candleCount: newCandleCount,
        visitedTodayCount: newVisitedCount,
        todayActivity: newActivity,
      };
    });
  };

  // Light candle for a specific memorial ID (e.g. from sanctuary view)
  const handleLightCandleForId = (memorialId: string) => {
    setMemorials((prevList) =>
      prevList.map((item) => {
        if (item.id === memorialId) {
          return {
            ...item,
            candleCount: item.candleCount + 1,
            visitedTodayCount: item.visitedTodayCount + 1,
            todayActivity: [
              {
                id: `act-${Date.now()}`,
                actor: 'A Sanctuary Pilgrim',
                action: 'lit a tribute vigil for this companion.',
                timeAgo: 'Just now',
                type: 'candle' as const,
              },
              ...item.todayActivity,
            ],
          };
        }
        return item;
      })
    );
  };

  // Add Flower action
  const handleAddFlower = (flowerName: string) => {
    updateActiveMemorial((prev) => {
      const newVisitedCount = prev.visitedTodayCount + 1;
      const newActivity = [
        {
          id: `act-${Date.now()}`,
          actor: 'A Visitor',
          action: `placed a ${flowerName} in tribute.`,
          timeAgo: 'Just now',
          type: 'candle' as const,
        },
        ...prev.todayActivity,
      ];

      return {
        ...prev,
        visitedTodayCount: newVisitedCount,
        todayActivity: newActivity,
      };
    });
  };

  // Navigate section helper
  const handleNavigateSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Modal helpers for Live Event, Tributes, Heritage
  const handleOpenLiveEvent = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsLiveEventOpen(true);
  };

  const handleOpenTributes = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsTributesOpen(true);
  };

  const handleOpenHeritage = (tab: 'archive' | 'api' = 'archive') => {
    setHeritageInitialTab(tab);
    setTargetMemorialForModal(currentMemorial);
    setIsHeritageOpen(true);
  };

  const handleOpenSocialStudio = (memorial?: MemorialProfile) => {
    setTargetMemorialForModal(memorial || currentMemorial);
    setIsSocialStudioOpen(true);
  };

  // Add memory letter
  const handleAddMemory = (newMem: Omit<MemoryLetter, 'id' | 'isApproved'>) => {
    const memoryItem: MemoryLetter = {
      ...newMem,
      id: `mem-${Date.now()}`,
      isApproved: true,
    };

    // Letters from visitors reach the registry as contributions, held for a
    // guardian to approve. Shown here at once so the writer sees their words
    // land; publication to everyone else is the guardian's call.
    if (registryOnline) {
      registry
        .addContribution(currentMemorial.id, {
          kind: 'memory',
          authorName: newMem.authorName,
          relation: newMem.relation,
          body: newMem.content,
        })
        .catch((error) => console.error('Could not record the letter:', error));
    }

    updateActiveMemorial((prev) => ({
      ...prev,
      memories: [memoryItem, ...prev.memories],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: memoryItem.authorName,
          action: `left a tribute letter: "${memoryItem.content.slice(0, 32)}..."`,
          timeAgo: 'Just now',
          type: 'memory',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Update Biography from AI
  const handleUpdateBiography = (newBio: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      biography: newBio,
    }));
  };

  // Add timeline milestone
  const handleAddMilestone = (milestone: Omit<TimelineMilestone, 'id'>) => {
    const newM: TimelineMilestone = {
      ...milestone,
      id: `ml-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      timelineEvents: [...prev.timelineEvents, newM].sort((a, b) => parseInt(String(a.year)) - parseInt(String(b.year))),
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'Family Custodian',
          action: `recorded a new milestone (${newM.year}: ${newM.title})`,
          timeAgo: 'Just now',
          type: 'milestone',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Archival Item
  const handleAddArchivalItem = (item: Omit<ArchivalItem, 'id'>) => {
    const newArch: ArchivalItem = {
      ...item,
      id: `arch-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      gallery: [newArch, ...prev.gallery],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'Archival Custodian',
          action: `added a new ${item.isDocument ? 'archival document' : 'photograph'} to the registry.`,
          timeAgo: 'Just now',
          type: 'photo',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Audio Story
  const handleAddAudioStory = (story: AudioStory) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      audioRecordings: [story, ...prev.audioRecordings],
      todayActivity: [
        {
          id: `act-${Date.now()}`,
          actor: 'A Family Member',
          action: `contributed a voice chronicle: "${story.title}"`,
          timeAgo: 'Just now',
          type: 'voice',
        },
        ...prev.todayActivity,
      ],
    }));
  };

  // Add Video Story
  const handleAddVideoStory = (video: VideoStory) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      videos: [video, ...prev.videos],
    }));
  };

  // Add Family Member
  const handleAddFamilyMember = (member: Omit<FamilyNode, 'id'>) => {
    const newMember: FamilyNode = {
      ...member,
      id: `fam-${Date.now()}`,
    };

    updateActiveMemorial((prev) => ({
      ...prev,
      familyTree: [...prev.familyTree, newMember],
    }));
  };

  // Partial Update Memorial (from Admin Panel)
  const handleUpdateMemorial = (updated: Partial<MemorialProfile>) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      ...updated,
    }));
  };

  // Admin memory moderation
  const handleApproveMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === memoryId ? { ...m, isApproved: true } : m)),
    }));
  };

  const handleDeleteMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.filter((m) => m.id !== memoryId),
    }));
  };

  const handleToggleHighlightMemory = (memoryId: string) => {
    updateActiveMemorial((prev) => ({
      ...prev,
      memories: prev.memories.map((m) => (m.id === memoryId ? { ...m, isHighlighted: !m.isHighlighted } : m)),
    }));
  };

  // Create Memorial
  const handleCreateMemorial = (newProfile: MemorialProfile) => {
    setMemorials((prev) => [newProfile, ...prev]);
    setCurrentId(newProfile.id);

    // Publish it so the dossier exists for the family it was made for, not just
    // in this browser. The local copy is already shown; a failure here leaves
    // that intact rather than discarding what was just written.
    if (registryOnline) {
      registry
        .createMemorial(newProfile)
        .catch((error) => console.error('Could not publish the dossier:', error));
    }
  };

  // Switch Memorial
  const handleSelectMemorial = (memorial: MemorialProfile) => {
    setCurrentId(memorial.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAnimalProfile = currentMemorial.category === 'animal_companion';

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111111] selection:bg-[#111111] selection:text-white flex flex-col font-serif transition-colors duration-300">
      
      {/* Top Remembrance Notification */}
      {viewMode === 'profile' && (
        <ReminderNotificationBanner
            language={language}
          memorial={currentMemorial}
          onOpenWriteMemory={() => {
            const el = document.getElementById('memories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            const btn = document.getElementById('write-memory-letter-btn');
            if (btn) btn.click();
          }}
        />
      )}

      {/* Main Elegant Navbar */}
      <Navbar
        currentMemorial={currentMemorial}
        memorials={memorials}
        onSelectMemorial={(m) => {
          handleSelectMemorial(m);
          setViewMode('profile');
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenAdmin={() => setIsAdminModalOpen(true)}
        onOpenQr={() => setIsQrModalOpen(true)}
        onOpenStore={() => setIsStoreModalOpen(true)}
        onOpenGuardians={() => setIsGuardiansModalOpen(true)}
        onOpenSocialStudio={handleOpenSocialStudio}
        onOpenPetsSpec={() => setIsPetsSpecOpen(true)}
        activeSection={activeSection}
        onNavigateSection={handleNavigateSection}
        viewMode={viewMode}
        onSetViewMode={setViewMode}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {viewMode === 'home' ? (
          <BroadsheetLandingHome
            memorials={memorials}
            onSelectMemorial={(m) => {
              handleSelectMemorial(m);
              setViewMode('profile');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCreate={() => setIsCreateModalOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenStore={() => setIsStoreModalOpen(true)}
            onOpenLiveEvent={handleOpenLiveEvent}
            onOpenTributes={handleOpenTributes}
            onOpenHeritage={handleOpenHeritage}
            onOpenSocialStudio={handleOpenSocialStudio}
            onOpenPetsSpec={() => setIsPetsSpecOpen(true)}
            language={language}
          />
        ) : (
          <>
            {/* 1. Memorial Hero Section & Digital Candle */}
            <HeroSection
            language={language}
              memorial={currentMemorial}
              onLightCandle={handleLightCandle}
              hasLitCandle={hasLitCandle}
              onOpenWriteMemory={() => {
                const el = document.getElementById('memories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                const btn = document.getElementById('write-memory-letter-btn');
                if (btn) btn.click();
              }}
              onScrollToVoice={() => handleNavigateSection('voice')}
              onOpenQr={() => setIsQrModalOpen(true)}
              onOpenObituaryCard={() => setIsObituaryCardOpen(true)}
              onOpenSocialStudio={() => handleOpenSocialStudio(currentMemorial)}
            />

            {/* 2. Today's Remembrance & Visitors */}
            <TodaySection
            language={language}
              memorial={currentMemorial}
              onAddFlower={handleAddFlower}
              onOpenWriteMemory={() => {
                const el = document.getElementById('memories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                const btn = document.getElementById('write-memory-letter-btn');
                if (btn) btn.click();
              }}
            />

            {/* 3. Biography (Chronological, literary life story) */}
            <BiographySection
            language={language}
              memorial={currentMemorial}
              onUpdateBiography={handleUpdateBiography}
            />

            {/* 4. Chronological Timeline */}
            <TimelineSection
            language={language}
              memorial={currentMemorial}
              onAddMilestone={handleAddMilestone}
            />

            {/* 5. Photographs and Historical Documents */}
            <GallerySection
            language={language}
              memorial={currentMemorial}
              onAddArchivalItem={handleAddArchivalItem}
            />

            {/* 6. Oral History & Voice Audio Recordings */}
            <VoiceArchiveSection
            language={language}
              memorial={currentMemorial}
              onAddAudioStory={handleAddAudioStory}
              onAddVideoStory={handleAddVideoStory}
            />

            {/* 7. Tribute Letters Register */}
            <MemoriesSection
            language={language}
              memorial={currentMemorial}
              onAddMemory={handleAddMemory}
            />

            {/* 8. Sealed Time Capsules & Legacy Deeds */}
            <TimeCapsuleSection
            language={language}
              memorial={currentMemorial}
              onAddCapsule={(capsule) => {
                updateActiveMemorial((prev) => ({
                  ...prev,
                  timeCapsules: [capsule, ...(prev.timeCapsules || [])],
                  todayActivity: [
                    {
                      id: `act-${Date.now()}`,
                      actor: 'Family Custodian',
                      action: `sealed a new time capsule ("${capsule.title}")`,
                      timeAgo: 'Just now',
                      type: 'milestone',
                    },
                    ...prev.todayActivity,
                  ],
                }));
              }}
            />

            {/* 9. Memorial Living Forest & Tree Dedications */}
            <MemorialTreeDonationSection
            language={language}
              memorial={currentMemorial}
              onAddDonation={(donation) => {
                updateActiveMemorial((prev) => ({
                  ...prev,
                  treeDonations: [donation, ...(prev.treeDonations || [])],
                  todayActivity: [
                    {
                      id: `act-${Date.now()}`,
                      actor: donation.donorName,
                      action: `planted ${donation.treesCount} memorial tree(s) in honor of ${currentMemorial.fullName}.`,
                      timeAgo: 'Just now',
                      type: 'candle',
                    },
                    ...prev.todayActivity,
                  ],
                }));
              }}
            />

            {/* 10. Family Tree & Lineage */}
            <FamilyTreeSection
            language={language}
              memorial={currentMemorial}
              onAddFamilyMember={handleAddFamilyMember}
              onSelectMemorialById={(id) => {
                const found = memorials.find((m) => m.id === id);
                if (found) {
                  handleSelectMemorial(found);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            />
          </>
        )}
      </main>

      {/* The registry being unreachable changes what creating a dossier means,
          so say it rather than letting the archive look shared when it is not. */}
      {registryOnline === false && (
        <div
          role="status"
          className="bg-[#8C5828] px-4 py-2 text-center font-mono text-[11px] leading-relaxed text-[#FAF8F5]"
        >
          {TRANSLATIONS[language].landing.offlineNotice}
        </div>
      )}

      {/* Brand Manifesto & Pillars Footer */}
      <FooterManifesto
        onOpenCreate={() => setIsCreateModalOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        language={language}
        onOpenPrivacy={() => {
          setLegalInitialTab('privacy');
          setIsLegalOpen(true);
        }}
        onOpenCookiePolicy={() => {
          setLegalInitialTab('cookies');
          setIsLegalOpen(true);
        }}
        onOpenCookiePreferences={openConsentPreferences}
      />

      {/* Mobile Floating Action Dock (Ergonomic 44px touch targets, warm NYT parchment) */}
      <aside 
        aria-label="Quick Actions Dock"
        className="md:hidden fixed bottom-3 left-3 right-3 z-40 bg-[#FAF8F5]/95 backdrop-blur-lg border border-[#D0C5B2] rounded-full px-2 py-1.5 flex items-center justify-around shadow-xl"
      >
        {/* 1. Light Candle */}
        <button
          onClick={handleLightCandle}
          className={`min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 rounded-full transition active:scale-95 ${
            hasLitCandle ? 'text-[#855327] font-bold' : 'text-[#2B2724]'
          }`}
          title="Light Candle"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            hasLitCandle 
              ? 'bg-[#2B2724] text-[#F3BE38] shadow-sm ring-2 ring-[#C29B38]/30' 
              : 'bg-[#EDE5D6] text-[#2B2724]'
          }`}>
            <Flame className={`w-4 h-4 ${hasLitCandle ? 'fill-[#F3BE38]' : ''}`} />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">
            {hasLitCandle ? 'Candle Lit' : 'Light Candle'}
          </span>
        </button>

        {/* 2. Leave Tribute */}
        <button
          onClick={() => {
            const el = document.getElementById('memories');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            const btn = document.getElementById('write-memory-letter-btn');
            if (btn) btn.click();
          }}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Leave Tribute"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <MessageSquarePlus className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Tribute</span>
        </button>

        {/* 3. Listen Voice */}
        <button
          onClick={() => {
            handleNavigateSection('voice');
          }}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Listen Audio Archive"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <Volume2 className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Voice</span>
        </button>

        {/* 4. QR Stone Plaque */}
        <button
          onClick={() => setIsQrModalOpen(true)}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="QR Medallion"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#EDE5D6] text-[#2B2724]">
            <QrCode className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">QR Plaque</span>
        </button>

        {/* 5. Search / Directory */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="min-h-[44px] min-w-[44px] flex flex-col items-center justify-center p-1 text-[#2B2724] active:scale-95 transition"
          title="Search Registry"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[#2B2724] text-[#FAF8F5] shadow-2xs">
            <Search className="w-4 h-4" />
          </div>
          <span className="text-[9px] font-mono uppercase tracking-tight mt-0.5">Directory</span>
        </button>
      </aside>

      {/* MODALS */}
      <QrStonePlaqueModal
        language={language}
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        memorial={currentMemorial}
        onOpenStore={() => setIsStoreModalOpen(true)}
      />

      <ObituaryCardModal
        language={language}
        isOpen={isObituaryCardOpen}
        onClose={() => setIsObituaryCardOpen(false)}
        memorial={currentMemorial}
      />

      <AdminPanelModal
        language={language}
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        memorial={currentMemorial}
        onUpdateMemorial={handleUpdateMemorial}
        onApproveMemory={handleApproveMemory}
        onDeleteMemory={handleDeleteMemory}
        onToggleHighlightMemory={handleToggleHighlightMemory}
      />

      <SearchExploreModal
        language={language}
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        memorials={memorials}
        onSelectMemorial={handleSelectMemorial}
      />

      <CreateMemorialModal
        language={language}
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateMemorial={handleCreateMemorial}
        existingMemorials={memorials}
        onSelectExisting={(m) => {
          handleSelectMemorial(m);
          setViewMode('profile');
        }}
      />

      <MonetizationStoreModal
          language={language}
        isOpen={isStoreModalOpen}
        onClose={() => setIsStoreModalOpen(false)}
        memorial={currentMemorial}
        onOrderPlaque={(order) => {
          updateActiveMemorial((prev) => ({
            ...prev,
            plaqueOrders: [order, ...(prev.plaqueOrders || [])],
          }));
        }}
      />

      <FamilyGuardiansModal
        language={language}
        isOpen={isGuardiansModalOpen}
        onClose={() => setIsGuardiansModalOpen(false)}
        memorial={currentMemorial}
        onUpdateGuardians={(guardians) => {
          updateActiveMemorial((prev) => ({
            ...prev,
            guardians,
          }));
        }}
      />

      {/* Real-time Memorial Live Gathering Modal */}
      {isLiveEventOpen && (
        <MemorialLiveEventModal
          language={language}
          isOpen={isLiveEventOpen}
          onClose={() => setIsLiveEventOpen(false)}
          memorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Premium Digital Tributes Modal */}
      {isTributesOpen && (
        <DigitalTributesModal
        language={language}
          isOpen={isTributesOpen}
          onClose={() => setIsTributesOpen(false)}
          memorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Institutional Heritage & API Infrastructure Modal */}
      {isHeritageOpen && (
        <InstitutionalHeritageModal
          language={language}
          isOpen={isHeritageOpen}
          onClose={() => setIsHeritageOpen(false)}
          initialTab={heritageInitialTab}
        />
      )}

      {/* Social Media & Press Kit Studio Modal */}
      {isSocialStudioOpen && (
        <SocialMediaStudioModal
          language={language}
          isOpen={isSocialStudioOpen}
          onClose={() => setIsSocialStudioOpen(false)}
          memorials={memorials}
          initialMemorial={targetMemorialForModal || currentMemorial}
        />
      )}

      {/* Developer Architecture & Specification Modal for Sister Portal pets.remembered.8 */}
      <PetsDeveloperSpecModal
        language={language}
        isOpen={isPetsSpecOpen}
        onClose={() => setIsPetsSpecOpen(false)}
        onEnshrinePet={handleCreateMemorial}
        onViewCreatedPet={(petId) => {
          setCurrentId(petId);
          setViewMode('profile');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Privacy notice & cookie policy */}
      <LegalNoticeModal
        // Remount on tab change so the requested tab is the one that opens.
        key={legalInitialTab}
        isOpen={isLegalOpen}
        onClose={() => setIsLegalOpen(false)}
        language={language}
        initialTab={legalInitialTab}
      />

      {/* GDPR / KVKK consent gate: nothing third-party loads before this resolves */}
      <CookieConsent
        language={language}
        onOpenPolicy={() => {
          setLegalInitialTab('cookies');
          setIsLegalOpen(true);
        }}
      />

    </div>
  );
}
