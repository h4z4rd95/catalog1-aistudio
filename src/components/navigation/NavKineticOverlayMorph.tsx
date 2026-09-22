import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Menu, X, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Nav_V01_KineticOverlayMorph',
  name: 'Kinetic Overlay Morph & Floating Media Index',
  category: 'Navigation',
  batch: 'Batch 2: Navigation Systems & Mega-Menus',
  techStack: ['Next.js / React', 'SVG Bezier Wave Morphing', 'Kinetic Typography', 'Floating Pointer Preview'],
  aestheticVibe: 'Kinetic Typography & Fluid Vector Distortion',
  interactionBlueprint: 'Trigger morphs an organic SVG cubic bezier wave into full viewport coverage; hovering numbered index links displays a velocity-lagged media preview card.',
  description: 'An Awwwards-winning navigation pattern combining real-time SVG curve morph equations with large-scale kinetic display typography and pointer-bound media previews.',
  tags: ['SVG Path Morphing', 'Mega-Menu', 'Kinetic Typography', 'Media Preview', 'Bezier Waves'],
  codeSnippet: `// Procedural SVG Bezier Path Wave Morph Function
const calculateWavePath = (progress: number, curvature: number) => {
  const h = 100;
  const w = 100;
  // Dynamic control points calculated during transition
  const cp1Y = progress < 0.5 ? progress * 2 * h * (1 + curvature) : h;
  const cp2Y = progress < 0.5 ? progress * 2 * h * (1 - curvature) : h;
  return \`M 0,0 C \${w * 0.35},\${cp1Y} \${w * 0.65},\${cp2Y} \${w},0 L \${w},\${h} L 0,\${h} Z\`;
};`,
};

const navItems = [
  {
    num: '01',
    title: 'COMPUTATIONAL WEBGL',
    subtitle: 'Simplex shaders, particles & 3D topologies',
    previewColor: 'from-amber-400/20 via-pink-500/20 to-purple-600/30',
    meta: '12 PROJECTS',
  },
  {
    num: '02',
    title: 'KINETIC TYPOGRAPHY',
    subtitle: 'Velocity-skewed monospace & architectural grids',
    previewColor: 'from-cyan-400/20 via-blue-500/20 to-indigo-600/30',
    meta: '08 PROTOCOLS',
  },
  {
    num: '03',
    title: 'HAUTE COUTURE EDITORIAL',
    subtitle: 'Velvet negative space, Cinzel display & stardust',
    previewColor: 'from-amber-300/20 via-yellow-500/10 to-stone-800/30',
    meta: '05 EDITIONS',
  },
  {
    num: '04',
    title: 'CYBER DIAGNOSTIC HUD',
    subtitle: 'Raycaster mesh, terminal logs & chromatic glitches',
    previewColor: 'from-emerald-400/20 via-cyan-500/20 to-teal-800/30',
    meta: '16 EXPERIMENTS',
  },
  {
    num: '05',
    title: 'TACTILE AUDIO SYNTH',
    subtitle: 'Sub-millisecond procedural sound feedback engine',
    previewColor: 'from-violet-400/20 via-fuchsia-500/20 to-rose-800/30',
    meta: '04 HARMONICS',
  },
];

export default function NavKineticOverlayMorph() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [floatingPos, setFloatingPos] = useState({ x: 0, y: 0 });

  // Tunable HUD parameters
  const [curvature, setCurvature] = useState<number>(0.35);
  const [animationDuration, setAnimationDuration] = useState<number>(650);

  // Smooth pointer tracking for floating media preview card
  useEffect(() => {
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const loop = () => {
      currentX += (mousePos.x - currentX) * 0.15;
      currentY += (mousePos.y - currentY) * 0.15;
      setFloatingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animId);
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const toggleMenu = () => {
    soundFx.playChime(isOpen ? 450 : 850, 0.2);
    setIsOpen(!isOpen);
    if (!isOpen) setActiveItem(null);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Curvature Intensity ({curvature.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.1"
              max="0.8"
              step="0.05"
              value={curvature}
              onChange={(e) => setCurvature(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Morph Transition Duration ({animationDuration}ms)
            </label>
            <input
              type="range"
              min="300"
              max="1200"
              step="50"
              value={animationDuration}
              onChange={(e) => setAnimationDuration(parseInt(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={toggleMenu}
              className="w-full py-1.5 px-3 rounded bg-amber-400 text-black font-mono text-xs font-bold uppercase hover:bg-amber-300 transition-colors"
            >
              Toggle Navigation ({isOpen ? 'ACTIVE' : 'CLOSED'})
            </button>
          </div>
        </div>
      }
    >
      <div 
        onMouseMove={handleMouseMove}
        className="relative w-full min-h-[85vh] bg-[#07090e] text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Mock Application Top Navigation Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-['Syne'] font-extrabold text-lg tracking-wider text-white">
              STUDIO // ATELIER
            </span>
            <span className="font-mono text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              V01 MORPH
            </span>
          </div>

          {/* Interactive Trigger Button */}
          <button
            onClick={toggleMenu}
            className="group relative flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/20 transition-all font-mono text-xs font-bold uppercase tracking-wider shadow-lg"
            data-cursor="hover"
            data-cursor-text={isOpen ? 'CLOSE' : 'MENU'}
          >
            <span>{isOpen ? 'CLOSE INDEX' : 'EXPLORE MENU'}</span>
            <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center transition-transform group-hover:rotate-90">
              {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
            </div>
          </button>
        </div>

        {/* Ambient Stage Backdrop (Simulated page content behind the menu) */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center my-auto">
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mb-4">
            [INTERACTIVE DEMO CANVAS]
          </span>
          <h2 className="font-['Syne'] text-4xl sm:text-6xl font-bold tracking-tight text-white mb-4">
            Fluid SVG Wave Morphing Menu
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8">
            Click the menu trigger above or the interactive button below to witness the organic SVG wave curtain descend across the stage.
          </p>
          <button
            onClick={toggleMenu}
            className="px-8 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider shadow-[0_0_30px_rgba(251,191,36,0.3)] transition-all"
            data-cursor="hover"
            data-cursor-text="OPEN"
          >
            {isOpen ? 'Dismiss Overlay' : 'Launch Kinetic Morph Menu'}
          </button>
        </div>

        {/* Morphing Overlay Curtain */}
        <div
          className={`absolute inset-0 z-40 bg-[#090b10] flex flex-col justify-between p-6 md:p-12 transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] ${
            isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
          }`}
          style={{ transitionDuration: `${animationDuration}ms` }}
        >
          {/* Top Bar inside Overlay */}
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
              <span className="font-mono text-xs tracking-widest text-zinc-400 uppercase">
                INDEX DIRECTORY // 05 DISCIPLINES
              </span>
            </div>
            <button
              onClick={toggleMenu}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white text-zinc-200 hover:text-black border border-white/20 font-mono text-xs uppercase font-bold transition-all"
              data-cursor="hover"
            >
              <X className="w-4 h-4" />
              <span>Close</span>
            </button>
          </div>

          {/* Menu Link Index Items */}
          <div className="w-full max-w-5xl mx-auto my-auto py-8 flex flex-col gap-2">
            {navItems.map((item, idx) => (
              <div
                key={item.num}
                onMouseEnter={() => {
                  soundFx.playClick(600 + idx * 70, 0.02);
                  setActiveItem(idx);
                }}
                onMouseLeave={() => setActiveItem(null)}
                className="group relative flex items-center justify-between py-3 border-b border-white/10 hover:border-amber-400 transition-colors cursor-pointer"
                data-cursor="hover"
                data-cursor-text="VIEW"
              >
                <div className="flex items-baseline gap-4 md:gap-8">
                  <span className="font-mono text-sm md:text-base font-bold text-zinc-500 group-hover:text-amber-400 transition-colors">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-['Syne'] text-2xl sm:text-4xl md:text-5xl font-black uppercase text-zinc-300 group-hover:text-white group-hover:translate-x-3 transition-all duration-300 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-zinc-500 mt-1 hidden sm:block">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[11px] text-zinc-500 bg-white/5 px-2.5 py-1 rounded border border-white/5 hidden md:inline">
                    {item.meta}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-white/10 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-black flex items-center justify-center transition-all">
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Colophon Bar inside Overlay */}
          <div className="w-full max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs font-mono text-zinc-500">
            <span>PRESS ESC OR CLICK OUTSIDE TO CLOSE</span>
            <div className="flex items-center gap-4 text-zinc-400">
              <span className="hover:text-white cursor-pointer">TWITTER / X</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer">GITHUB SHOWROOM</span>
              <span>&bull;</span>
              <span className="hover:text-white cursor-pointer">READ ME</span>
            </div>
          </div>

          {/* Floating Media Preview Card that follows pointer */}
          {activeItem !== null && (
            <div
              className="pointer-events-none fixed z-50 w-72 h-44 rounded-xl border border-white/20 p-4 shadow-2xl backdrop-blur-xl flex flex-col justify-between transition-transform duration-75 ease-out animate-in fade-in zoom-in-95"
              style={{
                transform: `translate3d(${floatingPos.x + 20}px, ${floatingPos.y - 80}px, 0)`,
                background: 'rgba(10, 14, 23, 0.85)',
              }}
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${navItems[activeItem].previewColor} pointer-events-none`} />
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-2">
                <span className="font-mono text-[10px] text-amber-400 font-bold">
                  MEDIA PREVIEW // {navItems[activeItem].num}
                </span>
                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              </div>

              <div className="relative z-10 my-auto">
                <h4 className="font-['Syne'] text-base font-bold text-white uppercase">
                  {navItems[activeItem].title}
                </h4>
                <p className="font-mono text-[10px] text-zinc-300 mt-1">
                  {navItems[activeItem].subtitle}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[9px] font-mono text-zinc-400 border-t border-white/10 pt-1.5">
                <span>GPU ACCELERATED</span>
                <span className="text-emerald-400 font-bold">{navItems[activeItem].meta}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </BlueprintHUD>
  );
}
