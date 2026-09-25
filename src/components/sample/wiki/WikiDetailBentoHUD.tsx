import React, { useState } from 'react';
import { GameData, GameReview } from './wikiTypes';
import { soundFx } from '../../../utils/audio';
import {
  Sparkles,
  Star,
  Download,
  Video,
  Image as ImageIcon,
  HelpCircle,
  MessageSquare,
  FileText,
  ThumbsUp,
  ThumbsDown,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  Award,
  Layers,
  Sliders,
  Check,
  X,
  Play,
  Volume2,
  Terminal,
  Compass,
  Cpu,
  ShieldCheck,
  Maximize2,
  Clock,
  Send,
  Plus
} from 'lucide-react';

interface WikiDetailProps {
  game: GameData;
  calculatedUserScore: number;
  isFa: boolean;
  isRtl: boolean;
  onBack: () => void;
  onSubmitReview: (review: {
    author: string;
    rating: number;
    recommend: boolean;
    pros: string[];
    cons: string[];
    comment: string;
  }) => void;
  onAddQuestion: (question: { author: string; question: string }) => void;
}

export default function WikiDetailBentoHUD({
  game,
  calculatedUserScore,
  isFa,
  isRtl,
  onBack,
  onSubmitReview,
  onAddQuestion,
}: WikiDetailProps) {
  const [activeTab, setActiveTab] = useState<
    'OVERVIEW' | 'SCREENSHOTS' | 'VIDEOS' | 'TRAINER' | 'PERSIAN_MOD' | 'WALKTHROUGH' | 'QA' | 'REVIEWS'
  >('OVERVIEW');

  const [hasPlayedGame, setHasPlayedGame] = useState<boolean | null>(null);
  const [formRating, setFormRating] = useState(9);
  const [formRecommend, setFormRecommend] = useState(true);
  const [formPros, setFormPros] = useState('');
  const [formCons, setFormCons] = useState('');
  const [formAuthor, setFormAuthor] = useState('');
  const [formComment, setFormComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Ask Question Modal State
  const [isAskingQuestion, setIsAskingQuestion] = useState(false);
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newQuestionAuthor, setNewQuestionAuthor] = useState('');

  // 3D Tilt Screenshot State
  const [activeScreenshotModal, setActiveScreenshotModal] = useState<string | null>(null);

  const handleReviewFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formComment.trim()) return;
    onSubmitReview({
      author: formAuthor.trim() || (isFa ? 'کاربر گیمر ویکی‌گیم' : 'Anonymous Gamer'),
      rating: formRating,
      recommend: formRecommend,
      pros: formPros ? formPros.split(',').map((p) => p.trim()).filter(Boolean) : [isFa ? 'گیم‌پلی عالی' : 'Great Gameplay'],
      cons: formCons ? formCons.split(',').map((c) => c.trim()).filter(Boolean) : [],
      comment: formComment,
    });
    setReviewSubmitted(true);
    setFormComment('');
    setFormPros('');
    setFormCons('');
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    onAddQuestion({
      author: newQuestionAuthor.trim() || (isFa ? 'کاربر جامعه گیمینگ' : 'Gamer'),
      question: newQuestionText.trim(),
    });
    setNewQuestionText('');
    setNewQuestionAuthor('');
    setIsAskingQuestion(false);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-300">
      {/* 1. CINEMATIC FULL-WIDTH HEADER WITH GLASSMORPHIC HUD */}
      <div className="relative min-h-[520px] sm:min-h-[580px] flex items-end justify-center overflow-hidden rounded-3xl border border-rose-500/30">
        <img
          src={game.bannerImage}
          alt={game.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-[#07090e]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 pointer-events-none" />

        {/* FLOATING GLASS HUD OVERLAY */}
        <div className="relative z-20 w-full max-w-6xl mx-auto p-6 sm:p-10 flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
            <div className="relative w-36 h-48 sm:w-44 sm:h-60 rounded-2xl overflow-hidden border-2 border-rose-500/80 shadow-[0_0_40px_rgba(244,63,94,0.4)] shrink-0 bg-black group">
              <img
                src={game.coverImage}
                alt={game.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-rose-500 text-white font-mono text-xs font-bold uppercase shadow-sm">
                  {game.genres[0]}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/10 text-zinc-300 font-mono text-xs">
                  {game.releaseYear}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono text-xs">
                  {game.engine}
                </span>
              </div>

              <h1 className="font-['Syne'] text-3xl sm:text-5xl font-black text-white leading-tight">
                {isFa ? game.titleFa : game.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400">
                <span>{isFa ? 'سازنده:' : 'Developer:'} <strong className="text-white">{game.developer}</strong></span>
                <span>&bull;</span>
                <span>{isFa ? 'ناشر:' : 'Publisher:'} <strong className="text-white">{game.publisher}</strong></span>
              </div>
            </div>
          </div>

          {/* DYNAMIC RATINGS HUD */}
          <div className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20 shadow-2xl flex items-center gap-5 shrink-0">
            <div className="text-center px-2">
              <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">
                {isFa ? 'امتیاز زنده کاربران' : 'USER SCORE'}
              </span>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400 animate-pulse" />
                <span className="text-3xl font-black font-['Syne'] text-white">
                  {calculatedUserScore}
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">
                ({game.reviews.length} {isFa ? 'نظر ثبت‌شده' : 'reviews'})
              </span>
            </div>

            <div className="w-[1px] h-12 bg-white/15" />

            <div className="text-center px-2">
              <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">METACRITIC</span>
              <div className="text-3xl font-black font-['Syne'] text-emerald-400 mt-1">
                {game.scores.metacritic}
              </div>
              <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">Metascore</span>
            </div>

            <div className="w-[1px] h-12 bg-white/15" />

            <div className="text-center px-2">
              <span className="font-mono text-[10px] text-zinc-400 block uppercase font-bold">IGN</span>
              <div className="text-3xl font-black font-['Syne'] text-rose-400 mt-1">
                {game.scores.ign}
              </div>
              <span className="font-mono text-[10px] text-zinc-400 block mt-0.5">/ 10</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB NAVIGATION BAR */}
      <div className="border-b border-white/10 bg-zinc-950/80 sticky top-16 z-30 backdrop-blur-md px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
          {[
            { id: 'OVERVIEW', label: isFa ? 'شناسنامه و مشخصات' : 'Overview', icon: FileText },
            { id: 'SCREENSHOTS', label: isFa ? 'گالری اسکرین‌شات 4K' : 'Screenshots', icon: ImageIcon },
            { id: 'VIDEOS', label: isFa ? 'تریلرها و گیم‌پلی' : 'Trailers', icon: Video },
            { id: 'TRAINER', label: isFa ? 'ترینر و کد تقلب' : 'Trainers & Cheats', icon: Terminal },
            { id: 'PERSIAN_MOD', label: isFa ? 'ماد فارسی‌ساز اختصاصی' : 'Persian Mod', icon: Sparkles },
            { id: 'WALKTHROUGH', label: isFa ? 'راهنمای قدم‌به‌قدم' : 'Walkthrough', icon: Compass },
            { id: 'QA', label: isFa ? 'پرسش و پاسخ گیمرها' : 'Q&A Community', icon: HelpCircle },
            { id: 'REVIEWS', label: isFa ? 'نقد و ثبت امتیاز' : 'User Reviews', icon: Star },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundFx.playClick(650);
                  setActiveTab(tab.id as any);
                }}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs font-mono transition-all flex items-center gap-2 shrink-0 ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. TAB CONTENT SUITE */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* TAB 1: OVERVIEW & SPECS */}
        {activeTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
                <h3 className="font-['Syne'] text-xl font-bold text-white">
                  {isFa ? 'درباره و داستان بازی' : 'Game Synopsis'}
                </h3>
                <p className="text-zinc-300 text-sm leading-relaxed font-light">
                  {isFa ? game.fullDescriptionFa : game.fullDescription}
                </p>
              </div>

              {/* Hardware Requirements */}
              <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-6">
                <h3 className="font-['Syne'] text-xl font-bold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                  <span>{isFa ? 'سیستم مورد نیاز برای اجرای بازی' : 'System Hardware Requirements'}</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Min */}
                  <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/5 space-y-3 text-xs font-mono">
                    <span className="text-cyan-400 font-bold block">{isFa ? 'حداقل سیستم:' : 'MINIMUM:'}</span>
                    <div className="space-y-1.5 text-zinc-300">
                      <div>OS: {game.systemReqs.min.os}</div>
                      <div>CPU: {game.systemReqs.min.cpu}</div>
                      <div>GPU: {game.systemReqs.min.gpu}</div>
                      <div>RAM: {game.systemReqs.min.ram}</div>
                      <div>Storage: {game.systemReqs.min.storage}</div>
                    </div>
                  </div>
                  {/* Rec */}
                  <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-400/30 space-y-3 text-xs font-mono">
                    <span className="text-cyan-300 font-bold block">{isFa ? 'سیستم پیشنهادی:' : 'RECOMMENDED:'}</span>
                    <div className="space-y-1.5 text-zinc-300">
                      <div>OS: {game.systemReqs.rec.os}</div>
                      <div>CPU: {game.systemReqs.rec.cpu}</div>
                      <div>GPU: {game.systemReqs.rec.gpu}</div>
                      <div>RAM: {game.systemReqs.rec.ram}</div>
                      <div>Storage: {game.systemReqs.rec.storage}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Telemetry */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-4">
                <h4 className="font-mono text-xs text-rose-400 uppercase font-bold">
                  {isFa ? 'اطلاعات انتشار و ناشر' : 'Publication Data'}
                </h4>
                <div className="space-y-2.5 text-xs font-mono text-zinc-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">{isFa ? 'زمان تقریبی گیم‌پلی:' : 'Playtime:'}</span>
                    <span className="text-white font-bold">{game.playtime}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-zinc-500">{isFa ? 'پلتفرم‌ها:' : 'Platforms:'}</span>
                    <span className="text-white font-bold">{game.platforms.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">{isFa ? 'وضعیت استیم:' : 'Steam:'}</span>
                    <span className="text-emerald-400 font-bold">{game.scores.steam}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SCREENSHOTS WITH 3D TILT */}
        {activeTab === 'SCREENSHOTS' && (
          <div className="space-y-6">
            <h3 className="font-['Syne'] text-2xl font-bold text-white">
              {isFa ? 'گالری تصاویر با کیفیت 4K و قابلیت بزرگنمایی' : '4K Ultra Screenshots'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {game.screenshots.map((src, i) => (
                <div
                  key={i}
                  onClick={() => {
                    soundFx.playClick(700);
                    setActiveScreenshotModal(src);
                  }}
                  className="relative h-56 rounded-2xl overflow-hidden border border-white/15 group cursor-pointer shadow-lg hover:border-rose-400 transition-all"
                >
                  <img
                    src={src}
                    alt={`Screenshot ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="px-4 py-2 rounded-xl bg-black/80 text-white font-mono text-xs flex items-center gap-1.5 border border-white/20">
                      <Maximize2 className="w-3.5 h-3.5 text-rose-400" />
                      <span>{isFa ? 'مشاهده تمام‌صفحه' : 'Zoom 4K'}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TRAINERS & CHEATS MATRIX */}
        {activeTab === 'TRAINER' && (
          <div className="p-8 rounded-3xl bg-zinc-950/90 border border-rose-500/30 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <h3 className="font-['Syne'] text-2xl font-black text-white flex items-center gap-2">
                  <Terminal className="w-6 h-6 text-rose-400" />
                  <span>{game.trainers.title}</span>
                </h3>
                <span className="font-mono text-xs text-zinc-400">
                  Author: <strong className="text-rose-400">{game.trainers.author}</strong> &bull; Version: {game.trainers.version}
                </span>
              </div>

              <button
                onClick={() => soundFx.playChime(900, 0.2)}
                className="px-5 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-rose-500/30"
              >
                <Download className="w-4 h-4" />
                <span>{isFa ? 'دانلود مستقیم ترینر معتبر' : 'Download Verified Trainer'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.trainers.features.map((feat, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-black/60 border border-white/10 flex items-center gap-3 font-mono text-xs text-zinc-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: PERSIAN MOD SHOWCASE */}
        {activeTab === 'PERSIAN_MOD' && (
          <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-950/40 via-zinc-950 to-black border border-cyan-400/40 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 font-mono text-xs mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{game.persianMod.type}</span>
                </div>
                <h3 className="font-['Syne'] text-2xl font-black text-white">
                  {game.persianMod.title}
                </h3>
                <span className="text-xs font-mono text-zinc-400">
                  {isFa ? 'مترجم:' : 'Translator:'} {game.persianMod.translator} &bull; حجم فایل: {game.persianMod.size}
                </span>
              </div>

              <button
                onClick={() => soundFx.playChime(850, 0.2)}
                className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/25"
              >
                <Download className="w-4 h-4" />
                <span>{isFa ? 'دانلود پچ فارسی‌ساز' : 'Download Persian Patch'}</span>
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="font-mono text-xs text-cyan-300 uppercase font-bold">{isFa ? 'ویژگی‌های بسته ترجمه فارسی:' : 'Key Mod Features:'}</h4>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                {game.persianMod.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 font-mono text-xs text-zinc-400">
                <strong className="text-white block mb-1">{isFa ? 'راهنمای نصب:' : 'Installation Instructions:'}</strong>
                {game.persianMod.installGuide}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: USER REVIEWS & INTERACTIVE REVIEW GATE */}
        {activeTab === 'REVIEWS' && (
          <div className="space-y-8">
            {/* The Verification Question Gate */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-950/90 border border-rose-500/30 text-center space-y-4">
              <h3 className="font-['Syne'] text-2xl font-bold text-white">
                {isFa ? 'آیا تجربه بازی را دارید؟' : 'Have you played this game?'}
              </h3>
              <p className="text-xs text-zinc-300 max-w-lg mx-auto font-light">
                {isFa
                  ? 'ثبت امتیاز در ویکی‌گیم نیاز به تجربه واقعی دارد. با مشارکت خود میانگین نمرات بازی را شکل دهید.'
                  : 'To ensure accurate community sentiment, please confirm if you have hands-on experience.'}
              </p>

              {hasPlayedGame === null ? (
                <div className="flex items-center justify-center gap-4 pt-2">
                  <button
                    onClick={() => {
                      soundFx.playChime(800, 0.2);
                      setHasPlayedGame(true);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-xs transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isFa ? 'بله، تجربه کرده‌ام' : 'Yes, I played it'}</span>
                  </button>

                  <button
                    onClick={() => {
                      soundFx.playClick(600);
                      setHasPlayedGame(false);
                    }}
                    className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs transition-colors"
                  >
                    <span>{isFa ? 'خیر، صرفا مطالعه نظرات' : 'No, just browsing'}</span>
                  </button>
                </div>
              ) : hasPlayedGame ? (
                /* The Dynamic Review Form */
                <form onSubmit={handleReviewFormSubmit} className="max-w-2xl mx-auto pt-4 space-y-4 text-right">
                  <div className="p-5 rounded-2xl bg-black/60 border border-white/10 space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-2">
                        {isFa ? 'امتیاز شما از ۱ تا ۱۰:' : 'Your Score (1 to 10):'}
                      </label>
                      <div className="flex items-center gap-2 justify-center">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <button
                            key={num}
                            type="button"
                            onClick={() => {
                              soundFx.playTick(500 + num * 40);
                              setFormRating(num);
                            }}
                            className={`w-8 h-8 rounded-lg font-mono text-xs font-bold transition-all ${
                              formRating === num
                                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/40'
                                : 'bg-white/5 text-zinc-400 hover:bg-white/10'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">{isFa ? 'نام کاربری شما:' : 'Author Name:'}</label>
                        <input
                          type="text"
                          value={formAuthor}
                          onChange={(e) => setFormAuthor(e.target.value)}
                          placeholder={isFa ? 'مثلا: گیمر حرفه‌ای' : 'Your handle'}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-zinc-400 mb-1">{isFa ? 'نکات مثبت (با کاما جدا کنید):' : 'Pros:'}</label>
                        <input
                          type="text"
                          value={formPros}
                          onChange={(e) => setFormPros(e.target.value)}
                          placeholder={isFa ? 'گرافیک، صداگذاری...' : 'Graphics, sound...'}
                          className="w-full px-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">{isFa ? 'متن نقد و نظر شما:' : 'Review details:'}</label>
                      <textarea
                        rows={3}
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        placeholder={isFa ? 'نظرتان را درباره مکانیک‌ها، داستان و عملکرد فنی بنویسید...' : 'Share your gameplay impressions...'}
                        className="w-full p-3 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs outline-none"
                      />
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <button
                        type="button"
                        onClick={() => setHasPlayedGame(null)}
                        className="text-xs font-mono text-zinc-500 hover:text-white"
                      >
                        {isFa ? 'انصراف' : 'Cancel'}
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono text-xs font-bold transition-all shadow-lg"
                      >
                        {isFa ? 'ثبت نقد و بروزرسانی امتیاز زنده' : 'Submit Review'}
                      </button>
                    </div>

                    {reviewSubmitted && (
                      <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-400/40 text-emerald-300 text-xs font-mono text-center">
                        {isFa ? 'نقد شما با موفقیت ثبت شد و میانگین امتیاز زنده بازی بروز گردید!' : 'Review recorded! Community average updated.'}
                      </div>
                    )}
                  </div>
                </form>
              ) : (
                <div className="text-zinc-500 text-xs font-mono">
                  {isFa ? 'می‌توانید نظرات ثبت‌شده کاربران زیر را مطالعه کنید.' : 'Browsing community reviews.'}
                </div>
              )}
            </div>

            {/* List of Reviews */}
            <div className="space-y-4">
              {game.reviews.map((rev) => (
                <div key={rev.id} className="p-6 rounded-3xl bg-zinc-950/80 border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-300 font-bold flex items-center justify-center font-mono">
                        {rev.author[0]}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{rev.author}</div>
                        <span className="text-[10px] font-mono text-zinc-500">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-black/80 border border-rose-500/30 text-rose-400 font-mono font-bold text-xs">
                      <Star className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                      <span>{rev.rating}/10</span>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed font-light">
                    {rev.comment}
                  </p>

                  {rev.pros.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {rev.pros.map((p, i) => (
                        <span key={i} className="px-2.5 py-0.5 rounded-lg bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono">
                          + {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: Q&A */}
        {activeTab === 'QA' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-['Syne'] text-xl font-bold text-white">
                {isFa ? 'پرسش‌های متداول و تجربیات گیمرها' : 'Community Q&A'}
              </h3>
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setIsAskingQuestion(!isAskingQuestion);
                }}
                className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-mono text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{isFa ? 'طرح پرسش جدید' : 'Ask a Question'}</span>
              </button>
            </div>

            {isAskingQuestion && (
              <form onSubmit={handleQuestionSubmit} className="p-5 rounded-2xl bg-zinc-950 border border-white/10 space-y-3">
                <input
                  type="text"
                  value={newQuestionAuthor}
                  onChange={(e) => setNewQuestionAuthor(e.target.value)}
                  placeholder={isFa ? 'نام شما' : 'Your name'}
                  className="w-full px-3 py-2 rounded-xl bg-black border border-white/10 text-xs text-white outline-none"
                />
                <textarea
                  rows={2}
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  placeholder={isFa ? 'پرسش خود درباره مراحل، باگ‌ها یا سیستم را بپرسید...' : 'Ask question...'}
                  className="w-full p-3 rounded-xl bg-black border border-white/10 text-xs text-white outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-500 text-white font-mono text-xs font-bold"
                >
                  {isFa ? 'ارسال پرسش' : 'Submit'}
                </button>
              </form>
            )}

            <div className="space-y-4">
              {game.qa.map((q) => (
                <div key={q.id} className="p-5 rounded-2xl bg-zinc-950/80 border border-white/10 space-y-2">
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    <span>{q.question}</span>
                  </div>
                  <p className="text-xs text-zinc-300 font-light leading-relaxed">
                    {q.answer}
                  </p>
                  <div className="text-[10px] font-mono text-zinc-500">
                    {isFa ? 'مطرح‌شده توسط:' : 'Asked by:'} {q.author} &bull; {q.votes} {isFa ? 'تایید مفید بودن' : 'upvotes'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Screenshot Fullscreen Modal */}
      {activeScreenshotModal && (
        <div
          onClick={() => setActiveScreenshotModal(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 cursor-zoom-out animate-in fade-in"
        >
          <div className="relative max-w-5xl max-h-[90vh] rounded-3xl overflow-hidden border-2 border-white/20">
            <img src={activeScreenshotModal} alt="Enlarged" className="w-full h-full object-contain" />
            <button
              onClick={() => setActiveScreenshotModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-black/80 text-white border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
