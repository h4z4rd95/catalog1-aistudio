import React, { useState } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Compass, Sparkles, ChevronRight, X, ArrowRight, Menu } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Nav_V04_LuxuryEditorialCurtain',
  name: 'Luxury Editorial Multi-Column Silk Curtain',
  category: 'Navigation',
  batch: 'Batch 2: Navigation Systems & Mega-Menus',
  techStack: ['Next.js / React', 'Asymmetric Column Physics', 'Cinzel Typography', 'Velvet Easing'],
  aestheticVibe: 'Luxury Minimalism & Editorial / Haute Couture',
  interactionBlueprint: 'Curtain panels unfurl with staggered asymmetric cubic-bezier easing; hovering collection lines illuminates haute couture atelier coordinates.',
  description: 'An architectural haute-couture mega-menu featuring four progressive vertical silk columns that descend with velvet staggered delays, framing Roman typography and exclusive atelier registries.',
  tags: ['Luxury', 'Editorial', 'Mega-Menu', 'Staggered Columns', 'Cinzel Typography', 'Haute Couture'],
  codeSnippet: `// Asymmetric Column Curtain Delay Equation
const columns = [
  { id: 'heritage', delay: '0ms' },
  { id: 'collections', delay: '80ms' },
  { id: 'ateliers', delay: '160ms' },
  { id: 'concierge', delay: '240ms' },
];

<div style={{ transitionDelay: column.delay }} className="transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
  {/* Column Content */}
</div>`,
};

const ateliers = [
  { name: 'PARIS ATELIER', city: 'PARIS', address: '12 Place Vendôme, 75001', phone: '+33 1 42 68 00 00', preview: 'Atelier Nocturne & Bespoke Silks' },
  { name: 'TOKYO GINZA', city: 'TOKYO', address: '6-10-1 Ginza, Chuo-ku', phone: '+81 3 5555 0199', preview: 'Architectural Basalt & Origami Draping' },
  { name: 'MILANO QUADRILATERO', city: 'MILAN', address: 'Via Montenapoleone 8', phone: '+39 02 7600 1234', preview: 'Solaris Vermeil & Tailored Flax' },
  { name: 'LONDON MAYFAIR', city: 'LONDON', address: '14 Bond Street, W1S 2PF', phone: '+44 20 7946 0912', preview: 'Monolithic Wool & Carbon Weaves' },
];

export default function NavLuxuryEditorialCurtain() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAtelier, setSelectedAtelier] = useState(0);

  // Tunable HUD parameters
  const [staggerInterval, setStaggerInterval] = useState(80);

  const toggleMenu = () => {
    soundFx.playChime(isOpen ? 480 : 720, 0.3);
    setIsOpen(!isOpen);
  };

  const handleHoverAtelier = (idx: number) => {
    soundFx.playChime(600 + idx * 60, 0.15);
    setSelectedAtelier(idx);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Column Stagger Delay ({staggerInterval}ms)
            </label>
            <input
              type="range"
              min="30"
              max="200"
              step="10"
              value={staggerInterval}
              onChange={(e) => setStaggerInterval(parseInt(e.target.value))}
              className="w-full accent-amber-300"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={toggleMenu}
              className="w-full py-1.5 px-3 rounded bg-amber-300 text-black font-['Cinzel'] text-xs font-bold uppercase tracking-wider hover:bg-amber-200 transition-colors"
            >
              Toggle Silk Curtain ({isOpen ? 'UNFURLED' : 'RETRACTED'})
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#070709] text-zinc-100 flex flex-col justify-between overflow-hidden select-none">
        {/* Mock Top Couture Bar */}
        <div className="relative z-30 w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-['Cinzel'] tracking-[0.3em] text-sm font-semibold text-amber-200 uppercase">
              Maison Aurelia &bull; 1928
            </span>
          </div>

          <button
            onClick={toggleMenu}
            className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-amber-300/40 bg-amber-400/5 hover:bg-amber-300 hover:text-black text-amber-200 transition-all font-['Cinzel'] text-xs uppercase tracking-[0.2em] font-semibold"
            data-cursor="hover"
            data-cursor-text={isOpen ? 'CLOSE' : 'MAISON'}
          >
            <span>{isOpen ? 'Close Curtain' : 'Open Maison Index'}</span>
            {isOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Backdrop Stage with Subtle Halo */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-20 text-center my-auto flex flex-col items-center">
          <div className="w-10 h-10 rounded-full border border-amber-300/30 flex items-center justify-center text-amber-300 mb-6">
            <Sparkles className="w-4 h-4" />
          </div>

          <h2 className="font-['Cinzel'] text-4xl sm:text-6xl font-bold tracking-[0.1em] text-white uppercase leading-tight mb-6">
            Haute Couture Multi-Column Curtain
          </h2>

          <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 max-w-lg mx-auto text-sm sm:text-base leading-relaxed mb-8 font-light">
            Unfurl the four architectural columns to reveal bespoke maison collections, private ateliers, and confidential concierge services.
          </p>

          <button
            onClick={toggleMenu}
            className="px-8 py-3.5 rounded-full border border-amber-300/60 bg-amber-400/10 hover:bg-amber-300 hover:text-black text-amber-200 font-['Cinzel'] text-xs uppercase tracking-[0.25em] font-bold transition-all shadow-lg"
            data-cursor="hover"
          >
            Explore Maison Archive
          </button>
        </div>

        {/* Asymmetric 4-Column Curtain Overlay */}
        <div
          className={`absolute inset-0 z-40 bg-black/70 backdrop-blur-md transition-opacity duration-500 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Column 1: Heritage & Manifesto */}
            <div
              style={{
                transitionDelay: isOpen ? `${0 * staggerInterval}ms` : '0ms',
                transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
              }}
              className="p-8 bg-[#09090c] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              <div>
                <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.3em] text-amber-300/80 block mb-6">
                  [01] // HERITAGE
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold uppercase tracking-wider text-white mb-4">
                  The Maison
                </h3>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  Founded in 1928, Maison Aurelia merges architectural mathematics with uncompromising tailoring.
                </p>
                <ul className="space-y-3 font-['Cinzel'] text-xs tracking-wider text-zinc-300">
                  <li className="hover:text-amber-300 cursor-pointer flex items-center justify-between">
                    <span>Maison Philosophy</span>
                    <ArrowRight className="w-3 h-3 text-amber-300/60" />
                  </li>
                  <li className="hover:text-amber-300 cursor-pointer flex items-center justify-between">
                    <span>Centennial Archive</span>
                    <ArrowRight className="w-3 h-3 text-amber-300/60" />
                  </li>
                  <li className="hover:text-amber-300 cursor-pointer flex items-center justify-between">
                    <span>Artisanal Guild</span>
                    <ArrowRight className="w-3 h-3 text-amber-300/60" />
                  </li>
                </ul>
              </div>

              <div className="font-mono text-[10px] text-zinc-600">
                REF // PAR-1928
              </div>
            </div>

            {/* Column 2: Haute Collections */}
            <div
              style={{
                transitionDelay: isOpen ? `${1 * staggerInterval}ms` : '0ms',
                transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
              }}
              className="p-8 bg-[#0a0a0e] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              <div>
                <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.3em] text-amber-300/80 block mb-6">
                  [02] // COLLECTIONS
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold uppercase tracking-wider text-white mb-4">
                  Runway Editions
                </h3>
                <ul className="space-y-4 font-['Cinzel'] text-xs tracking-widest text-zinc-300">
                  <li className="p-3 bg-white/5 border border-white/5 hover:border-amber-300/40 rounded transition-all cursor-pointer">
                    <span className="text-[10px] text-amber-300 block mb-1">N° 01</span>
                    <span className="font-bold text-sm block">ATELIER NOCTURNE</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-zinc-400 font-light">Obsidian Silk & Raw Wool</span>
                  </li>
                  <li className="p-3 bg-white/5 border border-white/5 hover:border-amber-300/40 rounded transition-all cursor-pointer">
                    <span className="text-[10px] text-amber-300 block mb-1">N° 02</span>
                    <span className="font-bold text-sm block">MONOLITHIC DRAPERY</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-zinc-400 font-light">Basalt Chalk Silhouettes</span>
                  </li>
                  <li className="p-3 bg-white/5 border border-white/5 hover:border-amber-300/40 rounded transition-all cursor-pointer">
                    <span className="text-[10px] text-amber-300 block mb-1">N° 03</span>
                    <span className="font-bold text-sm block">SOLARIS SILK</span>
                    <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-zinc-400 font-light">Amber Vermeil Weaves</span>
                  </li>
                </ul>
              </div>

              <div className="font-mono text-[10px] text-zinc-600">
                ACTIVE SHOWROOM: 2026 / 2027
              </div>
            </div>

            {/* Column 3: Private Ateliers */}
            <div
              style={{
                transitionDelay: isOpen ? `${2 * staggerInterval}ms` : '0ms',
                transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
              }}
              className="p-8 bg-[#0b0b10] border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              <div>
                <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.3em] text-amber-300/80 block mb-6">
                  [03] // ATELIERS
                </span>
                <h3 className="font-['Cinzel'] text-2xl font-bold uppercase tracking-wider text-white mb-4">
                  Private Salons
                </h3>
                <div className="space-y-2">
                  {ateliers.map((at, idx) => (
                    <div
                      key={at.city}
                      onMouseEnter={() => handleHoverAtelier(idx)}
                      className={`p-2.5 rounded transition-all cursor-pointer ${
                        selectedAtelier === idx
                          ? 'bg-amber-300/10 border border-amber-300/40 text-amber-200'
                          : 'hover:bg-white/5 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center justify-between font-['Cinzel'] text-xs font-bold">
                        <span>{at.name}</span>
                        <span>{at.city}</span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-500 block mt-0.5">
                        {at.address}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atelier Live Preview Box */}
              <div className="p-3 bg-white/5 rounded border border-white/10 font-mono text-[10px] text-zinc-400">
                <span className="text-amber-300 font-bold block mb-1">
                  CURRENT ATELIER FOCUS:
                </span>
                <span>{ateliers[selectedAtelier].preview}</span>
              </div>
            </div>

            {/* Column 4: Confidential Concierge & Close */}
            <div
              style={{
                transitionDelay: isOpen ? `${3 * staggerInterval}ms` : '0ms',
                transform: isOpen ? 'translateY(0%)' : 'translateY(-100%)',
              }}
              className="p-8 bg-[#0d0d12] flex flex-col justify-between transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-['Cinzel'] text-[11px] uppercase tracking-[0.3em] text-amber-300/80">
                    [04] // CONCIERGE
                  </span>
                  <button
                    onClick={toggleMenu}
                    className="w-8 h-8 rounded-full border border-white/20 hover:border-amber-300 flex items-center justify-center text-zinc-300 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="font-['Cinzel'] text-2xl font-bold uppercase tracking-wider text-white mb-4">
                  Bespoke Inquiries
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-xs text-zinc-400 leading-relaxed font-light mb-6">
                  Appointments are strictly arranged by private referral. Contact our Paris headquarters directly.
                </p>

                <div className="space-y-3 font-mono text-xs text-zinc-300">
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-zinc-500 block text-[10px]">PRIVATE LINE:</span>
                    <span className="text-amber-200 font-bold">+33 1 42 68 00 00</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded border border-white/5">
                    <span className="text-zinc-500 block text-[10px]">CORRESPONDENCE:</span>
                    <span className="text-amber-200">concierge@maison-aurelia.com</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => soundFx.playChime(800, 0.3)}
                className="w-full py-3.5 rounded-full bg-amber-300 hover:bg-amber-200 text-black font-['Cinzel'] text-xs uppercase tracking-[0.2em] font-bold transition-all shadow-lg"
                data-cursor="hover"
              >
                Request Private Salon
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
