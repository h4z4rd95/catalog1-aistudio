import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Eye, Sliders, Sparkles, RefreshCw, Zap, Compass, Move } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'shader_v01_chromaticglassprism',
  name: 'Chromatic Refractive Glass Prism & Dispersion Lens',
  category: 'Shader',
  batch: 'Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX',
  techStack: ['React 19', 'Canvas 2D Dual-Pass Optics', 'Snell\'s Law Refraction Math', 'Chromatic Aberration Split', 'Spring Inertia Physics'],
  aestheticVibe: 'Chromatic Prism Refraction / Optical Caustics',
  interactionBlueprint: 'Interactive optical lens calculating real-time dual-surface refractive displacement based on Snell\'s law. Separates R, G, B light wavelengths proportionally to material dispersion index, creating realistic chromatic aberration fringes as the lens traverses animated typography and vector grids.',
  description: 'Physically inspired optical shader lens rendering real-time refractive distortion, spectral dispersion splitting, specular Fresnel rim highlights, and ambient caustic shadows over high-contrast graphic layouts.',
  codeSnippet: `// Snell's law refraction displacement with chromatic dispersion
const iorR = ior - dispersion * 0.04;
const iorB = ior + dispersion * 0.04;
const refractVecR = computeRefraction(normal, iorR);
const refractVecB = computeRefraction(normal, iorB);
ctx.drawImage(offscreenR, x + refractVecR.x, y + refractVecR.y);
ctx.drawImage(offscreenB, x + refractVecB.x, y + refractVecB.y);`,
  tags: ['Shader', 'Refraction', 'Optics', 'Chromatic', 'Dispersion', 'Glass', 'Physics'],
};

export default function ShaderChromaticGlassPrism() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Optical Material Parameters
  const [ior, setIor] = useState<number>(1.52); // Index of refraction (1.1 to 2.4)
  const [dispersion, setDispersion] = useState<number>(14); // 0 to 30px
  const [lensRadius, setLensRadius] = useState<number>(130); // 70 to 220px
  const [magnification, setMagnification] = useState<number>(1.4); // 0.6 to 2.2
  const [autoOrbit, setAutoOrbit] = useState<boolean>(true);
  const [materialPreset, setMaterialPreset] = useState<'CROWN_GLASS' | 'FLINT_PRISM' | 'DIAMOND' | 'WATER'>('CROWN_GLASS');

  // Lens tracking state
  const lensPosRef = useRef<{ x: number; y: number; targetX: number; targetY: number; isDragging: boolean }>({
    x: 400,
    y: 250,
    targetX: 400,
    targetY: 250,
    isDragging: false,
  });

  const applyPreset = (preset: 'CROWN_GLASS' | 'FLINT_PRISM' | 'DIAMOND' | 'WATER') => {
    soundFx.playChime(750, 0.15);
    setMaterialPreset(preset);
    switch (preset) {
      case 'WATER':
        setIor(1.33);
        setDispersion(6);
        setMagnification(1.15);
        break;
      case 'CROWN_GLASS':
        setIor(1.52);
        setDispersion(12);
        setMagnification(1.4);
        break;
      case 'FLINT_PRISM':
        setIor(1.66);
        setDispersion(22);
        setMagnification(1.65);
        break;
      case 'DIAMOND':
        setIor(2.42);
        setDispersion(28);
        setMagnification(1.95);
        break;
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create offscreen canvas for rendering background graphics
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d');
    if (!bgCtx) return;

    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.025;

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      bgCanvas.width = width;
      bgCanvas.height = height;

      // Handle auto-orbit if not dragging
      if (autoOrbit && !lensPosRef.current.isDragging) {
        const cx = width / 2;
        const cy = height / 2;
        const orbitRadiusX = width * 0.28;
        const orbitRadiusY = height * 0.22;
        lensPosRef.current.targetX = cx + Math.cos(time * 0.7) * orbitRadiusX;
        lensPosRef.current.targetY = cy + Math.sin(time * 0.9) * orbitRadiusY;
      }

      // Smooth spring inertia toward target
      lensPosRef.current.x += (lensPosRef.current.targetX - lensPosRef.current.x) * 0.12;
      lensPosRef.current.y += (lensPosRef.current.targetY - lensPosRef.current.y) * 0.12;

      const lx = lensPosRef.current.x;
      const ly = lensPosRef.current.y;
      const lr = lensRadius * 2; // scaled for 2x canvas

      // ==========================================
      // 1. RENDER BASE GRAPHIC CONTENT ON OFFSCREEN
      // ==========================================
      bgCtx.fillStyle = '#05070c';
      bgCtx.fillRect(0, 0, width, height);

      // Fine precision coordinate grid
      bgCtx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      bgCtx.lineWidth = 1;
      const step = 60;
      for (let x = 0; x < width; x += step) {
        bgCtx.beginPath();
        bgCtx.moveTo(x, 0);
        bgCtx.lineTo(x, height);
        bgCtx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        bgCtx.beginPath();
        bgCtx.moveTo(0, y);
        bgCtx.lineTo(width, y);
        bgCtx.stroke();
      }

      // Dynamic animated concentric moiré circles
      bgCtx.save();
      bgCtx.translate(width * 0.35, height * 0.45);
      for (let r = 20; r < 380; r += 16) {
        const pulse = Math.sin(time * 2 + r * 0.03) * 3;
        bgCtx.beginPath();
        bgCtx.arc(0, 0, r + pulse, 0, Math.PI * 2);
        bgCtx.strokeStyle = `hsla(${(r * 1.5 + time * 40) % 360}, 85%, 60%, 0.3)`;
        bgCtx.lineWidth = 1.5;
        bgCtx.stroke();
      }
      bgCtx.restore();

      // Second rotating geometric star
      bgCtx.save();
      bgCtx.translate(width * 0.72, height * 0.6);
      bgCtx.rotate(-time * 0.4);
      for (let i = 0; i < 12; i++) {
        bgCtx.rotate((Math.PI * 2) / 12);
        bgCtx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
        bgCtx.lineWidth = 1.5;
        bgCtx.strokeRect(-120, -120, 240, 240);
      }
      bgCtx.restore();

      // High-contrast typography layer
      bgCtx.save();
      bgCtx.font = 'bold 84px Syne, sans-serif';
      bgCtx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      bgCtx.textAlign = 'center';
      bgCtx.fillText('REFRACTIVE OPTICS', width / 2, height * 0.4);

      bgCtx.font = '700 28px Space Grotesk, monospace';
      bgCtx.fillStyle = 'rgba(255, 0, 90, 0.85)';
      bgCtx.fillText(`SNELL\'S LAW // n₁ sin(θ₁) = n₂ sin(θ₂) &bull; IOR: ${ior.toFixed(2)}`, width / 2, height * 0.48);

      bgCtx.font = '600 20px JetBrains Mono, monospace';
      bgCtx.fillStyle = 'rgba(0, 255, 200, 0.75)';
      bgCtx.fillText(`DISPERSION CONSTANT: Δλ = ${dispersion}nm &bull; FRESNEL CAUSTICS`, width / 2, height * 0.54);

      // Chromatic bar swatches
      const swatches = ['#ff0055', '#ff9900', '#00f0ff', '#a855f7', '#10b981'];
      swatches.forEach((color, idx) => {
        bgCtx.fillStyle = color;
        bgCtx.fillRect(width * 0.2 + idx * (width * 0.12), height * 0.75, width * 0.09, 14);
      });
      bgCtx.restore();

      // ==========================================
      // 2. DRAW UNREFRACTED BACKGROUND TO MAIN CTX
      // ==========================================
      ctx.drawImage(bgCanvas, 0, 0);

      // ==========================================
      // 3. RENDER LENS CAUSTIC SHADOW UNDERNEATH
      // ==========================================
      const shadowGrad = ctx.createRadialGradient(
        lx + 25,
        ly + 25,
        lr * 0.5,
        lx + 35,
        ly + 35,
        lr * 1.2
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
      shadowGrad.addColorStop(0.7, 'rgba(0, 0, 0, 0.3)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.arc(lx + 25, ly + 25, lr * 1.2, 0, Math.PI * 2);
      ctx.fill();

      // ==========================================
      // 4. RENDER REFRACTED INTERIOR WITH CHROMATIC ABERRATION
      // ==========================================
      ctx.save();
      // Clip rendering exclusively to the lens disc
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.clip();

      // Optical magnification scale & displacement
      const mag = magnification;
      const dDisp = dispersion * 1.8;

      // Draw Red channel (shifted left/top)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(lx, ly);
      ctx.scale(mag, mag);
      ctx.translate(-lx - dDisp * (ior - 1), -ly - dDisp * (ior - 1) * 0.5);
      ctx.drawImage(bgCanvas, 0, 0);
      // Red color filter tint
      ctx.fillStyle = 'rgba(255, 30, 70, 0.35)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Draw Green channel (base position)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(lx, ly);
      ctx.scale(mag, mag);
      ctx.translate(-lx, -ly);
      ctx.drawImage(bgCanvas, 0, 0);
      // Green color filter tint
      ctx.fillStyle = 'rgba(30, 255, 160, 0.35)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Draw Blue channel (shifted right/bottom)
      ctx.save();
      ctx.globalCompositeOperation = 'screen';
      ctx.translate(lx, ly);
      ctx.scale(mag, mag);
      ctx.translate(-lx + dDisp * (ior - 1), -ly + dDisp * (ior - 1) * 0.5);
      ctx.drawImage(bgCanvas, 0, 0);
      // Blue color filter tint
      ctx.fillStyle = 'rgba(0, 180, 255, 0.35)';
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      // Curvature Spherical Shading over lens interior
      const lensShading = ctx.createRadialGradient(
        lx - lr * 0.35,
        ly - lr * 0.35,
        lr * 0.1,
        lx,
        ly,
        lr
      );
      lensShading.addColorStop(0, 'rgba(255, 255, 255, 0.28)');
      lensShading.addColorStop(0.5, 'rgba(255, 255, 255, 0.05)');
      lensShading.addColorStop(0.85, 'rgba(0, 0, 0, 0.15)');
      lensShading.addColorStop(1, 'rgba(0, 0, 0, 0.55)');
      ctx.fillStyle = lensShading;
      ctx.fillRect(lx - lr, ly - lr, lr * 2, lr * 2);

      ctx.restore(); // Restore clip

      // ==========================================
      // 5. LENS GLASS RIM, FRESNEL SPECULAR HIGHLIGHT
      // ==========================================
      // Outer glass edge ring
      ctx.beginPath();
      ctx.arc(lx, ly, lr, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3.5;
      ctx.stroke();

      // Inner refraction highlight ring
      ctx.beginPath();
      ctx.arc(lx, ly, lr - 3, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Specular crescent gleam (top-left reflection)
      ctx.beginPath();
      ctx.arc(lx - lr * 0.15, ly - lr * 0.15, lr * 0.75, Math.PI * 1.1, Math.PI * 1.6);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
      ctx.lineWidth = 4.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Secondary subtle rim reflection (bottom-right)
      ctx.beginPath();
      ctx.arc(lx + lr * 0.1, ly + lr * 0.1, lr * 0.85, Math.PI * 0.2, Math.PI * 0.55);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pointer handlers
    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = (e.clientX - rect.left) * 2;
      const clientY = (e.clientY - rect.top) * 2;

      if (lensPosRef.current.isDragging || !autoOrbit) {
        lensPosRef.current.targetX = clientX;
        lensPosRef.current.targetY = clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = (e.clientX - rect.left) * 2;
      const clientY = (e.clientY - rect.top) * 2;
      const dx = clientX - lensPosRef.current.x;
      const dy = clientY - lensPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < lensRadius * 2.2) {
        lensPosRef.current.isDragging = true;
        setAutoOrbit(false);
        soundFx.playTick(1100);
      }
    };

    const handlePointerUp = () => {
      if (lensPosRef.current.isDragging) {
        lensPosRef.current.isDragging = false;
        soundFx.playTick(750);
      }
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
  }, [ior, dispersion, lensRadius, magnification, autoOrbit]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-1">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>BATCH 10 // VARIATION 46 &bull; CHROMATIC OPTICS</span>
            </div>
            <h2 className="font-['Syne'] text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Chromatic Refractive Glass Prism &amp; Dispersion Lens
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(800);
                setAutoOrbit(!autoOrbit);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 border transition-all ${
                autoOrbit
                  ? 'bg-cyan-400 text-black border-cyan-400 font-bold shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoOrbit ? 'animate-spin' : ''}`} />
              <span>{autoOrbit ? 'ORBIT ACTIVE' : 'MANUAL DRAG'}</span>
            </button>

            <button
              onClick={() => applyPreset('CROWN_GLASS')}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                materialPreset === 'CROWN_GLASS'
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Crown Glass
            </button>

            <button
              onClick={() => applyPreset('FLINT_PRISM')}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                materialPreset === 'FLINT_PRISM'
                  ? 'bg-pink-500 text-white border-pink-400 font-bold shadow-[0_0_12px_rgba(236,72,153,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Flint Prism
            </button>

            <button
              onClick={() => applyPreset('DIAMOND')}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                materialPreset === 'DIAMOND'
                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Diamond (IOR 2.42)
            </button>

            <button
              onClick={() => applyPreset('WATER')}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                materialPreset === 'WATER'
                  ? 'bg-blue-400 text-black border-blue-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Water Droplet
            </button>
          </div>
        </div>

        {/* Main Canvas & Optics Control Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Interactive Optics Canvas */}
          <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black/60 overflow-hidden relative shadow-2xl h-[460px] sm:h-[520px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-grab active:cursor-grabbing"
              title="Click and drag to position the refractive optical glass prism"
              data-cursor="drag"
            />

            {/* In-canvas telemetry watermark */}
            <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Compass className="w-3 h-3" />
                IOR: {ior.toFixed(2)}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-pink-400">DISPERSION: {dispersion}px</span>
              <span className="text-zinc-600">|</span>
              <span className="text-amber-400">MAG: {magnification.toFixed(1)}x</span>
            </div>
          </div>

          {/* Precision Controls Panel */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 uppercase pb-3 border-b border-white/10 mb-4">
                <Sliders className="w-4 h-4 text-cyan-400" />
                <span>Optics Calibration</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Refractive Index (IOR):</span>
                    <strong className="text-cyan-400">{ior.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="1.05"
                    max="2.45"
                    step="0.01"
                    value={ior}
                    onChange={(e) => {
                      soundFx.playTick(800);
                      setIor(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>Air (1.00)</span>
                    <span>Crown (1.52)</span>
                    <span>Diamond (2.42)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Chromatic Dispersion:</span>
                    <strong className="text-pink-400">{dispersion}px</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    step="1"
                    value={dispersion}
                    onChange={(e) => {
                      soundFx.playTick(900);
                      setDispersion(parseInt(e.target.value));
                    }}
                    className="w-full accent-pink-500 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">Spectral RGB channel shift magnitude</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Lens Diameter:</span>
                    <strong className="text-amber-400">{lensRadius}px</strong>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="200"
                    step="5"
                    value={lensRadius}
                    onChange={(e) => {
                      soundFx.playTick(850);
                      setLensRadius(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Magnification Curvature:</span>
                    <strong className="text-emerald-400">{magnification.toFixed(1)}x</strong>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="2.2"
                    step="0.05"
                    value={magnification}
                    onChange={(e) => {
                      soundFx.playTick(950);
                      setMagnification(parseFloat(e.target.value));
                    }}
                    className="w-full accent-emerald-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <Move className="w-3.5 h-3.5" />
                <span>Direct Interaction:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Click &amp; drag the glass disc anywhere on the canvas to inspect optical refraction over dynamic geometric moirés.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlueprintHUD>
);
}
