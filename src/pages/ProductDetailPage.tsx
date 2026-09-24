import React, { useState } from 'react';
import { useStore, ProductVariant } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Star,
  ShieldCheck,
  Zap,
  Box,
  Layers,
  Sparkles,
  CheckCircle2,
  Clock,
  RotateCw,
  Heart,
  Share2
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { products, activeProductId, addToCart, setActivePage, formatPrice, theme, language, direction, t } = useStore();
  const product = products.find((p) => p.id === activeProductId) || products[0];

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const unitPrice = product.price + selectedVariant.priceDelta;
  const totalPrice = unitPrice * quantity;

  const handleVariantChange = (variant: ProductVariant) => {
    soundFx.playClick(750);
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariant);
  };

  const handleSpin3D = () => {
    soundFx.playChime(600, 0.15);
    setIsRotating(true);
    setRotationAngle((prev) => prev + 90);
    setTimeout(() => setIsRotating(false), 600);
  };

  return (
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-32 transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* Top Breadcrumb & Navigation */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b flex items-center justify-between ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <button
          onClick={() => {
            soundFx.playClick(500);
            setActivePage('STORE');
          }}
          className={`flex items-center gap-2 font-mono text-xs transition-colors ${
            isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
          }`}
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isFa ? 'بازگشت به کاتالوگ فروشگاه' : 'Back to Store Catalog'}</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(800);
              setIsFavorited(!isFavorited);
            }}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
              isFavorited
                ? 'bg-rose-500/20 border-rose-500 text-rose-500'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-zinc-600 hover:text-zinc-900'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Media & 3D Rotating Viewport */}
          <div className="lg:col-span-7 space-y-4">
            <div className={`relative aspect-[16/11] rounded-3xl overflow-hidden border shadow-2xl flex items-center justify-center group ${
              isLight
                ? 'bg-slate-100 border-slate-300'
                : 'bg-gradient-to-b from-[#0a0d14] to-zinc-950 border-white/15'
            }`}>
              <img
                src={product.gallery[selectedImageIdx] || product.image}
                alt={product.name}
                style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                className="w-full h-full object-cover select-none"
              />

              {/* 3D Spin Action Button */}
              <button
                onClick={handleSpin3D}
                className={`absolute bottom-4 ${isRtl ? 'left-4' : 'right-4'} px-3.5 py-2 rounded-xl border font-mono text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all shadow-xl ${
                  isLight
                    ? 'bg-white/90 hover:bg-white border-slate-300 text-zinc-800'
                    : 'bg-black/80 hover:bg-black border-white/20 text-cyan-300'
                }`}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                <span>{isFa ? 'چرخش ۹۰ درجه مدل' : 'Rotate 90° Preview'}</span>
              </button>

              {/* Product Badge */}
              <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'} flex gap-2`}>
                {product.badge && (
                  <span className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-amber-400 text-black shadow-lg uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="px-3 py-1 rounded-lg font-mono text-xs font-bold bg-black/80 border border-white/20 text-zinc-200 backdrop-blur-md uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick(600);
                    setSelectedImageIdx(idx);
                  }}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    selectedImageIdx === idx
                      ? 'border-cyan-500 shadow-md shadow-cyan-500/20 scale-105'
                      : isLight
                      ? 'border-slate-300 opacity-60 hover:opacity-100'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Technical Specs Breakdown */}
            <div className={`pt-8 border-t space-y-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <h3 className={`font-['Syne'] font-bold text-lg ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? 'مشخصات معماری فنی و متریال' : 'Technical Architecture & Specifications'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([label, val]) => (
                  <div
                    key={label}
                    className={`p-3.5 rounded-xl border font-mono text-xs ${
                      isLight
                        ? 'bg-white border-slate-200'
                        : 'bg-zinc-900/60 border-white/10'
                    }`}
                  >
                    <span className={`uppercase block text-[10px] ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>{label}</span>
                    <strong className={`font-semibold mt-0.5 block ${isLight ? 'text-zinc-800' : 'text-zinc-200'}`}>{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500 mb-1">
                <span>{isFa ? `مشخصات استودیو // ${product.subCategory}` : `AURA STUDIO SPEC // ${product.subCategory.toUpperCase()}`}</span>
              </div>

              <h1 className={`font-['Syne'] font-black text-3xl sm:text-4xl tracking-tight leading-tight ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}>
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>
                  ({product.reviewsCount} {isFa ? 'نظر ثبت شده' : 'verified reviews'})
                </span>
                <span className={isLight ? 'text-zinc-300' : 'text-zinc-600'}>&bull;</span>
                <span className="text-emerald-500 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isFa ? `موجود در انبار (${product.stockCount} باقی‌مانده)` : `In Stock (${product.stockCount} left)`}</span>
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-black text-emerald-500">
                  {formatPrice(unitPrice)}
                </span>
                {product.originalPrice && (
                  <span className={`font-mono text-base line-through ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {formatPrice(product.originalPrice + selectedVariant.priceDelta)}
                  </span>
                )}
                <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {isFa ? '(پرداخت یکباره • لایسنس مادام‌العمر)' : '(Single Payment • Perpetual License)'}
                </span>
              </div>
            </div>

            <p className={`text-sm leading-relaxed font-light ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
              {product.description}
            </p>

            {/* Variant Selector */}
            <div className={`space-y-3 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <label className={`font-mono text-xs uppercase tracking-wider font-bold block ${
                isLight ? 'text-zinc-700' : 'text-zinc-400'
              }`}>
                {isFa ? 'انتخاب رده ویرایش محصول:' : 'Select Configuration Tier:'}
              </label>
              <div className="space-y-2">
                {product.variants.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleVariantChange(v)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between font-mono text-xs transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-cyan-500/10 border-cyan-400 text-cyan-600 font-bold shadow-sm'
                        : isLight
                        ? 'bg-white border-slate-200 text-zinc-700 hover:border-slate-300'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/10"
                        style={{ backgroundColor: v.previewColor || '#38bdf8' }}
                      />
                      <span className="font-bold">{v.name}</span>
                    </div>
                    <span className="text-emerald-500 font-bold">
                      {v.priceDelta > 0 ? `+${formatPrice(v.priceDelta)}` : (isFa ? 'شامل پکیج' : 'Included')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <label className={`font-mono text-xs uppercase tracking-wider font-bold ${
                isLight ? 'text-zinc-700' : 'text-zinc-400'
              }`}>
                {isFa ? 'تعداد سفارش:' : 'Quantity:'}
              </label>
              <div className={`flex items-center border rounded-xl p-1 ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900/60 border-white/20'
              }`}>
                <button
                  onClick={() => {
                    soundFx.playClick(500);
                    setQuantity((prev) => Math.max(1, prev - 1));
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    isLight ? 'text-zinc-600 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  -
                </button>
                <span className={`font-mono text-sm px-4 font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setQuantity((prev) => prev + 1);
                  }}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                    isLight ? 'text-zinc-600 hover:bg-slate-100' : 'text-zinc-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart CTA */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/20 transition-all hover:scale-[1.02]"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{t.addToCart} &bull; {formatPrice(totalPrice)}</span>
              </button>

              <div className={`p-4 rounded-xl border space-y-2 font-mono text-xs ${
                isLight
                  ? 'bg-white border-slate-200 text-zinc-600'
                  : 'bg-white/5 border-white/10 text-zinc-400'
              }`}>
                <div className="flex items-center gap-2 text-emerald-500 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{isFa ? 'گارانتی تجاری تاییدشده آئورا' : 'Verified AURA Commercial Guarantee'}</span>
                </div>
                <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {isFa
                    ? 'شامل دسترسی کامل به سورس‌کد، همگام‌سازی خودکار مخزن گیت‌هاب و پشتیبانی ویژه دیسکورد از سوی تیم مهندسی.'
                    : 'Includes full source code access, automated GitHub repository sync, and priority Discord support from our core engineering team.'}
                </p>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className={`space-y-2 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
              <h4 className={`font-mono text-xs font-bold uppercase tracking-wider ${
                isLight ? 'text-zinc-700' : 'text-zinc-300'
              }`}>
                {isFa ? 'اقلام تحویلی کلیدی:' : 'Key Deliverables:'}
              </h4>
              <ul className={`space-y-2 text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Buy Bar for Mobile & Quick Purchasing */}
      <div className={`fixed bottom-0 inset-x-0 z-30 p-4 border-t backdrop-blur-xl flex items-center justify-between gap-4 max-w-7xl mx-auto shadow-2xl ${
        isLight
          ? 'bg-white/95 border-slate-200'
          : 'bg-[#07090e]/95 border-white/15'
      }`}>
        <div className="hidden sm:flex items-center gap-3">
          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-white/15" />
          <div>
            <h4 className={`font-['Syne'] font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>{product.name}</h4>
            <span className={`font-mono text-[10px] ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{selectedVariant.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <span className="font-mono text-lg font-black text-emerald-500">
            {formatPrice(totalPrice)}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
