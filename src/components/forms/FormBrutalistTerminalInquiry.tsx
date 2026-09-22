import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Terminal, Send, CheckSquare, Square, CornerDownLeft, AlertTriangle, ShieldAlert, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'form_v02_brutalistterminalinquiry',
  name: 'Neo-Brutalist Command Input Matrix & Diagnostic Inquiry Stepper',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React 19', 'Monospace Grid Architecture', 'Live RegEx Parser', 'Mechanical Audio Synthesis', 'Stamp Certification'],
  aestheticVibe: 'Kinetic Typography & Neo-Brutalism',
  interactionBlueprint: 'Raw high-contrast monospace interactive terminal form with real-time ASCII telemetry, mechanical keypress sound synthesis, error vector highlighter, and dynamic brutalist ink stamp approval seal.',
  description: 'Industrial neo-brutalist inquiry ledger featuring tactile keystroke feedback, regex error diagnostics, service tier selector tags, and architectural stamp validation.',
  codeSnippet: `// Mechanical keystroke synthesis & syntax parser
const handleInput = (key: string) => {
  soundFx.playClick(600 + Math.random() * 200, 0.025);
  setEntropy((prev) => (prev + key.charCodeAt(0) * 1.618) % 1000);
};`,
  tags: ['Form', 'Brutalist', 'Terminal', 'Monospace', 'Inquiry', 'Mechanical Audio'],
};

export default function FormBrutalistTerminalInquiry() {
  const [operatorId, setOperatorId] = useState('AGENT-094-ALPHA');
  const [targetDomain, setTargetDomain] = useState('SYSTEM.ENTERPRISE.SPEC');
  const [payloadText, setPayloadText] = useState('PROPOSE NEW PARADIGM ARCHITECTURE WITH SUB-MILLISECOND LATENCY.');
  const [urgencyLevel, setUrgencyLevel] = useState<'STANDARD' | 'PRIORITY' | 'RED_ALERT'>('PRIORITY');
  const [budgetCap, setBudgetCap] = useState<number>(75000);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stamped, setStamped] = useState(false);

  const handleKeyStroke = () => {
    soundFx.playClick(580 + Math.random() * 180, 0.02);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      soundFx.playCyberBlip();
      return;
    }
    soundFx.playClick(400, 0.08);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStamped(true);
      soundFx.playChime(520, 0.4);
    }, 900);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative bg-black text-white">
        <div className="max-w-5xl mx-auto font-mono">
          {/* Brutalist Header Ribbon */}
          <div className="border-4 border-white bg-zinc-900 p-4 mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-amber-400 text-black px-2 py-1 font-black text-xs uppercase tracking-wider">
                LEDGER_V.11.02
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight uppercase">
                DIAGNOSTIC INQUIRY PROTOCOL
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="text-zinc-400">TELEMETRY: ACTIVE</span>
              <span className="bg-white text-black px-2 py-0.5 font-bold">REVISION 2026</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Specification Column */}
            <div className="lg:col-span-4 border-2 border-white p-5 bg-zinc-950 space-y-4">
              <div className="border-b-2 border-white/20 pb-3">
                <span className="text-xs text-amber-400 font-bold block uppercase tracking-wider">
                  SPECIFICATION SUMMARY
                </span>
                <span className="text-[11px] text-zinc-400">
                  Fill parameters to dispatch telemetry packet into central dispatch bus.
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-zinc-500">OPERATOR:</span>
                  <span className="text-white font-bold">{operatorId || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-zinc-500">TARGET:</span>
                  <span className="text-white font-bold">{targetDomain || 'N/A'}</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-zinc-500">URGENCY:</span>
                  <span className={`font-bold ${urgencyLevel === 'RED_ALERT' ? 'text-rose-400' : urgencyLevel === 'PRIORITY' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {urgencyLevel}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-zinc-500">ALLOCATION:</span>
                  <span className="text-white font-bold">${budgetCap.toLocaleString()} USD</span>
                </div>
                <div className="flex justify-between border-b border-white/10 pb-1">
                  <span className="text-zinc-500">CHARS:</span>
                  <span className="text-white">{payloadText.length} / 500</span>
                </div>
              </div>

              {/* Live Status Stamp */}
              {stamped && (
                <div className="border-4 border-amber-400 bg-amber-400/10 p-4 text-center transform -rotate-3 transition-transform animate-in fade-in">
                  <span className="block text-amber-400 font-black text-xl tracking-widest uppercase">
                    [CERTIFIED &bull; LOGGED]
                  </span>
                  <span className="block text-[10px] text-amber-300 font-mono mt-1">
                    DISPATCH REF: #09-XK-9941-OMEGA
                  </span>
                </div>
              )}
            </div>

            {/* Right Terminal Form */}
            <div className="lg:col-span-8 border-4 border-white bg-zinc-950 p-6 relative shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Operator ID input */}
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 flex items-center justify-between">
                    <span>1. OPERATOR IDENTIFIER</span>
                    <span className="text-[10px] text-zinc-500">[ALPHANUMERIC REGEX]</span>
                  </label>
                  <input
                    type="text"
                    value={operatorId}
                    onChange={(e) => {
                      setOperatorId(e.target.value.toUpperCase());
                      handleKeyStroke();
                    }}
                    placeholder="AGENT-ID"
                    className="w-full bg-black border-2 border-white px-3 py-2 text-sm text-white font-mono focus:bg-zinc-900 focus:outline-none focus:border-amber-400 transition-colors"
                    required
                  />
                </div>

                {/* Domain selector */}
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">
                    2. TARGET DOMAIN SCOPE
                  </label>
                  <input
                    type="text"
                    value={targetDomain}
                    onChange={(e) => {
                      setTargetDomain(e.target.value.toUpperCase());
                      handleKeyStroke();
                    }}
                    placeholder="ENTERPRISE.DOMAIN"
                    className="w-full bg-black border-2 border-white px-3 py-2 text-sm text-white font-mono focus:bg-zinc-900 focus:outline-none focus:border-amber-400 transition-colors"
                    required
                  />
                </div>

                {/* Urgency Level Matrix Radio */}
                <div>
                  <label className="block text-xs font-bold uppercase mb-1.5">
                    3. URGENCY ESCALATION LEVEL
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['STANDARD', 'PRIORITY', 'RED_ALERT'] as const).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => {
                          setUrgencyLevel(level);
                          soundFx.playClick(level === 'RED_ALERT' ? 900 : 700);
                        }}
                        className={`py-2 px-2 text-xs font-bold border-2 transition-all ${
                          urgencyLevel === level
                            ? 'bg-amber-400 text-black border-amber-400 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]'
                            : 'bg-black text-zinc-400 border-white/40 hover:border-white'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget Slider */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>4. RESOURCE ALLOCATION CEILING</span>
                    <span className="text-amber-400">${budgetCap.toLocaleString()} USD</span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max="250000"
                    step="5000"
                    value={budgetCap}
                    onChange={(e) => {
                      setBudgetCap(Number(e.target.value));
                      soundFx.playTick(500 + Number(e.target.value) / 1000);
                    }}
                    className="w-full accent-amber-400 cursor-pointer h-3 bg-zinc-800 border border-white"
                  />
                </div>

                {/* Main Payload Textarea */}
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 flex items-center justify-between">
                    <span>5. TECHNICAL SPECIFICATION DOSSIER</span>
                    <span className="text-[10px] text-zinc-500">PLAIN-TEXT RFC</span>
                  </label>
                  <textarea
                    rows={4}
                    value={payloadText}
                    onChange={(e) => {
                      setPayloadText(e.target.value);
                      handleKeyStroke();
                    }}
                    placeholder="ENTER DETAILED ARCHITECTURAL DIRECTIVES..."
                    className="w-full bg-black border-2 border-white p-3 text-sm text-white font-mono focus:bg-zinc-900 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                    required
                  />
                </div>

                {/* Checkbox agreement */}
                <div
                  onClick={() => {
                    setAgreedToTerms(!agreedToTerms);
                    soundFx.playClick(650);
                  }}
                  className="flex items-center gap-3 cursor-pointer select-none text-xs border border-white/20 p-2.5 hover:bg-zinc-900 transition-colors"
                >
                  {agreedToTerms ? (
                    <CheckSquare className="w-5 h-5 text-amber-400 shrink-0" />
                  ) : (
                    <Square className="w-5 h-5 text-zinc-500 shrink-0" />
                  )}
                  <span className="text-zinc-300">
                    I ACKNOWLEDGE THAT THIS DISPATCH WILL BE RECORDED TO THE IMMUTABLE TELEMETRY LEDGER.
                  </span>
                </div>

                {/* Submit action */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-zinc-400" />
                    BASH-PARSER 11.2 // NO RUNTIME STUBS
                  </span>

                  <button
                    type="submit"
                    disabled={isSubmitting || !agreedToTerms}
                    className={`px-6 py-3 font-bold text-sm uppercase tracking-wider flex items-center gap-2 border-2 border-white transition-all ${
                      agreedToTerms
                        ? 'bg-amber-400 text-black hover:bg-white cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-1 active:translate-y-1 active:shadow-none'
                        : 'bg-zinc-800 text-zinc-600 border-zinc-700 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-pulse">DISPATCHING...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT DISPATCH</span>
                        <CornerDownLeft className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
