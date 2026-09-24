import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Sparkles,
  Compass,
  CheckCircle2,
  Users,
  Award,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActivePage, theme, language, direction, t } = useStore();
  const [selectedMilestone, setSelectedMilestone] = useState(3);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const team = [
    {
      name: isFa ? 'دکتر والریوس ونس' : 'Dr. Valerius Vance',
      role: isFa ? 'هم‌بنیان‌گذار و فناور خلاق ارشد' : 'Founding Creative Technologist',
      bio: isFa
        ? 'پژوهشگر اسبق گرافیک فضایی در MIT Media Lab. تخصص در ریمارچینگ شیدرهای GLSL و توپولوژی رابط‌های غیرارقلیدسی.'
        : 'Former spatial graphics researcher at MIT Media Lab. Specializes in real-time GLSL raymarching and non-Euclidean UI topology.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: isFa ? 'کائوری تاکاهاشی' : 'Kaori Takahashi',
      role: isFa ? 'معمار ارشد طراحی صدای فضایی' : 'Lead Spatial Audio Architect',
      bio: isFa
        ? 'پیشگام سنتز صوتی روی وب‌آدیو و فضاهای صوتی دوگوشی پلی‌ریتمیک برای برندهای فوق‌لوکس جهانی.'
        : 'Pioneered Web Audio procedural synthesis and polyrhythmic binaural soundscapes for high-end automotive and luxury brands.',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: isFa ? 'جولین تورن' : 'Julian Thorne',
      role: isFa ? 'مهندس ارشد صنعتی و سخت‌افزار' : 'Principal Hardware & Industrial Engineer',
      bio: isFa
        ? 'مهندس اصلی ترمینال CyberDeck MK-IV و ساعت توربیلون AURA. متخصص در تراش CNC آلومینیوم 6061-T6 و فیزیک چرخ‌دنده‌ها.'
        : 'Lead engineer behind the CyberDeck MK-IV and AURA Vermeil Tourbillon. Expert in CNC 6061-T6 machining and tactile detent physics.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    },
    {
      name: isFa ? 'النا روستووا' : 'Elena Rostova',
      role: isFa ? 'مدیر دیزاین و استاد تایپوگرافی' : 'Design Director & Typography Master',
      bio: isFa
        ? 'عضو هیئت داوران Awwwards و طراح فونت‌های ادیتوریال. پیونددهنده خطوط کلاسیک رنسانس با تایپوگرافی الگوریتمی معاصر.'
        : 'Awwwards Jury Member and editorial serif designer. Blends Renaissance calligraphic ligatures with neo-brutalist algorithmic skew.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    },
  ];

  const milestones = [
    {
      year: '2021',
      title: isFa ? 'تاسیس استودیو و تحقیقات وب‌جی‌ال' : 'Studio Genesis & WebGL Research',
      desc: isFa
        ? 'تاسیس در توکیو به عنوان آزمایشگاه پژوهشی هوش بصری و شیدرهای لحظه‌ای مرورگر و نوسان‌سازهای صوتی.'
        : 'Founded in Tokyo as a boutique generative research lab experimenting with real-time browser shaders and audio oscillators.',
    },
    {
      year: '2023',
      title: isFa ? 'اولین جایزه سایت سال Awwwards' : 'First Awwwards Site of the Year',
      desc: isFa
        ? 'ساخت اولین کانفیگوراتور مکانیکی ساعت توربیلون تحت وب در جهان به سفارش برندهای برجسته ساعت‌سازی سوئیس.'
        : 'Commissioned by European haute horology houses to build the worlds first browser-based mechanical tourbillon configurator.',
    },
    {
      year: '2024',
      title: isFa ? 'بخش تولید سخت‌افزارهای ملموس' : 'Hardware Synthesis Division',
      desc: isFa
        ? 'گسترش به دنیای رایانش فیزیکی با معرفی ترمینال CyberDeck و کنترلرهای روتاری هپتیک با درگاه Type-C.'
        : 'Expanded into physical computing with the launch of the CyberDeck tactile terminal and programmable USB-C haptic rotary encoders.',
    },
    {
      year: '2026',
      title: isFa ? 'اکوسیستم دیزاین سیستم ۶۰ قطعه‌ای' : 'Vibe Matrix Architecture & Global Showroom',
      desc: isFa
        ? 'انتشار دیزاین سیستم جامع ۶۰ قطعه‌ای در ۱۲ گرایش تخصصی و پایه‌گذاری استاندارد نوین وب فضایی.'
        : 'Released the universal 60-component visual playbook, establishing an open standard for Awwwards-tier vibe coding and spatial web engineering.',
    },
  ];

  return (
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-28 transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* Manifesto Hero */}
      <section className={`w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>{isFa ? 'مانیفست // فلسفه و اصالت استودیو' : 'MANIFESTO // PHILOSOPHY & PEDIGREE'}</span>
          </div>

          <h1 className={`font-['Syne'] font-black text-4xl sm:text-6xl tracking-tight leading-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? 'ما وب تکراری، استریل و یکنواخت را رد می‌کنیم.' : 'We reject the sterile, homogenous web.'}
          </h1>

          <p className={`mt-6 text-lg sm:text-xl font-light leading-relaxed ${
            isLight ? 'text-zinc-600' : 'text-zinc-300'
          }`}>
            {isFa
              ? 'اینترنت معاصر به قالب‌های کلیشه‌ای و کارت‌های تخت تقلیل یافته است. استودیو آئورا پناهگاهی است برای زیبایی رادیکال، فیزیک فضایی شتاب‌گرفته با پردازنده گرافیکی، طنین صوتی تعاملی و صنعتگری بدون مصالحه.'
              : 'The modern internet was reduced to cookie-cutter design systems and flat cards. AURA exists as a sanctuary for radical beauty, GPU-accelerated spatial physics, procedural acoustic resonance, and uncompromised craft.'}
          </p>
        </div>
      </section>

      {/* Historical Milestones Timeline */}
      <section className={`w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-amber-500 font-bold uppercase tracking-widest block mb-1">
              {isFa ? 'گاه‌شمار استودیو ۲۰۲۱ تا ۲۰۲۶' : 'CHRONOLOGY 2021 — 2026'}
            </span>
            <h2 className={`font-['Syne'] text-3xl sm:text-4xl font-bold ${
              isLight ? 'text-zinc-900' : 'text-white'
            }`}>
              {isFa ? 'مسیر تکامل و نقاط عطف' : 'Studio Evolution & Milestones'}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {milestones.map((m, idx) => (
            <div
              key={m.year}
              onClick={() => {
                soundFx.playClick(600 + idx * 80);
                setSelectedMilestone(idx);
              }}
              className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                selectedMilestone === idx
                  ? isLight
                    ? 'bg-white border-cyan-500 shadow-xl shadow-cyan-500/10'
                    : 'bg-zinc-900 border-cyan-400 shadow-xl shadow-cyan-500/10'
                  : isLight
                  ? 'bg-slate-100 border-slate-200 hover:border-slate-300'
                  : 'bg-white/5 border-white/10 hover:border-white/20'
              }`}
            >
              <span className="font-mono text-2xl font-black text-cyan-400 block mb-2">
                {m.year}
              </span>
              <h3 className={`font-['Syne'] font-bold text-base mb-2 ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}>
                {m.title}
              </h3>
              <p className={`text-xs font-light leading-relaxed ${
                isLight ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Roster */}
      <section className={`w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto border-b ${
        isLight ? 'border-slate-200' : 'border-white/10'
      }`}>
        <div className="mb-12">
          <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest block mb-1">
            {isFa ? 'رهبری و معماران اصلی' : 'COLLECTIVE LEADERSHIP'}
          </span>
          <h2 className={`font-['Syne'] text-3xl sm:text-4xl font-bold ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? 'معماران و فناوران خلاق' : 'Architects & Technologists'}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member) => (
            <div
              key={member.name}
              className={`rounded-2xl border overflow-hidden flex flex-col transition-all group ${
                isLight
                  ? 'bg-white border-slate-200 hover:border-cyan-500 shadow-sm'
                  : 'bg-zinc-900/60 border-white/15 hover:border-cyan-400/50'
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className={`font-['Syne'] font-bold text-lg transition-colors ${
                    isLight ? 'text-zinc-900 group-hover:text-cyan-600' : 'text-white group-hover:text-cyan-300'
                  }`}>
                    {member.name}
                  </h4>
                  <span className="font-mono text-[11px] text-cyan-500 font-semibold block mt-0.5">
                    {member.role}
                  </span>
                  <p className={`text-xs font-light mt-3 leading-relaxed ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {member.bio}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Enamad & Digital Trust Credentials Section */}
      <section className="w-full py-12 px-4 sm:px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className={`p-8 rounded-3xl border ${
          isLight ? 'bg-white border-slate-200 shadow-md' : 'bg-zinc-950/60 border-white/15'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-right">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  {isFa ? 'احراز هویت رسمی و مجوزهای قانونی' : 'OFFICIALLY VERIFIED LEGAL CREDENTIALS'}
                </span>
              </div>
              <h3 className={`font-['Syne'] text-2xl font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? 'دارنده نماد اعتماد الکترونیکی ۵ ستاره (اینماد)' : '5-Star Verified Enamad Commercial License'}
              </h3>
              <p className={`text-xs max-w-2xl leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                {isFa
                  ? 'تمامی تراکنش‌های مالی، حق امتیاز کدهای نرم‌افزاری و ارسال فیزیکی سخت‌افزارها تحت نظارت مستقیم مرکز توسعه تجارت الکترونیکی وزارت صنعت، معدن و تجارت و قوانین حمایت از حقوق مصرف‌کننده انجام می‌پذیرد.'
                  : 'All client software licensing and hardware deliveries operate under verified commercial trade credentials and SSL encryption.'}
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex flex-col items-center">
                <span className="text-amber-400 text-sm">★★★★★</span>
                <span className="text-[11px] font-bold text-amber-300 mt-1">{isFa ? 'اینماد ۵ ستاره' : 'Enamad 5★'}</span>
                <span className="font-mono text-[9px] text-zinc-400 mt-0.5">IR-982410-ENMD</span>
              </div>
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/30 flex flex-col items-center">
                <Award className="w-5 h-5 text-cyan-400" />
                <span className="text-[11px] font-bold text-cyan-300 mt-1">{isFa ? 'رسانه دیجیتال' : 'Samandehi'}</span>
                <span className="font-mono text-[9px] text-zinc-400 mt-0.5">{isFa ? 'ساماندهی' : 'Verified'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-20 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        <h3 className={`font-['Syne'] text-3xl sm:text-4xl font-bold mb-4 ${
          isLight ? 'text-zinc-900' : 'text-white'
        }`}>
          {isFa ? 'همکاری با پیشروترین آتلیه طراحی جهان' : 'Collaborate With The Atelier'}
        </h3>
        <p className={`font-light max-w-xl mx-auto text-sm mb-8 ${
          isLight ? 'text-zinc-600' : 'text-zinc-400'
        }`}>
          {isFa
            ? 'ما سالانه تعداد محدودی پروژه اختصاصی در حوزه وب فضایی، دیزاین سیستم‌های سازمانی و قطعات سخت‌افزاری سفارشی می‌پذیریم.'
            : 'We accept a limited number of commissions per calendar year for bespoke spatial web applications, design systems, and physical hardware.'}
        </p>
        <button
          onClick={() => {
            soundFx.playClick(650);
            setActivePage('CONTACT');
          }}
          className="px-8 py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 shadow-lg shadow-cyan-500/20"
        >
          <span>{isFa ? 'ارسال بریف و شروع مکاتبه' : 'Transmit Client Dossier'}</span>
          {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </section>
    </div>
  );
};
