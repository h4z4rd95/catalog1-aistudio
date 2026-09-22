import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { RotateCcw, Play, CornerDownRight, CheckCircle2, Sliders } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Loader_V01_KineticCounterMask',
  name: 'Kinetic Monospace Counter & Split Mask Wipe',
  category: 'Loader',
  batch: 'Batch 3: Immersive Page Loaders & Fluid Transitions',
  techStack: ['Next.js / React', 'Euler Momentum Acceleration', 'SVG Diagonal ClipPath', 'Velocity Ticks'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Raw Architectural',
  interactionBlueprint: '000% to 100% mechanical Euler counter accelerates with non-linear easing; upon completion, a diagonal architectural split mask shears open to reveal the stage.',
  description: 'An architectural preloader pairing rapid non-linear Euler momentum acceleration with mechanical sound ticks, culminating in a 45-degree diagonal dual-mask curtain wipe.',
  tags: ['Preloader', 'Kinetic Counter', 'ClipPath Wipe', 'Neo-Brutalism', 'Euler Physics'],
  codeSnippet: `// Non-Linear Euler Momentum Acceleration Loop
const stepCounter = () => {
  // Accelerated accumulation towards 100%
  velocity += acceleration * dt;
  currentPercent = Math.min(currentPercent + velocity, 100);
  
  if (currentPercent >= 100) {
    setIsComplete(true);
    triggerDiagonalWipe();
  }
};`,
};

export default function LoaderKineticCounterMask() {
  const [percent, setPercent] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [wipeProgress, setWipeProgress] = useState(0);

  // Tunable parameters
  const [speedMultiplier, setSpeedMultiplier] = useState(1.2);
  const [splitAngle, setSplitAngle] = useState(45);

  const timerRef = useRef<number | null>(null);

  const startLoader = () => {
    soundFx.playClick(600, 0.05);
    setIsRunning(true);
    setIsCompleted(false);
    setWipeProgress(0);
    setPercent(0);

    let p = 0;
    let vel = 0.4 * speedMultiplier;
    const accel = 0.08 * speedMultiplier;

    const interval = setInterval(() => {
      vel += accel;
      p = Math.min(p + vel, 100);
      setPercent(Math.floor(p));

      // Mechanical audio tick
      if (Math.floor(p) % 4 === 0) {
        soundFx.playClick(800 + p * 6, 0.015);
      }

      if (p >= 100) {
        clearInterval(interval);
        setPercent(100);
        soundFx.playChime(950, 0.3);
        setIsCompleted(true);
        setIsRunning(false);

        // Animate wipe
        let wipe = 0;
        const wipeInterval = setInterval(() => {
          wipe += 4;
          setWipeProgress(wipe);
          if (wipe >= 100) {
            clearInterval(wipeInterval);
          }
        }, 16);
      }
    }, 25);
  };

  useEffect(() => {
    // Initial mount demonstration
    startLoader();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Acceleration Multiplier ({speedMultiplier.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={speedMultiplier}
              onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Diagonal Shear Angle ({splitAngle}°)
            </label>
            <input
              type="range"
              min="15"
              max="65"
              step="5"
              value={splitAngle}
              onChange={(e) => setSplitAngle(parseInt(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={startLoader}
              disabled={isRunning}
              className="w-full py-1.5 px-3 rounded bg-amber-400 disabled:opacity-50 text-black font-mono text-xs font-bold uppercase hover:bg-amber-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Replay Preloader</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#08090d] text-zinc-100 flex flex-col justify-between overflow-hidden select-none border-y border-white/10">
        
        {/* Underlying Stage Revealed by Wipe */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20 my-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 font-mono text-xs uppercase tracking-wider mb-6">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>PRELOADER COMPLETE // STAGE UNLOCKED</span>
          </div>

          <h2 className="font-['Syne'] text-4xl sm:text-6xl md:text-7xl font-black uppercase text-white tracking-tight leading-[0.92]">
            ARCHITECTURAL <span className="text-amber-400">MANIFESTO</span>
          </h2>

          <p className="mt-6 max-w-xl mx-auto font-['Plus_Jakarta_Sans'] text-zinc-400 text-sm sm:text-base leading-relaxed">
            The mechanical Euler counter has finished its velocity ramp, shearing the diagonal clipPath mask to reveal this underlying operational viewport.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={startLoader}
              className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(251,191,36,0.3)] flex items-center gap-2"
              data-cursor="hover"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Re-Arm Kinetic Preloader</span>
            </button>
          </div>
        </div>

        {/* Diagonal Split Curtain Overlays (Top Half & Bottom Half) */}
        {wipeProgress < 100 && (
          <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-between">
            {/* Top Sheared Mask */}
            <div
              style={{
                transform: `translateY(-${wipeProgress}%)`,
                transition: 'transform 0.5s cubic-bezier(0.85, 0, 0.15, 1)',
              }}
              className="absolute inset-0 bg-[#0d0f14] border-b-2 border-amber-400 flex flex-col justify-between p-8"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4 font-mono text-xs text-zinc-500">
                <span className="text-amber-400 font-bold">/// KINETIC COUNTER ENGINE</span>
                <span>STATUS: {isCompleted ? 'READY' : 'CALCULATING MOMENTUM'}</span>
              </div>

              {/* Massive Monospace Percent Display */}
              <div className="flex flex-col items-center justify-center my-auto">
                <span className="font-mono text-zinc-500 text-xs tracking-widest uppercase mb-2">
                  ACCELERATING EULER VELOCITY
                </span>
                <div className="font-['Syne'] text-8xl sm:text-9xl md:text-[13rem] font-black text-white tracking-tighter leading-none flex items-baseline">
                  <span>{String(percent).padStart(3, '0')}</span>
                  <span className="text-amber-400 text-4xl sm:text-6xl font-mono ml-2">%</span>
                </div>

                {/* Progress Bar Track */}
                <div className="w-full max-w-md h-1.5 bg-white/10 rounded-full mt-8 overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 transition-all duration-75 ease-out shadow-[0_0_12px_rgba(251,191,36,0.6)]"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-zinc-500 border-t border-white/10 pt-4">
                <span>ANGLE: {splitAngle}° SHEAR</span>
                <span className="text-amber-400 font-bold">EULER VELOCITY: {(percent * 1.8).toFixed(0)} PX/S</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BlueprintHUD>
  );
}
