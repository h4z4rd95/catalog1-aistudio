import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';

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
  } = useStore();

  const [inputCoupon, setInputCoupon] = useState('');

  if (!isCartDrawerOpen) return null;

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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => {
          soundFx.playClick(400);
          setIsCartDrawerOpen(false);
        }}
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#090b10] border-l border-white/15 text-zinc-100 shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-['Syne'] font-bold text-base text-white">Your Cart</h3>
                <span className="font-mono text-[11px] text-zinc-400">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'} in session
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundFx.playClick(500);
                setIsCartDrawerOpen(false);
              }}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-white/5">
            {cart.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-['Syne'] text-lg font-bold text-white mb-1">Your cart is empty</h4>
                <p className="font-mono text-xs text-zinc-500 max-w-xs mb-6">
                  Explore our collection of digital design systems, shaders, and luxury physical hardware.
                </p>
                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setIsCartDrawerOpen(false);
                    setActivePage('STORE');
                  }}
                  className="px-5 py-2.5 rounded-lg bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors shadow-lg"
                >
                  Browse Store Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const itemUnitPrice = item.product.price + item.selectedVariant.priceDelta;
                return (
                  <div key={`${item.product.id}-${item.selectedVariant.id}`} className="pt-4 first:pt-0 flex gap-4 group">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-lg object-cover border border-white/15 shrink-0 bg-zinc-900"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-['Syne'] font-bold text-sm text-white truncate group-hover:text-cyan-300 transition-colors">
                            {item.product.name}
                          </h4>
                          <span className="font-mono text-[10px] text-zinc-400 block truncate">
                            {item.selectedVariant.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                          ${itemUnitPrice * item.quantity}
                        </span>
                      </div>

                      {/* Quantity & Delete Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-white/20 rounded-md bg-zinc-900/60 p-0.5">
                          <button
                            onClick={() => updateQuantity(item.product.id, -1, item.selectedVariant.id)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-mono text-xs px-2.5 font-bold text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, 1, item.selectedVariant.id)}
                            className="w-6 h-6 rounded flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedVariant.id)}
                          className="text-zinc-500 hover:text-rose-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Calculations */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#06070a] space-y-4">
              {/* Voucher Code Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={inputCoupon}
                    onChange={(e) => setInputCoupon(e.target.value)}
                    placeholder="Coupon: VIBE2026"
                    className="w-full pl-9 pr-3 py-2 rounded-lg bg-zinc-900 border border-white/15 font-mono text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-mono text-xs font-bold text-white transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponApplied && (
                <div className="flex items-center justify-between text-xs font-mono text-amber-300 bg-amber-950/30 border border-amber-500/30 px-3 py-1.5 rounded-lg">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> 20% Promo Applied ({couponCode})
                  </span>
                  <span>-${discount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="font-mono text-xs space-y-1.5 text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="text-white">${subtotal}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-amber-400">
                    <span>Discount:</span>
                    <span>-${discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping:</span>
                  <span className="text-white">{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
                  <span>Total Due:</span>
                  <span className="text-cyan-400">${total}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleCheckoutClick}
                className="w-full py-3.5 rounded-lg bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>Proceed to Multi-Level Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-zinc-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted &bull; Instant Digital Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
