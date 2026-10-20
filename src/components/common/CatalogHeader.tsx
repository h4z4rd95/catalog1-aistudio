import React, { useState, useEffect } from 'react';
import { AestheticFilter, TechFilter } from '../../types';
import { Volume2, VolumeX, Sparkles, Layers, ArrowLeft, ArrowRight, Search, Music, BookOpen } from 'lucide-react';
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
  onOpenDesignDocs?: () => void;
  viewMode?: string;
  onSelectViewMode?: (mode: string) => void;
  onReturnToHub?: () => void;
}

export default function CatalogHeader({
  currentAesthetic,
  onSelectAesthetic,
  activeBatch = 'ALL',
  onOpenSearch,
  onOpenDesignDocs,
  onReturnToHub,
}: CatalogHeaderProps) {
  const [ambientEnabled, setAmbientEnabled] = useState(false);
  const [showAmbientMenu, setShowAmbientMenu] = useState(false);
  const [ambientPreset, setAmbientPreset] = useState<'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL'>('SANCTUARY');
  const [soundEnabled, setSoundEnabled] = useState(true);

  const { language } = useStore();
  const isFa = language === 'fa';

  const toggleSound = () => {
    const newState = soundFx.toggle();
    setSoundEnabled(newState);
  };

  const toggleAmbientDrone = () => {
    const active = soundFx.toggleAmbientDrone();
    setAmbientEnabled(active);
  };

  return (
    <div className="w-full border-b border-white/10 bg-[#06080d]/95 backdrop-blur-xl py-3 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs font-mono">
        {/* Left: Hub Return Button & Title Badge */}
        <div className="flex flex-wrap items-center gap-2.5">
          {onReturnToHub && (
            <button
              onClick={() => {
                soundFx.playClick(600);
                onReturnToHub();
              }}
              className="px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-400/30 text-cyan-300 font-bold flex items-center gap-1.5 transition-all shadow-sm"
            >
              {isFa ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{isFa ? 'بازگشت به هاب دسته‌بندی‌ها' : 'Categories Hub'}</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-zinc-300">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-bold text-white">
              {isFa ? 'کاتالوگ یکپارچه ۶۰ قطعه' : '60-Item Catalog'}
            </span>
            <span className="text-zinc-500">•</span>
            <span className="text-emerald-400 font-bold">100% Live</span>
          </div>

          <button
            onClick={() => {
              soundFx.playChime(900, 0.2);
              window.dispatchEvent(
                new CustomEvent('open-ai-playbook', {
                  detail: { id: activeBatch !== 'ALL' ? activeBatch : 'BATCH_1' },
                })
              );
            }}
            className="px-3 py-1.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 font-bold flex items-center gap-1.5 transition-all"
            title={isFa ? 'دفترچه راهنمای هوش مصنوعی و پرامپت‌ها' : 'AI Playbook'}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">{isFa ? 'راهنمای هوش مصنوعی' : 'AI Playbook'}</span>
          </button>
        </div>

        {/* Center: Aesthetic Filter Pills (Wrapped cleanly without horizontal scrolling) */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-500 font-bold uppercase text-[10px] mr-1">
            {isFa ? 'سبک:' : 'STYLE:'}
          </span>
          {[
            { id: 'ALL' as AestheticFilter, labelFa: 'همه سبک‌ها', labelEn: 'All Styles' },
            { id: 'CHROMATIC' as AestheticFilter, labelFa: 'کروماتیک', labelEn: 'Chromatic' },
            { id: 'NEO_BRUTALIST' as AestheticFilter, labelFa: 'بروتالیست', labelEn: 'Brutalist' },
            { id: 'CYBERPUNK' as AestheticFilter, labelFa: 'سایبرپانک', labelEn: 'Cyberpunk' },
            { id: 'LUXURY_EDITORIAL' as AestheticFilter, labelFa: 'لوکس', labelEn: 'Luxury' },
            { id: 'WEBGL_3D' as AestheticFilter, labelFa: 'وب‌جی‌ال ۳بعدی', labelEn: 'WebGL 3D' },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                soundFx.playClick(650);
                onSelectAesthetic(filter.id);
              }}
              className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all border ${
                currentAesthetic === filter.id
                  ? 'bg-amber-400 text-black border-amber-400 shadow-sm font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
              }`}
            >
              {isFa ? filter.labelFa : filter.labelEn}
            </button>
          ))}
        </div>

        {/* Right: Ambient Synth & Sound Controls */}
        <div className="flex items-center gap-2">
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
                title="Toggle generative ambient soundscape"
              >
                <Music className={`w-3.5 h-3.5 ${ambientEnabled ? 'text-violet-400 animate-pulse' : ''}`} />
                <span className="hidden md:inline">AMBIENT</span>
              </button>
              <button
                onClick={() => setShowAmbientMenu(!showAmbientMenu)}
                className={`px-1.5 py-1 rounded-r-lg font-mono text-[10px] border border-l-0 transition-all ${
                  ambientEnabled
                    ? 'bg-violet-500/30 text-violet-200 border-violet-400/50'
                    : 'bg-zinc-900 text-zinc-400 border-white/10 hover:text-white'
                }`}
                title="Select ambient sound preset"
              >
                ▼
              </button>
            </div>

            {showAmbientMenu && (
              <div className="absolute right-0 top-full mt-2 w-60 bg-zinc-950 border border-violet-500/30 rounded-xl p-2.5 shadow-2xl z-50 font-mono text-xs text-zinc-300">
                <span className="text-[10px] text-violet-400 font-bold block uppercase tracking-wider mb-1.5">
                  AMBIENT DRONE PRESETS
                </span>
                <div className="space-y-1">
                  {[
                    { id: 'SANCTUARY', label: 'Eb Sanctuary', desc: 'Harmonic drone' },
                    { id: 'SOLFEGGIO_528', label: '528 Hz Solfeggio', desc: 'Resonant chime' },
                    { id: 'ZEN_WARMTH', label: 'Zen 432 Hz', desc: 'Singing bowl' },
                    { id: 'CELESTIAL', label: 'Celestial Lydian', desc: 'Air & stardust' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        setAmbientPreset(p.id as any);
                        soundFx.setAmbientPreset(p.id as any);
                        soundFx.playChime(600, 0.2);
                        if (!ambientEnabled) toggleAmbientDrone();
                        setShowAmbientMenu(false);
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
              </div>
            )}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            className={`p-1.5 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-white/5 text-cyan-300 border-cyan-400/30'
                : 'bg-zinc-900 text-zinc-500 border-white/10'
            }`}
            title="Toggle haptic audio effects"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
