'use client';

import React, { useState, useEffect } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { MemorialProfile } from '@/types/memorial';
import { 
  X, Radio, Flame, Volume2, VolumeX, MessageSquare, Send, Clock, 
  Users, Heart, PlusCircle, Share2, Sparkles, Check, Play, Pause,
  Headphones, Music, Shield, Compass, Star
} from 'lucide-react';

interface MemorialLiveEventModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorial: MemorialProfile;
}

interface LiveMessage {
  id: string;
  sender: string;
  location: string;
  message: string;
  timeAgo: string;
  candleLit: boolean;
  badge?: string;
}

export const MemorialLiveEventModal: React.FC<MemorialLiveEventModalProps> = ({
  isOpen,
  onClose,
  memorial,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [candleCount, setCandleCount] = useState(memorial.candleCount || 1420);
  const [hasLitInEvent, setHasLitInEvent] = useState(false);
  const [activeParticipants, setActiveParticipants] = useState(34);
  const [newMessage, setNewMessage] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderCity, setSenderCity] = useState('');
  const [extendedHours, setExtendedHours] = useState(0);

  const [liveMessages, setLiveMessages] = useState<LiveMessage[]>([
    {
      id: 'lm-1',
      sender: 'Gulriz & Aydin',
      location: 'Moda, Kadikoy',
      message: 'We grew up listening to your melodies. You will live forever in our hearts, Baris Mancho...',
      timeAgo: 'Just now',
      candleLit: true,
      badge: 'FAMILY FRIEND',
    },
    {
      id: 'lm-2',
      sender: 'Mehmet Eren',
      location: 'Izmir',
      message: 'Gulpembe still resonates across generations. A master who united whole nations.',
      timeAgo: '2 mins ago',
      candleLit: true,
    },
    {
      id: 'lm-3',
      sender: 'Selin Yilmaz',
      location: 'Berlin',
      message: 'A cultural giant who taught us compassion and universal humanity abroad. Rest in peace.',
      timeAgo: '4 mins ago',
      candleLit: true,
      badge: 'GLOBAL VISITOR',
    },
    {
      id: 'lm-4',
      sender: 'Prof. Cemalettin Bey',
      location: 'Ankara',
      message: 'His enduring contributions to music and cultural folklore will enlighten centuries ahead.',
      timeAgo: '7 mins ago',
      candleLit: false,
      badge: 'HISTORIAN',
    },
    {
      id: 'lm-5',
      sender: 'Emir & Can',
      location: 'Eskisehir',
      message: 'From the 7 to 77 generation, with eternal gratitude. You will never be forgotten.',
      timeAgo: '11 mins ago',
      candleLit: true,
    }
  ]);

  // Simulated live participant fluctuations
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setActiveParticipants(prev => Math.max(22, prev + Math.floor(Math.random() * 5) - 2));
    }, 4000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLightCandleInEvent = () => {
    if (hasLitInEvent) return;
    setCandleCount(prev => prev + 1);
    setHasLitInEvent(true);
    
    // Add real-time bubble
    const newBubble: LiveMessage = {
      id: `lm-${Date.now()}`,
      sender: senderName.trim() || 'A Reverent Visitor',
      location: senderCity.trim() || 'Global',
      message: 'Kindled an eternal memorial flame in heartfelt tribute.',
      timeAgo: 'Just now',
      candleLit: true,
      badge: 'MEMORIAL PATRON'
    };
    setLiveMessages(prev => [newBubble, ...prev]);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newBubble: LiveMessage = {
      id: `lm-${Date.now()}`,
      sender: senderName.trim() || 'A Tribute Friend',
      location: senderCity.trim() || 'London',
      message: newMessage.trim(),
      timeAgo: 'Just now',
      candleLit: hasLitInEvent,
    };

    setLiveMessages(prev => [newBubble, ...prev]);
    setNewMessage('');
  };

  return (
    <div data-modal="overlay" className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      {/* Immersive Midnight Sanctuary Chamber */}
      <div data-modal="panel" className="bg-[#0D1117] text-[#F0F6FC] border-2 border-[#30363D] w-full max-w-5xl max-h-[94vh] flex flex-col shadow-2xl rounded-sm overflow-hidden ring-1 ring-white/10">
        
        {/* Sanctuary Masthead */}
        <div className="p-4 sm:p-5 border-b border-[#21262D] bg-[#161B22] flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-11 h-11 rounded-full bg-[#238636]/20 border border-[#238636] text-[#3FB950] flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(35,134,54,0.35)]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono uppercase tracking-[0.25em] bg-[#1F6FEB] text-white px-2 py-0.5 font-bold rounded-xs">{t.modals.liveEvent.badge}</span>
                <span className="text-xs font-mono text-[#8B949E] hidden sm:inline-block">{t.modals.liveEvent.subtitle}</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-black text-[#F0F6FC] mt-0.5 flex items-center gap-2">
                <span>{memorial.fullName} Commemoration Assembly</span>
                <span className="text-xs font-mono font-normal text-[#F3BE38] border border-[#F3BE38]/40 px-2 py-0.5 rounded-full bg-[#F3BE38]/10 hidden md:inline-block">{t.modals.liveEvent.streamActive}</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-9 h-9 border border-[#30363D] bg-[#21262D] hover:bg-[#DA3633] text-[#C9D1D9] hover:text-white flex items-center justify-center transition rounded-xs"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Ambient Acoustic Broadcast Bar */}
        <div className="bg-[#0A0D12] border-b border-[#21262D] px-4 py-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#8957E5] hover:bg-[#A371F7] text-white font-bold transition rounded-xs shadow-[0_0_12px_rgba(137,87,229,0.4)]"
            >
              {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              <span>{isPlayingAudio ? 'Pause Memorial Melody' : 'Play Memorial Melody'}</span>
            </button>
            
            <div className="flex items-center gap-2 text-[11px] text-[#C9D1D9] bg-[#161B22] px-3 py-1 rounded-xs border border-[#30363D]">
              <Headphones className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>{t.modals.liveEvent.ensembleLabel}<em>{t.modals.liveEvent.ensembleTrack}</em></span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#8B949E]">
            <span className="flex items-center gap-1.5 font-bold text-[#3FB950]">
              <Users className="w-3.5 h-3.5" />
              {activeParticipants} Tribute Guests Online
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5 text-[#E3B341]">
              <Clock className="w-3.5 h-3.5" />
              Chamber Open For: {6 + extendedHours} Hours Remaining
            </span>
          </div>
        </div>

        {/* Chamber Body: Left Pillar (Altar & Rituals), Right Pillar (Live Flow Stream) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#21262D]">
          
          {/* Left Altar (5 Cols) */}
          <div className="lg:col-span-5 p-5 sm:p-6 bg-[#0D1117] space-y-6 flex flex-col justify-between">
            <div className="space-y-5">
              
              {/* Profile Card with Glow */}
              <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-xs flex items-center gap-4 relative overflow-hidden shadow-md">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#8957E5]/10 rounded-full blur-xl pointer-events-none"></div>
                <img
                  src={memorial.heroImage}
                  alt={memorial.fullName}
                  referrerPolicy="no-referrer"
                  className="w-18 h-22 object-cover border border-[#30363D] rounded-xs shadow-md shrink-0"
                />
                <div className="relative z-10">
                  <span className="text-[9px] font-mono text-[#F3BE38] uppercase tracking-widest font-bold block mb-0.5">{t.modals.liveEvent.heritage}</span>
                  <h3 className="font-serif font-bold text-lg text-[#F0F6FC] leading-tight">
                    {memorial.fullName}
                  </h3>
                  <p className="text-xs font-serif text-[#8B949E] italic">
                    {memorial.profession}
                  </p>
                  <p className="text-[11px] font-mono text-[#58A6FF] mt-1 font-semibold">
                    {memorial.birthDate} — {memorial.deathDate}
                  </p>
                </div>
              </div>

              {/* Candle Altar Box */}
              <div className="p-5 bg-gradient-to-b from-[#1C2128] to-[#161B22] border border-[#30363D] rounded-xs text-center space-y-4 shadow-inner">
                <div className="flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 ${
                    hasLitInEvent 
                      ? 'bg-[#F3BE38]/20 text-[#F3BE38] ring-4 ring-[#F3BE38]/40 shadow-[0_0_30px_rgba(243,190,56,0.4)]' 
                      : 'bg-[#21262D] text-[#8B949E] border border-[#30363D]'
                  }`}>
                    <Flame className={`w-8 h-8 ${hasLitInEvent ? 'fill-[#F3BE38] animate-bounce' : ''}`} />
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold font-mono text-[#F0F6FC] tracking-tight">
                    {candleCount} Memorial Candles Kindled
                  </div>
                  <p className="text-xs font-serif text-[#8B949E] italic mt-1 max-w-xs mx-auto">{t.modals.liveEvent.archivalNote}</p>
                </div>

                <button
                  onClick={handleLightCandleInEvent}
                  disabled={hasLitInEvent}
                  className={`w-full py-3 text-xs font-mono uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 rounded-xs shadow-md ${
                    hasLitInEvent
                      ? 'bg-[#238636] text-white cursor-default'
                      : 'bg-[#D29922] hover:bg-[#E3B341] text-[#0D1117] hover:scale-[1.02]'
                  }`}
                >
                  {hasLitInEvent ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.modals.liveEvent.kindled}</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 text-[#0D1117] fill-current" />
                      <span>{t.modals.liveEvent.lightFlame}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Extend Vigil Chamber */}
              <div className="p-4 bg-[#161B22] border border-[#30363D] rounded-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#F0F6FC] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#58A6FF]" />{t.modals.liveEvent.extendTitle}</span>
                  <span className="text-[10px] text-[#8B949E]">{t.modals.liveEvent.custodianControl}</span>
                </div>
                <p className="text-[11px] font-serif text-[#8B949E] leading-relaxed">{t.modals.liveEvent.extendBody}</p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setExtendedHours(prev => prev + 12)}
                    className="flex-1 py-1.5 px-2 bg-[#21262D] border border-[#30363D] hover:border-[#58A6FF] text-[10px] font-mono font-bold text-[#C9D1D9] hover:text-white transition rounded-xs text-center"
                  >{t.modals.liveEvent.extend12}</button>
                  <button
                    onClick={() => setExtendedHours(prev => prev + 24)}
                    className="flex-1 py-1.5 px-2 bg-[#21262D] border border-[#30363D] hover:border-[#58A6FF] text-[10px] font-mono font-bold text-[#C9D1D9] hover:text-white transition rounded-xs text-center"
                  >{t.modals.liveEvent.extend24}</button>
                </div>
              </div>

            </div>

            <div className="text-[10px] font-mono text-[#6E7681] text-center pt-2">
              REMEMBERED SANCTUARY ID &bull; #{memorial.id.toUpperCase()}-LIVE-VIGIL
            </div>
          </div>

          {/* Right Live Stream Chamber (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col h-[560px] bg-[#0A0D12]">
            
            {/* Feed Header */}
            <div className="p-4 border-b border-[#21262D] bg-[#161B22] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#238636] animate-ping"></span>
                <span className="text-[11px] font-mono uppercase tracking-widest text-[#C9D1D9] font-bold">
                  LIVE STREAM CONDOLENCES & TRIBUTES ({liveMessages.length})
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-2 py-0.5 rounded-xs">{t.modals.liveEvent.activeFeed}</span>
            </div>

            {/* Scrollable Message Bubbles */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0A0D12]">
              {liveMessages.map((msg) => (
                <div 
                  key={msg.id}
                  className="p-3.5 bg-[#161B22] border border-[#30363D] rounded-xs shadow-xs hover:border-[#58A6FF] transition group"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#F0F6FC]">{msg.sender}</span>
                      <span className="text-[10px] text-[#8B949E]">({msg.location})</span>
                      {msg.badge && (
                        <span className="text-[8px] font-mono px-1.5 py-0.2 bg-[#30363D] text-[#58A6FF] rounded-xs font-semibold">
                          {msg.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[#D29922]">
                      {msg.candleLit && (
                        <span className="flex items-center gap-1 bg-[#21262D] px-1.5 py-0.5 border border-[#30363D] text-[#E3B341]">
                          <Flame className="w-3 h-3 fill-current" />{t.modals.liveEvent.candleLit}</span>
                      )}
                      <span className="text-[#6E7681]">{msg.timeAgo}</span>
                    </div>
                  </div>
                  <p className="text-xs font-serif text-[#C9D1D9] leading-relaxed">
                    &ldquo;{msg.message}&rdquo;
                  </p>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-[#21262D] bg-[#161B22] space-y-2.5">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder={t.modals.liveEvent.namePlaceholder}
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="p-2 text-xs border border-[#30363D] bg-[#0D1117] text-[#F0F6FC] placeholder-[#6E7681] focus:outline-hidden focus:border-[#58A6FF] font-serif rounded-xs"
                />
                <input
                  type="text"
                  placeholder={t.modals.liveEvent.locationPlaceholder}
                  value={senderCity}
                  onChange={(e) => setSenderCity(e.target.value)}
                  className="p-2 text-xs border border-[#30363D] bg-[#0D1117] text-[#F0F6FC] placeholder-[#6E7681] focus:outline-hidden focus:border-[#58A6FF] font-serif rounded-xs"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={t.modals.liveEvent.messagePlaceholder}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 p-2 text-xs border border-[#30363D] bg-[#0D1117] text-[#F0F6FC] placeholder-[#6E7681] focus:outline-hidden focus:border-[#58A6FF] font-serif rounded-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#238636] hover:bg-[#2EA043] text-white text-xs font-mono uppercase tracking-wider font-bold transition flex items-center gap-1.5 shadow-md rounded-xs"
                >
                  <span>{t.modals.liveEvent.transmit}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

          </div>

        </div>

      </div>
    </div>
  );
};
