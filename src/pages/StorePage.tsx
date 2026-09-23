import React, { useState } from 'react';
import { useStore, Product, ProductCategory } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  ShoppingBag,
  Search,
  Filter,
  Star,
  CheckCircle2,
  Box,
  Layers,
  Sparkles,
  ArrowRight,
  Eye,
  Tag
} from 'lucide-react';

export const StorePage: React.FC = () => {
  const { products, addToCart, setActiveProductId, setActivePage, formatPrice } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);
  const [quickInspectProduct, setQuickInspectProduct] = useState<Product | null>(null);
  const [inspectVariantIdx, setInspectVariantIdx] = useState(0);

  // Filter & Search logic
  const filteredProducts = products
    .filter((product) => {
      const matchesCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subCategory.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured
    });

  const handleAddToCart = (product: Product) => {
    addToCart(product, 1);
    setAddedItemAnim(product.id);
    setTimeout(() => {
      setAddedItemAnim(null);
    }, 1200);
  };

  const handleInspect = (productId: string) => {
    soundFx.playClick(650);
    setActiveProductId(productId);
    setActivePage('PRODUCT_DETAIL');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-24">
      {/* Store Header Banner */}
      <div className="w-full bg-gradient-to-b from-[#0a0d14] to-[#050609] border-b border-white/10 py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>AURA DIGITAL &bull; HARDWARE &bull; LICENSES</span>
            </div>
            <h1 className="font-['Syne'] font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              Store &amp; Inventory Drops
            </h1>
            <p className="font-light text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
              Commercial licenses for cutting-edge WebGL shader libraries, design tokens, and limited-run physical instruments.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-zinc-400 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Digital Key Delivery &bull; Worldwide Insured Freight</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* Controls Bar: Category Pills + Search + Sort */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 backdrop-blur-md">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none font-mono text-xs">
            {(
              [
                { id: 'ALL', label: 'All Inventory' },
                { id: 'DIGITAL', label: 'Digital Licenses & Shaders' },
                { id: 'PHYSICAL', label: 'Physical Hardware & Timepieces' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick(600);
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products, shaders..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-black/60 border border-white/15 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3 py-2 rounded-xl bg-black/60 border border-white/15 text-zinc-300 font-mono text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
            >
              <option value="featured">Featured Drops</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center border border-white/10 rounded-2xl bg-zinc-900/30">
            <Box className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
            <h3 className="font-['Syne'] text-xl font-bold text-white">No products found</h3>
            <p className="font-mono text-xs text-zinc-400 mt-1">
              Try adjusting your search criteria or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-mono text-xs text-white"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedItemAnim === product.id;
              return (
                <div
                  key={product.id}
                  className="rounded-2xl bg-[#090c12] border border-white/15 overflow-hidden flex flex-col hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all group"
                >
                  {/* Media Aspect Container */}
                  <div className="relative aspect-[16/11] overflow-hidden bg-zinc-950">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Category & Badge Overlay */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      {product.badge ? (
                        <span className="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-amber-400 text-black shadow-md uppercase tracking-wider">
                          {product.badge}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-black/80 border border-white/20 text-zinc-300 backdrop-blur-md uppercase tracking-wider">
                        {product.category}
                      </span>
                    </div>

                    {/* Stock Alert Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span
                        className={`px-2 py-0.5 rounded font-mono text-[10px] font-semibold backdrop-blur-md border ${
                          product.stockCount < 15
                            ? 'bg-rose-950/80 border-rose-500/50 text-rose-300'
                            : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                        }`}
                      >
                        {product.stockCount < 15
                          ? `Only ${product.stockCount} units remaining`
                          : 'In Stock &amp; Ready'}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                        <span className="text-cyan-400 font-semibold">{product.subCategory}</span>
                        <span className="flex items-center gap-1 text-amber-300 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                          <span>{product.rating}</span>
                          <span className="text-zinc-600 font-normal">({product.reviewsCount})</span>
                        </span>
                      </div>

                      <h3
                        onClick={() => handleInspect(product.id)}
                        className="font-['Syne'] font-bold text-xl text-white group-hover:text-cyan-300 transition-colors cursor-pointer"
                      >
                        {product.name}
                      </h3>

                      <p className="text-xs text-zinc-400 mt-2 line-clamp-2 leading-relaxed font-light">
                        {product.subtitle}
                      </p>

                      {/* Variant Selector Pill preview */}
                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2">
                        <span className="font-mono text-[10px] text-zinc-500 uppercase">Available:</span>
                        <div className="flex items-center gap-1.5">
                          {product.variants.map((v) => (
                            <span
                              key={v.id}
                              className="w-3 h-3 rounded-full border border-white/20 shadow-sm"
                              style={{ backgroundColor: v.previewColor || '#38bdf8' }}
                              title={v.name}
                            />
                          ))}
                        </div>
                        <span className="font-mono text-[10px] text-zinc-400 ml-1">
                          ({product.variants.length} configurations)
                        </span>
                      </div>
                    </div>

                    {/* Bottom Pricing & Actions */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xl font-black text-emerald-400">
                            {formatPrice(product.price)}
                          </span>
                          {product.originalPrice && (
                            <span className="font-mono text-xs text-zinc-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-[10px] text-zinc-500 block">
                          Perpetual Rights
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            soundFx.playClick(700);
                            setQuickInspectProduct(product);
                            setInspectVariantIdx(0);
                          }}
                          className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-zinc-200 hover:text-white font-mono text-xs font-bold transition-all flex items-center gap-1"
                          title="Quick 3D & Specs Inspection"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Quick View</span>
                        </button>

                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md ${
                            isAdded
                              ? 'bg-emerald-400 text-black scale-105'
                              : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-cyan-500/20'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isAdded ? 'Added!' : 'Add'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quick 3D Inspect Modal */}
      {quickInspectProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-[#090b10] border border-cyan-500/30 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 font-mono text-xs text-zinc-300">
            {/* Left: Product visual preview */}
            <div className="w-full md:w-1/2 flex flex-col gap-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-black border border-white/10">
                <img
                  src={quickInspectProduct.image}
                  alt={quickInspectProduct.name}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/80 text-[10px] text-cyan-400 font-bold border border-white/10">
                  {quickInspectProduct.category}
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Hardware Specs:</span>
                {Object.entries(quickInspectProduct.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-white/5 py-0.5 text-[11px]">
                    <span className="text-zinc-400">{key}:</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Details & Purchase actions */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-400 font-bold">{quickInspectProduct.subCategory}</span>
                  <button
                    onClick={() => {
                      soundFx.playClick(500);
                      setQuickInspectProduct(null);
                    }}
                    className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="font-['Syne'] font-black text-2xl text-white tracking-tight">
                  {quickInspectProduct.name}
                </h3>

                <p className="mt-2 text-zinc-400 leading-relaxed text-xs line-clamp-3">
                  {quickInspectProduct.description}
                </p>

                {/* Variant selector */}
                <div className="mt-4 space-y-2">
                  <span className="text-[10px] text-zinc-400 uppercase tracking-widest">Select Variant:</span>
                  <div className="flex flex-col gap-1.5">
                    {quickInspectProduct.variants.map((v, idx) => (
                      <button
                        key={v.id}
                        onClick={() => {
                          soundFx.playClick(600);
                          setInspectVariantIdx(idx);
                        }}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                          inspectVariantIdx === idx
                            ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-sm'
                            : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: v.previewColor || '#38bdf8' }}
                          />
                          <span>{v.name}</span>
                        </div>
                        <span className="font-bold text-emerald-400">
                          {v.priceDelta > 0 ? `+${formatPrice(v.priceDelta)}` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Action Buttons */}
              <div className="pt-4 border-t border-white/10 space-y-3 mt-4">
                <div className="flex items-baseline justify-between">
                  <span className="text-zinc-400">Configured Total:</span>
                  <span className="font-mono text-2xl font-black text-emerald-400">
                    {formatPrice(quickInspectProduct.price + quickInspectProduct.variants[inspectVariantIdx].priceDelta)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleInspect(quickInspectProduct.id);
                      setQuickInspectProduct(null);
                    }}
                    className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-center"
                  >
                    Deep 3D View
                  </button>

                  <button
                    onClick={() => {
                      addToCart(
                        quickInspectProduct,
                        1,
                        quickInspectProduct.variants[inspectVariantIdx]
                      );
                      setQuickInspectProduct(null);
                    }}
                    className="py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold flex items-center justify-center gap-1.5 shadow-md shadow-cyan-500/20"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add To Cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
