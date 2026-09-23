import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Wind, Sparkles, RefreshCw, Palette } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v04_luxurysilkclothsim',
  name: 'Haute Couture Liquid Silk Cloth Simulation & Aerodynamic Draping',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas, Physics Sandboxes & WebGL Environments',
  techStack: ['HTML5 Canvas 2D', 'Verlet Mass-Spring Physics', 'Cloth Sheen Shaders', 'Aerodynamic Wind Vector', 'Web Audio Ambience'],
  aestheticVibe: 'Haute Couture Silk / Luxury Gold Foil Inscription',
  interactionBlueprint: 'Interactive mass-spring lattice simulating French mulberry silk. Click and drag the cloth surface to manipulate folds and tensile elasticity. Control aerodynamic breeze velocity, release tension tears, and switch silk pigments (Noir Obsidian, Champagne Silk, Imperial Emerald).',
  description: 'An ultra-refined textile dynamics engine modeling liquid silk draping, structural tensile springs, and gilded vermeil thread reflections.',
  codeSnippet: `// Spring constraint relaxation for silk lattice
const dx = p2.x - p1.x;
const dy = p2.y - p1.y;
const dist = Math.hypot(dx, dy);
const diff = (spacing - dist) / dist * 0.5 * elasticity;
if (!p1.pinned) { p1.x -= dx * diff; p1.y -= dy * diff; }
if (!p2.pinned) { p2.x += dx * diff; p2.y += dy * diff; }`,
  tags: ['Spatial', 'Luxury', 'Cloth Simulation', 'Spring Physics', 'Silk', 'Interactive'],
};

interface ClothPoint {
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  pinned: boolean;
}

export default function SpatialLuxurySilkClothSim() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [silkTheme, setSilkTheme] = useState<'CHAMPAGNE' | 'NOIR' | 'EMERALD'>('CHAMPAGNE');
  const [windLevel, setWindLevel] = useState<number>(0.6);

  const pointsRef = useRef<ClothPoint[][]>([]);
  const draggingPointRef = useRef<{ row: number; col: number } | null>(null);

  const cols = 28;
  const rows = 18;
  const spacing = 18;

  const themes = {
    CHAMPAGNE: { bg: '#08080a', silk1: '#d4af37', silk2: '#f3e5ab', border: 'border-amber-500/30' },
    NOIR: { bg: '#040405', silk1: '#3f3f46', silk2: '#a1a1aa', border: 'border-white/20' },
    EMERALD: { bg: '#030806', silk1: '#059669', silk2: '#6ee7b7', border: 'border-emerald-500/30' },
  };

  const currentTheme = themes[silkTheme];

  const initCloth = (width: number) => {
    const pts: ClothPoint[][] = [];
    const startX = (width - cols * spacing) / 2;
    const startY = 40;

    for (let r = 0; r < rows; r++) {
      pts[r] = [];
      for (let c = 0; c < cols; c++) {
        const x = startX + c * spacing;
        const y = startY + r * spacing;
        pts[r][c] = {
          x,
          y,
          oldX: x,
          oldY: y,
          pinned: r === 0 && (c % 4 === 0 || c === cols - 1),
        };
      }
    }
    pointsRef.current = pts;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth || 800);
    const height = (canvas.height = 480);

    initCloth(width);

    let animId: number;
    let time = 0;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      time += 0.03;

      ctx.fillStyle = currentTheme.bg;
      ctx.fillRect(0, 0, width, height);

      const pts = pointsRef.current;
      if (!pts || pts.length === 0) return;

      const windForce = Math.sin(time * 2) * windLevel * 0.4;
      const grav = 0.28;
      const damp = 0.99;

      // Verlet update
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = pts[r][c];
          if (p.pinned) continue;
          if (draggingPointRef.current?.row === r && draggingPointRef.current?.col === c) continue;

          const vx = (p.x - p.oldX) * damp + windForce;
          const vy = (p.y - p.oldY) * damp + grav;

          p.oldX = p.x;
          p.oldY = p.y;
          p.x += vx;
          p.y += vy;
        }
      }

      // Relaxation iterations
      for (let iter = 0; iter < 4; iter++) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = pts[r][c];

            // Right neighbor
            if (c < cols - 1) {
              const right = pts[r][c + 1];
              const dx = right.x - p.x;
              const dy = right.y - p.y;
              const dist = Math.hypot(dx, dy);
              if (dist > 0) {
                const diff = ((spacing - dist) / dist) * 0.5;
                if (!p.pinned) {
                  p.x -= dx * diff;
                  p.y -= dy * diff;
                }
                if (!right.pinned) {
                  right.x += dx * diff;
                  right.y += dy * diff;
                }
              }
            }

            // Bottom neighbor
            if (r < rows - 1) {
              const bottom = pts[r + 1][c];
              const dx = bottom.x - p.x;
              const dy = bottom.y - p.y;
              const dist = Math.hypot(dx, dy);
              if (dist > 0) {
                const diff = ((spacing - dist) / dist) * 0.5;
                if (!p.pinned) {
                  p.x -= dx * diff;
                  p.y -= dy * diff;
                }
                if (!bottom.pinned) {
                  bottom.x += dx * diff;
                  bottom.y += dy * diff;
                }
              }
            }
          }
        }
      }

      // Draw silk cloth quads
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = pts[r][c];
          const p2 = pts[r][c + 1];
          const p3 = pts[r + 1][c + 1];
          const p4 = pts[r + 1][c];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.closePath();

          // Sheen gradient based on fold
          const lightFactor = (p2.y - p1.y + p3.x - p4.x) * 0.05;
          ctx.fillStyle = (r + c) % 2 === 0 ? currentTheme.silk1 : currentTheme.silk2;
          ctx.globalAlpha = Math.max(0.4, Math.min(0.95, 0.75 + lightFactor));
          ctx.fill();

          ctx.strokeStyle = currentTheme.silk1;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      ctx.globalAlpha = 1.0;

      // Draw Monogram Emblem in the center of the fabric
      const centerP = pts[Math.floor(rows / 2)][Math.floor(cols / 2)];
      if (centerP) {
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 18px Cinzel, serif';
        ctx.textAlign = 'center';
        ctx.fillText('AURA ATELIER', centerP.x, centerP.y);
      }
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [silkTheme, windLevel]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const pts = pointsRef.current;
    let closestDist = 40;
    let target = null;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const p = pts[r][c];
        const dist = Math.hypot(p.x - px, p.y - py);
        if (dist < closestDist) {
          closestDist = dist;
          target = { row: r, col: c };
        }
      }
    }

    if (target) {
      soundFx.playClick(600, 0.05);
      draggingPointRef.current = target;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingPointRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const { row, col } = draggingPointRef.current;
    const p = pointsRef.current[row][col];
    p.x = px;
    p.y = py;
  };

  const handlePointerUp = () => {
    if (draggingPointRef.current) {
      soundFx.playChime(750, 0.15);
      draggingPointRef.current = null;
    }
  };

  return (
    <div
      id="spatial_v04_luxurysilkclothsim"
      className="relative w-full min-h-[640px] bg-[#060608] border-b border-white/10 p-6 flex flex-col justify-between font-['Plus_Jakarta_Sans']"
    >
      <BlueprintHUD blueprint={blueprint} />

      {/* Main Viewport */}
      <div className={`relative w-full h-[480px] rounded-3xl border ${currentTheme.border} bg-black/60 my-4 overflow-hidden shadow-2xl`}>
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* Haute Couture Overlay */}
        <div className="absolute top-4 left-4 p-3 bg-black/75 border border-white/10 rounded-xl font-mono text-[11px] text-zinc-300 space-y-1 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>HAUTE COUTURE MASS-SPRING TEXTILE</span>
          </div>
          <div>FABRIC: <strong className="text-white">FRENCH MULBERRY SILK</strong></div>
          <div>LATTICE RESOLUTION: <strong className="text-emerald-400">28 x 18 NODES</strong></div>
          <div className="text-[10px] text-zinc-400">CLICK &amp; DRAG TO DEFORM DRAPING</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 font-mono text-xs text-white">
        <div className="flex items-center gap-2">
          <Palette className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-400 uppercase text-[11px]">PALETTE:</span>
          {(['CHAMPAGNE', 'NOIR', 'EMERALD'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                soundFx.playClick(680);
                setSilkTheme(t);
              }}
              className={`px-3 py-1 rounded-lg border font-bold transition-all ${
                silkTheme === t ? 'bg-amber-400 text-black border-amber-400' : 'bg-white/5 border-white/15 text-zinc-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Wind className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-zinc-400 uppercase text-[11px]">WIND BREEZE:</span>
          <input
            type="range"
            min="0"
            max="1.5"
            step="0.1"
            value={windLevel}
            onChange={(e) => setWindLevel(parseFloat(e.target.value))}
            className="w-24 accent-amber-400 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
