import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Layers,
  Compass,
  Star,
  CheckCircle2,
  Terminal,
  Globe,
  Newspaper
} from 'lucide-react';

export const LandingPage: React.FC<{ onSwitchToShowroom: () => void }> = ({ onSwitchToShowroom }) => {
  const {
    setActivePage,
    setActiveProductId,
    products,
    addToCart,
    theme,
    language,
    direction,
    formatPrice,
    t
  } = useStore();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  // Background Interactive WebGL Mesh / Particle Flow
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = 700);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 700;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; hue: number }[] = [];
    for (let i = 0; i < 48; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        hue: Math.random() > 0.5 ? 190 : 45,
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.fillStyle = isLight ? '#f8fafc' : '#050609';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle spatial grid
      ctx.strokeStyle = isLight ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = isLight
          ? p.hue === 190
            ? 'rgba(6, 182, 212, 0.6)'
            : 'rgba(217, 119, 6, 0.6)'
          : p.hue === 190
          ? 'rgba(34, 211, 238, 0.6)'
          : 'rgba(251, 191, 36, 0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 130) {
            ctx.strokeStyle = isLight
              ? `rgba(15, 23, 42, ${0.12 * (1 - dist / 130)})`
              : `rgba(255, 255, 255, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
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
  }, [isLight]);

  const caseStudies = [
    {
      client: 'KINETIC CHRONO',
      title: isFa ? 'کانفیگوراتور سه‌بعدی ساعت‌های مکانیکی' : 'Spatial Horology 3D Configurator',
      award: 'Awwwards Site of the Month',
      description: isFa
        ? 'پیکربندی سه‌بعدی ساعت توربیلون در وب‌جی‌ال با متریال واقعی تیتانیوم و چرخش ژیروسکوپی صفحه.'
        : 'Parametric WebGL tourbillon watch configurator with real-time anisotropic titanium shading and gyroscopic dial rotation.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      tags: ['Three.js', 'PBR Shaders', 'Web Audio'],
    },
    {
      client: 'NEO-MATRIX LABS',
      title: isFa ? 'رابط تاکتیکال سایبردک و دفتر ثبت داده' : 'Tactical Cyberdeck Interface & Ledger',
      award: 'FWA of the Day',
      description: isFa
        ? 'سیستم عامل سخت‌افزاری با کلیک‌های لمسی وب‌آدیو، ماتریس حافظه ASCII و تله‌متری بلادرنگ.'
        : 'Hardware operating system UI with low-latency Web Audio haptic clicks, ASCII memory matrices, and high-frequency telemetry.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      tags: ['React 19', 'Canvas 2D', 'Web Audio'],
    },
    {
      client: 'HAUTE ATELIER',
      title: isFa ? 'مجسمه عطر دیجیتال و انکسار مایع' : 'Digital Fragrance Sculpture',
      award: 'Cannes Lions Gold',
      description: isFa
        ? 'کاستیک مایع فراواقعی شبیه‌ساز قطرات عطر با انکسار نوری اسنل و تایپوگرافی کلاسیک.'
        : 'Ethereal fluid caustics simulating perfume droplets in zero-gravity with Snell refraction and Roman editorial ligature typography.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      tags: ['Raymarching', 'GLSL Caustics', 'Editorial Serif'],
    },
  ];

  return (
    <div
      dir={direction}
      className={`w-full transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* 1. HERO SECTION WITH PROCEDURAL CANVAS */}
      <section className={`relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-400/40 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-8 backdrop-blur-md shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>{isFa ? 'آتلیه طراحی دیجیتال و وب فضایی • توکیو / نیویورک / لندن' : 'ELITE SPATIAL DIGITAL ATELIER • TOKYO / NYC / LONDON'}</span>
          </div>

          <h1 className={`font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight max-w-5xl leading-[1.08] ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? (
              <>
                جایی که کدنویسی <br />
                <span className="bg-gradient-to-r from-cyan-500 via-amber-500 to-rose-500 bg-clip-text text-transparent">
                  به ادراک ناب تبدیل می‌شود.
                </span>
              </>
            ) : (
              <>
                Where Code Transcends <br />
                <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  Into Pure Sensation.
                </span>
              </>
            )}
          </h1>

          <p className={`mt-6 font-light text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed ${
            isLight ? 'text-zinc-600' : 'text-zinc-300'
          }`}>
            {isFa
              ? 'ما دنیاهای تعاملی وب برنده جوایز بین‌المللی، شیدرهای نوری GLSL، فضاهای صوتی سنتز شده و ابزارهای فیزیکی با دقت بالا را خلق می‌کنیم.'
              : 'We architect Awwwards-tier interactive web worlds, GLSL optical shaders, procedural Web Audio soundscapes, and precision physical hardware for visionary leaders.'}
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                soundFx.playChime(750, 0.2);
                setActivePage('STORE');
              }}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{isFa ? 'کاوش در فروشگاه و دراپ‌ها' : 'Explore Store & Drops'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                onSwitchToShowroom();
              }}
              className={`px-8 py-4 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 backdrop-blur-md transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-zinc-900 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 border-white/20 text-white hover:border-amber-400/60 hover:text-amber-300'
              }`}
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'ورود به نمایشگاه ۶۰ قطعه' : 'Inspect 60-Component Showroom'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setActivePage('ABOUT');
              }}
              className={`px-6 py-4 rounded-xl font-mono text-xs font-semibold uppercase tracking-wider transition-colors ${
                isLight ? 'text-zinc-600 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isFa ? 'مطالعه مانیفست استودیو ←' : 'Read Manifesto →'}
            </button>
          </div>

          {/* Client Honors Bar */}
          <div className={`mt-16 pt-8 border-t w-full max-w-4xl flex flex-col items-center gap-4 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <span className={`font-mono text-[10px] uppercase tracking-widest ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
              {isFa ? 'مورد اعتماد رهبران نوآور محصولات در سراسر جهان' : 'TRUSTED BY RADICAL PRODUCT LEADERS • GLOBAL CLIENT NETWORK'}
            </span>
            <div className={`flex flex-wrap items-center justify-center gap-8 sm:gap-12 font-mono text-xs font-bold tracking-widest ${
              isLight ? 'text-zinc-600' : 'text-zinc-400 opacity-70'
            }`}>
              <span>SONY MUSIC</span>
              <span>FRAMEWORK</span>
              <span>BALENCIAGA</span>
              <span>TEENAGE ENG.</span>
              <span>NEURALINK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDIES ACCORDION */}
      <section className={`w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              {isFa ? 'پرونده منتخب // پروژه‌های اختصاصی' : 'CURATED DOSSIER // RECENT COMMISSIONS'}
            </span>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}>
              {isFa ? 'پروژه‌های برگزیده استودیو' : 'Selected Spatial Work'}
            </h2>
          </div>
          <p className={`font-mono text-xs max-w-md ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
            {isFa
              ? 'هر پروژه از پایه بر مبنای محاسبات ریاضی، شیدرهای سفارشی GLSL و اصوات تعاملی وب مهندسی شده است.'
              : 'Every production engagement is custom-crafted from raw math, bespoke GLSL shaders, and tactile procedural sound.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Study Selectors */}
          <div className="lg:col-span-5 space-y-4">
            {caseStudies.map((study, idx) => (
              <div
                key={study.client}
                onClick={() => {
                  soundFx.playClick(600 + idx * 80);
                  setActiveCaseStudy(idx);
                }}
                className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                  activeCaseStudy === idx
                    ? isLight
                      ? 'bg-white border-cyan-500 shadow-xl shadow-cyan-500/10'
                      : 'bg-zinc-900/90 border-cyan-400/50 shadow-xl shadow-cyan-500/10'
                    : isLight
                    ? 'bg-slate-100/80 border-slate-200 hover:border-slate-300'
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className={`font-bold ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                    0{idx + 1} // {study.client}
                  </span>
                  <span className="text-amber-500 font-semibold">{study.award}</span>
                </div>
                <h3 className={`text-xl font-bold mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {study.title}
                </h3>
                <p className={`text-xs leading-relaxed font-light mb-4 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {study.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] border ${
                        isLight
                          ? 'bg-slate-200 border-slate-300 text-zinc-700'
                          : 'bg-white/5 border-white/10 text-zinc-300'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Hero Preview Mockup */}
          <div className={`lg:col-span-7 relative rounded-2xl overflow-hidden border aspect-[16/10] group ${
            isLight ? 'border-slate-300 bg-slate-100' : 'border-white/15 bg-zinc-950'
          }`}>
            <img
              src={caseStudies[activeCaseStudy].image}
              alt={caseStudies[activeCaseStudy].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold w-fit mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isFa ? 'پیش‌نمایش فعال پروژه' : 'ACTIVE SHOWCASE VIEW'}</span>
              </div>
              <h4 className="text-2xl sm:text-3xl font-bold">
                {caseStudies[activeCaseStudy].title}
              </h4>
              <p className="font-mono text-xs text-zinc-300 mt-1">
                {isFa
                  ? 'فیزیک کاملاً پویا، اجرای شیدرهای WebGL و کیفیت استاندارد خروجی وب'
                  : 'Full dynamic physics, WebGL shader execution • Certified Production Grade'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED STORE DROPS PREVIEW */}
      <section className={`w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-500 font-bold block mb-2">
              {isFa ? 'محصولات دیجیتال و سخت‌افزارها' : 'DIGITAL & PHYSICAL INVENTORY'}
            </span>
            <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}>
              {isFa ? 'دراپ‌های منتخب استودیو' : 'Featured Studio Drops'}
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(650);
              setActivePage('STORE');
            }}
            className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-500 hover:text-cyan-400 uppercase tracking-wider"
          >
            <span>{isFa ? `مشاهده همه ${products.length} محصول` : `View All ${products.length} Products`}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className={`rounded-2xl border overflow-hidden flex flex-col transition-all group ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                  : 'bg-zinc-900/60 border-white/15 hover:border-cyan-400/50'
              }`}
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 ${isRtl ? 'right-3' : 'left-3'} px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-amber-400 text-black shadow-md uppercase tracking-wider`}>
                    {product.badge}
                  </span>
                )}
                <span className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-black/70 border border-white/20 text-zinc-300 backdrop-blur-md`}>
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`flex items-center justify-between text-xs font-mono mb-1 ${
                    isLight ? 'text-zinc-500' : 'text-zinc-500'
                  }`}>
                    <span>{product.subCategory}</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </span>
                  </div>

                  <h3 className={`font-bold text-lg group-hover:text-cyan-500 transition-colors ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`text-xs mt-2 line-clamp-2 font-light ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {product.subtitle}
                  </p>
                </div>

                <div className={`pt-6 mt-6 border-t flex items-center justify-between ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}>
                  <div>
                    <span className={`font-mono text-xs block ${isLight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {t.total}
                    </span>
                    <span className="font-mono text-lg font-bold text-emerald-500">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFx.playClick(600);
                        setActiveProductId(product.id);
                        setActivePage('PRODUCT_DETAIL');
                      }}
                      className={`px-3 py-2 rounded-lg font-mono text-xs font-bold transition-colors ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {t.specs}
                    </button>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{t.addToCart}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DISCIPLINE MATRIX PILLARS */}
      <section className={`w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            {isFa ? 'ارکان معماری محصول' : 'ARCHITECTURAL DISCIPLINES'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold tracking-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? 'پنج ستون بنیادین مهندسی استودیو' : 'The Five Foundational Pillars'}
          </h2>
          <p className={`font-light text-sm mt-4 leading-relaxed ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            {isFa
              ? 'هر وب‌سایت و محصول دیجیتالی در استودیو در نقطه تلاقی دقت ریاضی و زیبایی بصری نفس‌گیر ساخته می‌شود.'
              : 'Every digital product and website engineered at AURA operates at the intersection of mathematical precision and visceral aesthetic beauty.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: isFa ? 'شیدرهای WebGL و GLSL' : 'WebGL & GLSL Shaders',
              desc: isFa ? 'انکسار نور اسنل، متابال‌های SDF و کاستیک‌های نوری.' : 'Snell refraction, Raymarched SDF metaballs, volumetric laser caustics.',
              tag: 'GPU-ACCELERATED',
            },
            {
              title: isFa ? 'فیزیک حرکتی جنبشی' : 'Kinetic Motion Physics',
              desc: isFa ? 'اینرسی فنری، اسکرول‌های معکوس همگام و مارکی با زاویه سرعت.' : 'Dynamic spring inertia, dual-column counter-scrolls, velocity-skew marquee.',
              tag: 'SUB-FRAME SMOOTH',
            },
            {
              title: isFa ? 'اصوات سنتز شده وب‌آدیو' : 'Procedural Web Audio',
              desc: isFa ? 'نواهای آرامش‌بخش بدون نویز، بازخورد لمسی کلیک‌ها و پن صوتی.' : 'Noise-free ambient soundscapes, haptic tactile clicks, and Doppler spatial panning.',
              tag: 'ZERO SAMPLES',
            },
            {
              title: isFa ? 'پنل‌های با تراکم داده بالا' : 'High-Density HUDs',
              desc: isFa ? 'نمودارهای تله‌متری زنده، اسکنرهای بیومتریک و دفاتر رمزارز.' : 'Telemetry charts, biometric fingerprint scanners, real-time crypto ledgers.',
              tag: 'COMMAND & CONTROL',
            },
            {
              title: isFa ? 'تجربه کاربری چندمرحله‌ای' : 'Tactile Stepper UX',
              desc: isFa ? 'کارت‌های سه‌بعدی متحرک، تسویه‌حساب مرحله‌ای و ولیدیشن هوشمند.' : 'Gyroscopic 3D card tilt, multi-level checkout progress, live regex validators.',
              tag: 'AURA PROTOCOL',
            },
          ].map((pillar, idx) => (
            <div
              key={pillar.title}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                  : 'bg-white/[0.03] border-white/10 hover:border-cyan-400/40'
              }`}
            >
              <div>
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-3">
                  0{idx + 1} // {pillar.tag}
                </span>
                <h4 className={`font-bold text-lg mb-2 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                  {pillar.title}
                </h4>
                <p className={`text-xs font-light leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                  {pillar.desc}
                </p>
              </div>

              <div className={`pt-6 mt-6 border-t flex items-center gap-1.5 font-mono text-[10px] ${
                isLight ? 'border-slate-100 text-zinc-500' : 'border-white/5 text-zinc-500'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>{isFa ? 'تاییدشده برای پروداکشن' : 'Production Validated'}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. LATEST DISPATCHES & INTEL PREVIEW */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-amber-400 font-bold uppercase tracking-widest mb-3">
              <Newspaper className="w-4 h-4" />
              <span>{isFa ? 'مرکز داده‌ها و مقالات مهندسی' : 'STUDIO DISPATCHES & INTEL'}</span>
            </div>
            <h3 className={`text-2xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'آخرین گزارش‌های تخصصی، وب‌جی‌ال و سخت‌افزار' : 'Cutting-Edge Research & Hardware Notes'}
            </h3>
            <p className={`text-sm mt-2 max-w-2xl font-light ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {isFa
                ? 'تحلیل عمیق شیدرهای WebGL، کالبدشکافی سایبردک‌های تولید محدود و آخرین رویدادهای استودیو آورا.'
                : 'Deep-dive shader breakdowns, bespoke cyberdeck teardowns, and studio product release notes.'}
            </p>
          </div>

          <button
            onClick={() => {
              soundFx.playChime(700, 0.15);
              setActivePage('NEWS');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-105 shrink-0"
          >
            <span>{isFa ? 'مشاهده همه مقالات و دیسپچ‌ها' : 'Explore All Dispatches'}</span>
            {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              id: 'art-webgl-raymarching',
              titleEn: 'Procedural Raymarching in WebGL 2.0: Zero-Mesh Volumetrics',
              titleFa: 'ری‌مارچینگ رویه‌ای در WebGL 2.0: احجام هندسی بدون مِش',
              date: 'Sep 21, 2026',
              category: 'ENGINEERING',
              readTime: '8 min read',
              image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
              excerptEn: 'Constructing infinite signed-distance fields with real-time soft shadows and subsurface light scattering running at 60 FPS.',
              excerptFa: 'ساخت میدان‌های علامت‌دار نامتناهی با سایه‌های نرم بلادرنگ و شکست نور در بافت با سرعت رندر ۶۰ فریم بر ثانیه.'
            },
            {
              id: 'art-cyberdeck-mk4-teardown',
              titleEn: 'CyberDeck MK-IV: CNC Aerospace Magnesium Teardown',
              titleFa: 'سایبردک MK-IV: کالبدشکافی بدنه منیزیمی هوافضایی',
              date: 'Sep 14, 2026',
              category: 'HARDWARE',
              readTime: '12 min read',
              image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80',
              excerptEn: 'Inside the engineering of custom hot-swappable Kailh Choc switches, sunlight-readable OLED, and RISC-V compute module.',
              excerptFa: 'بررسی ساختار سوییچ‌های مکانیکی هات‌سواپ، نمایشگر OLED خوانا در نور خورشید و پردازنده معماری RISC-V.'
            },
            {
              id: 'art-vibe-coding-manifesto',
              titleEn: 'Vibe Coding: The Renaissance of Computational Aesthetics',
              titleFa: 'کدنویسی حسی: رنسانس زیبایی‌شناسی محاسباتی',
              date: 'Sep 02, 2026',
              category: 'DESIGN_SYSTEM',
              readTime: '6 min read',
              image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
              excerptEn: 'Why modern digital craft must discard corporate templates in favor of bespoke motion physics, procedural audio, and tactile feedback.',
              excerptFa: 'چرا نسل آینده وب نیاز به خداحافظی با قالب‌های شرکتی یکنواخت و مهاجرت به فیزیک حرکت و صوت تعاملی دارد.'
            }
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => {
                soundFx.playClick(650);
                setActivePage('NEWS');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`group cursor-pointer rounded-2xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-cyan-400 hover:shadow-xl'
                  : 'bg-white/[0.02] border-white/10 hover:border-cyan-400/50 hover:bg-white/[0.04]'
              }`}
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-mono text-cyan-400 border border-white/10 font-bold uppercase">
                  {item.category}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>{item.date}</span>
                  <span>{item.readTime}</span>
                </div>

                <h4 className={`font-bold text-base line-clamp-2 group-hover:text-cyan-400 transition-colors ${
                  isLight ? 'text-zinc-900' : 'text-white'
                }`}>
                  {isFa ? item.titleFa : item.titleEn}
                </h4>

                <p className={`text-xs line-clamp-2 font-light leading-relaxed ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {isFa ? item.excerptFa : item.excerptEn}
                </p>

                <div className="pt-2 flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 group-hover:underline">
                  <span>{isFa ? 'مطالعه مقاله' : 'Read Article'}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CALL TO ACTION BANNER */}
      <section className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className={`p-8 sm:p-14 rounded-3xl border relative overflow-hidden text-center flex flex-col items-center ${
          isLight
            ? 'bg-gradient-to-tr from-cyan-50 via-white to-amber-50 border-slate-300 shadow-lg'
            : 'bg-gradient-to-tr from-cyan-950/40 via-zinc-900 to-amber-950/30 border-white/20'
        }`}>
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6 shadow-xl">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className={`text-3xl sm:text-5xl font-black tracking-tight max-w-3xl ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa
              ? 'آماده‌اید چیزی بسازید که دیگران ناممکن می‌پندارند؟'
              : 'Ready to Build What Others Believe Is Impossible?'}
          </h2>

          <p className={`font-light text-sm sm:text-base max-w-xl mt-4 leading-relaxed ${
            isLight ? 'text-zinc-600' : 'text-zinc-300'
          }`}>
            {isFa
              ? 'دیزاین سیستم ۶۰ قطعه‌ای را تهیه کنید، شیدرهای انحصاری را لایسنس کنید یا برای سفارش پروژه اختصاصی با ما ارتباط بگیرید.'
              : 'Acquire our complete 60-component design system, license individual shaders, or commission our studio for bespoke digital experiences.'}
          </p>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => {
                soundFx.playChime(800, 0.2);
                setActivePage('STORE');
              }}
              className="px-8 py-4 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{t.enterStore}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setActivePage('CONTACT');
              }}
              className={`px-8 py-4 rounded-xl border font-mono text-xs font-bold uppercase tracking-wider transition-all ${
                isLight
                  ? 'bg-white hover:bg-slate-100 border-slate-300 text-zinc-900 shadow-sm'
                  : 'bg-white/10 hover:bg-white/20 border-white/20 text-white'
              }`}
            >
              <span>{isFa ? 'ارسال بریف و استعلام پروژه' : 'Transmit Project Inquiry'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
