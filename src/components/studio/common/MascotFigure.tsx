import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../../utils/audio';

interface MascotFigureProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSpeechBubble?: boolean;
  speechText?: string;
  className?: string;
  onClick?: () => void;
}

export default function MascotFigure({
  size = 'md',
  showSpeechBubble = false,
  speechText = 'سلام! من ایجنت هوشمند ۱۲۳ هستم ✦',
  className = '',
  onClick,
}: MascotFigureProps) {
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(showSpeechBubble);
  const figureRef = useRef<HTMLDivElement>(null);

  // Track cursor for reactive eye pupils
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const el = figureRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / window.innerWidth;
      const dy = (e.clientY - centerY) / window.innerHeight;
      setEyeOffset({
        x: Math.max(-4, Math.min(4, dx * 12)),
        y: Math.max(-3, Math.min(3, dy * 10)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sizeDimensions = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28',
    lg: 'w-44 h-44',
    xl: 'w-64 h-64',
  }[size];

  return (
    <div
      ref={figureRef}
      onMouseEnter={() => {
        setIsHovered(true);
        setBubbleVisible(true);
        soundFx.playChime(850, 0.1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        if (!showSpeechBubble) setBubbleVisible(false);
      }}
      onClick={onClick}
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer select-none group ${className}`}
    >
      {/* Speech Bubble */}
      {bubbleVisible && (
        <div className="absolute -top-12 z-20 whitespace-nowrap px-3.5 py-1.5 rounded-full bg-[#111116] border border-[#202027] text-cyan-300 font-mono text-[11px] shadow-2xl shadow-cyan-500/20 animate-bounce flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B8FF3D] animate-ping" />
          <span>{speechText}</span>
        </div>
      )}

      {/* Geometric Mascot Character */}
      <div
        className={`${sizeDimensions} transition-transform duration-300 ${
          isHovered ? 'scale-110 -translate-y-1' : 'animate-float'
        }`}
      >
        <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_10px_25px_rgba(124,58,237,0.35)]">
          <defs>
            <linearGradient id="mascotBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#17171D" />
              <stop offset="50%" stopColor="#111116" />
              <stop offset="100%" stopColor="#09090B" />
            </linearGradient>

            <linearGradient id="mascotVisorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            <linearGradient id="mascotEarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22D3EE" />
              <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>

            <filter id="mascotGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Floating Base Aura */}
          <ellipse cx="80" cy="148" rx="36" ry="6" fill="rgba(34, 211, 238, 0.2)" filter="url(#mascotGlow)" />

          {/* Antenna with Pulsing Beacon */}
          <line x1="80" y1="36" x2="80" y2="18" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" />
          <circle cx="80" cy="15" r="5" fill="#B8FF3D" filter="url(#mascotGlow)" />

          {/* Left & Right Acoustic Pod Ears */}
          <rect x="22" y="58" width="10" height="28" rx="5" fill="url(#mascotEarGrad)" />
          <rect x="128" y="58" width="10" height="28" rx="5" fill="url(#mascotEarGrad)" />

          {/* Head Capsule */}
          <rect
            x="30"
            y="34"
            width="100"
            height="76"
            rx="28"
            fill="url(#mascotBodyGrad)"
            stroke="#202027"
            strokeWidth="2"
          />

          {/* Holographic Face Visor Display */}
          <rect
            x="40"
            y="46"
            width="80"
            height="50"
            rx="18"
            fill="#09090B"
            stroke="url(#mascotVisorGrad)"
            strokeWidth="1.5"
          />

          {/* Reactive Eye Display Screen */}
          {/* Left Eye */}
          <circle
            cx={64 + eyeOffset.x}
            cy={68 + eyeOffset.y}
            r="8"
            fill="#22D3EE"
            filter="url(#mascotGlow)"
          />
          <circle
            cx={66 + eyeOffset.x}
            cy={66 + eyeOffset.y}
            r="2.5"
            fill="#FFFFFF"
          />

          {/* Right Eye */}
          <circle
            cx={96 + eyeOffset.x}
            cy={68 + eyeOffset.y}
            r="8"
            fill="#22D3EE"
            filter="url(#mascotGlow)"
          />
          <circle
            cx={98 + eyeOffset.x}
            cy={66 + eyeOffset.y}
            r="2.5"
            fill="#FFFFFF"
          />

          {/* Digital Smile Vector */}
          <path
            d="M 68 84 Q 80 92 92 84"
            stroke="#7C3AED"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Floating Torso */}
          <path
            d="M 52 116 C 52 110, 108 110, 108 116 L 98 138 C 98 142, 62 142, 62 138 Z"
            fill="url(#mascotBodyGrad)"
            stroke="#202027"
            strokeWidth="1.5"
          />

          {/* Core Arc Reactor (123 Emblem Badge) */}
          <circle cx="80" cy="126" r="5" fill="#7C3AED" stroke="#22D3EE" strokeWidth="1" filter="url(#mascotGlow)" />
        </svg>
      </div>

      {/* Subtitle label */}
      <span className="font-mono text-[9px] text-zinc-500 tracking-wider uppercase mt-1">
        AGENT 123 // MASCOT
      </span>
    </div>
  );
}
