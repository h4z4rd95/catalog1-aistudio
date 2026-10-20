import React from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Sparkles,
  Coffee,
  Cpu,
  Gamepad2,
  BookOpen,
  Layers,
  ShoppingBag,
  ExternalLink,
  Flame,
  Globe
} from 'lucide-react';

export type AppViewMode =
  | 'STUDIO_123'
  | 'CATALOG'
  | 'SAMPLE_WEBSITE'
  | 'COFFEE_SAMPLE'
  | 'PC_BUILDER_SAMPLE'
  | 'WIKI_GAME_SAMPLE'
  | 'STUDIO_ELEMENTS_SAMPLE'
  | 'SCROLL_WORLD_3D'
  | 'AWWWARDS_HERO'
  | 'PERSIAN_MUQARNAS_WORLD'
  | 'CHRONO_NEBULA_WORLD'
  | 'GLTF_STUDIO'
  | 'VOICE_CALLIGRAPHY';

interface MasterShowcaseNavProps {
  currentViewMode: AppViewMode;
  onSelectViewMode: (mode: AppViewMode) => void;
  onOpenDesignDocs: () => void;
  isKioskActive?: boolean;
  onToggleKiosk?: () => void;
}

export default function MasterShowcaseNav({
  currentViewMode,
  onSelectViewMode,
  onOpenDesignDocs,
  isKioskActive = false,
  onToggleKiosk = () => {},
}: MasterShowcaseNavProps) {
  const { language, toggleLanguage } = useStore();
  const isFa = language === 'fa';

  const navItems = [
    {
      id: 'STUDIO_123' as AppViewMode,
      labelFa: '⚡ استودیو ۱۲۳سرویس (موتور خلاقیت)',
      labelEn: '⚡ 123Service Studio Site',
      tag: isFa ? 'سایت اصلی' : 'Studio Site',
      activeColor: 'bg-gradient-to-r from-violet-600 to-cyan-400 text-black shadow-lg shadow-cyan-500/30 border-cyan-300',
    },
    {
      id: 'GLTF_STUDIO' as AppViewMode,
      labelFa: '📦 استودیو GLTF/GLB (دراپ ۳بعدی)',
      labelEn: '📦 GLTF/GLB 3D Studio & PBR',
      tag: isFa ? 'لودر فایل سه‌بعدی' : '3D Dropzone',
      activeColor: 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-lg shadow-cyan-500/30 border-cyan-300',
    },
    {
      id: 'VOICE_CALLIGRAPHY' as AppViewMode,
      labelFa: '🎙️ خطاطی صوتی (ارتعاش قلم و میکروفون)',
      labelEn: '🎙️ Voice-to-Calligraphy Engine',
      tag: isFa ? 'سیاه‌مشق صوت' : 'Voice Pen',
      activeColor: 'bg-gradient-to-r from-amber-400 to-rose-400 text-black shadow-lg shadow-amber-500/30 border-amber-300',
    },
    {
      id: 'PERSIAN_MUQARNAS_WORLD' as AppViewMode,
      labelFa: '🏛️ معماری پارسی مقرنس (Persian Neofuturism)',
      labelEn: '🏛️ Persian Muqarnas Architecture 3D',
      tag: isFa ? 'طاق معلق و شمسه' : 'Persian 3D World',
      activeColor: 'bg-gradient-to-r from-amber-400 via-yellow-500 to-cyan-400 text-black shadow-lg shadow-amber-400/30 border-amber-300',
    },
    {
      id: 'CHRONO_NEBULA_WORLD' as AppViewMode,
      labelFa: '⏳ ادیسه فضایی زمان (Chrono-Nebula 3D)',
      labelEn: '⏳ Chrono-Spatial Odyssey 3D',
      tag: isFa ? 'چرخ‌دنده و سیاه‌چاله' : 'Cosmic Astrolabe',
      activeColor: 'bg-gradient-to-r from-cyan-400 via-purple-500 to-emerald-400 text-black shadow-lg shadow-cyan-400/30 border-cyan-300',
    },
    {
      id: 'SCROLL_WORLD_3D' as AppViewMode,
      labelFa: '🎬 جهان سینمایی ۳بعدی (Three.js Scroll World)',
      labelEn: '🎬 Three.js Cinematic Scroll World',
      tag: isFa ? 'پرواز ۳بعدی اسکرول' : '3D Scroll World',
      activeColor: 'bg-gradient-to-r from-cyan-400 via-violet-500 to-lime-400 text-black shadow-lg shadow-cyan-500/30 border-cyan-300',
    },
    {
      id: 'AWWWARDS_HERO' as AppViewMode,
      labelFa: '🏆 هیرو ژورنالی اواردز (Awwwards SOTD)',
      labelEn: '🏆 Awwwards Editorial Hero',
      tag: isFa ? 'شیشه شیاردار WebGL' : 'Fluted Glass',
      activeColor: 'bg-gradient-to-r from-amber-400 to-rose-500 text-black shadow-lg shadow-amber-500/30 border-amber-300',
    },
    {
      id: 'STUDIO_ELEMENTS_SAMPLE' as AppViewMode,
      labelFa: '🧩 ۲۰ المان ضروری سایت (RTL & LTR)',
      labelEn: '🧩 20 Essential UI Elements',
      tag: isFa ? '۲۰ المان پرکاربرد' : '20 UI Elements',
      activeColor: 'bg-gradient-to-r from-cyan-400 to-indigo-500 text-black shadow-lg shadow-cyan-500/30 border-cyan-300',
    },
    {
      id: 'COFFEE_SAMPLE' as AppViewMode,
      labelFa: '☕ ۱۲۳کافی (دانه ۳بعدی و اسکرول)',
      labelEn: '☕ 123 Coffee (3D Bean)',
      tag: isFa ? 'دانه ۳بعدی' : '3D Bean',
      activeColor: 'bg-amber-500 text-black shadow-lg shadow-amber-500/30 border-amber-400',
    },
    {
      id: 'PC_BUILDER_SAMPLE' as AppViewMode,
      labelFa: '🖥️ اسمبلر سخت‌افزار (همگرایی ستاره‌ای)',
      labelEn: '🖥️ PC Builder (Star Convergence)',
      tag: isFa ? 'اسکرول موس' : 'Wheel Scroll',
      activeColor: 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/30 border-cyan-300',
    },
    {
      id: 'WIKI_GAME_SAMPLE' as AppViewMode,
      labelFa: '🎮 سوپرسایت ویکی‌گیم (۳ مدل صفحه)',
      labelEn: '🎮 WikiGame (3 Home + 3 Detail)',
      tag: isFa ? 'سوپرسایت' : 'Super-Site',
      activeColor: 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 border-rose-400',
    },
    {
      id: 'CATALOG' as AppViewMode,
      labelFa: '🏛️ نمایشگاه ۶۰ قطعه و نمونه‌های فارسی',
      labelEn: '🏛️ 60-Item Showroom & Persian',
      tag: isFa ? 'خطاطی و مقرنس' : 'Persian 3D',
      activeColor: 'bg-violet-500 text-white shadow-lg shadow-violet-500/30 border-violet-400',
    },
    {
      id: 'SAMPLE_WEBSITE' as AppViewMode,
      labelFa: '🛍️ وبسایت و فروشگاه آورا',
      labelEn: '🛍️ Aura E-Commerce Store',
      tag: isFa ? 'فروشگاه کامل' : 'Full Store',
      activeColor: 'bg-emerald-400 text-black shadow-lg shadow-emerald-500/30 border-emerald-300',
    },
  ];

  return (
    <div className="w-full bg-[#030508] border-b-2 border-cyan-500/40 sticky top-0 z-[60] shadow-2xl backdrop-blur-2xl">
      {/* Top Banner Notice: Guides user clearly to all requested samples */}
      <div className="bg-gradient-to-r from-cyan-950 via-indigo-950 to-rose-950 px-4 py-1.5 border-b border-white/10 flex flex-wrap items-center justify-between text-[11px] font-mono text-zinc-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-white font-bold">
            {isFa
              ? '✨ هاب دسترسی سریع به سمپل‌ها، استودیوی سه‌بعدی و نمایشگاه کامل:'
              : '✨ Quick Hub for all samples, 3D Drag & Drop Studio & Full Showroom:'}
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Client Presentation Kiosk Trigger */}
          <button
            onClick={() => {
              soundFx.playChime(850, 0.2);
              onToggleKiosk();
            }}
            className={`px-3 py-0.5 rounded-full font-bold flex items-center gap-1.5 transition-all shadow-md ${
              isKioskActive
                ? 'bg-rose-500 text-white animate-pulse'
                : 'bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isFa ? (isKioskActive ? 'خروج از پرزنتیشن' : '🖥️ حالت ارائه شرکتی (Kiosk)') : (isKioskActive ? 'Exit Kiosk' : '🖥️ Pitch Kiosk')}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playChime(900, 0.2);
              onOpenDesignDocs();
            }}
            className="px-3 py-0.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-bold flex items-center gap-1.5 transition-all shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{isFa ? '📖 داکیومنت معماری' : '📖 View Docs'}</span>
          </button>

          <button
            onClick={toggleLanguage}
            className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white font-mono flex items-center gap-1"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{language.toUpperCase()}</span>
          </button>
        </div>
      </div>

      {/* Main Switcher Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {navItems.map((item) => {
            const isActive = currentViewMode === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playChime(isActive ? 500 : 750, 0.2);
                  onSelectViewMode(item.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-2 whitespace-nowrap border shrink-0 ${
                  isActive
                    ? `${item.activeColor} scale-[1.02]`
                    : 'bg-zinc-950/70 text-zinc-300 hover:text-white hover:bg-white/10 border-white/10'
                }`}
              >
                <span>{isFa ? item.labelFa : item.labelEn}</span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-black/20 text-current' : 'bg-white/10 text-zinc-400'
                  }`}
                >
                  {item.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action Button for Docs */}
        <button
          onClick={() => {
            soundFx.playChime(850, 0.2);
            onOpenDesignDocs();
          }}
          className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold transition-all shrink-0"
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          <span>{isFa ? 'داکیومنت تحلیل سبک‌ها' : 'Design Docs'}</span>
        </button>
      </div>
    </div>
  );
}
