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
  Activity,
  Maximize2
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

  // Compute authentic 3D spatial helix spiral coordinates for each service card
  // The service cards are positioned at specific 3D depths along the kinetic helix
  const cardsTransforms = useMemo(() => {
    const currentProgressIndex = scrollProgress * (total - 1);

    return services.map((_, i) => {
      const diff = currentProgressIndex - i; // negative = upcoming, positive = passed
      const dist = Math.abs(diff);

      // Plateau easing: around diff == 0, create a gentle deadband so card settles perfectly
      let easedDiff = diff;
      if (dist < 0.32) {
        easedDiff = Math.sign(diff) * Math.pow(dist / 0.32, 2.4) * 0.12;
      }

      // Vertical displacement along Y axis
      const translateY = -easedDiff * 260;

      // Alternating sides: Even index on Right, Odd index on Left of DNA core
      const isCyan = i % 2 === 1;
      const side = isCyan ? 1 : -1;

      // Authentic 3D helical spiral trajectory
      const baseAngle = (isCyan ? 0.38 : -0.38) * Math.PI;
      const spiralAngle = baseAngle + easedDiff * 0.72 * Math.PI;

      const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024;
      const radiusX = isMobile ? 50 : 310;
      const translateX = Math.sin(spiralAngle) * radiusX;

      // Authentic Z-depth:
      // Front hemisphere (positive Z) vs Back hemisphere (negative Z)
      // When focused (dist < 0.45): card is pushed forward to foreground (+50px) for prime focus
      const rawDepth = Math.cos(spiralAngle) * 160 - 50;
      const translateZ = dist < 0.45
        ? 50 - dist * 40
        : rawDepth;

      // RotateY: Tangent to the helical curve, flattening when in focal sweetspot
      const rotateY = dist < 0.38
        ? side * -4 * (dist / 0.38)
        : -Math.sin(spiralAngle) * 26;

      const isFocused = dist < 0.45;
      const isBehind = translateZ < -30;

      // Scale: 1.0 at focus, gently tapering to 0.74 as it recedes into depth
      const scale = isFocused
        ? 1.0 - dist * 0.12
        : Math.max(0.72, 0.94 - dist * 0.16);

      // Opacity: full 1.0 at focus, gently dimming when in background depth
      const opacity = isFocused
        ? 1.0
        : isBehind
        ? Math.max(0.2, 0.65 - dist * 0.22)
        : Math.max(0.35, 0.8 - dist * 0.2);

      // Subtle Depth-of-Field blur when away in depth
      const blur = isFocused ? 0 : Math.min(4, Math.max(0, (dist - 0.45) * 2.8));

      // Z-Index: focused card is highest (60), front cards higher than back cards
      const zIndex = isFocused
        ? 60
        : isBehind
        ? Math.max(5, 20 - Math.round(dist * 4))
        : Math.max(25, 45 - Math.round(dist * 5));

      const isRendered = dist < 2.5;

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
        isBehind,
        isRendered,
        dist,
        side,
        isCyan,
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
                02 // DNA HELIX TAXONOMY &bull; 3D KINETIC DOCKING
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-2xl sm:text-4xl text-white mt-0.5 tracking-wide">
              دی‌ان‌ای خدمات استودیو ۱۲۳سرویس
            </h2>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
            <span className="bg-[#0e0f17] px-3 py-1.5 rounded-xl border border-[#20202a] text-zinc-300 flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              سرویس کانونی: <span className="text-cyan-400 font-bold">{activeService.number}</span> / {total}
            </span>
            <span className="hidden sm:inline text-zinc-600">&bull;</span>
            <span className="hidden sm:inline text-zinc-500 text-[11px]">
              پیمایش صفحه جهت چرخش سه‌بعدی دی‌ان‌ای و پهلوگیری کارت‌ها
            </span>
          </div>
        </div>

        {/* Central Spatial Theater: Integrated DNA Helix with Attached Orbiting Cards */}
        <div className="relative flex-1 w-full h-full flex items-center justify-center overflow-hidden [perspective:1300px]">
          {/* 1. Center Three.js DNA Helix Canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <DnaHelix
              scrollProgress={scrollProgress}
              highlightedIndex={activeIdx}
              totalServices={total}
              className="w-full h-full"
            />
          </div>

          {/* 2. Orbiting Service Cards Attached Physically to the 3D DNA Structure */}
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
            {services.map((service, idx) => {
              const transform = cardsTransforms[idx];
              if (!transform.isRendered) return null;

              const isCyan = transform.isCyan;
              const glowColor = isCyan ? '#22d3ee' : '#a855f7';
              const side = transform.side;

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
                  className={`absolute w-[92vw] sm:w-[440px] max-w-[460px] pointer-events-auto transition-transform duration-75 ease-out`}
                >
                  {/* Cybernetic 3D Docking Coupler Interface (bridges DNA structure to card box) */}
                  <div
                    className={`absolute top-1/2 ${
                      side > 0 ? '-left-8 sm:-left-12' : '-right-8 sm:-right-12'
                    } -translate-y-1/2 flex items-center pointer-events-none z-20 ${
                      side > 0 ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    {/* Glowing Docking Coupler Socket */}
                    <div
                      className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-all ${
                        transform.isFocused
                          ? isCyan
                            ? 'bg-cyan-950 border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]'
                            : 'bg-violet-950 border-violet-400 shadow-[0_0_15px_rgba(168,85,247,0.6)]'
                          : 'bg-[#12131c] border-zinc-700 opacity-60'
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          transform.isFocused
                            ? isCyan ? 'bg-cyan-300 animate-ping' : 'bg-violet-300 animate-ping'
                            : 'bg-zinc-500'
                        }`}
                      />
                    </div>

                    {/* Integrated Tether Laser Strand */}
                    <svg
                      className={`w-14 sm:w-20 h-6 overflow-visible pointer-events-none ${
                        side > 0 ? 'scale-x-100' : '-scale-x-100'
                      }`}
                    >
                      <line
                        x1="0"
                        y1="12"
                        x2="100%"
                        y2="12"
                        stroke={transform.isFocused ? glowColor : '#334155'}
                        strokeWidth={transform.isFocused ? '2.5' : '1'}
                        strokeDasharray={transform.isFocused ? '5 3' : 'none'}
                        opacity={transform.isFocused ? '0.95' : '0.4'}
                      />
                      {transform.isFocused && (
                        <circle
                          cx="50%"
                          cy="12"
                          r="3"
                          fill={glowColor}
                          className="animate-pulse"
                        />
                      )}
                    </svg>
                  </div>

                  {/* Main Service Card Box - Primary Focal Point */}
                  <div
                    onClick={() => {
                      if (!transform.isFocused) {
                        scrollToService(idx);
                      }
                    }}
                    className={`relative p-6 sm:p-7 rounded-3xl backdrop-blur-2xl border transition-all duration-300 shadow-2xl select-none ${
                      transform.isFocused
                        ? isCyan
                          ? 'bg-[#0a0c16]/95 border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.22)] ring-1 ring-cyan-400/40'
                          : 'bg-[#100b1a]/95 border-violet-400/60 shadow-[0_0_35px_rgba(139,92,246,0.22)] ring-1 ring-violet-400/40'
                        : transform.isBehind
                        ? 'bg-[#0c0d14]/75 border-[#202028] opacity-70 hover:opacity-100 cursor-pointer'
                        : 'bg-[#10111a]/85 border-[#272736] hover:border-zinc-500/50 cursor-pointer'
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
                              ? 'bg-cyan-950/90 border-cyan-400/50 text-cyan-300'
                              : 'bg-violet-950/90 border-violet-400/50 text-violet-300'
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

                    {/* Card Title & Taglines (High readability and contrast) */}
                    <h3 className="font-['Lalezar'] text-2xl sm:text-3xl text-white tracking-wide leading-tight">
                      {service.title}
                    </h3>
                    <p className={`font-mono text-xs font-semibold mt-1.5 ${isCyan ? 'text-cyan-400' : 'text-violet-300'}`}>
                      {service.tagline}
                    </p>
                    <p className="font-['Vazirmatn'] text-xs sm:text-sm text-zinc-200 font-light leading-relaxed mt-2.5 line-clamp-3">
                      {service.description}
                    </p>

                    {/* Deliverables Checklist (Prominently displayed for value proposition) */}
                    <div className="space-y-1.5 pt-3.5 mt-3.5 border-t border-[#20202a]">
                      {service.deliverables.slice(0, 3).map((del, dIdx) => (
                        <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-200 font-['Vazirmatn']">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                          <span className="truncate">{del}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button: Clear, Accessible, Focal */}
                    <div className="mt-5 pt-2">
                      {transform.isFocused ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFx.playClick(750);
                            onSelectService(service);
                          }}
                          className={`w-full py-3 px-4 rounded-xl font-['Lalezar'] text-base font-bold text-black transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
                            isCyan
                              ? 'bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-300 hover:brightness-110 shadow-cyan-500/30'
                              : 'bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-400 hover:brightness-110 shadow-violet-500/30'
                          }`}
                        >
                          <span>سفارش و بررسی جزئیات این خدمت</span>
                          <ArrowLeft className="w-4 h-4 text-black" />
                        </button>
                      ) : (
                        <button
                          onClick={() => scrollToService(idx)}
                          className="w-full py-2 rounded-xl bg-[#141520] hover:bg-[#1c1d2e] text-zinc-300 hover:text-white text-xs font-mono transition-colors text-center border border-[#20202a] cursor-pointer"
                        >
                          کلیک برای پهلوگیری و مشاهده جزئیات &larr;
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
                className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
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

          <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF3D] animate-pulse" />
            <span>KINETIC 3D DNA // 10 DOCKED NODES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
