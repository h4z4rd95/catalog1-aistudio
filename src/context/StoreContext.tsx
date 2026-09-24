import React, { createContext, useContext, useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';
import { Language, Direction, ThemeMode, TRANSLATIONS, MAIN_CATEGORY_STRUCTURE } from '../utils/translations';

export type ProductCategory = 'ALL' | 'DIGITAL' | 'PHYSICAL';
export type WebsitePage = 'LANDING' | 'STORE' | 'PRODUCT_DETAIL' | 'CART' | 'ABOUT' | 'CONTACT' | 'AUTH' | 'NEWS';
export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'BTC';

export interface ProductVariant {
  id: string;
  name: string;
  priceDelta: number;
  previewColor?: string;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'DIGITAL' | 'PHYSICAL';
  subCategory: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockCount: number;
  badge?: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  specs: Record<string, string>;
  specsFa?: Record<string, string>;
  nameFa?: string;
  subtitleFa?: string;
  descriptionFa?: string;
  featuresFa?: string[];
  variants: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant: ProductVariant;
}

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'add' | 'remove' | 'coupon' | 'info';
  timestamp: number;
  image?: string;
  undoAction?: () => void;
}

export interface CustomerOrder {
  orderId: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  paymentMethod: string;
  status?: string;
  licenseKeys?: string[];
}

export const STORE_PRODUCTS: Product[] = [
  {
    id: 'prod-vibe-matrix',
    name: 'Vibe Matrix WebGL Design System',
    subtitle: 'Production-ready Three.js, React 19 & GLSL Shader Component Library',
    category: 'DIGITAL',
    subCategory: 'Design Systems',
    price: 189,
    originalPrice: 249,
    rating: 4.98,
    reviewsCount: 142,
    inStock: true,
    stockCount: 999,
    badge: 'BESTSELLER',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'The definitive architectural toolkit for building Awwwards-caliber digital experiences. Includes 55 production components across 11 disciplines, bespoke GLSL noise shaders, gyroscopic physics, and procedural Web Audio.',
    features: [
      '55 complete interactive components across 11 layout suites',
      'Zero layout compromises with full TypeScript typings',
      'Production Three.js & Raymarching SDF shaders included',
      'Procedural Web Audio tactile feedback synthesizer',
      'Commercial perpetual license for unlimited client projects',
    ],
    specs: {
      'Framework': 'React 19 / Next.js 15 Ready',
      'Language': 'TypeScript 5.x Strict',
      'Styling': 'Tailwind CSS v4 + PostCSS',
      '3D Engine': 'Three.js r128+ / WebGL 2.0',
      'License': 'Unlimited Commercial Dev Seats',
    },
    variants: [
      { id: 'v-indiv', name: 'Individual Indie License', priceDelta: 0, previewColor: '#38bdf8' },
      { id: 'v-studio', name: 'Studio Multi-Seat (Up to 10 Devs)', priceDelta: 120, previewColor: '#a855f7' },
      { id: 'v-ent', name: 'Enterprise Source & Resale Rights', priceDelta: 450, previewColor: '#f59e0b' },
    ],
  },
  {
    id: 'prod-hypershader-glsl',
    name: 'HyperShader Volumetric GLSL Caustics Pack',
    subtitle: 'Snell Refraction, Cylindrical Fluted Glass & Raymarched Metaballs',
    category: 'DIGITAL',
    subCategory: 'GLSL Shaders',
    price: 99,
    originalPrice: 139,
    rating: 4.95,
    reviewsCount: 88,
    inStock: true,
    stockCount: 999,
    badge: 'TRENDING',
    image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A master collection of GPU fragment shaders simulating optical physics in real time. Features Snell law prism dispersion, Bayer 8x8 ordered dithering, volumetric laser scattering, and liquid mercury metaballs.',
    features: [
      'Pre-compiled GPU fragment & vertex shader sources',
      'Dynamic uniform controllers for pointer position and resolution',
      'Zero dependencies: runs on pure WebGL, Three.js, or Canvas 2D',
      'Includes interactive playground GUI controls',
      '60+ FPS guaranteed on desktop and modern mobile GPUs',
    ],
    specs: {
      'Format': '.glsl / .ts modules',
      'Shaders Included': '12 Optical Presets',
      'GPU Overhead': '< 1.8ms frame time',
      'Compatibility': 'WebGL 1.0, 2.0, WebGPU Experimental',
    },
    variants: [
      { id: 'v-standard', name: 'Standard Dev Pack', priceDelta: 0, previewColor: '#06b6d4' },
      { id: 'v-extended', name: 'Extended Shaders + GUI Controls', priceDelta: 50, previewColor: '#ec4899' },
    ],
  },
  {
    id: 'prod-cyberdeck-mk4',
    name: 'CyberDeck MK-IV Tactical Rig',
    subtitle: 'Billet Aluminum Chassis, Mechanical Ortholinear Keys & 7-inch AMOLED HUD',
    category: 'PHYSICAL',
    subCategory: 'Cyber Hardware',
    price: 890,
    originalPrice: 1050,
    rating: 4.99,
    reviewsCount: 64,
    inStock: true,
    stockCount: 12,
    badge: 'LIMITED EDITION',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'A field-grade cybernetic workstation engineered for code architects and hackers. CNC-milled from aerospace 6061-T6 aluminum, featuring hot-swappable Kailh Box Navy switches, a 120Hz high-brightness AMOLED display, and dual USB-C PD telemetry ports.',
    features: [
      'Solid CNC 6061-T6 anodized aluminum unibody',
      '7.0" 120Hz AMOLED panel (1920x1080) with anti-reflective glass',
      'Hot-swappable mechanical ortholinear layout with QMK/VIA firmware',
      'Integrated 18,000 mAh LiFePO4 battery (14 hrs continuous operation)',
      'Custom Pelican-style hardshell military flight case included',
    ],
    specs: {
      'Chassis': 'CNC Billet 6061 Aluminum',
      'Display': '7.0" 1080p 120Hz AMOLED',
      'Key Switches': 'Kailh Box Navy (Hot-Swappable)',
      'Battery': '18,000 mAh High-Discharge',
      'Weight': '1.38 kg (3.04 lbs)',
    },
    variants: [
      { id: 'v-stealth-black', name: 'Stealth Matte Obsidian', priceDelta: 0, previewColor: '#18181b' },
      { id: 'v-cyber-orange', name: 'Tactical Cyber Orange Accent', priceDelta: 45, previewColor: '#f97316' },
      { id: 'v-raw-titanium', name: 'Titanium Grey Hard Anodized', priceDelta: 95, previewColor: '#71717a' },
    ],
  },
  {
    id: 'prod-aura-watch',
    name: 'AURA Vermeil Titanium Watch',
    subtitle: 'Minimalist Mechanical Tourbillon with Sapphire Crystal & Magnetic Link',
    category: 'PHYSICAL',
    subCategory: 'Luxury Horology',
    price: 1450,
    originalPrice: 1750,
    rating: 5.0,
    reviewsCount: 39,
    inStock: true,
    stockCount: 7,
    badge: 'HAUTE COUTURE',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'An architectural study in timekeeping. Designed with a skeletonized Grade 5 titanium case, dual-curved anti-reflective sapphire crystal, and an open-heart flying tourbillon movement beating at 28,800 vibrations per hour.',
    features: [
      'Grade 5 aerospace titanium case with hand-beveled edges',
      'Custom caliber AT-01 automatic skeleton tourbillon (72h power reserve)',
      'Double anti-reflective sapphire crystal front and exhibition caseback',
      'Quick-release magnetic titanium link bracelet with micro-adjust clasp',
      'Water resistant to 10 ATM (100 meters / 330 feet)',
    ],
    specs: {
      'Diameter': '40.5 mm',
      'Thickness': '9.8 mm',
      'Case Material': 'Grade 5 Titanium',
      'Power Reserve': '72 Hours Mechanical',
      'Strap': 'Titanium Link + Black FKM Rubber',
    },
    variants: [
      { id: 'v-grade5-ti', name: 'Brushed Grade 5 Titanium', priceDelta: 0, previewColor: '#94a3b8' },
      { id: 'v-rose-gold', name: '18K Rose Gold Vermeil Accents', priceDelta: 280, previewColor: '#fb7185' },
      { id: 'v-dlc-black', name: 'Diamond-Like Carbon (DLC) Noir', priceDelta: 160, previewColor: '#09090b' },
    ],
  },
  {
    id: 'prod-haptic-knob',
    name: 'Parametric Haptic Spatial Controller',
    subtitle: 'Magnetic Force-Feedback Rotary Encoder with USB-C WebHID Protocol',
    category: 'PHYSICAL',
    subCategory: 'Spatial Hardware',
    price: 349,
    originalPrice: 420,
    rating: 4.92,
    reviewsCount: 71,
    inStock: true,
    stockCount: 23,
    badge: 'NEW RELEASE',
    image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'The physical bridge between digital code and tactile sensation. A brushless BLDC motor provides programmable haptic detents, spring bounds, and simulated viscous dampening directly mapped to browser UI and 3D scenes.',
    features: [
      'Programmable magnetic BLDC motor with sub-millidegree precision',
      'Dynamic haptic profiles: stepped dials, ratchets, inertia spin, walls',
      'Full WebHID JavaScript API for direct web browser interaction',
      'Circular 1.3" AMOLED center cap displaying live RPM & parameters',
      'CNC milled brass base with silicone non-slip desk dampeners',
    ],
    specs: {
      'Encoder': 'Magnetic 14-Bit Optical BLDC',
      'Interface': 'USB-C WebHID / WebMIDI',
      'Display': '1.3" Round OLED 240x240',
      'Weight': '480g Solid Weighted Brass',
    },
    variants: [
      { id: 'v-obsidian-knob', name: 'Anodized Obsidian Noir', priceDelta: 0, previewColor: '#27272a' },
      { id: 'v-raw-brass', name: 'Hand-Polished Mirror Brass', priceDelta: 60, previewColor: '#facc15' },
    ],
  },
  {
    id: 'prod-spatial-audio-engine',
    name: 'Procedural Web Audio Haptics Suite',
    subtitle: 'Generative Ambient Synthesizer, 3D Spatial Audio & Tactile Sound FX',
    category: 'DIGITAL',
    subCategory: 'Audio Software',
    price: 119,
    originalPrice: 159,
    rating: 4.97,
    reviewsCount: 52,
    inStock: true,
    stockCount: 999,
    badge: 'AWARD WINNER',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=80',
    ],
    description: 'Transform silent web interfaces into living, tactile sensory worlds. Includes procedurally generated harmonic chimes, spatial Doppler panning, mechanical switch audio, and noise-free ambient soundscapes.',
    features: [
      'Zero audio sample assets: 100% procedural Web Audio synthesis',
      'Sub-5ms latency responsive tactile UI feedback',
      'Brian Eno-style generative ambient chord generator',
      'PannerNode 3D listener coordinate spatialization',
      'Drop-in React hook integration with zero setup',
    ],
    specs: {
      'Bundle Size': '< 4.2 KB gzipped',
      'Engine': 'Web Audio API W3C Standard',
      'Polyphony': '32 Concurrent Hardware Voices',
      'License': 'Perpetual Commercial Use',
    },
    variants: [
      { id: 'v-audio-standard', name: 'Standard Developer Bundle', priceDelta: 0, previewColor: '#34d399' },
      { id: 'v-audio-pro', name: 'Pro Bundle + Spatial Reverb IRs', priceDelta: 40, previewColor: '#60a5fa' },
    ],
  },
];

interface StoreContextType {
  activePage: WebsitePage;
  setActivePage: (page: WebsitePage) => void;
  activeProductId: string;
  setActiveProductId: (id: string) => void;
  products: Product[];
  cart: CartItem[];
  cartCount: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  couponCode: string;
  couponApplied: boolean;
  toasts: ToastNotification[];
  checkoutStep: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  setCheckoutStep: (step: number) => void;
  addToCart: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, delta: number, variantId?: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  addToast: (title: string, message: string, type: ToastNotification['type']) => void;
  dismissToast: (id: string) => void;
  lastOrder: CustomerOrder | null;
  completeOrder: (customerData: { name: string; email: string; address: string; paymentMethod: string }) => CustomerOrder;
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (amountInUsd: number) => string;
  orderHistory: CustomerOrder[];
  quickViewProduct: Product | null;
  setQuickViewProduct: (p: Product | null) => void;
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (l: Language) => void;
  direction: Direction;
  setDirection: (d: Direction) => void;
  toggleLanguage: () => void;
  toggleDirection: () => void;
  t: (typeof TRANSLATIONS)['en'];
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  setSelectedProductId: (id: string) => void;
  cartAnimationKey: number;
  restoreLastRemoved: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activePage, setActivePage] = useState<WebsitePage>('LANDING');
  const [activeProductId, setActiveProductId] = useState<string>(STORE_PRODUCTS[0].id);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<number>(1);
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [lastOrder, setLastOrder] = useState<CustomerOrder | null>(null);
  const [currency, setCurrency] = useState<CurrencyType>('USD');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [language, setLanguage] = useState<Language>('fa');
  const [direction, setDirection] = useState<Direction>('rtl');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('ALL');
  const [cartAnimationKey, setCartAnimationKey] = useState<number>(0);
  const [lastRemovedItem, setLastRemovedItem] = useState<{ item: CartItem; index: number } | null>(null);

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.remove('theme-light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.body.classList.add('theme-light');
    }
  }, [theme]);

  const toggleTheme = () => {
    soundFx.playClick(800);
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLanguage = () => {
    soundFx.playClick(900);
    if (language === 'en') {
      setLanguage('fa');
      setDirection('rtl');
    } else {
      setLanguage('en');
      setDirection('ltr');
    }
  };

  const toggleDirection = () => {
    soundFx.playClick(700);
    setDirection((prev) => (prev === 'ltr' ? 'rtl' : 'ltr'));
  };

  const t = TRANSLATIONS[language];

  // Seed initial order history so client can immediately view past orders and software license keys
  const [orderHistory, setOrderHistory] = useState<CustomerOrder[]>([
    {
      orderId: 'ORD-892415',
      date: 'Sep 18, 2026',
      items: [
        {
          product: STORE_PRODUCTS[0],
          quantity: 1,
          selectedVariant: STORE_PRODUCTS[0].variants[1],
        },
      ],
      subtotal: 349,
      discount: 35,
      tax: 25,
      shipping: 0,
      total: 339,
      customerName: 'Alexander Vance',
      customerEmail: 'alexander@aura-atelier.com',
      shippingAddress: '450 West 33rd St, Penthouse 48, New York, NY 10001',
      paymentMethod: 'Mastercard •••• 4242',
      status: 'DELIVERED',
      licenseKeys: ['VIBE-PRO-98X2-K91A'],
    },
  ]);

  // Initialize cart with sample items so client can immediately test checkout & cart interactions
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: STORE_PRODUCTS[0], // Vibe Matrix
      quantity: 1,
      selectedVariant: STORE_PRODUCTS[0].variants[0],
    },
    {
      product: STORE_PRODUCTS[2], // CyberDeck MK-IV
      quantity: 1,
      selectedVariant: STORE_PRODUCTS[2].variants[0],
    },
  ]);

  const addToast = (
    title: string,
    message: string,
    type: ToastNotification['type'],
    image?: string,
    undoAction?: () => void
  ) => {
    const id = 'toast-' + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type, timestamp: Date.now(), image, undoAction }]);
    setTimeout(() => {
      dismissToast(id);
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const restoreLastRemoved = () => {
    if (lastRemovedItem) {
      soundFx.playChime(750, 0.15);
      setCart((prev) => {
        const next = [...prev];
        next.splice(lastRemovedItem.index, 0, lastRemovedItem.item);
        return next;
      });
      const isFa = language === 'fa';
      addToast(
        isFa ? 'محصول بازیابی شد' : 'Item Restored',
        isFa
          ? `«${lastRemovedItem.item.product.nameFa || lastRemovedItem.item.product.name}» مجدداً به سبد خرید بازگردانده شد.`
          : `${lastRemovedItem.item.product.name} was restored to your cart.`,
        'info',
        lastRemovedItem.item.product.image
      );
      setLastRemovedItem(null);
    }
  };

  const addToCart = (product: Product, quantity: number = 1, variant?: ProductVariant) => {
    const chosenVariant = variant || product.variants[0];
    soundFx.playChime(780, 0.15);
    setCartAnimationKey((k) => k + 1);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === chosenVariant.id
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, quantity, selectedVariant: chosenVariant }];
      }
    });

    const isFa = language === 'fa';
    const prodTitle = isFa && product.nameFa ? product.nameFa : product.name;
    const variantTitle = chosenVariant.name;

    addToast(
      isFa ? 'به سبد خرید اضافه شد' : 'Added to Cart',
      isFa
        ? `${quantity} عدد از «${prodTitle}» (${variantTitle}) با موفقیت به سبد خرید افزوده شد.`
        : `${quantity}x ${product.name} (${variantTitle}) added to your session.`,
      'add',
      product.image
    );
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    soundFx.playTick(450);
    const existingIndex = cart.findIndex(
      (item) => item.product.id === productId && (!variantId || item.selectedVariant.id === variantId)
    );

    if (existingIndex > -1) {
      const itemToRemove = cart[existingIndex];
      setLastRemovedItem({ item: itemToRemove, index: existingIndex });

      setCart((prev) =>
        prev.filter((_, idx) => idx !== existingIndex)
      );

      const isFa = language === 'fa';
      const prodTitle = isFa && itemToRemove.product.nameFa ? itemToRemove.product.nameFa : itemToRemove.product.name;

      addToast(
        isFa ? 'محصول از سبد حذف شد' : 'Item Removed',
        isFa
          ? `«${prodTitle}» از سبد خرید حذف شد. برای بازگرداندن کلیک کنید.`
          : `${itemToRemove.product.name} removed from your cart.`,
        'remove',
        itemToRemove.product.image,
        restoreLastRemoved
      );
    }
  };

  const updateQuantity = (productId: string, delta: number, variantId?: string) => {
    soundFx.playClick(650);
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.product.id === productId && (!variantId || item.selectedVariant.id === variantId)) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    soundFx.playTick(300);
    setCart([]);
    addToast('Cart Cleared', 'All items have been removed.', 'info');
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'VIBE2026' || clean === 'AWWWARDS' || clean === 'PROMO20') {
      soundFx.playChime(880, 0.25);
      setCouponCode(clean);
      setCouponApplied(true);
      addToast('Promo Applied!', '20% discount granted on your order.', 'coupon');
      return true;
    } else {
      soundFx.playGlitchSound();
      addToast('Invalid Voucher', 'Try coupon code "VIBE2026" or "AWWWARDS"', 'remove');
      return false;
    }
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product.price + item.selectedVariant.priceDelta;
    return acc + unitPrice * item.quantity;
  }, 0);

  const discountRate = couponApplied ? 0.20 : 0;
  const discount = Math.round(subtotal * discountRate);

  // Digital orders have free shipping; physical orders have standard $25 or free if > $500
  const hasPhysical = cart.some((item) => item.product.category === 'PHYSICAL');
  const shipping = hasPhysical ? (subtotal > 500 ? 0 : 25) : 0;
  const tax = Math.round((subtotal - discount) * 0.08); // 8% estimated sales tax
  const total = Math.max(0, subtotal - discount + shipping + tax);

  const completeOrder = (customerData: { name: string; email: string; address: string; paymentMethod: string }): CustomerOrder => {
    soundFx.playChime(950, 0.4);
    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const licenseKeys = cart
      .filter((i) => i.product.category === 'DIGITAL')
      .map((i) => `${i.product.name.substring(0, 4).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`);

    const newOrder: CustomerOrder = {
      orderId,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      tax,
      total,
      customerName: customerData.name,
      customerEmail: customerData.email,
      shippingAddress: customerData.address,
      paymentMethod: customerData.paymentMethod,
      status: 'CONFIRMED',
      licenseKeys,
    };

    setLastOrder(newOrder);
    setOrderHistory((prev) => [newOrder, ...prev]);
    setCart([]);
    setCheckoutStep(4);
    addToast('Order Confirmed!', `Order ${orderId} generated successfully.`, 'coupon');
    return newOrder;
  };

  const formatPrice = (amountInUsd: number): string => {
    switch (currency) {
      case 'USD':
        return `$${amountInUsd.toLocaleString()}`;
      case 'EUR':
        return `€${Math.round(amountInUsd * 0.92).toLocaleString()}`;
      case 'GBP':
        return `£${Math.round(amountInUsd * 0.78).toLocaleString()}`;
      case 'JPY':
        return `¥${Math.round(amountInUsd * 155).toLocaleString()}`;
      case 'BTC':
        return `₿${(amountInUsd * 0.000015).toFixed(4)}`;
      default:
        return `$${amountInUsd.toLocaleString()}`;
    }
  };

  return (
    <StoreContext.Provider
      value={{
        activePage,
        setActivePage,
        activeProductId,
        setActiveProductId,
        products: STORE_PRODUCTS,
        cart,
        cartCount,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        couponCode,
        couponApplied,
        toasts,
        checkoutStep,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        setCheckoutStep,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        addToast,
        dismissToast,
        lastOrder,
        completeOrder,
        currency,
        setCurrency,
        formatPrice,
        orderHistory,
        quickViewProduct,
        setQuickViewProduct,
        theme,
        setTheme,
        toggleTheme,
        language,
        setLanguage,
        direction,
        setDirection,
        toggleLanguage,
        toggleDirection,
        t,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        setSelectedProductId: setActiveProductId,
        cartAnimationKey,
        restoreLastRemoved,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
