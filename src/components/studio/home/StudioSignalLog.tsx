import React, { useState } from 'react';
import { SITE_CONTENT, SignalLogEntry } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import { Radio, Terminal, Cpu, CheckCircle2, ShieldCheck, ChevronRight } from 'lucide-react';

export default function StudioSignalLog() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const logs = SITE_CONTENT.signalLog;
  const activeLog = logs[selectedIdx] || logs[0];

  return (
    <section className="relative py-24 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
      {/* Background scanline sweep animation */}
      <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                03 // SIGNAL LOG (TRANSMISSIONS &amp; LORE)
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-5xl text-white mt-1">
              روایت سیگنال‌های دریافتی استودیو
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
            <span>DECRYPTION PROTOCOL ONLINE</span>
          </div>
        </div>

        {/* Transmission Packets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Duotone Scanline Display Screen */}
          <div className="lg:col-span-6 relative rounded-3xl bg-[#111116] border border-[#202027] p-6 sm:p-8 shadow-2xl overflow-hidden group">
            {/* Scanline Sweep Bar */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scanline pointer-events-none opacity-70" />

            {/* Top Screen Terminal Header */}
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400 border-b border-[#202027] pb-3 mb-6">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-white font-bold">{activeLog.index}</span>
              </div>
              <span className="text-cyan-400">{activeLog.status}</span>
            </div>

            {/* Duotone Visual Frame */}
            <div className="relative h-64 sm:h-72 rounded-2xl overflow-hidden mb-6 bg-black border border-white/10 flex items-center justify-center p-6 text-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-violet-900/60 to-cyan-900/40 mix-blend-color z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-40 z-20" />

              <div className="relative z-30 space-y-3">
                <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block bg-black/80 px-3 py-1 rounded-full border border-cyan-500/30">
                  {activeLog.sender}
                </span>
                <h4 className="font-['Lalezar'] text-2xl text-white">
                  {activeLog.subject}
                </h4>
                <span className="font-mono text-[11px] text-zinc-400 block">
                  {activeLog.timestamp}
                </span>
              </div>
            </div>

            {/* Monospace Packet Transmission Body */}
            <div className="space-y-2.5 font-mono text-xs text-zinc-300 bg-black/60 p-4 rounded-2xl border border-white/5">
              {activeLog.dialoguePacket.map((line, lIdx) => (
                <div key={lIdx} className="leading-relaxed flex items-start gap-2">
                  <span className="text-cyan-400 select-none">&gt;</span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Packets Index & Stories Navigation */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-2">
              SELECT INTERCEPTED PACKET // بایگانی لاگ‌ها:
            </span>

            {logs.map((log, idx) => {
              const isSelected = selectedIdx === idx;
              return (
                <div
                  key={log.id}
                  onClick={() => {
                    soundFx.playChime(650 + idx * 60, 0.15);
                    setSelectedIdx(idx);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#17171D] border-cyan-400 shadow-xl shadow-cyan-500/10'
                      : 'bg-[#111116] border-[#202027] hover:border-violet-500/40 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-2">
                    <span className="text-cyan-400 font-bold">{log.index} &bull; {log.tag}</span>
                    <span className="text-zinc-500">{log.timestamp.split(' ')[0]}</span>
                  </div>

                  <h3 className="font-['Lalezar'] text-xl text-white mb-2">
                    {log.subject}
                  </h3>

                  <p className="font-mono text-xs text-zinc-400 line-clamp-2 font-light">
                    {log.dialoguePacket[0]}
                  </p>
                </div>
              );
            })}

            {/* Studio Guarantee Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/40 via-cyan-950/40 to-transparent border border-violet-500/30 flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-violet-300 font-bold block">
                  ZERO GENERIC CODE POLICY
                </span>
                <span className="font-['Vazirmatn'] text-xs text-zinc-300 font-light">
                  کلیه دارایی‌های ران‌تایم سلف‌هاست هستند و به دامنه‌های خارجی وابسته نیستند.
                </span>
              </div>
              <ShieldCheck className="w-6 h-6 text-cyan-400 shrink-0 mr-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
