import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Layers, Sliders, Box, ShieldAlert, Cpu, ArrowRight, CornerDownRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'product_v02_brutalistsneakerdisassembly',
  name: 'Neo-Brutalist Footwear Disassembly Matrix',
  category: 'Product',
  batch: 'Batch 7: Spatial E-Commerce & 3D Configurator Showcases',
  techStack: ['React 19', 'Exploded Vector Projection', 'Mechanical Layer Damping', 'Monospace Architectural Grid', 'Tactile Audio'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Raw Deconstruction',
  interactionBlueprint: 'Continuous mechanical explosion slider offsets SVG silhouette layers across the vertical Z-axis. Selecting layer elements reveals industrial specification stamps, tensile modulus ratings, and carbon footprint telemetry.',
  description: 'Industrial footwear deconstruction ledger featuring an exploded vertical layer slider, raw technical specification callouts, and brutalist monochrome typography.',
  codeSnippet: `<div style={{ transform: \`translateY(\${layer.offset * explosionDist}px)\` }} className="transition-transform duration-300">
  {/* Exploded Sole Component */}
</div>`,
  tags: ['Product', 'Neo-Brutalist', 'Exploded View', 'Footwear', 'Industrial', 'Kinetic'],
};

interface FootwearLayer {
  id: string;
  name: string;
  tier: number;
  offsetFactor: number;
  color: string;
  weight: string;
  tensile: string;
  material: string;
  origin: string;
}

export default function ProductBrutalistSneakerDisassembly() {
  const [explosionDistance, setExplosionDistance] = useState<number>(45); // 0 to 100%
  const [selectedLayerId, setSelectedLayerId] = useState<string>('L3');
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);

  const layers: FootwearLayer[] = [
    {
      id: 'L5',
      name: 'BOA DIAL & MAGNETIC KINETIC STRAP',
      tier: 5,
      offsetFactor: -1.6,
      color: '#facc15',
      weight: '34g',
      tensile: '1,400 N break test',
      material: 'Dyed Spectra Fiber & Aircraft Aluminum 7075',
      origin: 'Tokyo, Japan',
    },
    {
      id: 'L4',
      name: 'PARAMETRIC GORE-TEX CORDURA UPPER',
      tier: 4,
      offsetFactor: -0.8,
      color: '#ffffff',
      weight: '92g',
      tensile: '2,800 kPa puncture resist',
      material: 'Recycled Ocean Polyamide & PTFE Membrane',
      origin: 'Stuttgart, Germany',
    },
    {
      id: 'L3',
      name: 'CARBON FIBER LATERAL STABILITY TRUSS',
      tier: 3,
      offsetFactor: 0,
      color: '#38bdf8',
      weight: '48g',
      tensile: '4.8 GPa Young Modulus',
      material: '3K Bi-Axial Torayca T800 Carbon Weave',
      origin: 'Torino, Italy',
    },
    {
      id: 'L2',
      name: 'SUPERCRITICAL NITROGEN FOAM MIDSOLE',
      tier: 2,
      offsetFactor: 0.8,
      color: '#a855f7',
      weight: '115g',
      tensile: '82% Energy Return Coefficient',
      material: 'Gas-Infused Pebax 45D Elastomer',
      origin: 'Portland, OR',
    },
    {
      id: 'L1',
      name: 'VIBRAM MEGAGRIP MULTI-TERRAIN TREAD',
      tier: 1,
      offsetFactor: 1.6,
      color: '#ef4444',
      weight: '128g',
      tensile: '70 Shore-A Durometer',
      material: 'Vulcanized High-Abrasion Rubber Compound',
      origin: 'Albizzate, Italy',
    },
  ];

  const selectedLayer = layers.find((l) => l.id === selectedLayerId) || layers[2];

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="p-5 border-4 border-black bg-amber-400 text-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]">
            <div>
              <span className="text-xs uppercase tracking-widest font-black block">
                ARCHITECTURAL SPECIFICATION SPEC // PROTO-09
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                X-09 VORTEX FOOTWEAR DECONSTRUCTION
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase">SERIAL: #VTX-2026-X</span>
              <span className="px-3 py-1 bg-black text-amber-400 font-black text-sm uppercase">
                $460 USD
              </span>
            </div>
          </div>

          {/* Main 2-Column: Exploded Stage + Engineering Spec Ledger */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Exploded Viewport (Col 7) */}
            <div className="lg:col-span-7 p-6 border-2 border-white/20 bg-black/80 flex flex-col justify-between relative overflow-hidden min-h-[500px]">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-400" />
                  <span>ORTHOGRAPHIC EXPLOSION VIEW // CLICK LAYER</span>
                </span>
                <span className="text-amber-400 font-bold">TOTAL MASS: 417g</span>
              </div>

              {/* Exploded Layers Display */}
              <div className="relative w-full h-80 flex flex-col items-center justify-center my-6">
                {layers.map((layer) => {
                  const offsetY = layer.offsetFactor * (explosionDistance * 0.9);
                  const isSelected = selectedLayerId === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => {
                        soundFx.playClick(600 + layer.tier * 80);
                        setSelectedLayerId(layer.id);
                      }}
                      style={{
                        transform: `translateY(${offsetY}px)`,
                      }}
                      className={`absolute w-72 sm:w-96 p-3.5 border-2 cursor-pointer transition-all duration-300 flex items-center justify-between group ${
                        isSelected
                          ? 'bg-amber-400 text-black border-amber-400 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.8)] z-20'
                          : 'bg-zinc-950/90 text-zinc-300 border-white/20 hover:border-white/60 z-10'
                      } ${wireframeMode ? 'border-dashed' : ''}`}
                      data-cursor="hover"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-3 h-3 rounded-full border border-black/30 ${
                            isSelected ? 'bg-black' : ''
                          }`}
                          style={{ backgroundColor: isSelected ? '#000000' : layer.color }}
                        />
                        <span className="text-xs font-black tracking-wider uppercase">
                          {layer.id}: {layer.name}
                        </span>
                      </div>

                      <span className="text-[11px] font-bold font-mono">
                        {layer.weight}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Slider Controls */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                <div className="w-full sm:w-64 space-y-1">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>EXPLOSION SEPARATION:</span>
                    <span className="text-amber-400 font-bold">{explosionDistance}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={explosionDistance}
                    onChange={(e) => setExplosionDistance(parseInt(e.target.value))}
                    className="w-full accent-amber-400 h-2 bg-zinc-800 appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick(800);
                    setWireframeMode(!wireframeMode);
                  }}
                  className={`px-3 py-1.5 border font-bold uppercase transition-all ${
                    wireframeMode
                      ? 'bg-amber-400 text-black border-amber-400'
                      : 'bg-white/5 text-zinc-300 border-white/20'
                  }`}
                  data-cursor="hover"
                >
                  WIREFRAME: {wireframeMode ? 'ON' : 'OFF'}
                </button>
              </div>
            </div>

            {/* Engineering Technical Spec Ledger (Col 5) */}
            <div className="lg:col-span-5 p-6 border-2 border-white/20 bg-zinc-950 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs uppercase text-amber-400 font-black">
                    LAYER TELEMETRY INSPECTOR
                  </span>
                  <span className="text-xs px-2 py-0.5 bg-white/10 text-white font-bold">
                    TIER {selectedLayer.tier} / 5
                  </span>
                </div>

                <div>
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">
                    {selectedLayer.name}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1">Component ID: {selectedLayer.id}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-black border border-white/10">
                    <span className="text-zinc-500 text-[10px] block uppercase">Material Composition:</span>
                    <span className="text-amber-300 font-bold">{selectedLayer.material}</span>
                  </div>

                  <div className="p-3 bg-black border border-white/10 flex justify-between">
                    <span className="text-zinc-400">Tensile &amp; Stress Limit:</span>
                    <span className="text-white font-bold">{selectedLayer.tensile}</span>
                  </div>

                  <div className="p-3 bg-black border border-white/10 flex justify-between">
                    <span className="text-zinc-400">Origin / Fabrication:</span>
                    <span className="text-cyan-400 font-bold">{selectedLayer.origin}</span>
                  </div>

                  <div className="p-3 bg-black border border-white/10 flex justify-between">
                    <span className="text-zinc-400">Net Component Mass:</span>
                    <span className="text-amber-400 font-bold">{selectedLayer.weight}</span>
                  </div>
                </div>
              </div>

              {/* Order Raw Specimen CTA */}
              <button
                onClick={() => soundFx.playClick(900)}
                className="w-full py-4 bg-amber-400 hover:bg-amber-300 text-black font-black uppercase tracking-wider text-xs border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] transition-all"
                data-cursor="hover"
              >
                <span>Order Engineering Prototype &bull; $460</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
