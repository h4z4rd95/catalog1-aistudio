import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { CreditCard, Sparkles, Layers, Sliders, ShieldCheck, Check, ArrowRight, Rotate3d } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'form_v05_parametric3dcardconfigurator',
  name: 'Parametric 3D Metal Membership Card & Spatial Stepper',
  category: 'Form',
  batch: 'Batch 11: Interactive Forms, Tactile Inputs & Kinetic Steppers',
  techStack: ['React 19', 'Three.js WebGL', 'Procedural Metal PBR', 'Mouse Inertia Orbit', 'Spatial Stepper'],
  aestheticVibe: 'Immersive WebGL-First / 3D Math',
  interactionBlueprint: 'Three.js real-time 3D metallic membership card with drag inertia, specular point light tracking cursor, alloy shader switching (Titanium, Gold, Damascus Steel), and live embossed typographic mapping.',
  description: 'Parametric 3D spatial membership onboarding suite featuring real-time metal alloy reflection physics, interactive card rotation, and multi-step digital badge minting.',
  codeSnippet: `// Three.js PBR Metal Card with live roughness & metalness
const cardMaterial = new THREE.MeshStandardMaterial({
  color: 0x222225,
  metalness: 0.95,
  roughness: 0.18,
});`,
  tags: ['Form', '3D Math', 'Three.js', 'WebGL', 'Metal Card', 'Configurator', 'Stepper'],
};

export default function FormParametric3DCardConfigurator() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const [alloy, setAlloy] = useState<'TITANIUM' | 'DAMASCUS' | 'GOLD' | 'OBSIDIAN'>('TITANIUM');
  const [cardHolder, setCardHolder] = useState('ALEXIS STERLING');
  const [membershipTier, setMembershipTier] = useState<'FOUNDER' | 'SYNAPSE' | 'QUANTUM'>('FOUNDER');
  const [isMinted, setIsMinted] = useState(false);
  const [activeStep, setActiveStep] = useState<1 | 2>(1);

  const cardMeshRef = useRef<THREE.Mesh | null>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x38bdf8, 3.5, 20);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);
    pointLightRef.current = pointLight;

    const fillLight = new THREE.DirectionalLight(0xf43f5e, 1.5);
    fillLight.position.set(-3, -2, 2);
    scene.add(fillLight);

    // Card geometry (standard ISO 7810 credit card ratio 85.60 x 53.98)
    const geometry = new THREE.BoxGeometry(2.4, 1.51, 0.04);

    // Material with metal PBR
    let cardColor = 0x27272a;
    let metalness = 0.92;
    let roughness = 0.22;

    if (alloy === 'TITANIUM') {
      cardColor = 0x71717a;
      metalness = 0.95;
      roughness = 0.2;
    } else if (alloy === 'GOLD') {
      cardColor = 0xf59e0b;
      metalness = 0.98;
      roughness = 0.15;
    } else if (alloy === 'DAMASCUS') {
      cardColor = 0x38bdf8;
      metalness = 0.88;
      roughness = 0.3;
    } else {
      cardColor = 0x09090b;
      metalness = 0.75;
      roughness = 0.1;
    }

    const material = new THREE.MeshStandardMaterial({
      color: cardColor,
      metalness,
      roughness,
    });

    const card = new THREE.Mesh(geometry, material);
    scene.add(card);
    cardMeshRef.current = card;

    // Interactive mouse drag & inertia
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let rotSpeed = { x: 0.002, y: 0.006 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        // Point light tracks pointer for specular glint
        const rect = container.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        if (pointLightRef.current) {
          pointLightRef.current.position.set(normX * 3, normY * 2, 3);
        }
        return;
      }
      const dx = e.clientX - prevMouse.x;
      const dy = e.clientY - prevMouse.y;
      if (card) {
        card.rotation.y += dx * 0.012;
        card.rotation.x += dy * 0.012;
      }
      prevMouse = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDragging && card) {
        card.rotation.y += rotSpeed.y;
        card.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [alloy]);

  const handleMint = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playChime(784, 0.4);
    setIsMinted(true);
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative bg-[#040608]">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-sky-400 font-bold tracking-widest uppercase mb-1">
                <Rotate3d className="w-4 h-4 text-sky-400" />
                <span>VARIATION 55 // BATCH 11 &bull; 3D PARAMETRIC FORMS</span>
              </div>
              <h2 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Parametric 3D Metal Membership Card &amp; Spatial Stepper
              </h2>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              <span>THREE.JS PBR SHADER KERNEL ACTIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 3D Viewport */}
            <div className="lg:col-span-6 bg-zinc-950/80 border border-white/10 rounded-2xl p-4 flex flex-col items-center relative overflow-hidden">
              <div className="absolute top-4 left-4 z-10 font-mono text-xs text-zinc-400 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-full border border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                <span>Drag to rotate 3D mesh &bull; Point specular glint</span>
              </div>

              {/* Three.js Canvas Container */}
              <div ref={mountRef} className="w-full h-80 cursor-grab active:cursor-grabbing select-none" />

              {/* Alloy & Material Selector Badges */}
              <div className="w-full border-t border-white/10 pt-4 mt-2">
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider block mb-2">
                  SELECT ALLOY COMPOSITION
                </span>
                <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                  {(['TITANIUM', 'DAMASCUS', 'GOLD', 'OBSIDIAN'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => {
                        setAlloy(a);
                        soundFx.playClick(650);
                      }}
                      className={`py-2 px-1 text-center rounded border transition-all ${
                        alloy === a
                          ? 'border-sky-400 bg-sky-950/40 text-sky-300 font-bold shadow-[0_0_12px_rgba(56,189,248,0.3)]'
                          : 'border-white/10 bg-black/40 text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Stepper Form */}
            <div className="lg:col-span-6 bg-[#0a0c12]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
              {isMinted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-400 flex items-center justify-center text-sky-300 mx-auto mb-4 animate-bounce">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-['Syne'] text-2xl font-bold text-white mb-2">Membership Minted</h3>
                  <p className="font-mono text-xs text-zinc-400 max-w-sm mx-auto mb-6">
                    Parametric physical card forged in {alloy}. Your digital cryptographic pass has been deposited into your hardware enclave.
                  </p>
                  <button
                    onClick={() => {
                      setIsMinted(false);
                      soundFx.playClick(600);
                    }}
                    className="px-6 py-2.5 rounded-lg border border-white/20 font-mono text-xs font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    Configure Another Card
                  </button>
                </div>
              ) : (
                <form onSubmit={handleMint} className="space-y-5 font-mono">
                  {/* Step Tabs */}
                  <div className="flex border-b border-white/10 pb-3 gap-4 text-xs">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className={`pb-1 transition-all ${
                        activeStep === 1
                          ? 'border-b-2 border-sky-400 text-sky-300 font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      1. MEMBERSHIP TIER
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className={`pb-1 transition-all ${
                        activeStep === 2
                          ? 'border-b-2 border-sky-400 text-sky-300 font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      2. BESPOKE ENGRAVING
                    </button>
                  </div>

                  {activeStep === 1 && (
                    <div className="space-y-4">
                      <label className="block text-xs uppercase text-zinc-400 font-bold">
                        Select Clearance Tier
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: 'FOUNDER', desc: 'Unlimited spatial cluster compute + Private lounge pass', price: '$2,500/yr' },
                          { id: 'SYNAPSE', desc: 'Hardware enclave acceleration + Priority GPU allocation', price: '$1,200/yr' },
                          { id: 'QUANTUM', desc: 'Developer API gateway + Decentralized telemetry ledger', price: '$600/yr' },
                        ].map((t) => (
                          <div
                            key={t.id}
                            onClick={() => {
                              setMembershipTier(t.id as any);
                              soundFx.playClick(700);
                            }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                              membershipTier === t.id
                                ? 'border-sky-400 bg-sky-950/20 text-white shadow-[0_0_12px_rgba(56,189,248,0.2)]'
                                : 'border-white/10 bg-black/40 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <div>
                              <span className="font-bold text-xs block text-white">{t.id} CLEARANCE</span>
                              <span className="text-[11px] text-zinc-400">{t.desc}</span>
                            </div>
                            <span className="text-xs font-bold text-sky-400">{t.price}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          type="button"
                          onClick={() => setActiveStep(2)}
                          className="px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          <span>Proceed to Engraving</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  )}

                  {activeStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs uppercase text-zinc-400 font-bold mb-1.5">
                          Laser Embossed Name
                        </label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => {
                            setCardHolder(e.target.value.toUpperCase());
                            soundFx.playTick(650);
                          }}
                          placeholder="ALEXIS STERLING"
                          className="w-full bg-black border border-white/15 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-sky-400 transition-colors"
                          required
                        />
                      </div>

                      <div className="p-3 bg-black/50 border border-white/10 rounded-lg text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Selected Alloy:</span>
                          <span className="text-sky-300 font-bold">{alloy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Clearance Tier:</span>
                          <span className="text-white font-bold">{membershipTier}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-zinc-500">Engraved Moniker:</span>
                          <span className="text-white font-bold">{cardHolder || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setActiveStep(1)}
                          className="text-xs text-zinc-400 hover:text-white"
                        >
                          &larr; Back to Tiers
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-cyan-500 text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-sky-500/20"
                        >
                          <span>Forge &amp; Mint Card</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
