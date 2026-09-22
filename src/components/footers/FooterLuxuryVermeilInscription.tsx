import React, { useState, useRef, useEffect } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Crown, Sparkles, Send, Check, Mail, Compass, Star } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Footer_V03_LuxuryVermeilInscription',
  name: 'Haute Couture Vermeil Inscription & Salon Privé Ledger',
  category: 'Footer',
  batch: 'Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics Elements',
  techStack: ['Next.js / React', 'Cinzel Roman Serif', 'Liquid Vermeil Gold Foil', 'Stardust Particles'],
  aestheticVibe: 'Luxury Minimalism & Editorial / Haute Couture',
  interactionBlueprint: 'Roman serif typography paired with liquid gold foil specular highlights; interactive private salon inquiry submission triggers resonant ceremonial chimes and gold dust particle diffusion.',
  description: 'An immaculate luxury atelier footer featuring Roman serif display typography, Florentine gold leaf foil reflections, salon ledger directories, and an exclusive private invitation ledger.',
  tags: ['Luxury Editorial', 'Cinzel Typography', 'Gold Foil', 'Salon Privé', 'Haute Couture'],
  codeSnippet: `// Specular vermeil reflection tracking
const onMouseMove = (e: MouseEvent) => {
  const rect = insigniaRef.current.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  insignia.style.backgroundPosition = \`\${x}%\`;
};`,
};

export default function FooterLuxuryVermeilInscription() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [specularIntensity, setSpecularIntensity] = useState(1.4);
  const [activeMaison, setActiveMaison] = useState<'PARIS' | 'FLORENCE' | 'GENEVA'>('PARIS');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Stardust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const w = (canvas.width = canvas.parentElement?.clientWidth || 800);
    const h = (canvas.height = canvas.parentElement?.clientHeight || 500);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 2 + 0.5,
      speedY: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.7 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#fde047';

      particles.forEach((p) => {
        p.y -= p.speedY;
        if (p.y < 0) p.y = h;

        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    soundFx.playChime(1080, 0.45);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setEmail('');
    }, 4000);
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-['Cinzel']">
          <div>
            <label className="block text-zinc-400 mb-1">
              Vermeil Glow Intensity ({specularIntensity.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.8"
              max="2.5"
              step="0.1"
              value={specularIntensity}
              onChange={(e) => setSpecularIntensity(parseFloat(e.target.value))}
              className="w-full accent-amber-300"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">
              Salon Privé Atelier
            </label>
            <div className="flex gap-1">
              {(['PARIS', 'FLORENCE', 'GENEVA'] as const).map((city) => (
                <button
                  key={city}
                  onClick={() => {
                    soundFx.playChime(700, 0.2);
                    setActiveMaison(city);
                  }}
                  className={`flex-1 py-1 rounded text-[10px] font-bold border transition-colors ${
                    activeMaison === city
                      ? 'bg-amber-300 text-black border-amber-300'
                      : 'bg-zinc-800 text-zinc-400 border-white/10'
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                soundFx.playChime(950, 0.3);
                setEmail('patron@couture.com');
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/10 text-amber-200 hover:bg-zinc-700 transition-colors"
            >
              Autofill Patron Spec
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#07070a] text-zinc-100 flex flex-col justify-between overflow-hidden select-none border-y border-amber-300/20">
        {/* Ambient Stardust Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

        {/* Ambient Warm Golden Vignette */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-[140px] pointer-events-none" />

        {/* Top Centered Insignia Emblem */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-300/20 bg-amber-400/5 backdrop-blur-md mb-6">
            <Crown className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-['Cinzel'] text-[11px] tracking-[0.3em] font-semibold text-amber-200 uppercase">
              MAISON AURELIA &bull; SALON PRIVÉ
            </span>
          </div>

          <h2
            style={{
              filter: `drop-shadow(0 0 ${15 * specularIntensity}px rgba(251,191,36,0.3))`,
            }}
            className="font-['Cinzel'] text-4xl sm:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-300 to-amber-600 uppercase max-w-3xl mx-auto leading-tight"
          >
            L&apos;ART DE LA HAUTE CRÉATION
          </h2>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-400 text-xs sm:text-sm font-light max-w-md mx-auto leading-relaxed">
            By private appointment only. Sculpting monumental architectural couture and bespoke spatial interfaces.
          </p>
        </div>

        {/* Center Private Salon Ledger Invitation Form */}
        <div className="relative z-20 w-full max-w-xl mx-auto my-8 px-8">
          <form
            onSubmit={handleSubmit}
            className="p-1 rounded-full bg-gradient-to-r from-amber-400/30 via-amber-200/50 to-amber-600/30 border border-amber-300/30 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center bg-[#0d0d12] rounded-full px-5 py-2">
              <Mail className="w-4 h-4 text-amber-300/60 mr-3 shrink-0" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Inquire for private salon reception..."
                className="flex-1 bg-transparent text-amber-100 text-xs font-['Cinzel'] outline-none placeholder:text-zinc-600 tracking-wider"
              />
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 text-black font-['Cinzel'] font-bold text-xs tracking-wider uppercase hover:from-amber-200 hover:to-amber-400 transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(251,191,36,0.4)]"
                data-cursor="hover"
              >
                {isSubmitted ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Inscribed</span>
                  </>
                ) : (
                  <>
                    <span>Request</span>
                    <Sparkles className="w-3 h-3" />
                  </>
                )}
              </button>
            </div>
          </form>

          {isSubmitted && (
            <p className="mt-3 text-center font-['Cinzel'] text-xs text-amber-300 tracking-widest animate-fade-in">
              &bull; YOUR PATRON INQUIRY HAS BEEN RECORDED IN THE ARCHIVE &bull;
            </p>
          )}
        </div>

        {/* Bottom Editorial Directory */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 py-10 border-t border-amber-300/15 grid grid-cols-2 md:grid-cols-4 gap-8 font-['Cinzel'] text-xs text-zinc-400">
          <div>
            <h5 className="font-bold text-amber-200 uppercase tracking-[0.2em] mb-3">
              SALON PARIS
            </h5>
            <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 font-light leading-relaxed">
              18 Place Vendôme, 75001 Paris<br />
              Atelier &bull; Archives Privées
            </p>
          </div>

          <div>
            <h5 className="font-bold text-amber-200 uppercase tracking-[0.2em] mb-3">
              SALON FLORENCE
            </h5>
            <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 font-light leading-relaxed">
              Via de&apos; Tornabuoni, 50123 Firenze<br />
              Florentine Leaf Gilding
            </p>
          </div>

          <div>
            <h5 className="font-bold text-amber-200 uppercase tracking-[0.2em] mb-3">
              SALON GENEVA
            </h5>
            <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 font-light leading-relaxed">
              Rue du Rhône, 1204 Genève<br />
              High Horology &amp; Crystals
            </p>
          </div>

          <div>
            <h5 className="font-bold text-amber-200 uppercase tracking-[0.2em] mb-3">
              COMMISSIONS
            </h5>
            <p className="font-['Plus_Jakarta_Sans'] text-zinc-400 font-light leading-relaxed">
              Curated private commissions by personal invitation only.
            </p>
          </div>
        </div>

        {/* Sub-Footer Copyright */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-['Cinzel'] text-[11px] text-zinc-500">
          <span>&copy; MMXXVI MAISON AURELIA. TOUS DROITS RÉSERVÉS.</span>
          <span className="text-amber-300/80 tracking-widest">ÉDITION DE LUXE</span>
        </div>
      </div>
    </BlueprintHUD>
  );
}
