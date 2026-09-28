import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Box, Sparkles, RefreshCw, Sliders, Maximize2, Compass, Layers, ShieldCheck, Lamp } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v06_persiangeometricmuqarnas',
  name: '3D Authentic Persian Muqarnas Geometry & Stained-Glass Orsi Lantern',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: ['Three.js WebGL', 'GLTF PBR Architecture', 'Parametric Muqarnas Vaults', 'Orsi Chromatic Dispersion', 'Orbit Controls'],
  aestheticVibe: 'Persian Parametric Architecture & Chromatic Orsi Geometry',
  interactionBlueprint: 'Interactive 3D WebGL rendering of historic Iranian Muqarnas tier vaults with an authentic oriental filigree lantern, real-time light refraction, and full 360-degree orbit inspection.',
  description: 'مدل‌سازی سه‌بعدی پیشرفته WebGL از طاق‌های مقرنس ایرانی، همراه با فانوس مشبک اصیل قاجاری، شکست نور کروماتیک ارسی، و قابلیت چرخش ۳۶۰ درجه با ماوس.',
  codeSnippet: `// 3D WebGL Muqarnas Vault & GLTF Lantern
const gltfLoader = new GLTFLoader();
gltfLoader.load('/models/Lantern.glb', (gltf) => {
  scene.add(gltf.scene);
});`,
  tags: ['Spatial', '3D', 'Muqarnas', 'Orsi', 'Persian', 'Parametric', 'Geometry', 'WebGL'],
};

export default function SpatialPersianGeometricMuqarnas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<'LANTERN' | 'SCULPTURE'>('LANTERN');
  const [lightMode, setLightMode] = useState<'ORSI_RAINBOW' | 'PERSIAN_TURQUOISE' | 'GOLDEN_DESERT'>('ORSI_RAINBOW');
  const [isAutoSpin, setIsAutoSpin] = useState<boolean>(true);
  const [wireframeOnly, setWireframeOnly] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const vaultMatRef = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const currentModelRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 700;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.035);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 14;
    controls.minDistance = 2.5;

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1322, 1.8);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0xffaa44, 4.0, 20);
    mainLight.position.set(0, 3.5, 2);
    scene.add(mainLight);

    const accentLight = new THREE.PointLight(0x00f0ff, 3.5, 18);
    accentLight.position.set(3, -2, 3);
    scene.add(accentLight);

    // 1. Parametric 3D Muqarnas Tier Vault Ceiling
    const vaultGroup = new THREE.Group();
    vaultGroup.position.set(0, 1.5, 0);

    const vaultMat = new THREE.MeshPhysicalMaterial({
      color: 0x12141c,
      emissive: 0x22d3ee,
      emissiveIntensity: 0.15,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.9,
      wireframe: wireframeOnly,
    });
    vaultMatRef.current = vaultMat;

    const tiers = 4;
    const facetGeom = new THREE.ConeGeometry(0.35, 0.75, 4);

    for (let t = 0; t < tiers; t++) {
      const radius = 1.2 + t * 0.7;
      const count = 12 + t * 6;
      const y = t * 0.45;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        const mesh = new THREE.Mesh(facetGeom, vaultMat);
        mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
        mesh.rotation.set(Math.PI, angle + Math.PI / 4, 0);
        vaultGroup.add(mesh);
      }
    }
    scene.add(vaultGroup);

    // 2. Load Free Authentic 3D Models (Lantern / Classical Sculpture)
    const gltfLoader = new GLTFLoader();
    const modelPath = modelType === 'LANTERN' ? '/models/Lantern.glb' : '/models/Nefertiti.glb';

    gltfLoader.load(modelPath, (gltf) => {
      if (currentModelRef.current) {
        scene.remove(currentModelRef.current);
      }
      const model = gltf.scene;
      currentModelRef.current = model;

      if (modelType === 'LANTERN') {
        model.position.set(0, 0.2, 0);
        model.scale.setScalar(0.028);
      } else {
        model.position.set(0, -0.6, 0);
        model.scale.setScalar(1.2);
      }

      model.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(model);
    });

    // 3. Orsi Stained Glass Prismatic Particles
    const particleCount = 200;
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(0x22d3ee);
    const c2 = new THREE.Color(0xd4af37);
    const c3 = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;

      const pick = Math.random();
      const c = pick < 0.4 ? c1 : pick < 0.7 ? c2 : c3;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    scene.add(particles);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (isAutoSpin && currentModelRef.current) {
        currentModelRef.current.rotation.y = elapsed * 0.4;
      }

      vaultGroup.rotation.y = elapsed * 0.05;
      particles.rotation.y = elapsed * 0.03;

      controls.update();
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
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType, isAutoSpin, wireframeOnly]);

  // Handle Light Mode change
  useEffect(() => {
    if (!vaultMatRef.current) return;
    if (lightMode === 'ORSI_RAINBOW') {
      vaultMatRef.current.emissive.setHex(0xa855f7);
      vaultMatRef.current.emissiveIntensity = 0.25;
    } else if (lightMode === 'PERSIAN_TURQUOISE') {
      vaultMatRef.current.emissive.setHex(0x06b6d4);
      vaultMatRef.current.emissiveIntensity = 0.35;
    } else {
      vaultMatRef.current.emissive.setHex(0xd4af37);
      vaultMatRef.current.emissiveIntensity = 0.3;
    }
  }, [lightMode]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="relative w-full h-[540px] bg-[#05070e] rounded-3xl overflow-hidden border border-[#202027] flex flex-col justify-between p-6 select-none font-['Plus_Jakarta_Sans','Vazirmatn']">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#d4af37] font-bold">
                AUTHENTIC 3D ASSETS // GLTF PBR MUQARNAS
              </span>
            </div>
            <h3 className="font-['Lalezar'] text-xl sm:text-2xl text-white mt-0.5">
              طاق مقرنس سه‌بعدی و فانوس اصیل قاجاری
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setModelType(prev => prev === 'LANTERN' ? 'SCULPTURE' : 'LANTERN');
              }}
              className="px-3 py-1.5 rounded-xl bg-[#111116] border border-[#202027] text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-colors"
            >
              <Lamp className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>مدل: {modelType === 'LANTERN' ? 'فانوس مشبک (Lantern.glb)' : 'سردیس کهن (Nefertiti.glb)'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(700);
                setIsAutoSpin(prev => !prev);
              }}
              className={`p-2 rounded-xl border transition-colors ${
                isAutoSpin ? 'bg-[#d4af37]/20 border-[#d4af37]/60 text-[#d4af37]' : 'bg-[#111116] border-[#202027] text-zinc-400'
              }`}
              title="چرخش خودکار"
            >
              <RefreshCw className={`w-4 h-4 ${isAutoSpin ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Mount */}
        <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

        {/* Bottom Filter & Telemetry Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 z-10 pt-4 border-t border-[#202027]/60">
          <div className="flex items-center gap-2">
            {(['ORSI_RAINBOW', 'PERSIAN_TURQUOISE', 'GOLDEN_DESERT'] as const).map(mode => (
              <button
                key={mode}
                onClick={() => {
                  soundFx.playTick(650);
                  setLightMode(mode);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  lightMode === mode
                    ? 'bg-[#d4af37] text-black font-bold shadow-md shadow-[#d4af37]/30'
                    : 'bg-[#111116]/80 text-zinc-400 hover:text-white border border-[#202027]'
                }`}
              >
                {mode === 'ORSI_RAINBOW' ? 'ارسی هفت‌رنگ' : mode === 'PERSIAN_TURQUOISE' ? 'فیروزه نیشابور' : 'کویر زرین'}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>WebGL 3D // Three.js // GLTF Loader Active</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
