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
  const [activeTab, setActiveTab] = useState<'SPECS' | 'COMPARISON' | 'DOCS' | 'REVIEWS'>('SPECS');

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

        {/* ========================================================================= */}
        {/* COMPREHENSIVE TECHNICAL TABLES & DEEP SPECIFICATIONS (FULL PERSIAN VIEW) */}
        {/* ========================================================================= */}
        <div className="mt-16 pt-10 border-t border-white/10">
          {/* Tab Headers */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 border-b border-white/10 pb-4">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setActiveTab('SPECS');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'SPECS'
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : isLight
                  ? 'bg-slate-200 text-zinc-700 hover:bg-slate-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>{isFa ? 'جدول مشخصات فنی جامع' : 'Full Technical Specifications'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(650);
                setActiveTab('COMPARISON');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'COMPARISON'
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : isLight
                  ? 'bg-slate-200 text-zinc-700 hover:bg-slate-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{isFa ? 'جدول مقایسه سطوح دسترسی و لایسنس' : 'Tier Comparison Matrix'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(700);
                setActiveTab('DOCS');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'DOCS'
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : isLight
                  ? 'bg-slate-200 text-zinc-700 hover:bg-slate-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>{isFa ? 'مستندات و راهنمای پیاده‌سازی' : 'Integration & Architecture'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                setActiveTab('REVIEWS');
              }}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                activeTab === 'REVIEWS'
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : isLight
                  ? 'bg-slate-200 text-zinc-700 hover:bg-slate-300'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>{isFa ? 'دیدگاه‌ها و نظرات خریداران (۱۴۲)' : 'Verified Customer Reviews (142)'}</span>
            </button>
          </div>

          {/* TAB 1: FULL TECHNICAL SPECIFICATIONS TABLE */}
          {activeTab === 'SPECS' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className={`font-['Syne'] font-bold text-xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'جدول کامل مشخصات مهندسی و پارامترها' : 'Complete Engineering Specifications Table'}
                  </h3>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {isFa
                      ? 'تمامی جزئیات ساختار نرم‌افزاری، استانداردهای کامپایلر، معماری گرافیکی و متریال صنعتی این محصول در جدول زیر آورده شده است.'
                      : 'Comprehensive breakdown of software architecture, compiler specifications, and engineering metrics.'}
                  </p>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg w-fit">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isFa ? 'تست‌شده بر اساس استانداردهای وب ۲۰۲۶' : 'Verified Web Standards 2026'}</span>
                </div>
              </div>

              {/* Styled Table */}
              <div className={`overflow-x-auto rounded-2xl border shadow-sm ${
                isLight ? 'bg-white border-slate-200' : 'bg-zinc-950/70 border-white/15'
              }`}>
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className={`border-b font-mono font-bold uppercase tracking-wider ${
                      isLight ? 'bg-slate-100 text-zinc-800 border-slate-200' : 'bg-white/5 text-zinc-300 border-white/10'
                    }`}>
                      <th className="py-4 px-6">{isFa ? 'پارامتر فنی' : 'Parameter'}</th>
                      <th className="py-4 px-6">{isFa ? 'مقدار / استاندارد تعریف‌شده' : 'Specification Value'}</th>
                      <th className="py-4 px-6 hidden sm:table-cell">{isFa ? 'دسته‌بندی ارزیابی' : 'Domain Category'}</th>
                      <th className="py-4 px-6">{isFa ? 'وضعیت تایید' : 'Compliance'}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-200 text-zinc-700' : 'divide-white/10 text-zinc-300'}`}>
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <tr
                        key={key}
                        className={`transition-colors ${
                          idx % 2 === 0
                            ? (isLight ? 'bg-white' : 'bg-transparent')
                            : (isLight ? 'bg-slate-50/60' : 'bg-white/[0.02]')
                        } hover:bg-cyan-500/5`}
                      >
                        <td className="py-4 px-6 font-bold flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                          <span>{key}</span>
                        </td>
                        <td className="py-4 px-6 font-mono text-cyan-500 font-semibold">{val}</td>
                        <td className="py-4 px-6 font-mono text-[11px] opacity-70 hidden sm:table-cell">
                          {idx === 0 ? 'معماری و کامپایلر' : idx === 1 ? 'تایپ‌سیفتی و تایپ‌اسکریپت' : idx === 2 ? 'موتور استایل‌دهی' : idx === 3 ? 'رندرر گرافیکی' : 'قوانین توزیع و حق نشر'}
                        </td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>{isFa ? 'تایید رسمی' : 'Pass'}</span>
                          </span>
                        </td>
                      </tr>
                    ))}
                    {/* Additional enriched rows for deep Persian specs */}
                    <tr className={isLight ? 'bg-white' : 'bg-transparent'}>
                      <td className="py-4 px-6 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{isFa ? 'پشتیبانی از مرورگرها' : 'Browser Support'}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-cyan-500 font-semibold">Chrome 110+, Safari 16+, Edge, Firefox</td>
                      <td className="py-4 px-6 font-mono text-[11px] opacity-70 hidden sm:table-cell">سازگاری کراس‌پلتفرم</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> 100%
                        </span>
                      </td>
                    </tr>
                    <tr className={isLight ? 'bg-slate-50/60' : 'bg-white/[0.02]'}>
                      <td className="py-4 px-6 font-bold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{isFa ? 'فریم‌ریت هدف رندرینگ' : 'Target Frame Budget'}</span>
                      </td>
                      <td className="py-4 px-6 font-mono text-cyan-500 font-semibold">60 to 120 FPS (&lt; 2.4ms frame time)</td>
                      <td className="py-4 px-6 font-mono text-[11px] opacity-70 hidden sm:table-cell">بهینه‌سازی سخت‌افزاری</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3" /> Ultra Low Latency
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: TIER COMPARISON MATRIX */}
          {activeTab === 'COMPARISON' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className={`font-['Syne'] font-bold text-xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'جدول مقایسه سطوح لایسنس و کانفیگ‌ها' : 'Licensing & Tier Comparison Matrix'}
                  </h3>
                  <p className={`text-xs mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {isFa
                      ? 'مقایسه جامع بین نسخه‌های انفرادی، استودیو و سازمانی انترپرایز برای انتخاب بهترین گزینه متناسب با بودجه شما.'
                      : 'Side-by-side comparison of features, seat limits, and commercial rights across editions.'}
                  </p>
                </div>
              </div>

              <div className={`overflow-x-auto rounded-2xl border shadow-sm ${
                isLight ? 'bg-white border-slate-200' : 'bg-zinc-950/70 border-white/15'
              }`}>
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className={`border-b font-mono font-bold uppercase tracking-wider ${
                      isLight ? 'bg-slate-100 text-zinc-800 border-slate-200' : 'bg-white/5 text-zinc-300 border-white/10'
                    }`}>
                      <th className="py-4 px-6">{isFa ? 'ویژگی و امکانات' : 'Capability'}</th>
                      <th className="py-4 px-6 text-center text-cyan-400">{isFa ? 'نسخه مستقل (Indie)' : 'Indie Tier'}</th>
                      <th className="py-4 px-6 text-center text-purple-400">{isFa ? 'نسخه استودیو (Studio)' : 'Studio Tier'}</th>
                      <th className="py-4 px-6 text-center text-amber-400">{isFa ? 'سازمانی (Enterprise)' : 'Enterprise'}</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-200 text-zinc-700' : 'divide-white/10 text-zinc-300'}`}>
                    <tr>
                      <td className="py-4 px-6 font-bold">{isFa ? 'تعداد برنامه‌نویس مجاز' : 'Authorized Developers'}</td>
                      <td className="py-4 px-6 text-center font-mono">۱ نفر</td>
                      <td className="py-4 px-6 text-center font-mono font-bold text-purple-400">تا ۱۰ نفر</td>
                      <td className="py-4 px-6 text-center font-mono font-bold text-amber-400">نامحدود جهانی</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold">{isFa ? 'دسترسی کامل به سورس‌کد و شیدرها' : 'Full Source Code & Shaders'}</td>
                      <td className="py-4 px-6 text-center text-emerald-400">✓ تاییدشده</td>
                      <td className="py-4 px-6 text-center text-emerald-400">✓ تاییدشده</td>
                      <td className="py-4 px-6 text-center text-emerald-400">✓ تاییدشده + فایل‌های خام CAD</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold">{isFa ? 'حق استفاده در پروژه‌های تجاری مشتریان' : 'Client Commercial Rights'}</td>
                      <td className="py-4 px-6 text-center font-mono">حداکثر ۳ پروژه</td>
                      <td className="py-4 px-6 text-center font-mono text-purple-400">نامحدود</td>
                      <td className="py-4 px-6 text-center font-mono text-amber-400">نامحدود + حق بازفروش</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold">{isFa ? 'کانال پشتیبانی اختصاصی' : 'Priority Support Channel'}</td>
                      <td className="py-4 px-6 text-center font-mono">ایمیل (۴۸ ساعته)</td>
                      <td className="py-4 px-6 text-center font-mono text-purple-400">دیسکورد VIP (۱۲ ساعته)</td>
                      <td className="py-4 px-6 text-center font-mono text-amber-400">تماس و اسلک اختصاصی (۲۴/۷)</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-6 font-bold">{isFa ? 'به‌روزرسانی‌های آینده' : 'Future Version Updates'}</td>
                      <td className="py-4 px-6 text-center font-mono">۱ سال رایگان</td>
                      <td className="py-4 px-6 text-center font-mono text-purple-400">مادام‌العمر</td>
                      <td className="py-4 px-6 text-center font-mono text-amber-400">مادام‌العمر + فیچرهای سفارشی</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: INTEGRATION & DOCS */}
          {activeTab === 'DOCS' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-300">
              <h3 className={`font-['Syne'] font-bold text-xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? 'راهنمای پیاده‌سازی و ساختار کدهای فرگمنت' : 'Quick Start & Architecture Documentation'}
              </h3>
              <p className={`text-xs ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {isFa
                  ? 'نمونه کد زیر نحوه فراخوانی و بارگذاری شیدرهای کامپوننت را در ری‌اکت ۱۹ نمایش می‌دهد:'
                  : 'Install via npm and import the pre-compiled WebGL bundle into your React 19 application.'}
              </p>

              <div className="p-4 rounded-2xl bg-black/90 border border-white/15 text-left font-mono text-xs overflow-x-auto" dir="ltr">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-zinc-500">
                  <span>Terminal / Bash</span>
                  <span className="text-[10px] text-emerald-400">BASH</span>
                </div>
                <pre className="text-cyan-300">
                  {`npm install @aura/vibe-matrix three @types/three\n# Initialize with GLSL Shader Uniforms`}
                </pre>
              </div>

              <div className="p-4 rounded-2xl bg-black/90 border border-white/15 text-left font-mono text-xs overflow-x-auto" dir="ltr">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3 text-zinc-500">
                  <span>App.tsx</span>
                  <span className="text-[10px] text-purple-400">REACT 19 + GLSL</span>
                </div>
                <pre className="text-zinc-300">
                  {`import { VibeMatrixRenderer } from '@aura/vibe-matrix';\n\nexport default function StudioCanvas() {\n  return (\n    <VibeMatrixRenderer\n      refractionIndex={1.52}\n      dispersionStrength={0.08}\n      interactiveDetent={true}\n      audioFeedback="synthesized"\n    />\n  );\n}`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 4: VERIFIED CUSTOMER REVIEWS */}
          {activeTab === 'REVIEWS' && (
            <div className="mt-8 space-y-6 animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className={`font-['Syne'] font-bold text-xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'نظرات و ارزیابی خریداران تاییدشده' : 'Verified Buyer Impressions & Reviews'}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-amber-400 text-sm">★★★★★</span>
                    <span className="font-bold text-xs font-mono">4.98 / 5.0</span>
                    <span className="text-xs text-zinc-500">({isFa ? 'بر اساس ۱۴۲ ارزیابی مشتریان بین‌المللی' : 'Based on 142 client evaluations'})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`p-5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex justify-between items-center">
                    <strong className="font-bold text-xs">مهندس سهراب رادمنش</strong>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 block">مدیر فنی استودیو دیزاین تهران</span>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    «شیدرهای وب‌جی‌ال این مجموعه شگفت‌انگیز است. فریم‌ریت بالای ۱۰۰ اف‌پی‌اس بدون هیچ لگی لود شد و مشتری بین‌المللی ما از انکسار نور شیشه‌ای شگفت‌زده شد. پشتیبانی عالی بود.»
                  </p>
                </div>

                <div className={`p-5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex justify-between items-center">
                    <strong className="font-bold text-xs">Elena Rostova</strong>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </div>
                  <span className="text-[10px] font-mono text-purple-400 block">Lead Creative Dev @ Zurich</span>
                  <p className={`text-xs leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    «The tactile detent physics and Three.js performance surpassed all expectations. Easily worth 10x the price for production deliverables.»
                  </p>
                </div>
              </div>
            </div>
          )}
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
