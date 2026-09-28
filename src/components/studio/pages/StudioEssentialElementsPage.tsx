import React, { useState } from 'react';
import { soundFx } from '../../../utils/audio';
import RtlDataTable from '../elements/RtlDataTable';
import RtlForms from '../elements/RtlForms';
import InteractiveProjectCalculator from '../elements/InteractiveProjectCalculator';
import FlutedGlassCard from '../common/FlutedGlassCard';
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Download,
  Check,
  Sparkles,
  Layers,
  ShoppingBag,
  DollarSign,
  Star,
  Users,
  HelpCircle,
  Mail,
  Send,
  Calendar,
  CheckCircle2,
  X,
  ExternalLink,
  Phone,
  MapPin,
  Clock,
  ShieldCheck,
  TrendingUp,
  Award,
  ChevronDown,
  Globe,
  Sliders,
  Eye,
  Info,
  ChevronRight,
  Calculator,
  Table
} from 'lucide-react';

interface StudioEssentialElementsPageProps {
  onBackToHome: () => void;
}

type LangMode = 'fa' | 'en';
type ElementCategory = 'ALL' | 'HERO_CTA' | 'PRICING_COMMERCE' | 'SOCIAL_PROOF' | 'FORMS_LEADS' | 'CONTENT_NAV';

export default function StudioEssentialElementsPage({ onBackToHome }: StudioEssentialElementsPageProps) {
  const [lang, setLang] = useState<LangMode>('fa');
  const [activeCategory, setActiveCategory] = useState<ElementCategory>('ALL');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Component-level interactive states
  const [pricingCycle, setPricingCycle] = useState<'MONTHLY' | 'ANNUAL'>('ANNUAL');
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [productColor, setProductColor] = useState<'CYAN' | 'VIOLET' | 'EMERALD'>('CYAN');
  const [announcementVisible, setAnnouncementVisible] = useState(true);
  const [cookieConsentDismissed, setCookieConsentDismissed] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const isRtl = lang === 'fa';

  const handleCopyCode = (id: string, snippet: string) => {
    soundFx.playClick(900);
    navigator.clipboard.writeText(snippet);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownloadTsx = (componentName: string, templateCode: string) => {
    soundFx.playChime(950, 0.2);
    const blob = new Blob([templateCode], { type: 'text/typescript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${componentName}.tsx`;
    link.click();
    URL.revokeObjectURL(url);
    setCopiedId(`dl-${componentName}`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-[#09090B] text-white ${
        isRtl ? "font-['Plus_Jakarta_Sans','Vazirmatn']" : "font-['Plus_Jakarta_Sans']"
      } pb-28 selection:bg-cyan-400 selection:text-black`}
    >
      {/* Top Header Breadcrumb & Language Switcher */}
      <div className="sticky top-16 z-30 bg-[#0c0d12]/90 backdrop-blur-xl border-b border-[#202027] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          {isRtl ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
          <span>{isRtl ? 'بازگشت به استودیو ۱۲۳سرویس' : 'Return to 123Service Studio'}</span>
        </button>

        {/* Language & Layout Switcher (Persian First, then English) */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-zinc-400 hidden sm:inline">
            {isRtl ? 'جهت و زبان:' : 'Layout & Language:'}
          </span>
          <div className="flex bg-[#111116] p-1 rounded-2xl border border-[#202027] font-mono text-xs">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setLang('fa');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                lang === 'fa'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🇮🇷 فارسی (RTL First)</span>
            </button>
            <button
              onClick={() => {
                soundFx.playClick(700);
                setLang('en');
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                lang === 'en'
                  ? 'bg-gradient-to-r from-violet-600 to-cyan-500 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <span>🌐 English (LTR Global)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-16">
        {/* Page Hero & Scope Overview */}
        <div className="space-y-4 max-w-4xl border-b border-[#202027] pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116] border border-[#202027] text-cyan-300 font-mono text-xs">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>
              {isRtl
                ? 'کتابخانه ۲۲ المان ضروری وب‌سایت (نمونه‌های آماده مشتریان)'
                : '22 Essential Production Website Elements & Client Patterns'}
            </span>
          </div>

          <h1 className="font-['Lalezar'] text-4xl sm:text-6xl text-white">
            {isRtl
              ? 'مجموعه قطعات پرکاربرد و حیاتی وب‌سایت'
              : 'The Core Website Anatomy & UI Components'}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            {isRtl
              ? 'تمامی ۲۲ بخش و المان استاندارد که هر کسب‌وکار، شرکت و فروشگاهی برای جلب اعتماد، افزایش نرخ تبدیل و فروش در وب‌سایت خود نیاز دارد؛ با طراحی فوق‌مدرن و پشتیبانی همزمان از استایل اصیل فارسی و استانداردهای جهانی.'
              : 'A production-grade compilation of 22 essential UI modules and landing page building blocks required by modern clients — fully equipped with dual RTL Persian and LTR English layouts.'}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#202027] pb-4">
          {[
            { id: 'ALL', labelFa: 'همه ۲۲ المان', labelEn: 'All 22 Elements' },
            { id: 'HERO_CTA', labelFa: 'هیرو و بنرهای اقدام (CTA)', labelEn: 'Hero & CTA Banners' },
            { id: 'PRICING_COMMERCE', labelFa: 'قیمت‌گذاری و محصول', labelEn: 'Pricing & Commerce' },
            { id: 'SOCIAL_PROOF', labelFa: 'اعتمادسازی و آمار', labelEn: 'Social Proof & Stats' },
            { id: 'FORMS_LEADS', labelFa: 'فرم‌ها و لید مارکتینگ', labelEn: 'Forms & Lead Capture' },
            { id: 'CONTENT_NAV', labelFa: 'محتوا، فوتر و ناوبری', labelEn: 'Content & Navigation' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                soundFx.playClick(600);
                setActiveCategory(cat.id as any);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                  : 'bg-[#111116] hover:bg-[#17171D] text-zinc-400 hover:text-white border border-[#202027]'
              }`}
            >
              {isRtl ? cat.labelFa : cat.labelEn}
            </button>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* NEW FEATURED POWERHOUSE MODULES: DATA TABLE, FORMS, CALCULATOR, SHADER   */}
        {/* ========================================================================= */}
        <div className="space-y-12">
          {/* 1. INTERACTIVE PROJECT CALCULATOR */}
          <section id="module-calculator" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-cyan-300">
                  FEATURED 01 // INTERACTIVE PROJECT COST &amp; TIMELINE ESTIMATOR
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode('mod-calc', '<InteractiveProjectCalculator />')}
                  className="px-3 py-1.5 rounded-xl bg-[#17171D] hover:bg-white/10 text-zinc-300 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  {copiedId === 'mod-calc' ? <Check className="w-3.5 h-3.5 text-[#B8FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mod-calc' ? (isRtl ? 'کپی شد' : 'Copied') : (isRtl ? 'کپی کد JSX' : 'Copy JSX')}</span>
                </button>
                <button
                  onClick={() => handleDownloadTsx('InteractiveProjectCalculator', `// InteractiveProjectCalculator.tsx - 123Service Studio\nexport { default } from './elements/InteractiveProjectCalculator';`)}
                  className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedId === 'dl-InteractiveProjectCalculator' ? (isRtl ? 'دانلود شد' : 'Downloaded') : (isRtl ? 'دانلود فایل TSX' : 'Download TSX')}</span>
                </button>
              </div>
            </div>
            <InteractiveProjectCalculator />
          </section>

          {/* 2. ADVANCED RTL DATA TABLE */}
          <section id="module-datatable" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-violet-300">
                  FEATURED 02 // ADVANCED RTL DATA TABLE &amp; ORDER LEDGER
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode('mod-table', '<RtlDataTable />')}
                  className="px-3 py-1.5 rounded-xl bg-[#17171D] hover:bg-white/10 text-zinc-300 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  {copiedId === 'mod-table' ? <Check className="w-3.5 h-3.5 text-[#B8FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mod-table' ? (isRtl ? 'کپی شد' : 'Copied') : (isRtl ? 'کپی کد JSX' : 'Copy JSX')}</span>
                </button>
                <button
                  onClick={() => handleDownloadTsx('RtlDataTable', `// RtlDataTable.tsx - 123Service Studio\nexport { default } from './elements/RtlDataTable';`)}
                  className="px-3 py-1.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 text-violet-300 border border-violet-400/30 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedId === 'dl-RtlDataTable' ? (isRtl ? 'دانلود شد' : 'Downloaded') : (isRtl ? 'دانلود فایل TSX' : 'Download TSX')}</span>
                </button>
              </div>
            </div>
            <RtlDataTable />
          </section>

          {/* 3. 5 PERSIAN-FIRST FORMS */}
          <section id="module-forms" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-emerald-300">
                  FEATURED 03 // 5 PERSIAN-FIRST NATIVE FORMS &amp; INPUTS
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode('mod-forms', '<RtlForms />')}
                  className="px-3 py-1.5 rounded-xl bg-[#17171D] hover:bg-white/10 text-zinc-300 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  {copiedId === 'mod-forms' ? <Check className="w-3.5 h-3.5 text-[#B8FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mod-forms' ? (isRtl ? 'کپی شد' : 'Copied') : (isRtl ? 'کپی کد JSX' : 'Copy JSX')}</span>
                </button>
                <button
                  onClick={() => handleDownloadTsx('RtlForms', `// RtlForms.tsx - 123Service Studio\nexport { default } from './elements/RtlForms';`)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedId === 'dl-RtlForms' ? (isRtl ? 'دانلود شد' : 'Downloaded') : (isRtl ? 'دانلود فایل TSX' : 'Download TSX')}</span>
                </button>
              </div>
            </div>
            <RtlForms />
          </section>

          {/* 4. REAL-TIME FLUTED GLASS SHADER CARD */}
          <section id="module-fluted-glass" className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-xs font-bold text-amber-300">
                  FEATURED 04 // REAL-TIME WEBGL FLUTED GLASS SHADER CARD
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleCopyCode('mod-glass', '<FlutedGlassCard>...</FlutedGlassCard>')}
                  className="px-3 py-1.5 rounded-xl bg-[#17171D] hover:bg-white/10 text-zinc-300 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  {copiedId === 'mod-glass' ? <Check className="w-3.5 h-3.5 text-[#B8FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'mod-glass' ? (isRtl ? 'کپی شد' : 'Copied') : (isRtl ? 'کپی کد JSX' : 'Copy JSX')}</span>
                </button>
                <button
                  onClick={() => handleDownloadTsx('FlutedGlassCard', `// FlutedGlassCard.tsx - 123Service Studio\nexport { default } from './common/FlutedGlassCard';`)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5 text-xs font-mono transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{copiedId === 'dl-FlutedGlassCard' ? (isRtl ? 'دانلود شد' : 'Downloaded') : (isRtl ? 'دانلود فایل TSX' : 'Download TSX')}</span>
                </button>
              </div>
            </div>

            <FlutedGlassCard fluteDensity={36.0} refractionStrength={0.05}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[11px] font-mono text-cyan-300 font-bold">
                    WEBGL OPTICAL CAUSTICS
                  </span>
                  <span className="font-mono text-xs text-zinc-400">
                    با تکان دادن ماوس، شکست نور در شیارهای شیشه تغییر می‌کند
                  </span>
                </div>
                <h4 className="font-['Lalezar'] text-2xl text-white">
                  کارت انکساری شیشه شیاردار استودیو ۱۲۳سرویس (Fluted Glass Prism)
                </h4>
                <p className="text-xs text-zinc-300 font-light leading-relaxed max-w-2xl">
                  این شیدر با محاسبه گرادیان سطح سینوسی به موازات محور افقی، نور پس‌زمینه (طیف بنفش و فیروزه‌ای استودیو) را با انحراف کروماتیک RGB و بازتاب نوری زنده متناسب با موقعیت ماوس تجزیه می‌کند.
                </p>
              </div>
            </FlutedGlassCard>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* 22 ESSENTIAL PRODUCTION ELEMENTS                                          */}
        {/* ========================================================================= */}
        <div className="space-y-20 pt-8 border-t border-[#202027]">

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 01: HERO SECTION & VALUE PROPOSITION                            */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'HERO_CTA') && (
            <section id="element-01" className="p-8 sm:p-12 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6 relative overflow-hidden">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">01 // HERO &amp; VALUE PROPOSITION</span>
                <button
                  onClick={() => handleCopyCode('elem-01', '<HeroSection title="..." />')}
                  className="px-3 py-1 rounded-lg bg-[#17171D] hover:bg-white/10 text-zinc-300 flex items-center gap-1.5 transition-colors"
                >
                  {copiedId === 'elem-01' ? <Check className="w-3.5 h-3.5 text-[#B8FF3D]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'elem-01' ? (isRtl ? 'کپی شد' : 'Copied') : (isRtl ? 'کپی کد' : 'Copy JSX')}</span>
                </button>
              </div>

              <div className="py-12 px-4 text-center space-y-6 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
                  <span>{isRtl ? 'نسل جدید پلتفرم‌های ابری و سازمانی' : 'Next-Gen Enterprise Cloud Infrastructure'}</span>
                </div>
                <h2 className="font-['Lalezar'] text-4xl sm:text-6xl text-white leading-tight">
                  {isRtl
                    ? 'رشد ۱۰ برابری کسب‌وکار خود را با فناوری مدرن تضمین کنید'
                    : 'Supercharge Your Digital Growth with Modern Engineering'}
                </h2>
                <p className="text-sm text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
                  {isRtl
                    ? 'سریع‌ترین زیرساخت برای مقیاس‌پذیری نرم‌افزار، امنیت بی‌وقفه و تجربه کاربری بدون وقفه.'
                    : 'The fastest unified platform for automated workflows, bulletproof security, and frictionless velocity.'}
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-black font-['Lalezar'] text-base font-bold shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all">
                    {isRtl ? 'شروع رایگان به مدت ۱۴ روز' : 'Start Free 14-Day Trial'}
                  </button>
                  <button className="px-5 py-3 rounded-xl bg-[#17171D] hover:bg-white/10 text-white font-mono text-xs transition-colors border border-[#202027]">
                    {isRtl ? 'رزرو جلسه دمو آنلاین' : 'Book a Live Demo'}
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 02: FEATURES & BENEFITS GRID                                    */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'HERO_CTA') && (
            <section id="element-02" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">02 // FEATURES &amp; BENEFITS GRID</span>
                <span className="text-zinc-500">{isRtl ? 'شبکه ۳ ستونه ویژگی‌ها' : '3-Column Value Grid'}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: ShieldCheck,
                    titleFa: 'امنیت چندلایه سازمانی',
                    titleEn: 'Enterprise Zero-Trust Security',
                    descFa: 'رمزنگاری سراسری ۲۵۶ بیتی، مانیتورینگ زنده ترافیک و ایزولاسیون کامل داده‌ها.',
                    descEn: 'End-to-end 256-bit encryption with continuous intrusion detection and strict RBAC.',
                  },
                  {
                    icon: TrendingUp,
                    titleFa: 'سرعت لودینگ برق‌آسا',
                    titleEn: 'Ultra-Fast Sub-Second Latency',
                    descFa: 'توزیع جهانی ابری روی ۳۵۰ نود CDN با بهینه‌سازی خودکار کش و بسته‌ها.',
                    descEn: 'Edge delivery powered by global CDN POPs with smart caching and auto-scaling.',
                  },
                  {
                    icon: Award,
                    titleFa: 'پشتیبانی ۲۴ ساعته متخصصان',
                    titleEn: '24/7 Dedicated SLA Support',
                    descFa: 'پاسخگویی تضمینی زیر ۱۵ دقیقه توسط مهندسان ارشد زیرساخت بدون واسطه.',
                    descEn: 'Sub-15 minute response time guarantee backed by senior infrastructure engineers.',
                  },
                ].map((feat, idx) => {
                  const Icon = feat.icon;
                  return (
                    <div key={idx} className="p-6 rounded-2xl bg-[#17171D] border border-[#202027] hover:border-cyan-500/40 transition-all space-y-3">
                      <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-['Lalezar'] text-xl text-white">
                        {isRtl ? feat.titleFa : feat.titleEn}
                      </h3>
                      <p className="text-xs text-zinc-400 font-light leading-relaxed">
                        {isRtl ? feat.descFa : feat.descEn}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 03: PRICING TABLE WITH BILLING TOGGLE                           */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'PRICING_COMMERCE') && (
            <section id="element-03" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-8">
              <div className="flex flex-wrap justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs gap-4">
                <span className="text-cyan-400 font-bold">03 // INTERACTIVE PRICING TABLE &amp; TOGGLE</span>
                {/* Monthly vs Annual Toggle */}
                <div className="flex items-center gap-2 bg-[#17171D] p-1 rounded-xl border border-[#202027]">
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setPricingCycle('MONTHLY');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      pricingCycle === 'MONTHLY' ? 'bg-cyan-400 text-black' : 'text-zinc-400'
                    }`}
                  >
                    {isRtl ? 'پرداخت ماهانه' : 'Monthly'}
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setPricingCycle('ANNUAL');
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                      pricingCycle === 'ANNUAL' ? 'bg-cyan-400 text-black' : 'text-zinc-400'
                    }`}
                  >
                    <span>{isRtl ? 'پرداخت سالانه' : 'Annual'}</span>
                    <span className="text-[10px] bg-[#B8FF3D] text-black px-1.5 py-0.2 rounded font-black">-20%</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                {[
                  {
                    tier: isRtl ? 'استارت‌آپ' : 'Starter',
                    price: pricingCycle === 'ANNUAL' ? (isRtl ? '۲,۴۰۰,۰۰۰ تومان' : '$29/mo') : (isRtl ? '۲,۹۰۰,۰۰۰ تومان' : '$35/mo'),
                    desc: isRtl ? 'مناسب کسب‌وکارهای نوپا و فریلنسرها' : 'Ideal for early-stage teams & founders',
                    popular: false,
                    features: [
                      isRtl ? 'تا ۵ کاربر همزمان' : 'Up to 5 team members',
                      isRtl ? '۵۰ گیگابایت فضای ابری' : '50 GB Cloud Storage',
                      isRtl ? 'پشتیبانی استاندارد تیکت' : 'Standard Ticket Support',
                    ],
                  },
                  {
                    tier: isRtl ? 'حرفه‌ای و سازمانی' : 'Growth & Pro',
                    price: pricingCycle === 'ANNUAL' ? (isRtl ? '۶,۸۰۰,۰۰۰ تومان' : '$89/mo') : (isRtl ? '۸,۲۰۰,۰۰۰ تومان' : '$105/mo'),
                    desc: isRtl ? 'محبوب‌ترین پلن برای شرکت‌های در حال توسعه' : 'Most popular for rapidly scaling companies',
                    popular: true,
                    features: [
                      isRtl ? 'کاربر نامحدود در سازمان' : 'Unlimited team members',
                      isRtl ? '۵۰۰ گیگابایت فضای ابری NVMe' : '500 GB NVMe Storage',
                      isRtl ? 'پشتیبانی اختصاصی VIP و تلفنی' : '24/7 Priority Phone Support',
                      isRtl ? 'دامنه اختصاصی با SSL پیشرفته' : 'Custom Domains & Wildcard SSL',
                    ],
                  },
                  {
                    tier: isRtl ? 'سازمانی انترپرایز' : 'Enterprise Custom',
                    price: isRtl ? 'تماس با فروش' : 'Custom Quote',
                    desc: isRtl ? 'سفارشی‌سازی کامل با سرورهای اختصاصی' : 'Dedicated clusters with bespoke SLAs',
                    popular: false,
                    features: [
                      isRtl ? 'استقرار در دیتاسنتر داخلی یا خارجی' : 'On-Premise or Private Cloud',
                      isRtl ? 'قرارداد تضمین آپتایم ۹۹.۹۹٪' : '99.99% Uptime SLA Guarantee',
                      isRtl ? 'مدیر اکانت اختصاصی' : 'Dedicated Account Executive',
                    ],
                  },
                ].map((plan, idx) => (
                  <div
                    key={idx}
                    className={`p-6 sm:p-8 rounded-3xl flex flex-col justify-between space-y-6 transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-b from-violet-950/40 to-[#17171D] border-2 border-cyan-400 shadow-2xl shadow-cyan-500/10'
                        : 'bg-[#17171D] border border-[#202027]'
                    }`}
                  >
                    <div className="space-y-4">
                      {plan.popular && (
                        <span className="px-3 py-1 rounded-full bg-cyan-400 text-black font-mono text-[10px] font-black uppercase tracking-wider inline-block">
                          {isRtl ? 'پیشنهاد ویژه استودیو' : 'MOST POPULAR'}
                        </span>
                      )}
                      <h4 className="font-['Lalezar'] text-2xl text-white">{plan.tier}</h4>
                      <div className="font-['Lalezar'] text-3xl sm:text-4xl text-cyan-300">{plan.price}</div>
                      <p className="text-xs text-zinc-400 font-light">{plan.desc}</p>
                      <div className="space-y-2 pt-2 border-t border-[#202027]">
                        {plan.features.map((f, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#B8FF3D] shrink-0" />
                            <span>{f}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button
                      className={`w-full py-3 rounded-xl font-['Lalezar'] text-sm font-bold transition-all ${
                        plan.popular
                          ? 'bg-gradient-to-r from-violet-600 to-cyan-400 text-black shadow-lg shadow-cyan-500/20'
                          : 'bg-[#111116] hover:bg-white/10 text-white border border-[#202027]'
                      }`}
                    >
                      {isRtl ? 'انتخاب این پلن' : 'Select Plan'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 04: HIGH-CONVERTING CTA BANNER                                  */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'HERO_CTA') && (
            <section id="element-04" className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-violet-950/80 via-[#111116] to-cyan-950/80 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-center md:text-start">
                  <span className="font-mono text-xs text-cyan-300 font-bold uppercase tracking-wider block">
                    {isRtl ? 'آماده تحول در کسب‌وکار خود هستید؟' : 'Ready to Elevate Your Workflow?'}
                  </span>
                  <h3 className="font-['Lalezar'] text-3xl sm:text-4xl text-white">
                    {isRtl ? 'همین امروز به جمع مشتریان پیشرو ما بپیوندید' : 'Start Building on the Future Today'}
                  </h3>
                  <p className="text-xs text-zinc-300 max-w-xl font-light">
                    {isRtl
                      ? 'بدون نیاز به کارت اعتباری. پشتیبانی اختصاصی و راه‌اندازی سریع در کمتر از ۲۴ ساعت.'
                      : 'No credit card required. Experience immediate deployment with 24/7 dedicated onboarding.'}
                  </p>
                </div>
                <button className="px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-['Lalezar'] text-lg font-bold shadow-xl shadow-cyan-500/30 transition-all shrink-0">
                  {isRtl ? 'دریافت مشاوره رایگان' : 'Claim Free Consultation'}
                </button>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 05: CLIENT LOGO CLOUD & TRUST BADGES                            */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'SOCIAL_PROOF') && (
            <section id="element-05" className="p-8 rounded-3xl bg-[#111116] border border-[#202027] shadow-xl space-y-6 text-center">
              <span className="font-mono text-xs text-zinc-400 uppercase tracking-widest block font-bold">
                {isRtl ? 'مورد اعتماد بیش از ۱۰۰ برند و سازمان شاخص کشور' : 'Trusted by Leading Forward-Thinking Teams Worldwide'}
              </span>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-60 hover:opacity-100 transition-opacity">
                {['ACME CORP', 'NEXUS LABS', 'SPECTRA AI', 'VORTEX TECH', 'METRIC STREAM'].map((logo, idx) => (
                  <span key={idx} className="font-['Syne'] font-black text-xl tracking-widest text-zinc-400 hover:text-cyan-400 transition-colors">
                    {logo}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 06: CUSTOMER TESTIMONIALS & RATING CARDS                        */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'SOCIAL_PROOF') && (
            <section id="element-06" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">06 // TESTIMONIALS &amp; VERIFIED REVIEWS</span>
                <span className="text-zinc-500">5.0 RATING ON TRUSTPILOT</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: isRtl ? 'مهندس سهراب پناهی' : 'Marcus Vance',
                    role: isRtl ? 'مدیر ارشد فناوری در فناوران هوشمند' : 'CTO at Horizon Cloud Systems',
                    quote: isRtl
                      ? 'همکاری با این تیم سرعت لانچ محصولات ما را ۳ برابر کرد. کدهای کامپوننت‌ها به غایت تمیز و بدون هیچ‌گونه باگ عملکردی است.'
                      : 'Migrating our core storefront to this architecture reduced our LCP by 68%. The technical clarity and craftsmanship are world-class.',
                    score: 5,
                  },
                  {
                    name: isRtl ? 'دکتر بهناز رستمی' : 'Elena Rostova',
                    role: isRtl ? 'بنیان‌گذار پلتفرم فین‌تک رایا' : 'Head of Design at FinStream Global',
                    quote: isRtl
                      ? 'طراحی هماهنگ با نیازهای کاربران ایرانی و انطباق بی‌نقص با زبان فارسی، چیزی بود که در هیچ استودیوی دیگری تجربه نکرده بودیم.'
                      : 'The dual RTL/LTR responsiveness works out of the box with zero layout drift. Our customer feedback has been overwhelmingly positive.',
                    score: 5,
                  },
                ].map((rev, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#17171D] border border-[#202027] space-y-4">
                    <div className="flex gap-1 text-amber-400">
                      {[...Array(rev.score)].map((_, s) => (
                        <Star key={s} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-zinc-200 leading-relaxed font-light">«{rev.quote}»</p>
                    <div className="pt-2 border-t border-[#202027] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-cyan-950 border border-cyan-400/40 flex items-center justify-center font-bold text-cyan-300 font-mono text-xs">
                        {rev.name[0]}
                      </div>
                      <div>
                        <h5 className="font-['Lalezar'] text-base text-white">{rev.name}</h5>
                        <span className="text-xs text-zinc-400 block font-light">{rev.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 07: STATS & COUNTER METRICS                                     */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'SOCIAL_PROOF') && (
            <section id="element-07" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                07 // STATISTICS &amp; IMPACT METRICS
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { num: '۹۹.۹۸٪', numEn: '99.98%', labelFa: 'آپتایم پلتفرم', labelEn: 'Guaranteed SLA Uptime' },
                  { num: '۱۴,۵۰۰+', numEn: '14,500+', labelFa: 'کاربران فعال روزانه', labelEn: 'Daily Active Users' },
                  { num: '۰.۴ ثانیه', numEn: '0.4s', labelFa: 'میانگین زمان بارگذاری', labelEn: 'Average Load Latency' },
                  { num: '۲۴/۷', numEn: '24/7', labelFa: 'پشتیبانی فنی بی‌وقفه', labelEn: 'Dedicated Global Support' },
                ].map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#17171D] border border-white/5 space-y-1">
                    <div className="font-['Lalezar'] text-3xl sm:text-5xl text-cyan-300">
                      {isRtl ? stat.num : stat.numEn}
                    </div>
                    <span className="text-xs text-zinc-400 block font-light">
                      {isRtl ? stat.labelFa : stat.labelEn}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 08: FAQ ACCORDION                                               */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-08" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">08 // FAQ ACCORDION</span>
                <span className="text-zinc-500">{isRtl ? 'سوالات متداول کاربران' : 'Frequently Asked Questions'}</span>
              </div>

              <div className="divide-y divide-[#202027]">
                {[
                  {
                    qFa: 'آیا امکان تغییر پلن پس از خرید وجود دارد؟',
                    qEn: 'Can I upgrade or change my plan anytime?',
                    aFa: 'بله کاملاً؛ در هر زمان می‌توانید از طریق داشبورد خود پلن را ارتقا داده و تفاوت هزینه به صورت روزشمار محاسبه خواهد شد.',
                    aEn: 'Yes, you can upgrade, downgrade, or switch billing cycles instantly with prorated credit calculation.',
                  },
                  {
                    qFa: 'آیا اطلاعات ما روی سرورهای امن نگهداری می‌شود؟',
                    qEn: 'Where and how is our company data stored?',
                    aFa: 'تمام داده‌ها با استاندارد رمزنگاری AES-256 ذخیره شده و بکاپ‌گیری روزانه در چند دیتاسنتر ایزوله انجام می‌پذیرد.',
                    aEn: 'All data is encrypted in-transit and at-rest using AES-256 with automated geo-replicated backups.',
                  },
                  {
                    qFa: 'نحوه دریافت فاکتور رسمی به چه شکل است؟',
                    qEn: 'Do you provide official tax invoices for organizations?',
                    aFa: 'فاکتور رسمی شرکتی دارای کد اقتصادی بلافاصله پس از پرداخت به صورت اتوماتیک در فرمت PDF و کارتابل ارسال می‌گردد.',
                    aEn: 'Official compliance tax invoices and receipts are issued automatically upon payment confirmation.',
                  },
                ].map((item, idx) => {
                  const isOpen = faqOpenIdx === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        soundFx.playClick(600);
                        setFaqOpenIdx(isOpen ? null : idx);
                      }}
                      className="py-4 cursor-pointer group"
                    >
                      <div className="flex justify-between items-center gap-4">
                        <h4 className="font-['Lalezar'] text-lg text-white group-hover:text-cyan-300 transition-colors">
                          {isRtl ? item.qFa : item.qEn}
                        </h4>
                        <ChevronDown className={`w-4 h-4 text-cyan-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>
                      {isOpen && (
                        <p className="text-xs text-zinc-300 font-light leading-relaxed pt-2 animate-in fade-in duration-150">
                          {isRtl ? item.aFa : item.aEn}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 09: MULTI-STEP INTERACTIVE CONTACT & LEAD FORM                  */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'FORMS_LEADS') && (
            <section id="element-09" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">09 // CONTACT &amp; LEAD FORM WITH VALIDATION</span>
                <span className="text-emerald-400">ACTIVE FORM VALIDATION</span>
              </div>

              {formSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-[#17171D] rounded-2xl border border-emerald-500/40 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-12 h-12 text-[#B8FF3D] mx-auto" />
                  <h4 className="font-['Lalezar'] text-2xl text-white">
                    {isRtl ? 'درخواست شما با موفقیت ثبت شد!' : 'Form Submitted Successfully!'}
                  </h4>
                  <p className="text-xs text-zinc-300">
                    {isRtl ? 'کارشناسان ما ظرف کمتر از ۱ ساعت آینده با شما تماس خواهند گرفت.' : 'Our team will reach out within 1 business hour.'}
                  </p>
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-white mt-2"
                  >
                    {isRtl ? 'ارسال پیام جدید' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    soundFx.playChime(850, 0.2);
                    setFormSubmitted(true);
                  }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 block">{isRtl ? 'نام و نام خانوادگی' : 'Full Name'}</label>
                    <input
                      required
                      type="text"
                      placeholder={isRtl ? 'مثلاً علی کریمی' : 'e.g. Johnathan Smith'}
                      className="w-full bg-[#17171D] border border-[#202027] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 block">{isRtl ? 'شماره تماس یا ایمیل' : 'Email or Phone'}</label>
                    <input
                      required
                      type="text"
                      placeholder={isRtl ? '۰۹۱۲۰۰۰۰۰۰۰ یا ایمیل سازمانی' : 'name@company.com'}
                      className="w-full bg-[#17171D] border border-[#202027] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 block">{isRtl ? 'موضوع پروژه یا سوال' : 'Project Scope or Inquiry'}</label>
                    <textarea
                      rows={3}
                      placeholder={isRtl ? 'توضیحات مختصر در مورد پروژه مورد نظر...' : 'Briefly describe your requirements...'}
                      className="w-full bg-[#17171D] border border-[#202027] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="sm:col-span-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-black font-['Lalezar'] text-base font-bold shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4 text-black" />
                    <span>{isRtl ? 'ثبت و ارسال درخواست مشاوره' : 'Submit Project Inquiry'}</span>
                  </button>
                </form>
              )}
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 10: TEAM MEMBERS SHOWCASE                                       */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-10" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                10 // TEAM MEMBERS &amp; LEADERSHIP
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { nameFa: 'مهندس نوید فرهمند', nameEn: 'Navid Farahmand', roleFa: 'هم‌بنیان‌گذار و معمار نرم‌افزار', roleEn: 'Co-Founder & Chief Architect' },
                  { nameFa: 'سحر نیک‌فر', nameEn: 'Sahar Nikfar', roleFa: 'سرپرست تیم طراحی محصول', roleEn: 'Head of Product Design' },
                  { nameFa: 'داریوش کاظمی', nameEn: 'Dariush Kazemi', roleFa: 'مدیر مهندسی هوش مصنوعی', roleEn: 'Lead AI Engineer' },
                ].map((m, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#17171D] border border-[#202027] text-center space-y-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 p-0.5 mx-auto">
                      <div className="w-full h-full bg-[#111116] rounded-full flex items-center justify-center font-mono font-bold text-cyan-300">
                        0{idx + 1}
                      </div>
                    </div>
                    <h4 className="font-['Lalezar'] text-xl text-white">{isRtl ? m.nameFa : m.nameEn}</h4>
                    <span className="text-xs text-cyan-400 block font-light">{isRtl ? m.roleFa : m.roleEn}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 11: STEP-BY-STEP PROCESS / HOW IT WORKS                         */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'HERO_CTA') && (
            <section id="element-11" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                11 // HOW IT WORKS &bull; 3-STEP PROCESS TIMELINE
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {[
                  { step: '01', titleFa: 'تحلیل نیازمندی‌ها', titleEn: 'Discovery & Audit', descFa: 'بررسی اهداف، پرسونای مخاطب و تدوین نقشه راه پروژه.', descEn: 'In-depth scoping, target audience mapping, and roadmap.' },
                  { step: '02', titleFa: 'طراحی و توسعه تعاملی', titleEn: 'Design & Engineering', descFa: 'کدنویسی فرانت‌اند، اتصال به دیتابیس و انیمیشن‌های روان.', descEn: 'Production-grade code, seamless animations, and APIs.' },
                  { step: '03', titleFa: 'تست، انتشار و مقیاس', titleEn: 'QA, Launch & Scale', descFa: 'تست استرس، استقرار روی سرورهای ابری و شروع پشتیبانی.', descEn: 'Performance benchmarking, zero-downtime launch, and SLAs.' },
                ].map((st, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#17171D] border border-[#202027] space-y-2 relative">
                    <span className="font-mono text-3xl text-cyan-400/40 font-black block">{st.step}</span>
                    <h4 className="font-['Lalezar'] text-xl text-white">{isRtl ? st.titleFa : st.titleEn}</h4>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">{isRtl ? st.descFa : st.descEn}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 12: PRODUCT DETAIL CARD WITH VARIANT PICKER                     */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'PRICING_COMMERCE') && (
            <section id="element-12" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <div className="flex justify-between items-center border-b border-[#202027] pb-4 font-mono text-xs">
                <span className="text-cyan-400 font-bold">12 // E-COMMERCE PRODUCT CARD WITH COLOR SELECTOR</span>
                <span className="text-emerald-400">IN STOCK &bull; آماده ارسال</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center bg-[#17171D] p-6 rounded-2xl border border-[#202027]">
                <div className="sm:col-span-5 h-48 rounded-xl bg-black border border-white/10 flex items-center justify-center p-4">
                  <div
                    className="w-24 h-24 rounded-2xl shadow-2xl transition-all duration-300"
                    style={{
                      backgroundColor: productColor === 'CYAN' ? '#22D3EE' : productColor === 'VIOLET' ? '#7C3AED' : '#10B981',
                      boxShadow: `0 0 30px ${productColor === 'CYAN' ? '#22D3EE' : productColor === 'VIOLET' ? '#7C3AED' : '#10B981'}55`,
                    }}
                  />
                </div>
                <div className="sm:col-span-7 space-y-4">
                  <h4 className="font-['Lalezar'] text-2xl text-white">
                    {isRtl ? 'هاب کنترل هوشمند نسل ۳' : 'OmniControl Smart Hub Pro Gen-3'}
                  </h4>
                  <div className="font-['Lalezar'] text-2xl text-cyan-300">
                    {isRtl ? '۴,۸۵۰,۰۰۰ تومان' : '$149.00 USD'}
                  </div>
                  {/* Color variant chips */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-mono text-zinc-400 block">{isRtl ? 'انتخاب رنگ بدنه:' : 'Select Finish:'}</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'CYAN', color: 'bg-cyan-400' },
                        { id: 'VIOLET', color: 'bg-violet-600' },
                        { id: 'EMERALD', color: 'bg-emerald-500' },
                      ].map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            soundFx.playTick(750);
                            setProductColor(c.id as any);
                          }}
                          className={`w-6 h-6 rounded-full ${c.color} transition-all ${
                            productColor === c.id ? 'ring-2 ring-white scale-125' : 'opacity-60'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <button className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-black font-['Lalezar'] text-sm font-bold flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-black" />
                    <span>{isRtl ? 'افزودن به سبد خرید' : 'Add to Cart'}</span>
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 13: ANNOUNCEMENT BAR & TICKER                                   */}
          {/* ----------------------------------------------------------------------- */}
          {announcementVisible && (
            <section id="element-13" className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-900/80 to-cyan-900/80 border border-cyan-400/40 flex items-center justify-between text-xs font-mono px-6 shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8FF3D] animate-ping" />
                <span className="font-bold text-white">
                  {isRtl ? 'تخفیف ویژه نوروزی استودیو: ۳۰٪ تخفیف روی تمامی پکیج‌های وب و سئو' : 'Q2 Enterprise Promo: 30% Off on Full-Throttle Web & AI Bot Suites'}
                </span>
              </div>
              <button
                onClick={() => setAnnouncementVisible(false)}
                className="text-zinc-400 hover:text-white p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 14: TABBED CONTENT & CAPABILITY SWITCHER                        */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-14" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                14 // TABBED FEATURE SWITCHER
              </span>
              <div className="flex gap-2 border-b border-[#202027] pb-3 overflow-x-auto">
                {[
                  { titleFa: 'زیرساخت ابری', titleEn: 'Cloud Engine' },
                  { titleFa: 'ایجنت‌های هوش مصنوعی', titleEn: 'AI Agents' },
                  { titleFa: 'تحلیل داده و گزارش‌گیری', titleEn: 'Analytics Suite' },
                ].map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      soundFx.playClick(650);
                      setActiveTabIdx(idx);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shrink-0 ${
                      activeTabIdx === idx ? 'bg-cyan-400 text-black' : 'bg-[#17171D] text-zinc-400'
                    }`}
                  >
                    {isRtl ? t.titleFa : t.titleEn}
                  </button>
                ))}
              </div>
              <div className="p-6 rounded-2xl bg-[#17171D] border border-white/5 space-y-2">
                <h4 className="font-['Lalezar'] text-xl text-white">
                  {activeTabIdx === 0 && (isRtl ? 'مدیریت و مقیاس‌پذیری خودکار سرورها' : 'Automated Edge Infrastructure Orchestration')}
                  {activeTabIdx === 1 && (isRtl ? 'اتصال هوش مصنوعی چندوجهی به پیام‌رسان‌ها' : 'Multimodal Agent Workflows for Telegram & Web')}
                  {activeTabIdx === 2 && (isRtl ? 'داشبورد بلادرنگ با نمودارهای تحلیلی' : 'Real-Time Telemetry & Funnel Conversion Analytics')}
                </h4>
                <p className="text-xs text-zinc-300 font-light leading-relaxed">
                  {isRtl
                    ? 'پلتفرم به طور خودکار بار سرور را بالانس کرده و ترافیک ناگهانی را بدون افت کیفیت پاسخ می‌دهد.'
                    : 'Engineered for seamless horizontal scale, zero-config load balancing, and instant failover resiliency.'}
                </p>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 15: US VS COMPETITORS COMPARISON TABLE                          */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'SOCIAL_PROOF') && (
            <section id="element-15" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                15 // US VS. COMPETITORS MATRIX
              </span>
              <div className="overflow-x-auto">
                <table className="w-full text-right font-mono text-xs divide-y divide-[#202027]">
                  <thead>
                    <tr className="text-zinc-400">
                      <th className="py-3 px-4">{isRtl ? 'ویژگی مهندسی' : 'Feature'}</th>
                      <th className="py-3 px-4 text-cyan-400 font-bold">{isRtl ? 'استودیو ۱۲۳سرویس' : '123Service'}</th>
                      <th className="py-3 px-4 text-zinc-500">{isRtl ? 'آژانس‌های معمولی' : 'Legacy Agencies'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#202027]">
                    {[
                      { fFa: 'کدنویسی بدون قالب آماده', fEn: 'Zero Pre-made Templates', us: true, other: false },
                      { fFa: 'دارایی‌های سلف‌هاست بدون تحریم', fEn: 'Self-hosted Runtime Assets', us: true, other: false },
                      { fFa: 'سرعت لودینگ زیر ۲ ثانیه', fEn: 'Sub-2s Google PageSpeed 100', us: true, other: false },
                      { fFa: 'گارانتی رسمی عملکرد SLA', fEn: 'Guaranteed Turn-Key SLA', us: true, other: true },
                    ].map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-white/5">
                        <td className="py-3 px-4 text-white font-['Vazirmatn']">{isRtl ? row.fFa : row.fEn}</td>
                        <td className="py-3 px-4 text-[#B8FF3D] font-bold">
                          {row.us ? <CheckCircle2 className="w-4 h-4 text-[#B8FF3D] inline" /> : '—'}
                        </td>
                        <td className="py-3 px-4 text-zinc-500">
                          {row.other ? <CheckCircle2 className="w-4 h-4 text-zinc-500 inline" /> : <X className="w-4 h-4 text-rose-500 inline" />}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 16: NEWSLETTER & LEAD MAGNET SUBSCRIPTION                        */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'FORMS_LEADS') && (
            <section id="element-16" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-4 text-center max-w-2xl mx-auto">
              <Mail className="w-8 h-8 text-cyan-400 mx-auto" />
              <h4 className="font-['Lalezar'] text-2xl text-white">
                {isRtl ? 'عضویت در خبرنامه تحلیلی استودیو' : 'Subscribe to Engineering & Design Dispatch'}
              </h4>
              <p className="text-xs text-zinc-400 font-light">
                {isRtl ? 'هر هفته یک مقاله تخصصی در حوزه هوش مصنوعی، ترندهای دیزاین و بهینه‌سازی وب.' : 'Weekly deep-dives into creative technology, WebGL shaders, and high-conversion UI.'}
              </p>
              <div className="flex gap-2 max-w-md mx-auto pt-2">
                <input
                  type="email"
                  placeholder={isRtl ? 'ایمیل کاری شما...' : 'your.email@domain.com'}
                  className="flex-1 bg-[#17171D] border border-[#202027] rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={() => soundFx.playChime(800, 0.15)}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 text-black font-['Lalezar'] text-xs font-bold"
                >
                  {isRtl ? 'عضویت رایگان' : 'Subscribe'}
                </button>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 17: CONTACT, MAP & OFFICE HOURS CARD                            */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-17" className="p-8 sm:p-10 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                17 // LOCATION, CONTACT &amp; OFFICE HOURS
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-[#17171D] border border-[#202027] space-y-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  <h5 className="font-['Lalezar'] text-lg text-white">{isRtl ? 'آدرس استودیو' : 'Studio Location'}</h5>
                  <p className="text-xs text-zinc-400 font-light">
                    {isRtl ? 'تهران، میدان ونک، برج فناوری سرو، طبقه ۱۲' : 'Srv Tech Tower, 12th Floor, Vanak Sq, Tehran & Global'}
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#17171D] border border-[#202027] space-y-2">
                  <Phone className="w-5 h-5 text-violet-400" />
                  <h5 className="font-['Lalezar'] text-lg text-white">{isRtl ? 'خط تماس و پشتیبانی' : 'Phone & Telegram'}</h5>
                  <p className="text-xs text-zinc-400 font-light">+98 21 8899 1230 &bull; @Service123Studio</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#17171D] border border-[#202027] space-y-2">
                  <Clock className="w-5 h-5 text-[#B8FF3D]" />
                  <h5 className="font-['Lalezar'] text-lg text-white">{isRtl ? 'ساعات کاری' : 'Working Hours'}</h5>
                  <p className="text-xs text-zinc-400 font-light">
                    {isRtl ? 'شنبه تا چهارشنبه: ۹ الی ۱۸ // پشتیبانی سرور ۲۴/۷' : 'Sat - Wed: 9:00 - 18:00 UTC+3.5 // 24/7 Server Ops'}
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 18: CORPORATE MULTI-COLUMN FOOTER                               */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-18" className="p-8 sm:p-10 rounded-3xl bg-[#09090B] border border-[#202027] shadow-2xl space-y-6">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                18 // MULTI-COLUMN FOOTER WITH LEGAL LINKS
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono">
                <div className="space-y-2">
                  <span className="text-white font-bold block">{isRtl ? 'دپارتمان‌ها' : 'Departments'}</span>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'طراحی لوگو' : 'Identity'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'توسعه وب' : 'Web Systems'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'هوش مصنوعی' : 'AI Bots'}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white font-bold block">{isRtl ? 'شرکت' : 'Company'}</span>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'درباره ما' : 'About'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'فرصت‌های شغلی' : 'Careers'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'تماس با ما' : 'Contact'}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white font-bold block">{isRtl ? 'قوانین' : 'Legal'}</span>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'حریم خصوصی' : 'Privacy'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'شرایط استفاده' : 'Terms'}</p>
                  <p className="text-zinc-500 hover:text-white cursor-pointer">{isRtl ? 'توافق‌نامه SLA' : 'SLA Terms'}</p>
                </div>
                <div className="space-y-2">
                  <span className="text-white font-bold block">{isRtl ? 'امنیت و اعتبار' : 'Trust'}</span>
                  <p className="text-emerald-400">{isRtl ? 'تاییدیه نماد اعتماد' : 'Verified Enamad'}</p>
                  <p className="text-zinc-500">{isRtl ? 'عضو نظام صنفی رایانه‌ای' : 'National IT Guild'}</p>
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 19: COOKIE CONSENT & PRIVACY COMPLIANCE NOTICE                  */}
          {/* ----------------------------------------------------------------------- */}
          {!cookieConsentDismissed && (
            <section id="element-19" className="p-4 rounded-2xl bg-[#111116] border border-[#202027] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <Info className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>
                  {isRtl
                    ? 'این وب‌سایت از کوکی‌های فنی ضروری جهت بهبود تجربه کاربری و حفظ نشست استفاده می‌کند.'
                    : 'We use necessary functional cookies to optimize performance and persist session state.'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCookieConsentDismissed(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-400 text-black font-bold"
                >
                  {isRtl ? 'پذیرش کوکی‌ها' : 'Accept Cookies'}
                </button>
                <button
                  onClick={() => setCookieConsentDismissed(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#17171D] text-zinc-400 hover:text-white"
                >
                  {isRtl ? 'بستن' : 'Dismiss'}
                </button>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 20: SEARCH & FILTER BAR                                         */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'FORMS_LEADS') && (
            <section id="element-20" className="p-6 rounded-3xl bg-[#111116] border border-[#202027] space-y-4">
              <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block font-bold">
                20 // DYNAMIC LIVE SEARCH &amp; TAG FILTER BAR
              </span>
              <div className="flex flex-wrap gap-2 items-center">
                <input
                  type="text"
                  placeholder={isRtl ? 'جستجو در مقالات، خدمات یا محصولات...' : 'Search documentation, services or items...'}
                  className="flex-1 min-w-[200px] bg-[#17171D] border border-[#202027] rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
                <div className="flex gap-1.5 overflow-x-auto">
                  {['Web Design', 'AI Bots', 'SEO', 'Branding'].map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-lg bg-[#17171D] text-zinc-400 text-[10px] font-mono cursor-pointer hover:text-white hover:bg-white/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 21: FLOATING LIVE CHAT & SUPPORT WIDGET                         */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'FORMS_LEADS') && (
            <section id="element-21" className="p-6 rounded-3xl bg-[#111116] border border-[#202027] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-400 text-black flex items-center justify-center font-bold">
                  21
                </div>
                <div>
                  <h5 className="font-['Lalezar'] text-lg text-white">
                    {isRtl ? 'ویجت شناور پشتیبانی آنلاین و گفتگو' : 'Floating Support & Instant Chat Widget'}
                  </h5>
                  <span className="text-xs text-zinc-400 font-light block">
                    {isRtl ? 'آماده برای ادغام با Raychat, Crisp, Goftino یا Telegram' : 'Compatible with Crisp, Intercom, Telegram webhook'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => soundFx.playChime(900, 0.2)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-400 text-black font-['Lalezar'] text-xs font-bold"
              >
                {isRtl ? 'تست پاپ‌آپ چت' : 'Trigger Widget'}
              </button>
            </section>
          )}

          {/* ----------------------------------------------------------------------- */}
          {/* ELEMENT 22: ACCESSIBILITY & TEXT SIZE SCALER BAR                        */}
          {/* ----------------------------------------------------------------------- */}
          {(activeCategory === 'ALL' || activeCategory === 'CONTENT_NAV') && (
            <section id="element-22" className="p-6 rounded-3xl bg-[#111116] border border-[#202027] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center font-bold">
                  22
                </div>
                <div>
                  <h5 className="font-['Lalezar'] text-lg text-white">
                    {isRtl ? 'نوار دسترس‌پذیری و تنظیم کنتراست (WCAG AA)' : 'Accessibility & Contrast Controller'}
                  </h5>
                  <span className="text-xs text-zinc-400 font-light block">
                    {isRtl ? 'استاندارد رعایت حقوق افراد کم‌بینا و کنترل کنتراست متن' : 'High contrast toggle & text resize accessibility toolbar'}
                  </span>
                </div>
              </div>
              <div className="flex gap-1.5 font-mono text-xs">
                <button className="px-2.5 py-1 rounded bg-[#17171D] text-zinc-300 hover:text-white">A-</button>
                <button className="px-2.5 py-1 rounded bg-[#17171D] text-zinc-300 hover:text-white">A</button>
                <button className="px-2.5 py-1 rounded bg-[#17171D] text-zinc-300 hover:text-white">A+</button>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}
