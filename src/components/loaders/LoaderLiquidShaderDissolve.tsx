import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { RotateCcw, Sparkles, Droplets, Sliders } from 'lucide-react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Loader_V02_LiquidShaderDissolve',
  name: 'Liquid Simplex Shader Dissolve & Spectral Edge Melt',
  category: 'Loader',
  batch: 'Batch 3: Immersive Page Loaders & Fluid Transitions',
  techStack: ['Next.js / React', 'Three.js / WebGL 2.0', 'Simplex GLSL Shader', 'Chromatic Fringe Edge'],
  aestheticVibe: 'Chromatic Liquid Gradient / Spectral Dissolve',
  interactionBlueprint: 'Procedural multi-octave simplex noise calculates a continuous threshold melt; the curtain disintegrates with iridescent RGB fringe aberration to reveal the underlying viewport.',
  description: 'A GLSL-powered transition shader that burns through a viscous chromatic liquid plane using procedural noise thresholds and dynamic spectral edge glow.',
  tags: ['GLSL Shader', 'Liquid Melt', 'Simplex Noise', 'Chromatic Aberration', 'Preloader'],
  codeSnippet: `// GLSL Simplex Noise Dissolve with Chromatic Fringe Edge
float noise = snoise(vUv * uNoiseScale);
float burn = smoothstep(uProgress - 0.05, uProgress + 0.05, noise);

// Chromatic edge glow calculation
float edge = 1.0 - abs(noise - uProgress) * 15.0;
vec3 edgeColor = vec3(1.0, 0.2, 0.6) * max(edge, 0.0);

vec4 texColor = mix(vec4(0.05, 0.06, 0.1, 1.0), vec4(0.0), burn);
gl_FragColor = texColor + vec4(edgeColor, edge * (1.0 - burn));`,
};

// Simplex Noise GLSL Fragment Shader for Liquid Burn
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uProgress;
  uniform float uNoiseScale;
  uniform float uEdgeWidth;
  varying vec2 vUv;

  // 2D Simplex Noise generator
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Multi-octave turbulence
    float n1 = snoise(vUv * uNoiseScale + vec2(uTime * 0.1, uTime * 0.05));
    float n2 = snoise(vUv * uNoiseScale * 2.0 - vec2(uTime * 0.08));
    float combinedNoise = (n1 * 0.6 + n2 * 0.4) * 0.5 + 0.5;

    // Dissolve threshold calculation
    float threshold = uProgress * 1.4 - 0.2;
    float dissolve = smoothstep(threshold - 0.04, threshold + 0.04, combinedNoise);

    // Chromatic Spectral Burn Edge
    float dist = abs(combinedNoise - threshold);
    float edge = smoothstep(uEdgeWidth, 0.0, dist);

    // RGB Split edge glow
    vec3 neonEdge = vec3(
      sin(vUv.x * 6.0 + uTime) * 0.5 + 0.5,
      sin(vUv.y * 6.0 + uTime + 2.0) * 0.5 + 0.5,
      1.0
    ) * edge * 2.5;

    // Background plane color behind burn
    vec4 curtainColor = vec4(0.04, 0.05, 0.08, 1.0);
    
    // Alpha transparency: dissolve drops the curtain away
    float alpha = 1.0 - dissolve;
    if (uProgress >= 1.0) alpha = 0.0;

    gl_FragColor = vec4(curtainColor.rgb + neonEdge, alpha);
  }
`;

export default function LoaderLiquidShaderDissolve() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Tunable parameters
  const [noiseScale, setNoiseScale] = useState(3.5);
  const [edgeGlow, setEdgeGlow] = useState(0.08);

  const uniformsRef = useRef<{
    uTime: { value: number };
    uProgress: { value: number };
    uNoiseScale: { value: number };
    uEdgeWidth: { value: number };
  }>({
    uTime: { value: 0 },
    uProgress: { value: 0 },
    uNoiseScale: { value: 3.5 },
    uEdgeWidth: { value: 0.08 },
  });

  // Replay trigger
  const runPreloader = () => {
    soundFx.playChime(550, 0.2);
    setIsRunning(true);
    setProgress(0);

    let p = 0;
    const timer = setInterval(() => {
      p += 0.015;
      setProgress(Math.min(Math.round(p * 100), 100));
      uniformsRef.current.uProgress.value = Math.min(p, 1.0);

      if (p >= 1.0) {
        clearInterval(timer);
        setIsRunning(false);
        soundFx.playChime(900, 0.4);
      }
    }, 25);
  };

  useEffect(() => {
    uniformsRef.current.uNoiseScale.value = noiseScale;
    uniformsRef.current.uEdgeWidth.value = edgeGlow;
  }, [noiseScale, edgeGlow]);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
      transparent: true,
      depthWrite: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      uniformsRef.current.uTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };
    animate();

    // Kickoff initial sequence
    runPreloader();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
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
              Simplex Melt Scale ({noiseScale.toFixed(1)})
            </label>
            <input
              type="range"
              min="1.5"
              max="7.0"
              step="0.2"
              value={noiseScale}
              onChange={(e) => setNoiseScale(parseFloat(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Spectral Edge Width ({edgeGlow.toFixed(2)})
            </label>
            <input
              type="range"
              min="0.02"
              max="0.18"
              step="0.01"
              value={edgeGlow}
              onChange={(e) => setEdgeGlow(parseFloat(e.target.value))}
              className="w-full accent-pink-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={runPreloader}
              disabled={isRunning}
              className="w-full py-1.5 px-3 rounded bg-pink-500 disabled:opacity-50 text-white font-mono text-xs font-bold uppercase hover:bg-pink-400 transition-colors flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Trigger Liquid Melt ({progress}%)</span>
            </button>
          </div>
        </div>
      }
    >
      <div className="relative w-full min-h-[85vh] bg-[#04060b] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10">
        {/* Underlying Stage Revealed by Liquid Dissolve */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 my-auto text-center">
          <div className="w-12 h-12 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 flex items-center justify-center mx-auto mb-6">
            <Droplets className="w-6 h-6 animate-pulse" />
          </div>

          <h3 className="font-['Syne'] text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
            ORGANIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">FLUID DISSOLVE</span>
          </h3>

          <p className="mt-4 font-['Plus_Jakarta_Sans'] text-zinc-300 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            The WebGL simplex shader threshold dissolves the surface layer, casting chromatic RGB edge aberrations as the viewport emerges.
          </p>

          <div className="mt-8">
            <button
              onClick={runPreloader}
              className="px-8 py-3.5 rounded-full bg-pink-500 hover:bg-pink-400 text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all"
              data-cursor="hover"
            >
              Re-Dissolve Stage
            </button>
          </div>
        </div>

        {/* GLSL Liquid Curtain WebGL Canvas Layer */}
        <div 
          ref={mountRef} 
          className="absolute inset-0 z-20 pointer-events-none"
        />

        {/* Overlay Telemetry HUD Display during Dissolve */}
        {progress < 100 && (
          <div className="absolute top-8 left-8 z-30 font-mono text-xs text-pink-300 flex items-center gap-3 pointer-events-none bg-black/60 px-3 py-1.5 rounded border border-pink-500/30 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span>SPECTRAL BURN: {progress}%</span>
          </div>
        )}
      </div>
    </BlueprintHUD>
  );
}
