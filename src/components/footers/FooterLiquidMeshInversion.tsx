import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Waves, Sparkles, ArrowRight, Sliders, RotateCcw } from 'lucide-react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Footer_V05_LiquidMeshInversion',
  name: 'Parametric 3D Wave Ribbon & Inverted Magnetic Pill CTAs',
  category: 'Footer',
  batch: 'Batch 5: Footers, Magnetic CTA Zones & Kinetic Physics Elements',
  techStack: ['Next.js / React', 'Three.js 3D Wireframe / GLSL Wave', 'Inverted Contrast Scheme', 'Spring Pill CTAs'],
  aestheticVibe: 'Immersive 3D Math / Chromatic Inversion',
  interactionBlueprint: 'Undulating 3D WebGL parametric wave ribbon rendered in inverted high-contrast titanium; hovering magnetic pill tags triggers physics-based spring attraction and harmonic chime intervals.',
  description: 'An inverted high-contrast architectural footer featuring an undulating 3D parametric plane mesh in Three.js, spring-damped magnetic pill tags, and clean editorial typographic layout.',
  tags: ['3D WebGL Wave', 'Parametric Mesh', 'Inverted Theme', 'Spring Pills', 'Awwwards'],
  codeSnippet: `// 3D Parametric plane vertex wave distortion
const animateWave = (time: number) => {
  const position = geometry.attributes.position;
  for (let i = 0; i < position.count; i++) {
    const u = position.getX(i);
    const v = position.getY(i);
    const z = Math.sin(u * waveFrequency + time * waveSpeed) * 
              Math.cos(v * waveFrequency + time * waveSpeed) * waveAmplitude;
    position.setZ(i, z);
  }
  position.needsUpdate = true;
};`,
};

const pills = [
  { id: 'p1', label: 'START A PROJECT', primary: true },
  { id: 'p2', label: 'EXPLORE GLSL ARCHIVES', primary: false },
  { id: 'p3', label: 'DOWNLOAD PRESS KIT', primary: false },
  { id: 'p4', label: 'SCHEDULE DESIGN CRIT', primary: false },
];

export default function FooterLiquidMeshInversion() {
  const mountRef = useRef<HTMLDivElement>(null);

  // Tunable controls
  const [waveSpeed, setWaveSpeed] = useState(1.4);
  const [waveAmplitude, setWaveAmplitude] = useState(2.2);
  const [isWireframe, setIsWireframe] = useState(true);

  // Three.js 3D Wave Canvas
  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.set(0, -6, 8);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // Parametric plane geometry
    const geometry = new THREE.PlaneGeometry(24, 14, 48, 32);
    const material = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: isWireframe,
      transparent: true,
      opacity: 0.35,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime() * waveSpeed;

      const pos = geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z =
          Math.sin(x * 0.4 + elapsedTime) * Math.cos(y * 0.5 + elapsedTime * 0.8) * waveAmplitude;
        pos.setZ(i, z);
      }
      pos.needsUpdate = true;

      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [waveSpeed, waveAmplitude, isWireframe]);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <div>
            <label className="block text-zinc-400 mb-1">
              Wave Velocity ({waveSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={waveSpeed}
              onChange={(e) => setWaveSpeed(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">
              Wave Amplitude ({waveAmplitude.toFixed(1)})
            </label>
            <input
              type="range"
              min="0.5"
              max="4.0"
              step="0.2"
              value={waveAmplitude}
              onChange={(e) => setWaveAmplitude(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsWireframe(!isWireframe);
              }}
              className="w-full py-1.5 px-3 rounded bg-zinc-800 border border-white/10 text-sky-300 font-bold hover:bg-zinc-700 transition-colors"
            >
              {isWireframe ? 'Mesh: Wireframe' : 'Mesh: Solid Surface'}
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#06080f] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10">
        {/* Three.js 3D Wave Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-10 pointer-events-none" />

        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Waves className="w-4 h-4 text-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-300">
              3D_WAVE_INVERSION // V05
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-zinc-400">
            <span>GEOMETRY: 48x32 VERTEX LATTICE</span>
            <span className="text-zinc-600">|</span>
            <span className="text-sky-300 font-bold">REAL-TIME PARAMETRIC</span>
          </div>
        </div>

        {/* Center Editorial Inverted Statement */}
        <div className="relative z-20 w-full max-w-4xl mx-auto my-auto px-8 text-center flex flex-col items-center">
          <span className="font-mono text-xs tracking-widest text-sky-400 uppercase mb-3 block">
            ARCHITECTURAL KINETICS
          </span>

          <h2 className="font-['Syne'] text-4xl sm:text-7xl font-black text-white tracking-tight uppercase leading-none">
            SCULPTING DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-indigo-300 to-teal-300">
              MONUMENTS
            </span>
          </h2>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-400 text-xs sm:text-sm font-light max-w-lg mx-auto leading-relaxed">
            Where mathematical precision converges with fluid aesthetics to engineer memorable digital experiences.
          </p>

          {/* Interactive Spring Pill Tags */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {pills.map((pill, idx) => (
              <button
                key={pill.id}
                onClick={() => soundFx.playChime(650 + idx * 90, 0.3)}
                className={`px-5 py-2.5 rounded-full font-mono text-xs font-bold transition-all border flex items-center gap-2 group ${
                  pill.primary
                    ? 'bg-sky-400 text-black border-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:bg-sky-300'
                    : 'bg-white/5 text-zinc-300 border-white/10 hover:border-sky-400/50 hover:text-white backdrop-blur-md'
                }`}
                data-cursor="hover"
              >
                <span>{pill.label}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Clean Editorial Footer Rails */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-8 pb-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-6">
            <span className="text-white font-bold">&copy; 2026 AURELIA SPATIAL</span>
            <span className="hover:text-sky-300 cursor-pointer">FRAMEWORK CORE</span>
            <span className="hover:text-sky-300 cursor-pointer">GLSL SHADER REPO</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-zinc-500">DISPERSION: 60FPS LOCKED</span>
            <span className="px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30 font-bold">
              AWWWARDS READY
            </span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
