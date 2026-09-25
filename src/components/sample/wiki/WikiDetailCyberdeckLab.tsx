import React, { useState } from 'react';
import { GameData } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  Cpu,
  Monitor,
  Terminal,
  Activity,
  Zap,
  Flame,
  ShieldCheck,
  Radio,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw
} from 'lucide-react';

interface CyberdeckLabProps {
  game: GameData;
  isFa: boolean;
  isRtl: boolean;
  onBack: () => void;
}

export default function WikiDetailCyberdeckLab({
  game,
  isFa,
  isRtl,
  onBack,
}: CyberdeckLabProps) {
  // Benchmark state
  const [selectedGpu, setSelectedGpu] = useState<'RTX_4090' | 'RTX_4070' | 'RTX_3060' | 'RX_7800XT'>('RTX_4070');
  const [selectedRes, setSelectedRes] = useState<'1080P' | '1440P' | '4K_RT'>('1440P');
  const [dlssEnabled, setDlssEnabled] = useState(true);

  // Trainer Cheats state
  const [activeCheats, setActiveCheats] = useState<Record<string, boolean>>({
    cheat_1: false,
    cheat_2: false,
    cheat_3: false,
    cheat_4: false,
  });

  // Calculate benchmark stats
  const calculateBenchmark = () => {
    let baseFps = 80;
    if (selectedGpu === 'RTX_4090') baseFps = 145;
    if (selectedGpu === 'RTX_4070') baseFps = 95;
    if (selectedGpu === 'RTX_3060') baseFps = 55;
    if (selectedGpu === 'RX_7800XT') baseFps = 92;

    let resMultiplier = 1;
    if (selectedRes === '1080P') resMultiplier = 1.35;
    if (selectedRes === '1440P') resMultiplier = 1.0;
    if (selectedRes === '4K_RT') resMultiplier = 0.58;

    let dlssBoost = dlssEnabled ? 1.32 : 1.0;

    const avgFps = Math.round(baseFps * resMultiplier * dlssBoost);
    const lowFps = Math.round(avgFps * 0.72);
    const frameTime = (1000 / avgFps).toFixed(1);
    const vram = selectedRes === '4K_RT' ? '12.4 GB' : selectedRes === '1440P' ? '8.8 GB' : '6.2 GB';

    return { avgFps, lowFps, frameTime, vram };
  };

  const bench = calculateBenchmark();

  const toggleCheat = (id: string) => {
    soundFx.playCyberBlip();
    setActiveCheats((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-mono text-xs">
      {/* 1. CYBERDECK TERMINAL HEADER */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#050811] border-2 border-cyan-400/40 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-400/60 flex items-center justify-center text-cyan-300">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-cyan-400 uppercase tracking-widest block font-bold">
                {isFa ? 'طراحی ۲: ایستگاه بنچمارک سخت‌افزاری و کنسول سایبردک' : 'SAMPLE 2: HARDWARE BENCHMARK & PERFORMANCE LAB'}
              </span>
              <h2 className="font-['Syne'] text-2xl font-black text-white">
                {isFa ? game.titleFa : game.title} &bull; PERFORMANCE LAB
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-400/40 text-emerald-300 text-[10px]">
              ENGINE: {game.engine}
            </span>
          </div>
        </div>

        {/* 2. LIVE INTERACTIVE FPS BENCHMARK CALCULATOR */}
        <div className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-['Syne'] text-lg font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'تخمین‌گر زنده نرخ فریم (FPS) و بازدهی گرافیک' : 'Real-time FPS Benchmark Estimator'}</span>
            </h3>
            <span className="text-zinc-500 text-[11px]">{isFa ? 'محاسبه بر اساس تست‌های آزمایشگاهی' : 'Lab calibrated telemetry'}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* GPU & Resolution Controls */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
              <div>
                <label className="text-zinc-400 block mb-2">{isFa ? 'کارت گرافیک سیستم شما:' : 'Select Hardware GPU:'}</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'RTX_4090', label: 'RTX 4090 24GB' },
                    { id: 'RTX_4070', label: 'RTX 4070 12GB' },
                    { id: 'RTX_3060', label: 'RTX 3060 12GB' },
                    { id: 'RX_7800XT', label: 'RX 7800 XT 16GB' },
                  ].map((gpu) => (
                    <button
                      key={gpu.id}
                      onClick={() => {
                        soundFx.playClick(650);
                        setSelectedGpu(gpu.id as any);
                      }}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedGpu === gpu.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold shadow-md'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {gpu.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-zinc-400 block mb-2">{isFa ? 'رزولوشن و کیفیت رندر:' : 'Render Target:'}</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: '1080P', label: '1080p Ultra' },
                    { id: '1440P', label: '1440p 2K' },
                    { id: '4K_RT', label: '4K + Ray Tracing' },
                  ].map((res) => (
                    <button
                      key={res.id}
                      onClick={() => {
                        soundFx.playClick(700);
                        setSelectedRes(res.id as any);
                      }}
                      className={`p-2 rounded-xl border text-center transition-all ${
                        selectedRes === res.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      {res.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <span className="text-zinc-300">{isFa ? 'فناوری افزایش فریم DLSS 3.5 / FSR:' : 'DLSS 3.5 Frame Gen:'}</span>
                <button
                  onClick={() => {
                    soundFx.playTick(800);
                    setDlssEnabled(!dlssEnabled);
                  }}
                  className={`px-3 py-1 rounded-lg border font-bold ${
                    dlssEnabled ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300' : 'bg-white/10 border-white/20 text-zinc-500'
                  }`}
                >
                  {dlssEnabled ? 'ACTIVE (ON)' : 'DISABLED'}
                </button>
              </div>
            </div>

            {/* Benchmark Telemetry Gauges */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-400/40 flex flex-col justify-between">
                <span className="text-cyan-400">{isFa ? 'میانگین فریم' : 'AVG FPS'}</span>
                <div className="text-3xl sm:text-4xl font-black font-['Syne'] text-white my-2">
                  {bench.avgFps}
                </div>
                <span className="text-[10px] text-emerald-400">SMOOTH PLAY</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400">{isFa ? 'حداقل فریم ۱٪' : '1% LOW FPS'}</span>
                <div className="text-3xl sm:text-4xl font-black font-['Syne'] text-amber-300 my-2">
                  {bench.lowFps}
                </div>
                <span className="text-[10px] text-zinc-500">NO STUTTER</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400">{isFa ? 'زمان فریم' : 'FRAME TIME'}</span>
                <div className="text-2xl sm:text-3xl font-black font-['Syne'] text-cyan-300 my-2">
                  {bench.frameTime}ms
                </div>
                <span className="text-[10px] text-cyan-400">LATENCY OPTIMAL</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 flex flex-col justify-between">
                <span className="text-zinc-400">{isFa ? 'مصرف VRAM' : 'VRAM USAGE'}</span>
                <div className="text-2xl sm:text-3xl font-black font-['Syne'] text-purple-300 my-2">
                  {bench.vram}
                </div>
                <span className="text-[10px] text-zinc-500">GDDR6X POOL</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. INTERACTIVE HACKER TRAINER CONSOLE */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-['Syne'] text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <span>{isFa ? 'کنسول تعاملی ترینر و تست کدهای تقلب (Live Cheat Toggles)' : 'Interactive Hacker Trainer Engine'}</span>
            </h3>
            <span className="text-rose-400 font-mono text-[11px]">FLiNG RUNTIME LOADED</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'cheat_1', key: 'NUMPAD 1', title: isFa ? 'جان و سلامت بی‌نهایت' : 'Infinite Health / God Mode' },
              { id: 'cheat_2', key: 'NUMPAD 2', title: isFa ? 'مهمات و خشاب نامحدود' : 'Infinite Ammo / No Reload' },
              { id: 'cheat_3', key: 'NUMPAD 3', title: isFa ? 'پول و منابع نامحدود' : 'Infinite In-Game Currency' },
              { id: 'cheat_4', key: 'NUMPAD 4', title: isFa ? 'سرعت حرکت ۲ برابر' : '2x Movement Speed Multiplier' },
            ].map((ch) => {
              const active = activeCheats[ch.id];
              return (
                <div
                  key={ch.id}
                  onClick={() => toggleCheat(ch.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 ${
                    active
                      ? 'bg-rose-950/40 border-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
                      : 'bg-black/60 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-bold text-cyan-300">
                      {ch.key}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${active ? 'bg-rose-400 animate-ping' : 'bg-zinc-600'}`} />
                  </div>
                  <div className="text-white font-bold">{ch.title}</div>
                  <div className="text-[10px] text-zinc-400">
                    {active ? (isFa ? '✓ فعال (Active)' : 'STATUS: ON') : (isFa ? 'غیرفعال (OFF)' : 'STATUS: OFF')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. MULTI-REGION SERVER PING RADAR */}
        <div className="pt-8 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="font-['Syne'] text-lg font-bold text-white flex items-center gap-2">
              <Radio className="w-4 h-4 text-emerald-400" />
              <span>{isFa ? 'وضعیت پینگ سرورهای آنلاین بازی' : 'Multi-Region Server Latency'}</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1">
              <span className="text-zinc-400">{isFa ? 'خاورمیانه (دبی / امارات):' : 'Middle East (Dubai):'}</span>
              <div className="text-2xl font-black text-emerald-400">38 ms</div>
              <span className="text-[10px] text-zinc-500">Jitter: 1.2ms &bull; 0% Packet Loss</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1">
              <span className="text-zinc-400">{isFa ? 'اروپا (فرانکفورت):' : 'Europe (Frankfurt):'}</span>
              <div className="text-2xl font-black text-emerald-400">76 ms</div>
              <span className="text-[10px] text-zinc-500">Jitter: 2.1ms &bull; 0% Packet Loss</span>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-900/60 border border-white/10 space-y-1">
              <span className="text-zinc-400">{isFa ? 'آمریکای شمالی (ویرجینیا):' : 'US East (Virginia):'}</span>
              <div className="text-2xl font-black text-amber-400">142 ms</div>
              <span className="text-[10px] text-zinc-500">Jitter: 4.5ms &bull; 0% Packet Loss</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
