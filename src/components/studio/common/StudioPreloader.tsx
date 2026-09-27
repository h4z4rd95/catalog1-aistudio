import React, { useEffect, useState } from 'react';
import { soundFx } from '../../../utils/audio';

interface StudioPreloaderProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export default function StudioPreloader({ onComplete, forceShow = false }: StudioPreloaderProps) {
  const [phase, setPhase] = useState<'DRAWING' | 'REVEAL' | 'LIFTING' | 'FINISHED'>('DRAWING');

  useEffect(() => {
    // 1. Drawing the 3 strokes of «۱۲۳» (0 to 1100ms)
    const t1 = setTimeout(() => {
      soundFx.playChime(600, 0.15);
      setPhase('REVEAL');
    }, 1100);

    // 2. Violet-Cyan Bloom Expansion (1100ms to 1700ms)
    const t2 = setTimeout(() => {
      soundFx.playChime(850, 0.2);
      setPhase('LIFTING');
    }, 1700);

    // 3. Theatrical Curtain Lift (1700ms to 2300ms)
    const t3 = setTimeout(() => {
      setPhase('FINISHED');
      onComplete();
    }, 2350);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  if (phase === 'FINISHED' && !forceShow) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090B] transition-transform duration-700 ease-[cubic-bezier(0.85,0,0.15,1)] select-none ${
        phase === 'LIFTING' ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Background Aurora Mesh */}
      <div className="absolute inset-0 bg-radial from-violet-900/20 via-[#09090B] to-[#09090B] pointer-events-none" />

      {/* Center 123 Calligraphic Strokes SVG */}
      <div className="relative z-10 flex flex-col items-center">
        <svg
          viewBox="0 0 420 180"
          className="w-72 sm:w-96 h-auto drop-shadow-[0_0_40px_rgba(124,58,237,0.5)]"
        >
          <defs>
            <linearGradient id="strokeSweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>

          {/* Stroke 1: «۱» (The Vertical Needle) */}
          <path
            d="M 90 25 L 90 145"
            fill="none"
            stroke="url(#strokeSweep)"
            strokeWidth="10"
            strokeLinecap="round"
            className="animate-draw-stroke-1"
            style={{
              strokeDasharray: 140,
              strokeDashoffset: phase === 'DRAWING' ? 140 : 0,
              transition: 'stroke-dashoffset 0.6s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />

          {/* Stroke 2: «۲» (The Graceful Wave & Horizon) */}
          <path
            d="M 170 35 C 195 20, 225 35, 205 75 L 175 145 L 225 145"
            fill="none"
            stroke="url(#strokeSweep)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 240,
              strokeDashoffset: phase === 'DRAWING' ? 240 : 0,
              transition: 'stroke-dashoffset 0.8s 0.25s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />

          {/* Stroke 3: «۳» (The Double Arc S-Loop) */}
          <path
            d="M 285 35 C 310 20, 335 45, 305 75 C 340 75, 345 125, 290 145"
            fill="none"
            stroke="url(#strokeSweep)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: 280,
              strokeDashoffset: phase === 'DRAWING' ? 280 : 0,
              transition: 'stroke-dashoffset 0.9s 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          />
        </svg>

        {/* Studio Descriptor Tag */}
        <div className="mt-8 flex items-center gap-3 font-mono text-xs text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
          <span className="text-white tracking-widest uppercase font-bold">123SERVICE &bull; DIGITAL CREATIVE ENGINE</span>
          <span className="text-cyan-400">INITIALIZING</span>
        </div>
      </div>

      {/* Bottom Technical Coordinates */}
      <div className="absolute bottom-8 inset-x-8 flex justify-between font-mono text-[10px] text-zinc-600">
        <span>01 WEB // 02 AI // 03 DESIGN</span>
        <span>LAT 35.6892° N, LON 51.3890° E</span>
      </div>
    </div>
  );
}
