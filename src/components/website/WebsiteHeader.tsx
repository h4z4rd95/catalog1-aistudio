import React, { useState } from 'react';
import { useStore, WebsitePage } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import {
  Sparkles,
  ShoppingBag,
  Layers,
  Music,
  Volume2,
  VolumeX,
  Compass,
  Store,
  Info,
  Mail,
  User,
  Menu,
  X,
  ChevronDown
} from 'lucide-react';

interface WebsiteHeaderProps {
  onSwitchToShowroom: () => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({ onSwitchToShowroom }) => {
  const { activePage, setActivePage, cartCount, setIsCartDrawerOpen, currency, setCurrency } = useStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientActive, setAmbientActive] = useState(soundFx.droneActive);
  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [currentPreset, setCurrentPreset] = useState(soundFx.ambientPreset);

  const navLinks: { id: WebsitePage; label: string; icon: React.ReactNode }[] = [
    { id: 'LANDING', label: 'Studio', icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'STORE', label: 'Store & Drops', icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'ABOUT', label: 'Manifesto', icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'CONTACT', label: 'Inquiry', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'AUTH', label: 'Account', icon: <User className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (page: WebsitePage) => {
    soundFx.playClick(650);
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAmbient = () => {
    const newState = soundFx.toggleAmbientDrone();
    setAmbientActive(newState);
  };

  const handleSelectPreset = (preset: 'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL') => {
    soundFx.setAmbientPreset(preset);
    setCurrentPreset(preset);
    if (!ambientActive) {
      soundFx.startAmbientDrone();
      setAmbientActive(true);
    }
    soundFx.playChime(700, 0.15);
  };

  const handleToggleFx = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050609]/85 backdrop-blur-xl border-b border-white/10 text-white transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleNavClick('LANDING')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-amber-300 to-rose-400 p-[1px] flex items-center justify-center">
              <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-['Syne'] font-black tracking-wider text-base text-white block leading-none">
                AURA<span className="text-cyan-400">.</span>STUDIO
              </span>
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest block mt-0.5">
                Spatial Agency &bull; Store
              </span>
            </div>
          </button>

          {/* Quick Mode Switcher to Catalog */}
          <button
            onClick={() => {
              soundFx.playChime(600, 0.2);
              onSwitchToShowroom();
            }}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white font-mono text-[11px] transition-all"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>55-Component Showroom</span>
            <span className="bg-amber-400/20 text-amber-300 text-[9px] px-1.5 py-0.2 rounded font-bold ml-1">
              55 Live
            </span>
          </button>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 p-1 rounded-full font-mono text-xs">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activePage === link.id
                  ? 'bg-cyan-400 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right: Sound Controls + Cart Trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick(750);
                setShowCurrencyDropdown(!showCurrencyDropdown);
              }}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/15 font-mono text-[11px] text-zinc-300 transition-colors"
              title="Select Display Currency"
            >
              <span className="font-bold text-amber-400">{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showCurrencyDropdown && (
              <div className="absolute right-0 top-full mt-2 w-32 rounded-xl bg-black/95 border border-white/20 p-1.5 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1 font-mono text-xs">
                {(['USD', 'EUR', 'GBP', 'JPY', 'BTC'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      soundFx.playClick(850);
                      setCurrency(curr);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                      currency === curr
                        ? 'bg-amber-400 text-black font-bold'
                        : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="opacity-70 text-[10px]">
                      {curr === 'USD' && '$'}
                      {curr === 'EUR' && '€'}
                      {curr === 'GBP' && '£'}
                      {curr === 'JPY' && '¥'}
                      {curr === 'BTC' && '₿'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ambient Music Button */}
          <div className="relative">
            <button
              onClick={handleToggleAmbient}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border font-mono text-[11px] transition-all ${
                ambientActive
                  ? 'bg-cyan-950/60 border-cyan-400/60 text-cyan-300 shadow-sm shadow-cyan-500/20'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
              title="Toggle Generative Ambient Music"
            >
              <Music className={`w-3.5 h-3.5 ${ambientActive ? 'animate-pulse text-cyan-300' : ''}`} />
              <span className="hidden sm:inline">
                {ambientActive ? 'MUSIC ON' : 'MUSIC OFF'}
              </span>
            </button>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleFx}
            className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all ${
              soundEnabled
                ? 'bg-amber-950/40 border-amber-400/40 text-amber-300'
                : 'bg-white/5 border-white/10 text-zinc-500 hover:text-zinc-300'
            }`}
            title={soundEnabled ? 'Tactile FX Enabled' : 'Tactile FX Muted'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Cart Trigger with Bouncy Badge */}
          <button
            onClick={() => {
              soundFx.playChime(800, 0.15);
              setIsCartDrawerOpen(true);
            }}
            className="relative flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">CART</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-black text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#07090e] px-4 py-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full px-4 py-2.5 rounded-lg flex items-center gap-2.5 font-mono text-xs transition-all ${
                activePage === link.id
                  ? 'bg-cyan-400 text-black font-bold'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSwitchToShowroom();
            }}
            className="w-full mt-2 px-4 py-2.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center gap-2 font-mono text-xs font-bold"
          >
            <Layers className="w-4 h-4" />
            <span>Switch to 55-Component Showroom</span>
          </button>
        </div>
      )}
    </header>
  );
};
