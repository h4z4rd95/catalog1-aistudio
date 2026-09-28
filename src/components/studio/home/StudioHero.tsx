import React, { useState, useRef } from 'react';
import { SITE_CONTENT } from '../../../content/site';
import MascotFigure from '../common/MascotFigure';
import { soundFx } from '../../../utils/audio';
import {
  ArrowDownLeft,
  Sparkles,
  ArrowLeft,
  Terminal,
  Cpu,
  Layers,
  Globe,
  Radio,
  ExternalLink
} from 'lucide-react';

interface StudioHeroProps {
  onExploreServices: () => void;
  onOpenBotsPage: () => void;
  onExplorePackages: () => void;
}

export default function StudioHero({
  onExploreServices,
  onOpenBotsPage,
  onExplorePackages,
}: StudioHeroProps) {
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const ctaBtnRef = useRef<HTMLButtonElement>(null);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = ctaBtnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.35;
    const dy = (e.clientY - cy) * 0.35;
    setMagneticOffset({ x: dx, y: dy });
  };

  const handleCtaMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 pb-8 px-4 sm:px-8 border-b border-[#202027] overflow-hidden bg-[#09090B]">
      {/* 1. Atmospheric Aurora Bloom Wash */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-violet-600/15 via-cyan-500/15 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -top-24 right-0 w-[420px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 2. Top Metadata Row */}
      <div className="max-w-7xl mx-auto w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] text-zinc-400 border-b border-[#202027] pb-4 z-10">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
          <span className="text-zinc-200 uppercase font-bold tracking-wider">
            {SITE_CONTENT.brand.status}
          </span>
          <span className="text-zinc-600 hidden sm:inline">&bull;</span>
          <span className="text-zinc-500 hidden sm:inline">{SITE_CONTENT.brand.location}</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-bold">123 // DIGITAL CREATIVE ENGINE</span>
          <span className="px-2 py-0.5 rounded bg-[#17171D] border border-[#202027] text-zinc-300">
            SPEC v4.2
          </span>
        </div>
      </div>

      {/* 3. Main Broken Editorial Spread (12-Column Grid Breaker) */}
      <div className="max-w-7xl mx-auto w-full my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column: Massive Kinetic Split-Line Type */}
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#202027] text-zinc-300 font-mono text-xs shadow-md">
            <span className="text-[#B8FF3D] font-bold">01/02/03</span>
            <span className="text-zinc-500">&bull;</span>
            <span>استودیو تخصصی طراحی وب، هوش مصنوعی و گرافیک</span>
          </div>

          <h1 className="font-['Lalezar'] text-4xl sm:text-6xl lg:text-[92px] text-white leading-[1.08] tracking-tight">
            موتور خلاقیت <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#22D3EE]">دیجیتال</span>
            <span className="block text-2xl sm:text-4xl lg:text-5xl text-zinc-400 font-['Vazirmatn'] font-black mt-2">
              جایی که دقت ریاضی با هنر تلفیق می‌شود
            </span>
          </h1>

          <p className="text-xs sm:text-base text-zinc-400 max-w-2xl leading-relaxed font-light font-['Vazirmatn']">
            {SITE_CONTENT.brand.manifesto}
          </p>

          {/* CTAs with Magnetic Physics */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
            <button
              ref={ctaBtnRef}
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              onClick={() => {
                soundFx.playChime(750, 0.2);
                onExploreServices();
              }}
              style={{
                transform: `translate(${magneticOffset.x}px, ${magneticOffset.y}px)`,
                transition: magneticOffset.x === 0 ? 'transform 0.4s ease-out' : 'none',
              }}
              className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#22D3EE] hover:opacity-95 text-black font-['Lalezar'] text-base sm:text-lg font-bold shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
            >
              <span>مشاهده خدمات استودیو (DNA)</span>
              <ArrowDownLeft className="w-5 h-5 text-black" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick(650);
                onOpenBotsPage();
              }}
              className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-4 rounded-2xl bg-[#111116] hover:bg-[#17171D] border border-[#202027] hover:border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>ساخت ربات هوشمند (Bespoke)</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(650);
                onExplorePackages();
              }}
              className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-[#111116] hover:bg-[#17171D] border border-[#202027] text-zinc-300 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>پکیج‌های آماده</span>
              <span className="text-[#B8FF3D] font-bold">WOO</span>
            </button>

            <button
              onClick={() => {
                soundFx.playChime(850, 0.2);
                const el = document.getElementById('project-calculator');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-4 sm:px-5 py-3 sm:py-4 rounded-2xl bg-[#111116] hover:bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>محاسبه‌گر بلادرنگ قیمت</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Brand Mascot & Tech Card */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center relative">
          <div className="relative p-6 sm:p-8 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl flex flex-col items-center text-center space-y-4 w-full max-w-sm group hover:border-cyan-500/40 transition-colors">
            {/* Mascot */}
            <MascotFigure
              size="lg"
              showSpeechBubble={true}
              speechText="به ۱۲۳سرویس خوش آمدید ✦"
              onClick={onOpenBotsPage}
            />

            <div className="space-y-1">
              <span className="font-mono text-[10px] text-[#B8FF3D] uppercase tracking-widest block font-bold">
                CORE AUTONOMOUS UNIT
              </span>
              <h4 className="font-['Lalezar'] text-xl text-white">
                ایجنت هوشمند ۱۲۳
              </h4>
              <p className="font-mono text-xs text-zinc-400 font-light">
                آماده اتصال به کانال‌های تلگرام، اینستاگرام، وب و پایگاه داده شما در ۲۴ ساعت.
              </p>
            </div>

            <button
              onClick={onOpenBotsPage}
              className="w-full py-2.5 rounded-xl bg-[#17171D] hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              <span>کانفیگ ربات اختصاصی</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Discipline Index Row (01 — WEB, 02 — AI, 03 — DESIGN) */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[#202027] pt-6 z-10">
        {SITE_CONTENT.disciplines.map((item) => (
          <div
            key={item.index}
            className="p-4 rounded-2xl bg-[#111116]/80 border border-[#202027] hover:border-violet-500/40 transition-colors flex items-center justify-between group"
          >
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 mb-1">
                <span className="text-cyan-400 font-bold">{item.index}</span>
                <span>//</span>
                <span className="text-white font-bold">{item.code}</span>
              </div>
              <h3 className="font-bold text-sm text-zinc-200 group-hover:text-cyan-300 transition-colors">
                {item.labelFa}
              </h3>
            </div>
            <span className="w-8 h-8 rounded-xl bg-[#17171D] border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-white transition-colors">
              <ArrowDownLeft className="w-4 h-4" />
            </span>
          </div>
        ))}
      </div>

      {/* 5. Keyword Marquee Running Along Bottom Edge */}
      <div className="w-full overflow-hidden whitespace-nowrap pt-8 pb-2 opacity-50 hover:opacity-100 transition-opacity">
        <div className="flex gap-8 animate-marquee text-xs font-mono text-zinc-500 uppercase tracking-widest">
          <span>Three.js Instanced WebGL</span>
          <span>&bull;</span>
          <span>Persian Variable Typography</span>
          <span>&bull;</span>
          <span>Autonomous Telegram &amp; Instagram Bots</span>
          <span>&bull;</span>
          <span>Next-Gen Fullstack Architecture</span>
          <span>&bull;</span>
          <span>Tailwind v4 Clean Token System</span>
          <span>&bull;</span>
          <span>Zero External Google CDNs</span>
          <span>&bull;</span>
          <span>Three.js Instanced WebGL</span>
          <span>&bull;</span>
          <span>Persian Variable Typography</span>
          <span>&bull;</span>
        </div>
      </div>
    </section>
  );
}
