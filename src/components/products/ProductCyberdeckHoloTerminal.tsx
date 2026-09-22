import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Terminal, Cpu, Flame, BatteryCharging, WifiOff, Zap, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'product_v03_cyberdeckholoterminal',
  name: 'Cyberpunk Cyberdeck Holographic Terminal & Hardware Flasher',
  category: 'Product',
  batch: 'Batch 7: Spatial E-Commerce & 3D Configurator Showcases',
  techStack: ['React 19', 'Canvas 2D Thermal Heatmap', 'Firmware Flasher Engine', 'Overclock Telemetry', 'Cyber Glitch Audio'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Military Cyberdeck',
  interactionBlueprint: 'Live 4-zone thermal core heatmaps monitor real-time temperature fluctuations under simulated compute load. Overclock switches trigger cryo-pump fans, while the firmware flash utility verifies kernel cryptographic checksums.',
  description: 'Military-spec tactical cyberdeck console showcase featuring real-time thermal gradient heatmaps, overclock toggles, battery discharge metrics, and interactive firmware flash utilities.',
  codeSnippet: `// Thermal heatmap zone calculation
const temp = baseTemp + (isOverclocked ? 24 : 0) + Math.sin(time + zone.id) * 3;
ctx.fillStyle = \`hsl(\${Math.max(0, 180 - temp * 2.2)}, 90%, 50%)\`;`,
  tags: ['Product', 'Cyberpunk', 'Cyberdeck', 'Thermal Heatmap', 'Hardware', 'Glitch'],
};

export default function ProductCyberdeckHoloTerminal() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // States
  const [isOverclocked, setIsOverclocked] = useState<boolean>(false);
  const [cryoPumpActive, setCryoPumpActive] = useState<boolean>(true);
  const [stealthRF, setStealthRF] = useState<boolean>(false);
  const [flashingFirmware, setFlashingFirmware] = useState<boolean>(false);
  const [flashProgress, setFlashProgress] = useState<number>(100);
  const [activeZone, setActiveZone] = useState<string>('FPGA-CORE');

  // Thermal Heatmap Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const zones = [
      { id: 'FPGA-CORE', label: 'FPGA Core', x: 80, y: 70, baseTemp: 52 },
      { id: 'QUANTUM-TX', label: 'Quantum Subspace RF', x: 220, y: 70, baseTemp: 44 },
      { id: 'NEURO-PROC', label: 'Neuromorphic Tensor', x: 80, y: 170, baseTemp: 60 },
      { id: 'LIFEPO4-CELL', label: 'Solid-State Battery', x: 220, y: 170, baseTemp: 38 },
    ];

    const render = () => {
      time += 0.03;
      const width = (canvas.width = canvas.offsetWidth * 2);
      const height = (canvas.height = canvas.offsetHeight * 2);
      ctx.clearRect(0, 0, width, height);

      // Grid backdrop
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw thermal zones
      zones.forEach((zone) => {
        const tempDelta = (isOverclocked ? 18 : 0) - (cryoPumpActive ? 8 : 0);
        const currentTemp = zone.baseTemp + tempDelta + Math.sin(time * 2 + zone.x) * 2;

        const isSelected = activeZone === zone.id;

        // Radial Thermal Bloom
        const grad = ctx.createRadialGradient(zone.x, zone.y, 10, zone.x, zone.y, 65);
        const hue = Math.max(0, 140 - (currentTemp - 30) * 3.5); // green (cool) to red/orange (hot)
        grad.addColorStop(0, `hsla(${hue}, 100%, 50%, 0.6)`);
        grad.addColorStop(1, `hsla(${hue}, 100%, 50%, 0.0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(zone.x, zone.y, 65, 0, Math.PI * 2);
        ctx.fill();

        // Zone border box
        ctx.strokeStyle = isSelected ? '#22c55e' : 'rgba(255,255,255,0.2)';
        ctx.lineWidth = isSelected ? 2 : 1;
        ctx.strokeRect(zone.x - 50, zone.y - 35, 100, 70);

        // Text
        ctx.font = 'bold 11px "JetBrains Mono"';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText(zone.label, zone.x, zone.y - 10);

        ctx.font = '12px "JetBrains Mono"';
        ctx.fillStyle = isOverclocked ? '#f97316' : '#22c55e';
        ctx.fillText(`${currentTemp.toFixed(1)}°C`, zone.x, zone.y + 12);
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOverclocked, cryoPumpActive, activeZone]);

  // Flash firmware simulation
  const handleFlashFirmware = () => {
    if (flashingFirmware) return;
    soundFx.playGlitchSound();
    setFlashingFirmware(true);
    setFlashProgress(0);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFlashProgress(progress);
      if (progress % 30 === 0) {
        soundFx.playClick(900);
      }
      if (progress >= 100) {
        clearInterval(interval);
        setFlashingFirmware(false);
        soundFx.playCyberBlip();
      }
    }, 150);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#040806] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Terminal className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold block">
                  TACTICAL DECK TELEMETRY // MIL-SPEC X88
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Cyberdeck Neuromorphic Field Console
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="px-3 py-1 rounded bg-black/60 border border-emerald-500/30 text-emerald-300">
                POWER: 98% LiFePO4
              </span>
              <span className="px-3 py-1 rounded bg-emerald-500/20 text-white font-bold">
                $2,150 CR
              </span>
            </div>
          </div>

          {/* Main Grid: Thermal Heatmap + Controls & Flash Utility */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Heatmap & Hardware Blueprint (Col 7) */}
            <div className="lg:col-span-7 p-5 rounded-2xl bg-black/80 border border-emerald-500/30 flex flex-col justify-between relative overflow-hidden min-h-[460px]">
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3 text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-emerald-400" />
                  <span>CORE THERMAL EMISSIVITY MAP (QUAD-ZONE)</span>
                </span>
                <span className="text-emerald-400">CRYO-LOOP: {cryoPumpActive ? 'OPTIMAL' : 'DISABLED'}</span>
              </div>

              {/* Thermal Canvas Viewport */}
              <div className="w-full h-64 relative flex items-center justify-center my-3">
                <canvas ref={canvasRef} className="w-full h-full block" />
              </div>

              {/* Quick Hardware Toggles */}
              <div className="pt-3 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <button
                  onClick={() => {
                    soundFx.playClick(isOverclocked ? 700 : 900);
                    setIsOverclocked(!isOverclocked);
                  }}
                  className={`p-2.5 rounded border font-bold flex items-center justify-between transition-colors ${
                    isOverclocked
                      ? 'bg-orange-500/20 border-orange-400 text-orange-300'
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  <span>OVERCLOCK:</span>
                  <span>{isOverclocked ? '4.8 GHz (HOT)' : '3.2 GHz'}</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick(800);
                    setCryoPumpActive(!cryoPumpActive);
                  }}
                  className={`p-2.5 rounded border font-bold flex items-center justify-between transition-colors ${
                    cryoPumpActive
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  <span>CRYO PUMP:</span>
                  <span>{cryoPumpActive ? 'ACTIVE' : 'OFF'}</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playClick(750);
                    setStealthRF(!stealthRF);
                  }}
                  className={`p-2.5 rounded border font-bold flex items-center justify-between transition-colors ${
                    stealthRF
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                      : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  <span>STEALTH RF:</span>
                  <span>{stealthRF ? 'SILENT' : 'BROADCAST'}</span>
                </button>
              </div>
            </div>

            {/* Firmware Flasher & Order Console (Col 5) */}
            <div className="lg:col-span-5 p-5 rounded-2xl bg-zinc-950/90 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs">
                  <span className="text-emerald-400 font-bold uppercase">FIRMWARE FLASH UTILITY</span>
                  <span className="text-zinc-500 font-mono">KERNEL v9.4-PROTOTYPE</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between text-zinc-400 text-[11px]">
                    <span>FLASH STATUS:</span>
                    <span className="text-emerald-400 font-bold">{flashProgress}%</span>
                  </div>
                  <div className="w-full h-2 rounded bg-zinc-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 transition-all duration-150"
                      style={{ width: `${flashProgress}%` }}
                    />
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-black/60 border border-emerald-500/20 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">FPGA Logic Cells:</span>
                    <span className="text-white font-bold">1,240,000 Gates</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Storage Bus:</span>
                    <span className="text-cyan-400 font-bold">NVMe Gen-5 (14 GB/s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Encryption Chip:</span>
                    <span className="text-emerald-400 font-bold">Kyber-1024 Post-Quantum</span>
                  </div>
                </div>

                <button
                  onClick={handleFlashFirmware}
                  disabled={flashingFirmware}
                  className="w-full py-2.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                  data-cursor="hover"
                >
                  <Zap className="w-4 h-4" />
                  <span>{flashingFirmware ? 'Flashing Neuromorphic Core...' : 'Flash Tactical Firmware v9.4'}</span>
                </button>
              </div>

              {/* Buy Deck CTA */}
              <button
                onClick={() => soundFx.playCyberBlip()}
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-black uppercase text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
                data-cursor="hover"
              >
                <span>Acquire Tactical Slate &bull; $2,150 CR</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
