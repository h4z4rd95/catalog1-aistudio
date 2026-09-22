import React, { useState, useEffect } from 'react';
import { AestheticFilter, TechFilter } from '../../types';
import { Volume2, VolumeX, Sparkles, Activity, Layers, ArrowDown, Search, Radio, Music } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface CatalogHeaderProps {
  currentAesthetic: AestheticFilter;
  onSelectAesthetic: (a: AestheticFilter) => void;
  currentTech: TechFilter;
  onSelectTech: (t: TechFilter) => void;
  activeBatch: string;
  onSelectBatch: (b: string) => void;
  onOpenSearch?: () => void;
}

export default function CatalogHeader({
  currentAesthetic,
  onSelectAesthetic,
  currentTech,
  onSelectTech,
  activeBatch,
  onSelectBatch,
  onOpenSearch,
}: CatalogHeaderProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const measureFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(measureFps);
    };
    animId = requestAnimationFrame(measureFps);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const toggleAmbientDrone = () => {
    const active = soundFx.toggleAmbientDrone();
    setAmbientEnabled(active);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#050608]/90 backdrop-blur-xl">
      {/* Top Brand & Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-mono text-xs font-black tracking-widest text-white uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
              VIBE CODING &bull; VISUAL CATALOG
            </span>
          </div>
          <span className="text-zinc-600">|</span>
          <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">
            Awwwards-Level Interactive Architecture
          </span>
        </div>

        {/* Right Status Indicators & Sound */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Omni-Search ⌘K Button */}
          <button
            onClick={() => {
              soundFx.playChime(900, 0.2);
              onOpenSearch?.();
            }}
            className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] transition-all group shadow-sm"
            title="Search all 50 variations (Shortcut: ⌘K or Ctrl+K)"
            data-cursor="hover"
          >
            <Search className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Search</span>
            <span className="px-1.5 py-0.2 rounded bg-white/10 border border-white/10 text-[9px] text-zinc-400 font-bold">
              ⌘K
            </span>
          </button>

          {/* Ambient Generative Drone Synth Toggle */}
          <button
            onClick={toggleAmbientDrone}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-all ${
              ambientEnabled
                ? 'bg-violet-500/20 text-violet-300 border-violet-400/50 font-bold shadow-[0_0_12px_rgba(167,139,250,0.3)]'
                : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title="Toggle generative warm ambient harmonic drone soundscape"
            data-cursor="hover"
          >
            <Music className={`w-3.5 h-3.5 ${ambientEnabled ? 'text-violet-400 animate-pulse' : ''}`} />
            <span className="hidden md:inline">AMBIENT</span>
            <div className="flex items-end gap-0.5 h-2.5">
              <span className={`w-0.5 bg-violet-400 rounded-full transition-all ${ambientEnabled ? 'h-2 animate-bounce' : 'h-1'}`} style={{ animationDelay: '0ms' }} />
              <span className={`w-0.5 bg-violet-400 rounded-full transition-all ${ambientEnabled ? 'h-3 animate-bounce' : 'h-1.5'}`} style={{ animationDelay: '150ms' }} />
              <span className={`w-0.5 bg-violet-400 rounded-full transition-all ${ambientEnabled ? 'h-1.5 animate-bounce' : 'h-0.5'}`} style={{ animationDelay: '300ms' }} />
            </div>
          </button>

          {/* FPS Monitor */}
          <div className="hidden lg:flex items-center gap-1.5 px-2 py-0.5 rounded bg-zinc-900 border border-white/10 font-mono text-[11px]">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="text-zinc-400">FPS:</span>
            <span className={fps >= 55 ? 'text-emerald-400 font-bold' : 'text-amber-400 font-bold'}>
              {fps}
            </span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-mono text-[11px] border transition-colors ${
              soundEnabled
                ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
            }`}
            title="Toggle procedural Web Audio synthetic feedback"
            data-cursor="hover"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span>{soundEnabled ? 'FX ON' : 'FX OFF'}</span>
          </button>
        </div>
      </div>

      {/* Navigation & Permutation Matrix Control Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        {/* Batch Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-zinc-500 font-mono text-[11px] flex items-center gap-1 shrink-0">
            <Layers className="w-3 h-3" /> SHOWROOM:
          </span>
          <button
            onClick={() => {
              soundFx.playClick(600);
              onSelectBatch('ALL');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'ALL'
                ? 'bg-amber-400 text-black border-amber-400 shadow-sm'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            All Batches (50 Variations)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(600);
              onSelectBatch('BATCH_1');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_1'
                ? 'bg-white text-black border-white shadow-sm'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 1: Heroes (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(650);
              onSelectBatch('BATCH_2');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_2'
                ? 'bg-cyan-400 text-black border-cyan-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 2: Navigations (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(700);
              onSelectBatch('BATCH_3');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_3'
                ? 'bg-pink-500 text-white border-pink-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 3: Loaders (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(750);
              onSelectBatch('BATCH_4');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_4'
                ? 'bg-emerald-400 text-black border-emerald-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 4: Scroll (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(800);
              onSelectBatch('BATCH_5');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_5'
                ? 'bg-purple-400 text-black border-purple-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 5: Footers (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(850);
              onSelectBatch('BATCH_6');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_6'
                ? 'bg-amber-400 text-black border-amber-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 6: Dashboards (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(900);
              onSelectBatch('BATCH_7');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_7'
                ? 'bg-cyan-400 text-black border-cyan-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 7: Products (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(950);
              onSelectBatch('BATCH_8');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_8'
                ? 'bg-emerald-400 text-black border-emerald-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 8: Generative Art (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(1000);
              onSelectBatch('BATCH_9');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_9'
                ? 'bg-rose-400 text-black border-rose-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 9: Typography (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(1050);
              onSelectBatch('BATCH_10');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_10'
                ? 'bg-amber-300 text-black border-amber-300 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 10: Shaders (5)
          </button>

          <span className="font-mono text-[10px] text-emerald-400 px-2.5 py-0.5 border border-emerald-500/30 bg-emerald-950/40 rounded-full whitespace-nowrap hidden xl:inline font-bold">
            ✓ Complete Master Catalog (50/50 Live)
          </span>
        </div>

        {/* Aesthetic Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="text-zinc-500 font-mono text-[11px] shrink-0">FILTER:</span>
          {(
            [
              { id: 'ALL', label: 'All Vibe Archetypes' },
              { id: 'CHROMATIC', label: 'Chromatic Liquid' },
              { id: 'NEO_BRUTALIST', label: 'Neo-Brutalist' },
              { id: 'CYBERPUNK', label: 'Cyber Matrix' },
              { id: 'LUXURY_EDITORIAL', label: 'Luxury Editorial' },
              { id: 'WEBGL_3D', label: 'WebGL 3D Math' },
            ] as const
          ).map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                soundFx.playClick(700);
                onSelectAesthetic(filter.id);
              }}
              className={`px-2 py-0.5 rounded font-mono text-[11px] transition-all whitespace-nowrap ${
                currentAesthetic === filter.id
                  ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50 font-bold'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5 border border-transparent'
              }`}
              data-cursor="hover"
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}
