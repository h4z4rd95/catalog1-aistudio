import React from 'react';
import { StudioPackage } from '../../../content/site';
import { soundFx } from '../../../utils/audio';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowLeft } from 'lucide-react';

interface StudioCartModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: StudioPackage[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export default function StudioCartModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearCart,
}: StudioCartModalProps) {
  if (!isOpen) return null;

  const totalUsd = items.reduce((acc, it) => acc + it.priceUsd, 0);

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e0f14] border border-[#202027] rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 text-white font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#202027] pb-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <h3 className="font-['Lalezar'] text-2xl text-white">
              سبد سفارش ۱۲۳سرویس
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 font-mono text-xs border border-cyan-500/30">
              {items.length} پکیج
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items List */}
        {items.length === 0 ? (
          <div className="py-12 text-center space-y-3 font-mono text-xs text-zinc-400">
            <ShoppingBag className="w-10 h-10 mx-auto text-zinc-600 animate-pulse" />
            <p>سبد سفارش شما خالی است.</p>
            <p className="text-[11px] text-zinc-500">
              پکیج‌های مهندسی‌شده را از بخش فروشگاه اضافه کنید تا فیزیک کشش نخ فعال شود.
            </p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
            {items.map((pkg, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#14151c] border border-[#202027] flex items-center justify-between gap-4"
              >
                <div>
                  <span className="font-mono text-[10px] text-cyan-400 block font-bold">
                    {pkg.sku}
                  </span>
                  <h4 className="font-['Lalezar'] text-lg text-white">
                    {pkg.title}
                  </h4>
                  <span className="font-mono text-xs text-zinc-300 block">
                    {pkg.priceToman} (${pkg.priceUsd})
                  </span>
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick(500);
                    onRemoveItem(idx);
                  }}
                  className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="pt-4 border-t border-[#202027] space-y-4">
            <div className="flex justify-between items-baseline font-mono text-sm">
              <span className="text-zinc-400">مجموع تخمینی سفارش:</span>
              <span className="font-['Lalezar'] text-2xl text-cyan-300">
                ${totalUsd} USDT
              </span>
            </div>

            <button
              onClick={() => {
                soundFx.playChime(900, 0.25);
                alert('سفارش شما با موفقیت ثبت شد! کارشناس فنی استودیو ظرف ۳۰ دقیقه جهت عقد قرارداد تماس خواهد گرفت.');
                onClearCart();
                onClose();
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-400 hover:opacity-95 text-black font-['Lalezar'] text-lg font-bold shadow-xl shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
            >
              <span>نهایی‌سازی سفارش و شروع فرآیند مهندسی</span>
              <ArrowLeft className="w-5 h-5 text-black" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
