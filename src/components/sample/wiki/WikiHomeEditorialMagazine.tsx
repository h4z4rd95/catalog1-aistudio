import React, { useState, useEffect, useRef } from 'react';
import { WikiSharedProps } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  Search,
  BookOpen,
  Award,
  Sparkles,
  Flame,
  Star,
  Quote,
  ArrowRight,
  ArrowLeft,
  X,
  Compass
} from 'lucide-react';

export default function WikiHomeEditorialMagazine({
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
  const [leadGameIdx, setLeadGameIdx] = useState(1); // e.g. Black Myth Wukong as lead
  const leadGame = games[leadGameIdx] || games[0];
  const [searchExpanded, setSearchExpanded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Golden stardust particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];
    for (let i = 0; i < 45; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.4 + 0.1,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.y -= s.speed;
        if (s.y < 0) s.y = height;
        ctx.fillStyle = `rgba(251, 191, 36, ${s.alpha * (0.6 + Math.sin(Date.now() * 0.002 + s.x) * 0.4)})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
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

  return (
    <div className="space-y-16 animate-in fade-in duration-500 font-['Cinzel',sans-serif]">
      {/* 1. CINEMATIC SPLIT MAGAZINE HERO */}
      <section className="relative rounded-3xl overflow-hidden border border-amber-500/30 bg-gradient-to-b from-[#110e08] via-[#090a0f] to-[#040508] p-6 sm:p-12 shadow-2xl">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

        <div className="relative z-10 space-y-10">
          {/* Magazine Masthead Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-400/40 text-amber-300 font-mono text-xs">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{isFa ? 'طراحی ۳: مجله سینمایی اِدیتوریال لوکس (AAA Editorial Split Magazine)' : 'SAMPLE 3: EDITORIAL MAGAZINE'}</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-amber-300/70">
              <Award className="w-4 h-4 text-amber-400" />
              <span>THE GOLD STANDARD CHRONICLE</span>
            </div>
          </div>

          {/* EDITORIAL EXPANDABLE SEARCH ACCORDION */}
          <div className="max-w-2xl mx-auto space-y-2">
            <div className="relative flex items-center shadow-2xl">
              <div className="absolute inset-y-0 right-4 sm:right-6 flex items-center pointer-events-none text-amber-400">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  soundFx.playChime(850, 0.15);
                  setSearchExpanded(true);
                }}
                placeholder={
                  isFa
                    ? 'جستجو در آرشیو نقد و دوسیه‌های تحلیلی بازی‌ها...'
                    : 'Search analytical dossiers, critiques & game lore...'
                }
                className="w-full py-4 pr-14 pl-6 sm:pr-16 rounded-2xl bg-black/70 border border-amber-500/40 focus:border-amber-400 text-white placeholder-amber-200/40 text-sm font-sans outline-none transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-4 flex items-center text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Editorial Quick Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2 font-mono text-xs">
              {['ALL', 'Soulslike', 'Open World', 'Action RPG', 'Sci-Fi'].map((genre) => (
                <button
                  key={genre}
                  onClick={() => {
                    soundFx.playClick(650);
                    setSelectedGenreFilter(genre);
                  }}
                  className={`px-3 py-1 rounded-full border transition-all ${
                    selectedGenreFilter === genre
                      ? 'bg-amber-400 text-black font-bold border-amber-300 shadow-md'
                      : 'bg-black/40 text-amber-200/60 border-amber-500/20 hover:text-white hover:border-amber-400/40'
                  }`}
                >
                  {genre === 'ALL' ? (isFa ? 'تمام بخش‌ها' : 'All') : genre}
                </button>
              ))}
            </div>
          </div>

          {/* Double-Spread Magazine Hero Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
            {/* Left Spread: Deep Critique & Director Note */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LEAD EDITORIAL COVER STORY</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight font-['Syne']">
                {isFa ? leadGame.titleFa : leadGame.title}
              </h1>

              <div className="p-4 rounded-2xl bg-amber-950/30 border-r-4 border-amber-400 text-xs sm:text-sm text-amber-100/90 leading-relaxed font-sans italic space-y-2">
                <div className="flex items-center gap-2 text-amber-400">
                  <Quote className="w-4 h-4" />
                  <span className="font-mono text-[11px] font-bold">دیدگاه هیئت تحریریه مجله:</span>
                </div>
                <p>
                  {isFa
                    ? 'تجربه‌ای که مرزهای انیمیشن، گرافیک آنریل انجین ۵ و روایت افسانه‌های شرق را جابه‌جا کرده است. ترکیبی مسحورکننده از هنر و مهندسی.'
                    : 'A masterclass of Unreal Engine 5 rendering and mythical narrative depth.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectGame(leadGame.id)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-black font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>{isFa ? 'مطالعه پرونده کامل مجله' : 'Read Full Editorial'}</span>
                </button>

                <div className="flex items-center gap-2 font-mono text-xs text-amber-300/80">
                  <span>METACRITIC: {leadGame.scores.metacritic}</span>
                  &bull;
                  <span>WIKI SCORE: {leadGame.scores.wikiGame}/10</span>
                </div>
              </div>
            </div>

            {/* Right Spread: Parallax Cover Art with Gold Foil Frame */}
            <div
              onClick={() => onSelectGame(leadGame.id)}
              className="lg:col-span-6 relative h-96 sm:h-[420px] rounded-3xl overflow-hidden border-2 border-amber-400/50 shadow-[0_0_50px_rgba(251,191,36,0.2)] group cursor-pointer"
            >
              <img
                src={leadGame.bannerImage}
                alt={leadGame.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 font-mono text-xs text-amber-300 border border-amber-400/30">
                VOLUME XXIV &bull; {leadGame.releaseYear}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EDITORIAL CATALOG LIST */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
          <h2 className="font-['Syne'] text-2xl font-bold text-white">
            {isFa ? 'فهرست پرونده‌های تحلیلی بازی‌ها' : 'Editorial Catalog Archive'} ({filteredGames.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="p-6 rounded-3xl bg-zinc-950/90 border border-amber-500/20 hover:border-amber-400/60 transition-all duration-300 cursor-pointer group space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden border border-white/10">
                  <img
                    src={game.coverImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-amber-400 text-black font-mono text-xs font-black">
                    {game.scores.wikiGame} / 10
                  </div>
                </div>

                <h3 className="font-['Syne'] font-bold text-xl text-white group-hover:text-amber-400 transition-colors">
                  {isFa ? game.titleFa : game.title}
                </h3>
                <p className="text-xs text-zinc-300 font-sans line-clamp-2 leading-relaxed font-light">
                  {isFa ? game.shortDescriptionFa : game.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between font-mono text-xs text-amber-300/80">
                <span>{game.developer}</span>
                <span className="font-bold flex items-center gap-1 group-hover:underline">
                  {isFa ? 'مطالعه نقد' : 'Review'} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
