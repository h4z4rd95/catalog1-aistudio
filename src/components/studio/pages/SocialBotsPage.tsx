import React, { useState } from 'react';
import MascotFigure from '../common/MascotFigure';
import { soundFx } from '../../../utils/audio';
import {
  Cpu,
  Bot,
  MessageSquare,
  Sparkles,
  Send,
  CheckCircle2,
  Zap,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Sliders,
  DollarSign
} from 'lucide-react';
import { StudioPackage } from '../../../content/site';

interface SocialBotsPageProps {
  onBackToHome: () => void;
  onAddToCart: (pkg: StudioPackage, e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function SocialBotsPage({ onBackToHome, onAddToCart }: SocialBotsPageProps) {
  const [platform, setPlatform] = useState<'TELEGRAM' | 'INSTAGRAM' | 'BALE' | 'EITAA'>('TELEGRAM');
  const [aiEngine, setAiEngine] = useState<'GEMINI' | 'LOCAL_LLM' | 'RULE_BASED'>('GEMINI');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'USER' | 'BOT'; text: string }>>([
    { sender: 'BOT', text: 'سلام! ربات هوشمند ۱۲۳سرویس فعال است. چطور می‌توانم در استعلام قیمت و ثبت سفارش کمکتان کنم؟' },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    soundFx.playClick(800);
    const userMsg = inputText.trim();
    setChatMessages((prev) => [...prev, { sender: 'USER', text: userMsg }]);
    setInputText('');

    // Simulated Bot AI Response
    setTimeout(() => {
      soundFx.playChime(750, 0.15);
      let reply = 'درخواست شما پردازش شد. فاکتور سفارش آماده و در وب‌هوک ثبت گردید.';
      if (userMsg.includes('قیمت') || userMsg.includes('چند')) {
        reply = 'پکیج پایه ربات از ۴۲ میلیون تومان است. شامل اتصال به پایگاه داده و پنل ادمین وب.';
      } else if (userMsg.includes('بله') || userMsg.includes('ایتا')) {
        reply = 'بله! ربات‌های ۱۲۳سرویس دارای سورس بهینه‌شده برای پیام‌رسان‌های بله و ایتا بدون نیاز به سرور خارجی هستند.';
      }
      setChatMessages((prev) => [...prev, { sender: 'BOT', text: reply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white font-['Plus_Jakarta_Sans'] pb-24">
      {/* Top Breadcrumb & Navigation */}
      <div className="border-b border-[#202027] bg-[#111116]/80 backdrop-blur-xl px-4 sm:px-8 py-4 flex items-center justify-between sticky top-16 z-30">
        <button
          onClick={onBackToHome}
          className="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-white transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
          <span>بازگشت به صفحه اصلی استودیو</span>
        </button>

        <span className="font-mono text-xs text-zinc-400">
          TEMPLATE ARCHITECTURE // SOCIAL BOTS SUITE
        </span>
      </div>

      {/* Narrative Mascot Header Section */}
      <section className="relative py-16 px-4 sm:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-[#202027]">
        <div className="lg:col-span-8 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 font-mono text-xs">
            <Bot className="w-3.5 h-3.5 text-cyan-400" />
            <span>BESPOKE SOCIAL BOTS SERVICE // ساخت ربات‌های شبکه‌های اجتماعی</span>
          </div>

          <h1 className="font-['Lalezar'] text-4xl sm:text-6xl text-white leading-tight">
            ربات‌های هوشمند با موتور ایجنت اختصاصی
            <span className="block text-2xl sm:text-3xl text-cyan-400 font-['Vazirmatn'] font-black mt-2">
              اتصال همزمان به تلگرام، اینستاگرام، بله و دیتابیس بدون قطعی
            </span>
          </h1>

          <p className="font-['Vazirmatn'] text-sm sm:text-base text-zinc-300 leading-relaxed font-light max-w-2xl">
            ما ربات‌های شبکه‌های اجتماعی را بر پایه استانداردهای انترپرایز و با استفاده از هوش مصنوعی فارسی توسعه می‌دهیم. بدون محدودیت پلتفرم، با وب‌هوک‌های امن و پنل مدیریت کامل.
          </p>
        </div>

        {/* Narrative Mascot */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center">
          <div className="p-8 rounded-3xl bg-[#111116] border border-[#202027] shadow-2xl flex flex-col items-center text-center space-y-3">
            <MascotFigure
              size="lg"
              showSpeechBubble={true}
              speechText="من معمار ساخت ربات شما هستم!"
            />
            <span className="font-mono text-xs text-[#B8FF3D] font-bold">
              AGENT 123 // BOT CHIEF ARCHITECT
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Live Bot Flow Simulator */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#202027] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400 font-bold uppercase">
              <Sliders className="w-4 h-4 text-cyan-400" />
              <span>INTERACTIVE BOT CONFIGURATOR &amp; LIVE DEMO</span>
            </div>
            <h2 className="font-['Lalezar'] text-3xl sm:text-4xl text-white mt-1">
              شبیه‌ساز زنده ربات و معماری سفارشی
            </h2>
          </div>
          <span className="font-mono text-xs text-zinc-500">
            TEST DRIVE WITH MOCK AI AGENT
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Controls */}
          <div className="lg:col-span-6 space-y-6 bg-[#111116] p-6 sm:p-8 rounded-3xl border border-[#202027]">
            {/* Step 1: Platform Selection */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-zinc-300 font-bold uppercase block">
                ۱. پلتفرم هدف ربات را انتخاب کنید:
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'TELEGRAM', label: 'تلگرام (Telegram Bot API)' },
                  { id: 'INSTAGRAM', label: 'دایرکت هوشمند اینستاگرام' },
                  { id: 'BALE', label: 'پیام‌رسان بله (API رسمی)' },
                  { id: 'EITAA', label: 'پیام‌رسان ایتا' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      soundFx.playClick(700);
                      setPlatform(p.id as any);
                    }}
                    className={`p-3 rounded-xl border text-xs font-mono font-bold transition-all text-right ${
                      platform === p.id
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-[#17171D] border-[#202027] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: AI Engine Selection */}
            <div className="space-y-3">
              <label className="font-mono text-xs text-zinc-300 font-bold uppercase block">
                ۲. موتور پردازش هوش مصنوعی:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'GEMINI', label: 'Google Gemini Pro' },
                  { id: 'LOCAL_LLM', label: 'مدل بومی فارسی' },
                  { id: 'RULE_BASED', label: 'الگوریتم منطقی' },
                ].map((eng) => (
                  <button
                    key={eng.id}
                    onClick={() => {
                      soundFx.playClick(750);
                      setAiEngine(eng.id as any);
                    }}
                    className={`p-2.5 rounded-xl border text-[11px] font-mono font-bold transition-all text-center ${
                      aiEngine === eng.id
                        ? 'bg-violet-500/20 border-violet-400 text-violet-300'
                        : 'bg-[#17171D] border-[#202027] text-zinc-400 hover:text-white'
                    }`}
                  >
                    {eng.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Architecture Highlights */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/5 space-y-2 text-xs font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">DATABASE INTEGRATION:</span>
                <span className="text-cyan-400 font-bold">PostgreSQL / MongoDB Sync</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">PAYMENT GATEWAY:</span>
                <span className="text-[#B8FF3D] font-bold">ZarinPal / IDPay Webhooks</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">SERVER HOSTING:</span>
                <span className="text-violet-400 font-bold">Dedicated Node.js Engine</span>
              </div>
            </div>

            {/* Purchase Direct */}
            <button
              onClick={(e) => {
                onAddToCart(
                  {
                    id: 'pkg-social-ai-bot',
                    sku: 'PKG-BOT-03',
                    title: 'پکیج ربات هوشمند چندمنظوره (OmniChannel AI Agent)',
                    category: 'هوش مصنوعی و ربات',
                    priceToman: '۴۲,۰۰۰,۰۰۰ تومان',
                    priceUsd: 720,
                    summary: 'ربات فروشنده و پشتیبان ۲۴ ساعته برای تلگرام و اینستاگرام با درک زبان فارسی.',
                    features: ['اتصال به پایگاه داده', 'پردازش هوشمند زبان طبیعی', 'پنل ادمین تحت وب', 'درگاه پرداخت مستقیم'],
                    timeline: '۱۵ روز کاری',
                    turnkeyGuaranteed: true,
                  },
                  e
                );
              }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-400 hover:opacity-95 text-black font-['Lalezar'] text-lg font-bold shadow-xl shadow-cyan-500/20 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5 text-black" />
              <span>سفارش فوری ساخت این ربات (۴۲ میلیون تومان)</span>
            </button>
          </div>

          {/* Right Column: Live Mobile Chat Preview Simulator */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-sm rounded-[36px] bg-[#0c0d12] border-4 border-[#202027] shadow-2xl p-4 flex flex-col h-[540px] justify-between">
              {/* Phone Top Notch */}
              <div className="flex justify-between items-center px-4 py-2 border-b border-[#202027] font-mono text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#B8FF3D]" />
                  <span className="font-bold text-white">123_BOT // {platform}</span>
                </div>
                <span className="text-[9px] bg-cyan-950 px-2 py-0.5 rounded text-cyan-300">ONLINE</span>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3 font-['Vazirmatn'] text-xs">
                {chatMessages.map((msg, mIdx) => (
                  <div
                    key={mIdx}
                    className={`flex ${msg.sender === 'USER' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl leading-relaxed ${
                        msg.sender === 'USER'
                          ? 'bg-cyan-500 text-black font-medium rounded-br-none'
                          : 'bg-[#17171D] text-zinc-200 border border-[#202027] rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input Bar */}
              <div className="pt-2 border-t border-[#202027] flex items-center gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="پیام خود را بنویسید (مثلاً: قیمت پکیج چنده؟)..."
                  className="flex-1 bg-[#111116] border border-[#202027] rounded-xl px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-cyan-400 font-['Vazirmatn']"
                />
                <button
                  onClick={handleSendMessage}
                  className="w-9 h-9 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
