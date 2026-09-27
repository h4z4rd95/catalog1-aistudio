import React from 'react';
import { SITE_CONTENT } from '../../../content/site';
import { ArrowUp, Heart, Terminal, ShieldCheck } from 'lucide-react';
import { soundFx } from '../../../utils/audio';

export default function StudioFooter() {
  const scrollToTop = () => {
    soundFx.playClick(600);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060608] border-t border-[#202027] text-zinc-400 font-mono text-xs py-16 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tension Matrix Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-3xl bg-[#09090B] border border-[#202027]">
          {SITE_CONTENT.tensions.map((t) => (
            <div key={t.index} className="space-y-2">
              <span className="text-cyan-400 font-bold block">{t.index} // {t.title}</span>
              <h4 className="font-['Lalezar'] text-lg text-white font-normal">{t.titleFa}</h4>
              <p className="font-['Vazirmatn'] text-[11px] text-zinc-400 leading-relaxed font-light">
                {t.descFa}
              </p>
            </div>
          ))}
        </div>

        {/* Main Footer Links & Bio */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-['Lalezar'] text-3xl text-white">123Service<span className="text-cyan-400">.</span></span>
              <span className="px-2 py-0.5 rounded bg-[#17171D] text-[10px] text-zinc-400 border border-[#202027]">
                DIGITAL CREATIVE ENGINE
              </span>
            </div>

            <p className="font-['Vazirmatn'] text-xs text-zinc-400 font-light max-w-md leading-relaxed">
              استودیو خلاق ۱۲۳سرویس؛ طراحی شده بر پایه تضادهای بنیادین مهندسی، وب‌سایت‌های برنده Awwwards، ربات‌های هوش مصنوعی و گرافیک اصیل فارسی.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-[#B8FF3D]" />
              <span>TEHRAN & REMOTE // 35.6892° N, 51.3890° E</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <span className="font-bold text-white block">سرویس‌های شاخص:</span>
            <ul className="space-y-1.5 text-zinc-400 text-xs font-['Vazirmatn']">
              <li>طراحی لوگو و هویت سازمانی</li>
              <li>طراحی و توسعه وب تعاملی</li>
              <li>ساخت ربات‌های شبکه‌های اجتماعی</li>
              <li>موشن گرافیک و لوگوموشن</li>
              <li>سئو و رشد تضمینی ترافیک گوگل</li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <span className="font-bold text-white block">ارتباط مستقیم:</span>
            <div className="space-y-1 text-xs">
              <p className="text-cyan-400">hi@123service.studio</p>
              <p className="text-zinc-400">+98 21 8899 1230</p>
              <p className="text-zinc-500">پاسخگویی فنی: ۹ صبح الی ۲۱</p>
            </div>

            <button
              onClick={scrollToTop}
              className="px-4 py-2 rounded-xl bg-[#111116] hover:bg-white/10 border border-[#202027] text-zinc-300 flex items-center gap-2 transition-colors"
            >
              <span>بازگشت به ابتدای صفحه</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-[#202027] pt-6 flex flex-wrap items-center justify-between gap-4 text-[10px] text-zinc-600">
          <span>&copy; {new Date().getFullYear()} 123Service Studio. All rights reserved.</span>
          <span className="flex items-center gap-1 font-['Vazirmatn']">
            <span>توسعه یافته با عشق، کدنویسی تمیز و ذوق خلاقانه</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
}
