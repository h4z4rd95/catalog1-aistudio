import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Magnet, Sparkles, ArrowUpRight, RotateCcw, Sliders, Globe } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Footer_V01_GravitationalMagneticGrid',
  name: 'Gravitational Particle Attractor & Magnetic Spring CTA',
  category: 'Footer',
  batch: 'Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics Elements',
  techStack: ['Next.js / React', 'HTML5 Canvas 2D Physics', 'Newtonian Gravity Field', 'Spring Damping'],
  aestheticVibe: 'Chromatic Liquid Gradient / Physics-First',
  interactionBlueprint: 'Cursor emits a dynamic gravitational force field warping a 2D spring-mass particle grid; magnetic CTA button calculates distance vector and magnetically pulls toward the cursor with spring physics.',
  description: 'An interactive physics-driven footer featuring an ambient spring-mass particle fabric that reacts to pointer gravity, paired with a magnetic CTA button and chromatic liquid gradient glows.',
  tags: ['Particle Gravity', 'Magnetic CTA', 'Canvas 2D Physics', 'Spring Damping', 'Awwwards'],
  codeSnippet: `// Vector calculation for magnetic button attraction
const onMouseMove = (e: MouseEvent) => {
  const rect = buttonRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

  if (dist < magneticRadius) {
    const pullX = (e.clientX - centerX) * 0.4;
    const pullY = (e.clientY - centerY) * 0.4;
    btn.style.transform = \`translate3d(\${pullX}px, \${pullY}px, 0)\`;
  }
};`,
};

interface Particle {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export default function FooterGravitationalMagneticGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const magneticBtnRef = useRef<HTMLDivElement>(null);

  // Tunable controls
  const [gravityStrength, setGravityStrength] = useState(0.8);
  const [attractMode, setAttractMode] = useState<'ATTRACT' | 'REPEL'>('ATTRACT');
  const [gridSpacing, setGridSpacing] = useState(36);

  // Magnetic button offset
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const mousePos = useRef({ x: -1000, y: -1000 });
  const particles = useRef<Particle[]>([]);

  // Canvas Physics Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const initGrid = () => {
      const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
      const h = (canvas.height = canvas.parentElement?.clientHeight || 500);

      const pts: Particle[] = [];
      for (let x = 20; x < w; x += gridSpacing) {
        for (let y = 20; y < h; y += gridSpacing) {
          pts.push({
            baseX: x,
            baseY: y,
            x: x,
            y: y,
            vx: 0,
            vy: 0,
          });
        }
      }
      particles.current = pts;
    };

    initGrid();
    window.addEventListener('resize', initGrid);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mousePos.current.x;
      const my = mousePos.current.y;
      const radius = 160;
      const mult = attractMode === 'ATTRACT' ? 1 : -1;

      ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)';

      const pts = particles.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];

        // Spring restitution force toward base position
        const dxBase = p.baseX - p.x;
        const dyBase = p.baseY - p.y;
        p.vx += dxBase * 0.08;
        p.vy += dyBase * 0.08;

        // Pointer gravitational interaction
        const dxMouse = mx - p.x;
        const dyMouse = my - p.y;
        const distMouse = Math.hypot(dxMouse, dyMouse);

        if (distMouse < radius && distMouse > 1) {
          const force = (1 - distMouse / radius) * gravityStrength * 4 * mult;
          const angle = Math.atan2(dyMouse, dxMouse);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        }

        // Friction damping
        p.vx *= 0.88;
        p.vy *= 0.88;
        p.x += p.vx;
        p.y += p.vy;

        // Draw particle dot
        const distFromBase = Math.hypot(p.x - p.baseX, p.y - p.baseY);
        const radiusDot = Math.min(3.5, 1.2 + distFromBase * 0.15);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radiusDot, 0, Math.PI * 2);
        if (distFromBase > 4) {
          ctx.fillStyle = 'rgba(236, 72, 153, 0.8)';
        } else {
          ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        }
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', initGrid);
    };
  }, [gravityStrength, attractMode, gridSpacing]);

  // Mouse tracking inside component
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    mousePos.current = { x: mx, y: my };

    // Magnetic button calculation
    if (magneticBtnRef.current) {
      const btnRect = magneticBtnRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 180) {
        const pullFactor = (1 - dist / 180) * 0.45;
        const offsetX = (e.clientX - btnCenterX) * pullFactor;
        const offsetY = (e.clientY - btnCenterY) * pullFactor;
        setBtnOffset({ x: offsetX, y: offsetY });
      } else {
        setBtnOffset({ x: 0, y: 0 });
      }
    }
  };

  const handleMouseLeave = () => {
    mousePos.current = { x: -1000, y: -1000 };
    setBtnOffset({ x: 0, y: 0 });
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Gravity Field Strength ({gravityStrength.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.2"
              max="2.0"
              step="0.1"
              value={gravityStrength}
              onChange={(e) => setGravityStrength(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Field Polarity
            </label>
            <button
              onClick={() => {
                soundFx.playClick(700);
                setAttractMode(attractMode === 'ATTRACT' ? 'REPEL' : 'ATTRACT');
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/10 text-cyan-300 font-mono text-xs hover:bg-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <Magnet className="w-3.5 h-3.5" />
              <span>{attractMode === 'ATTRACT' ? 'Mode: Gravitational Pull' : 'Mode: Repulsion Wave'}</span>
            </button>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Fabric Mesh Density ({gridSpacing}px)
            </label>
            <input
              type="range"
              min="24"
              max="54"
              step="6"
              value={gridSpacing}
              onChange={(e) => setGridSpacing(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      }
    >
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full min-h-[85vh] bg-[#05060b] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10"
      >
        {/* Canvas 2D Particle Grid */}
        <canvas ref={canvasRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Ambient Chromatic Liquid Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
              MAGNETIC_GRID_FOOTER // V01
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-zinc-400">
            <span>NEWTONIAN 2D DAMPING: 0.88</span>
            <span className="text-zinc-600">|</span>
            <span className="text-cyan-300 font-bold">HOVER FABRIC TO WARP MESH</span>
          </div>
        </div>

        {/* Center Mega CTA Area with Magnetic Spring Physics */}
        <div className="relative z-20 w-full max-w-4xl mx-auto my-auto px-8 text-center flex flex-col items-center">
          <span className="font-mono text-xs tracking-widest text-cyan-400 uppercase mb-3 block">
            NEXT-GEN WEB EXPERIENCES
          </span>

          <h2 className="font-['Syne'] text-4xl sm:text-7xl font-black text-white tracking-tight leading-none uppercase">
            LET&apos;S BUILD SOMETHING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300">
              EXTRAORDINARY
            </span>
          </h2>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-400 text-sm sm:text-base max-w-xl mx-auto font-light">
            Combining cutting-edge WebGL shaders, kinetic physics, and editorial typography into memorable digital landmarks.
          </p>

          {/* Magnetic CTA Button */}
          <div
            ref={magneticBtnRef}
            style={{
              transform: `translate3d(${btnOffset.x}px, ${btnOffset.y}px, 0)`,
              transition: isBtnHovered ? 'none' : 'transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1)',
            }}
            onMouseEnter={() => {
              soundFx.playChime(750, 0.25);
              setIsBtnHovered(true);
            }}
            onMouseLeave={() => setIsBtnHovered(false)}
            onClick={() => soundFx.playChime(1100, 0.4)}
            className="mt-8 group cursor-pointer"
            data-cursor="hover"
          >
            <div className="relative px-8 py-5 rounded-full bg-gradient-to-r from-cyan-400 via-pink-500 to-amber-400 p-[1.5px] shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-shadow group-hover:shadow-[0_0_50px_rgba(236,72,153,0.6)]">
              <div className="px-8 py-4 rounded-full bg-[#0a0c14] flex items-center gap-3">
                <span className="font-['Syne'] text-base sm:text-lg font-bold text-white tracking-wide">
                  INITIATE COLLABORATION
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-cyan-400 group-hover:text-black flex items-center justify-center transition-all">
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Detailed Directory Rails */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pb-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold">&copy; 2026 AURELIA LABS</span>
            <span className="hover:text-cyan-300 cursor-pointer">PRIVACY PROTOCOL</span>
            <span className="hover:text-cyan-300 cursor-pointer">SECURITY DISCLOSURE</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-zinc-300">
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>GLOBAL NODE: US-EAST</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
              SYS: 100% OPERATIONAL
            </span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
