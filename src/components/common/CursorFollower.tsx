import React, { useEffect, useState, useRef } from 'react';

export default function CursorFollower() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState<'default' | 'hover' | 'drag' | 'view'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if mouse device
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('[data-cursor]');
        if (interactive) {
          const mode = interactive.getAttribute('data-cursor') || 'hover';
          const text = interactive.getAttribute('data-cursor-text') || '';
          setCursorMode(mode as 'default' | 'hover' | 'drag' | 'view');
          setCursorText(text);
        } else if (target.closest('button, a, input, select')) {
          setCursorMode('hover');
          setCursorText('');
        } else {
          setCursorMode('default');
          setCursorText('');
        }
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth inertia trailing loop
    let currentTrailX = -100;
    let currentTrailY = -100;

    const loop = () => {
      currentTrailX += (pos.x - currentTrailX) * 0.18;
      currentTrailY += (pos.y - currentTrailY) * 0.18;
      setTrail({ x: currentTrailX, y: currentTrailY });
      animFrameRef.current = requestAnimationFrame(loop);
    };
    animFrameRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [pos.x, pos.y, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Precision Core Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-white transition-transform duration-75 ease-out shadow-[0_0_10px_rgba(255,255,255,0.8)]"
        style={{
          transform: `translate3d(${pos.x - 4}px, ${pos.y - 4}px, 0) scale(${cursorMode === 'hover' ? 0.5 : 1})`,
        }}
      />

      {/* Trailing Inertia Ring & Label */}
      <div
        className={`fixed flex items-center justify-center rounded-full border border-white/40 transition-[width,height,border-color,background-color] duration-200 ease-out backdrop-blur-[1px] ${
          cursorMode === 'hover'
            ? 'w-12 h-12 -ml-6 -mt-6 border-amber-400/80 bg-amber-400/10'
            : cursorMode === 'drag'
            ? 'w-16 h-16 -ml-8 -mt-8 border-cyan-400/80 bg-cyan-500/15'
            : cursorMode === 'view'
            ? 'w-20 h-20 -ml-10 -mt-10 border-white/90 bg-white/20'
            : 'w-8 h-8 -ml-4 -mt-4 border-white/25'
        }`}
        style={{
          transform: `translate3d(${trail.x}px, ${trail.y}px, 0)`,
        }}
      >
        {cursorText && (
          <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold px-1 select-none">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
