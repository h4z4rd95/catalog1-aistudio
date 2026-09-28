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
  Eye,
  Sliders,
  Play,
  Pause,
  ArrowRight,
  ChevronDown,
  Clock,
  Zap,
  Activity
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Spatial_V08_ChronoNebulaScrollWorld',
  name: 'Chrono-Spatial Odyssey: Three.js Cosmic Clockwork & Warp Spine',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: [
    'Three.js WebGL',
    'Procedural Astrolabe Gear Meshes',
    'Volumetric Accretion Nebula',
    'Relativistic Camera Spline',
    'Sub-Bass Frequency Synthesizer'
  ],
  aestheticVibe: 'Awwwards Site of the Year // Cybernetic Relic & Cosmic Observatory',
  interactionBlueprint: 'Scroll scrub guides virtual camera along relativistic spline past astronomical gear trains, gravitational accretion vortex, and event horizon portal.',
  description: 'An episodic 3D cosmic timepiece and spacetime observatory exploring time dilation, interstellar navigation, and Persian celestial astrolabes.',
  tags: ['Chrono Nebula', 'Three.js Scroll World', 'Astrolabe 3D', 'Awwwards Quality', 'Spatial WebGL', 'Cosmic Narrative'],
  codeSnippet: `// Relativistic Time Dilation & Camera Position Lerp
const timeDilation = 1.0 / Math.sqrt(1.0 - Math.pow(scrollProgress * 0.95, 2));
const camPoint = spline.getPointAt(scrollProgress);
camera.position.lerp(camPoint, 0.08);`,
};

const CHRONO_CHAPTERS = [
  {
    epoch: 'PHASE 01 // اسطرلاب کوانتومی',
    title: 'THE CHRONO-ASTROLABE',
    persianTitle: 'چرخ‌دنده‌های کیهانی و زمان سنجی باستانی',
    desc: 'چرخ‌دنده‌های برنجی و تیتانیومی به‌هم‌پیوسته که گاه‌شماری نجومی خیام و ابوریحان بیرونی را با مکانیک کوانتومی پیوند می‌دهند.',
    stat1: 'DILATION: 1.02x Earth',
    stat2: 'GEAR RATIO: 1:365.24',
    color: '#d4af37',
  },
  {
    epoch: 'PHASE 02 // سحابی برافزایشی',
    title: 'THE ACCRETION VORTEX',
    persianTitle: 'سحابی غبار ستاره‌ای و گرداب گرانشی',
    desc: '۱۰,۰۰۰ ذره درخشان با گرانش تکینگی مرکزی شتاب می‌گیرند. امواج شوک پلاسمایی با رنگ‌های لاجوردی و سرخ نئونی می‌درخشند.',
    stat1: 'PARTICLES: 10,240',
    stat2: 'CORE TEMP: 4.8M Kelvin',
    color: '#38bdf8',
  },
  {
    epoch: 'PHASE 03 // شکاف فضا-زمان و ترپود نوری',
    title: 'THE EVENT HORIZON RIFT',
    persianTitle: 'افق رویداد و شکست انکساری نور',
    desc: 'دوربین به مرز غیرقابل بازگشت سیاه‌چاله وارد می‌شود؛ اعوجاج فضایی پرتوهای نور را خم کرده و هاله کروماتیک فتون‌ها پدیدار می‌گردد.',
    stat1: 'VELOCITY: 0.92 c',
    stat2: 'CURVATURE: Tensor R_uv',
    color: '#a855f7',
  },
  {
    epoch: 'PHASE 04 // هسته کوانتومی دایسون',
    title: 'THE DYSON COGNITIVE NEXUS',
    persianTitle: 'ابرسازه محاسباتی در قلب تکینگی',
    desc: 'کره دایسون پیرامون تپ‌اختر به مدار نهایی می‌رسد؛ تله‌متری داده‌ها و ارکستراسیون پردازش ابری استودیو با فرکانس صوتی هم‌آوا می‌شوند.',
    stat1: 'THROUGHPUT: 1.2 Yottaflops',
    stat2: 'ENTROPY: Minimal Zero',
    color: '#b8ff3d',
  },
];

interface ThreeJsChronoNebulaScrollWorldProps {
  onReturnToCatalog?: () => void;
}

export default function ThreeJsChronoNebulaScrollWorld({
  onReturnToCatalog,
}: ThreeJsChronoNebulaScrollWorldProps = {}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [cameraMode, setCameraMode] = useState<'SCRIPTED' | 'FREE_ORBIT'>('SCRIPTED');
  const [isLetterbox219, setIsLetterbox219] = useState(true);
  const [audioHumEnabled, setAudioHumEnabled] = useState(false);
  const [autoTour, setAutoTour] = useState(false);

  // Audio synthesizer
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const activeChapterIdx = Math.min(
    CHRONO_CHAPTERS.length - 1,
    Math.floor(scrollProgress * CHRONO_CHAPTERS.length)
  );
  const currentChapter = CHRONO_CHAPTERS[activeChapterIdx];

  const toggleAudio = () => {
    if (audioHumEnabled) {
      if (gainRef.current) {
        gainRef.current.gain.setTargetAtTime(0, audioContextRef.current?.currentTime || 0, 0.2);
      }
      setAudioHumEnabled(false);
    } else {
      soundFx.playChime(600, 0.2);
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!audioContextRef.current) {
          audioContextRef.current = new AudioCtx();
        }
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        const now = audioContextRef.current.currentTime;
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(48, now); // Low deep drone 48Hz
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.setTargetAtTime(0.06, now, 0.5);

        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        oscRef.current = osc;
        gainRef.current = gain;
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
    scene.fog = new THREE.FogExp2(0x040508, 0.022);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 250);
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

    // Camera Spline Path through Chrono Dimensions
    const cameraSpline = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 3, 28),     // Phase 1: Looking down onto Chrono-Astrolabe
      new THREE.Vector3(9, -2, 12),    // Phase 2: Diving through Accretion Nebula
      new THREE.Vector3(-10, 6, -12),  // Phase 3: Trapped in Event Horizon
      new THREE.Vector3(0, 0, -36),    // Phase 4: Heart of Dyson Cognitive Sphere
    ]);

    // 1. PHASE 1: Intricate 3D Astrolabe Gear Mechanism
    const astrolabeGroup = new THREE.Group();
    astrolabeGroup.position.set(0, 0, 16);

    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0x18140a,
      emissive: 0xd4af37,
      emissiveIntensity: 0.25,
      metalness: 0.95,
      roughness: 0.16,
      clearcoat: 1.0,
    });
    const steelMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a1018,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.2,
      metalness: 0.9,
      roughness: 0.15,
      clearcoat: 1.0,
    });

    // Helper to generate cogwheel geometry with teeth
    const createGear = (radius: number, teeth: number, thickness: number, mat: THREE.Material) => {
      const gearGroup = new THREE.Group();
      const discGeom = new THREE.CylinderGeometry(radius, radius, thickness, 32);
      const disc = new THREE.Mesh(discGeom, mat);
      gearGroup.add(disc);

      const toothGeom = new THREE.BoxGeometry(thickness * 1.8, thickness, radius * 0.2);
      for (let i = 0; i < teeth; i++) {
        const angle = (i / teeth) * Math.PI * 2;
        const tooth = new THREE.Mesh(toothGeom, mat);
        tooth.position.set(
          Math.cos(angle) * (radius + radius * 0.08),
          0,
          Math.sin(angle) * (radius + radius * 0.08)
        );
        tooth.rotation.y = -angle;
        gearGroup.add(tooth);
      }
      return gearGroup;
    };

    const mainGear = createGear(3.2, 24, 0.25, brassMat);
    mainGear.rotation.x = Math.PI / 2;
    astrolabeGroup.add(mainGear);

    const secondaryGear = createGear(1.8, 16, 0.22, steelMat);
    secondaryGear.position.set(3.8, 0, 0);
    secondaryGear.rotation.x = Math.PI / 2;
    astrolabeGroup.add(secondaryGear);

    const thirdGear = createGear(1.2, 12, 0.2, brassMat);
    thirdGear.position.set(-3.2, 0, 0);
    thirdGear.rotation.x = Math.PI / 2;
    astrolabeGroup.add(thirdGear);

    // Astrolabe Reticle Rings
    const ringGeom = new THREE.TorusGeometry(4.2, 0.04, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.6 });
    const reticleRing = new THREE.Mesh(ringGeom, ringMat);
    astrolabeGroup.add(reticleRing);

    scene.add(astrolabeGroup);

    // 2. PHASE 2: Cosmic Accretion Vortex Particles
    const nebulaGroup = new THREE.Group();
    nebulaGroup.position.set(0, 0, 0);

    const particleCount = 4500;
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(0x38bdf8);
    const c2 = new THREE.Color(0xa855f7);
    const c3 = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.pow(Math.random(), 1.8) * 16.0;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * (4.0 * (1.0 - radius / 18.0));

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const pick = Math.random();
      const c = pick < 0.45 ? c1 : pick < 0.8 ? c2 : c3;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    const nebulaGeom = new THREE.BufferGeometry();
    nebulaGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    nebulaGeom.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const nebulaMat = new THREE.PointsMaterial({
      size: 0.075,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const nebulaPoints = new THREE.Points(nebulaGeom, nebulaMat);
    nebulaGroup.add(nebulaPoints);
    scene.add(nebulaGroup);

    // 3. PHASE 3: Event Horizon Portal / Chromatic Cylinder Tunnel
    const tunnelGroup = new THREE.Group();
    tunnelGroup.position.set(0, 0, -16);

    const tunnelGeom = new THREE.CylinderGeometry(4.5, 3.5, 18, 32, 1, true);
    const tunnelMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const tunnelMesh = new THREE.Mesh(tunnelGeom, tunnelMat);
    tunnelMesh.rotation.x = Math.PI / 2;
    tunnelGroup.add(tunnelMesh);
    scene.add(tunnelGroup);

    // 4. PHASE 4: Dyson Swarm Cognitive Core
    const dysonGroup = new THREE.Group();
    dysonGroup.position.set(0, 0, -36);

    const coreSphereGeom = new THREE.IcosahedronGeometry(2.4, 2);
    const coreSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      emissive: 0xb8ff3d,
      emissiveIntensity: 0.45,
      metalness: 0.9,
      roughness: 0.1,
      clearcoat: 1.0,
    });
    const coreSphere = new THREE.Mesh(coreSphereGeom, coreSphereMat);
    dysonGroup.add(coreSphere);

    // Dyson Orbit Rings
    const orbitCount = 4;
    const orbitRings: THREE.Mesh[] = [];
    for (let i = 0; i < orbitCount; i++) {
      const oGeom = new THREE.TorusGeometry(3.6 + i * 0.8, 0.03, 16, 64);
      const oMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x22d3ee : 0xb8ff3d,
        transparent: true,
        opacity: 0.5,
      });
      const oMesh = new THREE.Mesh(oGeom, oMat);
      oMesh.rotation.set((i * Math.PI) / 4, (i * Math.PI) / 6, 0);
      dysonGroup.add(oMesh);
      orbitRings.push(oMesh);
    }
    scene.add(dysonGroup);

    // 5. Authentic Free 3D Assets: Khronos DamagedHelmet (Astronaut Space Navigator) & PrimaryIonDrive
    const gltfLoader = new GLTFLoader();
    let helmetMesh: THREE.Group | null = null;
    let ionDriveMesh: THREE.Group | null = null;

    gltfLoader.load('/models/DamagedHelmet.glb', (gltf) => {
      helmetMesh = gltf.scene;
      helmetMesh.position.set(0, 1.2, 17);
      helmetMesh.scale.setScalar(2.2);
      helmetMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(helmetMesh);
    });

    gltfLoader.load('/models/PrimaryIonDrive.glb', (gltf) => {
      ionDriveMesh = gltf.scene;
      ionDriveMesh.position.set(0, 0, -36);
      ionDriveMesh.scale.setScalar(1.2);
      ionDriveMesh.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(ionDriveMesh);
    });

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const goldLight = new THREE.PointLight(0xd4af37, 5.0, 30);
    goldLight.position.set(5, 5, 20);
    scene.add(goldLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 6.0, 30);
    cyanLight.position.set(-6, -4, 4);
    scene.add(cyanLight);

    const neonCoreLight = new THREE.PointLight(0xb8ff3d, 7.0, 25);
    neonCoreLight.position.set(0, 0, -36);
    scene.add(neonCoreLight);

    // Mouse tilt
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Scroll scrub driver
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

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let clock = new THREE.Clock();
    let currentScrub = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      if (autoTour) {
        setScrollProgress((prev) => (prev + delta * 0.04) % 1.0);
      }

      currentScrub += (scrollProgress - currentScrub) * 0.08;

      if (cameraMode === 'SCRIPTED') {
        const camPos = cameraSpline.getPointAt(currentScrub);
        const lookAhead = Math.min(1.0, currentScrub + 0.04);
        const target = cameraSpline.getPointAt(lookAhead);

        camera.position.x = camPos.x + mouseX * 0.6;
        camera.position.y = camPos.y + mouseY * 0.4;
        camera.position.z = camPos.z;
        camera.lookAt(target.x, target.y, target.z);
      } else {
        controls.update();
      }

      // Rotate Astrolabe gears with realistic gear ratios
      mainGear.rotation.z = elapsed * 0.4;
      secondaryGear.rotation.z = -elapsed * 0.4 * (24 / 16);
      thirdGear.rotation.z = elapsed * 0.4 * (24 / 12);
      reticleRing.rotation.z = -elapsed * 0.1;

      // Rotate Accretion Nebula
      nebulaGroup.rotation.y = elapsed * 0.08;

      // Animate authentic GLTF 3D models
      if (helmetMesh) {
        helmetMesh.rotation.y = elapsed * 0.35 + mouseX * 0.5;
        helmetMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.15 + mouseY * 0.3;
        helmetMesh.position.y = 1.2 + Math.sin(elapsed * 0.8) * 0.2;
      }
      if (ionDriveMesh) {
        ionDriveMesh.rotation.z = elapsed * 0.25;
        ionDriveMesh.rotation.y = Math.sin(elapsed * 0.3) * 0.2;
      }

      // Tunnel warp pulse
      tunnelMesh.rotation.z = elapsed * 0.2;

      // Dyson core rotation
      coreSphere.rotation.x = elapsed * 0.3;
      coreSphere.rotation.y = elapsed * 0.4;
      orbitRings.forEach((r, idx) => {
        r.rotation.z += delta * (0.4 + idx * 0.15);
      });

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
        className={`relative w-full h-screen bg-[#040508] text-white overflow-hidden select-none font-['Plus_Jakarta_Sans','Vazirmatn'] ${
          isLetterbox219 ? 'p-0 sm:py-6' : ''
        }`}
      >
        {/* Anamorphic 21:9 Letterbox Matte Bars */}
        {isLetterbox219 && (
          <>
            <div className="absolute top-0 left-0 right-0 h-6 sm:h-10 bg-black z-30 border-b border-white/10 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>CHRONO-SPATIAL ODYSSEY // 21:9 ANAMORPHIC SPLINE RAIL</span>
              </span>
              <span className="text-cyan-400 font-bold">123SERVICE &bull; RELATIVISTIC TIME ENGINE</span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-10 bg-black z-30 border-t border-white/10 pointer-events-none flex items-center justify-between px-6 text-[10px] font-mono text-zinc-400">
              <span>MOUSE WHEEL CONTROLS TEMPORAL PROGRESS &bull; SHIFT+DRAG TO ORBIT</span>
              <span className="text-[#b8ff3d]">{currentChapter.stat1}</span>
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
                className="px-3.5 py-1.5 rounded-xl bg-black/80 hover:bg-black border border-white/20 hover:border-cyan-400 text-zinc-300 hover:text-white font-mono text-xs flex items-center gap-1.5 transition-all shadow-xl backdrop-blur-md"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>بازگشت به نمایشگاه</span>
              </button>
            )}

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-zinc-300 backdrop-blur-md">
              <span className="text-cyan-400 font-bold">EPOCH {activeChapterIdx + 1}/4:</span>
              <span className="text-white truncate max-w-[180px]">{currentChapter.title}</span>
            </div>
          </div>

          {/* Right: Director Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFx.playClick(600);
                setAutoTour((prev) => !prev);
              }}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-1.5 border transition-all backdrop-blur-md ${
                autoTour
                  ? 'bg-cyan-400 text-black border-cyan-300 font-bold shadow-lg shadow-cyan-400/20'
                  : 'bg-black/70 text-zinc-300 border-white/10 hover:border-white/30'
              }`}
            >
              {autoTour ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{autoTour ? 'توقف سفر خودکار' : 'سفر خودکار'}</span>
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
                  ? 'bg-amber-400 text-black border-amber-300 font-bold'
                  : 'bg-black/70 text-zinc-300 border-white/10 hover:border-white/30'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{cameraMode === 'FREE_ORBIT' ? 'دوربین آزاد' : 'دوربین ریلی'}</span>
            </button>

            <button
              onClick={toggleAudio}
              className={`p-2 rounded-xl border transition-all backdrop-blur-md ${
                audioHumEnabled
                  ? 'bg-cyan-400 text-black border-cyan-300 shadow-lg shadow-cyan-500/20'
                  : 'bg-black/70 text-zinc-400 border-white/10 hover:text-white'
              }`}
              title="فرکانس صوتی ساب‌بیس"
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

        {/* Narrative Chapter Editorial Card HUD (Bottom Right on desktop, centered with margins on mobile) */}
        <div className="absolute bottom-12 sm:bottom-16 right-4 sm:right-10 left-4 sm:left-auto max-w-md z-20 pointer-events-none">
          <div className="p-4 sm:p-6 rounded-3xl bg-black/85 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-3 pointer-events-auto transition-all duration-500 animate-in fade-in">
            {/* Phase Badge */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 font-mono text-[11px]">
              <span className="text-cyan-400 font-bold tracking-wider">{currentChapter.epoch}</span>
              <span className="text-zinc-400 font-mono">{Math.round(scrollProgress * 100)}% DISPLACEMENT</span>
            </div>

            {/* Titles */}
            <div>
              <h2 className="font-['Lalezar'] text-2xl sm:text-3xl text-white tracking-tight leading-tight">
                {currentChapter.persianTitle}
              </h2>
              <h3 className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest mt-0.5">
                {currentChapter.title}
              </h3>
            </div>

            {/* Description */}
            <p className="text-xs text-zinc-300 leading-relaxed font-light">
              {currentChapter.desc}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10 font-mono text-[10px]">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-300">
                <span className="text-zinc-400 block text-[9px]">اتساع نسبیتی زمان:</span>
                <span className="text-cyan-300 font-bold">{currentChapter.stat1}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5 text-zinc-300">
                <span className="text-zinc-400 block text-[9px]">پارامتر ساختاری:</span>
                <span className="text-[#b8ff3d] font-bold">{currentChapter.stat2}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Side Scroll Indicator & Spline Progress Bar */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3 pointer-events-none">
          <span className="font-mono text-[10px] text-zinc-400 -rotate-90 tracking-widest origin-center mb-4">
            CHRONO RAIL
          </span>
          <div className="w-1.5 h-48 bg-white/10 rounded-full relative overflow-hidden">
            <div
              className="w-full bg-gradient-to-b from-cyan-400 via-violet-500 to-[#b8ff3d] rounded-full transition-all duration-150"
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
                      ? 'bg-cyan-400 border-cyan-300 shadow-md shadow-cyan-400/50'
                      : 'bg-transparent border-white/20'
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* Bottom Floating Scroll Gesture Cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 backdrop-blur-md pointer-events-none font-mono text-[11px] text-zinc-300 animate-pulse">
          <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
          <span>اسکرول ماوس یا لمس صفحه برای پرواز در زمان و فضا</span>
        </div>
      </div>
    </BlueprintHUD>
  );
}
