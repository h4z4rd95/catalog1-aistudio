import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { ArrowDownRight, CornerRightDown, Disc3, ShieldAlert } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V02_KineticNeoBrutalist',
  name: 'Kinetic Neo-Brutalist Grid',
  category: 'Hero',
  batch: 'Batch 1: Next.js Hero Sections',
  techStack: ['Next.js / React', 'CSS Matrix Physics', 'Motion Dynamics', 'Velocity Observer'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Raw Architectural',
  interactionBlueprint: 'Monospace typographic skew dynamically tilts based on cursor velocity vector; architectural matrix stamps react with haptic mechanical feedback.',
  description: 'Unapologetic, high-contrast structural grid pairing raw mathematical monospace metrics with velocity-dependent dynamic skew transforms and dual infinite kinetic marquees.',
  tags: ['Neo-Brutalism', 'Kinetic Typography', 'High Contrast', 'Velocity Vector', 'Marquee'],
  codeSnippet: `// Matrix Velocity Calculation & Kinetic Typography Skew
const handlePointerMove = (e: PointerEvent) => {
  const now = performance.now();
  const dt = (now - lastTimeRef.current) / 1000;
  const dx = e.clientX - lastPosRef.current.x;
  const dy = e.clientY - lastPosRef.current.y;
  
  // Instantaneous velocity vector (px/s)
  const velX = dt > 0 ? dx / dt : 0;
  const targetSkew = Math.max(Math.min(velX * 0.015 * sensitivity, 24), -24);
  
  // Smooth mechanical damping
  currentSkew += (targetSkew - currentSkew) * 0.12;
  element.style.transform = \`skewX(\${currentSkew}deg) translate3d(0, 0, 0)\`;
};`,
};

export default function HeroKineticNeoBrutalist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [skewAngle, setSkewAngle] = useState(0);
  const [velocityTelemetry, setVelocityTelemetry] = useState({ vx: 0, vy: 0, speed: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // Tunable HUD parameters
  const [sensitivity, setSensitivity] = useState<number>(1.2);
  const [marqueeSpeed, setMarqueeSpeed] = useState<number>(1.0);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    let lastTime = performance.now();
    let lastX = 0;
    let lastY = 0;
    let targetSkew = 0;
    let currentSkew = 0;
    let animId: number;

    const handlePointerMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max((now - lastTime) / 1000, 0.001);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      const vx = Math.round(dx / dt);
      const vy = Math.round(dy / dt);
      const speed = Math.round(Math.sqrt(vx * vx + vy * vy));

      lastX = e.clientX;
      lastY = e.clientY;
      lastTime = now;

      setMouseCoords({ x: e.clientX, y: e.clientY });
      setVelocityTelemetry({ vx, vy, speed });

      // Skew formula based on horizontal movement
      targetSkew = Math.max(Math.min((vx * 0.02) * sensitivity, 22), -22);
    };

    const dampLoop = () => {
      currentSkew += (targetSkew - currentSkew) * 0.1;
      targetSkew *= 0.94; // Decay back to perpendicular
      setSkewAngle(currentSkew);
      animId = requestAnimationFrame(dampLoop);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    animId = requestAnimationFrame(dampLoop);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, [sensitivity]);

  const handleStampClick = () => {
    soundFx.playClick(300, 0.08);
    setStamped(!stamped);
  };

  const titleWords = ['RADICAL', 'FUNCTION', '& FORM'];

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Kinetic Skew Sensitivity ({sensitivity.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={sensitivity}
              onChange={(e) => setSensitivity(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Marquee Cadence ({marqueeSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.3"
              max="3.0"
              step="0.1"
              value={marqueeSpeed}
              onChange={(e) => setMarqueeSpeed(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={handleStampClick}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/20 font-mono text-xs text-white hover:bg-white hover:text-black font-bold uppercase transition-colors"
            >
              Toggle Approval Seal ({stamped ? 'ACTIVE' : 'IDLE'})
            </button>
          </div>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="relative w-full min-h-[90vh] bg-[#0c0d10] text-zinc-100 flex flex-col justify-between overflow-hidden border-y border-white/15 select-none"
      >
        {/* Harsh Architectural Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-6 md:grid-cols-12 pointer-events-none divide-x divide-white/10 opacity-70">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full flex flex-col justify-between p-2">
              <span className="font-mono text-[9px] text-zinc-600">COL_{String(i + 1).padStart(2, '0')}</span>
              <span className="font-mono text-[9px] text-zinc-700">{i % 2 === 0 ? '+' : '—'}</span>
            </div>
          ))}
        </div>

        {/* Top Ticker Marquee (Direction 1) */}
        <div 
          className="relative z-10 w-full border-b border-white/20 bg-black/60 py-2.5 overflow-hidden flex whitespace-nowrap"
          style={{ transform: `skewX(${skewAngle * 0.4}deg)` }}
        >
          <div 
            className="flex items-center gap-8 font-mono text-xs font-bold tracking-widest text-amber-400 uppercase animate-marquee"
            style={{ animationDuration: `${22 / marqueeSpeed}s` }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                <span>/// NEO-BRUTALIST PROTOCOL v3.9</span>
                <span className="text-zinc-500">■</span>
                <span>ZERO ABSTRACTION &bull; PURE VELOCITY</span>
                <span className="text-zinc-500">■</span>
                <span>METRIC PRECISION</span>
                <span className="text-zinc-500">■</span>
              </span>
            ))}
          </div>
        </div>

        {/* Center Main Stage */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col justify-center my-auto">
          
          {/* Diagnostic Coordinates Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-white/80 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black bg-white text-black px-2 py-0.5 uppercase tracking-wider">
                REF // 002-KINETIC
              </span>
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest">
                ARCHITECTURAL TYPOGRAPHY MATRIX
              </span>
            </div>

            {/* Real-time Vector HUD */}
            <div className="flex items-center gap-4 font-mono text-xs text-zinc-400">
              <span>VELOCITY: <strong className="text-amber-400">{velocityTelemetry.speed} px/s</strong></span>
              <span>SKEW: <strong className="text-cyan-400">{skewAngle.toFixed(1)}°</strong></span>
              <span className="hidden sm:inline">PTR: <strong className="text-white">X:{mouseCoords.x} Y:{mouseCoords.y}</strong></span>
            </div>
          </div>

          {/* Kinetic Skew Massive Headline */}
          <div 
            className="transition-transform duration-75 ease-out will-change-transform py-4"
            style={{
              transform: `skewX(${skewAngle}deg)`,
            }}
          >
            {titleWords.map((word, wIdx) => (
              <div 
                key={word} 
                className="overflow-hidden flex flex-wrap font-['Syne'] font-black text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-[0.88] tracking-tighter text-white uppercase hover:text-amber-300 transition-colors"
              >
                {word.split('').map((char, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-block transition-transform duration-200 hover:-translate-y-4 hover:scale-105 cursor-pointer"
                    onMouseEnter={() => soundFx.playClick(1100 + cIdx * 60, 0.02)}
                    data-cursor="hover"
                    data-cursor-text="SNAP"
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </div>
            ))}
          </div>

          {/* Brutalist Manifesto Grid & Stamp Area */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/20">
            {/* Column 1: Manifesto */}
            <div className="p-6 bg-zinc-900/80 border-2 border-white/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block mb-2">
                  [01] // STRUCTURAL DIRECTIVE
                </span>
                <p className="font-['Plus_Jakarta_Sans'] text-sm text-zinc-300 leading-relaxed font-normal">
                  Typography is not mere decoration. It is an immutable structural element.
                  Every character carries mass, velocity, and architectural tension in the viewport coordinate space.
                </p>
              </div>
              <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-white uppercase">
                <CornerRightDown className="w-4 h-4 text-amber-400" />
                <span>DYNAMIC DAMPING: 0.10</span>
              </div>
            </div>

            {/* Column 2: Interactive Industrial Controls */}
            <div className="p-6 bg-zinc-900/80 border-2 border-white/30 flex flex-col justify-between">
              <div>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-2">
                  [02] // SYSTEM SPECIFICATION
                </span>
                <div className="space-y-2 font-mono text-xs text-zinc-300">
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-zinc-500">TYPEFACE:</span>
                    <span className="font-bold text-white">SYNE 900 ULTRA</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-zinc-500">GRID COLUMNS:</span>
                    <span className="font-bold text-white">12-COL RATIO</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-1">
                    <span className="text-zinc-500">TRANSFORM ENGINE:</span>
                    <span className="font-bold text-emerald-400">HARDWARE 2D MATRIX</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  soundFx.playClick(400, 0.05);
                  setSensitivity((s) => (s >= 2.5 ? 0.8 : s + 0.5));
                }}
                className="mt-6 py-2.5 px-4 bg-white text-black font-mono text-xs font-black uppercase hover:bg-amber-400 transition-colors flex items-center justify-between"
                data-cursor="hover"
                data-cursor-text="CYCLE"
              >
                <span>SENSITIVITY: {sensitivity.toFixed(1)}X</span>
                <Disc3 className="w-4 h-4 animate-spin" />
              </button>
            </div>

            {/* Column 3: Seal of Approval Stamp */}
            <div 
              onClick={handleStampClick}
              className={`p-6 border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center relative overflow-hidden ${
                stamped 
                  ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_40px_rgba(251,191,36,0.3)]' 
                  : 'bg-zinc-900/80 text-zinc-300 border-white/30 hover:border-white'
              }`}
              data-cursor="hover"
              data-cursor-text={stamped ? 'VERIFIED' : 'STAMP'}
            >
              <div className="w-20 h-20 rounded-full border-4 border-dashed border-current flex items-center justify-center mb-3 animate-spin" style={{ animationDuration: '20s' }}>
                <ShieldAlert className="w-10 h-10" />
              </div>
              <span className="font-mono text-xs font-black tracking-wider uppercase">
                {stamped ? 'APPROVED: PRODUCTION GRADE' : 'CLICK TO AFFIX ARCHITECTURAL STAMP'}
              </span>
              <span className="font-mono text-[10px] mt-1 opacity-70">
                {stamped ? 'TIMESTAMP VERIFIED' : 'TAP FOR HAPTIC MECHANICAL IMPRINT'}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Counter-Ticker Marquee (Direction 2) */}
        <div 
          className="relative z-10 w-full border-t border-white/20 bg-white text-black py-2 overflow-hidden flex whitespace-nowrap"
          style={{ transform: `skewX(${-skewAngle * 0.4}deg)` }}
        >
          <div 
            className="flex items-center gap-8 font-mono text-xs font-black tracking-widest uppercase animate-marquee-reverse"
            style={{ animationDuration: `${20 / marqueeSpeed}s` }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={i} className="flex items-center gap-6">
                <span>NON-CONFORMIST ARCHITECTURE</span>
                <span>★</span>
                <span>KINETIC INERTIA SKEW ACTIVE</span>
                <span>★</span>
                <span>SYSTEM STABILITY: 100%</span>
                <span>★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
