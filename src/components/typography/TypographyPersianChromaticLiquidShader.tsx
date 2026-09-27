import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, RefreshCw, Eye, Waves, Compass, Sliders } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v08_persianchromaticliquid',
  name: 'Persian Chromatic Liquid Refraction & Calligraphic Distortion Shader',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'WebGL-Style 2D Canvas Shader', 'RGB Chromatic Aberration', 'Liquid Viscosity Field', 'Persian Poetic Typography'],
  aestheticVibe: 'Persian Fluid Modernism & Chromatic Lens Dispersion',
  interactionBlueprint: 'Interactive fluid refraction ripples over ancient Persian poetry (Hafez & Rumi). Cursor creates visceral liquid waves that split Persian typography into chromatic red, green, and blue spectral caustics.',
  description: 'امواج شکست نور کروماتیک مایع بر روی غزلیات حافظ و مولانا با تجزیه طیف رنگی RGB، غوطه‌وری ذرات جوهر در مایع و تعامل زنده با حرکت نشانگر ماوس.',
  codeSnippet: `// Chromatic Dispersion on Persian Calligraphy
const renderLiquidChromatic = (ctx, text, time, mouseX, mouseY) => {
  const wave = Math.sin(time * 2.0 + y * 0.05) * 8.0;
  // Red channel offset
  ctx.fillStyle = 'rgba(255, 60, 100, 0.7)';
  ctx.fillText(text, x + wave + 4, y);
  // Cyan channel offset
  ctx.fillStyle = 'rgba(40, 220, 255, 0.7)';
  ctx.fillText(text, x - wave - 4, y);
};`,
  tags: ['Typography', 'Persian', 'Liquid', 'Chromatic', 'Shader', 'Refraction'],
};

export default function TypographyPersianChromaticLiquidShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoemIdx, setSelectedPoemIdx] = useState(0);
  const [dispersionIntensity, setDispersionIntensity] = useState(12);

  const POEMS = [
    { title: 'غزل حافظ شیرازی', verse1: 'در ازل پرتو حسنت ز تجلی دم زد', verse2: 'عشق پیدا شد و آتش به همه عالم زد' },
    { title: 'مولانا جلال‌الدین', verse1: 'بشنو این نی چون شکایت می‌کند', verse2: 'از جدایی‌ها حکایت می‌کند' },
    { title: 'خیام نیشابوری', verse1: 'این قافله عمر عجب می‌گذرد', verse2: 'دریاب دمی که با طرب می‌گذرد' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 360);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 360;
    };
    window.addEventListener('resize', handleResize);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const render = () => {
      time += 0.025;
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Liquid background ripple
      const bgGrad = ctx.createRadialGradient(mouseX, mouseY, 10, width / 2, height / 2, width * 0.6);
      bgGrad.addColorStop(0, 'rgba(16, 28, 48, 0.8)');
      bgGrad.addColorStop(1, 'rgba(4, 6, 10, 0.95)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const activePoem = POEMS[selectedPoemIdx];

      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Wave calculation
      const waveOffset = Math.sin(time * 1.5) * (dispersionIntensity * 0.5);
      const mouseDist = Math.hypot(mouseX - width / 2, mouseY - height / 2);
      const interactiveOffset = Math.max(0, 1 - mouseDist / 300) * dispersionIntensity;

      // Line 1: Verse 1
      const y1 = height * 0.4;
      const y2 = height * 0.65;

      const renderChromaticText = (text: string, yPos: number, fontSize: number) => {
        ctx.font = `bold ${fontSize}px 'Lalezar', 'Vazirmatn', sans-serif`;

        // Channel 1: Red Spectrum
        ctx.fillStyle = 'rgba(244, 63, 94, 0.65)';
        ctx.fillText(text, width / 2 + waveOffset + interactiveOffset, yPos - interactiveOffset * 0.5);

        // Channel 2: Cyan Spectrum
        ctx.fillStyle = 'rgba(56, 189, 248, 0.65)';
        ctx.fillText(text, width / 2 - waveOffset - interactiveOffset, yPos + interactiveOffset * 0.5);

        // Channel 3: Pure White Center Core with Glow
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
        ctx.shadowBlur = 15;
        ctx.fillText(text, width / 2, yPos);
        ctx.shadowBlur = 0;
      };

      const baseSize = width < 640 ? 28 : 46;
      renderChromaticText(activePoem.verse1, y1, baseSize);
      renderChromaticText(activePoem.verse2, y2, baseSize * 0.9);

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedPoemIdx, dispersionIntensity]);

  return (
    <section id={blueprint.id} className="relative py-20 px-4 sm:px-6 bg-[#05070c] border-b border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <BlueprintHUD blueprint={blueprint} />

        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#090e1a] to-[#040609] p-6 sm:p-10 shadow-2xl space-y-6">
          {/* Header controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Waves className="w-4 h-4 text-cyan-400" />
              <h3 className="font-['Syne'] font-bold text-lg text-white">
                انکسار کروماتیک مایع و ابیات کهن
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-xl border border-white/10 font-mono text-xs">
                <span className="text-zinc-400">شدت انکسار:</span>
                <input
                  type="range"
                  min="4"
                  max="28"
                  value={dispersionIntensity}
                  onChange={(e) => setDispersionIntensity(Number(e.target.value))}
                  className="w-24 h-1.5 accent-cyan-400 cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  soundFx.playClick(750);
                  setSelectedPoemIdx((prev) => (prev + 1) % POEMS.length);
                }}
                className="px-4 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5 border border-cyan-400/30"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>شاعر بعدی: {POEMS[(selectedPoemIdx + 1) % POEMS.length].title}</span>
              </button>
            </div>
          </div>

          {/* Interactive Canvas Container */}
          <div className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-white/10 shadow-inner cursor-pointer">
            <canvas ref={canvasRef} className="w-full h-full" />
            <div className="absolute bottom-3 left-4 font-mono text-[10px] text-cyan-400/80 pointer-events-none bg-black/60 px-3 py-1 rounded-full border border-white/10">
              ماوس را روی بوم حرکت دهید تا امواج شکست مایع ایجاد شود
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
