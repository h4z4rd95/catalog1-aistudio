import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Eye, Award, Check, Feather, ShoppingBag } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'product_v04_hautecouturefragrance',
  name: 'Haute Couture Olfactory Pyramid & Bespoke Flacon Atelier',
  category: 'Product',
  batch: 'Batch 7: Spatial E-Commerce & 3D Configurator Showcases',
  techStack: ['React 19', 'Cinzel Roman Typography', 'Interactive Scent Pyramid', 'Live Monogram Engraving', 'Ceremonial Audio'],
  aestheticVibe: 'Luxury Editorial & Haute Couture / Grasse Perfumery',
  interactionBlueprint: 'Interactive olfactory tier pyramid switches between Top, Heart, and Base aromatic notes with volatile evaporation telemetry. Live input engravement preview renders custom Roman initial monograms on the flacon glass.',
  description: 'Haute parfumerie spatial lookbook showcasing rare olfactory notes, bespoke flacon cap materials, and live monogram gold foil engraving previews.',
  codeSnippet: `<div className="font-['Cinzel'] tracking-widest text-[#d4af37]">
  {monogramText.toUpperCase() || 'M.A.'}
</div>`,
  tags: ['Product', 'Luxury Editorial', 'Haute Couture', 'Parfumerie', 'Engraving', 'Cinzel'],
};

interface ScentNote {
  tier: 'TOP' | 'HEART' | 'BASE';
  title: string;
  duration: string;
  ingredients: string[];
  description: string;
}

export default function ProductHauteCoutureFragrance() {
  const [activeTier, setActiveTier] = useState<'TOP' | 'HEART' | 'BASE'>('HEART');
  const [monogramText, setMonogramText] = useState<string>('AURELIA');
  const [selectedStopper, setSelectedStopper] = useState<string>('GOLD');

  const notes: Record<'TOP' | 'HEART' | 'BASE', ScentNote> = {
    TOP: {
      tier: 'TOP',
      title: 'Tête // Radiant & Volatile',
      duration: '0 to 45 minutes',
      ingredients: ['Calabrian Sun Bergamot', 'Pink Peppercorn CO2', 'Sicilian Blood Orange'],
      description: 'An effervescent, crisp opening that awakens the senses with sparkling citrus caustics and mineral spice.',
    },
    HEART: {
      tier: 'HEART',
      title: 'Cœur // The Soul of Grasse',
      duration: '1 to 6 hours',
      ingredients: ['Rose de Mai Absolute (Grasse)', 'Florentine Orris Butter (3yr aged)', 'Midnight Jasmine'],
      description: 'The opulent floral core distilled from rare Grasse May roses and powdery Tuscan orris rhizomes.',
    },
    BASE: {
      tier: 'BASE',
      title: 'Fond // Deep Resinous Sillage',
      duration: '8 to 24+ hours',
      ingredients: ['Vintage Wild Oud Wood', 'Natural Ambergris Infusion', 'Bourbon Vanilla Pod'],
      description: 'A lingering, nocturnal aura of aged agarwood smoke, oceanic amber warmth, and dark Madagascar vanilla.',
    },
  };

  const stoppers = [
    { id: 'GOLD', name: '24k Hand-Chiseled Vermeil', color: '#d4af37' },
    { id: 'OBSIDIAN', name: 'Belgian Black Marble', color: '#18181b' },
    { id: 'QUARTZ', name: 'Carved Smoky Crystal', color: '#4b5563' },
  ];

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-16 px-4 sm:px-6 lg:px-8 bg-[#0a0807] text-zinc-100">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="font-['Cinzel'] text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              MAISON AURELIA &bull; EXTRAIT DE PARFUM (100 ML)
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            </span>
            <h3 className="font-['Cinzel'] text-3xl sm:text-4xl font-bold text-white tracking-wide">
              L’Élixir d’Orphée // Edition Royale
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light font-serif italic max-w-md mx-auto">
              Compounded in Grasse at 35% oil concentration. Housed in mouth-blown French crystal with custom bespoke chiseled stoppers.
            </p>
          </div>

          {/* 2-Column: Flacon Showcase + Scent Architecture & Engraver */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Flacon Graphic & Engraving Glass Stage (Col 6) */}
            <div className="lg:col-span-6 p-8 sm:p-12 rounded-2xl bg-gradient-to-b from-[#14100d] via-[#100d0a] to-[#070504] border border-[#d4af37]/30 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">
              {/* Subtle Stardust Glow */}
              <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_40%,rgba(212,175,55,0.15),transparent_70%)]" />

              {/* Simulated Luxury Flacon Visual */}
              <div className="relative z-10 flex flex-col items-center">
                {/* Flacon Cap / Stopper */}
                <div
                  style={{
                    backgroundColor: stoppers.find((s) => s.id === selectedStopper)?.color || '#d4af37',
                  }}
                  className="w-16 h-12 rounded-t-lg border border-[#d4af37]/50 shadow-lg transition-colors duration-500"
                />

                {/* Neck Collar */}
                <div className="w-20 h-4 bg-[#d4af37] border border-[#f3e5ab] shadow-md" />

                {/* Crystal Flacon Body */}
                <div className="w-48 sm:w-56 h-64 rounded-b-3xl border-2 border-[#d4af37]/60 bg-gradient-to-b from-amber-500/10 to-amber-950/30 backdrop-blur-md relative flex flex-col items-center justify-center p-6 shadow-[0_0_40px_rgba(212,175,55,0.15)]">
                  {/* Fluid Amber Meniscus Line */}
                  <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#c59b27]/30 to-[#d4af37]/10 rounded-b-3xl" />

                  {/* Gold Foil Engraved Monogram Label */}
                  <div className="relative z-10 w-full p-4 border border-[#d4af37] rounded-lg bg-black/70 backdrop-blur-md text-center shadow-xl">
                    <span className="font-['Cinzel'] text-[10px] uppercase tracking-[0.25em] text-[#d4af37] block font-bold">
                      MAISON AURELIA
                    </span>
                    <h4 className="font-['Cinzel'] text-sm font-bold text-white tracking-widest mt-1">
                      {monogramText.toUpperCase() || 'BESPOKE'}
                    </h4>
                    <span className="font-serif italic text-[10px] text-zinc-400 block mt-1">
                      Extrait de Parfum &bull; 100ml
                    </span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 mt-6 text-center">
                <span className="font-['Cinzel'] text-xs text-[#d4af37] tracking-widest block">
                  BESPOKE PIECE VALUATION
                </span>
                <span className="font-mono text-2xl font-bold text-white mt-1 block">
                  € 680 EUR
                </span>
              </div>
            </div>

            {/* Scent Pyramid & Monogram Engraver (Col 6) */}
            <div className="lg:col-span-6 space-y-6">
              {/* Olfactory Pyramid Tier Selector */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#d4af37]/20 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                    OLFACTORY ARCHITECTURE
                  </span>
                  <span className="font-mono text-xs text-zinc-400">Concentration: 35% Pure Oil</span>
                </div>

                {/* Tiers Tabs */}
                <div className="grid grid-cols-3 gap-2">
                  {(['TOP', 'HEART', 'BASE'] as const).map((tier) => (
                    <button
                      key={tier}
                      onClick={() => {
                        soundFx.playChime(tier === 'TOP' ? 900 : tier === 'HEART' ? 750 : 600);
                        setActiveTier(tier);
                      }}
                      className={`py-2 rounded-lg font-['Cinzel'] text-xs font-bold uppercase tracking-wider transition-all border ${
                        activeTier === tier
                          ? 'bg-[#d4af37] text-black border-[#d4af37]'
                          : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
                      }`}
                      data-cursor="hover"
                    >
                      {tier} NOTES
                    </button>
                  ))}
                </div>

                {/* Active Scent Description */}
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2 text-xs">
                  <div className="flex justify-between font-mono text-zinc-400">
                    <span className="text-[#d4af37] font-bold">{notes[activeTier].title}</span>
                    <span>Longevity: {notes[activeTier].duration}</span>
                  </div>
                  <p className="font-serif italic text-zinc-300 leading-relaxed text-sm">
                    {notes[activeTier].description}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2">
                    {notes[activeTier].ingredients.map((ing) => (
                      <span
                        key={ing}
                        className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-['Cinzel'] text-zinc-300"
                      >
                        &bull; {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bespoke Monogram Engraver Box */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-[#d4af37]/20 space-y-4">
                <span className="font-['Cinzel'] text-xs uppercase tracking-widest text-[#d4af37] font-bold block">
                  BESPOKE GOLD FOIL ENGRAVING:
                </span>

                <div>
                  <input
                    type="text"
                    maxLength={14}
                    value={monogramText}
                    onChange={(e) => {
                      soundFx.playClick(800);
                      setMonogramText(e.target.value);
                    }}
                    placeholder="ENTER NAME / INITIALS"
                    className="w-full p-3 rounded-lg bg-black/60 border border-[#d4af37]/40 text-white font-['Cinzel'] text-sm tracking-widest uppercase focus:outline-none focus:border-[#d4af37]"
                  />
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                    Max 14 characters. Hand-engraved with vermeil leaf inlay in our Paris atelier.
                  </span>
                </div>

                {/* Stopper Selector */}
                <div>
                  <span className="font-['Cinzel'] text-[11px] text-zinc-400 uppercase block mb-2">
                    SELECT FLACON STOPPER:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {stoppers.map((st) => (
                      <button
                        key={st.id}
                        onClick={() => {
                          soundFx.playChime(700);
                          setSelectedStopper(st.id);
                        }}
                        className={`p-2 rounded-lg border text-left text-xs font-['Cinzel'] transition-all ${
                          selectedStopper === st.id
                            ? 'bg-[#d4af37]/20 border-[#d4af37] text-white font-bold'
                            : 'bg-black/40 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                        data-cursor="hover"
                      >
                        <span className="block text-[11px]">{st.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Acquire Fragrance CTA */}
              <button
                onClick={() => soundFx.playChime(900, 0.5)}
                className="w-full py-4 rounded-full bg-[#d4af37] hover:bg-[#f3e5ab] text-black font-['Cinzel'] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-[#d4af37]/20 transition-all"
                data-cursor="hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Flacon &bull; € 680 EUR</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
