import React, { useState } from 'react';
import { useStore, ProductVariant } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  ShoppingBag,
  ArrowLeft,
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
  const { products, activeProductId, addToCart, setActivePage } = useStore();
  const product = products.find((p) => p.id === activeProductId) || products[0];

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
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-32">
      {/* Top Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 border-b border-white/10 flex items-center justify-between">
        <button
          onClick={() => {
            soundFx.playClick(500);
            setActivePage('STORE');
          }}
          className="flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Store Catalog</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(800);
              setIsFavorited(!isFavorited);
            }}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center transition-all ${
              isFavorited
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-400'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Product Showcase Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Media & 3D Rotating Viewport */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[16/11] rounded-3xl overflow-hidden bg-gradient-to-b from-[#0a0d14] to-zinc-950 border border-white/15 shadow-2xl flex items-center justify-center group">
              <img
                src={product.gallery[selectedImageIdx] || product.image}
                alt={product.name}
                style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }}
                className="w-full h-full object-cover select-none"
              />

              {/* 3D Spin Action Button */}
              <button
                onClick={handleSpin3D}
                className="absolute bottom-4 right-4 px-3.5 py-2 rounded-xl bg-black/80 hover:bg-black border border-white/20 text-cyan-300 font-mono text-xs font-bold flex items-center gap-2 backdrop-blur-md transition-all shadow-xl"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
                <span>Rotate 90&deg; Preview</span>
              </button>

              {/* Product Badge */}
              <div className="absolute top-4 left-4 flex gap-2">
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
                      ? 'border-cyan-400 shadow-md shadow-cyan-500/20 scale-105'
                      : 'border-white/10 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Technical Specs Breakdown */}
            <div className="pt-8 border-t border-white/10 space-y-4">
              <h3 className="font-['Syne'] font-bold text-lg text-white">
                Technical Architecture &amp; Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {Object.entries(product.specs).map(([label, val]) => (
                  <div key={label} className="p-3.5 rounded-xl bg-zinc-900/60 border border-white/10 font-mono text-xs">
                    <span className="text-zinc-500 uppercase block text-[10px]">{label}</span>
                    <strong className="text-zinc-200 font-semibold mt-0.5 block">{val}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Purchase Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>AURA STUDIO SPEC // {product.subCategory.toUpperCase()}</span>
              </div>

              <h1 className="font-['Syne'] font-black text-3xl sm:text-4xl text-white tracking-tight leading-tight">
                {product.name}
              </h1>

              <div className="mt-3 flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-1 text-amber-300 font-bold bg-amber-950/40 border border-amber-500/30 px-2 py-0.5 rounded">
                  <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-zinc-400">({product.reviewsCount} verified reviews)</span>
                <span className="text-zinc-600">&bull;</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>In Stock ({product.stockCount} left)</span>
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-mono text-3xl font-black text-emerald-400">
                  ${unitPrice}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-base text-zinc-500 line-through">
                    ${product.originalPrice + selectedVariant.priceDelta}
                  </span>
                )}
                <span className="font-mono text-xs text-zinc-500">
                  (Single Payment &bull; Perpetual License)
                </span>
              </div>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {product.description}
            </p>

            {/* Variant Selector */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <label className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold block">
                Select Configuration Tier:
              </label>
              <div className="space-y-2">
                {product.variants.map((v) => (
                  <div
                    key={v.id}
                    onClick={() => handleVariantChange(v)}
                    className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between font-mono text-xs transition-all ${
                      selectedVariant.id === v.id
                        ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-lg shadow-cyan-500/10'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-white/30"
                        style={{ backgroundColor: v.previewColor || '#38bdf8' }}
                      />
                      <span className="font-bold">{v.name}</span>
                    </div>
                    <span className="text-emerald-400 font-bold">
                      {v.priceDelta > 0 ? `+$${v.priceDelta}` : 'Included'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <label className="font-mono text-xs uppercase tracking-wider text-zinc-400 font-bold">
                Quantity:
              </label>
              <div className="flex items-center border border-white/20 rounded-xl bg-zinc-900/60 p-1">
                <button
                  onClick={() => {
                    soundFx.playClick(500);
                    setQuantity((prev) => Math.max(1, prev - 1));
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
                >
                  -
                </button>
                <span className="font-mono text-sm px-4 font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setQuantity((prev) => prev + 1);
                  }}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10"
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
                <span>Add To Cart &bull; ${totalPrice}</span>
              </button>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2 text-zinc-400 font-mono text-xs">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verified AURA Commercial Guarantee</span>
                </div>
                <p className="text-[11px] text-zinc-500 leading-relaxed">
                  Includes full source code access, automated GitHub repository sync, and priority Discord support from our core engineering team.
                </p>
              </div>
            </div>

            {/* Feature Bullets */}
            <div className="space-y-2 pt-4 border-t border-white/10">
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">
                Key Deliverables:
              </h4>
              <ul className="space-y-2 text-xs text-zinc-400">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Buy Bar for Mobile & Quick Purchasing */}
      <div className="fixed bottom-0 inset-x-0 z-30 p-4 bg-[#07090e]/95 backdrop-blur-xl border-t border-white/15 flex items-center justify-between gap-4 max-w-7xl mx-auto shadow-2xl">
        <div className="hidden sm:flex items-center gap-3">
          <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-white/15" />
          <div>
            <h4 className="font-['Syne'] font-bold text-sm text-white">{product.name}</h4>
            <span className="font-mono text-[10px] text-zinc-400">{selectedVariant.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <span className="font-mono text-lg font-black text-emerald-400">
            ${totalPrice}
          </span>
          <button
            onClick={handleAddToCart}
            className="px-6 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-cyan-500/20"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
