import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Terminal, Shield, RefreshCw, Lock, Unlock, Play, Radio, Cpu } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v03_cybermatrixdecoder',
  name: 'Cyberpunk Cryptographic Terminal & Matrix Glyphic Decoder',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Cryptographic Text Scrambler', 'Binary Stream Matrix', 'CRT Phosphor Glow', 'Cyber Audio Ticks'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Cryptographic Matrix',
  interactionBlueprint: 'High-speed cryptographic text decryption engine stepping through Japanese katakana, hexadecimal registers, and quantum math glyphs before resolving character-by-character. Interactive phrase selector, live scramble iterations, and phosphor bloom filters.',
  description: 'Tactical cyberpunk command terminal rendering multi-stage cryptographic text decryptors with binary cascades, CRT scanline phosphor bloom, and audible mechanical cipher clicks.',
  codeSnippet: `// Cryptographic character resolution loop
const glyphs = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF!@#$%^&*';
const scrambled = text.split('').map((char, i) => {
  if (i < resolvedIndex) return char;
  return glyphs[Math.floor(Math.random() * glyphs.length)];
}).join('');`,
  tags: ['Typography', 'Cyberpunk', 'Matrix', 'Cryptographic', 'Decoder', 'Terminal'],
};

const GLYPH_CHARS = 'ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ0123456789ABCDEF$#%&*<>[]{}§±∑√∆';

const PRESET_MESSAGES = [
  'QUANTUM_CIPHER // ROOT_ACCESS_GRANTED',
  'NEURAL_LINK_STABILIZED // 10.48.22.1',
  'ZERO_DAY_PAYLOAD_DEPLOYED // NODE_7',
  'SUB_ORBITAL_TELEMETRY // ENCRYPTED',
];

export default function TypographyCyberMatrixDecoder() {
  const [targetMessage, setTargetMessage] = useState<string>(PRESET_MESSAGES[0]);
  const [displayText, setDisplayText] = useState<string>(PRESET_MESSAGES[0]);
  const [resolvedIndex, setResolvedIndex] = useState<number>(0);
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false);
  const [decryptSpeed, setDecryptSpeed] = useState<number>(35); // ms per step (15 to 80)
  const [phosphorColor, setPhosphorColor] = useState<'GREEN' | 'CYAN' | 'AMBER'>('GREEN');
  const [showScanlines, setShowScanlines] = useState<boolean>(true);
  const [binaryBackground, setBinaryBackground] = useState<string[]>([]);

  // Generate tactical ambient binary streams
  useEffect(() => {
    const lines: string[] = [];
    for (let i = 0; i < 14; i++) {
      let line = '';
      for (let j = 0; j < 36; j++) {
        line += Math.random() > 0.5 ? '1' : '0';
      }
      lines.push(line);
    }
    setBinaryBackground(lines);
  }, []);

  // Trigger decryption sequence
  const startDecryption = (text: string) => {
    setIsDecrypting(true);
    setResolvedIndex(0);
    soundFx.playChime(1200, 0.2);

    let currentResolved = 0;
    const interval = setInterval(() => {
      currentResolved++;
      setResolvedIndex(currentResolved);

      soundFx.playTick(600 + (currentResolved % 8) * 120);

      // Scramble remaining
      const scrambled = text
        .split('')
        .map((char, index) => {
          if (index < currentResolved) return char;
          if (char === ' ' || char === '/') return char;
          return GLYPH_CHARS[Math.floor(Math.random() * GLYPH_CHARS.length)];
        })
        .join('');

      setDisplayText(scrambled);

      if (currentResolved >= text.length) {
        clearInterval(interval);
        setDisplayText(text);
        setIsDecrypting(false);
        soundFx.playChime(800, 0.4);
      }
    }, decryptSpeed);
  };

  useEffect(() => {
    startDecryption(targetMessage);
  }, [targetMessage, decryptSpeed]);

  const colorStyles = {
    GREEN: {
      text: 'text-emerald-400',
      glow: 'shadow-[0_0_20px_rgba(52,211,153,0.35)]',
      border: 'border-emerald-500/40',
      bgGlow: 'bg-emerald-950/20',
      badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      accent: 'accent-emerald-400',
    },
    CYAN: {
      text: 'text-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.35)]',
      border: 'border-cyan-500/40',
      bgGlow: 'bg-cyan-950/20',
      badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
      accent: 'accent-cyan-400',
    },
    AMBER: {
      text: 'text-amber-400',
      glow: 'shadow-[0_0_20px_rgba(251,191,36,0.35)]',
      border: 'border-amber-500/40',
      bgGlow: 'bg-amber-950/20',
      badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      accent: 'accent-amber-400',
    },
  }[phosphorColor];

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className={`w-full bg-[#05070a] border ${colorStyles.border} rounded-2xl overflow-hidden flex flex-col font-mono`}>
        {/* Terminal Stage View */}
        <div className="relative w-full h-[450px] sm:h-[480px] bg-black p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          {/* Subtle CRT Scanline Overlay */}
          {showScanlines && (
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.45)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-75" />
          )}

          {/* Ambient Background Binary Stream Matrix */}
          <div className="absolute inset-0 p-6 opacity-10 flex flex-col justify-between select-none pointer-events-none font-mono text-xs overflow-hidden text-zinc-500">
            {binaryBackground.map((stream, idx) => (
              <div key={idx} className="tracking-widest">
                {stream} {stream}
              </div>
            ))}
          </div>

          {/* Terminal Title Bar */}
          <div className="relative z-20 flex items-center justify-between border-b border-white/10 pb-3 text-xs">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${colorStyles.badge} inline-block animate-ping`} />
              <span className={`${colorStyles.text} font-bold flex items-center gap-1.5`}>
                <Terminal className="w-4 h-4" /> SECURE_CIPHER_TERMINAL // SHA_512
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-zinc-500 hidden sm:inline">CIPHER_STATUS:</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold border flex items-center gap-1 ${
                  isDecrypting ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : colorStyles.badge
                }`}
              >
                {isDecrypting ? <Lock className="w-3 h-3 animate-spin" /> : <Unlock className="w-3 h-3" />}
                {isDecrypting ? 'DECRYPTING...' : 'RESOLVED'}
              </span>
            </div>
          </div>

          {/* Decryption Centerpiece */}
          <div className="relative z-20 my-auto py-8">
            <div className="text-[11px] text-zinc-500 mb-2 flex items-center gap-2">
              <span className="text-white/40">&gt;&gt; STDIN BUFFER_STREAM:</span>
              <span className="text-zinc-400">LENGTH: {targetMessage.length} CHARS</span>
            </div>

            {/* Glowing Text Display */}
            <div className="p-6 rounded-xl bg-black/80 border border-white/10 backdrop-blur-md">
              <h2
                className={`text-2xl sm:text-4xl md:text-5xl font-black tracking-wider break-all leading-tight font-mono ${colorStyles.text} drop-shadow-[0_0_15px_currentColor]`}
              >
                {displayText}
                <span className="inline-block w-3.5 sm:w-5 h-8 sm:h-11 ml-2 bg-current animate-pulse align-middle" />
              </h2>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
              <div className="w-full bg-zinc-900 h-2 rounded-full overflow-hidden border border-white/10">
                <div
                  className={`h-full transition-all duration-75 ${
                    phosphorColor === 'GREEN'
                      ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]'
                      : phosphorColor === 'CYAN'
                      ? 'bg-cyan-400 shadow-[0_0_8px_#22d3ee]'
                      : 'bg-amber-400 shadow-[0_0_8px_#fbbf24]'
                  }`}
                  style={{ width: `${(resolvedIndex / targetMessage.length) * 100}%` }}
                />
              </div>
              <span className="font-mono shrink-0">
                {Math.round((resolvedIndex / targetMessage.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Terminal Bottom Telemetry */}
          <div className="relative z-20 flex items-center justify-between border-t border-white/10 pt-3 text-[11px] text-zinc-500">
            <div className="flex items-center gap-4">
              <span>LATENCY: 1.4ms</span>
              <span className="hidden sm:inline">ENTROPY: 99.8%</span>
              <span className="hidden md:inline">KERNEL: CYBER_CRYPTO_V4</span>
            </div>
            <button
              onClick={() => {
                soundFx.playChime(900);
                startDecryption(targetMessage);
              }}
              className={`px-3 py-1 rounded text-xs font-bold uppercase transition-all flex items-center gap-1.5 border ${colorStyles.badge} hover:brightness-125`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDecrypting ? 'animate-spin' : ''}`} />
              <span>Re-Decrypt</span>
            </button>
          </div>
        </div>

        {/* Decoder Tuning Dashboard */}
        <div className="p-5 bg-[#080b11] border-t border-white/10 flex flex-col gap-4 text-xs font-mono">
          {/* Preset Buttons */}
          <div>
            <span className="text-zinc-400 text-[11px] uppercase tracking-wider block mb-2">
              Select Preset Decryption Targets:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
              {PRESET_MESSAGES.map((msg, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playClick(800);
                    setTargetMessage(msg);
                  }}
                  className={`p-2 rounded text-left truncate border transition-colors ${
                    targetMessage === msg
                      ? `${colorStyles.badge} font-bold`
                      : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white hover:bg-white/5'
                  }`}
                >
                  &gt; {msg}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders & Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Decrypt Speed */}
            <div className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">DECRYPT SPEED:</span>
                <span className={`${colorStyles.text} font-bold`}>{decryptSpeed} ms</span>
              </div>
              <input
                type="range"
                min="15"
                max="80"
                step="5"
                value={decryptSpeed}
                onChange={(e) => {
                  soundFx.playTick(900);
                  setDecryptSpeed(Number(e.target.value));
                }}
                className={`w-full ${colorStyles.accent} h-1.5 bg-zinc-800 rounded cursor-pointer`}
              />
            </div>

            {/* Phosphor Color Switch */}
            <div className="p-3 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="text-zinc-400 text-xs mb-2">PHOSPHOR COLOR:</span>
              <div className="flex items-center gap-1.5">
                {(['GREEN', 'CYAN', 'AMBER'] as const).map((col) => (
                  <button
                    key={col}
                    onClick={() => {
                      soundFx.playClick(750);
                      setPhosphorColor(col);
                    }}
                    className={`flex-1 py-1 text-[11px] font-bold rounded border transition-colors ${
                      phosphorColor === col
                        ? colorStyles.badge
                        : 'bg-black/40 text-zinc-400 border-white/10 hover:text-white'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Scanlines Toggle */}
            <div className="p-3 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-zinc-300 font-bold block">CRT SCANLINES</span>
                <span className="text-[10px] text-zinc-500">Phosphor mesh filter</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setShowScanlines(!showScanlines);
                }}
                className={`px-3 py-1.5 rounded font-bold uppercase transition-colors border ${
                  showScanlines ? colorStyles.badge : 'bg-black/40 text-zinc-400 border-white/10'
                }`}
              >
                {showScanlines ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
