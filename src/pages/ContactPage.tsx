import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Mail,
  Send,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Phone,
  MessageSquare,
  Globe
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { theme, language, direction, t } = useStore();

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceTier: 'SPATIAL_WEBGL',
    budget: '$50,000 - $100,000',
    timeline: 'Q3 2026',
    dateSlot: '2026-09-28',
    timeSlot: '14:00 GMT',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(880, 0.3);
    setSubmitted(true);
  };

  const resetForm = () => {
    soundFx.playClick(500);
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      company: '',
      serviceTier: 'SPATIAL_WEBGL',
      budget: '$50,000 - $100,000',
      timeline: 'Q3 2026',
      dateSlot: '2026-09-28',
      timeSlot: '14:00 GMT',
      message: '',
    });
  };

  const offices = [
    {
      city: isFa ? 'استودیو توکیو' : 'Tokyo Studio',
      address: isFa ? 'مینامی-آئویاما، میناتو-کو، پلاک ۵-۷-۲' : '5-7-2 Minami-Aoyama, Minato-ku',
      contact: '+81 3 5555 0192',
      tz: 'JST (UTC+9)'
    },
    {
      city: isFa ? 'آتلیه نیویورک' : 'New York Atelier',
      address: isFa ? 'برادوی، طبقه ۱۲، منهتن' : '740 Broadway, 12th Floor, NoHo',
      contact: '+1 212 555 0148',
      tz: 'EST (UTC-5)'
    },
    {
      city: isFa ? 'دفتر مرکزی لندن' : 'London Office',
      address: isFa ? 'خیابان شوردیچ های، پلاک ۱۸' : '18 Shoreditch High St, EC1 6PG',
      contact: '+44 20 7946 0912',
      tz: 'BST (UTC+1)'
    },
  ];

  return (
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-28 transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      {/* Header Banner */}
      <div className={`w-full border-b py-16 px-4 sm:px-6 transition-colors ${
        isLight
          ? 'bg-gradient-to-b from-slate-100 to-slate-50 border-slate-200'
          : 'bg-gradient-to-b from-[#0a0d14] to-[#050609] border-white/10'
      }`}>
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-2 font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold">
            <Mail className="w-3.5 h-3.5" />
            <span>{isFa ? 'پروتکل سفارش // پرونده استعلام اختصاصی' : 'COMMISSION PROTOCOL // INQUIRY DOSSIER'}</span>
          </div>
          <h1 className={`font-['Syne'] font-black text-3xl sm:text-5xl tracking-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isFa ? 'آغاز همکاری و رزرو اسپرینت' : 'Initiate Engagement'}
          </h1>
          <p className={`font-light text-sm sm:text-base mt-2 max-w-xl mx-auto ${
            isLight ? 'text-zinc-600' : 'text-zinc-400'
          }`}>
            {isFa
              ? 'رزرو اسپرینت‌های معماری استودیو، درخواست تولید سفارشی قطعات سخت‌افزاری یا برنامه‌ریزی مشاوره وب فضایی.'
              : 'Reserve architectural studio sprints, request custom hardware fabrications, or schedule a spatial engineering consultation.'}
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Form Dossier */}
          <div className="lg:col-span-7">
            <div className={`p-8 rounded-3xl border backdrop-blur-md shadow-2xl ${
              isLight ? 'bg-white border-slate-200 shadow-slate-900/5' : 'bg-zinc-900/60 border-white/15'
            }`}>
              {submitted ? (
                <div className="py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className={`font-['Syne'] font-black text-2xl ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                    {isFa ? 'ارتباط برقرار شد • پیام شما دریافت گردید' : 'Transmission Established'}
                  </h3>
                  <p className={`font-mono text-xs max-w-md mx-auto leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {isFa
                      ? 'بریف پروژه شما در سیستم ثبت شد. تیم مشاوران استودیو ظرف ۲۴ ساعت آینده جهت تایید تقویم تماس خواهند گرفت.'
                      : 'Your brief has been logged into our studio triage ledger. Our partner team will review your timeline and confirm calendar slots within 24 hours.'}
                  </p>
                  <button
                    onClick={resetForm}
                    className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold uppercase mt-4 border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                    }`}
                  >
                    {isFa ? 'ارسال درخواست دیگر' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className={`font-['Syne'] font-bold text-lg flex items-center gap-2 ${
                    isLight ? 'text-zinc-900' : 'text-white'
                  }`}>
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>{isFa ? 'مشخصات پروژه و زمان‌بندی' : 'Project Coordinates & Schedule'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'نام و نام خانوادگی *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={isFa ? 'مثال: سهراب تهرانی' : 'e.g. Cassandra Stone'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                            : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'آدرس ایمیل *' : 'Email Address *'}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="cassandra@luxury-brand.com"
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                            : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'سازمان / برند تجاری' : 'Organization / Venture'}
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Atelier & Co"
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                            : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                        }`}
                      />
                    </div>

                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'حوزه مورد نظر' : 'Engagement Discipline'}
                      </label>
                      <select
                        value={formData.serviceTier}
                        onChange={(e) => setFormData({ ...formData, serviceTier: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 cursor-pointer ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900'
                            : 'bg-black/60 border-white/15 text-white'
                        }`}
                      >
                        <option value="SPATIAL_WEBGL">{isFa ? 'وب سه‌بعدی و کانفیگوراتور WebGL' : 'Spatial WebGL & 3D Configurator'}</option>
                        <option value="DESIGN_SYSTEM">{isFa ? 'دیزاین سیستم اختصاصی' : 'Awwwards-Tier Design System'}</option>
                        <option value="HARDWARE_COMPUTING">{isFa ? 'رایانش فیزیکی و سایبردک' : 'Physical Computing & Cyberdeck'}</option>
                        <option value="PROCEDURAL_AUDIO">{isFa ? 'اصوات سنتز شده و بازخورد هپتیک' : 'Procedural Soundscape & Haptics'}</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'بودجه تخمینی پروژه' : 'Target Capital Allocation'}
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 cursor-pointer ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900'
                            : 'bg-black/60 border-white/15 text-white'
                        }`}
                      >
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000 - $100,000">$50,000 - $100,000</option>
                        <option value="$100,000 - $250,000">$100,000 - $250,000</option>
                        <option value="$250,000+">$250,000+ {isFa ? '(قرارداد سالانه)' : '(Enterprise Retainer)'}</option>
                      </select>
                    </div>

                    <div>
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'زمان‌بندی جلسه مشاوره' : 'Preferred Consultation Slot'}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={formData.dateSlot}
                          onChange={(e) => setFormData({ ...formData, dateSlot: e.target.value })}
                          className={`flex-1 px-3 py-2 rounded-xl border text-xs ${
                            isLight ? 'bg-slate-50 border-slate-300 text-zinc-900' : 'bg-black/60 border-white/15 text-white'
                          }`}
                        />
                        <select
                          value={formData.timeSlot}
                          onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                          className={`px-2 py-2 rounded-xl border text-xs cursor-pointer ${
                            isLight ? 'bg-slate-50 border-slate-300 text-zinc-900' : 'bg-black/60 border-white/15 text-white'
                          }`}
                        >
                          <option value="10:00 GMT">10:00 GMT</option>
                          <option value="14:00 GMT">14:00 GMT</option>
                          <option value="18:00 GMT">18:00 GMT</option>
                        </select>
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className={`block mb-1 uppercase tracking-wider text-[10px] ${
                        isLight ? 'text-zinc-600' : 'text-zinc-400'
                      }`}>
                        {isFa ? 'شرح نیازمندی‌ها و مشخصات پروژه' : 'Project Overview & Specifications'}
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={isFa ? 'جزئیات، زیبایی‌شناسی مدنظر و ملزومات فنی را بیان کنید...' : 'Detail your requirements, desired aesthetic, and technological constraints...'}
                        className={`w-full px-3.5 py-2.5 rounded-xl border focus:outline-none focus:border-cyan-400 ${
                          isLight
                            ? 'bg-slate-50 border-slate-300 text-zinc-900 placeholder-zinc-400'
                            : 'bg-black/60 border-white/15 text-white placeholder-zinc-500'
                        }`}
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20"
                  >
                    <span>{isFa ? 'ارسال بریف و پرونده پروژه' : 'Transmit Project Dossier'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Global Locations & Direct Comms */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-6 rounded-3xl border space-y-6 ${
              isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-zinc-900/40 border-white/15'
            }`}>
              <h4 className={`font-['Syne'] font-bold text-lg flex items-center gap-2 ${
                isLight ? 'text-zinc-900' : 'text-white'
              }`}>
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>{isFa ? 'مختصات دفاتر استودیو' : 'Global Studio Coordinates'}</span>
              </h4>

              <div className="space-y-4 font-mono text-xs">
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className={`p-4 rounded-2xl border space-y-1 ${
                      isLight ? 'bg-slate-50 border-slate-200' : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <strong className={`text-sm font-['Syne'] ${isLight ? 'text-zinc-900' : 'text-white'}`}>{office.city}</strong>
                      <span className="text-cyan-500 text-[10px]">{office.tz}</span>
                    </div>
                    <p className={`text-[11px] ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{office.address}</p>
                    <p className={`text-[11px] pt-1 ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>{office.contact}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-3xl border font-mono text-xs space-y-2 ${
              isLight ? 'bg-cyan-50 border-cyan-300 text-cyan-950' : 'bg-cyan-950/20 border-cyan-400/30 text-zinc-300'
            }`}>
              <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-300 font-bold">
                <MessageSquare className="w-4 h-4" />
                <span>{isFa ? 'کانال مستقیم رمزنگاری شده' : 'Direct Cryptographic Channels'}</span>
              </div>
              <p className={`text-[11px] leading-relaxed ${isLight ? 'text-zinc-700' : 'text-zinc-400'}`}>
                {isFa
                  ? 'جهت استعلام‌های محرمانه با رمزنگاری PGP یا عقد توافق‌نامه عدم‌افشا (NDA) پیش از ارسال بریف، به نشانی atelier@vibe-matrix.io پیام ارسال نمایید.'
                  : 'For confidential inquiries requiring PGP encryption or private NDA agreements prior to briefing, transmit directly to atelier@vibe-matrix.io.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
