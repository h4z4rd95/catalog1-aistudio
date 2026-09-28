import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { soundFx } from '../../utils/audio';
import FlutedGlassCanvas from '../studio/common/FlutedGlassCanvas';
import {
  Sparkles,
  ArrowUpRight,
  Terminal,
  Layers,
  Cpu,
  Compass,
  Volume2,
  VolumeX,
  Sliders,
  CheckCircle2,
  Eye,
  Flame,
  Radio,
  Share2
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V06_AwwwardsCinematicNarrative',
  name: 'Awwwards Broken-Grid Editorial Spread & Real-Time Glass Refraction',
  category: 'Hero',
  batch: 'Batch 1: Hero Sections & Immersive Viewport Entrances',
  techStack: ['React / Vite', 'WebGL Fluted Glass Shader', 'Kinetic Split-Line Type', 'Audio Packets Monospace', '12-Column Broken Grid'],
  aestheticVibe: 'Awwwards Site of the Year // Digital Creative Engine',
  interactionBlueprint: 'Cursor tracking distorts the background optical fluted glass shader with RGB chromatic dispersion; hovering magnetic CTAs triggers sub-harmonic audio chimes; editorial typography breaks out of the 12-column boundary grid.',
  description: 'An Awwwards SOTD-grade editorial hero section engineered around the tension of Precision × Chaos. Combines custom WebGL optical glass caustics, oversized kinetic typography (Vazirmatn & Syne), and live monospace dialogue packet transmissions.',
  tags: ['Awwwards SOTD', 'Broken Grid', 'Fluted Glass WebGL', 'Kinetic Typography', 'Sound Design', 'Persian Editorial'],
  codeSnippet: `// Broken-Grid Typography with Dynamic WebGL Refraction
<div className="grid grid-cols-12 gap-4 relative z-10">
  <h1 className="col-span-12 lg:col-span-10 font-['Lalezar'] text-6xl sm:text-8xl tracking-tight text-white mix-blend-difference">
    موتور خلاقیت دیجیتال // DIGITAL CREATIVE ENGINE
  </h1>
  <FlutedGlassCanvas fluteDensity={36.0} refractionStrength={0.045} />
</div>`,
};

const DISCIPLINE_INDEX = [
  { index: '01', name: 'WEB DESIGN & WEBGL', persian: 'طراحی وب تعاملی و سه‌بعدی', code: 'WGL-3D' },
  { index: '02', name: 'AI & SOCIAL BOTS', persian: 'هوش مصنوعی و ربات‌های خودکار', code: 'LLM-OPS' },
  { index: '03', name: 'BRANDING & GRAPHIC', persian: 'هویت بصری و دیزاین سازمانی', code: 'BRD-ID' },
  { index: '04', name: 'MOTION & KINETICS', persian: 'موشن‌گرافیک و تیزرهای سینمایی', code: 'MOT-4K' },
];

export default function HeroAwwwardsCinematicNarrative() {
  const [activeDiscipline, setActiveDiscipline] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [typedDialogue, setTypedDialogue] = useState('');
  const [packetStatus, setPacketStatus] = useState<'TRANSMITTING' | 'RESOLVED'>('RESOLVED');

  const fullDialogue = 'SYSTEM_READY: 123Service Creative Engine initialized. National filtering bypass active. All assets self-hosted. 60 FPS verified.';

  useEffect(() => {
    let currentIdx = 0;
    setPacketStatus('TRANSMITTING');
    const interval = setInterval(() => {
      if (currentIdx <= fullDialogue.length) {
        setTypedDialogue(fullDialogue.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
        setPacketStatus('RESOLVED');
      }
    }, 28);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
      y: ((e.clientY - rect.top) / rect.height) * 2 - 1,
    });
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[750px] lg:min-h-[880px] bg-[#09090b] text-white overflow-hidden p-6 sm:p-12 flex flex-col justify-between select-none"
      >
        {/* Real-time WebGL Fluted Glass Refraction Caustics Canvas */}
        <FlutedGlassCanvas
          fluteDensity={34.0}
          refractionStrength={0.048}
          chromaticAberration={0.02}
          className="opacity-45"
        />

        {/* Ambient Film Grain & Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#09090b]/40 to-[#09090b] pointer-events-none z-0" />

        {/* TOP STATUS BAR & METADATA HUD */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#b8ff3d] animate-pulse" />
            <span className="text-white font-bold">123SERVICE // SOTD CANDIDATE</span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">PRECISION × CHAOS</span>
          </div>

          {/* Dialogue transmission packet */}
          <div className="hidden lg:flex items-center gap-2 bg-[#111116] px-3 py-1 rounded-xl border border-[#202027] text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-cyan-300 font-mono truncate max-w-sm">{typedDialogue}</span>
            <span className="w-1.5 h-3 bg-cyan-400 animate-pulse" />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (soundEnabled) soundFx.playClick(500);
                else soundFx.playChime(800, 0.2);
                setSoundEnabled(!soundEnabled);
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
              title="سوئیچ افکت‌های صوتی"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
              RTL-FIRST ARCHITECTURE
            </span>
          </div>
        </div>

        {/* MAIN EDITORIAL HERO SPREAD (BROKEN 12-COLUMN GRID) */}
        <div className="relative z-10 my-auto py-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Coordinate Ticker */}
            <div className="flex items-center gap-3 font-mono text-xs text-zinc-500">
              <span className="text-cyan-400 font-bold">COORD: 35.6892° N, 51.3890° E</span>
              <span>&bull;</span>
              <span>INDEX: 01 // WEB, 02 // AI, 03 // DESIGN</span>
            </div>

            {/* Oversized Kinetic Type Heading Breaking the Grid */}
            <div className="space-y-2">
              <h1 className="font-['Syne'] font-black text-4xl sm:text-6xl lg:text-8xl tracking-tight text-white uppercase leading-[0.95]">
                DIGITAL CREATIVE
              </h1>
              <div className="flex flex-wrap items-baseline gap-4">
                <span className="font-['Lalezar'] text-5xl sm:text-7xl lg:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-[#b8ff3d] leading-[0.9]">
                  موتور خلاقیت استودیو
                </span>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-400 self-center">
                  v2.8 PRODUCTION
                </span>
              </div>
            </div>

            {/* Sub-Manifesto & Magnetic CTA Button */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 items-end">
              <div className="md:col-span-7 space-y-3">
                <p className="font-['Plus_Jakarta_Sans','Vazirmatn'] text-base sm:text-lg text-zinc-300 font-light leading-relaxed">
                  طراحی بر مدار سه تضاد بنیادین: <strong className="text-white font-bold">دقت ریاضی در برابر آشوب خلاقیت</strong>، هندسه محاسباتی سه‌بعدی در جوار نگارش ژورنالی، و کدهای خودمیزبان بدون نیاز به اینترنت جهانی.
                </p>
                <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>LCP &lt; 2.5s</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-violet-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>INP &lt; 200ms</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>CLS &lt; 0.1</span>
                  </span>
                </div>
              </div>

              {/* Magnetic Interactive CTA */}
              <div className="md:col-span-5 flex flex-wrap items-center gap-3 md:justify-end">
                <button
                  onMouseEnter={() => {
                    if (soundEnabled) soundFx.playChime(850, 0.15);
                  }}
                  onClick={() => {
                    if (soundEnabled) soundFx.playClick(900);
                  }}
                  className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-cyan-400 text-black font-['Lalezar'] text-lg font-bold shadow-2xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group"
                >
                  <span>ورود به دی‌ان‌ای استودیو</span>
                  <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM DISCIPLINE INDEX CHIPS */}
        <div className="relative z-10 w-full pt-4 border-t border-[#202027]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {DISCIPLINE_INDEX.map((item, idx) => {
              const isActive = activeDiscipline === idx;
              return (
                <div
                  key={item.index}
                  onMouseEnter={() => {
                    setActiveDiscipline(idx);
                    if (soundEnabled) soundFx.playTick(500 + idx * 80);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#141520] border-cyan-400/80 shadow-lg shadow-cyan-500/20'
                      : 'bg-[#111116]/80 border-[#202027] hover:border-zinc-700'
                  }`}
                >
                  <div className="flex justify-between items-center font-mono text-[10px] text-zinc-500 mb-1">
                    <span className={isActive ? 'text-cyan-400 font-bold' : ''}>{item.index}</span>
                    <span className="text-zinc-600">{item.code}</span>
                  </div>
                  <div className="font-['Syne'] font-bold text-xs text-white truncate">{item.name}</div>
                  <div className="font-['Vazirmatn'] text-[11px] text-zinc-400 truncate mt-0.5">{item.persian}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
