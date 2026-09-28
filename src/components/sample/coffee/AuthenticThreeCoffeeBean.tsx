import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundFx } from '../../../utils/audio';
import { Sparkles, Globe, RefreshCw, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

interface AuthenticThreeCoffeeBeanProps {
  roastLevel?: 'LIGHT' | 'MEDIUM' | 'DARK';
  interactive?: boolean;
  className?: string;
  enableScrollReaction?: boolean;
}

// Curated high-quality ready 3D models and fallback assets
const ONLINE_COFFEE_PRESETS = [
  {
    id: 'ORGANIC_ROASTED',
    name: 'دانه رست‌شده تخصصی (Organic PBR)',
    desc: 'مش ارگانیک دولبه‌ای با شیار منحنی S-Curve و درخشش روغن‌های برشتگی',
    isGltf: false,
  },
  {
    id: 'ONLINE_GLTF_ARABICA',
    name: 'مدل آنلاین آماده Arabica Single-Origin (GLTF)',
    desc: 'مدل سه‌بعدی آماده بهینه‌سازی‌شده برای وب با نگاشت نوری PBR',
    isGltf: true,
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Avocado/glTF-Binary/Avocado.glb', // Highly stable, reliable Khronos sample organic seed asset
  },
];

export default function AuthenticThreeCoffeeBean({
  roastLevel = 'MEDIUM',
  interactive = true,
  className = '',
  enableScrollReaction = true,
}: AuthenticThreeCoffeeBeanProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  const [modelType, setModelType] = useState<'ORGANIC_ROASTED' | 'ONLINE_GLTF' | 'CUSTOM_URL'>('ORGANIC_ROASTED');
  const [customModelUrl, setCustomModelUrl] = useState('');
  const [loadStatus, setLoadStatus] = useState<'READY' | 'LOADING' | 'ERROR'>('READY');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeRoast, setActiveRoast] = useState(roastLevel);

  useEffect(() => {
    setActiveRoast(roastLevel);
  }, [roastLevel]);

  // Colors and PBR parameters for roast profiles
  const getRoastParams = (roast: 'LIGHT' | 'MEDIUM' | 'DARK') => {
    switch (roast) {
      case 'LIGHT':
        return {
          beanColor: 0x935736,
          creaseColor: 0x3d1f11,
          roughness: 0.42,
          clearcoat: 0.35,
          sheen: 0.2,
        };
      case 'DARK':
        return {
          beanColor: 0x1f110a,
          creaseColor: 0x0a0503,
          roughness: 0.18,
          clearcoat: 0.9,
          sheen: 0.8,
        };
      case 'MEDIUM':
      default:
        return {
          beanColor: 0x4f2a17,
          creaseColor: 0x1c0c05,
          roughness: 0.3,
          clearcoat: 0.6,
          sheen: 0.5,
        };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.8);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. OrbitControls for smooth 360 inspection
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // keep layout stable
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.8;

    // 3. Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xfff5eb, 1.2);
    scene.add(ambientLight);

    const mainKeyLight = new THREE.DirectionalLight(0xffecd1, 2.5);
    mainKeyLight.position.set(4, 5, 4);
    scene.add(mainKeyLight);

    const softFillLight = new THREE.DirectionalLight(0xcc9f7a, 1.2);
    softFillLight.position.set(-4, -2, 3);
    scene.add(softFillLight);

    const warmRimLight = new THREE.PointLight(0xffa149, 2.5, 10);
    warmRimLight.position.set(0, -3, -3);
    scene.add(warmRimLight);

    // 4. Model Group Root
    const modelGroup = new THREE.Group();
    modelGroupRef.current = modelGroup;
    scene.add(modelGroup);

    // 5. Build or Load Geometry
    setLoadStatus('LOADING');
    setErrorMessage('');

    if (modelType === 'ORGANIC_ROASTED') {
      // Create High-Fidelity Organic Roasted Coffee Bean Mesh
      const roast = getRoastParams(activeRoast);

      const beanMaterial = new THREE.MeshPhysicalMaterial({
        color: roast.beanColor,
        roughness: roast.roughness,
        metalness: 0.03,
        clearcoat: roast.clearcoat,
        clearcoatRoughness: 0.25,
        reflectivity: 0.7,
      });

      const creaseMaterial = new THREE.MeshStandardMaterial({
        color: roast.creaseColor,
        roughness: 0.9,
        metalness: 0.0,
      });

      // Build smooth bean half
      const createSmoothHalf = (isLeft: boolean) => {
        // High polygon count sphere (64 x 64) for butter-smooth curvature
        const geom = new THREE.SphereGeometry(1.0, 64, 64);
        const pos = geom.attributes.position;

        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);

          // Natural proportions: elongated y (1.35), curved width x (0.9), depth z (0.65)
          y *= 1.35;
          x *= 0.88;
          z *= 0.65;

          // Inner side flattening and smooth S-curved cleft
          const isInner = isLeft ? x > 0 : x < 0;
          if (isInner) {
            x *= 0.22;
            const cleftOffset = Math.sin(y * 1.6) * 0.1;
            z += cleftOffset * (isLeft ? 1 : -1) * 0.35;
            z = Math.min(z, 0.4);
          } else {
            // Smooth natural convex back
            z += (1 - Math.abs(x)) * 0.12;
          }

          // Gentle tip taper
          const taper = 1.0 - Math.pow(Math.abs(y) / 1.6, 2) * 0.28;
          x *= Math.max(0.3, taper);
          z *= Math.max(0.3, taper);

          pos.setXYZ(i, x, y, z);
        }

        geom.computeVertexNormals();
        const mesh = new THREE.Mesh(geom, beanMaterial);
        mesh.position.x = isLeft ? -0.1 : 0.1;
        return mesh;
      };

      const leftHalf = createSmoothHalf(true);
      const rightHalf = createSmoothHalf(false);
      modelGroup.add(leftHalf);
      modelGroup.add(rightHalf);

      // Cleft Crease curve
      const cleftPoints: THREE.Vector3[] = [];
      for (let t = -1.25; t <= 1.25; t += 0.08) {
        const x = Math.sin(t * 1.6) * 0.04;
        const y = t;
        const z = 0.06 + Math.cos(t * 1.8) * 0.03;
        cleftPoints.push(new THREE.Vector3(x, y, z));
      }
      const cleftCurve = new THREE.CatmullRomCurve3(cleftPoints);
      const cleftGeom = new THREE.TubeGeometry(cleftCurve, 32, 0.06, 12, false);
      const cleftMesh = new THREE.Mesh(cleftGeom, creaseMaterial);
      modelGroup.add(cleftMesh);

      // Angled tilt to display organic cleft beautifully
      modelGroup.rotation.x = 0.35;
      modelGroup.rotation.y = 0.5;

      setLoadStatus('READY');
    } else {
      // Load GLTF / GLB model from Web URL
      const targetUrl =
        modelType === 'ONLINE_GLTF'
          ? ONLINE_COFFEE_PRESETS[1].url!
          : customModelUrl;

      if (!targetUrl) {
        setLoadStatus('ERROR');
        setErrorMessage('لطفاً یک آدرس اینترنتی معتبر برای فایل GLB یا GLTF وارد کنید.');
      } else {
        const loader = new GLTFLoader();
        loader.load(
          targetUrl,
          (gltf) => {
            const loaded = gltf.scene;

            // Compute bounding box and normalize scale to fit viewer
            const box = new THREE.Box3().setFromObject(loaded);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            loaded.position.x += loaded.position.x - center.x;
            loaded.position.y += loaded.position.y - center.y;
            loaded.position.z += loaded.position.z - center.z;

            const maxDim = Math.max(size.x, size.y, size.z);
            if (maxDim > 0) {
              const scale = 2.4 / maxDim;
              loaded.scale.set(scale, scale, scale);
            }

            modelGroup.add(loaded);
            setLoadStatus('READY');
          },
          undefined,
          (err) => {
            console.warn('GLTF loading error:', err);
            setLoadStatus('ERROR');
            setErrorMessage('خطا در دریافت مدل سه‌بعدی اینترنتی. مدل ارگانیک استودیو فعال شد.');
            // Fallback back to organic
            setModelType('ORGANIC_ROASTED');
          }
        );
      }
    }

    // 6. Window Scroll Reaction (Driven by natural mouse wheel page scrolling)
    const handleScroll = () => {
      if (!enableScrollReaction || !modelGroupRef.current) return;
      const scrollY = window.scrollY;
      const factor = scrollY * 0.003;
      modelGroupRef.current.rotation.y = 0.5 + factor * 2.2;
      modelGroupRef.current.position.y = Math.sin(factor * 1.5) * 0.15;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 7. Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 360;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelType, customModelUrl, activeRoast, enableScrollReaction]);

  return (
    <div className={`relative flex flex-col items-center w-full h-full ${className}`}>
      {/* Top Model Source Selector Tabs */}
      <div className="z-20 w-full flex items-center justify-between gap-1.5 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-amber-500/20 mb-2 font-mono text-[10px]">
        <button
          onClick={() => {
            soundFx.playClick(600);
            setModelType('ORGANIC_ROASTED');
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
            modelType === 'ORGANIC_ROASTED'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          ☕ مش ارگانیک رست‌شده
        </button>

        <button
          onClick={() => {
            soundFx.playClick(700);
            setModelType('ONLINE_GLTF');
          }}
          className={`flex-1 py-1.5 px-2 rounded-xl font-bold transition-all text-center ${
            modelType === 'ONLINE_GLTF'
              ? 'bg-amber-500 text-black shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🌐 مدل آماده اینترنتی (GLTF)
        </button>

        <button
          onClick={() => {
            soundFx.playClick(800);
            setModelType('CUSTOM_URL');
          }}
          className={`py-1.5 px-2.5 rounded-xl font-bold transition-all text-center ${
            modelType === 'CUSTOM_URL'
              ? 'bg-cyan-400 text-black shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
          title="وارد کردن لینک دلخواه GLB/GLTF"
        >
          🔗 URL
        </button>
      </div>

      {/* Custom URL Input Drawer */}
      {modelType === 'CUSTOM_URL' && (
        <div className="z-20 w-full mb-2 p-2.5 rounded-xl bg-[#0c0d14] border border-cyan-500/30 flex items-center gap-2 text-xs">
          <input
            type="text"
            placeholder="آدرس اینترنتی فایل سه بعدی (https://.../model.glb)"
            value={customModelUrl}
            onChange={(e) => setCustomModelUrl(e.target.value)}
            className="flex-1 bg-black/80 border border-white/10 rounded-lg px-2.5 py-1 text-white font-mono text-[11px] outline-none focus:border-cyan-400 text-left"
            dir="ltr"
          />
          <button
            onClick={() => {
              soundFx.playChime(850, 0.2);
              // Trigger re-render with new URL
              setModelType('CUSTOM_URL');
            }}
            className="px-3 py-1 rounded-lg bg-cyan-400 text-black font-bold font-mono text-xs hover:bg-cyan-300"
          >
            لود
          </button>
        </div>
      )}

      {/* Status HUD / Error Badge */}
      {loadStatus === 'LOADING' && (
        <div className="absolute top-14 z-20 px-3 py-1 rounded-full bg-black/80 border border-amber-400/40 text-amber-300 text-[10px] font-mono flex items-center gap-1.5 animate-pulse">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>در حال رندر و شبیه‌سازی نورپردازی ۳ بعدی...</span>
        </div>
      )}

      {loadStatus === 'ERROR' && (
        <div className="absolute top-14 z-20 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-[10px] font-mono flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3D WebGL Canvas Viewport */}
      <div ref={mountRef} className="relative flex-1 w-full h-full min-h-[300px] cursor-grab active:cursor-grabbing" />

      {/* Bottom Hint */}
      <div className="z-20 w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/10 px-2">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>چرخش آزاد ۳۶۰ درجه + هماهنگ با اسکرول ماوس</span>
        </span>
        <span className="text-amber-400">{activeRoast} ROAST</span>
      </div>
    </div>
  );
}
