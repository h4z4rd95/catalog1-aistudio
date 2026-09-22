import React, { useState } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { CornerDownRight, Crosshair, Terminal, Shield, ArrowUpRight, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Nav_V03_BrutalistSplitIndex',
  name: 'Neo-Brutalist Split-Screen Column Mega-Menu',
  category: 'Navigation',
  batch: 'Batch 2: Navigation Systems & Mega-Menus',
  techStack: ['Next.js / React', 'Split Column Engine', 'Dynamic Telemetry', 'Mechanical Audio Feedback'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Raw Monospace Matrix',
  interactionBlueprint: 'Selecting left-hand architectural indices updates right-hand technical schematic blueprints and coordinate specs with mechanical tactile audio clicks.',
  description: 'A structural neo-brutalist split navigation system pairing raw monochrome typography grids with synchronous engineering specifications, coordinate wireframes, and live telemetry.',
  tags: ['Neo-Brutalism', 'Split Menu', 'Mega-Menu', 'Monospace', 'High Contrast', 'Architectural'],
  codeSnippet: `// Synchronous Dual-Pane Blueprint Coordinate Mapping
const handleIndexSelect = (index: number) => {
  audioEngine.playClick(320 + index * 40, 0.05); // mechanical tactile click
  setActiveIndex(index);
  setTelemetryCoordinates({
    lat: (48.8566 + index * 1.24).toFixed(4),
    lon: (2.3522 + index * 3.12).toFixed(4),
    payload: (1240 + index * 350) + ' KB',
  });
};`,
};

const disciplines = [
  {
    code: 'SPEC_01',
    title: 'STRUCTURAL GLSL',
    category: 'GPU ACCELERATION',
    deliverables: ['Custom Simplex Kernels', 'Multi-Pass Render Target', 'Volumetric Raymarching'],
    status: 'ACTIVE_PIPELINE',
    hash: '0x8F94...B12',
    memory: '14.2 MB',
  },
  {
    code: 'SPEC_02',
    title: 'KINETIC VELOCITY MATRIX',
    category: 'TYPOGRAPHIC PHYSICS',
    deliverables: ['Euler Momentum Observer', 'Dynamic Matrix Skew', 'Bidirectional Marquees'],
    status: 'OPTIMAL_CADENCE',
    hash: '0x3C42...A99',
    memory: '3.8 MB',
  },
  {
    code: 'SPEC_03',
    title: 'PARAMETRIC 3D TOPOLOGY',
    category: 'COMPUTATIONAL MATH',
    deliverables: ['Torus Knot Geometry', 'Vertex Wave Deformation', 'Iridescent Normals'],
    status: '60_FPS_LOCKED',
    hash: '0x7E11...F44',
    memory: '28.6 MB',
  },
  {
    code: 'SPEC_04',
    title: 'CYBER DIAGNOSTIC COCKPIT',
    category: 'HIGH-DENSITY HUD',
    deliverables: ['Canvas 2D Raycasting', 'Chromatic Glitch Text', 'Live Kernel Log Stream'],
    status: 'SHIELD_DEPLOYED',
    hash: '0x992B...C01',
    memory: '6.4 MB',
  },
  {
    code: 'SPEC_05',
    title: 'HAUTE COUTURE EDITORIAL',
    category: 'MINIMALIST LUXURY',
    deliverables: ['Cinzel Roman Serifs', 'Ambient Golden Stardust', 'Brownian Motion Physics'],
    status: 'ARCHIVE_READY',
    hash: '0x1A22...E77',
    memory: '2.1 MB',
  },
];

export default function NavBrutalistSplitIndex() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [invertContrast, setInvertContrast] = useState(false);

  const selected = disciplines[activeIdx];

  const handleSelect = (idx: number) => {
    soundFx.playClick(320 + idx * 50, 0.04);
    setActiveIdx(idx);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">Contrast Archetype</label>
            <button
              onClick={() => {
                soundFx.playClick(800);
                setInvertContrast(!invertContrast);
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/20 font-mono text-xs text-white hover:bg-white hover:text-black font-bold uppercase transition-colors"
            >
              Mode: {invertContrast ? 'MONOCHROME INVERTED' : 'STANDARD OBSIDIAN'}
            </button>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Active Index Jump</label>
            <div className="flex gap-1">
              {disciplines.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`flex-1 py-1 rounded font-mono text-xs border ${
                    activeIdx === i
                      ? 'bg-amber-400 text-black border-amber-400 font-bold'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}
                >
                  0{i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div 
        className={`relative w-full min-h-[85vh] flex flex-col justify-between transition-colors select-none ${
          invertContrast ? 'bg-zinc-100 text-black' : 'bg-[#090a0d] text-zinc-100'
        }`}
      >
        {/* Top Split Header Strip */}
        <div className={`w-full border-b px-6 py-3 flex items-center justify-between font-mono text-xs ${
          invertContrast ? 'border-black/20 bg-zinc-200' : 'border-white/15 bg-black/40'
        }`}>
          <div className="flex items-center gap-3">
            <span className={`px-2 py-0.5 font-bold uppercase ${
              invertContrast ? 'bg-black text-white' : 'bg-white text-black'
            }`}>
              INDEX // 003
            </span>
            <span className="font-bold tracking-widest hidden sm:inline">
              ARCHITECTURAL SPLIT DIRECTORY
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] opacity-75">
            <span>SECTOR: ALPHA</span>
            <span>&bull;</span>
            <span>COORDINATE: 48.8566, 2.3522</span>
          </div>
        </div>

        {/* 50 / 50 Dual Synchronous Split Stage */}
        <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 flex-1">
          {/* Left Column (Index Directory Links) */}
          <div className={`lg:col-span-7 p-6 md:p-10 border-b lg:border-b-0 lg:border-r flex flex-col justify-between ${
            invertContrast ? 'border-black/20' : 'border-white/15'
          }`}>
            <div>
              <span className="font-mono text-[10px] tracking-widest uppercase opacity-60 block mb-6">
                // SELECT AN ARCHITECTURAL SPECIFICATION
              </span>

              <div className="space-y-2">
                {disciplines.map((d, i) => {
                  const isCurrent = activeIdx === i;
                  return (
                    <div
                      key={d.code}
                      onClick={() => handleSelect(i)}
                      onMouseEnter={() => soundFx.playClick(900, 0.01)}
                      className={`group flex items-center justify-between p-4 border transition-all cursor-pointer ${
                        isCurrent
                          ? invertContrast
                            ? 'bg-black text-white border-black shadow-lg translate-x-2'
                            : 'bg-white text-black border-white shadow-xl translate-x-2'
                          : invertContrast
                          ? 'border-black/15 hover:border-black/40 hover:bg-black/5'
                          : 'border-white/10 hover:border-white/40 hover:bg-white/5'
                      }`}
                      data-cursor="hover"
                      data-cursor-text="SELECT"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="font-mono text-xs font-black opacity-60">
                          {d.code}
                        </span>
                        <div>
                          <h4 className="font-['Syne'] text-lg sm:text-2xl font-black uppercase tracking-tight">
                            {d.title}
                          </h4>
                          <span className="font-mono text-[10px] uppercase tracking-wider opacity-70 block mt-0.5">
                            {d.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] uppercase font-bold hidden sm:inline">
                          {d.status}
                        </span>
                        <CornerDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between font-mono text-[11px] opacity-60">
              <span>HOVER / CLICK TO DRIVE RIGHT TELEMETRY</span>
              <span>SYNCHRONIZED REAL-TIME</span>
            </div>
          </div>

          {/* Right Column (Synchronous Blueprint & Deliverables HUD) */}
          <div className="lg:col-span-5 p-6 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-6 border-current/20">
                <span className="font-mono text-xs font-black uppercase flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>SPECIFICATION SCHEMATIC</span>
                </span>
                <span className="font-mono text-xs font-bold text-amber-400">
                  {selected.hash}
                </span>
              </div>

              {/* Wireframe Diagram Box */}
              <div className={`p-5 border-2 border-dashed mb-6 relative overflow-hidden ${
                invertContrast ? 'border-black/30 bg-black/5' : 'border-white/20 bg-white/5'
              }`}>
                <div className="flex items-center justify-between font-mono text-[10px] opacity-70 mb-3">
                  <span>BLUEPRINT TOPOLOGY</span>
                  <span className="text-emerald-400 font-bold">{selected.status}</span>
                </div>

                <div className="h-28 flex items-center justify-center border border-current/15 relative">
                  <Crosshair className="w-8 h-8 text-amber-400 animate-spin" style={{ animationDuration: '24s' }} />
                  <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 divide-x divide-y divide-current/10 pointer-events-none" />
                </div>

                <div className="mt-3 flex justify-between font-mono text-[10px] opacity-80">
                  <span>MEMORY FOOTPRINT: {selected.memory}</span>
                  <span>SECURITY: 100% OK</span>
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <span className="font-mono text-[10px] uppercase tracking-widest opacity-70 block mb-3">
                  // VERIFIED DELIVERABLES
                </span>
                <div className="space-y-2 font-mono text-xs">
                  {selected.deliverables.map((item, idx) => (
                    <div 
                      key={idx}
                      className={`p-2.5 border flex items-center justify-between ${
                        invertContrast ? 'bg-white border-black/15' : 'bg-black/40 border-white/10'
                      }`}
                    >
                      <span className="font-medium">{item}</span>
                      <span className="text-[10px] text-emerald-400 font-bold">READY</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => soundFx.playClick(400, 0.05)}
              className={`mt-8 w-full py-3.5 font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 border transition-colors ${
                invertContrast 
                  ? 'bg-black text-white hover:bg-zinc-800' 
                  : 'bg-white text-black hover:bg-amber-400'
              }`}
              data-cursor="hover"
              data-cursor-text="EXECUTE"
            >
              <span>DEPLOY MODULE: {selected.title}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
