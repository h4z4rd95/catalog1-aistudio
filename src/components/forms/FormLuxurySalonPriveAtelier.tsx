import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Calendar, Clock, Crown, Mail, ArrowRight, Check } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'form_v04_luxurysalonpriveatelier',
  name: 'Haute Couture Salon Privé Atelier Reservation & Concierge Dossier',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React 19', 'Roman Cinzel Display', 'Fabric Swatch Selector', 'Monogram Engraver', 'Harmonic Chime'],
  aestheticVibe: 'Luxury Editorial & Haute Couture',
  interactionBlueprint: 'Interactive bespoke appointment reservation with fabric swatch selector, gold foil monogram embossing preview, private date-time salon booking, and Florentine concierge seal.',
  description: 'Museum-grade editorial reservation dossier featuring tactile silk texture selections, live bespoke gold monogram stamping, and discreet concierge request handling.',
  codeSnippet: `// Bespoke Atelier Monogram Seal
const monogram = guestName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase();
<div className="font-['Cinzel'] tracking-[0.3em] text-amber-200">{monogram}</div>`,
  tags: ['Form', 'Luxury', 'Editorial', 'Atelier', 'Haute Couture', 'Reservation', 'Cinzel'],
};

export default function FormLuxurySalonPriveAtelier() {
  const [guestName, setGuestName] = useState('LADY ELEANOR DE VALOIS');
  const [email, setEmail] = useState('concierge@atelier-valois.paris');
  const [selectedCity, setSelectedCity] = useState<'PARIS' | 'MILANO' | 'GENÈVE' | 'TOKYO'>('PARIS');
  const [selectedFabric, setSelectedFabric] = useState<'OBSIDIAN_SILK' | 'VERMEIL_CASHMERE' | 'ALABASTER_SATIN'>('VERMEIL_CASHMERE');
  const [partySize, setPartySize] = useState<number>(2);
  const [appointmentDate, setAppointmentDate] = useState('2026-10-18');
  const [specialDirectives, setSpecialDirectives] = useState('Champagne Grand Cru reserve upon private salon arrival.');
  const [isReserved, setIsReserved] = useState(false);

  // Derived monogram initials
  const initials = guestName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)
    .toUpperCase();

  const fabrics = [
    { id: 'OBSIDIAN_SILK', name: 'Obsidian Mulberry Silk', color: 'from-zinc-900 to-zinc-950', border: 'border-zinc-700' },
    { id: 'VERMEIL_CASHMERE', name: 'Vermeil Gold Cashmere', color: 'from-amber-900/60 to-yellow-950', border: 'border-amber-500/50' },
    { id: 'ALABASTER_SATIN', name: 'Alabaster Duchesse Satin', color: 'from-stone-200 to-stone-400', border: 'border-stone-400', textDark: true },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(528, 0.4);
    setIsReserved(true);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative bg-[#070709] text-zinc-200">
        <div className="max-w-5xl mx-auto">
          {/* Top Luxury Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="flex items-center justify-center gap-2 text-amber-300/80 mb-2">
              <Crown className="w-4 h-4" />
              <span className="font-['Cinzel'] tracking-[0.25em] text-xs uppercase">
                SALON PRIVÉ &bull; BESPOKE COUTURE APPOINTMENT
              </span>
            </div>
            <h2 className="font-['Cinzel'] text-3xl sm:text-4xl text-amber-100 tracking-wide mb-3">
              Private Atelier Inquiry
            </h2>
            <p className="font-['Cinzel'] text-xs text-zinc-400 tracking-widest leading-relaxed">
              BY PRIVATE INVITATION &bull; FLORENTINE HERITAGE SALONS &bull; ANNO MMXXVI
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Monogram Card & Seal */}
            <div className="lg:col-span-5 bg-gradient-to-b from-zinc-900/90 to-black border border-amber-500/20 p-8 rounded-xl shadow-2xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

              {/* Bespoke Monogram Emblem */}
              <div className="w-24 h-24 rounded-full border border-amber-400/40 bg-gradient-to-tr from-amber-950/40 to-black flex items-center justify-center p-2 mb-4 shadow-[0_0_25px_rgba(245,158,11,0.15)]">
                <span className="font-['Cinzel'] text-2xl font-bold tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-400 drop-shadow">
                  {initials || 'AT'}
                </span>
              </div>

              <span className="font-['Cinzel'] text-xs uppercase tracking-[0.2em] text-amber-200 font-bold mb-1">
                {guestName || 'GUEST OF HONOUR'}
              </span>
              <span className="text-[10px] text-zinc-500 font-mono tracking-widest mb-6">
                SALON {selectedCity} // {partySize} GUESTS
              </span>

              {/* Selected Fabric Swatch Preview */}
              <div className="w-full border-t border-white/10 pt-4 text-left">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-2 tracking-widest">
                  CURATED TEXTILE SELECTION
                </span>
                <div className="flex items-center gap-3 p-3 rounded bg-white/5 border border-white/10">
                  <div
                    className={`w-10 h-10 rounded-md bg-gradient-to-br ${
                      fabrics.find((f) => f.id === selectedFabric)?.color
                    } border border-amber-400/30 shadow-inner`}
                  />
                  <div>
                    <span className="font-['Cinzel'] text-xs text-amber-100 block">
                      {fabrics.find((f) => f.id === selectedFabric)?.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      Artisanal weaving on 18th-century looms
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-mono text-zinc-500">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Florentine Seal Certified by Maître Tailleur</span>
              </div>
            </div>

            {/* Right Column: Atelier Form */}
            <div className="lg:col-span-7 bg-zinc-950/80 border border-white/10 p-6 sm:p-8 rounded-xl">
              {isReserved ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-400 flex items-center justify-center text-amber-300 mx-auto mb-4">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="font-['Cinzel'] text-2xl text-amber-100 mb-2">Reservation Inscribed</h3>
                  <p className="text-xs text-zinc-400 font-['Cinzel'] tracking-widest max-w-md mx-auto mb-6">
                    Our Maître d'Hôtel will contact your liaison privately with itinerary coordinates and private driver details.
                  </p>
                  <button
                    onClick={() => {
                      setIsReserved(false);
                      soundFx.playClick(600);
                    }}
                    className="px-6 py-2.5 rounded border border-amber-500/40 text-amber-200 font-['Cinzel'] text-xs uppercase tracking-widest hover:bg-amber-500/10 transition-colors"
                  >
                    Inscribe New Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Guest Name */}
                  <div>
                    <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-1.5">
                      Distinguished Guest Name
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => {
                        setGuestName(e.target.value.toUpperCase());
                        soundFx.playTick(600);
                      }}
                      placeholder="LADY / LORD / EXCELLENCY"
                      className="w-full bg-black/60 border border-white/15 rounded px-4 py-2.5 font-['Cinzel'] text-sm text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                      required
                    />
                  </div>

                  {/* Private Email & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-1.5">
                        Private Concierge Email
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="liaison@domain.luxury"
                        className="w-full bg-black/60 border border-white/15 rounded px-4 py-2.5 font-mono text-xs text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-1.5">
                        Salon Atelier City
                      </label>
                      <select
                        value={selectedCity}
                        onChange={(e) => {
                          setSelectedCity(e.target.value as any);
                          soundFx.playClick(700);
                        }}
                        className="w-full bg-black/60 border border-white/15 rounded px-4 py-2.5 font-['Cinzel'] text-xs text-amber-100 focus:outline-none focus:border-amber-400 transition-colors"
                      >
                        <option value="PARIS">PARIS (Rue Saint-Honoré)</option>
                        <option value="MILANO">MILANO (Via Montenapoleone)</option>
                        <option value="GENÈVE">GENÈVE (Rue du Rhône)</option>
                        <option value="TOKYO">TOKYO (Ginza Sanctuary)</option>
                      </select>
                    </div>
                  </div>

                  {/* Fabric Swatch Options */}
                  <div>
                    <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-2">
                      Primary Atelier Fabric Swatch
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {fabrics.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => {
                            setSelectedFabric(f.id as any);
                            soundFx.playClick(800);
                          }}
                          className={`p-3 rounded border text-left transition-all ${
                            selectedFabric === f.id
                              ? 'border-amber-400 bg-amber-950/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                              : 'border-white/10 hover:border-white/25 bg-black/40'
                          }`}
                        >
                          <div className={`w-full h-8 rounded mb-2 bg-gradient-to-r ${f.color} border ${f.border}`} />
                          <span className="font-['Cinzel'] text-[11px] text-zinc-300 block">
                            {f.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date & Guests */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 rounded px-4 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-['Cinzel'] text-xs uppercase text-amber-200/80 tracking-widest mb-1.5 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-400" />
                        Party Guests
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={6}
                        value={partySize}
                        onChange={(e) => setPartySize(Number(e.target.value))}
                        className="w-full bg-black/60 border border-white/15 rounded px-4 py-2 text-xs font-mono text-zinc-200 focus:outline-none focus:border-amber-400 transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Action */}
                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      className="px-8 py-3 rounded bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-black font-['Cinzel'] font-bold text-xs uppercase tracking-[0.2em] hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/20"
                    >
                      <span>Inscribe Atelier Reservation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
