import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Sliders, BookOpen, Compass, Eye, Shield, Feather } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v04_luxuryeditorialligature',
  name: 'Haute Couture Museum Editorial & Illuminated Drop-Cap Atelier',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Cinzel Roman Display', 'Gold Leaf Foil Caustics', 'Illuminated Drop-Caps', 'Editorial Kerning Lab'],
  aestheticVibe: 'Luxury Editorial / Haute Couture Atelier',
  interactionBlueprint: 'Museum-grade editorial spread featuring gilded illuminated drop-cap initials, dynamic letter-spacing (kerning & tracking) meters, vermeil gold leaf caustics with rotating angle gradients, and bespoke Roman serif typography.',
  description: 'Haute couture editorial typography atelier pairing Cinzel Roman display headings with golden leaf foil caustics, illuminated illuminated capital drop-caps, and micro-precision tracking controls.',
  codeSnippet: `// Illuminated gold leaf foil gradient angle
const foilAngle = \`\${angle}deg\`;
const goldGradient = \`linear-gradient(\${foilAngle}, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)\`;
dropCap.style.backgroundImage = goldGradient;`,
  tags: ['Typography', 'Luxury', 'Editorial', 'Cinzel', 'Gold Foil', 'Drop-Cap', 'Haute Couture'],
};

const DROP_CAPS = ['L', 'A', 'V', 'Q', 'M'];

export default function TypographyLuxuryEditorialLigature() {
  const [activeDropCap, setActiveDropCap] = useState<string>('L');
  const [trackingOffset, setTrackingOffset] = useState<number>(0.18); // 0.05 to 0.45em
  const [lineHeightRatio, setLineHeightRatio] = useState<number>(1.75); // 1.3 to 2.2
  const [foilAngle, setFoilAngle] = useState<number>(45); // 0 to 360 deg
  const [themeMode, setThemeMode] = useState<'OBSIDIAN_GOLD' | 'PARCHMENT_VERMEIL'>('OBSIDIAN_GOLD');

  const isDark = themeMode === 'OBSIDIAN_GOLD';

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        className={`w-full rounded-2xl border transition-all duration-300 overflow-hidden ${
          isDark
            ? 'bg-[#060608] text-[#e8e4dc] border-amber-500/25 shadow-2xl'
            : 'bg-[#faf8f4] text-[#1c1917] border-amber-900/15 shadow-xl'
        }`}
      >
        {/* Editorial Layout Canvas */}
        <div className="relative p-6 sm:p-10 md:p-14 overflow-hidden">
          {/* Subtle Atelier Watermark */}
          <div className="absolute top-6 right-8 opacity-20 pointer-events-none text-right font-['Cinzel']">
            <span className="text-xs uppercase tracking-[0.4em] block">ÉDITION PRIVÉE</span>
            <span className="text-[10px] tracking-widest block text-amber-400">N° 084 // MMXXVI</span>
          </div>

          {/* Top Folio Header */}
          <div className="flex items-center justify-between border-b border-amber-500/20 pb-4 mb-8 text-[11px] font-mono tracking-widest uppercase text-amber-500/70">
            <div className="flex items-center gap-2">
              <Feather className="w-3.5 h-3.5 text-amber-400" />
              <span>SALON TYPOGRAPHIQUE // BESPOKE SERIF</span>
            </div>
            <div className="flex items-center gap-6">
              <span>TRACKING: +{(trackingOffset * 100).toFixed(0)}%</span>
              <span className="hidden sm:inline">ANGLE: {foilAngle}°</span>
              <span className="hidden md:inline">CINZEL ROMAN</span>
            </div>
          </div>

          {/* Headline Section */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-amber-400/80 block mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3 text-amber-400" /> VOL. IX &bull; RECHERCHE SUR LA FORME
            </span>

            <h1
              style={{
                letterSpacing: `${trackingOffset}em`,
                lineHeight: 1.15,
              }}
              className="font-['Cinzel'] text-3xl sm:text-5xl md:text-6xl font-black uppercase transition-all duration-150"
            >
              L’Élégance de la{' '}
              <span
                style={{
                  backgroundImage: `linear-gradient(${foilAngle}deg, #bf953f 0%, #fcf6ba 28%, #b38728 50%, #fbf5b7 72%, #aa771c 100%)`,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
                className="inline-block transition-all"
              >
                Structure
              </span>
            </h1>

            <p className="mt-3 font-serif italic text-sm sm:text-base opacity-75 max-w-xl">
              &ldquo;Typography is the architecture of thought made visible through golden geometry and serene proportions.&rdquo;
            </p>
          </div>

          {/* Editorial Double Columns with Illuminated Drop Cap */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-sm sm:text-base leading-relaxed">
            {/* Column 1 with Illuminated Drop Cap */}
            <div className="relative">
              {/* Massive Illuminated Drop Cap */}
              <div
                style={{
                  backgroundImage: `linear-gradient(${foilAngle}deg, #bf953f 0%, #fcf6ba 25%, #b38728 50%, #fbf5b7 75%, #aa771c 100%)`,
                }}
                className="float-left mr-4 mb-2 w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center font-['Cinzel'] text-4xl sm:text-5xl font-black text-black shadow-lg border border-amber-300/40 select-none group cursor-pointer"
                onClick={() => {
                  soundFx.playChime(1100, 0.3);
                  setFoilAngle((prev) => (prev + 45) % 360);
                }}
                title="Click to rotate gold leaf foil caustics"
              >
                <span className="drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                  {activeDropCap}
                </span>
              </div>

              <p
                style={{
                  lineHeight: lineHeightRatio,
                  letterSpacing: `${trackingOffset * 0.25}em`,
                }}
                className="font-serif opacity-90 text-justify"
              >
                a composition typographique dans les maisons de haute couture ne relève pas du simple arrangement textuel; c&rsquo;est un rituel horloger. Chaque empattement porte le poids d&rsquo;une tradition séculaire, tandis que les ligatures unissent deux phonèmes en un geste graphique indivisible.
              </p>

              <p
                style={{
                  lineHeight: lineHeightRatio,
                  letterSpacing: `${trackingOffset * 0.25}em`,
                }}
                className="font-serif opacity-80 mt-4 text-justify"
              >
                L&rsquo;or repoussé capte la lumière sous une incidence variable, révélant des caustiques subtiles qui animent la page d&rsquo;une vibration presque organique.
              </p>
            </div>

            {/* Column 2 */}
            <div className="relative border-t md:border-t-0 md:border-l border-amber-500/20 pt-6 md:pt-0 md:pl-8 flex flex-col justify-between">
              <div>
                <h3 className="font-['Cinzel'] text-base uppercase tracking-widest text-amber-400 font-bold mb-3">
                  // Des Proportions Dorées
                </h3>
                <p
                  style={{
                    lineHeight: lineHeightRatio,
                    letterSpacing: `${trackingOffset * 0.25}em`,
                  }}
                  className="font-serif opacity-80 text-justify"
                >
                  Le rapport parfait entre le blanc tournant et la colonne imprimée préserve le calme visuel du lecteur. Le regard glisse sans heurt d&rsquo;un glyphe à l&rsquo;autre, porté par un rythme qui rappelle la cadence d&rsquo;un pendule astronomique.
                </p>
              </div>

              {/* Bespoke Signature Monogram Box */}
              <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between text-xs font-mono opacity-60">
                <span>ATELIER DE TYPOGRAPHIE</span>
                <span>PARIS // GENÈVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Tuning Suite */}
        <div
          className={`p-5 border-t ${
            isDark ? 'bg-[#09090c] border-amber-500/20' : 'bg-[#f4efe6] border-amber-900/15'
          } flex flex-col gap-4 font-mono text-xs`}
        >
          {/* Drop Cap Selector */}
          <div>
            <span className="text-amber-500/80 uppercase tracking-widest text-[11px] block mb-2">
              Select Illuminated Initial Initial:
            </span>
            <div className="flex items-center gap-2">
              {DROP_CAPS.map((cap) => (
                <button
                  key={cap}
                  onClick={() => {
                    soundFx.playChime(800 + cap.charCodeAt(0) * 4);
                    setActiveDropCap(cap);
                  }}
                  className={`w-10 h-10 rounded font-['Cinzel'] font-bold text-base border transition-all ${
                    activeDropCap === cap
                      ? 'bg-amber-400 text-black border-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.4)] scale-105'
                      : 'bg-black/20 text-zinc-400 border-white/10 hover:text-white'
                  }`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* Tracking (Letter-Spacing) */}
            <div className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>KERNING / TRACKING:</span>
                <span className="text-amber-400 font-bold">+{(trackingOffset * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.45"
                step="0.02"
                value={trackingOffset}
                onChange={(e) => {
                  soundFx.playTick(1100);
                  setTrackingOffset(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Line Height */}
            <div className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>LINE HEIGHT:</span>
                <span className="text-amber-400 font-bold">{lineHeightRatio.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="1.3"
                max="2.2"
                step="0.05"
                value={lineHeightRatio}
                onChange={(e) => {
                  soundFx.playTick(900);
                  setLineHeightRatio(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Gold Foil Angle */}
            <div className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span>GOLD FOIL LIGHT:</span>
                <span className="text-amber-400 font-bold">{foilAngle}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                step="15"
                value={foilAngle}
                onChange={(e) => {
                  soundFx.playTick(750);
                  setFoilAngle(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Atmosphere Mode */}
            <div className="p-3 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="mb-2">ATELIER THEME:</span>
              <button
                onClick={() => {
                  soundFx.playClick(850);
                  setThemeMode(isDark ? 'PARCHMENT_VERMEIL' : 'OBSIDIAN_GOLD');
                }}
                className="py-1.5 rounded font-bold uppercase border bg-amber-400/20 text-amber-300 border-amber-400/50 hover:bg-amber-400 hover:text-black transition-colors"
              >
                {isDark ? 'PARCHMENT (LIGHT)' : 'OBSIDIAN (DARK)'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
