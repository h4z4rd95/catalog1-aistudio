import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { ArrowLeft, ArrowRight, Layers, Sliders, Eye, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Scroll_V01_HorizontalParallaxGallery',
  name: 'Multi-Layer Horizontal Parallax Gallery & Inertia Scrub',
  category: 'Scroll',
  batch: 'Batch 4: Scroll Choreography & Infinite Canvas Pinning',
  techStack: ['Next.js / React', 'Horizontal Virtual Scroll', 'Multi-Layer Parallax', 'Inertia Physics'],
  aestheticVibe: 'Chromatic Liquid Gradient / Kinetic Neo-Editorial',
  interactionBlueprint: 'Scrolling or dragging scrubs horizontally across three independent parallax planes (background ambient gradient, midground exhibition cards with hover tilt, and foreground kinetic display type translating at 2.4x velocity).',
  description: 'An Awwwards Site-of-the-Day caliber horizontal exhibition gallery featuring independent multi-plane parallax depth, momentum damping, and interactive project inspector cards.',
  tags: ['Horizontal Scroll', 'Multi-Layer Parallax', 'Inertia Scrub', 'Kinetic Typography', 'Depth Perspective'],
  codeSnippet: `// Multi-plane parallax offset calculation
const onScrollScrub = (delta: number) => {
  targetScrollX.current = Math.max(0, Math.min(maxScroll, targetScrollX.current + delta));
  // Background translates at 0.35x velocity
  bgLayer.style.transform = \`translateX(-\${targetScrollX.current * 0.35}px)\`;
  // Midground cards translate at 1.0x velocity with 3D tilt
  midLayer.style.transform = \`translateX(-\${targetScrollX.current}px)\`;
  // Foreground kinetic type translates at 2.4x velocity
  fgLayer.style.transform = \`translateX(-\${targetScrollX.current * 2.4}px)\`;
};`,
};

const exhibitionItems = [
  {
    id: '01',
    title: 'CHROMATIC VORTEX',
    tag: 'GLSL FLUID DYNAMICS',
    year: '2026',
    desc: 'Bespoke WebGL Eulerian fluid grid simulation exploring Navier-Stokes liquid advection.',
    color: 'from-pink-500/20 via-purple-500/20 to-cyan-500/20',
    accent: '#ec4899',
    badge: 'SITE OF THE DAY',
  },
  {
    id: '02',
    title: 'OBSIDIAN MONOLITH',
    tag: 'SPATIAL ARCHITECTURE',
    year: '2026',
    desc: 'Brutalist dark-mode architectural showroom rendered with procedural basalt displacement maps.',
    color: 'from-zinc-800/40 via-zinc-900/60 to-black',
    accent: '#38bdf8',
    badge: 'DEVELOPER AWARD',
  },
  {
    id: '03',
    title: 'SOLARIS VERMEIL',
    tag: 'HAUTE COUTURE EDITORIAL',
    year: '2025',
    desc: 'Editorial luxury archive with liquid gold leaf specular reflections and Roman typography.',
    color: 'from-amber-500/20 via-yellow-500/10 to-amber-900/20',
    accent: '#f59e0b',
    badge: 'HONORABLE MENTION',
  },
  {
    id: '04',
    title: 'NEURAL SUB-MATRIX',
    tag: 'CYBER DIAGNOSTIC HUD',
    year: '2026',
    desc: 'High-density holographic command center displaying real-time telemetry and shader registers.',
    color: 'from-cyan-500/20 via-emerald-500/10 to-blue-900/20',
    accent: '#06b6d4',
    badge: 'INNOVATION WINNER',
  },
  {
    id: '05',
    title: 'QUANTUM TORUS',
    tag: 'PARAMETRIC 3D GEOMETRY',
    year: '2026',
    desc: 'Gravitational particle attractor calculating chaotic Brownian transitions into Torus Knot topology.',
    color: 'from-violet-500/20 via-indigo-500/20 to-sky-500/20',
    accent: '#a855f7',
    badge: 'EXPERIMENTAL EXCELLENCE',
  },
];

export default function ScrollHorizontalParallaxGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  // Tunable controls
  const [inertiaFactor, setInertiaFactor] = useState(0.85);
  const [foregroundSpeed, setForegroundSpeed] = useState(2.2);

  // State for horizontal scroll position (0 to 1)
  const currentScrollX = useRef(0);
  const targetScrollX = useRef(0);
  const isDragging = useRef(false);
  const startDragX = useRef(0);
  const startScrollVal = useRef(0);

  // Wheel scrubbing inside component
  const handleWheel = (e: React.WheelEvent) => {
    // Only intercept if shift is pressed or horizontal intent, or prevent and scrub
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      e.preventDefault();
      targetScrollX.current = Math.max(0, Math.min(1, targetScrollX.current + e.deltaX * 0.0008));
    } else if (e.shiftKey) {
      e.preventDefault();
      targetScrollX.current = Math.max(0, Math.min(1, targetScrollX.current + e.deltaY * 0.0008));
    }
  };

  // Drag scrubbing
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startDragX.current = e.clientX;
    startScrollVal.current = targetScrollX.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (startDragX.current - e.clientX) * 0.0012;
    targetScrollX.current = Math.max(0, Math.min(1, startScrollVal.current + delta));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Smooth inertia lerp loop
  useEffect(() => {
    let animId: number;
    const loop = () => {
      currentScrollX.current += (targetScrollX.current - currentScrollX.current) * (1 - inertiaFactor * 0.8);
      setScrollProgress(currentScrollX.current);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [inertiaFactor]);

  // Jump helpers
  const jumpTo = (pct: number) => {
    soundFx.playClick(600 + pct * 600, 0.03);
    targetScrollX.current = pct;
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Inertia Damping ({inertiaFactor.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.5"
              max="0.95"
              step="0.05"
              value={inertiaFactor}
              onChange={(e) => setInertiaFactor(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Foreground Typo Speed ({foregroundSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="1.2"
              max="3.5"
              step="0.1"
              value={foregroundSpeed}
              onChange={(e) => setForegroundSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => jumpTo(0)}
              className="flex-1 py-1.5 px-2 rounded bg-zinc-800 border border-white/10 hover:bg-zinc-700 font-mono text-[11px] text-zinc-300 transition-colors"
            >
              Start
            </button>
            <button
              onClick={() => jumpTo(0.5)}
              className="flex-1 py-1.5 px-2 rounded bg-zinc-800 border border-white/10 hover:bg-zinc-700 font-mono text-[11px] text-zinc-300 transition-colors"
            >
              Mid
            </button>
            <button
              onClick={() => jumpTo(1.0)}
              className="flex-1 py-1.5 px-2 rounded bg-cyan-400 text-black font-bold font-mono text-[11px] hover:bg-cyan-300 transition-colors"
            >
              End
            </button>
          </div>
        </div>
      }
    >
      <div
        ref={containerRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[90vh] bg-[#06070c] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10 cursor-grab active:cursor-grabbing"
      >
        {/* Layer 1: Background Ambient Drift Mesh (0.35x speed) */}
        <div
          style={{
            transform: `translateX(-${scrollProgress * 25}%)`,
          }}
          className="absolute inset-0 w-[200%] h-full pointer-events-none flex"
        >
          <div className="w-1/2 h-full bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.15),transparent_60%)]" />
          <div className="w-1/2 h-full bg-[radial-gradient(circle_at_70%_60%,rgba(56,189,248,0.18),transparent_60%)]" />
          <div className="w-1/2 h-full bg-[radial-gradient(circle_at_40%_80%,rgba(168,85,247,0.15),transparent_60%)]" />
        </div>

        {/* Top Header & Telemetry */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-8 pt-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
              PARALLAX_GALLERY // V01
            </span>
          </div>

          {/* Scrub percentage indicator */}
          <div className="flex items-center gap-4 font-mono text-xs text-zinc-400">
            <span className="hidden sm:inline">HOLD &amp; DRAG OR USE SCRUBBER</span>
            <span className="px-3 py-1 rounded bg-white/5 border border-white/10 text-white font-bold">
              {Math.round(scrollProgress * 100)}%
            </span>
          </div>
        </div>

        {/* Layer 2: Foreground Giant Kinetic Monospace Typography (foregroundSpeed * velocity) */}
        <div
          style={{
            transform: `translateX(-${scrollProgress * 120 * foregroundSpeed}px)`,
          }}
          className="absolute top-1/2 -translate-y-1/2 w-[350vw] pointer-events-none z-10 opacity-10 flex items-center whitespace-nowrap select-none"
        >
          <span className="font-['Syne'] text-[18vw] font-black uppercase tracking-tighter text-white">
            CHOREOGRAPHY &bull; PARALLAX &bull; MOMENTUM &bull; KINETIC &bull; ATMOSPHERE &bull; PERSPECTIVE
          </span>
        </div>

        {/* Layer 3: Midground Exhibition Cards (1.0x baseline velocity) */}
        <div className="relative z-20 w-full my-auto overflow-visible py-8">
          <div
            style={{
              transform: `translateX(-${scrollProgress * 65}%)`,
              transition: isDragging.current ? 'none' : 'transform 0.05s linear',
            }}
            className="flex items-center gap-8 pl-8 sm:pl-16 w-max"
          >
            {exhibitionItems.map((item, idx) => (
              <div
                key={item.id}
                onMouseEnter={() => {
                  soundFx.playClick(800 + idx * 80, 0.02);
                  setActiveCard(idx);
                }}
                onMouseLeave={() => setActiveCard(null)}
                className={`relative w-[300px] sm:w-[380px] h-[440px] rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 group cursor-pointer backdrop-blur-xl ${
                  activeCard === idx
                    ? 'border-cyan-400/80 bg-zinc-900/90 shadow-[0_0_40px_rgba(6,182,212,0.3)] -translate-y-2'
                    : 'border-white/10 bg-zinc-950/70 hover:border-white/30'
                }`}
                data-cursor="hover"
              >
                {/* Accent glow on card */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.color} opacity-40 pointer-events-none`}
                />

                {/* Card Top Details */}
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-400">
                    EXHIBIT_{item.id}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20 font-mono text-[9px] font-bold text-zinc-300">
                    {item.badge}
                  </span>
                </div>

                {/* Card Center Visual / Geometry */}
                <div className="relative z-10 my-auto py-4">
                  <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase block mb-1">
                    {item.tag} // {item.year}
                  </span>
                  <h4 className="font-['Syne'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug group-hover:text-cyan-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="mt-3 font-['Plus_Jakarta_Sans'] text-xs text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs">
                  <span className="text-zinc-500">INERTIA: READY</span>
                  <span className="flex items-center gap-1 text-cyan-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>EXPLORE SPEC</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Scrub Bar & Controls */}
        <div className="relative z-30 w-full max-w-6xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-80">
            <span className="font-mono text-[10px] text-zinc-500 whitespace-nowrap">
              SCRUB RAIL
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrollProgress}
              onChange={(e) => {
                targetScrollX.current = parseFloat(e.target.value);
              }}
              className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Direct Slide Navigation Tabs */}
          <div className="flex items-center gap-1.5">
            {exhibitionItems.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => jumpTo(idx / (exhibitionItems.length - 1))}
                className={`px-3 py-1 rounded font-mono text-[11px] transition-all border ${
                  Math.abs(scrollProgress - idx / (exhibitionItems.length - 1)) < 0.15
                    ? 'bg-cyan-400 text-black font-bold border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
                data-cursor="hover"
              >
                0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
