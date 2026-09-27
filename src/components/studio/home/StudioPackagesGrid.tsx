import React from 'react';
import { SITE_CONTENT, StudioPackage } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import { ShoppingBag, CheckCircle2, ShieldCheck, Clock, Sparkles, ArrowLeft } from 'lucide-react';

interface StudioPackagesGridProps {
  onAddToCart: (pkg: StudioPackage, e: React.MouseEvent<HTMLButtonElement>) => void;
  onOpenBotsPage: () => void;
}

export default function StudioPackagesGrid({
  onAddToCart,
  onOpenBotsPage,
}: StudioPackagesGridProps) {
  const packages = SITE_CONTENT.packages;

  return (
    <section id="packages-section" className="relative py-24 px-4 sm:px-8 bg-[#09090B] border-b border-[#202027] overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-cyan-400" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                07 // SHOP &bull; WOOCOMMERCE PACKAGES (1:1 MAP)
              </span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-5xl text-white mt-1">
              پکیج‌های مهندسی‌شده و آماده سفارش
            </h2>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
            <span>GUARANTEED TURN-KEY SLA // تحویل قطعی</span>
          </div>
        </div>

        {/* Packages Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="relative p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-400/50 shadow-2xl flex flex-col justify-between space-y-6 group transition-all duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-[#17171D] border border-[#202027] text-cyan-300 font-mono text-[11px] font-bold">
                    {pkg.sku} &bull; {pkg.category}
                  </span>
                  {pkg.badge && (
                    <span className="px-3 py-1 rounded-full bg-gradient-to-r from-violet-600/30 to-cyan-500/30 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-black uppercase">
                      {pkg.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="font-['Lalezar'] text-2xl sm:text-3xl text-white group-hover:text-cyan-300 transition-colors">
                    {pkg.title}
                  </h3>
                  <p className="font-['Vazirmatn'] text-xs text-zinc-400 leading-relaxed font-light mt-2">
                    {pkg.summary}
                  </p>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 border-t border-[#202027]">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-['Vazirmatn']">
                      <CheckCircle2 className="w-4 h-4 text-[#B8FF3D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-6 border-t border-[#202027] space-y-4">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-['Lalezar'] text-2xl sm:text-3xl text-white">
                      {pkg.priceToman}
                    </span>
                    <span className="font-mono text-xs text-zinc-500 block">
                      یا معادل ${pkg.priceUsd} USDT / بین‌المللی
                    </span>
                  </div>

                  <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    {pkg.timeline}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      soundFx.playClick(850);
                      onAddToCart(pkg, e);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-400 hover:opacity-95 text-black font-['Lalezar'] text-base font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                  >
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>افزودن به سبد سفارش (فیزیک نخ)</span>
                  </button>

                  {pkg.id === 'pkg-social-ai-bot' && (
                    <button
                      onClick={onOpenBotsPage}
                      className="px-4 py-3.5 rounded-xl bg-[#17171D] hover:bg-white/10 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold transition-all"
                    >
                      دمو زنده
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
