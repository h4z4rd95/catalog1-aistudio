import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT, StudioService } from '../../../content/site';
import DnaHelix from '../three/DnaHelix';
import { soundFx } from '../../../utils/audio';
import {
  Layers,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Sparkles,
  ChevronDown,
  Terminal,
  Compass
} from 'lucide-react';

interface StudioServicesDnaProps {
  onSelectService: (service: StudioService) => void;
}

export default function StudioServicesDna({ onSelectService }: StudioServicesDnaProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const services = SITE_CONTENT.services;

  useEffect(() => {
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

      // Determine active service index based on scroll progress
      const targetIdx = Math.min(services.length - 1, Math.floor(progress * services.length));
      if (targetIdx !== activeIdx) {
        soundFx.playTick(500 + targetIdx * 35);
        setActiveIdx(targetIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeIdx, services.length]);

  const activeService = services[activeIdx] || services[0];
  const isAlternate = activeIdx % 2 === 1;

  return (
    <section id="services-dna" ref={trackRef} className="relative min-h-[300vh] bg-[#09090B] border-b border-[#202027]">
      {/* Sticky Stage Container (Respecting Scroll-pin Contract) */}
      <div className="sticky top-16 min-h-[90vh] flex flex-col justify-between py-8 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                02 // SERVICE TAXONOMY (DNA HELIX)
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-4xl text-white mt-1">
              دی‌ان‌ای خدمات استودیو ۱۲۳سرویس
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="bg-[#111116] px-3 py-1.5 rounded-xl border border-[#202027] text-zinc-300">
              سرویس <span className="text-cyan-400 font-bold">{activeService.number}</span> از ۱۰
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="hidden sm:inline text-zinc-500">SCROLL TO ROTATE HELIX</span>
          </div>
        </div>

        {/* Central Stage: Double Helix in Center with Alternating Service Locks */}
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-4">
          {/* Top-Right / Left Alternating Service Card 1 */}
          <div
            className={`lg:col-span-4 transition-all duration-500 ${
              !isAlternate ? 'opacity-100 translate-x-0' : 'opacity-25 translate-x-4 pointer-events-none'
            }`}
          >
            {!isAlternate && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-[#202027] hover:border-violet-500/40 shadow-2xl space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 font-bold">
                    {activeService.categoryLabel} // {activeService.number}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {activeService.timeline}
                  </span>
                </div>

                <h3 className="font-['Lalezar'] text-2xl sm:text-3xl text-white">
                  {activeService.title}
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-cyan-400 font-mono font-medium">
                  {activeService.tagline}
                </p>
                <p className="font-['Vazirmatn'] text-xs text-zinc-400 font-light leading-relaxed">
                  {activeService.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-[#202027]">
                  {activeService.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-['Vazirmatn']">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(activeService)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:opacity-90 text-black font-['Lalezar'] text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>سفارش و بررسی جزئیات این خدمت</span>
                  <ArrowLeft className="w-4 h-4 text-black" />
                </button>
              </div>
            )}
          </div>

          {/* Center Column: The Three.js Instanced Double Helix */}
          <div className="lg:col-span-4 relative h-[380px] sm:h-[460px] flex items-center justify-center">
            <DnaHelix scrollProgress={scrollProgress} highlightedIndex={activeIdx} />
          </div>

          {/* Bottom-Left / Right Alternating Service Card 2 */}
          <div
            className={`lg:col-span-4 transition-all duration-500 ${
              isAlternate ? 'opacity-100 translate-x-0' : 'opacity-25 -translate-x-4 pointer-events-none'
            }`}
          >
            {isAlternate && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-500/40 shadow-2xl space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-bold">
                    {activeService.categoryLabel} // {activeService.number}
                  </span>
                  <span className="text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    {activeService.timeline}
                  </span>
                </div>

                <h3 className="font-['Lalezar'] text-2xl sm:text-3xl text-white">
                  {activeService.title}
                </h3>
                <p className="font-['Vazirmatn'] text-xs text-cyan-400 font-mono font-medium">
                  {activeService.tagline}
                </p>
                <p className="font-['Vazirmatn'] text-xs text-zinc-400 font-light leading-relaxed">
                  {activeService.description}
                </p>

                {/* Deliverables Checklist */}
                <div className="space-y-1.5 pt-2 border-t border-[#202027]">
                  {activeService.deliverables.map((del, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-['Vazirmatn']">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => onSelectService(activeService)}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-violet-600 hover:opacity-90 text-black font-['Lalezar'] text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>سفارش و بررسی جزئیات این خدمت</span>
                  <ArrowLeft className="w-4 h-4 text-black" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Service Navigation Timeline Indicators */}
        <div className="flex items-center justify-between border-t border-[#202027] pt-4 z-10 overflow-x-auto no-scrollbar gap-2">
          {services.map((srv, idx) => (
            <button
              key={srv.id}
              onClick={() => {
                soundFx.playClick(600 + idx * 40);
                setActiveIdx(idx);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                activeIdx === idx
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30'
                  : 'bg-[#111116] hover:bg-[#17171D] text-zinc-400 hover:text-white border border-[#202027]'
              }`}
            >
              <span>{srv.number}</span>
              <span className="hidden md:inline font-['Vazirmatn']">{srv.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
