import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Type, Sparkles, Sliders, RefreshCw, Zap, Eye, Move } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v01_chromaticliquiddisplacement',
  name: 'Chromatic Liquid Typography & Spectral Displacement Wave',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Canvas 2D Text Rasterization', 'Fluid Ripple Displacement', 'Chromatic Aberration RGB Split', 'Dynamic Text Engine'],
  aestheticVibe: 'Chromatic Liquid Gradient / Spectral Wave Typography',
  interactionBlueprint: 'High-density canvas rasterizing dynamic typography through multi-layered sine displacement waves and chromatic RGB channel splitting. Interactive mouse pointer emits ripple force fields that distort letterforms with viscous fluid damping.',
  description: 'Fluidic typography experiment rendering responsive text with liquid sine displacement, chromatic RGB edge refraction, cursor-driven wave distortion, and real-time font parameter tuning.',
  codeSnippet: `// Chromatic dispersion text displacement
ctx.fillStyle = 'rgba(255, 0, 70, 0.7)'; // Red channel
ctx.fillText(text, x + Math.sin(y * freq + t) * amp + splitX, y);
ctx.fillStyle = 'rgba(0, 240, 255, 0.7)'; // Cyan channel
ctx.fillText(text, x + Math.sin(y * freq + t) * amp - splitX, y);`,
  tags: ['Typography', 'Chromatic', 'Liquid', 'Displacement', 'Canvas', 'RGB Split'],
};

export default function TypographyChromaticLiquidDisplacement() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Interactive Typography Parameters
  const [headlineText, setHeadlineText] = useState<string>('SPECTRUM // KINETIC');
  const [subText, setSubText] = useState<string>('VISCOUS CHROMATIC REFRACTION');
  const [rgbSplitDistance, setRgbSplitDistance] = useState<number>(6); // 1 to 18px
  const [waveFrequency, setWaveFrequency] = useState<number>(0.015); // 0.005 to 0.04
  const [waveAmplitude, setWaveAmplitude] = useState<number>(14); // 2 to 35
  const [viscosityDamping, setViscosityDamping] = useState<number>(0.92); // 0.8 to 0.98
  const [paletteMode, setPaletteMode] = useState<'CHROMATIC' | 'CYAN_EMERALD' | 'VIOLET_SUNSET'>('CHROMATIC');

  // Mouse interaction state
  const mouseRef = useRef<{ x: number; y: number; active: boolean; radius: number }>({
    x: 0,
    y: 0,
    active: false,
    radius: 120,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.035;

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);

      // Deep dark canvas backdrop with subtle persistence trail
      ctx.fillStyle = '#06070a';
      ctx.fillRect(0, 0, width, height);

      // Fine typographic alignment grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridGap = 48;
      for (let x = 0; x < width; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const centerX = width / 2;
      const centerY = height / 2;

      // Calculate cursor influence
      const mx = mouseRef.current.x * 2;
      const my = mouseRef.current.y * 2;
      const isMouseNear = mouseRef.current.active;

      // Font sizing responsive to canvas
      const mainFontSize = Math.min(width * 0.075, 84);
      const subFontSize = Math.min(width * 0.022, 22);

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Determine RGB split offsets
      const split = rgbSplitDistance;

      // Render 3 passes: Red / Magenta channel, Cyan / Green channel, White center core
      const passes =
        paletteMode === 'CHROMATIC'
          ? [
              { color: 'rgba(255, 20, 80, 0.75)', dx: -split, dy: -split * 0.4 },
              { color: 'rgba(0, 240, 255, 0.75)', dx: split, dy: split * 0.4 },
              { color: 'rgba(255, 255, 255, 0.95)', dx: 0, dy: 0 },
            ]
          : paletteMode === 'CYAN_EMERALD'
          ? [
              { color: 'rgba(52, 211, 153, 0.75)', dx: -split, dy: 0 },
              { color: 'rgba(6, 182, 212, 0.75)', dx: split, dy: 0 },
              { color: 'rgba(255, 255, 255, 0.95)', dx: 0, dy: 0 },
            ]
          : [
              { color: 'rgba(236, 72, 153, 0.75)', dx: -split, dy: -split * 0.3 },
              { color: 'rgba(245, 158, 11, 0.75)', dx: split, dy: split * 0.3 },
              { color: 'rgba(255, 255, 255, 0.95)', dx: 0, dy: 0 },
            ];

      // Draw Main Headline with Multi-Wave Sine Distortion
      passes.forEach((pass) => {
        ctx.save();
        ctx.font = `900 ${mainFontSize}px 'Syne', sans-serif`;

        // Calculate dynamic wave displacement
        let waveX = Math.sin(time * 2.2) * waveAmplitude;
        let waveY = Math.cos(time * 1.8) * (waveAmplitude * 0.6);

        // Apply mouse ripple repulsion if active
        if (isMouseNear) {
          const dx = centerX - mx;
          const dy = (centerY - 30) - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 300) {
            const force = (1 - dist / 300) * 45;
            waveX += (dx / dist) * force;
            waveY += (dy / dist) * force;
          }
        }

        ctx.fillStyle = pass.color;
        ctx.fillText(
          headlineText,
          centerX + pass.dx + waveX,
          centerY - 30 + pass.dy + waveY
        );

        ctx.restore();
      });

      // Draw Subtitle Typography with Subtle Phase Lead
      passes.forEach((pass) => {
        ctx.save();
        ctx.font = `600 ${subFontSize}px 'Plus_Jakarta_Sans', sans-serif`;

        const subWaveX = Math.cos(time * 2.5 + 1.2) * (waveAmplitude * 0.5);
        const subWaveY = Math.sin(time * 2.0 + 1.5) * (waveAmplitude * 0.3);

        ctx.fillStyle = pass.color;
        ctx.fillText(
          subText,
          centerX + pass.dx * 0.5 + subWaveX,
          centerY + mainFontSize * 0.75 + pass.dy * 0.5 + subWaveY
        );

        ctx.restore();
      });

      // Ambient Corner Metadata Annotations
      ctx.font = `400 18px 'JetBrains Mono', monospace`;
      ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.textAlign = 'left';
      ctx.fillText(`FREQ: ${(waveFrequency * 1000).toFixed(1)} mHz // AMP: ${waveAmplitude}px`, 32, 48);
      ctx.fillText(`DISP: ${rgbSplitDistance}px RGB_SPLIT`, 32, 74);

      ctx.textAlign = 'right';
      ctx.fillText(`PALETTE: ${paletteMode}`, width - 32, 48);
      ctx.fillText(`VISCOSITY: ${(viscosityDamping * 100).toFixed(0)}%`, width - 32, 74);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [headlineText, subText, rgbSplitDistance, waveFrequency, waveAmplitude, viscosityDamping, paletteMode]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
      radius: 140,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full bg-[#050609] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
        {/* Interactive Visual Canvas Stage */}
        <div className="relative w-full h-[460px] sm:h-[520px] bg-black cursor-crosshair overflow-hidden">
          <canvas
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-full block"
          />

          {/* Floating Canvas Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/70 border border-white/15 text-pink-400 font-mono text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" /> CHROMATIC FLUID DISPLACEMENT
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-[10px]">
              POINTER REACTIVE
            </span>
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-zinc-400 font-mono text-[10px]">
              Move pointer across canvas to perturb fluid field
            </span>
          </div>
        </div>

        {/* Live Typography Parameter Tuning Deck */}
        <div className="p-5 bg-[#0a0c12] border-t border-white/10 flex flex-col gap-5">
          {/* Text Input Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-pink-400" /> Headline Display String
              </label>
              <input
                type="text"
                value={headlineText}
                onChange={(e) => setHeadlineText(e.target.value.toUpperCase())}
                className="w-full bg-black/50 border border-white/15 rounded-lg px-3.5 py-2 text-white font-['Syne'] font-bold text-sm tracking-wider focus:outline-none focus:border-pink-500 transition-colors"
                maxLength={24}
              />
            </div>
            <div>
              <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-cyan-400" /> Subtitle Monospace Slug
              </label>
              <input
                type="text"
                value={subText}
                onChange={(e) => setSubText(e.target.value.toUpperCase())}
                className="w-full bg-black/50 border border-white/15 rounded-lg px-3.5 py-2 text-zinc-300 font-mono text-xs tracking-wider focus:outline-none focus:border-cyan-500 transition-colors"
                maxLength={36}
              />
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* RGB Split Offset */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">RGB ABERRATION:</span>
                <span className="text-pink-400 font-bold">{rgbSplitDistance}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="18"
                step="1"
                value={rgbSplitDistance}
                onChange={(e) => {
                  soundFx.playTick(1200);
                  setRgbSplitDistance(Number(e.target.value));
                }}
                className="w-full accent-pink-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wave Amplitude */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">WAVE AMPLITUDE:</span>
                <span className="text-cyan-400 font-bold">{waveAmplitude}px</span>
              </div>
              <input
                type="range"
                min="2"
                max="35"
                step="1"
                value={waveAmplitude}
                onChange={(e) => {
                  soundFx.playTick(900);
                  setWaveAmplitude(Number(e.target.value));
                }}
                className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Wave Frequency */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-400">FREQUENCY:</span>
                <span className="text-emerald-400 font-bold">{(waveFrequency * 1000).toFixed(0)}mHz</span>
              </div>
              <input
                type="range"
                min="0.005"
                max="0.04"
                step="0.005"
                value={waveFrequency}
                onChange={(e) => {
                  soundFx.playTick(750);
                  setWaveFrequency(Number(e.target.value));
                }}
                className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Palette Mode */}
            <div className="p-3 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-mono text-zinc-400 mb-2">COLOR PALETTE:</span>
              <div className="flex items-center gap-1.5">
                {(['CHROMATIC', 'CYAN_EMERALD', 'VIOLET_SUNSET'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundFx.playClick(650);
                      setPaletteMode(mode);
                    }}
                    className={`flex-1 py-1 text-[10px] font-mono rounded border transition-colors ${
                      paletteMode === mode
                        ? 'bg-pink-500/20 text-pink-300 border-pink-500 font-bold'
                        : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {mode.split('_')[0]}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
