import React, { useState, useRef, useEffect } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sliders, RefreshCw, Zap, ArrowRight, CornerDownRight, Square, Maximize2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v02_brutalistvariablestretch',
  name: 'Neo-Brutalist Dynamic Letter-Stretch & Mouse Proximity Matrix',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Dynamic Transform Matrix', 'Euclidean Proximity Physics', 'Variable Font Weight & Stretch', 'Ticker Velocity'],
  aestheticVibe: 'Kinetic Typography / Neo-Brutalist Raw Ledger',
  interactionBlueprint: 'Interactive matrix where individual glyph blocks calculate Euclidean distance to cursor coordinates, dynamically stretching their horizontal aspect scale and skew angle. Features high-velocity marquee tickers and customizable typographic phrases.',
  description: 'Raw industrial typography laboratory modeling non-linear glyph deformation, dynamic weight inflation, ticker tape velocity ribbons, and tactile hardware audio clicks.',
  codeSnippet: `// Euclidean proximity stretch math
const dist = Math.hypot(cursorX - letterCenterX, cursorY - letterCenterY);
const stretch = 1 + Math.max(0, 1 - dist / radius) * maxStretch;
letterEl.style.transform = \`scaleX(\${stretch}) skewX(\${(1 - dist/radius) * skewAngle}deg)\`;`,
  tags: ['Typography', 'Brutalist', 'Proximity', 'Variable Font', 'Stretch', 'Kinetic'],
};

export default function TypographyBrutalistVariableStretch() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic parameters
  const [headline, setHeadline] = useState<string>('BRUTAL_RAW');
  const [secondaryWord, setSecondaryWord] = useState<string>('VARIABLE_PHYSICS');
  const [maxStretch, setMaxStretch] = useState<number>(2.4); // 1.2 to 4.0
  const [proximityRadius, setProximityRadius] = useState<number>(220); // 100 to 400
  const [skewIntensity, setSkewIntensity] = useState<number>(18); // 0 to 45 deg
  const [invertContrast, setInvertContrast] = useState<boolean>(false);

  // Mouse coords relative to container
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const characters = headline.split('');
  const subCharacters = secondaryWord.split('');

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        className={`w-full border-2 rounded-2xl overflow-hidden transition-colors ${
          invertContrast
            ? 'bg-[#e2e8f0] text-black border-black'
            : 'bg-[#0a0a0c] text-white border-white/20'
        }`}
      >
        {/* Interactive Typography Deformation Stage */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[460px] sm:h-[500px] flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden cursor-crosshair"
        >
          {/* Top Specification Header */}
          <div className="flex items-center justify-between border-b-2 border-current pb-3 font-mono text-xs uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-amber-400 border border-black inline-block animate-ping" />
              <span className="font-bold">PROXIMITY_DEFORM_ENGINE // V.09</span>
            </div>
            <div className="flex items-center gap-4">
              <span>RADIUS: {proximityRadius}PX</span>
              <span className="hidden sm:inline">STRETCH: {maxStretch.toFixed(1)}X</span>
              <span className="hidden md:inline">SKEW: {skewIntensity}°</span>
            </div>
          </div>

          {/* Primary Massive Glyph Stretch Block */}
          <div className="my-auto flex flex-col items-center justify-center gap-3 w-full overflow-hidden">
            {/* Main Word */}
            <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-2">
              {characters.map((char, i) => {
                // Approximate letter center (evenly distributed)
                const charX = ((i + 0.5) / characters.length) * 800;
                const charY = 200;
                const dist = Math.hypot(mousePos.x - charX, mousePos.y - charY);
                const proximityRatio = Math.max(0, 1 - dist / proximityRadius);
                const scaleX = 1 + proximityRatio * (maxStretch - 1);
                const skewX = (mousePos.x < charX ? -1 : 1) * proximityRatio * skewIntensity;
                const weight = Math.round(700 + proximityRatio * 250);

                return (
                  <span
                    key={i}
                    style={{
                      transform: `scaleX(${scaleX}) skewX(${skewX}deg)`,
                      fontWeight: weight,
                      transition: 'transform 70ms cubic-bezier(0.1, 0.9, 0.2, 1)',
                    }}
                    className={`inline-block font-mono text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter px-1 origin-center border-b-4 ${
                      proximityRatio > 0.3
                        ? 'border-amber-400 text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                        : 'border-transparent'
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            {/* Secondary Word with Inverse Skew */}
            <div className="flex items-center justify-center flex-wrap gap-1 sm:gap-1.5 opacity-80">
              {subCharacters.map((char, i) => {
                const charX = ((i + 0.5) / subCharacters.length) * 800;
                const charY = 280;
                const dist = Math.hypot(mousePos.x - charX, mousePos.y - charY);
                const proximityRatio = Math.max(0, 1 - dist / proximityRadius);
                const scaleY = 1 + proximityRatio * 0.8;
                const skewX = (mousePos.x < charX ? 1 : -1) * proximityRatio * (skewIntensity * 0.8);

                return (
                  <span
                    key={i}
                    style={{
                      transform: `scaleY(${scaleY}) skewX(${skewX}deg)`,
                      transition: 'transform 80ms cubic-bezier(0.1, 0.9, 0.2, 1)',
                    }}
                    className="inline-block font-mono text-2xl sm:text-3xl md:text-4xl tracking-tight px-0.5"
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Bottom Continuous Velocity Marquee Tape */}
          <div className="w-full border-t-2 border-current pt-3 flex items-center justify-between font-mono text-xs overflow-hidden whitespace-nowrap">
            <div className="flex items-center gap-6 animate-pulse">
              <span>[CURSOR_VECTOR_X: {mousePos.x > 0 ? Math.round(mousePos.x) : 'OFFLINE'}]</span>
              <span>[CURSOR_VECTOR_Y: {mousePos.y > 0 ? Math.round(mousePos.y) : 'OFFLINE'}]</span>
              <span className="hidden sm:inline">[STRETCH_RATIO: {maxStretch}X]</span>
              <span className="hidden md:inline">[ISO_NORM: RAW_NEO_BRUTALIST]</span>
            </div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-amber-400 bg-black px-2 py-0.5 border border-amber-400">
              PHYSICS LIVE
            </div>
          </div>
        </div>

        {/* Tactical Control Bar */}
        <div
          className={`p-5 border-t-2 ${
            invertContrast ? 'bg-zinc-200 border-black' : 'bg-[#101116] border-white/20'
          } flex flex-col gap-4`}
        >
          {/* Text Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider block mb-1 text-zinc-400">
                Primary String (Uppercase)
              </label>
              <input
                type="text"
                value={headline}
                onChange={(e) => setHeadline(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                maxLength={14}
                className="w-full bg-black/40 border border-white/20 rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider block mb-1 text-zinc-400">
                Secondary String (Uppercase)
              </label>
              <input
                type="text"
                value={secondaryWord}
                onChange={(e) => setSecondaryWord(e.target.value.toUpperCase().replace(/\s+/g, '_'))}
                maxLength={20}
                className="w-full bg-black/40 border border-white/20 rounded px-3 py-1.5 font-mono text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {/* Stretch Factor */}
            <div className="p-3 rounded bg-black/20 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>MAX STRETCH:</span>
                <span className="font-bold text-amber-400">{maxStretch.toFixed(1)}X</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="4.0"
                step="0.2"
                value={maxStretch}
                onChange={(e) => {
                  soundFx.playTick(1000);
                  setMaxStretch(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Proximity Radius */}
            <div className="p-3 rounded bg-black/20 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>PROXIMITY RADIUS:</span>
                <span className="font-bold text-amber-400">{proximityRadius}px</span>
              </div>
              <input
                type="range"
                min="100"
                max="400"
                step="20"
                value={proximityRadius}
                onChange={(e) => {
                  soundFx.playTick(800);
                  setProximityRadius(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Skew Intensity */}
            <div className="p-3 rounded bg-black/20 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span>SKEW ANGLE:</span>
                <span className="font-bold text-amber-400">{skewIntensity}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="45"
                step="3"
                value={skewIntensity}
                onChange={(e) => {
                  soundFx.playTick(600);
                  setSkewIntensity(Number(e.target.value));
                }}
                className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Invert Theme Toggle */}
            <div className="p-3 rounded bg-black/20 border border-white/10 flex flex-col justify-between">
              <span className="text-xs font-mono mb-2">CONTRAST MODE:</span>
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  setInvertContrast(!invertContrast);
                }}
                className={`py-1.5 text-xs font-mono font-bold rounded border uppercase transition-colors ${
                  invertContrast
                    ? 'bg-black text-white border-black'
                    : 'bg-amber-400 text-black border-amber-400 hover:bg-amber-300'
                }`}
              >
                {invertContrast ? 'LIGHT LEDGER' : 'DARK MONOSPACE'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
