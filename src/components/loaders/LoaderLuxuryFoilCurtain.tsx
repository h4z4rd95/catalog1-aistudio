import React, { useState, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Sparkles, Crown, RotateCcw, ArrowRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Loader_V04_LuxuryFoilCurtain',
  name: 'Haute Couture Gold Foil & Dual Velvet Curtain Split',
  category: 'Loader',
  batch: 'Batch 3: Immersive Page Loaders & Fluid Transitions',
  techStack: ['Next.js / React', 'Gold Foil Specular Shader', 'Cinzel Roman Serif', 'Dual Velvet Split'],
  aestheticVibe: 'Luxury Minimalism & Editorial / Haute Couture',
  interactionBlueprint: 'Roman monogram emblem illuminates with liquid vermeil foil reflections; dual velvet curtain panels part down the center with golden stardust diffusion.',
  description: 'An ultra-refined editorial preloader that fills a bespoke Roman insignia with liquid gold foil reflections before parting dual velvet drapery to unveil the atelier.',
  tags: ['Luxury Preloader', 'Gold Foil', 'Cinzel Typography', 'Curtain Split', 'Haute Couture'],
  codeSnippet: `// Specular Liquid Gold Sweep Transition
const triggerVelvetSplit = () => {
  // Illuminates gold foil emblem
  setGoldIllumination(1.0);
  setTimeout(() => {
    // Splits left and right velvet curtains
    setCurtainSplitProgress(100);
    soundFx.playChime(750, 0.4);
  }, 1200);
};`,
};

const monograms = [
  { id: 'aurelia', title: 'MAISON AURELIA', year: '1928', motto: 'Architectural Haute Couture & Noble Fibers' },
  { id: 'nocturne', title: 'ATELIER NOCTURNE', year: '1964', motto: 'Obsidian Basalt & Velvet Precision' },
  { id: 'solaris', title: 'SOLARIS VERMEIL', year: '2026', motto: 'Liquid Gold Leaf & Monolithic Silks' },
];

export default function LoaderLuxuryFoilCurtain() {
  const [selectedMonogram, setSelectedMonogram] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Tunable parameters
  const [glowIntensity, setGlowIntensity] = useState(1.4);

  const startPreloader = () => {
    soundFx.playChime(600, 0.2);
    setIsRunning(true);
    setIsCurtainOpen(false);
    setProgress(0);

    let p = 0;
    const timer = setInterval(() => {
      p += 2;
      setProgress(p);

      if (p >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          setIsCurtainOpen(true);
          setIsRunning(false);
          soundFx.playChime(880, 0.4);
        }, 300);
      }
    }, 25);
  };

  useEffect(() => {
    startPreloader();
  }, [selectedMonogram]);

  const current = monograms[selectedMonogram];

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Active Maison Monogram
            </label>
            <div className="flex gap-1">
              {monograms.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMonogram(idx)}
                  className={`flex-1 py-1 rounded font-['Cinzel'] text-[11px] border ${
                    selectedMonogram === idx
                      ? 'bg-amber-300 text-black border-amber-300 font-bold'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}
                >
                  0{idx + 1}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Vermeil Glow Specular ({glowIntensity.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.1"
              value={glowIntensity}
              onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
              className="w-full accent-amber-300"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={startPreloader}
              disabled={isRunning}
              className="w-full py-1.5 px-3 rounded bg-amber-300 disabled:opacity-50 text-black font-['Cinzel'] text-xs font-bold uppercase hover:bg-amber-200 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Unfurl Maison Velvet</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-hidden select-none border-y border-white/10">
        
        {/* Underlying Atelier Viewport (Revealed behind curtain) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-8 py-24 my-auto text-center">
          <div className="w-12 h-12 rounded-full border border-amber-300/40 text-amber-300 flex items-center justify-center mx-auto mb-6">
            <Crown className="w-6 h-6" />
          </div>

          <span className="font-['Cinzel'] text-xs tracking-[0.3em] text-amber-300/80 uppercase block mb-3">
            {current.year} COLLECTION &bull; SALON PRIVÉ
          </span>

          <h3 className="font-['Cinzel'] text-4xl sm:text-6xl font-bold tracking-[0.1em] text-white uppercase leading-tight">
            {current.title}
          </h3>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-light">
            {current.motto}. Curtains parted down the center with bespoke velvet physics.
          </p>

          <div className="mt-8">
            <button
              onClick={startPreloader}
              className="px-8 py-3.5 rounded-full border border-amber-300/60 bg-amber-400/10 hover:bg-amber-300 hover:text-black text-amber-200 font-['Cinzel'] text-xs uppercase tracking-[0.25em] font-bold transition-all"
              data-cursor="hover"
            >
              Replay Curtain Unfurl
            </button>
          </div>
        </div>

        {/* Dual Center-Split Velvet Curtains */}
        <div className="absolute inset-0 z-30 pointer-events-none flex">
          {/* Left Curtain Panel */}
          <div
            style={{
              transform: isCurtainOpen ? 'translateX(-100%)' : 'translateX(0%)',
              transition: 'transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
            className="w-1/2 h-full bg-[#09090c] border-r border-amber-300/20 shadow-2xl relative flex items-center justify-end pr-8"
          >
            {/* Ambient Gold Stardust */}
            <div className="absolute inset-0 bg-radial from-amber-400/5 to-transparent pointer-events-none" />
          </div>

          {/* Right Curtain Panel */}
          <div
            style={{
              transform: isCurtainOpen ? 'translateX(100%)' : 'translateX(0%)',
              transition: 'transform 0.9s cubic-bezier(0.77, 0, 0.175, 1)',
            }}
            className="w-1/2 h-full bg-[#09090c] border-l border-amber-300/20 shadow-2xl relative flex items-center justify-start pl-8"
          >
            <div className="absolute inset-0 bg-radial from-amber-400/5 to-transparent pointer-events-none" />
          </div>

          {/* Centered Liquid Gold Monogram Emblem (Fades when opened) */}
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500 pointer-events-none ${
              isCurtainOpen ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
            }`}
          >
            <div 
              style={{
                filter: `drop-shadow(0 0 ${glowIntensity * 15}px rgba(251,191,36,0.6))`,
              }}
              className="w-24 h-24 rounded-full border-2 border-amber-300/80 flex items-center justify-center relative mb-4"
            >
              <Crown className="w-10 h-10 text-amber-300 animate-pulse" />
              <div 
                className="absolute inset-0 rounded-full border-2 border-amber-400/30 animate-ping"
                style={{ animationDuration: '3s' }}
              />
            </div>

            <h4 className="font-['Cinzel'] text-xl tracking-[0.3em] font-bold text-amber-200 uppercase mb-2">
              {current.title}
            </h4>

            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mt-3">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-mono text-[10px] text-amber-300/70 tracking-widest mt-2 uppercase">
              VERMEIL INFUSION // {progress}%
            </span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
