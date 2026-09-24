import React, { useState, useEffect } from 'react';
import { AestheticFilter, TechFilter } from '../../types';
import { Volume2, VolumeX, Sparkles, Activity, Layers, ArrowDown, Search, Radio, Music, Sun, Moon, Globe, ArrowLeftRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';

interface CatalogHeaderProps {
  currentAesthetic: AestheticFilter;
  onSelectAesthetic: (a: AestheticFilter) => void;
  currentTech: TechFilter;
  onSelectTech: (t: TechFilter) => void;
  activeBatch: string;
  onSelectBatch: (b: string) => void;
  onOpenSearch?: () => void;
  viewMode?: 'CATALOG' | 'SAMPLE_WEBSITE' | 'COFFEE_SAMPLE' | 'PC_BUILDER_SAMPLE' | 'WIKI_GAME_SAMPLE';
  onSelectViewMode?: (mode: 'CATALOG' | 'SAMPLE_WEBSITE' | 'COFFEE_SAMPLE' | 'PC_BUILDER_SAMPLE' | 'WIKI_GAME_SAMPLE') => void;
}

export default function CatalogHeader({
  currentAesthetic,
  onSelectAesthetic,
  currentTech,
  onSelectTech,
  activeBatch,
  onSelectBatch,
  onOpenSearch,
  viewMode = 'CATALOG',
  onSelectViewMode,
}: CatalogHeaderProps) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [showAmbientMenu, setShowAmbientMenu] = useState(false);
  const [ambientPreset, setAmbientPreset] = useState<'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL'>('SANCTUARY');
  const [ambientVol, setAmbientVol] = useState(0.022);
  const [fps, setFps] = useState(60);

  const { theme, toggleTheme, language, toggleLanguage, direction, toggleDirection, t } = useStore();
  const isLight = theme === 'light';

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

          {/* View Mode Switcher for all Samples */}
          <div className="flex flex-wrap items-center bg-black/70 border border-white/15 rounded-xl p-0.5 ml-2 font-mono text-[11px] gap-1">
            <button
              onClick={() => {
                soundFx.playClick(600);
                onSelectViewMode?.('CATALOG');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                viewMode === 'CATALOG'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {language === 'fa' ? 'نمایشگاه ۶۰ قطعه' : 'Showroom (60)'}
            </button>
            <button
              onClick={() => {
                soundFx.playChime(700, 0.2);
                onSelectViewMode?.('SAMPLE_WEBSITE');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all font-bold flex items-center gap-1 ${
                viewMode === 'SAMPLE_WEBSITE'
                  ? 'bg-cyan-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-cyan-300" />
              <span>{language === 'fa' ? 'وبسایت و فروشگاه آورا' : 'Aura Website'}</span>
            </button>
            <button
              onClick={() => {
                soundFx.playChime(750, 0.2);
                onSelectViewMode?.('COFFEE_SAMPLE');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all font-bold flex items-center gap-1 ${
                viewMode === 'COFFEE_SAMPLE'
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-amber-300/70 hover:text-amber-200'
              }`}
            >
              <span>☕ {language === 'fa' ? '۱۲۳کافی' : '123 Coffee'}</span>
            </button>
            <button
              onClick={() => {
                soundFx.playChime(780, 0.2);
                onSelectViewMode?.('PC_BUILDER_SAMPLE');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all font-bold flex items-center gap-1 ${
                viewMode === 'PC_BUILDER_SAMPLE'
                  ? 'bg-blue-400 text-black shadow-sm'
                  : 'text-blue-300/70 hover:text-blue-200'
              }`}
            >
              <span>🖥️ {language === 'fa' ? 'اسمبلر کامپیوتر' : 'PC Builder'}</span>
            </button>
            <button
              onClick={() => {
                soundFx.playChime(820, 0.2);
                onSelectViewMode?.('WIKI_GAME_SAMPLE');
              }}
              className={`px-2.5 py-1 rounded-lg transition-all font-bold flex items-center gap-1 ${
                viewMode === 'WIKI_GAME_SAMPLE'
                  ? 'bg-rose-500 text-white shadow-sm'
                  : 'text-rose-300/70 hover:text-rose-200'
              }`}
            >
              <span>🎮 {language === 'fa' ? 'ویکی‌گیم' : 'WikiGame'}</span>
            </button>
          </div>
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

          {/* Ambient Generative Drone Synth Controls */}
          <div className="relative">
            <div className="flex items-center">
              <button
                onClick={toggleAmbientDrone}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-l-lg font-mono text-[11px] border transition-all ${
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
              <button
                onClick={() => setShowAmbientMenu(!showAmbientMenu)}
                className={`px-1.5 py-1 rounded-r-lg font-mono text-[10px] border border-l-0 transition-all ${
                  ambientEnabled
                    ? 'bg-violet-500/30 text-violet-200 border-violet-400/50'
                    : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
                }`}
                title="Select ambient soundscape preset & volume"
              >
                ▼
              </button>
            </div>

            {/* Ambient Presets Dropdown */}
            {showAmbientMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-zinc-950 border border-violet-500/30 rounded-xl p-3 shadow-2xl z-50 font-mono text-xs text-zinc-300">
                <span className="text-[10px] text-violet-400 font-bold block uppercase tracking-wider mb-2">
                  AMBIENT SOUND PRESET
                </span>
                <div className="space-y-1 mb-3">
                  {[
                    { id: 'SANCTUARY', label: 'Eb Sanctuary (Warm)', desc: 'Eno-style harmonic drone' },
                    { id: 'SOLFEGGIO_528', label: '528 Hz Solfeggio', desc: 'Serene resonant chime' },
                    { id: 'ZEN_WARMTH', label: 'Zen 432 Hz', desc: 'Pythagorean bowl' },
                    { id: 'CELESTIAL', label: 'Celestial Lydian', desc: 'Air & soft stardust' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setAmbientPreset(p.id as any);
                        soundFx.setAmbientPreset(p.id as any);
                        soundFx.playChime(600, 0.2);
                        if (!ambientEnabled) toggleAmbientDrone();
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded transition-all flex flex-col ${
                        ambientPreset === p.id
                          ? 'bg-violet-950/60 text-violet-300 border border-violet-400/40 font-bold'
                          : 'hover:bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span className="text-[11px]">{p.label}</span>
                      <span className="text-[9px] text-zinc-500">{p.desc}</span>
                    </button>
                  ))}
                </div>

                <div className="border-t border-white/10 pt-2">
                  <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                    <span>VOLUME:</span>
                    <span>{Math.round(ambientVol * 1000)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.06"
                    step="0.002"
                    value={ambientVol}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      setAmbientVol(v);
                      soundFx.setAmbientVolume(v);
                    }}
                    className="w-full accent-violet-400 cursor-pointer"
                  />
                </div>
              </div>
            )}
          </div>

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

          {/* Theme Mode Toggle (White / Black) */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded-lg border flex items-center justify-center transition-all ${
              isLight
                ? 'bg-amber-100 border-amber-300 text-amber-700'
                : 'bg-zinc-900 border-white/10 text-amber-300 hover:text-white'
            }`}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            data-cursor="hover"
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Language Switcher (ENG / FA) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 px-2 py-1 rounded-lg border font-mono text-[11px] font-bold bg-zinc-900 border-white/10 text-cyan-400 hover:text-white transition-all"
            title="Switch Language: English / فارسی"
            data-cursor="hover"
          >
            <Globe className="w-3 h-3 text-cyan-400" />
            <span>{language === 'en' ? 'FA' : 'EN'}</span>
          </button>

          {/* Direction Switcher (LTR / RTL) */}
          <button
            onClick={toggleDirection}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border font-mono text-[10px] font-bold bg-zinc-900 border-white/10 text-indigo-400 hover:text-white transition-all"
            title="Switch Layout Direction: LTR / RTL"
            data-cursor="hover"
          >
            <ArrowLeftRight className="w-3 h-3 text-indigo-400" />
            <span>{direction.toUpperCase()}</span>
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
            All Batches (55 Variations)
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

          <button
            onClick={() => {
              soundFx.playClick(1100);
              onSelectBatch('BATCH_11');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_11'
                ? 'bg-cyan-300 text-black border-cyan-300 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 11: Forms &amp; Steppers (5)
          </button>

          <button
            onClick={() => {
              soundFx.playClick(1150);
              onSelectBatch('BATCH_12');
            }}
            className={`px-2.5 py-1 rounded-full font-mono text-[11px] font-semibold whitespace-nowrap transition-all border ${
              activeBatch === 'BATCH_12'
                ? 'bg-violet-400 text-black border-violet-400 shadow-sm font-bold'
                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
            }`}
            data-cursor="hover"
          >
            Batch 12: Spatial &amp; Physics (5)
          </button>

          <span className="font-mono text-[10px] text-emerald-400 px-2.5 py-0.5 border border-emerald-500/30 bg-emerald-950/40 rounded-full whitespace-nowrap hidden xl:inline font-bold">
            ✓ Master Catalog (60/60 Live)
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
