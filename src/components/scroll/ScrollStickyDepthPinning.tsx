import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Box, Layers, Eye, Compass, RotateCcw, ChevronDown } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Scroll_V03_StickyDepthPinning',
  name: 'Sticky Viewport Pinning & 3D Z-Axis Flythrough Scrub',
  category: 'Scroll',
  batch: 'Batch 4: Scroll Choreography & Infinite Canvas Pinning',
  techStack: ['Next.js / React', 'Sticky Viewport Pinning', '3D Z-Axis Depth Scrub', 'Scale & Opacity Thresholds'],
  aestheticVibe: 'Immersive WebGL-First & 3D Spatial Architecture',
  interactionBlueprint: 'Scrolling scrub locks the viewport in place and advances the 3D camera along the Z-axis; architectural dimensional frames scale up from the distance (scale 0.35 to 3.0), passing the camera lens to reveal the deeper chapter.',
  description: 'A spatial 3D sticky pinning journey through stacked architectural portal frames with non-linear scale interpolation, depth blurring, and technical coordinate HUD telemetry.',
  tags: ['Sticky Pinning', '3D Z-Axis Flythrough', 'Depth Scrub', 'Spatial UI', 'Awwwards'],
  codeSnippet: `// 3D Z-Axis scale and opacity calculation per layer
const calculatePlaneTransform = (planeIndex: number, scrubProgress: number) => {
  const planeOffset = scrubProgress * totalPlanes - planeIndex;
  // Normalized distance from camera
  const scale = Math.max(0.2, 1.0 + planeOffset * 1.8);
  const opacity = planeOffset < -0.5 ? 0 : planeOffset > 0.8 ? Math.max(0, 1 - (planeOffset - 0.8) * 4) : 1;
  const blur = Math.max(0, Math.abs(planeOffset) * 12);
  return { scale, opacity, blur, translateZ: planeOffset * 600 };
};`,
};

const chapters = [
  {
    id: '01',
    phase: 'GENESIS // 01',
    title: 'THE DISCRETE MANIFOLD',
    subtitle: 'Parametric Mathematical Space',
    desc: 'The journey begins in the topological foundation. Point clouds and spatial coordinate vectors define the multidimensional mesh envelope.',
    accent: '#38bdf8',
    colorClass: 'from-sky-500/20 via-blue-500/10 to-transparent',
    borderColor: 'border-sky-400/40',
    stat: 'VERTICES: 131,072',
  },
  {
    id: '02',
    phase: 'KINETICS // 02',
    title: 'THE ADVECTION MATRIX',
    subtitle: 'Navier-Stokes Fluid Field',
    desc: 'Viscous fluid equations propagate dynamic vortex velocity across the coordinate grid, inducing procedural turbulence and chromatic shear.',
    accent: '#c084fc',
    colorClass: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    borderColor: 'border-purple-400/40',
    stat: 'REYNOLDS NUM: 4.8e4',
  },
  {
    id: '03',
    phase: 'REFRACTION // 03',
    title: 'THE OPTICAL CAUSTIC',
    subtitle: 'Spectral Dispersion Shader',
    desc: 'Photons penetrate the liquid boundary layer, splitting into tri-chromatic fringe wavelengths (RGB aberration) and glowing caustics.',
    accent: '#ec4899',
    colorClass: 'from-pink-500/20 via-rose-500/10 to-transparent',
    borderColor: 'border-pink-400/40',
    stat: 'IOR INDEX: 1.333',
  },
  {
    id: '04',
    phase: 'SYNTHESIS // 04',
    title: 'THE COGNITIVE COCKPIT',
    subtitle: 'Autonomous Spatial Interface',
    desc: 'Dimensional planes coalesce into a unified holographic viewport with 60 FPS gesture telemetry and interactive cyber HUD matrices.',
    accent: '#10b981',
    colorClass: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    borderColor: 'border-emerald-400/40',
    stat: 'LATENCY: 0.84ms',
  },
];

export default function ScrollStickyDepthPinning() {
  const [scrubProgress, setScrubProgress] = useState(0);
  const targetScrub = useRef(0);
  const currentScrub = useRef(0);

  // Tunable parameters
  const [focalDepth, setFocalDepth] = useState(1.4);
  const [perspectiveStrength, setPerspectiveStrength] = useState(1200);

  // Mouse wheel scroll within component
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetScrub.current = Math.max(0, Math.min(1, targetScrub.current + e.deltaY * 0.0006));
  };

  // Drag interaction
  const isDragging = useRef(false);
  const startDragY = useRef(0);
  const startScrubVal = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startDragY.current = e.clientY;
    startScrubVal.current = targetScrub.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientY - startDragY.current) * 0.0015;
    targetScrub.current = Math.max(0, Math.min(1, startScrubVal.current - delta));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Smooth lerp loop
  useEffect(() => {
    let animId: number;
    const loop = () => {
      currentScrub.current += (targetScrub.current - currentScrub.current) * 0.12;
      setScrubProgress(currentScrub.current);
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const jumpToChapter = (idx: number) => {
    soundFx.playClick(600 + idx * 100, 0.03);
    targetScrub.current = idx / (chapters.length - 1);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Focal Depth Scale ({focalDepth.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.1"
              value={focalDepth}
              onChange={(e) => setFocalDepth(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Perspective Distance ({perspectiveStrength}px)
            </label>
            <input
              type="range"
              min="600"
              max="2000"
              step="100"
              value={perspectiveStrength}
              onChange={(e) => setPerspectiveStrength(parseInt(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div className="flex items-end gap-1.5">
            {chapters.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => jumpToChapter(idx)}
                className={`flex-1 py-1.5 rounded font-mono text-[10px] font-bold border transition-colors ${
                  Math.abs(scrubProgress - idx / (chapters.length - 1)) < 0.18
                    ? 'bg-sky-400 text-black border-sky-400'
                    : 'bg-zinc-800 text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                P{idx + 1}
              </button>
            ))}
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
        style={{ perspective: `${perspectiveStrength}px` }}
        className="relative w-full h-[90vh] bg-[#05070d] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10 cursor-ns-resize"
      >
        {/* Spatial 3D Tunnel Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(56,189,248,0.03)_100%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none" />

        {/* Top Header Telemetry */}
        <div className="relative z-30 w-full max-w-6xl mx-auto px-8 pt-8 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-300">
              DEPTH_PINNING_Z_AXIS // V03
            </span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-zinc-400 bg-black/60 px-4 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>CAMERA Z-DEPTH:</span>
            <span className="text-sky-400 font-bold">
              {(scrubProgress * 3000).toFixed(0)}mm
            </span>
            <span className="text-zinc-600">|</span>
            <span className="text-white font-bold">{Math.round(scrubProgress * 100)}%</span>
          </div>
        </div>

        {/* Center 3D Pinned Stage */}
        <div className="relative z-20 w-full max-w-4xl mx-auto my-auto flex items-center justify-center pointer-events-none">
          {chapters.map((ch, idx) => {
            // Distance from current scrub point
            const total = chapters.length - 1;
            const planeOffset = (scrubProgress * total) - idx;
            
            // Progressive scale calculation
            const scale = Math.max(0.1, 1.0 + planeOffset * 1.6 * focalDepth);
            
            // Opacity curve: visible when planeOffset between -0.6 and +0.6
            let opacity = 1;
            if (planeOffset < -0.4) {
              opacity = Math.max(0, 1 - Math.abs(planeOffset + 0.4) * 3);
            } else if (planeOffset > 0.4) {
              opacity = Math.max(0, 1 - (planeOffset - 0.4) * 2.5);
            }

            // Flyby blur
            const blur = Math.max(0, Math.abs(planeOffset) * 8);

            return (
              <div
                key={ch.id}
                style={{
                  transform: `translate3d(0, 0, ${planeOffset * 450}px) scale(${scale})`,
                  opacity,
                  filter: `blur(${blur}px)`,
                  transition: isDragging.current ? 'none' : 'opacity 0.05s linear',
                }}
                className={`absolute w-[320px] sm:w-[580px] p-8 sm:p-12 rounded-3xl bg-black/85 border ${ch.borderColor} shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl text-center`}
              >
                {/* Top Chapter Tag */}
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-4 border-b border-white/10 pb-3">
                  <span className="text-sky-400 font-bold">{ch.phase}</span>
                  <span>{ch.stat}</span>
                </div>

                {/* Main Heading */}
                <h3 className="font-['Syne'] text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                  {ch.title}
                </h3>

                <span className="font-mono text-xs text-zinc-400 tracking-widest uppercase block mt-2">
                  {ch.subtitle}
                </span>

                <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                  {ch.desc}
                </p>

                {/* Bottom Graphic HUD Indicator */}
                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-zinc-500">
                  <span>SCALE_X: {scale.toFixed(2)}x</span>
                  <span className="text-sky-400 font-bold">ACTIVE Z-THRESHOLD</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Scrub Controls & Navigation Waypoints */}
        <div className="relative z-30 w-full max-w-6xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-80">
            <span className="font-mono text-[10px] text-zinc-500 whitespace-nowrap">
              Z-SCRUB RAIL
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrubProgress}
              onChange={(e) => {
                targetScrub.current = parseFloat(e.target.value);
              }}
              className="w-full accent-sky-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            {chapters.map((ch, idx) => {
              const active = Math.abs(scrubProgress - idx / (chapters.length - 1)) < 0.18;
              return (
                <button
                  key={ch.id}
                  onClick={() => jumpToChapter(idx)}
                  className={`px-3 py-1 rounded-full font-mono text-xs transition-all border flex items-center gap-1.5 ${
                    active
                      ? 'bg-sky-400 text-black font-bold border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                      : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  <span>{ch.id}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
