import React, { useState, useEffect, useRef } from 'react';
import { WikiSharedProps } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  Search,
  Sparkles,
  Gamepad2,
  ChevronLeft,
  ChevronRight,
  Flame,
  Star,
  Layers,
  Terminal,
  Cpu,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowLeft,
  X
} from 'lucide-react';

export default function WikiHomeCyberHolo({
  games,
  onSelectGame,
  isFa,
  isRtl,
  searchQuery,
  setSearchQuery,
  selectedGenreFilter,
  setSelectedGenreFilter,
  filteredGames,
}: WikiSharedProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isFrequencyScanning, setIsFrequencyScanning] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background Interactive Matrix Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 650);

    const particles: { x: number; y: number; vx: number; vy: number; size: number; alpha: number }[] = [];
    for (let i = 0; i < 65; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint cyber grid
      ctx.strokeStyle = 'rgba(244, 63, 94, 0.05)';
      ctx.lineWidth = 1;
      const step = 45;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw particle nodes and connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(244, 63, 94, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.strokeStyle = `rgba(244, 63, 94, ${(1 - dist / 110) * 0.25})`;
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

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleNextCarousel = () => {
    soundFx.playTick(900);
    setCarouselIndex((prev) => (prev + 1) % games.length);
  };

  const handlePrevCarousel = () => {
    soundFx.playTick(750);
    setCarouselIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  const activeCarouselGame = games[carouselIndex] || games[0];

  return (
    <div className="space-y-16 animate-in fade-in duration-500">
      {/* 1. CYBER HOLOGRAPHIC HERO WITH 3D MATRIX CANVAS */}
      <section className="relative min-h-[580px] sm:min-h-[640px] px-4 sm:px-8 py-16 flex flex-col justify-center overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#0e0814] via-[#080a12] to-[#04060a] shadow-[0_0_80px_rgba(244,63,94,0.12)]">
        {/* Particle Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        {/* Cyber Neon Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full space-y-10">
          {/* Top Cyber Badge */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-xs shadow-lg shadow-rose-950/50 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <Terminal className="w-3.5 h-3.5 text-rose-400" />
              <span>{isFa ? 'طراحی ۱: هولوگرافیک ماتریکس و کاروسل پرسپکتیو سه‌بعدی' : 'SAMPLE 1: CYBER HOLOGRAPHIC & 3D COVERFLOW'}</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="text-rose-400 font-bold">STATUS:</span>
              <span className="text-emerald-400">ONLINE &bull; 60 FPS</span>
            </div>
          </div>

          {/* Headline */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h1 className="font-['Syne'] text-3xl sm:text-6xl font-black text-white tracking-tight leading-[1.1]">
              {isFa ? (
                <>
                  دایره‌المعارف نسل جدید گیمینگ؛ <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400">
                    موتور جستجوی هولوگرافیک و تحلیل بازی‌ها
                  </span>
                </>
              ) : (
                <>
                  Holographic Cyber Matrix; <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-cyan-400">
                    Next-Gen Encyclopedia & Interactive HUD
                  </span>
                </>
              )}
            </h1>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
              {isFa
                ? 'جستجوی هوشمند در دیتاشیت‌های فنی، بنچمارک سیستم، دانلود ترینرهای تخصصی و زیرنویس‌های فارسی بازی‌ها با موتور تعاملی کانوَس.'
                : 'Neural search across technical datasheets, live hardware benchmarks, certified trainers, and localized game mods.'}
            </p>
          </div>

          {/* HOLOGRAPHIC SEARCH BOX WITH SCANNER EFFECT & AUDIO CHIMES */}
          <div className="max-w-3xl mx-auto relative group">
            {/* Glowing Border HUD */}
            <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 via-purple-600 to-cyan-400 rounded-3xl blur-md opacity-35 group-hover:opacity-75 transition-opacity" />

            <div className="relative rounded-2xl bg-black/90 border-2 border-rose-500/50 p-2 sm:p-3 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full flex items-center">
                <div className="absolute inset-y-0 right-4 sm:right-5 flex items-center pointer-events-none text-rose-400">
                  <Search className="w-5 h-5 animate-pulse" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => soundFx.playChime(650, 0.15)}
                  placeholder={
                    isFa
                      ? 'جستجوی هولوگرافیک (نام بازی، ناشر، سبک، ترینر یا ماد...)'
                      : 'Holographic scan query (Game, developer, genre, trainer...)'
                  }
                  className="w-full py-4 pr-12 pl-6 sm:pr-14 rounded-xl bg-zinc-950/80 border border-white/10 focus:border-rose-400 text-white placeholder-zinc-500 font-bold text-sm outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      soundFx.playClick(500);
                      setSearchQuery('');
                    }}
                    className="absolute inset-y-0 left-4 flex items-center text-zinc-400 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => {
                    soundFx.playChime(950, 0.2);
                    setIsFrequencyScanning(!isFrequencyScanning);
                  }}
                  className={`px-4 py-3 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isFrequencyScanning
                      ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                      : 'bg-white/10 text-zinc-300 hover:bg-white/20'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{isFa ? 'اسکنر فرکانس' : 'Radar Scan'}</span>
                </button>
              </div>
            </div>

            {/* Quick Genre Filter Hologram Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {['ALL', 'Open World', 'Action RPG', 'Soulslike', 'Sci-Fi'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    soundFx.playClick(600);
                    setSelectedGenreFilter(genre);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all border ${
                    selectedGenreFilter === genre
                      ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold shadow-[0_0_12px_rgba(244,63,94,0.4)]'
                      : 'bg-zinc-950/60 border-white/10 text-zinc-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  {genre === 'ALL' ? (isFa ? 'همه سبک‌ها' : 'All') : genre}
                </button>
              ))}
            </div>
          </div>

          {/* 3D PERSPECTIVE COVERFLOW CAROUSEL (کاروسل پرسپکتیو سه‌بعدی با زاویه شیب‌دار) */}
          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-rose-400 font-bold">
                <Flame className="w-4 h-4 text-rose-400" />
                <span>{isFa ? 'ویترین بازی‌های ترند با پرسپکتیو ۳بعدی' : 'TRENDING 3D COVERFLOW'}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevCarousel}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                </button>
                <span className="font-mono text-xs text-zinc-400">
                  {carouselIndex + 1} / {games.length}
                </span>
                <button
                  onClick={handleNextCarousel}
                  className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 3D Coverflow Container */}
            <div className="relative min-h-[360px] sm:min-h-[400px] flex items-center justify-center perspective-[1200px] overflow-hidden py-6">
              {games.map((game, idx) => {
                const offset = idx - carouselIndex;
                const isCenter = offset === 0;
                // Circular offset wrapping
                const absOffset = Math.abs(offset);
                if (absOffset > 2) return null;

                const rotateY = offset * -28;
                const translateX = offset * (typeof window !== 'undefined' && window.innerWidth < 640 ? 120 : 220);
                const translateZ = isCenter ? 60 : -140 * absOffset;
                const opacity = isCenter ? 1 : Math.max(0.3, 1 - absOffset * 0.4);
                const scale = isCenter ? 1 : 0.85;

                return (
                  <div
                    key={game.id}
                    onClick={() => {
                      if (isCenter) {
                        onSelectGame(game.id);
                      } else {
                        soundFx.playClick(600);
                        setCarouselIndex(idx);
                      }
                    }}
                    style={{
                      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                      opacity,
                      zIndex: 20 - absOffset,
                      transition: 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.5s ease',
                    }}
                    className={`absolute w-72 sm:w-80 h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl transition-all group ${
                      isCenter
                        ? 'border-2 border-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.45)]'
                        : 'border border-white/20 hover:border-white/40'
                    }`}
                  >
                    <img
                      src={game.coverImage}
                      alt={game.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                    {/* Badge top */}
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-rose-500/40 text-rose-300 font-mono text-xs">
                      <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{game.scores.wikiGame}/10</span>
                    </div>

                    {/* Bottom Details */}
                    <div className="absolute bottom-0 inset-x-0 p-5 space-y-2 text-right">
                      <span className="font-mono text-[11px] text-cyan-300 uppercase tracking-wider block">
                        {game.developer} &bull; {game.releaseYear}
                      </span>
                      <h3 className="font-['Syne'] font-black text-xl text-white group-hover:text-rose-400 transition-colors">
                        {isFa ? game.titleFa : game.title}
                      </h3>
                      <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                        {isFa ? game.shortDescriptionFa : game.shortDescription}
                      </p>

                      {isCenter && (
                        <div className="pt-2 flex items-center justify-between border-t border-white/20 font-mono text-xs text-rose-400 font-bold">
                          <span>{game.platforms[0]}</span>
                          <span className="flex items-center gap-1">
                            {isFa ? 'ورود به دایره‌المعارف بازی' : 'Open Wiki'} &rarr;
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ALL ENCYCLOPEDIA GAMES DIRECTORY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="font-['Syne'] text-2xl font-black text-white">
              {isFa ? 'پایگاه داده کامل بازی‌ها' : 'Comprehensive Games Database'}
            </h2>
            <span className="text-xs text-zinc-400 font-mono mt-1 block">
              {isFa
                ? `${filteredGames.length} بازی آماده دسترسی به مشخصات فنی، ترینرها و نقدها`
                : `${filteredGames.length} verified titles with deep datasheets & mods`}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="rounded-3xl border border-white/10 bg-zinc-950/80 hover:border-rose-500/60 p-5 space-y-4 cursor-pointer group transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={game.bannerImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-xl bg-black/80 font-mono text-[11px] text-zinc-300 border border-white/15">
                    {game.releaseYear}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-rose-500 text-white font-mono text-xs font-bold shadow-md">
                    ★ {game.scores.wikiGame}
                  </div>
                </div>

                <div>
                  <h3 className="font-['Syne'] font-black text-lg text-white group-hover:text-rose-400 transition-colors">
                    {isFa ? game.titleFa : game.title}
                  </h3>
                  <span className="text-xs font-mono text-zinc-400 block mt-0.5">
                    {game.developer} &bull; {game.engine}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light">
                  {isFa ? game.shortDescriptionFa : game.shortDescription}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between font-mono text-xs text-zinc-400">
                <span>{game.genres.slice(0, 2).join(' / ')}</span>
                <span className="text-rose-400 font-bold group-hover:underline flex items-center gap-1">
                  {isFa ? 'صفحه بازی' : 'Inspect'} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
