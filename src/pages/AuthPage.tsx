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
  const { setActivePage, orderHistory, formatPrice } = useStore();
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
    <div className="w-full min-h-screen bg-[#050609] text-zinc-100 font-['Plus_Jakarta_Sans'] pb-28 flex flex-col justify-center">
      <div className={`w-full mx-auto px-4 sm:px-6 py-16 transition-all duration-300 ${isAuthenticated ? 'max-w-4xl' : 'max-w-md'}`}>
        {/* Brand Crest */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 border border-cyan-400/40 flex items-center justify-center text-cyan-300 mx-auto mb-4 shadow-xl shadow-cyan-500/10">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="font-['Syne'] font-black text-2xl sm:text-3xl text-white tracking-tight">
            {isAuthenticated ? 'Client Command Center' : 'AURA Studio Gateway'}
          </h2>
          <p className="font-mono text-xs text-zinc-400 mt-1">
            {isAuthenticated
              ? 'Real-time order history, cryptographic license keys & active repository deployments.'
              : 'Access client licenses, active repo mirrors & CAD models.'}
          </p>
        </div>

        {/* Tab Controls: Login vs Register (only when logged out) */}
        {!isAuthenticated && (
          <div className="flex p-1 rounded-xl bg-zinc-900 border border-white/10 mb-6 font-mono text-xs">
            <button
              onClick={() => handleTabChange('LOGIN')}
              className={`flex-1 py-2.5 rounded-lg transition-all font-bold ${
                tab === 'LOGIN' ? 'bg-cyan-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Terminal Sign In
            </button>
            <button
              onClick={() => handleTabChange('REGISTER')}
              className={`flex-1 py-2.5 rounded-lg transition-all font-bold ${
                tab === 'REGISTER' ? 'bg-cyan-400 text-black shadow-md' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Create Credentials
            </button>
          </div>
        )}

        {/* Auth / Dashboard Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/60 border border-white/15 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {isAuthenticated ? (
            <div className="space-y-6">
              {/* Member Status Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/60 border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-400/20 border border-cyan-400 text-cyan-300 flex items-center justify-center font-bold font-mono">
                    JS
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{formData.name}</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-[10px] font-mono text-emerald-400 font-bold">
                        VERIFIED CLIENT
                      </span>
                    </div>
                    <span className="font-mono text-xs text-zinc-400">{formData.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActivePage('STORE')}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-mono text-xs font-bold transition-colors"
                  >
                    Go To Store
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playClick(400);
                      setIsAuthenticated(false);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-mono text-xs transition-colors"
                  >
                    Disconnect
                  </button>
                </div>
              </div>

              {/* Sub-tabs for Dashboard */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 font-mono text-xs">
                <button
                  onClick={() => setDashboardTab('ORDERS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
                    dashboardTab === 'ORDERS' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Order Ledger ({orderHistory.length})</span>
                </button>

                <button
                  onClick={() => setDashboardTab('KEYS')}
                  className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 font-bold ${
                    dashboardTab === 'KEYS' ? 'bg-white/15 text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>License Keys</span>
                </button>
              </div>

              {/* TAB 1: Order History Ledger */}
              {dashboardTab === 'ORDERS' && (
                <div className="space-y-4 font-mono text-xs">
                  {orderHistory.length === 0 ? (
                    <div className="py-8 text-center text-zinc-500">No orders recorded yet.</div>
                  ) : (
                    orderHistory.map((order) => (
                      <div
                        key={order.orderId}
                        className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-3"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2 text-[11px]">
                          <div className="flex items-center gap-2">
                            <span className="text-cyan-400 font-bold">{order.orderId}</span>
                            <span className="text-zinc-500">&bull; {order.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-emerald-400 font-bold">{formatPrice(order.total)}</span>
                            <span className="px-2 py-0.5 rounded bg-white/5 text-zinc-300 text-[10px]">
                              {order.paymentMethod}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between text-zinc-300">
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-500">{item.quantity}x</span>
                                <span className="text-white font-semibold">{item.product.name}</span>
                                <span className="text-zinc-400 text-[10px]">
                                  ({item.selectedVariant.name})
                                </span>
                              </div>
                              <span className="font-bold text-emerald-400">
                                {formatPrice(
                                  (item.product.price + item.selectedVariant.priceDelta) * item.quantity
                                )}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* License keys banner if any */}
                        {order.licenseKeys && order.licenseKeys.length > 0 && (
                          <div className="p-2.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-cyan-300">
                              <KeyRound className="w-3.5 h-3.5" />
                              <span className="text-[11px] font-bold">KEY: {order.licenseKeys[0]}</span>
                            </div>
                            <button
                              onClick={() => handleCopyKey(order.licenseKeys![0])}
                              className="px-2 py-1 rounded bg-cyan-400 hover:bg-cyan-300 text-black text-[10px] font-bold"
                            >
                              {copiedKey === order.licenseKeys[0] ? 'Copied!' : 'Copy Key'}
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 2: License Keys Direct Vault */}
              {dashboardTab === 'KEYS' && (
                <div className="space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-400/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white font-bold">
                        <Sparkles className="w-4 h-4 text-cyan-400" />
                        <span>Vibe Matrix WebGL Design System — Pro Studio License</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-400 text-black text-[10px] font-bold">
                        ACTIVE
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-black/60 p-2.5 rounded-xl border border-white/10">
                      <code className="text-cyan-300 font-bold">VIBE-PRO-98X2-K91A</code>
                      <button
                        onClick={() => handleCopyKey('VIBE-PRO-98X2-K91A')}
                        className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white text-[11px] flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{copiedKey === 'VIBE-PRO-98X2-K91A' ? 'Copied!' : 'Copy'}</span>
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
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              <div>
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Email Coordinates
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                  Passphrase
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {tab === 'REGISTER' && (
                <div>
                  <label className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block mb-1">
                    Account Classification
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 cursor-pointer"
                  >
                    <option value="STUDIO_DEV">Creative Engineer / Studio Dev</option>
                    <option value="CLIENT_ENTERPRISE">Enterprise Client &amp; Brand</option>
                    <option value="INDIE_HACKER">Indie Creative Technologist</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:from-cyan-300 hover:to-emerald-300 text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
              >
                <span>{tab === 'LOGIN' ? 'Authenticate Access' : 'Register Developer Seat'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Biometric Quick Authentication Button */}
              <div className="pt-4 border-t border-white/10 text-center">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block mb-3">
                  OR VERIFY VIA HARDWARE BIOMETRICS
                </span>
                <button
                  type="button"
                  onClick={triggerBiometric}
                  disabled={biometricScanning}
                  className={`w-full py-3 rounded-xl border font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    biometricScanning
                      ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300 animate-pulse'
                      : 'bg-white/5 hover:bg-white/10 border-white/15 text-zinc-300'
                  }`}
                >
                  <Fingerprint className={`w-4 h-4 text-cyan-400 ${biometricScanning ? 'animate-spin' : ''}`} />
                  <span>
                    {biometricScanning
                      ? 'Scanning Touch ID / Security Key...'
                      : 'Biometric Passkey Authentication'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Security Assurance */}
        <div className="mt-6 flex items-center justify-center gap-2 text-zinc-500 font-mono text-[11px]">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          <span>FIDO2 WebAuthn &bull; Hardware Secure Enclave Encrypted</span>
        </div>
      </div>
    </div>
  );
};
