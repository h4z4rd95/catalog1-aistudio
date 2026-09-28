import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { soundFx } from '../../utils/audio';
import {
  Compass,
  Layers,
  Sparkles,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  RefreshCw,
  Eye,
  Sliders,
  Play,
  Pause,
  ArrowRight,
  ArrowLeft,
  ChevronDown
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Spatial_V07_PersianKineticMuqarnasArchitecture',
  name: 'Persian Neofuturism: Kinetic Muqarnas & Spatial Geometry Scroll World',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: [
    'Three.js WebGL',
    'Parametric Muqarnas Stalactite Math',
    'Girih Star Tessellation',
    'CatmullRom 3D Camera Spline',
    'Audio Frequency Oscillator (Homayoun Modal Drone)'
  ],
  aestheticVibe: 'Awwwards Site of the Year // Persian Future-Heritage & Neofuturism',
  interactionBlueprint: 'Natural mouse wheel scroll navigates virtual camera through 4 spatial epochs: Primordial Girih Stars, Kinetic Exploded Muqarnas Vault, Aina-Kari Mirror Matrix, and Floating Calligraphic Nexus in Deep Space.',
  description: 'An architectural 3D scroll world bridging 16th-century Persian sacred geometry (Muqarnas and Girih) with cyberpunk WebGL instanced geometry, real-time procedural audio synthesis, and director camera controls.',
  tags: ['Persian Architecture', 'Muqarnas 3D', 'Three.js Scroll World', 'Girih Geometry', 'Awwwards Quality', 'Spatial Storytelling'],
  codeSnippet: `// Parametric 3D Muqarnas Tier Generation
for (let tier = 0; tier < 5; tier++) {
  const count = 8 * Math.pow(2, tier);
  const radius = 6.0 - tier * 0.9;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    // Explode facet along vector based on scroll progress
    mesh.position.lerp(restPos, 0.08);
  }
}`,
};

const PERSIAN_EPOCHS = [
  {
    phase: 'EPOCH 01 // هندسه ازلی شمسه و گره‌چینی',
    title: 'THE SACRED GIRIH STARFIELD',
    persianTitle: 'تلاقی ریاضیات افلاطونی و گره‌چینی صفوی',
    desc: '۸,۱۹۲ ذره زرین در مدار ستاره دوازده‌پر شمسه دوران می‌کنند. نظم پنهان عالم در قالب شبکه‌های متقارن هندسه پارسی شکوفا می‌شود.',
    coords: '32.6577° N, 51.6776° E (Isfahan)',
    stat1: 'GEOMETRY: 12-Fold Girih',
    stat2: 'SYMMETRY: P6M Group',
    color: '#d4af37',
  },
  {
    phase: 'EPOCH 02 // انفجار کینتیک کاسه‌های مقرنس',
    title: 'KINETIC MUQARNAS DISASSEMBLY',
    persianTitle: 'واسازی و بازآرایی دینامیک طاق‌های معلق',
    desc: 'صدها قطعه مقرنس قوسی شکل در فضا از هم گشوده می‌شوند و با هر اسکرول کاربر، دوباره با تلألؤ فیروزه‌ای و لاجوردی همگرا می‌گردند.',
    coords: 'ELEVATION: +18.4m Above Nave',
    stat1: 'TIERS: 5 Cascading Levels',
    stat2: 'FACETS: 128 Parametric Units',
    color: '#22d3ee',
  },
  {
    phase: 'EPOCH 03 // تالار انکسار و آینه‌کاری نوین',
    title: 'THE AINA-KARI MIRROR MATRIX',
    persianTitle: 'انکسار منشورها و بازتاب کریپتوگرافیک نور',
    desc: 'وجوه الماس‌گونه با ضریب انکسار فیزیکی شبیه بلور کوارتز، پرتوهای نور سفید را به طیف کروماتیک کامل هفت‌رنگ تجزیه می‌کنند.',
    coords: 'OPTICS: Fresnel IOR 1.62',
    stat1: 'DISPERSION: Cauchy Chromatic',
    stat2: 'SPECULAR: Roughness 0.04',
    color: '#a855f7',
  },
  {
    phase: 'EPOCH 04 // پرواز خط شکسته در ابعاد کوانتومی',
    title: 'THE NASTALIQ COGNITIVE NEXUS',
    persianTitle: 'پیچش هندسی ابیات حافظ در کهکشان معنا',
    desc: 'حرکت خطوط منحنی نستعلیق در میان ستون‌های فضایی؛ جایی که واژگان نورانی «عشق»، «ابدیت» و «تکینگی» در کیهان شناور می‌شوند.',
    coords: 'HORIZON: Quantum Singularity',
    stat1: 'HARMONIC: Modal Drone 110Hz',
    stat2: 'RENDER: ACES Filmic HDR',
    color: '#b8ff3d',
  },
];

interface PersianKineticArchitectureExperienceProps {
  onReturnToCatalog?: () => void;
}

export default function PersianKineticArchitectureExperience({
  onReturnToCatalog,
}: PersianKineticArchitectureExperienceProps = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [cameraMode, setCameraMode] = useState<'SCRIPTED' | 'FREE_ORBIT'>('SCRIPTED');
  const [isLetterbox219, setIsLetterbox219] = useState(true);
  const [audioHumEnabled, setAudioHumEnabled] = useState(false);
  const [autoTour, setAutoTour] = useState(false);

  // Web Audio Synth Drone Hum (Persian Homayoun / Shur Drone)
  const audioContextRef = useRef<AudioContext | null>(null);
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeEpochIdx = Math.min(
    PERSIAN_EPOCHS.length - 1,
    Math.floor(scrollProgress * PERSIAN_EPOCHS.length)
  );
  const currentEpoch = PERSIAN_EPOCHS[activeEpochIdx];

  const toggleAudio = () => {
    if (audioHumEnabled) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.2);
      }
      setAudioHumEnabled(false);
    } else {
      soundFx.playChime(650, 0.2);
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        const now = audioContextRef.current.currentTime;
        const osc1 = audioContextRef.current.createOscillator();
        const osc2 = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        // Persian drone: Fundamental D (73.4Hz) + Fifth A (110Hz)
        osc1.type = 'sine';
        osc1.frequency.setValueAtTime(73.4, now);
        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(110.0, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setTargetAtTime(0.07, now, 0.6);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioContextRef.current.destination);

        osc1.start();
        osc2.start();
        osc1Ref.current = osc1;
        osc2Ref.current = osc2;
        gainNodeRef.current = gain;
        setAudioHumEnabled(true);
      }
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06070a, 0.024);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enabled = false;
    controlsRef.current = controls;

    // Camera Spline Path through Persian Architectural Epochs
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 26),      // Epoch 1: Looking down onto sacred starfield
      new THREE.Vector3(7, 1, 14),      // Epoch 2: Entering exploded Muqarnas vault
      new THREE.Vector3(-9, 5, -8),     // Epoch 3: Inside the mirror matrix corridor
      new THREE.Vector3(0, 0, -32),     // Epoch 4: Floating in the Nastaliq cosmic core
    ]);

    // 1. EPOCH 1: 12-Fold Girih Star Tessellation Particles
    const starfieldGroup = new THREE.Group();
    const starCount = 3000;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const goldColor = new THREE.Color(0xd4af37);
    const turquoiseColor = new THREE.Color(0x22d3ee);

    for (let i = 0; i < starCount; i++) {
      const ring = (i % 12);
      const angle = (ring / 12) * Math.PI * 2 + (i / starCount) * Math.PI * 0.2;
      const radius = 2.5 + (Math.floor(i / 12) / (starCount / 12)) * 14;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.4;
      const y = (Math.random() - 0.5) * 1.5;
      const z = Math.sin(angle) * radius + 18 + (Math.random() - 0.5) * 0.4;

      starPos[i * 3] = x;
      starPos[i * 3 + 1] = y;
      starPos[i * 3 + 2] = z;

      const c = (i % 3 === 0) ? turquoiseColor : goldColor;
      starColors[i * 3] = c.r;
      starColors[i * 3 + 1] = c.g;
      starColors[i * 3 + 2] = c.b;
    }

    const starGeom = new THREE.BufferGeometry();
    starGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starParticles = new THREE.Points(starGeom, starMat);
    starfieldGroup.add(starParticles);
    scene.add(starfieldGroup);

    // 2. EPOCH 2: Parametric 3D Muqarnas Stalactite Tier Vault
    const muqarnasGroup = new THREE.Group();
    muqarnasGroup.position.set(0, 0, 5);

    // Muqarnas Facet Geometry (inverted pyramidal wedge)
    const facetGeom = new THREE.ConeGeometry(0.8, 1.6, 4);
    const facetGoldMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a1608,
      emissive: 0xd4af37,
      emissiveIntensity: 0.15,
      metalness: 0.9,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const facetTurquoiseMat = new THREE.MeshPhysicalMaterial({
      color: 0x082028,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.25,
      metalness: 0.8,
      roughness: 0.15,
      clearcoat: 1.0,
    });

    interface MuqarnasNode {
      mesh: THREE.Mesh;
      restPos: THREE.Vector3;
      explodedPos: THREE.Vector3;
      rotation: THREE.Euler;
    }
    const muqarnasNodes: MuqarnasNode[] = [];

    // Build 4 concentric tiers of sacred vaults
    const tiers = [
      { count: 12, radius: 2.2, y: 1.0 },
      { count: 18, radius: 3.8, y: 2.2 },
      { count: 24, radius: 5.4, y: 3.6 },
      { count: 32, radius: 7.2, y: 5.2 },
    ];

    tiers.forEach((t, tIdx) => {
      const mat = tIdx % 2 === 0 ? facetGoldMat : facetTurquoiseMat;
      for (let i = 0; i < t.count; i++) {
        const angle = (i / t.count) * Math.PI * 2;
        const restX = Math.cos(angle) * t.radius;
        const restZ = Math.sin(angle) * t.radius;
        const restY = t.y;

        const mesh = new THREE.Mesh(facetGeom, mat);
        mesh.rotation.x = Math.PI; // point downward into vault ceiling
        mesh.rotation.y = angle + Math.PI / 4;

        const restPos = new THREE.Vector3(restX, restY, restZ);
        // Exploded vector outward and up
        const explodedPos = restPos.clone().multiplyScalar(2.2 + Math.random() * 0.8);
        explodedPos.y += 4.0;

        mesh.position.copy(restPos);
        muqarnasGroup.add(mesh);

        muqarnasNodes.push({
          mesh,
          restPos,
          explodedPos,
          rotation: mesh.rotation.clone(),
        });
      }
    });
    scene.add(muqarnasGroup);

    // 2.5 Authentic Free 3D Assets: Antique Oriental Filigree Lantern & Classical Sculpture
    const gltfLoader = new GLTFLoader();
    let lanternMesh: THREE.Group | null = null;
    let nefertitiMesh: THREE.Group | null = null;

    gltfLoader.load('/models/Lantern.glb', (gltf) => {
      lanternMesh = gltf.scene;
      lanternMesh.position.set(0, 1.8, 5.0);
      lanternMesh.scale.setScalar(0.045);
      lanternMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(lanternMesh);

      // Add warm interior lantern pointlight
      const lanternPointLight = new THREE.PointLight(0xffaa33, 4.0, 15);
      lanternPointLight.position.set(0, 2.0, 5.0);
      scene.add(lanternPointLight);
    });

    gltfLoader.load('/models/Nefertiti.glb', (gltf) => {
      nefertitiMesh = gltf.scene;
      nefertitiMesh.position.set(0, -1.0, -18.0);
      nefertitiMesh.scale.setScalar(1.8);
      nefertitiMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(nefertitiMesh);
    });

    // 3. EPOCH 3: The Aina-Kari Mirror Matrix (Mirrored Shards Corridor)
    const mirrorGroup = new THREE.Group();
    mirrorGroup.position.set(0, 0, -10);

    const mirrorGeom = new THREE.BoxGeometry(0.9, 2.4, 0.08);
    const mirrorMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a14,
      emissive: 0x9333ea,
      emissiveIntensity: 0.2,
      metalness: 0.98,
      roughness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    const mirrorCount = 36;
    const mirrors: THREE.Mesh[] = [];
    for (let i = 0; i < mirrorCount; i++) {
      const m = new THREE.Mesh(mirrorGeom, mirrorMat);
      const angle = (i / mirrorCount) * Math.PI * 2;
      const rad = 4.2;
      m.position.set(
        Math.cos(angle) * rad,
        (Math.random() - 0.5) * 5,
        (i / mirrorCount) * 16 - 8
      );
      m.rotation.set(
        Math.PI * 0.1,
        angle + Math.PI / 2,
        (Math.random() - 0.5) * 0.3
      );
      mirrorGroup.add(m);
      mirrors.push(m);
    }
    scene.add(mirrorGroup);

    // 4. EPOCH 4: Floating Nastaliq Torus Ribbon Nexus
    const nexusGroup = new THREE.Group();
    nexusGroup.position.set(0, 0, -32);

    const ribbonGeom = new THREE.TorusKnotGeometry(3.5, 0.45, 160, 32, 3, 5);
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      emissive: 0xb8ff3d,
      emissiveIntensity: 0.35,
      metalness: 0.85,
      roughness: 0.12,
      clearcoat: 1.0,
    });
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    nexusGroup.add(ribbonMesh);

    // Floating Halo Rings
    const haloGeom = new THREE.RingGeometry(4.8, 5.0, 64);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.4,
    });
    const haloMesh = new THREE.Mesh(haloGeom, haloMat);
    haloMesh.rotation.x = Math.PI / 2;
    nexusGroup.add(haloMesh);

    scene.add(nexusGroup);

    // Dynamic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.PointLight(0xd4af37, 5.0, 35);
    goldKeyLight.position.set(6, 8, 16);
    scene.add(goldKeyLight);

    const turquoiseLight = new THREE.PointLight(0x00f0ff, 6.0, 35);
    turquoiseLight.position.set(-6, -4, 4);
    scene.add(turquoiseLight);

    const violetNexusLight = new THREE.PointLight(0xa855f7, 6.5, 30);
    violetNexusLight.position.set(0, 4, -28);
    scene.add(violetNexusLight);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll Handler (GSAP-like scrub driver)
    const handleWheel = (e: WheelEvent) => {
      if (controlsRef.current?.enabled) return;
      e.preventDefault();
      const delta = e.deltaY * 0.00045;
      setScrollProgress((prev) => Math.min(1.0, Math.max(0.0, prev + delta)));
    };
    container.addEventListener('wheel', handleWheel, { passive: false });

    // Touch Support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (controlsRef.current?.enabled) return;
      const touchY = e.touches[0].clientY;
      const delta = (touchStartY - touchY) * 0.0012;
      touchStartY = touchY;
      setScrollProgress((prev) => Math.min(1.0, Math.max(0.0, prev + delta)));
    };
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let clock = new THREE.Clock();
    let currentScrubProgress = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Auto tour progression if enabled
      if (autoTour) {
        setScrollProgress((prev) => (prev + delta * 0.04) % 1.0);
      }

      // Smooth scrub interpolation
      currentScrubProgress += (scrollProgress - currentScrubProgress) * 0.08;

      if (cameraMode === 'SCRIPTED') {
        const camPos = cameraSpline.getPointAt(currentScrubProgress);
        const lookAheadProgress = Math.min(1.0, currentScrubProgress + 0.04);
        const lookTarget = cameraSpline.getPointAt(lookAheadProgress);

        camera.position.x = camPos.x + mouseX * 0.6;
        camera.position.y = camPos.y + mouseY * 0.4;
        camera.position.z = camPos.z;
        camera.lookAt(lookTarget.x, lookTarget.y, lookTarget.z);
      } else {
        controls.update();
      }

      // 1. Rotate Starfield
      starfieldGroup.rotation.y = elapsed * 0.03;

      // 2. Animate Muqarnas Exploded View based on scroll progress
      // Peak explosion occurs around progress 0.25 to 0.5
      const muqarnasExplosion = Math.sin(Math.PI * Math.min(1.0, Math.max(0.0, (currentScrubProgress - 0.15) / 0.45)));
      muqarnasNodes.forEach((node) => {
        node.mesh.position.lerpVectors(node.restPos, node.explodedPos, muqarnasExplosion);
        node.mesh.rotation.y += delta * 0.2 * (muqarnasExplosion + 0.1);
      });

      // Animate authentic Persian Lantern & Nefertiti
      if (lanternMesh) {
        lanternMesh.rotation.y = elapsed * 0.25;
        lanternMesh.rotation.z = Math.sin(elapsed * 0.8) * 0.04;
      }
      if (nefertitiMesh) {
        nefertitiMesh.rotation.y = elapsed * 0.15 + mouseX * 0.4;
      }

      // 3. Mirror Matrix Rotation
      mirrorGroup.rotation.z = elapsed * 0.08;
      mirrors.forEach((m, idx) => {
        m.rotation.y += delta * (0.2 + (idx % 3) * 0.1);
      });

      // 4. Nexus Ribbon Motion
      ribbonMesh.rotation.x = elapsed * 0.2;
      ribbonMesh.rotation.y = elapsed * 0.3;
      haloMesh.rotation.z = -elapsed * 0.15;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraMode, autoTour]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div
        dir="rtl"
        className={`relative w-full h-screen bg-[#06070a] text-white overflow-hidden select-none font-['Plus_Jakarta_Sans','Vazirmatn'] ${
          isLetterbox219 ? 'p-0 sm:py-6' : ''
        }`}
      >
        {/* Anamorphic 21:9 Letterbox Matte Bars */}
        {isLetterbox219 && (
          <>
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-10 bg-black z-30 border-b border-white/10 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-ping" />
                <span>CINEMATIC ARCHITECTURAL SPLINE // 21:9 ANAMORPHIC RATIO</span>
              </span>
              <span className="text-[#d4af37] font-bold">123SERVICE &bull; PERSIAN NEOFUTURISM</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 bg-black z-30 border-t border-white/10 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-zinc-400">
              <span>NATURAL SCROLL WHEEL DRIVES 3D TRAVEL &bull; SHIFT+DRAG TO ORBIT</span>
              <span className="text-cyan-400">{currentEpoch.coords}</span>
            </div>
          </>
        )}

        {/* 3D WebGL Canvas Container */}
        <div ref={mountRef} className="w-full h-full cursor-ns-resize" />

        {/* Top Control Bar HUD */}
        <div className="absolute top-8 sm:top-14 left-4 right-4 sm:left-8 sm:right-8 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Left: Return & Breadcrumb */}
          <div className="flex items-center gap-2">
            {onReturnToCatalog && (
              <button
                onClick={() => {
                  soundFx.playClick(700);
                  onReturnToCatalog();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 hover:border-amber-400 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-xl backdrop-blur-md"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>بازگشت به نمایشگاه</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-zinc-300 backdrop-blur-md">
              <span className="text-[#d4af37] font-bold">EPOCH {activeEpochIdx + 1}/4:</span>
              <span className="text-white truncate max-w-[180px]">{currentEpoch.title}</span>
            </div>
          </div>

          {/* Right: Director Camera Controls & Audio */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setAutoTour((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-all backdrop-blur-md ${
                autoTour
                  ? 'bg-amber-400 text-black border-amber-300 font-bold shadow-lg shadow-amber-400/20'
                  : 'bg-black/70 text-zinc-300 border-white/10 hover:border-white/30'
              }`}
            >
              {autoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoTour ? 'توقف پرواز خودکار' : 'پرواز خودکار'}</span>
            </button>

            <button
              onClick={() => {
                soundFx.playClick(700);
                const nextMode = cameraMode === 'SCRIPTED' ? 'FREE_ORBIT' : 'SCRIPTED';
                setCameraMode(nextMode);
                if (controlsRef.current) {
                  controlsRef.current.enabled = nextMode === 'FREE_ORBIT';
                }
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-all backdrop-blur-md ${
                cameraMode === 'FREE_ORBIT'
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold'
                  : 'bg-black/70 text-zinc-300 border-white/10 hover:border-white/30'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{cameraMode === 'FREE_ORBIT' ? 'دوربین آزاد (Orbit)' : 'دوربین ریلی (Spline)'}</span>
            </button>

            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all backdrop-blur-md ${
                audioHumEnabled
                  ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-amber-500/20'
                  : 'bg-black/70 text-zinc-400 border-white/10 hover:text-white'
              }`}
              title="صدای فرکانس همایون"
            >
              {audioHumEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsLetterbox219((prev) => !prev);
              }}
              className="p-2 rounded-xl bg-black/70 border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-all backdrop-blur-md"
              title="نسبت تصویر سینمایی"
            >
              {isLetterbox219 ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Narrative Chapter Editorial HUD (Bottom Right on desktop, centered with margins on mobile) */}
        <div className="absolute bottom-12 sm:bottom-16 right-4 sm:right-10 left-4 sm:left-auto max-w-md z-20 pointer-events-none">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3 pointer-events-auto transition-all duration-500 animate-in fade-in">
            {/* Phase Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[11px]">
              <span className="text-[#d4af37] font-bold tracking-wider">{currentEpoch.phase}</span>
              <span className="text-zinc-400 font-mono">{Math.round(scrollProgress * 100)}% JOURNEY</span>
            </div>

            {/* Titles */}
            <div>
              <h2 className="font-['Lalezar'] text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {currentEpoch.persianTitle}
              </h2>
              <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-0.5">
                {currentEpoch.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {currentEpoch.desc}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 font-mono text-[10px]">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-300">
                <span className="text-zinc-400 block text-[9px]">پارامتر اول:</span>
                <span className="text-amber-300 font-bold">{currentEpoch.stat1}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-300">
                <span className="text-zinc-400 block text-[9px]">پارامتر دوم:</span>
                <span className="text-cyan-300 font-bold">{currentEpoch.stat2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Scroll Indicator & Spline Progress Bar */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-mono text-[10px] text-zinc-400 -rotate-90 tracking-widest origin-center mb-4">
            SPLINE RAIL
          </span>
          <div className="w-1.5 h-48 bg-white/10 rounded-full relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-[#d4af37] via-cyan-400 to-[#b8ff3d] rounded-full transition-all duration-150"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            {[0, 1, 2, 3].map((idx) => {
              const isPassed = scrollProgress >= idx / 3;
              return (
                <div
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full border transition-all ${
                    isPassed
                      ? 'bg-[#d4af37] border-amber-300 shadow-md shadow-amber-400/50'
                      : 'bg-transparent border-white/20'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Scroll Gesture Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md pointer-events-none font-mono text-[11px] text-zinc-300 animate-pulse">
          <ChevronDown className="w-3.5 h-3.5 text-[#d4af37]" />
          <span>اسکرول ماوس یا لمس صفحه برای پرواز در امتداد ریل سه‌بعدی</span>
        </div>
      </div>
    </BlueprintHUD>
  );
}
