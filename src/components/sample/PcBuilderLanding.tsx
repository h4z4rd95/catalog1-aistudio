import React, { useState, useEffect, useRef, useMemo } from 'react';
import { soundFx } from '../../utils/audio';
import { useStore } from '../../context/StoreContext';
import {
  Cpu,
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
  Activity,
  Compass,
  Gauge,
  Volume2,
  Radio,
  Check,
  Copy,
  ExternalLink,
  ChevronRight,
  RefreshCw,
  Sun
} from 'lucide-react';

interface PcBuilderProps {
  onReturnToCatalog?: () => void;
}

// ---------------------------------------------------------------------------
// 3D Tilt Card Component with Mouse Perspective & Dynamic Specular Shine
// ---------------------------------------------------------------------------
function TiltCard3D({
  children,
  className = '',
  intensity = 15,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0, rx: 0, ry: 0, shineX: 50, shineY: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rx = ((y - centerY) / centerY) * -intensity;
    const ry = ((x - centerX) / centerX) * intensity;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setCoords({ x, y, rx, ry, shineX, shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundFx.playTick(1200);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, rx: 0, ry: 0, shineX: 50, shineY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      className={`relative transition-transform duration-200 ease-out select-none ${className}`}
    >
      <div
        style={{
          transform: isHovered
            ? `rotateX(${coords.rx}deg) rotateY(${coords.ry}deg) translateZ(20px)`
            : 'rotateX(0deg) rotateY(0deg) translateZ(0px)',
          transition: isHovered ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
        }}
        className="w-full h-full relative rounded-3xl overflow-hidden shadow-2xl transition-shadow duration-300"
      >
        {/* Dynamic Specular Glare / Shine Effect */}
        <div
          style={{
            background: isHovered
              ? `radial-gradient(circle at ${coords.shineX}% ${coords.shineY}%, rgba(56, 189, 248, 0.25) 0%, rgba(255, 255, 255, 0.08) 30%, transparent 70%)`
              : 'none',
          }}
          className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay transition-opacity duration-300"
        />
        {children}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lidar Terrain / Laser Matrix Interactive Background Canvas
// ---------------------------------------------------------------------------
function LidarMatrixCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    let time = 0;
    const cols = 28;
    const rows = 18;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const cellW = width / cols;
      const cellH = height / rows;

      ctx.lineWidth = 0.7;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * cellW;
          const y = j * cellH;
          const dist = Math.sin(i * 0.3 + time) + Math.cos(j * 0.3 + time * 0.8);
          const zOffset = dist * 12;

          ctx.fillStyle = `rgba(56, 189, 248, ${0.12 + Math.abs(dist) * 0.18})`;
          ctx.beginPath();
          ctx.arc(x + cellW / 2, y + cellH / 2 + zOffset, 1.4 + Math.abs(dist) * 0.8, 0, Math.PI * 2);
          ctx.fill();

          if (i < cols - 1 && j % 2 === 0) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.03 + Math.abs(dist) * 0.04})`;
            ctx.beginPath();
            ctx.moveTo(x + cellW / 2, y + cellH / 2 + zOffset);
            ctx.lineTo((i + 1) * cellW + cellW / 2, y + cellH / 2 + Math.sin((i + 1) * 0.3 + time) * 12);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-40 z-0" />;
}

export default function PcBuilderLanding({ onReturnToCatalog = () => {} }: PcBuilderProps) {
  const { direction, language, addToCart, formatPrice } = useStore();
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Active customizer tab: Pre-built Packages vs Custom Parts Picker
  const [activeTab, setActiveTab] = useState<'PACKAGES' | 'CUSTOMIZER'>('PACKAGES');
  const [assemblyVisualizationMode, setAssemblyVisualizationMode] = useState<'PROTRACTOR' | 'EXPLODED'>('PROTRACTOR');

  // Protractor Arc Angle (0° = sunrise, 90° = zenith / assembly peak, 180° = completed chassis sunset)
  const [protractorAngle, setProtractorAngle] = useState<number>(90);
  const [isProtractorAutoOrbit, setIsProtractorAutoOrbit] = useState<boolean>(false);

  // Exploded View Slider (0% = Assembled Monolith Case, 100% = Deep 3D Exploded Disassembly)
  const [explodedSlider, setExplodedSlider] = useState<number>(0);
  const [activeExplodedPartIdx, setActiveExplodedPartIdx] = useState<number>(0);

  // Active RGB Lighting Theme for PC Rig
  const [rgbTheme, setRgbTheme] = useState<'CYBER_CYAN' | 'ROG_RED' | 'MATRIX_GREEN' | 'ROYAL_GOLD'>('CYBER_CYAN');

  // Customizer selections for individual parts
  const [selectedCpu, setSelectedCpu] = useState('i9-14900ks');
  const [selectedGpu, setSelectedGpu] = useState('rtx-4090');
  const [selectedRam, setSelectedRam] = useState('64gb-ddr5');
  const [selectedStorage, setSelectedStorage] = useState('4tb-gen5');
  const [selectedCooler, setSelectedCooler] = useState('kraken-360');
  const [selectedCase, setSelectedCase] = useState('lianli-o11');
  const [selectedPsu, setSelectedPsu] = useState('1600w-titanium');

  // Detailed PC Parts for Protractor & Exploded Matrix
  const PC_COMPONENTS = [
    {
      id: 'part_chassis',
      name: isFa ? 'کیس آکواریومی Lian Li O11 Dynamic EVO RGB' : 'Lian Li O11 Dynamic EVO RGB Dual-Chamber',
      category: isFa ? 'شاسی و استراکچر بدنه' : 'Chassis & Enclosure',
      angle: 15,
      arcLabel: '۱۵° افق طلوع شاسی',
      offset3D: { x: 0, y: 0, z: -80 },
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'پنل‌های دوگانه شیشه حرارت‌دیده ۴ میلی‌متر با تهویه معکوس' : 'Dual 4mm Tempered Glass Panels with Reverse Flow',
      wattage: 15,
      desc: isFa ? 'بستر اصلی نصب با ساختار ماژولار و محفظه ایزوله پاور و سیم‌کشی.' : 'Aerodynamic dual chamber platform isolating thermals.',
    },
    {
      id: 'part_mobo',
      name: isFa ? 'مادربورد پرچمدار ASUS ROG MAXIMUS Z790 HERO' : 'ASUS ROG MAXIMUS Z790 HERO Motherboard',
      category: isFa ? 'مدار تغذیه و زیرساخت مادر' : 'VRM 20+1 Power Stages',
      angle: 45,
      arcLabel: '۴۵° صعود برد اصلی',
      offset3D: { x: 0, y: 0, z: -30 },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'مدار تغذیه ۲۰+۱ فاز ۹۰ آمپر، وای‌فای ۷ و PCIe 5.0' : '20+1 Teaming Power Stages (90A), Wi-Fi 7 & PCIe 5.0',
      wattage: 50,
      desc: isFa ? 'سپر حرارتی یکپارچه آلومینیومی برای پایدارسازی شدیدترین اورکلاک‌ها.' : 'Massive forged I/O heatsinks with Polymo Lighting array.',
    },
    {
      id: 'part_cpu',
      name: isFa ? 'پردازنده Intel Core i9-14900KS (فرکانس 6.2GHz)' : 'Intel Core i9-14900KS Processor (6.2 GHz)',
      category: isFa ? 'مغز متفکر و هسته محاسباتی' : '24 Cores / 32 Threads Flagship',
      angle: 75,
      arcLabel: '۷۵° قفل سیلیکون در سوکت',
      offset3D: { x: -40, y: -20, z: 20 },
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? '۲۴ هسته (۸ هسته P + ۱۶ هسته E)، ۳۲ رشته با بوست ۶.۲ گیگاهرتز' : '24 Cores (8P+16E), 32 Threads, 6.2 GHz Thermal Velocity',
      wattage: 280,
      desc: isFa ? 'دستچین‌شده‌ترین سیلیکون با خمیر فلز مایع Thermal Grizzly Conductonaut.' : 'Silicon lottery hand-binned under liquid metal dissipation.',
    },
    {
      id: 'part_cooler',
      name: isFa ? 'خنک‌کننده مایع NZXT Kraken Elite 360 LCD RGB' : 'NZXT Kraken Elite 360 RGB AIO Cooler',
      category: isFa ? 'واتربلاک سفارشی و رادیاتور ۳۶۰' : 'Asetek 7th Gen Pump & 2.36” LCD',
      angle: 90,
      arcLabel: '۹۰° اوج خنک‌کاری (زنیت نقاله)',
      offset3D: { x: -60, y: -60, z: 70 },
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'نمایشگر ۲.۳۶ اینچی LCD با نمایش لحظه‌ای دما و گیف انیمیشن' : '60Hz True Color LCD displaying real-time thermals & GIFs',
      wattage: 25,
      desc: isFa ? 'پمپ نسل هفتم Asetek با ۳ فن F120 RGB Core برای خنک نگه داشتن CPU زیر ۶۵ درجه.' : 'Precision copper baseplate maintaining sub-65°C under heavy load.',
    },
    {
      id: 'part_ram',
      name: isFa ? 'رم G.Skill Trident Z5 RGB 64GB DDR5-7200 CL34' : 'G.Skill Trident Z5 RGB 64GB DDR5-7200',
      category: isFa ? 'حافظه موقت فوق پرسرعت' : 'Dual-Channel XMP 3.0 Kit',
      angle: 110,
      arcLabel: '۱۱۰° لغزش ماژول‌های رم',
      offset3D: { x: 40, y: -20, z: 40 },
      image: 'https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'تایمینگ CL34-45-45-115 با هیت‌سینک آلومینیوم مات مشکی' : 'Ultra-low latency CL34 timing with streamlined light bar',
      wattage: 15,
      desc: isFa ? 'پهنای باند خارق‌العاده برای به صفر رساندن گلوگاه فریم‌ریت در بازی‌های شبیه‌ساز.' : 'Eliminates 1% lows in open world physics rendering.',
    },
    {
      id: 'part_ssd',
      name: isFa ? 'اس‌اس‌دی Samsung 990 PRO 4TB PCIe Gen5 NVMe' : 'Samsung 990 PRO 4TB PCIe Gen5 NVMe M.2',
      category: isFa ? 'فضای ذخیره‌سازی فوق سریع' : '14,500 MB/s Sequential Bandwidth',
      angle: 130,
      arcLabel: '۱۳۰° جای‌گیری در اسلات زرهی',
      offset3D: { x: 30, y: 30, z: 10 },
      image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'کنترلر پاسکال سامسونگ با هیت‌سینک نیکلی و ۲ میلیون IOPS' : 'Nickel-coated controller managing sub-second asset streaming',
      wattage: 10,
      desc: isFa ? 'لودینگ آنی ویندوز، نقشه‌های بازی در کمتر از ۱ ثانیه با DirectStorage.' : 'Seamless texture streaming in Next-Gen Unreal Engine 5 games.',
    },
    {
      id: 'part_gpu',
      name: isFa ? 'کارت گرافیک ASUS ROG Strix GeForce RTX 4090 OC 24GB' : 'ASUS ROG Strix GeForce RTX 4090 OC 24GB',
      category: isFa ? 'غول پردازش گرافیک و هوش مصنوعی' : 'Ada Lovelace 16,384 CUDA Cores',
      angle: 150,
      arcLabel: '۱۵۰° اتصال غول گرافیکی',
      offset3D: { x: 0, y: 50, z: 90 },
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'معماری Ada Lovelace با ۲۴ گیگ حافظه GDDR6X و چمبر بخار ۳.۵ اسلاتی' : 'Patented vapor chamber with milled heatspreader & Diecast frame',
      wattage: 450,
      desc: isFa ? 'اجرای تمام بازی‌های 4K با نهایت ری‌تریسینگ بالای ۱۲۰ اف‌پی‌اس و پث‌تریسینگ DLSS 3.5.' : 'Unstoppable rendering muscle with anti-sag brace integration.',
    },
    {
      id: 'part_psu',
      name: isFa ? 'پاور Corsair AX1600i Titanium 1600W ATX 3.0' : 'Corsair AX1600i 1600W Titanium ATX 3.0',
      category: isFa ? 'قلب تپنده و تامین برق تیتانیوم' : 'GaN Transistor 96% Efficiency',
      angle: 170,
      arcLabel: '۱۷۰° تکمیل شریان انرژی و غروب مدار',
      offset3D: { x: 0, y: 70, z: -60 },
      image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80',
      specs: isFa ? 'ترانزیستورهای گالیوم نیترید (GaN)، کابل‌های کاستوم اسلیو مشکی-طلایی' : 'Digital DSP control with custom paracord CableMod sleeving',
      wattage: 1600,
      desc: isFa ? 'ریپل ولتاژ نزدیک به صفر مطلق، تضمین سلامت قطعات در برابر نوسان برق.' : 'Native PCIe 5.0 12VHPWR connector with zero ripple voltage.',
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
      fps: { cyberpunk: '142 FPS', gta6: '120+ FPS', wukong: '135 FPS', cs2: '580 FPS' },
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'اجرای تمام بازی‌های 4K بالای ۱۲۰ اف‌پی‌اس با پث‌تریسینگ کامل' : '4K Ultra Gaming 120+ FPS with Full Path Tracing',
        isFa ? 'اسمبل حرفه‌ای و کابل‌کشی دستی CableMod با هدایت لیزری' : 'Bespoke hand-sleeved cable routing with laser combs',
        isFa ? 'تست پایداری ۲۴ ساعته فورمارک و مم‌تست ۸۶ پیش از تحویل' : '24h FurMark & MemTest86 burn-in certified',
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
      fps: { cyberpunk: '115 FPS', gta6: '95+ FPS', wukong: '110 FPS', cs2: '510 FPS' },
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'بهینه‌شده برای Blender, Unreal Engine 5، داوینچی و مایا' : 'Optimized for Blender, UE5, DaVinci Resolve & Maya',
        isFa ? 'پشتیبانی از مدل‌های هوش مصنوعی محلی LLM با پهنای باند بالا' : 'High VRAM bandwidth for local LLM inference',
        isFa ? 'خنک‌کنندگی کامپکت و بی‌صدا زیر ۵۰ دسی‌بل در رندر طولانی' : 'Acoustically dampened under full 24h GPU render',
      ],
    },
    {
      id: 'pkg-esports-budget',
      badge: isFa ? 'بهترین ارزش خرید رقابتی' : 'BEST VALUE ESPORTS',
      name: isFa ? 'پکیج بالانس رقابتی گیمینگ (Competitive Strike)' : 'Competitive Strike Esports Rig',
      specs: 'RTX 4070 Ti Super • Core i7-14700K • 32GB DDR5 • 2TB NVMe',
      powerWattage: '550W Target (750W PSU)',
      warranty: isFa ? '۲ سال گارانتی تعویض کامل' : '2-Year Standard Warranty',
      price: 2450,
      fps: { cyberpunk: '92 FPS', gta6: '80+ FPS', wukong: '95 FPS', cs2: '460 FPS' },
      image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80',
      features: [
        isFa ? 'نرخ فریم رقابتی +240fps در رزولوشن 1440p بازی‌های شوتر' : '240+ FPS Competitive Esports at 1440p',
        isFa ? 'تجهیزات خنک‌کننده پرقدرت با جریان هوای مستقیم دوگانه' : 'High airflow dual chamber design',
        isFa ? 'امکان ارتقای آسان قطعات با معماری آماده آینده PCIe 5.0' : 'Future-proof upgrade path with PCIe 5.0',
      ],
    },
  ];

  // Auto-Orbit for Protractor Arc
  useEffect(() => {
    let interval: any;
    if (isProtractorAutoOrbit) {
      interval = setInterval(() => {
        setProtractorAngle((prev) => {
          const next = prev + 5;
          return next > 180 ? 0 : next;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isProtractorAutoOrbit]);

  // Pricing & Wattage calculations for customizer
  const cpuPrices: Record<string, { price: number; watts: number; name: string }> = {
    'i9-14900ks': { price: 690, watts: 280, name: 'Intel Core i9-14900KS (6.2 GHz)' },
    'i7-14700k': { price: 420, watts: 200, name: 'Intel Core i7-14700K (5.6 GHz)' },
    'r9-7950x3d': { price: 650, watts: 160, name: 'AMD Ryzen 9 7950X3D (V-Cache)' },
    'r7-7800x3d': { price: 440, watts: 120, name: 'AMD Ryzen 7 7800X3D (Gaming Beast)' },
  };

  const gpuPrices: Record<string, { price: number; watts: number; name: string; fps: number }> = {
    'rtx-4090': { price: 2190, watts: 450, name: 'ASUS ROG Strix RTX 4090 OC 24GB', fps: 145 },
    'rtx-4080s': { price: 1190, watts: 320, name: 'Gigabyte AERO RTX 4080 Super 16GB', fps: 115 },
    'rtx-4070tis': { price: 840, watts: 285, name: 'MSI Gaming X Slim RTX 4070 Ti Super', fps: 95 },
    'rx-7900xtx': { price: 990, watts: 355, name: 'Sapphire Nitro+ RX 7900 XTX 24GB', fps: 120 },
  };

  const ramPrices: Record<string, { price: number; name: string }> = {
    '64gb-ddr5': { price: 280, name: '64GB G.Skill Trident Z5 DDR5-7200 CL34' },
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

  // Find the component closest to current protractor angle
  const activeProtractorPart = useMemo(() => {
    let closest = PC_COMPONENTS[0];
    let minDiff = 999;
    for (const comp of PC_COMPONENTS) {
      const diff = Math.abs(comp.angle - protractorAngle);
      if (diff < minDiff) {
        minDiff = diff;
        closest = comp;
      }
    }
    return closest;
  }, [protractorAngle]);

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
          ? `سیستم اسمبل‌شده کامل با تست استرس ۲۴ ساعته فورمارک، کابل‌کشی کاستوم و ۳ سال گارانتی تعویض قطعات.`
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

  // Theme glow styling
  const themeGlowClass =
    rgbTheme === 'CYBER_CYAN'
      ? 'border-cyan-500/50 shadow-cyan-500/30'
      : rgbTheme === 'ROG_RED'
      ? 'border-rose-500/50 shadow-rose-500/30'
      : rgbTheme === 'MATRIX_GREEN'
      ? 'border-emerald-500/50 shadow-emerald-500/30'
      : 'border-amber-500/50 shadow-amber-500/30';

  const themeTextAccent =
    rgbTheme === 'CYBER_CYAN'
      ? 'text-cyan-400'
      : rgbTheme === 'ROG_RED'
      ? 'text-rose-400'
      : rgbTheme === 'MATRIX_GREEN'
      ? 'text-emerald-400'
      : 'text-amber-400';

  return (
    <div
      dir={direction}
      className="min-h-screen bg-[#07090e] text-zinc-100 font-['Plus_Jakarta_Sans'] selection:bg-cyan-500 selection:text-black overflow-x-hidden relative"
    >
      {/* Dynamic Laser Grid Canvas */}
      <LidarMatrixCanvas />

      {/* Top Navigation Switcher */}
      <div className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-cyan-500/20 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0e14] rounded-[10px] flex items-center justify-center">
              <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-['Syne'] font-black tracking-widest text-sm text-cyan-200">
                اسمبلر مهندسی قطعات و کیس کامپیوتر
              </span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[10px] font-mono text-cyan-300">
                3D KINETIC RIG
              </span>
            </div>
            <span className="text-[10px] text-cyan-400/70 block font-mono">
              {isFa
                ? 'شخصی‌سازی قطعات تکی، پکیج‌های آماده، چرخش زاویه نقاله و اسمبل انفجاری کیس'
                : 'Custom PC Parts Configurator • Protractor Arc & 3D Exploded Monolith Case'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* RGB Theme Selector */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-black/60 border border-white/10">
            <span className="text-[10px] font-mono text-zinc-400 mr-1">RGB SYNC:</span>
            {[
              { id: 'CYBER_CYAN', color: 'bg-cyan-400' },
              { id: 'ROG_RED', color: 'bg-rose-500' },
              { id: 'MATRIX_GREEN', color: 'bg-emerald-400' },
              { id: 'ROYAL_GOLD', color: 'bg-amber-400' },
            ].map((theme) => (
              <button
                key={theme.id}
                onClick={() => {
                  soundFx.playTick(900);
                  setRgbTheme(theme.id as any);
                }}
                className={`w-4 h-4 rounded-full ${theme.color} transition-transform ${
                  rgbTheme === theme.id ? 'ring-2 ring-white scale-125' : 'opacity-60 hover:opacity-100'
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => {
              soundFx.playClick(600);
              onReturnToCatalog();
            }}
            className="px-3.5 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/10"
          >
            {isRtl ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
            <span>{isFa ? 'بازگشت به نمایشگاه' : 'Exit to Catalog'}</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto w-full text-center space-y-6 relative z-10 py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs shadow-lg shadow-cyan-950/60 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>{isFa ? 'تامین مستقیم قطعات اورجینال با هولوگرام و تست استرس ۲۴ ساعته' : 'GENUINE HARDWARE SUPPLY & BESPOKE RIGS'}</span>
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

          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl mx-auto leading-relaxed font-light">
            {isFa
              ? 'امکان سفارش قطعات به‌صورت تکی با ضمانت اصالت و گارانتی تعویض و یا تحویل کیس کامل آماده با تست استرس ۲۴ ساعته فورمارک، کابل‌کشی مهندسی دست‌بافت و خنک‌کاری مایع بهینه.'
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
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs uppercase tracking-wider shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>{isFa ? 'مشاهده مدار نقاله و اسمبل سه‌بعدی' : 'Experience 3D Protractor Assembly'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                const el = document.getElementById('packages-and-customizer');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 text-white font-mono text-xs transition-all hover:border-cyan-400/40 flex items-center gap-2"
            >
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>{isFa ? 'انتخاب پکیج‌ها و کانفیگوراتور تکی' : 'Explore Packages & Parts Picker'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. 3D FEATURE CARDS & POSITIVE PILLARS (کارت‌های معرفی سه‌بعدی واقعی)     */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 border-t border-white/10 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
              <Award className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'کارت‌های تعاملی سه‌بعدی استانداردهای فنی' : '3D ADVANTAGE PILLARS'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold text-white">
              {isFa ? 'چرا سیستم‌های اسمبل‌شده ما بی‌رقیب‌اند؟' : 'Engineering Excellence Delivered'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-light">
              {isFa
                ? 'نشانگر موس را روی کارت‌ها حرکت دهید تا پرسپکتیو سه‌بعدی و انعکاس نور هولوگرافیک را لمس کنید.'
                : 'Move your cursor over each 3D card to experience interactive spatial tilt and holographic shine.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <TiltCard3D>
              <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0f172a] to-[#070b14] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mb-5 shadow-lg shadow-cyan-500/10">
                    <Flame className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                    STANDARDS // 01
                  </span>
                  <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                    {isFa ? 'تست ۲۴ ساعته فورمارک' : '24h Burn-in Stress Test'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {isFa
                      ? 'هر سیستم قبل از تحویل، تحت بار پردازشی ۱۰۰٪ کارت گرافیک در FurMark و مم‌تست ۸۶ رم‌ها قرار می‌گیرد تا پایداری کامل اثبات شود.'
                      : 'Full GPU FurMark rendering and CPU Prime95 stress cycles to guarantee zero throttling under max load.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-cyan-300">
                  <span>{isFa ? 'دمای هسته پایدار:' : 'Thermal Stability:'}</span>
                  <span className="font-bold text-emerald-400">&lt; 65°C</span>
                </div>
              </div>
            </TiltCard3D>

            {/* Card 2 */}
            <TiltCard3D>
              <div className="p-6 rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0f172a] to-[#070b14] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-400/40 flex items-center justify-center text-blue-400 mb-5 shadow-lg shadow-blue-500/10">
                    <Fan className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest block mb-1">
                    AESTHETICS // 02
                  </span>
                  <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                    {isFa ? 'مدیریت کابل CableMod' : 'Laser CableMod Routing'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {isFa
                      ? 'کابل‌های اسلیو دست‌بافت با شانه‌های لیزری آلومینیومی؛ عبور میلی‌متری از کانال‌های پشت کیس بدون کوچک‌ترین مانع برای جریان هوای فن‌ها.'
                      : 'Individually sleeved custom cables routed through rear grommets for clean aesthetics and maximum CFM airflow.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-blue-300">
                  <span>{isFa ? 'جریان هوا:' : 'CFM Airflow:'}</span>
                  <span className="font-bold text-cyan-400">100% Laminar</span>
                </div>
              </div>
            </TiltCard3D>

            {/* Card 3 */}
            <TiltCard3D>
              <div className="p-6 rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#0f172a] to-[#070b14] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-400/40 flex items-center justify-center text-indigo-400 mb-5 shadow-lg shadow-indigo-500/10">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-indigo-400 uppercase tracking-widest block mb-1">
                    WARRANTY // 03
                  </span>
                  <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                    {isFa ? '۳ سال گارانتی تعویض فوری' : '3-Year Instant Replacement'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {isFa
                      ? 'در صورت بروز نقص در هر قطعه، بدون معطلی و آزمایش‌های فرسایشی، قطعه نو مستقیما از انبار مرکزی ما تامین و جایگزین می‌گردد.'
                      : 'Zero downtime replacement pledge: defective silicon is swapped directly from our active warehouse inventory.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-indigo-300">
                  <span>{isFa ? 'پوشش قطعات:' : 'Coverage:'}</span>
                  <span className="font-bold text-emerald-400">Full 36 Months</span>
                </div>
              </div>
            </TiltCard3D>

            {/* Card 4 */}
            <TiltCard3D>
              <div className="p-6 rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-[#0f172a] to-[#070b14] h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mb-5 shadow-lg shadow-emerald-500/10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest block mb-1">
                    AUTHENTICITY // 04
                  </span>
                  <h3 className="font-['Syne'] font-bold text-lg text-white mb-2">
                    {isFa ? 'پک اصلی با سریال رسمی' : '100% Sealed Factory Packs'}
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {isFa
                      ? 'تمامی جعبه‌های خالی و لوازم جانبی و پیچ‌های یدکی همراه سیستم اسمبل‌شده در یک کارتن ایمن تحویل مشتری داده می‌شود.'
                      : 'All component retail packaging, accessories, and factory warranty certificates dispatched with your build.'}
                  </p>
                </div>
                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-emerald-300">
                  <span>{isFa ? 'شفافیت اصالت:' : 'Traceability:'}</span>
                  <span className="font-bold text-emerald-400">Official Barcode</span>
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PROTRACTOR SUNRISE ARC & 3D EXPLODED PC ASSEMBLY STAGE                 */}
      {/* ========================================================================= */}
      <section id="assembly-stage" className="py-24 px-4 sm:px-6 border-t border-white/10 bg-[#05070a]/90 relative z-10">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{isFa ? 'موتور شبیه‌سازی اسمبل با مدار نقاله و افق طلوع خورشید' : 'PROTRACTOR SUNRISE ARC & 3D EXPLODED MATRIX'}</span>
            </div>
            <h2 className="font-['Syne'] text-3xl sm:text-5xl font-black text-white">
              {isFa ? 'از طلوع تک‌تک قطعات تا مونتاژ کیس کامل' : 'From Silicon Horizon to Monolith'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light">
              {isFa
                ? 'قطعات مختلف کامپیوتر همانند طلوع و غروب خورشید روی زاویه ۱۸۰ درجه نقاله حرکت کرده یا با انفجار سه‌بعدی از هم تفکیک شده و سپس در کیس کامل جمع می‌شوند.'
                : 'Experience PC components loading across an orbital 180° protractor horizon or explode into deep 3D isometric layers.'}
            </p>
          </div>

          {/* Mode Switcher: Celestial Arc vs Star Convergence Assembly */}
          <div className="flex justify-center">
            <div className="p-1.5 rounded-2xl bg-zinc-950/90 border border-white/15 inline-flex gap-2">
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setAssemblyVisualizationMode('PROTRACTOR');
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  assemblyVisualizationMode === 'PROTRACTOR'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4" />
                <span>{isFa ? '۱. مدار قوسی طلوع و غروب قطعات (Celestial Arc)' : 'Celestial Orbit Arc'}</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setAssemblyVisualizationMode('EXPLODED');
                }}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 ${
                  assemblyVisualizationMode === 'EXPLODED'
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Box className="w-4 h-4" />
                <span>{isFa ? '۲. همگرایی ستاره‌ای با اسکرول موس (Star Convergence)' : 'Star Convergence Assembly'}</span>
              </button>
            </div>
          </div>

          {/* ===================================================================== */}
          {/* MODE A: CELESTIAL ORBIT ARC (بدون رسم نقاله فیزیکی - مدار قوسی خالص)     */}
          {/* ===================================================================== */}
          {assemblyVisualizationMode === 'PROTRACTOR' && (
            <div className="p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a101f] to-[#04060a] shadow-2xl space-y-8 animate-in fade-in duration-500">
              {/* Celestial Orbit HUD Control Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
                    {protractorAngle}°
                  </div>
                  <div>
                    <h3 className="font-['Syne'] font-bold text-lg text-white">
                      {isFa ? 'مدار قوسی ۱۸۰ درجه طلوع تا تکمیل کیس' : '180° Celestial Orbit Trajectory'}
                    </h3>
                    <span className="font-mono text-xs text-cyan-400">
                      {activeProtractorPart.arcLabel} &bull; {activeProtractorPart.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playChime(700, 0.1);
                      setIsProtractorAutoOrbit(!isProtractorAutoOrbit);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                      isProtractorAutoOrbit
                        ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isProtractorAutoOrbit ? 'animate-spin' : ''}`} />
                    <span>{isProtractorAutoOrbit ? (isFa ? 'توقف گردش خودکار' : 'Pause Orbit') : (isFa ? 'گردش خودکار مدار' : 'Auto Orbit')}</span>
                  </button>
                </div>
              </div>

              {/* Cosmic Orbital Flight Path (Clean Curvature without literal plastic protractor) */}
              <div className="relative py-6 flex flex-col items-center">
                <div className="relative w-full max-w-2xl h-56 flex items-end justify-center overflow-hidden">
                  <svg viewBox="0 0 600 300" className="w-full h-full stroke-cyan-500/40 fill-none overflow-visible">
                    {/* Glowing Horizon Arc Trajectory */}
                    <path
                      d="M 50 280 A 250 250 0 0 1 550 280"
                      strokeWidth="3"
                      stroke="url(#arcGlow)"
                      className="drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]"
                    />
                    <path d="M 50 280 A 250 250 0 0 1 550 280" strokeWidth="1" strokeDasharray="4 6" stroke="rgba(255,255,255,0.4)" />
                    <line x1="50" y1="280" x2="550" y2="280" strokeWidth="1" stroke="rgba(56, 189, 248, 0.2)" />

                    <defs>
                      <linearGradient id="arcGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                        <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#818cf8" stopOpacity="0.3" />
                      </linearGradient>
                    </defs>

                    {/* Milestone nodes along the cosmic arc */}
                    {PC_COMPONENTS.map((comp) => {
                      const rad = (Math.PI / 180) * (180 - comp.angle);
                      const nx = 300 + 250 * Math.cos(rad);
                      const ny = 280 - 250 * Math.sin(rad);
                      const isCurrent = Math.abs(comp.angle - protractorAngle) < 12;

                      return (
                        <g
                          key={comp.id}
                          className="cursor-pointer"
                          onClick={() => {
                            soundFx.playClick(750);
                            setProtractorAngle(comp.angle);
                          }}
                        >
                          <circle cx={nx} cy={ny} r={isCurrent ? 7 : 4} fill={isCurrent ? '#38bdf8' : '#1e293b'} stroke="#38bdf8" strokeWidth="1.5" />
                          <text
                            x={nx}
                            y={ny - 14}
                            fill={isCurrent ? '#38bdf8' : 'rgba(255,255,255,0.5)'}
                            fontSize="9"
                            fontFamily="JetBrains Mono"
                            textAnchor="middle"
                            fontWeight={isCurrent ? 'bold' : 'normal'}
                          >
                            {comp.angle}°
                          </text>
                        </g>
                      );
                    })}

                    {/* Active Celestial Orbit Beacon */}
                    {(() => {
                      const rad = (Math.PI / 180) * (180 - protractorAngle);
                      const targetX = 300 + 250 * Math.cos(rad);
                      const targetY = 280 - 250 * Math.sin(rad);
                      return (
                        <g>
                          <line x1="300" y1="280" x2={targetX} y2={targetY} stroke="rgba(56, 189, 248, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
                          <circle cx={targetX} cy={targetY} r="14" fill="#38bdf8" className="animate-ping opacity-25" />
                          <circle cx={targetX} cy={targetY} r="8" fill="#38bdf8" stroke="#ffffff" strokeWidth="2" />
                        </g>
                      );
                    })()}
                  </svg>

                  {/* Horizon labels */}
                  <div className="absolute bottom-1 left-4 font-mono text-xs text-cyan-400 font-bold">
                    {isFa ? 'طلوع افق قطعات (۰°)' : 'Component Horizon (0°)'}
                  </div>
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 font-mono text-xs text-cyan-300 font-bold bg-black/60 px-3 py-1 rounded-full border border-cyan-400/30">
                    {isFa ? 'اوج مونتاژ (۹۰° زنیت)' : 'Assembly Zenith (90°)'}
                  </div>
                  <div className="absolute bottom-1 right-4 font-mono text-xs text-cyan-400 font-bold">
                    {isFa ? 'اتمام شاسی (۱۸۰°)' : 'Monolith Completion (180°)'}
                  </div>
                </div>

                {/* Range Slider for Protractor Angle */}
                <div className="w-full max-w-xl space-y-2 mt-4">
                  <div className="flex justify-between text-xs font-mono text-zinc-400">
                    <span>{isFa ? 'جابجایی زاویه مدار:' : 'Trajectory Angle:'}</span>
                    <span className="text-cyan-400 font-bold font-mono">{protractorAngle}° DEG</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="180"
                    value={protractorAngle}
                    onChange={(e) => {
                      soundFx.playTick(600 + Number(e.target.value) * 3);
                      setProtractorAngle(Number(e.target.value));
                    }}
                    className="w-full h-2.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>

              {/* Active Component Card Display along the Arc */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/50 p-6 sm:p-8 rounded-3xl border border-white/10">
                <div className="lg:col-span-6 relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-cyan-400/30 group">
                  <img
                    src={activeProtractorPart.image}
                    alt={activeProtractorPart.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent p-6 flex flex-col justify-between">
                    <div className="flex justify-between items-center text-xs font-mono text-cyan-300">
                      <span className="bg-black/80 px-3 py-1 rounded-full border border-cyan-400/30">
                        {activeProtractorPart.arcLabel}
                      </span>
                      <span className="bg-emerald-950/80 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> READY TO MOUNT
                      </span>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block">
                        {activeProtractorPart.category}
                      </span>
                      <h4 className="font-['Syne'] font-bold text-xl text-white">
                        {activeProtractorPart.name}
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 space-y-5">
                  <div className="space-y-1">
                    <span className="font-mono text-xs text-cyan-400 uppercase font-bold">
                      {isFa ? 'مشخصات فنی و استانداردهای این مرحله:' : 'Technical Specifications:'}
                    </span>
                    <h3 className="font-['Syne'] text-2xl font-bold text-white">
                      {activeProtractorPart.name}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {activeProtractorPart.desc}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">{isFa ? 'ویژگی مهندسی:' : 'Key Spec:'}</span>
                      <span className="text-cyan-300 font-bold">{activeProtractorPart.specs}</span>
                    </div>
                    <div className="flex justify-between text-xs font-mono border-t border-white/5 pt-2">
                      <span className="text-zinc-400">{isFa ? 'توان مصرفی تخمینی:' : 'Power Draw:'}</span>
                      <span className="text-amber-400 font-bold">{activeProtractorPart.wattage} Watts</span>
                    </div>
                  </div>

                  {/* Component Navigation Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {PC_COMPONENTS.map((comp) => (
                      <button
                        key={comp.id}
                        onClick={() => {
                          soundFx.playClick(700);
                          setProtractorAngle(comp.angle);
                        }}
                        className={`px-2.5 py-1 rounded-lg font-mono text-[11px] transition-all ${
                          activeProtractorPart.id === comp.id
                            ? 'bg-cyan-400 text-black font-bold'
                            : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                        }`}
                      >
                        {comp.angle}°
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================================================================== */}
          {/* MODE B: STAR CONVERGENCE ASSEMBLY ON MOUSE / TOUCH SCROLL             */}
          {/* (المان‌ها از نوک گوشه‌های ستاره فرضی به مرکز جمع می‌شوند با اسکرول موس)  */}
          {/* ===================================================================== */}
          {assemblyVisualizationMode === 'EXPLODED' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-[#0a101f] to-[#04060a] shadow-2xl space-y-8 animate-in fade-in duration-500">
              {/* Top HUD info */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <h3 className="font-['Syne'] font-bold text-xl text-white">
                      {isFa ? 'همگرایی ستاره‌ای قطعات با اسکرول موس' : 'Star Convergence Assembly'}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">
                    {isFa
                      ? 'با چرخاندن اسکرول موس یا سوایپ لمسی، قطعات از گوشه‌ها به سمت مرکز هدایت می‌شوند تا کیس کامل تشکیل گردد.'
                      : 'Scroll mouse wheel or swipe to converge components from radial star vertices into the central chassis.'}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-black/60 px-4 py-2 rounded-2xl border border-white/10 flex items-center gap-2 font-mono text-xs">
                    <span className="text-zinc-400">{isFa ? 'میزان همگرایی:' : 'CONVERGENCE:'}</span>
                    <span className="text-cyan-400 font-black text-sm">{explodedSlider}%</span>
                  </div>
                  {/* Quick Reset or 100% buttons */}
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setExplodedSlider(explodedSlider >= 90 ? 0 : 100);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all"
                  >
                    {explodedSlider >= 90 ? (isFa ? 'تفکیک مجدد' : 'Explode') : (isFa ? 'اسمبل کامل' : 'Assemble 100%')}
                  </button>
                </div>
              </div>

              {/* STAR CONVERGENCE INTERACTIVE STAGE (DRIVEN BY MOUSE WHEEL SCROLL & TOUCH SWIPE) */}
              <div
                onWheel={(e) => {
                  e.preventDefault();
                  // Smooth wheel scrolling
                  const delta = e.deltaY > 0 ? 6 : -6;
                  setExplodedSlider((prev) => {
                    const next = Math.max(0, Math.min(100, prev + delta));
                    if (Math.abs(next - prev) > 2) soundFx.playTick(450 + next * 4);
                    return next;
                  });
                }}
                onTouchMove={(e) => {
                  // Touch swipe support
                  if (e.touches.length > 0) {
                    const delta = 4;
                    setExplodedSlider((prev) => Math.max(0, Math.min(100, prev + delta)));
                  }
                }}
                className="relative min-h-[520px] sm:min-h-[580px] rounded-3xl bg-radial from-slate-900/90 via-[#060a14] to-black border-2 border-cyan-500/20 overflow-hidden flex items-center justify-center p-4 cursor-ns-resize select-none"
              >
                {/* Scroll Prompt Notice */}
                <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none z-30">
                  <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-mono text-[11px] flex items-center gap-2 shadow-lg">
                    <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
                    <span>
                      {isFa
                        ? 'موس را در این کادر اسکرول کنید (Scroll Down / Up) یا انگشت خود را بکشید'
                        : 'Scroll mouse wheel inside stage to converge/explode hardware'}
                    </span>
                  </div>
                </div>

                {/* Convergence Progress Bar Indicator */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1.5 h-48 bg-white/10 rounded-full overflow-hidden hidden sm:block pointer-events-none">
                  <div
                    className="w-full bg-gradient-to-b from-cyan-400 to-indigo-500 transition-all duration-200"
                    style={{ height: `${explodedSlider}%` }}
                  />
                </div>

                {/* 1. CENTRAL ASSEMBLED CHASSIS MONOLITH (Fades in when explodedSlider >= 85%) */}
                <div
                  style={{
                    opacity: explodedSlider >= 85 ? Math.min(1, (explodedSlider - 85) / 15) : 0,
                    transform: `scale(${explodedSlider >= 85 ? 0.8 + ((explodedSlider - 85) / 15) * 0.2 : 0.6})`,
                    pointerEvents: explodedSlider >= 85 ? 'auto' : 'none',
                    transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
                  }}
                  className="absolute z-20 flex flex-col items-center justify-center text-center max-w-md p-6"
                >
                  {/* Glowing Complete PC Case */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-2 border-cyan-400 shadow-[0_0_50px_rgba(56,189,248,0.45)] mb-4 bg-black/90 group">
                    <img
                      src={PC_COMPONENTS[0].image}
                      alt="Completed Monolith Chassis"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-cyan-400 text-black font-mono text-[10px] font-black uppercase tracking-wider shadow-lg">
                      100% ASSEMBLED
                    </div>
                  </div>

                  {/* PROMINENT USER TURN-KEY NOTICE BANNER (دقیقا مطابق خواسته شما) */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/90 border border-cyan-400/40 backdrop-blur-xl shadow-2xl space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-cyan-300 font-bold text-xs sm:text-sm font-['Syne']">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>
                        {isFa
                          ? 'می‌تونیم پکیج کامل رو براتون خودمون جمع کنیم و تک به تک خرید نکنید!'
                          : 'We can turn-key assemble the complete rig so you don’t have to buy part by part!'}
                      </span>
                    </div>

                    <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
                      {isFa
                        ? 'تیم مهندسی آورا کل قطعات را با خمیر حرارتی فلز مایع، کابل‌کشی دستی CableMod و تست استرس ۲۴ ساعته فورمارک مونتاژ کرده و کیس آماده را همراه گارانتی تعویض ارسال می‌کند.'
                        : 'Our certified hardware engineers assemble, stress-test with FurMark 24h, and dispatch ready-to-game.'}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                      <button
                        onClick={() => handleOrderPackage(PACKAGES[0])}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/30 transition-all flex items-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>{isFa ? 'سفارش کیس کامل با اسمبل رایگان' : 'Order Turn-key Complete Rig'}</span>
                      </button>

                      <button
                        onClick={() => {
                          soundFx.playClick(600);
                          const el = document.getElementById('packages-and-customizer');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="px-3.5 py-2.5 rounded-xl border border-white/20 bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                      >
                        {isFa ? 'شخصی‌سازی قطعات در پکیج' : 'Customize Parts'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. EIGHT CONVERGING HARDWARE COMPONENTS FROM RADIAL STAR VERTICES */}
                {/* (نوک گوشه‌های ستاره فرضی به سمت مرکز جمع می‌شوند همراه با نام زیر آن و قابلیت کلیک برای خرید) */}
                <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                  {PC_COMPONENTS.map((comp, idx) => {
                    // 8-point radial star geometry:
                    const angle = (idx * Math.PI * 2) / 8; // 8 angles: 0, 45, 90, 135, 180, 225, 270, 315 deg
                    // Outer star apex distance:
                    const outerRadius = typeof window !== 'undefined' && window.innerWidth < 640 ? 190 : 250;
                    // Convergence factor: at 0% parts are at outerRadius; at 100% parts converge to 0
                    const convergenceProgress = explodedSlider / 100;
                    const currentRadius = outerRadius * (1 - convergenceProgress);

                    const posX = Math.cos(angle) * currentRadius;
                    const posY = Math.sin(angle) * currentRadius;

                    // When convergence is near 85-100%, parts fade out smoothly into the monolith chassis
                    const opacity = explodedSlider >= 85 ? Math.max(0, 1 - (explodedSlider - 85) / 12) : 1;
                    const scale = 1 - convergenceProgress * 0.25;

                    return (
                      <div
                        key={comp.id}
                        onClick={() => {
                          soundFx.playClick(800);
                          setActiveExplodedPartIdx(idx);
                        }}
                        style={{
                          transform: `translate(${posX}px, ${posY}px) scale(${scale})`,
                          opacity,
                          pointerEvents: opacity > 0.1 ? 'auto' : 'none',
                          transition: 'transform 0.15s ease-out, opacity 0.25s ease-out',
                        }}
                        className="absolute w-36 sm:w-44 flex flex-col items-center cursor-pointer group"
                      >
                        {/* 3D Component Card */}
                        <div
                          className={`w-full p-2 rounded-2xl border backdrop-blur-md transition-all shadow-xl ${
                            activeExplodedPartIdx === idx
                              ? 'border-cyan-400 bg-cyan-950/85 ring-2 ring-cyan-400/50 shadow-cyan-500/40'
                              : 'border-white/15 bg-zinc-950/80 hover:border-cyan-400/40 hover:bg-zinc-900/90'
                          }`}
                        >
                          <div className="relative h-20 sm:h-24 rounded-xl overflow-hidden mb-1.5 bg-black">
                            <img
                              src={comp.image}
                              alt={comp.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-1 right-1 px-1.5 py-0.5 rounded bg-black/80 font-mono text-[8px] text-cyan-300 font-bold border border-white/10">
                              {comp.wattage}W
                            </div>
                          </div>

                          {/* CATEGORY & NAME WRITTEN UNDERNEATH (حرکت هماهنگ با قطعه) */}
                          <div className="text-center px-1">
                            <span className="font-mono text-[8px] text-cyan-400 uppercase tracking-wider block truncate">
                              {comp.category.split(' ')[0]}
                            </span>
                            <h5 className="font-['Syne'] font-bold text-[11px] text-white truncate group-hover:text-cyan-300 transition-colors">
                              {comp.name.split(' (')[0]}
                            </h5>
                          </div>
                        </div>

                        {/* Floating Click-to-Shop Pill Underneath Component */}
                        <div className="mt-1 px-2.5 py-0.5 rounded-full bg-black/80 border border-cyan-500/30 text-[9px] font-mono text-cyan-300 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all shadow-md">
                          {isFa ? 'مشاهده و خرید قطعه' : 'Click to Inspect'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Component Purchase / Spec Details Card */}
              {PC_COMPONENTS[activeExplodedPartIdx] && (
                <div className="p-6 rounded-2xl bg-black/50 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl animate-in fade-in duration-300">
                  <div className="flex items-center gap-4">
                    <img
                      src={PC_COMPONENTS[activeExplodedPartIdx].image}
                      alt={PC_COMPONENTS[activeExplodedPartIdx].name}
                      className="w-16 h-16 rounded-xl object-cover border border-white/15 shrink-0"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-cyan-400 uppercase font-bold">
                          {PC_COMPONENTS[activeExplodedPartIdx].category}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono text-[10px] border border-cyan-500/30">
                          {PC_COMPONENTS[activeExplodedPartIdx].wattage}W TDP
                        </span>
                      </div>
                      <h4 className="font-['Syne'] font-bold text-lg text-white mt-0.5">
                        {PC_COMPONENTS[activeExplodedPartIdx].name}
                      </h4>
                      <p className="text-xs text-zinc-300 mt-1 max-w-xl font-light">
                        {PC_COMPONENTS[activeExplodedPartIdx].specs} &bull; {PC_COMPONENTS[activeExplodedPartIdx].desc}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      soundFx.playChime(800, 0.15);
                      addToCart(
                        {
                          id: PC_COMPONENTS[activeExplodedPartIdx].id,
                          name: PC_COMPONENTS[activeExplodedPartIdx].name,
                          subtitle: PC_COMPONENTS[activeExplodedPartIdx].category,
                          category: 'PHYSICAL',
                          subCategory: 'PC Component',
                          price: 450,
                          rating: 5.0,
                          reviewsCount: 45,
                          inStock: true,
                          stockCount: 8,
                          image: PC_COMPONENTS[activeExplodedPartIdx].image,
                          gallery: [PC_COMPONENTS[activeExplodedPartIdx].image],
                          description: PC_COMPONENTS[activeExplodedPartIdx].desc,
                          features: [PC_COMPONENTS[activeExplodedPartIdx].specs],
                          specs: {
                            'Category': PC_COMPONENTS[activeExplodedPartIdx].category,
                            'Technical Spec': PC_COMPONENTS[activeExplodedPartIdx].specs,
                            'Wattage': `${PC_COMPONENTS[activeExplodedPartIdx].wattage}W`,
                          },
                          variants: [
                            { id: `v-${PC_COMPONENTS[activeExplodedPartIdx].id}`, name: isFa ? 'بسته اورجینال قطعه' : 'Sealed Retail Pack', priceDelta: 0 },
                          ],
                        },
                        1
                      );
                    }}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-mono text-xs uppercase tracking-wider shrink-0 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>{isFa ? 'خرید تکی این قطعه ($۴۵۰)' : 'Purchase Component ($450)'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. PRE-BUILT PACKAGES VS CUSTOM PARTS PICKER                               */}
      {/* ========================================================================= */}
      <section id="packages-and-customizer" className="py-24 px-4 sm:px-6 border-t border-white/10 relative z-10">
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
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className="rounded-3xl border border-white/15 bg-zinc-950/70 overflow-hidden flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-2xl transition-all duration-300 group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
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

                      {/* FPS Performance Gauge */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 space-y-1.5 font-mono text-[11px]">
                        <span className="text-zinc-400 block">{isFa ? 'نرخ فریم تخمینی در رزولوشن 4K:' : '4K Benchmark Matrix:'}</span>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Cyberpunk:</span>
                            <span className="text-cyan-400 font-bold">{pkg.fps.cyberpunk}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">GTA VI:</span>
                            <span className="text-emerald-400 font-bold">{pkg.fps.gta6}</span>
                          </div>
                        </div>
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

              {/* Selector Rows */}
              <div className="space-y-6">
                {/* CPU Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isFa ? '۱. پردازنده مرکزی (CPU):' : '1. Central Processing Unit (CPU):'}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(cpuPrices).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedCpu(key);
                        }}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                          selectedCpu === key
                            ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-lg'
                            : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                        }`}
                      >
                        <span className="font-['Syne'] font-bold text-xs text-white block">{item.name}</span>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                          <span className="text-zinc-500">{item.watts}W TDP</span>
                          <span className="text-cyan-300 font-bold">{formatPrice(item.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* GPU Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isFa ? '۲. کارت گرافیک اختصاصی (GPU):' : '2. Discrete Graphics Card (GPU):'}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {Object.entries(gpuPrices).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedGpu(key);
                        }}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                          selectedGpu === key
                            ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-lg'
                            : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                        }`}
                      >
                        <span className="font-['Syne'] font-bold text-xs text-white block">{item.name}</span>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                          <span className="text-zinc-500">{item.watts}W TDP</span>
                          <span className="text-cyan-300 font-bold">{formatPrice(item.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* RAM Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-zinc-400 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{isFa ? '۳. حافظه رم DDR5:' : '3. DDR5 Memory Kit:'}</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {Object.entries(ramPrices).map(([key, item]) => (
                      <button
                        key={key}
                        onClick={() => {
                          soundFx.playClick(600);
                          setSelectedRam(key);
                        }}
                        className={`p-3.5 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                          selectedRam === key
                            ? 'border-cyan-400 bg-cyan-950/40 ring-1 ring-cyan-400 shadow-lg'
                            : 'border-white/10 bg-zinc-950/60 hover:border-white/20'
                        }`}
                      >
                        <span className="font-['Syne'] font-bold text-xs text-white block">{item.name}</span>
                        <div className="flex justify-end mt-2 pt-2 border-t border-white/10 font-mono text-[11px]">
                          <span className="text-cyan-300 font-bold">{formatPrice(item.price)}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Custom Config Footer */}
              <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/40 p-6 rounded-2xl">
                <div>
                  <span className="text-xs text-zinc-400 font-mono block">
                    {isFa ? 'مجموع قیمت کانفیگ با اسمبل و تست رایگان:' : 'Total Customized Configuration:'}
                  </span>
                  <span className="font-mono text-3xl font-black text-cyan-300">
                    {formatPrice(calculatedCustomPrice)}
                  </span>
                </div>

                <button
                  onClick={handleOrderCustomConfig}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 hover:from-cyan-300 hover:to-blue-400 text-black font-black text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isFa ? 'ثبت سفارش سیستم سفارشی در سبد خرید' : 'Commission Bespoke Rig'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer Return Bar */}
      <footer className="py-12 px-4 sm:px-6 border-t border-white/10 text-center font-mono text-xs text-zinc-500 relative z-10">
        <p className="mb-3">
          {isFa
            ? 'آتلیه مهندسی اسمبل و سخت‌افزار آورا • تمامی حقوق و تضمین کیفیت محفوظ است.'
            : 'Aura Hardware Engineering Atelier • All rights & benchmark guarantees reserved.'}
        </p>
        <button
          onClick={() => {
            soundFx.playClick(500);
            onReturnToCatalog();
          }}
          className="text-cyan-400 hover:underline inline-flex items-center gap-1"
        >
          <span>{isFa ? 'بازگشت به کاتالوگ جامع ۶۰ قطعه ای' : 'Return to Catalog Showroom'}</span>
          {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
        </button>
      </footer>
    </div>
  );
}
