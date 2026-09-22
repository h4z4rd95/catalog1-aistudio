import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Compass, Eye, Sparkles, BookOpen, Layers, Award, ShieldCheck, ChevronRight, X } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'dashboard_v04_luxuryexhibitionspatialmatrix',
  name: 'Haute Couture Spatial Exhibition Portfolio Matrix',
  category: 'Dashboard',
  batch: 'Batch 6: Dashboards & Node Visualizers',
  techStack: ['React 19', 'Cinzel Roman Typography', 'Curated Spatial Bento Grid', 'Specular Gold Caustics', 'Ceremonial Audio'],
  aestheticVibe: 'Luxury Editorial & Haute Couture / Museum Curation',
  interactionBlueprint: 'Spatial museum wing selectors filter archive pieces across physical architectural galleries. Interactive collection tiles expand into rich curatorial dossiers with provenance, material analysis, and acquisition estimates.',
  description: 'Museum-grade spatial exhibition dashboard combining Roman serif typography, gold foil specular borders, curated gallery rooms, and interactive provenance dossiers.',
  codeSnippet: `<div className="font-['Cinzel'] tracking-widest text-[#d4af37]">
  SALON PRIVÉ // SALLE DE MIROIRS
</div>`,
  tags: ['Dashboard', 'Luxury Editorial', 'Haute Couture', 'Museum', 'Bento Grid', 'Cinzel'],
};

interface ExhibitionPiece {
  id: string;
  title: string;
  room: 'GRAND_PALAIS' | 'SALON_PRIVE' | 'ROTONDE_DOREE' | 'SALLE_MIROIRS';
  epoch: string;
  medium: string;
  provenance: string;
  valuation: string;
  luxLevel: number;
  featuredImg: string;
  notes: string;
}

export default function DashboardLuxuryExhibitionSpatialMatrix() {
  const [selectedRoom, setSelectedRoom] = useState<string>('ALL');
  const [activeDossier, setActiveDossier] = useState<ExhibitionPiece | null>(null);
  const [galleryIllumination, setGalleryIllumination] = useState<number>(85); // Lux %

  const pieces: ExhibitionPiece[] = [
    {
      id: 'PC-01',
      title: 'L’Armure d’Or & Soie Impériale',
      room: 'GRAND_PALAIS',
      epoch: 'Automne-Hiver 2026',
      medium: 'Hand-woven 24k Vermeil Gold Wire & Mulberry Raw Silk',
      provenance: 'Atelier Aurelia, Place Vendôme, Paris',
      valuation: '€ 1,240,000',
      luxLevel: 75,
      featuredImg: 'linear-gradient(135deg, #181512 0%, #2b2216 100%)',
      notes: 'Commissioned for the Triennale de Milan. Requires temperature-controlled nitrogen casing.',
    },
    {
      id: 'PC-02',
      title: 'Le Manteau Diaphane en Organza d’Obsidienne',
      room: 'SALON_PRIVE',
      epoch: 'Printemps 2026',
      medium: 'Volcanic Obsidian Spun Glass Yarn & Silk Tulle',
      provenance: 'Collection Privée de Haute Couture, Genève',
      valuation: '€ 890,000',
      luxLevel: 60,
      featuredImg: 'linear-gradient(135deg, #111114 0%, #1f1b29 100%)',
      notes: 'Exhibited exclusively under polarized low-lux halogen arrays to preserve fiber integrity.',
    },
    {
      id: 'PC-03',
      title: 'La Robe Sculpturale à Plis Paramétriques',
      room: 'ROTONDE_DOREE',
      epoch: 'Édition Unique 2025',
      medium: 'Titanium-infused Platinum Jacquard with Gold Foil Rim',
      provenance: 'Galleria dell’Accademia, Firenze',
      valuation: '€ 2,100,000',
      luxLevel: 90,
      featuredImg: 'linear-gradient(135deg, #231b14 0%, #3d2f1c 100%)',
      notes: 'Sculpted via generative Voronoi pleating algorithms realized by Master Draper Jean-Luc.',
    },
    {
      id: 'PC-04',
      title: 'Diadème Stellaire & Poussière de Météorite',
      room: 'SALLE_MIROIRS',
      epoch: 'Haute Joaillerie 2026',
      medium: 'Gibeon Iron Meteorite Core, Baguette Diamonds & Vermeil',
      provenance: 'Palais Princier de Monaco',
      valuation: '€ 4,750,000',
      luxLevel: 95,
      featuredImg: 'linear-gradient(135deg, #1f1f24 0%, #302b36 100%)',
      notes: 'Contains extraterrestrial widmanstätten crystal patterns verified by Sorbonne Astrophysics.',
    },
  ];

  const filteredPieces = selectedRoom === 'ALL' ? pieces : pieces.filter((p) => p.room === selectedRoom);

  const rooms = [
    { id: 'ALL', name: 'All Gallery Wings', count: pieces.length },
    { id: 'GRAND_PALAIS', name: 'I. Grand Palais', count: 1 },
    { id: 'SALON_PRIVE', name: 'II. Salon Privé', count: 1 },
    { id: 'ROTONDE_DOREE', name: 'III. Rotonde Dorée', count: 1 },
    { id: 'SALLE_MIROIRS', name: 'IV. Salle de Miroirs', count: 1 },
  ];

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#090807] text-zinc-200">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Haute Couture Gallery Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              MAISON AURELIA &bull; SALON DES ARCHIVES
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            </span>
            <h3 className="font-['Cinzel'] text-2xl sm:text-4xl font-bold text-white tracking-wide">
              Spatial Exhibition &amp; Curatorial Matrix
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light font-serif italic max-w-lg mx-auto">
              Real-time architectural portfolio indexing irreplaceable couture masterworks, provenance registries, and spatial lux telemetry.
            </p>
          </div>

          {/* Spatial Wings Bar & Illumination Lux Slider */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-white/[0.02] border border-[#d4af37]/20 backdrop-blur-md">
            {/* Wing Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {rooms.map((rm) => (
                <button
                  key={rm.id}
                  onClick={() => {
                    soundFx.playChime(600);
                    setSelectedRoom(rm.id);
                  }}
                  className={`px-3 py-1.5 rounded-full font-['Cinzel'] text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedRoom === rm.id
                      ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                      : 'bg-transparent text-zinc-400 border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  data-cursor="hover"
                >
                  {rm.name} ({rm.count})
                </button>
              ))}
            </div>

            {/* Gallery Illumination */}
            <div className="flex items-center gap-3 w-full md:w-auto text-xs font-mono text-zinc-400">
              <span className="whitespace-nowrap">Ambience Lux:</span>
              <input
                type="range"
                min="40"
                max="100"
                value={galleryIllumination}
                onChange={(e) => setGalleryIllumination(parseInt(e.target.value))}
                className="accent-[#d4af37] h-1 bg-zinc-800 rounded appearance-none cursor-pointer w-28"
              />
              <span className="text-[#d4af37] font-bold">{galleryIllumination}%</span>
            </div>
          </div>

          {/* Bento Exhibition Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPieces.map((piece) => (
              <div
                key={piece.id}
                style={{
                  background: piece.featuredImg,
                  opacity: 0.5 + (galleryIllumination / 100) * 0.5,
                }}
                className="relative p-6 sm:p-8 rounded-2xl border border-[#d4af37]/30 backdrop-blur-xl flex flex-col justify-between group hover:border-[#d4af37] transition-all duration-500 shadow-2xl overflow-hidden"
              >
                {/* Subtle Gold Specular Sheen */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-['Cinzel'] text-[11px] uppercase tracking-widest text-[#d4af37] font-bold">
                      PIECE #{piece.id} &bull; {piece.epoch}
                    </span>
                    <span className="font-mono text-xs text-zinc-400 px-2.5 py-0.5 rounded-full bg-black/40 border border-white/10">
                      Valuation: {piece.valuation}
                    </span>
                  </div>

                  <h4 className="font-['Cinzel'] text-xl sm:text-2xl font-bold text-white tracking-wide group-hover:text-[#f3e5ab] transition-colors">
                    {piece.title}
                  </h4>

                  <div className="space-y-2 text-xs font-light text-zinc-300">
                    <div>
                      <span className="font-serif italic text-zinc-500 block text-[11px]">Material Composition:</span>
                      <p>{piece.medium}</p>
                    </div>
                    <div>
                      <span className="font-serif italic text-zinc-500 block text-[11px]">Provenance &amp; Origin:</span>
                      <p>{piece.provenance}</p>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="font-mono text-[10px] text-zinc-500">
                    WING: {piece.room.replace('_', ' ')}
                  </span>

                  <button
                    onClick={() => {
                      soundFx.playChime(750, 0.4);
                      setActiveDossier(piece);
                    }}
                    className="px-4 py-2 rounded-full bg-white/5 hover:bg-[#d4af37] hover:text-black text-zinc-200 border border-[#d4af37]/40 font-['Cinzel'] text-xs font-bold tracking-wider flex items-center gap-1.5 transition-all"
                    data-cursor="hover"
                  >
                    <span>Inspect Provenance</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Curatorial Dossier Modal */}
          {activeDossier && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <div className="max-w-xl w-full bg-[#120f0c] border-2 border-[#d4af37] rounded-2xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.25)] space-y-5">
                <div className="flex items-center justify-between border-b border-[#d4af37]/30 pb-3">
                  <span className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#d4af37]" /> OFFICIAL CURATORIAL DOSSIER
                  </span>
                  <button
                    onClick={() => setActiveDossier(null)}
                    className="text-zinc-400 hover:text-white font-mono text-sm"
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <h3 className="font-['Cinzel'] text-2xl font-bold text-white">
                    {activeDossier.title}
                  </h3>
                  <p className="text-xs text-[#d4af37] font-mono mt-1">
                    Registered ID: {activeDossier.id} &bull; {activeDossier.epoch}
                  </p>
                </div>

                <div className="space-y-3 text-xs text-zinc-300 font-light leading-relaxed">
                  <div className="p-3 rounded-lg bg-black/50 border border-white/5">
                    <strong className="text-white block font-['Cinzel'] mb-1">Conservation &amp; Historical Notes:</strong>
                    <p className="italic text-zinc-400 font-serif">{activeDossier.notes}</p>
                  </div>

                  <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                    <span className="text-zinc-400">Atmospheric Lux Limit:</span>
                    <span className="text-[#d4af37]">{activeDossier.luxLevel} Lux max</span>
                  </div>

                  <div className="flex justify-between py-1 border-b border-white/5 font-mono">
                    <span className="text-zinc-400">Appraisal Value:</span>
                    <span className="text-emerald-400 font-bold">{activeDossier.valuation}</span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      soundFx.playChime(600);
                      setActiveDossier(null);
                    }}
                    className="px-6 py-2 rounded-full bg-[#d4af37] text-black font-['Cinzel'] text-xs font-bold tracking-wider hover:bg-[#f3e5ab] transition-colors"
                  >
                    Close Dossier
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </BlueprintHUD>
  );
}
