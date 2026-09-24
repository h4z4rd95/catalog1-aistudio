import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import { Sparkles, Check, Send, Globe, Shield } from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const { setActivePage, theme, language, direction, t } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
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
              {isFa ? 'مجوزها و اصالت' : 'Legal & Architecture'}
            </h5>
            <div className={`space-y-2 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
              <p className="flex items-center gap-1.5 text-emerald-500 font-bold">
                <Shield className="w-3.5 h-3.5" /> {isFa ? 'لایسنس تجاری مادام‌العمر' : 'Commercial Perpetual License'}
              </p>
              <p className="text-[11px] leading-relaxed">
                {isFa
                  ? 'تمام دارایی‌های دیجیتال شامل حقوق تجاری همیشگی هستند. اقلام فیزیکی با بیمه کامل به سراسر جهان ارسال می‌شوند.'
                  : 'All digital assets include perpetual commercial rights for client deployments. Physical items ship worldwide with insured tracking.'}
              </p>
            </div>
          </div>
        </div>

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
