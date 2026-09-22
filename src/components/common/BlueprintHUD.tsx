import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import { Code, Copy, Check, Sliders, ExternalLink, Terminal } from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface BlueprintHUDProps {
  blueprint: ComponentBlueprint;
  children: React.ReactNode;
  controls?: React.ReactNode;
}

export default function BlueprintHUD({ blueprint, children, controls }: BlueprintHUDProps) {
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const handleCopySpec = () => {
    soundFx.playClick(900, 0.04);
    const spec = `---
ID: ${blueprint.id}
Name: ${blueprint.name}
Category: ${blueprint.category}
Batch: ${blueprint.batch}
Tech Stack: ${blueprint.techStack.join(', ')}
Aesthetic Vibe: ${blueprint.aestheticVibe}
Interaction Blueprint: ${blueprint.interactionBlueprint}
---`;
    navigator.clipboard.writeText(spec);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id={blueprint.id.toLowerCase()} 
      className="relative w-full border-b border-white/10 bg-[#06070a] overflow-hidden"
    >
      {/* Visual Metadata HUD Top Bar */}
      <div className="sticky top-16 z-30 w-full border-b border-white/10 bg-[#0a0c10]/95 backdrop-blur-md px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          
          {/* Left: ID, Name, Batch */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            <span className="font-mono font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded tracking-wider">
              {blueprint.id}
            </span>
            <h3 className="font-sans font-semibold text-white tracking-tight text-sm">
              {blueprint.name}
            </h3>
            <span className="hidden sm:inline-block text-white/30">•</span>
            <span className="font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded">
              {blueprint.batch}
            </span>
          </div>

          {/* Center: Stack & Aesthetic Vibe */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-zinc-500 font-mono">STACK:</span>
              <div className="flex items-center gap-1">
                {blueprint.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] bg-white/10 text-zinc-300 px-1.5 py-0.5 rounded border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-1 ml-1 sm:ml-3">
              <span className="text-zinc-500 font-mono">VIBE:</span>
              <span className="font-mono text-[11px] text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                {blueprint.aestheticVibe}
              </span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {controls && (
              <button
                onClick={() => {
                  soundFx.playClick(650);
                  setShowControls(!showControls);
                }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] transition-colors border ${
                  showControls
                    ? 'bg-amber-400 text-black border-amber-400 font-bold'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
                title="Toggle interactive tuning parameters"
                data-cursor="hover"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Tweak Engine</span>
              </button>
            )}

            <button
              onClick={() => {
                soundFx.playClick(750);
                setShowCode(!showCode);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded font-mono text-[11px] transition-colors border ${
                showCode
                  ? 'bg-cyan-400 text-black border-cyan-400 font-bold'
                  : 'bg-white/5 text-zinc-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
              title="View source architecture blueprint"
              data-cursor="hover"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Blueprint Spec</span>
            </button>

            <button
              onClick={handleCopySpec}
              className="flex items-center gap-1 px-2.5 py-1 rounded font-mono text-[11px] bg-white/5 text-zinc-300 border border-white/10 hover:bg-white/10 hover:text-white transition-colors"
              title="Copy component metadata"
              data-cursor="hover"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Interaction Blueprint Notice Strip */}
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-white/5 flex items-start gap-2 text-[11px] text-zinc-400 font-mono">
          <span className="text-amber-400 font-bold shrink-0">INTERACTION BLUEPRINT &rarr;</span>
          <span className="text-zinc-300 leading-tight">{blueprint.interactionBlueprint}</span>
        </div>

        {/* Real-time Tweak Controls Tray */}
        {showControls && controls && (
          <div className="max-w-7xl mx-auto mt-3 p-3.5 rounded-lg bg-black/80 border border-amber-400/30 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                <Sliders className="w-3 h-3" /> Live Shader & Physics Engine Parameters
              </span>
              <span className="font-mono text-[10px] text-zinc-500">Real-time GPU Variables</span>
            </div>
            {controls}
          </div>
        )}

        {/* Code & Spec Drawer */}
        {showCode && (
          <div className="max-w-7xl mx-auto mt-3 p-4 rounded-lg bg-black/90 border border-cyan-400/30 backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2">
              <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5" /> {blueprint.id} &bull; Architecture Spec & Implementation
              </span>
              <button 
                onClick={() => setShowCode(false)}
                className="font-mono text-xs text-zinc-400 hover:text-white"
              >
                ✕ Close
              </button>
            </div>
            <pre className="font-mono text-[11px] text-emerald-400/90 leading-relaxed overflow-x-auto p-3 bg-zinc-950/80 rounded border border-white/5 max-h-72">
              {blueprint.codeSnippet}
            </pre>
          </div>
        )}
      </div>

      {/* Main Component Content Canvas */}
      <div className="relative min-h-[90vh] w-full flex flex-col justify-center">
        {children}
      </div>
    </section>
  );
}
