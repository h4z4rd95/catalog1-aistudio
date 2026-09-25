import React, { useState, useEffect, useRef } from 'react';
import { WikiSharedProps } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  Search,
  Sparkles,
  LayoutDashboard,
  Layers,
  Flame,
  Star,
  Download,
  Video,
  Cpu,
  Monitor,
  CheckCircle2,
  Sliders,
  Play,
  ArrowRight,
  ArrowLeft,
  X,
  Compass
} from 'lucide-react';

export default function WikiHomeBentoCommand({
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
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const featuredGame = games[featuredIdx] || games[0];

  const suggestions = [
    { label: isFa ? '🔥 جی‌تی‌ای ۶' : 'GTA VI', query: 'GTA VI' },
    { label: isFa ? '🐒 بلک میث ووکانگ' : 'Black Myth Wukong', query: 'Wukong' },
    { label: isFa ? '⚡ سایبرپانک فانتوم' : 'Cyberpunk Phantom', query: 'Cyberpunk' },
    { label: isFa ? '🛠️ ترینر FLiNG' : 'FLiNG Trainer', query: 'Trainer' },
    { label: isFa ? '🇮🇷 ماد زیرنویس' : 'Persian Mod', query: 'فارسی' },
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* 1. TOP BENTO COMMAND HERO */}
      <section className="space-y-8">
        {/* Top Header Badge & Live Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-400/40 text-cyan-300 font-mono text-xs">
            <LayoutDashboard className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isFa ? 'طراحی ۲: بنتو گرید نسل جدید (Next-Gen Bento Command Center 2026)' : 'SAMPLE 2: NEXT-GEN BENTO COMMAND'}</span>
          </div>

          <div className="flex items-center gap-4 font-mono text-xs text-zinc-400">
            <span className="hidden sm:inline">DATABASE: 4,820 REPOSITORIES</span>
            <span className="text-cyan-400 font-bold">MODS VERIFIED: 100%</span>
          </div>
        </div>

        {/* FLOATING LIQUID GLASS SEARCH ENGINE WITH SMART SUGGESTIONS */}
        <div className="relative max-w-4xl mx-auto space-y-4">
          <div className="p-3 sm:p-4 rounded-3xl bg-zinc-900/90 border-2 border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] backdrop-blur-2xl">
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 right-4 sm:right-5 flex items-center pointer-events-none text-cyan-400">
                <Search className="w-6 h-6 animate-pulse" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => soundFx.playChime(700, 0.15)}
                placeholder={
                  isFa
                    ? 'جستجو در آرشیو بنتو: نام بازی، سبک، سیستم مورد نیاز، ترینر یا سازنده...'
                    : 'Search Bento Command: Title, genre, specs, trainer or studio...'
                }
                className="w-full py-4 pr-14 pl-6 sm:pr-16 rounded-2xl bg-black/60 border border-white/10 focus:border-cyan-400 text-white placeholder-zinc-500 font-bold text-sm sm:text-base outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 left-4 flex items-center text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Smart Suggestions Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <span className="text-xs font-mono text-zinc-400">{isFa ? 'پیشنهادات سریع:' : 'Fast Tags:'}</span>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => {
                    soundFx.playClick(600);
                    setSearchQuery(sug.query);
                  }}
                  className="px-3 py-1 rounded-xl bg-white/5 hover:bg-cyan-500/20 hover:text-cyan-300 border border-white/10 text-xs font-mono text-zinc-300 transition-all"
                >
                  {sug.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. THE HIGH-DENSITY BENTO GRID SUITE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tile A: Giant Spotlight Hero (7 Cols) */}
          <div
            onClick={() => onSelectGame(featuredGame.id)}
            className="lg:col-span-7 relative min-h-[460px] rounded-3xl overflow-hidden border border-white/15 bg-black group cursor-pointer shadow-2xl flex flex-col justify-end p-6 sm:p-8"
          >
            {/* Backdrop Banner */}
            <img
              src={featuredGame.bannerImage}
              alt={featuredGame.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

            {/* Top Spotlight Tag */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
              <span className="px-3.5 py-1 rounded-full bg-cyan-400 text-black font-mono text-xs font-black uppercase tracking-wider shadow-lg">
                FEATURED SPOTLIGHT
              </span>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                <span>{featuredGame.scores.wikiGame} / 10 WIKI SCORE</span>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="relative z-10 space-y-3">
              <span className="font-mono text-xs text-cyan-300 uppercase tracking-widest block font-bold">
                {featuredGame.developer} &bull; {featuredGame.releaseYear}
              </span>
              <h2 className="font-['Syne'] text-3xl sm:text-4xl font-black text-white leading-tight group-hover:text-cyan-300 transition-colors">
                {isFa ? featuredGame.titleFa : featuredGame.title}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-300 line-clamp-2 max-w-xl font-light">
                {isFa ? featuredGame.shortDescriptionFa : featuredGame.shortDescription}
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectGame(featuredGame.id);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-black uppercase tracking-wider shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isFa ? 'بررسی عمیق دایره‌المعارف' : 'Enter Bento Wiki'}</span>
                </button>

                <div className="flex items-center gap-1">
                  {games.map((g, idx) => (
                    <button
                      key={g.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        soundFx.playClick(600);
                        setFeaturedIdx(idx);
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        featuredIdx === idx ? 'w-8 bg-cyan-400' : 'bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tile B & C: Telemetry & Quick Action Bento Tiles (5 Cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            {/* Tile B1: Verified Mods & Trainers Ticker */}
            <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-zinc-400">{isFa ? 'مرکز ترینر و ماد' : 'TRAINERS & MODS'}</span>
                <Download className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <div className="text-3xl font-black font-['Syne'] text-white">100% CLEAN</div>
                <p className="text-xs text-zinc-400 mt-1">
                  {isFa
                    ? 'تمامی ترینرهای FLiNG و مادهای ترجمه فارسی اسکن‌شده با ۲۴ آنتی‌ویروس معتبر.'
                    : 'FLiNG trainers and Persian subtitles SHA-256 verified and virus-free.'}
                </p>
              </div>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-mono text-cyan-400">
                <span>{featuredGame.trainers.title}</span>
                <span className="font-bold">v{featuredGame.trainers.version}</span>
              </div>
            </div>

            {/* Tile B2: User Reviews Sentiment Meter */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-zinc-950/90 border border-indigo-500/30 transition-all space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-indigo-300 font-bold">{isFa ? 'نبض نظرات گیمرها' : 'COMMUNITY PULSE'}</span>
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black font-['Syne'] text-white">{featuredGame.scores.wikiGame}</span>
                <span className="text-xs font-mono text-zinc-400">/ 10 WIKI RATING</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-400">{isFa ? 'رضایت کاربران:' : 'Player Satisfaction:'}</span>
                  <span className="text-emerald-400 font-bold">96% Very Positive</span>
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-[96%] h-full bg-gradient-to-r from-cyan-400 to-emerald-400" />
                </div>
              </div>

              <p className="text-[11px] text-zinc-300 line-clamp-1 italic">
                &ldquo;{featuredGame.reviews[0]?.comment || 'Outstanding visual masterpiece'}&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENTO CARD DIRECTORY OF ALL GAMES */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-['Syne'] text-2xl font-bold text-white">
            {isFa ? 'ماژول‌های بنتو بازی‌های پایگاه داده' : 'Bento Grid Titles'} ({filteredGames.length})
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <div
              key={game.id}
              onClick={() => onSelectGame(game.id)}
              className="p-5 rounded-3xl bg-zinc-950/80 border border-white/10 hover:border-cyan-400/50 hover:bg-zinc-900/60 transition-all duration-300 cursor-pointer group space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden">
                  <img
                    src={game.bannerImage}
                    alt={game.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded-lg bg-black/80 font-mono text-[10px] text-zinc-300">
                    {game.engine}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-cyan-400 text-black font-mono text-xs font-bold">
                    ★ {game.scores.wikiGame}
                  </div>
                </div>

                <div>
                  <h4 className="font-['Syne'] font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                    {isFa ? game.titleFa : game.title}
                  </h4>
                  <span className="text-xs font-mono text-zinc-400">{game.developer}</span>
                </div>

                <p className="text-xs text-zinc-300 line-clamp-2 font-light">
                  {isFa ? game.shortDescriptionFa : game.shortDescription}
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-400">{game.platforms[0]}</span>
                <span className="text-cyan-400 font-bold group-hover:underline flex items-center gap-1">
                  {isFa ? 'ورود' : 'Open'} &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
