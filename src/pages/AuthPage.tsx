import React, { useState } from 'react';
import { useStore, CustomerOrder } from '../context/StoreContext';
import { soundFx } from '../utils/audio';
import {
  Lock,
  User,
  Fingerprint,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Shield,
  KeyRound,
  Eye,
  EyeOff,
  Copy,
  Download,
  Package,
  Clock,
  ExternalLink
} from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { setActivePage, orderHistory, formatPrice, theme, language, direction, t } = useStore();
  const [tab, setTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');
  const [showPassword, setShowPassword] = useState(false);
  const [biometricScanning, setBiometricScanning] = useState(false);
  const [biometricSuccess, setBiometricSuccess] = useState(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [dashboardTab, setDashboardTab] = useState<'ORDERS' | 'KEYS' | 'PROFILE'>('ORDERS');
  const [formData, setFormData] = useState({
    name: 'Julian Sterling',
    email: 'julian@vibe-matrix.io',
    password: '••••••••••••',
    role: 'STUDIO_DEV',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const isLight = theme === 'light';
  const isFa = language === 'fa';
  const isRtl = direction === 'rtl';

  const handleTabChange = (newTab: 'LOGIN' | 'REGISTER') => {
    soundFx.playClick(600);
    setTab(newTab);
    setBiometricSuccess(false);
    setIsAuthenticated(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(850, 0.25);
    setIsAuthenticated(true);
  };

  const triggerBiometric = () => {
    soundFx.playCyberBlip();
    setBiometricScanning(true);
    setBiometricSuccess(false);

    setTimeout(() => {
      soundFx.playChime(920, 0.3);
      setBiometricScanning(false);
      setBiometricSuccess(true);
      setIsAuthenticated(true);
    }, 1800);
  };

  const handleCopyKey = (key: string) => {
    soundFx.playClick(900);
    navigator.clipboard?.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div
      dir={direction}
      className={`w-full min-h-screen font-['Plus_Jakarta_Sans'] pb-28 flex flex-col justify-center transition-colors ${
        isLight ? 'bg-[#f8fafc] text-zinc-900' : 'bg-[#050609] text-zinc-100'
      }`}
    >
      <div className={`w-full mx-auto px-4 sm:px-6 py-16 transition-all duration-300 ${isAuthenticated ? 'max-w-4xl' : 'max-w-md'}`}>
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-xl shadow-cyan-500/10">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className={`font-['Syne'] font-black text-2xl sm:text-3xl tracking-tight ${
            isLight ? 'text-zinc-900' : 'text-white'
          }`}>
            {isAuthenticated
              ? (isFa ? 'مرکز فرماندهی کاربر' : 'Client Command Center')
              : (isFa ? 'درگاه احراز هویت استودیو آئورا' : 'AURA Studio Gateway')}
          </h2>
          <p className={`font-mono text-xs mt-1 ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>
            {isAuthenticated
              ? (isFa ? 'تاریخچه لحظه‌ای سفارش‌ها، کلیدهای رمزنگاری و مخازن فعال کدهای سورس.' : 'Real-time order history, cryptographic license keys & active repository deployments.')
              : (isFa ? 'دسترسی به لایسنس‌ها، کدهای اختصاصی و مدل‌های سه‌بعدی CAD.' : 'Access client licenses, active repo mirrors & CAD models.')}
          </p>
        </div>

        {/* Tab Controls: Login vs Register (only when logged out) */}
        {!isAuthenticated && (
          <div className={`flex p-1 rounded-xl border mb-6 font-mono text-xs ${
            isLight ? 'bg-slate-200 border-slate-300' : 'bg-zinc-900 border-white/10'
          }`}>
            <button
              onClick={() => handleTabChange('LOGIN')}
              className={`flex-1 py-2.5 rounded-lg transition-all font-bold ${
                tab === 'LOGIN'
                  ? 'bg-cyan-400 text-black shadow-md'
                  : isLight
                  ? 'text-zinc-600 hover:text-zinc-900'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isFa ? 'ورود به حساب کاربری' : 'Terminal Sign In'}
            </button>
            <button
              onClick={() => handleTabChange('REGISTER')}
              className={`flex-1 py-2.5 rounded-lg transition-all font-bold ${
                tab === 'REGISTER'
                  ? 'bg-cyan-400 text-black shadow-md'
                  : isLight
                  ? 'text-zinc-600 hover:text-zinc-900'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {isFa ? 'ثبت‌نام و عضویت جدید' : 'Create Credentials'}
            </button>
          </div>
        )}

        {/* Auth / Dashboard Card */}
        <div className={`p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-2xl relative overflow-hidden ${
          isLight
            ? 'bg-white border-slate-200 shadow-slate-900/5'
            : 'bg-zinc-900/60 border-white/15'
        }`}>
          {isAuthenticated ? (
            <div className="space-y-6">
              {/* Member Status Bar */}
              <div className={`flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl border ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/60 border-white/10'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400 text-cyan-500 flex items-center justify-center font-bold font-mono">
                    JS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold text-sm ${isLight ? 'text-zinc-900' : 'text-white'}`}>{formData.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/40 text-[10px] font-mono text-emerald-500 font-bold">
                        {isFa ? 'کاربر تاییدشده' : 'VERIFIED CLIENT'}
                      </span>
                    </div>
                    <span className={`font-mono text-xs ${isLight ? 'text-zinc-500' : 'text-zinc-400'}`}>{formData.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePage('STORE')}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-colors"
                  >
                    {t.enterStore}
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick(400);
                      setIsAuthenticated(false);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs transition-colors border ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 text-zinc-700 border-slate-300'
                        : 'bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white border-white/10'
                    }`}
                  >
                    {isFa ? 'خروج از حساب' : 'Disconnect'}
                  </button>
                </div>
              </div>

              {/* Sub-tabs for Dashboard */}
              <div className={`flex items-center gap-2 border-b pb-3 font-mono text-xs ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <button
                  onClick={() => setDashboardTab('ORDERS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
                    dashboardTab === 'ORDERS'
                      ? isLight ? 'bg-slate-200 text-zinc-900' : 'bg-white/15 text-white'
                      : isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>{isFa ? `دفترچه سفارش‌ها (${orderHistory.length})` : `Order Ledger (${orderHistory.length})`}</span>
                </button>

                <button
                  onClick={() => setDashboardTab('KEYS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
                    dashboardTab === 'KEYS'
                      ? isLight ? 'bg-slate-200 text-zinc-900' : 'bg-white/15 text-white'
                      : isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>{isFa ? 'کلیدهای لایسنس' : 'License Keys'}</span>
                </button>
              </div>

              {/* TAB 1: Order History Ledger */}
              {dashboardTab === 'ORDERS' && (
                <div className="space-y-4 font-mono text-xs">
                  {orderHistory.length === 0 ? (
                    <div className="py-8 text-center text-zinc-400">
                      {isFa ? 'هنوز سفارشی ثبت نشده است.' : 'No orders recorded yet.'}
                    </div>
                  ) : (
                    orderHistory.map((order) => (
                      <div
                        key={order.orderId}
                        className={`p-4 rounded-2xl border space-y-3 ${
                          isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
                          <span className="font-bold text-cyan-500">#{order.orderId}</span>
                          <span className={isLight ? 'text-zinc-500' : 'text-zinc-400'}>{order.date}</span>
                          <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 font-bold">
                            {order.status}
                          </span>
                        </div>

                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center text-xs">
                              <span className={isLight ? 'text-zinc-800' : 'text-zinc-300'}>
                                {item.quantity}x {item.product.name}
                              </span>
                              <span className="font-bold text-emerald-500">
                                {formatPrice(item.product.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className={`pt-2 border-t flex justify-between font-bold text-sm ${
                          isLight ? 'border-slate-200 text-zinc-900' : 'border-white/10 text-white'
                        }`}>
                          <span>{t.total}:</span>
                          <span className="text-cyan-500">{formatPrice(order.total)}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: License Keys */}
              {dashboardTab === 'KEYS' && (
                <div className="space-y-4 font-mono text-xs">
                  <div className={`p-4 rounded-2xl border space-y-2 ${
                    isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold ${isLight ? 'text-zinc-900' : 'text-white'}`}>
                        Spatial WebGL Shader Core v4.2
                      </span>
                      <span className="text-emerald-500 font-bold">
                        {isFa ? 'فعال و معتبر' : 'ACTIVE'}
                      </span>
                    </div>
                    <div className={`flex items-center justify-between p-2.5 rounded-xl border ${
                      isLight ? 'bg-white border-slate-200' : 'bg-black/60 border-white/10'
                    }`}>
                      <code className="text-cyan-500 font-bold">VIBE-PRO-98X2-K91A</code>
                      <button
                        onClick={() => handleCopyKey('VIBE-PRO-98X2-K91A')}
                        className={`px-2.5 py-1 rounded text-[11px] flex items-center gap-1 border ${
                          isLight
                            ? 'bg-slate-100 hover:bg-slate-200 text-zinc-800 border-slate-300'
                            : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                        }`}
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === 'VIBE-PRO-98X2-K91A' ? (isFa ? 'کپی شد!' : 'Copied!') : (isFa ? 'کپی' : 'Copy')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {tab === 'REGISTER' && (
                <div>
                  <label className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'نام و نام خانوادگی' : 'Full Name'}
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs border focus:outline-none focus:border-cyan-400 ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                </div>
              )}

              <div>
                <label className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {isFa ? 'نشانی ایمیل' : 'Email Coordinates'}
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs border focus:outline-none focus:border-cyan-400 ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-zinc-900'
                      : 'bg-black/60 border-white/15 text-white'
                  }`}
                />
              </div>

              <div>
                <label className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                  isLight ? 'text-zinc-600' : 'text-zinc-400'
                }`}>
                  {isFa ? 'رمز عبور' : 'Passphrase'}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full py-2.5 rounded-xl font-mono text-xs border focus:outline-none focus:border-cyan-400 ${
                      isRtl ? 'pr-3.5 pl-10' : 'pl-3.5 pr-10'
                    } ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute top-1/2 -translate-y-1/2 text-zinc-400 hover:text-cyan-500 ${
                      isRtl ? 'left-3' : 'right-3'
                    }`}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {tab === 'REGISTER' && (
                <div>
                  <label className={`font-mono text-[10px] uppercase tracking-wider block mb-1 ${
                    isLight ? 'text-zinc-600' : 'text-zinc-400'
                  }`}>
                    {isFa ? 'نوع حساب کاربری' : 'Account Classification'}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs border focus:outline-none focus:border-cyan-400 cursor-pointer ${
                      isLight
                        ? 'bg-slate-50 border-slate-300 text-zinc-900'
                        : 'bg-black/60 border-white/15 text-white'
                    }`}
                  >
                    <option value="STUDIO_DEV">{isFa ? 'مهندس خلاق / توسعه‌دهنده وب' : 'Creative Engineer / Studio Dev'}</option>
                    <option value="CLIENT_ENTERPRISE">{isFa ? 'سازمان و برند تجاری' : 'Enterprise Client & Brand'}</option>
                    <option value="INDIE_HACKER">{isFa ? 'طراح و فناور مستقل' : 'Indie Creative Technologist'}</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>{tab === 'LOGIN' ? (isFa ? 'تایید و ورود به پنل' : 'Authenticate Access') : (isFa ? 'ثبت حساب توسعه‌دهنده' : 'Register Developer Seat')}</span>
                {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>

              {/* Biometric Quick Authentication Button */}
              <div className={`pt-4 border-t text-center ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
                <span className={`font-mono text-[10px] uppercase tracking-widest block mb-3 ${
                  isLight ? 'text-zinc-500' : 'text-zinc-500'
                }`}>
                  {isFa ? 'یا ورود از طریق بیومتریک سخت‌افزاری' : 'OR VERIFY VIA HARDWARE BIOMETRICS'}
                </span>
                <button
                  type="button"
                  onClick={triggerBiometric}
                  disabled={biometricScanning}
                  className={`w-full py-3 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    biometricScanning
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-500 animate-pulse'
                      : isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-zinc-800'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300'
                  }`}
                >
                  <Fingerprint className={`w-4 h-4 text-cyan-400 ${biometricScanning ? 'animate-spin' : ''}`} />
                  <span>
                    {biometricScanning
                      ? (isFa ? 'در حال اسکن تاچ‌آیدی / کلید امنیتی...' : 'Scanning Touch ID / Security Key...')
                      : (isFa ? 'ورود با کلید بیومتریک Passkey' : 'Biometric Passkey Authentication')}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Assurance */}
        <div className="mt-6 flex items-center justify-center gap-2 text-zinc-400 font-mono text-[11px]">
          <Shield className="w-3.5 h-3.5 text-emerald-500" />
          <span>{isFa ? 'رمزنگاری FIDO2 WebAuthn • امنیت سخت‌افزاری Secure Enclave' : 'FIDO2 WebAuthn • Hardware Secure Enclave Encrypted'}</span>
        </div>
      </div>
    </div>
  );
};
