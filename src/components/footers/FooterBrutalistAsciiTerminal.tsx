import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Terminal, Send, Check, AlertCircle, CornerDownLeft, Sparkles, RefreshCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Footer_V02_BrutalistAsciiTerminal',
  name: 'Brutalist ASCII Monospace & Interactive CLI Command Footer',
  category: 'Footer',
  batch: 'Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics Elements',
  techStack: ['Next.js / React', 'ASCII Typographic Matrix', 'Interactive CLI Terminal', 'Neo-Brutalism'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Monospace High-Contrast',
  interactionBlueprint: 'High-contrast brutalist footer featuring an interactive CLI shell supporting user input (try typing `help`, `contact`, `status`, `hire`, or `matrix`); includes ASCII art headers and mechanical sound feedback.',
  description: 'An unapologetic neo-brutalist monospace footer equipped with a live interactive CLI console, raw ASCII typography, hardware telemetry registers, and command execution.',
  tags: ['Neo-Brutalist', 'ASCII Typography', 'CLI Terminal', 'Interactive Shell', 'Monospace'],
  codeSnippet: `// Terminal command parser with sound-reactive feedback
const executeCommand = (cmd: string) => {
  const clean = cmd.trim().toLowerCase();
  switch (clean) {
    case 'help':
      return 'AVAILABLE: [contact, hire, status, stack, clear, matrix]';
    case 'contact':
      return 'TRANSMIT SIGNAL TO: atelier@aurelia.studio';
    case 'status':
      return 'SYSTEM: 60FPS / 0 ERRORS / 100% OPERATIONAL';
    default:
      return \`COMMAND NOT RECOGNIZED: "\${clean}". TYPE 'help'.\`;
  }
};`,
};

const asciiBanner = `
   █████╗ ██╗   ██╗██████╗ ███████╗██╗     ██╗ █████╗ 
  ██╔══██╗██║   ██║██╔══██╗██╔════╝██║     ██║██╔══██╗
  ███████║██║   ██║██████╔╝█████╗  ██║     ██║███████║
  ██╔══██║██║   ██║██╔══██╗██╔══╝  ██║     ██║██╔══██║
  ██║  ██║╚██████╔╝██║  ██║███████╗███████╗██║██║  ██║
  ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝╚═╝  ╚═╝
`;

export default function FooterBrutalistAsciiTerminal() {
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd?: string; res: string; isError?: boolean }>>([
    { res: 'AURELIA_OS v4.19.0 // KERNEL BOOT SUCCESSFUL' },
    { res: 'Type "help" to display list of executable subroutines.' },
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [asciiScale, setAsciiScale] = useState(1.0);
  const [scanlinesEnabled, setScanlinesEnabled] = useState(true);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    soundFx.playClick(850, 0.04);
    const cmd = currentInput.trim().toLowerCase();
    let res = '';
    let isError = false;

    switch (cmd) {
      case 'help':
        res = 'SUPPORTED COMMANDS: [contact, hire, status, stack, clear, matrix, ping]';
        break;
      case 'contact':
        res = 'SIGNAL ADDR: atelier@aurelia.studio | DISCORD: /invite/aurelia';
        break;
      case 'hire':
        res = 'STATUS: ACCEPTING SELECT Q4 2026 COMMISSIONS. BUDGET MIN: $40K.';
        break;
      case 'status':
        res = 'GPU BUFFER: CLEAN | LATENCY: 0.82ms | MEMORY LEAKS: 0 | 60FPS LOCKED';
        break;
      case 'stack':
        res = 'ENGINE: Next.js 15, Three.js GLSL, Tailwind v4, Motion, Web Audio API';
        break;
      case 'ping':
        res = 'PONG: Roundtrip 4.12ms to edge gateway.';
        break;
      case 'matrix':
        res = 'WAKE UP, NEO... THE VIBE CODING MATRIX HAS YOU.';
        break;
      case 'clear':
        setTerminalHistory([]);
        setCurrentInput('');
        return;
      default:
        res = `ERR: Command "${cmd}" not recognized. Execute "help" for options.`;
        isError = true;
    }

    setTerminalHistory((prev) => [...prev, { cmd: currentInput, res, isError }]);
    setCurrentInput('');
  };

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-400 mb-1">
              ASCII Scale Factor ({asciiScale.toFixed(2)}x)
            </label>
            <input
              type="range"
              min="0.7"
              max="1.3"
              step="0.05"
              value={asciiScale}
              onChange={(e) => setAsciiScale(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">
              Terminal Scanlines
            </label>
            <button
              onClick={() => {
                soundFx.playClick(600);
                setScanlinesEnabled(!scanlinesEnabled);
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/10 text-amber-300 hover:bg-zinc-700 transition-colors"
            >
              {scanlinesEnabled ? 'Scanlines: Active' : 'Scanlines: Disabled'}
            </button>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setTerminalHistory([
                  { res: 'TERMINAL PURGED. AURELIA_OS v4.19 READY.' },
                ]);
              }}
              className="w-full py-1.5 px-3 rounded bg-amber-400 text-black font-bold hover:bg-amber-300 transition-colors flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear Terminal</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full bg-[#0a0a0d] text-zinc-100 flex flex-col justify-between overflow-hidden select-none border-y-2 border-white/20 font-mono">
        {scanlinesEnabled && (
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />
        )}

        {/* Top Ticker Bar */}
        <div className="w-full bg-amber-400 text-black py-1.5 px-6 font-bold text-xs uppercase tracking-wider flex items-center justify-between border-b-2 border-black z-20">
          <span>&bull; AURELIA STUDIO MONOSPACE ARCHIVE &bull; SITE OF THE YEAR CANDIDATE &bull;</span>
          <span className="hidden sm:inline">TERMINAL_PORT: 8080 // SSH_SECURE</span>
        </div>

        {/* Center Section: Giant ASCII Art Banner */}
        <div className="w-full py-8 px-6 overflow-x-auto text-center border-b border-white/10 bg-black/40">
          <pre
            style={{ transform: `scale(${asciiScale})` }}
            className="inline-block text-amber-400 font-bold leading-none text-[9px] sm:text-xs md:text-sm tracking-tighter transition-transform"
          >
            {asciiBanner}
          </pre>
          <div className="mt-2 text-zinc-500 text-xs">
            HIGH-CONTRAST NEO-BRUTALIST ARCHITECTURAL MONOSPACE SYSTEM
          </div>
        </div>

        {/* Interactive CLI Command Shell */}
        <div className="w-full max-w-4xl mx-auto my-6 p-6 rounded-xl bg-black border-2 border-amber-400/40 shadow-[0_0_30px_rgba(251,191,36,0.15)] z-20">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3 text-xs text-zinc-400">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Terminal className="w-4 h-4" />
              <span>AURELIA_SHELL // v4.19</span>
            </div>
            <span>TYPE &quot;help&quot; OR &quot;contact&quot;</span>
          </div>

          {/* Terminal History */}
          <div className="h-44 overflow-y-auto space-y-1.5 text-xs text-zinc-300 pr-2">
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                {item.cmd && (
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <span>&gt;</span>
                    <span>{item.cmd}</span>
                  </div>
                )}
                <div
                  className={`pl-4 ${
                    item.isError ? 'text-rose-400 font-bold' : 'text-zinc-300'
                  }`}
                >
                  {item.res}
                </div>
              </div>
            ))}
            <div ref={scrollEndRef} />
          </div>

          {/* Input Line */}
          <form onSubmit={handleCommandSubmit} className="mt-3 pt-3 border-t border-white/10 flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              placeholder="Type command ('help', 'contact', 'hire', 'status')..."
              className="flex-1 bg-transparent text-amber-200 outline-none text-xs font-mono placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="px-3 py-1 bg-amber-400 text-black font-bold text-xs rounded hover:bg-amber-300 transition-colors flex items-center gap-1"
            >
              <span>SEND</span>
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Bottom Brutalist Directory Grid */}
        <div className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-zinc-400">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2">
              [01] DIRECTORIES
            </h5>
            <ul className="space-y-1 text-zinc-400">
              <li className="hover:text-amber-400 cursor-pointer">&gt; /index/showcase</li>
              <li className="hover:text-amber-400 cursor-pointer">&gt; /shaders/glsl</li>
              <li className="hover:text-amber-400 cursor-pointer">&gt; /kinetic/type</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2">
              [02] NETWORKS
            </h5>
            <ul className="space-y-1 text-zinc-400">
              <li className="hover:text-amber-400 cursor-pointer">&gt; github.com/aurelia</li>
              <li className="hover:text-amber-400 cursor-pointer">&gt; x.com/aureliastudio</li>
              <li className="hover:text-amber-400 cursor-pointer">&gt; are.na/aurelia-lab</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2">
              [03] PROTOCOLS
            </h5>
            <ul className="space-y-1 text-zinc-400">
              <li>ENCRYPTION: AES-256</li>
              <li>LATENCY: &lt; 1ms</li>
              <li>FRAME_RATE: 60.0 FPS</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-2">
              [04] COMMISSIONS
            </h5>
            <p className="text-zinc-500 leading-relaxed">
              Accepting select bespoke web projects. Direct queries to terminal.
            </p>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="w-full bg-black py-3 px-6 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-500">
          <span>&copy; 2026 AURELIA NEO-BRUTALIST ARCHIVE. NO RIGHTS RESERVED.</span>
          <span className="text-amber-400 font-bold">NODE: MONOSPACE_RUNNER</span>
        </div>
      </div>
    </BlueprintHUD>
  );
}
