import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { 
  Command, 
  Search, 
  Terminal, 
  Zap, 
  Sparkles, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Layers, 
  ArrowRight,
  CornerDownLeft,
  X
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Nav_V05_TerminalCommandPalette',
  name: 'Cyberpunk Command Palette & Raycast HUD',
  category: 'Navigation',
  batch: 'Batch 2: Navigation Systems & Mega-Menus',
  techStack: ['Next.js / React', 'Global Hotkey Observer (⌘K)', 'Fuzzy Filter Engine', 'Procedural Audio Synthesizer'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic HUD',
  interactionBlueprint: 'Global ⌘K hotkey or click deploys a holographic cyber command HUD; arrow keys navigate and Enter executes with sound-reactive feedback.',
  description: 'An ultra-fast, high-density modal navigation hub offering keyboard-first rapid access to all system actions, shader pipelines, batch sections, and audio controls.',
  tags: ['Command Palette', '⌘K Modal', 'Cyberpunk', 'Keyboard Navigation', 'Fuzzy Search', 'High-Density HUD'],
  codeSnippet: `// Global Hotkey (⌘K / Ctrl+K) & Keyboard Traversal
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setIsOpen((prev) => !prev);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);`,
};

interface CommandAction {
  id: string;
  category: string;
  label: string;
  shortcut: string;
  icon: React.ElementType;
  description: string;
  badge: string;
}

const commands: CommandAction[] = [
  { id: 'hero-chromatic', category: 'HEROES', label: 'Jump to Chromatic Liquid Mesh', shortcut: '01', icon: Sparkles, description: 'Simplex GLSL shader with RGB chromatic split', badge: 'HERO' },
  { id: 'hero-brutalist', category: 'HEROES', label: 'Jump to Kinetic Neo-Brutalist Grid', shortcut: '02', icon: Terminal, description: 'Velocity-skewed monospace typography', badge: 'HERO' },
  { id: 'hero-cyber', category: 'HEROES', label: 'Jump to Cyber Matrix Raycaster', shortcut: '03', icon: Zap, description: 'Interactive node distance field and EMP wave', badge: 'HERO' },
  { id: 'hero-luxury', category: 'HEROES', label: 'Jump to Luxury Editorial Couture', shortcut: '04', icon: Command, description: 'Cinzel display and ambient golden stardust', badge: 'HERO' },
  { id: 'hero-quantum', category: 'HEROES', label: 'Jump to Quantum Supershape 3D', shortcut: '05', icon: Cpu, description: 'Real-time parametric Torus Knot GLSL mesh', badge: 'HERO' },
  { id: 'sound-toggle', category: 'SYSTEM', label: 'Toggle Synthetic Web Audio FX', shortcut: 'FX', icon: Volume2, description: 'Turn procedural audio haptics ON / OFF', badge: 'AUDIO' },
  { id: 'filter-webgl', category: 'FILTER', label: 'Filter: WebGL 3D Parametric Topologies', shortcut: '3D', icon: Layers, description: 'Display only 3D WebGL components', badge: 'FILTER' },
  { id: 'filter-all', category: 'FILTER', label: 'Reset Filter: Show All Vibe Archetypes', shortcut: 'ALL', icon: Layers, description: 'Display all catalog entries', badge: 'RESET' },
];

export default function NavTerminalCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lastExecuted, setLastExecuted] = useState<string>('Ready for input');

  const inputRef = useRef<HTMLInputElement>(null);

  // Global hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        soundFx.playCyberBlip();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase()) ||
    c.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDownInList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      soundFx.playClick(900, 0.01);
      setSelectedIndex((prev) => (prev + 1) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      soundFx.playClick(850, 0.01);
      setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % Math.max(filteredCommands.length, 1));
    } else if (e.key === 'Enter' && filteredCommands[selectedIndex]) {
      e.preventDefault();
      executeAction(filteredCommands[selectedIndex]);
    }
  };

  const executeAction = (action: CommandAction) => {
    soundFx.playCyberBlip();
    setLastExecuted(`EXECUTED: [${action.label}] at ${new Date().toLocaleTimeString()}`);
    setIsOpen(false);

    // If it's a jump link
    if (action.id.startsWith('hero-')) {
      const map: Record<string, string> = {
        'hero-chromatic': 'hero_v01_chromaticliquidmesh',
        'hero-brutalist': 'hero_v02_kineticneobrutalist',
        'hero-cyber': 'hero_v03_cybermatrixglitch',
        'hero-luxury': 'hero_v04_luxuryeditorialcouture',
        'hero-quantum': 'hero_v05_quantumsupershape3d',
      };
      const targetId = map[action.id];
      if (targetId) {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.id === 'sound-toggle') {
      soundFx.toggle();
    }
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">Shortcut Trigger</label>
            <div className="flex items-center gap-2 font-mono text-zinc-300">
              <kbd className="px-2 py-1 rounded bg-zinc-800 border border-white/20 text-white font-bold">⌘K</kbd>
              <span>or</span>
              <kbd className="px-2 py-1 rounded bg-zinc-800 border border-white/20 text-white font-bold">Ctrl + K</kbd>
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                soundFx.playCyberBlip();
                setIsOpen(true);
              }}
              className="w-full py-1.5 px-3 rounded bg-cyan-950 border border-cyan-500/50 font-mono text-xs text-cyan-300 hover:bg-cyan-400 hover:text-black font-bold uppercase transition-colors"
            >
              Open Command HUD (⌘K)
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#050812] text-white flex flex-col justify-between items-center p-6 select-none overflow-hidden">
        {/* Holographic grid and scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none opacity-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        {/* Mock Top Cyber Bar */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between border-b border-cyan-900/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-black tracking-widest text-cyan-400 uppercase flex items-center gap-1.5">
              <Terminal className="w-4 h-4" />
              <span>RAYCAST TERMINAL // PALETTE</span>
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playCyberBlip();
              setIsOpen(true);
            }}
            className="flex items-center gap-3 px-4 py-2 rounded bg-cyan-950/80 border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 font-mono text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.2)]"
            data-cursor="hover"
            data-cursor-text="HOTKEY"
          >
            <Search className="w-3.5 h-3.5" />
            <span>PRESS ⌘K TO LAUNCH</span>
            <kbd className="px-1.5 py-0.5 rounded bg-cyan-900/80 text-[10px] text-cyan-200 border border-cyan-700">⌘K</kbd>
          </button>
        </div>

        {/* Center Stage Card */}
        <div className="relative z-10 max-w-3xl mx-auto my-auto text-center p-8 bg-black/60 border border-cyan-900/60 rounded-xl backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-4">
            <Zap className="w-3.5 h-3.5 fill-cyan-400" />
            <span>TELEMETRY: {lastExecuted}</span>
          </div>

          <h3 className="font-['Syne'] text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
            High-Density Cyber Command Hub
          </h3>

          <p className="mt-4 font-mono text-xs sm:text-sm text-zinc-300 max-w-lg mx-auto leading-relaxed">
            Instantaneous fuzzy keyboard search across the entire visual catalog. Jump to any component, trigger WebGL shaders, or toggle system audio in milliseconds.
          </p>

          <button
            onClick={() => {
              soundFx.playCyberBlip();
              setIsOpen(true);
            }}
            className="mt-8 px-8 py-3.5 bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_25px_rgba(6,182,212,0.4)] transition-all flex items-center gap-2 mx-auto"
            data-cursor="hover"
          >
            <Command className="w-4 h-4" />
            <span>Launch Command Palette (⌘K)</span>
          </button>
        </div>

        {/* Command Palette Modal */}
        {isOpen && (
          <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-[#090d16] border-2 border-cyan-500/60 rounded-xl shadow-[0_0_50px_rgba(6,182,212,0.3)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-150"
            >
              {/* Search Bar Input */}
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-cyan-900/60 bg-black/40">
                <Search className="w-5 h-5 text-cyan-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleKeyDownInList}
                  placeholder="Type a command, hero title, or shader action..."
                  className="w-full bg-transparent text-white font-mono text-sm placeholder:text-zinc-500 focus:outline-none"
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-500 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Action List Items */}
              <div className="max-h-80 overflow-y-auto p-2 space-y-1 font-mono text-xs">
                {filteredCommands.length === 0 ? (
                  <div className="p-8 text-center text-zinc-500 font-mono">
                    NO COMMANDS MATCHED // SEARCH AGAIN
                  </div>
                ) : (
                  filteredCommands.map((item, idx) => {
                    const isSelected = selectedIndex === idx;
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.id}
                        onClick={() => executeAction(item)}
                        onMouseEnter={() => {
                          soundFx.playClick(1000, 0.01);
                          setSelectedIndex(idx);
                        }}
                        className={`flex items-center justify-between p-3 rounded cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-cyan-950/80 border border-cyan-500 text-white shadow-md'
                            : 'hover:bg-white/5 border border-transparent text-zinc-300'
                        }`}
                        data-cursor="hover"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-7 h-7 rounded flex items-center justify-center ${
                            isSelected ? 'bg-cyan-400 text-black' : 'bg-zinc-800 text-cyan-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold block">{item.label}</span>
                            <span className="text-[10px] text-zinc-400 block">{item.description}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-black/50 border border-white/10 text-cyan-300">
                            {item.badge}
                          </span>
                          {isSelected && (
                            <CornerDownLeft className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Modal Footer Hotkey Guide */}
              <div className="px-4 py-2 border-t border-cyan-900/60 bg-black/60 flex items-center justify-between font-mono text-[10px] text-zinc-500">
                <div className="flex items-center gap-4">
                  <span>&uarr;&darr; TO NAVIGATE</span>
                  <span>ENTER TO SELECT</span>
                  <span>ESC TO DISMISS</span>
                </div>
                <span className="text-cyan-400 font-bold">CYBER HUD READY</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </BlueprintHUD>
  );
}
