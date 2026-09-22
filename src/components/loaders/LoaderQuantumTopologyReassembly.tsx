import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { RotateCcw, Cpu, Sparkles, Orbit, CheckCircle } from 'lucide-react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Loader_V05_QuantumTopologyReassembly',
  name: 'Quantum Particle Attractor & 3D Topology Crystallization',
  category: 'Loader',
  batch: 'Batch 3: Immersive Page Loaders & Fluid Transitions',
  techStack: ['Next.js / React', 'Three.js WebGL', 'Gravitational Attractor', 'Parametric Torus Geometry'],
  aestheticVibe: 'Immersive WebGL-First / 3D Parametric Quantum',
  interactionBlueprint: 'Thousands of chaotic 3D quantum particles calculate gravitational attraction towards target parametric Torus Knot coordinates, crystallizing into a locked geometry at 100%.',
  description: 'A 3D particle preloader where disordered Brownian particle dust coalesces smoothly into a mathematical torus knot structure based on progressive physics attraction.',
  tags: ['3D Particles', 'Parametric Math', 'Attractor Physics', 'Torus Knot', 'Preloader'],
  codeSnippet: `// Particle Attractor Interpolation Equation
for (let i = 0; i < count; i++) {
  // Lerp from random chaotic positions towards torus knot nodes
  currentPositions[i * 3 + 0] += (targetPositions[i * 3 + 0] - currentPositions[i * 3 + 0]) * progress * stiffness;
  currentPositions[i * 3 + 1] += (targetPositions[i * 3 + 1] - currentPositions[i * 3 + 1]) * progress * stiffness;
  currentPositions[i * 3 + 2] += (targetPositions[i * 3 + 2] - currentPositions[i * 3 + 2]) * progress * stiffness;
}`,
};

export default function LoaderQuantumTopologyReassembly() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  // Tunable parameters
  const [particleSize, setParticleSize] = useState(2.2);
  const [attractorForce, setAttractorForce] = useState(0.08);

  const sceneObjects = useRef<{
    points: THREE.Points | null;
    currentPositions: Float32Array | null;
    targetPositions: Float32Array | null;
    chaosPositions: Float32Array | null;
    progressVal: { value: number };
  }>({
    points: null,
    currentPositions: null,
    targetPositions: null,
    chaosPositions: null,
    progressVal: { value: 0 },
  });

  const startReassembly = () => {
    soundFx.playChime(500, 0.2);
    setIsRunning(true);
    setIsLocked(false);
    setProgress(0);
    sceneObjects.current.progressVal.value = 0;

    // Reset particle current positions to chaotic positions
    if (sceneObjects.current.currentPositions && sceneObjects.current.chaosPositions) {
      sceneObjects.current.currentPositions.set(sceneObjects.current.chaosPositions);
    }

    let p = 0;
    const interval = setInterval(() => {
      p += 0.02;
      const pct = Math.min(Math.round(p * 100), 100);
      setProgress(pct);
      sceneObjects.current.progressVal.value = Math.min(p, 1.0);

      if (p >= 1.0) {
        clearInterval(interval);
        setIsLocked(true);
        setIsRunning(false);
        soundFx.playChime(1050, 0.4);
      }
    }, 30);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // Generate 2500 points on a Torus Knot geometry (target)
    const particleCount = 2500;
    const currentPositions = new Float32Array(particleCount * 3);
    const targetPositions = new Float32Array(particleCount * 3);
    const chaosPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color('#38bdf8'); // sky blue
    const color2 = new THREE.Color('#c084fc'); // purple
    const color3 = new THREE.Color('#f43f5e'); // rose

    for (let i = 0; i < particleCount; i++) {
      // Parametric Torus Knot coordinates (p=2, q=3)
      const u = (i / particleCount) * Math.PI * 2 * 3;
      const r = 5.0 + 2.0 * Math.cos(3 * u);
      const tx = r * Math.cos(2 * u);
      const ty = r * Math.sin(2 * u);
      const tz = 3.5 * Math.sin(3 * u);

      targetPositions[i * 3 + 0] = tx;
      targetPositions[i * 3 + 1] = ty;
      targetPositions[i * 3 + 2] = tz;

      // Chaotic dispersed cloud
      const cx = (Math.random() - 0.5) * 35;
      const cy = (Math.random() - 0.5) * 35;
      const cz = (Math.random() - 0.5) * 35;

      chaosPositions[i * 3 + 0] = cx;
      chaosPositions[i * 3 + 1] = cy;
      chaosPositions[i * 3 + 2] = cz;

      // Start current at chaotic positions
      currentPositions[i * 3 + 0] = cx;
      currentPositions[i * 3 + 1] = cy;
      currentPositions[i * 3 + 2] = cz;

      // Color gradient
      const mixedColor = color1.clone().lerp(color2, (tx + 7) / 14).lerp(color3, (tz + 4) / 8);
      colors[i * 3 + 0] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: particleSize,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    sceneObjects.current = {
      points,
      currentPositions,
      targetPositions,
      chaosPositions,
      progressVal: { value: 0 },
    };

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      points.rotation.y += 0.005;
      points.rotation.x += 0.003;

      const pVal = sceneObjects.current.progressVal.value;
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;

      // Gravitational pull toward target positions
      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        // Interpolate position based on progress and attraction force
        const tx = targetPositions[idx + 0];
        const ty = targetPositions[idx + 1];
        const tz = targetPositions[idx + 2];

        currentPositions[idx + 0] += (tx - currentPositions[idx + 0]) * pVal * attractorForce;
        currentPositions[idx + 1] += (ty - currentPositions[idx + 1]) * pVal * attractorForce;
        currentPositions[idx + 2] += (tz - currentPositions[idx + 2]) * pVal * attractorForce;
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    // Trigger initial loop
    startReassembly();

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
  }, []);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Particle Point Size ({particleSize.toFixed(1)}px)
            </label>
            <input
              type="range"
              min="1.0"
              max="5.0"
              step="0.2"
              value={particleSize}
              onChange={(e) => setParticleSize(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Gravitational Attractor Force ({attractorForce.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.03"
              max="0.20"
              step="0.01"
              value={attractorForce}
              onChange={(e) => setAttractorForce(parseFloat(e.target.value))}
              className="w-full accent-sky-400"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={startReassembly}
              disabled={isRunning}
              className="w-full py-1.5 px-3 rounded bg-sky-400 disabled:opacity-50 text-black font-mono text-xs font-bold uppercase hover:bg-sky-300 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Trigger Crystallization</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#03050c] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10">
        
        {/* 3D WebGL Canvas Layer */}
        <div ref={mountRef} className="absolute inset-0 z-10" />

        {/* Top Telemetry Header */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-6 py-6 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 border border-sky-500/30 text-sky-400 font-mono text-xs backdrop-blur-md">
            <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ATTRACTOR ENGINE // 2,500 PARTICLES</span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-zinc-400 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
            <span>CRYSTALLIZATION:</span>
            <span className="text-sky-400 font-bold">{progress}%</span>
          </div>
        </div>

        {/* Bottom Quantum Stage Status */}
        <div className="relative z-20 w-full max-w-xl mx-auto mb-8 p-6 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-xl text-center shadow-2xl">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span>TOPOLOGY: PARAMETRIC TORUS KNOT (p=2, q=3)</span>
          </div>

          <h3 className="font-['Syne'] text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isLocked ? 'Quantum Crystal Structure Locked' : 'Gravitational Coalescence in Progress'}
          </h3>

          <p className="mt-2 text-zinc-400 font-mono text-xs leading-relaxed">
            {isLocked
              ? 'All 2,500 quantum nodes have synchronized to parametric equilibrium coordinates.'
              : 'Pulling chaotic Brownian particle dust toward target topological coordinates.'}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={startReassembly}
              className="px-6 py-2.5 rounded-full bg-sky-400 hover:bg-sky-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2"
              data-cursor="hover"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Scatter &amp; Reassemble</span>
            </button>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
