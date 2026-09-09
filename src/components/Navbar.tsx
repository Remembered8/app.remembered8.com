'use client';

import React from 'react';
import { MemorialProfile } from '@/types/memorial';
import { Search, Plus, QrCode, Shield, BookOpen, Clock, Image as ImageIcon, Volume2, MessageSquare, Users, Sparkles, Heart, ShoppingBag, Newspaper, Home, Camera, Globe, Download } from 'lucide-react';
import { Language, TRANSLATIONS } from '@/lib/i18n';

interface NavbarProps {
  currentMemorial: MemorialProfile;
  memorials?: MemorialProfile[];
  onSelectMemorial?: (memorial: MemorialProfile) => void;
  onOpenSearch: () => void;
  onOpenCreate: () => void;
  onOpenAdmin: () => void;
  onOpenQr: () => void;
  onOpenStore?: () => void;
  onOpenGuardians?: () => void;
  onOpenSocialStudio?: () => void;
  onOpenPetsSpec?: () => void;
  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  viewMode?: 'home' | 'profile';
  onSetViewMode?: (mode: 'home' | 'profile') => void;
  language?: Language;
  onToggleLanguage?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMemorial,
  memorials = [],
  onSelectMemorial,
  onOpenSearch,
  onOpenCreate,
  onOpenAdmin,
  onOpenQr,
  onOpenStore,
  onOpenGuardians,
  onOpenSocialStudio,
  onOpenPetsSpec,
  activeSection = 'hero',
  onNavigateSection,
  viewMode = 'home',
  onSetViewMode,
  language = 'en',
  onToggleLanguage,
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const isEn = language === 'en';

  const handleNav = (sectionId: string) => {
    if (viewMode !== 'profile' && onSetViewMode) {
      onSetViewMode('profile');
    }
    setTimeout(() => {
      if (typeof onNavigateSection === 'function') {
        onNavigateSection(sectionId);
      } else {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 50);
  };

  const navItems = [
    { id: 'biography', label: t.nav.sections.biography, icon: BookOpen },
    { id: 'timeline', label: t.nav.sections.timeline, icon: Clock },
    { id: 'gallery', label: t.nav.sections.gallery, icon: ImageIcon },
    { id: 'voice', label: t.nav.sections.voice, icon: Volume2 },
    { id: 'memories', label: t.nav.sections.memories, icon: MessageSquare },
    { id: 'capsules', label: t.nav.sections.capsules, icon: Clock },
    { id: 'trees', label: t.nav.sections.trees, icon: Heart },
    { id: 'family', label: t.nav.sections.family, icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/96 border-b border-[#D6CBB8] text-[#1E1B18] backdrop-blur-md transition-all duration-300">
      
      {/* Top Heritage Broadsheet Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-3 pb-2 border-b border-[#E8DFD0]">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: View Mode Toggle & Brand Name + Colorful & Animals Box */}
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
            {onSetViewMode && (
              <div className="flex items-center border border-[#D0C5B2] p-0.5 bg-[#F2EDE2] shrink-0">
                <button
                  onClick={() => onSetViewMode('home')}
                  className={`px-2.5 py-0.5 flex items-center gap-1 transition text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'home' 
                      ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' 
                      : 'text-[#6E6659] hover:text-[#1E1B18]'
                  }`}
                  title={t.nav.homeTitle}
                >
                  <Newspaper className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t.nav.home}</span>
                </button>
                <button
                  onClick={() => onSetViewMode('profile')}
                  className={`px-2.5 py-0.5 flex items-center gap-1 transition text-[10px] sm:text-[11px] cursor-pointer ${
                    viewMode === 'profile' 
                      ? 'bg-[#2B2724] text-[#FAF8F5] font-bold shadow-2xs' 
                      : 'text-[#6E6659] hover:text-[#1E1B18]'
                  }`}
                  title={t.nav.profileTitle}
                >
                  <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>{t.nav.profile}</span>
                </button>
              </div>
            )}

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button 
                onClick={() => onSetViewMode && onSetViewMode('home')}
                className="font-serif-display text-xl sm:text-2xl md:text-3xl font-black tracking-wide sm:tracking-wider text-[#1E1B18] hover:opacity-85 transition truncate cursor-pointer"
              >
                REMEMBERED
              </button>

              {/* Natural elegant ampersand joining the brand to its sister sanctuary */}
              <span className="font-serif italic font-bold text-sm sm:text-base text-[#8A7E6B] select-none">
                &amp;
              </span>

              {/* Extended, Colorful & Charming Pets Sister Portal Pill with Animal Kingdom Figures */}
              <button
                onClick={onOpenPetsSpec}
                className="group inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-[#0F2417] via-[#1B3B26] to-[#0F2417] text-[#FAF8F5] border border-[#E59819] hover:border-[#FBBF24] rounded-full shadow-xs hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer select-none shrink-0"
                title={t.nav.petsPillTitle}
                id="navbar-pets-portal-box"
              >
                <span className="font-serif-display font-bold text-xs sm:text-sm text-[#FDE68A] tracking-tight whitespace-nowrap flex items-center gap-1">
                  <span>{t.nav.petsPillLabel}</span>
                </span>

                {/* Charming Animal Kingdom Parade */}
                <span className="inline-flex items-center gap-1 text-xs sm:text-[13px] group-hover:scale-105 transition-transform duration-200">
                  <span title={t.nav.animals.dog} className="hover:-translate-y-0.5 transition-transform">🐕</span>
                  <span title={t.nav.animals.cat} className="hover:-translate-y-0.5 transition-transform">🐈</span>
                  <span title={t.nav.animals.rabbit} className="hover:-translate-y-0.5 transition-transform">🐇</span>
                  <span title={t.nav.animals.bird} className="hover:-translate-y-0.5 transition-transform">🕊️</span>
                  <span title={t.nav.animals.horse} className="hover:-translate-y-0.5 transition-transform hidden sm:inline">🐎</span>
                  <span title={t.nav.animals.paw} className="text-[11px] text-[#86EFAC]">🐾</span>
                </span>

                {/* Subtle external arrow indicator */}
                <span className="text-xs text-[#FDE68A] font-mono leading-none group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                  ↗
                </span>
              </button>
            </div>
          </div>

          {/* Right Action Icons with Pastel Store Button */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            <button
              onClick={onOpenSearch}
              className="p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={t.nav.searchTitle}
              id="mobile-search-btn"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenQr}
              className="p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={t.nav.qrTitle}
              id="qr-modal-open-btn"
            >
              <QrCode className="w-4 h-4" />
            </button>

            {onOpenSocialStudio && (
              <button
                onClick={onOpenSocialStudio}
                className="p-1.5 hover:bg-[#EAE2D2] text-[#8C6239] hover:text-[#1E1B18] transition rounded border border-[#D6CBB8]/80 bg-[#F5EFEB]/50 cursor-pointer"
                title={t.nav.socialStudioTitle}
                id="navbar-social-studio-btn"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}

            {/* Language switcher */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2 py-1 text-xs font-mono font-bold rounded-xs bg-[#EDE6D8] hover:bg-[#E2D8C4] text-[#1E1B18] border border-[#D6CBB8] transition cursor-pointer"
              title={t.nav.switchLangTitle}
              aria-label={t.nav.switchLangTitle}
              id="navbar-lang-switcher-btn"
            >
              <Globe className="w-3.5 h-3.5 text-[#8C5828]" />
              <span className="tracking-wider">{isEn ? 'EN' : 'TR'}</span>
            </button>

            {onOpenGuardians && (
              <button
                onClick={onOpenGuardians}
                className="hidden sm:block p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
                title={t.nav.guardiansTitle}
                id="guardians-panel-open-btn"
              >
                <Users className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={onOpenAdmin}
              className="hidden sm:block p-1.5 hover:bg-[#EAE2D2] text-[#3D372E] transition rounded cursor-pointer"
              title={t.nav.adminTitle}
              id="admin-panel-open-btn"
            >
              <Shield className="w-4 h-4" />
            </button>
            <a
              href="/Remembered_iOS_Native_Handoff.zip"
              download="Remembered_iOS_Native_Handoff.zip"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 bg-[#8C5828] hover:bg-[#6D421C] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition rounded-xs font-bold shadow-2xs cursor-pointer select-none"
              title={t.nav.iosZipTitle}
              id="download-ios-zip-btn"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2]" />
              <span lang="en" className="hidden sm:inline">{t.nav.iosZipLong}</span>
              <span lang="en" className="sm:hidden">{t.nav.iosZipShort}</span>
            </a>

            <button
              onClick={onOpenCreate}
              className="flex items-center gap-1 px-2.5 sm:px-3 py-1 bg-[#2B2724] hover:bg-[#423C37] text-[#FAF8F5] text-xs font-mono uppercase tracking-wider transition ml-0.5 sm:ml-1 font-bold shadow-2xs cursor-pointer"
              id="create-memorial-btn"
            >
              <Plus className="w-3 h-3 stroke-[2.5]" />
              <span className="hidden sm:inline">{t.nav.createLong}</span>
              <span className="sm:hidden">{t.nav.createShort}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-Nav Section Links (Only visible when viewing a profile) */}
      {viewMode === 'profile' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 border-t border-[#111111]/10 bg-[#FAF8F5]">
          <nav className="overflow-x-auto no-scrollbar flex items-center justify-start sm:justify-center gap-4 sm:gap-8 py-2 text-xs font-mono uppercase tracking-wider text-[#555555]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`shrink-0 flex items-center gap-1.5 py-1 transition border-b-2 ${
                    isActive
                      ? 'border-[#111111] text-[#111111] font-bold'
                      : 'border-transparent text-[#666666] hover:text-[#111111]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};


