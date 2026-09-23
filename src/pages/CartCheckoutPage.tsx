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
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

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
    { num: 1, label: 'Cart Audit' },
    { num: 2, label: 'Coordinates' },
    { num: 3, label: 'Payment & Auth' },
    { num: 4, label: 'Receipt' },
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
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-28">
      {/* Header Banner */}
      <div className="w-full bg-gradient-to-b from-[#0a0d14] to-[#050609] border-b border-white/10 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            TRANSACTION GATEWAY // MULTI-LEVEL PROGRESSION
          </span>
          <h1 className="font-['Syne'] font-black text-3xl sm:text-4xl text-white tracking-tight">
            Checkout &amp; License Provisioning
          </h1>
        </div>

        {/* PROGRESSION BAR */}
        <div className="max-w-2xl mx-auto mt-8 px-4">
          <div className="relative flex items-center justify-between">
            {/* Connecting Background Line */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-white/10 z-0" />
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
                        : 'bg-zinc-900 text-zinc-500 border border-white/20'
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                  </div>
                  <span
                    className={`font-mono text-[11px] mt-2 font-semibold uppercase tracking-wider ${
                      isCurrent ? 'text-cyan-300' : isDone ? 'text-emerald-400' : 'text-zinc-500'
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
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/15 backdrop-blur-md">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-['Syne'] font-bold text-lg text-white flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-cyan-400" />
                  <span>Review Order Items ({cartCount})</span>
                </h3>
                {cart.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="font-mono text-xs text-rose-400 hover:text-rose-300 transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {cart.length === 0 ? (
                <div className="py-16 text-center">
                  <p className="font-['Syne'] text-lg font-bold text-white mb-2">Your cart is empty</p>
                  <p className="font-mono text-xs text-zinc-400 mb-6">
                    Add digital licenses or physical hardware to proceed.
                  </p>
                  <button
                    onClick={() => setActivePage('STORE')}
                    className="px-6 py-2.5 rounded-lg bg-cyan-400 text-black font-mono text-xs font-bold uppercase"
                  >
                    Return to Store
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {cart.map((item) => {
                    const itemUnitPrice = item.product.price + item.selectedVariant.priceDelta;
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedVariant.id}`}
                        className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 rounded-xl object-cover border border-white/15 shrink-0"
                          />
                          <div>
                            <h4 className="font-['Syne'] font-bold text-base text-white">
                              {item.product.name}
                            </h4>
                            <span className="font-mono text-xs text-zinc-400 block">
                              {item.selectedVariant.name} &bull; {item.product.category}
                            </span>
                            <span className="font-mono text-xs text-emerald-400 font-bold block mt-1 sm:hidden">
                              ${itemUnitPrice * item.quantity}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6">
                          {/* Quantity selector */}
                          <div className="flex items-center border border-white/20 rounded-lg bg-zinc-900/60 p-0.5">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1, item.selectedVariant.id)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs px-3 font-bold text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1, item.selectedVariant.id)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <span className="font-mono text-sm text-emerald-400 font-bold hidden sm:inline min-w-16 text-right">
                            ${itemUnitPrice * item.quantity}
                          </span>

                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
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

            {/* Voucher Code & Cost Summary */}
            {cart.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-3">
                  <h4 className="font-['Syne'] font-bold text-sm text-white flex items-center gap-2">
                    <Tag className="w-4 h-4 text-amber-400" />
                    <span>Apply Promotional Voucher</span>
                  </h4>
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Try: VIBE2026 or AWWWARDS"
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold"
                    >
                      Apply
                    </button>
                  </form>
                  {couponApplied && (
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>20% Voucher Applied Successfully ({couponCode})</span>
                    </div>
                  )}
                </div>

                <div className="md:col-span-6 p-6 rounded-2xl bg-zinc-900/40 border border-white/10 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-zinc-400">
                    <span>Cart Subtotal:</span>
                    <span className="text-white">${subtotal}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-amber-400">
                      <span>Voucher Savings:</span>
                      <span>-${discount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-zinc-400">
                    <span>Shipping Delivery:</span>
                    <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated Tax (8%):</span>
                    <span className="text-white">${tax}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                    <span>Total Amount:</span>
                    <span className="text-cyan-400">${total}</span>
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
                  <span>Continue to Coordinates</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: SHIPPING & COORDINATES */}
        {checkoutStep === 2 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/15 backdrop-blur-md space-y-4">
              <h3 className="font-['Syne'] font-bold text-lg text-white">
                Customer &amp; Delivery Coordinates
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Email Coordinates (for License Delivery)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Physical Delivery Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Country
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                onClick={handlePrevStep}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Cart Audit</span>
              </button>

              <button
                onClick={handleNextStep}
                className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>Proceed to Payment Matrix</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PAYMENT & TACTILE VERIFICATION */}
        {checkoutStep === 3 && (
          <form onSubmit={handleFinalSubmit} className="space-y-6">
            <div className="p-6 rounded-2xl bg-zinc-900/60 border border-white/15 backdrop-blur-md space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <h3 className="font-['Syne'] font-bold text-lg text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-cyan-400" />
                  <span>Tactile Payment &amp; Encryption Matrix</span>
                </h3>
                <span className="font-mono text-xs text-emerald-400 flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> 256-Bit SSL Secured
                </span>
              </div>

              {/* 3D Holographic Payment Card Preview */}
              <div className="max-w-md mx-auto p-6 rounded-2xl bg-gradient-to-tr from-cyan-900 via-indigo-950 to-zinc-900 border border-cyan-400/40 shadow-2xl relative overflow-hidden text-white font-mono">
                <div className="flex justify-between items-start mb-8">
                  <Sparkles className="w-6 h-6 text-amber-300" />
                  <span className="text-xs tracking-widest uppercase opacity-70">AURA CIPHER CARD</span>
                </div>
                <div className="text-lg font-bold tracking-widest mb-6">
                  {formData.cardNumber}
                </div>
                <div className="flex justify-between text-xs uppercase opacity-80">
                  <div>
                    <span className="block text-[8px]">CARDHOLDER</span>
                    <span>{formData.name}</span>
                  </div>
                  <div>
                    <span className="block text-[8px]">EXPIRES</span>
                    <span>{formData.cardExp}</span>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="sm:col-span-2">
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 block mb-1 uppercase tracking-wider text-[10px]">
                    Security CVC
                  </label>
                  <input
                    type="password"
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 font-mono text-xs uppercase tracking-wider flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Coordinates</span>
              </button>

              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-emerald-500/20"
              >
                <span>Authorize &bull; ${total}</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 4: ORDER CONFIRMED & RECEIPT */}
        {checkoutStep === 4 && (
          <div className="space-y-6">
            <div className="p-8 rounded-3xl bg-zinc-900/70 border border-emerald-500/40 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto shadow-xl shadow-emerald-500/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h2 className="font-['Syne'] font-black text-3xl text-white">
                Payment Authorized &bull; Order Confirmed
              </h2>
              <p className="font-mono text-xs text-zinc-400 max-w-md mx-auto">
                Transaction validated on AURA ledger. Your dispatch coordinates and cryptographic software license keys are ready below.
              </p>

              {lastOrder && (
                <div className="font-mono text-xs inline-block bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-emerald-300">
                  ORDER REFERENCE: {lastOrder.orderId} &bull; {lastOrder.date}
                </div>
              )}
            </div>

            {/* Generated License Keys Box */}
            {lastOrder && lastOrder.licenseKeys && lastOrder.licenseKeys.length > 0 && (
              <div className="p-6 rounded-2xl bg-black/60 border border-cyan-400/40 space-y-4">
                <h4 className="font-['Syne'] font-bold text-base text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>Your Commercial License Keys (Instant Access)</span>
                </h4>

                <div className="space-y-2">
                  {lastOrder.licenseKeys.map((key) => (
                    <div
                      key={key}
                      className="p-3 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-between font-mono text-xs text-cyan-300"
                    >
                      <span className="font-bold tracking-widest">{key}</span>
                      <button
                        onClick={() => copyLicense(key)}
                        className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center gap-1.5 text-[11px]"
                      >
                        {copiedKey === key ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Key</span>
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
              <div className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 font-mono text-xs space-y-2">
                <div className="flex justify-between text-zinc-400 pb-2 border-b border-white/10">
                  <span>Customer:</span>
                  <span className="text-white">{lastOrder.customerName} ({lastOrder.customerEmail})</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal:</span>
                  <span className="text-white">${lastOrder.subtotal}</span>
                </div>
                {lastOrder.discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Voucher Discount:</span>
                    <span>-${lastOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-400">
                  <span>Freight Delivery:</span>
                  <span className="text-white">{lastOrder.shipping === 0 ? 'FREE' : `$${lastOrder.shipping}`}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Taxes (8%):</span>
                  <span className="text-white">${lastOrder.tax}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Settled:</span>
                  <span className="text-emerald-400">${lastOrder.total}</span>
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
                Back to Store Catalog
              </button>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setActivePage('LANDING');
                }}
                className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider"
              >
                Return to Studio Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
