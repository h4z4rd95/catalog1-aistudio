import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Box, Sparkles, RefreshCw, Sliders, Maximize2, Compass, Layers, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v06_persiangeometricmuqarnas',
  name: '3D Parametric Persian Muqarnas Geometry & Stained-Glass Orsi Prism',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: ['React 19', 'Procedural 3D Canvas Projection', 'Parametric Muqarnas Facets', 'Orsi Chromatic Dispersion', 'Kinetic Gimbal Physics'],
  aestheticVibe: 'Persian Parametric Architecture & Chromatic Orsi Geometry',
  interactionBlueprint: 'Interactive 3D mathematical projection of historic Iranian Muqarnas tier vaults and stained-glass Orsi windows. User rotation and orbit dynamic light refraction across 3D geometric facets with chromatic caustics.',
  description: 'مدل‌سازی سه‌بعدی محاسباتی از طاق‌های مقرنس و پنجره‌های ارسی با شکست نور کروماتیک، هندسه پارامتریک اسلیمی، و دوران ۳۶۰ درجه زاویه دید با ماوس.',
  codeSnippet: `// 3D Muqarnas facet projection
const renderFacet = (ctx, tier, angle, radius, height, rotX, rotY) => {
  const x = radius * Math.cos(angle);
  const y = height + tier * 18;
  const z = radius * Math.sin(angle);
  const projected = project3D(x, y, z, rotX, rotY);
  // Fill chromatic stained glass facet
};`,
  tags: ['Spatial', '3D', 'Muqarnas', 'Orsi', 'Persian', 'Parametric', 'Geometry'],
};

export default function SpatialPersianGeometricMuqarnas3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tiersCount, setTiersCount] = useState<number>(5);
  const [symmetrySlices, setSymmetrySlices] = useState<number>(12);
  const [lightMode, setLightMode] = useState<'ORSI_RAINBOW' | 'PERSIAN_TURQUOISE' | 'GOLDEN_DESERT'>('ORSI_RAINBOW');
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);

  const rotRef = useRef({ x: 0.45, y: 0.2 });
  const mouseRef = useRef({ isDown: false, startX: 0, startY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 450);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const project = (x: number, y: number, z: number, rx: number, ry: number) => {
      // Rotation around Y
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = z * cosY + x * sinY;

      // Rotation around X
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const y2 = y * cosX - z1 * sinX;
      const z2 = z1 * cosX + y * sinX;

      const fov = 380;
      const distance = 420;
      const scale = fov / (distance + z2);

      return {
        px: width / 2 + x1 * scale,
        py: height / 2 + y2 * scale,
        scale,
        depth: z2,
      };
    };

    const render = () => {
      time += 0.015;
      if (isAutoSpin && !mouseRef.current.isDown) {
        rotRef.current.y += 0.008;
      }

      ctx.clearRect(0, 0, width, height);

      // Dark spiritual Iranian obsidian background
      const grad = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width * 0.7);
      grad.addColorStop(0, '#0c1322');
      grad.addColorStop(1, '#05070c');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      const rx = rotRef.current.x;
      const ry = rotRef.current.y;

      // Generate 3D Muqarnas tiers
      const facets: {
        points: { px: number; py: number }[];
        depth: number;
        color: string;
        tier: number;
      }[] = [];

      for (let t = 0; t < tiersCount; t++) {
        const radiusInner = 30 + t * 24;
        const radiusOuter = radiusInner + 26;
        const heightInner = -t * 22;
        const heightOuter = heightInner + 20;

        for (let s = 0; s < symmetrySlices; s++) {
          const angle1 = (s / symmetrySlices) * Math.PI * 2;
          const angle2 = ((s + 1) / symmetrySlices) * Math.PI * 2;
          const angleMid = (angle1 + angle2) / 2;

          // Apex tip facet point (characteristic Muqarnas niche fold)
          const p1 = project(radiusInner * Math.cos(angle1), heightInner, radiusInner * Math.sin(angle1), rx, ry);
          const p2 = project(radiusInner * Math.cos(angle2), heightInner, radiusInner * Math.sin(angle2), rx, ry);
          const p3 = project(
            radiusOuter * Math.cos(angleMid) * 1.08,
            heightOuter,
            radiusOuter * Math.sin(angleMid) * 1.08,
            rx,
            ry
          );
          const p4 = project(
            radiusInner * 0.7 * Math.cos(angleMid),
            heightInner - 12,
            radiusInner * 0.7 * Math.sin(angleMid),
            rx,
            ry
          );

          const avgDepth = (p1.depth + p2.depth + p3.depth) / 3;

          // Color calculation based on Orsi stained glass scheme
          let baseColor = '';
          const hueOffset = (s * 360) / symmetrySlices + t * 40;
          if (lightMode === 'ORSI_RAINBOW') {
            baseColor = `hsla(${hueOffset % 360}, 85%, 60%, 0.45)`;
          } else if (lightMode === 'PERSIAN_TURQUOISE') {
            baseColor = `hsla(${170 + (t * 15) % 40}, 90%, ${45 + (s % 3) * 15}%, 0.5)`;
          } else {
            baseColor = `hsla(${35 + (t * 10) % 25}, 95%, ${40 + (s % 4) * 12}%, 0.55)`;
          }

          facets.push({
            points: [p1, p2, p3],
            depth: avgDepth,
            color: baseColor,
            tier: t,
          });

          facets.push({
            points: [p1, p4, p2],
            depth: avgDepth - 5,
            color: baseColor,
            tier: t,
          });
        }
      }

      // Sort by depth for painter's algorithm
      facets.sort((a, b) => b.depth - a.depth);

      // Draw all facets
      for (const facet of facets) {
        ctx.beginPath();
        ctx.moveTo(facet.points[0].px, facet.points[0].py);
        for (let i = 1; i < facet.points.length; i++) {
          ctx.lineTo(facet.points[i].px, facet.points[i].py);
        }
        ctx.closePath();

        if (!wireframeOnly) {
          ctx.fillStyle = facet.color;
          ctx.fill();
        }

        ctx.strokeStyle =
          lightMode === 'PERSIAN_TURQUOISE'
            ? 'rgba(45, 212, 191, 0.4)'
            : lightMode === 'ORSI_RAINBOW'
            ? 'rgba(255, 255, 255, 0.35)'
            : 'rgba(251, 191, 36, 0.45)';
        ctx.lineWidth = wireframeOnly ? 1.5 : 0.8;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [tiersCount, symmetrySlices, lightMode, isAutoSpin, wireframeOnly]);

  return (
    <div className="space-y-6">
      <BlueprintHUD blueprint={blueprint} />

      <div className="p-6 sm:p-8 rounded-3xl border border-teal-500/30 bg-gradient-to-b from-[#09101c] to-[#04070e] shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <h3 className="font-['Syne'] font-black text-xl text-white">
                هندسه سه‌بعدی مقرنس و ارسی‌های شیشه‌ای پارامتریک
              </h3>
            </div>
            <span className="font-mono text-xs text-teal-400 block mt-0.5">
              3D IRANIAN MUQARNAS VAULT &amp; ORSI PRISM CAUSTICS
            </span>
          </div>

          {/* Light Theme Selectors */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
            {[
              { id: 'ORSI_RAINBOW', label: 'ارسی هفت‌رنگ', color: 'bg-gradient-to-r from-rose-500 via-amber-400 to-teal-400' },
              { id: 'PERSIAN_TURQUOISE', label: 'فیروزه و لاجورد', color: 'bg-teal-400' },
              { id: 'GOLDEN_DESERT', label: 'کهربا و زرین کویر', color: 'bg-amber-400' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  soundFx.playTick(850);
                  setLightMode(theme.id as any);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  lightMode === theme.id ? 'bg-white/15 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${theme.color}`} />
                <span>{theme.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Canvas Stage with Mouse Drag Rotation */}
        <div
          onMouseDown={(e) => {
            mouseRef.current.isDown = true;
            mouseRef.current.startX = e.clientX;
            mouseRef.current.startY = e.clientY;
          }}
          onMouseMove={(e) => {
            if (!mouseRef.current.isDown) return;
            const deltaX = e.clientX - mouseRef.current.startX;
            const deltaY = e.clientY - mouseRef.current.startY;
            rotRef.current.y += deltaX * 0.008;
            rotRef.current.x += deltaY * 0.008;
            mouseRef.current.startX = e.clientX;
            mouseRef.current.startY = e.clientY;
          }}
          onMouseUp={() => {
            mouseRef.current.isDown = false;
          }}
          onMouseLeave={() => {
            mouseRef.current.isDown = false;
          }}
          className="relative min-h-[420px] my-6 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

          {/* Interactive Floating Hint */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-zinc-300 pointer-events-none flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-teal-400" />
            <span>چرخش آزاد ۳۶۰ درجه با درگ ماوس</span>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsAutoSpin(!isAutoSpin);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                isAutoSpin ? 'bg-teal-400 text-black shadow-lg shadow-teal-500/30' : 'bg-black/70 text-zinc-300 border border-white/10'
              }`}
            >
              {isAutoSpin ? 'توقف چرخش خودکار' : 'فعال‌سازی چرخش'}
            </button>
            <button
              onClick={() => {
                soundFx.playClick(600);
                setWireframeOnly(!wireframeOnly);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                wireframeOnly ? 'bg-white text-black' : 'bg-black/70 text-zinc-300 border border-white/10'
              }`}
            >
              {wireframeOnly ? 'حالت شیدینگ رنگی' : 'حالت وایرفریم هندسی'}
            </button>
          </div>
        </div>

        {/* Parametric Tiers & Symmetry Sliders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-black/50 border border-white/10 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono">
              <span className="text-zinc-400">تعداد طبقات طاق مقرنس (Vault Tiers):</span>
              <span className="text-teal-400 font-bold">{tiersCount} طبقه</span>
            </div>
            <input
              type="range"
              min="3"
              max="8"
              step="1"
              value={tiersCount}
              onChange={(e) => setTiersCount(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono">
              <span className="text-zinc-400">تقارن دورانی و پره‌های ارسی (Symmetry):</span>
              <span className="text-teal-400 font-bold">{symmetrySlices} پره دورانی</span>
            </div>
            <input
              type="range"
              min="8"
              max="24"
              step="2"
              value={symmetrySlices}
              onChange={(e) => setSymmetrySlices(Number(e.target.value))}
              className="w-full accent-teal-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
