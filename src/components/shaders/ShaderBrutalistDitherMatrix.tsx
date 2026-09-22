import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sliders, Sparkles, Terminal, RefreshCw, Zap, Stamp, Eye } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'shader_v02_brutalistdithermatrix',
  name: 'Neo-Brutalist Ordered Dither & ASCII Halftone Matrix',
  category: 'Shader',
  batch: 'Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX',
  techStack: ['React 19', 'Canvas 2D Pixel Buffer Shader', 'Bayer 8x8 Matrix Dithering', 'ASCII Luminance Quantization', 'Halftone Screen Engine'],
  aestheticVibe: 'Neo-Brutalist Hardware Dither / Monospace Terminal Matrix',
  interactionBlueprint: 'Direct pixel pipeline quantizing live canvas raster buffers through Bayer 8x8 ordered threshold matrices and ASCII font glyph maps. Users can toggle dot pitch, contrast curves, matrix inversion, and stamp interactive brutalist decals across the viewport.',
  description: 'Hardware-inspired dithering shader transforming continuous tone vector animations into high-contrast 1-bit or 8-bit dot-matrix halftones, retro CRT ASCII streams, and newsprint print screens in real time.',
  codeSnippet: `// 8x8 Bayer ordered dithering threshold matrix
const bayer8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
];
const threshold = bayer8[(y % 8) * 8 + (x % 8)] / 64.0;
const isLit = luminance > threshold;`,
  tags: ['Shader', 'Dither', 'Bayer Matrix', 'Halftone', 'ASCII', 'Neo-Brutalist', 'Pixelation'],
};

// 8x8 Bayer Matrix
const BAYER_8X8 = [
   0, 32,  8, 40,  2, 34, 10, 42,
  48, 16, 56, 24, 50, 18, 58, 26,
  12, 44,  4, 36, 14, 46,  6, 38,
  60, 28, 52, 20, 62, 30, 54, 22,
   3, 35, 11, 43,  1, 33,  9, 41,
  51, 19, 59, 27, 49, 17, 57, 25,
  15, 47,  7, 39, 13, 45,  5, 37,
  63, 31, 55, 23, 61, 29, 53, 21
];

const ASCII_CHAR_RAMP = ' .:-=+*#%@';

interface StampItem {
  x: number;
  y: number;
  label: string;
  rotation: number;
}

export default function ShaderBrutalistDitherMatrix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shader Parameters
  const [shaderMode, setShaderMode] = useState<'BAYER_8X8' | 'HALFTONE_SCREEN' | 'ASCII_MATRIX'>('BAYER_8X8');
  const [pixelPitch, setPixelPitch] = useState<number>(6); // 2 to 18px
  const [contrast, setContrast] = useState<number>(1.2); // 0.5 to 2.5
  const [inverted, setInverted] = useState<boolean>(false);
  const [colorPalette, setColorPalette] = useState<'NEWSPRINT_BW' | 'PHOSPHOR_GREEN' | 'CYBER_AMBER' | 'COBALT_BLUE'>('NEWSPRINT_BW');
  const [stamps, setStamps] = useState<StampItem[]>([]);

  const addStampAtPointer = (x: number, y: number) => {
    soundFx.playTick(1200);
    const stampLabels = ['RAW_PIXEL', 'APPROVED', 'BIT_8', 'VOID', 'ISO_100', 'NOISE_OK'];
    const label = stampLabels[Math.floor(Math.random() * stampLabels.length)];
    const rot = (Math.random() - 0.5) * 0.4;
    setStamps((prev) => [...prev.slice(-8), { x, y, label, rotation: rot }]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Offscreen render canvas for raw scene
    const offscreen = document.createElement('canvas');
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.03;

      const displayW = canvas.offsetWidth;
      const displayH = canvas.offsetHeight;
      if (displayW === 0 || displayH === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // We downscale the offscreen canvas based on pixelPitch for brutalist hardware quantization
      const downscale = Math.max(2, pixelPitch);
      const renderW = Math.floor(displayW / downscale);
      const renderH = Math.floor(displayH / downscale);

      canvas.width = displayW;
      canvas.height = displayH;
      offscreen.width = renderW;
      offscreen.height = renderH;

      // ==========================================
      // 1. RENDER VECTOR SCENE TO OFFSCREEN
      // ==========================================
      offCtx.fillStyle = '#0a0a0a';
      offCtx.fillRect(0, 0, renderW, renderH);

      // Rotating brutalist 3D wireframe geometric prisms
      offCtx.save();
      offCtx.translate(renderW * 0.35, renderH * 0.45);
      offCtx.rotate(time * 0.5);
      const cubeSize = renderH * 0.28;
      for (let i = 0; i < 6; i++) {
        offCtx.rotate(0.3);
        const grad = offCtx.createLinearGradient(-cubeSize, -cubeSize, cubeSize, cubeSize);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.5, 'rgba(120, 120, 120, 0.4)');
        grad.addColorStop(1, 'rgba(20, 20, 20, 0.8)');
        offCtx.fillStyle = grad;
        offCtx.fillRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
        offCtx.strokeStyle = '#ffffff';
        offCtx.lineWidth = 2;
        offCtx.strokeRect(-cubeSize / 2, -cubeSize / 2, cubeSize, cubeSize);
      }
      offCtx.restore();

      // Sweeping concentric ripple wave
      offCtx.save();
      offCtx.translate(renderW * 0.72, renderH * 0.6);
      for (let r = 8; r < renderW * 0.35; r += 14) {
        const pulse = Math.sin(time * 3 + r * 0.15) * 6;
        offCtx.beginPath();
        offCtx.arc(0, 0, r + pulse, 0, Math.PI * 2);
        offCtx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        offCtx.lineWidth = 3;
        offCtx.stroke();
      }
      offCtx.restore();

      // Bold brutalist typography
      offCtx.save();
      offCtx.font = `900 ${Math.floor(renderH * 0.18)}px "Space Grotesk", sans-serif`;
      offCtx.fillStyle = '#ffffff';
      offCtx.textAlign = 'center';
      offCtx.fillText('HALFTONE // RAW', renderW / 2, renderH * 0.38);

      offCtx.font = `700 ${Math.floor(renderH * 0.08)}px "JetBrains Mono", monospace`;
      offCtx.fillStyle = '#999999';
      offCtx.fillText('BAYER 8x8 ORDERED SHADER // PITCH ' + downscale + 'PX', renderW / 2, renderH * 0.52);
      offCtx.restore();

      // Draw custom user stamped decals onto offscreen
      stamps.forEach((stamp) => {
        const sx = (stamp.x / displayW) * renderW;
        const sy = (stamp.y / displayH) * renderH;
        offCtx.save();
        offCtx.translate(sx, sy);
        offCtx.rotate(stamp.rotation);
        offCtx.fillStyle = '#ffffff';
        offCtx.fillRect(-35, -12, 70, 24);
        offCtx.fillStyle = '#000000';
        offCtx.font = 'bold 11px "JetBrains Mono", monospace';
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillText(stamp.label, 0, 0);
        offCtx.restore();
      });

      // ==========================================
      // 2. EXTRACT PIXELS & APPLY DITHER PIPELINE
      // ==========================================
      let imgData: ImageData;
      try {
        imgData = offCtx.getImageData(0, 0, renderW, renderH);
      } catch {
        animId = requestAnimationFrame(render);
        return;
      }
      const data = imgData.data;

      // Color scheme definitions
      let fgColor = '#ffffff';
      let bgColor = '#050505';
      if (colorPalette === 'PHOSPHOR_GREEN') {
        fgColor = '#22c55e';
        bgColor = '#041508';
      } else if (colorPalette === 'CYBER_AMBER') {
        fgColor = '#fbbf24';
        bgColor = '#160c02';
      } else if (colorPalette === 'COBALT_BLUE') {
        fgColor = '#38bdf8';
        bgColor = '#030e1d';
      }

      if (inverted) {
        const tmp = fgColor;
        fgColor = bgColor;
        bgColor = tmp;
      }

      // Clear display canvas with background tone
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, displayW, displayH);

      // Render mode branching
      if (shaderMode === 'ASCII_MATRIX') {
        ctx.fillStyle = fgColor;
        ctx.font = `bold ${downscale + 2}px "JetBrains Mono", monospace`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        for (let y = 0; y < renderH; y++) {
          for (let x = 0; x < renderW; x++) {
            const idx = (y * renderW + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            // Luminance formula
            let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
            lum = Math.min(1.0, Math.max(0.0, Math.pow(lum, 1.0 / contrast)));

            if (inverted) lum = 1.0 - lum;

            if (lum > 0.08) {
              const charIdx = Math.floor(lum * (ASCII_CHAR_RAMP.length - 1));
              const char = ASCII_CHAR_RAMP[charIdx];
              ctx.fillText(char, x * downscale + downscale * 0.5, y * downscale + downscale * 0.5);
            }
          }
        }
      } else if (shaderMode === 'HALFTONE_SCREEN') {
        // Circular halftone dots scaling radius by pixel luminance
        ctx.fillStyle = fgColor;
        const maxRadius = (downscale * 0.9) / 2;

        for (let y = 0; y < renderH; y++) {
          for (let x = 0; x < renderW; x++) {
            const idx = (y * renderW + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
            lum = Math.min(1.0, Math.max(0.0, Math.pow(lum, 1.0 / contrast)));

            if (inverted) lum = 1.0 - lum;

            if (lum > 0.05) {
              const dotRadius = maxRadius * lum;
              ctx.beginPath();
              ctx.arc(x * downscale + downscale * 0.5, y * downscale + downscale * 0.5, dotRadius, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      } else {
        // BAYER_8X8 ORDERED DITHERING
        ctx.fillStyle = fgColor;

        for (let y = 0; y < renderH; y++) {
          for (let x = 0; x < renderW; x++) {
            const idx = (y * renderW + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            let lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255.0;
            lum = Math.min(1.0, Math.max(0.0, Math.pow(lum, 1.0 / contrast)));

            if (inverted) lum = 1.0 - lum;

            const bayerVal = BAYER_8X8[(y % 8) * 8 + (x % 8)] / 64.0;

            if (lum > bayerVal) {
              ctx.fillRect(x * downscale, y * downscale, downscale - 0.5, downscale - 0.5);
            }
          }
        }
      }

      // Fine CRT scanline overlay
      ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
      for (let y = 0; y < displayH; y += 3) {
        ctx.fillRect(0, y, displayW, 1);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      addStampAtPointer(clickX, clickY);
    };

    canvas.addEventListener('click', handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [shaderMode, pixelPitch, contrast, inverted, colorPalette, stamps]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>BATCH 10 // VARIATION 47 &bull; NEO-BRUTALIST SHADER</span>
            </div>
            <h2 className="font-['Syne'] text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Neo-Brutalist Ordered Dither &amp; ASCII Halftone Matrix
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setShaderMode('BAYER_8X8');
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                shaderMode === 'BAYER_8X8'
                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-sm'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Bayer 8x8 Dither
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                setShaderMode('HALFTONE_SCREEN');
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                shaderMode === 'HALFTONE_SCREEN'
                  ? 'bg-white text-black border-white font-bold shadow-sm'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Halftone Screen
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                setShaderMode('ASCII_MATRIX');
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                shaderMode === 'ASCII_MATRIX'
                  ? 'bg-green-500 text-black border-green-400 font-bold shadow-sm'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              ASCII Matrix
            </button>

            <button
              onClick={() => {
                soundFx.playTick(900);
                setInverted(!inverted);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                inverted
                  ? 'bg-purple-400 text-black border-purple-400 font-bold'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              {inverted ? 'INVERTED: ON' : 'INVERTED: OFF'}
            </button>

            <button
              onClick={() => {
                soundFx.playTick(600);
                setStamps([]);
              }}
              className="px-2.5 py-1.5 rounded font-mono text-xs bg-white/5 text-zinc-400 hover:text-rose-400 border border-white/10 transition-colors"
              title="Clear stamped decals"
              data-cursor="hover"
            >
              Clear Stamps
            </button>
          </div>
        </div>

        {/* Canvas & Shader Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Dither Canvas */}
          <div className="lg:col-span-3 rounded-xl border border-white/15 bg-black overflow-hidden relative shadow-2xl h-[460px] sm:h-[520px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-crosshair"
              title="Click anywhere to stamp brutalist verification badges into the dither matrix"
              data-cursor="hover"
            />

            {/* In-canvas watermark */}
            <div className="absolute top-3 right-3 pointer-events-none font-mono text-[11px] text-zinc-400 bg-black/80 px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>QUANTIZATION // {shaderMode} &bull; PITCH {pixelPitch}PX</span>
            </div>

            <div className="absolute bottom-3 left-4 pointer-events-none font-mono text-[11px] text-zinc-500 bg-black/70 px-2.5 py-1 rounded">
              CLICK CANVAS TO STAMP BRUTALIST SEALS
            </div>
          </div>

          {/* Controls HUD */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 uppercase pb-3 border-b border-white/10 mb-4">
                <Sliders className="w-4 h-4 text-amber-400" />
                <span>Pixel Pipeline Calibrator</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Dot Pitch (Pixelation):</span>
                    <strong className="text-amber-400">{pixelPitch}px</strong>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="18"
                    step="1"
                    value={pixelPitch}
                    onChange={(e) => {
                      soundFx.playTick(850);
                      setPixelPitch(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>Fine (3px)</span>
                    <span>Standard (8px)</span>
                    <span>Chunk (18px)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Gamma Contrast:</span>
                    <strong className="text-cyan-400">{contrast.toFixed(1)}x</strong>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={contrast}
                    onChange={(e) => {
                      soundFx.playTick(900);
                      setContrast(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <span className="text-xs font-mono text-zinc-400 block mb-2">Phosphor Palette:</span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => {
                        soundFx.playClick(600);
                        setColorPalette('NEWSPRINT_BW');
                      }}
                      className={`p-2 rounded font-mono text-[11px] border text-left ${
                        colorPalette === 'NEWSPRINT_BW'
                          ? 'bg-white text-black border-white font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      B&amp;W Newsprint
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick(650);
                        setColorPalette('PHOSPHOR_GREEN');
                      }}
                      className={`p-2 rounded font-mono text-[11px] border text-left ${
                        colorPalette === 'PHOSPHOR_GREEN'
                          ? 'bg-green-500 text-black border-green-400 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      Phosphor CRT
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick(700);
                        setColorPalette('CYBER_AMBER');
                      }}
                      className={`p-2 rounded font-mono text-[11px] border text-left ${
                        colorPalette === 'CYBER_AMBER'
                          ? 'bg-amber-400 text-black border-amber-400 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      Cyber Amber
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playClick(750);
                        setColorPalette('COBALT_BLUE');
                      }}
                      className={`p-2 rounded font-mono text-[11px] border text-left ${
                        colorPalette === 'COBALT_BLUE'
                          ? 'bg-sky-400 text-black border-sky-400 font-bold'
                          : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                    >
                      Cobalt Blueprint
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-400 font-bold">
                <Stamp className="w-3.5 h-3.5" />
                <span>Interactive Decals:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Click anywhere on the preview to imprint hardware stamps that get rasterized through the Bayer matrix or ASCII font ramp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlueprintHUD>
);
}
