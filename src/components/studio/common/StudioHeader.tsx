import React, { useState } from 'react';
import { SITE_CONTENT, StudioPackage } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import {
  Sparkles,
  ShoppingBag,
  Layers,
  Cpu,
  Menu,
  X,
  ArrowRight,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface StudioHeaderProps {
  currentRoute: 'HOME' | 'DEPARTMENTS' | 'BOTS' | 'SHOP';
  onNavigate: (route: 'HOME' | 'DEPARTMENTS' | 'BOTS' | 'SHOP') => void;
  cartCount: number;
  onOpenCartModal: () => void;
  onSwitchToShowroom: () => void;
}

export default function StudioHeader({
  currentRoute,
  onNavigate,
  cartCount,
  onOpenCartModal,
  onSwitchToShowroom,
}: StudioHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#09090B]/90 backdrop-blur-xl border-b border-[#202027]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Descriptor */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              onNavigate('HOME');
            }}
            className="flex items-center gap-2 text-right group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#7C3AED] to-[#22D3EE] p-[1px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#09090B] rounded-[11px] flex items-center justify-center font-['Lalezar'] text-cyan-300 text-lg">
                ۱۲۳
              </div>
            </div>
            <div>
              <span className="font-['Lalezar'] text-xl text-white block leading-none">
                123Service<span className="text-[#22D3EE]">.</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500 block mt-0.5">
                {SITE_CONTENT.brand.descriptor}
              </span>
            </div>
          </button>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#111116] p-1.5 rounded-2xl border border-[#202027] font-mono text-xs">
          {[
            { id: 'HOME', label: 'صفحه اصلی استودیو' },
            { id: 'DEPARTMENTS', label: 'دپارتمان‌ها و خدمات' },
            { id: 'BOTS', label: '🤖 ساخت ربات هوشمند (Bespoke)' },
            { id: 'SHOP', label: 'پکیج‌ها و فروشگاه' },
          ].map((item) => {
            const isActive = currentRoute === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  soundFx.playClick(700);
                  onNavigate(item.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-black shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Cart Anchor & Showroom Switcher */}
        <div className="flex items-center gap-3">
          {/* Cart Anchor Button (target for physical thread) */}
          <button
            id="studio-cart-anchor"
            onClick={() => {
              soundFx.playChime(850, 0.2);
              onOpenCartModal();
            }}
            className="relative px-3.5 py-2 rounded-xl bg-[#111116] hover:bg-[#17171D] border border-[#202027] hover:border-cyan-400 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">سبد سفارش</span>
            <span className="w-5 h-5 rounded-full bg-[#B8FF3D] text-black text-[10px] font-black flex items-center justify-center font-mono">
              {cartCount}
            </span>
          </button>

          {/* Quick Exit to Catalog Showroom */}
          <button
            onClick={() => {
              soundFx.playClick(600);
              onSwitchToShowroom();
            }}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 font-mono text-xs transition-colors"
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>کاتالوگ ۶۰ تایی</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-[#111116] border border-[#202027] text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#09090B] border-b border-[#202027] p-4 space-y-2 animate-in fade-in duration-150">
          {[
            { id: 'HOME', label: 'صفحه اصلی استودیو' },
            { id: 'DEPARTMENTS', label: 'دپارتمان‌ها و خدمات' },
            { id: 'BOTS', label: '🤖 ساخت ربات هوشمند (Bespoke)' },
            { id: 'SHOP', label: 'پکیج‌ها و فروشگاه' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                soundFx.playClick(700);
                onNavigate(item.id as any);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-right p-3 rounded-xl font-mono text-xs font-bold transition-all ${
                currentRoute === item.id
                  ? 'bg-cyan-400 text-black'
                  : 'text-zinc-300 hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onSwitchToShowroom();
              setMobileMenuOpen(false);
            }}
            className="w-full text-right p-3 rounded-xl bg-amber-400/10 text-amber-300 font-mono text-xs font-bold flex items-center justify-between"
          >
            <span>ورود به کاتالوگ ۶۰ قطعه</span>
            <Layers className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
}
