import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { ArrowRight, Compass, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V04_LuxuryEditorialCouture',
  name: 'Luxury Editorial & Haute Couture',
  category: 'Hero',
  batch: 'Batch 1: Next.js Hero Sections',
  techStack: ['Next.js / React', 'Cinzel Typography', 'Ambient Dust Particle Engine', 'Fluid Lookbook'],
  aestheticVibe: 'Luxury Minimalism & Editorial / Velvet Space',
  interactionBlueprint: 'Editorial lookbook editions advance with buttery cubic-bezier easing; golden stardust drifts with subtle mouse parallax and velvet acoustic feedback.',
  description: 'An ethereal haute-couture showcase pairing vast negative space with classical roman display serifs, golden stardust Brownian motion, and editorial edition pagination.',
  tags: ['Luxury', 'Editorial', 'Minimalism', 'Cinzel Typography', 'Haute Couture', 'Ambient Particles'],
  codeSnippet: `// Ambient Golden Stardust Brownian Motion Physics
const dust = particles.map(p => {
  p.angle += p.angularVelocity;
  p.x += Math.cos(p.angle) * p.speed + (mouse.x - width / 2) * 0.002;
  p.y += Math.sin(p.angle) * p.speed - 0.2; // gentle upward thermal draft

  if (p.y < 0) p.y = height;
  if (p.x < 0) p.x = width;
  if (p.x > width) p.x = 0;

  ctx.fillStyle = \`rgba(212, 175, 55, \${p.alpha})\`;
  ctx.fillRect(p.x, p.y, p.size, p.size);
});`,
};

interface DustParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  angularVelocity: number;
  alpha: number;
}

const editions = [
  {
    num: 'N° 01',
    season: 'AUTUMN / WINTER 2026',
    title: 'ATELIER NOCTURNE',
    tagline: 'An architectural dialogue between raw wool, obsidian silk, and negative light space.',
    paletteName: 'Obsidian & Gold Leaf',
    coords: '48.8566° N, 2.3522° E (PARIS)',
  },
  {
    num: 'N° 02',
    season: 'SPRING EQUINOX 2027',
    title: 'MONOLITHIC DRAPERY',
    tagline: 'Sculptural silhouettes cut from carbonized flax with uncompromised mathematical proportion.',
    paletteName: 'Chalk & Raw Basalt',
    coords: '35.6764° N, 139.6500° E (TOKYO)',
  },
  {
    num: 'N° 03',
    season: 'CRUISE RETROSPECTIVE',
    title: 'SOLARIS SILK',
    tagline: 'Reflective spun micro-fibers engineered to trap ambient dusk illumination.',
    paletteName: 'Amber Vermeil & Mist',
    coords: '40.7128° N, 74.0060° W (NEW YORK)',
  },
];

export default function HeroLuxuryEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const [dustCount, setDustCount] = useState(60);
  const [ambientGlow, setAmbientGlow] = useState(true);

  // Stardust canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = containerRef.current?.clientWidth || 800);
    let height = (canvas.height = containerRef.current?.clientHeight || 600);

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: DustParticle[] = [];
    for (let i = 0; i < dustCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.5,
        speed: Math.random() * 0.3 + 0.1,
        angle: Math.random() * Math.PI * 2,
        angularVelocity: (Math.random() - 0.5) * 0.02,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    let mouseX = width / 2;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
    };
    window.addEventListener('mousemove', onMouseMove);

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.angle += p.angularVelocity;
        p.x += Math.cos(p.angle) * p.speed + (mouseX - width / 2) * 0.0004;
        p.y += Math.sin(p.angle) * p.speed - 0.25;

        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.fillStyle = `rgba(234, 179, 8, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [dustCount]);

  const currentEdition = editions[activeIdx];

  const nextEdition = () => {
    soundFx.playChime(700, 0.3);
    setActiveIdx((prev) => (prev + 1) % editions.length);
  };

  const prevEdition = () => {
    soundFx.playChime(600, 0.3);
    setActiveIdx((prev) => (prev - 1 + editions.length) % editions.length);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Ambient Golden Stardust ({dustCount})
            </label>
            <input
              type="range"
              min="20"
              max="140"
              step="10"
              value={dustCount}
              onChange={(e) => setDustCount(parseInt(e.target.value))}
              className="w-full accent-amber-300"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Atmospheric Halo</label>
            <button
              onClick={() => setAmbientGlow(!ambientGlow)}
              className="w-full py-1.5 px-3 rounded bg-zinc-900 border border-white/20 font-mono text-xs text-white hover:border-amber-400"
            >
              Halo: {ambientGlow ? 'ENABLED' : 'MINIMAL'}
            </button>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Edition Selector</label>
            <div className="flex gap-2">
              {editions.map((ed, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playChime(500 + idx * 100);
                    setActiveIdx(idx);
                  }}
                  className={`flex-1 py-1 px-2 rounded font-mono text-xs border ${
                    activeIdx === idx
                      ? 'bg-amber-300 text-black border-amber-300 font-bold'
                      : 'bg-black/60 text-zinc-400 border-white/10'
                  }`}
                >
                  {ed.num}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="relative w-full min-h-[92vh] bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Ambient Subtle Stardust Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />

        {/* Ambient Golden Halo Center Spotlight */}
        {ambientGlow && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
        )}

        {/* Top Editorial Ribbon */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pt-8 flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-['Cinzel'] tracking-[0.3em] text-xs font-semibold text-amber-200/90 uppercase">
              Maison de Haute Conception
            </span>
            <span className="text-zinc-600 font-serif">&bull;</span>
            <span className="font-mono text-[11px] text-zinc-400 hidden sm:inline">
              PARIS // TOKYO // NEW YORK
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="font-mono text-xs text-amber-300/80 tracking-widest hidden md:inline">
              {currentEdition.coords}
            </span>
            <span className="font-mono text-xs text-zinc-400 font-bold">
              {currentEdition.num} / 03
            </span>
          </div>
        </div>

        {/* Main Stage & Editorial Typography */}
        <div className="relative z-10 max-w-5xl mx-auto w-full px-8 py-16 text-center my-auto flex flex-col items-center">
          
          {/* Roman Season Identifier */}
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-[1px] bg-amber-300/40" />
            <span className="font-['Cinzel'] text-xs uppercase tracking-[0.4em] text-amber-300/90 font-medium">
              {currentEdition.season}
            </span>
            <span className="w-12 h-[1px] bg-amber-300/40" />
          </div>

          {/* Master Display Heading in Cinzel Serif */}
          <h1 
            key={currentEdition.title}
            className="font-['Cinzel'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.08em] text-white uppercase leading-[0.95] max-w-4xl transition-all duration-700 animate-in fade-in zoom-in-95"
            style={{ textShadow: '0 4px 50px rgba(251, 191, 36, 0.15)' }}
          >
            {currentEdition.title}
          </h1>

          {/* Subtext with Poetic Spacing */}
          <p 
            key={currentEdition.tagline}
            className="mt-8 max-w-xl text-base sm:text-lg text-zinc-400 font-light font-['Plus_Jakarta_Sans'] leading-relaxed tracking-wide transition-all duration-500 animate-in fade-in"
          >
            {currentEdition.tagline}
          </p>

          {/* Luxury Interaction Controls */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            {/* Magnetic Luxury Pill Button */}
            <button
              onClick={() => soundFx.playChime(800, 0.4)}
              className="group relative px-10 py-4 rounded-full border border-amber-300/60 bg-amber-400/5 hover:bg-amber-300 hover:text-black text-amber-200 transition-all duration-300 font-['Cinzel'] text-xs tracking-[0.25em] uppercase font-bold flex items-center gap-3 backdrop-blur-md shadow-[0_0_20px_rgba(251,191,36,0.15)]"
              data-cursor="hover"
              data-cursor-text="EXPLORE"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Acquire Collection</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Edition Nav Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevEdition}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-amber-300/50 flex items-center justify-center text-zinc-300 transition-all"
                title="Previous Collection Edition"
                data-cursor="hover"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextEdition}
                className="w-12 h-12 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 hover:border-amber-300/50 flex items-center justify-center text-zinc-300 transition-all"
                title="Next Collection Edition"
                data-cursor="hover"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Colophon Strip */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs">
          <div className="flex items-center gap-2 font-mono text-zinc-500 text-[11px]">
            <Compass className="w-3.5 h-3.5 text-amber-300/70" />
            <span>PALETTE SPECTRUM:</span>
            <span className="text-zinc-300">{currentEdition.paletteName}</span>
          </div>

          <div className="flex items-center gap-6 font-mono text-zinc-400 text-[11px]">
            <span>EDITION CURATION: ARCHIVE 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span className="text-amber-200/90 font-semibold tracking-wider">ALL RIGHTS RESERVED</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
