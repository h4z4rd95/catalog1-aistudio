import React, { useState } from 'react';
import { GameData } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  BookOpen,
  Award,
  Play,
  Pause,
  Volume2,
  Sparkles,
  Quote,
  Clock,
  Layers,
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';

interface LuxuryLoreProps {
  game: GameData;
  isFa: boolean;
  isRtl: boolean;
  onBack: () => void;
}

export default function WikiDetailLuxuryLore({
  game,
  isFa,
  isRtl,
  onBack,
}: LuxuryLoreProps) {
  const [isPlayingSoundtrack, setIsPlayingSoundtrack] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const soundtracks = [
    { title: `${game.title} - Main Title Overture`, duration: '3:45', composer: 'Atelier Symphony' },
    { title: `${game.title} - Night City Amber Noir`, duration: '4:12', composer: 'Synth Wave Ensemble' },
    { title: `${game.title} - Mythical Climax`, duration: '5:02', composer: 'Oriental Philharmonic' },
  ];

  const [currentTrack, setCurrentTrack] = useState(0);

  const togglePlayTrack = () => {
    soundFx.playChime(isPlayingSoundtrack ? 500 : 900, 0.2);
    setIsPlayingSoundtrack(!isPlayingSoundtrack);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300 font-['Cinzel',sans-serif]">
      {/* 1. EDITORIAL HEADER & MONOGRAM */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#14100a] via-[#090b10] to-black border-2 border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amber-500/20 pb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/80 border border-amber-400/50 flex items-center justify-center text-amber-300">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">
                {isFa ? 'طراحی ۳: ژورنال لوکس ادیتوریال و لور داستانی' : 'SAMPLE 3: LUXURY EDITORIAL & LORE DOSSIER'}
              </span>
              <h1 className="font-['Syne'] text-3xl sm:text-4xl font-black text-white">
                {isFa ? game.titleFa : game.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-amber-300/80">
            <Award className="w-4 h-4 text-amber-400" />
            <span>CRITICS GUILD LAUREATE</span>
          </div>
        </div>

        {/* 2. ATMOSPHERIC SOUNDTRACK VINYL PLAYER */}
        <div className="pt-8">
          <div className="p-6 rounded-2xl bg-black/60 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              {/* Rotating Vinyl Icon */}
              <div
                onClick={togglePlayTrack}
                className={`w-16 h-16 rounded-full bg-gradient-to-tr from-zinc-800 to-black border-2 border-amber-400/60 shadow-lg flex items-center justify-center cursor-pointer transition-all ${
                  isPlayingSoundtrack ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <div className="w-6 h-6 rounded-full bg-amber-400 text-black flex items-center justify-center">
                  {isPlayingSoundtrack ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </div>
              </div>

              <div>
                <span className="font-mono text-[10px] text-amber-400 uppercase tracking-widest block">
                  {isFa ? 'موسیقی متن ارجینال بازی (Original OST):' : 'Original Game Soundtrack:'}
                </span>
                <h4 className="font-sans font-bold text-white text-base">
                  {soundtracks[currentTrack].title}
                </h4>
                <span className="font-mono text-xs text-zinc-400">
                  {soundtracks[currentTrack].composer} &bull; {soundtracks[currentTrack].duration}
                </span>
              </div>
            </div>

            {/* Track Switcher */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {soundtracks.map((tr, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundFx.playClick(700);
                    setCurrentTrack(idx);
                    setIsPlayingSoundtrack(true);
                  }}
                  className={`px-3 py-1.5 rounded-xl border transition-all ${
                    currentTrack === idx
                      ? 'bg-amber-400 text-black font-bold border-amber-300'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  Track {idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3. LORE CHRONOLOGY & CHAPTERS */}
        <div className="pt-8 space-y-6">
          <div className="border-b border-amber-500/20 pb-3 flex items-center justify-between">
            <h3 className="font-['Syne'] text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{isFa ? 'پرونده روایی، گاه‌شمار و جناح‌های داستانی' : 'Narrative Lore & Factions Dossier'}</span>
            </h3>
            <span className="text-xs font-mono text-amber-400/80">OFFICIAL CANON ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            {[
              {
                title: isFa ? 'بخش ۱: مبدأ بحران و جهان بازی' : 'Phase 1: Genesis of Conflict',
                text: isFa
                  ? 'نگاهی عمیق به بستر ژئوپولیتیک و رویدادهای تاریخی که شهر و سرنوشت پروتاگونیست را شکل داده‌اند.'
                  : 'Deep geopolitical underpinnings and character motivations.',
              },
              {
                title: isFa ? 'بخش ۲: فلسفه قدرت و جناح‌ها' : 'Phase 2: Faction Dynamics',
                text: isFa
                  ? 'بررسی مناسبات قدرت، سازمان‌های مخفی و انگیزه کاراکترهای کلیدی در پیشبرد گره‌های روایی.'
                  : 'Analysis of shadow cartels, ideological conflicts, and narrative branching.',
              },
              {
                title: isFa ? 'بخش ۳: میراث و تاویل نمادین' : 'Phase 3: Thematic Symbolism',
                text: isFa
                  ? 'تحلیل زیرمتن‌های جامعه‌شناختی و تمثیلی که این اثر را به شاهکاری ماندگار تبدیل کرده است.'
                  : 'Allegorical interpretations of mortality, freedom, and technology.',
              },
            ].map((dossier, i) => (
              <div key={i} className="p-6 rounded-2xl bg-zinc-950/80 border border-amber-500/20 space-y-3">
                <span className="font-mono text-xs text-amber-400 block font-bold">DOSSIER 0{i + 1}</span>
                <h4 className="font-bold text-white text-base font-['Syne']">{dossier.title}</h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">{dossier.text}</p>
              </div>
            ))}
          </div>

          {/* Editorial Quote Banner */}
          <div className="p-6 rounded-2xl bg-amber-950/20 border border-amber-400/40 text-amber-100 font-sans italic text-sm text-center leading-relaxed">
            <Quote className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            &ldquo;
            {isFa
              ? 'این بازی صرفاً یک سرگرمی تعاملی نیست؛ بلکه رمانی بصری در هیبت هنر هشتم است که تا سال‌ها بعد در یادها خواهد ماند.'
              : 'More than an interactive diversion, this work stands as a monument to narrative craft.'}
            &rdquo;
          </div>
        </div>
      </div>
    </div>
  );
}
