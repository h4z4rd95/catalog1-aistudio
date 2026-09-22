import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sliders, Sparkles, Crown, RefreshCw, Zap, Eye, Move } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'shader_v04_luxuryflutedglass',
  name: 'Haute Couture Fluted Ribbed Glass & Liquid Mercury',
  category: 'Shader',
  batch: 'Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX',
  techStack: ['React 19', 'Canvas 2D Cylindrical Lens Shader', 'Specular Caustic Ribbing', 'Metaball Surface Tension', 'Haute Couture Editorial'],
  aestheticVibe: 'Haute Couture Architectural Fluted Glass / Liquid Mercury Vermeil',
  interactionBlueprint: 'Architectural ribbed glass shader displacing editorial typography along cylindrical optical flute ridges. Users can adjust flute pitch, orientation, glass tint, and drag viscous liquid mercury puddles that coalesce via fluid surface tension.',
  description: 'Luxury optical shader simulating high-end interior fluted architectural glass with specular light ridges, vermeil caustics, and organic liquid mercury droplets sliding across museum editorial layouts.',
  codeSnippet: `// Cylindrical fluted rib refraction displacement
const ribPhase = (x % ribWidth) / ribWidth; // 0.0 to 1.0
const normalX = Math.sin((ribPhase - 0.5) * Math.PI);
const refractOffset = normalX * ribDepth;
const specular = Math.pow(Math.max(0, normalX), 12.0) * highlightIntensity;
ctx.drawImage(offscreen, x + refractOffset, y);`,
  tags: ['Shader', 'Fluted Glass', 'Luxury', 'Refraction', 'Liquid Mercury', 'Editorial', 'Caustics'],
};

interface MercuryDrop {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function ShaderLuxuryFlutedGlass() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Shader Parameters
  const [ribWidth, setRibWidth] = useState<number>(24); // 10 to 60px
  const [causticIntensity, setCausticIntensity] = useState<number>(0.75); // 0.2 to 1.0
  const [orientation, setOrientation] = useState<'VERTICAL_REEDED' | 'HORIZONTAL_LOUVER' | 'CROSS_HATCH'>('VERTICAL_REEDED');
  const [glassTint, setGlassTint] = useState<'VERMEIL_GOLD' | 'SMOKED_OBSIDIAN' | 'ROSE_CHAMPAGNE' | 'FROSTED_OPALINE'>('VERMEIL_GOLD');
  const [mercuryActive, setMercuryActive] = useState<boolean>(true);

  // Mercury droplets state
  const dropsRef = useRef<MercuryDrop[]>([
    { x: 250, y: 200, vx: 0.5, vy: 0.3, radius: 42 },
    { x: 340, y: 230, vx: -0.4, vy: 0.2, radius: 35 },
    { x: 550, y: 320, vx: 0.3, vy: -0.3, radius: 48 },
    { x: 620, y: 280, vx: -0.2, vy: 0.4, radius: 28 },
  ]);

  const pointerRef = useRef<{ x: number; y: number; isDown: boolean }>({
    x: 0,
    y: 0,
    isDown: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d');
    if (!bgCtx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02;

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      bgCanvas.width = width;
      bgCanvas.height = height;

      // ==========================================
      // 1. RENDER EDITORIAL BACKGROUND GRAPHIC
      // ==========================================
      bgCtx.fillStyle = '#08080a';
      bgCtx.fillRect(0, 0, width, height);

      // Delicate golden archival border
      bgCtx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
      bgCtx.lineWidth = 2;
      bgCtx.strokeRect(40, 40, width - 80, height - 80);
      bgCtx.strokeStyle = 'rgba(212, 175, 55, 0.1)';
      bgCtx.strokeRect(52, 52, width - 104, height - 104);

      // Rotating celestial astronomical circles
      bgCtx.save();
      bgCtx.translate(width * 0.75, height * 0.45);
      bgCtx.rotate(time * 0.15);
      for (let r = 30; r < 280; r += 24) {
        bgCtx.beginPath();
        bgCtx.arc(0, 0, r, 0, Math.PI * 2);
        bgCtx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
        bgCtx.stroke();
      }
      bgCtx.restore();

      // High-fashion Roman typography
      bgCtx.save();
      bgCtx.font = '300 18px "Cinzel", serif';
      bgCtx.fillStyle = 'rgba(212, 175, 55, 0.8)';
      bgCtx.letterSpacing = '6px';
      bgCtx.fillText('COLLECTION AUTOMNE // ARCHITECTURAL VERMEIL N° 10', 80, 110);

      bgCtx.font = 'bold 92px "Playfair Display", serif';
      bgCtx.fillStyle = '#ffffff';
      bgCtx.fillText('L\'ATELIER FLUTÉ', 80, 230);

      bgCtx.font = 'italic 300 48px "Playfair Display", serif';
      bgCtx.fillStyle = 'rgba(212, 175, 55, 0.9)';
      bgCtx.fillText('Haute Horlogerie &amp; Verre Cannelé', 80, 300);

      bgCtx.font = '400 15px "JetBrains Mono", monospace';
      bgCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
      bgCtx.fillText('PARIS &bull; MILANO &bull; GENÈVE &bull; REFRACTION SPECULARIS 1.54 IOR', 80, height - 80);
      bgCtx.restore();

      // ==========================================
      // 2. APPLY FLUTED GLASS CYLINDRICAL REFRACTION
      // ==========================================
      // We slice the offscreen canvas along optical flute ribs
      const rWidth = ribWidth * 2; // scale for 2x canvas

      if (orientation === 'VERTICAL_REEDED' || orientation === 'CROSS_HATCH') {
        for (let x = 0; x < width; x += rWidth) {
          const sliceW = Math.min(rWidth, width - x);
          // Cylindrical bulge: center of flute magnifies, edges compress
          const disp = Math.sin(time * 0.5 + x * 0.05) * (rWidth * 0.22);

          // Refracted source strip
          ctx.drawImage(
            bgCanvas,
            x + disp,
            0,
            sliceW,
            height,
            x,
            0,
            sliceW,
            height
          );

          // Specular ridge highlight along the edge of each flute
          const grad = ctx.createLinearGradient(x, 0, x + sliceW, 0);
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * causticIntensity})`);
          grad.addColorStop(0.2, `rgba(212, 175, 55, ${0.2 * causticIntensity})`);
          grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
          grad.addColorStop(0.85, 'rgba(0, 0, 0, 0)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${0.2 * causticIntensity})`);
          ctx.fillStyle = grad;
          ctx.fillRect(x, 0, sliceW, height);
        }
      } else {
        // HORIZONTAL LOUVERS
        for (let y = 0; y < height; y += rWidth) {
          const sliceH = Math.min(rWidth, height - y);
          const disp = Math.cos(time * 0.5 + y * 0.05) * (rWidth * 0.22);

          ctx.drawImage(
            bgCanvas,
            0,
            y + disp,
            width,
            sliceH,
            0,
            y,
            width,
            sliceH
          );

          const grad = ctx.createLinearGradient(0, y, 0, y + sliceH);
          grad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * causticIntensity})`);
          grad.addColorStop(0.2, `rgba(212, 175, 55, ${0.2 * causticIntensity})`);
          grad.addColorStop(0.5, 'rgba(0, 0, 0, 0.15)');
          grad.addColorStop(1, `rgba(255, 255, 255, ${0.2 * causticIntensity})`);
          ctx.fillStyle = grad;
          ctx.fillRect(0, y, width, sliceH);
        }
      }

      // Luxury Glass Atmosphere Tint
      if (glassTint === 'VERMEIL_GOLD') {
        ctx.fillStyle = 'rgba(212, 175, 55, 0.08)';
      } else if (glassTint === 'SMOKED_OBSIDIAN') {
        ctx.fillStyle = 'rgba(10, 12, 18, 0.25)';
      } else if (glassTint === 'ROSE_CHAMPAGNE') {
        ctx.fillStyle = 'rgba(244, 114, 182, 0.08)';
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
      }
      ctx.fillRect(0, 0, width, height);

      // ==========================================
      // 3. VISCOUS LIQUID MERCURY DROPLETS METABALLS
      // ==========================================
      if (mercuryActive) {
        const drops = dropsRef.current;
        const px = pointerRef.current.x;
        const py = pointerRef.current.y;

        drops.forEach((d, idx) => {
          // Attract towards pointer if mouse down, or drift gently
          if (pointerRef.current.isDown) {
            d.vx += (px - d.x) * 0.003;
            d.vy += (py - d.y) * 0.003;
          } else {
            d.vx += Math.sin(time + idx) * 0.05;
            d.vy += Math.cos(time + idx * 2) * 0.05;
          }

          d.vx *= 0.94;
          d.vy *= 0.94;
          d.x += d.vx;
          d.y += d.vy;

          // Wall boundaries
          if (d.x < 80) { d.x = 80; d.vx *= -1; }
          if (d.x > width - 80) { d.x = width - 80; d.vx *= -1; }
          if (d.y < 80) { d.y = 80; d.vy *= -1; }
          if (d.y > height - 80) { d.y = height - 80; d.vy *= -1; }

          // Draw Chrome Liquid Mercury Puddle
          const r = d.radius * 2;
          ctx.save();

          // Drop shadow
          const dropShadow = ctx.createRadialGradient(d.x + 12, d.y + 12, r * 0.4, d.x + 16, d.y + 16, r * 1.3);
          dropShadow.addColorStop(0, 'rgba(0, 0, 0, 0.6)');
          dropShadow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = dropShadow;
          ctx.beginPath();
          ctx.arc(d.x + 12, d.y + 12, r * 1.3, 0, Math.PI * 2);
          ctx.fill();

          // Mercury body (Specular Chrome Gradient)
          const chromeGrad = ctx.createRadialGradient(
            d.x - r * 0.35,
            d.y - r * 0.35,
            r * 0.1,
            d.x,
            d.y,
            r
          );
          chromeGrad.addColorStop(0, '#ffffff');
          chromeGrad.addColorStop(0.3, '#d4d4d8');
          chromeGrad.addColorStop(0.65, '#52525b');
          chromeGrad.addColorStop(0.85, '#27272a');
          chromeGrad.addColorStop(1, '#09090b');

          ctx.fillStyle = chromeGrad;
          ctx.beginPath();
          ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
          ctx.fill();

          // Gold caustics reflection on mercury surface
          ctx.beginPath();
          ctx.arc(d.x - r * 0.2, d.y - r * 0.2, r * 0.5, Math.PI * 1.1, Math.PI * 1.7);
          ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
          ctx.lineWidth = 3;
          ctx.lineCap = 'round';
          ctx.stroke();

          ctx.restore();
        });
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) * 2;
      pointerRef.current.y = (e.clientY - rect.top) * 2;
    };

    const handlePointerDown = (e: MouseEvent) => {
      pointerRef.current.isDown = true;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current.x = (e.clientX - rect.left) * 2;
      pointerRef.current.y = (e.clientY - rect.top) * 2;
      soundFx.playChime(850, 0.2);
    };

    const handlePointerUp = () => {
      pointerRef.current.isDown = false;
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [ribWidth, causticIntensity, orientation, glassTint, mercuryActive]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-300 font-bold tracking-widest uppercase mb-1">
              <Crown className="w-4 h-4 text-amber-300" />
              <span>BATCH 10 // VARIATION 49 &bull; HAUTE COUTURE OPTICS</span>
            </div>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Haute Couture Fluted Ribbed Glass &amp; Liquid Mercury
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setOrientation('VERTICAL_REEDED');
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                orientation === 'VERTICAL_REEDED'
                  ? 'bg-amber-300 text-black border-amber-300 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Vertical Reeded
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                setOrientation('HORIZONTAL_LOUVER');
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                orientation === 'HORIZONTAL_LOUVER'
                  ? 'bg-amber-300 text-black border-amber-300 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Horizontal Louver
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                setGlassTint('VERMEIL_GOLD');
              }}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                glassTint === 'VERMEIL_GOLD'
                  ? 'bg-yellow-500 text-black border-yellow-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Vermeil Gold
            </button>

            <button
              onClick={() => {
                soundFx.playClick(850);
                setGlassTint('SMOKED_OBSIDIAN');
              }}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                glassTint === 'SMOKED_OBSIDIAN'
                  ? 'bg-zinc-800 text-white border-zinc-600 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Smoked Obsidian
            </button>

            <button
              onClick={() => {
                soundFx.playTick(900);
                setMercuryActive(!mercuryActive);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                mercuryActive
                  ? 'bg-zinc-200 text-black border-white font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              {mercuryActive ? 'MERCURY: ON' : 'MERCURY: OFF'}
            </button>
          </div>
        </div>

        {/* Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 rounded-xl border border-amber-500/20 bg-black overflow-hidden relative shadow-2xl h-[460px] sm:h-[520px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-pointer"
              title="Click & hold to magnetically attract liquid mercury droplets across fluted glass ribs"
              data-cursor="hover"
            />

            {/* In-canvas watermark */}
            <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-3 font-mono text-[11px] text-amber-200/80 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/20">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-300" />
                FLUTE RIB: {ribWidth}PX
              </span>
              <span className="text-zinc-600">|</span>
              <span>CAUSTICS: {Math.round(causticIntensity * 100)}%</span>
              <span className="text-zinc-600">|</span>
              <span>TINT: {glassTint}</span>
            </div>
          </div>

          {/* Controls HUD */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300 uppercase pb-3 border-b border-white/10 mb-4">
                <Sliders className="w-4 h-4 text-amber-300" />
                <span>Architectural Flute Tuning</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Rib Width (Pitch):</span>
                    <strong className="text-amber-300">{ribWidth}px</strong>
                  </div>
                  <input
                    type="range"
                    min="12"
                    max="56"
                    step="2"
                    value={ribWidth}
                    onChange={(e) => {
                      soundFx.playTick(800);
                      setRibWidth(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-300 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>Micro-Reed (12px)</span>
                    <span>Fluted (24px)</span>
                    <span>Wide (56px)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Caustic Specular Glow:</span>
                    <strong className="text-yellow-400">{Math.round(causticIntensity * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={causticIntensity}
                    onChange={(e) => {
                      soundFx.playTick(850);
                      setCausticIntensity(parseFloat(e.target.value));
                    }}
                    className="w-full accent-yellow-400 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">Cylindrical ridge specular gleam</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <Move className="w-3.5 h-3.5" />
                <span>Fluid Surface Physics:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Click &amp; hold on the glass to draw mercury droplets toward your cursor; notice how cylindrical refraction distorts the Roman atelier typography.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlueprintHUD>
);
}
