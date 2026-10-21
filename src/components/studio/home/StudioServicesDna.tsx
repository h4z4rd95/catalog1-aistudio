import React, { useState, useEffect, useRef } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';
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

  // 1. Framer-Motion useScroll Hook targeting the pinned scroll container
  // Ample scroll track so all 10 cards scroll like smooth movie credits without skipping
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic scroll progress and active service index in real-time
  useMotionValueEvent(scrollYProgress, 'change', (latestProgress) => {
    setScrollProgress(latestProgress);
    // Determine active index based on normalized segments
    const calculatedIdx = Math.min(total - 1, Math.max(0, Math.round(latestProgress * (total - 1))));
    if (calculatedIdx !== activeIdx) {
      setActiveIdx(calculatedIdx);
    }
  });

  useEffect(() => {
    auditScrollPinContract(trackRef.current);
    refreshWhenSettled();
  }, []);

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
      className="relative min-h-[750vh] sm:min-h-[850vh] bg-[#07080d] border-b border-[#202027] select-none"
    >
      {/* Pinned Stage Container with Full-Bleed 3D Environment */}
      <div
        ref={stageRef}
        data-stage
        className="sticky top-0 h-[100dvh] flex flex-col justify-between py-3 sm:py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden relative"
      >
        {/* Full-Bleed 3D DNA Canvas: Upright, thick, majestic double-helix */}
        <DnaHelix
          scrollProgress={scrollProgress}
          activeServiceIndex={activeIdx}
          totalServices={total}
        />

        {/* Top Header Row (Glassmorphic HUD) */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 border-b border-[#202027]/80 pb-3 z-40 shrink-0 bg-[#07080d]/80 backdrop-blur-md px-3.5 py-2.5 rounded-2xl">
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

        {/* Central Stage: In RTL layout, cards sit on the right half (justify-start), leaving the left half for the 3D DNA helix */}
        <div className="relative flex-1 w-full flex items-center justify-center lg:justify-start z-30 my-auto py-2">
          {/* Card Anchor Container */}
          <div
            ref={cardRef}
            className="relative w-full max-w-[540px] h-[480px] sm:h-[510px] flex items-center justify-center lg:mr-8"
          >
            {services.map((srv, idx) => {
              // Normalized progress distance for each service (0 to 1 across the 10 services)
              const cardTargetProgress = total > 1 ? idx / (total - 1) : 0;
              // delta: 0 when this card is at the vertical center of the section
              // delta < 0: card is below center (coming up from bottom)
              // delta > 0: card is above center (departing towards top)
              const delta = (scrollProgress - cardTargetProgress) * (total - 1);

              // Movie credits window: Only render immediate active card and direct transitioning neighbor
              const isVisible = Math.abs(delta) < 1.15;
              if (!isVisible) return null;

              // Scale per user instruction:
              // Small at bottom of screen (~0.56), grows to 100% (1.0) at the center, then shrinks down (~0.56) towards top!
              const clampedDist = Math.min(1.0, Math.abs(delta));
              const scale = 1.0 - 0.44 * Math.pow(clampedDist, 1.6); // 1.0 down to 0.56

              // Vertical translation (Movie credits upward motion):
              // negative delta -> enters from bottom (+440px)
              // 0 -> center (0px)
              // positive delta -> exits to top (-440px)
              const translateY = -delta * 440;

              // Opacity: Crisp and opaque at center, fades gracefully at edges so cards never look cluttered
              const cardFade = Math.max(0, 1.0 - Math.pow(clampedDist, 2.2));

              // Rotation around DNA: Cards rotate subtly around their Y-axis as if anchored along the helix spiral
              const rotateY = delta * 20; // degrees
              const rotateX = delta * -4;

              const isCurrentCyan = idx % 2 === 1;

              return (
                <div
                  key={srv.id}
                  style={{
                    transform: `translate3d(0, ${translateY}px, 0) scale(${scale}) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
                    opacity: cardFade,
                    zIndex: Math.round(35 - Math.abs(delta) * 12),
                    pointerEvents: Math.abs(delta) < 0.4 ? 'auto' : 'none',
                    transition: 'transform 0.08s ease-out, opacity 0.12s ease-out',
                  }}
                  className="absolute inset-0 w-full flex flex-col justify-center select-none"
                >
                  {/* Subtle Nano-Dock Connector Tab (Physically connects card towards the DNA helix on the left) */}
                  <div className="relative mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-300 bg-[#090b14]/90 px-3 py-1 rounded-full border border-white/15 shadow-xl w-fit">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCurrentCyan ? 'bg-cyan-400' : 'bg-violet-400'
                        } animate-ping`}
                      />
                      <span className={isCurrentCyan ? 'text-cyan-300 font-bold' : 'text-violet-300 font-bold'}>
                        3D HELIX LINK // NODE #{srv.number}
                      </span>
                    </div>

                    {/* Minimalist physical connection beam pointing towards the DNA */}
                    <div className="hidden lg:flex items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
                      <span className="w-8 h-[1px] bg-gradient-to-l from-cyan-400/50 to-transparent" />
                      <span>اتصال فیزیکی به مارپیچ</span>
                    </div>
                  </div>

                  {/* Main Service Card Body: High Contrast, 88-90% solid opacity so DNA passing behind NEVER obscures text */}
                  <div
                    className={`p-5 sm:p-7 rounded-3xl border shadow-2xl relative overflow-hidden backdrop-blur-2xl transition-colors duration-300 ${
                      isCurrentCyan
                        ? 'bg-[#080d19]/90 border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.18)] ring-1 ring-cyan-400/30'
                        : 'bg-[#0e091b]/90 border-violet-400/40 shadow-[0_0_50px_rgba(139,92,246,0.18)] ring-1 ring-violet-400/30'
                    }`}
                  >
                    {/* Category & Timeline Header */}
                    <div className="flex items-center justify-between gap-2 mb-2.5 pt-0.5">
                      <span
                        className={`px-3 py-1 rounded-full font-mono text-xs font-bold border ${
                          isCurrentCyan
                            ? 'bg-cyan-950/80 border-cyan-400/50 text-cyan-300'
                            : 'bg-violet-950/80 border-violet-400/50 text-violet-300'
                        }`}
                      >
                        {srv.categoryLabel}
                      </span>

                      <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                        <Clock className={`w-3.5 h-3.5 ${isCurrentCyan ? 'text-cyan-400' : 'text-violet-400'}`} />
                        <span>{srv.timeline}</span>
                      </div>
                    </div>

                    {/* Service Title & Tagline (Persian High Contrast) */}
                    <h3 className="font-['Lalezar'] text-xl sm:text-3xl text-white tracking-wide leading-tight">
                      {srv.title}
                    </h3>
                    <p
                      className={`font-mono text-xs sm:text-sm font-semibold mt-1 ${
                        isCurrentCyan ? 'text-cyan-400' : 'text-violet-300'
                      }`}
                    >
                      {srv.tagline}
                    </p>

                    {/* Description */}
                    <p className="font-['Vazirmatn'] text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mt-2 line-clamp-2 sm:line-clamp-3">
                      {srv.description}
                    </p>

                    {/* Deliverables Checklist */}
                    <div className="space-y-1 pt-2.5 mt-2.5 border-t border-white/10">
                      <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                        اقلام تحویلی استاندارد:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {srv.deliverables.map((del, dIdx) => (
                          <div
                            key={dIdx}
                            className="flex items-center gap-1.5 text-xs text-zinc-200 font-['Vazirmatn'] bg-black/40 px-2 py-1 rounded-lg border border-white/5"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[#B8FF3D] shrink-0" />
                            <span className="truncate">{del}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Action Button */}
                    <div className="mt-3.5 pt-2.5 border-t border-white/10">
                      <button
                        onClick={() => {
                          soundFx.playClick(750);
                          onSelectService(srv);
                        }}
                        className={`w-full py-2.5 px-4 rounded-xl font-['Lalezar'] text-sm sm:text-base font-bold text-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer hover:brightness-110 active:scale-[0.99] ${
                          isCurrentCyan
                            ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 shadow-cyan-500/30'
                            : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 shadow-violet-500/30'
                        }`}
                      >
                        <span>سفارش و بررسی جزئیات این خدمت</span>
                        <ArrowLeft className="w-3.5 h-3.5 text-black" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast-Jump Service Navigation Bar */}
        <div className="relative flex items-center justify-between border-t border-[#202027]/80 pt-2.5 z-40 overflow-x-auto no-scrollbar gap-1.5 shrink-0 touch-pan-x bg-[#07080d]/80 backdrop-blur-md px-3.5 py-2 rounded-2xl">
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
