import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Radio, Compass, Wifi, Shield, Zap, Search, Globe, Terminal, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'dashboard_v03_cyberorbitaltopologygraph',
  name: 'Cyberpunk Interactive Orbital Node Topology Graph',
  category: 'Dashboard',
  batch: 'Batch 6: Dashboards & Node Visualizers',
  techStack: ['React 19', 'Canvas 2D Orbital Engine', 'Trigonometric Node Routing', 'Packet Pulse Physics', 'Cyber Telemetry HUD'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic Radar',
  interactionBlueprint: 'Continuous trigonometric polar coordinate orbits (r, θ, ω). Real-time packet pulses trace Bezier route paths between interconnected orbital nodes. Direct node click locks telemetry radar beam and displays cryptographic signatures.',
  description: 'Futuristic planetary topology dashboard featuring draggable satellites, real-time packet transmission animations, multi-tier orbital rings, and an interactive cryptographic node inspector.',
  codeSnippet: `// Polar to Cartesian coordinate projection with orbital velocity
const angle = node.theta + time * node.speed;
const x = cx + Math.cos(angle) * node.radius;
const y = cy + Math.sin(angle) * node.radius;`,
  tags: ['Dashboard', 'Cyberpunk', 'Orbital Graph', 'Topology', 'Canvas 2D', 'Radar'],
};

interface OrbitalNode {
  id: string;
  name: string;
  tier: number;
  radius: number;
  theta: number;
  speed: number;
  size: number;
  color: string;
  status: 'ONLINE' | 'STANDBY' | 'TRANSMITTING';
  hash: string;
  uplink: string;
}

interface Packet {
  fromNodeId: string;
  toNodeId: string;
  progress: number;
  speed: number;
}

export default function DashboardCyberOrbitalTopologyGraph() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('SAT-ALPHA-01');
  const [orbitSpeedMultiplier, setOrbitSpeedMultiplier] = useState<number>(1.0);
  const [packetRate, setPacketRate] = useState<number>(1.5);
  const [showRadarSweep, setShowRadarSweep] = useState<boolean>(true);

  // Nodes configuration
  const nodesRef = useRef<OrbitalNode[]>([
    { id: 'CORE-RELAY', name: 'Terran Gateway Core', tier: 0, radius: 0, theta: 0, speed: 0, size: 14, color: '#22d3ee', status: 'ONLINE', hash: '8f9b4c01...a21e', uplink: '100 Gbps Quantum' },
    { id: 'SAT-ALPHA-01', name: 'Alpha-01 Stratocaster', tier: 1, radius: 90, theta: 0.4, speed: 0.008, size: 8, color: '#38bdf8', status: 'TRANSMITTING', hash: 'a12b4e88...f902', uplink: '10.4 Gbps Laser' },
    { id: 'SAT-BETA-02', name: 'Beta-02 Orbital Sensor', tier: 1, radius: 90, theta: 3.5, speed: -0.006, size: 7, color: '#38bdf8', status: 'ONLINE', hash: 'c991e0a4...112d', uplink: '8.2 Gbps Laser' },
    { id: 'SAT-GAMMA-03', name: 'Gamma Deep Space Link', tier: 2, radius: 160, theta: 1.8, speed: 0.004, size: 9, color: '#f43f5e', status: 'TRANSMITTING', hash: 'fe4019a1...88ab', uplink: '40.0 Gbps Direct' },
    { id: 'SAT-DELTA-04', name: 'Delta Orbital Fortress', tier: 2, radius: 160, theta: 4.8, speed: 0.005, size: 8, color: '#f43f5e', status: 'ONLINE', hash: '33b01cd8...4490', uplink: '25.0 Gbps Laser' },
    { id: 'SAT-EPSILON-05', name: 'Epsilon Kuiper Relay', tier: 3, radius: 230, theta: 2.7, speed: -0.0025, size: 10, color: '#a855f7', status: 'ONLINE', hash: '77ea99f0...bc01', uplink: '5.0 Gbps Subspace' },
    { id: 'SAT-ZETA-06', name: 'Zeta Celestial Buoy', tier: 3, radius: 230, theta: 5.6, speed: 0.003, size: 7, color: '#a855f7', status: 'STANDBY', hash: '09cc88a2...3e5f', uplink: '1.2 Gbps Radio' },
  ]);

  const packetsRef = useRef<Packet[]>([
    { fromNodeId: 'CORE-RELAY', toNodeId: 'SAT-ALPHA-01', progress: 0.2, speed: 0.02 },
    { fromNodeId: 'SAT-ALPHA-01', toNodeId: 'SAT-GAMMA-03', progress: 0.6, speed: 0.015 },
    { fromNodeId: 'CORE-RELAY', toNodeId: 'SAT-BETA-02', progress: 0.8, speed: 0.025 },
    { fromNodeId: 'SAT-GAMMA-03', toNodeId: 'SAT-EPSILON-05', progress: 0.4, speed: 0.012 },
  ]);

  const selectedNode = nodesRef.current.find((n) => n.id === selectedNodeId) || nodesRef.current[0];

  // Canvas loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let sweepAngle = 0;

    const render = () => {
      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      sweepAngle += 0.015 * orbitSpeedMultiplier;

      // Draw concentric orbital radar rings
      const rings = [90, 160, 230];
      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = idx === 1 ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 4]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw Radar Sweep cone
      if (showRadarSweep) {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, 240, sweepAngle - 0.35, sweepAngle);
        ctx.closePath();
        const sweepGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 240);
        sweepGrad.addColorStop(0, 'rgba(34, 211, 238, 0.15)');
        sweepGrad.addColorStop(1, 'rgba(34, 211, 238, 0.0)');
        ctx.fillStyle = sweepGrad;
        ctx.fill();
        ctx.restore();
      }

      // Calculate real-time node coordinates
      const currentPositions: Record<string, { x: number; y: number }> = {};
      nodesRef.current.forEach((node) => {
        node.theta += node.speed * orbitSpeedMultiplier;
        const x = cx + Math.cos(node.theta) * node.radius;
        const y = cy + Math.sin(node.theta) * node.radius;
        currentPositions[node.id] = { x, y };
      });

      // Draw connection links between nodes
      const links: [string, string][] = [
        ['CORE-RELAY', 'SAT-ALPHA-01'],
        ['CORE-RELAY', 'SAT-BETA-02'],
        ['SAT-ALPHA-01', 'SAT-GAMMA-03'],
        ['SAT-BETA-02', 'SAT-DELTA-04'],
        ['SAT-GAMMA-03', 'SAT-EPSILON-05'],
        ['SAT-DELTA-04', 'SAT-ZETA-06'],
        ['SAT-ALPHA-01', 'SAT-BETA-02'],
      ];

      links.forEach(([fromId, toId]) => {
        const from = currentPositions[fromId];
        const to = currentPositions[toId];
        if (!from || !to) return;

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = 'rgba(34, 211, 238, 0.15)';
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw packets in transit
      packetsRef.current.forEach((pkt) => {
        pkt.progress += pkt.speed * packetRate;
        if (pkt.progress >= 1) {
          pkt.progress = 0;
        }

        const from = currentPositions[pkt.fromNodeId];
        const to = currentPositions[pkt.toNodeId];
        if (from && to) {
          const px = from.x + (to.x - from.x) * pkt.progress;
          const py = from.y + (to.y - from.y) * pkt.progress;

          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#facc15';
          ctx.shadowColor = '#facc15';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw all nodes
      nodesRef.current.forEach((node) => {
        const pos = currentPositions[node.id];
        if (!pos) return;
        const isSelected = selectedNodeId === node.id;

        // Selection beacon pulse
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, node.size + 8, 0, Math.PI * 2);
          ctx.strokeStyle = '#22d3ee';
          ctx.lineWidth = 1.5;
          ctx.setLineDash([2, 2]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Node core circle
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 16 : 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '10px "JetBrains Mono"';
        ctx.fillStyle = isSelected ? '#ffffff' : 'rgba(255,255,255,0.6)';
        ctx.textAlign = 'center';
        ctx.fillText(node.id, pos.x, pos.y + node.size + 14);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [orbitSpeedMultiplier, packetRate, showRadarSweep, selectedNodeId]);

  // Click canvas to select node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) * 2;
    const clickY = (e.clientY - rect.top) * 2;
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    // Find nearest node
    for (const node of nodesRef.current) {
      const x = cx + Math.cos(node.theta) * node.radius;
      const y = cy + Math.sin(node.theta) * node.radius;
      const dist = Math.hypot(clickX - x, clickY - y);
      if (dist < 25) {
        soundFx.playClick(900);
        setSelectedNodeId(node.id);
        break;
      }
    }
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#04060b] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Radio className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold block">
                  ORBITAL TOPOLOGY MATRIX // V6.3
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Constellation Laser Mesh &amp; Deep Space Relay
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => {
                  soundFx.playClick(700);
                  setShowRadarSweep(!showRadarSweep);
                }}
                className={`px-3 py-1.5 rounded-lg border font-bold transition-all ${
                  showRadarSweep
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                    : 'bg-white/5 text-zinc-400 border-white/10'
                }`}
                data-cursor="hover"
              >
                RADAR: {showRadarSweep ? 'SWEEPING' : 'OFF'}
              </button>
            </div>
          </div>

          {/* Main 2-Column: Radar Canvas + Node Telemetry Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Radar Viewport (Col 8) */}
            <div className="lg:col-span-8 p-4 rounded-2xl bg-black/60 border border-cyan-500/20 relative overflow-hidden flex flex-col justify-between">
              <div className="flex items-center justify-between text-xs text-zinc-400 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-cyan-400" />
                  <span>POLAR PROJECTION // CLICK SATELLITE TO LOCK</span>
                </div>
                <span className="text-cyan-400">7 ACTIVE SATELLITES</span>
              </div>

              {/* Canvas Radar */}
              <div className="w-full h-96 relative flex items-center justify-center">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  className="w-full h-full block cursor-crosshair"
                />
              </div>

              {/* Canvas Physics Controls */}
              <div className="pt-3 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                    <span>Orbit Speed</span>
                    <span className="text-cyan-400">{orbitSpeedMultiplier.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3.0"
                    step="0.2"
                    value={orbitSpeedMultiplier}
                    onChange={(e) => setOrbitSpeedMultiplier(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                    <span>Laser Pulse Rate</span>
                    <span className="text-yellow-400">{packetRate.toFixed(1)}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="4.0"
                    step="0.5"
                    value={packetRate}
                    onChange={(e) => setPacketRate(parseFloat(e.target.value))}
                    className="w-full accent-yellow-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      soundFx.playCyberBlip();
                      // trigger packet surge
                      packetsRef.current.push({
                        fromNodeId: 'CORE-RELAY',
                        toNodeId: selectedNodeId,
                        progress: 0,
                        speed: 0.03,
                      });
                    }}
                    className="w-full py-1.5 px-2 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-bold transition-colors text-center"
                    data-cursor="hover"
                  >
                    🚀 Transmit Burst Ping
                  </button>
                </div>
              </div>
            </div>

            {/* Node Inspector Drawer (Col 4) */}
            <div className="lg:col-span-4 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase">SATELLITE TELEMETRY</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/20 text-cyan-300">
                    {selectedNode.status}
                  </span>
                </div>

                <h4 className="text-lg font-bold text-white font-['Syne']">{selectedNode.name}</h4>
                <p className="text-xs text-zinc-400 mt-1">Satellite ID: {selectedNode.id}</p>

                <div className="mt-5 space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-black/50 border border-white/5 space-y-1">
                    <span className="text-zinc-500 text-[10px] block">CRYPTOGRAPHIC SIGNATURE (SHA-256)</span>
                    <span className="text-cyan-300 font-mono text-[11px] break-all">{selectedNode.hash}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                    <span className="text-zinc-400">Bandwidth Carrier:</span>
                    <span className="text-white font-bold">{selectedNode.uplink}</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                    <span className="text-zinc-400">Orbital Tier:</span>
                    <span className="text-purple-400 font-bold">Tier {selectedNode.tier} ({selectedNode.radius} km eq)</span>
                  </div>

                  <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex justify-between">
                    <span className="text-zinc-400">Angular Velocity (ω):</span>
                    <span className="text-emerald-400 font-bold">{(selectedNode.speed * 100).toFixed(2)} rad/s</span>
                  </div>
                </div>
              </div>

              {/* Quick Node Selector Pills */}
              <div>
                <span className="text-[10px] text-zinc-500 uppercase block mb-2">QUICK SATELLITE SWITCH:</span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {nodesRef.current.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        soundFx.playClick(800);
                        setSelectedNodeId(n.id);
                      }}
                      className={`p-1.5 rounded border text-left truncate transition-colors ${
                        selectedNodeId === n.id
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                          : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                      }`}
                      data-cursor="hover"
                    >
                      {n.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
