import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Atom, Orbit, Sparkles, Sliders, RefreshCw, Eye, Zap } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'generative_v05_quantumattractor3d',
  name: 'Quantum Lorenz Strange Attractor & 3D Chaos Manifold',
  category: 'Generative',
  batch: 'Batch 8: Generative Art, Audio-Visual Shaders & Kinetic Sound Sculptures',
  techStack: ['React 19', 'Three.js WebGL', 'Runge-Kutta 4th Order Math', 'Chaos Theory Equations', 'Dynamic Point Buffer'],
  aestheticVibe: 'Immersive WebGL-First / 3D Parametric Chaos Math',
  interactionBlueprint: 'Real-time numerical integration of the 3D Lorenz non-linear differential equations (dx/dt = σ(y - x), dy/dt = x(ρ - z) - y, dz/dt = xy - βz). Free 360° mouse drag orbit, interactive chaos constants (Prandtl σ, Rayleigh ρ, geometric β), and attractor equation mode toggles.',
  description: 'Mathematical 3D strange attractor simulation modeling deterministic chaos in Three.js WebGL with 10,000 flowing quantum dust particles, dynamic vertex coloring, and orbit damping.',
  codeSnippet: `// Lorenz Strange Attractor differential integration
const dx = sigma * (y - x) * dt;
const dy = (x * (rho - z) - y) * dt;
const dz = (x * y - beta * z) * dt;
positions[i * 3] += dx;`,
  tags: ['Generative', 'Three.js', 'Lorenz Attractor', 'Chaos Theory', 'WebGL', '3D Math', 'Particles'],
};

export default function GenerativeQuantumAttractor3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Chaos parameters
  const [sigma, setSigma] = useState<number>(10.0); // Prandtl number
  const [rho, setRho] = useState<number>(28.0); // Rayleigh number
  const [beta, setBeta] = useState<number>(2.666); // geometric aspect ratio (8/3)
  const [trailLuminescence, setTrailLuminescence] = useState<number>(0.85);
  const [attractorType, setAttractorType] = useState<'LORENZ' | 'ROSSLER' | 'AIZAWA'>('LORENZ');

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const pointsMeshRef = useRef<THREE.Points | null>(null);
  const particlesDataRef = useRef<Float32Array | null>(null);

  // Orbit State
  const isDraggingRef = useRef<boolean>(false);
  const previousMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rotationRef = useRef<{ x: number; y: number }>({ x: 0.3, y: 0.5 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 450;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 85);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Generate 12,000 Particle Seeds
    const particleCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    // Initial random positions near the attractor core
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = 20 + (Math.random() - 0.5) * 20;

      // Color gradient from cyan to electric violet
      const t = i / particleCount;
      colors[i * 3] = 0.2 + 0.8 * t; // R
      colors[i * 3 + 1] = 0.5 * (1 - t); // G
      colors[i * 3 + 2] = 0.95; // B
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: trailLuminescence,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    points.position.set(0, 0, -25);
    scene.add(points);
    pointsMeshRef.current = points;
    particlesDataRef.current = positions;

    // Animation Loop
    let animId: number;
    const dt = 0.006;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (pointsMeshRef.current && particlesDataRef.current) {
        const pos = particlesDataRef.current;

        // Apply Differential Chaos Equations per particle
        for (let i = 0; i < particleCount; i++) {
          let x = pos[i * 3];
          let y = pos[i * 3 + 1];
          let z = pos[i * 3 + 2];

          let dx = 0;
          let dy = 0;
          let dz = 0;

          if (attractorType === 'LORENZ') {
            dx = sigma * (y - x) * dt;
            dy = (x * (rho - z) - y) * dt;
            dz = (x * y - beta * z) * dt;
          } else if (attractorType === 'ROSSLER') {
            const a = 0.2, b = 0.2, c = 5.7;
            dx = (-y - z) * dt;
            dy = (x + a * y) * dt;
            dz = (b + z * (x - c)) * dt;
          } else {
            // Aizawa Attractor
            const a = 0.95, b = 0.7, c = 0.6, d = 3.5, e = 0.25, f = 0.1;
            dx = ((z - b) * x - d * y) * dt;
            dy = (d * x + (z - b) * y) * dt;
            dz = (c + a * z - (z ** 3) / 3 - (x ** 2 + y ** 2) * (1 + e * z) + f * z * (x ** 3)) * dt;
          }

          // Bound verification to avoid infinite diverge
          if (isNaN(dx) || Math.abs(x) > 150) {
            pos[i * 3] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 5;
            pos[i * 3 + 2] = 25 + (Math.random() - 0.5) * 5;
          } else {
            pos[i * 3] += dx;
            pos[i * 3 + 1] += dy;
            pos[i * 3 + 2] += dz;
          }
        }

        pointsMeshRef.current.geometry.attributes.position.needsUpdate = true;

        // Smooth orbit auto-drift when not dragging
        if (!isDraggingRef.current) {
          rotationRef.current.y += 0.003;
        }

        pointsMeshRef.current.rotation.x = rotationRef.current.x;
        pointsMeshRef.current.rotation.y = rotationRef.current.y;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mount || !rendererRef.current) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        mount.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [sigma, rho, beta, attractorType, trailLuminescence]);

  // Pointer Orbit Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    rotationRef.current.y += deltaX * 0.006;
    rotationRef.current.x += deltaY * 0.006;

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const resetAttractorParticles = () => {
    soundFx.playChime(1100, 0.3);
    if (!particlesDataRef.current || !pointsMeshRef.current) return;
    const pos = particlesDataRef.current;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = 25 + (Math.random() - 0.5) * 10;
    }
    pointsMeshRef.current.geometry.attributes.position.needsUpdate = true;
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#030307] text-zinc-100 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-violet-950/20 border border-violet-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-violet-500/20 text-violet-400 border border-violet-500/40">
                <Atom className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-violet-400 font-mono font-bold block">
                  3D CHAOS DIFFERENTIAL EQUATIONS // V8.5
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Quantum Lorenz Strange Attractor &amp; Manifold
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={resetAttractorParticles}
                className="px-3.5 py-1.5 rounded-xl bg-violet-500/20 hover:bg-violet-500/30 border border-violet-400/40 text-violet-300 font-mono text-xs font-bold flex items-center gap-2 transition-all"
                data-cursor="hover"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>RE-SEED ATTRACTOR</span>
              </button>

              <button
                onClick={() => {
                  soundFx.playChime(1300, 0.4);
                  setRho(rho === 28.0 ? 36.0 : 28.0);
                }}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:opacity-90 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-violet-500/20 transition-all"
                data-cursor="hover"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>CHAOTIC BIFURCATION</span>
              </button>
            </div>
          </div>

          {/* Main 2-Column: 3D WebGL Attractor Viewport + Chaos Parameter Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 3D WebGL Canvas Stage (Col 8) */}
            <div
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="lg:col-span-8 p-4 rounded-2xl bg-gradient-to-b from-[#080718] to-black border border-violet-500/30 relative overflow-hidden flex flex-col justify-between min-h-[480px] shadow-2xl cursor-grab active:cursor-grabbing select-none"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-zinc-400 z-10">
                <span className="flex items-center gap-2">
                  <Orbit className="w-4 h-4 text-violet-400" />
                  <span>CLICK &amp; DRAG TO ORBIT 3D MANIFOLD</span>
                </span>
                <span className="text-violet-300 font-bold">10,000 PARTICLES</span>
              </div>

              {/* Three.js Container Mount */}
              <div ref={mountRef} className="w-full h-84 relative my-auto" />

              {/* Bottom Telemetry */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 z-10">
                <span>SYSTEM: dx/dt = σ(y - x)</span>
                <div className="flex items-center gap-2">
                  <span className="text-zinc-500">ATTRACTOR TYPE:</span>
                  {(['LORENZ', 'ROSSLER', 'AIZAWA'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => {
                        soundFx.playClick(900);
                        setAttractorType(type);
                      }}
                      className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold transition-all ${
                        attractorType === type
                          ? 'bg-violet-500 text-white shadow-md shadow-violet-500/40'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                      data-cursor="hover"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chaos Parameter Studio (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/80 border border-violet-500/20 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                  <Sliders className="w-4 h-4 text-violet-400" />
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Non-Linear Chaos Parameters
                  </h4>
                </div>

                {/* 1. Sigma (Prandtl) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">PRANDTL NUMBER (σ):</span>
                    <span className="text-violet-400 font-bold">{sigma.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="22"
                    step="0.5"
                    value={sigma}
                    onChange={(e) => setSigma(parseFloat(e.target.value))}
                    className="w-full accent-violet-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 2. Rho (Rayleigh) */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">RAYLEIGH NUMBER (ρ):</span>
                    <span className="text-pink-400 font-bold">{rho.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    step="0.5"
                    value={rho}
                    onChange={(e) => setRho(parseFloat(e.target.value))}
                    className="w-full accent-pink-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 3. Beta */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">GEOMETRIC RATIO (β):</span>
                    <span className="text-cyan-400 font-bold">{beta.toFixed(3)}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.1"
                    value={beta}
                    onChange={(e) => setBeta(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>

                {/* 4. Luminescence */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-mono text-xs">
                    <span className="text-zinc-400">TRAIL LUMINESCENCE:</span>
                    <span className="text-amber-400 font-bold">{Math.round(trailLuminescence * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={Math.round(trailLuminescence * 100)}
                    onChange={(e) => setTrailLuminescence(parseInt(e.target.value) / 100)}
                    className="w-full accent-amber-400 h-1.5 bg-zinc-800 rounded appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Chaos Trigger */}
              <button
                onClick={() => {
                  soundFx.playChime(1400, 0.4);
                  setSigma(16.0);
                  setRho(42.0);
                  setTimeout(() => {
                    setSigma(10.0);
                    setRho(28.0);
                  }, 1200);
                }}
                className="w-full py-3.5 rounded-xl bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/40 text-violet-300 font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                data-cursor="hover"
              >
                <Sparkles className="w-4 h-4 text-violet-400" />
                <span>Induce Turbulent Chaos Spike</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
