import React, { useState, useEffect } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Terminal, Cpu, Database, AlertOctagon, RefreshCw, Zap, Play, Square, ChevronRight } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'dashboard_v02_brutalisthardwareledger',
  name: 'Kinetic Neo-Brutalist Hardware Register Ledger',
  category: 'Dashboard',
  batch: 'Batch 6: Dashboards & Node Visualizers',
  techStack: ['React 19', 'Monospace Register Matrix', 'Hex Memory Dump Simulator', 'Interrupt Vector Engine', 'Web Audio Clicks'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalist / Hardware Monospace',
  interactionBlueprint: 'Direct manipulation of hardware CPU registers (EAX-EIP). Real-time hex dump matrix calculates active byte writes. Interrupt triggers (Syscall, Breakpoint, Page Fault) dispatch simulated kernel hardware exceptions with audio feedback.',
  description: 'Raw high-contrast Neo-Brutalist low-level architecture dashboard. Displays live CPU registers, 64-byte hex memory dump, interactive interrupt triggers, and clock frequency multipliers.',
  codeSnippet: `<div className="border-2 border-black bg-[#ccff00] p-3 font-mono font-black text-black">
  <div className="text-xs uppercase">EAX // ACCUMULATOR</div>
  <div className="text-2xl tracking-tighter">0x{eax.toString(16).toUpperCase()}</div>
</div>`,
  tags: ['Dashboard', 'Neo-Brutalist', 'Hardware', 'Hex Dump', 'Registers', 'Monospace'],
};

interface RegisterSet {
  eax: number;
  ebx: number;
  ecx: number;
  edx: number;
  esi: number;
  edi: number;
  esp: number;
  ebp: number;
  eip: number;
}

export default function DashboardBrutalistHardwareLedger() {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [clockSpeed, setClockSpeed] = useState<number>(2.4); // GHz
  const [cycleCount, setCycleCount] = useState<number>(8492041);
  const [lastInterrupt, setLastInterrupt] = useState<string>('NONE (KERNEL_OK)');
  const [selectedByte, setSelectedByte] = useState<number | null>(null);

  // Registers state
  const [registers, setRegisters] = useState<RegisterSet>({
    eax: 0x7fa89012,
    ebx: 0x000000ff,
    ecx: 0x004010a4,
    edx: 0x80000000,
    esi: 0x0012fe88,
    edi: 0x0012fe90,
    esp: 0x0012ffc4,
    ebp: 0x0012fff0,
    eip: 0x0040142b,
  });

  // 64-byte memory chunk (8 rows of 8 bytes)
  const [memoryBytes, setMemoryBytes] = useState<number[]>(() =>
    Array.from({ length: 64 }, () => Math.floor(Math.random() * 256))
  );

  // Memory log events
  const [kernelLogs, setKernelLogs] = useState<string[]>([
    '[0.000000] Linux kernel boot: microcode rev 0x28f',
    '[0.001420] APIC timer calibrated: 2400.002 MHz',
    '[0.003912] Page table isolation: ACTIVE (KPTI enabled)',
    '[0.008401] Memory mapping 0x00000000 - 0x00FFFFFF OK',
  ]);

  // Clock tick cycle simulation
  useEffect(() => {
    if (!isRunning) return;
    const intervalTime = Math.max(100, 1000 / (clockSpeed * 2));

    const interval = setInterval(() => {
      setCycleCount((c) => c + Math.floor(clockSpeed * 1000));

      setRegisters((prev) => ({
        ...prev,
        eax: (prev.eax + Math.floor(Math.random() * 256)) & 0xffffffff,
        ebx: (prev.ebx ^ Math.floor(Math.random() * 16)) & 0xffffffff,
        ecx: (prev.ecx + 1) & 0xffffffff,
        edx: (prev.edx - Math.floor(Math.random() * 8)) & 0xffffffff,
        eip: (prev.eip + 4) & 0xffffffff,
      }));

      // Randomly modify a memory byte
      setMemoryBytes((prev) => {
        const next = [...prev];
        const idx = Math.floor(Math.random() * next.length);
        next[idx] = Math.floor(Math.random() * 256);
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, [isRunning, clockSpeed]);

  const dispatchInterrupt = (intCode: string, description: string) => {
    soundFx.playClick(900);
    setLastInterrupt(`${intCode}: ${description}`);
    setKernelLogs((prev) => [
      `[+${(performance.now() / 1000).toFixed(4)}] INTERRUPT ${intCode} -> ${description}`,
      ...prev.slice(0, 5),
    ]);
  };

  const toHex32 = (num: number) => {
    return '0x' + (num >>> 0).toString(16).padStart(8, '0').toUpperCase();
  };

  const toHex8 = (num: number) => {
    return num.toString(16).padStart(2, '0').toUpperCase();
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#0c0d10] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Brutalist Top Banner */}
          <div className="border-4 border-black bg-[#ccff00] p-5 text-black shadow-[6px_6px_0px_#ffffff] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                <Terminal className="w-4 h-4 text-black" />
                <span>HARDWARE LEDGER &bull; LOW-LEVEL REGISTER KERNEL</span>
              </div>
              <h3 className="font-['Syne'] text-2xl sm:text-3xl font-black uppercase tracking-tight mt-1">
                BRUTALIST VPU // CORE 0 REGISTERS
              </h3>
            </div>

            {/* Execution status & Frequency */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="border-2 border-black bg-white px-3 py-1 text-xs font-black">
                CYCLES: {cycleCount.toLocaleString()}
              </div>

              <button
                onClick={() => {
                  soundFx.playClick(isRunning ? 500 : 800);
                  setIsRunning(!isRunning);
                }}
                className={`border-2 border-black px-4 py-1 text-xs font-black uppercase flex items-center gap-1.5 transition-transform active:translate-x-1 active:translate-y-1 ${
                  isRunning ? 'bg-black text-[#ccff00]' : 'bg-red-500 text-white'
                }`}
                data-cursor="hover"
              >
                {isRunning ? <Square className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isRunning ? 'HALT CLK' : 'RESUME'}</span>
              </button>
            </div>
          </div>

          {/* Clock Speed & Thermal Multipliers */}
          <div className="border-2 border-white/20 bg-zinc-950 p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#ccff00]" />
              <span className="font-bold text-white uppercase">FREQUENCY MULTIPLIER:</span>
              <span className="text-zinc-400">Current Base Clock: {clockSpeed.toFixed(1)} GHz</span>
            </div>

            <div className="flex items-center gap-2">
              {[1.2, 2.4, 4.2, 5.5].map((speed) => (
                <button
                  key={speed}
                  onClick={() => {
                    soundFx.playClick(speed > 4 ? 950 : 700);
                    setClockSpeed(speed);
                  }}
                  className={`border-2 px-3 py-1 font-bold transition-all ${
                    clockSpeed === speed
                      ? 'border-[#ccff00] bg-[#ccff00] text-black shadow-[2px_2px_0px_#fff]'
                      : 'border-white/20 bg-zinc-900 text-zinc-300 hover:text-white'
                  }`}
                  data-cursor="hover"
                >
                  {speed} GHz {speed === 5.5 ? '🔥 TURBO' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Core Registers Grid (9 Primary Registers) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-[#ccff00] hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>EAX // ACCUMULATOR</span>
                <span className="text-[#ccff00]">32-BIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                {toHex32(registers.eax)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 flex justify-between">
                <span>DEC: {(registers.eax >>> 0).toLocaleString()}</span>
                <span>BIN: ...{(registers.eax & 0xff).toString(2).padStart(8, '0')}</span>
              </div>
            </div>

            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-cyan-400 hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>EBX // BASE REGISTER</span>
                <span className="text-cyan-400">32-BIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                {toHex32(registers.ebx)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 flex justify-between">
                <span>DEC: {(registers.ebx >>> 0).toLocaleString()}</span>
                <span>OFFSET: +0x04</span>
              </div>
            </div>

            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-amber-400 hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>ECX // COUNTER</span>
                <span className="text-amber-400">32-BIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                {toHex32(registers.ecx)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500 flex justify-between">
                <span>LOOP CYCLES: ACTIVE</span>
                <span>INC: +1</span>
              </div>
            </div>

            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-purple-400 hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>EDX // DATA / I/O</span>
                <span className="text-purple-400">32-BIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                {toHex32(registers.edx)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">PORT BUS: READY</div>
            </div>

            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-pink-400 hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>ESP // STACK POINTER</span>
                <span className="text-pink-400">32-BIT</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-white tracking-wider">
                {toHex32(registers.esp)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">FRAME DEPTH: 16 WORDS</div>
            </div>

            <div className="border-2 border-white/20 bg-zinc-900/90 p-4 border-l-4 border-l-emerald-400 hover:border-white transition-all">
              <div className="flex justify-between text-xs text-zinc-400 font-bold mb-1">
                <span>EIP // INSTRUCTION POINTER</span>
                <span className="text-emerald-400">FETCH</span>
              </div>
              <div className="text-xl sm:text-2xl font-black text-emerald-300 tracking-wider">
                {toHex32(registers.eip)}
              </div>
              <div className="mt-2 text-[10px] text-zinc-500">OPCODE: 0x90 (NOP)</div>
            </div>
          </div>

          {/* Hex Memory Dump (64 Bytes) + Kernel Log Stream */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Hex Dump Matrix (Col 7) */}
            <div className="lg:col-span-7 border-2 border-white/20 bg-black p-5">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-[#ccff00]" />
                  <span className="font-bold text-xs text-white uppercase">
                    RAM HEX DUMP (0x00401000 - 0x0040103F)
                  </span>
                </div>
                <span className="text-[10px] text-zinc-500">CLICK BYTE TO INSPECT</span>
              </div>

              <div className="space-y-1.5 text-xs">
                {Array.from({ length: 8 }).map((_, row) => {
                  const baseAddr = 0x00401000 + row * 8;
                  return (
                    <div key={row} className="flex items-center gap-3">
                      <span className="text-zinc-500 select-none">
                        {baseAddr.toString(16).padStart(8, '0').toUpperCase()}
                      </span>
                      <div className="grid grid-cols-8 gap-1.5 flex-1">
                        {memoryBytes.slice(row * 8, row * 8 + 8).map((byte, col) => {
                          const byteIndex = row * 8 + col;
                          const isSelected = selectedByte === byteIndex;
                          return (
                            <button
                              key={col}
                              onClick={() => {
                                soundFx.playClick(600 + byte);
                                setSelectedByte(byteIndex);
                              }}
                              className={`p-1 text-center font-bold text-[11px] border transition-all ${
                                isSelected
                                  ? 'bg-[#ccff00] text-black border-[#ccff00] font-black'
                                  : byte > 200
                                  ? 'bg-zinc-800 text-cyan-300 border-cyan-500/40'
                                  : byte < 50
                                  ? 'bg-zinc-950 text-zinc-500 border-white/5'
                                  : 'bg-zinc-900 text-zinc-300 border-white/10 hover:border-white/40'
                              }`}
                              data-cursor="hover"
                            >
                              {toHex8(byte)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedByte !== null && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>
                    BYTE OFFSET <strong className="text-[#ccff00]">0x{selectedByte.toString(16).toUpperCase()}</strong>
                  </span>
                  <span>VALUE: <strong>{memoryBytes[selectedByte]}</strong> (0x{toHex8(memoryBytes[selectedByte])})</span>
                  <span>ASCII: <strong>{memoryBytes[selectedByte] >= 32 && memoryBytes[selectedByte] <= 126 ? String.fromCharCode(memoryBytes[selectedByte]) : '·'}</strong></span>
                </div>
              )}
            </div>

            {/* Interrupt Vector Triggers & Kernel Logs (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Interrupt Dispatcher Buttons */}
              <div className="border-2 border-white/20 bg-zinc-950 p-4">
                <span className="font-bold text-xs text-white uppercase block mb-3">
                  HARDWARE INTERRUPT VECTOR TRIGGERS:
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => dispatchInterrupt('INT 0x80', 'Kernel Syscall Execution')}
                    className="border border-white/20 bg-zinc-900 hover:bg-[#ccff00] hover:text-black p-2 font-bold transition-all text-left"
                    data-cursor="hover"
                  >
                    INT 0x80 (Syscall)
                  </button>
                  <button
                    onClick={() => dispatchInterrupt('INT 0x03', 'Trap / Debug Breakpoint')}
                    className="border border-white/20 bg-zinc-900 hover:bg-cyan-400 hover:text-black p-2 font-bold transition-all text-left"
                    data-cursor="hover"
                  >
                    INT 0x03 (Breakpoint)
                  </button>
                  <button
                    onClick={() => dispatchInterrupt('INT 0x0E', 'Virtual Memory Page Fault')}
                    className="border border-white/20 bg-zinc-900 hover:bg-amber-400 hover:text-black p-2 font-bold transition-all text-left"
                    data-cursor="hover"
                  >
                    INT 0x0E (Page Fault)
                  </button>
                  <button
                    onClick={() => dispatchInterrupt('NMI 0x02', 'Non-Maskable Hardware Interrupt')}
                    className="border border-white/20 bg-zinc-900 hover:bg-red-500 hover:text-white p-2 font-bold transition-all text-left"
                    data-cursor="hover"
                  >
                    NMI 0x02 (Hardware)
                  </button>
                </div>

                <div className="mt-3 p-2 bg-black border border-white/10 text-[11px] text-zinc-400 flex items-center justify-between">
                  <span>LAST DISPATCH:</span>
                  <span className="text-[#ccff00] font-bold">{lastInterrupt}</span>
                </div>
              </div>

              {/* Kernel Log Terminal */}
              <div className="border-2 border-white/20 bg-black p-4 text-[11px]">
                <span className="text-zinc-500 font-bold block mb-2">LIVE /dev/kmsg STREAM:</span>
                <div className="space-y-1 text-zinc-300 font-mono">
                  {kernelLogs.map((log, i) => (
                    <div key={i} className="truncate text-zinc-400">
                      {log}
                    </div>
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
