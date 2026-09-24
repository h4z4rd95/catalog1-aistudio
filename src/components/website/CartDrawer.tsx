import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Tag,
  Sparkles
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    total,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    couponApplied,
    couponCode,
    setActivePage,
    setCheckoutStep,
    formatPrice,
    theme,
    language,
    direction,
    t,
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const handleCheckoutClick = () => {
    soundFx.playChime(700, 0.2);
    setIsCartDrawerOpen(false);
    setCheckoutStep(1);
    setActivePage('CART');
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" dir={direction}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundFx.playClick(400);
          setIsCartDrawerOpen(false);
        }}
      />

      {/* Slide-over panel */}
      <div className={`absolute inset-y-0 ${isRtl ? 'left-0 pr-10' : 'right-0 pl-10'} max-w-full flex`}>
        <div
          className={`w-screen max-w-md shadow-2xl flex flex-col transition-colors border ${
            isRtl ? 'border-r' : 'border-l'
          } ${
            isLight
              ? 'bg-white border-slate-200 text-zinc-900'
              : 'bg-[#090b10] border-white/15 text-zinc-100'
          }`}
        >
          {/* Header */}
          <div className={`p-6 border-b flex items-center justify-between ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className={`font-['Syne'] font-bold text-base ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {t.cart}
                </h3>
                <span className={`font-mono text-[11px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {cartCount} {isFa ? 'مورد در سبد خرید' : cartCount === 1 ? 'item in session' : 'items in session'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick(500);
                setIsCartDrawerOpen(false);
              }}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-zinc-600 hover:text-zinc-900'
                  : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-zinc-500 mx-auto" />
                <h4 className={`font-bold text-base ${isLight ? 'text-zinc-800' : 'text-white'}`}>
                  {isFa ? 'سبد خرید شما خالی است' : 'Your cart is empty'}
                </h4>
                <p className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  {isFa ? 'کاتالوگ محصولات را برای افزودن آیتم‌ها بررسی کنید.' : 'Explore our store catalog to add shaders, licenses, or hardware.'}
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setActivePage('STORE');
                  }}
                  className="mt-2 px-4 py-2 rounded-lg bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider"
                >
                  {t.exploreShowroom}
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemPrice = item.product.price + (item.selectedVariant?.priceDelta || 0);
                const title = isFa && item.product.nameFa ? item.product.nameFa : item.product.name;
                return (
                  <div
                    key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                    className={`p-4 rounded-xl border flex gap-3 transition-all duration-300 ${
                      isLight
                        ? 'bg-slate-50 border-slate-200 hover:border-cyan-400 shadow-sm'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    {/* Item Thumbnail */}
                    <img
                      src={item.product.image}
                      alt={title}
                      className="w-16 h-16 rounded-lg object-cover bg-black shrink-0 border border-white/10"
                    />

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h4 className={`font-bold text-xs ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                            {title}
                          </h4>
                          <button
                            onClick={() => {
                              removeFromCart(item.product.id, item.selectedVariant?.id);
                            }}
                            className="text-zinc-400 hover:text-rose-500 hover:bg-rose-500/10 p-1.5 rounded-md transition-colors"
                            title={isFa ? 'حذف محصول از سبد' : 'Remove item'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.selectedVariant && (
                          <span className={`text-[10px] font-mono block mt-0.5 ${isLight ? 'text-cyan-700' : 'text-cyan-400'}`}>
                            {item.selectedVariant.name}
                          </span>
                        )}

                        <span className="font-mono text-xs font-bold text-emerald-500 block mt-1">
                          {formatPrice(itemPrice)}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2">
                        <div className={`flex items-center rounded-lg border p-0.5 font-mono text-xs ${
                          isLight ? 'bg-white border-slate-200' : 'bg-black/40 border-white/10'
                        }`}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-cyan-400 transition-colors"
                            title={isFa ? 'کاهش تعداد' : 'Decrease'}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                            className="p-1 hover:text-cyan-400 transition-colors"
                            title={isFa ? 'افزایش تعداد' : 'Increase'}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className={`font-mono text-xs font-semibold ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                          {formatPrice(itemPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Iranian Trust Badges & Guarantee in Cart */}
            {cart.length > 0 && (
              <div className={`p-3.5 rounded-xl border space-y-2 text-[11px] ${
                isLight ? 'bg-slate-100/70 border-slate-200 text-zinc-600' : 'bg-white/5 border-white/10 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{isFa ? 'تضمین اصالت کالا و گارانتی بازگشت وجه ۷ روزه' : 'Authenticity & 7-Day Money Back Guarantee'}</span>
                </div>
                <p className="text-[10px] leading-relaxed opacity-80">
                  {isFa
                    ? 'پشتیبانی ۲۴ ساعته، ارسال مستقیم با بیمه خسارت و امکان بازگردانی سریع کالا.'
                    : '24/7 dedicated client support, insured worldwide freight and instantaneous cryptographic licensing.'}
                </p>
              </div>
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className={`p-6 border-t space-y-4 ${
              isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#06070a] border-white/10'
            }`}>
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className={`w-3.5 h-3.5 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-zinc-400`} />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder={isFa ? 'کد تخفیف: VIBE2026' : 'Coupon: VIBE2026'}
                    className={`w-full py-2 rounded-lg font-mono text-xs focus:outline-none focus:border-cyan-400 border ${
                      isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'
                    } ${
                      isLight
                        ? 'bg-white border-slate-300 text-zinc-900 placeholder-zinc-400'
                        : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500'
                    }`}
                  />
                </div>
                <button
                  type="submit"
                  className={`px-3.5 py-2 rounded-lg font-mono text-xs font-bold transition-colors border ${
                    isLight
                      ? 'bg-slate-200 hover:bg-slate-300 text-zinc-800 border-slate-300'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                  }`}
                >
                  {isFa ? 'اعمال' : 'Apply'}
                </button>
              </form>

              {couponApplied && (
                <div className="flex items-center justify-between text-xs font-mono text-amber-500 bg-amber-500/10 border border-amber-500/30 px-3 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> {isFa ? `تخفیف ۲۰٪ اعمال شد (${couponCode})` : `20% Promo Applied (${couponCode})`}
                  </span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className={`font-mono text-xs space-y-1.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                <div className="flex justify-between">
                  <span>{isFa ? 'جمع اقلام:' : 'Subtotal:'}</span>
                  <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white'}>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>{isFa ? 'تخفیف:' : 'Discount:'}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>{isFa ? 'هزینه ارسال:' : 'Estimated Shipping:'}</span>
                  <span className={isLight ? 'text-zinc-900' : 'text-white'}>{shipping === 0 ? (isFa ? 'رایگان' : 'FREE') : formatPrice(shipping)}</span>
                </div>
                <div className={`flex justify-between text-sm font-bold pt-2 border-t ${
                  isLight ? 'border-slate-200 text-zinc-900' : 'border-white/10 text-white'
                }`}>
                  <span>{isFa ? 'مبلغ نهایی:' : 'Total Due:'}</span>
                  <span className="text-cyan-500 font-mono text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>{isFa ? 'ادامه به تسویه‌حساب مرحله‌ای' : 'Proceed to Multi-Level Checkout'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isFa ? 'رمزنگاری ۲۵۶ بیتی • تحویل آنی' : '256-Bit SSL Encrypted • Instant Digital Delivery'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
