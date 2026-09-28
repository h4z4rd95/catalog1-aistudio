import React, { useState, useEffect, useRef, useMemo } from 'react';
import { SITE_CONTENT, StudioService } from '../../../content/site';
import DnaHelix from '../three/DnaHelix';
import { soundFx } from '../../../utils/audio';
import { auditScrollPinContract, refreshWhenSettled, canEnablePinning } from '../../../lib/motion';
import {
  Clock,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  Layers,
  ChevronDown,
  Compass,
  Cpu,
  Zap,
  Activity
} from 'lucide-react';

interface StudioServicesDnaProps {
  onSelectService: (service: StudioService) => void;
}

export default function StudioServicesDna({ onSelectService }: StudioServicesDnaProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPinningEnabled, setIsPinningEnabled] = useState(true);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const services = SITE_CONTENT.services;
  const total = services.length;

  useEffect(() => {
    auditScrollPinContract(trackRef.current);
    refreshWhenSettled();
    setIsPinningEnabled(canEnablePinning());

    const handleResize = () => {
      setIsPinningEnabled(canEnablePinning());
    };
    window.addEventListener('resize', handleResize);

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

      // Determine active service index with sticky plateau
      const targetIdx = Math.min(total - 1, Math.max(0, Math.round(progress * (total - 1))));
      if (targetIdx !== activeIdx) {
        soundFx.playTick(500 + targetIdx * 35);
        setActiveIdx(targetIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeIdx, total]);

  // Jump to specific service index
  const scrollToService = (idx: number) => {
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

  // Compute smooth parametric spiral coordinates for each service card
  // Progress p maps across 10 cards. When p * (total - 1) == i, card i is in exact focus.
  const cardsTransforms = useMemo(() => {
    const currentProgressIndex = scrollProgress * (total - 1);

    return services.map((_, i) => {
      const diff = currentProgressIndex - i; // negative = below/upcoming, positive = above/passed

      // Plateau easing: around diff == 0, slow down rotation so card settles at full size
      let easedDiff = diff;
      if (Math.abs(diff) < 0.28) {
        // Flat plateau in the focus deadband
        easedDiff = Math.sign(diff) * Math.pow(Math.abs(diff) / 0.28, 2.2) * 0.12;
      }

      // Vertical displacement: cards travel upwards as user scrolls down
      // When diff < 0 (upcoming), translateY is positive (coming up from bottom)
      // When diff > 0 (passed), translateY is negative (leaving to the top)
      const translateY = -easedDiff * 270;

      // Spiral rotation around the DNA helix cylinder
      // Alternate left/right side of the DNA for alternating rhythm
      const basePhase = (i % 2 === 0 ? 0.35 : -0.35) * Math.PI;
      const angle = basePhase + easedDiff * 0.75 * Math.PI;

      // Distance from center axis
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      const radiusX = isMobile ? 60 : 360;
      const translateX = Math.sin(angle) * radiusX;

      // Depth along Z axis
      const translateZ = Math.cos(angle) * 160 - 80;

      // Tilt angle facing slightly inwards or flat at focus
      const rotateY = -Math.sin(angle) * 22;

      // Distance factor from focal point
      const dist = Math.abs(diff);

      // Scale: 1.0 at focus, gently tapering to 0.72 as it rotates away
      const isFocused = dist < 0.45;
      const scale = isFocused
        ? 1.0 - dist * 0.15
        : Math.max(0.68, 0.95 - dist * 0.18);

      // Opacity: full 1.0 at focus, tapering to 0.25 - 0.55
      const opacity = isFocused
        ? 1.0
        : Math.max(0.12, 0.75 - dist * 0.28);

      // Blur: crisp 0px at focus, subtle depth of field blur when away
      const blur = isFocused ? 0 : Math.min(5, (dist - 0.4) * 3);

      // Z-Index: focused card is highest
      const zIndex = isFocused ? 40 : Math.max(1, 30 - Math.round(dist * 6));

      // Is card visible in current viewport frustum (render optimization)
      const isRendered = dist < 2.6;

      return {
        translateX,
        translateY,
        translateZ,
        rotateY,
        scale,
        opacity,
        blur,
        zIndex,
        isFocused,
        isRendered,
        dist,
        angle,
      };
    });
  }, [scrollProgress, total, services]);

  const activeService = services[activeIdx] || services[0];

  return (
    <section
      id="services-dna"
      ref={trackRef}
      data-track
      className={`relative ${
        isPinningEnabled ? 'min-h-[600vh]' : 'min-h-auto py-16'
      } bg-[#08080c] border-b border-[#202027] overflow-x-clip select-none`}
    >
      {/* Sticky Stage Container */}
      <div
        ref={stageRef}
        data-stage
        className={`${
          isPinningEnabled ? 'sticky top-0 h-screen' : 'relative min-h-auto'
        } flex flex-col justify-between py-6 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden`}
      >
        {/* Header HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027]/80 pb-3 z-30 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                02 // DNA HELIX TAXONOMY &bull; UNIFIED SPIRAL ORBIT
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-2xl sm:text-4xl text-white mt-0.5">
              دی‌ان‌ای خدمات استودیو ۱۲۳سرویس
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="bg-[#111116] px-3 py-1.5 rounded-xl border border-[#202027] text-zinc-300 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              سرویس فعال: <span className="text-cyan-400 font-bold">{activeService.number}</span> / {total}
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="hidden sm:inline text-zinc-500 text-[11px]">
              اسکرول برای چرخش مارپیچی و همگام کارت‌ها دور دی‌ان‌ای
            </span>
          </div>
        </div>

        {/* Central Spatial Theater: Integrated DNA Helix with Attached Orbiting Cards */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden [perspective:1200px]">
          {/* 1. Center Three.js DNA Helix Canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <DnaHelix
              scrollProgress={scrollProgress}
              highlightedIndex={activeIdx}
              totalServices={total}
              className="w-full h-full"
            />
          </div>

          {/* 2. Orbiting Service Cards Attached to the DNA Rungs */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
            {services.map((service, idx) => {
              const transform = cardsTransforms[idx];
              if (!transform.isRendered) return null;

              const isCyan = idx % 2 === 1;
              const glowColor = isCyan ? '#22d3ee' : '#a855f7';
              const isCurrent = idx === activeIdx;

              return (
                <div
                  key={service.id}
                  style={{
                    transform: `translate3d(${transform.translateX}px, ${transform.translateY}px, ${transform.translateZ}px) rotateY(${transform.rotateY}deg) scale(${transform.scale})`,
                    opacity: transform.opacity,
                    filter: transform.blur > 0 ? `blur(${transform.blur}px)` : 'none',
                    zIndex: transform.zIndex,
                    transition: 'opacity 0.2s ease-out, filter 0.2s ease-out',
                  }}
                  className={`absolute w-[92vw] sm:w-[420px] max-w-[440px] pointer-events-auto transition-transform duration-75 ease-out`}
                >
                  {/* Cybernetic Tether Line connecting to the central DNA axis */}
                  <svg
                    className={`absolute top-1/2 ${
                      transform.translateX > 0 ? '-left-24 sm:-left-36' : '-right-24 sm:-right-36'
                    } w-24 sm:w-36 h-8 -translate-y-1/2 pointer-events-none z-0 overflow-visible`}
                  >
                    <line
                      x1={transform.translateX > 0 ? '100%' : '0%'}
                      y1="50%"
                      x2={transform.translateX > 0 ? '0%' : '100%'}
                      y2="50%"
                      stroke={transform.isFocused ? glowColor : '#27273a'}
                      strokeWidth={transform.isFocused ? '2.5' : '1'}
                      strokeDasharray={transform.isFocused ? '4 2' : 'none'}
                      opacity={transform.isFocused ? '0.9' : '0.4'}
                    />
                    {/* Glowing pulse socket at DNA end */}
                    <circle
                      cx={transform.translateX > 0 ? '0%' : '100%'}
                      cy="50%"
                      r={transform.isFocused ? '5' : '3'}
                      fill={transform.isFocused ? glowColor : '#3f3f50'}
                      className={transform.isFocused ? 'animate-pulse' : ''}
                    />
                  </svg>

                  {/* Main Service Card Box */}
                  <div
                    onClick={() => {
                      if (!transform.isFocused) {
                        scrollToService(idx);
                      }
                    }}
                    className={`relative p-5 sm:p-7 rounded-3xl backdrop-blur-2xl border transition-all duration-300 shadow-2xl ${
                      transform.isFocused
                        ? isCyan
                          ? 'bg-[#0f121d]/95 border-cyan-500/60 shadow-cyan-500/20 ring-1 ring-cyan-500/30'
                          : 'bg-[#140e1f]/95 border-violet-500/60 shadow-violet-500/20 ring-1 ring-violet-500/30'
                        : 'bg-[#111116]/85 border-[#202027] hover:border-zinc-500/40 cursor-pointer'
                    }`}
                  >
                    {/* Top Anchor Socket & Telemetry */}
                    <div className="flex justify-between items-center text-xs font-mono mb-3">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            transform.isFocused
                              ? isCyan ? 'bg-cyan-400 animate-ping' : 'bg-violet-400 animate-ping'
                              : 'bg-zinc-600'
                          }`}
                        />
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] border ${
                            isCyan
                              ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                              : 'bg-violet-950/80 border-violet-500/40 text-violet-300'
                          }`}
                        >
                          {service.categoryLabel} // NODE #{service.number}
                        </span>
                      </div>

                      <span className="text-zinc-400 flex items-center gap-1 text-[11px]">
                        <Clock className={`w-3.5 h-3.5 ${isCyan ? 'text-cyan-400' : 'text-violet-400'}`} />
                        {service.timeline}
                      </span>
                    </div>

                    {/* Card Title & Taglines */}
                    <h3 className="font-['Lalezar'] text-2xl sm:text-3xl text-white tracking-wide">
                      {service.title}
                    </h3>
                    <p className={`font-mono text-xs font-medium mt-1 ${isCyan ? 'text-cyan-400' : 'text-violet-300'}`}>
                      {service.tagline}
                    </p>
                    <p className="font-['Vazirmatn'] text-xs text-zinc-300 font-light leading-relaxed mt-2.5 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist (Only prominently displayed when in focus) */}
                    <div className="space-y-1.5 pt-3 mt-3 border-t border-[#202027]/80">
                      {service.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300 font-['Vazirmatn']">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button: Visible & Clickable */}
                    <div className="mt-4 pt-2">
                      {transform.isFocused ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playClick(750);
                            onSelectService(service);
                          }}
                          className={`w-full py-2.5 px-4 rounded-xl font-['Lalezar'] text-sm font-bold text-black transition-all flex items-center justify-center gap-2 shadow-lg ${
                            isCyan
                              ? 'bg-gradient-to-r from-cyan-400 to-teal-400 hover:brightness-110 shadow-cyan-500/25'
                              : 'bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:brightness-110 shadow-violet-500/25'
                          }`}
                        >
                          <span>سفارش و بررسی جزئیات این خدمت</span>
                          <ArrowLeft className="w-4 h-4 text-black" />
                        </button>
                      ) : (
                        <button
                          onClick={() => scrollToService(idx)}
                          className="w-full py-1.5 rounded-lg bg-[#181820] hover:bg-[#20202c] text-zinc-400 hover:text-white text-[11px] font-mono transition-colors text-center"
                        >
                          کلیک برای چرخش به این خدمت &larr;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Fast-Jump Service Navigation Bar */}
        <div className="flex items-center justify-between border-t border-[#202027]/80 pt-3 z-30 overflow-x-auto no-scrollbar gap-2 shrink-0">
          <div className="flex items-center gap-1.5">
            {services.map((srv, idx) => (
              <button
                key={srv.id}
                onClick={() => scrollToService(idx)}
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  activeIdx === idx
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/30 scale-105'
                    : 'bg-[#111116] hover:bg-[#181822] text-zinc-400 hover:text-white border border-[#202027]'
                }`}
              >
                <span>{srv.number}</span>
                <span className="hidden md:inline font-['Vazirmatn']">{srv.title.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF3D]" />
            <span>KINETIC DNA // 10 INTEGRATED ANCHORS</span>
          </div>
        </div>
      </div>
    </section>
  );
}
