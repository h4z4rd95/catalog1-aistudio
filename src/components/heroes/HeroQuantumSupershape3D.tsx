import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Box, Orbit, Cpu, Compass, Layers, RotateCcw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V05_QuantumSupershape3D',
  name: 'Quantum Supershape 3D Geometry',
  category: 'Hero',
  batch: 'Batch 1: Next.js Hero Sections',
  techStack: ['Next.js / React', 'Three.js 3D WebGL', 'Custom GLSL Shaders', 'Parametric Math Engine'],
  aestheticVibe: 'Immersive WebGL-First / 3D Parametric Quantum',
  interactionBlueprint: 'Cursor coordinates calculate 3D orbit angular momentum; procedural vertex noise dynamically ripples across mathematical torus knot harmonics.',
  description: 'A real-time WebGL 3D computational stage rendering parametric supershape topologies with custom iridescent normal lighting, dynamic vertex displacement, and instant switchable point/wireframe shaders.',
  tags: ['Three.js', '3D WebGL', 'Parametric Math', 'Vertex Displacement', 'Wireframe Shader'],
  codeSnippet: `// Three.js Torus Knot Parametric Vertex Shader & Iridescent Normals
const vertexShader = \`
  uniform float uTime;
  uniform float uDisplacement;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // 3D Simplex noise deformation
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    
    // Procedural wave displacement along normals
    float wave = sin(position.x * 2.0 + uTime) * cos(position.y * 2.0 + uTime);
    vec3 newPos = position + normal * (wave * uDisplacement);
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
  }
\`;

const fragmentShader = \`
  varying vec3 vNormal;
  uniform float uTime;
  void main() {
    // Normal-map spectral color mapping
    vec3 light = normalize(vec3(1.0, 1.0, 1.0));
    float d = max(dot(vNormal, light), 0.1);
    vec3 col = 0.5 + 0.5 * vNormal;
    gl_FragColor = vec4(col * d * 1.3, 1.0);
  }
\`;`,
};

export default function HeroQuantumSupershape3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live tunable HUD parameters
  const [renderMode, setRenderMode] = useState<'solid' | 'wireframe' | 'points'>('solid');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [displacement, setDisplacement] = useState<number>(0.18);
  const [pTorus, setPTorus] = useState<number>(2);
  const [qTorus, setQTorus] = useState<number>(3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xf43f5e, 2.0);
    dirLight2.position.set(-5, -5, -3);
    scene.add(dirLight2);

    // Custom Shader Material for Iridescent Normal Lighting & Vertex displacement
    const uniforms = {
      uTime: { value: 0 },
      uDisplacement: { value: displacement },
    };

    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        uniform float uTime;
        uniform float uDisplacement;
        varying vec3 vNormal;
        varying vec3 vPos;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPos = position;
          float wave = sin(position.x * 2.5 + uTime * 1.5) * cos(position.z * 2.5 + uTime * 1.5);
          vec3 displaced = position + normal * (wave * uDisplacement);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPos;
        uniform float uTime;

        void main() {
          vec3 light = normalize(vec3(0.5, 1.0, 0.8));
          float diff = max(dot(vNormal, light), 0.2);
          
          // Iridescent normal map color
          vec3 normalCol = 0.5 + 0.5 * vNormal;
          vec3 baseCol = vec3(0.1, 0.8, 0.9);
          vec3 finalCol = mix(normalCol, baseCol, 0.3) * (diff + 0.3);
          
          gl_FragColor = vec4(finalCol, 1.0);
        }
      `,
      wireframe: renderMode === 'wireframe',
    });

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });

    // Create Torus Knot Geometry
    const geometry = new THREE.TorusKnotGeometry(1.0, 0.35, 180, 48, pTorus, qTorus);
    
    let currentMesh: THREE.Object3D;
    if (renderMode === 'points') {
      const pointsMat = new THREE.PointsMaterial({
        color: 0x38bdf8,
        size: 0.025,
        transparent: true,
        opacity: 0.9,
      });
      currentMesh = new THREE.Points(geometry, pointsMat);
    } else if (renderMode === 'wireframe') {
      currentMesh = new THREE.Mesh(geometry, wireMaterial);
    } else {
      currentMesh = new THREE.Mesh(geometry, shaderMaterial);
    }
    scene.add(currentMesh);

    // Resize handling
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    // Mouse orbit momentum
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = x * Math.PI * 1.5;
      targetRotX = y * Math.PI * 1.2;
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let clock = new THREE.Clock();
    let animId: number;

    const renderLoop = () => {
      const delta = clock.getDelta();
      uniforms.uTime.value += delta * rotationSpeed;
      uniforms.uDisplacement.value = displacement;

      // Smooth inertia rotation
      currentMesh.rotation.y += (targetRotY - currentMesh.rotation.y) * 0.05 + delta * 0.3 * rotationSpeed;
      currentMesh.rotation.x += (targetRotX - currentMesh.rotation.x) * 0.05 + delta * 0.2 * rotationSpeed;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
      wireMaterial.dispose();
    };
  }, [renderMode, rotationSpeed, displacement, pTorus, qTorus]);

  const cycleMode = () => {
    soundFx.playClick(950, 0.03);
    if (renderMode === 'solid') setRenderMode('wireframe');
    else if (renderMode === 'wireframe') setRenderMode('points');
    else setRenderMode('solid');
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Vertex Ripple Amplitude ({displacement.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.0"
              max="0.45"
              step="0.02"
              value={displacement}
              onChange={(e) => setDisplacement(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Orbit Rotation ({rotationSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.2"
              max="3.0"
              step="0.2"
              value={rotationSpeed}
              onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Harmonic Harmonics (P / Q)</label>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  soundFx.playClick(600);
                  setPTorus((p) => (p === 2 ? 3 : p === 3 ? 5 : 2));
                }}
                className="flex-1 py-1 bg-zinc-800 rounded font-mono text-white text-xs border border-white/20 hover:border-cyan-400"
              >
                P: {pTorus}
              </button>
              <button
                onClick={() => {
                  soundFx.playClick(700);
                  setQTorus((q) => (q === 3 ? 4 : q === 4 ? 7 : 3));
                }}
                className="flex-1 py-1 bg-zinc-800 rounded font-mono text-white text-xs border border-white/20 hover:border-cyan-400"
              >
                Q: {qTorus}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Render Shader Mode</label>
            <button
              onClick={cycleMode}
              className="w-full py-1.5 px-3 rounded bg-cyan-950 border border-cyan-500/50 font-mono text-xs text-cyan-300 font-bold uppercase hover:bg-cyan-400 hover:text-black transition-colors"
            >
              Mode: {renderMode.toUpperCase()}
            </button>
          </div>
        </div>
      }
    >
      <div 
        ref={containerRef}
        className="relative w-full min-h-[90vh] bg-[#04060c] text-white flex flex-col justify-between overflow-hidden select-none"
      >
        {/* Real-time 3D Three.js WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 cursor-grab active:cursor-grabbing" />

        {/* Ambient Depth Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/90 pointer-events-none z-10" />

        {/* Top Mathematical Formula Header */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-cyan-400 bg-cyan-950/60 border border-cyan-800/60 px-2.5 py-1 rounded">
              <Orbit className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '10s' }} />
              <span>3D PARAMETRIC ENGINE: LIVE</span>
            </span>
            <span className="text-zinc-500 hidden sm:inline">|</span>
            <span className="text-zinc-400 font-mono hidden md:inline">
              TOPOLOGY: T({pTorus}, {qTorus}) KNOT
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-zinc-400">
            <span className="bg-white/5 px-2.5 py-1 rounded border border-white/10 text-cyan-300">
              DISPLACEMENT: {(displacement * 100).toFixed(0)}%
            </span>
            <button
              onClick={cycleMode}
              className="px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-white border border-white/20 uppercase text-[11px] font-bold transition-all"
              data-cursor="hover"
              data-cursor-text="SHADER"
            >
              {renderMode}
            </button>
          </div>
        </div>

        {/* Center Architectural Copy */}
        <div className="relative z-20 max-w-6xl mx-auto px-6 py-12 text-center my-auto pointer-events-none">
          {/* Formula pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/40 text-cyan-300 font-mono text-[11px] uppercase tracking-wider mb-6 pointer-events-auto">
            <Compass className="w-3.5 h-3.5" />
            <span>Harmonic Formula: R(u, v) = cos(qu) &times; [r + cos(pu)]</span>
          </div>

          <h1 
            className="font-['Syne'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight text-white leading-[0.92]"
            style={{ textShadow: '0 0 50px rgba(56, 189, 248, 0.4)' }}
          >
            QUANTUM <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400">GEOMETRY</span>
          </h1>

          <p className="mt-6 max-w-xl mx-auto font-['Plus_Jakarta_Sans'] text-sm sm:text-base text-zinc-300 font-light leading-relaxed drop-shadow-md">
            Interactive real-time 3D topology calculated directly on the GPU pipeline.
            Drag pointer across stage to impart angular momentum and ripple mathematical normals.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
            <button
              onClick={cycleMode}
              className="px-8 py-3.5 rounded-full bg-cyan-400 hover:bg-cyan-300 text-black font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-[0_0_30px_rgba(56,189,248,0.5)] transition-all"
              data-cursor="hover"
              data-cursor-text="TOGGLE"
            >
              <Layers className="w-4 h-4 fill-black" />
              <span>Switch Shading: {renderMode}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setPTorus(3);
                setQTorus(5);
              }}
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider backdrop-blur-xl border border-white/20 flex items-center gap-2 transition-all"
              data-cursor="hover"
              data-cursor-text="MORPH"
            >
              <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
              <span>Morph to T(3,5) Complex</span>
            </button>
          </div>
        </div>

        {/* Bottom Math Diagnostics Grid */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 bg-black/60 border border-white/10 rounded backdrop-blur-md">
            <span className="text-zinc-500 text-[10px] block uppercase">Polygon Count</span>
            <span className="font-['Syne'] text-lg font-bold text-cyan-300 mt-0.5 block">17,280 Faces</span>
            <span className="text-[10px] text-zinc-400">Full 32-bit Index</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 rounded backdrop-blur-md">
            <span className="text-zinc-500 text-[10px] block uppercase">Shader Pipeline</span>
            <span className="font-['Syne'] text-lg font-bold text-emerald-400 mt-0.5 block">Custom GLSL</span>
            <span className="text-[10px] text-zinc-400">Vertex Displacement</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 rounded backdrop-blur-md">
            <span className="text-zinc-500 text-[10px] block uppercase">Orbit Physics</span>
            <span className="font-['Syne'] text-lg font-bold text-amber-400 mt-0.5 block">Euler Inertia</span>
            <span className="text-[10px] text-zinc-400">0.05 Damping Factor</span>
          </div>

          <div className="p-3 bg-black/60 border border-white/10 rounded backdrop-blur-md">
            <span className="text-zinc-500 text-[10px] block uppercase">Active Harmonic</span>
            <span className="font-['Syne'] text-lg font-bold text-purple-400 mt-0.5 block">T({pTorus},{qTorus})</span>
            <span className="text-[10px] text-zinc-400">Double-Periodicity</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
