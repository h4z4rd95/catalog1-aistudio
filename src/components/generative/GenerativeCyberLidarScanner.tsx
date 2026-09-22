import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Crosshair, Radar, Terminal, Compass, Eye, ShieldCheck, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'generative_v03_cyberlidarscanner',
  name: 'Cyberpunk LiDAR Pointcloud Scanner & Topographic Radar HUD',
  category: 'Generative',
  batch: 'Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures',
  techStack: ['React 19', 'Canvas 2D Raycast Math', 'LiDAR Sweep Geometry', 'Elevation Depth Palettes', 'Target Acquisition Matrix'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Military Telemetry',
  interactionBlueprint: 'High-frequency 360° LiDAR rotational sweep illuminating a procedurally generated 3D topographic pointcloud landscape. Interactive target acquisition crosshair computes realtime Euclidean distances, elevation gradients, and azimuth angles.',
  description: 'Military-grade tactical LiDAR pointcloud terrain visualizer with continuous rotational sweep, false-color depth mapping (Infrared, Matrix Green, Oceanic, Neon Amber), and interactive coordinate locking.',
  codeSnippet: `// LiDAR sweep illumination threshold & depth color mapping
const angleDiff = Math.abs((pointAngle - sweepAngle + Math.PI * 4) % (Math.PI * 2));
const intensity = Math.max(0, 1 - angleDiff / beamWidth);
ctx.fillStyle = getElevationColor(p.z, intensity);`,
  tags: ['Generative', 'LiDAR', 'Cyberpunk', 'Pointcloud', 'Radar', 'Telemetry', 'Topography'],
};

interface LidarPoint {
  x: number;
  y: number;
  z: number; // elevation
  dist: number;
  angle: number;
}

export default function GenerativeCyberLidarScanner() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [scanSpeed, setScanSpeed] = useState<number>(3); // 1 to 6
  const [pointDensity, setPointDensity] = useState<number>(1400); // 500 to 2500
  const [colorRamp, setColorRamp] = useState<'INFRARED' | 'MATRIX_GREEN' | 'OCEANIC' | 'NEON_AMBER'>('MATRIX_GREEN');
  const [lockedTarget, setLockedTarget] = useState<{ x: number; y: number; dist: number; elev: number } | null>({
    x: 420,
    y: 280,
    dist: 342,
    elev: 88,
  });

  const pointsRef = useRef<LidarPoint[]>([]);

  // Generate procedural topographic point cloud
  useEffect(() => {
    const pts: LidarPoint[] = [];
    const count = pointDensity;

    for (let i = 0; i < count; i++) {
      // Polar distribution with topological hills
      const r = Math.sqrt(Math.random()) * 280;
      const theta = Math.random() * Math.PI * 2;
      const x = Math.cos(theta) * r;
      const y = Math.sin(theta) * r;

      // Simulated elevation using composite sine hills
      const z =
        Math.sin(x * 0.02) * Math.cos(y * 0.02) * 50 +
        Math.sin(x * 0.05 + y * 0.05) * 25 +
        (1 - r / 300) * 40;

      pts.push({
        x,
        y,
        z: Math.max(0, z + 60),
        dist: Math.round(r),
        angle: (theta + Math.PI * 2) % (Math.PI * 2),
      });
    }

    pointsRef.current = pts;
  }, [pointDensity]);

  // Main LiDAR Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepAngle = 0;

    const render = () => {
      sweepAngle = (sweepAngle + scanSpeed * 0.015) % (Math.PI * 2);

      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      const centerX = width / 2;
      const centerY = height / 2;

      // Deep tactical backdrop with faint decay trails
      ctx.fillStyle = 'rgba(2, 6, 8, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Radar Range Rings
      const rings = [70, 140, 210, 280];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r * 1.6, 0, Math.PI * 2);
        ctx.strokeStyle = idx === rings.length - 1 ? 'rgba(34, 197, 94, 0.35)' : 'rgba(34, 197, 94, 0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Distance label
        ctx.font = '18px monospace';
        ctx.fillStyle = 'rgba(34, 197, 94, 0.4)';
        ctx.fillText(`${(idx + 1) * 250}M`, centerX + 10, centerY - r * 1.6 + 18);
      });

      // Cardinal Azimuth crosshairs
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.15)';
      ctx.beginPath();
      ctx.moveTo(centerX, centerY - 460);
      ctx.lineTo(centerX, centerY + 460);
      ctx.moveTo(centerX - 460, centerY);
      ctx.lineTo(centerX + 460, centerY);
      ctx.stroke();

      // Sweeping LiDAR Beam Cone
      const beamSpread = 0.45; // radians
      const gradient = ctx.createConicGradient(sweepAngle, centerX, centerY);
      gradient.addColorStop(0, 'rgba(34, 211, 238, 0.4)');
      gradient.addColorStop(0.08, 'rgba(34, 197, 94, 0.15)');
      gradient.addColorStop(beamSpread, 'transparent');
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 450, 0, Math.PI * 2);
      ctx.fill();

      // Leading beam ray line
      const rayX = centerX + Math.cos(sweepAngle) * 440;
      const rayY = centerY + Math.sin(sweepAngle) * 440;
      ctx.strokeStyle = '#4ade80';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(rayX, rayY);
      ctx.stroke();

      // Render Point Cloud
      const pts = pointsRef.current;
      pts.forEach((p) => {
        // Point illumination based on angular proximity to beam
        const diff = Math.abs((p.angle - sweepAngle + Math.PI * 4) % (Math.PI * 2));
        const illuminated = diff < 0.65;
        const fade = illuminated ? Math.max(0.15, 1 - diff / 0.65) : 0.08;

        const screenX = centerX + p.x * 1.6;
        const screenY = centerY + p.y * 1.6;

        let color = '';
        if (colorRamp === 'MATRIX_GREEN') {
          color = `rgba(74, 222, 128, ${fade})`;
        } else if (colorRamp === 'INFRARED') {
          const normZ = Math.min(1, p.z / 120);
          color = `rgba(${Math.round(255 * normZ)}, ${Math.round(255 * (1 - normZ))}, 60, ${fade})`;
        } else if (colorRamp === 'OCEANIC') {
          color = `rgba(56, 189, 248, ${fade})`;
        } else {
          color = `rgba(251, 191, 36, ${fade})`;
        }

        ctx.fillStyle = color;
        const pointSize = illuminated ? 2.5 + (p.z / 120) * 2 : 1.5;
        ctx.fillRect(screenX - pointSize / 2, screenY - pointSize / 2, pointSize, pointSize);
      });

      // Render Locked Target Crosshairs if active
      if (lockedTarget) {
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.strokeRect(lockedTarget.x - 16, lockedTarget.y - 16, 32, 32);
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(lockedTarget.x, lockedTarget.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = '#ef4444';
        ctx.fill();

        ctx.font = '20px monospace';
        ctx.fillStyle = '#f87171';
        ctx.fillText(`TARGET: LOCK ${lockedTarget.dist}M // ELEV: ${lockedTarget.elev}M`, lockedTarget.x + 22, lockedTarget.y + 6);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [scanSpeed, colorRamp, lockedTarget]);

  // Click canvas to acquire lock
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    soundFx.playChime(950, 0.25);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) * (canvas.width / rect.width);
    const y = (e.clientY - rect.top) * (canvas.height / rect.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = (x - centerX) / 1.6;
    const dy = (y - centerY) / 1.6;
    const dist = Math.round(Math.hypot(dx, dy) * 1.5);
    const elev = Math.round(Math.sin(dx * 0.03) * 40 + 75);

    setLockedTarget({ x, y, dist, elev });
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#020507] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/50">
                <Radar className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                  TACTICAL GEOSPATIAL TELEMETRY // SPEC-8.3
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Cyberpunk 360° LiDAR Pointcloud Topography
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  setLockedTarget(null);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs font-bold hover:text-white transition-colors"
                data-cursor="hover"
              >
                CLEAR TARGET LOCK
              </button>

              <button
                onClick={() => {
                  soundFx.playChime(1100, 0.3);
                  // Lock random target point
                  const canvas = canvasRef.current;
                  if (canvas) {
                    const angle = Math.random() * Math.PI * 2;
                    const r = 80 + Math.random() * 160;
                    const x = canvas.width / 2 + Math.cos(angle) * r * 1.6;
                    const y = canvas.height / 2 + Math.sin(angle) * r * 1.6;
                    setLockedTarget({
                      x,
                      y,
                      dist: Math.round(r * 1.5),
                      elev: Math.round(50 + Math.random() * 80),
                    });
                  }
                }}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all"
                data-cursor="hover"
              >
                <Crosshair className="w-3.5 h-3.5" />
                <span>ACQUIRE TARGET</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column: LiDAR Canvas Radar Viewport + Tactical Control Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* LiDAR Scope (Col 8) */}
            <div className="lg:col-span-8 p-4 rounded-2xl bg-black border border-emerald-500/30 relative overflow-hidden flex flex-col justify-between min-h-[480px] shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-zinc-400 z-10">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-emerald-400 font-bold">AZIMUTH PULSE ACTIVE (120 FPS)</span>
                </span>
                <span>CLICK TERRAIN TO LOCK TARGET</span>
              </div>

              {/* Radar Screen Canvas */}
              <div className="w-full h-84 relative flex items-center justify-center my-auto cursor-crosshair">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full h-full block rounded-xl"
                />
              </div>

              {/* Bottom Telemetry HUD */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400 z-10">
                <span className="text-emerald-400 font-bold">
                  POINTS: {pointDensity} // RANGE: 1,000M MAX
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">COLOR RAMP:</span>
                  {(['MATRIX_GREEN', 'INFRARED', 'OCEANIC', 'NEON_AMBER'] as const).map((ramp) => (
                    <button
                      key={ramp}
                      onClick={() => {
                        soundFx.playClick(800);
                        setColorRamp(ramp);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        colorRamp === ramp
                          ? 'bg-emerald-500 text-black'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                      data-cursor="hover"
                    >
                      {ramp.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tactical Parameter Controls (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/90 border border-emerald-500/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    LiDAR Scanning Configuration
                  </h4>
                </div>

                {/* 1. Sweep Angular Velocity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">SWEEP ANGULAR RPM:</span>
                    <span className="text-emerald-400 font-bold">{(scanSpeed * 20).toFixed(0)} RPM</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    value={scanSpeed}
                    onChange={(e) => setScanSpeed(parseInt(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 2. Point Cloud Density */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-zinc-400">RAY DENSITY:</span>
                    <span className="text-cyan-400 font-bold">{pointDensity} VECTORS</span>
                  </div>
                  <input
                    type="range"
                    min="600"
                    max="2200"
                    step="100"
                    value={pointDensity}
                    onChange={(e) => setPointDensity(parseInt(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* Target Dossier Box */}
                <div className="p-4 rounded-xl bg-black border border-emerald-500/30 space-y-2 text-xs">
                  <span className="text-emerald-400 font-bold uppercase text-[10px] block">
                    TELEMETRY COORDINATE DOSSIER
                  </span>
                  {lockedTarget ? (
                    <div className="space-y-1 font-mono text-zinc-300">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">RADIAL DIST:</span>
                        <span className="text-white font-bold">{lockedTarget.dist} METERS</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">TERRAIN ELEVATION:</span>
                        <span className="text-white font-bold">+{lockedTarget.elev}M MSL</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-zinc-500">RADAR AZIMUTH:</span>
                        <span className="text-emerald-400 font-bold">
                          {Math.round(((lockedTarget.x / 4) % 360))}° CLASSIFIED
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-zinc-500 py-2 italic text-center">
                      No active target lock. Click terrain to pin crosshair.
                    </div>
                  )}
                </div>
              </div>

              {/* Ping Sound Trigger */}
              <button
                onClick={() => soundFx.playChime(1200, 0.4)}
                className="w-full py-3.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                data-cursor="hover"
              >
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Transmit LiDAR Calibration Ping</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
