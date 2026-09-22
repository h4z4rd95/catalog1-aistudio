import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Crown, Sparkles, ArrowDown, ArrowUp, ArrowRightLeft, RotateCcw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Scroll_V04_EditorialSplitSync',
  name: 'Haute Couture Dual-Column Split Counter-Scroll',
  category: 'Scroll',
  batch: 'Batch 4: Scroll Choreography & Infinite Canvas Pinning',
  techStack: ['Next.js / React', 'Dual Column Counter-Scroll', 'Cinzel Roman Typography', 'Haute Couture Editorial'],
  aestheticVibe: 'Luxury Minimalism & Editorial / Haute Couture',
  interactionBlueprint: 'Scrolling scrubs two vertical columns in opposing polarity: left editorial story slides down while right photographic silhouette panels ascend upward, converging seamlessly at designated collection chapters.',
  description: 'An ultra-refined luxury editorial counter-scroll showcase featuring synchronized opposing column translations, vermeil foil accents, and Roman typography.',
  tags: ['Split Scroll', 'Counter-Scrolling', 'Luxury Editorial', 'Cinzel Typography', 'Haute Couture'],
  codeSnippet: `// Opposing column offset calculation
const onScrollScrub = (progress: number) => {
  // Left column translates downwards (0 -> +offset)
  leftColumn.style.transform = \`translateY(-\${progress * (totalHeight - viewportHeight)}px)\`;
  // Right column translates upwards in reverse polarity
  rightColumn.style.transform = \`translateY(-\${(1 - progress) * (totalHeight - viewportHeight)}px)\`;
};`,
};

const collections = [
  {
    num: 'I',
    title: 'OBSIDIAN DRAPERY',
    year: 'FALL / WINTER 2026',
    motto: 'Noble wools, structural basalt tailoring, and matte velvet lapels.',
    accent: '#fef08a',
    spec: 'SILK CHENILLE &bull; BASALT FIBER',
    desc: 'Each garment is sculpted through tension draping over hand-carved mahogany mannequins.',
  },
  {
    num: 'II',
    title: 'VERMEIL CORONET',
    year: 'SALON PRIVÉ EXCLUSIVE',
    motto: 'Liquid 24-karat gold foil leaf heat-embossed onto raw silk faille.',
    accent: '#fde047',
    spec: '24K VERMEIL FOIL &bull; RAW SILK',
    desc: 'A fusion of ancient Florentine leaf gilding with hyper-contemporary architectural cutaways.',
  },
  {
    num: 'III',
    title: 'NOCTURNE VEIL',
    year: 'HAUTE COUTURE ARCHIVE',
    motto: 'Chantilly lace woven with microscopic light-attenuating optical threads.',
    accent: '#fef9c3',
    spec: 'OPTIC CHANTILLY &bull; SMOKED SATIN',
    desc: 'Light collapses across the fabric contours, producing an iridescent obsidian luminescence.',
  },
  {
    num: 'IV',
    title: 'SOLARIS MONOLITH',
    year: 'SPRING / SUMMER 2027',
    motto: 'Seamless bonded cashmere capelets with hand-forged brass closures.',
    accent: '#f59e0b',
    spec: 'DOUBLE-FACED CASHMERE &bull; BRASS',
    desc: 'An exploration of architectural purity, stripping away all seams to celebrate monolithic silhouette form.',
  },
];

export default function ScrollEditorialSplitSync() {
  const [scrubProgress, setScrubProgress] = useState(0);
  const targetScrub = useRef(0);
  const currentScrub = useRef(0);

  // Tunable parameters
  const [reversePolarity, setReversePolarity] = useState(false);
  const [scrollSmoothness, setScrollSmoothness] = useState(0.12);

  // Mouse wheel within component
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetScrub.current = Math.max(0, Math.min(1, targetScrub.current + e.deltaY * 0.0006));
  };

  // Drag interaction
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startVal = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startVal.current = targetScrub.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientY - startY.current) * 0.0018;
    targetScrub.current = Math.max(0, Math.min(1, startVal.current - delta));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Smooth lerp
  useEffect(() => {
    let animId: number;
    const loop = () => {
      currentScrub.current += (targetScrub.current - currentScrub.current) * scrollSmoothness;
      setScrubProgress(currentScrub.current);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [scrollSmoothness]);

  const jumpTo = (idx: number) => {
    soundFx.playChime(650 + idx * 80, 0.2);
    targetScrub.current = idx / (collections.length - 1);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Scroll Fluidity ({scrollSmoothness.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.05"
              max="0.30"
              step="0.02"
              value={scrollSmoothness}
              onChange={(e) => setScrollSmoothness(parseFloat(e.target.value))}
              className="w-full accent-amber-300"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Counter-Scroll Polarity
            </label>
            <button
              onClick={() => {
                soundFx.playClick(600);
                setReversePolarity(!reversePolarity);
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/10 text-amber-200 font-['Cinzel'] text-xs hover:bg-zinc-700 flex items-center justify-center gap-2 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{reversePolarity ? 'Polarity: Inverted' : 'Polarity: Natural'}</span>
            </button>
          </div>

          <div className="flex items-end gap-1.5">
            {collections.map((item, idx) => (
              <button
                key={item.num}
                onClick={() => jumpTo(idx)}
                className={`flex-1 py-1.5 rounded font-['Cinzel'] text-xs font-bold border transition-colors ${
                  Math.abs(scrubProgress - idx / (collections.length - 1)) < 0.18
                    ? 'bg-amber-300 text-black border-amber-300'
                    : 'bg-zinc-800 text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                {item.num}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[90vh] bg-[#07070a] text-zinc-100 flex flex-col justify-between overflow-hidden select-none border-y border-white/10 cursor-ns-resize"
      >
        {/* Top Header */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-8 pt-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <Crown className="w-4 h-4 text-amber-300" />
            <span className="font-['Cinzel'] text-xs tracking-[0.25em] font-bold text-amber-200 uppercase">
              MAISON AURELIA &bull; SPLIT COUNTER-SCROLL
            </span>
          </div>

          <div className="flex items-center gap-4 font-['Cinzel'] text-xs text-amber-300/80 bg-black/60 px-4 py-1.5 rounded-full border border-amber-300/20 backdrop-blur-md">
            <span>SCRUB ARCHIVE:</span>
            <span className="font-bold text-amber-200">{Math.round(scrubProgress * 100)}%</span>
          </div>
        </div>

        {/* Center Split Screen Stage */}
        <div className="relative z-20 w-full flex-1 flex overflow-hidden my-4">
          
          {/* Left Column: Editorial Titles (Translates along natural scrub) */}
          <div className="w-1/2 h-full relative overflow-hidden border-r border-amber-300/15 flex flex-col items-center justify-center p-6 sm:p-12">
            <div
              style={{
                transform: `translateY(${
                  reversePolarity
                    ? (1 - scrubProgress) * 200 - 100
                    : -scrubProgress * 300 + 150
                }px)`,
                transition: isDragging.current ? 'none' : 'transform 0.08s ease-out',
              }}
              className="w-full max-w-md space-y-16"
            >
              {collections.map((c, i) => (
                <div key={c.num} className="space-y-4">
                  <div className="flex items-center gap-2 text-amber-300/70 font-['Cinzel'] text-xs tracking-[0.3em]">
                    <span>ACTE {c.num}</span>
                    <span>&bull;</span>
                    <span>{c.year}</span>
                  </div>

                  <h3 className="font-['Cinzel'] text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-none">
                    {c.title}
                  </h3>

                  <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                    {c.motto}
                  </p>

                  <div className="pt-2 font-mono text-[10px] tracking-widest text-amber-300/80 uppercase">
                    {c.spec}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Visual Silhouette Panels (Translates in OPPOSING direction) */}
          <div className="w-1/2 h-full relative overflow-hidden flex flex-col items-center justify-center p-6 sm:p-12">
            <div
              style={{
                transform: `translateY(${
                  reversePolarity
                    ? -scrubProgress * 300 + 150
                    : (1 - scrubProgress) * 300 - 150
                }px)`,
                transition: isDragging.current ? 'none' : 'transform 0.08s ease-out',
              }}
              className="w-full max-w-md space-y-16"
            >
              {collections.map((c, i) => (
                <div
                  key={c.num}
                  className="p-8 rounded-2xl bg-[#0e0e14] border border-amber-300/20 shadow-2xl relative overflow-hidden group hover:border-amber-300/40 transition-colors"
                >
                  {/* Vermeil Foil Specular Reflection */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-radial from-amber-400/10 to-transparent pointer-events-none" />

                  <div className="w-10 h-10 rounded-full border border-amber-300/30 flex items-center justify-center text-amber-300 mb-6 font-['Cinzel'] font-bold text-sm">
                    {c.num}
                  </div>

                  <h4 className="font-['Cinzel'] text-xl tracking-[0.1em] font-bold text-amber-100 uppercase mb-2">
                    {c.title}
                  </h4>

                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-zinc-400 leading-relaxed font-light">
                    {c.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                    <span>ATELIER ARCHIVE</span>
                    <span className="text-amber-300 font-bold">READY TO WEAR</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Rails */}
        <div className="relative z-30 w-full max-w-6xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-80">
            <span className="font-['Cinzel'] text-[10px] text-zinc-500 tracking-widest whitespace-nowrap">
              ATELIER SCRUB
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrubProgress}
              onChange={(e) => {
                targetScrub.current = parseFloat(e.target.value);
              }}
              className="w-full accent-amber-300 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            {collections.map((item, idx) => (
              <button
                key={item.num}
                onClick={() => jumpTo(idx)}
                className={`px-3 py-1 rounded font-['Cinzel'] text-xs transition-all border ${
                  Math.abs(scrubProgress - idx / (collections.length - 1)) < 0.18
                    ? 'bg-amber-300 text-black font-bold border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
                data-cursor="hover"
              >
                Acte {item.num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
