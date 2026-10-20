import React from 'react';
import { soundFx } from '../../utils/audio';
import {
  Layers,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Compass,
  Hourglass,
  MoveHorizontal,
  Anchor,
  LayoutDashboard,
  ShoppingBag,
  Radio,
  Type,
  Sun,
  Sliders,
  Box,
  Eye,
  ExternalLink
} from 'lucide-react';

export interface BatchCategoryItem {
  id: string;
  number: number;
  titleFa: string;
  titleEn: string;
  aesthetic: string;
  techStack: string[];
  count: number;
  descriptionFa: string;
  descriptionEn: string;
  icon: any;
  accentColor: string;
  highlightItems: string[];
}

export const SHOWROOM_BATCHES: BatchCategoryItem[] = [
  {
    id: 'BATCH_1',
    number: 1,
    titleFa: 'هیرو سکشن‌های فوق‌پیشرفته Next.js',
    titleEn: 'Batch 1: Next.js Hero Sections (05 Permutations)',
    aesthetic: 'Chromatic Liquid, Neo-Brutalist, Cyberpunk, Luxury Editorial, WebGL 3D',
    techStack: ['Three.js GLSL', 'CSS Matrix Skew', 'Raycasting Net', 'Cinzel Roman', 'Parametric Supershape'],
    count: 5,
    descriptionFa: 'ویترین نخست وبسایت؛ شیدرهای سیمپلکس مایع با انکسار ماوس، تایپوگرافی کینتیک بروتالیست با چولگی زنده، شبکه نودهای سایبرپانک و هندسه پارامتریک تورس نات.',
    descriptionEn: 'Fluid simplex noise warps to cursor velocity; typographic skew dynamically shifts with pointer inertia; terminal diagnostic HUD, and real-time 3D parametric morphing geometry.',
    icon: Layers,
    accentColor: 'from-amber-400 to-yellow-500',
    highlightItems: ['H01: Chromatic Liquid Mesh', 'H02: Kinetic Neo-Brutalist', 'H03: Cyber Matrix Raycaster', 'H04: Luxury Editorial', 'H05: Quantum 3D Supershape'],
  },
  {
    id: 'BATCH_2',
    number: 2,
    titleFa: 'سیستم‌های ناوبری و مگامنوها',
    titleEn: 'Batch 2: Navigation Systems & Mega-Menus (05 Permutations)',
    aesthetic: 'Dynamic Morph, Glassmorphic Dock, Brutalist Split, Silk Drapery, Cyber ⌘K',
    techStack: ['SVG Bezier Morphing', 'Gaussian Math', 'Web Audio API', 'Global ⌘K Shortcut'],
    count: 5,
    descriptionFa: 'مورفینگ وکتور SVG به پرده تمام‌صفحه، بزرگ‌نمایی آیکون‌های مجاور با فیزیک پیوسته گوسی اپل، ایندکس دو ستونه همگام با صوت و پالت دستوری سایبرپانک.',
    descriptionEn: 'SVG wave morph curtain with velocity-lagged previews; continuous Gaussian distribution scaling icons; dual-pane split matrix, and instant fuzzy command HUD.',
    icon: Compass,
    accentColor: 'from-cyan-400 to-blue-500',
    highlightItems: ['N01: Kinetic Overlay Morph', 'N02: Gaussian Glass Dock', 'N03: Brutalist Split Index', 'N04: Silk Editorial Curtain', 'N05: Cyber ⌘K Palette'],
  },
  {
    id: 'BATCH_3',
    number: 3,
    titleFa: 'لودرها و ترنزیشن‌های سیال صفحه',
    titleEn: 'Batch 3: Immersive Page Loaders & Transitions (05 Permutations)',
    aesthetic: 'Kinetic Counter, Simplex Shader Melt, BIOS Boot, Gold Foil Split, Quantum Attractor',
    techStack: ['Euler Acceleration', 'GLSL Simplex Noise', 'Terminal Kernel Boot', '2,500 Brownian Particles'],
    count: 5,
    descriptionFa: 'شمارنده‌های شتاب‌دار اویلری با وایپ مورب، ذوب شیدر مایع با هاله کروماتیک، بررسی سخت‌افزاری رم و ثبات‌های بایوس و همگرایی ذرات معلق به سمت گره تورس.',
    descriptionEn: 'Non-linear Euler counter with diagonal polygon wipe; procedural noise melt with RGB fringe; kernel diagnostics, and Brownian particle reassembly.',
    icon: Hourglass,
    accentColor: 'from-pink-400 to-rose-500',
    highlightItems: ['L01: Kinetic Counter Wipe', 'L02: Simplex Liquid Melt', 'L03: Cyber BIOS Boot Matrix', 'L04: Gold Foil Velvet Split', 'L05: Quantum Attractor 3D'],
  },
  {
    id: 'BATCH_4',
    number: 4,
    titleFa: 'اسکرول و پرواز دوربین سه‌بعدی',
    titleEn: 'Batch 4: Scroll Choreography & Viewport Pinning (05 Permutations)',
    aesthetic: 'Horizontal Parallax, Velocity Marquee, Depth Pinning, Split Sync, Raycast Tunnel',
    techStack: ['GSAP ScrollTrigger', 'CSS Shear Skew', 'Z-Axis Camera Scrub', 'Three.js Spline Tunnel'],
    count: 5,
    descriptionFa: 'گالری پارالاکس ۳ لایه‌ای با اینرسی مستقل، مارکی کینتیک با محاسبه زاویه چولگی تا ۳۰ درجه، پرواز دوربین در میان قاب‌های معماری و تونل نئونی شش‌ضلعی.',
    descriptionEn: '3-plane inertia parallax scrub; real-time velocity delta calculating shear angle; sticky 3D flythrough, and hexagonal neon security gate scrub.',
    icon: MoveHorizontal,
    accentColor: 'from-emerald-400 to-teal-500',
    highlightItems: ['S01: Horizontal Parallax', 'S02: Kinetic Velocity Marquee', 'S03: Sticky 3D Depth Pinning', 'S04: Split Counter-Scroll', 'S05: Raycast Cyber Tunnel'],
  },
  {
    id: 'BATCH_5',
    number: 5,
    titleFa: 'فوترها و فیزیک مغناطیسی',
    titleEn: 'Batch 5: Footers & Magnetic Physics Elements (05 Permutations)',
    aesthetic: 'Gravitational Net, Brutalist ASCII CLI, Vermeil Monogram, Cyber Shutdown, 3D Wave Ribbon',
    techStack: ['Verlet Particle Fabric', 'Interactive Monospace CLI', 'Liquid Gold Canvas', 'Three.js Wave Plane'],
    count: 5,
    descriptionFa: 'پارچه ذرات با بردار جاذبه و دکمه مغناطیسی چسبنده به ماوس، خط فرمان متنی CLI با اجرای دستورات واقعی، کتیبه لوکس ورمل و خاموشی اضطراری سیستم با افت فسفر CRT.',
    descriptionEn: '2D particle fabric with spring-mass restitution; functional CLI terminal; gold foil specular reflection, and cockpit emergency shutdown routine.',
    icon: Anchor,
    accentColor: 'from-purple-400 to-indigo-500',
    highlightItems: ['F01: Gravitational Particle Grid', 'F02: Brutalist ASCII Terminal', 'F03: Luxury Vermeil Foil', 'F04: Cyber Shutdown Matrix', 'F05: 3D Wave Ribbon'],
  },
  {
    id: 'BATCH_6',
    number: 6,
    titleFa: 'داشبوردهای پرتراکم و نودهای فضایی',
    titleEn: 'Batch 6: High-Density Dashboards & Node Visualizers (05 Permutations)',
    aesthetic: 'Telemetry HUD, Hardware Register, Cyber Orbital Graph, Luxury Matrix, 3D Force Network',
    techStack: ['SVG Radial Pressure Gauges', 'Canvas Waveform Monitor', 'Orbital Transmission Rays', 'Three.js Force Graph'],
    count: 5,
    descriptionFa: 'داشبورد گلس‌مورفیک تل‌متری با اسیلوسکوپ زنده، لجر هگزادسیمال ثبات‌های سخت‌افزاری، گراف مداری انتقال پکت‌ها و شبکه گرافی ۳بعدی نودها با دافعه کلمبی.',
    descriptionEn: 'Live SVG radial pressure gauges and oscilloscope; hex dump stream; concentric orbital node graph, and 3D force-directed node network with orbit drag.',
    icon: LayoutDashboard,
    accentColor: 'from-amber-400 to-orange-500',
    highlightItems: ['D01: Chromatic Telemetry HUD', 'D02: Hardware Register Ledger', 'D03: Cyber Orbital Nodes', 'D04: Luxury Exhibition Matrix', 'D05: Force Network 3D'],
  },
  {
    id: 'BATCH_7',
    number: 7,
    titleFa: 'تجارت الکترونیک فضایی و کانفیگوراتورها',
    titleEn: 'Batch 7: Spatial E-Commerce & 3D Configurators (05 Permutations)',
    aesthetic: 'Chromatic Watch PBR, Sneaker Deconstruct, Cyberdeck Terminal, Couture Perfume, Spatial Audio',
    techStack: ['Three.js WebGL', 'Exploded Layer Slider', 'Thermal Core Heatmap', 'Olfactory Scent Pyramid'],
    count: 5,
    descriptionFa: 'ساعت مچی ۳بعدی با تغییر آلیاژهای تیتانیوم و طلا، اسلایدر انفجار عمودی اجزای کفش، هیت‌مپ دمایی سایبرپانک، هرم نت‌های بویایی عطر و صحنه صوتی هدفون بریلیوم.',
    descriptionEn: 'Real-time 3D watch model with orbital drag and alloy switching; exploded vertical layer slider; thermal heatmaps, and olfactory note pyramid.',
    icon: ShoppingBag,
    accentColor: 'from-cyan-400 to-teal-400',
    highlightItems: ['P01: Chromatic Watch PBR', 'P02: Sneaker Deconstruct', 'P03: Cyberdeck Terminal', 'P04: Couture Fragrance', 'P05: Spatial Audio 3D'],
  },
  {
    id: 'BATCH_8',
    number: 8,
    titleFa: 'هنر زایشی و مجسمه‌های صوتی',
    titleEn: 'Batch 8: Generative Art & Kinetic Sound Sculptures (05 Permutations)',
    aesthetic: 'Fluid Oscilloscope, ASCII Sand Physics, LiDAR Pointcloud, Harmonic Metronome, Lorenz Chaos 3D',
    techStack: ['Fourier Wave Superposition', 'Cellular Automata Sand', '360 LiDAR Scan Sweep', 'Lorenz Strange Attractor'],
    count: 5,
    descriptionFa: 'انکسار نوارهای رنگی هارمونیک فوریه، شبیه‌ساز ریزش شن با گرانش ۴ جهته در کد اسکی، اسکنر راداری لیدار و ادغام ۱۰ هزار ذره در خمینه آشوب لورنتس ۳بعدی.',
    descriptionEn: 'Fourier wave superposition ribbons; cellular sand physics in ASCII; 360-degree LiDAR radar sweep, and 10,000 particles in chaotic differential manifolds.',
    icon: Radio,
    accentColor: 'from-emerald-400 to-lime-400',
    highlightItems: ['G01: Fluid Audio Oscilloscope', 'G02: ASCII Falling Sand', 'G03: Cyber LiDAR Scanner', 'G04: Harmonic Metronome', 'G05: Lorenz Strange Attractor'],
  },
  {
    id: 'BATCH_9',
    number: 9,
    titleFa: 'تایپوگرافی کینتیک و خوشنویسی فارسی',
    titleEn: 'Batch 9: Creative Typography & Persian Suites (06 Permutations)',
    aesthetic: 'Liquid Displacement, Variable Stretch, Matrix Decoder, Drop-Cap Atelier, Möbius Ribbon, Voice Calligraphy',
    techStack: ['GLSL Text Refraction', 'Variable Font Proximity', 'Matrix Glyph Decryption', 'Web Audio API'],
    count: 6,
    descriptionFa: 'انکسار مایع متن با ماوس، کشیدگی متغیر و کشیده مارکی، رمزگشایی ماتریسی، نوار موبیوس کلمات سه‌بعدی و موتور خطاطی صوتی با میکروفون زنده و ورق طلا.',
    descriptionEn: 'GLSL text refraction; proximity-based variable font weight/width; matrix decryption; 3D typography ribbon, and voice-to-calligraphy reed pen dynamics.',
    icon: Type,
    accentColor: 'from-rose-400 to-pink-500',
    highlightItems: ['T01: Liquid Text Wave', 'T02: Variable Letter-Stretch', 'T03: Matrix Decoder', 'T04: Museum Drop-Cap', 'T05: 3D Typography Ribbon', 'T06: Voice-to-Calligraphy'],
  },
  {
    id: 'BATCH_10',
    number: 10,
    titleFa: 'شیدرهای تعاملی و شکست نور',
    titleEn: 'Batch 10: Interactive Shaders & Optical Caustics (05 Permutations)',
    aesthetic: 'Glass Prism, Bayer Dither Matrix, Volumetric Laser, Fluted Glass Mercury, Raymarched Metaballs',
    techStack: ['Snell Dispersion Shaders', '8x8 Bayer Halftone', 'Tyndall Scattering Fog', 'Raymarching SDF Chrome'],
    count: 5,
    descriptionFa: 'تجزیه طیف نور سفید در منشور شیشه‌ای با قانون اسنل، ماتریس دیتر رترو، پرتوهای حجمی لیزر در مه، شیشه فلوتد استوانه‌ای و کره‌های کروم ری‌مارچینگ.',
    descriptionEn: 'Dual-surface Snell dispersion; 8x8 Bayer ordered halftone quantizer; Tyndall scattering fog; fluted ribbed glass, and GPU raymarched liquid chrome spheres.',
    icon: Sun,
    accentColor: 'from-amber-300 to-yellow-400',
    highlightItems: ['X01: Refractive Glass Prism', 'X02: Bayer Dither Matrix', 'X03: Volumetric Laser Scanner', 'X04: Fluted Glass Mercury', 'X05: Raymarched Metaballs'],
  },
  {
    id: 'BATCH_11',
    number: 11,
    titleFa: 'فرم‌های لمسی و مراحل احراز هویت',
    titleEn: 'Batch 11: Interactive Forms & Kinetic Steppers (05 Permutations)',
    aesthetic: 'Glass Card Payment, Brutalist Terminal, Cyber Biometric Auth, Haute Atelier, 3D Metal Card',
    techStack: ['3D Gyroscopic Card Tilt', 'Monospace Matrix CLI', 'Procedural Fingerprint Scanner', 'PBR Titanium Card'],
    count: 5,
    descriptionFa: 'کارت پرداخت سه‌بعدی با چرخش ژیروسکوپی، فرم دستوری ترمینال با فیدبک کلیدهای مکانیکی، اسکنر زنده خطوط اثرانگشت و کارت عضویت متالیک تیتانیوم.',
    descriptionEn: '3D gyroscopic tilt card with specular refractions; CLI terminal input; procedural canvas fingerprint scanner, and interactive WebGL brushed titanium card.',
    icon: Sliders,
    accentColor: 'from-cyan-300 to-blue-400',
    highlightItems: ['M01: Glass 3D Card Payment', 'M02: Terminal Command Ledger', 'M03: Biometric Auth Stepper', 'M04: Haute Salon Atelier', 'M05: 3D Metal Card Configurator'],
  },
  {
    id: 'BATCH_12',
    number: 12,
    titleFa: 'بوم‌های فضایی و استودیوی سه‌بعدی',
    titleEn: 'Batch 12: Spatial Canvas, Physics Sandboxes & GLTF Studio (06 Permutations)',
    aesthetic: 'Glass Orbs Collision, 2D Rigid Verlet Physics, LiDAR Holo-Terrain, Silk Cloth Sim, Gyroscope 3D, GLTF Studio',
    techStack: ['Three.js WebGL', 'Verlet SAT Collision', 'Mass-Spring Cloth', 'GLTFLoader Drag & Drop'],
    count: 6,
    descriptionFa: 'برخورد کره‌های شیشه‌ای شناور، جعبه شنی فیزیک با تغییر ۴ جهته جاذبه، زمین ارتفاعی ۶۴۰۰ نودی لیدار، شبیه‌ساز پارچه ابریشم، ژیروسکوپ ۳ محوره و استودیو GLTF.',
    descriptionEn: 'Buoyant glass orbs colliding; rigid-body Verlet dynamics with 4-axis gravity; 6,400 elevation nodes; mass-spring silk cloth, and universal GLTF dropzone.',
    icon: Box,
    accentColor: 'from-violet-400 to-purple-500',
    highlightItems: ['Y01: Glass Orbs Sandbox', 'Y02: Brutalist 2D Physics', 'Y03: LiDAR Holo-Terrain', 'Y04: Silk Cloth Simulation', 'Y05: Parametric Gyroscope 3D', 'Y06: GLTF 3D Studio & PBR'],
  },
];

interface ShowroomCategoriesHubProps {
  onSelectBatch: (batchId: string) => void;
  onViewAllCatalog: () => void;
  onOpenAiPlaybook: (batchId?: string) => void;
  onBackToPortal: () => void;
  language?: 'en' | 'fa';
}

export default function ShowroomCategoriesHub({
  onSelectBatch,
  onViewAllCatalog,
  onOpenAiPlaybook,
  onBackToPortal,
  language = 'fa',
}: ShowroomCategoriesHubProps) {
  const isFa = language === 'fa';

  return (
    <div className="relative w-full min-h-screen bg-[#040508] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-24">
      {/* Background Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-[800px] left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-12 relative z-10">
        {/* Top Navigation & Breadcrumb Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>SHOWROOM CATEGORIES HUB // 12 ARCHITECTURAL BATCHES</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white font-['Syne'] tracking-tight">
              {isFa ? 'هاب دسته‌بندی‌های کاتالوگ المان‌ها' : 'Showroom Categories Hub'}
            </h1>
            <p className="text-sm text-zinc-400 font-['Vazirmatn'] mt-1 max-w-2xl">
              {isFa
                ? 'به جای نمایش یکپارچه تمام ۶۰ قطعه، هر دسته‌بندی دارای صفحه اختصاصی، کنترل‌های گرافیکی و دفترچه راهنمای هوش مصنوعی مجزا است.'
                : 'Select any of the 12 architectural disciplines below to explore its dedicated showcase view, or switch to the continuous full catalog.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              onClick={() => {
                soundFx.playClick(600);
                onBackToPortal();
              }}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
            >
              {isFa ? <ArrowRight className="w-4 h-4 text-cyan-400" /> : <ArrowLeft className="w-4 h-4 text-cyan-400" />}
              <span>{isFa ? 'بازگشت به پورتال اصلی' : 'Back to Portal'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                onViewAllCatalog();
              }}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 hover:from-cyan-300 hover:to-indigo-400 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md shadow-cyan-400/20"
            >
              <Eye className="w-4 h-4" />
              <span>{isFa ? 'مشاهده تمام ۶۰ قطعه یکجا' : 'View Full Catalog (All 60)'}</span>
            </button>
          </div>
        </div>

        {/* 12 Category Sections / Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWROOM_BATCHES.map((batch) => {
            const Icon = batch.icon;
            return (
              <div
                key={batch.id}
                className="rounded-3xl p-6 bg-[#080a10] border border-white/10 hover:border-cyan-400/40 transition-all group flex flex-col justify-between shadow-xl hover:shadow-cyan-500/10"
              >
                <div className="space-y-4">
                  {/* Top Bar: Batch Number, Variations Count, Playbook icon */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5 text-cyan-400" />
                      </div>
                      <span className="font-mono text-xs font-bold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2.5 py-1 rounded-lg">
                        BATCH {batch.number}
                      </span>
                    </div>

                    <span className="font-mono text-[11px] text-zinc-400 bg-white/5 border border-white/5 px-2 py-0.5 rounded-full">
                      {batch.count} {isFa ? 'واریانت کامل' : 'Variations'}
                    </span>
                  </div>

                  {/* Title & Aesthetic */}
                  <div>
                    <h3 className="text-xl font-bold text-white font-['Syne'] group-hover:text-cyan-300 transition-colors">
                      {isFa ? batch.titleFa : batch.titleEn}
                    </h3>
                    <span className="text-[11px] font-mono text-cyan-400 block mt-1">
                      {batch.aesthetic}
                    </span>
                    <p className="text-xs text-zinc-400 font-['Vazirmatn'] mt-2.5 leading-relaxed line-clamp-3">
                      {isFa ? batch.descriptionFa : batch.descriptionEn}
                    </p>
                  </div>

                  {/* Highlights Mini Chips */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {isFa ? 'نمونه المان‌های این بخش:' : 'Featured Variations:'}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {batch.highlightItems.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded-md bg-white/5 border border-white/5 font-mono text-[10px] text-zinc-300"
                        >
                          {item}
                        </span>
                      ))}
                      {batch.highlightItems.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-white/5 font-mono text-[10px] text-zinc-500">
                          +{batch.highlightItems.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons: Launch Batch View & Open AI Playbook */}
                <div className="pt-6 border-t border-white/5 mt-6 flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundFx.playChime(750, 0.2);
                      onSelectBatch(batch.id);
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-cyan-400 hover:text-black text-white font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <span>{isFa ? 'مشاهده این دسته‌بندی' : 'Inspect Category'}</span>
                    <ArrowLeft className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playChime(900, 0.2);
                      onOpenAiPlaybook(batch.id);
                    }}
                    className="p-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 transition-colors"
                    title={isFa ? 'دفترچه راهنمای پرامپت هوش مصنوعی این بخش' : 'AI Prompt Playbook'}
                  >
                    <BookOpen className="w-4 h-4 text-amber-400" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Full View Banner */}
        <div className="rounded-3xl p-6 bg-gradient-to-r from-cyan-950/40 via-zinc-950 to-indigo-950/40 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="text-lg font-bold text-white font-['Syne']">
              {isFa ? 'آیا مایلید تمام ۶۰ قطعه را در یک صفحه اسکرول یکپارچه ببینید؟' : 'Prefer continuous scrolling across all 60 components?'}
            </h4>
            <p className="text-xs text-zinc-400 font-['Vazirmatn']">
              {isFa
                ? 'حالت نمایش پیوسته کاتالوگ با فیلترهای بصری، نوار جستجو و دسترسی سریع به تک‌تک قطعات در دسترس است.'
                : 'Switch to the comprehensive continuous catalog with global filters, aesthetic selectors, and quick-jump navigation.'}
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(750);
              onViewAllCatalog();
            }}
            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white text-white hover:text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shrink-0"
          >
            <span>{isFa ? 'مشاهده کاتالوگ یکپارچه' : 'Launch Full Catalog'}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
