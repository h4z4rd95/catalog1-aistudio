import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sliders, Sparkles, Terminal, RefreshCw, Zap, ShieldAlert, Eye, Move } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'shader_v03_cybervolumetriclaser',
  name: 'Cyberpunk Volumetric Laser Scanner & Fog Caustics',
  category: 'Shader',
  batch: 'Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX',
  techStack: ['React 19', 'Canvas 2D Raycasting', 'Tyndall Volumetric Scattering', 'Occlusion Shadow Volumes', 'Atmospheric Haze Particulates'],
  aestheticVibe: 'Cyberpunk Volumetric Raymarching / Atmospheric Laser Scanner',
  interactionBlueprint: 'High-precision laser emitter casting multi-beam planar sheets through turbulent smoke fog. Interactive cursor directs scanner pitch and yaw, casting dynamic volumetric shadow silhouettes behind floating cybernetic prism nodes.',
  description: 'Atmospheric volumetric lighting shader modeling photon scattering through particulate haze, hard-edged volumetric shadow occlusions, audio-synchronized strobe pulses, and real-time ray-obstacle intersection physics.',
  codeSnippet: `// Volumetric laser raycast with dust particle illumination
const rayAngle = emitterAngle - (fanAperture / 2) + i * (fanAperture / (beamCount - 1));
const hit = raycastScene(emitterPos, rayAngle, obstacles);
drawVolumetricLightCone(ctx, emitterPos, rayAngle, hit.distance, fogDensity);
particles.forEach(p => {
  if (isPointInLaserBeam(p, emitterPos, rayAngle)) {
    p.glow = 1.0; // Tyndall scatter flare
  }
});`,
  tags: ['Shader', 'Laser', 'Volumetric', 'Cyberpunk', 'Raycasting', 'Shadows', 'Particulates'],
};

interface Obstacle {
  x: number;
  y: number;
  radius: number;
  label: string;
}

interface SmokeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  glow: number;
}

export default function ShaderCyberVolumetricLaser() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Volumetric Parameters
  const [beamCount, setBeamCount] = useState<number>(5); // 1 to 9
  const [fogDensity, setFogDensity] = useState<number>(0.65); // 0.2 to 1.0
  const [apertureAngle, setApertureAngle] = useState<number>(65); // 20 to 120 deg
  const [laserWavelength, setLaserWavelength] = useState<'CRIMSON_650NM' | 'CYAN_488NM' | 'EMERALD_532NM' | 'UV_405NM'>('CRIMSON_650NM');
  const [autoSweep, setAutoSweep] = useState<boolean>(true);
  const [strobePulse, setStrobePulse] = useState<boolean>(false);

  // Emitter and obstacle state
  const emitterRef = useRef<{ x: number; y: number; angle: number }>({
    x: 100,
    y: 100,
    angle: 0.8,
  });

  const obstaclesRef = useRef<Obstacle[]>([
    { x: 420, y: 220, radius: 45, label: 'PRISM_NODE_01' },
    { x: 680, y: 340, radius: 55, label: 'FIREWALL_CRYSTAL' },
    { x: 300, y: 380, radius: 38, label: 'ROUTER_CORE' },
  ]);

  const activeDragIndex = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Atmospheric smoke / dust particles
    const particles: SmokeParticle[] = [];
    const particleCount = 140;
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * 1000,
        y: Math.random() * 600,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4 - 0.2, // gentle drift upwards
        size: Math.random() * 3 + 1,
        alpha: Math.random() * 0.5 + 0.1,
        glow: 0,
      });
    }

    const render = () => {
      time += 0.03;

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);

      // Handle auto-sweep rotation
      if (autoSweep) {
        emitterRef.current.angle = 0.85 + Math.sin(time * 0.9) * 0.55;
        emitterRef.current.x = width * 0.15;
        emitterRef.current.y = height * 0.2;
      }

      // Deep cyberpunk bunker backdrop
      ctx.fillStyle = '#05060a';
      ctx.fillRect(0, 0, width, height);

      // Cyber telemetry grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridGap = 50;
      for (let x = 0; x < width; x += gridGap) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridGap) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Wavelength color palette selection
      let laserHex = '#ff0055';
      let laserGlow = 'rgba(255, 0, 85, ';
      if (laserWavelength === 'CYAN_488NM') {
        laserHex = '#00f0ff';
        laserGlow = 'rgba(0, 240, 255, ';
      } else if (laserWavelength === 'EMERALD_532NM') {
        laserHex = '#10b981';
        laserGlow = 'rgba(16, 185, 129, ';
      } else if (laserWavelength === 'UV_405NM') {
        laserHex = '#a855f7';
        laserGlow = 'rgba(168, 85, 247, ';
      }

      const pulseMult = strobePulse ? (Math.sin(time * 20) > 0.1 ? 1.4 : 0.3) : 1.0;

      // Update and draw ambient smoke particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;
        p.glow *= 0.92; // decay glow

        // Base dust
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * fogDensity * 0.4})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Tyndall flare if illuminated by laser
        if (p.glow > 0.05) {
          ctx.fillStyle = `${laserGlow}${p.glow * 0.9 * pulseMult})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const ex = emitterRef.current.x;
      const ey = emitterRef.current.y;
      const centerAngle = emitterRef.current.angle;
      const radAperture = (apertureAngle * Math.PI) / 180;
      const obstacles = obstaclesRef.current;

      // ==========================================
      // RAYCASTING & VOLUMETRIC CONE RENDERING
      // ==========================================
      const maxRayDist = Math.sqrt(width * width + height * height);

      const castRay = (angle: number) => {
        const dirX = Math.cos(angle);
        const dirY = Math.sin(angle);
        let closestDist = maxRayDist;
        let hitObstacle: Obstacle | null = null;

        // Circle intersection testing
        obstacles.forEach((obs) => {
          const ox = (obs.x / 1000) * width;
          const oy = (obs.y / 600) * height;
          const or = (obs.radius / 1000) * width;

          const toCircleX = ox - ex;
          const toCircleY = oy - ey;
          const projection = toCircleX * dirX + toCircleY * dirY;

          if (projection > 0) {
            const perpDistSq = toCircleX * toCircleX + toCircleY * toCircleY - projection * projection;
            if (perpDistSq < or * or) {
              const dAlongRay = Math.sqrt(or * or - perpDistSq);
              const dist = projection - dAlongRay;
              if (dist > 0 && dist < closestDist) {
                closestDist = dist;
                hitObstacle = obs;
              }
            }
          }
        });

        return {
          dist: closestDist,
          hitX: ex + dirX * closestDist,
          hitY: ey + dirY * closestDist,
          hitObstacle,
        };
      };

      // Draw volumetric fog light fan
      const rayPoints: { x: number; y: number }[] = [];
      const numRays = beamCount === 1 ? 1 : beamCount * 8; // fine interpolation for volumetric haze
      const stepAngle = numRays === 1 ? 0 : radAperture / (numRays - 1);
      const startAngle = numRays === 1 ? centerAngle : centerAngle - radAperture / 2;

      for (let r = 0; r < numRays; r++) {
        const curAngle = startAngle + r * stepAngle;
        const hit = castRay(curAngle);
        rayPoints.push({ x: hit.hitX, y: hit.hitY });

        // Energize nearby particles along ray
        particles.forEach((p) => {
          const toPX = p.x - ex;
          const toPY = p.y - ey;
          const pAngle = Math.atan2(toPY, toPX);
          let angleDiff = Math.abs(pAngle - curAngle);
          if (angleDiff > Math.PI) angleDiff = Math.PI * 2 - angleDiff;
          if (angleDiff < 0.015) {
            const pDist = Math.sqrt(toPX * toPX + toPY * toPY);
            if (pDist < hit.dist) {
              p.glow = 1.0;
            }
          }
        });
      }

      // Draw Volumetric Haze Mesh
      if (rayPoints.length > 1) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        rayPoints.forEach((pt) => ctx.lineTo(pt.x, pt.y));
        ctx.closePath();

        const hazeGrad = ctx.createRadialGradient(ex, ey, 20, ex, ey, maxRayDist * 0.75);
        hazeGrad.addColorStop(0, `${laserGlow}${0.45 * fogDensity * pulseMult})`);
        hazeGrad.addColorStop(0.35, `${laserGlow}${0.2 * fogDensity * pulseMult})`);
        hazeGrad.addColorStop(1, `${laserGlow}0)`);
        ctx.fillStyle = hazeGrad;
        ctx.fill();
        ctx.restore();
      }

      // Draw Discrete Sharp Laser Beams
      const beamStep = beamCount === 1 ? 0 : radAperture / (beamCount - 1);
      const beamStart = beamCount === 1 ? centerAngle : centerAngle - radAperture / 2;

      for (let b = 0; b < beamCount; b++) {
        const bAngle = beamStart + b * beamStep;
        const hit = castRay(bAngle);

        // Core laser beam
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(hit.hitX, hit.hitY);
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5 * pulseMult;
        ctx.stroke();

        // Outer glow beam
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(hit.hitX, hit.hitY);
        ctx.strokeStyle = laserHex;
        ctx.lineWidth = 9 * pulseMult;
        ctx.globalAlpha = 0.6 * fogDensity;
        ctx.stroke();
        ctx.globalAlpha = 1.0;

        // Laser impact spark at terminal surface
        ctx.beginPath();
        ctx.arc(hit.hitX, hit.hitY, 8 * pulseMult, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(hit.hitX, hit.hitY, 20 * pulseMult, 0, Math.PI * 2);
        ctx.fillStyle = `${laserGlow}0.5)`;
        ctx.fill();
      }

      // ==========================================
      // DRAW CYBERNETIC OBSTACLES & OCLLUDERS
      // ==========================================
      obstacles.forEach((obs, idx) => {
        const ox = (obs.x / 1000) * width;
        const oy = (obs.y / 600) * height;
        const or = (obs.radius / 1000) * width;

        // Obstacle body
        ctx.save();
        ctx.beginPath();
        ctx.arc(ox, oy, or, 0, Math.PI * 2);
        ctx.fillStyle = '#0c0f16';
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = idx === activeDragIndex.current ? '#ffffff' : laserHex;
        ctx.stroke();

        // Inner glowing reticle
        ctx.beginPath();
        ctx.arc(ox, oy, or * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.stroke();

        // Label
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 16px "JetBrains Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(obs.label, ox, oy);
        ctx.restore();
      });

      // ==========================================
      // DRAW EMITTER TURRET
      // ==========================================
      ctx.save();
      ctx.translate(ex, ey);
      ctx.rotate(centerAngle);

      // Emitter body
      ctx.fillStyle = '#181b22';
      ctx.fillRect(-20, -14, 40, 28);
      ctx.strokeStyle = laserHex;
      ctx.lineWidth = 2;
      ctx.strokeRect(-20, -14, 40, 28);

      // Emitter lens barrel
      ctx.fillStyle = laserHex;
      ctx.fillRect(16, -6, 12, 12);

      // Core focus emitter bulb
      ctx.beginPath();
      ctx.arc(0, 0, 16, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Pointer handlers for moving emitter or dragging obstacles
    const handlePointerDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = ((e.clientX - rect.left) / rect.width) * 1000;
      const clickY = ((e.clientY - rect.top) / rect.height) * 600;

      // Check if clicking an obstacle
      const obstacles = obstaclesRef.current;
      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        const dx = clickX - obs.x;
        const dy = clickY - obs.y;
        if (Math.sqrt(dx * dx + dy * dy) < obs.radius * 1.3) {
          activeDragIndex.current = i;
          soundFx.playTick(1000);
          return;
        }
      }

      // Otherwise aim emitter directly at pointer
      const ex1000 = (emitterRef.current.x / (canvas.offsetWidth * 2)) * 1000;
      const ey1000 = (emitterRef.current.y / (canvas.offsetHeight * 2)) * 600;
      emitterRef.current.angle = Math.atan2(clickY - ey1000, clickX - ex1000);
      setAutoSweep(false);
      soundFx.playTick(800);
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const curX = ((e.clientX - rect.left) / rect.width) * 1000;
      const curY = ((e.clientY - rect.top) / rect.height) * 600;

      if (activeDragIndex.current !== null) {
        const obs = obstaclesRef.current[activeDragIndex.current];
        obs.x = curX;
        obs.y = curY;
      } else if (!autoSweep && e.buttons === 1) {
        const ex1000 = (emitterRef.current.x / (canvas.offsetWidth * 2)) * 1000;
        const ey1000 = (emitterRef.current.y / (canvas.offsetHeight * 2)) * 600;
        emitterRef.current.angle = Math.atan2(curY - ey1000, curX - ex1000);
      }
    };

    const handlePointerUp = () => {
      if (activeDragIndex.current !== null) {
        activeDragIndex.current = null;
        soundFx.playTick(600);
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
    };
  }, [beamCount, fogDensity, apertureAngle, laserWavelength, autoSweep, strobePulse]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-rose-500 font-bold tracking-widest uppercase mb-1">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span>BATCH 10 // VARIATION 48 &bull; CYBERPUNK VOLUMETRICS</span>
            </div>
            <h2 className="font-['Syne'] text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Cyberpunk Volumetric Laser Scanner &amp; Fog Caustics
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(800);
                setAutoSweep(!autoSweep);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 border transition-all ${
                autoSweep
                  ? 'bg-rose-500 text-white border-rose-400 font-bold shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${autoSweep ? 'animate-spin' : ''}`} />
              <span>{autoSweep ? 'SWEEP ACTIVE' : 'MANUAL AIM'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playTick(950);
                setStrobePulse(!strobePulse);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs flex items-center gap-1.5 border transition-colors ${
                strobePulse
                  ? 'bg-amber-400 text-black border-amber-400 font-bold shadow-[0_0_12px_rgba(251,191,36,0.3)]'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{strobePulse ? 'STROBE: ON' : 'STROBE: OFF'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(650);
                setLaserWavelength('CRIMSON_650NM');
              }}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                laserWavelength === 'CRIMSON_650NM'
                  ? 'bg-rose-600 text-white border-rose-500 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Crimson (650nm)
            </button>

            <button
              onClick={() => {
                soundFx.playClick(700);
                setLaserWavelength('CYAN_488NM');
              }}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                laserWavelength === 'CYAN_488NM'
                  ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Holo Cyan (488nm)
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                setLaserWavelength('EMERALD_532NM');
              }}
              className={`px-2.5 py-1.5 rounded font-mono text-xs border transition-colors ${
                laserWavelength === 'EMERALD_532NM'
                  ? 'bg-emerald-500 text-black border-emerald-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Emerald (532nm)
            </button>
          </div>
        </div>

        {/* Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 rounded-xl border border-white/10 bg-black overflow-hidden relative shadow-2xl h-[460px] sm:h-[520px]">
            <canvas
              ref={canvasRef}
              className="w-full h-full block cursor-crosshair"
              title="Click & drag to aim laser scanner or reposition occluding firewall nodes"
              data-cursor="drag"
            />

            {/* In-canvas watermark */}
            <div className="absolute top-3 left-4 pointer-events-none flex items-center gap-3 font-mono text-[11px] text-zinc-400 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded border border-white/10">
              <span className="text-rose-400 flex items-center gap-1.5">
                <Terminal className="w-3 h-3" />
                BEAMS: {beamCount}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-400">APERTURE: {apertureAngle}&deg;</span>
              <span className="text-zinc-600">|</span>
              <span className="text-amber-400">FOG: {Math.round(fogDensity * 100)}%</span>
            </div>

            <div className="absolute bottom-3 right-4 pointer-events-none font-mono text-[11px] text-zinc-500 bg-black/70 px-2.5 py-1 rounded">
              DRAG NODES TO CAST VOLUMETRIC SHADOWS
            </div>
          </div>

          {/* Controls HUD */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 uppercase pb-3 border-b border-white/10 mb-4">
                <Sliders className="w-4 h-4 text-rose-500" />
                <span>Photon Scatter Physics</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Laser Fan Beams:</span>
                    <strong className="text-rose-400">{beamCount} Beams</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="1"
                    value={beamCount}
                    onChange={(e) => {
                      soundFx.playTick(800);
                      setBeamCount(parseInt(e.target.value));
                    }}
                    className="w-full accent-rose-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>Single (1)</span>
                    <span>Fan Array (5)</span>
                    <span>Dense (9)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Fog Particle Density:</span>
                    <strong className="text-cyan-400">{Math.round(fogDensity * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={fogDensity}
                    onChange={(e) => {
                      soundFx.playTick(850);
                      setFogDensity(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">Tyndall effect particulate haze</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Fan Aperture Spread:</span>
                    <strong className="text-amber-400">{apertureAngle}&deg;</strong>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="120"
                    step="5"
                    value={apertureAngle}
                    onChange={(e) => {
                      soundFx.playTick(900);
                      setApertureAngle(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold">
                <Move className="w-3.5 h-3.5" />
                <span>Interactive Occluders:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Click &amp; drag the circular firewall nodes to move them through the laser cone, generating pitch-black shadow volumes in the smoke fog.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlueprintHUD>
);
}
