import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  ArrowRight,
  ShoppingBag,
  Layers,
  Compass,
  Zap,
  Globe,
  Star,
  CheckCircle2,
  Terminal,
  Activity,
  Code2
} from 'lucide-react';

export const LandingPage: React.FC<{ onSwitchToShowroom: () => void }> = ({ onSwitchToShowroom }) => {
  const { setActivePage, setActiveProductId, products, addToCart } = useStore();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);

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
        hue: Math.random() > 0.5 ? 190 : 45, // cyan or gold
      });
    }

    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.fillStyle = '#050609';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle spatial grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
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

      // Draw interconnected particles with distance alpha
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.fillStyle = p.hue === 190 ? 'rgba(56, 189, 248, 0.8)' : 'rgba(251, 191, 36, 0.8)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - dist / 120) * 0.12})`;
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
  }, []);

  const caseStudies = [
    {
      client: 'KINETIC CHRONO',
      title: 'Spatial Horology 3D Configurator',
      award: 'Awwwards Site of the Month',
      description: 'Parametric WebGL tourbillon watch configurator with real-time anisotropic titanium shading and gyroscopic dial rotation.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
      tags: ['Three.js', 'PBR Shaders', 'Web Audio'],
    },
    {
      client: 'NEO-MATRIX LABS',
      title: 'Tactical Cyberdeck Interface & Ledger',
      award: 'FWA of the Day',
      description: 'Hardware operating system UI with low-latency Web Audio haptic clicks, ASCII memory matrices, and high-frequency telemetry.',
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      tags: ['React 19', 'Canvas 2D', 'WebHID'],
    },
    {
      client: 'HAUTE ATELIER',
      title: 'Digital Fragrance Sculpture',
      award: 'Cannes Lions Gold',
      description: 'Ethereal fluid caustics simulating perfume droplets in zero-gravity with Snell refraction and Roman editorial ligature typography.',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      tags: ['Raymarching', 'GLSL Caustics', 'Editorial Serif'],
    },
  ];

  return (
    <div className="w-full bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] selection:bg-cyan-400 selection:text-black">
      {/* 1. HERO SECTION WITH PROCEDURAL CANVAS */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 flex flex-col items-center text-center z-10">
          {/* Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-400/40 text-cyan-300 font-mono text-xs uppercase tracking-widest mb-8 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>ELITE SPATIAL DIGITAL ATELIER &bull; TOKYO / NYC / LONDON</span>
          </div>

          <h1 className="font-['Syne'] font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-white max-w-5xl leading-[1.05]">
            Where Code Transcends <br />
            <span className="bg-gradient-to-r from-cyan-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
              Into Pure Sensation.
            </span>
          </h1>

          <p className="mt-6 font-light text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl leading-relaxed">
            We architect Awwwards-tier interactive web worlds, GLSL optical shaders, procedural Web Audio soundscapes, and precision physical hardware for the visionary few.
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
              <span>Explore Store &amp; Drops</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                onSwitchToShowroom();
              }}
              className="px-8 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2.5 backdrop-blur-md transition-all hover:border-amber-400/60 hover:text-amber-300"
            >
              <Layers className="w-4 h-4 text-amber-400" />
              <span>Inspect 55-Component Showroom</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setActivePage('CONTACT');
              }}
              className="px-6 py-4 rounded-xl text-zinc-400 hover:text-white font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
            >
              <span>Book Client Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Client Honors Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 w-full max-w-4xl flex flex-col items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
              TRUSTED BY RADICAL PRODUCT LEADERS &bull; GLOBAL CLIENT NETWORK
            </span>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-70 font-mono text-xs font-bold tracking-widest text-zinc-400">
              <span className="hover:text-white transition-colors">SONY MUSIC</span>
              <span className="hover:text-white transition-colors">FRAMEWORK</span>
              <span className="hover:text-white transition-colors">BALENCIAGA</span>
              <span className="hover:text-white transition-colors">TEENAGE ENG.</span>
              <span className="hover:text-white transition-colors">NEURALINK</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED CASE STUDIES ACCORDION */}
      <section className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
              CURATED DOSSIER // RECENT COMMISSIONS
            </span>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
              Selected Spatial Work
            </h2>
          </div>
          <p className="font-mono text-xs text-zinc-400 max-w-md">
            Every production engagement is custom-crafted from raw math, bespoke GLSL shaders, and tactile procedural sound.
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
                    ? 'bg-zinc-900/90 border-cyan-400/50 shadow-xl shadow-cyan-500/10'
                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/[0.07]'
                }`}
              >
                <div className="flex items-center justify-between font-mono text-xs mb-2">
                  <span className="text-zinc-500 font-bold">0{idx + 1} // {study.client}</span>
                  <span className="text-amber-300 font-semibold">{study.award}</span>
                </div>
                <h3 className="font-['Syne'] text-xl font-bold text-white mb-2">
                  {study.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-light mb-4">
                  {study.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full font-mono text-[10px] bg-white/5 border border-white/10 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Hero Preview Mockup */}
          <div className="lg:col-span-7 relative rounded-2xl overflow-hidden border border-white/15 aspect-[16/10] bg-zinc-950 group">
            <img
              src={caseStudies[activeCaseStudy].image}
              alt={caseStudies[activeCaseStudy].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/50 text-cyan-300 font-mono text-xs font-bold w-fit mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ACTIVE SHOWCASE VIEW</span>
              </div>
              <h4 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white">
                {caseStudies[activeCaseStudy].title}
              </h4>
              <p className="font-mono text-xs text-zinc-300 mt-1">
                Full dynamic physics, WebGL shader execution &bull; Certified Production Grade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED STORE DROPS PREVIEW */}
      <section className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              DIGITAL &amp; PHYSICAL INVENTORY
            </span>
            <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Studio Drops
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick(650);
              setActivePage('STORE');
            }}
            className="flex items-center gap-1.5 font-mono text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider"
          >
            <span>View All {products.length} Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="rounded-2xl bg-zinc-900/60 border border-white/15 overflow-hidden flex flex-col hover:border-cyan-400/50 transition-all group"
            >
              {/* Product Thumbnail */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-amber-400 text-black shadow-md uppercase tracking-wider">
                    {product.badge}
                  </span>
                )}
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-md font-mono text-[10px] font-bold bg-black/70 border border-white/20 text-zinc-300 backdrop-blur-md">
                  {product.category}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-1">
                    <span>{product.subCategory}</span>
                    <span className="flex items-center gap-1 text-amber-300">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{product.rating}</span>
                    </span>
                  </div>

                  <h3 className="font-['Syne'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2 font-light">
                    {product.subtitle}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs text-zinc-500 block">PRICE</span>
                    <span className="font-mono text-lg font-bold text-emerald-400">
                      ${product.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundFx.playClick(600);
                        setActiveProductId(product.id);
                        setActivePage('PRODUCT_DETAIL');
                      }}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 font-mono text-xs font-bold text-white transition-colors"
                    >
                      Inspect
                    </button>

                    <button
                      onClick={() => addToCart(product, 1)}
                      className="px-3.5 py-2 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. DISCIPLINE MATRIX PILLARS */}
      <section className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-2">
            ARCHITECTURAL DISCIPLINES
          </span>
          <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The Five Foundational Pillars
          </h2>
          <p className="font-light text-zinc-400 text-sm mt-4 leading-relaxed">
            Every digital product and website engineered at AURA operates at the intersection of mathematical precision and visceral aesthetic beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            {
              title: 'WebGL & GLSL Shaders',
              desc: 'Snell refraction, Raymarched SDF metaballs, volumetric laser caustics.',
              tag: 'GPU-ACCELERATED',
            },
            {
              title: 'Kinetic Motion Physics',
              desc: 'Dynamic spring inertia, dual-column counter-scrolls, velocity-skew marquee.',
              tag: 'SUB-FRAME SMOOTH',
            },
            {
              title: 'Procedural Web Audio',
              desc: 'Noise-free ambient soundscapes, haptic tactile clicks, and Doppler spatial panning.',
              tag: 'ZERO SAMPLES',
            },
            {
              title: 'High-Density HUDs',
              desc: 'Telemetry charts, biometric fingerprint scanners, real-time crypto ledgers.',
              tag: 'COMMAND & CONTROL',
            },
            {
              title: 'Tactile Stepper UX',
              desc: 'Gyroscopic 3D card tilt, multi-level checkout progress, live regex validators.',
              tag: 'AURA PROTOCOL',
            },
          ].map((pillar, idx) => (
            <div
              key={pillar.title}
              className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-3">
                  0{idx + 1} // {pillar.tag}
                </span>
                <h4 className="font-['Syne'] font-bold text-lg text-white mb-2">
                  {pillar.title}
                </h4>
                <p className="text-xs text-zinc-400 font-light leading-relaxed">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5 text-zinc-500 font-mono text-[10px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Production Validated</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="w-full py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-tr from-cyan-950/40 via-zinc-900 to-amber-950/30 border border-white/20 relative overflow-hidden text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-300 mb-6 shadow-xl">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-['Syne'] text-3xl sm:text-5xl font-black text-white tracking-tight max-w-3xl">
            Ready to Build What Others Believe Is Impossible?
          </h2>

          <p className="font-light text-zinc-300 text-sm sm:text-base max-w-xl mt-4 leading-relaxed">
            Acquire our complete 55-component design system, license individual shaders, or commission our studio for bespoke digital experiences.
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
              <span>Enter Store Catalog</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setActivePage('CONTACT');
              }}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all"
            >
              <span>Transmit Project Inquiry</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
