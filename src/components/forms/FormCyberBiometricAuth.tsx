import React, { useState, useRef, useEffect } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Fingerprint, Shield, Key, Cpu, Zap, CheckCircle, RefreshCw, Terminal, Lock } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'form_v03_cyberbiometricauth',
  name: 'Cyberpunk Neural Handshake & Biometric Auth Stepper',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React 19', 'Canvas 2D Ridge Scanner', 'SHA-256 Entropy Sim', 'Cyber Haptics', 'Terminal Telemetry'],
  aestheticVibe: 'Cyberpunk & High-Density UI',
  interactionBlueprint: 'Hold cursor over biometric ridge canvas to charge capacitive neural handshake. Stepper advances through cryptographic seed generation, hardware security token matching, and multi-factor cipher unlock with cyber glitch audio.',
  description: 'High-density sci-fi multi-factor authentication terminal featuring real-time interactive fingerprint capacitive scanning, entropy bar meter, and zero-trust clearance verification.',
  codeSnippet: `// Biometric Ridge Scanner Canvas Loop
ctx.arc(cx, cy, radius, 0, Math.PI * 2);
ctx.strokeStyle = \`rgba(34, 211, 238, \${chargeLevel})\`;
ctx.stroke();`,
  tags: ['Form', 'Cyberpunk', 'Biometric', 'Authentication', 'Security', 'Canvas Scanner'],
};

export default function FormCyberBiometricAuth() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [authStep, setAuthStep] = useState<1 | 2 | 3>(1);
  const [entropyKey, setEntropyKey] = useState('0x9F41_A4E7_33B0_C89D');
  const [tokenInput, setTokenInput] = useState('');
  const [clearanceGranted, setClearanceGranted] = useState(false);
  const [statusLogs, setStatusLogs] = useState<string[]>([
    'KERNEL: Initializing Biometric Subsystem...',
    'NEURAL: Handshake port 0x7E3 active',
    'STATUS: Awaiting capacitive biometric contact',
  ]);

  // Handle fingerprint scanning canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = (canvas.width = 160);
      const h = (canvas.height = 160);
      const cx = w / 2;
      const cy = h / 2;

      ctx.clearRect(0, 0, w, h);

      // Draw concentric fingerprint ridges
      const ridges = 10;
      for (let r = 1; r <= ridges; r++) {
        const radius = r * 6.5;
        const wave = Math.sin(t * 3 + r * 0.7) * 2;

        ctx.beginPath();
        ctx.arc(cx, cy, radius + wave, 0, Math.PI * 2);
        const alpha = 0.15 + (scanProgress / 100) * 0.85;
        ctx.strokeStyle = isScanning
          ? `rgba(34, 211, 238, ${alpha})`
          : 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Scanner laser line moving vertically if scanning
      if (isScanning) {
        const laserY = (Math.sin(t * 4) * 0.5 + 0.5) * h;
        const grad = ctx.createLinearGradient(0, laserY - 4, 0, laserY + 4);
        grad.addColorStop(0, 'rgba(34, 211, 238, 0)');
        grad.addColorStop(0.5, 'rgba(34, 211, 238, 0.9)');
        grad.addColorStop(1, 'rgba(34, 211, 238, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, laserY - 3, w, 6);
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [isScanning, scanProgress]);

  // Charging fingerprint logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isScanning && scanProgress < 100) {
      interval = setInterval(() => {
        setScanProgress((prev) => {
          const next = prev + 4;
          if (next % 16 === 0) soundFx.playTick(700 + next * 4);
          if (next >= 100) {
            clearInterval(interval);
            setIsScanning(false);
            soundFx.playChime(920, 0.3);
            setAuthStep(2);
            setStatusLogs((l) => [
              ...l,
              'BIOMETRIC: Neural scan verified [CLEARANCE LVL 5]',
              'AWAITING: 6-digit cryptographic TOTP token',
            ]);
            return 100;
          }
          return next;
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isScanning, scanProgress]);

  const generateNewEntropy = () => {
    soundFx.playCyberBlip();
    const hex = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 0xffff)
        .toString(16)
        .toUpperCase()
        .padStart(4, '0')
    ).join('_');
    setEntropyKey(`0x${hex}`);
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tokenInput.length < 6) return;
    soundFx.playChime(800, 0.2);
    setAuthStep(3);
    setClearanceGranted(true);
    setStatusLogs((l) => [
      ...l,
      `CRYPTO: Token ${tokenInput} validated against enclave`,
      'ACCESS: SYSTEM ROOT TERMINAL UNLOCKED',
    ]);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative bg-[#020509]">
        <div className="max-w-5xl mx-auto font-mono">
          {/* Top Cyber Telemetry Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyan-500/30 pb-4 mb-6">
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="w-4 h-4 animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase">
                NEURAL HANDSHAKE TERMINAL // PROTOCOL 11.03
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-zinc-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                SECURE ENCLAVE ACTIVE
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-cyan-400 font-bold">PORT: 8088</span>
            </div>
          </div>

          {/* Stepper Status Indicators */}
          <div className="grid grid-cols-3 gap-3 mb-8 text-xs">
            {[
              { step: 1, title: 'PHASE 1: BIOMETRICS', status: scanProgress === 100 ? 'VERIFIED' : isScanning ? 'SCANNING...' : 'PENDING' },
              { step: 2, title: 'PHASE 2: TOTP KEY', status: authStep >= 2 ? (clearanceGranted ? 'MATCHED' : 'AWAITING') : 'LOCKED' },
              { step: 3, title: 'PHASE 3: ENCLAVE CIPHER', status: clearanceGranted ? 'UNLOCKED' : 'SEALED' },
            ].map((p) => (
              <div
                key={p.step}
                className={`p-3 border rounded transition-all ${
                  authStep === p.step
                    ? 'border-cyan-400 bg-cyan-950/40 text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.2)]'
                    : authStep > p.step
                    ? 'border-emerald-500/50 bg-emerald-950/20 text-emerald-400'
                    : 'border-white/10 bg-zinc-950 text-zinc-600'
                }`}
              >
                <div className="font-bold tracking-wider">{p.title}</div>
                <div className="text-[10px] mt-1 opacity-80">{p.status}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Interactive Capacitive Biometric Scanner */}
            <div className="lg:col-span-5 bg-zinc-950 border border-cyan-500/30 p-6 rounded-xl flex flex-col items-center text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

              <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider mb-4">
                Capacitive Neural Fingerprint Sensor
              </span>

              {/* Canvas Ridge Scanner */}
              <div
                onMouseDown={() => {
                  soundFx.playClick(600);
                  setIsScanning(true);
                }}
                onMouseUp={() => setIsScanning(false)}
                onTouchStart={() => setIsScanning(true)}
                onTouchEnd={() => setIsScanning(false)}
                className={`w-40 h-40 rounded-full border-2 cursor-pointer relative flex items-center justify-center transition-all ${
                  isScanning
                    ? 'border-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.4)] scale-95'
                    : scanProgress === 100
                    ? 'border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.3)]'
                    : 'border-white/20 hover:border-cyan-400/60'
                }`}
                title="Press & hold to charge scan"
              >
                <canvas ref={canvasRef} className="absolute inset-0 rounded-full pointer-events-none" />
                <Fingerprint
                  className={`w-14 h-14 transition-colors duration-300 ${
                    scanProgress === 100
                      ? 'text-emerald-400'
                      : isScanning
                      ? 'text-cyan-300 animate-pulse'
                      : 'text-zinc-600'
                  }`}
                />
              </div>

              {/* Charge Progress bar */}
              <div className="w-full mt-5">
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-zinc-400">CHARGE:</span>
                  <span className={scanProgress === 100 ? 'text-emerald-400 font-bold' : 'text-cyan-400 font-bold'}>
                    {scanProgress}%
                  </span>
                </div>
                <div className="w-full h-2 bg-zinc-900 border border-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-75 ${
                      scanProgress === 100 ? 'bg-emerald-400' : 'bg-cyan-400'
                    }`}
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              <span className="text-[10px] text-zinc-500 mt-3">
                {scanProgress === 100
                  ? 'BIOMETRIC SIGNATURE IDENTIFIED'
                  : 'PRESS & HOLD TO INITIATE CAPACITIVE SCAN'}
              </span>
            </div>

            {/* Cryptographic Key & Step Form */}
            <div className="lg:col-span-7 bg-zinc-950 border border-white/15 p-6 rounded-xl space-y-5">
              {/* Dynamic Entropy Display */}
              <div className="border border-white/10 bg-black p-3 rounded flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-zinc-500 block uppercase">SESSION ENTROPY SEED</span>
                  <span className="text-xs text-cyan-300 font-mono tracking-wider font-bold">{entropyKey}</span>
                </div>
                <button
                  type="button"
                  onClick={generateNewEntropy}
                  className="p-1.5 rounded bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white"
                  title="Re-seed entropy"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Form Input for TOTP / PIN */}
              <form onSubmit={handleTokenSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1.5 text-zinc-300 flex items-center justify-between">
                    <span>MULTI-FACTOR HARDWARE CIPHER</span>
                    <span className="text-[10px] text-zinc-500">6-DIGIT TOTP</span>
                  </label>
                  <input
                    type="text"
                    disabled={scanProgress < 100 || clearanceGranted}
                    value={tokenInput}
                    onChange={(e) => {
                      const v = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setTokenInput(v);
                      soundFx.playTick(800 + v.length * 30);
                    }}
                    placeholder={scanProgress < 100 ? 'LOCKED (SCAN BIOMETRIC FIRST)' : 'ENTER 6-DIGIT CODE (e.g. 749201)'}
                    className="w-full bg-black border border-cyan-500/40 rounded px-4 py-3 text-sm text-cyan-300 font-mono tracking-[0.2em] focus:outline-none focus:border-cyan-400 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={scanProgress < 100 || tokenInput.length < 6 || clearanceGranted}
                  className="w-full py-3 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-mono font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {clearanceGranted ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-black" />
                      <span>ACCESS AUTHORIZED</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>VERIFY SECURITY TOKEN</span>
                    </>
                  )}
                </button>
              </form>

              {/* Real-time System Terminal Logs */}
              <div className="border border-white/10 bg-black p-3 rounded font-mono text-[10px] space-y-1 text-zinc-400 max-h-28 overflow-y-auto">
                <div className="text-zinc-600 border-b border-white/5 pb-1 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>ENCLAVE AUDIT TRACE</span>
                </div>
                {statusLogs.map((log, idx) => (
                  <div key={idx} className={idx === statusLogs.length - 1 ? 'text-cyan-400 font-bold' : ''}>
                    &gt; {log}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
