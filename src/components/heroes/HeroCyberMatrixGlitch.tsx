import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Cpu, Terminal, Radio, ShieldCheck, Zap, AlertTriangle } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V03_CyberMatrixGlitch',
  name: 'Cyber Matrix Raycaster & Glitch Terminal',
  category: 'Hero',
  batch: 'Batch 1: Next.js Hero Sections',
  techStack: ['Next.js / React', 'HTML5 Canvas 2D', 'Raycaster Particle Mesh', 'Micro-Glitch Engine'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic Grid',
  interactionBlueprint: 'Interactive node network draws laser beam links to pointer position; clicks fire radial EMP shockwaves through neural vertices.',
  description: 'Dense cyberpunk telemetry cockpit featuring real-time canvas proximity raycasting, chromatic text split micro-glitches, live diagnostic kernel streams, and sound-reactive cyber triggers.',
  tags: ['Cyberpunk', 'Particle Network', 'Raycasting', 'Canvas 2D', 'Glitch Typography', 'HUD'],
  codeSnippet: `// Canvas Distance Field & Laser Proximity Raycasting
particles.forEach((p) => {
  p.x += p.vx;
  p.y += p.vy;
  // Boundary bounce
  if (p.x < 0 || p.x > width) p.vx *= -1;
  if (p.y < 0 || p.y > height) p.vy *= -1;

  // Mouse Raycaster Laser
  const dx = mouse.x - p.x;
  const dy = mouse.y - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist < proximityRadius) {
    const alpha = (1 - dist / proximityRadius) * 0.9;
    ctx.strokeStyle = \`rgba(6, 182, 212, \${alpha})\`;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  }
});`,
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Wave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function HeroCyberMatrixGlitch() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live tunable HUD parameters
  const [particleCount, setParticleCount] = useState<number>(85);
  const [proximityRadius, setProximityRadius] = useState<number>(140);
  const [glitchActive, setGlitchActive] = useState<boolean>(false);

  // Terminal telemetry logs
  const [logs, setLogs] = useState<string[]>([
    'KERNEL_INIT: Neural interface v8.4.2 locked',
    'MESH_SYNC: 85 Raycaster nodes online',
    'ENCRYPTION: 4096-bit Quantum Elliptic handshake ok',
    'FREQUENCY: 142.85 MHz spectral monitor engaged',
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = containerRef.current?.clientWidth || 800);
    let height = (canvas.height = containerRef.current?.clientHeight || 600);

    const handleResize = () => {
      if (!containerRef.current || !canvas) return;
      width = canvas.width = containerRef.current.clientWidth;
      height = canvas.height = containerRef.current.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Initialize particles
    const particles: Particle[] = [];
    const colors = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b'];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: Math.random() * 2 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const mouse = { x: width / 2, y: height / 2, active: false };
    const waves: Wave[] = [];

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const onClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      soundFx.playCyberBlip();
      waves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 10,
        maxRadius: 220,
        alpha: 1.0,
      });

      // Append log entry
      setLogs((prev) => [
        `IMPULSE_FIRED: [${Math.round(e.clientX)}, ${Math.round(e.clientY)}] vector`,
        ...prev.slice(0, 5),
      ]);
    };

    containerRef.current?.addEventListener('mousemove', onMouseMove);
    containerRef.current?.addEventListener('click', onClick);

    let animId: number;
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      // Render shockwaves
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        w.radius += 5;
        w.alpha *= 0.95;
        ctx.save();
        ctx.beginPath();
        ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(6, 182, 212, ${w.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();
        ctx.restore();
        if (w.alpha < 0.05) waves.splice(i, 1);
      }

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Proximity laser to cursor
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < proximityRadius) {
            const alpha = (1 - dist / proximityRadius) * 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Inter-particle web connection
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            const alpha = (1 - dist / 80) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('mousemove', onMouseMove);
      containerRef.current?.removeEventListener('click', onClick);
    };
  }, [particleCount, proximityRadius]);

  const triggerGlitch = () => {
    soundFx.playCyberBlip();
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 800);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Neural Nodes ({particleCount})
            </label>
            <input
              type="range"
              min="30"
              max="150"
              step="5"
              value={particleCount}
              onChange={(e) => setParticleCount(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Laser Proximity Radius ({proximityRadius}px)
            </label>
            <input
              type="range"
              min="60"
              max="240"
              step="10"
              value={proximityRadius}
              onChange={(e) => setProximityRadius(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={triggerGlitch}
              className="w-full py-1.5 px-3 rounded bg-cyan-950 border border-cyan-500/50 font-mono text-xs text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold uppercase transition-colors"
            >
              Trigger Chromatic EMP Glitch
            </button>
          </div>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="relative w-full min-h-[90vh] bg-[#050811] text-white flex flex-col justify-between overflow-hidden cursor-crosshair select-none"
      >
        {/* Holographic Scanlines Overlay */}
        <div 
          className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" 
        />

        {/* Cyber Canvas Mesh */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Ambient Radial Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Cockpit Telemetry Bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>RAYCASTER NET: LIVE</span>
            </span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-400 hidden sm:inline">SYS_LATENCY: 1.2ms</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>CORE_LOAD: 24%</span>
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SHIELD: 100%</span>
            </span>
          </div>
        </div>

        {/* Center Cyber Glitch Typography */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 text-center my-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-6">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>QUANTUM COGNITIVE INTERFACE // V8.4</span>
          </div>

          {/* Glitch Headline */}
          <div className="relative inline-block">
            <h1 
              className={`font-['Syne'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white transition-transform ${
                glitchActive ? 'translate-x-1 skew-x-6 text-cyan-300' : ''
              }`}
              style={{
                textShadow: glitchActive 
                  ? '3px 0 #ef4444, -3px 0 #06b6d4, 0 0 30px rgba(6, 182, 212, 0.8)' 
                  : '0 0 40px rgba(6, 182, 212, 0.3)',
              }}
            >
              SYNAPSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">MATRIX</span>
            </h1>

            {glitchActive && (
              <h1 
                className="absolute inset-0 font-['Syne'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-red-500 opacity-70 -translate-x-1 -translate-y-1 pointer-events-none select-none"
              >
                SYNAPSE MATRIX
              </h1>
            )}
          </div>

          <p className="mt-6 max-w-2xl mx-auto font-mono text-xs sm:text-sm text-zinc-400 leading-relaxed">
            [CLICK ANYWHERE ON CANVAS TO DEPLOY RADIAL EMP SHOCKWAVE]
            <br />
            Continuous high-density node raycasting dynamically calculating distance fields to your cursor.
          </p>

          {/* Action Hub */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={triggerGlitch}
              className="px-7 py-3 rounded-none bg-cyan-400 hover:bg-cyan-300 text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all border border-cyan-300"
              data-cursor="hover"
              data-cursor-text="PULSE"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>DISCHARGE PULSE</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                setParticleCount((c) => (c >= 140 ? 40 : c + 30));
              }}
              className="px-6 py-3 rounded-none bg-zinc-950 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-widest flex items-center gap-2 transition-all"
              data-cursor="hover"
              data-cursor-text="NODES"
            >
              <span>DENSITY: {particleCount} NODES</span>
            </button>
          </div>
        </div>

        {/* Bottom High-Density Diagnostic Deck */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
          {/* Terminal Logs Window */}
          <div className="col-span-1 md:col-span-2 p-3 bg-black/70 border border-cyan-900/60 rounded backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-1.5 mb-2 text-[10px] text-zinc-500">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal className="w-3 h-3" /> LIVE_KERNEL_STREAM
              </span>
              <span>BUFFER: 6 ENTRIES</span>
            </div>
            <div className="space-y-1 text-[11px] text-cyan-200/80 max-h-20 overflow-y-auto scrollbar-none font-mono">
              {logs.map((log, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-zinc-600">&gt;</span>
                  <span className={idx === 0 ? 'text-amber-300 font-semibold' : ''}>{log}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Audio/Sensor Frequency Graphic */}
          <div className="p-3 bg-black/70 border border-cyan-900/60 rounded backdrop-blur-md flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-cyan-900/40 pb-1.5 text-[10px] text-zinc-500">
              <span className="text-cyan-400">SPECTRAL_BAND</span>
              <span className="text-emerald-400">NORMAL</span>
            </div>
            <div className="flex items-end gap-1 h-12 pt-2">
              {Array.from({ length: 24 }).map((_, i) => {
                const height = 20 + Math.sin(i * 0.6) * 15 + Math.random() * 8;
                return (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-cyan-600 to-cyan-300 rounded-t-sm"
                    style={{ height: `${height}px` }}
                  />
                );
              })}
            </div>
            <span className="text-[9px] text-zinc-600 mt-1 block text-right">HERTZ SAMPLER 48kHz</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
