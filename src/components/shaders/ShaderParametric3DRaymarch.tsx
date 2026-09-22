import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sliders, Sparkles, Box, RefreshCw, Zap, Eye, RotateCw } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'shader_v05_parametric3draymarch',
  name: 'Parametric 3D Raymarched Metaballs & SDF Liquid Chrome',
  category: 'Shader',
  batch: 'Batch 10: Interactive Shaders, Frosted Optical Caustics & Spatial Refraction FX',
  techStack: ['React 19', 'Three.js WebGL', 'Signed Distance Field (SDF)', 'Raymarching Fragment Shader', 'Smooth-Min (smin) Blending', 'Analytical Normals'],
  aestheticVibe: 'Parametric WebGL 3D Raymarching / Liquid Mirror Chrome',
  interactionBlueprint: 'Full-screen GPU raymarching fragment shader computing analytical sphere distance fields in 3D space. Orbits multiple parametric liquid blobs fused through polynomial smooth-minimum functions. Cursor movement exerts gravitational pull on the central chrome node with dynamic camera parallax.',
  description: 'GPU-accelerated 3D raymarching shader rendering fluid metallic metaballs that coalesce under surface tension, with real-time Fresnel rim caustics, analytical gradient normals, and customizable matcap reflection shaders.',
  codeSnippet: `// Polynomial smooth minimum (smin) for SDF metaballs
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * (1.0 / 4.0);
}

// Distance estimator
float mapScene(vec3 p) {
  float d1 = length(p - sphere1Pos) - radius1;
  float d2 = length(p - sphere2Pos) - radius2;
  return smin(d1, d2, u_blend);
}`,
  tags: ['Shader', 'Raymarching', 'SDF', 'Metaballs', 'Three.js', 'WebGL', 'Chrome', '3D'],
};

// GLSL Vertex Shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

// GLSL Raymarching Fragment Shader
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_blend;
uniform int u_style; // 0: Chrome, 1: Pearl, 2: Cyber, 3: Gold
uniform int u_max_steps;
varying vec2 vUv;

// Polynomial smooth-min
float smin(float a, float b, float k) {
  float h = max(k - abs(a - b), 0.0) / k;
  return min(a, b) - h * h * k * (1.0 / 4.0);
}

// Scene distance function
float map(vec3 p) {
  float t = u_time * 0.9;
  
  // Central core attracted to mouse
  vec3 center = vec3(u_mouse.x * 1.6, u_mouse.y * 1.6, 0.0);
  float d = length(p - center) - 0.72;

  // Orbiting satellite blobs
  vec3 p1 = vec3(cos(t * 1.2) * 1.3, sin(t * 1.5) * 1.0, sin(t * 0.9) * 0.7);
  float d1 = length(p - p1) - 0.52;

  vec3 p2 = vec3(cos(t * 0.8 + 2.0) * 1.4, sin(t * 1.1 + 1.0) * 1.2, cos(t * 1.4) * 0.8);
  float d2 = length(p - p2) - 0.44;

  vec3 p3 = vec3(sin(t * 1.4 + 4.0) * 1.1, cos(t * 0.7 + 3.0) * 1.3, sin(t * 1.3) * 0.9);
  float d3 = length(p - p3) - 0.38;

  d = smin(d, d1, u_blend);
  d = smin(d, d2, u_blend);
  d = smin(d, d3, u_blend);

  return d;
}

// Compute normal via tetra-gradient
vec3 calcNormal(vec3 p) {
  const float h = 0.001;
  const vec2 k = vec2(1.0, -1.0);
  return normalize(
    k.xyy * map(p + k.xyy * h) +
    k.yyx * map(p + k.yyx * h) +
    k.yxy * map(p + k.yxy * h) +
    k.xxx * map(p + k.xxx * h)
  );
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

  // Camera setup
  vec3 ro = vec3(0.0, 0.0, 3.4);
  vec3 rd = normalize(vec3(uv, -1.5));

  // Raymarching loop
  float t = 0.0;
  float hit = -1.0;
  for (int i = 0; i < 96; i++) {
    if (i >= u_max_steps) break;
    vec3 p = ro + rd * t;
    float d = map(p);
    if (d < 0.002) {
      hit = t;
      break;
    }
    t += d * 0.85; // cautious ray step
    if (t > 7.0) break;
  }

  // Background gradient
  vec3 col = mix(vec3(0.03, 0.04, 0.06), vec3(0.01, 0.01, 0.02), length(uv));

  if (hit > 0.0) {
    vec3 p = ro + rd * hit;
    vec3 n = calcNormal(p);
    vec3 r = reflect(rd, n);

    // Fresnel factor
    float fresnel = pow(clamp(1.0 + dot(rd, n), 0.0, 1.0), 3.0);

    // Studio key lights
    vec3 lightDir1 = normalize(vec3(1.0, 1.5, 2.0));
    vec3 lightDir2 = normalize(vec3(-1.5, -1.0, 1.5));

    float diff1 = max(dot(n, lightDir1), 0.0);
    float diff2 = max(dot(n, lightDir2), 0.0) * 0.4;
    float spec1 = pow(max(dot(r, lightDir1), 0.0), 32.0);
    float spec2 = pow(max(dot(r, lightDir2), 0.0), 16.0);

    if (u_style == 0) {
      // Liquid Mirror Chrome
      vec3 chromeReflect = vec3(0.85, 0.88, 0.92) * (diff1 + diff2 * 0.6);
      chromeReflect += vec3(1.0, 1.0, 1.0) * (spec1 * 1.2 + spec2 * 0.6);
      chromeReflect += vec3(0.3, 0.6, 1.0) * fresnel;
      col = chromeReflect;
    } else if (u_style == 1) {
      // Iridescent Pearl
      vec3 irid = 0.5 + 0.5 * cos(u_time * 0.5 + n.xyx * 3.0 + vec3(0.0, 2.0, 4.0));
      col = mix(vec3(0.9, 0.85, 0.9), irid, 0.6) * (diff1 + 0.3);
      col += vec3(1.0) * spec1 * 0.8;
      col += irid * fresnel * 1.5;
    } else if (u_style == 2) {
      // Cyber Neon Dark
      col = vec3(0.08, 0.09, 0.12) * (diff1 + 0.2);
      col += vec3(0.0, 1.0, 0.8) * spec1 * 1.4;
      col += vec3(1.0, 0.0, 0.4) * fresnel * 2.2;
    } else {
      // Molten Vermeil Gold
      vec3 gold = vec3(0.95, 0.75, 0.25);
      col = gold * (diff1 * 0.8 + 0.2);
      col += vec3(1.0, 0.95, 0.8) * spec1 * 1.4;
      col += vec3(1.0, 0.85, 0.3) * fresnel * 1.2;
    }
  }

  gl_FragColor = vec4(col, 1.0);
}
`;

export default function ShaderParametric3DRaymarch() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Shader Parameters
  const [blendFactor, setBlendFactor] = useState<number>(0.55); // 0.1 to 1.2
  const [matcapStyle, setMatcapStyle] = useState<number>(0); // 0: Chrome, 1: Pearl, 2: Cyber, 3: Gold
  const [maxSteps, setMaxSteps] = useState<number>(64); // 32 to 96
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  const uniformsRef = useRef<{
    u_time: { value: number };
    u_resolution: { value: THREE.Vector2 };
    u_mouse: { value: THREE.Vector2 };
    u_blend: { value: number };
    u_style: { value: number };
    u_max_steps: { value: number };
  }>({
    u_time: { value: 0 },
    u_resolution: { value: new THREE.Vector2(800, 500) },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_blend: { value: 0.55 },
    u_style: { value: 0 },
    u_max_steps: { value: 64 },
  });

  const mouseTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    uniformsRef.current.u_blend.value = blendFactor;
    uniformsRef.current.u_style.value = matcapStyle;
    uniformsRef.current.u_max_steps.value = maxSteps;
  }, [blendFactor, matcapStyle, maxSteps]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });

    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    uniformsRef.current.u_resolution.value.set(
      container.clientWidth * renderer.getPixelRatio(),
      container.clientHeight * renderer.getPixelRatio()
    );

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: uniformsRef.current,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      uniformsRef.current.u_time.value += delta;

      // Mouse spring inertia
      const curMouse = uniformsRef.current.u_mouse.value;
      curMouse.x += (mouseTargetRef.current.x - curMouse.x) * 0.08;
      curMouse.y += (mouseTargetRef.current.y - curMouse.y) * 0.08;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize observer
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniformsRef.current.u_resolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    };
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseTargetRef.current.x = nx;
      mouseTargetRef.current.y = ny;
    };

    container.addEventListener('mousemove', handlePointerMove);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full py-8 px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
        {/* Header HUD */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-sky-400 font-bold tracking-widest uppercase mb-1">
              <Box className="w-4 h-4 text-sky-400" />
              <span>BATCH 10 // VARIATION 50 &bull; WEBGL 3D RAYMARCHING</span>
            </div>
            <h2 className="font-['Syne'] text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Parametric 3D Raymarched Metaballs &amp; SDF Liquid Chrome
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(700);
                setMatcapStyle(0);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                matcapStyle === 0
                  ? 'bg-white text-black border-white font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Liquid Mirror Chrome
            </button>

            <button
              onClick={() => {
                soundFx.playClick(750);
                setMatcapStyle(1);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                matcapStyle === 1
                  ? 'bg-pink-400 text-black border-pink-300 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Iridescent Pearl
            </button>

            <button
              onClick={() => {
                soundFx.playClick(800);
                setMatcapStyle(2);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                matcapStyle === 2
                  ? 'bg-rose-500 text-white border-rose-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Cyber Neon Dark
            </button>

            <button
              onClick={() => {
                soundFx.playClick(850);
                setMatcapStyle(3);
              }}
              className={`px-3 py-1.5 rounded font-mono text-xs border transition-colors ${
                matcapStyle === 3
                  ? 'bg-amber-400 text-black border-amber-400 font-bold'
                  : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
              }`}
              data-cursor="hover"
            >
              Molten Gold
            </button>
          </div>
        </div>

        {/* Canvas & Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div
            ref={containerRef}
            className="lg:col-span-3 rounded-xl border border-sky-400/20 bg-black overflow-hidden relative shadow-2xl h-[460px] sm:h-[520px]"
            title="Move pointer across canvas to apply gravitational magnetic pull on the central chrome metaball"
            data-cursor="drag"
          >
            {/* In-canvas watermark */}
            <div className="absolute bottom-3 left-4 pointer-events-none flex items-center gap-3 font-mono text-[11px] text-sky-200/80 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-sky-400/20">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-sky-400" />
                SDF SMOOTH-MIN: k = {blendFactor.toFixed(2)}
              </span>
              <span className="text-zinc-600">|</span>
              <span>STEPS: {maxSteps}</span>
              <span className="text-zinc-600">|</span>
              <span>STYLE: #{matcapStyle}</span>
            </div>
          </div>

          {/* Controls HUD */}
          <div className="p-5 rounded-xl border border-white/10 bg-zinc-950/80 backdrop-blur-md flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase pb-3 border-b border-white/10 mb-4">
                <Sliders className="w-4 h-4 text-sky-400" />
                <span>Raymarching Math</span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Smooth-Min Blend (k):</span>
                    <strong className="text-sky-400">{blendFactor.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.1"
                    step="0.05"
                    value={blendFactor}
                    onChange={(e) => {
                      soundFx.playTick(800);
                      setBlendFactor(parseFloat(e.target.value));
                    }}
                    className="w-full accent-sky-400 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-zinc-600">
                    <span>Discrete (0.1)</span>
                    <span>Viscous (0.55)</span>
                    <span>Fused (1.1)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-zinc-400">Max Ray Steps:</span>
                    <strong className="text-amber-400">{maxSteps} steps</strong>
                  </div>
                  <input
                    type="range"
                    min="32"
                    max="96"
                    step="8"
                    value={maxSteps}
                    onChange={(e) => {
                      soundFx.playTick(850);
                      setMaxSteps(parseInt(e.target.value));
                    }}
                    className="w-full accent-amber-400 cursor-pointer"
                  />
                  <span className="text-[10px] font-mono text-zinc-500">March iterations per pixel ray</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs font-mono text-zinc-400 space-y-2">
              <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                <RotateCw className="w-3.5 h-3.5" />
                <span>GPU Gravitational Pull:</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Move your cursor across the viewport to pull the primary chrome sphere with continuous distance field interpolation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BlueprintHUD>
);
}
