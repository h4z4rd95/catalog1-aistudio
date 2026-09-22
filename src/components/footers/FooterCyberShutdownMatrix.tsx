import React, { useState, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Power, ShieldAlert, Cpu, Activity, RefreshCw, Terminal, Radio, Lock } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Footer_V04_CyberShutdownMatrix',
  name: 'Cyberpunk Holographic Cockpit & Interactive System Shutdown',
  category: 'Footer',
  batch: 'Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics Elements',
  techStack: ['Next.js / React', 'Canvas Scanlines & Glitch', 'Cyber Cockpit HUD', 'Interactive System Shutdown'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic HUD',
  interactionBlueprint: 'Interactive cyber control center footer with real-time telemetry meters; pressing "INITIATE SYSTEM SHUTDOWN" triggers simulated kernel disengagement, CRT power-down collapse, and emergency reboot sequences.',
  description: 'A high-density cyberpunk command cockpit footer with real-time hardware telemetry gauges, cryptographic network signatures, and an interactive emergency system shutdown routine.',
  tags: ['Cyberpunk', 'Holographic Cockpit', 'System Shutdown', 'High-Density HUD', 'CRT Power Down'],
  codeSnippet: `// Interactive emergency shutdown sequence
const triggerShutdown = () => {
  setIsShuttingDown(true);
  playGlitchSound();
  setTimeout(() => {
    setIsOffline(true);
    setIsShuttingDown(false);
  }, 1200);
};`,
};

export default function FooterCyberShutdownMatrix() {
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [glitchIntensity, setGlitchIntensity] = useState(1.0);
  const [cpuLoad, setCpuLoad] = useState(38);
  const [ping, setPing] = useState(0.84);

  // Live fluctuating telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(Math.floor(32 + Math.random() * 20));
      setPing(parseFloat((0.75 + Math.random() * 0.25).toFixed(2)));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const initiateShutdown = () => {
    soundFx.playGlitchSound();
    setIsShuttingDown(true);
    setTimeout(() => {
      soundFx.playClick(200, 0.1);
      setIsOffline(true);
      setIsShuttingDown(false);
    }, 1400);
  };

  const rebootSystem = () => {
    soundFx.playCyberBlip();
    setIsOffline(false);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-400 mb-1">
              HUD Glitch Factor ({glitchIntensity.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="2.5"
              step="0.1"
              value={glitchIntensity}
              onChange={(e) => setGlitchIntensity(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">
              Kernel State
            </label>
            <span
              className={`block py-1.5 px-3 rounded font-bold text-center border ${
                isOffline
                  ? 'bg-rose-950/80 text-rose-400 border-rose-500/50'
                  : 'bg-emerald-950/80 text-emerald-400 border-emerald-500/50'
              }`}
            >
              {isOffline ? 'OFFLINE // DISENGAGED' : 'ONLINE // 60 FPS'}
            </span>
          </div>

          <div className="flex items-end">
            <button
              onClick={isOffline ? rebootSystem : initiateShutdown}
              className={`w-full py-1.5 px-3 rounded font-bold font-mono text-xs flex items-center justify-center gap-1.5 transition-colors ${
                isOffline
                  ? 'bg-cyan-400 text-black hover:bg-cyan-300'
                  : 'bg-rose-600 text-white hover:bg-rose-500'
              }`}
            >
              {isOffline ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reboot Kernel</span>
                </>
              ) : (
                <>
                  <Power className="w-3.5 h-3.5" />
                  <span>Test Shutdown</span>
                </>
              )}
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#03050a] text-white flex flex-col justify-between overflow-hidden select-none border-y border-cyan-500/30 font-mono">
        {/* Holographic Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />

        {/* Simulated CRT Screen Collapse when Offline */}
        {isShuttingDown && (
          <div className="absolute inset-0 z-50 bg-white/20 backdrop-invert animate-pulse pointer-events-none" />
        )}

        {isOffline ? (
          /* Offline Cockpit View */
          <div className="relative z-30 my-auto py-24 flex flex-col items-center justify-center text-center px-6">
            <ShieldAlert className="w-16 h-16 text-rose-500 animate-bounce mb-4" />
            <h3 className="text-3xl font-black text-rose-500 tracking-wider uppercase">
              MAINFRAME DISENGAGED // ALL NODES DARK
            </h3>
            <p className="mt-2 text-zinc-500 text-xs max-w-md">
              Emergency power cut off executed. Subroutines purged from active registers.
            </p>
            <button
              onClick={rebootSystem}
              className="mt-6 px-6 py-3 rounded bg-cyan-400 text-black font-bold text-xs uppercase hover:bg-cyan-300 flex items-center gap-2 shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all"
              data-cursor="hover"
            >
              <RefreshCw className="w-4 h-4" />
              <span>RE-ENGAGE SYSTEM KERNEL</span>
            </button>
          </div>
        ) : (
          /* Active Cockpit View */
          <>
            {/* Top Telemetry Diagnostic Bar */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-900/40 pb-4">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">
                  COCKPIT_HUD_MATRIX // V04
                </span>
              </div>

              <div className="flex items-center gap-6 text-xs text-zinc-400">
                <div className="flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>CPU: {cpuLoad}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" />
                  <span>PING: {ping}ms</span>
                </div>
                <div className="flex items-center gap-2 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>TLS 1.3 / ENCRYPTED</span>
                </div>
              </div>
            </div>

            {/* Center High-Density Cockpit Command Grid */}
            <div className="relative z-20 w-full max-w-6xl mx-auto my-auto px-8 py-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: System Telemetry */}
              <div className="p-6 rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs text-cyan-400 mb-3 border-b border-cyan-900/50 pb-2">
                  <span>TELEMETRY_01</span>
                  <span>60 FPS</span>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                  HARDWARE BUFFER
                </h4>
                <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                  Dual-pass WebGL framebuffers active. Zero memory leaks detected across 20 production variations.
                </p>
                <div className="mt-4 flex gap-1 h-1.5 bg-zinc-900 rounded overflow-hidden">
                  <div className="w-3/4 bg-cyan-400" />
                  <div className="w-1/4 bg-emerald-400" />
                </div>
              </div>

              {/* Card 2: Interactive Emergency Control */}
              <div className="p-6 rounded-xl bg-black/60 border border-rose-500/30 backdrop-blur-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-rose-400 mb-3 border-b border-rose-900/50 pb-2">
                    <span>SAFETY_INTERLOCK</span>
                    <span className="text-amber-400">ARMED</span>
                  </div>
                  <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                    EMERGENCY SHUTDOWN
                  </h4>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    Instantly disengage all active shaders, raycasters, and sound synthesis routines.
                  </p>
                </div>

                <button
                  onClick={initiateShutdown}
                  className="mt-6 w-full py-2.5 rounded bg-rose-600/20 border border-rose-500/40 hover:bg-rose-600 text-rose-300 hover:text-white font-bold text-xs uppercase transition-all flex items-center justify-center gap-2"
                  data-cursor="hover"
                >
                  <Power className="w-4 h-4" />
                  <span>Initiate Shutdown</span>
                </button>
              </div>

              {/* Card 3: Cryptographic Routing */}
              <div className="p-6 rounded-xl bg-black/60 border border-cyan-500/30 backdrop-blur-xl">
                <div className="flex items-center justify-between text-xs text-cyan-400 mb-3 border-b border-cyan-900/50 pb-2">
                  <span>ROUTER_CHAIN</span>
                  <span className="text-emerald-400">LIVE</span>
                </div>
                <h4 className="text-lg font-bold text-white uppercase tracking-wide">
                  SIGNAL DISPATCH
                </h4>
                <ul className="mt-3 space-y-1.5 text-xs text-zinc-400">
                  <li className="flex justify-between">
                    <span>IP MASK:</span>
                    <span className="text-cyan-300">198.51.100.24</span>
                  </li>
                  <li className="flex justify-between">
                    <span>HASH:</span>
                    <span className="text-cyan-300">0x7F4B..88E</span>
                  </li>
                  <li className="flex justify-between">
                    <span>UPTIME:</span>
                    <span className="text-emerald-400">99.998%</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Cyber Terminal Directory */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 border-t border-cyan-900/40 pt-4">
              <span>&copy; 2026 CYBERPUNK HUD ARCHIVE // STRICTLY ENCRYPTED</span>
              <span className="text-cyan-400 font-bold">TERMINAL STATUS: READY</span>
            </div>
          </>
        )}
      </div>
    </BlueprintHUD>
  );
}
