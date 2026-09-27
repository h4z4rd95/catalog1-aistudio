import React from 'react';
import { SITE_CONTENT, StudioPackage } from '../../../content/site';
import { ArrowRight, ShoppingBag, CheckCircle2, Clock, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../../utils/audio';

interface StudioShopPageProps {
  onBackToHome: () => void;
  onAddToCart: (pkg: StudioPackage, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function StudioShopPage({ onBackToHome, onAddToCart }: StudioShopPageProps) {
  const packages = SITE_CONTENT.packages;

  return (
    <div className="min-h-screen bg-[#09090B] text-white font-['Plus_Jakarta_Sans'] pb-24">
      {/* Top Breadcrumb */}
      <div className="border-b border-[#202027] bg-[#111116]/80 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between sticky top-16 z-30">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به صفحه اصلی استودیو</span>
        </button>

        <span className="font-mono text-xs text-zinc-400">
          STUDIO SHOP &bull; WOOCOMMERCE COMPATIBLE
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#111116] border border-[#202027] text-[#B8FF3D] font-mono text-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-[#B8FF3D]" />
            <span>TURN-KEY GUARANTEED PACKAGES</span>
          </div>

          <h1 className="font-['Lalezar'] text-4xl sm:text-6xl text-white">
            فروشگاه پکیج‌ها و سفارش آنلاین
          </h1>

          <p className="font-['Vazirmatn'] text-sm sm:text-base text-zinc-300 leading-relaxed font-light">
            کلیه محصولات این بخش منطبق بر ووکامرس استاندارد هستند؛ هر پکیج دارای قرارداد رسمی SLA، پشتیبانی فنی و زمان‌بندی قطعی است.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] hover:border-cyan-400/50 shadow-2xl flex flex-col justify-between space-y-6 group transition-all"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-[#17171D] border border-[#202027] text-cyan-300 font-mono text-[11px] font-bold">
                    {pkg.sku}
                  </span>
                  {pkg.badge && (
                    <span className="px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 font-mono text-[10px] font-black uppercase">
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

                {/* Features */}
                <div className="space-y-2 pt-2 border-t border-[#202027]">
                  {pkg.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-zinc-300 font-['Vazirmatn']">
                      <CheckCircle2 className="w-4 h-4 text-[#B8FF3D] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price & Action */}
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

                <button
                  onClick={(e) => {
                    soundFx.playClick(850);
                    onAddToCart(pkg, e);
                  }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-400 hover:opacity-95 text-black font-['Lalezar'] text-base font-bold shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4 text-black" />
                  <span>افزودن به سبد سفارش (فیزیک نخ)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
