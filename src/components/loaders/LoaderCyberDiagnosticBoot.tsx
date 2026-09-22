import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Terminal, Shield, Cpu, Zap, RotateCcw, Check, Bug } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Loader_V03_CyberDiagnosticBoot',
  name: 'Cyberpunk BIOS Terminal Diagnostic Boot Sequence',
  category: 'Loader',
  batch: 'Batch 3: Immersive Page Loaders & Fluid Transitions',
  techStack: ['Next.js / React', 'Terminal Diagnostic Engine', 'Synthetic Glitch Audio', 'Scanline Matrix'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic HUD',
  interactionBlueprint: 'High-speed diagnostic stream tests memory, GPU shader registers, and cryptographic cipher keys with green pass indicators before unlocking stage access.',
  description: 'An authentic high-density cyberpunk bootloader displaying kernel logs, hex addresses, hardware diagnostics, and simulated glitch bursts.',
  tags: ['Cyberpunk', 'BIOS Bootloader', 'Diagnostic Terminal', 'Micro-Glitches', 'High-Density'],
  codeSnippet: `// Asynchronous BIOS Kernel Boot Step Pipeline
const bootStages = [
  { step: 'INIT_KERNEL', log: 'Mounting vfs_matrix at 0x7FFF92... OK' },
  { step: 'ALLOC_VRAM', log: 'Binding GL_UNIFORM_BUFFER 64.0 GB... OK' },
  { step: 'RAYCAST_MESH', log: 'Calibrating 2D distance field nodes... OK' },
  { step: 'SECURE_HANDSHAKE', log: 'RSA-4096 SHA256 cryptographic sign... OK' },
  { step: 'CORE_ONLINE', log: 'Access granted. Visual Cockpit ready.' },
];`,
};

const defaultLogs = [
  '[0.0012] BOOT: System core initialized. Architecture x86_64_NEO',
  '[0.0481] MEM: Scanning 65536 MB high-bandwidth physical VRAM... [PASS]',
  '[0.1092] GPU: WebGL 2.0 context acquired (NVIDIA RTX Compute Cluster)',
  '[0.1622] SHADER: Compiling simplex noise GLSL fragment program 0x8F01... [PASS]',
  '[0.2201] RAYCAST: Pre-computing spatial bounding volumes & BVH tree... [PASS]',
  '[0.2811] AUDIO: AudioContext procedural synth engine activated... [OK]',
  '[0.3400] CIPHER: RSA-4096 Handshake verified with mainframe... [AUTHENTICATED]',
  '[0.4100] NET: Latency 0.42ms to edge cluster us-east1... [PASS]',
  '[0.4900] DIAGNOSTIC: All 8 hardware test vectors verified with 0 warnings.',
  '[0.5500] ACCESS: Granting root visual session privileges to client operator.',
];

export default function LoaderCyberDiagnosticBoot() {
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [glitchTrigger, setGlitchTrigger] = useState(false);

  // Tunable parameters
  const [bootSpeed, setBootSpeed] = useState(35); // ms per log

  const startBoot = () => {
    soundFx.playCyberBlip();
    setIsRunning(true);
    setIsBooted(false);
    setLogs([]);
    setProgress(0);

    let idx = 0;
    const interval = setInterval(() => {
      if (idx < defaultLogs.length) {
        const nextLog = defaultLogs[idx];
        setLogs((prev) => [...prev, nextLog]);
        idx++;
        const p = Math.round((idx / defaultLogs.length) * 100);
        setProgress(p);

        // Sound blip per log
        soundFx.playClick(1000 + idx * 40, 0.01);

        // Simulated glitch halfway
        if (idx === 4) {
          setGlitchTrigger(true);
          setTimeout(() => setGlitchTrigger(false), 120);
        }
      } else {
        clearInterval(interval);
        setProgress(100);
        setIsBooted(true);
        setIsRunning(false);
        soundFx.playChime(1100, 0.3);
      }
    }, bootSpeed);
  };

  useEffect(() => {
    startBoot();
  }, []);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Kernel Log Rate ({bootSpeed}ms/line)
            </label>
            <input
              type="range"
              min="15"
              max="90"
              step="5"
              value={bootSpeed}
              onChange={(e) => setBootSpeed(parseInt(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Simulate Micro-Glitch
            </label>
            <button
              onClick={() => {
                soundFx.playCyberBlip();
                setGlitchTrigger(true);
                setTimeout(() => setGlitchTrigger(false), 200);
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-cyan-500/30 text-cyan-300 font-mono text-xs hover:bg-cyan-950 font-bold uppercase transition-colors flex items-center justify-center gap-1"
            >
              <Bug className="w-3.5 h-3.5" />
              <span>Inject Glitch</span>
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={startBoot}
              disabled={isRunning}
              className="w-full py-1.5 px-3 rounded bg-cyan-400 disabled:opacity-50 text-black font-mono text-xs font-bold uppercase hover:bg-cyan-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-Run Bootloader</span>
            </button>
          </div>
        </div>
      }
    >
      <div 
        className={`relative w-full min-h-[85vh] bg-[#050811] text-white flex flex-col justify-between p-6 select-none overflow-hidden border-y border-white/10 ${
          glitchTrigger ? 'skew-x-2 filter invert' : ''
        }`}
      >
        {/* Scanlines & Grid Backdrop */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

        {/* Top Header Bar */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between border-b border-cyan-900/50 pb-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Terminal className="w-4 h-4" />
            <span>CYBER_DIAGNOSTIC_BIOS // V4.08</span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 text-[11px]">
            <span>BOOT: {isBooted ? 'OPERATIONAL' : 'IN_PROGRESS'}</span>
            <span className="text-cyan-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Center Boot Terminal Stage */}
        <div className="relative z-10 w-full max-w-4xl mx-auto my-auto p-6 rounded-xl bg-black/80 border border-cyan-500/40 shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          {/* Progress Bar Strip */}
          <div className="w-full h-1.5 bg-cyan-950 rounded-full mb-6 overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-cyan-400 transition-all duration-100 shadow-[0_0_15px_rgba(6,182,212,0.8)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Terminal Console Logs */}
          <div className="font-mono text-xs space-y-1.5 min-h-[220px] max-h-[300px] overflow-y-auto pr-2">
            {logs.map((log, i) => (
              <div 
                key={i} 
                className="flex items-center gap-2 text-zinc-300 animate-in fade-in slide-in-from-bottom-1 duration-100"
              >
                <span className="text-cyan-500 font-bold">&gt;</span>
                <span className={log.includes('[PASS]') || log.includes('[AUTHENTICATED]') ? 'text-emerald-400 font-bold' : ''}>
                  {log}
                </span>
              </div>
            ))}
            {isRunning && (
              <div className="flex items-center gap-2 text-cyan-400 animate-pulse">
                <span>&gt;</span>
                <span className="w-2.5 h-4 bg-cyan-400 inline-block" />
              </div>
            )}
          </div>

          {/* Unlocked Confirmation Box */}
          {isBooted && (
            <div className="mt-6 pt-4 border-t border-cyan-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center">
                  <Check className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-white uppercase block">
                    KERNEL PRIVILEGES UNLOCKED
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 block">
                    All hardware modules reporting optimal 60 FPS cadence
                  </span>
                </div>
              </div>

              <button
                onClick={startBoot}
                className="px-5 py-2 rounded bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase transition-all shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                data-cursor="hover"
              >
                Re-Arm Boot Sequence
              </button>
            </div>
          )}
        </div>

        {/* Bottom Colophon */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between pt-3 border-t border-cyan-900/50 font-mono text-[11px] text-zinc-500">
          <span>HARDWARE REGISTER: 0xDEADBEEF</span>
          <span className="text-cyan-400 font-bold">CRYPTO ENGINE PASS</span>
        </div>
      </div>
    </BlueprintHUD>
  );
}
