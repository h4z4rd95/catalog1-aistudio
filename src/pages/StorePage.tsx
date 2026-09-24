import React, { useState, useEffect } from 'react';
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
  ArrowLeft,
  Eye,
  Tag,
  X
} from 'lucide-react';

export const StorePage: React.FC = () => {
  const {
    products,
    addToCart,
    setActiveProductId,
    setActivePage,
    formatPrice,
    theme,
    language,
    direction,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    t
  } = useStore();

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);
  const [quickInspectProduct, setQuickInspectProduct] = useState<Product | null>(null);
  const [inspectVariantIdx, setInspectVariantIdx] = useState(0);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Synchronize with external category filter from navigation mega-menu
  useEffect(() => {
    if (selectedCategoryFilter) {
      if (selectedCategoryFilter === 'ALL' || selectedCategoryFilter === 'DIGITAL' || selectedCategoryFilter === 'PHYSICAL') {
        setSelectedCategory(selectedCategoryFilter as ProductCategory);
      }
    }
  }, [selectedCategoryFilter]);

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
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-24 transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* Store Header Banner */}
      <div className={`w-full border-b py-16 px-4 sm:px-6 transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 to-slate-50 border-slate-200'
          : 'bg-gradient-to-b from-[#0a0d14] to-[#050609] border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
              <Tag className="w-3.5 h-3.5" />
              <span>{isFa ? 'فروشگاه آئورا • شیدرها • لایسنس‌ها • سخت‌افزار' : 'AURA DIGITAL • HARDWARE • LICENSES'}</span>
            </div>
            <h1 className={`font-['Syne'] font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}>
              {isFa ? 'فروشگاه و آرشیو موجودی' : 'Store & Inventory Drops'}
            </h1>
            <p className={`font-light text-sm sm:text-base mt-2 max-w-xl ${
              isLight ? 'text-zinc-600' : 'text-zinc-400'
            }`}>
              {isFa
                ? 'لایسنس‌های تجاری کیت‌های شیدر WebGL، دیزاین‌سیستم‌های پیشرفته و قطعات سخت‌افزاری تولید محدود.'
                : 'Commercial licenses for cutting-edge WebGL shader libraries, design tokens, and limited-run physical instruments.'}
            </p>
          </div>

          <div className={`flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-xl border ${
            isLight
              ? 'bg-white border-slate-200 text-zinc-700 shadow-sm'
              : 'bg-white/5 border-white/10 text-zinc-400'
          }`}>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>{isFa ? 'تحویل آنی کلید لایسنس • ارسال بیمه‌شده جهانی' : 'Instant Digital Key Delivery • Worldwide Insured Freight'}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 space-y-8">
        {/* Controls Bar: Category Tabs + Search + Sort */}
        <div className={`flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl border backdrop-blur-md ${
          isLight
            ? 'bg-white border-slate-200 shadow-sm'
            : 'bg-zinc-900/60 border-white/10'
        }`}>
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none font-mono text-xs">
            {(
              [
                { id: 'ALL', label: isFa ? 'همه محصولات' : 'All Inventory' },
                { id: 'DIGITAL', label: isFa ? 'شیدرهای دیجیتال و لایسنس' : 'Digital Licenses & Shaders' },
                { id: 'PHYSICAL', label: isFa ? 'سخت‌افزار و ساعت‌های مچی' : 'Physical Hardware & Timepieces' },
              ] as const
            ).map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick(600);
                  setSelectedCategory(cat.id);
                  setSelectedCategoryFilter(cat.id);
                }}
                className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                  selectedCategory === cat.id
                    ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                    : isLight
                    ? 'bg-slate-100 text-zinc-600 hover:text-zinc-900 hover:bg-slate-200'
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
              <Search className={`w-4 h-4 absolute ${isRtl ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 text-zinc-400`} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجو در محصولات و شیدرها...' : 'Search products, shaders...'}
                className={`w-full py-2 rounded-xl font-mono text-xs focus:outline-none focus:border-cyan-400 border ${
                  isRtl ? 'pr-9 pl-3' : 'pl-9 pr-3'
                } ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                    : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                }`}
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className={`px-3 py-2 rounded-xl font-mono text-xs focus:outline-none focus:border-cyan-400 cursor-pointer border ${
                isLight
                  ? 'bg-slate-50 border-slate-300 text-zinc-800'
                  : 'bg-black/60 border-white/15 text-zinc-300'
              }`}
            >
              <option value="featured">{isFa ? 'محصولات برگزیده' : 'Featured Drops'}</option>
              <option value="price-low">{isFa ? 'قیمت: کم به زیاد' : 'Price: Low to High'}</option>
              <option value="price-high">{isFa ? 'قیمت: زیاد به کم' : 'Price: High to Low'}</option>
              <option value="rating">{isFa ? 'بالاترین امتیاز' : 'Top Rated'}</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className={`py-24 text-center border rounded-2xl ${
            isLight ? 'bg-white border-slate-200' : 'border-white/10 bg-zinc-900/30'
          }`}>
            <Box className="w-12 h-12 text-zinc-400 mx-auto mb-3" />
            <h3 className={`font-bold text-xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'هیچ محصولی با این مشخصات یافت نشد' : 'No products found'}
            </h3>
            <p className={`font-mono text-xs mt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
              {isFa ? 'عبارت جستجو یا فیلتر دسته‌بندی را تغییر دهید.' : 'Try adjusting your search criteria or resetting filters.'}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className={`mt-4 px-4 py-2 rounded-lg font-mono text-xs border ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              {isFa ? 'پاک کردن فیلترها' : 'Clear All Filters'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => {
              const isAdded = addedItemAnim === product.id;
              return (
                <div
                  key={product.id}
                  className={`rounded-2xl border overflow-hidden flex flex-col transition-all group ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-cyan-500 hover:shadow-xl shadow-slate-900/5'
                      : 'bg-[#090c12] border-white/15 hover:border-cyan-400/50 hover:shadow-2xl hover:shadow-cyan-500/10'
                  }`}
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
                      <span className="px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-black/75 border border-white/20 text-zinc-200 backdrop-blur-md">
                        {product.category}
                      </span>
                    </div>

                    {/* Quick Preview Hover Trigger */}
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        onClick={() => {
                          soundFx.playChime(750, 0.2);
                          setQuickInspectProduct(product);
                          setInspectVariantIdx(0);
                        }}
                        className="px-4 py-2 rounded-xl bg-white text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isFa ? 'نگاه سریع' : 'Quick View'}</span>
                      </button>

                      <button
                        onClick={() => handleInspect(product.id)}
                        className="px-4 py-2 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold flex items-center gap-1.5 shadow-xl hover:scale-105 transition-transform"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{isFa ? 'مشاهده سه‌بعدی' : '3D Details'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between font-mono text-xs mb-1.5">
                        <span className="text-cyan-400 font-bold uppercase tracking-wider text-[11px]">
                          {product.subCategory}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-[11px]">{product.rating}</span>
                        </div>
                      </div>

                      <h3
                        onClick={() => handleInspect(product.id)}
                        className={`font-['Syne'] font-bold text-xl cursor-pointer transition-colors ${
                          isLight
                            ? 'text-zinc-900 group-hover:text-cyan-600'
                            : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {product.name}
                      </h3>

                      <p className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {product.subtitle}
                      </p>
                    </div>

                    {/* Bottom Pricing & Cart Actions */}
                    <div className={`pt-5 mt-5 border-t flex items-center justify-between ${
                      isLight ? 'border-slate-200' : 'border-white/10'
                    }`}>
                      <div>
                        <span className={`font-mono text-[10px] block ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {t.total}
                        </span>
                        <span className="font-mono text-xl font-black text-emerald-500">
                          {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                            isAdded
                              ? 'bg-emerald-500 text-black scale-105'
                              : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20'
                          }`}
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>{isAdded ? (isFa ? 'افزوده شد!' : 'Added!') : t.addToCart}</span>
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

      {/* Quick View / Inspect Modal */}
      {quickInspectProduct && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
          <div className={`relative w-full max-w-2xl border rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row gap-6 font-mono text-xs ${
            isLight
              ? 'bg-white border-slate-300 text-zinc-900 shadow-slate-900/20'
              : 'bg-[#090b10] border-cyan-500/30 text-zinc-300'
          }`}>
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
                <span className={`text-[10px] uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  {isFa ? 'مشخصات فنی:' : 'Hardware Specs:'}
                </span>
                {Object.entries(quickInspectProduct.specs).slice(0, 3).map(([key, val]) => (
                  <div key={key} className={`flex justify-between border-b py-0.5 text-[11px] ${
                    isLight ? 'border-slate-200' : 'border-white/5'
                  }`}>
                    <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>{key}:</span>
                    <span className={`font-semibold ${isLight ? 'text-zinc-900' : 'text-white'}`}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Details & Purchase actions */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-cyan-500 font-bold">{quickInspectProduct.subCategory}</span>
                  <button
                    onClick={() => {
                      soundFx.playClick(500);
                      setQuickInspectProduct(null);
                    }}
                    className={`p-1.5 rounded-lg transition-colors ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-zinc-700'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white'
                    }`}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <h3 className={`font-['Syne'] font-black text-2xl tracking-tight ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  {quickInspectProduct.name}
                </h3>

                <p className={`mt-2 leading-relaxed text-xs line-clamp-3 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {quickInspectProduct.description}
                </p>

                {/* Variant selector */}
                <div className="mt-4 space-y-2">
                  <span className={`text-[10px] uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                    {isFa ? 'انتخاب ویرایش محصول:' : 'Select Variant:'}
                  </span>
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
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-500 font-bold shadow-sm'
                            : isLight
                            ? 'bg-slate-50 border-slate-200 text-zinc-700 hover:bg-slate-100'
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
                        <span className="font-bold text-emerald-500">
                          {v.priceDelta > 0 ? `+${formatPrice(v.priceDelta)}` : (isFa ? 'شامل پکیج' : 'Included')}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Total & Action Buttons */}
              <div className={`pt-4 border-t space-y-3 mt-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <div className="flex items-baseline justify-between">
                  <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>{t.total}:</span>
                  <span className="font-mono text-2xl font-black text-emerald-500">
                    {formatPrice(quickInspectProduct.price + quickInspectProduct.variants[inspectVariantIdx].priceDelta)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleInspect(quickInspectProduct.id);
                      setQuickInspectProduct(null);
                    }}
                    className={`py-2.5 rounded-xl font-bold text-center border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    {isFa ? 'نمای سه‌بعدی' : 'Deep 3D View'}
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
                    <span>{t.addToCart}</span>
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
