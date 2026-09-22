import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Activity, Cpu, HardDrive, Wifi, Zap, RefreshCw, Play, Pause, FastForward, Sliders, Layers, Sparkles } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'dashboard_v01_chromatictelemetryhud',
  name: 'Chromatic Liquid Glassmorphic Telemetry HUD',
  category: 'Dashboard',
  batch: 'Batch 6: Dashboards & Node Visualizers',
  techStack: ['React 19', 'SVG Radial Gauges', 'Canvas Wave Oscilloscope', 'Gaussian Glassmorphism', 'Web Audio Synth'],
  aestheticVibe: 'Chromatic Liquid Gradient / Glassmorphic HUD',
  interactionBlueprint: 'Dynamic SVG radial gauge strokes calculate circular offset dasharrays. Canvas oscilloscope plots live harmonic sine curves with mouse-modulated frequency. Translucent glassmorphic tiles cast chromatic liquid caustics matching cursor proximity.',
  description: 'Ultra-dense, responsive telemetry dashboard featuring chromatic liquid backlights, animated SVG radial gauges, real-time waveform oscilloscope, live cluster nodes, and time-scrub playback controls.',
  codeSnippet: `<svg className="w-24 h-24 -rotate-90">
  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="none" />
  <circle cx="48" cy="48" r="40" stroke="url(#chromaticGrad)" strokeWidth="6" fill="none"
    strokeDasharray={2 * Math.PI * 40}
    strokeDashoffset={(1 - value / 100) * 2 * Math.PI * 40}
    strokeLinecap="round" className="transition-all duration-500" />
</svg>`,
  tags: ['Dashboard', 'Telemetry', 'Glassmorphism', 'Canvas Wave', 'Radial Gauge', 'Chromatic'],
};

interface ClusterNode {
  id: string;
  name: string;
  region: string;
  load: number;
  latency: number;
  status: 'OPTIMAL' | 'DEGRADED' | 'STANDBY';
}

export default function DashboardChromaticTelemetryHUD() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Live state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [glowIntensity, setGlowIntensity] = useState<number>(0.7);
  const [noiseWaveScale, setNoiseWaveScale] = useState<number>(1.2);
  const [selectedNode, setSelectedNode] = useState<string>('node-us-east');

  // Dynamic telemetry metrics
  const [metrics, setMetrics] = useState({
    cpu: 68,
    memory: 42,
    bandwidth: 84,
    thermal: 56,
    rps: 14200,
    activeSockets: 3891,
  });

  const [nodes, setNodes] = useState<ClusterNode[]>([
    { id: 'node-us-east', name: 'US-East Core (Virginia)', region: 'us-east-1', load: 74, latency: 18, status: 'OPTIMAL' },
    { id: 'node-eu-central', name: 'EU-Central (Frankfurt)', region: 'eu-central-1', load: 58, latency: 42, status: 'OPTIMAL' },
    { id: 'node-ap-east', name: 'AP-East (Tokyo)', region: 'ap-northeast-1', load: 89, latency: 94, status: 'DEGRADED' },
    { id: 'node-sa-east', name: 'SA-East (São Paulo)', region: 'sa-east-1', load: 34, latency: 135, status: 'STANDBY' },
  ]);

  // Handle cursor glow tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  // Oscilloscope canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      const w = (canvas.width = canvas.offsetWidth * 2);
      const h = (canvas.height = canvas.offsetHeight * 2);

      ctx.clearRect(0, 0, w, h);

      if (isPlaying) {
        phase += 0.04 * playbackSpeed;
      }

      // Draw background grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = w / 16;
      for (let x = 0; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Draw multi-harmonic liquid wave 1 (Cyan/Blue)
      ctx.beginPath();
      ctx.lineWidth = 3;
      const grad1 = ctx.createLinearGradient(0, 0, w, 0);
      grad1.addColorStop(0, '#06b6d4');
      grad1.addColorStop(0.5, '#3b82f6');
      grad1.addColorStop(1, '#8b5cf6');
      ctx.strokeStyle = grad1;

      for (let x = 0; x < w; x += 4) {
        const normX = x / w;
        const wave1 = Math.sin(normX * 8 * noiseWaveScale + phase) * (h * 0.22);
        const wave2 = Math.cos(normX * 14 * noiseWaveScale - phase * 1.4) * (h * 0.1);
        const mouseFactor = (1 - Math.abs(normX - mousePos.x)) * 25;
        const y = h * 0.5 + wave1 + wave2 + Math.sin(phase * 2) * mouseFactor;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw harmonic wave 2 (Magenta/Pink ghost)
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.6)';
      for (let x = 0; x < w; x += 6) {
        const normX = x / w;
        const wave = Math.sin(normX * 12 * noiseWaveScale + phase * 0.8) * (h * 0.18);
        const y = h * 0.5 + wave;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isPlaying, playbackSpeed, mousePos, noiseWaveScale]);

  // Periodic metric jitter simulation
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        cpu: Math.min(98, Math.max(30, prev.cpu + (Math.random() * 8 - 4) * playbackSpeed)),
        memory: Math.min(95, Math.max(35, prev.memory + (Math.random() * 4 - 2) * playbackSpeed)),
        bandwidth: Math.min(99, Math.max(50, prev.bandwidth + (Math.random() * 6 - 3) * playbackSpeed)),
        thermal: Math.min(88, Math.max(45, prev.thermal + (Math.random() * 3 - 1.5) * playbackSpeed)),
        rps: Math.round(14000 + Math.random() * 1200),
        activeSockets: Math.round(3800 + Math.random() * 200),
      }));
    }, 1500 / playbackSpeed);

    return () => clearInterval(interval);
  }, [isPlaying, playbackSpeed]);

  const renderRadialGauge = (label: string, value: number, unit: string, colorGrad: string) => {
    const radius = 38;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md relative overflow-hidden group hover:border-white/25 transition-all">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke={colorGrad}
              strokeWidth="6"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="font-mono text-lg font-extrabold text-white tracking-tight">
              {Math.round(value)}
              <span className="text-[10px] text-zinc-400 ml-0.5">{unit}</span>
            </span>
          </div>
        </div>
        <span className="mt-2 font-mono text-[11px] font-semibold text-zinc-400 tracking-wider uppercase">
          {label}
        </span>
      </div>
    );
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#06080d] overflow-hidden text-zinc-100"
      >
        {/* Dynamic Chromatic Liquid Glow that follows cursor */}
        <div
          className="pointer-events-none absolute -inset-10 transition-opacity duration-500 blur-3xl opacity-40"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(6, 182, 212, ${glowIntensity * 0.35}), rgba(168, 85, 247, ${glowIntensity * 0.25}), transparent 70%)`,
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-black font-black shadow-lg shadow-cyan-500/20">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                    CHROMATIC TELEMETRY CORE // V6.1
                  </span>
                </div>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Quantum Fiber Ingress &amp; Node Orchestrator
                </h3>
              </div>
            </div>

            {/* Playback & Real-Time Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setIsPlaying(!isPlaying);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold flex items-center gap-1.5 border transition-all ${
                  isPlaying
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}
                data-cursor="hover"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPlaying ? 'STREAMING' : 'PAUSED'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(750);
                  setPlaybackSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 4 : 1));
                }}
                className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 font-mono text-xs text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
                data-cursor="hover"
              >
                <FastForward className="w-3.5 h-3.5 text-purple-400" />
                <span>{playbackSpeed}x SPEED</span>
              </button>
            </div>
          </div>

          {/* Grid Layout: Radial Gauges + Main Oscilloscope */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 4 Gauges (Col 4) */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-3">
              {renderRadialGauge('Compute CPU', metrics.cpu, '%', '#06b6d4')}
              {renderRadialGauge('Buffer RAM', metrics.memory, '%', '#8b5cf6')}
              {renderRadialGauge('Throughput', metrics.bandwidth, '%', '#ec4899')}
              {renderRadialGauge('Core Temp', metrics.thermal, '°C', '#f59e0b')}

              {/* Auxiliary Quick Stat Tiles */}
              <div className="col-span-2 p-4 rounded-xl bg-white/[0.03] border border-white/10 backdrop-blur-md flex items-center justify-between">
                <div>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">Requests / Sec</span>
                  <p className="font-mono text-xl font-bold text-cyan-300">{metrics.rps.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-zinc-400 uppercase">Active Sockets</span>
                  <p className="font-mono text-xl font-bold text-purple-300">{metrics.activeSockets.toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Right Oscilloscope & Live Wave (Col 8) */}
            <div className="lg:col-span-8 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col justify-between relative overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-white font-bold">SYNTHETIC OSCILLOSCOPE STREAM</span>
                  <span className="text-zinc-500">|</span>
                  <span>Harmonic Liquid Waveform</span>
                </div>
                <div className="font-mono text-[11px] text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  FEED SYNC: 100%
                </div>
              </div>

              {/* Canvas Waveform */}
              <div className="w-full h-48 relative rounded-xl bg-black/40 border border-white/5 overflow-hidden">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute top-2 left-3 font-mono text-[10px] text-zinc-500">
                  CH-A: 44.1kHz // 32-bit Floating Mesh
                </div>
                <div className="absolute bottom-2 right-3 font-mono text-[10px] text-zinc-500">
                  CURSOR PROXIMITY WARP: ACTIVE
                </div>
              </div>

              {/* Interactive Audio Wave Tuners */}
              <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                    <span>Wave Frequency</span>
                    <span className="text-cyan-400">{noiseWaveScale.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="3.0"
                    step="0.1"
                    value={noiseWaveScale}
                    onChange={(e) => setNoiseWaveScale(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                    <span>Liquid Glow</span>
                    <span className="text-purple-400">{(glowIntensity * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="1.0"
                    step="0.05"
                    value={glowIntensity}
                    onChange={(e) => setGlowIntensity(parseFloat(e.target.value))}
                    className="w-full accent-purple-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                <div className="col-span-2 sm:col-span-1 flex items-end">
                  <button
                    onClick={() => {
                      soundFx.playChime(700, 0.4);
                      setMetrics((prev) => ({
                        ...prev,
                        cpu: Math.min(99, prev.cpu + 15),
                        bandwidth: Math.min(99, prev.bandwidth + 10),
                      }));
                    }}
                    className="w-full py-1.5 px-2 rounded bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:from-cyan-500/30 hover:to-purple-500/30 border border-cyan-400/30 text-cyan-300 font-mono text-xs font-bold transition-all"
                    data-cursor="hover"
                  >
                    ⚡ Pulse Burst (+15%)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Node Clusters & Live Ingress Ledger */}
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-400" />
                <h4 className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Global Ingress Clusters &amp; Mesh Gateway Telemetry
                </h4>
              </div>
              <span className="font-mono text-[11px] text-zinc-500">
                CLICK ANY NODE TO INSPECT LIVE PACKET ROUTE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => {
                      soundFx.playClick(isSelected ? 650 : 850);
                      setSelectedNode(node.id);
                    }}
                    className={`p-4 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)]'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                    data-cursor="hover"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-xs font-bold text-white">{node.name}</span>
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                          node.status === 'OPTIMAL'
                            ? 'bg-emerald-500/20 text-emerald-300'
                            : node.status === 'DEGRADED'
                            ? 'bg-amber-500/20 text-amber-300'
                            : 'bg-zinc-500/20 text-zinc-400'
                        }`}
                      >
                        {node.status}
                      </span>
                    </div>

                    <div className="space-y-1 font-mono text-[11px] text-zinc-400">
                      <div className="flex justify-between">
                        <span>Load:</span>
                        <span className="text-white font-bold">{node.load}%</span>
                      </div>
                      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                          style={{ width: `${node.load}%` }}
                        />
                      </div>
                      <div className="flex justify-between pt-1">
                        <span>Latency:</span>
                        <span className="text-cyan-300 font-bold">{node.latency} ms</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
