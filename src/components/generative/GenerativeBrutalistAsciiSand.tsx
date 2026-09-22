import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Box, RotateCcw, ArrowDown, ArrowUp, ArrowLeft, ArrowRight, ShieldAlert, Sparkles, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'generative_v02_brutalistasciisand',
  name: 'Neo-Brutalist ASCII Cellular Automata & Sand Physics Grid',
  category: 'Generative',
  batch: 'Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures',
  techStack: ['React 19', 'Cellular Automata Physics Engine', 'Monospace Typographic Glyphs', 'Gravity Vector Math', 'Tactile Sound'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism / Monospace Cellular',
  interactionBlueprint: 'Interactive 2D cellular automata grid where discrete particle grains are simulated as ASCII characters (#, @, %, *, 1, 0). Click and drag pours kinetic grain streams. Users can alter gravity vectors in 4 directions, drop barrier walls, and clear buffers.',
  description: 'Industrial cellular automata falling sand physics sandbox rendered in brutalist monospace typography with dynamic gravity vectors, material obstacle blocks, and physical collision resolution.',
  codeSnippet: `// 2D Cellular Automata sand fall logic
if (grid[y + 1][x] === EMPTY) {
  grid[y + 1][x] = sandGrain;
  grid[y][x] = EMPTY;
} else if (grid[y + 1][x - 1] === EMPTY) {
  grid[y + 1][x - 1] = sandGrain;
  grid[y][x] = EMPTY;
}`,
  tags: ['Generative', 'Neo-Brutalist', 'Cellular Automata', 'ASCII Art', 'Physics', 'Falling Sand'],
};

const COLS = 54;
const ROWS = 32;
const EMPTY = 0;
const SAND = 1;
const WALL = 2;

const GLYPHS = [' ', '#', '█', '*', '@', '%', '$', '1', '0'];

export default function GenerativeBrutalistAsciiSand() {
  const [grid, setGrid] = useState<number[][]>(() => {
    const initial = Array(ROWS).fill(0).map(() => Array(COLS).fill(EMPTY));
    // Spawn some initial sand mounds and platforms
    for (let c = 20; c < 34; c++) {
      initial[10][c] = WALL;
    }
    return initial;
  });

  const [activeTool, setActiveTool] = useState<'SAND' | 'WALL' | 'ERASER'>('SAND');
  const [gravityDir, setGravityDir] = useState<'DOWN' | 'UP' | 'LEFT' | 'RIGHT'>('DOWN');
  const [isPointerDown, setIsPointerDown] = useState<boolean>(false);
  const [grainType, setGrainType] = useState<string>('#');
  const [grainCount, setGrainCount] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Simulation Tick
  useEffect(() => {
    const interval = setInterval(() => {
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        let count = 0;

        if (gravityDir === 'DOWN') {
          for (let r = ROWS - 2; r >= 0; r--) {
            for (let c = 0; c < COLS; c++) {
              if (next[r][c] === SAND) {
                count++;
                if (next[r + 1][c] === EMPTY) {
                  next[r + 1][c] = SAND;
                  next[r][c] = EMPTY;
                } else {
                  const dir = Math.random() < 0.5 ? -1 : 1;
                  if (c + dir >= 0 && c + dir < COLS && next[r + 1][c + dir] === EMPTY) {
                    next[r + 1][c + dir] = SAND;
                    next[r][c] = EMPTY;
                  } else if (c - dir >= 0 && c - dir < COLS && next[r + 1][c - dir] === EMPTY) {
                    next[r + 1][c - dir] = SAND;
                    next[r][c] = EMPTY;
                  }
                }
              }
            }
          }
        } else if (gravityDir === 'UP') {
          for (let r = 1; r < ROWS; r++) {
            for (let c = 0; c < COLS; c++) {
              if (next[r][c] === SAND) {
                count++;
                if (next[r - 1][c] === EMPTY) {
                  next[r - 1][c] = SAND;
                  next[r][c] = EMPTY;
                } else {
                  const dir = Math.random() < 0.5 ? -1 : 1;
                  if (c + dir >= 0 && c + dir < COLS && next[r - 1][c + dir] === EMPTY) {
                    next[r - 1][c + dir] = SAND;
                    next[r][c] = EMPTY;
                  }
                }
              }
            }
          }
        } else if (gravityDir === 'LEFT') {
          for (let c = 1; c < COLS; c++) {
            for (let r = 0; r < ROWS; r++) {
              if (next[r][c] === SAND) {
                count++;
                if (next[r][c - 1] === EMPTY) {
                  next[r][c - 1] = SAND;
                  next[r][c] = EMPTY;
                } else {
                  const dir = Math.random() < 0.5 ? -1 : 1;
                  if (r + dir >= 0 && r + dir < ROWS && next[r + dir][c - 1] === EMPTY) {
                    next[r + dir][c - 1] = SAND;
                    next[r][c] = EMPTY;
                  }
                }
              }
            }
          }
        } else if (gravityDir === 'RIGHT') {
          for (let c = COLS - 2; c >= 0; c--) {
            for (let r = 0; r < ROWS; r++) {
              if (next[r][c] === SAND) {
                count++;
                if (next[r][c + 1] === EMPTY) {
                  next[r][c + 1] = SAND;
                  next[r][c] = EMPTY;
                } else {
                  const dir = Math.random() < 0.5 ? -1 : 1;
                  if (r + dir >= 0 && r + dir < ROWS && next[r + dir][c + 1] === EMPTY) {
                    next[r + dir][c + 1] = SAND;
                    next[r][c] = EMPTY;
                  }
                }
              }
            }
          }
        }

        setGrainCount(count);
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [gravityDir]);

  // Click & Drag Injection
  const handleCellInteract = (r: number, c: number) => {
    setGrid((prev) => {
      const next = prev.map((row) => [...row]);
      const value = activeTool === 'SAND' ? SAND : activeTool === 'WALL' ? WALL : EMPTY;

      // 3x3 brush radius for pleasant pouring
      const radius = activeTool === 'SAND' ? 1 : 1;
      for (let dr = -radius; dr <= radius; dr++) {
        for (let dc = -radius; dc <= radius; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS) {
            next[nr][nc] = value;
          }
        }
      }
      return next;
    });
  };

  const clearGrid = () => {
    soundFx.playClick(600);
    setGrid(Array(ROWS).fill(0).map(() => Array(COLS).fill(EMPTY)));
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#09090b] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="p-5 border-4 border-black bg-amber-400 text-black flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.15)]">
            <div>
              <span className="text-xs uppercase tracking-widest font-black block">
                CELLULAR AUTOMATA ENGINE // PROTO-8.2
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight uppercase">
                Brutalist ASCII Falling Sand Physics
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase">LIVE GRAINS: {grainCount}</span>
              <button
                onClick={clearGrid}
                className="px-3 py-1 bg-black text-amber-400 font-black text-xs uppercase flex items-center gap-1.5 hover:bg-zinc-800 transition-colors"
                data-cursor="hover"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>FLUSH BUFFER</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column: Monospace ASCII Grid Stage + Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* ASCII Cellular Canvas Viewport (Col 8) */}
            <div
              ref={containerRef}
              onMouseDown={() => setIsPointerDown(true)}
              onMouseUp={() => setIsPointerDown(false)}
              onMouseLeave={() => setIsPointerDown(false)}
              className="lg:col-span-8 p-5 border-2 border-white/20 bg-black flex flex-col justify-between select-none relative overflow-x-auto min-h-[480px]"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs text-zinc-400">
                <span className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-amber-400" />
                  <span>CLICK / DRAG TO POUR CELLULAR STREAM ({COLS}x{ROWS} MATRIX)</span>
                </span>
                <span className="text-amber-400 font-bold">GRAVITY: {gravityDir}</span>
              </div>

              {/* Monospace ASCII Grid */}
              <div className="my-auto py-3 font-mono text-[11px] sm:text-xs leading-none tracking-widest text-center cursor-crosshair">
                {grid.map((row, r) => (
                  <div key={r} className="flex justify-center whitespace-pre">
                    {row.map((cell, c) => {
                      let char = ' ';
                      let colorClass = 'text-zinc-800';

                      if (cell === SAND) {
                        char = grainType;
                        colorClass = 'text-amber-400 font-black';
                      } else if (cell === WALL) {
                        char = '█';
                        colorClass = 'text-white font-black';
                      }

                      return (
                        <span
                          key={c}
                          onMouseEnter={() => {
                            if (isPointerDown) {
                              handleCellInteract(r, c);
                            }
                          }}
                          onMouseDown={() => {
                            soundFx.playClick(800);
                            handleCellInteract(r, c);
                          }}
                          className={`inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 text-center ${colorClass} hover:bg-amber-400/20`}
                        >
                          {char}
                        </span>
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Bottom Telemetry */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                <span>SIMULATION LATENCY: &lt; 2ms</span>
                <span className="text-amber-400 font-bold uppercase">PHYSICS: DISCRETE EULER COLLISION</span>
              </div>
            </div>

            {/* Industrial Tool Console (Col 4) */}
            <div className="lg:col-span-4 p-6 border-2 border-white/20 bg-zinc-950 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="border-b border-white/10 pb-3">
                  <span className="text-xs uppercase text-amber-400 font-black block">
                    ACTIVE TOOL SELECTOR
                  </span>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {(['SAND', 'WALL', 'ERASER'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => {
                          soundFx.playClick(850);
                          setActiveTool(t);
                        }}
                        className={`p-2 border text-xs font-black uppercase transition-all ${
                          activeTool === t
                            ? 'bg-amber-400 text-black border-amber-400 shadow-[3px_3px_0px_0px_rgba(255,255,255,0.8)]'
                            : 'bg-black text-zinc-400 border-white/20 hover:text-white'
                        }`}
                        data-cursor="hover"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gravity Vector Controls */}
                <div className="space-y-2">
                  <span className="text-xs uppercase text-zinc-400 font-bold block">
                    GRAVITY ORIENTATION:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {(['DOWN', 'UP', 'LEFT', 'RIGHT'] as const).map((dir) => (
                      <button
                        key={dir}
                        onClick={() => {
                          soundFx.playClick(950);
                          setGravityDir(dir);
                        }}
                        className={`p-2 border flex items-center justify-between font-bold uppercase transition-all ${
                          gravityDir === dir
                            ? 'bg-amber-400 text-black border-amber-400'
                            : 'bg-black text-zinc-400 border-white/10 hover:border-white/40 hover:text-white'
                        }`}
                        data-cursor="hover"
                      >
                        <span>{dir}</span>
                        {dir === 'DOWN' && <ArrowDown className="w-3.5 h-3.5" />}
                        {dir === 'UP' && <ArrowUp className="w-3.5 h-3.5" />}
                        {dir === 'LEFT' && <ArrowLeft className="w-3.5 h-3.5" />}
                        {dir === 'RIGHT' && <ArrowRight className="w-3.5 h-3.5" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Grain Glyphs Selection */}
                <div className="space-y-2">
                  <span className="text-xs uppercase text-zinc-400 font-bold block">
                    ASCII MATERIAL GLYPH:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['#', '@', '%', '*', '$', '1', '0'].map((g) => (
                      <button
                        key={g}
                        onClick={() => {
                          soundFx.playClick(750);
                          setGrainType(g);
                        }}
                        className={`w-9 h-9 border font-black text-sm flex items-center justify-center transition-all ${
                          grainType === g
                            ? 'bg-amber-400 text-black border-amber-400 font-black'
                            : 'bg-black text-zinc-400 border-white/20 hover:text-white'
                        }`}
                        data-cursor="hover"
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Pre-fill Preset Button */}
              <button
                onClick={() => {
                  soundFx.playClick(900);
                  setGrid((prev) => {
                    const next = prev.map((row) => [...row]);
                    for (let c = 5; c < COLS - 5; c++) {
                      for (let r = 2; r < 8; r++) {
                        if (Math.random() < 0.6) next[r][c] = SAND;
                      }
                    }
                    return next;
                  });
                }}
                className="w-full py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-black uppercase text-xs tracking-wider border-2 border-black flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(255,255,255,0.4)] transition-all"
                data-cursor="hover"
              >
                <Sparkles className="w-4 h-4" />
                <span>INJECT RANDOM SEED BURST</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
