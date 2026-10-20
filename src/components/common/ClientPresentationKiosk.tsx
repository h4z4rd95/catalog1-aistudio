import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';
import { AppViewMode } from './MasterShowcaseNav';
import {
  Play,
  Pause,
  Maximize2,
  Minimize2,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Layers,
  Monitor,
  Coffee,
  Cpu,
  Gamepad2,
  Volume2,
  VolumeX,
  FileText,
  Clock,
  ExternalLink,
  X
} from 'lucide-react';

interface SlideItem {
  id: AppViewMode;
  titleEn: string;
  titleFa: string;
  subtitleEn: string;
  subtitleFa: string;
  techStack: string;
  speakerNotesEn: string;
  speakerNotesFa: string;
  aesthetic: string;
  badgeColor: string;
}

const PRESENTATION_SLIDES: SlideItem[] = [
  {
    id: 'STUDIO_123',
    titleEn: '123Service Digital Creative Engine',
    titleFa: 'استودیو ۱۲۳سرویس — موتور خلاقیت دیجیتال',
    subtitleEn: 'High-conversion interactive agency website with live dynamic thread physics & pricing calculators',
    subtitleFa: 'وب‌سایت آژانس خلاقیت دیجیتال با تردهای متحرک فیزیکال و ماشین‌حساب تخمین پروژه',
    techStack: 'React 19 + Tailwind v4 + Canvas Physics + Cart Engine',
    speakerNotesEn: 'Highlight the physical cart thread animation that tethers items to the cart, interactive project cost calculator, and high-contrast typography.',
    speakerNotesFa: 'روی انیمیشن تردهای فیزیکال افزودن به سبد خرید، ماشین‌حساب تعاملی برآورد هزینه و فرم‌های دو زبانه تمرکز کنید.',
    aesthetic: 'Ultra Modern Agency',
    badgeColor: 'from-cyan-400 to-indigo-500',
  },
  {
    id: 'PERSIAN_MUQARNAS_WORLD',
    titleEn: 'Persian Muqarnas Neofuturism 3D',
    titleFa: 'معماری نئوفیوچریسم مقرنس و ارسی پارسی',
    subtitleEn: 'Parametric 3D Islamic honeycomb vaulting with real-time solar caustics and stained-glass refraction',
    subtitleFa: 'طاق‌های معلق مقرنس با محاسبات ریاضی سه‌بعدی و پرتوهای نور خورشید از شیشه‌های ارسی',
    techStack: 'Three.js WebGL + Parametric Geometry + Caustics Shaders',
    speakerNotesEn: 'Point out how traditional Persian architectural math is rendered in real-time WebGL with dynamic viewpoint rotations and stained glass dispersion.',
    speakerNotesFa: 'نحوه ترکیب هویت تاریخی معماری ایرانی با پیشرفته‌ترین شیدرهای گرافیکی Three.js و چرخش زاویه دید را ارائه دهید.',
    aesthetic: 'Persian Neofuturism',
    badgeColor: 'from-amber-400 to-yellow-500',
  },
  {
    id: 'CHRONO_NEBULA_WORLD',
    titleEn: 'Chrono-Spatial Astrolabe Odyssey 3D',
    titleFa: 'ادیسه فضایی استرلاب و افق رویداد زمان',
    subtitleEn: '3D interlocking horological gears with event-horizon black hole and cosmic particle accretion',
    subtitleFa: 'چرخ‌دنده‌های مکانیکی استرلاب به همراه افق رویداد سیاه‌چاله کیهانی و ذرات فضایی',
    techStack: 'Three.js + Procedural Gear Math + Relativistic Shaders',
    speakerNotesEn: 'Demonstrates luxury precision engineering, cosmic particle manifolds, and cinematic depth.',
    speakerNotesFa: 'نشان‌دهنده اوج مهندسی فضایی و انیمیشن برداری بدون لگ در ۶۰ فریم بر ثانیه.',
    aesthetic: 'Cosmic Haute Horlogerie',
    badgeColor: 'from-purple-500 to-cyan-400',
  },
  {
    id: 'SCROLL_WORLD_3D',
    titleEn: 'Cinematic 3D Scroll World Flythrough',
    titleFa: 'جهان سینمایی ۳بعدی با پرواز اسکرول',
    subtitleEn: 'Inertial camera path traversing spatial bento architecture, glowing neon rings, and kinetic typography',
    subtitleFa: 'پیمایش پیوسته دوربین سه‌بعدی در میان سازه‌های معلق، حلقه‌های نئونی و بنتو باکس‌های مدرن',
    techStack: 'Three.js Spline Curves + GSAP ScrollTrigger + Lenis',
    speakerNotesEn: 'Explain how natural mouse scrolling controls the 3D camera trajectory without jerky movements.',
    speakerNotesFa: 'به پیمایش روان دوربین در فضای سه‌بعدی متناسب با سرعت اسکرول کاربر اشاره کنید.',
    aesthetic: 'Awwwards Spatial Bento',
    badgeColor: 'from-lime-400 to-cyan-400',
  },
  {
    id: 'COFFEE_SAMPLE',
    titleEn: '123 Coffee — 3D Parametric Bean Landing',
    titleFa: '۱۲۳کافی — لندینگ دانه قهوه سه‌بعدی و برشته‌کاری',
    subtitleEn: 'Photorealistic coffee bean with organic cleft, oil reflections, and scroll-responsive roasting stages',
    subtitleFa: 'مدل سه‌بعدی دانه قهوه با شیار ارگانیک، انعکاس درخشش روغن و تغییر درجه برشته‌کاری با اسکرول',
    techStack: 'Three.js MeshPhysicalMaterial + ACES Filmic Tone Mapping',
    speakerNotesEn: 'Emphasize the cleft incision geometry, clearcoat specular highlights, and scroll-linked camera zoom.',
    speakerNotesFa: 'مدلسازی شیار طبیعی دانه و شیدرهای بازتاب نور فیزیکال روغن را برجسته نمایید.',
    aesthetic: 'Organic Luxury Coffee',
    badgeColor: 'from-amber-500 to-orange-600',
  },
  {
    id: 'PC_BUILDER_SAMPLE',
    titleEn: 'PC Builder — Star Convergence Assembly',
    titleFa: 'اسمبلر سخت‌افزار — همگرایی ستاره‌ای با اسکرول موس',
    subtitleEn: '8 individual hardware components converging into a complete gaming rig as user scrolls down',
    subtitleFa: 'همگرایی ارتعاشی ۸ قطعه سخت‌افزاری به سمت مرکز کیس با چرخش طبیعی موس',
    techStack: 'Three.js + Sticky Viewport Rig + Component Explosions',
    speakerNotesEn: 'Explain how the star convergence mechanic replaces boring product galleries with visceral tactile interactions.',
    speakerNotesFa: 'همگرایی قطعات سه‌بعدی در مرکز صفحه که تجربه خرید آنلاین سخت‌افزار را دگرگون می‌سازد.',
    aesthetic: 'Industrial Neo-Brutalist',
    badgeColor: 'from-cyan-400 to-blue-600',
  },
  {
    id: 'WIKI_GAME_SAMPLE',
    titleEn: 'WikiGame Super-Site (6 Distinct Layouts)',
    titleFa: 'سوپرسایت ویکی‌گیم (۳ صفحه اصلی + ۳ صفحه داخلی)',
    subtitleEn: 'Comprehensive gaming portal with Holographic Matrix, 2026 Bento Command Center, and Benchmark Lab',
    subtitleFa: 'پرتال جامع بازی‌های ویدئویی با ۳ تم هولوگرافیک، بنتو و سینمایی به همراه بنچمارک نرخ فریم',
    techStack: 'React 19 + Benchmark Math Engine + 3D Tilt Coverflow',
    speakerNotesEn: 'Showcase the switchable aesthetics, FPS benchmark comparison tool, and audio-reactive gramophone.',
    speakerNotesFa: 'تنوع بی‌نظیر ۳ مدل صفحه اول و ۳ مدل صفحه اختصاصی به همراه سیستم بنچمارک سخت‌افزار.',
    aesthetic: 'Triple-A Gaming HUD',
    badgeColor: 'from-rose-500 to-indigo-600',
  },
];

interface ClientPresentationKioskProps {
  currentViewMode: AppViewMode;
  onSelectViewMode: (mode: AppViewMode) => void;
  onExitKiosk: () => void;
  language?: 'en' | 'fa';
}

export default function ClientPresentationKiosk({
  currentViewMode,
  onSelectViewMode,
  onExitKiosk,
  language = 'fa',
}: ClientPresentationKioskProps) {
  const isFa = language === 'fa';
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [intervalDuration, setIntervalDuration] = useState<number>(20); // seconds per slide
  const [progress, setProgress] = useState<number>(0);
  const [showSpeakerNotes, setShowSpeakerNotes] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlideIndex = Math.max(
    0,
    PRESENTATION_SLIDES.findIndex((s) => s.id === currentViewMode)
  );
  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex] || PRESENTATION_SLIDES[0];

  // Auto-Cycle Timer
  useEffect(() => {
    if (!isPlaying) {
      setProgress(0);
      return;
    }

    const stepMs = 100;
    const totalSteps = (intervalDuration * 1000) / stepMs;
    let stepCount = 0;

    const interval = setInterval(() => {
      stepCount++;
      const currentPct = (stepCount / totalSteps) * 100;
      setProgress(currentPct);

      if (stepCount >= totalSteps) {
        stepCount = 0;
        setProgress(0);
        goToNextSlide();
      }
    }, stepMs);

    return () => clearInterval(interval);
  }, [isPlaying, intervalDuration, currentSlideIndex]);

  const goToNextSlide = () => {
    soundFx.playChime(750, 0.2);
    const nextIdx = (currentSlideIndex + 1) % PRESENTATION_SLIDES.length;
    onSelectViewMode(PRESENTATION_SLIDES[nextIdx].id);
    setProgress(0);
  };

  const goToPrevSlide = () => {
    soundFx.playClick(600);
    const prevIdx = (currentSlideIndex - 1 + PRESENTATION_SLIDES.length) % PRESENTATION_SLIDES.length;
    onSelectViewMode(PRESENTATION_SLIDES[prevIdx].id);
    setProgress(0);
  };

  const toggleFullscreen = () => {
    soundFx.playClick(800);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="fixed top-14 left-0 right-0 z-50 pointer-events-none font-['Plus_Jakarta_Sans']">
      {/* Top Floating Kiosk HUD Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pointer-events-auto">
        <div className="bg-black/90 border border-cyan-500/40 rounded-2xl p-2.5 shadow-2xl backdrop-blur-2xl flex flex-wrap items-center justify-between gap-3 text-white">
          {/* Left: Presentation Branding & Status */}
          <div className="flex items-center gap-3">
            <div className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-black font-mono text-[11px] font-black tracking-wider flex items-center gap-1.5 shadow-md shadow-cyan-500/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>KIOSK PITCH MODE</span>
            </div>

            <div className="hidden sm:flex items-center gap-2 font-mono text-xs">
              <span className="text-zinc-400">
                {currentSlideIndex + 1} / {PRESENTATION_SLIDES.length}:
              </span>
              <span className="text-white font-bold">
                {isFa ? currentSlide.titleFa : currentSlide.titleEn}
              </span>
            </div>
          </div>

          {/* Center: Play/Pause, Progress Bar, and Dwell Time */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => {
                soundFx.playClick(600);
                goToPrevSlide();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              title="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick(700);
                setIsPlaying(!isPlaying);
              }}
              className={`p-2 rounded-xl font-bold transition-all shadow-md ${
                isPlaying
                  ? 'bg-amber-400 text-black hover:bg-amber-300'
                  : 'bg-emerald-500 text-black hover:bg-emerald-400'
              }`}
              title={isPlaying ? 'Pause Auto-Cycle' : 'Play Auto-Cycle'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                goToNextSlide();
              }}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              title="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Linear Progress Bar */}
            <div className="hidden md:flex flex-col w-32 gap-1 font-mono text-[10px] text-zinc-400">
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px]">
                <span>{isPlaying ? 'Auto-Cycle' : 'Paused'}</span>
                <span>{intervalDuration}s</span>
              </div>
            </div>

            {/* Interval Selector */}
            <select
              value={intervalDuration}
              onChange={(e) => setIntervalDuration(parseInt(e.target.value))}
              className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-[11px] font-mono text-zinc-300 focus:outline-none focus:border-cyan-400"
            >
              <option value={15}>15s Dwell</option>
              <option value={20}>20s Dwell</option>
              <option value={35}>35s Dwell</option>
              <option value={60}>60s Dwell</option>
            </select>
          </div>

          {/* Right: Speaker Notes Toggle, Fullscreen & Exit */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(500);
                setShowSpeakerNotes(!showSpeakerNotes);
              }}
              className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono flex items-center gap-1.5 transition-all ${
                showSpeakerNotes
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{isFa ? 'یادداشت‌های ارائه' : 'Pitch Notes'}</span>
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundFx.playClick(400);
                onExitKiosk();
              }}
              className="px-3 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-mono text-xs transition-colors flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>{isFa ? 'خروج از ارائه' : 'Exit Kiosk'}</span>
            </button>
          </div>
        </div>

        {/* Floating Speaker Notes Panel */}
        {showSpeakerNotes && (
          <div className="mt-2.5 bg-black/95 border border-white/15 rounded-2xl p-4 shadow-2xl backdrop-blur-2xl text-zinc-200 animate-in fade-in slide-in-from-top-2 duration-200 pointer-events-auto">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30 font-mono text-[10px] font-bold">
                    {currentSlide.aesthetic}
                  </span>
                  <span className="text-zinc-500 font-mono text-xs">|</span>
                  <span className="font-mono text-xs text-cyan-400">{currentSlide.techStack}</span>
                </div>
                <h4 className="text-base font-bold text-white font-['Syne']">
                  {isFa ? currentSlide.titleFa : currentSlide.titleEn}
                </h4>
                <p className="text-xs text-zinc-400 max-w-3xl">
                  {isFa ? currentSlide.subtitleFa : currentSlide.subtitleEn}
                </p>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 mt-2 text-xs font-['Vazirmatn'] text-cyan-200 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>{isFa ? 'نکته کلیدی برای دفاع از پروژه:' : 'Key Selling Point:'}</strong>{' '}
                    {isFa ? currentSlide.speakerNotesFa : currentSlide.speakerNotesEn}
                  </span>
                </div>
              </div>

              {/* Quick Jump Buttons */}
              <div className="hidden lg:grid grid-cols-2 gap-1.5 flex-shrink-0">
                {PRESENTATION_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      soundFx.playClick(600);
                      onSelectViewMode(s.id);
                      setProgress(0);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg border text-left font-mono text-[10px] transition-all whitespace-nowrap ${
                      currentViewMode === s.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                    }`}
                  >
                    {idx + 1}. {s.titleEn.split('—')[0].substring(0, 16)}...
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
