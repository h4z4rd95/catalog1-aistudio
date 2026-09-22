import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Zap, Gauge, RotateCcw, ArrowRightLeft, Sparkles, Volume2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Scroll_V02_KineticMarqueeVelocity',
  name: 'Kinetic Velocity Marquee & Dynamic Skew Matrix',
  category: 'Scroll',
  batch: 'Batch 4: Scroll Choreography & Infinite Canvas Pinning',
  techStack: ['Next.js / React', 'Velocity Scroll Physics', 'Kinetic Typography', 'CSS Skew Matrix'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / High Velocity',
  interactionBlueprint: 'Scrolling or dragging dynamically calculates instantaneous velocity delta (v = Δy/Δt) to stretch letter-spacing and shear the typography angle (skewX up to 25°); bidirectional staggered tracks accelerate dynamically.',
  description: 'An aggressive Awwwards-style kinetic typography velocity marquee with dual opposing tracks, real-time shear angle calculation, and interactive speed overdrive.',
  tags: ['Kinetic Marquee', 'Velocity Physics', 'CSS Skew', 'Neo-Brutalist', 'Typography'],
  codeSnippet: `// Velocity-driven skew and tracking calculation
const delta = (currentScroll - lastScroll);
const velocity = Math.min(Math.max(delta * velocityFactor, -30), 30);

// Shears typography based on scroll inertia
trackElement.style.transform = \`skewX(\${velocity}deg) scaleY(\${1 + Math.abs(velocity) * 0.01})\`;
letterSpacing = \`\${Math.abs(velocity) * 0.15}px\`;`,
};

export default function ScrollKineticMarqueeVelocity() {
  const [baseSpeed, setBaseSpeed] = useState(1.5);
  const [skewFactor, setSkewFactor] = useState(1.8);
  const [currentVelocity, setCurrentVelocity] = useState(0);
  const [isReversed, setIsReversed] = useState(false);
  const [isBoosted, setIsBoosted] = useState(false);

  const posTrack1 = useRef(0);
  const posTrack2 = useRef(0);
  const posTrack3 = useRef(0);
  const velocityRef = useRef(0);
  const lastWheelTime = useRef(Date.now());

  // Wheel velocity listener within component
  const handleWheel = (e: React.WheelEvent) => {
    const now = Date.now();
    const dt = Math.max(now - lastWheelTime.current, 10);
    lastWheelTime.current = now;

    // Calculate instantaneous velocity delta
    const delta = e.deltaY;
    const instantaneousV = (delta / dt) * 12 * skewFactor;
    velocityRef.current = Math.max(-28, Math.min(28, velocityRef.current + instantaneousV));
  };

  // Drag velocity interaction
  const isDragging = useRef(false);
  const lastClientY = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    lastClientY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = lastClientY.current - e.clientY;
    lastClientY.current = e.clientY;
    velocityRef.current = Math.max(-28, Math.min(28, velocityRef.current + delta * 0.8 * skewFactor));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Animation Loop with smooth decay
  useEffect(() => {
    let animId: number;
    const animate = () => {
      // Natural decay of velocity back to 0
      velocityRef.current *= 0.94;
      setCurrentVelocity(velocityRef.current);

      const boost = isBoosted ? 3.0 : 1.0;
      const dir = isReversed ? -1 : 1;
      const speed = (baseSpeed * boost * dir) + velocityRef.current * 0.2;

      posTrack1.current -= speed * 1.2;
      posTrack2.current += speed * 0.9;
      posTrack3.current -= speed * 1.5;

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [baseSpeed, isReversed, isBoosted]);

  const triggerOverdrive = () => {
    soundFx.playChime(950, 0.4);
    setIsBoosted(true);
    velocityRef.current = 24;
    setTimeout(() => setIsBoosted(false), 800);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Base Conveyor Speed ({baseSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.2"
              value={baseSpeed}
              onChange={(e) => setBaseSpeed(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Skew Sensitivity ({skewFactor.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="3.5"
              step="0.1"
              value={skewFactor}
              onChange={(e) => setSkewFactor(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsReversed(!isReversed);
              }}
              className="flex-1 py-1.5 px-2 rounded bg-zinc-800 border border-white/10 text-zinc-300 font-mono text-[11px] hover:bg-zinc-700 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>{isReversed ? 'Reverse' : 'Forward'}</span>
            </button>

            <button
              onClick={triggerOverdrive}
              className="flex-1 py-1.5 px-2 rounded bg-amber-400 text-black font-bold font-mono text-[11px] hover:bg-amber-300 flex items-center justify-center gap-1.5 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.4)]"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Overdrive</span>
            </button>
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
        className="relative w-full min-h-[85vh] bg-[#07080d] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10 cursor-ns-resize"
      >
        {/* Background Grid Accent */}
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 pt-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-amber-300">
              KINETIC_VELOCITY_SHEAR // V02
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-zinc-400 bg-black/60 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>SCROLL / DRAG VELOCITY:</span>
            <span className={`font-bold ${Math.abs(currentVelocity) > 10 ? 'text-amber-300' : 'text-zinc-300'}`}>
              {currentVelocity > 0 ? `+${currentVelocity.toFixed(1)}°` : `${currentVelocity.toFixed(1)}°`}
            </span>
          </div>
        </div>

        {/* Center Kinetic Marquee Conveyor Tracks */}
        <div className="relative z-10 my-auto py-12 flex flex-col gap-6 overflow-hidden">
          
          {/* Track 1: Solid Syne Bold Type */}
          <div
            style={{
              transform: `skewX(${-currentVelocity}deg) scaleY(${1 + Math.abs(currentVelocity) * 0.008})`,
              transition: isDragging.current ? 'none' : 'transform 0.08s ease-out',
            }}
            className="flex whitespace-nowrap overflow-hidden border-y border-amber-400/20 py-2 bg-amber-400/5 backdrop-blur-sm"
          >
            <div
              style={{
                transform: `translateX(${posTrack1.current % 1800}px)`,
              }}
              className="flex items-center gap-8 font-['Syne'] text-4xl sm:text-7xl font-black uppercase tracking-tight text-white"
            >
              <span>VELOCITY DRIVEN MOMENTUM</span>
              <span className="text-amber-400">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">KINETIC DISTORTION</span>
              <span className="text-amber-400">&bull;</span>
              <span>EXPERIMENTAL SCROLL PHYSICS</span>
              <span className="text-amber-400">&bull;</span>
              <span>VELOCITY DRIVEN MOMENTUM</span>
              <span className="text-amber-400">&bull;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-200">KINETIC DISTORTION</span>
            </div>
          </div>

          {/* Track 2: Hollow Outlined Stroke Type (Opposing Direction) */}
          <div
            style={{
              transform: `skewX(${currentVelocity * 1.2}deg) scaleY(${1 + Math.abs(currentVelocity) * 0.01})`,
              transition: isDragging.current ? 'none' : 'transform 0.08s ease-out',
            }}
            className="flex whitespace-nowrap overflow-hidden py-2"
          >
            <div
              style={{
                transform: `translateX(${posTrack2.current % 2000}px)`,
              }}
              className="flex items-center gap-8 font-['Syne'] text-5xl sm:text-8xl font-black uppercase tracking-tight"
            >
              <span className="text-transparent [-webkit-text-stroke:1.5px_#f59e0b]">OPPOSING INERTIA MATRIX</span>
              <span className="text-white text-3xl sm:text-5xl">&bull;</span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]">DYNAMIC SHEAR ANGLE</span>
              <span className="text-white text-3xl sm:text-5xl">&bull;</span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_#f59e0b]">OPPOSING INERTIA MATRIX</span>
              <span className="text-white text-3xl sm:text-5xl">&bull;</span>
              <span className="text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.7)]">DYNAMIC SHEAR ANGLE</span>
            </div>
          </div>

          {/* Track 3: Technical Monospace High-Density Telemetry */}
          <div
            style={{
              transform: `skewX(${-currentVelocity * 0.8}deg)`,
              transition: isDragging.current ? 'none' : 'transform 0.08s ease-out',
            }}
            className="flex whitespace-nowrap overflow-hidden border-y border-white/10 py-3 bg-black/40"
          >
            <div
              style={{
                transform: `translateX(${posTrack3.current % 1600}px)`,
              }}
              className="flex items-center gap-8 font-mono text-sm sm:text-base tracking-widest text-zinc-400 uppercase"
            >
              <span className="text-amber-400 font-bold">[ACCELERATION_CADENCE: 60FPS]</span>
              <span>&bull;</span>
              <span>PHYSICS_ENGINE: EULER_INTEGRATION</span>
              <span>&bull;</span>
              <span className="text-white font-bold">AWWWARDS SITE_OF_THE_DAY SPEC</span>
              <span>&bull;</span>
              <span className="text-amber-400 font-bold">[ACCELERATION_CADENCE: 60FPS]</span>
              <span>&bull;</span>
              <span>PHYSICS_ENGINE: EULER_INTEGRATION</span>
            </div>
          </div>
        </div>

        {/* Bottom Status Callout */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-amber-400" />
            <span>SHEAR LIMIT: &plusmn;30.00 DEGREES</span>
          </div>

          <div className="text-zinc-400">
            <span>DRAG UP/DOWN OR SCROLL TO STRETCH TYPOGRAPHY</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
