import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Coffee,
  Flame,
  Droplets,
  Wind,
  Sparkles,
  ShoppingBag,
  RotateCcw,
  CheckCircle2,
  Clock,
  Compass,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Layers,
  Thermometer,
  ShieldCheck,
  Star
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Authentic 3D Coffee Bean Procedural Canvas Component
// Realistic 3D Ellipsoid with signature curved central crease/cleft & roast sheen
// ---------------------------------------------------------------------------
function AuthenticCoffeeBean3D({
  scrollY,
  roastColor = '#8b5a2b',
  roastLevel = 'MEDIUM',
  isFa = true,
}: {
  scrollY: number;
  roastColor?: string;
  roastLevel?: 'LIGHT' | 'MEDIUM' | 'DARK';
  isFa?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ isDown: false, startX: 0, startY: 0, dragX: 0, dragY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 340);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Rotation angles driven by scroll + mouse drag + gentle idle tumble
      const rotX = scrollY * 0.003 + mouseRef.current.dragY * 0.01 + Math.sin(time * 0.5) * 0.15;
      const rotY = scrollY * 0.005 + mouseRef.current.dragX * 0.01 + time * 0.6;
      const rotZ = Math.sin(time * 0.3) * 0.1;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Light source vector
      const lx = 0.577;
      const ly = -0.577;
      const lz = 0.577;

      const project = (x: number, y: number, z: number) => {
        // Rot Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        // Rot X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const fov = 320;
        const dist = 380;
        const scale = fov / (dist + z2);

        return {
          px: width / 2 + x1 * scale,
          py: height / 2 + y2 * scale,
          depth: z2,
          scale,
        };
      };

      // Mesh of genuine Coffee Bean with characteristic central curved cleft
      const rings = 24;
      const sectors = 32;
      const a = 64; // width
      const b = 100; // length
      const c = 48; // thickness

      const polygons: {
        points: { px: number; py: number }[];
        depth: number;
        color: string;
        specular: number;
        isCrease: boolean;
      }[] = [];

      // Determine roast base RGB values
      const baseR = roastLevel === 'LIGHT' ? 194 : roastLevel === 'MEDIUM' ? 139 : 66;
      const baseG = roastLevel === 'LIGHT' ? 134 : roastLevel === 'MEDIUM' ? 78 : 36;
      const baseB = roastLevel === 'LIGHT' ? 76 : roastLevel === 'MEDIUM' ? 38 : 18;

      for (let r = 0; r < rings; r++) {
        const phi1 = (r / rings) * Math.PI - Math.PI / 2;
        const phi2 = ((r + 1) / rings) * Math.PI - Math.PI / 2;

        for (let s = 0; s < sectors; s++) {
          const theta1 = (s / sectors) * Math.PI * 2;
          const theta2 = ((s + 1) / sectors) * Math.PI * 2;

          const getPoint = (theta: number, phi: number) => {
            let x = a * Math.cos(phi) * Math.sin(theta);
            let y = b * Math.sin(phi);
            let z = c * Math.cos(phi) * Math.cos(theta);

            // Coffee bean geometry deformation:
            // 1. Flat front face when z > 0
            if (z > 0) {
              z *= 0.88;
            }
            // 2. Iconic central cleft/crease indentation running down the front face (z > 0 and near x = 0)
            const cleftCenter = Math.sin(y / 28) * 12; // curved S-shape cleft
            const distToCleft = Math.abs(x - cleftCenter);

            let isCrease = false;
            if (z > 0 && distToCleft < 20) {
              isCrease = true;
              const depthFactor = (20 - distToCleft) / 20;
              z -= depthFactor * 32 * Math.cos(phi); // deep cleft fissure
            }

            return { x, y, z, isCrease };
          };

          const pt1 = getPoint(theta1, phi1);
          const pt2 = getPoint(theta2, phi1);
          const pt3 = getPoint(theta2, phi2);
          const pt4 = getPoint(theta1, phi2);

          const proj1 = project(pt1.x, pt1.y, pt1.z);
          const proj2 = project(pt2.x, pt2.y, pt2.z);
          const proj3 = project(pt3.x, pt3.y, pt3.z);
          const proj4 = project(pt4.x, pt4.y, pt4.z);

          const avgDepth = (proj1.depth + proj2.depth + proj3.depth + proj4.depth) / 4;

          // Normal estimation
          const nx = Math.sin((theta1 + theta2) / 2) * Math.cos((phi1 + phi2) / 2);
          const ny = Math.sin((phi1 + phi2) / 2);
          const nz = Math.cos((theta1 + theta2) / 2) * Math.cos((phi1 + phi2) / 2);

          // Rotate normal
          const nRotX = nx * cosY - nz * sinY;
          const nRotZ = nz * cosY + nx * sinY;
          const nRotY = ny * cosX - nRotZ * sinX;
          const nFinalZ = nRotZ * cosX + ny * sinX;

          // Backface culling
          if (nFinalZ < -0.1) continue;

          // Diffuse illumination
          const diff = Math.max(0.12, nRotX * lx + nRotY * ly + nFinalZ * lz);

          // Specular highlight for roasted bean oils
          const halfX = lx;
          const halfY = ly;
          const halfZ = lz + 1;
          const halfLen = Math.sqrt(halfX * halfX + halfY * halfY + halfZ * halfZ);
          const spec = Math.pow(Math.max(0, (nRotX * halfX + nRotY * halfY + nFinalZ * halfZ) / halfLen), 18);

          const isCreaseArea = pt1.isCrease || pt2.isCrease || pt3.isCrease;

          let rCol = Math.min(255, Math.floor(baseR * diff + spec * 90));
          let gCol = Math.min(255, Math.floor(baseG * diff + spec * 75));
          let bCol = Math.min(255, Math.floor(baseB * diff + spec * 45));

          if (isCreaseArea) {
            // Dark caramelized cleft groove
            rCol = Math.floor(rCol * 0.32);
            gCol = Math.floor(gCol * 0.25);
            bCol = Math.floor(bCol * 0.2);
          }

          polygons.push({
            points: [proj1, proj2, proj3, proj4],
            depth: avgDepth,
            color: `rgb(${rCol}, ${gCol}, ${bCol})`,
            specular: spec,
            isCrease: isCreaseArea,
          });
        }
      }

      // Sort by depth for correct 3D rendering
      polygons.sort((a, b) => b.depth - a.depth);

      // Render polygon faces
      for (const poly of polygons) {
        ctx.beginPath();
        ctx.moveTo(poly.points[0].px, poly.points[0].py);
        for (let i = 1; i < poly.points.length; i++) {
          ctx.lineTo(poly.points[i].px, poly.points[i].py);
        }
        ctx.closePath();
        ctx.fillStyle = poly.color;
        ctx.fill();

        // Subtle wire line for organic micro-texture
        if (!poly.isCrease) {
          ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollY, roastColor, roastLevel]);

  return (
    <div
      onMouseDown={(e) => {
        mouseRef.current.isDown = true;
        mouseRef.current.startX = e.clientX;
        mouseRef.current.startY = e.clientY;
      }}
      onMouseMove={(e) => {
        if (!mouseRef.current.isDown) return;
        const dx = e.clientX - mouseRef.current.startX;
        const dy = e.clientY - mouseRef.current.startY;
        mouseRef.current.dragX += dx;
        mouseRef.current.dragY += dy;
        mouseRef.current.startX = e.clientX;
        mouseRef.current.startY = e.clientY;
      }}
      onMouseUp={() => {
        mouseRef.current.isDown = false;
      }}
      onMouseLeave={() => {
        mouseRef.current.isDown = false;
      }}
      className="relative w-72 sm:w-80 h-[420px] rounded-3xl p-6 border border-amber-600/40 bg-gradient-to-b from-[#18110b] via-[#0d0906] to-black shadow-2xl flex flex-col justify-between overflow-hidden cursor-grab active:cursor-grabbing select-none group"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center border-b border-amber-900/40 pb-3 z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300 font-bold">
            {isFa ? 'دانه ۳بعدی قهوه با شیار مرکزی' : '3D SPECIALTY COFFEE BEAN'}
          </span>
        </div>
        <span className="font-mono text-[9px] text-amber-400/80 px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30">
          {roastLevel} ROAST
        </span>
      </div>

      {/* 3D Canvas Center */}
      <div className="relative flex-1 flex items-center justify-center my-2">
        <canvas ref={canvasRef} className="w-full h-full" />
        {/* Subtle Specular Glow Ring */}
        <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Bottom Metadata & Gesture Hint */}
      <div className="border-t border-amber-900/40 pt-3 flex items-center justify-between text-[11px] font-mono z-10">
        <span className="text-zinc-400 flex items-center gap-1">
          <Compass className="w-3 h-3 text-amber-400" />
          <span>{isFa ? 'چرخش ۳۶۰° با اسکرول و درگ' : '360° Scroll / Drag Orbit'}</span>
        </span>
        <span className="text-amber-400 font-bold font-mono">
          {isFa ? 'شیار ارگانیک عمیق' : 'Curved Cleft'}
        </span>
      </div>
    </div>
  );
}

interface CoffeeLandingProps {
  onReturnToCatalog?: () => void;
}

export default function CoffeeLanding({ onReturnToCatalog = () => {} }: CoffeeLandingProps) {
  const { direction, language, addToCart, formatPrice } = useStore();
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Scroll tracking
  const [scrollY, setScrollY] = useState(0);
  const [activeRoast, setActiveRoast] = useState<'LIGHT' | 'MEDIUM' | 'DARK'>('MEDIUM');
  const [selectedBlend, setSelectedBlend] = useState<'ETHIOPIA' | 'COLOMBIA' | 'GUATEMALA'>('COLOMBIA');
  const [grindType, setGrindType] = useState<'WHOLE' | 'ESPRESSO' | 'FILTER' | 'FRENCH'>('WHOLE');
  const [bagWeight, setBagWeight] = useState<250 | 500 | 1000>(250);
  const [brewMethod, setBrewMethod] = useState<'V60' | 'AEROPRESS' | 'ESPRESSO' | 'COLDBREW'>('V60');
  const [coffeeGrams, setCoffeeGrams] = useState(20);
  const [isBagHovered, setIsBagHovered] = useState(false);
  const [heroDisplayMode, setHeroDisplayMode] = useState<'3D_BEAN' | 'POUCH_CARD'>('3D_BEAN');
  const [addedAnimation, setAddedAnimation] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Roasting Profiles Data
  const ROAST_PROFILES = {
    LIGHT: {
      temp: '196°C',
      time: '9:45 min',
      color: '#c29a6b',
      title: isFa ? 'برشته‌کاری روشن (Light Roast)' : 'Artisan Light Roast',
      desc: isFa
        ? 'حفظ خلوص اسیدیته میوه‌ای، عطر شکوفه‌های یاسمن و نت‌های مرکباتی زنده با بافت ابریشمی.'
        : 'Preserves floral Jasmine aroma, bright citric mandarin acidity, and crisp tea-like body.',
      radar: { acidity: 95, sweetness: 70, body: 45, aroma: 92, floral: 90, roast: 30 },
    },
    MEDIUM: {
      temp: '208°C',
      time: '11:20 min',
      color: '#8b5a2b',
      title: isFa ? 'برشته‌کاری متوسط (Medium Roast - ۱۲۳ امضا)' : '123 Signature Medium Roast',
      desc: isFa
        ? 'تعادل طلایی شیرینی کارامل پخته، فندق برشته و بافت مخملی با افترتیست طولانی شکلاتی.'
        : 'The golden equilibrium of roasted hazelnut, brown sugar caramel, and balanced cocoa butter finish.',
      radar: { acidity: 65, sweetness: 92, body: 80, aroma: 88, floral: 60, roast: 65 },
    },
    DARK: {
      temp: '224°C',
      time: '13:50 min',
      color: '#422415',
      title: isFa ? 'برشته‌کاری تیره (Dark Roast)' : 'Midnight Velvet Dark Roast',
      desc: isFa
        ? 'بدنه سنگین و کرمای فشرده غلیظ، نت‌های شکلات تلخ ۹۰٪، بلوط برشته و تلخی اعیانی دلپذیر.'
        : 'Full-bodied dark chocolate 90%, toasted oak spice, thick dense crema for powerhouse espresso.',
      radar: { acidity: 25, sweetness: 60, body: 98, aroma: 85, floral: 30, roast: 95 },
    },
  };

  // Blends Data
  const BLENDS = {
    COLOMBIA: {
      name: isFa ? '۱۲۳کافی کلمبیا سوپریمو (Huila 1850m)' : '123 Colombia Supremo (Huila 1850m)',
      price: 24,
      origin: isFa ? 'کلمبیا، هوئیلا • زیرگونه کاستیلو' : 'Huila, Colombia • Castillo Variety',
      altitude: '1,850m ASL',
      process: isFa ? 'شسته (Washed) تخمیر ۴۸ ساعته' : 'Washed, 48h Controlled Fermentation',
      notes: isFa ? ['کارامل سوخته', 'فندق بو داده', 'شکلات شیری'] : ['Toffee Caramel', 'Roasted Hazelnut', 'Milk Chocolate'],
    },
    ETHIOPIA: {
      name: isFa ? '۱۲۳کافی اتیوپی یرگاچف (Yirgacheffe)' : '123 Ethiopia Yirgacheffe (Gedeo Zone)',
      price: 28,
      origin: isFa ? 'اتیوپی، یرگاچف • زیرگونه ارثی بومی' : 'Gedeo, Ethiopia • Heirloom Wild Varietals',
      altitude: '2,100m ASL',
      process: isFa ? 'طبیعی خشک‌شده در آفتاب (Natural Sun-Dried)' : 'Natural Sun-Dried on African Beds',
      notes: isFa ? ['توت‌فرنگی وحشی', 'شکوفه پرتقال', 'عسل وحشی'] : ['Wild Strawberry', 'Orange Blossom', 'Mountain Honey'],
    },
    GUATEMALA: {
      name: isFa ? '۱۲۳کافی گواتمالا آنتیگوا (Antigua Volcanic)' : '123 Guatemala Antigua (Volcanic Soil)',
      price: 26,
      origin: isFa ? 'گواتمالا، خاک آتشفشانی آنتیگوا • بوربون سرخ' : 'Antigua, Guatemala • Red Bourbon Volcanic',
      altitude: '1,650m ASL',
      process: isFa ? 'هانی زرد (Yellow Honey Process)' : 'Yellow Honey Fermented',
      notes: isFa ? ['سیب سرخ پخته', 'دارچین', 'شکلات تلخ'] : ['Spiced Baked Apple', 'Ceylon Cinnamon', 'Dark Cocoa'],
    },
  };

  // Brew Calculations
  const BREW_SPECS = {
    V60: { ratio: 15, temp: '92°C', time: '3:00 min', grind: isFa ? 'متوسط شنی' : 'Medium-Fine' },
    AEROPRESS: { ratio: 12, temp: '88°C', time: '1:45 min', grind: isFa ? 'متوسط ریز' : 'Fine-Medium' },
    ESPRESSO: { ratio: 2, temp: '93.5°C', time: '28 sec', grind: isFa ? 'خیلی ریز نرم' : 'Ultra Fine' },
    COLDBREW: { ratio: 8, temp: '4°C', time: '18 hours', grind: isFa ? 'درشت نمک دریا' : 'Coarse' },
  };

  const calculatedWater = Math.round(coffeeGrams * BREW_SPECS[brewMethod].ratio);
  const currentBlend = BLENDS[selectedBlend];
  const unitPrice = currentBlend.price * (bagWeight === 250 ? 1 : bagWeight === 500 ? 1.85 : 3.4);

  const handleOrderCoffee = () => {
    soundFx.playChime(850, 0.2);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);

    addToCart(
      {
        id: `coffee-123-${selectedBlend.toLowerCase()}`,
        name: currentBlend.name,
        subtitle: `${ROAST_PROFILES[activeRoast].title} • ${bagWeight}g`,
        category: 'PHYSICAL',
        subCategory: '123 Coffee Roastery',
        price: unitPrice,
        rating: 4.99,
        reviewsCount: 318,
        inStock: true,
        stockCount: 50,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=800&q=80'],
        description: isFa
          ? `قهوه اسپشیالتی تک‌خاستگاه با خلوص ۱۰۰٪ عربیکا از برند ۱۲۳کافی. برشته‌کاری تخصصی روز با بسته‌بندی زیپ‌کیپ سوپاپ‌دار.`
          : 'Single-origin 100% Arabica specialty coffee roasted to order with degassing nitrogen barrier valve.',
        features: [
          isFa ? 'دانه ۱۰۰٪ عربیکا اسپشیالتی با اسکور کاپینگ +۸۸' : '100% Specialty Arabica with +88 SCA Cupping score',
          isFa ? 'برشته‌کاری تازه هفتگی با تاریخ درج‌شده روی پاکت' : 'Fresh micro-batch roast with timestamp on package',
          isFa ? 'پاکت متالایز سه لایه با سوپاپ خروج گاز دی‌اکسید کربن' : 'Tri-layer barrier pouch with one-way degassing valve',
        ],
        specs: {
          'Origin': currentBlend.origin,
          'Roast Level': activeRoast,
          'Bag Weight': `${bagWeight} Grams`,
          'Grind Setting': grindType,
        },
        variants: [
          { id: 'v-250', name: `${bagWeight}g Bag (${grindType})`, priceDelta: 0, previewColor: ROAST_PROFILES[activeRoast].color },
        ],
      },
      1
    );
  };

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#070605] text-[#ede8e1] font-['Plus_Jakarta_Sans'] selection:bg-amber-600 selection:text-white"
    >
      {/* Top Floating Bar for Sample Switcher & Return */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#070605]/85 border-b border-amber-900/30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-400 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0a08] rounded-[7px] flex items-center justify-center">
              <Coffee className="w-4 h-4 text-amber-400" />
            </div>
          </div>
          <div>
            <span className="font-['Syne'] font-black tracking-widest text-sm text-amber-200">
              ۱۲۳ کافی <span className="text-amber-500 font-mono text-xs">/ 123 COFFEE</span>
            </span>
            <span className="text-[10px] text-amber-400/70 block font-mono">
              {isFa ? 'لندینگ پیج تعاملی با افکت اسکرول محصول' : 'Scroll-Driven Specialty Coffee Experience'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              onReturnToCatalog();
            }}
            className="px-3.5 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isFa ? 'بازگشت به نمایشگاه' : 'Exit to Catalog'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION: FLOATING BEANS & PARALLAX VAPORS ON SCROLL              */}
      {/* ========================================================================= */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Ambient Dark Espresso Glow Backdrop */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-amber-900/30 via-amber-600/15 to-transparent blur-3xl" />
        </div>

        {/* Parallax Floating Coffee Beans Simulation */}
        <div
          className="absolute top-12 left-10 w-16 h-10 rounded-full border border-amber-800/40 bg-gradient-to-br from-amber-900/60 to-black/80 blur-[1px] rotate-45 transition-transform duration-500 ease-out pointer-events-none"
          style={{ transform: `translateY(${scrollY * -0.3}px) rotate(${scrollY * 0.1 + 45}deg)` }}
        />
        <div
          className="absolute top-1/3 right-12 w-20 h-12 rounded-full border border-amber-700/30 bg-gradient-to-br from-[#3d2314] to-black/90 rotate-[-25deg] transition-transform duration-500 ease-out pointer-events-none"
          style={{ transform: `translateY(${scrollY * -0.5}px) rotate(${scrollY * -0.08 - 25}deg)` }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-12 h-8 rounded-full border border-amber-600/40 bg-[#29170e] rotate-[75deg] transition-transform duration-500 ease-out pointer-events-none"
          style={{ transform: `translateY(${scrollY * 0.25}px) rotate(${scrollY * 0.15 + 75}deg)` }}
        />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 py-12">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'برند تخصصی روست و تامین قهوه • ۱۲۳کافی' : '123 COFFEE • BESPOKE BEAN ROASTERY'}</span>
            </div>

            <h1 className="font-['Syne'] text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
              {isFa ? (
                <>
                  یک فنجان بیداری، <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
                    صد ثانیه آرامش محض.
                  </span>
                </>
              ) : (
                <>
                  One Breath Awakening, <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-600">
                    Pure Liquid Alchemy.
                  </span>
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-zinc-300/90 max-w-xl leading-relaxed font-light">
              {isFa
                ? 'دانه‌های دستچین مزارع آتشفشانی آمریکای لاتین و اتیوپی، برشته‌شده با پروفایل حرارتی الگوریتمی و آسیاب دقیق در لحظه سفارش. تجربه‌ای متفاوت از تلخی اصیل و شیرینی میوه‌ای.'
                : 'Single-origin microlots cultivated in high-altitude volcanic soils, batch-roasted with algorithmic PID curves and precision ground upon dispatch.'}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-md mx-auto lg:mx-0">
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-center">
                <span className="font-mono text-lg font-black text-amber-400 block">+۸۹</span>
                <span className="text-[10px] text-zinc-400">{isFa ? 'اسکور کاپینگ SCA' : 'SCA Cupping'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-center">
                <span className="font-mono text-lg font-black text-amber-400 block">۱۰۰٪</span>
                <span className="text-[10px] text-zinc-400">{isFa ? 'عربیکا اصیل' : 'Pure Arabica'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-amber-950/30 border border-amber-900/40 text-center">
                <span className="font-mono text-lg font-black text-amber-400 block">۲۴h</span>
                <span className="text-[10px] text-zinc-400">{isFa ? 'ارسال پس از روست' : 'Roast to Door'}</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => {
                  soundFx.playClick(700);
                  const el = document.getElementById('coffee-customizer');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-amber-600/30 transition-all hover:scale-105 flex items-center gap-2"
              >
                <Coffee className="w-4 h-4" />
                <span>{isFa ? 'شخصی‌سازی و سفارش بسته' : 'Customize 123 Blend'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(500);
                  const el = document.getElementById('roast-spectrum');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-xl border border-amber-500/30 bg-white/5 hover:bg-white/10 text-amber-200 font-mono text-xs transition-colors flex items-center gap-2"
              >
                <span>{isFa ? 'مشاهده طیف برشته‌کاری با اسکرول' : 'Explore Roasting Journey'}</span>
                <ChevronDown className="w-4 h-4 animate-bounce" />
              </button>
            </div>
          </div>

          {/* Right: 3D Specialty Coffee Bean & Pouch Showcase */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* View Mode Toggle Pill: Authentic 3D Bean vs Specialty Bag */}
            <div className="mb-4 p-1 rounded-2xl bg-black/80 border border-amber-500/30 flex items-center gap-1 z-20 shadow-xl backdrop-blur-md">
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setHeroDisplayMode('3D_BEAN');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  heroDisplayMode === '3D_BEAN'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Coffee className="w-3.5 h-3.5" />
                <span>{isFa ? 'دانه ۳بعدی قهوه با شیار' : '3D Coffee Bean'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setHeroDisplayMode('POUCH_CARD');
                }}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  heroDisplayMode === 'POUCH_CARD'
                    ? 'bg-amber-400 text-black shadow-md shadow-amber-500/30'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>{isFa ? 'پاکت قهوه ۲۵۰ گرمی' : 'Specialty Pouch'}</span>
              </button>
            </div>

            {/* Steam Aura SVG particles */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-32 h-28 pointer-events-none opacity-60">
              <svg viewBox="0 0 100 100" className="w-full h-full stroke-amber-400/40 fill-none stroke-[2]">
                <path d="M 30 90 Q 20 60 40 40 T 35 10" className="animate-pulse" />
                <path d="M 50 90 Q 60 60 45 40 T 55 10" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                <path d="M 70 90 Q 60 60 75 40 T 70 10" className="animate-pulse" style={{ animationDelay: '0.8s' }} />
              </svg>
            </div>

            {heroDisplayMode === '3D_BEAN' ? (
              <AuthenticCoffeeBean3D
                scrollY={scrollY}
                roastColor={ROAST_PROFILES[activeRoast].color}
                roastLevel={activeRoast}
                isFa={isFa}
              />
            ) : (
              /* Interactive 3D Coffee Pouch Card */
              <div
                onMouseEnter={() => {
                  soundFx.playChime(650, 0.1);
                  setIsBagHovered(true);
                }}
                onMouseLeave={() => setIsBagHovered(false)}
                className="relative w-72 sm:w-80 h-[420px] rounded-3xl p-6 border border-amber-600/40 bg-gradient-to-b from-[#1c130d] via-[#100a07] to-black shadow-2xl transition-all duration-500 flex flex-col justify-between overflow-hidden group"
                style={{
                  transform: isBagHovered ? 'perspective(1000px) rotateY(8deg) rotateX(4deg) scale(1.03)' : 'perspective(1000px)',
                }}
              >
                {/* Gold Valve on Pouch Top */}
                <div className="flex justify-between items-center border-b border-amber-900/40 pb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-amber-400">123 SPECIALTY</span>
                  </div>
                  {/* One-way Aroma Valve */}
                  <div className="w-6 h-6 rounded-full border border-amber-500/60 bg-amber-950 flex items-center justify-center shadow-inner" title="One-Way Gas Valve">
                    <Wind className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                  </div>
                </div>

                {/* Pouch Label Content */}
                <div className="space-y-4 my-auto text-center py-4">
                  <div className="w-20 h-20 rounded-2xl mx-auto bg-gradient-to-tr from-amber-600 to-amber-300 p-0.5 shadow-xl shadow-amber-950/60 flex items-center justify-center">
                    <div className="w-full h-full rounded-[14px] bg-[#0c0806] flex items-center justify-center flex-col">
                      <span className="font-['Syne'] font-black text-2xl text-amber-300">۱۲۳</span>
                      <span className="font-mono text-[8px] text-amber-400/80 uppercase tracking-widest">COFFEE</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-['Syne'] font-bold text-lg text-white">
                      {currentBlend.name.split(' (')[0]}
                    </h3>
                    <span className="font-mono text-xs text-amber-400/90 block mt-0.5">
                      {currentBlend.altitude} &bull; {currentBlend.origin.split(' •')[0]}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {currentBlend.notes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] bg-amber-950/60 border border-amber-500/30 text-amber-200"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom Pouch Metadata */}
                <div className="border-t border-amber-900/40 pt-4 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">WEIGHT: <strong className="text-white">{bagWeight}g</strong></span>
                  <span className="text-amber-400 font-bold">{formatPrice(unitPrice)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. ROASTING SPECTRUM ON SCROLL: LIGHT -> MEDIUM -> DARK                   */}
      {/* ========================================================================= */}
      <section id="roast-spectrum" className="py-24 px-4 sm:px-6 border-t border-amber-900/30 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'کالبدشکافی فرآیند برشته‌کاری حرارتی' : 'SCROLL-DRIVEN ROAST DYNAMICS'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white">
              {isFa ? 'طیف برشته‌کاری ۱۲۳کافی' : 'The Spectrum of Roasting'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
              {isFa
                ? 'درجه حرارت و زمان برشته‌کاری، تعیین‌کننده واکنش مایارد و قندهای کاراملی دانه قهوه هستند. روی گزینه‌ها کلیک کرده یا در صفحه اسکرول کنید.'
                : 'From First Crack citrus brightness to deep dark cacao sweetness, explore the thermal spectrum.'}
            </p>
          </div>

          {/* Interactive Roast Level Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(['LIGHT', 'MEDIUM', 'DARK'] as const).map((r) => {
              const profile = ROAST_PROFILES[r];
              const isSelected = activeRoast === r;
              return (
                <div
                  key={r}
                  onClick={() => {
                    soundFx.playClick(650);
                    setActiveRoast(r);
                  }}
                  className={`p-6 rounded-3xl border cursor-pointer transition-all duration-300 relative ${
                    isSelected
                      ? 'border-amber-400 bg-amber-950/30 shadow-xl shadow-amber-950/50 scale-[1.02]'
                      : 'border-white/10 bg-white/[0.02] hover:border-amber-700/50'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span
                      className="w-8 h-8 rounded-full border border-black/40 shadow-md"
                      style={{ backgroundColor: profile.color }}
                    />
                    <div className="flex items-center gap-1.5 font-mono text-xs text-amber-400 bg-amber-950/60 px-2.5 py-1 rounded-lg border border-amber-500/20">
                      <Thermometer className="w-3 h-3" />
                      <span>{profile.temp}</span>
                    </div>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                    {profile.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                    {profile.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex justify-between items-center font-mono text-[11px] text-zinc-500">
                    <span>{isFa ? 'زمان حرارت‌دهی:' : 'Roast Time:'}</span>
                    <span className="text-zinc-300 font-bold">{profile.time}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sensory Flavor Radar Representation */}
          <div className="p-8 rounded-3xl border border-amber-900/40 bg-gradient-to-br from-[#120c09] to-black">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold">
                  {isFa ? 'پروفایل چشایی و رادار طعم' : 'CUPPING FLAVOR PROFILE RADAR'}
                </span>
                <h3 className="font-['Syne'] text-2xl font-bold text-white">
                  {ROAST_PROFILES[activeRoast].title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light">
                  {isFa
                    ? 'این آنالیز توسط متخصصان دارنده مدرک Q-Grader ثبت شده و شاخص‌های اسیدیته، عطر، بدنه، شیرینی و ته‌مزه را به تصویر می‌کشد.'
                    : 'Certified Q-Grader cupping calibration mapping balance, sweetness, mouthfeel, and citric acidity.'}
                </p>
              </div>

              {/* 6-Axis Visual Bars */}
              <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.entries(ROAST_PROFILES[activeRoast].radar).map(([metric, score]) => (
                  <div key={metric} className="p-3.5 rounded-2xl bg-black/50 border border-white/10 space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="capitalize text-zinc-300 font-bold">
                        {metric === 'acidity'
                          ? (isFa ? 'اسیدیته میوه‌ای' : 'Acidity')
                          : metric === 'sweetness'
                          ? (isFa ? 'شیرینی کاراملی' : 'Sweetness')
                          : metric === 'body'
                          ? (isFa ? 'غلظت و بدنه' : 'Body')
                          : metric === 'aroma'
                          ? (isFa ? 'عطر و بو' : 'Aroma')
                          : metric === 'floral'
                          ? (isFa ? 'نوت‌های گلی' : 'Floral')
                          : (isFa ? 'درجه روست' : 'Roast Depth')}
                      </span>
                      <span className="font-mono text-amber-400 font-bold text-[11px]">{score}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-700"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. BREWING LAB & EXTRACTION RATIO CALCULATOR                              */}
      {/* ========================================================================= */}
      <section className="py-24 px-4 sm:px-6 border-t border-amber-900/30 bg-[#060504]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <Droplets className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'محاسبه‌گر دم‌آوری و نسبت استخراج' : 'THE BREW RATIO LAB'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white">
              {isFa ? 'عصاره‌گیری بی‌نقص در خانه' : 'Dial In Your Pour'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {isFa
                ? 'متد دم‌آوری خود را انتخاب کنید، گرم قهوه را مشخص کنید تا هوشمندانه مقدار آب و زمان‌بندی دم‌آوری را دریافت نمایید.'
                : 'Select your brew gadget and coffee dose to calculate precision water weight and pour times.'}
            </p>
          </div>

          {/* Interactive Brew Calculator Tool */}
          <div className="p-8 rounded-3xl border border-amber-900/40 bg-zinc-950/80 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Method Selector */}
              <div className="lg:col-span-6 space-y-4">
                <label className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                  {isFa ? 'انتخاب روش دم‌آوری قهوه:' : 'Choose Brew Method:'}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(['V60', 'AEROPRESS', 'ESPRESSO', 'COLDBREW'] as const).map((m) => (
                    <button
                      key={m}
                      onClick={() => {
                        soundFx.playClick(600);
                        setBrewMethod(m);
                      }}
                      className={`p-4 rounded-2xl border text-right transition-all ${
                        brewMethod === m
                          ? 'border-amber-400 bg-amber-950/40 text-white font-bold'
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs text-amber-400 font-bold">{m}</span>
                        <span className="text-[10px] text-zinc-500 font-mono">1:{BREW_SPECS[m].ratio}</span>
                      </div>
                      <span className="text-xs block">
                        {m === 'V60'
                          ? (isFa ? 'پوراوور V60 فیلتری' : 'V60 Pour-Over')
                          : m === 'AEROPRESS'
                          ? (isFa ? 'آئروپرس تحت فشار' : 'AeroPress Rapid')
                          : m === 'ESPRESSO'
                          ? (isFa ? 'دستگاه اسپرسو ساز' : 'Espresso Machine')
                          : (isFa ? 'کلد برو عصاره سرد' : 'Cold Brew Infusion')}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Grams Range Slider */}
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-300 font-bold">{isFa ? 'وزن پودر قهوه (گرم):' : 'Coffee Dose (Grams):'}</span>
                    <span className="font-mono text-amber-400 text-sm font-black">{coffeeGrams} g</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={coffeeGrams}
                    onChange={(e) => setCoffeeGrams(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

              {/* Right: Calculated Extraction Output */}
              <div className="lg:col-span-6 p-6 rounded-2xl bg-black/60 border border-amber-900/30 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-center">
                    <span className="text-[11px] text-zinc-400 block mb-1">{isFa ? 'میزان آب مورد نیاز' : 'Target Water'}</span>
                    <span className="font-mono text-2xl font-black text-amber-300">{calculatedWater} ml</span>
                  </div>
                  <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/20 text-center">
                    <span className="text-[11px] text-zinc-400 block mb-1">{isFa ? 'دمای بهینه آب' : 'Water Temp'}</span>
                    <span className="font-mono text-2xl font-black text-amber-300">{BREW_SPECS[brewMethod].temp}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="flex justify-between items-center p-2.5 rounded-lg border border-white/10 bg-white/5">
                    <span className="text-zinc-400">{isFa ? 'درجه آسیاب:' : 'Grind Size:'}</span>
                    <span className="text-amber-300 font-bold">{BREW_SPECS[brewMethod].grind}</span>
                  </div>
                  <div className="flex justify-between items-center p-2.5 rounded-lg border border-white/10 bg-white/5">
                    <span className="text-zinc-400">{isFa ? 'زمان عصاره‌گیری:' : 'Brew Time:'}</span>
                    <span className="text-amber-300 font-bold">{BREW_SPECS[brewMethod].time}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>
                    {isFa
                      ? 'برای بهترین طعم، از آب تصفیه شده با TDS حدود ۱۲۰ و دمای یکنواخت استفاده فرمایید.'
                      : 'Use filtered water with ~120 TDS for optimum extraction and clear flavor clarity.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. COFFEE CUSTOMIZER & DIRECT ORDER MODULE                               */}
      {/* ========================================================================= */}
      <section id="coffee-customizer" className="py-24 px-4 sm:px-6 border-t border-amber-900/30">
        <div className="max-w-5xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/70 border border-amber-500/30 text-amber-300 font-mono text-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'سفارش آنلاین بسته اختصاصی' : 'BESPOKE BATCH ORDER'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white">
              {isFa ? 'بسته قهوه ۱۲۳کافی خود را بسازید' : 'Craft Your Fresh Bag'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {isFa
                ? 'خاستگاه دانه، وزن بسته و درجه آسیاب را متناسب با دستگاه خود مشخص کنید تا تازه برشته‌شده ارسال شود.'
                : 'Select bean origin, package net weight, and grind type. Roasted within 24 hours of dispatch.'}
            </p>
          </div>

          <div className="p-8 rounded-3xl border border-amber-900/40 bg-gradient-to-b from-[#140d09] to-black space-y-8">
            {/* Step 1: Select Origin Blend */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                {isFa ? '۱. انتخاب خاستگاه دانه قهوه:' : '1. Select Single-Origin Variety:'}
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(['COLOMBIA', 'ETHIOPIA', 'GUATEMALA'] as const).map((bKey) => {
                  const b = BLENDS[bKey];
                  const isChosen = selectedBlend === bKey;
                  return (
                    <button
                      key={bKey}
                      onClick={() => {
                        soundFx.playClick(650);
                        setSelectedBlend(bKey);
                      }}
                      className={`p-5 rounded-2xl border text-right transition-all ${
                        isChosen
                          ? 'border-amber-400 bg-amber-950/40 shadow-lg'
                          : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <h4 className="font-bold text-sm text-white mb-1">{b.name.split(' (')[0]}</h4>
                      <span className="text-[11px] text-amber-300 font-mono block">{b.altitude}</span>
                      <span className="text-[10px] text-zinc-400 block mt-1">{b.origin}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Package Weight */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                {isFa ? '۲. وزن بسته:' : '2. Bag Size Net Weight:'}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {([250, 500, 1000] as const).map((wt) => (
                  <button
                    key={wt}
                    onClick={() => {
                      soundFx.playClick(600);
                      setBagWeight(wt);
                    }}
                    className={`py-3 rounded-xl border text-center font-mono text-xs transition-all ${
                      bagWeight === wt
                        ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-bold'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {wt} {isFa ? 'گرم' : 'Grams'}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Grind Type */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-amber-400 uppercase tracking-wider block">
                {isFa ? '۳. درجه آسیاب قهوه:' : '3. Precision Grind Level:'}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {(
                  [
                    { id: 'WHOLE', label: isFa ? 'دانه کامل (بدون آسیاب)' : 'Whole Bean' },
                    { id: 'ESPRESSO', label: isFa ? 'آسیاب اسپرسو' : 'Espresso Fine' },
                    { id: 'FILTER', label: isFa ? 'آسیاب فیلتری / دمی' : 'Filter / Drip' },
                    { id: 'FRENCH', label: isFa ? 'آسیاب درشت فرنچ پرس' : 'French Press' },
                  ] as const
                ).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      soundFx.playClick(600);
                      setGrindType(g.id);
                    }}
                    className={`py-3 px-2 rounded-xl border text-center text-xs transition-all ${
                      grindType === g.id
                        ? 'border-amber-400 bg-amber-950/40 text-amber-300 font-bold'
                        : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price & Add to Cart Action */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs text-zinc-400 block">{isFa ? 'قیمت کل بسته سفارشی:' : 'Total Package Price:'}</span>
                <span className="font-mono text-3xl font-black text-amber-400">
                  {formatPrice(unitPrice)}
                </span>
              </div>

              <button
                onClick={handleOrderCoffee}
                className={`w-full sm:w-auto px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
                  addedAnimation
                    ? 'bg-emerald-500 text-black scale-105 shadow-xl shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black shadow-xl shadow-amber-600/30 hover:scale-105'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>
                  {addedAnimation
                    ? (isFa ? 'به سبد خرید اضافه شد!' : 'Added to Session!')
                    : (isFa ? 'افزودن به سبد خرید • ۱۲۳کافی' : 'Add 123 Coffee to Cart')}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-amber-950/40 font-mono text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} ۱۲۳کافی (123 Coffee Atelier). {isFa ? 'تمامی حقوق محفوظ است.' : 'All Rights Reserved.'}
      </footer>
    </div>
  );
}
