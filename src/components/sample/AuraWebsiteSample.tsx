import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles, ArrowRight, Volume2, VolumeX, Shield, Play, Pause, Compass, Sliders, CheckCircle, ChevronDown, Music } from 'lucide-react';
import { soundFx } from '../../utils/audio';

export default function AuraWebsiteSample() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ambientActive, setAmbientActive] = useState(false);
  const [activePreset, setActivePreset] = useState<'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL'>('SANCTUARY');
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryTier, setInquiryTier] = useState('ENTERPRISE_ARCH');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [selectedSpec, setSelectedSpec] = useState<'QUANTUM' | 'EDITORIAL' | 'SPATIAL'>('SPATIAL');

  // Background Three.js Particle Mesh for the Live Website
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle field
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      // Subtle cyan, gold and lavender tones
      colors[i * 3] = 0.4 + Math.random() * 0.5;
      colors[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      colors[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 3;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 3;
    };
    window.addEventListener('mousemove', onMouseMove);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      particles.rotation.y += 0.0012;
      particles.rotation.x += 0.0006;
      camera.position.x += (mouseX - camera.position.x) * 0.04;
      camera.position.y += (-mouseY - camera.position.y) * 0.04;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const handleToggleAmbient = () => {
    const active = soundFx.toggleAmbientDrone();
    setAmbientActive(active);
  };

  const handleSelectPreset = (preset: 'SANCTUARY' | 'SOLFEGGIO_528' | 'ZEN_WARMTH' | 'CELESTIAL') => {
    setActivePreset(preset);
    soundFx.setAmbientPreset(preset);
    soundFx.playChime(600, 0.2);
  };

  const handleInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(528, 0.4);
    setInquirySubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030407] text-white relative selection:bg-cyan-500 selection:text-black">
      {/* Three.js Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-45" />

      {/* Website Navigation Header */}
      <nav className="sticky top-0 z-30 w-full border-b border-white/10 bg-[#030407]/85 backdrop-blur-xl px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-400 to-fuchsia-500 p-0.5 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-black rounded-[6px] flex items-center justify-center font-bold text-xs">
                A
              </div>
            </div>
            <span className="font-['Syne'] text-lg font-extrabold tracking-wider bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
              AURA &bull; SPATIAL SYSTEMS
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-xs text-zinc-400">
            <a href="#philosophy" className="hover:text-cyan-400 transition-colors">PHILOSOPHY</a>
            <a href="#architecture" className="hover:text-cyan-400 transition-colors">ARCHITECTURE</a>
            <a href="#soundscape" className="hover:text-cyan-400 transition-colors">SOUNDSCAPE</a>
            <a href="#concierge" className="hover:text-cyan-400 transition-colors">CONCIERGE</a>
          </div>

          {/* Ambient Soundscape Controller in Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleAmbient}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all ${
                ambientActive
                  ? 'bg-violet-950/60 border-violet-400/60 text-violet-300 shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                  : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
              }`}
            >
              <Music className={`w-3.5 h-3.5 ${ambientActive ? 'text-violet-400 animate-pulse' : ''}`} />
              <span className="hidden sm:inline">{ambientActive ? 'AMBIENT SOUND ACTIVE' : 'START AMBIENT SOUND'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[85vh] flex flex-col justify-center items-center text-center px-4 py-20 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 font-mono text-xs mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PRODUCTION-GRADE HIGH-PERFORMANCE WEB SPECIFICATION</span>
        </div>

        <h1 className="font-['Syne'] text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-6">
          SPATIAL <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-fuchsia-400">
            EXPERIENCES
          </span>
        </h1>

        <p className="font-sans text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          A seamless fusion of mathematical WebGL shaders, kinetic variable typography, zero-latency Web Audio synthesizers, and luxury spatial design.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#architecture"
            onClick={() => soundFx.playClick(600)}
            className="px-8 py-3.5 rounded-xl bg-white text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-zinc-200 transition-all shadow-xl flex items-center gap-2"
          >
            <span>Explore Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <button
            onClick={() => {
              handleToggleAmbient();
              soundFx.playChime(700, 0.3);
            }}
            className="px-8 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2"
          >
            <Music className="w-4 h-4 text-violet-400" />
            <span>{ambientActive ? 'Mute Atmosphere' : 'Experience Audio'}</span>
          </button>
        </div>

        {/* Floating Indicator */}
        <div className="mt-16 animate-bounce text-zinc-500">
          <ChevronDown className="w-5 h-5 mx-auto" />
        </div>
      </section>

      {/* VELOCITY MARQUEE */}
      <div className="w-full overflow-hidden border-y border-white/10 bg-black/40 py-3 relative z-10">
        <div className="flex whitespace-nowrap gap-8 font-mono text-xs text-zinc-400 uppercase tracking-[0.25em] animate-marquee">
          <span>&bull; WebGL 3D Parametric Meshes</span>
          <span>&bull; Real-time GLSL Shaders</span>
          <span>&bull; Kinetic Typography Skew</span>
          <span>&bull; 256-Bit Cryptographic Steppers</span>
          <span>&bull; Procedural Harmonic Web Audio</span>
          <span>&bull; Spatial Editorial Atelier</span>
        </div>
      </div>

      {/* PHILOSOPHY & ARCHITECTURE SECTION */}
      <section id="architecture" className="relative z-10 py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-2">
            ENGINEERING PILLARS
          </span>
          <h2 className="font-['Syne'] text-3xl sm:text-5xl font-bold tracking-tight mb-4">
            Crafted Without Compromise
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Every interaction is physically grounded, optically balanced, and engineered for 60 FPS fluid responsiveness.
          </p>
        </div>

        {/* Spec Pill Switcher */}
        <div className="flex justify-center gap-2 mb-12 font-mono text-xs">
          {(['SPATIAL', 'QUANTUM', 'EDITORIAL'] as const).map((spec) => (
            <button
              key={spec}
              onClick={() => {
                setSelectedSpec(spec);
                soundFx.playClick(650);
              }}
              className={`px-4 py-2 rounded-lg border transition-all ${
                selectedSpec === spec
                  ? 'bg-cyan-500 text-black font-bold border-cyan-400 shadow-md shadow-cyan-500/20'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
            >
              {spec} CLUSTER
            </button>
          ))}
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-cyan-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-['Syne'] text-xl font-bold text-white mb-3">
              Spatial 3D Kinematics
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Three.js PBR rendering with dynamic specular lighting, mouse inertia damping, and real-time vertex displacement algorithms.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-violet-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 border border-violet-400/30 flex items-center justify-center text-violet-400 mb-6 group-hover:scale-110 transition-transform">
              <Music className="w-6 h-6" />
            </div>
            <h3 className="font-['Syne'] text-xl font-bold text-white mb-3">
              Harmonic Soundscapes
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Pure sine polyphony with Brian Eno-style micro-detuning, gentle LFO breathing tremolos, and warm non-fatiguing Butterworth filters.
            </p>
          </div>

          <div className="bg-zinc-950/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl hover:border-amber-500/40 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-['Syne'] text-xl font-bold text-white mb-3">
              Cryptographic Integrity
            </h3>
            <p className="font-mono text-xs text-zinc-400 leading-relaxed">
              Multi-factor biometric capacitive scanners, tactile monospace ledgers, and zero-trust authentication workflows.
            </p>
          </div>
        </div>
      </section>

      {/* SOUNDSCAPE LOUNGE CONTROLLER SECTION */}
      <section id="soundscape" className="relative z-10 py-20 px-6 max-w-5xl mx-auto bg-gradient-to-b from-transparent via-violet-950/20 to-transparent border-y border-violet-500/20 rounded-3xl my-12">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-400/30 text-violet-300 font-mono text-xs mb-3">
            <Music className="w-3.5 h-3.5" />
            <span>GENERATIVE PROCEDURAL WEB AUDIO ENGINE</span>
          </div>
          <h2 className="font-['Syne'] text-3xl sm:text-4xl font-bold mb-2">
            Ambient Soundscape Lounge
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm font-mono">
            Calibrated with Butterworth lowpass filtering and pure harmonic sine intervals for serene focus.
          </p>
        </div>

        <div className="bg-black/60 border border-white/15 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
          {/* Preset Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {[
              { id: 'SANCTUARY', name: 'Eb Major Sanctuary', note: 'Brian Eno Warmth' },
              { id: 'SOLFEGGIO_528', name: '528 Hz Solfeggio', note: 'Harmonic Chime' },
              { id: 'ZEN_WARMTH', name: 'Zen Bowl 432 Hz', note: 'Deep Pythagorean' },
              { id: 'CELESTIAL', name: 'Celestial Lydian', note: 'Air & Stardust' },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => handleSelectPreset(p.id as any)}
                className={`p-3 rounded-xl border text-left font-mono transition-all ${
                  activePreset === p.id
                    ? 'border-violet-400 bg-violet-950/50 text-white shadow-[0_0_15px_rgba(167,139,250,0.3)]'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="text-xs font-bold block">{p.name}</span>
                <span className="text-[10px] text-zinc-500">{p.note}</span>
              </button>
            ))}
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
            <button
              onClick={handleToggleAmbient}
              className={`px-6 py-2.5 rounded-lg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
                ambientActive
                  ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {ambientActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{ambientActive ? 'PAUSE ATMOSPHERE' : 'START HARMONIC DRONE'}</span>
            </button>

            <div className="flex items-center gap-3 font-mono text-xs text-zinc-400">
              <span>VOLUME:</span>
              <input
                type="range"
                min="0"
                max="0.06"
                step="0.002"
                defaultValue="0.022"
                onChange={(e) => soundFx.setAmbientVolume(Number(e.target.value))}
                className="w-32 accent-violet-400 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CONCIERGE ATELIER INQUIRY SECTION */}
      <section id="concierge" className="relative z-10 py-24 px-6 max-w-4xl mx-auto">
        <div className="bg-[#080a10] border border-white/15 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-mono text-xs text-cyan-400 uppercase tracking-widest block mb-1">
              DIRECT DISPATCH
            </span>
            <h2 className="font-['Syne'] text-3xl font-bold mb-2">
              Commission an Experience
            </h2>
            <p className="font-mono text-xs text-zinc-400">
              Submit your project telemetry directly to our architectural dispatch enclave.
            </p>
          </div>

          {inquirySubmitted ? (
            <div className="py-12 text-center font-mono">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">Direct Dispatch Received</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mb-6">
                Packet logged to telemetry bus. Our architectural leads will respond within 4 hours.
              </p>
              <button
                onClick={() => setInquirySubmitted(false)}
                className="px-5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white"
              >
                Send Another Dispatch
              </button>
            </div>
          ) : (
            <form onSubmit={handleInquiry} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1.5">
                    Lead Architect / Name
                  </label>
                  <input
                    type="text"
                    value={inquiryName}
                    onChange={(e) => setInquiryName(e.target.value)}
                    placeholder="ALEXIS STERLING"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-zinc-400 uppercase tracking-wider mb-1.5">
                    Secure Contact Email
                  </label>
                  <input
                    type="email"
                    value={inquiryEmail}
                    onChange={(e) => setInquiryEmail(e.target.value)}
                    placeholder="alexis@spatial-corp.io"
                    className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1.5">
                  Deployment Scope Tier
                </label>
                <select
                  value={inquiryTier}
                  onChange={(e) => setInquiryTier(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-400 transition-colors"
                >
                  <option value="ENTERPRISE_ARCH">ENTERPRISE // Full 3D Spatial &amp; WebGL Systems</option>
                  <option value="EDITORIAL_LUXURY">HAUTE COUTURE // Luxury Editorial &amp; Ligatures</option>
                  <option value="CYBER_TELEMETRY">CYBERPUNK // High-Density Telemetry &amp; Terminal HUD</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-300 to-fuchsia-400 text-black font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <span>Submit Architectural Dispatch</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 bg-black/80 py-12 px-6 font-mono text-xs text-zinc-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>AURA SPATIAL CORP &bull; ALL SYSTEMS VERIFIED</span>
          </div>
          <div>
            <span>LATENCY: 0.8ms &bull; THREE.JS &bull; WEB AUDIO SYNTHESIZERS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
