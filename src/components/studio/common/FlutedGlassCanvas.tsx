import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FlutedGlassCanvasProps {
  className?: string;
  fluteDensity?: number;
  refractionStrength?: number;
  chromaticAberration?: number;
  lightHue?: number;
  interactive?: boolean;
}

export default function FlutedGlassCanvas({
  className = '',
  fluteDensity = 36.0,
  refractionStrength = 0.045,
  chromaticAberration = 0.018,
  lightHue = 0.65, // Cyan-violet spectrum
  interactive = true,
}: FlutedGlassCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Custom WebGL Fluted Glass Shader with Mouse Refraction & Chromatic Dispersion
    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uFluteDensity;
      uniform float uRefraction;
      uniform float uChromatic;

      // Noise generator for soft caustics
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float smoothNoise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      void main() {
        vec2 uv = vUv;
        vec2 aspectUv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
        vec2 mouseNorm = (uMouse.xy / uResolution.xy) * 2.0 - 1.0;
        mouseNorm.y *= -1.0; // Correct WebGL Y-axis inversion

        // 1. Compute Fluted Ribs Normal Displacements
        // Sinusoidal vertical cylinders across X axis
        float fluteWave = sin(uv.x * uFluteDensity * 3.14159);
        float ribNormalX = cos(uv.x * uFluteDensity * 3.14159);
        
        // Dynamic mouse spotlight displacement
        float distToMouse = length(aspectUv - mouseNorm * 0.5);
        float mouseInfluence = smoothstep(0.8, 0.0, distToMouse);

        // Combined optical refraction offset
        float disp = ribNormalX * uRefraction * (1.0 + mouseInfluence * 1.5);

        // 2. Chromatic Aberration: Separate Red, Green, Blue Channels
        vec2 uvR = uv + vec2(disp * (1.0 + uChromatic), disp * 0.2);
        vec2 uvG = uv + vec2(disp, 0.0);
        vec2 uvB = uv + vec2(disp * (1.0 - uChromatic), -disp * 0.2);

        // 3. Procedural Background Aurora / Studio Glow Behind Glass
        vec3 bgR = vec3(0.48, 0.22, 0.92); // Violet energy
        vec3 bgG = vec3(0.13, 0.82, 0.93); // Cyan signal
        vec3 bgB = vec3(0.72, 1.0, 0.24);  // Lime micro-sparkle

        // Internal light beam driven by mouse angle
        vec2 lightDir = normalize(aspectUv - mouseNorm * 0.6);
        float specularFlute = pow(clamp(dot(vec2(ribNormalX, 0.4), lightDir), 0.0, 1.0), 16.0);
        float caustics = smoothNoise(uv * 8.0 + uTime * 0.2) * 0.25;

        // Dynamic gradient colors
        float beam = 0.5 + 0.5 * sin(uv.y * 3.0 + uTime * 0.8 + mouseInfluence * 2.0);
        vec3 col;
        col.r = mix(0.04, 0.55, sin(uvR.x * 2.0 + uTime * 0.3) * 0.5 + 0.5) + specularFlute * 0.6;
        col.g = mix(0.05, 0.75, cos(uvG.y * 3.0 - uTime * 0.4) * 0.5 + 0.5) + specularFlute * 0.9;
        col.b = mix(0.08, 0.95, sin(uvB.x * 4.0 + uvB.y * 2.0) * 0.5 + 0.5) + specularFlute * 1.0;

        // Add soft dark obsidian ground
        vec3 ground = vec3(0.04, 0.04, 0.06);
        vec3 finalColor = mix(ground, col, 0.55 + mouseInfluence * 0.35 + caustics);

        // Subtle rib shadow in the troughs of fluted glass
        float ribGrooveShadow = 1.0 - abs(fluteWave) * 0.35;
        finalColor *= ribGrooveShadow;

        // Frosted glass edge vignetting
        float edgeVignette = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x) *
                             smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

        gl_FragColor = vec4(finalColor, 0.88 * edgeVignette);
      }
    `;

    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(width * 0.5, height * 0.5) },
      uFluteDensity: { value: fluteDensity },
      uRefraction: { value: refractionStrength },
      uChromatic: { value: chromaticAberration },
    };
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      blending: THREE.NormalBlending,
    });

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);

    // Mouse Move Interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive || !uniformsRef.current) return;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      uniformsRef.current.uMouse.value.set(x, y);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (uniformsRef.current) {
        uniformsRef.current.uTime.value = clock.getElapsedTime();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !renderer || !uniformsRef.current) return;
      const newW = container.clientWidth || 400;
      const newH = container.clientHeight || 300;
      renderer.setSize(newW, newH);
      uniformsRef.current.uResolution.value.set(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      material.dispose();
      quad.geometry.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [fluteDensity, refractionStrength, chromaticAberration, interactive]);

  return (
    <div
      ref={mountRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] ${className}`}
    />
  );
}
