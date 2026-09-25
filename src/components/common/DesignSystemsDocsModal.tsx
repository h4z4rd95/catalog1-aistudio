import React, { useState } from 'react';
import {
  BookOpen,
  X,
  Sparkles,
  Layers,
  Palette,
  Cpu,
  Coffee,
  Monitor,
  Gamepad2,
  CheckCircle2,
  Sliders,
  ExternalLink,
  Flame,
  Zap,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import { soundFx } from '../../utils/audio';

interface DesignSystemsDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
  language?: 'en' | 'fa';
}

export default function DesignSystemsDocsModal({
  isOpen,
  onClose,
  language = 'fa',
}: DesignSystemsDocsModalProps) {
  const isFa = language === 'fa';
  const [activeSection, setActiveSection] = useState<'OVERVIEW' | 'COFFEE' | 'AURA_STORE' | 'PC_BUILDER' | 'WIKI_GAME' | 'SHOWROOM_PARADIGMS'>('OVERVIEW');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#090b10] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-zinc-100 font-['Plus_Jakarta_Sans']">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-amber-500 p-[1px] flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-[#0b0e14] rounded-[11px] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-['Syne'] font-black text-lg text-white">
                  {isFa ? 'داکیومنت معماری، تکنولوژی و سبک‌های طراحی' : 'Design Systems & Tech Stack Blueprint'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-mono text-cyan-300">
                  SPEC v2.4
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono">
                {isFa
                  ? 'راهنمای تحلیل تجربی سبک‌ها، تکنولوژی‌ها و الگوهای طراحی پیاده‌سازی شده در وب‌سایت‌ها'
                  : 'Comprehensive architectural evaluation of aesthetics, scroll choreography, and 3D implementations'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(500);
              onClose();
            }}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6 py-2.5 border-b border-white/10 bg-black/20 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {[
            { id: 'OVERVIEW', label: isFa ? 'خلاصه و ماتریس سبک‌ها' : 'Overview & Matrix', icon: Layers },
            { id: 'COFFEE', label: isFa ? '۱. وب‌سایت ۱۲۳کافی' : '1. 123 Coffee', icon: Coffee },
            { id: 'AURA_STORE', label: isFa ? '۲. فروشگاه آورا (تیره)' : '2. Aura Luxury Store', icon: Sparkles },
            { id: 'PC_BUILDER', label: isFa ? '۳. اسمبلر سخت‌افزار' : '3. PC Builder Rig', icon: Monitor },
            { id: 'WIKI_GAME', label: isFa ? '۴. سوپرسایت ویکی‌گیم' : '4. WikiGame Super-Site', icon: Gamepad2 },
            { id: 'SHOWROOM_PARADIGMS', label: isFa ? '۵. الگوهای کاتالوگ (۶۰ قطعه)' : '5. Showroom Paradigms', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick(600);
                  setActiveSection(tab.id as any);
                }}
                className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-cyan-400 text-black shadow-lg shadow-cyan-500/25'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 text-sm leading-relaxed">
          {/* SECTION: OVERVIEW */}
          {activeSection === 'OVERVIEW' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <Info className="w-4 h-4" />
                  <span>{isFa ? 'هدف این داکیومنت چیست؟' : 'Purpose of this Document'}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  {isFa
                    ? 'این راهنما به شما کمک می‌کند متوجه شوید هر یک از پروژه‌ها و نمونه‌ها از چه ترکیب تکنولوژی، سبک تایپوگرافی، پالت رنگ، موتور انیمیشن و تجربه تعاملی استفاده می‌کنند؛ تا به آسانی سبک‌های ایده‌آل و مورد علاقه خود را انتخاب و موارد نامطلوب را فیلتر کنید.'
                    : 'This guide deconstructs the aesthetic philosophy, interaction choreography, and technological choices across the applications so you can identify your exact design preferences.'}
                </p>
              </div>

              {/* Matrix of Archetypes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-amber-500/30 space-y-2">
                  <span className="font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                    STYLE 01 // WARM EDITORIAL & STICKY DEPTH
                  </span>
                  <h4 className="font-['Syne'] font-bold text-white text-base">
                    {isFa ? 'سبک لوکس، ژورنالی و گرم (مانند ۱۲۳کافی)' : 'Warm Luxury Editorial & Kinetic Pinning'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? 'رنگ‌بندی گرم مشکی زغالی (#070605)، کهربایی و برنز با فونت سریف و دانه قهوه سه‌بعدی ارگانیک. حس برشتگی، آرامش، عمق اسکرول پیوسته و محاسبه‌گرهای تعاملی.'
                      : 'Charcoal brown palettes, warm bronze accents, organic 3D shapes, and scroll-pinned depth storytelling.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 space-y-2">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                    STYLE 02 // CHROMATIC DARK MINIMALISM
                  </span>
                  <h4 className="font-['Syne'] font-bold text-white text-base">
                    {isFa ? 'سبک فروشگاهی تیره و مدرن (مانند آورا)' : 'Dark Minimalist Cyber-Luxury (Aura Store)'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? 'پس‌زمینه مشکی عمیق با شکست نور کروماتیک، کارت‌های سه‌بعدی Tilt با بازتاب نور ماوس، پالت صوتی مصنوعی Web Audio و تایپوگرافی تمیز با کنتراست شدید.'
                      : 'Deep obsidian backgrounds, chromatic glass prisms, procedural Web Audio synths, and high-contrast typography.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-blue-500/30 space-y-2">
                  <span className="font-mono text-[10px] text-blue-400 font-bold uppercase tracking-wider">
                    STYLE 03 // HARD-SURFACE KINETIC CYBERPUNK
                  </span>
                  <h4 className="font-['Syne'] font-bold text-white text-base">
                    {isFa ? 'سبک مهندسی و همگرایی فضایی (اسمبلر کامپیوتر)' : 'Kinetic Convergence Assembly (PC Builder)'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? 'افکت اسکرول موس برای جمع شدن قطعات از گوشه‌ها به سمت مرکز، محو شدن قطعات در مرکز و نمایش کیس یکپارچه نهایی، بدون نقاله فیزیکی و با فوکوس روی جریان ماژولار.'
                      : 'Scroll-driven star convergence where hardware snaps from perimeter points into a glowing monolith chassis.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-rose-500/30 space-y-2">
                  <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-wider">
                    STYLE 04 // NEXT-GEN BENTO & COVER FLOW
                  </span>
                  <h4 className="font-['Syne'] font-bold text-white text-base">
                    {isFa ? 'سوپرسایت اطلاعاتی و گیمینگ (ویکی‌گیم)' : 'Next-Gen Bento HUD & 3D Cover Flow (WikiGame)'}
                  </h4>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? 'جستجوی هوشمند با پیش‌نمایش آنی، کروسل سه‌بعدی چرخان، هدر سینمایی شیشه‌ای و چیدمان‌های بنتو با امتیازات زنده، ترینرها، راهنما و ثبت نقد کاربران.'
                      : 'Holographic search, 3D perspective cover flow, glassmorphic HUDs, trainers, and dynamic community scoring.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: 123 COFFEE */}
          {activeSection === 'COFFEE' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Coffee className="w-5 h-5 text-amber-400" />
                  <h3 className="font-['Syne'] text-xl font-bold text-white">
                    {isFa ? 'کالبدشکافی فنی وب‌سایت ۱۲۳کافی' : 'Technical Anatomy of 123 Coffee'}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-xs">
                  {isFa ? 'سبک: ژورنال لوکس و اسکرول عمق' : 'Style: Warm Luxury Editorial'}
                </span>
              </div>

              {/* Technologies */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">FRONTEND TECH</span>
                  <h5 className="font-bold text-sm text-white">React 19 + Tailwind CSS</h5>
                  <p className="text-xs text-zinc-400">طراحی ریسپانسیو و مدیریت وضعیت هوشمند دم‌آوری و سفارش پاکت.</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-amber-400 block uppercase">3D & ANIMATION</span>
                  <h5 className="font-bold text-sm text-white">دانه قهوه سه‌بعدی ارگانیک با شیار</h5>
                  <p className="text-xs text-zinc-400">مدل‌سازی پارامتریک دانه قهوه واقعی با شیار مرکزی عمیق و چرخش روی اسکرول.</p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                  <span className="font-mono text-[10px] text-zinc-500 block uppercase">COLOR PALETTE</span>
                  <h5 className="font-bold text-sm text-white">Espresso Charcoal & Amber</h5>
                  <p className="text-xs text-zinc-400">#070605 پس‌زمینه زغالی، گرادیانت‌های کهربایی #f59e0b و کرم شیری.</p>
                </div>
              </div>

              {/* User Feedback & Refinements */}
              <div className="p-5 rounded-2xl bg-zinc-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-xs font-mono">
                  <ThumbsUp className="w-4 h-4 text-emerald-400" />
                  <span>{isFa ? 'تحلیل بازخورد شما و اصلاحات اعمال‌شده:' : 'User Feedback & Refinements Applied:'}</span>
                </div>
                <div className="space-y-2 text-xs text-zinc-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>{isFa ? 'نقطه قوت تاییدشده:' : 'Validated Strength:'}</strong>{' '}
                      {isFa
                        ? 'اسکرول افکت هیرو سکشن و حرکت لایه‌های بخار و ترنزیشن‌های پارالاکس جذاب ارزیابی شد.'
                        : 'The hero section scroll depth and vapor parallax mechanics were confirmed compelling.'}
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p>
                      <strong>{isFa ? 'اصلاح کلیدی انجام‌شده:' : 'Key Correction Implemented:'}</strong>{' '}
                      {isFa
                        ? 'آبجکت قبلی به یک دانه قهوه سه‌بعدی واقعی با شیار خمیده مرکزی (Coffee Bean Crease/Cleft)، بافت برشته و بازتاب روغنی مات تغییر یافت تا کاملا نماینده قهوه اسپشیالتی باشد.'
                        : 'Replaced placeholder geometry with an authentic 3D coffee bean featuring the signature curved central cleft, roasted specularity, and interactive scroll tumble.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: AURA STORE */}
          {activeSection === 'AURA_STORE' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-['Syne'] text-xl font-bold text-white">
                    {isFa ? 'کالبدشکافی فروشگاه و وب‌سایت آورا' : 'Technical Anatomy of Aura Store'}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 font-mono text-xs">
                  {isFa ? 'سبک: سایبر مینیمالیست و شیشه کروماتیک' : 'Style: Chromatic Dark Luxury'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h5 className="font-bold text-sm text-cyan-300">{isFa ? 'رنگ‌بندی و تایپوگرافی' : 'Palette & Typography'}</h5>
                  <p className="text-xs text-zinc-300">
                    {isFa
                      ? 'همان‌طور که اشاره کردید، پس‌زمینه عمیق نایت بلک (#07090e) همراه با هارمونی نئون سایان (#38bdf8) و تایپوگرافی هندسی بولد Syne + یکان، کنتراست خیره‌کننده و مدرنی خلق می‌کند.'
                      : 'The night-black canvas (#07090e) combined with cyan neon accents and bold geometric typography creates high visual clarity.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <h5 className="font-bold text-sm text-indigo-300">{isFa ? 'کارت‌های سه‌بعدی و صدا' : '3D Spatial Cards & Audio'}</h5>
                  <p className="text-xs text-zinc-300">
                    {isFa
                      ? 'استفاده از ماتریس پرسپکتیو حرکتی موس (Tilt 3D) به همراه صدای چایم سنتتیک وب‌اودیو، بدون نیاز به نصب کتابخانه‌های سنگین، تجربه‌ای نرم و واکنش‌گرا ارائه می‌دهد.'
                      : 'Interactive mouse-following tilt cards with synthetic Web Audio chimes deliver a lightweight, high-FPS interactive feel.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: PC BUILDER */}
          {activeSection === 'PC_BUILDER' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-blue-400" />
                  <h3 className="font-['Syne'] text-xl font-bold text-white">
                    {isFa ? 'کالبدشکافی انیمیشن اسمبلر کامپیوتر' : 'Technical Anatomy of PC Builder'}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-blue-950/80 border border-blue-500/40 text-blue-300 font-mono text-xs">
                  {isFa ? 'سبک: همگرایی ستاره‌ای با اسکرول موس' : 'Style: Star Convergence Assembly'}
                </span>
              </div>

              {/* Exact instructions addressed */}
              <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/40 space-y-3">
                <h4 className="font-mono text-xs text-blue-300 uppercase font-bold">
                  {isFa ? 'نکات اختصاصی شما و نحوه پیاده‌سازی:' : 'Your Exact Brief & Architecture:'}
                </h4>
                <ul className="space-y-2 text-xs text-zinc-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{isFa ? 'عدم ترسیم ستاره فیزیکی:' : 'No Literal Star Drawn:'}</strong>{' '}
                      {isFa
                        ? 'هیچ ستاره‌ای روی صفحه رسم نمی‌شود؛ بلکه هندسه ۸ نقطه زاویه‌ای ستاره به عنوان مبدا پرواز قطعات در نظر گرفته شده است.'
                        : 'No literal star graphic is drawn; rather, an 8-point radial star geometry defines the flight origins of components.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{isFa ? 'اسکرول مستقیم موس / تاچ:' : 'Mouse Wheel / Touch Scroll Driven:'}</strong>{' '}
                      {isFa
                        ? 'اسلایدر دستی حذف شده و انیمیشن مستقیما با اسکرول کردن چرخ موس یا تاچ اسکرول کنترل می‌شود.'
                        : 'The manual slider widget is replaced with direct mouse wheel & touch swipe scroll interpolation.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{isFa ? 'عنوان متحرک زیر هر قطعه و امکان خرید:' : 'Integrated Label & Click-to-Shop:'}</strong>{' '}
                      {isFa
                        ? 'نام هر قطعه در زیر آن معلق بوده و با آن حرکت می‌کند و کلیک روی آن مشخصات و کارت خرید تکی را باز می‌کند.'
                        : 'Every component carries its badge beneath it, moving synchronously, and is clickable to inspect or buy.'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>
                      <strong>{isFa ? 'محو شدن در مرکز و نمایش کیس یکپارچه:' : 'Center Convergence & Turn-key Monolith:'}</strong>{' '}
                      {isFa
                        ? 'در انتهای اسکرول (۱۰۰٪)، تمام قطعات در مرکز محو شده و کیس کامل مستقر می‌شود، با پیام: «می‌تونیم پکیج کامل رو براتون خودمون جمع کنیم و تک به تک خرید نکنید».'
                        : 'At center convergence, all individual parts dock inside and fade out, revealing the completed chassis with the bespoke assembly proposal.'}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* SECTION: WIKI GAME */}
          {activeSection === 'WIKI_GAME' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Gamepad2 className="w-5 h-5 text-rose-500" />
                  <h3 className="font-['Syne'] text-xl font-bold text-white">
                    {isFa ? 'کالبدشکافی سوپرسایت ویکی‌گیم (چندین سمپل هوم و صفحات داخلی)' : 'WikiGame Super-Site Architecture'}
                  </h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-xs">
                  {isFa ? 'چندین سمپل هوم و صفحات داخلی' : 'Multi-Template Engine'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="font-mono text-[10px] text-rose-400 font-bold">HOMEPAGE SAMPLES</span>
                  <h5 className="font-bold text-sm text-white">
                    {isFa ? '۳ سمپل متفاوت برای صفحه اصلی با افکت‌های جستجو' : '3 Distinct Homepage Layouts & Search Engines'}
                  </h5>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? '۱. نمای هولوگرافیک و کروسل سه‌بعدی • ۲. مرکز فرمان بنتو گرید با پالت میانبر • ۳. مجله ژورنالی بروتالیست با تایپوگرافی جنبشی.'
                      : 'Holographic Cover Flow, Bento Command Center with instant drawer search, and Brutalist Split Magazine.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2">
                  <span className="font-mono text-[10px] text-rose-400 font-bold">GAME DETAIL SAMPLES</span>
                  <h5 className="font-bold text-sm text-white">
                    {isFa ? '۳ سمپل متفاوت برای صفحات داخلی بازی‌ها (قلب سایت)' : '3 Distinct Game Detail Templates'}
                  </h5>
                  <p className="text-xs text-zinc-400">
                    {isFa
                      ? '۱. بنتو HUD سینمایی نسل جدید با گیت ثبت نظر و امتیاز پویا • ۲. ترمینال سایبر با تست بنچمارک سخت‌افزار و کنسول چیت • ۳. ژورنال تعاملی تحلیلی.'
                      : 'Cinematic Bento HUD with interactive review recalculation, Cyberdeck Hardware Diagnostic, and Luxury Narrative.'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION: SHOWROOM PARADIGMS */}
          {activeSection === 'SHOWROOM_PARADIGMS' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="border-b border-white/10 pb-3">
                <h3 className="font-['Syne'] text-xl font-bold text-white">
                  {isFa ? 'الگوهای معماری کاتالوگ جامع و سمپل‌های فارسی جدید' : 'Showroom Paradigms & Persian Samples'}
                </h3>
              </div>

              <div className="space-y-3 text-xs text-zinc-300">
                <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
                  <h5 className="font-bold text-cyan-300 mb-1">
                    {isFa ? 'سمپل‌های اختصاصی تایپوگرافی فارسی' : 'Persian Typography & Calligraphy'}
                  </h5>
                  <p>
                    {isFa
                      ? 'افزودن ماژول خوشنویسی جنبشی سیاه‌مشق، فونت‌های متغیر نستعلیق مدرن با کشیدگی تعاملی، و رمزگشایی ماتریسی کلمات اصیل فارسی در تب تایپوگرافی.'
                      : 'Kinetic Persian calligraphy, modern Siah-Mashq liquid displacement, and Persian variable glyph stretch.'}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-white/10">
                  <h5 className="font-bold text-indigo-300 mb-1">
                    {isFa ? 'فضاسازی سه‌بعدی مقرنس و ارسی ایرانی مدرن' : '3D Persian Geometric Muqarnas & Orsi'}
                  </h5>
                  <p>
                    {isFa
                      ? 'مدل‌سازی سه‌بعدی پارامتریک از وجوه هندسی مقرنس و شکست نور ارسی‌های رنگی با پرسپکتیو تعاملی در تب Spatial & Physics.'
                      : 'Parametric 3D mathematical facets inspired by historical Iranian muqarnas architecture with chromatic dispersion.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
          <span className="text-[11px] font-mono text-zinc-400">
            {isFa ? 'کپی‌رایت مهندسی طراحی • تیم معماری آورا' : 'Design Engineering Architecture • Aura UI Framework'}
          </span>
          <button
            onClick={() => {
              soundFx.playClick(500);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs transition-colors"
          >
            {isFa ? 'بستن و ادامه کار' : 'Close Guide'}
          </button>
        </div>
      </div>
    </div>
  );
}
