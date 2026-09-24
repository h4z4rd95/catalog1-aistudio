import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import { Sparkles, Check, Send, Globe, Shield, ShieldCheck, CheckCircle2, Award, ExternalLink, X, Lock, Star } from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const { setActivePage, theme, language, direction, t } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [showEnamadModal, setShowEnamadModal] = useState(false);
  const [times, setTimes] = useState({
    london: '',
    tokyo: '',
    nyc: '',
  });

  const isLight = theme === 'light';
  const isFa = language === 'fa';

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }),
        tokyo: now.toLocaleTimeString('en-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }),
        nyc: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit' }),
      });
    };
    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      soundFx.playChime(850, 0.2);
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      className={`w-full border-t py-16 px-4 sm:px-6 z-20 transition-colors ${
        isLight
          ? 'bg-slate-100 border-slate-300 text-zinc-700'
          : 'bg-[#030407] border-white/10 text-zinc-400'
      }`}
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top: Newsletter & Mission */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 pb-12 border-b ${isLight ? 'border-slate-300' : 'border-white/10'}`}>
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-xs uppercase tracking-widest text-emerald-500 font-bold">
                {isFa ? 'سیستم آنلاین • دسترسی جهانی' : 'SYSTEM ONLINE • GLOBAL AVAILABILITY'}
              </span>
            </div>
            <h3 className={`font-['Syne'] text-2xl sm:text-3xl font-bold tracking-tight ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'معماری خط‌مقدم فضای تعاملی و وب مدرن.' : 'Architecting the vanguard of interactive cyberspace.'}
            </h3>
            <p className={`text-sm leading-relaxed max-w-lg font-light ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              {isFa
                ? 'استودیو آئورا یک هسته خلاق است که تجربه‌های سه‌بعدی وب‌جی‌ال، دیزاین سیستم‌های پیشرفته و قطعات فیزیکی دست‌ساز را برای پیشتازان دنیای دیجیتال مهندسی می‌کند.'
                : 'AURA Studio is an elite creative collective engineering WebGL experiences, digital design systems, and tactile physical instruments for visionary brands worldwide.'}
            </p>

            {/* Live Studio Clocks */}
            <div className="pt-2 flex flex-wrap gap-4 font-mono text-[11px]">
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${isLight ? 'bg-white border-slate-300 text-zinc-800' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <Globe className="w-3 h-3 text-cyan-400" /> LON: <strong className={isLight ? 'text-zinc-900' : 'text-white'}>{times.london}</strong>
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${isLight ? 'bg-white border-slate-300 text-zinc-800' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <Globe className="w-3 h-3 text-amber-400" /> NYC: <strong className={isLight ? 'text-zinc-900' : 'text-white'}>{times.nyc}</strong>
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${isLight ? 'bg-white border-slate-300 text-zinc-800' : 'bg-white/5 border-white/10 text-zinc-400'}`}>
                <Globe className="w-3 h-3 text-rose-400" /> TYO: <strong className={isLight ? 'text-zinc-900' : 'text-white'}>{times.tokyo}</strong>
              </span>
            </div>
          </div>

          {/* Right: Newsletter Subscribe */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className={`p-6 rounded-2xl border backdrop-blur-md ${isLight ? 'bg-white border-slate-300 shadow-sm' : 'bg-zinc-900/40 border-white/15'}`}>
              <h4 className={`font-['Syne'] font-bold text-base mb-1 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                {isFa ? 'عضویت در خبرنامه تحلیلی استودیو' : 'Subscribe to Dispatch Dossier'}
              </h4>
              <p className={`font-mono text-xs mb-4 ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>
                {isFa
                  ? 'اطلاع‌رسانی اختصاصی دراپ‌های تولیدمحدود سخت‌افزاری و شیدرهای نوین GLSL.'
                  : 'Receive private release notifications for limited physical hardware drops and new GLSL shader kits.'}
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-xs">
                  <Check className="w-4 h-4" />
                  <span>{isFa ? 'عضویت با موفقیت ثبت شد. اتصال برقرار است.' : 'Subscribed successfully. Transmission established.'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isFa ? 'ایمیل کاری خود را وارد کنید...' : 'Enter your email coordinates...'}
                    required
                    className={`flex-1 px-4 py-2.5 rounded-xl font-mono text-xs focus:outline-none focus:border-cyan-400 border ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                        : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                    }`}
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <span>{isFa ? 'ارسال' : 'Transmit'}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-mono text-xs">
          <div>
            <h5 className={`font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'بخش‌های اصلی' : 'Navigation'}
            </h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => setActivePage('LANDING')} className="hover:text-cyan-400 transition-colors">
                  {t.studio}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('STORE')} className="hover:text-cyan-400 transition-colors">
                  {t.store}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('NEWS')} className="hover:text-cyan-400 transition-colors">
                  {t.news}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('ABOUT')} className="hover:text-cyan-400 transition-colors">
                  {t.manifesto}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('CONTACT')} className="hover:text-cyan-400 transition-colors">
                  {t.inquiry}
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('AUTH')} className="hover:text-cyan-400 transition-colors">
                  {t.account}
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className={`font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'دیسیپلین‌ها' : 'Disciplines'}
            </h5>
            <ul className={`space-y-2.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <li>Three.js &amp; WebGL Shaders</li>
              <li>Spatial Product Configurators</li>
              <li>Procedural Web Audio Haptics</li>
              <li>Kinetic Typography &amp; Skew</li>
              <li>Spatial Canvas Sandboxes</li>
            </ul>
          </div>

          <div>
            <h5 className={`font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'کالکشن‌های استور' : 'Store Collections'}
            </h5>
            <ul className={`space-y-2.5 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <li>Vibe Matrix UI Suite</li>
              <li>HyperShader GLSL Caustics</li>
              <li>CyberDeck MK-IV Terminal</li>
              <li>AURA Titanium Tourbillon</li>
              <li>Haptic Knob Controller</li>
            </ul>
          </div>

          <div>
            <h5 className={`font-bold uppercase tracking-wider mb-4 ${isLight ? 'text-zinc-900' : 'text-white'}`}>
              {isFa ? 'مجوزها و نماد اعتماد (اینماد)' : 'Legal, Trust & Enamad'}
            </h5>
            <div className={`space-y-3 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <p className="flex items-center gap-1.5 text-emerald-500 font-bold text-xs">
                <Shield className="w-3.5 h-3.5" /> {isFa ? 'لایسنس تجاری مادام‌العمر' : 'Commercial Perpetual License'}
              </p>
              <p className="text-[11px] leading-relaxed">
                {isFa
                  ? 'دارنده پروانه کسب و نماد اعتماد الکترونیکی رسمی از مرکز توسعه تجارت الکترونیکی وزارت صمت.'
                  : 'Licensed commercial software studio with verified digital trust credentials and SSL encryption.'}
              </p>

              {/* Official Enamad & Iranian E-Commerce Trust Badges */}
              <div className="pt-2 flex items-center gap-2.5">
                {/* 5-Star Enamad Badge */}
                <button
                  onClick={() => {
                    soundFx.playChime(750, 0.2);
                    setShowEnamadModal(true);
                  }}
                  className={`group relative p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${
                    isLight
                      ? 'bg-white border-slate-300 hover:border-amber-400 shadow-sm'
                      : 'bg-zinc-900/80 border-white/15 hover:border-amber-400/60'
                  }`}
                  title={isFa ? 'مشاهده شناسنامه رسمی اینماد پنج ستاره' : 'View Verified 5-Star Enamad Certificate'}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500/20 to-cyan-500/20 flex items-center justify-center border border-amber-400/40">
                    <ShieldCheck className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold mt-1 text-amber-400 flex items-center gap-0.5">
                    ★★★★★
                  </span>
                  <span className={`text-[8px] font-bold block ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {isFa ? 'اینماد ۵ ستاره' : 'Enamad 5★'}
                  </span>
                </button>

                {/* Samandehi Digital Media Badge */}
                <button
                  onClick={() => {
                    soundFx.playChime(750, 0.2);
                    setShowEnamadModal(true);
                  }}
                  className={`group relative p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${
                    isLight
                      ? 'bg-white border-slate-300 hover:border-cyan-400 shadow-sm'
                      : 'bg-zinc-900/80 border-white/15 hover:border-cyan-400/60'
                  }`}
                  title={isFa ? 'نشان ملی ثبت رسانه‌های دیجیتال (ساماندهی)' : 'Digital Media Authority'}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 flex items-center justify-center border border-cyan-400/40">
                    <Award className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold mt-1 text-cyan-400">
                    تاییدشده
                  </span>
                  <span className={`text-[8px] font-bold block ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {isFa ? 'ساماندهی' : 'Samandehi'}
                  </span>
                </button>

                {/* Shaparak Payment Network */}
                <button
                  onClick={() => {
                    soundFx.playChime(750, 0.2);
                    setShowEnamadModal(true);
                  }}
                  className={`group relative p-2 rounded-xl border flex flex-col items-center justify-center text-center transition-all hover:scale-105 ${
                    isLight
                      ? 'bg-white border-slate-300 hover:border-emerald-400 shadow-sm'
                      : 'bg-zinc-900/80 border-white/15 hover:border-emerald-400/60'
                  }`}
                  title={isFa ? 'درگاه امن شاپرک بانک مرکزی' : 'Shaparak Secure Gateway'}
                >
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 flex items-center justify-center border border-emerald-400/40">
                    <Lock className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[9px] font-bold mt-1 text-emerald-400">
                    SSL 256
                  </span>
                  <span className={`text-[8px] font-bold block ${isLight ? 'text-zinc-700' : 'text-zinc-300'}`}>
                    {isFa ? 'شاپرک' : 'Shaparak'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Enamad Verification Certificate Modal */}
        {showEnamadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div
              dir={direction}
              className={`max-w-md w-full rounded-2xl p-6 border shadow-2xl relative transition-all ${
                isLight ? 'bg-white border-slate-200 text-zinc-900' : 'bg-[#0b0e14] border-white/20 text-white'
              }`}
            >
              <button
                onClick={() => {
                  soundFx.playClick(400);
                  setShowEnamadModal(false);
                }}
                className={`absolute top-4 ${isFa ? 'left-4' : 'right-4'} p-1.5 rounded-lg transition-colors ${
                  isLight ? 'bg-slate-100 hover:bg-slate-200 text-zinc-600' : 'bg-white/10 hover:bg-white/20 text-zinc-400 hover:text-white'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 border-b pb-4 mb-4 border-white/10">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/40 flex items-center justify-center">
                  <ShieldCheck className="w-7 h-7 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-['Syne'] font-bold text-base flex items-center gap-1.5">
                    <span>{isFa ? 'شناسنامه رسمی نماد اعتماد الکترونیکی' : 'Verified Enamad Certificate'}</span>
                    <span className="text-amber-400 text-xs">★★★★★</span>
                  </h3>
                  <span className="text-[11px] text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isFa ? 'دارای اعتبار رسمی تا تاریخ ۱۴۰۶/۰۷' : 'Official License Active & Valid'}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <div className={`p-3 rounded-xl border space-y-2 ${isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'نام کسب‌وکار:' : 'Business Name:'}</span>
                    <strong className="font-bold">استودیو آئورا دیجیتال (AURA Atelier)</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'کد اختصاصی رهگیری:' : 'Verification ID:'}</span>
                    <span className="font-mono text-cyan-400 font-bold">IR-982410-ENMD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'صاحب امتیاز:' : 'License Holder:'}</span>
                    <span>شرکت فناوری‌های پیشرفته طراحی وب آئورا</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'دامنه تاییدشده:' : 'Verified Domain:'}</span>
                    <span className="font-mono text-emerald-400">aura-atelier.ir</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'سطح صلاحیت:' : 'Rating Grade:'}</span>
                    <span className="text-amber-400 font-bold">{isFa ? '۵ ستاره (بالاترین سطح اعتبارسنجی)' : '5 Stars (Tier-1)'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-zinc-400">{isFa ? 'پروتکل امنیتی:' : 'Encryption:'}</span>
                    <span className="font-mono text-cyan-300">TLS 1.3 / SHA-256 Bit</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] leading-relaxed">
                  {isFa
                    ? 'این نشان بر اساس ارزیابی فنی، تایید هویت و احراز محل فعالیت صادر گردیده و به کاربر حق استفاده از درگاه پرداخت امن و پیگیری قانونی سفارش را می‌دهد.'
                    : 'This seal confirms that this merchant has satisfied government e-commerce security criteria and provides consumer protection rights.'}
                </div>

                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setShowEnamadModal(false);
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-bold text-xs transition-colors"
                >
                  {isFa ? 'بستن گواهینامه' : 'Close Certificate'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Copyright & Telemetry */}
        <div className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] ${
          isLight ? 'border-slate-300 text-zinc-500' : 'border-white/10 text-zinc-500'
        }`}>
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AURA DIGITAL ATELIER LTD. {isFa ? 'تمامی حقوق محفوظ است.' : 'ALL RIGHTS RESERVED.'}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className={isLight ? 'text-zinc-700' : 'text-zinc-400'}>
              {isFa ? '۶۰ از ۶۰ تنوع شو‌روم فعال' : '60/60 SHOWROOM VARIATIONS LIVE'}
            </span>
            <span>&bull;</span>
            <span className="text-emerald-500 font-bold">100% PRODUCTION READY</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
