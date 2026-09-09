'use client';

import React, { useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { LIVE_PULSE_STORAGE_KEY } from '@/lib/storage';
import { 
  Flame, 
  Heart, 
  MessageSquare, 
  TreePine, 
  Mic, 
  Radio, 
  Clock, 
  MapPin, 
  Send, 
  ArrowRight, 
  Pause, 
  Play, 
  Award,
  Globe,
  Plus
} from 'lucide-react';
import { MemorialProfile } from '@/types/memorial';

export interface PulseActivityItem {
  id: string;
  type: 'candle' | 'letter' | 'tree' | 'audio' | 'photo' | 'prayer';
  authorName: string;
  location: string;
  targetMemorialId: string;
  targetMemorialName: string;
  targetMemorialPhoto: string;
  message?: string;
  timestamp: string;
  exactTime: number;
  highlightColor?: string;
  likesCount?: number;
}

interface LiveMemorialPulseBoardProps {
  language?: Language;
  memorials: MemorialProfile[];
  onSelectMemorial: (memorial: MemorialProfile) => void;
  onOpenHeritage?: (tab?: 'archive' | 'api') => void;
  onOpenTributes?: (memorial?: MemorialProfile) => void;
}

const INITIAL_PULSE_ITEMS: PulseActivityItem[] = [
  {
    id: 'pulse-1',
    type: 'candle',
    authorName: 'Dr. Selim Vance',
    location: 'London, United Kingdom',
    targetMemorialId: 'baris-manco',
    targetMemorialName: 'Baris Manco',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    message: 'A generation raised on songs of universal peace and empathy stands eternally grateful. May your lantern burn forever.',
    timestamp: 'Just now',
    exactTime: Date.now() - 1000 * 15,
    highlightColor: 'from-[#D97706]/40 to-transparent',
    likesCount: 14
  },
  {
    id: 'pulse-2',
    type: 'tree',
    authorName: 'The Sterling Family',
    location: 'Boston, Massachusetts',
    targetMemorialId: 'leyla-erbil',
    targetMemorialName: 'Leyla Erbil',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    message: 'Dedicated 3 olive trees to the Aegean Memorial Grove in honor of her groundbreaking courage and literary vision.',
    timestamp: '2m ago',
    exactTime: Date.now() - 1000 * 60 * 2,
    highlightColor: 'from-[#059669]/40 to-transparent',
    likesCount: 28
  },
  {
    id: 'pulse-3',
    type: 'audio',
    authorName: 'Ozan Emre K.',
    location: 'Vienna, Austria',
    targetMemorialId: 'asik-veysel',
    targetMemorialName: 'Asik Veysel Satiroglu',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    message: 'First studio acoustic recording sheet notes of the legendary ballad added to the master voice archive.',
    timestamp: '5m ago',
    exactTime: Date.now() - 1000 * 60 * 5,
    highlightColor: 'from-[#0284C7]/40 to-transparent',
    likesCount: 42
  },
  {
    id: 'pulse-4',
    type: 'letter',
    authorName: 'Aylin & Julian S.',
    location: 'Berlin, Germany',
    targetMemorialId: 'baris-manco',
    targetMemorialName: 'Baris Manco',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    message: 'Shaking your hand backstage at the 1983 Berlin concert remains one of the most cherished memories of our youth.',
    timestamp: '9m ago',
    exactTime: Date.now() - 1000 * 60 * 9,
    highlightColor: 'from-[#E11D48]/40 to-transparent',
    likesCount: 19
  },
  {
    id: 'pulse-5',
    type: 'prayer',
    authorName: 'Hacer & Kin',
    location: 'Istanbul, Turkey',
    targetMemorialId: 'leyla-erbil',
    targetMemorialName: 'Leyla Erbil',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    message: 'May her soul rest in serene peace. Her unyielding intellectual dignity remains a light for all women writers.',
    timestamp: '14m ago',
    exactTime: Date.now() - 1000 * 60 * 14,
    likesCount: 31
  },
  {
    id: 'pulse-6',
    type: 'candle',
    authorName: 'Marcus Vance',
    location: 'Chicago, Illinois',
    targetMemorialId: 'asik-veysel',
    targetMemorialName: 'Asik Veysel Satiroglu',
    targetMemorialPhoto: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    message: 'A candle lit from across the Atlantic for the master who saw universal truths through the eyes of the heart.',
    timestamp: '22m ago',
    exactTime: Date.now() - 1000 * 60 * 22,
    likesCount: 56
  }
];

const SIMULATED_POOL = [
  {
    type: 'candle' as const,
    authorName: 'Ceyda Vance',
    location: 'San Francisco, CA',
    memorialId: 'baris-manco',
    memorialName: 'Baris Manco',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    message: 'Listening to your melodies with my children today. Your kindness continues to travel across generations.'
  },
  {
    type: 'tree' as const,
    authorName: 'Literary Heritage Guild',
    location: 'Edinburgh, Scotland',
    memorialId: 'leyla-erbil',
    memorialName: 'Leyla Erbil',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    message: 'Dedicated 5 oak saplings in the Global Remembrance Grove on behalf of world literature scholars.'
  },
  {
    type: 'candle' as const,
    authorName: 'Riza & Gulshath C.',
    location: 'Geneva, Switzerland',
    memorialId: 'asik-veysel',
    memorialName: 'Asik Veysel Satiroglu',
    photo: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    message: 'With deep reverence and gratitude for the immortal philosophy of the soil and the cosmos.'
  },
  {
    type: 'letter' as const,
    authorName: 'Jonathan Sterling, Esq.',
    location: 'Toronto, Canada',
    memorialId: 'baris-manco',
    memorialName: 'Baris Manco',
    photo: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    message: 'Your peaceful words at the Nippon Budokan concert in Tokyo touched hearts worldwide. Never forgotten.'
  }
];

export const LiveMemorialPulseBoard: React.FC<LiveMemorialPulseBoardProps> = ({
  memorials,
  onSelectMemorial,
  onOpenHeritage,
  onOpenTributes,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [pulseItems, setPulseItems] = useState<PulseActivityItem[]>(() => {
    try {
      const saved = localStorage.getItem(LIVE_PULSE_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_PULSE_ITEMS;
  });

  const [activeFilter, setActiveFilter] = useState<'all' | 'candle' | 'letter' | 'tree' | 'audio'>('all');
  const [isPaused, setIsPaused] = useState(false);
  const [showContributeModal, setShowContributeModal] = useState(false);
  
  // Form state
  const [selectedMemorialId, setSelectedMemorialId] = useState<string>(memorials[0]?.id || 'baris-manco');
  const [contribType, setContribType] = useState<'candle' | 'letter' | 'tree' | 'prayer'>('candle');
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);

  // Auto simulation interval for living heartbeat
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const randomSeed = SIMULATED_POOL[Math.floor(Math.random() * SIMULATED_POOL.length)];
      const targetMem = memorials.find(m => m.id === randomSeed.memorialId) || memorials[0];

      const newItem: PulseActivityItem = {
        id: 'sim-' + Date.now(),
        type: randomSeed.type,
        authorName: randomSeed.authorName,
        location: randomSeed.location,
        targetMemorialId: targetMem.id,
        targetMemorialName: targetMem.fullName,
        targetMemorialPhoto: targetMem.heroImage,
        message: randomSeed.message,
        timestamp: 'Just now',
        exactTime: Date.now(),
        likesCount: Math.floor(Math.random() * 8) + 1,
        highlightColor: 'from-[#D97706]/40 to-transparent'
      };

      setPulseItems(prev => {
        const updated = [newItem, ...prev.slice(0, 19)];
        try {
          localStorage.setItem(LIVE_PULSE_STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }, 14000);

    return () => clearInterval(interval);
  }, [isPaused, memorials]);

  const handleLike = (id: string) => {
    if (likedIds.has(id)) return;
    setLikedIds(prev => new Set(prev).add(id));
    setPulseItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, likesCount: (item.likesCount || 0) + 1 };
      }
      return item;
    }));
  };

  const handleCreateContribution = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) return;

    const targetMem = memorials.find(m => m.id === selectedMemorialId) || memorials[0];

    const newItem: PulseActivityItem = {
      id: 'user-' + Date.now(),
      type: contribType,
      authorName: authorName.trim(),
      location: location.trim() || 'Global',
      targetMemorialId: targetMem.id,
      targetMemorialName: targetMem.fullName,
      targetMemorialPhoto: targetMem.heroImage,
      message: message.trim() || (contribType === 'candle' ? 'An eternal memorial candle was lit in solemn remembrance.' : 'Solemn respects paid in the living memory council.'),
      timestamp: 'Now',
      exactTime: Date.now(),
      likesCount: 1,
      highlightColor: 'from-[#D97706]/60 via-[#F59E0B]/30 to-transparent'
    };

    const updated = [newItem, ...pulseItems.slice(0, 19)];
    setPulseItems(updated);
    setLastAddedId(newItem.id);
    try {
      localStorage.setItem(LIVE_PULSE_STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    // Reset and close
    setShowContributeModal(false);
    setMessage('');
    
    setTimeout(() => {
      setLastAddedId(null);
    }, 6000);
  };

  const filteredItems = pulseItems.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  const getActionBadge = (type: PulseActivityItem['type']) => {
    switch (type) {
      case 'candle':
        return {
          icon: <Flame className="w-3.5 h-3.5 text-[#D97706] fill-[#D97706]" />,
          label: t.modals.pulse.actions.candle,
          bg: 'bg-[#FEF3C7] text-[#92400E] border-[#FDE68A]'
        };
      case 'tree':
        return {
          icon: <TreePine className="w-3.5 h-3.5 text-[#059669]" />,
          label: t.modals.pulse.actions.tree,
          bg: 'bg-[#D1FAE5] text-[#065F46] border-[#A7F3D0]'
        };
      case 'letter':
        return {
          icon: <MessageSquare className="w-3.5 h-3.5 text-[#E11D48]" />,
          label: t.modals.pulse.actions.letter,
          bg: 'bg-[#FFE4E6] text-[#9F1239] border-[#FECDD3]'
        };
      case 'audio':
        return {
          icon: <Mic className="w-3.5 h-3.5 text-[#0284C7]" />,
          label: t.modals.pulse.actions.audio,
          bg: 'bg-[#E0F2FE] text-[#075985] border-[#BAE6FD]'
        };
      case 'prayer':
      default:
        return {
          icon: <Heart className="w-3.5 h-3.5 text-[#7C3AED] fill-[#7C3AED]" />,
          label: t.modals.pulse.actions.prayer,
          bg: 'bg-[#EDE9FE] text-[#5B21B6] border-[#DDD6FE]'
        };
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 my-14" id="live-memorial-pulse-board">
      <div className="bg-[#111111] text-[#FAF8F5] border-2 border-[#111111] p-6 sm:p-9 shadow-2xl relative overflow-hidden rounded-xs">
        
        {/* Panoramic Transparent World Map Background */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
          <svg
            className="w-full h-full object-cover opacity-[0.12] text-white select-none"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid slice"
          >
            {/* Coordinate Meridian & Parallel Grid Lines */}
            <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" opacity="0.4">
              <line x1="0" y1="125" x2="1000" y2="125" />
              <line x1="0" y1="250" x2="1000" y2="250" />
              <line x1="0" y1="375" x2="1000" y2="375" />
              <line x1="200" y1="0" x2="200" y2="500" />
              <line x1="400" y1="0" x2="400" y2="500" />
              <line x1="500" y1="0" x2="500" y2="500" />
              <line x1="600" y1="0" x2="600" y2="500" />
              <line x1="800" y1="0" x2="800" y2="500" />
            </g>

            {/* Continents Silhouettes */}
            <path
              d="M130,90 Q170,70 230,85 Q260,110 240,150 Q210,165 190,195 Q170,220 185,250 Q160,250 145,210 Q120,180 115,140 Z"
              fill="currentColor"
            />
            <path
              d="M320,50 Q360,45 370,75 Q340,95 315,75 Z"
              fill="currentColor"
            />
            <path
              d="M230,270 Q270,270 295,310 Q310,360 280,420 Q255,450 240,430 Q225,380 220,330 Q215,290 230,270 Z"
              fill="currentColor"
            />
            <path
              d="M470,95 Q520,85 540,115 Q545,145 520,160 Q485,165 470,140 Q455,120 470,95 Z"
              fill="currentColor"
            />
            <path
              d="M450,100 Q465,90 460,115 Q445,120 450,100 Z"
              fill="currentColor"
            />
            <path
              d="M490,60 Q520,55 530,90 Q505,100 490,75 Z"
              fill="currentColor"
            />
            <path
              d="M470,180 Q530,175 560,220 Q570,270 550,330 Q515,380 490,340 Q465,300 450,240 Q450,200 470,180 Z"
              fill="currentColor"
            />
            <path
              d="M540,110 Q620,80 730,90 Q820,110 830,170 Q790,230 730,240 Q680,240 640,210 Q600,230 570,200 Q540,170 540,110 Z"
              fill="currentColor"
            />
            <path
              d="M845,140 Q860,135 860,160 Q845,175 840,155 Z"
              fill="currentColor"
            />
            <path
              d="M770,320 Q840,310 855,360 Q840,410 780,405 Q745,370 770,320 Z"
              fill="currentColor"
            />

            {/* Glowing Memorial Activity Nodes */}
            <circle cx="535" cy="148" r="8" fill="#FBBF24" fillOpacity="0.85" />
            <circle cx="535" cy="148" r="16" stroke="#FBBF24" strokeWidth="1.5" opacity="0.6" />
            <circle cx="535" cy="148" r="24" stroke="#FBBF24" strokeWidth="0.75" opacity="0.3" strokeDasharray="3 3" />
            
            <circle cx="495" cy="120" r="5" fill="#FBBF24" fillOpacity="0.8" />
            <circle cx="850" cy="155" r="5" fill="#FBBF24" fillOpacity="0.8" />
            <circle cx="230" cy="145" r="5" fill="#FBBF24" fillOpacity="0.8" />
            <circle cx="465" cy="115" r="4.5" fill="#FBBF24" fillOpacity="0.8" />
            <circle cx="830" cy="380" r="4.5" fill="#FBBF24" fillOpacity="0.8" />

            {/* Global Geodesic Lines */}
            <path d="M535,148 Q515,130 495,120" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
            <path d="M535,148 Q700,120 850,155" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
            <path d="M535,148 Q370,110 230,145" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.7" />
          </svg>
        </div>

        {/* Ambient Subtle Aura Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F3BE38]/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* 1. HEADER & LIVE BROADCAST HEARTBEAT METRICS */}
        <div className="relative z-10 border-b border-white/15 pb-6 mb-7">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Title & Live Status */}
            <div className="space-y-2.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#1C1C1C] border border-white/20 rounded-xs text-[10px] font-mono tracking-widest uppercase font-bold text-[#F3BE38] shadow-sm">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F3BE38] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F3BE38]"></span>
                  </span>{t.modals.pulse.badge}</span>

                <span className="text-[11px] font-mono text-white/90 inline-flex items-center gap-1.5 font-semibold bg-[#1C1C1C] px-2.5 py-0.5 rounded-2xs border border-white/15">
                  <Radio className="w-3.5 h-3.5 text-[#F3BE38] animate-pulse" />
                  <span>{t.modals.pulse.onAir}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] animate-ping ml-1"></span>
                </span>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-black text-[#FAF8F5] tracking-tight leading-tight">{t.modals.pulse.title}</h3>
              
              <p className="text-xs sm:text-sm font-serif text-white/80 max-w-2xl leading-relaxed">{t.modals.pulse.body}</p>
            </div>

            {/* Quick Actions & Live Stream Controls */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                onClick={() => setShowContributeModal(true)}
                className="px-5 py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-mono text-xs uppercase tracking-wider font-extrabold transition shadow-lg hover:shadow-xl flex items-center gap-2 rounded-xs border border-[#F59E0B] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                id="pulse-board-contribute-btn"
              >
                <Plus className="w-4 h-4 text-[#FEF3C7] stroke-[3] group-hover:rotate-90 transition-transform duration-300" />
                <span className="text-white">{t.modals.pulse.leaveTribute}</span>
              </button>

              <button
                onClick={() => setIsPaused(!isPaused)}
                className={`p-3 border rounded-xs font-mono text-xs transition flex items-center gap-2 shadow-xs cursor-pointer ${
                  isPaused 
                    ? 'bg-[#2A2A2A] border-[#F3BE38] text-white font-bold' 
                    : 'bg-[#1C1C1C] border-white/20 text-white/80 hover:text-white hover:border-white/40'
                }`}
                title={isPaused ? 'Resume live feed' : 'Pause live feed'}
              >
                {isPaused ? <Play className="w-4 h-4 text-[#F3BE38]" /> : <Pause className="w-4 h-4 text-[#FBBF24]" />}
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">
                  {isPaused ? 'BROADCAST PAUSED' : 'LIVE STREAM'}
                </span>
              </button>
            </div>

          </div>

          {/* 4 GLOBAL LIVE STATS COUNTER PILLS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-6 mt-4">
            
            <div className="bg-[#1C1C1C]/90 backdrop-blur-xs border border-white/15 p-3.5 rounded-xs flex items-center gap-3 shadow-sm hover:border-white/40 transition">
              <div className="w-9 h-9 rounded-full bg-[#FEF3C7]/15 border border-[#FDE68A]/40 flex items-center justify-center text-[#FBBF24] shrink-0">
                <Flame className="w-4 h-4 fill-[#FBBF24]" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-black text-[#FAF8F5]">14,892+</div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider font-semibold">{t.modals.pulse.activeCandles}</div>
              </div>
            </div>

            <div className="bg-[#1C1C1C]/90 backdrop-blur-xs border border-white/15 p-3.5 rounded-xs flex items-center gap-3 shadow-sm hover:border-white/40 transition">
              <div className="w-9 h-9 rounded-full bg-[#D1FAE5]/15 border border-[#A7F3D0]/40 flex items-center justify-center text-[#34D399] shrink-0">
                <TreePine className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-black text-[#FAF8F5]">3,420+</div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider font-semibold">{t.modals.pulse.plantedTrees}</div>
              </div>
            </div>

            <div className="bg-[#1C1C1C]/90 backdrop-blur-xs border border-white/15 p-3.5 rounded-xs flex items-center gap-3 shadow-sm hover:border-white/40 transition">
              <div className="w-9 h-9 rounded-full bg-[#FFE4E6]/15 border border-[#FECDD3]/40 flex items-center justify-center text-[#FB7185] shrink-0">
                <MessageSquare className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-black text-[#FAF8F5]">8,960+</div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider font-semibold">{t.modals.pulse.letters}</div>
              </div>
            </div>

            <div className="bg-[#1C1C1C]/90 backdrop-blur-xs border border-white/15 p-3.5 rounded-xs flex items-center gap-3 shadow-sm hover:border-white/40 transition">
              <div className="w-9 h-9 rounded-full bg-[#E0F2FE]/15 border border-[#BAE6FD]/40 flex items-center justify-center text-[#38BDF8] shrink-0">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <div className="font-mono text-lg sm:text-xl font-black text-[#FAF8F5]">{t.modals.pulse.nations}</div>
                <div className="text-[10px] font-mono text-[#999999] uppercase tracking-wider font-semibold">{t.modals.pulse.concurrentVisitors}</div>
              </div>
            </div>

          </div>
        </div>

        {/* 2. FILTER TABS */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap relative z-10">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            
            <button
              onClick={() => setActiveFilter('all')}
              className={`min-h-11 inline-flex items-center px-3 py-1.5 text-xs font-mono font-bold uppercase transition rounded-xs border shadow-2xs cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#F3BE38] text-[#1E1B18] border-[#F3BE38]'
                  : 'bg-[#1C1C1C] text-[#E5E5E5] border-white/20 hover:text-white hover:border-white/50'
              }`}
            >
              ALL ACTIVITY ({pulseItems.length})
            </button>

            <button
              onClick={() => setActiveFilter('candle')}
              className={`min-h-11 px-3 py-1.5 text-xs font-mono font-bold uppercase transition rounded-xs border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                activeFilter === 'candle'
                  ? 'bg-[#FEF3C7] text-[#92400E] border-[#F59E0B]'
                  : 'bg-[#1C1C1C] text-[#E5E5E5] border-white/20 hover:border-[#F59E0B]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>{t.modals.pulse.statCandles}</span>
            </button>

            <button
              onClick={() => setActiveFilter('letter')}
              className={`min-h-11 px-3 py-1.5 text-xs font-mono font-bold uppercase transition rounded-xs border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                activeFilter === 'letter'
                  ? 'bg-[#FFE4E6] text-[#9F1239] border-[#E11D48]'
                  : 'bg-[#1C1C1C] text-[#E5E5E5] border-white/20 hover:border-[#E11D48]'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#FB7185]" />
              <span>{t.modals.pulse.statLetters}</span>
            </button>

            <button
              onClick={() => setActiveFilter('tree')}
              className={`min-h-11 px-3 py-1.5 text-xs font-mono font-bold uppercase transition rounded-xs border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                activeFilter === 'tree'
                  ? 'bg-[#D1FAE5] text-[#065F46] border-[#059669]'
                  : 'bg-[#1C1C1C] text-[#E5E5E5] border-white/20 hover:border-[#059669]'
              }`}
            >
              <TreePine className="w-3.5 h-3.5 text-[#34D399]" />
              <span>{t.modals.pulse.statTrees}</span>
            </button>

            <button
              onClick={() => setActiveFilter('audio')}
              className={`min-h-11 px-3 py-1.5 text-xs font-mono font-bold uppercase transition rounded-xs border flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                activeFilter === 'audio'
                  ? 'bg-[#E0F2FE] text-[#075985] border-[#0284C7]'
                  : 'bg-[#1C1C1C] text-[#E5E5E5] border-white/20 hover:border-[#0284C7]'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{t.modals.pulse.statAudio}</span>
            </button>

          </div>

          <div className="text-[11px] font-mono text-white/90 flex items-center gap-2 font-semibold bg-[#1C1C1C]/90 px-2.5 py-1 rounded-2xs border border-white/15">
            <span className="w-2 h-2 rounded-full bg-[#F3BE38] animate-ping"></span>
            <span>{t.modals.pulse.syncing}</span>
          </div>
        </div>

        {/* 3. BENTO FEED GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {filteredItems.map((item) => {
            const badge = getActionBadge(item.type);
            const isJustAdded = item.id === lastAddedId;

            return (
              <div
                key={item.id}
                className={`bg-white border transition-all duration-300 p-4 sm:p-5 flex flex-col justify-between rounded-xs group hover:border-[#1E1B18] hover:shadow-lg hover:-translate-y-0.5 relative overflow-hidden ${
                  isJustAdded 
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/40 bg-[#FFFDF9]' 
                    : 'border-[#D5CAB7] shadow-xs'
                }`}
              >
                {/* Highlight Gradient */}
                {item.highlightColor && (
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.highlightColor}`}></div>
                )}

                {/* Top Info */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 border text-[9px] font-mono font-bold uppercase tracking-wider rounded-2xs ${badge.bg}`}>
                    {badge.icon}
                    {badge.label}
                  </span>

                  <span className="text-[10px] font-mono text-[#8C8275] flex items-center gap-1 font-semibold">
                    <Clock className="w-3 h-3 text-[#8C8275]" />
                    {item.timestamp}
                  </span>
                </div>

                {/* Quote / Message */}
                <div className="space-y-2 mb-4">
                  {item.message && (
                    <p className="text-xs sm:text-[13px] font-serif text-[#1E1B18] leading-relaxed italic font-medium">
                      &ldquo;{item.message}&rdquo;
                    </p>
                  )}
                  
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#5C5346]">
                    <span className="font-bold text-[#1E1B18]">{item.authorName}</span>
                    <span className="text-[#A89F91]">&bull;</span>
                    <span className="text-[#6E6457] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#8C6239]" />
                      {item.location}
                    </span>
                  </div>
                </div>

                {/* Target Memorial Mini Footer Bar */}
                <div className="pt-3 border-t border-[#EDE5D8] flex items-center justify-between gap-3 mt-auto">
                  <button
                    onClick={() => {
                      const targetMem = memorials.find(m => m.id === item.targetMemorialId);
                      if (targetMem) onSelectMemorial(targetMem);
                    }}
                    className="flex items-center gap-2.5 text-left group/target min-w-0 cursor-pointer"
                    title={`View registry for ${item.targetMemorialName}`}
                  >
                    <img
                      src={item.targetMemorialPhoto}
                      alt={item.targetMemorialName}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-[#D5CAB7] group-hover/target:border-[#1E1B18] shrink-0 transition"
                    />
                    <div className="min-w-0">
                      <span className="text-[9px] font-mono uppercase text-[#8C8275] block font-medium">{t.modals.pulse.honoring}</span>
                      <span className="text-xs font-serif font-bold text-[#1E1B18] group-hover/target:text-[#8C6239] group-hover/target:underline truncate block">
                        {item.targetMemorialName}
                      </span>
                    </div>
                  </button>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`px-2 py-1 rounded-xs border text-[10px] font-mono transition flex items-center gap-1 cursor-pointer ${
                        likedIds.has(item.id)
                          ? 'bg-[#FFE4E6] border-[#E11D48] text-[#9F1239] font-bold'
                          : 'bg-[#F7F3EA] border-[#D5CAB7] text-[#5C5346] hover:text-[#1E1B18] hover:border-[#1E1B18]'
                      }`}
                      title={t.modals.pulse.supportTribute}
                    >
                      <Heart className={`w-3 h-3 ${likedIds.has(item.id) ? 'fill-[#E11D48] text-[#E11D48]' : ''}`} />
                      <span>{item.likesCount || 0}</span>
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* 4. FOOTER NOTE & CALL TO ACTION */}
        <div className="mt-8 pt-5 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/80 relative z-10">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#FBBF24]" />
            <span>{t.modals.pulse.trustNote}</span>
          </div>

          <div className="flex items-center gap-3">
            {onOpenTributes && (
              <button
                onClick={() => onOpenTributes()}
                className="text-[#FBBF24] hover:text-white hover:underline font-bold flex items-center gap-1 cursor-pointer transition"
              >
                <span>{t.modals.pulse.catalog}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

      {/* 5. INTERACTIVE CONTRIBUTION MODAL */}
      {showContributeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] text-[#1E1B18] border-2 border-[#2B2724] p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            
            <button
              onClick={() => setShowContributeModal(false)}
              className="absolute top-4 right-4 text-xs font-mono text-[#6E6457] hover:text-black p-1 cursor-pointer font-bold"
            >{t.modals.pulse.close}</button>

            <div className="space-y-1 mb-5">
              <span className="text-[10px] font-mono text-[#8C6239] uppercase tracking-widest font-bold">{t.modals.pulse.contribution}</span>
              <h4 className="font-serif-display text-2xl font-bold text-[#1E1B18]">{t.modals.pulse.formTitle}</h4>
              <p className="text-xs font-serif text-[#5C5346]">{t.modals.pulse.formIntro}</p>
            </div>

            <form onSubmit={handleCreateContribution} className="space-y-4">
              
              {/* Select Memorial */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1 font-bold">{t.modals.pulse.inMemoryOf}</label>
                <select
                  value={selectedMemorialId}
                  onChange={(e) => setSelectedMemorialId(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-serif"
                >
                  {memorials.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.fullName} ({m.profession})
                    </option>
                  ))}
                </select>
              </div>

              {/* Select Contribution Type */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1 font-bold">{t.modals.pulse.typeLabel}</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => setContribType('candle')}
                    className={`p-2.5 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                      contribType === 'candle'
                        ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E] font-bold shadow-2xs'
                        : 'bg-white border-[#D5CAB7] text-[#4A4339]'
                    }`}
                  >
                    <Flame className="w-4 h-4 text-[#D97706] fill-[#D97706]" />
                    <span>{t.modals.pulse.typeCandle}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContribType('letter')}
                    className={`p-2.5 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                      contribType === 'letter'
                        ? 'bg-[#FFE4E6] border-[#E11D48] text-[#9F1239] font-bold shadow-2xs'
                        : 'bg-white border-[#D5CAB7] text-[#4A4339]'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 text-[#E11D48]" />
                    <span>{t.modals.pulse.typeLetter}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContribType('tree')}
                    className={`p-2.5 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                      contribType === 'tree'
                        ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-bold shadow-2xs'
                        : 'bg-white border-[#D5CAB7] text-[#4A4339]'
                    }`}
                  >
                    <TreePine className="w-4 h-4 text-[#059669]" />
                    <span>{t.modals.pulse.typeTree}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setContribType('prayer')}
                    className={`p-2.5 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                      contribType === 'prayer'
                        ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#5B21B6] font-bold shadow-2xs'
                        : 'bg-white border-[#D5CAB7] text-[#4A4339]'
                    }`}
                  >
                    <Heart className="w-4 h-4 text-[#7C3AED] fill-[#7C3AED]" />
                    <span>{t.modals.pulse.typePrayer}</span>
                  </button>
                </div>
              </div>

              {/* Name and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1 font-bold">{t.modals.pulse.nameLabel}</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder={t.modals.pulse.namePlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-[#333333] mb-1 font-bold">{t.modals.pulse.locationLabel}</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={t.modals.pulse.locationPlaceholder}
                    className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111]"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase text-[#333333] mb-1 font-bold">{t.modals.pulse.wordsLabel}</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder={t.modals.pulse.wordsPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#111111]/30 focus:border-[#111111] text-[#111111] font-serif"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D5CAB7]">
                <button
                  type="button"
                  onClick={() => setShowContributeModal(false)}
                  className="px-4 py-2.5 border border-[#111111]/30 text-xs font-mono hover:bg-[#EAE2D2] text-[#333333] cursor-pointer"
                >{t.modals.pulse.cancel}</button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#1E1B18] hover:bg-[#38312A] text-white text-xs font-mono uppercase tracking-wider font-bold transition flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5 text-[#F3BE38]" />
                  <span>{t.modals.pulse.publish}</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </section>
  );
};
