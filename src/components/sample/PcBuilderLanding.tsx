import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Cpu,
  HardDrive,
  Layers,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ShoppingBag,
  RotateCw,
  Sliders,
  ChevronDown,
  ArrowRight,
  ArrowLeft,
  Flame,
  Award,
  Box,
  Monitor,
  Fan,
  Activity
} from 'lucide-react';

interface PcBuilderProps {
  onReturnToCatalog?: () => void;
}

export default function PcBuilderLanding({ onReturnToCatalog = () => {} }: PcBuilderProps) {
  const { direction, language, addToCart, formatPrice } = useStore();
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Active customizer tab: Pre-built Packages vs Custom Parts Picker
  const [activeTab, setActiveTab] = useState<'PACKAGES' | 'CUSTOMIZER'>('PACKAGES');
  const [selectedPackageIdx, setSelectedPackageIdx] = useState(0);

  // Scroll stage tracking for 3D Case Assembly
  const [assemblyStep, setAssemblyStep] = useState(7); // default completed
  const [isAssemblyAutoPlaying, setIsAssemblyAutoPlaying] = useState(false);

  // Customizer selections for individual parts
  const [selectedCpu, setSelectedCpu] = useState('i9-14900ks');
  const [selectedGpu, setSelectedGpu] = useState('rtx-4090');
  const [selectedRam, setSelectedRam] = useState('64gb-ddr5');
  const [selectedStorage, setSelectedStorage] = useState('4tb-gen5');
  const [selectedCooler, setSelectedCooler] = useState('kraken-360');
  const [selectedCase, setSelectedCase] = useState('lianli-o11');
  const [selectedPsu, setSelectedPsu] = useState('1600w-titanium');

  // Assembly Components Data
  const ASSEMBLY_PARTS = [
    {
      id: 'step_mobo',
      name: isFa ? 'مادربورد پرچمدار ASUS ROG MAXIMUS Z790 HERO' : 'ASUS ROG MAXIMUS Z790 HERO Motherboard',
      category: isFa ? 'زیرساخت و مدار تغذیه ۲۰+۱ فاز' : 'Platform & 20+1 Power Stages',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'بارگذاری شاسی مادربورد و مسیرهای مسی PCIe 5.0' : 'Elevating PCB chassis & gold contacts',
      desc: isFa ? 'اسکلت اصلی سیستم با هیت‌سینک‌های حجیم آلومینیومی و وای‌فای 7.' : 'The bedrock platform with VRM cooling blocks and Wi-Fi 7.',
    },
    {
      id: 'step_cpu',
      name: isFa ? 'پردازنده Intel Core i9-14900KS (فرکانس 6.2GHz)' : 'Intel Core i9-14900KS Processor (6.2 GHz)',
      category: isFa ? 'هسته پردازشی ۲۴ هسته‌ای ۳۲ رشته‌ای' : '24 Cores / 32 Threads Flagship',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'چرخش و قفل دقیق در سوکت LGA1700' : 'Precise zero-insertion LGA1700 socket lock',
      desc: isFa ? 'نصب سیلیکون انتخابی با خمیر حرارتی فلز مایع Thermal Grizzly.' : 'Hand-binned silicon locked under Thermal Grizzly conductonaut.',
    },
    {
      id: 'step_ram',
      name: isFa ? 'رم G.Skill Trident Z5 RGB 64GB DDR5-7200' : 'G.Skill Trident Z5 RGB 64GB DDR5-7200',
      category: isFa ? 'حافظه پرسرعت با تاخیر CL34' : 'Extreme Memory Profile (XMP 3.0)',
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'لغزیدن از بالا با زاویه نقاله و چفت شدن در اسلات‌ها' : 'Sliding down DIMM channels with audible click',
      desc: isFa ? 'تایمینگ بهینه برای صفر کردن گلوگاه در سنگین‌ترین بازی‌ها.' : 'Low-latency dual channel memory kit with ARGB diffuser strips.',
    },
    {
      id: 'step_ssd',
      name: isFa ? 'اس‌اس‌دی Samsung 990 PRO 4TB PCIe Gen5 NVMe' : 'Samsung 990 PRO 4TB PCIe Gen5 NVMe M.2',
      category: isFa ? 'سرعت خواندن متوالی تا ۱۴,۵۰۰ مگابایت بر ثانیه' : '14,500 MB/s Extreme Read Bandwidth',
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'نصب زیر هیت‌سینک مسی مادربورد' : 'Docked beneath thermal dissipator plate',
      desc: isFa ? 'لودینگ آنی ویندوز و بازی‌ها در کمتر از ۱ ثانیه با DirectStorage.' : 'Sub-second game loads and 4K video scratch disk.',
    },
    {
      id: 'step_gpu',
      name: isFa ? 'کارت گرافیک ASUS ROG Strix GeForce RTX 4090 OC 24GB' : 'ASUS ROG Strix GeForce RTX 4090 OC 24GB',
      category: isFa ? 'غول گرافیکی با معماری Ada Lovelace و DLSS 3.5' : 'Ada Lovelace 16,384 CUDA Cores',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'اتصال به اسلات تقویت‌شده با براکت ضدخمش اختصاصی' : 'PCIe 5.0 slot engagement with anti-sag girder',
      desc: isFa ? 'اجرای تمام بازی‌های روز دنیا با رزولوشن 4K و ریتریسنگ بالای ۱۲۰ اف‌پی‌اس.' : 'Ultimate ray-tracing horsepower with 3.5-slot axial vapor chamber.',
    },
    {
      id: 'step_cooler',
      name: isFa ? 'خنک‌کننده مایع NZXT Kraken Elite 360 RGB LCD' : 'NZXT Kraken Elite 360 RGB AIO Cooler',
      category: isFa ? 'واتربلاک سفارشی با نمایشگر دمای لحظه‌ای' : 'Custom 2.36” LCD Display & Asetek Pump',
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'فرود رادیاتور ۳۶۰ میلی‌متری و لوله‌های بافته‌شده' : 'Dropping liquid block onto CPU heat-spreader',
      desc: isFa ? 'دمای پایدار زیر ۶۵ درجه تحت سنگین‌ترین رندرهای ۲۴ ساعته.' : 'Silent magnetic levitation fans maintaining optimal thermals.',
    },
    {
      id: 'step_psu',
      name: isFa ? 'پاور Corsair AX1600i Titanium 1600W دیجیتال' : 'Corsair AX1600i 1600W Titanium ATX 3.0',
      category: isFa ? 'راندمان ۹۶٪ با خازن‌های ژاپنی ۱۰۵ درجه' : 'GaN Transistor 96% Efficiency',
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'کابل‌کشی کاستوم اسلیو مشکی-طلایی از پشت کیس' : 'CableMod custom paracord sleeved routing',
      desc: isFa ? 'تامین پایدارترین ولتاژ بدون افت با استاندارد بومی 12VHPWR.' : 'Native PCIe Gen 5 16-pin power distribution with zero ripple.',
    },
    {
      id: 'step_case',
      name: isFa ? 'کیس آکواریومی Lian Li O11 Dynamic EVO RGB' : 'Lian Li O11 Dynamic EVO RGB Dual-Chamber',
      category: isFa ? 'محفظه دوگانه شیشه‌ای با نورپردازی ARGB فراگیر' : 'Seamless Panoramic Tempered Glass',
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      elevation: isFa ? 'بسته شدن پنل‌های شیشه‌ای و شکل‌گیری کیس کامل' : 'Final enclosure seal & illumination activation',
      desc: isFa ? 'سیستم آماده بهره‌برداری با روشن شدن ۱۰ فن ARGB و تست پایداری نهایی.' : 'All sub-assemblies united into a monolithic, breath-taking titan workstation.',
    },
  ];

  // Pre-configured Custom Builds
  const PACKAGES = [
    {
      id: 'pkg-titan-4k',
      badge: isFa ? 'پرچمدار اولترا گیمینگ' : 'ULTRA FLAGSHIP',
      name: isFa ? 'پکیج تایتان اولترا ۴K (Titan Beast)' : 'Titan Ultra 4K Gaming Beast',
      specs: 'RTX 4090 OC 24GB • Core i9-14900KS • 64GB DDR5 • 4TB Gen5 SSD',
      powerWattage: '850W Target (1200W PSU)',
      warranty: isFa ? '۳ سال گارانتی تعویض طلایی' : '3-Year Gold Replacement',
      price: 4950,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'اجرای تمام بازی‌های 4K بالای ۱۲۰ اف‌پی‌اس' : '4K Ultra Gaming 120+ FPS Ray-Tracing',
        isFa ? 'اسمبل حرفه‌ای و کابل‌کشی دستی CableMod' : 'Bespoke hand-sleeved cable routing',
        isFa ? 'تست پایداری ۲۴ ساعته پیش از تحویل' : '24h FurMark & MemTest burn-in certified',
      ],
    },
    {
      id: 'pkg-vfx-workstation',
      badge: isFa ? 'رندرینگ و هوش مصنوعی' : 'VFX & AI WORKSTATION',
      name: isFa ? 'ورک‌استیشن رندرر و هوش مصنوعی (Creator Pro)' : 'VFX & AI Neural Workstation',
      specs: 'RTX 4080 Super 16GB • Ryzen 9 7950X • 128GB DDR5 • 8TB NVMe Array',
      powerWattage: '700W Target (1000W PSU)',
      warranty: isFa ? '۳ سال گارانتی تعویض شرکتی' : '3-Year Enterprise SLA',
      price: 3890,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'بهینه‌شده برای Blender, Unreal Engine 5 و Maya' : 'Optimized for Blender, UE5, DaVinci Resolve',
        isFa ? 'پشتیبانی از مدل‌های هوش مصنوعی محلی LLM' : 'High VRAM bandwidth for local LLM inference',
        isFa ? 'خنک‌کنندگی کامپکت و بی‌صدا زیر ۵۰ دسی‌بل' : 'Acoustically dampened under full GPU render',
      ],
    },
    {
      id: 'pkg-esports-budget',
      badge: isFa ? 'بهترین ارزش خرید' : 'BEST VALUE ESPORTS',
      name: isFa ? 'پکیج بالانس رقابتی گیمینگ (Competitive Strike)' : 'Competitive Strike Esports Rig',
      specs: 'RTX 4070 Ti Super • Core i7-14700K • 32GB DDR5 • 2TB NVMe',
      powerWattage: '550W Target (750W PSU)',
      warranty: isFa ? '۲ سال گارانتی تعویض' : '2-Year Standard Warranty',
      price: 2450,
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'نرخ فریم رقابتی +240fps در بازی‌های شوتر' : '240+ FPS Competitive Esports at 1440p',
        isFa ? 'تجهیزات خنک‌کننده کم‌مصرف و بادوام' : 'High airflow dual chamber design',
        isFa ? 'امکان ارتقای آسان قطعات در آینده' : 'Future-proof upgrade path with PCIe 5.0',
      ],
    },
  ];

  // Auto-play assembly demo
  useEffect(() => {
    let interval: any;
    if (isAssemblyAutoPlaying) {
      interval = setInterval(() => {
        setAssemblyStep((prev) => (prev >= ASSEMBLY_PARTS.length - 1 ? 0 : prev + 1));
      }, 1800);
    }
    return () => clearInterval(interval);
  }, [isAssemblyAutoPlaying]);

  // Pricing & Wattage calculations for customizer
  const cpuPrices: Record<string, { price: number; watts: number; name: string }> = {
    'i9-14900ks': { price: 690, watts: 280, name: 'Intel Core i9-14900KS' },
    'i7-14700k': { price: 420, watts: 200, name: 'Intel Core i7-14700K' },
    'r9-7950x3d': { price: 650, watts: 160, name: 'AMD Ryzen 9 7950X3D' },
    'r7-7800x3d': { price: 440, watts: 120, name: 'AMD Ryzen 7 7800X3D' },
  };

  const gpuPrices: Record<string, { price: number; watts: number; name: string }> = {
    'rtx-4090': { price: 2190, watts: 450, name: 'ASUS ROG Strix RTX 4090 24GB' },
    'rtx-4080s': { price: 1190, watts: 320, name: 'Gigabyte AERO RTX 4080 Super 16GB' },
    'rtx-4070tis': { price: 840, watts: 285, name: 'MSI Gaming X Slim RTX 4070 Ti Super' },
    'rx-7900xtx': { price: 990, watts: 355, name: 'Sapphire Nitro+ RX 7900 XTX 24GB' },
  };

  const ramPrices: Record<string, { price: number; name: string }> = {
    '64gb-ddr5': { price: 280, name: '64GB G.Skill Trident Z5 DDR5-7200' },
    '32gb-ddr5': { price: 150, name: '32GB Corsair Dominator DDR5-6000' },
    '128gb-ddr5': { price: 540, name: '128GB Kingston Fury Beast DDR5-5600' },
  };

  const calculatedCustomPrice =
    (cpuPrices[selectedCpu]?.price || 690) +
    (gpuPrices[selectedGpu]?.price || 2190) +
    (ramPrices[selectedRam]?.price || 280) +
    380 + // Motherboard
    290 + // Storage 4TB
    240 + // Cooler 360
    320 + // PSU
    260; // Chassis Lian Li

  const calculatedTotalWatts =
    (cpuPrices[selectedCpu]?.watts || 280) +
    (gpuPrices[selectedGpu]?.watts || 450) +
    120; // Mobo, RAM, fans, SSDs

  const handleOrderPackage = (pkg: typeof PACKAGES[0]) => {
    soundFx.playChime(850, 0.2);
    addToCart(
      {
        id: pkg.id,
        name: pkg.name,
        subtitle: pkg.specs,
        category: 'PHYSICAL',
        subCategory: 'Custom PC Workstation',
        price: pkg.price,
        rating: 4.99,
        reviewsCount: 184,
        inStock: true,
        stockCount: 10,
        image: pkg.image,
        gallery: [pkg.image],
        description: isFa
          ? `سیستم اسمبل‌شده کامل با تست استرس ۲۴ ساعته و ۳ سال گارانتی تعویض قطعات.`
          : 'Fully assembled and benchmark-tested custom PC with 3-year replacement warranty.',
        features: pkg.features,
        specs: {
          'Specifications': pkg.specs,
          'Power Draw': pkg.powerWattage,
          'Warranty': pkg.warranty,
        },
        variants: [
          { id: 'v-complete', name: isFa ? 'کیس کامل اسمبل‌شده' : 'Complete Built Chassis', priceDelta: 0 },
        ],
      },
      1
    );
  };

  const handleOrderCustomConfig = () => {
    soundFx.playChime(850, 0.2);
    addToCart(
      {
        id: `custom-rig-${Date.now()}`,
        name: isFa ? 'سیستم سفارشی مهندسی‌شده آورا' : 'Custom Built Rig Specification',
        subtitle: `${cpuPrices[selectedCpu]?.name} • ${gpuPrices[selectedGpu]?.name} • ${ramPrices[selectedRam]?.name}`,
        category: 'PHYSICAL',
        subCategory: 'Bespoke Custom PC',
        price: calculatedCustomPrice,
        rating: 5.0,
        reviewsCount: 92,
        inStock: true,
        stockCount: 15,
        image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80'],
        description: isFa
          ? 'کانفیگ اختصاصی با قطعات انتخابی مشتری، همراه با کابل‌کشی کاستوم و تست پایداری رایگان.'
          : 'Bespoke hardware configuration assembled and tuned by senior systems engineers.',
        features: [
          isFa ? 'مونتاژ مهندسی با متریال اورجینال و تست فورمارک' : 'Precision mechanical assembly & stress burn-in',
          isFa ? '۳ سال گارانتی تعویض بدون قید و شرط قطعات' : '3-Year comprehensive replacement warranty',
          isFa ? 'ارسال رایگان با بسته‌بندی ضدضربه فوم تزریقی' : 'Insured wooden crate shipping with expandable foam',
        ],
        specs: {
          'Processor': cpuPrices[selectedCpu]?.name || '',
          'Graphics': gpuPrices[selectedGpu]?.name || '',
          'RAM Memory': ramPrices[selectedRam]?.name || '',
          'Estimated Power': `${calculatedTotalWatts}W Max`,
        },
        variants: [
          { id: 'v-custom', name: isFa ? 'پکیج قطعات انتخابی با اسمبل' : 'Custom Assembly Bundle', priceDelta: 0 },
        ],
      },
      1
    );
  };

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#07090e] text-zinc-100 font-['Plus_Jakarta_Sans'] selection:bg-cyan-500 selection:text-black"
    >
      {/* Top Navigation Switcher */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1px] flex items-center justify-center">
            <div className="w-full h-full bg-[#0b0e14] rounded-[7px] flex items-center justify-center">
              <Cpu className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <span className="font-['Syne'] font-black tracking-widest text-sm text-cyan-200">
              اسمبلر سیستم‌های حرفه‌ای <span className="text-cyan-400 font-mono text-xs">/ PC ATELIER</span>
            </span>
            <span className="text-[10px] text-cyan-400/70 block font-mono">
              {isFa ? 'شخصی‌سازی قطعات تکی، پکیج‌های آماده و اسمبل سه‌بعدی کیس' : 'Custom PC Component Customizer & 3D Assembly'}
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            soundFx.playClick(600);
            onReturnToCatalog();
          }}
          className="px-3.5 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
          <span>{isFa ? 'بازگشت به نمایشگاه' : 'Exit to Catalog'}</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Futuristic Laser Grid Backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto w-full text-center space-y-6 relative z-10 py-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-mono text-xs shadow-lg shadow-cyan-950/50">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'تامین مستقیم قطعات اورجینال با هولوگرام معتبر' : 'GENUINE HARDWARE SUPPLY & CUSTOM RIGS'}</span>
          </div>

          <h1 className="font-['Syne'] text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.08] max-w-4xl mx-auto">
            {isFa ? (
              <>
                سیستم رویایی شما؛ <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  مونتاژ مهندسی و اسمبل شاهکار.
                </span>
              </>
            ) : (
              <>
                Engineered Mastery, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
                  Bespoke High-Power PC Builds.
                </span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
            {isFa
              ? 'امکان سفارش قطعات به‌صورت تکی با گارانتی تعویض و یا تحویل کیس کامل آماده با تست استرس ۲۴ ساعته فورمارک، کابل‌کشی مهندسی و خنک‌کاری مایع بهینه.'
              : 'Procure individual tier-1 components or commission a turn-key custom gaming and render workstation with guaranteed thermal stability.'}
          </p>

          {/* Quick Action Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => {
                soundFx.playClick(700);
                const el = document.getElementById('assembly-stage');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Box className="w-4 h-4" />
              <span>{isFa ? 'مشاهده اسمبل مرحله‌به‌مرحله کیس' : 'Experience 3D Scroll Assembly'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                const el = document.getElementById('packages-and-customizer');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-colors flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'انتخاب پکیج‌ها و کانفیگوراتور تکی' : 'Explore Packages & Parts Picker'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D FEATURE CARDS & POSITIVE PILLARS (کارت‌های معرفی سه‌بعدی)          */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/10 relative">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'مزایا و تضمین‌های استودیو اسمبل' : '3D ADVANTAGE PILLARS'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold text-white">
              {isFa ? 'چرا سیستم‌های اسمبل‌شده ما متفاوت‌اند؟' : 'Engineering Excellence Delivered'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {isFa
                ? 'کارت‌های سه‌بعدی زیر استانداردهای سختگیرانه تست و تضمین کیفیت قطعات ما را شرح می‌دهند.'
                : 'Interactive 3D cards detailing our obsessive quality control and thermal benchmarks.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-3xl border border-cyan-500/20 bg-gradient-to-b from-[#0f1422] to-[#080b12] shadow-xl hover:border-cyan-400/60 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-5 group-hover:scale-110 transition-transform">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="font-['Syne'] font-bold text-base text-white mb-2">
                {isFa ? 'تست ۲۴ ساعته فورمارک' : '24h Burn-in Stress Test'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {isFa
                  ? 'هر سیستم قبل از تحویل، تحت بار پردازشی ۱۰۰٪ کارت گرافیک، سی‌پی‌یو و مم‌تست ۸۶ قرار می‌گیرد تا پایداری کامل اثبات شود.'
                  : 'Full GPU FurMark rendering and CPU Prime95 stress cycles to guarantee zero throttling under max load.'}
              </p>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-3xl border border-blue-500/20 bg-gradient-to-b from-[#0f1422] to-[#080b12] shadow-xl hover:border-blue-400/60 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-5 group-hover:scale-110 transition-transform">
                <Fan className="w-6 h-6" />
              </div>
              <h3 className="font-['Syne'] font-bold text-base text-white mb-2">
                {isFa ? 'مدیریت کابل و آیرودینامیک' : 'Custom CableMod Routing'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {isFa
                  ? 'کابل‌های اسلیو دست‌بافت با هدایت دقیق از کانال‌های پشت کیس؛ بدون کوچک‌ترین مانع برای جریان هوای ورودی فن‌ها.'
                  : 'Individually sleeved custom cables routed through rear grommets for clean aesthetics and maximum CFM airflow.'}
              </p>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-3xl border border-indigo-500/20 bg-gradient-to-b from-[#0f1422] to-[#080b12] shadow-xl hover:border-indigo-400/60 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/30 flex items-center justify-center text-indigo-400 mb-5 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-['Syne'] font-bold text-base text-white mb-2">
                {isFa ? '۳ سال گارانتی تعویض فوری' : '3-Year Instant Replacement'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {isFa
                  ? 'در صورت بروز نقص در هر قطعه، بدون معطلی و آزمایش‌های فرسایشی، قطعه نو از انبار تامین و جایگزین می‌گردد.'
                  : 'Zero downtime replacement pledge: defective silicon is swapped directly from our active warehouse inventory.'}
              </p>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#0f1422] to-[#080b12] shadow-xl hover:border-emerald-400/60 hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mb-5 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-['Syne'] font-bold text-base text-white mb-2">
                {isFa ? 'پک اصلی با سریال رسمی' : '100% Sealed Factory Packs'}
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                {isFa
                  ? 'تمامی جعبه‌های خالی و لوازم جانبی قطعات در کنار سیستم اسمبل‌شده به مشتری تحویل داده می‌شود.'
                  : 'All component retail packaging, accessories, and factory warranty certificates dispatched with your build.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. SCROLL-DRIVEN ASSEMBLY STAGE: PARTS ASSEMBLE INTO A FULL CASE           */}
      {/* ========================================================================= */}
      <section id="assembly-stage" className="py-24 px-4 sm:px-6 border-t border-white/10 bg-[#05070a]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'نمایش اسمبل قطعات با اسکرول و تعامل' : 'KINETIC SCROLL ASSEMBLY ENGINE'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white">
              {isFa ? 'از قطعه تا یک کیس کامل و خارق‌العاده' : 'From Silicon to Monolith'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {isFa
                ? 'با جلو رفتن در مراحل اسکرول، هر قطعه با زاویه اختصاصی از پایین و دور بالا آمده و درون شاسی جای می‌گیرد تا یک کیس کامل خلق شود.'
                : 'Step through the mechanical assembly timeline as components ascend, rotate, and dock into a battle-ready rig.'}
            </p>
          </div>

          {/* Step Selector Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-zinc-950/80 border border-white/10">
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {ASSEMBLY_PARTS.map((part, idx) => (
                <button
                  key={part.id}
                  onClick={() => {
                    soundFx.playClick(650);
                    setAssemblyStep(idx);
                  }}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    assemblyStep === idx
                      ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                      : idx < assemblyStep
                      ? 'bg-cyan-950/40 text-cyan-300 border border-cyan-500/20'
                      : 'bg-white/5 text-zinc-500 hover:text-white'
                  }`}
                >
                  {isFa ? `مرحله ۰${idx + 1}` : `STEP 0${idx + 1}`}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                soundFx.playChime(700, 0.15);
                setIsAssemblyAutoPlaying(!isAssemblyAutoPlaying);
              }}
              className="px-4 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
            >
              <Activity className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isAssemblyAutoPlaying ? (isFa ? 'توقف نمایش' : 'Pause') : (isFa ? 'پخش خودکار اسمبل' : 'Auto Play')}</span>
            </button>
          </div>

          {/* Interactive 3D Assembly Stage Viewport */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-[#0c101c] via-[#07090e] to-black shadow-2xl relative overflow-hidden">
            {/* Visual Hardware Hologram Showcase */}
            <div className="lg:col-span-7 flex justify-center items-center relative min-h-[380px]">
              {/* Radial glow background */}
              <div className="absolute w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

              <div className="relative w-full max-w-md h-80 rounded-3xl overflow-hidden border border-white/15 shadow-2xl group">
                <img
                  src={ASSEMBLY_PARTS[assemblyStep].image}
                  alt={ASSEMBLY_PARTS[assemblyStep].name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                />

                {/* HUD Overlay with coordinates */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-xs font-mono text-cyan-400">
                    <span>STAGE 0{assemblyStep + 1} / 08</span>
                    <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded border border-cyan-400/30">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      ALIGNED 100%
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-cyan-300 uppercase tracking-widest block mb-1">
                      {ASSEMBLY_PARTS[assemblyStep].elevation}
                    </span>
                    <h3 className="font-['Syne'] font-bold text-lg text-white">
                      {ASSEMBLY_PARTS[assemblyStep].name}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Detail Specs & Progression */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
                  {ASSEMBLY_PARTS[assemblyStep].category}
                </span>
                <h3 className="font-['Syne'] text-2xl font-bold text-white">
                  {ASSEMBLY_PARTS[assemblyStep].name}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {ASSEMBLY_PARTS[assemblyStep].desc}
                </p>
              </div>

              {/* Assembly Progress Meter */}
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-400">{isFa ? 'پیشرفت اسمبل کیس:' : 'Chassis Integration:'}</span>
                  <span className="text-cyan-400 font-bold">{Math.round(((assemblyStep + 1) / ASSEMBLY_PARTS.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 transition-all duration-500 rounded-full"
                    style={{ width: `${((assemblyStep + 1) / ASSEMBLY_PARTS.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  disabled={assemblyStep === 0}
                  onClick={() => {
                    soundFx.playClick(500);
                    setAssemblyStep((prev) => Math.max(0, prev - 1));
                  }}
                  className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:pointer-events-none text-xs font-mono transition-colors"
                >
                  {isRtl ? 'قطعه قبلی' : 'Previous Part'}
                </button>
                <button
                  disabled={assemblyStep === ASSEMBLY_PARTS.length - 1}
                  onClick={() => {
                    soundFx.playClick(600);
                    setAssemblyStep((prev) => Math.min(ASSEMBLY_PARTS.length - 1, prev + 1));
                  }}
                  className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  {isRtl ? 'قطعه بعدی' : 'Next Part'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRE-BUILT PACKAGES VS CUSTOM PARTS PICKER                               */}
      {/* ========================================================================= */}
      <section id="packages-and-customizer" className="py-24 px-4 sm:px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Main Switcher Tabs */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-2xl bg-zinc-950 border border-white/15 inline-flex gap-2">
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setActiveTab('PACKAGES');
                }}
                className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  activeTab === 'PACKAGES'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{isFa ? '۱. پکیج‌های آماده و مهندسی‌شده' : 'Pre-Built Engineering Bundles'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setActiveTab('CUSTOMIZER');
                }}
                className={`px-6 py-3 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  activeTab === 'CUSTOMIZER'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sliders className="w-4 h-4" />
                <span>{isFa ? '۲. استودیوی شخصی‌سازی قطعات تکی' : 'Custom Parts Picker Configurator'}</span>
              </button>
            </div>
          </div>

          {/* TAB 1: PRE-BUILT BUNDLES */}
          {activeTab === 'PACKAGES' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in duration-300">
              {PACKAGES.map((pkg, i) => (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-white/15 bg-zinc-950/70 overflow-hidden flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold">
                        {pkg.badge}
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="font-['Syne'] font-bold text-lg text-white mb-1">
                          {pkg.name}
                        </h3>
                        <p className="font-mono text-xs text-cyan-400 leading-relaxed">
                          {pkg.specs}
                        </p>
                      </div>

                      <div className="space-y-2 border-t border-white/10 pt-3">
                        {pkg.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 font-mono text-xs text-zinc-400 flex justify-between">
                        <span>{pkg.powerWattage}</span>
                        <span className="text-emerald-400 font-bold">{pkg.warranty}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 border-t border-white/10 bg-black/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-zinc-500 block">{isFa ? 'قیمت پکیج کامل:' : 'Total Turn-key Price:'}</span>
                      <span className="font-mono text-2xl font-black text-cyan-300">
                        {formatPrice(pkg.price)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleOrderPackage(pkg)}
                      className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all hover:scale-105"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{isFa ? 'سفارش پکیج' : 'Order Rig'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: CUSTOM PARTS PICKER CONFIGURATOR */}
          {activeTab === 'CUSTOMIZER' && (
            <div className="p-8 rounded-3xl border border-white/15 bg-gradient-to-b from-[#0b0f1a] to-[#06080d] space-y-8 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-['Syne'] font-bold text-2xl text-white">
                    {isFa ? 'کانفیگوراتور هوشمند قطعات تکی' : 'Interactive Component Configurator'}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    {isFa
                      ? 'قطعات دلخواه خود را گزینش کنید؛ توان مصرفی و محاسبات به صورت بلادرنگ بروزرسانی می‌شود.'
                      : 'Pick your processor, discrete graphics card, and memory kit. Real-time wattage analysis.'}
                  </p>
                </div>

                {/* Live Wattage & Compatibility HUD */}
                <div className="flex items-center gap-4 bg-black/60 border border-cyan-400/30 px-4 py-2.5 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-mono">ESTIMATED POWER</span>
                    <span className="font-mono text-cyan-400 font-black text-base">{calculatedTotalWatts} Watts</span>
                  </div>
                  <div className="border-r border-white/10 h-8" />
                  <div>
                    <span className="text-[10px] text-zinc-400 block font-mono">SOCKET CHECK</span>
                    <span className="font-mono text-emerald-400 font-bold text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> COMPATIBLE
                    </span>
                  </div>
                </div>
              </div>

              {/* Selector Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 1. CPU Selector */}
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5" />
                    <span>{isFa ? 'پردازنده اصلی (CPU):' : 'Central Processing Unit:'}</span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(cpuPrices).map(([key, data]) => (
                      <div
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedCpu(key);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                          selectedCpu === key
                            ? 'border-cyan-400 bg-cyan-950/40 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs">{data.name}</span>
                        <div className="text-right">
                          <span className="font-mono text-xs text-cyan-400 font-bold">{formatPrice(data.price)}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block">{data.watts}W</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. GPU Selector */}
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isFa ? 'کارت گرافیک (GPU):' : 'Graphics Card (GPU):'}</span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(gpuPrices).map(([key, data]) => (
                      <div
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedGpu(key);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                          selectedGpu === key
                            ? 'border-cyan-400 bg-cyan-950/40 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs">{data.name}</span>
                        <div className="text-right">
                          <span className="font-mono text-xs text-cyan-400 font-bold">{formatPrice(data.price)}</span>
                          <span className="text-[10px] text-zinc-500 font-mono block">{data.watts}W</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. RAM Selector */}
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>{isFa ? 'حافظه رم (RAM):' : 'System Memory (RAM):'}</span>
                  </label>
                  <div className="space-y-2">
                    {Object.entries(ramPrices).map(([key, data]) => (
                      <div
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedRam(key);
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer flex justify-between items-center transition-all ${
                          selectedRam === key
                            ? 'border-cyan-400 bg-cyan-950/40 text-white font-bold'
                            : 'border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        <span className="text-xs">{data.name}</span>
                        <span className="font-mono text-xs text-cyan-400 font-bold">{formatPrice(data.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Included Baseline Hardware */}
                <div className="space-y-2">
                  <label className="font-mono text-xs font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{isFa ? 'قطعات تکمیلی پکیج انتخابی:' : 'Included Tier-1 Subsystems:'}</span>
                  </label>
                  <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2 text-xs font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span>ASUS ROG Maximus Z790 HERO:</span>
                      <span className="text-cyan-400">$380</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Samsung 990 PRO 4TB PCIe Gen5:</span>
                      <span className="text-cyan-400">$290</span>
                    </div>
                    <div className="flex justify-between">
                      <span>NZXT Kraken Elite 360 RGB LCD:</span>
                      <span className="text-cyan-400">$240</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Corsair AX1600i Titanium PSU:</span>
                      <span className="text-cyan-400">$320</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lian Li O11 Dynamic EVO RGB:</span>
                      <span className="text-cyan-400">$260</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Total Calculation & CTA */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs text-zinc-400 block">{isFa ? 'مجموع فاکتور قطعات سفارشی با اسمبل رایگان:' : 'Calculated Custom Build Price (Free Assembly):'}</span>
                  <span className="font-mono text-3xl font-black text-cyan-400">
                    {formatPrice(calculatedCustomPrice)}
                  </span>
                </div>

                <button
                  onClick={handleOrderCustomConfig}
                  className="w-full sm:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isFa ? 'ثبت سفارش و صدور پیش‌فاکتور رسمی' : 'Order Custom Configuration'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center border-t border-white/10 font-mono text-xs text-zinc-500">
        &copy; {new Date().getFullYear()} استودیو مهندسی قطعات کامپیوتر آئورا (AURA PC Systems). {isFa ? 'تمامی حقوق محفوظ است.' : 'All Rights Reserved.'}
      </footer>
    </div>
  );
}
