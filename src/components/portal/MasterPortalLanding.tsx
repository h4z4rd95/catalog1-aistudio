import React from 'react';
import { soundFx } from '../../utils/audio';
import { PortalRoute } from '../common/StandardHeader';
import {
  Sparkles,
  Layers,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Coffee,
  Cpu,
  Gamepad2,
  Box,
  Compass,
  Feather,
  Monitor,
  Flame,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  Copy,
  Terminal,
  Zap,
  Globe
} from 'lucide-react';

interface MasterPortalLandingProps {
  onNavigate: (route: PortalRoute) => void;
  onOpenAiPlaybook: (initialId?: string) => void;
  language?: 'en' | 'fa';
}

export default function MasterPortalLanding({
  onNavigate,
  onOpenAiPlaybook,
  language = 'fa',
}: MasterPortalLandingProps) {
  const isFa = language === 'fa';

  const standaloneProjects = [
    {
      id: 'STUDIO_123' as PortalRoute,
      playbookId: 'STUDIO_123',
      titleFa: '⚡ استودیو ۱۲۳سرویس (موتور خلاقیت)',
      titleEn: '⚡ 123Service Digital Creative Engine',
      subtitleFa: 'وب‌سایت کامل آژانس خلاقیت دیجیتال با تردهای فیزیکال سبد خرید، فرم‌های محاسباتی تخمین پروژه و فروشگاه تخصصی',
      subtitleEn: 'Production agency platform with interactive elastic cart thread physics, dynamic project pricing calculators, and dual RTL/LTR support',
      tech: ['React 19', 'Tailwind v4', 'Canvas 2D Physics', 'Cart Engine'],
      badge: isFa ? 'وب‌سایت کامل پروداکشن' : 'Full Production Site',
      color: 'from-violet-600 via-indigo-600 to-cyan-400',
      icon: Zap,
    },
    {
      id: 'PERSIAN_MUQARNAS_WORLD' as PortalRoute,
      playbookId: 'PERSIAN_MUQARNAS_WORLD',
      titleFa: '🏛️ معماری پارسی مقرنس (Persian Neofuturism)',
      titleEn: '🏛️ Persian Muqarnas Architecture 3D',
      subtitleFa: 'طاق‌های معلق مقرنس با محاسبات ریاضی سه‌بعدی، شیدرهای شکست نور رنگی ارسی و فانوس اصیل قاجاری با چرخش ۳۶۰ درجه',
      subtitleEn: 'Parametric 3D Islamic honeycomb vaulting with real-time solar caustics, stained-glass dispersion, and 360-degree orbit inspection',
      tech: ['Three.js WebGL', 'Parametric Vaults', 'Orsi Caustics Shaders'],
      badge: isFa ? 'نئوفیوچریسم ایرانی' : 'Persian 3D World',
      color: 'from-amber-400 via-yellow-500 to-cyan-400',
      icon: Compass,
    },
    {
      id: 'CHRONO_NEBULA_WORLD' as PortalRoute,
      playbookId: 'CHRONO_NEBULA_WORLD',
      titleFa: '⏳ ادیسه فضایی زمان (Chrono-Nebula 3D)',
      titleEn: '⏳ Chrono-Spatial Astrolabe Odyssey 3D',
      subtitleFa: 'چرخ‌دنده‌های مکانیکی استرلاب به همراه افق رویداد سیاه‌چاله کیهانی و ذرات فضایی با اسکرول ماوس',
      subtitleEn: '3D interlocking horological gears with event-horizon black hole, time-dilation scrub, and cosmic particle accretion',
      tech: ['Three.js WebGL', 'Involute Gear Math', 'Relativistic Shaders'],
      badge: isFa ? 'ساعت‌سازی لوکس و نجوم' : 'Cosmic Astrolabe',
      color: 'from-purple-500 via-cyan-400 to-emerald-400',
      icon: Sparkles,
    },
    {
      id: 'SCROLL_WORLD_3D' as PortalRoute,
      playbookId: 'SCROLL_WORLD_3D',
      titleFa: '🎬 جهان سینمایی ۳بعدی (Three.js Scroll World)',
      titleEn: '🎬 Three.js Cinematic Scroll World Flythrough',
      subtitleFa: 'پیمایش پیوسته دوربین سه‌بعدی در طول مسیر اسپلاین فضایی در میان بنتو باکس‌های معلق و گیت‌های نئونی',
      subtitleEn: 'Inertial camera path traversing spatial bento architecture, glowing neon rings, and kinetic typography',
      tech: ['Three.js Spline Curves', 'GSAP ScrollTrigger', 'Lenis Smooth Scroll'],
      badge: isFa ? 'پرواز ۳بعدی اسکرول' : '3D Scroll Flight',
      color: 'from-cyan-400 via-violet-500 to-lime-400',
      icon: Layers,
    },
    {
      id: 'AWWWARDS_HERO' as PortalRoute,
      playbookId: 'AWWWARDS_HERO',
      titleFa: '🏆 هیرو ژورنالی اواردز (Awwwards SOTD)',
      titleEn: '🏆 Awwwards Editorial Hero & Fluted Glass',
      subtitleFa: 'ترکیب شیشه شیاردار Fluted Glass تعاملی با گرید نامتقارن، فونت رومی Cinzel و ذرات گردوغبار کیهانی',
      subtitleEn: 'Broken-grid editorial layout with WebGL fluted glass refraction responding to cursor inertia',
      tech: ['Three.js GLSL', 'Cinzel Typography', 'Simplex Shaders'],
      badge: isFa ? 'استاندارد SOTD' : 'Awwwards Quality',
      color: 'from-amber-400 via-rose-500 to-amber-300',
      icon: Flame,
    },
    {
      id: 'COFFEE_SAMPLE' as PortalRoute,
      playbookId: 'COFFEE_SAMPLE',
      titleFa: '☕ ۱۲۳کافی (دانه ۳بعدی و اسکرول)',
      titleEn: '☕ 123 Coffee — 3D Parametric Bean Landing',
      subtitleFa: 'مدل سه‌بعدی دانه قهوه با شیار ارگانیک طبیعی (Cleft)، درخشش روغن‌های برشته‌کاری و تغییر رنگ با اسکرول',
      subtitleEn: 'Photorealistic coffee bean with organic cleft, oil reflections, and scroll-responsive roasting stages',
      tech: ['Three.js WebGL', 'MeshPhysicalMaterial', 'ACES Filmic'],
      badge: isFa ? 'مدل دانه ارگانیک' : '3D Roast Bean',
      color: 'from-amber-500 via-orange-600 to-yellow-500',
      icon: Coffee,
    },
    {
      id: 'PC_BUILDER_SAMPLE' as PortalRoute,
      playbookId: 'PC_BUILDER_SAMPLE',
      titleFa: '🖥️ اسمبلر سخت‌افزار (همگرایی ستاره‌ای)',
      titleEn: '🖥️ PC Builder — Scroll Star Convergence Assembly',
      subtitleFa: 'همگرایی ارتعاشی ۸ قطعه سخت‌افزاری به سمت مرکز کیس شیشه‌ای آکواریومی با چرخش طبیعی اسکرول ماوس',
      subtitleEn: '8 individual hardware components converging into a complete gaming rig as user scrolls down',
      tech: ['Three.js Rig', 'Sticky Viewport 220vh', 'Exploded View'],
      badge: isFa ? 'چرخش اسکرول ماوس' : 'Star Convergence',
      color: 'from-cyan-400 via-blue-500 to-indigo-600',
      icon: Monitor,
    },
    {
      id: 'WIKI_GAME_SAMPLE' as PortalRoute,
      playbookId: 'WIKI_GAME_SAMPLE',
      titleFa: '🎮 سوپرسایت ویکی‌گیم (۳ مدل صفحه اصلی + ۳ مدل صفحه داخلی)',
      titleEn: '🎮 WikiGame Super-Site (3 Home + 3 Detail Layouts)',
      subtitleFa: 'پرتال جامع بازی‌های ویدئویی با ۳ تم هولوگرافیک، بنتو و سینمایی، به همراه آزمایشگاه بنچمارک نرخ فریم کارت‌های گرافیک',
      subtitleEn: 'Comprehensive gaming portal with Holographic Matrix, Bento Command Center, and FPS Benchmark Lab',
      tech: ['React 19', 'Benchmark Math Engine', '3D Tilt Coverflow'],
      badge: isFa ? 'سوپرسایت گیمینگ' : 'Super-Site',
      color: 'from-rose-500 via-purple-600 to-cyan-400',
      icon: Gamepad2,
    },
    {
      id: 'STUDIO_ELEMENTS_SAMPLE' as PortalRoute,
      playbookId: 'STUDIO_123',
      titleFa: '🧩 ۲۰ المان ضروری سایت (RTL & LTR)',
      titleEn: '🧩 20 Essential UI Elements (Production Ready)',
      subtitleFa: 'کالکشن کامل المان‌های پرکاربرد شامل فرم‌ها، جداول، تب‌ها، آکاردئون‌ها، مدال‌ها و کارت‌های تعاملی دو زبانه',
      subtitleEn: 'Complete production-grade UI design system elements with full RTL / LTR layout shifting support',
      tech: ['React 19', 'Tailwind v4', 'RTL Engine', 'Haptic Sounds'],
      badge: isFa ? '۲۰ کامپوننت حیاتی' : '20 Essential UI Elements',
      color: 'from-cyan-400 via-indigo-500 to-violet-500',
      icon: Layers,
    },
    {
      id: 'SAMPLE_WEBSITE' as PortalRoute,
      playbookId: 'STUDIO_123',
      titleFa: '🛍️ وبسایت و فروشگاه لوکس آورا',
      titleEn: '🛍️ Aura Luxury E-Commerce Store',
      subtitleFa: 'فروشگاه کامل با سبد خرید ایجکس، درگاه پرداخت گلس‌مورفیک سه‌بعدی و کد تخفیف خودکار',
      subtitleEn: 'Luxury digital and physical artifacts store with multi-currency conversions and 4-step checkout progression',
      tech: ['Store Context', '3D Card Tilt', 'Multi-Currency'],
      badge: isFa ? 'فروشگاه و پرداخت' : 'Full Store',
      color: 'from-emerald-400 via-teal-500 to-cyan-400',
      icon: ShoppingBag,
    },
    {
      id: 'GLTF_STUDIO' as PortalRoute,
      playbookId: 'GLTF_STUDIO',
      titleFa: '📦 استودیو GLTF/GLB و دراپ ۳بعدی',
      titleEn: '📦 Universal 3D Drag & Drop Studio & PBR Inspector',
      subtitleFa: 'پارس و بازرسی فایل‌های سه‌بعدی کاربر با درگ اند دراپ، نورپردازی‌های ACES Filmic، حالت‌های وایرفریم و خروجی تصویر',
      subtitleEn: 'Client 3D file dropzone with instant binary FileReader GLTF parsing, OrbitControls, and PBR shader tuning',
      tech: ['Three.js GLTFLoader', 'FileReader API', 'PBR Shaders'],
      badge: isFa ? 'لودر فایل سه‌بعدی' : '3D Dropzone',
      color: 'from-cyan-400 via-emerald-400 to-indigo-500',
      icon: Box,
    },
    {
      id: 'VOICE_CALLIGRAPHY' as PortalRoute,
      playbookId: 'VOICE_CALLIGRAPHY',
      titleFa: '🎙️ خطاطی صوتی و ارتعاش قلم با میکروفون',
      titleEn: '🎙️ Voice-to-Calligraphy Acoustical Siah-Mashq Engine',
      subtitleFa: 'تحلیل زنده طیف صوت از طریق میکروفون، اتصال دامنه صوت به دانگ قلم نی، تذهیب طلا و اشعار کهن فارسی',
      subtitleEn: 'Real-time microphonic frequency analysis modulating Persian reed pen stroke widths, gold foil particles, and poetry',
      tech: ['Web Audio API', 'AnalyserNode FFT 512', 'Canvas 2D Brush'],
      badge: isFa ? 'سیاه‌مشق صوت' : 'Voice Pen',
      color: 'from-amber-400 via-rose-500 to-yellow-500',
      icon: Feather,
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#040508] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-24">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[600px] right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16 relative z-10">
        {/* ================================================================= */}
        {/* MASTER HERO HEADER INTRO                                          */}
        {/* ================================================================= */}
        <div className="text-center space-y-4 max-w-4xl mx-auto pt-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs uppercase tracking-widest shadow-lg shadow-cyan-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>ELITE CREATIVE TECHNOLOGIST &amp; UI ARCHITECTURE MATRIX</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight font-['Syne'] leading-tight">
            {isFa ? (
              <>
                پورتال جامع نوآوری‌های فرانت‌اند، <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400">
                  کاتالوگ تعاملی و سوپرسایت‌های استودیو
                </span>
              </>
            ) : (
              <>
                Awwwards-Tier Creative Engine, <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400">
                  Interactive Catalog &amp; Production Portals
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg text-zinc-400 font-['Vazirmatn'] max-w-3xl mx-auto leading-relaxed">
            {isFa
              ? 'دسترسی ساختاریافته به ۶۰+ قطعه کاتالوگ حرکتی و وب‌جی‌ال در ۱۲ دسته‌بندی تخصصی، پروژه‌های مستقل سه‌بعدی و معماری ایرانی، همراه با دفترچه راهنمای کامل پرامپت‌های ایجنت هوش مصنوعی.'
              : 'Structured portal to 60+ interactive WebGL and kinetic showroom variations across 12 disciplines, bespoke 3D worlds, and comprehensive AI agent prompt blueprints.'}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                soundFx.playChime(800, 0.2);
                onNavigate('SHOWROOM_HUB');
              }}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-cyan-500/25"
            >
              <span>{isFa ? 'ورود به هاب کاتالوگ (۱۲ دسته‌بندی)' : 'Explore Showroom Hub'}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playChime(900, 0.2);
                onOpenAiPlaybook();
              }}
              className="px-6 py-3 rounded-2xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'دفترچه راهنمای هوش مصنوعی' : 'AI Agent Playbook'}</span>
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 1: THE MASTER SHOWROOM 60-ITEM FLAGSHIP CARD             */}
        {/* ================================================================= */}
        <div className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-br from-[#0c0f17] via-[#090b10] to-[#0d0914] border-2 border-cyan-500/40 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase tracking-widest">
                <Layers className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span>{isFa ? 'بخش ۱: نمایشگاه جامع کاتالوگ المان‌ها' : 'SECTION 1: MASTER VISUAL SHOWROOM'}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white font-['Syne'] tracking-tight">
                🏛️ {isFa ? 'نمایشگاه ۶۰ قطعه و نمونه‌های فارسی' : '60-Item Showroom & Persian Suites'}
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 font-['Vazirmatn'] leading-relaxed">
                {isFa
                  ? 'مجموعه عظیم ۶۰+ قطعه تعاملی در ۱۲ دسته‌بندی معماری: هیرو سکشن‌های Next.js، سیستم‌های ناوبری، لودرها، اسکرول سه‌بعدی، فوترها، داشبوردهای پرتراکم، تجارت الکترونیک فضایی، هنر زایشی، تایپوگرافی کینتیک و مقرنس ایرانی. هر دسته‌بندی اکنون دارای صفحه مستقل و متمرکز است.'
                  : 'Massive suite of 60+ interactive components across 12 architectural batches: Heroes, Navigations, Loaders, Scroll Choreographies, Footers, Dashboards, Products, Generative Art, Typography, Shaders, Forms, and Spatial Canvases.'}
              </p>

              {/* 12 Disciplines Mini Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {[
                  '1. Heroes', '2. Navigations', '3. Loaders', '4. Scroll 3D',
                  '5. Footers', '6. Dashboards', '7. Products', '8. Generative',
                  '9. Typography & Persian', '10. Shaders', '11. Forms', '12. Spatial GLTF'
                ].map((b) => (
                  <span
                    key={b}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 font-mono text-[11px] text-zinc-300"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons to Showroom Hub */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <button
                onClick={() => {
                  soundFx.playChime(850, 0.2);
                  onNavigate('SHOWROOM_HUB');
                }}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-mono text-sm font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-cyan-500/30"
              >
                <span>{isFa ? 'ورود به هاب دسته‌بندی‌های کاتالوگ' : 'Open Showroom Categories Hub'}</span>
                <ArrowLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  soundFx.playClick(700);
                  onNavigate('CATALOG');
                }}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              >
                <span>{isFa ? 'مشاهده یکپارچه تمام ۶۰ قطعه' : 'View Complete 60 Items'}</span>
                <ExternalLink className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 2: STANDALONE BESPOKE PRODUCTION PROJECTS                 */}
        {/* ================================================================= */}
        <div className="space-y-8 pt-6">
          <div className="border-b border-white/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest mb-1.5">
                <Box className="w-4 h-4 text-amber-400" />
                <span>{isFa ? 'بخش ۲: پروژه‌ها و لندینگ‌های مستقل استودیو' : 'SECTION 2: BESPOKE STUDIO PROJECTS'}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne'] tracking-tight">
                {isFa ? 'تمام پروژه‌های طراحی و پیاده‌سازی‌شده' : 'Standalone Immersive Production Projects'}
              </h2>
              <p className="text-sm text-zinc-400 mt-1 max-w-3xl font-['Vazirmatn']">
                {isFa
                  ? 'تمامی پروژه‌های تخصصی ایجاد شده در طول پروژه، به ترتیب درخواست و پیاده‌سازی، با قابلیت ورود مستقیم و مشاهده دفترچه راهنمای هوش مصنوعی.'
                  : 'Every custom domain project crafted in this ecosystem, complete with direct navigation and AI engineering playbook specifications.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-500">
                {standaloneProjects.length} {isFa ? 'پروژه پروداکشن فعال' : 'Active Projects'}
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {standaloneProjects.map((project) => {
              const Icon = project.icon;
              return (
                <div
                  key={project.id}
                  className="rounded-3xl p-6 bg-[#080a10] border border-white/10 hover:border-cyan-400/40 transition-all group flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10"
                >
                  <div className="space-y-4">
                    {/* Top Row: Icon, Badge, Playbook button */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white/10 to-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] text-zinc-300">
                        {project.badge}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-xl font-bold text-white font-['Syne'] group-hover:text-cyan-300 transition-colors">
                        {isFa ? project.titleFa : project.titleEn}
                      </h3>
                      <p className="text-xs text-zinc-400 font-['Vazirmatn'] mt-2 leading-relaxed line-clamp-3">
                        {isFa ? project.subtitleFa : project.subtitleEn}
                      </p>
                    </div>

                    {/* Tech Chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Buttons */}
                  <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFx.playChime(750, 0.2);
                        onNavigate(project.id);
                      }}
                      className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-black text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <span>{isFa ? 'ورود به پروژه' : 'Launch Project'}</span>
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        soundFx.playChime(900, 0.2);
                        onOpenAiPlaybook(project.playbookId);
                      }}
                      className="p-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 transition-colors"
                      title={isFa ? 'مشاهده دفترچه راهنمای هوش مصنوعی' : 'View AI Playbook'}
                    >
                      <BookOpen className="w-4 h-4 text-amber-400" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* SECTION 3: AI AGENT DESIGN PLAYBOOK OVERVIEW CALLOUT              */}
        {/* ================================================================= */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-amber-950/30 via-zinc-950 to-indigo-950/40 border border-amber-400/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'بخش ۳: دفترچه راهنمای هوش مصنوعی و پرامپت‌ها' : 'AI AGENT DESIGN PLAYBOOK'}</span>
            </div>
            <h3 className="text-2xl font-black text-white font-['Syne']">
              {isFa ? 'مرجع پرامپت‌های مهندسی خلاقانه برای ایجنت‌های هوش مصنوعی' : 'Unified AI Engineering Prompt Directives'}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-['Vazirmatn'] leading-relaxed">
              {isFa
                ? 'تمامی مبانی ریاضی، شیدرهای WebGL، فیزیک انیمیشن‌ها و سبک‌های هنری در قالب پرامپت‌های ساختاریافته تدوین شده‌اند تا با کپی در هر هوش مصنوعی، نمونه‌ای اصیل و متمایز تولید شود.'
                : 'Copyable comprehensive system prompts detailing mathematical equations, shader formulas, physics constants, and creative philosophies for LLMs.'}
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playChime(950, 0.2);
              onOpenAiPlaybook();
            }}
            className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-xl shadow-amber-400/20 shrink-0"
          >
            <Copy className="w-4 h-4" />
            <span>{isFa ? 'مشاهده و کپی پرامپت‌ها' : 'Browse & Copy Prompts'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
