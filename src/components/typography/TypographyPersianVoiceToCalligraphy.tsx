import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v06_voicetocalligraphy',
  name: 'Voice-to-Calligraphy Acoustical Siah-Mashq Engine',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['Web Audio API', 'AnalyserNode FFT', 'HTML5 2D Canvas', 'Persian Reed Pen Nib', 'Golden Leaf Shimmer'],
  aestheticVibe: 'Voice-to-Calligraphy Acoustical Siah-Mashq Engine',
  interactionBlueprint: 'Web Audio API AnalyserNode captures microphonic or synthesized frequency spectral energy. The instantaneous volume dynamically dictates the reed pen nib width (دانگ قلم), while pitch harmonics guide curvilinear Lissajous sweeps and golden leaf particulate emission.',
  description: 'موتور خطاطی و سیاه‌مشق صوتی با میکروفون زنده که دامنه و فرکانس صدا را به چرخش‌های قلم نی، تذهیب طلا و اشعار کهن فارسی پیوند می‌زند.',
  codeSnippet: `// Audio to Persian Calligraphy Brush Dynamics
const analyser = audioContext.createAnalyser();
analyser.fftSize = 512;
source.connect(analyser);

const freqData = new Uint8Array(256);
analyser.getByteFrequencyData(freqData);
const volumeEnergy = sum(freqData) / freqData.length / 128;

// Modulate reed pen stroke width & calligraphy particles
const nibWidth = Math.max(3, volumeEnergy * 28);
ctx.lineWidth = nibWidth;
ctx.strokeStyle = activePalette.main;
ctx.stroke();`,
  tags: ['Typography', 'Persian', 'Calligraphy', 'Web Audio API', 'Canvas', 'Acoustic', 'Voice'],
};
import {
  Mic,
  MicOff,
  Sparkles,
  Volume2,
  VolumeX,
  Palette,
  Feather,
  RefreshCw,
  Download,
  Flame,
  Radio,
  BookOpen
} from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

const POETRY_PRESETS = [
  {
    poet: 'حافظ شیرازی',
    hemistich1: 'ساقیا برخیز و درده جام را',
    hemistich2: 'خاک بر سر کن غم ایام را',
    desc: 'وزن فاعلاتن فاعلاتن فاعلن // دستگاه ماهور',
  },
  {
    poet: 'مولانای رومی',
    hemistich1: 'بشنو این نی چون شکایت می‌کند',
    hemistich2: 'از جدایی‌ها حکایت می‌کند',
    desc: 'وزن فاعلاتن فاعلاتن فاعلات // نی‌نامه و سوز دل',
  },
  {
    poet: 'حکیم خیام نیشابوری',
    hemistich1: 'اسرار ازل را نه تو دانی و نه من',
    hemistich2: 'وین حرف معما نه تو خوانی و نه من',
    desc: 'رباعیات خیام // ضرب‌آهنگ متفکرانه',
  },
  {
    poet: 'فردوسی طوسی',
    hemistich1: 'به نام خداوند جان و خرد',
    hemistich2: 'کزین برتر اندیشه برنگذرد',
    desc: 'شاهنامه // آهنگ حماسی متقارب',
  },
];

const INK_PALETTES = [
  { id: 'GOLD_NOCTURNE', name: 'طلای ناصری و لاجورد', main: '#f59e0b', secondary: '#06b6d4', glow: 'rgba(245, 158, 11, 0.4)' },
  { id: 'ROSE_CARMINE', name: 'یاقوتی و زر سرخ', main: '#f43f5e', secondary: '#fbbf24', glow: 'rgba(244, 63, 94, 0.4)' },
  { id: 'JADE_ISFAHAN', name: 'فیروزه و زنگار اصفهان', main: '#10b981', secondary: '#38bdf8', glow: 'rgba(16, 185, 129, 0.4)' },
  { id: 'EBONY_CHARCOAL', name: 'سیاه‌مشق دوده و سیم', main: '#e2e8f0', secondary: '#94a3b8', glow: 'rgba(226, 232, 240, 0.3)' },
];

export default function TypographyPersianVoiceToCalligraphy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedPoemIndex, setSelectedPoemIndex] = useState<number>(0);
  const [selectedPaletteIndex, setSelectedPaletteIndex] = useState<number>(0);
  const [isMicActive, setIsMicActive] = useState<boolean>(false);
  const [isSynthActive, setIsSynthActive] = useState<boolean>(true);
  const [voiceVolume, setVoiceVolume] = useState<number>(0.35);
  const [detectedPitch, setDetectedPitch] = useState<number>(240);
  const [micError, setMicError] = useState<string | null>(null);

  // Audio Processing References
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const synthTimerRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const strokePathRef = useRef<{ x: number; y: number; width: number }[]>([]);

  const activePoem = POETRY_PRESETS[selectedPoemIndex];
  const activePalette = INK_PALETTES[selectedPaletteIndex];

  // Start / Stop Microphone Stream
  const toggleMicrophone = async () => {
    soundFx.playClick(800);
    if (isMicActive) {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      setIsMicActive(false);
      setIsSynthActive(true);
      return;
    }

    try {
      setMicError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.8;
      source.connect(analyser);
      analyserRef.current = analyser;

      setIsMicActive(true);
      setIsSynthActive(false);
      soundFx.playChime(850, 0.2);
    } catch (err: any) {
      console.warn('Microphone permission or hardware unavailable:', err);
      setMicError('دسترسی میکروفون فعال نشد؛ مولد سنتز صوتی شبیه‌ساز صدا فعال گردید.');
      setIsMicActive(false);
      setIsSynthActive(true);
    }
  };

  // Canvas Calligraphy Drawing Loop with Audio Analysis
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;
    const freqData = new Uint8Array(256);

    const render = () => {
      animId = requestAnimationFrame(render);
      time += 0.02;

      let currentEnergy = 0.25;
      let freqIndex = 120;

      // Extract Audio data from real microphone or synthetic vocal resonator
      if (isMicActive && analyserRef.current) {
        analyserRef.current.getByteFrequencyData(freqData);
        let sum = 0;
        let maxVal = 0;
        let maxIdx = 0;
        for (let i = 0; i < freqData.length; i++) {
          sum += freqData[i];
          if (freqData[i] > maxVal) {
            maxVal = freqData[i];
            maxIdx = i;
          }
        }
        currentEnergy = Math.min(1.0, (sum / freqData.length / 128) * 1.6);
        freqIndex = maxIdx * 8;
        setVoiceVolume(currentEnergy);
        setDetectedPitch(Math.round(freqIndex));
      } else if (isSynthActive) {
        // Synthetic vocal pulse with rhythmic breathing cadence
        const breath = (Math.sin(time * 1.8) + 1) * 0.5;
        const vibrato = Math.sin(time * 7) * 0.15;
        currentEnergy = 0.2 + breath * 0.5 + vibrato;
        freqIndex = 220 + Math.sin(time * 3) * 110;
        setVoiceVolume(currentEnergy);
        setDetectedPitch(Math.round(freqIndex));
      }

      const w = canvas.width;
      const h = canvas.height;

      // Subtle persistence trail for fluid ink wash
      ctx.fillStyle = 'rgba(6, 8, 12, 0.12)';
      ctx.fillRect(0, 0, w, h);

      // Draw Persian Ornamental Frame Margins
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 30, w - 60, h - 60);
      ctx.strokeStyle = activePalette.glow;
      ctx.lineWidth = 0.5;
      ctx.strokeRect(36, 36, w - 72, h - 72);

      // Generate dynamic calligraphy brush trajectory driven by voice
      const centerX = w / 2;
      const centerY = h / 2 - 30;

      // Lissajous-Harmonic Persian Siah-Mashq Curve Coordinates
      const curveR = 140 + currentEnergy * 100;
      const ptX = centerX + Math.cos(time * 1.5) * curveR * 1.3 + Math.sin(time * 4) * 35;
      const ptY = centerY + Math.sin(time * 2.1) * (curveR * 0.6) + Math.cos(time * 3) * 25;
      const penNibWidth = Math.max(3, currentEnergy * 28);

      strokePathRef.current.push({ x: ptX, y: ptY, width: penNibWidth });
      if (strokePathRef.current.length > 55) {
        strokePathRef.current.shift();
      }

      // Render Calligraphy Ribbon
      if (strokePathRef.current.length > 2) {
        ctx.save();
        for (let i = 1; i < strokePathRef.current.length; i++) {
          const prev = strokePathRef.current[i - 1];
          const curr = strokePathRef.current[i];
          const alpha = (i / strokePathRef.current.length) * 0.9;

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(curr.x, curr.y);

          // Slanted Persian reed pen nib (زاویه ۳۵ درجه قلم نی)
          ctx.lineWidth = curr.width;
          ctx.lineCap = 'round';
          ctx.strokeStyle = activePalette.main;
          ctx.shadowColor = activePalette.glow;
          ctx.shadowBlur = curr.width * 0.8;
          ctx.globalAlpha = alpha;
          ctx.stroke();
        }
        ctx.restore();
      }

      // Spawn Golden Leaf Stardust Particles on sound peaks
      if (currentEnergy > 0.45 && Math.random() < 0.7) {
        particlesRef.current.push({
          x: ptX + (Math.random() - 0.5) * 40,
          y: ptY + (Math.random() - 0.5) * 40,
          vx: (Math.random() - 0.5) * 2.5,
          vy: (Math.random() - 0.5) * 2.5 - 0.5,
          size: Math.random() * 3 + 1,
          alpha: 1.0,
          color: Math.random() > 0.5 ? activePalette.main : activePalette.secondary,
        });
      }

      // Draw and update ink particles
      ctx.save();
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.015;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Render Persian Typography Hemistichs with Dynamic Sound Displacement
      ctx.save();
      ctx.textAlign = 'center';
      ctx.direction = 'rtl';

      // First Hemistich
      ctx.font = `bold ${Math.round(38 + currentEnergy * 10)}px Vazirmatn, Lalezar, serif`;
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = activePalette.glow;
      ctx.shadowBlur = 15;
      ctx.fillText(activePoem.hemistich1, centerX, centerY + 80);

      // Second Hemistich
      ctx.font = `500 ${Math.round(28 + currentEnergy * 6)}px Vazirmatn, serif`;
      ctx.fillStyle = activePalette.main;
      ctx.shadowBlur = 20;
      ctx.fillText(activePoem.hemistich2, centerX, centerY + 140);

      // Poet Attribution Badge
      ctx.font = '600 13px JetBrains Mono, Vazirmatn, monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.shadowBlur = 0;
      ctx.fillText(`— ${activePoem.poet} // ${activePoem.desc}`, centerX, centerY + 185);

      ctx.restore();
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, [selectedPoemIndex, selectedPaletteIndex, isMicActive, isSynthActive]);

  // Export Calligraphy Canvas as PNG Image
  const downloadCalligraphyArt = () => {
    if (!canvasRef.current) return;
    soundFx.playChime(900, 0.3);
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.download = `persian_calligraphy_${activePoem.poet.replace(/\s+/g, '_')}.png`;
    a.href = url;
    a.click();
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div id="typography_v06_voicetocalligraphy" className="relative w-full py-16 bg-[#040508] border-b border-white/10 text-zinc-100 overflow-hidden font-['Plus_Jakarta_Sans']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Feather className="w-4 h-4 text-amber-400" />
              <span>PERSIAN KINETIC TYPOGRAPHY // VOICE-TO-CALLIGRAPHY</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne']">
              موتور شبیه‌سازی صوتی به خطاطی و سیاه‌مشق
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-['Vazirmatn']">
              اتصال میکروفون زنده یا سنتز ارتعاشات صوتی برای خلق دانگ‌های قلم خوشنویسی نستعلیق و شکسته‌نستعلیق، تذهیب طلا، و پیچش‌های سیاه مشق شعر کهن فارسی بر پایه طیف فرکانسی صوت.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={downloadCalligraphyArt}
              className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>دانلود اثر خطاطی</span>
            </button>

            <button
              onClick={toggleMicrophone}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                isMicActive
                  ? 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/30 animate-pulse'
                  : 'bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black shadow-amber-400/20'
              }`}
            >
              {isMicActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              <span>{isMicActive ? 'قطع میکروفون' : 'فعال‌سازی میکروفون زنده'}</span>
            </button>
          </div>
        </div>

        {/* Studio Canvas & Telemetry Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main Calligraphy Interactive Canvas (3 Cols) */}
          <div className="lg:col-span-3 relative h-[560px] rounded-3xl overflow-hidden border border-white/10 bg-[#06080c] shadow-2xl">
            <canvas
              ref={canvasRef}
              width={1000}
              height={560}
              className="w-full h-full object-cover"
            />

            {/* Error Notification if any */}
            {micError && (
              <div className="absolute top-4 left-4 right-4 z-20 px-4 py-2 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-['Vazirmatn'] flex items-center justify-between">
                <span>{micError}</span>
                <button onClick={() => setMicError(null)} className="text-zinc-400 hover:text-white">✕</button>
              </div>
            )}

            {/* Top Sound Analyzer Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/75 border border-white/10 backdrop-blur-md pointer-events-auto">
                <span className={`w-2 h-2 rounded-full ${isMicActive ? 'bg-rose-400 animate-ping' : 'bg-cyan-400 animate-pulse'}`} />
                <span className="font-mono text-xs text-zinc-300">
                  {isMicActive ? 'MIC INPUT (LIVE)' : 'SYNTH RESONATOR'}
                </span>
                <span className="text-zinc-600">|</span>
                <span className="font-mono text-xs text-amber-400 font-bold">{detectedPitch} Hz</span>
                <span className="text-zinc-600">|</span>
                <span className="font-mono text-xs text-cyan-300">{Math.round(voiceVolume * 100)}% VOL</span>
              </div>

              {/* Dynamic VU Meter */}
              <div className="flex items-center gap-1 p-1.5 rounded-xl bg-black/75 border border-white/10 backdrop-blur-md pointer-events-auto">
                {Array.from({ length: 12 }).map((_, i) => {
                  const filled = (i / 12) < voiceVolume;
                  return (
                    <div
                      key={i}
                      className={`w-1.5 h-4 rounded-full transition-all duration-75 ${
                        filled
                          ? i > 9
                            ? 'bg-rose-500 shadow-sm shadow-rose-500'
                            : i > 6
                            ? 'bg-amber-400 shadow-sm shadow-amber-400'
                            : 'bg-cyan-400 shadow-sm shadow-cyan-400'
                          : 'bg-white/10'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Bottom Poetry Selector Pills */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-xl">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                {POETRY_PRESETS.map((p, idx) => (
                  <button
                    key={p.poet}
                    onClick={() => {
                      soundFx.playClick(600 + idx * 50);
                      setSelectedPoemIndex(idx);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-['Vazirmatn'] text-xs font-semibold whitespace-nowrap transition-all ${
                      selectedPoemIndex === idx
                        ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-md font-bold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {p.poet}
                  </button>
                ))}
              </div>

              <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                صوت با ارتعاشات دانگ قلم تطبیق می‌یابد
              </span>
            </div>
          </div>

          {/* Right Parameters & Color Palette Panel (1 Col) */}
          <div className="space-y-4">
            {/* Ink Palette Selector */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5" /> رنگ مرکب و تذهیب
              </span>

              <div className="space-y-2">
                {INK_PALETTES.map((pal, idx) => (
                  <button
                    key={pal.id}
                    onClick={() => {
                      soundFx.playClick(700);
                      setSelectedPaletteIndex(idx);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-right font-['Vazirmatn'] text-xs flex items-center justify-between transition-all ${
                      selectedPaletteIndex === idx
                        ? 'bg-white/10 border-amber-400 text-white font-bold shadow-md'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: pal.main }} />
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pal.secondary }} />
                    </div>
                    <span>{pal.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Vocal Harmonics Diagnostics */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-2.5 font-mono text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-cyan-400" /> مشخصات آکوستیک قلم
              </span>

              <div className="space-y-1.5 pt-1 text-[11px] text-zinc-300 divide-y divide-white/5 font-['Vazirmatn']">
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">زاویه تراش قلم:</span>
                  <span className="text-white font-mono">۳۵ درجه (مورب سنتی)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">پخش آبرنگی جوهر:</span>
                  <span className="text-amber-400 font-mono">Simulated Bleed</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">تذهیب طلای معلق:</span>
                  <span className="text-cyan-400 font-mono">{particlesRef.current.length} ذرات</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">دانگ قلم نی:</span>
                  <span className="text-emerald-400 font-mono">{Math.round(voiceVolume * 28 + 3)}pt</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </BlueprintHUD>
  );
}
