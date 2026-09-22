import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Activity, Radio, Sparkles, Sliders, Volume2, Play, Pause, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'generative_v01_fluidochilloscope',
  name: 'Chromatic Liquid Audio Oscilloscope & Spectral Refraction Ribbon',
  category: 'Generative',
  batch: 'Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures',
  techStack: ['React 19', 'Canvas 2D Harmonic Engine', 'Multi-Octave Sine Synthesis', 'Chromatic Dispersion Gradient', 'Web Audio'],
  aestheticVibe: 'Chromatic Liquid Gradient / Generative Audio-Visual Art',
  interactionBlueprint: 'Dynamic 3-octave harmonic sine wave integration generating fluid ribbon interference patterns. Real-time controls for fundamental frequency, resonance drive, chromatic RGB dispersion separation, and pulse bursts.',
  description: 'Fluidic chromatic oscilloscope synthesizing multi-frequency acoustic waveforms with iridescent spectral refraction ribbons, interactive frequency tuning, and harmonic chime triggers.',
  codeSnippet: `// Multi-frequency harmonic wave superposition with chromatic shift
const y = centerY + Math.sin(x * f1 + t) * a1 + Math.sin(x * f2 + t * 1.6) * a2;
ctx.strokeStyle = \`hsl(\${(x * 0.4 + t * 40 + dispersion) % 360}, 95%, 60%)\`;`,
  tags: ['Generative', 'Oscilloscope', 'Audio-Visual', 'Chromatic', 'Harmonics', 'Waveform'],
};

export default function GenerativeFluidOscilloscope() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sound & Harmonic parameters
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [fundamentalFreq, setFundamentalFreq] = useState<number>(38); // 10 to 100
  const [harmonicsCount, setHarmonicsCount] = useState<number>(4); // 1 to 6
  const [chromaticDispersion, setChromaticDispersion] = useState<number>(35); // 0 to 70
  const [resonanceDrive, setResonanceDrive] = useState<number>(1.4); // 0.5 to 3.0
  const [paletteMode, setPaletteMode] = useState<'CHROMATIC' | 'CYAN_PINK' | 'EMBER_GOLD'>('CHROMATIC');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      if (isPlaying) {
        time += 0.035;
      }

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      const centerY = height / 2;

      // Dark spectral background with subtle motion trail
      ctx.fillStyle = 'rgba(5, 7, 12, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Fine oscilloscope background grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Center crosshair axis
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Render Chromatic Multi-Layer Wave Ribbons
      const layers = 5;
      for (let l = 0; l < layers; l++) {
        const layerPhase = (l / layers) * (chromaticDispersion * 0.03);
        const layerAlpha = 0.35 + (l / layers) * 0.45;

        ctx.beginPath();
        ctx.lineWidth = 2.5 + l * 0.8;

        for (let x = 0; x < width; x += 3) {
          const normX = x / width;
          // Envelope window to taper at edges
          const envelope = Math.sin(normX * Math.PI);

          // Superposition of harmonic frequencies
          let wave = 0;
          for (let h = 1; h <= harmonicsCount; h++) {
            const freq = (fundamentalFreq * 0.00035 * h);
            const speed = time * (1 + h * 0.35);
            wave += Math.sin(x * freq + speed + layerPhase * h) * (1 / (h * 0.85));
          }

          const amplitude = 90 * resonanceDrive * envelope;
          const y = centerY + wave * amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        // Color selection based on palette
        if (paletteMode === 'CHROMATIC') {
          const hue = (l * 40 + time * 30) % 360;
          ctx.strokeStyle = `hsla(${hue}, 95%, 65%, ${layerAlpha})`;
          ctx.shadowColor = `hsla(${hue}, 100%, 50%, 0.8)`;
          ctx.shadowBlur = 12;
        } else if (paletteMode === 'CYAN_PINK') {
          ctx.strokeStyle = l % 2 === 0 ? `rgba(56, 189, 248, ${layerAlpha})` : `rgba(244, 63, 94, ${layerAlpha})`;
          ctx.shadowColor = l % 2 === 0 ? '#38bdf8' : '#f43f5e';
          ctx.shadowBlur = 14;
        } else {
          ctx.strokeStyle = `rgba(${240 + l * 3}, ${160 - l * 20}, ${30 + l * 15}, ${layerAlpha})`;
          ctx.shadowColor = '#f59e0b';
          ctx.shadowBlur = 14;
        }

        ctx.stroke();
      }

      // Reset shadow blur
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, fundamentalFreq, harmonicsCount, chromaticDispersion, resonanceDrive, paletteMode]);

  const triggerHarmonicBurst = () => {
    soundFx.playChime(600 + fundamentalFreq * 4, 0.4);
    setResonanceDrive(2.8);
    setTimeout(() => setResonanceDrive(1.4), 600);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#040508] text-zinc-100 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold block">
                  GENERATIVE AUDIO-VISUAL ART // V8.1
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Chromatic Liquid Audio Oscilloscope
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playClick(isPlaying ? 600 : 900);
                  setIsPlaying(!isPlaying);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 transition-all"
                data-cursor="hover"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'PAUSE WAVE' : 'RESUME OSC'}</span>
              </button>

              <button
                onClick={triggerHarmonicBurst}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 hover:opacity-90 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                data-cursor="hover"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>HARMONIC BURST</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column: Oscilloscope Canvas Stage + Parameter Control Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Canvas Viewport (Col 8) */}
            <div className="lg:col-span-8 p-4 rounded-2xl bg-gradient-to-b from-[#070b14] to-black border border-white/10 relative overflow-hidden flex flex-col justify-between min-h-[460px] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-zinc-400 z-10">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>SPECTRAL DISPERSION INTERFEROMETER</span>
                </span>
                <span className="text-cyan-300">FUNDAMENTAL: {fundamentalFreq * 4.5} Hz</span>
              </div>

              {/* Canvas Visualizer */}
              <div className="w-full h-80 relative flex items-center justify-center my-auto">
                <canvas ref={canvasRef} className="w-full h-full block rounded-xl" />
              </div>

              {/* Viewport Footer Telemetry */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 z-10">
                <span>FOURIER HARMONICS: N={harmonicsCount}</span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">COLOR SCHEME:</span>
                  {(['CHROMATIC', 'CYAN_PINK', 'EMBER_GOLD'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        soundFx.playClick(750);
                        setPaletteMode(mode);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        paletteMode === mode
                          ? 'bg-cyan-500 text-black'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                      data-cursor="hover"
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tuning Studio Controls (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Acoustic Synthesis Parameters
                  </h4>
                </div>

                {/* 1. Fundamental Frequency */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">FUNDAMENTAL PITCH:</span>
                    <span className="text-cyan-400 font-bold">{fundamentalFreq * 4.5} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="90"
                    value={fundamentalFreq}
                    onChange={(e) => setFundamentalFreq(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 2. Harmonics Count */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">HARMONIC OVERTONES:</span>
                    <span className="text-pink-400 font-bold">{harmonicsCount} OCTAVES</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={harmonicsCount}
                    onChange={(e) => setHarmonicsCount(parseInt(e.target.value))}
                    className="w-full accent-pink-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 3. Chromatic Dispersion */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">CHROMATIC DISPERSION:</span>
                    <span className="text-amber-400 font-bold">{chromaticDispersion}° REFRACT</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="65"
                    value={chromaticDispersion}
                    onChange={(e) => setChromaticDispersion(parseInt(e.target.value))}
                    className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 4. Resonance Drive */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">RESONANCE GAIN:</span>
                    <span className="text-emerald-400 font-bold">{resonanceDrive.toFixed(2)}x</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="260"
                    value={Math.round(resonanceDrive * 100)}
                    onChange={(e) => setResonanceDrive(parseInt(e.target.value) / 100)}
                    className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* Mathematical Formula Preview */}
                <div className="p-3.5 rounded-xl bg-black/60 border border-white/5 space-y-1 font-mono text-[11px] text-zinc-400">
                  <span className="text-zinc-500 uppercase text-[10px] block">Harmonic Superposition:</span>
                  <div className="text-cyan-300 font-semibold">
                    y(t) = Σ (A / n) &bull; sin(2π &bull; f₀ &bull; n &bull; t + φₙ)
                  </div>
                </div>
              </div>

              {/* Sound Trigger */}
              <button
                onClick={() => soundFx.playChime(750, 0.3)}
                className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-cyan-400/30 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                data-cursor="hover"
              >
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Test Acoustic Timbre</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
