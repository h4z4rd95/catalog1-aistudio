import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  Palette, 
  Compass, 
  Music, 
  FolderGit2, 
  Layers, 
  Flame,
  Check
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Nav_V02_DockGlassmorphicPhysics',
  name: 'Chromatic Glassmorphic Dock with Gaussian Physics',
  category: 'Navigation',
  batch: 'Batch 2: Navigation Systems & Mega-Menus',
  techStack: ['Next.js / React', 'Gaussian Spring Math', 'Chromatic Glassmorphism', 'Distance Field Interpolation'],
  aestheticVibe: 'Chromatic Liquid Gradient / Floating Physics Dock',
  interactionBlueprint: 'Cursor proximity calculates a continuous Gaussian bell curve dynamically scaling adjacent icon nodes; active indicator springs into position with fluid damping.',
  description: 'A floating physical dock utilizing Gaussian probability density distributions to scale icon geometries smoothly on pointer travel, wrapped in multi-layered chromatic glassmorphic materials.',
  tags: ['macOS Dock', 'Gaussian Math', 'Spring Physics', 'Glassmorphism', 'Micro-Interactions'],
  codeSnippet: `// Continuous Gaussian Proximity Scale Equation
const calculateGaussianScale = (iconCenterX: number, mouseX: number, sigma: number, maxScale: number) => {
  const dist = Math.abs(mouseX - iconCenterX);
  // Gaussian bell curve distribution
  const factor = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(sigma, 2)));
  return 1 + (maxScale - 1) * factor;
};`,
};

const dockItems = [
  { id: 'shader', label: 'Shader Studio', icon: Sparkles, color: 'text-amber-400', badge: 'GLSL' },
  { id: 'terminal', label: 'Kernel Terminal', icon: Terminal, color: 'text-cyan-400', badge: 'LIVE' },
  { id: 'compute', label: 'Vector Compute', icon: Cpu, color: 'text-emerald-400', badge: 'GPU' },
  { id: 'palette', label: 'Chromatic Engine', icon: Palette, color: 'text-pink-400', badge: 'RGB' },
  { id: 'compass', label: 'Orbit Matrix', icon: Compass, color: 'text-sky-400', badge: '3D' },
  { id: 'audio', label: 'Acoustic Synth', icon: Music, color: 'text-purple-400', badge: 'FX' },
  { id: 'projects', label: 'Showroom Index', icon: FolderGit2, color: 'text-amber-300', badge: 'GIT' },
  { id: 'vibe', label: 'Vibe Matrix', icon: Flame, color: 'text-rose-400', badge: 'AWW' },
];

export default function NavDockGlassmorphicPhysics() {
  const dockRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>('shader');
  const [activeDetails, setActiveDetails] = useState<string>('Shader Studio: Real-time procedural simplex noise & chromatic distortion.');

  // Live tunable HUD parameters
  const [sigma, setSigma] = useState<number>(75);
  const [maxScale, setMaxScale] = useState<number>(1.65);
  const [glassBlur, setGlassBlur] = useState<number>(20);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return;
    const rect = dockRef.current.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const handleMouseLeave = () => {
    setMouseX(null);
  };

  const selectTab = (id: string, label: string) => {
    soundFx.playClick(750, 0.03);
    setActiveTab(id);
    setActiveDetails(`${label} activated: Responsive layout & physics pipeline synchronized.`);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Gaussian Radius Sigma ({sigma}px)
            </label>
            <input
              type="range"
              min="40"
              max="140"
              step="5"
              value={sigma}
              onChange={(e) => setSigma(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Peak Magnification ({maxScale.toFixed(2)}x)
            </label>
            <input
              type="range"
              min="1.2"
              max="2.2"
              step="0.05"
              value={maxScale}
              onChange={(e) => setMaxScale(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Glassmorphism Backdrop ({glassBlur}px Blur)
            </label>
            <input
              type="range"
              min="5"
              max="40"
              step="5"
              value={glassBlur}
              onChange={(e) => setGlassBlur(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#05070d] text-white flex flex-col justify-between items-center p-6 select-none overflow-hidden">
        {/* Ambient Gradient Refraction Spheres behind Dock */}
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Active Workspace Visualizer */}
        <div className="relative z-10 w-full max-w-4xl mx-auto my-auto p-8 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl text-center shadow-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-wider mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Active Module: {activeTab.toUpperCase()}</span>
          </div>

          <h3 className="font-['Syne'] text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Fluid Desktop Dock Navigation
          </h3>

          <p className="mt-4 font-mono text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
            {activeDetails}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-zinc-400">
            <span className="px-3 py-1 rounded bg-black/50 border border-white/5">
              SIGMA: {sigma}px
            </span>
            <span className="px-3 py-1 rounded bg-black/50 border border-white/5">
              MAGNIFICATION: {maxScale.toFixed(2)}x
            </span>
            <span className="px-3 py-1 rounded bg-black/50 border border-white/5 text-emerald-400">
              SPRING DAMPING: 0.18
            </span>
          </div>
        </div>

        {/* Floating Physical Glassmorphic Dock Container */}
        <div className="relative z-20 w-full flex justify-center pb-6">
          <div
            ref={dockRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              backdropFilter: `blur(${glassBlur}px)`,
              WebkitBackdropFilter: `blur(${glassBlur}px)`,
            }}
            className="relative flex items-end gap-3 px-5 py-3 rounded-3xl bg-black/50 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-[padding] duration-150"
          >
            {dockItems.map((item, idx) => {
              // Approximate icon center within dock (each button is roughly 48px wide + 12px gap)
              const iconCenterX = 24 + idx * 60;
              let scale = 1.0;
              if (mouseX !== null) {
                const dist = Math.abs(mouseX - iconCenterX);
                const factor = Math.exp(-Math.pow(dist, 2) / (2 * Math.pow(sigma, 2)));
                scale = 1 + (maxScale - 1) * factor;
              }

              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <div key={item.id} className="relative flex flex-col items-center">
                  {/* Tooltip Label upon Hover */}
                  {scale > 1.25 && (
                    <div
                      className="pointer-events-none absolute -top-11 z-30 px-2.5 py-1 rounded-md bg-black/90 border border-white/20 shadow-xl whitespace-nowrap animate-in fade-in zoom-in-95 duration-100"
                    >
                      <span className="font-mono text-[10px] font-bold tracking-wider text-white">
                        {item.label}
                      </span>
                    </div>
                  )}

                  {/* Scalable Dock Button */}
                  <button
                    onClick={() => selectTab(item.id, item.label)}
                    style={{
                      transform: `scale(${scale}) translateY(${-(scale - 1) * 20}px)`,
                      transformOrigin: 'bottom center',
                      transition: mouseX === null ? 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
                    }}
                    className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-lg ${
                      isActive
                        ? 'bg-gradient-to-t from-white/20 to-white/30 border border-white/60 shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                        : 'bg-white/10 hover:bg-white/20 border border-white/15'
                    }`}
                    data-cursor="hover"
                    data-cursor-text={item.badge}
                  >
                    <Icon className={`w-5 h-5 ${item.color}`} />

                    {/* Corner Tag */}
                    <span className="absolute top-1 right-1 font-mono text-[8px] font-bold text-zinc-400">
                      {item.badge}
                    </span>
                  </button>

                  {/* Active Indicator Spring Dot */}
                  <div className="h-2 flex items-center justify-center mt-1">
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)] animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
