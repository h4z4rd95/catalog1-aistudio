import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import {
  Monitor,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  FileText,
  Volume2,
  VolumeX,
  Sun,
  Moon,
  Globe,
  Sliders,
  CheckCircle2,
  Layers,
  Shield,
  Zap,
  TrendingUp,
  Cpu
} from 'lucide-react';

interface ClientPresentationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ClientPresentationModal: React.FC<ClientPresentationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const {
    activePage,
    setActivePage,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    direction,
    toggleDirection,
    t
  } = useStore();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlayingTour, setIsPlayingTour] = useState(false);
  const [tourProgress, setTourProgress] = useState(0);
  const [showPresenterNotes, setShowPresenterNotes] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const slides = [
    {
      page: 'LANDING' as const,
      title: isFa ? 'بخش ۱: ویژن استودیو و موتور گرافیکی فضایی' : 'Slide 1: Executive Vision & Spatial Shaders',
      tag: isFa ? 'معماری بصری' : 'ARCHITECTURAL VISUALS',
      talkingPoints: [
        isFa
          ? 'رندرینگ بلادرنگ ۶۰ فریم بر ثانیه با شیدرهای رویه‌ای WebGL بدون بار سنگین روی GPU.'
          : 'Real-time 60 FPS procedural WebGL shaders rendered directly on HTML5 Canvas without client bloat.',
        isFa
          ? 'سیستم تایپوگرافی تطبیقی دو زبانه با پشتیبانی کامل از چینش فارسی RTL و انگلیسی LTR.'
          : 'Adaptive bilingual typographic grid system with complete bidirectional RTL and LTR support.',
        isFa
          ? 'طراحی مطابق استانداردهای برتر Awwwards و برنده جوایز بین‌المللی طراحی تعاملی.'
          : 'Built strictly to Awwwards Site-of-the-Day criteria, eliminating boilerplate UI patterns.'
      ],
      kpi: isFa ? 'افزایش ۳۲۰٪ ماندگاری کاربر' : '+320% User Dwell Time'
    },
    {
      page: 'STORE' as const,
      title: isFa ? 'بخش ۲: فروشگاه فضایی و ابزارهای سه‌بعدی' : 'Slide 2: Spatial E-Commerce & 3D Hardware',
      tag: isFa ? 'کاتالوگ و تجارت الکترونیک' : 'COMMERCE MATRIX',
      talkingPoints: [
        isFa
          ? 'کاتالوگ تعاملی با فیلترهای پیشرفته، دسته‌بندی‌های چندگانه و منوی مگامنو واکنش‌گرا.'
          : 'High-density multi-category catalog with instant live search and responsive mega-menu panels.',
        isFa
          ? 'پیش‌نمایش سریع کالا و کانفیگوراتور سه‌بعدی در قالب مدال‌های فوق سریع بدون رفرش صفحه.'
          : 'Instant modal quick-views, variant tier matrix, and live 3D rotate preview.',
        isFa
          ? 'پشتیبانی یکپارچه از واحدهای پولی دلار آمریکا و ریال/تومان با محاسبه هوشمند تخفیف.'
          : 'Seamless live currency formatters (USD & Toman/IRR) with real-time promo deduction engines.'
      ],
      kpi: isFa ? 'افزایش ۴۵٪ نرخ تبدیل فروش' : '+45% Checkout Conversion'
    },
    {
      page: 'PRODUCT_DETAIL' as const,
      title: isFa ? 'بخش ۳: جزئیات محصول و سفارشی‌سازی CAD' : 'Slide 3: Precision CAD Model Showcase',
      tag: isFa ? 'سفارشی‌سازی محصول' : 'PARAMETRIC VIEWER',
      talkingPoints: [
        isFa
          ? 'ابزار چرخش ۹۰ درجه برای مشاهده چندزاویه‌ای سخت‌افزارهای سایبردک و ادوات صوتی.'
          : 'Multi-axis 90-degree rotational inspect engine for tactile physical cyberdeck inspection.',
        isFa
          ? 'نوار چسبان خرید سریع در پایین صفحه، بهینه‌سازی شده برای گوشی‌های همراه و تبلت‌ها.'
          : 'Persistent sticky bottom purchase bar engineered specifically for mobile touch conversions.',
        isFa
          ? 'مشخصات فنی، گارانتی تجاری رسمی و کلیدهای دسترسی مستقیم به مخازن گیت‌هاب.'
          : 'Full technical spec sheet, commercial licensing guarantees, and automated git repo sync.'
      ],
      kpi: isFa ? 'کاهش ۶۸٪ مرجوعی کالا' : '-68% Support Return Inquiries'
    },
    {
      page: 'CART' as const,
      title: isFa ? 'بخش ۴: سبد خرید و تسویه حساب رمزنگاری شده' : 'Slide 4: Cryptographic Checkout & WebAuthn',
      tag: isFa ? 'درگاه تراکنش' : 'SECURE CHECKOUT',
      talkingPoints: [
        isFa
          ? 'پیشروی ۴ مرحله‌ای شفاف شامل بازبینی، اطلاعات پستی، اعتبارسنجی کارت و رسید نهایی.'
          : 'Transparent 4-stage checkout flow: cart audit, coordinates, encrypted payment, and receipt.',
        isFa
          ? 'پیش‌نمایش کارت هولوگرافیک سه‌بعدی متحرک با افکت گرادیان پویا.'
          : 'Live holographic 3D cipher card preview with real-time tactile form binding.',
        isFa
          ? 'صدور آنی کلید لایسنس دیجیتال با قابلیت کپی سریع و ثبت در دفترکل پایدار.'
          : 'Instant automated commercial license provisioning with single-click clipboard replication.'
      ],
      kpi: isFa ? 'تراکنش امن زیر ۱.۲ ثانیه' : '1.2s Average Settlement Speed'
    },
    {
      page: 'ABOUT' as const,
      title: isFa ? 'بخش ۵: مانیفست استودیو و تاریخچه دستاوردها' : 'Slide 5: Studio Atelier Manifesto & Awards',
      tag: isFa ? 'هویت برند' : 'BRAND CAPITAL',
      talkingPoints: [
        isFa
          ? 'جدول زمانی تکامل مهندسی استودیو از سال ۲۰۲۱ تا ۲۰۲۶ همراه با ارقام و افتخارات.'
          : 'Interactive studio timeline from 2021 founding to 2026 enterprise scale.',
        isFa
          ? 'معرفی رهبران و معماران با پروفایل‌های لینکدین و گیت‌هاب اختصاصی.'
          : 'Curated team roster featuring principal software architects and industrial designers.',
        isFa
          ? 'فلسفه کدنویسی بر پایه احساس (Vibe Coding) و ادغام هنر محاسباتی با تعاملات کاربر.'
          : 'Manifesto highlighting emotional aesthetic resonance paired with extreme technical rigor.'
      ],
      kpi: isFa ? '۱۴ افتخار بین‌المللی Awwwards' : '14 International Industry Honors'
    },
    {
      page: 'NEWS' as const,
      title: isFa ? 'بخش ۶: مرکز مقالات تخصصی، کالبدشکافی سخت‌افزار و رویدادها' : 'Slide 6: Tech Dispatches, CAD Teardowns & Intel',
      tag: isFa ? 'دانش فنی و مقالات' : 'DISPATCH DOSSIER',
      talkingPoints: [
        isFa
          ? 'آرشیو مقالات تخصصی مهندسی وب‌جی‌ال، محاسبات فرگمنت شیدر و رندرهای ری‌مارچینگ.'
          : 'High-authority technical dispatches detailing GLSL raymarching kernels and zero-latency sound synthesis.',
        isFa
          ? 'کالبدشکافی قطعات سخت‌افزاری و تولیدات آتلیه با جزییات آلیاژهای تیتانیوم و لینوکس توکار.'
          : 'Full industrial teardowns of custom CNC machined cyberdecks and mechanical timepieces.',
        isFa
          ? 'خوانشگر متنی با کدهای رنگی GLSL، برچسب‌ها و سیستم پیوند مستقیم به محصولات مرتبط در فروشگاه.'
          : 'Interactive reader with syntax-highlighted shaders, multi-tier tags, and direct commerce links.'
      ],
      kpi: isFa ? 'نرخ درگیری فنی ۸۴٪' : '84% Reader Engagement'
    },
    {
      page: 'CONTACT' as const,
      title: isFa ? 'بخش ۷: پروتکل سفارش و دفاتر جهانی' : 'Slide 7: Enterprise Commission Protocol',
      tag: isFa ? 'استعلام همکاری' : 'CLIENT ENGAGEMENT',
      talkingPoints: [
        isFa
          ? 'فرم درخواست چندبعدی همراه با انتخاب بودجه پروژه، رده خدمات و رزرو تقویم جلسه.'
          : 'Multi-discipline project dossier with capital allocation tiers and calendar consultation slotting.',
        isFa
          ? 'شبکه دفاتر بین‌المللی در توکیو، نیویورک و لندن با هماهنگی مناطق زمانی مختلف.'
          : 'Global studio coordinates across Tokyo, New York, and London with live timezone indicators.',
        isFa
          ? 'کانال ارتباطی اختصاصی با پشتیبانی از پروتکل‌های رمزنگاری PGP و توافق‌نامه‌های محرمانه.'
          : 'Confidential inquiry routing supporting PGP cryptography and enterprise master agreements.'
      ],
      kpi: isFa ? 'میانگین اندازه پروژه +$75K' : 'Avg Enterprise Deal Size: $75k+'
    }
  ];

  // Sync active page with slide
  const goToSlide = (idx: number) => {
    const validIdx = Math.max(0, Math.min(idx, slides.length - 1));
    soundFx.playChime(650 + validIdx * 50, 0.15);
    setCurrentSlideIndex(validIdx);
    setActivePage(slides[validIdx].page);
    setTourProgress(0);
  };

  const nextSlide = () => {
    goToSlide((currentSlideIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlideIndex - 1 + slides.length) % slides.length);
  };

  // Fullscreen Handler
  const toggleFullScreenMode = () => {
    soundFx.playClick(800);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullscreen(false);
        }).catch(() => {});
      }
    }
  };

  // Auto-tour timer
  useEffect(() => {
    if (!isPlayingTour) {
      setTourProgress(0);
      return;
    }

    const interval = 100;
    const totalDuration = 12000; // 12 seconds per slide
    const increment = (interval / totalDuration) * 100;

    const timer = setInterval(() => {
      setTourProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlayingTour, currentSlideIndex]);

  // Keyboard navigation for presentation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === ' ' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        setIsPlayingTour((prev) => !prev);
        soundFx.playClick(600);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowPresenterNotes((prev) => !prev);
        soundFx.playClick(700);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullScreenMode();
      } else if (e.key === 'Escape' && !document.fullscreenElement) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentSlideIndex, isPlayingTour]);

  if (!isOpen) return null;

  const currentSlide = slides[currentSlideIndex];

  return (
    <div
      dir={direction}
      className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between font-['Plus_Jakarta_Sans']"
    >
      {/* Top Presentation HUD Bar */}
      <div className="pointer-events-auto p-4 sm:p-6 flex items-center justify-between">
        {/* Brand Kiosk Badge */}
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all ${
          isLight ? 'bg-white/90 border-slate-300 text-zinc-900 shadow-slate-900/10' : 'bg-black/80 border-white/20 text-white'
        }`}>
          <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse shadow-md shadow-cyan-400" />
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider">
            <span>AURA PITCH KIOSK</span>
            <span className="text-zinc-500">|</span>
            <span className="text-cyan-500">{currentSlide.tag}</span>
          </div>
        </div>

        {/* Global Controls Dock */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-2xl backdrop-blur-xl border shadow-2xl transition-all ${
          isLight ? 'bg-white/90 border-slate-300 text-zinc-800' : 'bg-black/80 border-white/20 text-zinc-200'
        }`}>
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-amber-300" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={() => {
              toggleLanguage();
              toggleDirection();
            }}
            title={isFa ? 'Switch to English (LTR)' : 'تغییر به زبان فارسی (RTL)'}
            className="px-2.5 py-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 font-mono text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'FA' : 'EN'}</span>
          </button>

          {/* Presenter Notes Toggle */}
          <button
            onClick={() => {
              soundFx.playClick(700);
              setShowPresenterNotes(!showPresenterNotes);
            }}
            className={`p-2 rounded-xl font-mono text-xs transition-colors flex items-center gap-1.5 ${
              showPresenterNotes
                ? 'bg-cyan-400 text-black font-bold'
                : 'hover:bg-black/5 dark:hover:bg-white/10'
            }`}
            title="Toggle Presenter Talking Points (Key: N)"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold">{isFa ? 'نکات پرزنتیشن' : 'Pitch Notes'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullScreenMode}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Toggle Fullscreen (Key: F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Exit Kiosk Mode */}
          <button
            onClick={() => {
              soundFx.playClick(500);
              onClose();
            }}
            className="p-2 rounded-xl hover:bg-rose-500 hover:text-white transition-colors text-zinc-400"
            title="Exit Presentation Mode (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Presenter Talking Points Drawer (when open) */}
      {showPresenterNotes && (
        <div className={`pointer-events-auto mx-4 sm:mx-6 max-w-xl self-end p-6 rounded-3xl backdrop-blur-2xl border shadow-2xl animate-in slide-in-from-top-4 duration-300 ${
          isLight ? 'bg-white/95 border-slate-300 text-zinc-900' : 'bg-black/90 border-cyan-400/40 text-white'
        }`}>
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h4 className="font-['Syne'] font-bold text-sm tracking-wide">
                {isFa ? 'نکات کلیدی برای جلسات مذاکره با کارفرما' : 'Executive Pitch Points & Business Value'}
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-mono text-[10px] font-bold">
              {currentSlide.kpi}
            </span>
          </div>

          <ul className="space-y-2.5 text-xs">
            {currentSlide.talkingPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span className={isLight ? 'text-zinc-700' : 'text-zinc-300'}>{point}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-zinc-400">
            <span>{isFa ? 'کلیدهای میانبر: ← → فضا (پخش/توقف) | N نکات | F تمام‌صفحه' : 'Shortcuts: [← / →] Navigate, [Space] Auto-tour, [N] Notes, [F] Fullscreen'}</span>
          </div>
        </div>
      )}

      {/* Bottom Floating Interactive Presentation Controller Dock */}
      <div className="pointer-events-auto p-4 sm:p-6 flex flex-col items-center gap-3">
        {/* Progress Bar for Auto-tour */}
        {isPlayingTour && (
          <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-100"
              style={{ width: `${tourProgress}%` }}
            />
          </div>
        )}

        {/* Central Controller Bar */}
        <div className={`px-4 sm:px-6 py-3 rounded-2xl backdrop-blur-2xl border shadow-2xl flex items-center gap-4 sm:gap-6 transition-all ${
          isLight ? 'bg-white/95 border-slate-300 text-zinc-900 shadow-slate-900/15' : 'bg-black/85 border-white/20 text-white'
        }`}>
          {/* Previous Slide */}
          <button
            onClick={prevSlide}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Previous Chapter"
          >
            {isRtl ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Play/Pause Auto Tour */}
          <button
            onClick={() => {
              soundFx.playClick(650);
              setIsPlayingTour(!isPlayingTour);
            }}
            className={`p-2.5 rounded-xl font-mono text-xs font-bold flex items-center gap-2 transition-all ${
              isPlayingTour
                ? 'bg-amber-400 text-black shadow-lg shadow-amber-400/20'
                : 'bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
            }`}
            title="Auto-Play Presentation Tour (12s per slide)"
          >
            {isPlayingTour ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            <span className="hidden sm:inline font-mono text-xs font-black">
              {isPlayingTour ? (isFa ? 'توقف تور' : 'PAUSE TOUR') : (isFa ? 'شروع پرزنتیشن خودکار' : 'START TOUR')}
            </span>
          </button>

          {/* Chapter Dots */}
          <div className="flex items-center gap-2">
            {slides.map((s, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all ${
                  currentSlideIndex === idx
                    ? 'w-8 h-2.5 rounded-full bg-cyan-400 shadow-md shadow-cyan-400/40'
                    : 'w-2.5 h-2.5 rounded-full bg-zinc-600 hover:bg-zinc-400'
                }`}
                title={s.title}
              />
            ))}
          </div>

          {/* Slide Title Label */}
          <div className="hidden md:flex flex-col font-mono text-xs text-left">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest">{currentSlide.tag}</span>
            <span className="font-bold text-cyan-500">{currentSlide.title}</span>
          </div>

          {/* Next Slide */}
          <button
            onClick={nextSlide}
            className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Next Chapter"
          >
            {isRtl ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
