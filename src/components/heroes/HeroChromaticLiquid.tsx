import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Sparkles, ArrowUpRight, Zap, Play } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Hero_V01_ChromaticLiquidMesh',
  name: 'Chromatic Liquid Mesh Shader',
  category: 'Hero',
  batch: 'Batch 1: Next.js Hero Sections',
  techStack: ['Next.js / React', 'Three.js (GLSL)', 'Simplex Noise', 'Motion Physics'],
  aestheticVibe: 'Chromatic Liquid Gradient / Organic Fluidity',
  interactionBlueprint: 'Fluid simplex turbulence shader responds to pointer inertia with dynamic RGB chromatic aberration; magnetic micro-interactions on CTAs.',
  description: 'A procedural GLSL-driven liquid gradient canvas computing real-time turbulence, mouse inertia distortion, and multi-band spectral refractions beneath glassmorphic editorial typography.',
  tags: ['WebGL', 'GLSL', 'Chromatic Aberration', 'Simplex Noise', 'Interactive Canvas'],
  codeSnippet: `// GLSL Fragment Shader - Multi-Frequency Simplex Noise with Chromatic Split
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uNoiseScale;
uniform float uAberration;

// Permutation polynomial simplex noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * uNoiseScale;
  vec2 m = (uMouse / uResolution) - 0.5;
  p += m * 1.5;

  float n1 = snoise(p + vec2(uTime * 0.2, uTime * 0.15));
  float n2 = snoise(p * 1.5 - vec2(uTime * 0.1, n1 * 0.8));

  // Chromatic RGB displacement split
  float r = snoise(p + vec2(uAberration, 0.0) + n2);
  float g = snoise(p + n2);
  float b = snoise(p - vec2(uAberration, 0.0) + n2);

  vec3 col = vec3(
    0.5 + 0.5 * sin(r * 3.14 + 1.2),
    0.2 + 0.5 * sin(g * 3.14 + 2.8),
    0.7 + 0.4 * sin(b * 3.14 + 4.2)
  );

  gl_FragColor = vec4(col * 0.85, 1.0);
}`,
};

const vertexShader = `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uNoiseScale;
uniform float uAberration;
uniform int uPalette;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m; m = m*m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv * uNoiseScale;
  vec2 m = (uMouse / uResolution) - 0.5;
  p += m * 1.8;

  float n1 = snoise(p + vec2(uTime * 0.15, uTime * 0.12));
  float n2 = snoise(p * 1.4 - vec2(uTime * 0.08, n1 * 0.7));

  float r = snoise(p + vec2(uAberration, 0.0) + n2 * 0.8);
  float g = snoise(p + n2 * 0.8);
  float b = snoise(p - vec2(uAberration, 0.0) + n2 * 0.8);

  vec3 col = vec3(0.0);

  if (uPalette == 0) {
    // Liquid Chromatic Twilight
    col = vec3(
      0.45 + 0.55 * sin(r * 2.5 + 0.8),
      0.15 + 0.45 * sin(g * 2.8 + 2.4),
      0.65 + 0.35 * sin(b * 3.0 + 4.5)
    );
  } else if (uPalette == 1) {
    // Solar Amber & Deep Indigo
    col = vec3(
      0.75 + 0.25 * sin(r * 3.0 + 1.0),
      0.45 + 0.40 * sin(g * 2.5 + 1.8),
      0.20 + 0.30 * sin(b * 3.2 + 3.8)
    );
  } else {
    // Cyber Emerald & Electric Violet
    col = vec3(
      0.15 + 0.35 * sin(r * 2.8 + 2.0),
      0.70 + 0.30 * sin(g * 2.4 + 1.2),
      0.55 + 0.45 * sin(b * 3.0 + 4.0)
    );
  }

  // Soft vignette
  float d = distance(uv, vec2(0.5));
  col *= (1.0 - d * 0.4);

  gl_FragColor = vec4(col * 0.75, 1.0);
}
`;

export default function HeroChromaticLiquid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Live tunable engine parameters
  const [speed, setSpeed] = useState<number>(1.0);
  const [noiseScale, setNoiseScale] = useState<number>(2.2);
  const [aberration, setAberration] = useState<number>(0.04);
  const [palette, setPalette] = useState<number>(0);

  // Magnetic button offset ref
  const [ctaOffset, setCtaOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uMouse: { value: new THREE.Vector2() },
      uNoiseScale: { value: noiseScale },
      uAberration: { value: aberration },
      uPalette: { value: palette },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      uniforms.uResolution.value.set(width, height);
    };
    handleResize();

    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    let targetMouseX = window.innerWidth / 2;
    let targetMouseY = window.innerHeight / 2;
    let currentMouseX = targetMouseX;
    let currentMouseY = targetMouseY;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = rect.height - (e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let animationId: number;
    let clock = new THREE.Clock();

    const renderLoop = () => {
      // Smooth inertia on mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.06;
      currentMouseY += (targetMouseY - currentMouseY) * 0.06;

      uniforms.uTime.value += clock.getDelta() * speed;
      uniforms.uMouse.value.set(currentMouseX, currentMouseY);
      uniforms.uNoiseScale.value = noiseScale;
      uniforms.uAberration.value = aberration;
      uniforms.uPalette.value = palette;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [speed, noiseScale, aberration, palette]);

  const handleCtaMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.35;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.35;
    setCtaOffset({ x, y });
  };

  const handleCtaMouseLeave = () => {
    setCtaOffset({ x: 0, y: 0 });
  };

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Turbulence Speed ({speed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.1"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Noise Granularity ({noiseScale.toFixed(1)})
            </label>
            <input
              type="range"
              min="0.8"
              max="5.0"
              step="0.2"
              value={noiseScale}
              onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              RGB Aberration ({(aberration * 100).toFixed(0)}%)
            </label>
            <input
              type="range"
              min="0.0"
              max="0.12"
              step="0.01"
              value={aberration}
              onChange={(e) => setAberration(parseFloat(e.target.value))}
              className="w-full accent-amber-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">Spectral Palette</label>
            <select
              value={palette}
              onChange={(e) => setPalette(parseInt(e.target.value))}
              className="w-full bg-zinc-900 border border-white/20 rounded px-2 py-1 text-white font-mono text-xs focus:outline-none focus:border-amber-400"
            >
              <option value={0}>01: Chromatic Twilight</option>
              <option value={1}>02: Solar Amber & Indigo</option>
              <option value={2}>03: Electric Emerald & Violet</option>
            </select>
          </div>
        </div>
      }
    >
      <div ref={containerRef} className="relative w-full h-full min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Real-time WebGL Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover" />

        {/* Ambient Dark Grain Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/80 pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 flex flex-col items-center text-center">
          {/* Kinetic Pill Tag */}
          <div 
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 shadow-2xl"
            data-cursor="hover"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="font-mono text-xs tracking-wider uppercase text-zinc-200 font-semibold">
              WebGL 2.0 Real-Time Fluid Synthesis
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <h1 
            className="font-['Syne'] text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-white uppercase leading-[0.95] max-w-5xl select-none"
            style={{ textShadow: '0 10px 40px rgba(0,0,0,0.6)' }}
          >
            Organic <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-pink-400 to-cyan-300">Fluidity</span> Redefined
          </h1>

          {/* Subtitle with High-contrast Readability */}
          <p className="mt-8 max-w-2xl text-base sm:text-lg text-zinc-300 font-light leading-relaxed font-['Plus_Jakarta_Sans'] drop-shadow-md">
            Unleashing computational fluid dynamics through custom GLSL simplex kernels.
            Every cursor movement ripples through spectral wavelengths with real-time inertia.
          </p>

          {/* Interactive CTAs with Magnetic Physics */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onMouseMove={handleCtaMouseMove}
              onMouseLeave={handleCtaMouseLeave}
              onClick={() => soundFx.playChime(640)}
              style={{
                transform: `translate3d(${ctaOffset.x}px, ${ctaOffset.y}px, 0)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="group relative px-8 py-4 rounded-full bg-white text-black font-bold font-['Plus_Jakarta_Sans'] text-sm tracking-wide flex items-center gap-2 shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:bg-amber-300 transition-colors"
              data-cursor="hover"
              data-cursor-text="LAUNCH"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>Explore Fluid Engine</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            <button
              onClick={() => {
                soundFx.playClick(500);
                setPalette((p) => (p + 1) % 3);
              }}
              className="px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider backdrop-blur-xl border border-white/20 flex items-center gap-2 transition-all shadow-lg"
              data-cursor="hover"
              data-cursor-text="SHIFT"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>Cycle Spectral Map</span>
            </button>
          </div>

          {/* Floating Telemetry Stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl w-full">
            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-left">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Fragment Shaders</span>
              <span className="font-['Syne'] text-2xl font-bold text-white mt-1 block">60 FPS</span>
              <span className="font-mono text-[10px] text-emerald-400 mt-1 block">GPU Accelerated</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-left">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Dispersion Math</span>
              <span className="font-['Syne'] text-2xl font-bold text-white mt-1 block">Simplex 2D</span>
              <span className="font-mono text-[10px] text-cyan-400 mt-1 block">Zero Asset Weight</span>
            </div>

            <div className="p-4 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-left col-span-2 sm:col-span-1">
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider block">Inertia Physics</span>
              <span className="font-['Syne'] text-2xl font-bold text-white mt-1 block">0.06 LERP</span>
              <span className="font-mono text-[10px] text-amber-400 mt-1 block">Sub-pixel Smooth</span>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
