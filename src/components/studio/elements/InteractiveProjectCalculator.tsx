import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence, animate } from 'framer-motion';
import { soundFx } from '../../../utils/audio';
import BlueprintHUD from '../../common/BlueprintHUD';
import { ComponentBlueprint } from '../../../types';
import {
  Calculator,
  Check,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Download,
  Share2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  PieChart as PieIcon,
  Info,
  HelpCircle,
  Flame,
  Award,
  ChevronDown
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Dashboard_V07_InteractiveProjectCostSynergyHUD',
  name: 'Interactive Project Cost & Synergy Timeline Estimator HUD',
  category: 'Dashboard',
  batch: 'Batch 6: High-Density Dashboards & Interactive Node Visualizers',
  techStack: ['React / Vite', 'Framer Motion', 'Real-Time Synergy Formula', 'Department Budget Pie', 'Urgency Multipliers', 'Direct Cart Linking'],
  aestheticVibe: 'Cinematic Precision HUD & Interactive Cost Synthesizer',
  interactionBlueprint: 'Select modular features across 5 studio disciplines; timeline synergies reduce delivery days by 35%; urgency multipliers recompute final investment and budget share in real-time with counting animations.',
  description: 'An interactive financial estimator for digital creative projects with live department budget distribution, animated number count-ups, real-time synergy savings HUD, and automated cart order sync.',
  tags: ['Project Calculator', 'Budget Estimator', 'Timeline Synergy', 'Interactive HUD', 'Financial Dashboard', 'Framer Motion'],
  codeSnippet: `// Multi-Feature Synergy & Urgency Multiplier
let estimatedDays = Math.max(5, Math.ceil(rawDays * 0.65));
if (urgencyMode === 'FAST_TRACK') {
  finalPrice = Math.round(rawPrice * 1.25);
  estimatedDays = Math.ceil(estimatedDays * 0.65);
}`,
};

interface CalculatorFeature {
  id: string;
  category: 'WEB' | 'AI_BOTS' | 'BRANDING' | 'MOTION' | 'MARKETING';
  title: string;
  description: string;
  priceToman: number;
  deliveryDays: number;
  badge?: string;
}

const CALCULATOR_FEATURES: CalculatorFeature[] = [
  // Web & Frontend
  {
    id: 'web-landing',
    category: 'WEB',
    title: 'طراحی لندینگ پیج اختصاصی و ریسپانسیو',
    description: 'کدنویسی بدون قالب آماده، سرعت زیر ۰.۸ ثانیه، چیدمان مدرن',
    priceToman: 28000000,
    deliveryDays: 10,
    badge: 'پایه و ضروری',
  },
  {
    id: 'web-3d-shaders',
    category: 'WEB',
    title: 'پیاده‌سازی المنت‌های سه‌بعدی و شیدر WebGL',
    description: 'مدل‌های تعاملی Three.js، افکت‌های شیشه و ذرات کینتیک',
    priceToman: 22000000,
    deliveryDays: 7,
    badge: 'تکنولوژی پیشرو',
  },
  {
    id: 'web-ecommerce',
    category: 'WEB',
    title: 'سیستم فروشگاهی، انبارداری و درگاه پرداخت',
    description: 'اتصال به درگاه بانکی شاپرک، پیامک اعلانات و فاکتور ساز',
    priceToman: 34000000,
    deliveryDays: 14,
  },

  // AI & Bots
  {
    id: 'ai-telegram-bot',
    category: 'AI_BOTS',
    title: 'ربات هوشمند تلگرام و بله با موتور LLM',
    description: 'پاسخ‌گویی خودکار به مشتریان، یادگیری اسناد بومی شرکت',
    priceToman: 38000000,
    deliveryDays: 12,
    badge: 'پرمتقاضی',
  },
  {
    id: 'ai-automation-crm',
    category: 'AI_BOTS',
    title: 'اتوماسیون استخراج دیتا و اتصال به CRM',
    description: 'وب‌هوک‌های بلادرنگ و پایگاه داده تحلیلی مشتریان',
    priceToman: 24000000,
    deliveryDays: 8,
  },

  // Branding & Graphic Design
  {
    id: 'brand-identity',
    category: 'BRANDING',
    title: 'هویت بصری کامل، نشان تجاری و کتابچه برند',
    description: 'توسعه پالت رنگی، تایپوگرافی، آیکونوگرافی و قواعد استفاده',
    priceToman: 26000000,
    deliveryDays: 9,
  },
  {
    id: 'brand-print-stationery',
    category: 'BRANDING',
    title: 'ست اوراق اداری، کاتالوگ و بسته‌بندی محصول',
    description: 'آماده چاپ با تفکیک رنگ استاندارد و فایل‌های وکتور CMYK',
    priceToman: 18000000,
    deliveryDays: 6,
  },

  // Motion & 3D
  {
    id: 'motion-teaser',
    category: 'MOTION',
    title: 'تیزر معرفی ۳۰ ثانیه‌ای موشن‌گرافیک محصول',
    description: 'صداگذاری تخصصی Sound Design، انیمیت روان با کیفیت 4K',
    priceToman: 29000000,
    deliveryDays: 10,
    badge: 'جذابیت بالا',
  },
  {
    id: 'motion-logo',
    category: 'MOTION',
    title: 'لوگوموشن کینتیک و اینترو رسمی برند',
    description: 'ترنزیشن‌های آغاز ویدیوها و تیزرهای شبکه‌های اجتماعی',
    priceToman: 12000000,
    deliveryDays: 4,
  },

  // SEO & Marketing
  {
    id: 'seo-technical',
    category: 'MARKETING',
    title: 'سئو تکنیکال عمیق و تدوین استراتژی محتوا',
    description: 'بهینه‌سازی Core Web Vitals، متاتگ‌های Schema و آنالیز رقبا',
    priceToman: 21000000,
    deliveryDays: 8,
  },
];

const CATEGORY_COLORS: Record<string, { label: string; color: string; hex: string }> = {
  WEB: { label: 'وب و فرانت‌اند', color: 'text-cyan-400 border-cyan-400/40 bg-cyan-950/40', hex: '#22D3EE' },
  AI_BOTS: { label: 'هوش مصنوعی و ربات', color: 'text-violet-400 border-violet-400/40 bg-violet-950/40', hex: '#7C3AED' },
  BRANDING: { label: 'برندینگ و هویت', color: 'text-amber-400 border-amber-400/40 bg-amber-950/40', hex: '#F59E0B' },
  MOTION: { label: 'موشن و انیمیشن', color: 'text-rose-400 border-rose-400/40 bg-rose-950/40', hex: '#F43F5E' },
  MARKETING: { label: 'سئو و مارکتینگ', color: 'text-emerald-400 border-emerald-400/40 bg-emerald-950/40', hex: '#10B981' },
};

/**
 * Animated Counting Number component using Framer Motion
 */
function AnimatedCounter({ value, duration = 0.65 }: { value: number; duration?: number }) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    const controls = animate(displayValue, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, duration]);

  return <span className="tabular-nums">{displayValue.toLocaleString('fa-IR')}</span>;
}

interface InteractiveProjectCalculatorProps {
  onAddToCartCustom?: (pkg: any, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function InteractiveProjectCalculator({ onAddToCartCustom }: InteractiveProjectCalculatorProps = {}) {
  const [selectedFeatureIds, setSelectedFeatureIds] = useState<string[]>([
    'web-landing',
    'ai-telegram-bot',
    'web-3d-shaders',
  ]);
  const [urgencyMode, setUrgencyMode] = useState<'STANDARD' | 'FAST_TRACK' | 'VIP'>('STANDARD');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('ALL');
  const [invoiceRequested, setInvoiceRequested] = useState(false);
  const [showSynergyTooltip, setShowSynergyTooltip] = useState(false);

  const toggleFeature = (id: string) => {
    soundFx.playClick(650);
    setSelectedFeatureIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calculations
  const calculation = useMemo(() => {
    const selectedFeatures = CALCULATOR_FEATURES.filter((f) => selectedFeatureIds.includes(f.id));

    let rawPrice = selectedFeatures.reduce((acc, f) => acc + f.priceToman, 0);
    let rawDays = selectedFeatures.reduce((acc, f) => acc + f.deliveryDays, 0);

    // Multi-feature synergy: concurrent engineering reduces total days by 35%
    let estimatedDays = Math.max(5, Math.ceil(rawDays * 0.65));

    // Urgency multiplier
    let multiplier = 1.0;
    if (urgencyMode === 'FAST_TRACK') {
      multiplier = 1.25;
      estimatedDays = Math.max(3, Math.ceil(estimatedDays * 0.65));
    } else if (urgencyMode === 'VIP') {
      multiplier = 1.5;
      estimatedDays = Math.max(2, Math.ceil(estimatedDays * 0.5));
    }

    const finalPrice = Math.round(rawPrice * multiplier);

    // Department budget share
    const deptTotals: Record<string, number> = {
      WEB: 0,
      AI_BOTS: 0,
      BRANDING: 0,
      MOTION: 0,
      MARKETING: 0,
    };

    selectedFeatures.forEach((f) => {
      deptTotals[f.category] += f.priceToman;
    });

    const synergyDaysSaved = Math.max(0, rawDays - estimatedDays);
    const timeSavedPercent = rawDays > 0 ? Math.round((synergyDaysSaved / rawDays) * 100) : 0;
    // Estimated financial equivalent value of days saved (at estimated studio day rate)
    const synergySavingsValueToman = synergyDaysSaved * 1650000;

    // Detect cross-discipline synergies
    const hasWeb = deptTotals.WEB > 0;
    const hasAi = deptTotals.AI_BOTS > 0;
    const hasBranding = deptTotals.BRANDING > 0;
    const hasMotion = deptTotals.MOTION > 0;
    const hasMarketing = deptTotals.MARKETING > 0;

    const synergiesList: string[] = [];
    if (hasWeb && hasAi) {
      synergiesList.push('یکپارچگی مستقیم وب با هوش مصنوعی (حذف API Gateway ثالث)');
    }
    if (hasWeb && hasBranding) {
      synergiesList.push('پیاده‌سازی دیزاین‌سیستم و تایپوگرافی بدون دوباره‌کاری گرافیکی');
    }
    if (hasWeb && hasMotion) {
      synergiesList.push('رندر مستقیم شیدرهای کینتیک Three.js درون معماری فرانت‌اند');
    }
    if (hasWeb && hasMarketing) {
      synergiesList.push('معماری سئو تکنیکال از خط اول کدنویسی با لود زیر ۱ ثانیه');
    }
    if (synergiesList.length === 0 && selectedFeatures.length >= 2) {
      synergiesList.push('هم‌پوشانی تسک‌های طراحی و تست درون اسپرینت‌های موازی چابک');
    }

    return {
      selectedCount: selectedFeatures.length,
      selectedFeatures,
      finalPrice,
      rawPrice,
      rawDays,
      estimatedDays,
      synergyDaysSaved,
      timeSavedPercent,
      synergySavingsValueToman,
      deptTotals,
      totalRawPrice: rawPrice,
      synergiesList,
    };
  }, [selectedFeatureIds, urgencyMode]);

  const filteredFeatures = useMemo(() => {
    if (activeCategoryFilter === 'ALL') return CALCULATOR_FEATURES;
    return CALCULATOR_FEATURES.filter((f) => f.category === activeCategoryFilter);
  }, [activeCategoryFilter]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        dir="rtl"
        className="w-full bg-[#0c0d13] border border-[#202027] rounded-3xl p-6 sm:p-8 shadow-2xl text-zinc-100 font-['Plus_Jakarta_Sans','Vazirmatn'] space-y-8"
      >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0c0d13] rounded-[11px] flex items-center justify-center">
                <Calculator className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <h3 className="font-['Lalezar'] text-2xl text-white tracking-wide">
              محاسبه‌گر بلادرنگ و تخمین هزینه پروژه (Project Cost Calculator)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
              ESTIMATOR v2.5 // FRAMER-MOTION ACCELERATED
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-1 font-light">
            با انتخاب ماژول‌ها و سرعت تحویل، هزینه کل، زمان اجرا و نمودار سهم دپارتمان‌ها به‌صورت زنده با انیمیشن‌های پویا محاسبه می‌شود.
          </p>
        </div>

        {/* Urgency Selector */}
        <div className="flex items-center gap-2 bg-[#111116] p-1.5 rounded-2xl border border-[#202027] font-mono text-xs">
          <span className="text-zinc-500 text-[11px] px-2 hidden sm:inline">فوریت تحویل:</span>
          {[
            { id: 'STANDARD', label: 'عادی', daysNote: 'زمان استاندارد' },
            { id: 'FAST_TRACK', label: '⚡ فست‌ترک (+۲۵٪)', daysNote: '۳۵٪ سریع‌تر' },
            { id: 'VIP', label: '👑 اسپرینت VIP (+۵۰٪)', daysNote: 'نصف زمان' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => {
                soundFx.playClick(700);
                setUrgencyMode(mode.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all relative ${
                urgencyMode === mode.id
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {mode.label}
              {urgencyMode === mode.id && (
                <motion.div
                  layoutId="urgencyIndicator"
                  className="absolute inset-0 rounded-xl bg-white/20 pointer-events-none"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* =================================================================== */}
        {/* LEFT / CENTER: FEATURES CHECKLIST (8 COLUMNS)                      */}
        {/* =================================================================== */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'ALL', label: 'همه ماژول‌ها' },
              { id: 'WEB', label: 'طراحی وب' },
              { id: 'AI_BOTS', label: 'هوش مصنوعی' },
              { id: 'BRANDING', label: 'برندینگ' },
              { id: 'MOTION', label: 'موشن‌گرافیک' },
              { id: 'MARKETING', label: 'سئو' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  soundFx.playClick(600);
                  setActiveCategoryFilter(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap font-mono text-[11px] transition-all ${
                  activeCategoryFilter === cat.id
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'bg-[#111116] hover:bg-white/5 text-zinc-400 border border-[#202027]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Features List with Framer Motion Layout animations */}
          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            <AnimatePresence mode="popLayout">
              {filteredFeatures.map((feature) => {
                const isSelected = selectedFeatureIds.includes(feature.id);
                const catConfig = CATEGORY_COLORS[feature.category];

                return (
                  <motion.div
                    key={feature.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#13141f] to-[#0f111a] border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
                        : 'bg-[#111116] border-[#202027] hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Custom Checkbox */}
                      <motion.div
                        whileTap={{ scale: 0.85 }}
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center mt-0.5 transition-colors flex-shrink-0 ${
                          isSelected
                            ? 'bg-cyan-400 border-cyan-300 text-black'
                            : 'border-zinc-700 bg-black/40'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </motion.div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">
                            {feature.title}
                          </span>
                          {feature.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-[9px] font-mono text-cyan-300">
                              {feature.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-400 mt-1 font-light">
                          {feature.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 mt-2 font-mono text-[10px]">
                          <span className={`px-2 py-0.5 rounded-md border ${catConfig.color}`}>
                            {catConfig.label}
                          </span>
                          <span className="text-zinc-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            <span>{feature.deliveryDays} روز کاری</span>
                          </span>
                          {isSelected && calculation.selectedCount >= 2 && (
                            <motion.span
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-2 py-0.5 rounded-md bg-emerald-950/90 border border-emerald-400/40 text-emerald-300 flex items-center gap-1 shadow-sm"
                            >
                              <Zap className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                              <span>هم‌افزای فعال</span>
                            </motion.span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Price with counting entry animation */}
                    <div className="text-left flex-shrink-0">
                      <span className="font-mono text-sm font-bold text-cyan-300 block">
                        {feature.priceToman.toLocaleString('fa-IR')}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">تومان</span>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT: REAL-TIME SUMMARY, TIMELINE, MINI-HUD & GRAPHIC BREAKDOWN   */}
        {/* =================================================================== */}
        <div className="lg:col-span-5 space-y-5">
          {/* Grand Total & Timeline Card with Framer Motion entry */}
          <motion.div
            layout
            className="p-6 rounded-3xl bg-gradient-to-b from-[#151724] to-[#0c0d14] border border-cyan-500/30 shadow-2xl space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold block">
                  برآورد نهایی سرمایه‌گذاری
                </span>
                <span className="text-[10px] font-mono text-zinc-500 px-2 py-0.5 rounded bg-black/40 border border-white/5">
                  LIVE SYNTHESIZER
                </span>
              </div>

              {/* Counting Up Total Price with Real-Time Synergy Savings Floating Tooltip */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 mt-2">
                <div className="flex items-baseline gap-2">
                  <motion.span
                    key={calculation.finalPrice}
                    initial={{ opacity: 0.7, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="font-['Syne'] font-black text-2xl sm:text-4xl text-white tracking-tight"
                  >
                    <AnimatedCounter value={calculation.finalPrice} />
                  </motion.span>
                  <span className="font-mono text-xs sm:text-sm text-zinc-400">تومان</span>
                </div>

                {/* Dynamic Floating Tooltip smoothly appearing alongside the price count-up */}
                <AnimatePresence mode="wait">
                  {calculation.selectedCount >= 2 && calculation.synergyDaysSaved > 0 && (
                    <motion.div
                      key={`synergy-badge-${calculation.synergyDaysSaved}-${calculation.selectedCount}`}
                      initial={{ opacity: 0, y: -6, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 24 }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-950/90 via-teal-950/80 to-cyan-950/90 border border-emerald-400/50 shadow-lg shadow-emerald-900/30 text-emerald-300 text-xs font-mono select-none"
                    >
                      <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
                      <span>
                        هم‌افزایی:{' '}
                        <strong className="text-white font-bold">
                          <AnimatedCounter value={calculation.synergyDaysSaved} duration={0.35} /> روز
                        </strong>{' '}
                        تحویل سریع‌تر ({calculation.timeSavedPercent}٪)
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between mt-1 text-[11px] text-zinc-400">
                <span>
                  معادل <AnimatedCounter value={Math.round(calculation.finalPrice / 1000000)} /> میلیون تومان
                </span>
                {calculation.selectedCount >= 2 && (
                  <span className="font-mono text-emerald-400 text-[10px]">
                    ✓ تخفیف زمانی موازی فعال است
                  </span>
                )}
              </div>
            </div>

            {/* Delivery Timeline Indicator with Count-up */}
            <motion.div
              layout
              className="p-3 sm:p-3.5 rounded-2xl bg-black/50 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-zinc-300">مدت زمان برآورد تحویل:</span>
              </div>
              <div className="font-mono text-xs sm:text-sm font-bold text-emerald-300 flex items-center gap-1.5">
                <AnimatedCounter value={calculation.estimatedDays} duration={0.4} />
                <span>روز کاری</span>
                {calculation.synergyDaysSaved > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30 text-emerald-400 font-sans">
                    (-{calculation.synergyDaysSaved} روز هم‌افزا)
                  </span>
                )}
              </div>
            </motion.div>

            {/* ============================================================== */}
            {/* REAL-TIME DYNAMIC MINI-HUD: SYNERGY SAVINGS CALCULATIONS       */}
            {/* ============================================================== */}
            <AnimatePresence>
              {calculation.selectedCount >= 2 && (
                <motion.div
                  key="synergy-mini-hud"
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet-950/70 via-[#101222] to-cyan-950/70 border border-cyan-400/40 p-4 shadow-xl shadow-cyan-950/20 space-y-3.5"
                >
                  {/* Glowing background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* HUD Header */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
                      </span>
                      <span className="font-mono text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-cyan-400" />
                        هوش هم‌افزایی بلادرنگ (Synergy Engine)
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        soundFx.playTick(720);
                        setShowSynergyTooltip(!showSynergyTooltip);
                      }}
                      className="flex items-center gap-1 text-[10px] font-mono text-zinc-300 hover:text-white transition-colors bg-white/10 hover:bg-white/15 px-2 py-1 rounded-lg border border-white/10 cursor-pointer"
                      title="مشاهده جزئیات فرمول صرفه‌جویی هم‌افزا"
                    >
                      <Info className="w-3 h-3 text-cyan-400 shrink-0" />
                      <span>فرمول ارزش</span>
                      <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showSynergyTooltip ? 'rotate-180' : ''}`} />
                    </button>
                  </div>

                  {/* HUD Live Metrics Grid with Instant Feedback */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-black/50 border border-cyan-500/20 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 block mb-1">صرفه‌جویی زمانی موازی:</span>
                      <div className="font-mono font-bold text-cyan-300 text-base sm:text-lg flex items-center gap-1.5">
                        <span className="text-amber-400 text-sm">⚡</span>
                        <AnimatedCounter value={calculation.synergyDaysSaved} duration={0.35} />
                        <span className="text-xs font-sans text-zinc-300">روز کاری زودتر</span>
                      </div>
                      <span className="text-[9px] text-emerald-400 font-mono mt-1">
                        معادل {calculation.timeSavedPercent}٪ شتاب در لانچ محصول
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-black/50 border border-emerald-500/20 flex flex-col justify-between">
                      <span className="text-[10px] text-zinc-400 block mb-1">ارزش اقتصادی زمان بازگشتی:</span>
                      <div className="font-mono font-bold text-[#B8FF3D] text-base sm:text-lg flex items-center gap-1.5">
                        <AnimatedCounter value={Math.round(calculation.synergySavingsValueToman / 1000000)} duration={0.35} />
                        <span className="text-xs font-sans text-zinc-300">م. تومان ارزش</span>
                      </div>
                      <span className="text-[9px] text-zinc-400 font-mono mt-1">
                        بر مبنای حذف دوباره‌کاری چند شرکتی
                      </span>
                    </div>
                  </div>

                  {/* Active Multi-Service Synergy Connections */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>نقاط هم‌پوشانی فعال این پکیج:</span>
                      <span className="text-cyan-400">{calculation.synergiesList.length} هم‌افزایی فعال</span>
                    </div>
                    <div className="space-y-1">
                      {calculation.synergiesList.map((syn, sIdx) => (
                        <motion.div
                          key={sIdx}
                          initial={{ opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: sIdx * 0.05 }}
                          className="flex items-center gap-1.5 text-[11px] text-cyan-100 font-['Vazirmatn'] leading-tight p-1.5 rounded-lg bg-white/[0.03] border border-white/5"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <span className="truncate">{syn}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Interactive Tooltip / Explanation Popover */}
                  <AnimatePresence>
                    {showSynergyTooltip && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t border-cyan-500/20 pt-2.5 text-[11px] text-zinc-300 leading-relaxed font-['Vazirmatn'] space-y-2"
                      >
                        <div className="p-3 rounded-xl bg-cyan-950/50 border border-cyan-400/20 text-cyan-200 space-y-1.5">
                          <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                            <span>چرا با ترکیب چند سرویس، زمان کل کمتر می‌شود؟</span>
                          </div>
                          <p className="text-[11px] text-zinc-300">
                            در پروژه‌های چندبخشی معمولی، کار بین چند تیم یا شرکت دست‌به‌دست می‌شود (Water-fall) که باعث ایجاد تاخیر تحویل ۳۵ تا ۵۰ درصدی می‌شود. در ۱۲۳سرویس، همه دپارتمان‌ها روی یک ریپازیتوری، دیزاین‌سیستم و کانتینر ابری یکپارچه کار می‌کنند و تسک‌ها همزمان (Concurrent Engineering) جلو می‌روند.
                          </p>
                        </div>
                        <div className="flex flex-wrap justify-between items-center text-[10px] font-mono text-zinc-400 px-1 gap-2">
                          <span>مجموع زمان مجزا: {calculation.rawDays} روز</span>
                          <span>&larr;</span>
                          <span className="text-cyan-300 font-bold">زمان موازی ۱۲۳سرویس: {calculation.estimatedDays} روز کاری</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Graphic Visual Share Breakdown Bar */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-mono text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <PieIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>توزیع بودجه در دپارتمان‌ها:</span>
                </span>
                <span className="font-mono text-[10px] text-zinc-500">
                  {calculation.selectedCount} ماژول فعال
                </span>
              </div>

              {/* Progress Distribution Bar */}
              <div className="w-full h-3 bg-black/60 rounded-full overflow-hidden flex border border-white/10 p-0.5">
                {calculation.totalRawPrice > 0 ? (
                  Object.entries(calculation.deptTotals).map(([deptKey, amount]) => {
                    const percentage = (amount / calculation.totalRawPrice) * 100;
                    if (percentage === 0) return null;
                    const cat = CATEGORY_COLORS[deptKey];
                    return (
                      <div
                        key={deptKey}
                        style={{ width: `${percentage}%`, backgroundColor: cat.hex }}
                        className="h-full first:rounded-r-full last:rounded-l-full transition-all duration-300"
                        title={`${cat.label}: ${Math.round(percentage)}%`}
                      />
                    );
                  })
                ) : (
                  <div className="w-full h-full bg-zinc-800" />
                )}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-1.5 pt-1 text-[10px] font-mono">
                {Object.entries(CATEGORY_COLORS).map(([catKey, catVal]) => {
                  const share = calculation.totalRawPrice > 0
                    ? Math.round((calculation.deptTotals[catKey] / calculation.totalRawPrice) * 100)
                    : 0;
                  return (
                    <div key={catKey} className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: catVal.hex }} />
                      <span className="text-zinc-400 truncate">{catVal.label}:</span>
                      <span className="text-white font-bold">{share}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={(e) => {
                  soundFx.playChime(900, 0.2);
                  setInvoiceRequested(true);
                  if (onAddToCartCustom) {
                    onAddToCartCustom(
                      {
                        id: `custom-bundle-${Date.now()}`,
                        sku: 'CUSTOM-SYNERGY',
                        title: `پکیج سفارشی استودیو (${selectedFeatureIds.length} قابلیت)`,
                        category: 'پکیج سفارشی و هم‌افزا',
                        priceToman: calculation.finalPrice,
                        deliveryDays: calculation.estimatedDays,
                        description: `ترکیبی از ماژول‌های وب، هوش مصنوعی و سئو با تخفیف هم‌افزایی (${calculation.synergyDaysSaved} روز کاهش زمان تحویل).`,
                        features: calculation.selectedFeatures.map((f) => f.title),
                        badge: 'تخفیف هم‌افزا',
                      },
                      e
                    );
                  }
                  setTimeout(() => setInvoiceRequested(false), 3500);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 via-cyan-500 to-cyan-400 hover:opacity-95 text-black font-['Lalezar'] text-base font-bold shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>صدور پیش‌فاکتور رسمی و ثبت در سبد</span>
              </button>

              {invoiceRequested && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-400 text-emerald-300 text-xs text-center font-mono"
                >
                  ✓ پیش‌فاکتور با شناسه استودیو صادر گردید و به سبد سفارشات الحاق شد.
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      </div>
    </BlueprintHUD>
  );
}
