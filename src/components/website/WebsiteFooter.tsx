import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import { Sparkles, ArrowUpRight, Check, Send, Globe, Terminal, Shield } from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const { setActivePage } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [times, setTimes] = useState({
    london: '',
    tokyo: '',
    nyc: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        tokyo: now.toLocaleTimeString('en-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
        nyc: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      soundFx.playChime(850, 0.2);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="w-full bg-[#030407] border-t border-white/10 text-zinc-400 py-16 px-4 sm:px-6 z-20">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top: Newsletter & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                SYSTEM ONLINE &bull; GLOBAL AVAILABILITY
              </span>
            </div>
            <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Architecting the vanguard of interactive cyberspace.
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-lg font-light">
              AURA Studio is an elite creative collective engineering WebGL experiences, digital design systems, and tactile physical instruments for visionary brands worldwide.
            </p>

            {/* Live Studio Clocks */}
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-[11px] text-zinc-400">
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                <Globe className="w-3 h-3 text-cyan-400" /> LON: <strong className="text-white">{times.london}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                <Globe className="w-3 h-3 text-amber-400" /> NYC: <strong className="text-white">{times.nyc}</strong>
              </span>
              <span className="flex items-center gap-1.5 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md">
                <Globe className="w-3 h-3 text-rose-400" /> TYO: <strong className="text-white">{times.tokyo}</strong>
              </span>
            </div>
          </div>

          {/* Right: Newsletter Subscribe */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/15 backdrop-blur-md">
              <h4 className="font-['Syne'] font-bold text-white text-base mb-1">
                Subscribe to Dispatch Dossier
              </h4>
              <p className="font-mono text-xs text-zinc-400 mb-4">
                Receive private release notifications for limited physical hardware drops and new GLSL shader kits.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                  <Check className="w-4 h-4" />
                  <span>Subscribed successfully. Transmission established.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email coordinates..."
                    required
                    className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>Transmit</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-4">Navigation</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActivePage('LANDING')} className="hover:text-white transition-colors">
                  Studio Home
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('STORE')} className="hover:text-white transition-colors">
                  Digital & Physical Store
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ABOUT')} className="hover:text-white transition-colors">
                  Manifesto & Timeline
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('CONTACT')} className="hover:text-white transition-colors">
                  Client Inquiry Terminal
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('AUTH')} className="hover:text-white transition-colors">
                  Biometric Access Portal
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-4">Disciplines</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li>Three.js &amp; WebGL Shaders</li>
              <li>Spatial Product Configurators</li>
              <li>Procedural Web Audio Haptics</li>
              <li>Kinetic Typography &amp; Skew</li>
              <li>High-Density Telemetry HUDs</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-4">Store Collections</h5>
            <ul className="space-y-2.5 text-zinc-400">
              <li>Vibe Matrix UI Suite</li>
              <li>HyperShader GLSL Caustics</li>
              <li>CyberDeck MK-IV Terminal</li>
              <li>AURA Titanium Tourbillon</li>
              <li>Haptic Knob Controller</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-white uppercase tracking-wider mb-4">Legal &amp; Architecture</h5>
            <div className="space-y-2 text-zinc-400">
              <p className="flex items-center gap-1.5 text-emerald-400">
                <Shield className="w-3.5 h-3.5" /> Commercial Perpetual License
              </p>
              <p className="text-[11px] leading-relaxed">
                All digital assets include perpetual commercial rights for client deployments. Physical items ship worldwide with insured tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Telemetry */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AURA DIGITAL ATELIER LTD. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-zinc-400">55/55 SHOWROOM VARIATIONS LIVE</span>
            <span>&bull;</span>
            <span className="text-emerald-400 font-bold">100% PRODUCTION READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
