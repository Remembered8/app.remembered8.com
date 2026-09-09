'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language, TRANSLATIONS } from '@/lib/i18n';
import { memorialUrl } from '@/lib/deepLink';
import { MemorialProfile } from '@/types/memorial';
import { 
  Smartphone, 
  Square, 
  Tv, 
  Download, 
  Share2, 
  Copy, 
  Check, 
  Sparkles, 
  QrCode, 
  Flame, 
  TreePine, 
  Radio, 
  BookOpen, 
  RefreshCw, 
  Sliders, 
  Layers, 
  Feather,
  Globe,
  Camera
} from 'lucide-react';
import QRCode from 'qrcode';

interface SocialMediaStudioModalProps {
  language?: Language;
  isOpen: boolean;
  onClose: () => void;
  memorials: MemorialProfile[];
  initialMemorial?: MemorialProfile;
}

type AspectRatio = 'story' | 'square' | 'banner';
type ThemeStyle = 'emerald' | 'parchment' | 'carbon' | 'terracotta';
type ContentTemplate = 'in_memoriam' | 'anniversary' | 'tree_donation' | 'quote_focus';

export const SocialMediaStudioModal: React.FC<SocialMediaStudioModalProps> = ({
  isOpen,
  onClose,
  memorials,
  initialMemorial,
  language = 'en',
}) => {
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const [selectedMemorialId, setSelectedMemorialId] = useState<string>(
    initialMemorial?.id || memorials[0]?.id || 'baris-manco'
  );
  
  const currentMemorial = memorials.find(m => m.id === selectedMemorialId) || initialMemorial || memorials[0];

  // Studio configuration states
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('story');
  const [theme, setTheme] = useState<ThemeStyle>('emerald');
  const [template, setTemplate] = useState<ContentTemplate>('in_memoriam');
  
  // Customization inputs
  const [customQuote, setCustomQuote] = useState('');
  const [customSubheading, setCustomSubheading] = useState('');
  const [showQrCode, setShowQrCode] = useState(true);
  const [showArchivalStamp, setShowArchivalStamp] = useState(true);
  const [showGoldFrame, setShowGoldFrame] = useState(true);
  
  // Export & copy states
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isExporting, setIsExporting] = useState(false);
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Sync initial memorial or reset fields
  useEffect(() => {
    if (currentMemorial) {
      setCustomQuote(currentMemorial.lifeQuote || '');
      if (template === 'anniversary') {
        setCustomSubheading('Commemorating in Everlasting Honor, Remembrance and Eternal Love');
      } else if (template === 'tree_donation') {
        setCustomSubheading('Living in Perpetual Remembrance through the Memorial Forest Grove');
      } else {
        setCustomSubheading(currentMemorial.profession || 'Official Living Archive & Heritage Registry');
      }
    }
  }, [currentMemorial, template]);

  // Generate QR Code data URL
  useEffect(() => {
    if (!currentMemorial) return;
    const profileUrl = memorialUrl(currentMemorial.id);
    
    QRCode.toDataURL(profileUrl, {
      width: 280,
      margin: 1,
      color: {
        dark: theme === 'emerald' || theme === 'carbon' || theme === 'terracotta' ? '#FFFFFF' : '#111111',
        light: '#00000000', // transparent background
      },
    })
      .then(setQrDataUrl)
      .catch((err) => console.error('QR Generation error:', err));
  }, [currentMemorial, theme]);

  if (!isOpen || !currentMemorial) return null;

  // Social media text caption generator
  const generateCaption = () => {
    const name = currentMemorial.fullName;
    const quote = customQuote || currentMemorial.lifeQuote;
    const url = memorialUrl(currentMemorial.id);

    switch (template) {
      case 'anniversary':
        return `🕯️ "${quote}"\n\nHonoring the timeless legacy of ${name} (${currentMemorial.birthDate} - ${currentMemorial.deathDate}) with perpetual respect, love, and gratitude on this anniversary of remembrance.\n\nTo kindle an eternal flame, listen to verified voice archives, and leave a tribute:\n👉 ${url}\n\n#${name.replace(/\s+/g, '')} #Remembered #InMemoriam #Legacy #LivingArchive`;
      
      case 'tree_donation':
        return `🌱 "${quote}"\n\nLiving saplings planted in honor of ${name} at the Remembered Heritage Grove are providing clean air and shade for future generations.\n\nVisit the memorial registry to contribute a memorial tree:\n👉 ${url}\n\n#${name.replace(/\s+/g, '')} #MemorialForest #Remembered #GreenLegacy`;

      case 'quote_focus':
        return `📜 "${quote}" — ${name}\n\nTheir timeless thoughts, philosophy, and contributions continue to inspire in the Remembered Living Archive.\n\nExplore the complete registry and lineage tree:\n👉 ${url}\n\n#${name.replace(/\s+/g, '')} #Remembered #Philosophy #TimelessLegacy`;

      case 'in_memoriam':
      default:
        return `🕊️ "${quote}"\n\n${name} (${currentMemorial.birthDate} - ${currentMemorial.deathDate})\n\nThe complete living chronicle—including verified oral recordings, historical timeline, and family memories—is permanently preserved on Remembered.\n\nTo light a candle or write a tribute in the family ledger:\n👉 ${url}\n\n#${name.replace(/\s+/g, '')} #Remembered #HumanHeritage #PerpetualArchive`;
    }
  };

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(generateCaption());
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(memorialUrl(currentMemorial.id));
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  // High-Resolution Direct HTML5 Canvas Render & Download
  const handleDownloadImage = async () => {
    setIsExporting(true);
    try {
      // Dimensions based on format
      let width = 1080;
      let height = 1920; // 9:16 Story
      if (aspectRatio === 'square') {
        height = 1080; // 1:1 Post
      } else if (aspectRatio === 'banner') {
        height = 608; // 16:9 Banner
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Fill & Gradients
      if (theme === 'emerald') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#0F291E');
        grad.addColorStop(0.5, '#143628');
        grad.addColorStop(1, '#0A1F16');
        ctx.fillStyle = grad;
      } else if (theme === 'parchment') {
        ctx.fillStyle = '#FAF7F0';
      } else if (theme === 'carbon') {
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#18181B');
        grad.addColorStop(1, '#09090B');
        ctx.fillStyle = grad;
      } else {
        // terracotta
        const grad = ctx.createLinearGradient(0, 0, width, height);
        grad.addColorStop(0, '#2A1810');
        grad.addColorStop(1, '#1A0E0A');
        ctx.fillStyle = grad;
      }
      ctx.fillRect(0, 0, width, height);

      // 2. Decorative Border & Corners
      const margin = 40;
      const isDark = theme !== 'parchment';
      const primaryColor = isDark ? '#FAF8F5' : '#111111';
      const goldColor = '#F3BE38';
      const mutedColor = isDark ? '#A7F3D0' : '#666666';

      if (showGoldFrame) {
        ctx.strokeStyle = isDark ? '#235E45' : '#D6CBB8';
        ctx.lineWidth = 4;
        ctx.strokeRect(margin, margin, width - margin * 2, height - margin * 2);

        ctx.strokeStyle = goldColor;
        ctx.lineWidth = 1.5;
        ctx.strokeRect(margin + 8, margin + 8, width - (margin + 8) * 2, height - (margin + 8) * 2);
      }

      // 3. Header Stamp
      ctx.fillStyle = goldColor;
      ctx.font = 'bold 22px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('REMEMBERED • PERPETUAL LIVING ARCHIVE', width / 2, margin + 50);

      // 4. Portrait Image (Load asynchronously)
      const loadImg = (src: string): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error('Img load failed'));
          img.src = src;
        });
      };

      try {
        const heroImg = await loadImg(currentMemorial.heroImage);
        
        let imgX = width / 2 - 170;
        let imgY = margin + 90;
        let imgW = 340;
        let imgH = 380;

        if (aspectRatio === 'square') {
          imgX = width / 2 - 150;
          imgY = margin + 80;
          imgW = 300;
          imgH = 340;
        } else if (aspectRatio === 'banner') {
          imgX = margin + 50;
          imgY = margin + 80;
          imgW = 280;
          imgH = 320;
        }

        ctx.save();
        // Rounded clip for image
        ctx.beginPath();
        ctx.roundRect(imgX, imgY, imgW, imgH, 12);
        ctx.clip();
        ctx.drawImage(heroImg, imgX, imgY, imgW, imgH);
        ctx.restore();

        // Image frame
        ctx.strokeStyle = goldColor;
        ctx.lineWidth = 3;
        ctx.strokeRect(imgX, imgY, imgW, imgH);
      } catch (err) {
        console.warn('Canvas image fallback applied', err);
      }

      // 5. Titles and Typography
      let textCenterY = aspectRatio === 'story' ? height / 2 + 100 : aspectRatio === 'square' ? height / 2 + 100 : height / 2;
      let textCenterX = aspectRatio === 'banner' ? width / 2 + 120 : width / 2;

      ctx.fillStyle = primaryColor;
      ctx.font = 'bold 54px "Playfair Display", serif';
      ctx.textAlign = 'center';
      ctx.fillText(currentMemorial.fullName, textCenterX, textCenterY);

      // Dates
      ctx.fillStyle = goldColor;
      ctx.font = '600 24px "JetBrains Mono", monospace';
      ctx.fillText(`${currentMemorial.birthDate} — ${currentMemorial.deathDate}`, textCenterX, textCenterY + 50);

      // Subheading / Title
      ctx.fillStyle = mutedColor;
      ctx.font = 'italic 26px "Playfair Display", serif';
      ctx.fillText(customSubheading || currentMemorial.profession, textCenterX, textCenterY + 95);

      // Quote in double quotes
      const quoteText = `"${customQuote || currentMemorial.lifeQuote}"`;
      ctx.fillStyle = primaryColor;
      ctx.font = 'italic 30px "Playfair Display", serif';
      
      // Basic text wrapping for quote
      const maxQuoteWidth = aspectRatio === 'banner' ? 520 : 860;
      const words = quoteText.split(' ');
      let line = '';
      let quoteY = textCenterY + 160;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxQuoteWidth && n > 0) {
          ctx.fillText(line, textCenterX, quoteY);
          line = words[n] + ' ';
          quoteY += 44;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, textCenterX, quoteY);

      // 6. QR Code overlay at bottom
      if (showQrCode && qrDataUrl) {
        try {
          const qrImg = await loadImg(qrDataUrl);
          const qrSize = aspectRatio === 'banner' ? 120 : 150;
          const qrX = width / 2 - qrSize / 2;
          const qrY = height - margin - qrSize - 40;

          ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize);

          ctx.fillStyle = goldColor;
          ctx.font = 'bold 16px "JetBrains Mono", monospace';
          ctx.fillText('SCAN TO VISIT MEMORIAL • PRESERVE LEGACY', width / 2, height - margin - 15);
        } catch (e) {
          console.warn('QR code draw error', e);
        }
      }

      // Download anchor trigger
      const dataUrl = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `remembered-${currentMemorial.id}-${aspectRatio}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export error:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Web Share API
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentMemorial.fullName} — Remembered Living Memorial`,
          text: generateCaption(),
          url: memorialUrl(currentMemorial.id),
        });
      } catch (err) {
        console.log('Share canceled or failed', err);
      }
    } else {
      handleCopyCaption();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] text-[#1E1B18] border-2 border-[#1E1B18] max-w-6xl w-full p-5 sm:p-8 shadow-2xl my-6 max-h-[96vh] flex flex-col rounded-xs overflow-hidden">
        
        {/* Top Masthead Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D6CBB8] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#1E1B18] text-[#F3BE38] flex items-center justify-center border border-[#1E1B18] shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-[#8C6239] bg-[#EAE2D2] px-2 py-0.5 rounded-2xs">{t.modals.studioModal.badge}</span>
                <span className="text-[10px] font-mono text-[#059669] flex items-center gap-1 font-bold hidden sm:inline-flex">
                  <Sparkles className="w-3 h-3" />{t.modals.studioModal.resolution}</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-black text-[#1E1B18]">{t.modals.studioModal.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-[#1E1B18] hover:bg-[#1E1B18] hover:text-white px-3 py-1.5 border border-[#1E1B18] transition rounded-xs font-bold cursor-pointer"
          >{t.modals.studioModal.close}</button>
        </div>

        {/* 2-Column Main Studio Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 flex-1 min-h-0 overflow-y-auto pr-1">
          
          {/* ========================================================================= */}
          {/* LEFT: CONTROLS & CUSTOMIZATION TOOLS (5 cols)                            */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* 1. Select Memorial Profile */}
            <div className="bg-white p-4 border border-[#D6CBB8] rounded-xs shadow-2xs space-y-2">
              <label className="block text-xs font-mono uppercase text-[#1E1B18] font-bold">{t.modals.studioModal.selectSubject}</label>
              <select
                value={selectedMemorialId}
                onChange={(e) => setSelectedMemorialId(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-[#FAF8F5] border border-[#1E1B18]/40 focus:border-[#1E1B18] text-[#1E1B18] font-serif font-bold rounded-xs cursor-pointer"
              >
                {memorials.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.fullName} ({m.profession})
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Format / Aspect Ratio Selector */}
            <div className="bg-white p-4 border border-[#D6CBB8] rounded-xs shadow-2xs space-y-2">
              <label className="block text-xs font-mono uppercase text-[#1E1B18] font-bold flex items-center justify-between">
                <span>{t.modals.studioModal.outputFormat}</span>
                <span className="text-[#8C6239] text-[10px]">{aspectRatio === 'story' ? '9:16 (Story/Reels)' : aspectRatio === 'square' ? '1:1 (Square Post)' : '16:9 (Landscape Banner)'}</span>
              </label>
              
              <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setAspectRatio('story')}
                  className={`p-2.5 border flex flex-col items-center gap-1.5 rounded-xs transition cursor-pointer ${
                    aspectRatio === 'story'
                      ? 'bg-[#1E1B18] text-[#F3BE38] border-[#1E1B18] font-bold shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5C5346] border-[#D6CBB8] hover:border-[#1E1B18]'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="text-[11px]">{t.modals.studioModal.formatStory}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('square')}
                  className={`p-2.5 border flex flex-col items-center gap-1.5 rounded-xs transition cursor-pointer ${
                    aspectRatio === 'square'
                      ? 'bg-[#1E1B18] text-[#F3BE38] border-[#1E1B18] font-bold shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5C5346] border-[#D6CBB8] hover:border-[#1E1B18]'
                  }`}
                >
                  <Square className="w-4 h-4" />
                  <span className="text-[11px]">{t.modals.studioModal.formatSquare}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAspectRatio('banner')}
                  className={`p-2.5 border flex flex-col items-center gap-1.5 rounded-xs transition cursor-pointer ${
                    aspectRatio === 'banner'
                      ? 'bg-[#1E1B18] text-[#F3BE38] border-[#1E1B18] font-bold shadow-xs'
                      : 'bg-[#FAF8F5] text-[#5C5346] border-[#D6CBB8] hover:border-[#1E1B18]'
                  }`}
                >
                  <Tv className="w-4 h-4" />
                  <span className="text-[11px]">{t.modals.studioModal.formatBanner}</span>
                </button>
              </div>
            </div>

            {/* 3. Theme Selector */}
            <div className="bg-white p-4 border border-[#D6CBB8] rounded-xs shadow-2xs space-y-2">
              <label className="block text-xs font-mono uppercase text-[#1E1B18] font-bold">{t.modals.studioModal.themeLabel}</label>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTheme('emerald')}
                  className={`p-2 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                    theme === 'emerald'
                      ? 'bg-[#0F291E] text-[#A7F3D0] border-[#34D399] font-bold ring-2 ring-[#34D399]/40'
                      : 'bg-[#0F291E]/90 text-[#D1E7DD] border-[#1E4D38]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border border-[#F3BE38]"></span>
                  <span>{t.modals.studioModal.themeEmerald}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('parchment')}
                  className={`p-2 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                    theme === 'parchment'
                      ? 'bg-[#FAF7F0] text-[#111111] border-[#111111] font-bold ring-2 ring-[#111111]/30'
                      : 'bg-[#FAF7F0] text-[#5C5346] border-[#D6CBB8]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#FAF7F0] border border-[#111111]"></span>
                  <span>{t.modals.studioModal.themeCream}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('carbon')}
                  className={`p-2 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                    theme === 'carbon'
                      ? 'bg-[#18181B] text-white border-white font-bold ring-2 ring-white/30'
                      : 'bg-[#18181B] text-white/70 border-zinc-700'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-zinc-900 border border-zinc-400"></span>
                  <span>{t.modals.studioModal.themeCarbon}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTheme('terracotta')}
                  className={`p-2 border flex items-center gap-2 rounded-xs transition cursor-pointer ${
                    theme === 'terracotta'
                      ? 'bg-[#2A1810] text-[#E7C697] border-[#E7C697] font-bold ring-2 ring-[#E7C697]/40'
                      : 'bg-[#2A1810] text-[#E7C697]/80 border-[#4E2D1F]'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-[#2A1810] border border-[#E7C697]"></span>
                  <span>{t.modals.studioModal.themeTerracotta}</span>
                </button>
              </div>
            </div>

            {/* 4. Template Concept */}
            <div className="bg-white p-4 border border-[#D6CBB8] rounded-xs shadow-2xs space-y-2">
              <label className="block text-xs font-mono uppercase text-[#1E1B18] font-bold">{t.modals.studioModal.templateLabel}</label>
              
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setTemplate('in_memoriam')}
                  className={`p-2 border flex items-center gap-1.5 rounded-xs transition cursor-pointer text-left ${
                    template === 'in_memoriam'
                      ? 'bg-[#FEF3C7] border-[#F59E0B] text-[#92400E] font-bold'
                      : 'bg-[#FAF8F5] border-[#D6CBB8] text-[#5C5346]'
                  }`}
                >
                  <Flame className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="truncate">{t.modals.studioModal.templateMemoriam}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTemplate('anniversary')}
                  className={`p-2 border flex items-center gap-1.5 rounded-xs transition cursor-pointer text-left ${
                    template === 'anniversary'
                      ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#5B21B6] font-bold'
                      : 'bg-[#FAF8F5] border-[#D6CBB8] text-[#5C5346]'
                  }`}
                >
                  <Radio className="w-3.5 h-3.5 text-[#7C3AED] shrink-0" />
                  <span className="truncate">{t.modals.studioModal.templateAnniversary}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTemplate('tree_donation')}
                  className={`p-2 border flex items-center gap-1.5 rounded-xs transition cursor-pointer text-left ${
                    template === 'tree_donation'
                      ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46] font-bold'
                      : 'bg-[#FAF8F5] border-[#D6CBB8] text-[#5C5346]'
                  }`}
                >
                  <TreePine className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span className="truncate">{t.modals.studioModal.templateForest}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setTemplate('quote_focus')}
                  className={`p-2 border flex items-center gap-1.5 rounded-xs transition cursor-pointer text-left ${
                    template === 'quote_focus'
                      ? 'bg-[#FFE4E6] border-[#E11D48] text-[#9F1239] font-bold'
                      : 'bg-[#FAF8F5] border-[#D6CBB8] text-[#5C5346]'
                  }`}
                >
                  <Feather className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                  <span className="truncate">{t.modals.studioModal.templateWisdom}</span>
                </button>
              </div>
            </div>

            {/* 5. Custom Quote & Subtitle Fields */}
            <div className="bg-white p-4 border border-[#D6CBB8] rounded-xs shadow-2xs space-y-3">
              <div>
                <label className="block text-xs font-mono uppercase text-[#1E1B18] font-bold mb-1">{t.modals.studioModal.quoteLabel}</label>
                <textarea
                  rows={2}
                  value={customQuote}
                  onChange={(e) => setCustomQuote(e.target.value)}
                  placeholder={t.modals.studioModal.quotePlaceholder}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#1E1B18]/30 focus:border-[#1E1B18] text-[#1E1B18] font-serif rounded-xs"
                />
              </div>

              {/* Toggles */}
              <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#EDE5D8] text-xs font-mono text-[#5C5346]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showQrCode}
                    onChange={(e) => setShowQrCode(e.target.checked)}
                    className="accent-[#1E1B18]"
                  />
                  <span>{t.modals.studioModal.qrToggle}</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showGoldFrame}
                    onChange={(e) => setShowGoldFrame(e.target.checked)}
                    className="accent-[#1E1B18]"
                  />
                  <span>{t.modals.studioModal.frameToggle}</span>
                </label>
              </div>
            </div>

          </div>


          {/* ========================================================================= */}
          {/* RIGHT: LIVE CARD PREVIEW & INSTANT EXPORT BUTTONS (7 cols)                */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col items-center justify-between space-y-5">
            
            {/* Live Visual Card Stage Container */}
            <div className="w-full flex items-center justify-center p-4 bg-[#EDE5D8]/50 border-2 border-dashed border-[#D6CBB8] rounded-xs min-h-[460px] overflow-hidden">
              
              {/* Dynamic Aspect Ratio Canvas Mockup */}
              <div 
                className={`transition-all duration-300 relative p-6 sm:p-8 flex flex-col justify-between shadow-2xl overflow-hidden rounded-xs border-2 select-none ${
                  aspectRatio === 'story' 
                    ? 'w-[280px] sm:w-[320px] aspect-[9/16]' 
                    : aspectRatio === 'square' 
                      ? 'w-[320px] sm:w-[360px] aspect-square' 
                      : 'w-full max-w-[500px] aspect-[16/9]'
                } ${
                  theme === 'emerald'
                    ? 'bg-gradient-to-br from-[#0F291E] via-[#143628] to-[#0A1F16] text-[#FAF8F5] border-[#235E45]'
                    : theme === 'parchment'
                      ? 'bg-[#FAF7F0] text-[#111111] border-[#111111]'
                      : theme === 'carbon'
                        ? 'bg-gradient-to-br from-[#18181B] to-[#09090B] text-white border-zinc-700'
                        : 'bg-gradient-to-br from-[#2A1810] to-[#1A0E0A] text-[#E7C697] border-[#4E2D1F]'
                }`}
              >
                {/* Decorative Gold Frame Border */}
                {showGoldFrame && (
                  <div className={`absolute inset-2 border pointer-events-none rounded-2xs ${
                    theme === 'emerald' ? 'border-[#F3BE38]/60' : theme === 'parchment' ? 'border-[#111111]/40' : 'border-[#F3BE38]/40'
                  }`}></div>
                )}

                {/* Top Header Tag & Archive ID */}
                <div className="relative z-10 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-widest uppercase">
                  <span className={`font-bold px-2 py-0.5 rounded-2xs ${
                    theme === 'emerald' ? 'bg-[#091811] text-[#F3BE38] border border-[#235E45]' : theme === 'parchment' ? 'bg-[#111111] text-white' : 'bg-black text-white'
                  }`}>{t.modals.studioModal.brandLine}</span>

                  <span className="opacity-70">
                    REGISTRY #{currentMemorial.id}
                  </span>
                </div>

                {/* Center Content Section */}
                <div className="relative z-10 my-auto flex flex-col items-center text-center space-y-2.5">
                  
                  {/* Portrait Avatar */}
                  <div className="relative">
                    <img
                      src={currentMemorial.heroImage}
                      alt={currentMemorial.fullName}
                      referrerPolicy="no-referrer"
                      className={`object-cover rounded-xs border-2 shadow-lg ${
                        aspectRatio === 'banner' ? 'w-16 h-16 sm:w-20 sm:h-20' : 'w-24 h-28 sm:w-28 sm:h-32'
                      } ${
                        theme === 'emerald' ? 'border-[#F3BE38]' : theme === 'parchment' ? 'border-[#111111]' : 'border-zinc-400'
                      }`}
                    />
                    
                    {/* Live Badge */}
                    <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                      <span className="px-2 py-0.2 bg-[#D97706] text-white text-[7px] font-mono font-bold tracking-wider uppercase rounded-full shadow-xs">{t.modals.studioModal.livingLegacy}</span>
                    </div>
                  </div>

                  {/* Name & Life Dates */}
                  <div className="space-y-0.5 pt-1">
                    <h4 className={`font-serif-display font-black tracking-tight leading-tight ${
                      aspectRatio === 'banner' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                    } ${
                      theme === 'emerald' ? 'text-[#FAF8F5]' : theme === 'parchment' ? 'text-[#111111]' : 'text-white'
                    }`}>
                      {currentMemorial.fullName}
                    </h4>

                    <div className="text-[9px] sm:text-[10px] font-mono font-bold text-[#F3BE38]">
                      {currentMemorial.birthDate} &mdash; {currentMemorial.deathDate}
                    </div>

                    <p className={`text-[10px] sm:text-[11px] font-serif italic ${
                      theme === 'emerald' ? 'text-[#D1E7DD]' : theme === 'parchment' ? 'text-[#555555]' : 'text-zinc-300'
                    }`}>
                      {customSubheading}
                    </p>
                  </div>

                  {/* Quote Block */}
                  {customQuote && (
                    <blockquote className={`px-2 text-[11px] sm:text-xs font-serif italic leading-relaxed line-clamp-3 ${
                      theme === 'emerald' ? 'text-[#FAF8F5]' : theme === 'parchment' ? 'text-[#222222]' : 'text-zinc-100'
                    }`}>
                      &ldquo;{customQuote}&rdquo;
                    </blockquote>
                  )}
                </div>

                {/* Bottom Footer & QR Code Bar */}
                <div className="relative z-10 pt-2 border-t border-current/20 flex items-center justify-between gap-2">
                  <div className="text-left space-y-0.5">
                    <span className="text-[7px] sm:text-[8px] font-mono uppercase tracking-wider block opacity-75">{t.modals.studioModal.archiveLink}</span>
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold text-[#F3BE38] block truncate max-w-[180px]">
                      remembered.app/?id={currentMemorial.id}
                    </span>
                  </div>

                  {showQrCode && qrDataUrl && (
                    <div className="p-1 bg-white rounded-xs shadow-xs shrink-0">
                      <img
                        src={qrDataUrl}
                        alt="QR Code"
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                      />
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Quick Export & Action Toolbars */}
            <div className="w-full space-y-3">
              
              {/* Main Download & Native Share Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleDownloadImage}
                  disabled={isExporting}
                  className="px-6 py-3.5 bg-[#1E1B18] hover:bg-[#38312A] text-white font-mono text-xs uppercase tracking-wider font-black transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 rounded-xs border border-[#1E1B18] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer disabled:opacity-50"
                  id="studio-download-png-btn"
                >
                  <Download className={`w-4 h-4 text-[#F3BE38] ${isExporting ? 'animate-bounce' : ''}`} />
                  <span>{isExporting ? 'GENERATING GRAPHIC...' : 'DOWNLOAD HIGH-RES (PNG)'}</span>
                </button>

                <button
                  onClick={handleNativeShare}
                  className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-mono text-xs uppercase tracking-wider font-black transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2 rounded-xs border border-[#F59E0B] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                  id="studio-native-share-btn"
                >
                  <Share2 className="w-4 h-4 text-[#FEF3C7]" />
                  <span>{t.modals.studioModal.share}</span>
                </button>
              </div>

              {/* Instagram / Twitter Post Caption Copy Bar */}
              <div className="p-3.5 bg-white border border-[#D6CBB8] rounded-xs shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-[#1E1B18] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span>{t.modals.studioModal.captionSection}</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopyLink}
                      className="text-[10px] font-mono text-[#5C5346] hover:text-[#1E1B18] underline cursor-pointer"
                    >
                      {copiedLink ? '✓ Link Copied' : 'Copy URL'}
                    </button>

                    <button
                      onClick={handleCopyCaption}
                      className={`px-2.5 py-1 text-[11px] font-mono rounded-xs border transition flex items-center gap-1 font-bold cursor-pointer ${
                        copiedCaption
                          ? 'bg-[#D1FAE5] border-[#059669] text-[#065F46]'
                          : 'bg-[#FAF8F5] border-[#D6CBB8] text-[#1E1B18] hover:border-[#1E1B18]'
                      }`}
                    >
                      {copiedCaption ? <Check className="w-3.5 h-3.5 text-[#059669]" /> : <Copy className="w-3.5 h-3.5 text-[#8C6239]" />}
                      <span>{copiedCaption ? 'CAPTION COPIED!' : 'COPY CAPTION'}</span>
                    </button>
                  </div>
                </div>

                <p className="text-xs font-serif text-[#5C5346] bg-[#FAF8F5] p-2.5 rounded-xs border border-[#EDE5D8] line-clamp-2 leading-relaxed">
                  {generateCaption()}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
