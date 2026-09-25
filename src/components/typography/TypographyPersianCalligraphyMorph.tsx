import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Sliders, RefreshCw, Layers, Eye, Compass, Type, Flame } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v06_persiancalligraphymorph',
  name: 'Persian Kinetic Calligraphy & Modern Siah-Mashq Fluid Mesh',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Persian Variable Glyph Engine', 'Siah-Mashq Canvas Dynamics', 'Liquid Mesh Distortion', 'Interactive Calligraphy Physics'],
  aestheticVibe: 'Persian Calligraphy Modernism & Liquid Typography',
  interactionBlueprint: 'Interactive Persian calligraphy engine blending historic Nastaliq & Siah-Mashq gestures with modern kinetic liquid typography. Mouse interaction creates fluid ink dispersion, variable stretch curvature, and rhythmic glyph layering.',
  description: 'خوشنویسی مدرن فارسی و سیاه‌مشق جنبشی با شبیه‌سازی کشش حسی دوات و مرکب، فونت‌های متغیر نستعلیق دیجیتال، و فیزیک مایع ذرات جوهر در پرسپکتیو فضایی.',
  codeSnippet: `// Siah-Mashq kinetic calligraphy flow
const renderSiahMashq = (ctx, phrase, time, mouseX, mouseY) => {
  phrase.split('').forEach((char, i) => {
    const angle = Math.sin(time + i * 0.4) * 0.25;
    const stretch = 1 + Math.abs(Math.sin(time * 0.8 + i));
    ctx.font = \`\${stretch * 48}px Vazirmatn, serif\`;
    ctx.fillText(char, x + Math.cos(angle) * 30, y);
  });
};`,
  tags: ['Typography', 'Persian', 'Calligraphy', 'Siah-Mashq', 'Fluid', 'Kinetic', 'Nastaliq'],
};

const PERSIAN_PHRASES = [
  {
    title: 'رقص حروف و خیال',
    subtitle: 'Dance of Glyphs and Digital Imagination',
    quote: 'در کرانه نامتناهی کلمات، هر حرف آغاز کهکشانی از نور و هنر است.',
    glyphs: ['الف', 'نون', 'قاف', 'واو', 'میم', 'سین', 'ه‍', 'ی'],
  },
  {
    title: 'آورا: معماری نور و کروماتیک',
    subtitle: 'Aura: Architecture of Chromatic Light',
    quote: 'آفرینش پیوند میان شکوه سنت خط ایرانی و پردازش موازی سیلیکون.',
    glyphs: ['عشق', 'هنر', 'رویا', 'هوش', 'سیلیکون', 'جهان'],
  },
  {
    title: 'سیاه‌مشق زمان و حرکت',
    subtitle: 'Dynamic Rhythmic Siah-Mashq Overlap',
    quote: 'تکرار شکوهمند فرم‌ها در همپوشانی ابدی معنا و ریتم بصری.',
    glyphs: ['هو', 'حق', 'نور', 'شوق', 'ساز', 'راز'],
  },
];

export default function TypographyPersianCalligraphyMorph() {
  const [activePhraseIdx, setActivePhraseIdx] = useState(0);
  const [stretchFactor, setStretchFactor] = useState(1.4);
  const [inkDiffusion, setInkDiffusion] = useState(0.6);
  const [colorMode, setColorMode] = useState<'GOLD_OBSIDIAN' | 'CYAN_NEON' | 'RUBY_VELVET'>('GOLD_OBSIDIAN');
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activePhrase = PERSIAN_PHRASES[activePhraseIdx];

  // Canvas Siah-Mashq dynamic ink simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Gradient background
      const bgGrad = ctx.createRadialGradient(
        width * mousePos.x,
        height * mousePos.y,
        10,
        width / 2,
        height / 2,
        width * 0.7
      );
      if (colorMode === 'GOLD_OBSIDIAN') {
        bgGrad.addColorStop(0, 'rgba(217, 119, 6, 0.15)');
        bgGrad.addColorStop(1, 'rgba(7, 9, 14, 0.95)');
      } else if (colorMode === 'CYAN_NEON') {
        bgGrad.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
        bgGrad.addColorStop(1, 'rgba(7, 9, 14, 0.95)');
      } else {
        bgGrad.addColorStop(0, 'rgba(244, 63, 94, 0.15)');
        bgGrad.addColorStop(1, 'rgba(7, 9, 14, 0.95)');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render overlapping Siah-Mashq layers
      const count = 18;
      const primaryColor =
        colorMode === 'GOLD_OBSIDIAN'
          ? 'rgba(245, 158, 11, '
          : colorMode === 'CYAN_NEON'
          ? 'rgba(56, 189, 248, '
          : 'rgba(251, 113, 133, ';

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (let layer = 0; layer < count; layer++) {
        const progress = layer / count;
        const layerTime = time + progress * 2.5;
        const xOffset = Math.sin(layerTime * 0.7) * (width * 0.28 * inkDiffusion);
        const yOffset = Math.cos(layerTime * 0.5) * (height * 0.2 * inkDiffusion);
        const rotation = Math.sin(layerTime * 0.4 + layer) * 0.22;
        const scale = (0.7 + Math.sin(layerTime + layer) * 0.3) * stretchFactor;

        ctx.save();
        ctx.translate(width / 2 + xOffset, height / 2 + yOffset);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);

        const alpha = Math.max(0.04, 0.35 - progress * 0.28);
        ctx.fillStyle = `${primaryColor}${alpha})`;
        ctx.font = `${Math.round(42 * scale)}px 'Vazirmatn', 'Syne', serif`;

        const glyphToRender = activePhrase.glyphs[layer % activePhrase.glyphs.length];
        ctx.fillText(glyphToRender, 0, 0);

        // Stroke outline for delicate metallic ink nib effect
        if (layer % 3 === 0) {
          ctx.strokeStyle = `${primaryColor}${alpha * 1.5})`;
          ctx.lineWidth = 1;
          ctx.strokeText(glyphToRender, 0, 0);
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activePhraseIdx, stretchFactor, inkDiffusion, colorMode, mousePos]);

  return (
    <div className="space-y-6">
      <BlueprintHUD blueprint={blueprint} />

      <div className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#0c0f17] to-[#06080d] shadow-2xl relative overflow-hidden">
        {/* Controls Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-['Syne'] font-black text-xl text-white">
                تایپوگرافی کینتیک و سیاه‌مشق تعاملی فارسی
              </h3>
            </div>
            <span className="font-mono text-xs text-amber-400 block mt-0.5">
              PERSIA KINETIC GLYPH MORPH &amp; SIAH-MASHQ ENGINE
            </span>
          </div>

          {/* Color Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/60 border border-white/10">
            {[
              { id: 'GOLD_OBSIDIAN', label: 'طلایی و کهربا', color: 'bg-amber-400' },
              { id: 'CYAN_NEON', label: 'سایان نئون', color: 'bg-cyan-400' },
              { id: 'RUBY_VELVET', label: 'یاقوتی سرخ', color: 'bg-rose-500' },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  soundFx.playTick(900);
                  setColorMode(mode.id as any);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  colorMode === mode.id ? 'bg-white/15 text-white shadow-sm' : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full ${mode.color}`} />
                <span>{mode.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Phrase Selector Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-3 relative z-10">
          {PERSIAN_PHRASES.map((phrase, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundFx.playClick(700);
                setActivePhraseIdx(idx);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activePhraseIdx === idx
                  ? 'bg-amber-400 text-black shadow-lg shadow-amber-500/30'
                  : 'bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {phrase.title}
            </button>
          ))}
        </div>

        {/* Interactive Canvas Area */}
        <div
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setMousePos({
              x: (e.clientX - rect.left) / rect.width,
              y: (e.clientY - rect.top) / rect.height,
            });
          }}
          className="relative min-h-[380px] sm:min-h-[440px] my-6 rounded-2xl border border-white/10 overflow-hidden flex items-center justify-center cursor-crosshair group"
        >
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Central Hero Typography Overlay */}
          <div className="relative z-10 text-center space-y-3 px-6 select-none pointer-events-none backdrop-blur-[2px] p-6 rounded-3xl">
            <h1
              style={{
                letterSpacing: `${(stretchFactor - 1) * 8}px`,
                transform: `scaleY(${stretchFactor})`,
              }}
              className="font-['Syne'] font-black text-4xl sm:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-400 drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] transition-all duration-300"
            >
              {activePhrase.title}
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300/90 font-light max-w-lg mx-auto">
              «{activePhrase.quote}»
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {activePhrase.glyphs.map((g, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-black/60 border border-amber-400/30 text-amber-300 font-mono text-xs font-bold"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Sliders Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-2xl bg-black/50 border border-white/10 relative z-10 text-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between font-mono">
              <span className="text-zinc-400">کشش عمودی قلم (Stretch Factor):</span>
              <span className="text-amber-400 font-bold">{stretchFactor.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="2.2"
              step="0.05"
              value={stretchFactor}
              onChange={(e) => setStretchFactor(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between font-mono">
              <span className="text-zinc-400">پراکندگی و نفوذ جوهر در سیاه‌مشق (Diffusion):</span>
              <span className="text-amber-400 font-bold">{Math.round(inkDiffusion * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.2"
              max="1.5"
              step="0.05"
              value={inkDiffusion}
              onChange={(e) => setInkDiffusion(Number(e.target.value))}
              className="w-full accent-amber-400 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
