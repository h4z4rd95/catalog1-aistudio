import React, { useState } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { CreditCard, ShieldCheck, Sparkles, ArrowRight, Check, Eye, EyeOff, Lock, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'form_v01_chromaticglasspayment',
  name: 'Chromatic Liquid Glassmorphic Payment & Morphing Card',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React 19', 'CSS 3D Gyro Perspective', 'Dynamic Card Morph', 'RegEx Formatter', 'Web Audio Haptics'],
  aestheticVibe: 'Chromatic Liquid Gradient / Spatial Glassmorphism',
  interactionBlueprint: 'Interactive 3D glass card rotates with mouse movement. Card number formatting updates live card brand (Visa, Mastercard, Amex) with chromatic aura morphing. CVV focus flips card to magnetic strip back with tactile audio clicks.',
  description: 'Ultra-fluid chromatic glassmorphic payment checkout suite with real-time 3D card tilt, dynamic brand aura shifting, haptic feedback, and multi-step validation.',
  codeSnippet: `// 3D Glass tilt & dynamic chromatic brand aura
const rotateX = (clientY - rect.top - rect.height / 2) * -0.06;
const rotateY = (clientX - rect.left - rect.width / 2) * 0.06;
cardRef.current.style.transform = \`perspective(1000px) rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;`,
  tags: ['Form', 'Checkout', 'Payment', '3D Card', 'Glassmorphism', 'Chromatic', 'Interactive'],
};

export default function FormChromaticGlassPayment() {
  const [cardNumber, setCardNumber] = useState('4532 8920 1142 9831');
  const [cardHolder, setCardHolder] = useState('VALENTINA VANCE');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('842');
  const [isFlipped, setIsFlipped] = useState(false);
  const [showCvv, setShowCvv] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Detect card type
  const getCardBrand = () => {
    const clean = cardNumber.replace(/\s+/g, '');
    if (clean.startsWith('4')) return { name: 'VISA ULTRA', color: 'from-cyan-500 via-blue-500 to-indigo-500' };
    if (clean.startsWith('5')) return { name: 'MASTERCARD BLACK', color: 'from-amber-500 via-rose-500 to-purple-600' };
    if (clean.startsWith('3')) return { name: 'AMEX CENTURION', color: 'from-emerald-400 via-teal-500 to-cyan-600' };
    return { name: 'CHROMATIC GLOBAL', color: 'from-fuchsia-500 via-violet-500 to-cyan-500' };
  };

  const brand = getCardBrand();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = v.match(/.{1,4}/g)?.join(' ') || v;
    setCardNumber(formatted);
    soundFx.playTick(680);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(640, 0.2);
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      soundFx.playChime(880, 0.4);
    }, 1200);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-6xl mx-auto">
          {/* Header HUD */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold tracking-widest uppercase mb-1">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>VARIATION 51 // BATCH 11 &bull; CHROMATIC FORMS</span>
              </div>
              <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Chromatic Liquid Glassmorphic Payment &amp; Morphing Card
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>256-BIT QUANTUM ENCRYPTION ACTIVE</span>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="max-w-xl mx-auto mb-8 flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-white/10 -z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all duration-500 -z-0"
              style={{ width: activeStep === 1 ? '0%' : activeStep === 2 ? '50%' : '100%' }}
            />
            {[
              { num: 1, label: 'Payment Card' },
              { num: 2, label: 'Billing Atelier' },
              { num: 3, label: 'Confirmation' },
            ].map((s) => (
              <button
                key={s.num}
                onClick={() => {
                  soundFx.playClick(720);
                  setActiveStep(s.num as 1 | 2 | 3);
                }}
                className={`flex flex-col items-center gap-1.5 z-10 bg-[#050608] px-2`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    activeStep >= s.num
                      ? 'bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black shadow-[0_0_12px_rgba(34,211,238,0.4)]'
                      : 'bg-zinc-800 text-zinc-500 border border-white/10'
                  }`}
                >
                  {s.num}
                </div>
                <span className={`text-[11px] font-mono ${activeStep >= s.num ? 'text-zinc-200 font-bold' : 'text-zinc-500'}`}>
                  {s.label}
                </span>
              </button>
            ))}
          </div>

          {/* Main Grid: 3D Interactive Card + Fluid Form */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 3D Glass Morphing Card Stage */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div
                className="w-full max-w-sm aspect-[1.586/1] relative cursor-pointer select-none group"
                style={{ perspective: '1000px' }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  soundFx.playChime(760, 0.15);
                  setIsFlipped(!isFlipped);
                }}
              >
                {/* Dynamic Ambient Blur Glow behind card */}
                <div
                  className={`absolute -inset-4 rounded-3xl bg-gradient-to-r ${brand.color} opacity-30 blur-2xl transition-all duration-700 -z-10`}
                />

                {/* Card Body with 3D Transform */}
                <div
                  className="w-full h-full rounded-2xl p-6 relative transition-transform duration-200 ease-out preserve-3d backdrop-blur-2xl border border-white/20 shadow-2xl bg-gradient-to-br from-white/10 via-white/5 to-white/0 overflow-hidden"
                  style={{
                    transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg)`,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Iridescent diagonal specular sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-fuchsia-500/15 to-transparent pointer-events-none" />

                  {/* FRONT FACE */}
                  <div
                    className={`w-full h-full flex flex-col justify-between absolute inset-0 p-6 ${
                      isFlipped ? 'invisible' : 'visible'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      {/* EMV Hologram Chip */}
                      <div className="flex items-center gap-2">
                        <div className="w-11 h-8 rounded bg-gradient-to-tr from-amber-300 via-amber-400 to-amber-200 border border-amber-200/40 p-1 flex flex-col justify-between shadow-inner">
                          <div className="w-full h-0.5 bg-amber-600/50" />
                          <div className="w-full h-0.5 bg-amber-600/50" />
                          <div className="w-full h-0.5 bg-amber-600/50" />
                        </div>
                        <Zap className="w-4 h-4 text-cyan-300 animate-pulse" />
                      </div>
                      <span className="font-mono text-xs tracking-widest text-cyan-300 font-bold drop-shadow">
                        {brand.name}
                      </span>
                    </div>

                    {/* Card Number */}
                    <div className="my-auto font-mono text-lg sm:text-xl tracking-[0.18em] text-white font-bold drop-shadow-md">
                      {cardNumber || '•••• •••• •••• ••••'}
                    </div>

                    {/* Bottom Metadata */}
                    <div className="flex items-end justify-between font-mono text-xs">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 block">Cardholder</span>
                        <span className="text-white font-bold tracking-wider uppercase text-[11px] truncate max-w-[140px] block">
                          {cardHolder || 'FULL NAME'}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-zinc-400 block text-right">Expires</span>
                        <span className="text-white font-bold tracking-wider text-[11px] block text-right">
                          {expiry || 'MM/YY'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* BACK FACE */}
                  <div
                    className={`w-full h-full flex flex-col justify-between absolute inset-0 p-6 ${
                      isFlipped ? 'visible' : 'invisible'
                    }`}
                    style={{ transform: 'rotateY(180deg)' }}
                  >
                    <div className="w-full h-10 bg-zinc-950 -mx-6 mt-2 border-y border-white/10" />
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 h-8 bg-zinc-800/80 rounded flex items-center px-3 font-mono text-xs text-zinc-300 border border-white/10">
                        {showCvv ? cvv : '•••'}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setShowCvv(!showCvv);
                          soundFx.playClick();
                        }}
                        className="p-1 text-zinc-400 hover:text-white"
                      >
                        {showCvv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    <div className="text-[8px] font-mono text-zinc-400 leading-tight">
                      This quantum cryptographic instrument is protected by mathematical zero-knowledge proofs. Authorised signature required.
                    </div>
                  </div>
                </div>
              </div>

              <span className="font-mono text-[11px] text-zinc-400 mt-3 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Click card to flip &bull; Move mouse for 3D gyro tilt
              </span>
            </div>

            {/* Form Input Matrix */}
            <div className="lg:col-span-7 bg-[#0b0d13]/90 rounded-2xl border border-white/10 p-6 sm:p-8 backdrop-blur-xl shadow-xl">
              {isSuccess ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mb-4 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2">Payment Authorized</h3>
                  <p className="font-mono text-xs text-zinc-400 max-w-md mb-6">
                    Transaction TX_0x8F92 confirmed across decentralized nodes. A receipt has been dispatched to your secure enclave.
                  </p>
                  <button
                    onClick={() => {
                      setIsSuccess(false);
                      soundFx.playClick(600);
                    }}
                    className="px-6 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs font-bold transition-all"
                  >
                    Reset Demo
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Card Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={handleNumberChange}
                        onFocus={() => setIsFlipped(false)}
                        placeholder="4532 8920 1142 9831"
                        maxLength={19}
                        className="w-full bg-zinc-950/80 border border-white/15 rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        required
                      />
                      <CreditCard className="w-4 h-4 text-zinc-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
                      Cardholder Full Name
                    </label>
                    <input
                      type="text"
                      value={cardHolder}
                      onChange={(e) => {
                        setCardHolder(e.target.value.toUpperCase());
                        soundFx.playTick(720);
                      }}
                      onFocus={() => setIsFlipped(false)}
                      placeholder="VALENTINA VANCE"
                      className="w-full bg-zinc-950/80 border border-white/15 rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => {
                          let v = e.target.value.replace(/\D/g, '').slice(0, 4);
                          if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                          setExpiry(v);
                          soundFx.playTick(740);
                        }}
                        onFocus={() => setIsFlipped(false)}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full bg-zinc-950/80 border border-white/15 rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-mono text-xs text-zinc-400 mb-1.5 uppercase tracking-wider">
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => {
                          setCvv(e.target.value.slice(0, 4));
                          soundFx.playTick(760);
                        }}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        placeholder="•••"
                        maxLength={4}
                        className="w-full bg-zinc-950/80 border border-white/15 rounded-lg px-4 py-2.5 font-mono text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Encrypted with TLS 1.3 &amp; WebCrypto</span>
                    </div>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-teal-400 to-fuchsia-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                    >
                      {isProcessing ? (
                        <>
                          <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Authorizing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Payment</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
