import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Compass, Sparkles, Volume2, Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'generative_v04_luxuryharmonicmetronome',
  name: 'Haute Horlogerie Lissajous Resonance & Astronomical Pendulum',
  category: 'Generative',
  batch: 'Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures',
  techStack: ['React 19', 'Lissajous Harmonograph Math', 'Web Audio Sine Chimes', 'Cinzel Roman Typography', 'Golden Ratio Geometry'],
  aestheticVibe: 'Luxury Editorial & Haute Couture / Horological Acoustics',
  interactionBlueprint: 'Compound double-pendulum harmonograph simulating acoustic intervals (3:2 Perfect Fifth, 4:3 Perfect Fourth, 5:4 Major Third). As the pendulum sweeps through astronomical coordinates, it traces continuous vermeil curves and releases harmonic crystal chimes at vertex nodes.',
  description: 'Museum-grade horological acoustic kinetic sculpture modeling harmonic sound ratios into parametric Lissajous curves with real-time dampening, tempo selection, and crystal bell chimes.',
  codeSnippet: `// Lissajous harmonograph differential equations
const x = A * Math.sin(f1 * t + phase) * Math.exp(-d * t);
const y = B * Math.sin(f2 * t) * Math.exp(-d * t);`,
  tags: ['Generative', 'Luxury Editorial', 'Lissajous', 'Harmonograph', 'Horology', 'Acoustics'],
};

interface HarmonicRatio {
  label: string;
  name: string;
  f1: number;
  f2: number;
  freqChime: number;
}

const HARMONIC_RATIOS: HarmonicRatio[] = [
  { label: '3:2', name: 'DIAPENTE (PERFECT FIFTH)', f1: 3, f2: 2, freqChime: 660 },
  { label: '4:3', name: 'DIATESSARON (PERFECT FOURTH)', f1: 4, f2: 3, freqChime: 587 },
  { label: '5:4', name: 'DITONE (MAJOR THIRD)', f1: 5, f2: 4, freqChime: 550 },
  { label: '1:1', name: 'UNISON (CELESTIAL ORB)', f1: 1, f2: 1, freqChime: 440 },
];

export default function GenerativeLuxuryHarmonicMetronome() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeRatio, setActiveRatio] = useState<HarmonicRatio>(HARMONIC_RATIOS[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [dampingFactor, setDampingFactor] = useState<number>(0.0018); // 0.0005 to 0.005
  const [phaseAngle, setPhaseAngle] = useState<number>(Math.PI / 4); // 0 to PI
  const [trailDecay, setTrailDecay] = useState<number>(0.02); // 0.005 to 0.05
  const [pendulumAngle, setPendulumAngle] = useState<number>(0);

  const animFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  // Main Lissajous Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      if (isPlaying) {
        timeRef.current += 0.045;
      }

      const t = timeRef.current;
      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      const centerX = width / 2;
      const centerY = height / 2;

      // Warm atelier velvet background with soft decay
      ctx.fillStyle = `rgba(10, 9, 8, ${trailDecay})`;
      ctx.fillRect(0, 0, width, height);

      // Astronomical Ring Grids
      ctx.strokeStyle = 'rgba(217, 180, 110, 0.08)';
      ctx.lineWidth = 1;
      [120, 220, 320].forEach((r) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      });

      // Draw Lissajous Path Curve
      const points = 450;
      const scale = Math.min(width, height) * 0.38;

      ctx.beginPath();
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#d4af37';
      ctx.shadowColor = '#fbbf24';
      ctx.shadowBlur = 10;

      for (let i = 0; i < points; i++) {
        const stepT = t - (i * 0.025);
        if (stepT < 0) continue;

        const damp = Math.exp(-dampingFactor * (i * 1.5));
        const x = centerX + Math.sin(activeRatio.f1 * stepT + phaseAngle) * scale * damp;
        const y = centerY + Math.sin(activeRatio.f2 * stepT) * scale * damp;

        if (i === 0) {
          ctx.moveTo(x, y);
          // Update pendulum indicator position
          setPendulumAngle(Math.sin(stepT * 2) * 25);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Draw current brass stylus tip point
      const curX = centerX + Math.sin(activeRatio.f1 * t + phaseAngle) * scale;
      const curY = centerY + Math.sin(activeRatio.f2 * t) * scale;

      ctx.beginPath();
      ctx.arc(curX, curY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#fffbeb';
      ctx.fill();
      ctx.strokeStyle = '#d4af37';
      ctx.lineWidth = 2;
      ctx.stroke();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying, activeRatio, dampingFactor, phaseAngle, trailDecay]);

  const resetHarmonograph = () => {
    soundFx.playChime(activeRatio.freqChime, 0.4);
    timeRef.current = 0;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0a0908';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#080706] text-amber-50 font-serif">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Editorial Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-amber-950/20 border border-amber-600/30 backdrop-blur-xl">
            <div className="flex items-center gap-3 font-sans">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30">
                <Clock className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono block">
                  HOROLOGICAL ACOUSTICS // PIÈCE UNIQUE 8.4
                </span>
                <h3 className="font-['Cinzel'] text-2xl sm:text-3xl font-normal text-amber-100 tracking-wider">
                  Lissajous Harmonograph &amp; Astronomical Pendulum
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 font-sans">
              <button
                onClick={() => {
                  soundFx.playClick(isPlaying ? 600 : 900);
                  setIsPlaying(!isPlaying);
                }}
                className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-mono font-bold flex items-center gap-2 transition-all"
                data-cursor="hover"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'PAUSE MOTION' : 'RESUME SWING'}</span>
              </button>

              <button
                onClick={resetHarmonograph}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:opacity-90 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-900/30 transition-all"
                data-cursor="hover"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>REWIND PENDULUM</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column: Astronomical Canvas Viewport + Atelier Tone Ratio Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Canvas Stage (Col 8) */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-gradient-to-b from-[#0e0c0a] to-[#040302] border border-amber-500/20 relative overflow-hidden flex flex-col justify-between min-h-[480px] shadow-2xl">
              <div className="flex items-center justify-between border-b border-amber-500/10 pb-3 text-xs font-mono text-amber-400/70 z-10">
                <span className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  <span>CELESTIAL RESONANCE MATRIX</span>
                </span>
                <span className="font-['Cinzel'] tracking-widest text-amber-200">
                  RATIO: {activeRatio.label} ({activeRatio.name})
                </span>
              </div>

              {/* Canvas Visualizer */}
              <div className="w-full h-84 relative flex items-center justify-center my-auto">
                <canvas ref={canvasRef} className="w-full h-full block rounded-xl" />
              </div>

              {/* Viewport Footer */}
              <div className="pt-3 border-t border-amber-500/10 flex items-center justify-between text-xs font-mono text-amber-400/60 z-10">
                <span>VERMEIL DUST RETENTION: 98.4%</span>
                <span className="font-['Cinzel'] text-amber-300">GENEVA HOROLOGICAL REGISTRY</span>
              </div>
            </div>

            {/* Atelier Controls (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0d0b09] border border-amber-500/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="border-b border-amber-500/15 pb-3 font-sans">
                  <span className="text-xs uppercase text-amber-400/80 font-mono tracking-widest block">
                    PYTHAGOREAN INTERVAL HARMONICS
                  </span>
                  <div className="space-y-2 mt-2">
                    {HARMONIC_RATIOS.map((ratio) => (
                      <button
                        key={ratio.label}
                        onClick={() => {
                          soundFx.playChime(ratio.freqChime, 0.4);
                          setActiveRatio(ratio);
                          timeRef.current = 0;
                        }}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                          activeRatio.label === ratio.label
                            ? 'bg-amber-500/20 border-amber-400 text-amber-100 shadow-md shadow-amber-900/30'
                            : 'bg-black/40 border-amber-500/10 text-amber-400/60 hover:border-amber-500/30'
                        }`}
                        data-cursor="hover"
                      >
                        <div>
                          <div className="font-['Cinzel'] text-sm tracking-wider font-bold">
                            {ratio.label}
                          </div>
                          <div className="font-mono text-[10px] text-amber-400/70">
                            {ratio.name}
                          </div>
                        </div>
                        <span className="font-mono text-xs text-amber-300 font-bold">
                          {ratio.freqChime} Hz
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pendulum Damping Parameter */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-amber-400/70">AERODYNAMIC DAMPING:</span>
                    <span className="text-amber-200 font-bold">
                      {(dampingFactor * 1000).toFixed(1)}‰
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    value={Math.round(dampingFactor * 10000)}
                    onChange={(e) => setDampingFactor(parseInt(e.target.value) / 10000)}
                    className="w-full accent-amber-400 h-1.5 bg-amber-950/40 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* Phase Angle Parameter */}
                <div className="space-y-1.5 font-sans">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-amber-400/70">ORBITAL PHASE ANGLE:</span>
                    <span className="text-amber-200 font-bold">
                      {Math.round((phaseAngle / Math.PI) * 180)}°
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={Math.round((phaseAngle / Math.PI) * 180)}
                    onChange={(e) => setPhaseAngle((parseInt(e.target.value) / 180) * Math.PI)}
                    className="w-full accent-amber-400 h-1.5 bg-amber-950/40 rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Pure Chime Tone Trigger */}
              <button
                onClick={() => soundFx.playChime(activeRatio.freqChime, 0.5)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600/30 to-amber-700/30 hover:bg-amber-600/40 border border-amber-400/40 text-amber-200 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all font-sans"
                data-cursor="hover"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>Chime Harmonic Bell ({activeRatio.freqChime} Hz)</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
