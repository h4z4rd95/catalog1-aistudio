import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONTENT } from '../../../content/site';
import { soundFx } from '../../../utils/audio';

function OdometerNumber({ targetValue, suffix = '' }: { targetValue: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1800; // ms
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(ease * targetValue);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        setDisplayValue(targetValue);
      }
    };

    const frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [targetValue]);

  return (
    <span className="font-['Lalezar'] text-5xl sm:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-100 to-cyan-300 tracking-tight">
      {displayValue}
      <span className="text-violet-400 font-mono text-3xl sm:text-5xl ml-1">{suffix}</span>
    </span>
  );
}

export default function StudioStatsOdometer() {
  const stats = SITE_CONTENT.stats;

  return (
    <section className="relative py-20 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B8FF3D] animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400 font-bold">
              04 // ODOMETER WALL &bull; METRICS
            </span>
          </div>
          <span className="font-mono text-xs text-cyan-400">
            INDEPENDENT DIGIT ROLLING ENGINE
          </span>
        </div>

        {/* Odometer Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-500/40 shadow-2xl space-y-4 flex flex-col justify-between group transition-all"
            >
              <div className="space-y-2">
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block font-bold">
                  {item.metric}
                </span>
                <div className="flex items-baseline">
                  <OdometerNumber targetValue={item.value} suffix={item.suffix} />
                </div>
              </div>

              <div className="pt-4 border-t border-[#202027] flex items-center justify-between">
                <span className="font-['Vazirmatn'] text-xs text-zinc-300 font-medium">
                  {item.labelFa}
                </span>
                <span className="font-mono text-[10px] text-zinc-600">0{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
