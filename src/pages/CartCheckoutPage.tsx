import React, { useState } from 'react';
import { useStore, CartItem } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  CreditCard,
  ShieldCheck,
  Tag,
  Sparkles,
  Lock,
  Download,
  Copy,
  Check
} from 'lucide-react';

export const CartCheckoutPage: React.FC = () => {
  const {
    cart,
    cartCount,
    subtotal,
    discount,
    shipping,
    tax,
    total,
    couponApplied,
    couponCode,
    applyCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    checkoutStep,
    setCheckoutStep,
    setActivePage,
    lastOrder,
    completeOrder,
    formatPrice,
    theme,
    language,
    direction,
    t
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Form states
  const [formData, setFormData] = useState({
    name: 'Alexandre Sterling',
    email: 'alexandre@vibe-matrix.io',
    address: '740 Broadway, Penthouse 12, New York, NY 10003',
    city: 'New York',
    zip: '10003',
    country: 'United States',
    paymentMethod: 'CREDIT_CARD',
    cardNumber: '•••• •••• •••• 4242',
    cardExp: '12/28',
    cardCvc: '888',
  });

  const steps = [
    { num: 1, label: isFa ? 'بررسی سبد خرید' : 'Cart Audit' },
    { num: 2, label: isFa ? 'اطلاعات تحویل' : 'Coordinates' },
    { num: 3, label: isFa ? 'پرداخت و تایید' : 'Payment & Auth' },
    { num: 4, label: isFa ? 'رسید دیجیتال' : 'Receipt' },
  ];

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleNextStep = () => {
    soundFx.playChime(700, 0.2);
    setCheckoutStep(checkoutStep + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    soundFx.playClick(500);
    setCheckoutStep(Math.max(1, checkoutStep - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    completeOrder({
      name: formData.name,
      email: formData.email,
      address: `${formData.address}, ${formData.city} ${formData.zip}`,
      paymentMethod: formData.paymentMethod,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyLicense = (key: string) => {
    soundFx.playClick(900);
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-28 transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* Header Banner */}
      <div className={`w-full border-b py-12 px-4 sm:px-6 transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 to-slate-50 border-slate-200'
          : 'bg-gradient-to-b from-[#0a0d14] to-[#050609] border-white/10'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            {isFa ? 'درگاه تراکنش امن // پیشروی چندمرحله‌ای' : 'TRANSACTION GATEWAY // MULTI-LEVEL PROGRESSION'}
          </span>
          <h1 className={`font-['Syne'] font-black text-3xl sm:text-4xl tracking-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? 'تسویه‌حساب و صدور لایسنس دیجیتال' : 'Checkout & License Provisioning'}
          </h1>
        </div>

        {/* PROGRESSION BAR */}
        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="relative flex items-center justify-between">
            {/* Connecting Background Line */}
            <div className={`absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 z-0 ${
              isLight ? 'bg-slate-300' : 'bg-white/10'
            }`} />
            <div
              className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400 z-0 transition-all duration-500"
              style={{ width: `${((checkoutStep - 1) / (steps.length - 1)) * 100}%` }}
            />

            {steps.map((s) => {
              const isDone = checkoutStep > s.num;
              const isCurrent = checkoutStep === s.num;
              return (
                <div key={s.num} className="relative z-10 flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all shadow-xl ${
                      isDone
                        ? 'bg-emerald-400 text-black border-2 border-emerald-400'
                        : isCurrent
                        ? 'bg-cyan-400 text-black ring-4 ring-cyan-500/20'
                        : isLight
                        ? 'bg-white text-zinc-400 border border-slate-300'
                        : 'bg-zinc-900 text-zinc-500 border border-white/20'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`font-mono text-[11px] mt-2 font-semibold uppercase tracking-wider ${
                      isCurrent
                        ? 'text-cyan-500 font-bold'
                        : isDone
                        ? 'text-emerald-500 font-bold'
                        : isLight
                        ? 'text-zinc-400'
                        : 'text-zinc-500'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Checkout Area */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mt-8">
        {/* STEP 1: CART AUDIT & QUANTITY */}
        {checkoutStep === 1 && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border backdrop-blur-md ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/60 border-white/15'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <h3 className={`font-['Syne'] font-bold text-lg flex items-center gap-2 ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? `بررسی اقلام سفارش (${cartCount})` : `Review Order Items (${cartCount})`}</span>
                </h3>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="font-mono text-xs text-rose-500 hover:text-rose-400 transition-colors"
                  >
                    {isFa ? 'حذف همه' : 'Clear All'}
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center space-y-3">
                  <ShoppingBag className="w-12 h-12 text-zinc-400 mx-auto" />
                  <h4 className={`font-bold text-lg ${isLight ? 'text-zinc-800' : 'text-white'}`}>
                    {isFa ? 'سبد خرید خالی است' : 'Your cart is empty'}
                  </h4>
                  <p className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {isFa ? 'از محصولات فروشگاه دیدن فرمایید.' : 'Add items from our catalog to begin checkout.'}
                  </p>
                  <button
                    onClick={() => setActivePage('STORE')}
                    className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider"
                  >
                    {t.enterStore}
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/5 space-y-4 pt-4">
                  {cart.map((item) => {
                    const itemPrice = item.product.price + (item.selectedVariant?.priceDelta || 0);
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                        className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover bg-black"
                          />
                          <div>
                            <span className="font-mono text-[10px] text-cyan-500 uppercase tracking-widest block">
                              {item.product.subCategory}
                            </span>
                            <h4 className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                              {item.product.name}
                            </h4>
                            {item.selectedVariant && (
                              <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                                {isFa ? 'ویرایش:' : 'Variant:'} {item.selectedVariant.name}
                              </span>
                            )}
                            <div className="font-mono text-xs font-bold text-emerald-500 mt-1">
                              {formatPrice(itemPrice)} {isFa ? 'هر واحد' : 'each'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          {/* Quantity selector */}
                          <div className={`flex items-center rounded-xl border p-1 font-mono text-xs ${
                            isLight ? 'bg-slate-100 border-slate-300' : 'bg-black/50 border-white/10'
                          }`}>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedVariant?.id)}
                              className="p-1 hover:text-cyan-400"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedVariant?.id)}
                              className="p-1 hover:text-cyan-400"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="font-mono text-base font-bold text-emerald-500 min-w-20 text-right">
                            {formatPrice(itemPrice * item.quantity)}
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant?.id)}
                            className="text-zinc-400 hover:text-rose-500 p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Voucher Coupon & Subtotal Summary */}
            {cart.length > 0 && (
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/60 border-white/15'
              }`}>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Tag className={`w-3.5 h-3.5 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-zinc-400`} />
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder={isFa ? 'کد تخفیف: VIBE2026' : 'Coupon code: VIBE2026'}
                      className={`w-full py-2.5 rounded-xl font-mono text-xs border focus:outline-none focus:border-cyan-400 ${
                        isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'
                      } ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                          : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                      }`}
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-colors border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    {isFa ? 'اعمال کد' : 'Apply'}
                  </button>
                </div>

                {couponApplied && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-500 font-mono text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{isFa ? `۲۰٪ تخفیف اعمال شد (${couponCode})` : `20% Promo Applied (${couponCode})`}</span>
                    </span>
                    <span className="font-bold">-{formatPrice(discount)}</span>
                  </div>
                )}

                {/* Totals */}
                <div className="font-mono text-xs space-y-2 pt-2">
                  <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <span>{isFa ? 'جمع اقلام:' : 'Subtotal:'}</span>
                    <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white'}>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-amber-500 font-semibold">
                      <span>{isFa ? 'تخفیف:' : 'Discount:'}</span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}
                  <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <span>{isFa ? 'هزینه ارسال بیمه‌شده:' : 'Shipping Delivery:'}</span>
                    <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white'}>
                      {shipping === 0 ? (isFa ? 'رایگان' : 'FREE') : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    <span>{isFa ? 'مالیات قانونی (۸٪):' : 'Estimated Tax (8%):'}</span>
                    <span className={isLight ? 'text-zinc-900 font-bold' : 'text-white'}>{formatPrice(tax)}</span>
                  </div>
                  <div className={`flex justify-between text-base font-bold pt-2 border-t ${
                    isLight ? 'border-slate-200 text-zinc-900' : 'border-white/10 text-white'
                  }`}>
                    <span>{isFa ? 'مبلغ نهایی:' : 'Total Amount:'}</span>
                    <span className="text-cyan-500 font-mono text-xl">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Stepper CTA */}
            {cart.length > 0 && (
              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>{isFa ? 'ادامه به اطلاعات تحویل' : 'Continue to Coordinates'}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SHIPPING & COORDINATES */}
        {checkoutStep === 2 && (
          <div className="space-y-6">
            <div className={`p-6 rounded-2xl border backdrop-blur-md space-y-4 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/60 border-white/15'
            }`}>
              <h3 className={`font-['Syne'] font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? 'مشخصات خریدار و آدرس تحویل' : 'Customer & Delivery Coordinates'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'ایمیل خریدار (جهت دریافت کلید لایسنس)' : 'Email Coordinates (for License Delivery)'}
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'آدرس پستی جهت ارسال قطعات سخت‌افزاری' : 'Physical Delivery Address'}
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'شهر' : 'City'}
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'کشور' : 'Country'}
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handlePrevStep}
                className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-zinc-700 border-slate-300'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                }`}
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isFa ? 'بازگشت به سبد خرید' : 'Back to Cart Audit'}</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>{isFa ? 'ادامه به ماتریس پرداخت' : 'Proceed to Payment Matrix'}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT & TACTILE VERIFICATION */}
        {checkoutStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className={`p-6 rounded-2xl border backdrop-blur-md space-y-6 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/60 border-white/15'
            }`}>
              <div className={`flex items-center justify-between pb-4 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <h3 className={`font-['Syne'] font-bold text-lg flex items-center gap-2 ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>{isFa ? 'درگاه رمزنگاری و پرداخت امن' : 'Tactile Payment & Encryption Matrix'}</span>
                </h3>
                <span className="font-mono text-xs text-emerald-500 flex items-center gap-1 font-bold">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit SSL
                </span>
              </div>

              {/* 3D Holographic Payment Card Preview */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-tr from-cyan-900 via-indigo-950 to-zinc-900 border border-cyan-400/40 shadow-2xl relative overflow-hidden text-white font-mono">
                <div className="flex justify-between items-start mb-8">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                  <span className="text-xs tracking-widest uppercase opacity-70">AURA CIPHER CARD</span>
                </div>
                <div className="text-lg font-bold tracking-widest mb-6" dir="ltr">
                  {formData.cardNumber}
                </div>
                <div className="flex justify-between text-xs uppercase opacity-80">
                  <div>
                    <span className="block text-[8px]">{isFa ? 'دارنده کارت' : 'CARDHOLDER'}</span>
                    <span>{formData.name}</span>
                  </div>
                  <div>
                    <span className="block text-[8px]">{isFa ? 'انقضا' : 'EXPIRES'}</span>
                    <span dir="ltr">{formData.cardExp}</span>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="sm:col-span-2">
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'شماره کارت' : 'Card Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'تاریخ انقضا' : 'Expiration Date'}
                  </label>
                  <input
                    type="text"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'کد اعتبارسنجی CVC' : 'Security CVC'}
                  </label>
                  <input
                    type="password"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className={`px-6 py-3 rounded-xl font-mono text-xs uppercase tracking-wider flex items-center gap-2 border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-zinc-700 border-slate-300'
                    : 'bg-white/5 hover:bg-white/10 text-zinc-300 border-white/10'
                }`}
              >
                {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{isFa ? 'بازگشت به اطلاعات تحویل' : 'Back to Coordinates'}</span>
              </button>

              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-500/20"
              >
                <span>{isFa ? `تایید و پرداخت • ${formatPrice(total)}` : `Authorize • ${formatPrice(total)}`}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER CONFIRMED & RECEIPT */}
        {checkoutStep === 4 && (
          <div className="space-y-6">
            <div className={`p-8 rounded-3xl border text-center space-y-4 ${
              isLight
                ? 'bg-emerald-50/50 border-emerald-300 text-zinc-900 shadow-sm'
                : 'bg-zinc-900/70 border-emerald-500/40 text-white'
            }`}>
              <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-500 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="font-['Syne'] font-black text-3xl">
                {isFa ? 'پرداخت تایید شد • سفارش شما ثبت گردید' : 'Payment Authorized • Order Confirmed'}
              </h2>
              <p className={`font-mono text-xs max-w-md mx-auto ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {isFa
                  ? 'تراکنش روی دفتر کل استودیو اعتبارسنجی شد. کلیدهای دسترسی لایسنس دیجیتال و مشخصات ثبت در زیر آماده است.'
                  : 'Transaction validated on AURA ledger. Your dispatch coordinates and cryptographic software license keys are ready below.'}
              </p>

              {lastOrder && (
                <div className={`font-mono text-xs inline-block border px-4 py-1.5 rounded-full ${
                  isLight
                    ? 'bg-white border-emerald-300 text-emerald-700'
                    : 'bg-white/5 border-white/10 text-emerald-300'
                }`}>
                  {isFa ? 'کد رهگیری سفارش:' : 'ORDER REFERENCE:'} {lastOrder.orderId} • {lastOrder.date}
                </div>
              )}
            </div>

            {/* Generated License Keys Box */}
            {lastOrder && lastOrder.licenseKeys && lastOrder.licenseKeys.length > 0 && (
              <div className={`p-6 rounded-2xl border space-y-4 ${
                isLight ? 'bg-white border-cyan-400 shadow-sm' : 'bg-black/60 border-cyan-400/40'
              }`}>
                <h4 className={`font-['Syne'] font-bold text-base flex items-center gap-2 ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>{isFa ? 'کلیدهای تجاری اختصاصی شما (دسترسی آنی)' : 'Your Commercial License Keys (Instant Access)'}</span>
                </h4>

                <div className="space-y-2">
                  {lastOrder.licenseKeys.map((key) => (
                    <div
                      key={key}
                      className={`p-3 rounded-xl border flex items-center justify-between font-mono text-xs ${
                        isLight ? 'bg-slate-50 border-slate-200 text-cyan-700' : 'bg-zinc-900 border-white/15 text-cyan-300'
                      }`}
                    >
                      <span className="font-bold tracking-widest">{key}</span>
                      <button
                        onClick={() => copyLicense(key)}
                        className={`px-3 py-1 rounded-lg flex items-center gap-1.5 text-[11px] border ${
                          isLight
                            ? 'bg-white hover:bg-slate-100 text-zinc-800 border-slate-300'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                        }`}
                      >
                        {copiedKey === key ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{isFa ? 'کپی شد' : 'Copied'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{isFa ? 'کپی کلید' : 'Copy Key'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Receipt Breakdown */}
            {lastOrder && (
              <div className={`p-6 rounded-2xl border font-mono text-xs space-y-2 ${
                isLight ? 'bg-white border-slate-200' : 'bg-zinc-900/40 border-white/10'
              }`}>
                <div className={`flex justify-between pb-2 border-b ${
                  isLight ? 'border-slate-200 text-zinc-600' : 'border-white/10 text-zinc-400'
                }`}>
                  <span>{isFa ? 'نام خریدار:' : 'Customer:'}</span>
                  <span className={isLight ? 'text-zinc-900 font-semibold' : 'text-white'}>{lastOrder.customerName} ({lastOrder.customerEmail})</span>
                </div>
                <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <span>{isFa ? 'جمع اقلام:' : 'Subtotal:'}</span>
                  <span className={isLight ? 'text-zinc-900 font-semibold' : 'text-white'}>{formatPrice(lastOrder.subtotal)}</span>
                </div>
                {lastOrder.discount > 0 && (
                  <div className="flex justify-between text-amber-500 font-semibold">
                    <span>{isFa ? 'تخفیف کوپن:' : 'Voucher Discount:'}</span>
                    <span>-{formatPrice(lastOrder.discount)}</span>
                  </div>
                )}
                <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <span>{isFa ? 'هزینه ارسال:' : 'Freight Delivery:'}</span>
                  <span className={isLight ? 'text-zinc-900 font-semibold' : 'text-white'}>
                    {lastOrder.shipping === 0 ? (isFa ? 'رایگان' : 'FREE') : formatPrice(lastOrder.shipping)}
                  </span>
                </div>
                <div className={`flex justify-between ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  <span>{isFa ? 'مالیات (۸٪):' : 'Taxes (8%):'}</span>
                  <span className={isLight ? 'text-zinc-900 font-semibold' : 'text-white'}>{formatPrice(lastOrder.tax)}</span>
                </div>
                <div className={`flex justify-between text-base font-bold pt-2 border-t ${
                  isLight ? 'border-slate-200 text-zinc-900' : 'border-white/10 text-white'
                }`}>
                  <span>{isFa ? 'مجموع تسویه شده:' : 'Total Settled:'}</span>
                  <span className="text-emerald-500 font-mono text-lg">{formatPrice(lastOrder.total)}</span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <button
                onClick={() => {
                  soundFx.playChime(700, 0.2);
                  setActivePage('STORE');
                }}
                className="px-6 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider"
              >
                {t.enterStore}
              </button>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setActivePage('LANDING');
                }}
                className={`px-6 py-3.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider border ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
              >
                {t.home}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
