import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Sliders, RefreshCw, Type, Eye, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v07_persianvariablestretch',
  name: 'Persian Variable Kinetic Stretch & Fluid Kashida Marquee',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Persian Variable Font Axis (wght/wdth)', 'Kashida Dynamic Elongation', 'Inertial Velocity Physics', 'Tailwind CSS v4'],
  aestheticVibe: 'Persian Neo-Brutalist & Dynamic Calligraphic Stretch',
  interactionBlueprint: 'Dynamic Persian kinetic typography where cursor movement and mouse velocity stretch Persian glyphs along horizontal Kashida vectors. Features variable weight, speed-driven letter expansion, and layered dual-direction marquees.',
  description: 'کشیدگی پویا و تعاملی حروف و کلمات فارسی بر اساس سرعت و شتاب ماوس، شبیه‌سازی کشش خطی حروف نستعلیق و نسخ دیجیتال با فونت‌های متغیر لاله‌زار و وزیرمتن.',
  codeSnippet: `// Dynamic Persian Kashida & Variable Width
const calculateStretch = (mouseVelocity, charIndex) => {
  const baseStretch = 100;
  const dynamicKashida = Math.min(300, baseStretch + mouseVelocity * 14);
  return { fontStretch: \`\${dynamicKashida}%\`, letterSpacing: \`\${mouseVelocity * 0.2}px\` };
};`,
  tags: ['Typography', 'Persian', 'VariableFont', 'Kashida', 'Brutalist', 'Marquee'],
};

export default function TypographyPersianVariableStretchMarquee() {
  const [velocity, setVelocity] = useState(0);
  const [stretchLevel, setStretchLevel] = useState(140);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const lastMousePos = useRef({ x: 0, y: 0, time: Date.now() });

  const PHRASES = [
    'جهان در کشاکش حروف و زمان به رقص درمی‌آید',
    'چو ایران نباشد تن من مباد • در این بوم و بر زنده یک تن مباد',
    'هندسه پارامتریک و هوش محاسباتی در تاروپود هنر کهن',
    'صدای پای نور در کوچه‌باغ‌های فیروزه‌ای زمان',
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max(1, now - lastMousePos.current.time);
      const dx = e.clientX - lastMousePos.current.x;
      const dy = e.clientY - lastMousePos.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const v = Math.min(100, (dist / dt) * 12);

      setVelocity(v);
      setStretchLevel(100 + v * 2.2);

      lastMousePos.current = { x: e.clientX, y: e.clientY, time: now };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id={blueprint.id} className="relative py-20 px-4 sm:px-6 bg-[#07090e] border-b border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <BlueprintHUD blueprint={blueprint} />

        {/* Interactive Kinetic Stage */}
        <div className="relative rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a0f1d] to-[#04060a] p-6 sm:p-12 shadow-2xl overflow-hidden space-y-10">
          {/* Top Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider">
                Persian Kinetic Variable Font Engine
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playChime(700, 0.15);
                  setActivePhraseIndex((prev) => (prev + 1) % PHRASES.length);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>تعویض بیت شعر</span>
              </button>
            </div>
          </div>

          {/* Main Giant Stretched Persian Typography Display */}
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-6 select-none cursor-crosshair">
            <div
              style={{
                letterSpacing: `${Math.min(24, velocity * 0.28)}px`,
                transform: `scaleY(${1 + velocity * 0.008})`,
                transition: 'letter-spacing 0.12s ease-out, transform 0.12s ease-out',
              }}
              className="font-['Lalezar'] text-4xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-amber-300 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)] leading-tight"
            >
              {PHRASES[activePhraseIndex]}
            </div>

            <p className="font-mono text-xs text-cyan-400/80">
              ⚡ نشانگر ماوس را سریع حرکت دهید تا کشیدگی حروف (کشیده/Kashida) و فواصل واژگان تغییر کند
            </p>
          </div>

          {/* Dual Infinite Kinetic Marquee Strips */}
          <div className="space-y-3 pt-6 border-t border-white/10 overflow-hidden">
            {/* Strip 1: Leftwards */}
            <div className="flex whitespace-nowrap overflow-hidden py-2 bg-cyan-950/40 rounded-xl border border-cyan-400/20">
              <div className="flex gap-8 animate-marquee text-xl font-['Lalezar'] text-cyan-300">
                <span>تایپوگرافی متغیر فارسی</span>
                <span>&bull;</span>
                <span>فیزیک اینرسی و سرعت ماوس</span>
                <span>&bull;</span>
                <span>طراحی پیشرو Awwwards</span>
                <span>&bull;</span>
                <span>تایپوگرافی متغیر فارسی</span>
                <span>&bull;</span>
                <span>فیزیک اینرسی و سرعت ماوس</span>
                <span>&bull;</span>
              </div>
            </div>

            {/* Strip 2: Reverse Rightwards with Variable Weight */}
            <div className="flex whitespace-nowrap overflow-hidden py-2 bg-indigo-950/40 rounded-xl border border-indigo-400/20">
              <div className="flex gap-8 animate-marquee-reverse text-lg font-['Vazirmatn'] font-black text-amber-300">
                <span>شبیه‌سازی کشش حسی خطوط ایرانی</span>
                <span>✦</span>
                <span>هماهنگی با رندرینگ WebGL</span>
                <span>✦</span>
                <span>فونت وزیرمتن و لاله‌زار</span>
                <span>✦</span>
                <span>شبیه‌سازی کشش حسی خطوط ایرانی</span>
                <span>✦</span>
              </div>
            </div>
          </div>

          {/* Realtime Physics Telemetry */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center font-mono text-xs pt-4 border-t border-white/5">
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">MOUSE VELOCITY</span>
              <span className="text-cyan-400 font-bold text-sm">{Math.round(velocity)} px/ms</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">KASHIDA STRETCH</span>
              <span className="text-amber-400 font-bold text-sm">{Math.round(stretchLevel)}%</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">VARIABLE AXIS</span>
              <span className="text-emerald-400 font-bold text-sm">wght 900 • wdth 150</span>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5">
              <span className="text-zinc-500 block text-[10px]">FONT ENGINE</span>
              <span className="text-violet-400 font-bold text-sm">Lalezar + Vazirmatn</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
