import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  ArrowLeft,
  ArrowRight,
  Home,
  BookOpen,
  Search,
  Globe,
  Sparkles,
  ChevronDown,
  Layers,
  Box,
  Compass,
  Cpu,
  Monitor,
  Coffee,
  Gamepad2,
  Menu,
  X
} from 'lucide-react';

export type PortalRoute =
  | 'PORTAL_HOME'
  | 'SHOWROOM_HUB'
  | 'BATCH_VIEW'
  | 'CATALOG'
  | 'STUDIO_123'
  | 'PERSIAN_MUQARNAS_WORLD'
  | 'CHRONO_NEBULA_WORLD'
  | 'SCROLL_WORLD_3D'
  | 'AWWWARDS_HERO'
  | 'STUDIO_ELEMENTS_SAMPLE'
  | 'COFFEE_SAMPLE'
  | 'PC_BUILDER_SAMPLE'
  | 'WIKI_GAME_SAMPLE'
  | 'SAMPLE_WEBSITE'
  | 'GLTF_STUDIO'
  | 'VOICE_CALLIGRAPHY';

interface StandardHeaderProps {
  currentRoute: PortalRoute;
  activeBatchTitle?: string;
  onNavigate: (route: PortalRoute) => void;
  onBack: () => void;
  onOpenAiPlaybook: (initialId?: string) => void;
  onOpenSearch: () => void;
}

export default function StandardHeader({
  currentRoute,
  activeBatchTitle,
  onNavigate,
  onBack,
  onOpenAiPlaybook,
  onOpenSearch,
}: StandardHeaderProps) {
  const { language, toggleLanguage } = useStore();
  const isFa = language === 'fa';
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  // Derive human-readable page name for breadcrumb
  const getBreadcrumbLabel = () => {
    switch (currentRoute) {
      case 'PORTAL_HOME':
        return isFa ? 'پورتال اصلی استودیو' : 'Master Portal';
      case 'SHOWROOM_HUB':
        return isFa ? 'هاب دسته‌بندی‌های کاتالوگ' : 'Showroom Hub';
      case 'BATCH_VIEW':
        return activeBatchTitle || (isFa ? 'دسته‌بندی کاتالوگ' : 'Batch View');
      case 'CATALOG':
        return isFa ? 'نمایشگاه کامل ۶۰ قطعه' : 'Complete 60-Item Showroom';
      case 'STUDIO_123':
        return isFa ? 'استودیو ۱۲۳سرویس' : '123Service Studio';
      case 'PERSIAN_MUQARNAS_WORLD':
        return isFa ? 'معماری پارسی مقرنس' : 'Persian Muqarnas 3D';
      case 'CHRONO_NEBULA_WORLD':
        return isFa ? 'ادیسه فضایی زمان' : 'Chrono-Nebula 3D';
      case 'SCROLL_WORLD_3D':
        return isFa ? 'جهان سینمایی ۳بعدی' : '3D Scroll World';
      case 'AWWWARDS_HERO':
        return isFa ? 'هیرو اواردز' : 'Awwwards Editorial Hero';
      case 'COFFEE_SAMPLE':
        return isFa ? '۱۲۳کافی ۳بعدی' : '123 Coffee 3D';
      case 'PC_BUILDER_SAMPLE':
        return isFa ? 'اسمبلر سخت‌افزار' : 'PC Builder Rig';
      case 'WIKI_GAME_SAMPLE':
        return isFa ? 'سوپرسایت ویکی‌گیم' : 'WikiGame Super-Site';
      case 'STUDIO_ELEMENTS_SAMPLE':
        return isFa ? '۲۰ المان ضروری' : '20 Essential UI Elements';
      case 'SAMPLE_WEBSITE':
        return isFa ? 'فروشگاه آورا' : 'Aura Luxury Store';
      case 'GLTF_STUDIO':
        return isFa ? 'استودیو GLTF/GLB' : 'GLTF 3D Studio';
      case 'VOICE_CALLIGRAPHY':
        return isFa ? 'خطاطی صوتی' : 'Voice-to-Calligraphy';
      default:
        return isFa ? 'پروژه' : 'Project';
    }
  };

  const isHome = currentRoute === 'PORTAL_HOME';

  return (
    <header className="sticky top-0 z-50 w-full bg-[#05070c]/90 border-b border-white/10 backdrop-blur-2xl shadow-xl font-['Plus_Jakarta_Sans']">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left Side: Back Button & Breadcrumbs */}
        <div className="flex items-center gap-3">
          {!isHome && (
            <button
              onClick={() => {
                soundFx.playClick(600);
                onBack();
              }}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              title={isFa ? 'بازگشت به صفحه قبل' : 'Go Back'}
            >
              {isFa ? <ArrowRight className="w-4 h-4 text-cyan-400" /> : <ArrowLeft className="w-4 h-4 text-cyan-400" />}
              <span>{isFa ? 'بازگشت' : 'Back'}</span>
            </button>
          )}

          <button
            onClick={() => {
              soundFx.playClick(700);
              onNavigate('PORTAL_HOME');
            }}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            title={isFa ? 'صفحه اصلی پورتال' : 'Portal Home'}
          >
            <Home className="w-4 h-4 text-amber-400" />
          </button>

          {/* Breadcrumb Path */}
          <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-600">/</span>
            <button
              onClick={() => onNavigate('PORTAL_HOME')}
              className="hover:text-white transition-colors"
            >
              {isFa ? 'پورتال اصلی' : 'Portal'}
            </button>
            {!isHome && (
              <>
                <span className="text-zinc-600">/</span>
                <span className="text-cyan-300 font-bold max-w-[200px] truncate">
                  {getBreadcrumbLabel()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Center: Quick Jump Navigation Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              soundFx.playClick(650);
              setIsQuickMenuOpen(!isQuickMenuOpen);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-black/60 hover:bg-black/90 border border-white/10 text-xs font-mono font-semibold flex items-center gap-2 text-zinc-200 transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden md:inline">{isFa ? 'دسترسی سریع به پروژه‌ها' : 'Quick Jump'}</span>
            <span className="md:hidden">{isFa ? 'منو' : 'Menu'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
          </button>

          {/* Dropdown Menu */}
          {isQuickMenuOpen && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-72 bg-[#090b10] border border-cyan-500/30 rounded-2xl p-2 shadow-2xl backdrop-blur-2xl z-50 text-xs font-mono space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-2.5 py-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-white/5">
                {isFa ? 'بخش‌های اصلی پروژه' : 'Main Portals'}
              </div>

              <button
                onClick={() => {
                  soundFx.playClick(700);
                  setIsQuickMenuOpen(false);
                  onNavigate('PORTAL_HOME');
                }}
                className="w-full text-right p-2 rounded-xl hover:bg-white/10 text-zinc-200 flex items-center justify-between"
              >
                <span>🏠 {isFa ? 'پورتال ورودی اصلی' : 'Master Portal Home'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(700);
                  setIsQuickMenuOpen(false);
                  onNavigate('SHOWROOM_HUB');
                }}
                className="w-full text-right p-2 rounded-xl hover:bg-cyan-950/60 text-cyan-300 flex items-center justify-between font-bold"
              >
                <span>🏛️ {isFa ? 'هاب دسته‌بندی‌های کاتالوگ (۱۲ بچ)' : 'Showroom Hub (12 Batches)'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(700);
                  setIsQuickMenuOpen(false);
                  onNavigate('CATALOG');
                }}
                className="w-full text-right p-2 rounded-xl hover:bg-white/10 text-zinc-200 flex items-center justify-between"
              >
                <span>📜 {isFa ? 'نمایشگاه کامل ۶۰ قطعه (پیوسته)' : 'Full 60-Item Catalog'}</span>
              </button>

              <div className="px-2.5 py-1.5 text-[10px] text-zinc-500 font-bold uppercase tracking-wider border-b border-white/5 pt-2">
                {isFa ? 'پروژه‌های مستقل ساخته‌شده' : 'Standalone Projects'}
              </div>

              {[
                { route: 'STUDIO_123', labelFa: '⚡ استودیو ۱۲۳سرویس', labelEn: '⚡ 123Service Studio' },
                { route: 'PERSIAN_MUQARNAS_WORLD', labelFa: '🏛️ معماری پارسی مقرنس', labelEn: '🏛️ Persian Muqarnas 3D' },
                { route: 'CHRONO_NEBULA_WORLD', labelFa: '⏳ ادیسه فضایی زمان', labelEn: '⏳ Chrono-Nebula 3D' },
                { route: 'SCROLL_WORLD_3D', labelFa: '🎬 جهان سینمایی ۳بعدی', labelEn: '🎬 3D Scroll World' },
                { route: 'AWWWARDS_HERO', labelFa: '🏆 هیرو اواردز (شیشه شیاردار)', labelEn: '🏆 Awwwards Hero' },
                { route: 'COFFEE_SAMPLE', labelFa: '☕ ۱۲۳کافی (دانه ۳بعدی)', labelEn: '☕ 123 Coffee 3D' },
                { route: 'PC_BUILDER_SAMPLE', labelFa: '🖥️ اسمبلر سخت‌افزار', labelEn: '🖥️ PC Builder Rig' },
                { route: 'WIKI_GAME_SAMPLE', labelFa: '🎮 سوپرسایت ویکی‌گیم', labelEn: '🎮 WikiGame Super-Site' },
                { route: 'STUDIO_ELEMENTS_SAMPLE', labelFa: '🧩 ۲۰ المان ضروری', labelEn: '🧩 20 UI Elements' },
                { route: 'SAMPLE_WEBSITE', labelFa: '🛍️ فروشگاه لوکس آورا', labelEn: '🛍️ Aura Luxury Store' },
                { route: 'GLTF_STUDIO', labelFa: '📦 استودیو GLTF/GLB دراپ', labelEn: '📦 GLTF 3D Studio' },
                { route: 'VOICE_CALLIGRAPHY', labelFa: '🎙️ خطاطی صوتی با میکروفون', labelEn: '🎙️ Voice Calligraphy' },
              ].map((item) => (
                <button
                  key={item.route}
                  onClick={() => {
                    soundFx.playClick(700);
                    setIsQuickMenuOpen(false);
                    onNavigate(item.route as PortalRoute);
                  }}
                  className="w-full text-right p-2 rounded-xl hover:bg-white/10 text-zinc-300 hover:text-white flex items-center justify-between transition-colors"
                >
                  <span>{isFa ? item.labelFa : item.labelEn}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Side: AI Playbook, Search & Language */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* AI Design Playbook Button */}
          <button
            onClick={() => {
              soundFx.playChime(900, 0.2);
              onOpenAiPlaybook();
            }}
            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-mono text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-amber-400/20"
            title={isFa ? 'دفترچه راهنمای هوش مصنوعی و پرامپت‌ها' : 'AI Design Playbook & Prompts'}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isFa ? 'راهنمای هوش مصنوعی' : 'AI Playbook'}</span>
          </button>

          {/* Omni Search Button */}
          <button
            onClick={() => {
              soundFx.playClick(600);
              onOpenSearch();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
            title={isFa ? 'جستجوی هوشمند (⌘K)' : 'Omni-Search (⌘K)'}
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </button>

          {/* Language Switch */}
          <button
            onClick={() => {
              soundFx.playClick(500);
              toggleLanguage();
            }}
            className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs flex items-center gap-1"
            title="Toggle Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
