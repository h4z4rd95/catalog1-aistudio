import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT, StudioService } from '../../../content/site';
import DnaHelix from '../three/DnaHelix';
import { soundFx } from '../../../utils/audio';
import { auditScrollPinContract, refreshWhenSettled } from '../../../lib/motion';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Activity,
  Layers,
  Sparkles,
  Radio,
} from 'lucide-react';

interface StudioServicesDnaProps {
  onSelectService: (service: StudioService) => void;
}

export default function StudioServicesDna({ onSelectService }: StudioServicesDnaProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const services = SITE_CONTENT.services;
  const total = services.length;

  useEffect(() => {
    auditScrollPinContract(trackRef.current);
    refreshWhenSettled();

    const handleScroll = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalDist = track.offsetHeight - windowH;
      if (totalDist <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalDist));
      setScrollProgress(progress);

      const calculatedIdx = Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
      if (calculatedIdx !== activeIdx) {
        setActiveIdx(calculatedIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [total, activeIdx]);

  const scrollToService = (idx: number) => {
    setActiveIdx(idx);
    const track = trackRef.current;
    if (!track) return;
    const windowH = window.innerHeight;
    const totalDist = track.offsetHeight - windowH;
    const targetProgress = idx / (total - 1);
    const targetScrollY = track.offsetTop + targetProgress * totalDist;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
    soundFx.playClick(620 + idx * 30);
  };

  const activeService = services[activeIdx] || services[0];
  const isCyan = activeIdx % 2 === 1;

  return (
    <section
      id="services-dna"
      ref={trackRef}
      data-track
      className="relative min-h-[420vh] sm:min-h-[520vh] bg-[#07080d] border-b border-[#202027] select-none"
    >
      {/* Pinned Stage Container with Full-Bleed 3D Environment */}
      <div
        ref={stageRef}
        data-stage
        className="sticky top-0 h-[100dvh] flex flex-col justify-between py-3 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden relative"
      >
        {/* Full-Bleed 3D DNA Canvas with True Perspective & Authentic Spatial Depth */}
        <DnaHelix
          scrollProgress={scrollProgress}
          activeServiceIndex={activeIdx}
          totalServices={total}
          cardRef={cardRef}
        />

        {/* Top Header Row (Glassmorphic HUD) */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[#202027]/80 pb-3 z-30 shrink-0 bg-[#07080d]/70 backdrop-blur-md px-3.5 py-2.5 rounded-2xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-cyan-400 font-bold">
                02 // DYNAMIC 3D DNA HELIX &bull; ساختار سه‌بعدی خدمات استودیو
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-xl sm:text-3xl text-white mt-0.5 tracking-wide">
              دی‌ان‌ای خدمات استودیو ۱۲۳سرویس
            </h2>
          </div>

          {/* Quick Prev / Next Controls & Node Counter */}
          <div className="flex items-center gap-2 sm:gap-3 font-mono text-xs text-zinc-400">
            <button
              onClick={() => scrollToService(Math.max(0, activeIdx - 1))}
              disabled={activeIdx === 0}
              className="w-8 h-8 rounded-xl bg-[#12131d] border border-white/10 flex items-center justify-center text-zinc-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              title="سرویس قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="bg-[#0e0f17] px-3 py-1.5 rounded-xl border border-[#20202a] text-zinc-300 flex items-center gap-2 text-xs font-bold">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              خدمت <span className="text-cyan-400">{activeService.number}</span> / {total}
            </span>

            <button
              onClick={() => scrollToService(Math.min(total - 1, activeIdx + 1))}
              disabled={activeIdx === total - 1}
              className="w-8 h-8 rounded-xl bg-[#12131d] border border-white/10 flex items-center justify-center text-zinc-300 disabled:opacity-30 disabled:pointer-events-none hover:bg-white/10 active:scale-95 transition-all cursor-pointer"
              title="سرویس بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Central Stage: The Service Box is the Focal Point of the Scene */}
        <div className="relative flex-1 w-full flex items-center justify-center lg:justify-end z-20 my-auto pointer-events-none py-2">
          {/* Card Anchor Container: Tracked by Three.js in 3D Space */}
          <div
            ref={cardRef}
            className="relative w-full max-w-[520px] pointer-events-auto transition-all duration-300"
          >
            {/* Cybernetic Physical Docking Bracket (Anchor point for the 3D connecting curve) */}
            <div className="absolute -top-3.5 sm:-top-4 left-6 sm:left-10 flex items-center gap-2 z-30 font-mono text-[10px] text-zinc-300 bg-[#090b14] px-3 py-1 rounded-full border border-white/15 shadow-xl">
              <span
                className={`w-2 h-2 rounded-full ${isCyan ? 'bg-cyan-400' : 'bg-violet-400'} animate-ping`}
              />
              <span className={isCyan ? 'text-cyan-300 font-bold' : 'text-violet-300 font-bold'}>
                3D HELIX LINK // NODE #{activeService.number}
              </span>
            </div>

            {/* Main Service Card Body: High Contrast, Solid Glassmorphism, 100% Readability */}
            <div
              key={activeService.id}
              className={`p-5 sm:p-8 rounded-3xl border transition-all duration-300 shadow-2xl relative overflow-hidden backdrop-blur-3xl ${
                isCyan
                  ? 'bg-[#0a0d18]/96 border-cyan-400/50 shadow-[0_0_50px_rgba(6,182,212,0.18)] ring-1 ring-cyan-400/30'
                  : 'bg-[#0f0b1c]/96 border-violet-400/50 shadow-[0_0_50px_rgba(139,92,246,0.18)] ring-1 ring-violet-400/30'
              }`}
            >
              {/* Category & Timeline Header */}
              <div className="flex items-center justify-between gap-2 mb-3 pt-1">
                <span
                  className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                    isCyan
                      ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
                      : 'bg-violet-950/80 border-violet-400/50 text-violet-300'
                  }`}
                >
                  {activeService.categoryLabel}
                </span>

                <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                  <Clock className={`w-3.5 h-3.5 ${isCyan ? 'text-cyan-400' : 'text-violet-400'}`} />
                  <span>{activeService.timeline}</span>
                </div>
              </div>

              {/* Service Title & Tagline (Persian High Contrast) */}
              <h3 className="font-['Lalezar'] text-2xl sm:text-4xl text-white tracking-wide leading-tight">
                {activeService.title}
              </h3>
              <p
                className={`font-mono text-xs sm:text-sm font-semibold mt-1 sm:mt-1.5 ${
                  isCyan ? 'text-cyan-400' : 'text-violet-300'
                }`}
              >
                {activeService.tagline}
              </p>

              {/* Description */}
              <p className="font-['Vazirmatn'] text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-2.5 sm:mt-3">
                {activeService.description}
              </p>

              {/* Deliverables Checklist */}
              <div className="space-y-1.5 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-white/10">
                <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  اقلام تحویلی استاندارد:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeService.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs text-zinc-200 font-['Vazirmatn'] bg-black/40 px-2.5 py-1.5 rounded-xl border border-white/5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                      <span className="truncate">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action Button */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    soundFx.playClick(750);
                    onSelectService(activeService);
                  }}
                  className={`w-full py-3 px-5 rounded-2xl font-['Lalezar'] text-base sm:text-lg font-bold text-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110 active:scale-[0.99] ${
                    isCyan
                      ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 shadow-cyan-500/30'
                      : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 shadow-violet-500/30'
                  }`}
                >
                  <span>سفارش و بررسی جزئیات این خدمت</span>
                  <ArrowLeft className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fast-Jump Service Navigation Bar */}
        <div className="relative flex items-center justify-between border-t border-[#202027]/80 pt-2.5 z-30 overflow-x-auto no-scrollbar gap-1.5 shrink-0 touch-pan-x bg-[#07080d]/70 backdrop-blur-md px-3.5 py-2 rounded-2xl">
          <div className="flex items-center gap-1.5">
            {services.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => scrollToService(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                  activeIdx === idx
                    ? isCyan
                      ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/30 scale-105'
                      : 'bg-violet-400 text-black shadow-lg shadow-violet-500/30 scale-105'
                    : 'bg-[#111116] hover:bg-[#181822] text-zinc-400 hover:text-white border border-[#202027]'
                }`}
              >
                <span>{srv.number}</span>
                <span className="hidden sm:inline font-['Vazirmatn']">{srv.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-2 text-[11px] font-mono text-zinc-400 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF3D] animate-pulse" />
            <span>پیمایش با اسکرول همگام با عمق سه‌بعدی دی‌ان‌ای</span>
          </div>
        </div>
      </div>
    </section>
  );
}
