import React, { useState } from 'react';
import { useStore, WebsitePage } from '../../context/StoreContext';
import { soundFx } from '../../utils/audio';
import { CategoryNavPanel } from './CategoryNavPanel';
import {
  Sparkles,
  ShoppingBag,
  Layers,
  Music,
  Volume2,
  VolumeX,
  Compass,
  Store,
  Info,
  Mail,
  User,
  Menu,
  X,
  ChevronDown,
  Sun,
  Moon,
  Globe,
  ArrowLeftRight,
  Monitor,
  Newspaper
} from 'lucide-react';

interface WebsiteHeaderProps {
  onSwitchToShowroom: () => void;
  onOpenPresentationMode?: () => void;
  onOpenCoffeeSample?: () => void;
  onOpenPcBuilderSample?: () => void;
  onOpenWikiGameSample?: () => void;
}

export const WebsiteHeader: React.FC<WebsiteHeaderProps> = ({
  onSwitchToShowroom,
  onOpenPresentationMode,
  onOpenCoffeeSample,
  onOpenPcBuilderSample,
  onOpenWikiGameSample,
}) => {
  const {
    activePage,
    setActivePage,
    cartCount,
    setIsCartDrawerOpen,
    currency,
    setCurrency,
    theme,
    toggleTheme,
    language,
    toggleLanguage,
    direction,
    toggleDirection,
    t,
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [ambientActive, setAmbientActive] = useState(soundFx.droneActive);
  const [soundEnabled, setSoundEnabled] = useState(soundFx.enabled);
  const [showCurrencyDropdown, setShowCurrencyDropdown] = useState(false);
  const [showCategoryMegaMenu, setShowCategoryMegaMenu] = useState(false);
  const [showSamplesMenu, setShowSamplesMenu] = useState(false);

  const isRtl = direction === 'rtl';
  const isLight = theme === 'light';

  const navLinks: { id: WebsitePage; label: string; icon: React.ReactNode }[] = [
    { id: 'LANDING', label: t.studio, icon: <Compass className="w-3.5 h-3.5" /> },
    { id: 'STORE', label: t.store, icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'NEWS', label: t.news, icon: <Newspaper className="w-3.5 h-3.5" /> },
    { id: 'ABOUT', label: t.manifesto, icon: <Info className="w-3.5 h-3.5" /> },
    { id: 'CONTACT', label: t.inquiry, icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'AUTH', label: t.account, icon: <User className="w-3.5 h-3.5" /> },
  ];

  const handleNavClick = (page: WebsitePage) => {
    soundFx.playClick(650);
    setActivePage(page);
    setMobileMenuOpen(false);
    setShowCategoryMegaMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleAmbient = () => {
    const newState = soundFx.toggleAmbientDrone();
    setAmbientActive(newState);
  };

  const handleToggleFx = () => {
    const enabled = soundFx.toggle();
    setSoundEnabled(enabled);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full backdrop-blur-xl border-b transition-colors ${
        isLight
          ? 'bg-white/90 border-slate-200 text-zinc-900 shadow-sm'
          : 'bg-[#050609]/85 border-white/10 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Brand Identity & Mega Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => handleNavClick('LANDING')}
            className="flex items-center gap-2 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 via-amber-300 to-rose-400 p-[1px] flex items-center justify-center shrink-0">
              <div
                className={`w-full h-full rounded-[7px] flex items-center justify-center ${
                  isLight ? 'bg-white' : 'bg-[#07090e]'
                }`}
              >
                <Sparkles className="w-4 h-4 text-cyan-500 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <span className="font-['Syne'] font-black tracking-wider text-sm sm:text-base block leading-none">
                AURA<span className="text-cyan-400">.</span>STUDIO
              </span>
              <span className={`font-mono text-[9px] uppercase tracking-widest block mt-0.5 ${isLight ? 'text-zinc-500' : 'text-zinc-500'}`}>
                {t.brandSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Mega-Menu Button for Main Category & Sub Categories */}
          <div className="relative hidden lg:block">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setShowCategoryMegaMenu(!showCategoryMegaMenu);
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border font-mono text-xs font-semibold transition-all ${
                showCategoryMegaMenu
                  ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400 shadow-sm'
                  : isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-zinc-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>{t.mainCategories}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform ${showCategoryMegaMenu ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Desktop Mega-Menu Panel */}
            <CategoryNavPanel
              isOpen={showCategoryMegaMenu}
              onClose={() => setShowCategoryMegaMenu(false)}
              onSwitchToShowroom={onSwitchToShowroom}
            />
          </div>

          {/* Quick Mode Switcher to Catalog */}
          <button
            onClick={() => {
              soundFx.playChime(600, 0.2);
              onSwitchToShowroom();
            }}
            className={`hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[11px] transition-all ${
              isLight
                ? 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900'
                : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>{t.showroom}</span>
            <span className="bg-amber-400/20 text-amber-400 text-[9px] px-1.5 py-0.2 rounded font-bold">
              60 Live
            </span>
          </button>

          {/* Client Presentation Mode Toggle */}
          {onOpenPresentationMode && (
            <button
              onClick={() => {
                soundFx.playChime(750, 0.2);
                onOpenPresentationMode();
              }}
              className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-mono text-[11px] transition-all ${
                isLight
                  ? 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-900'
                  : 'bg-cyan-950/40 hover:bg-cyan-900/60 border-cyan-400/40 text-cyan-300'
              }`}
              title={language === 'fa' ? 'اجرای حالت پرزنتیشن تمام‌صفحه برای مشتریان' : 'Client Presentation Kiosk Mode'}
            >
              <Monitor className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language === 'fa' ? 'کیوسک پرزنتیشن' : 'Pitch Kiosk'}</span>
            </button>
          )}
        </div>

        {/* Center: Desktop Navigation Direct Links */}
        <nav
          className={`hidden md:flex items-center gap-1 p-1 rounded-full font-mono text-xs border ${
            isLight
              ? 'bg-slate-100/80 border-slate-200'
              : 'bg-white/5 border-white/10'
          }`}
        >
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all ${
                activePage === link.id
                  ? 'bg-cyan-400 text-black font-bold shadow-sm'
                  : isLight
                  ? 'text-zinc-600 hover:text-zinc-900 hover:bg-slate-200/60'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Controls: Theme, Language, Direction, Currency, Audio, Cart, Mobile Menu */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Theme Mode Toggle (White / Black) */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-xl border flex items-center justify-center transition-all ${
              isLight
                ? 'bg-amber-100/60 border-amber-300 text-amber-700 hover:bg-amber-100'
                : 'bg-white/5 border-white/10 text-amber-300 hover:bg-white/10'
            }`}
            title={isLight ? t.themeDark : t.themeLight}
          >
            {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          {/* Language Switcher (ENG / فارسی) */}
          <button
            onClick={toggleLanguage}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-mono text-xs font-bold transition-all ${
              language === 'fa'
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-zinc-700 hover:bg-slate-200'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:bg-white/10 hover:text-white'
            }`}
            title="Switch Language: English / فارسی"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'en' ? 'FA' : 'EN'}</span>
          </button>

          {/* Direction Switcher (LTR / RTL) */}
          <button
            onClick={toggleDirection}
            className={`hidden sm:flex items-center gap-1 px-2 py-1.5 rounded-xl border font-mono text-[11px] font-semibold transition-all ${
              direction === 'rtl'
                ? 'bg-indigo-500/20 border-indigo-400 text-indigo-400'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-zinc-600 hover:bg-slate-200'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title={direction === 'ltr' ? t.dirRtl : t.dirLtr}
          >
            <ArrowLeftRight className="w-3 h-3 text-indigo-400" />
            <span className="uppercase">{direction}</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick(750);
                setShowCurrencyDropdown(!showCurrencyDropdown);
              }}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border font-mono text-[11px] transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-zinc-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300'
              }`}
              title="Select Display Currency"
            >
              <span className="font-bold text-amber-400">{currency}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showCurrencyDropdown && (
              <div
                className={`absolute right-0 top-full mt-2 w-32 rounded-xl border p-1.5 shadow-2xl backdrop-blur-xl z-50 flex flex-col gap-1 font-mono text-xs ${
                  isLight
                    ? 'bg-white/95 border-slate-300 text-zinc-900 shadow-slate-900/10'
                    : 'bg-black/95 border-white/20 text-white'
                }`}
              >
                {(['USD', 'EUR', 'GBP', 'JPY', 'BTC'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => {
                      soundFx.playClick(850);
                      setCurrency(curr);
                      setShowCurrencyDropdown(false);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg text-left transition-colors flex items-center justify-between ${
                      currency === curr
                        ? 'bg-amber-400 text-black font-bold'
                        : isLight
                        ? 'text-zinc-700 hover:bg-slate-100'
                        : 'text-zinc-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span>{curr}</span>
                    <span className="opacity-70 text-[10px]">
                      {curr === 'USD' && '$'}
                      {curr === 'EUR' && '€'}
                      {curr === 'GBP' && '£'}
                      {curr === 'JPY' && '¥'}
                      {curr === 'BTC' && '₿'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ambient Music Button */}
          <button
            onClick={handleToggleAmbient}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-mono text-[11px] transition-all ${
              ambientActive
                ? 'bg-cyan-950/60 border-cyan-400/60 text-cyan-300 shadow-sm shadow-cyan-500/20'
                : isLight
                ? 'bg-slate-100 border-slate-300 text-zinc-600 hover:text-zinc-900'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            title="Toggle Generative Ambient Sound"
          >
            <Music className={`w-3.5 h-3.5 ${ambientActive ? 'animate-pulse text-cyan-400' : ''}`} />
            <span className="hidden lg:inline">{ambientActive ? t.musicOn : t.musicOff}</span>
          </button>

          {/* Samples Showcase Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                soundFx.playClick(650);
                setShowSamplesMenu(!showSamplesMenu);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-500/40 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-mono text-xs font-bold transition-all shadow-sm"
              title="Switch Between Sample Web Apps"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">{language === 'fa' ? 'نمونه‌سایت‌ها' : 'Sample Sites'}</span>
              <ChevronDown className="w-3 h-3 text-rose-400" />
            </button>

            {showSamplesMenu && (
              <div
                dir={direction}
                className={`absolute ${isRtl ? 'left-0' : 'right-0'} top-full mt-2 w-56 rounded-2xl border p-2 shadow-2xl z-50 animate-in fade-in duration-150 ${
                  isLight ? 'bg-white border-slate-200 text-zinc-900' : 'bg-zinc-950 border-white/20 text-white'
                }`}
              >
                <button
                  onClick={() => {
                    soundFx.playChime(750, 0.2);
                    setShowSamplesMenu(false);
                    onOpenCoffeeSample?.();
                  }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-amber-500/10 text-xs font-bold flex items-center justify-between text-amber-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>☕</span>
                    <span>{language === 'fa' ? 'لندینگ ۱۲۳کافی (اسکرول)' : '123 Coffee Landing'}</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">SCROLL</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playChime(780, 0.2);
                    setShowSamplesMenu(false);
                    onOpenPcBuilderSample?.();
                  }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-blue-500/10 text-xs font-bold flex items-center justify-between text-blue-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>🖥️</span>
                    <span>{language === 'fa' ? 'اسمبلر کامپیوتر (۳ بعدی)' : 'PC Builder Rig'}</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">3D BUILD</span>
                </button>

                <button
                  onClick={() => {
                    soundFx.playChime(820, 0.2);
                    setShowSamplesMenu(false);
                    onOpenWikiGameSample?.();
                  }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-rose-500/10 text-xs font-bold flex items-center justify-between text-rose-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>🎮</span>
                    <span>{language === 'fa' ? 'ویکی‌گیم (دایره‌المعارف)' : 'WikiGame Portal'}</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">WIKI</span>
                </button>

                <div className="border-t border-white/10 my-1" />

                <button
                  onClick={() => {
                    soundFx.playClick(600);
                    setShowSamplesMenu(false);
                    onSwitchToShowroom();
                  }}
                  className="w-full text-right p-2.5 rounded-xl hover:bg-cyan-500/10 text-xs font-bold flex items-center justify-between text-cyan-400 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>🏛️</span>
                    <span>{language === 'fa' ? 'نمایشگاه ۶۰ قطعه' : '60 Showroom'}</span>
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">CATALOG</span>
                </button>
              </div>
            )}
          </div>

          {/* Cart Trigger with Bouncy Badge */}
          <button
            onClick={() => {
              soundFx.playChime(800, 0.15);
              setIsCartDrawerOpen(true);
            }}
            className="relative flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/40 text-emerald-300 font-mono text-xs font-bold transition-all shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">{t.cart}</span>
            {cartCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-400 text-black text-[10px] font-black flex items-center justify-center shadow-md animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => {
              soundFx.playClick(600);
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className={`md:hidden p-2 rounded-xl border flex items-center justify-center transition-colors ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-zinc-700 hover:text-zinc-900'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Comprehensive Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 py-5 space-y-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200 ${
            isLight
              ? 'bg-white/98 border-slate-200 text-zinc-900'
              : 'bg-[#07090e]/98 border-white/10 text-white'
          }`}
        >
          {/* Quick Settings Bar in Mobile Menu */}
          <div className="grid grid-cols-3 gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-white/10">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="py-2 px-2.5 rounded-lg border text-center flex flex-col items-center justify-center gap-1 font-mono text-[10px] font-bold bg-white/5 border-white/10"
            >
              {isLight ? <Moon className="w-4 h-4 text-amber-500" /> : <Sun className="w-4 h-4 text-amber-400" />}
              <span>{isLight ? t.darkMode : t.lightMode}</span>
            </button>

            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="py-2 px-2.5 rounded-lg border text-center flex flex-col items-center justify-center gap-1 font-mono text-[10px] font-bold bg-white/5 border-white/10 text-cyan-400"
            >
              <Globe className="w-4 h-4 text-cyan-400" />
              <span>{language === 'en' ? 'فارسی' : 'English'}</span>
            </button>

            {/* Direction Toggle Button */}
            <button
              onClick={toggleDirection}
              className="py-2 px-2.5 rounded-lg border text-center flex flex-col items-center justify-center gap-1 font-mono text-[10px] font-bold bg-white/5 border-white/10 text-indigo-400"
            >
              <ArrowLeftRight className="w-4 h-4 text-indigo-400" />
              <span>{direction.toUpperCase()}</span>
            </button>
          </div>

          {/* Primary Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`p-2.5 rounded-xl flex items-center gap-2 font-mono text-xs transition-all ${
                  activePage === link.id
                    ? 'bg-cyan-400 text-black font-bold shadow-sm'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800'
                    : 'bg-white/5 text-zinc-300 hover:bg-white/10'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Recreated Categories & Sub-Categories Accordion */}
          <CategoryNavPanel
            isOpen={true}
            onClose={() => setMobileMenuOpen(false)}
            onSwitchToShowroom={onSwitchToShowroom}
            isMobile={true}
          />

          {/* Jump to Showroom Button */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onSwitchToShowroom();
            }}
            className="w-full py-3 rounded-xl bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 flex items-center justify-center gap-2 font-mono text-xs font-bold"
          >
            <Layers className="w-4 h-4" />
            <span>{t.exploreShowroom}</span>
          </button>

          {/* Client Presentation Kiosk Button */}
          {onOpenPresentationMode && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPresentationMode();
              }}
              className="w-full py-3 rounded-xl bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-400/40 text-cyan-300 flex items-center justify-center gap-2 font-mono text-xs font-bold"
            >
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>{language === 'fa' ? 'اجرای حالت پرزنتیشن کیوسک' : 'Launch Client Presentation Kiosk'}</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
