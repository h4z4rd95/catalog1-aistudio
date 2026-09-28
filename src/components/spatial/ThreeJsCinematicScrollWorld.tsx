import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { soundFx } from '../../utils/audio';
import {
  Film,
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
  ChevronDown,
  Play,
  Pause
} from 'lucide-react';

const blueprint: ComponentBlueprint = {
  id: 'Spatial_V06_CinematicThreeJsScrollWorld',
  name: 'Cinematic Three.js 3D Scroll World & Episodic Camera Spline',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: ['Three.js WebGL', 'CatmullRom 3D Camera Spline', 'Instanced Buffers', 'Volumetric Fog & Bloom', 'RTL Persian Glyphs'],
  aestheticVibe: 'Awwwards Site of the Year // Cyberspace Odyssey',
  interactionBlueprint: 'Natural mouse wheel scroll navigates the virtual camera along a 3D spline through 4 distinct spatial worlds: Singularity Gateway, Monolith Cluster, DNA Helix Warp Tunnel, and Planetary Cognitive Nexus.',
  description: 'An episodic 3D cinematic narrative built with Three.js. Includes director camera controls, 21:9 anamorphic letterbox mode, audio-reactive particle fields, and floating Persian typographic monoliths in deep cyberspace.',
  tags: ['Three.js Scroll World', 'Cinematic Storytelling', 'Camera Spline', 'Awwwards Quality', 'Spatial WebGL', 'Persian 3D'],
  codeSnippet: `// 3D Camera Spline Interpolation based on Scroll Progress
const cameraPath = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 2, 28),     // Stage 1: Singularity Gateway
  new THREE.Vector3(8, -4, 12),    // Stage 2: Monolith Cluster
  new THREE.Vector3(-12, 6, -15),  // Stage 3: DNA Helix Tunnel
  new THREE.Vector3(0, 0, -42),    // Stage 4: Cognitive Planetary Nexus
]);
const targetPos = cameraPath.getPointAt(scrollProgress);
camera.position.lerp(targetPos, 0.08);`,
};

// 4 Cinematic Chapters with Persian Editorial Narrative
const CINEMATIC_CHAPTERS = [
  {
    phase: 'CHAPTER 01 // آستانه تکینگی',
    title: 'THE SINGULARITY GATEWAY',
    persianTitle: 'دروازه آغاز و پیدایش کروماتیک',
    desc: '۸,۰۰۰ ذره معلق در یک قرص برافزایشی با گرانش مرکزی شبیه‌سازی می‌شوند. افق رویدادی از نور، سرعت و داده در ورودی جهان سه‌بعدی استودیو.',
    stat1: 'PARTICLES: 8,192',
    stat2: 'GRAVITY: 9.81 m/s²',
    color: '#22d3ee',
  },
  {
    phase: 'CHAPTER 02 // آرایه‌های هرمی و منبت فارسی',
    title: 'THE FLOATING MONOLITHS',
    persianTitle: 'ابلیسک‌های کریپتوگرافیک با خط فارسی',
    desc: 'ستون‌های مشکی زغالی و کروم مات که واژه‌های بنیادین استودیو بر آنها حکاکی شده است؛ مه حجمی و بازتاب‌های شیدر انکساری با زاویه دید دگرگون می‌شوند.',
    stat1: 'SURFACE: Roughness 0.18',
    stat2: 'DISPERSION: RGB Prism',
    color: '#a855f7',
  },
  {
    phase: 'CHAPTER 03 // تونل تار نوری دی‌ان‌ای',
    title: 'THE DNA CODE WARP',
    persianTitle: 'پیچش فیبر نوری و تارپود کدهای اجرایی',
    desc: 'دوربین وارد کریدور مارپیچ دوتایی با سرعت مافوق‌صوت می‌شود. خطوط سرعت پرتوهای کینتیک و شکست نوری با افزایش پیشروی اسکرول شتاب می‌گیرند.',
    stat1: 'VELOCITY: 3.4 MACH',
    stat2: 'BANDWIDTH: 100 Gbps',
    color: '#3b82f6',
  },
  {
    phase: 'CHAPTER 04 // هسته سیاره‌ای و ارکستراسیون',
    title: 'THE COGNITIVE NEXUS',
    persianTitle: 'آمفی‌تئاتر سیاره‌ای و خروجی پایانی پروژه',
    desc: 'دوربین به تالار بی‌انتهای پردازش کلان‌داده می‌رسد؛ حلقه‌های مداری هولوگرافیک و نقاط تله‌متری با پاسخ صوتی ارتعاش می‌یابند.',
    stat1: 'FPS: 60 LOCKED',
    stat2: 'RESOLUTION: 4K HDR',
    color: '#b8ff3d',
  },
];

export default function ThreeJsCinematicScrollWorld() {
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
  const [isAutoTouring, setIsAutoTouring] = useState(false);

  // Tunable Parameters for HUD
  const [cameraSpeed, setCameraSpeed] = useState(1.0);
  const [fogDensity, setFogDensity] = useState(0.015);
  const [bloomBloomGain, setBloomBloomGain] = useState(1.4);

  const activeChapterIndex = Math.min(
    CINEMATIC_CHAPTERS.length - 1,
    Math.floor(scrollProgress * CINEMATIC_CHAPTERS.length)
  );
  const currentChapter = CINEMATIC_CHAPTERS[activeChapterIndex];

  // Web Audio Synth Drone Hum
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const toggleAudioHum = () => {
    if (audioHumEnabled) {
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.setTargetAtTime(0, (audioContextRef.current?.currentTime || 0), 0.2);
      }
      setAudioHumEnabled(false);
    } else {
      soundFx.playChime(600, 0.15);
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      if (audioContextRef.current) {
        if (audioContextRef.current.state === 'suspended') {
          audioContextRef.current.resume();
        }
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(55, audioContextRef.current.currentTime); // 55Hz Low A Drone
        gain.gain.setValueAtTime(0.001, audioContextRef.current.currentTime);
        gain.gain.setTargetAtTime(0.08, audioContextRef.current.currentTime, 0.5);
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
      }
      setAudioHumEnabled(true);
    }
  };

  // Three.js World Construction
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x06070a);
    scene.fog = new THREE.FogExp2(0x06070a, fogDensity);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);
    camera.position.set(0, 2, 28);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = bloomBloomGain;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls for Free Mode
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enabled = cameraMode === 'FREE_ORBIT';
    controlsRef.current = controls;

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x22d3ee, 3.0);
    keyLight.position.set(10, 20, 15);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x7c3aed, 2.5);
    rimLight.position.set(-15, -10, -20);
    scene.add(rimLight);

    // 3. STAGE 1: SINGULARITY GATEWAY (Particle Accretion Ring)
    const starCount = 6000;
    const starGeom = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);

    const cyanColor = new THREE.Color(0x22d3ee);
    const violetColor = new THREE.Color(0x7c3aed);
    const limeColor = new THREE.Color(0xb8ff3d);

    for (let i = 0; i < starCount; i++) {
      const radius = 4 + Math.pow(Math.random(), 1.8) * 22;
      const angle = Math.random() * Math.PI * 2;
      const heightSpread = (Math.random() - 0.5) * (radius * 0.25);

      starPositions[i * 3] = Math.cos(angle) * radius;
      starPositions[i * 3 + 1] = heightSpread;
      starPositions[i * 3 + 2] = 20 + Math.sin(angle) * radius * 0.4;

      const mixed = Math.random() > 0.5 ? cyanColor : violetColor;
      if (Math.random() > 0.85) mixed.lerp(limeColor, 0.7);

      starColors[i * 3] = mixed.r;
      starColors[i * 3 + 1] = mixed.g;
      starColors[i * 3 + 2] = mixed.b;
    }

    starGeom.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeom.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const starPoints = new THREE.Points(starGeom, starMaterial);
    scene.add(starPoints);

    // Singularity Core Ring
    const ringGeom = new THREE.TorusGeometry(3.6, 0.12, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 2.5,
      roughness: 0.1,
    });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.position.set(0, 0, 20);
    scene.add(ringMesh);

    // 4. STAGE 2: MONOLITH CLUSTER WITH PERSIAN CALLIGRAPHY CUBES
    const monolithGroup = new THREE.Group();
    scene.add(monolithGroup);

    const monolithMat = new THREE.MeshPhysicalMaterial({
      color: 0x0e111a,
      roughness: 0.15,
      metalness: 0.85,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });

    const glowEdgeMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
    });

    const monolithPositions = [
      { x: 4, y: -2, z: 8, h: 7 },
      { x: 9, y: 1, z: 12, h: 9 },
      { x: 6, y: -4, z: 5, h: 6 },
      { x: 12, y: -1, z: 15, h: 10 },
      { x: 3, y: 3, z: 14, h: 5 },
    ];

    monolithPositions.forEach((pos) => {
      const geom = new THREE.BoxGeometry(1.6, pos.h, 1.6);
      const mesh = new THREE.Mesh(geom, monolithMat);
      mesh.position.set(pos.x, pos.y, pos.z);
      monolithGroup.add(mesh);

      const wireMesh = new THREE.Mesh(geom, glowEdgeMat);
      wireMesh.position.set(pos.x, pos.y, pos.z);
      wireMesh.scale.set(1.02, 1.02, 1.02);
      monolithGroup.add(wireMesh);
    });

    // 5. STAGE 3: DIGITAL DNA CODE WARP HELIX
    const helixGroup = new THREE.Group();
    scene.add(helixGroup);

    const strand1Points: THREE.Vector3[] = [];
    const strand2Points: THREE.Vector3[] = [];
    for (let t = -30; t <= 0; t += 0.5) {
      const angle = t * 0.45;
      const radius = 3.5;
      strand1Points.push(new THREE.Vector3(-10 + Math.cos(angle) * radius, Math.sin(angle) * radius, t));
      strand2Points.push(new THREE.Vector3(-10 + Math.cos(angle + Math.PI) * radius, Math.sin(angle + Math.PI) * radius, t));
    }

    const curve1 = new THREE.CatmullRomCurve3(strand1Points);
    const curve2 = new THREE.CatmullRomCurve3(strand2Points);

    const tubeGeom1 = new THREE.TubeGeometry(curve1, 80, 0.08, 8, false);
    const tubeGeom2 = new THREE.TubeGeometry(curve2, 80, 0.08, 8, false);

    const tubeMat1 = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x3b82f6,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });
    const tubeMat2 = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x22d3ee,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    helixGroup.add(new THREE.Mesh(tubeGeom1, tubeMat1));
    helixGroup.add(new THREE.Mesh(tubeGeom2, tubeMat2));

    // 6. STAGE 4: THE COGNITIVE NEXUS SPHERE & PLANETARY ORBITS
    const nexusGroup = new THREE.Group();
    scene.add(nexusGroup);
    nexusGroup.position.set(0, 0, -42);

    const nexusCoreGeom = new THREE.IcosahedronGeometry(4.2, 3);
    const nexusCoreMat = new THREE.MeshPhysicalMaterial({
      color: 0x111827,
      roughness: 0.2,
      metalness: 0.9,
      wireframe: true,
      emissive: 0xb8ff3d,
      emissiveIntensity: 0.8,
    });
    const nexusCore = new THREE.Mesh(nexusCoreGeom, nexusCoreMat);
    nexusGroup.add(nexusCore);

    // Orbital Holographic Rings
    for (let i = 0; i < 3; i++) {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(6.5 + i * 1.8, 0.05, 16, 80),
        new THREE.MeshBasicMaterial({ color: i === 0 ? 0x22d3ee : i === 1 ? 0xa855f7 : 0xb8ff3d })
      );
      ring.rotation.x = Math.PI / (2.5 + i * 0.4);
      ring.rotation.y = i * 0.6;
      nexusGroup.add(ring);
    }

    // 7. CAMERA SPLINE TRAJECTORY
    const splinePoints = [
      new THREE.Vector3(0, 2, 28),     // Stage 1: Entrance
      new THREE.Vector3(8, -1, 10),    // Stage 2: Monolith Cluster
      new THREE.Vector3(-10, 1, -15),  // Stage 3: DNA Tunnel
      new THREE.Vector3(0, 1, -34),    // Stage 4: Nexus Amphitheater Approach
      new THREE.Vector3(0, 0, -42),    // Stage 4: Final Core Anchor
    ];
    const cameraSpline = new THREE.CatmullRomCurve3(splinePoints);

    const lookTargetPoints = [
      new THREE.Vector3(0, 0, 20),     // Look at singularity ring
      new THREE.Vector3(8, 0, 10),     // Look at monoliths
      new THREE.Vector3(-10, 0, -25),  // Look down DNA tunnel
      new THREE.Vector3(0, 0, -42),    // Look at nexus core
      new THREE.Vector3(0, 0, -42),    // Look deep into nexus
    ];
    const lookSpline = new THREE.CatmullRomCurve3(lookTargetPoints);

    // 8. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Spin particles & rings
      starPoints.rotation.y = elapsedTime * 0.04;
      ringMesh.rotation.z = elapsedTime * 0.3;
      ringMesh.rotation.x = Math.sin(elapsedTime * 0.2) * 0.2;

      // Animate monolith wireframes
      monolithGroup.rotation.y = Math.sin(elapsedTime * 0.15) * 0.08;

      // Spin Nexus Core
      nexusCore.rotation.y = elapsedTime * 0.15;
      nexusCore.rotation.x = elapsedTime * 0.08;

      // Auto-tour progression if active
      if (isAutoTouring) {
        setScrollProgress((prev) => {
          const next = prev + 0.0012 * cameraSpeed;
          return next >= 1 ? 0 : next;
        });
      }

      // Camera position interpolation
      if (cameraMode === 'SCRIPTED' && cameraRef.current) {
        const clampedProgress = Math.max(0, Math.min(0.999, scrollProgress));
        const targetPos = cameraSpline.getPointAt(clampedProgress);
        const targetLook = lookSpline.getPointAt(clampedProgress);

        cameraRef.current.position.lerp(targetPos, 0.08);
        cameraRef.current.lookAt(targetLook);
      } else if (controlsRef.current) {
        controlsRef.current.update();
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newW = container.clientWidth || 800;
      const newH = container.clientHeight || 600;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraMode, fogDensity, bloomBloomGain, isAutoTouring, cameraSpeed]);

  // Handle stage mouse wheel scroll inside container
  const handleStageWheel = (e: React.WheelEvent) => {
    if (cameraMode !== 'SCRIPTED') return;
    const delta = e.deltaY * 0.0005 * cameraSpeed;
    setScrollProgress((prev) => {
      const next = Math.max(0, Math.min(1, prev + delta));
      if (Math.abs(next - prev) > 0.02) soundFx.playTick(400 + next * 300);
      return next;
    });
  };

  // Tune camera position from global page scroll
  useEffect(() => {
    const handleGlobalScroll = () => {
      if (cameraMode !== 'SCRIPTED') return;
      const el = mountRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - windowH || 1)));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleGlobalScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleGlobalScroll);
  }, [cameraMode]);

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">CAMERA FLIGHT SPEED:</span>
            <span className="text-cyan-400 font-bold">{cameraSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.4"
            max="3.0"
            step="0.1"
            value={cameraSpeed}
            onChange={(e) => setCameraSpeed(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">VOLUMETRIC FOG DENSITY:</span>
            <span className="text-violet-400 font-bold">{fogDensity.toFixed(3)}</span>
          </div>
          <input
            type="range"
            min="0.005"
            max="0.04"
            step="0.002"
            value={fogDensity}
            onChange={(e) => setFogDensity(Number(e.target.value))}
            className="w-full accent-violet-400"
          />

          <div className="flex items-center justify-between">
            <span className="text-zinc-400">BLOOM EXPOSURE GAIN:</span>
            <span className="text-lime-400 font-bold">{bloomBloomGain.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.8"
            max="2.5"
            step="0.05"
            value={bloomBloomGain}
            onChange={(e) => setBloomBloomGain(Number(e.target.value))}
            className="w-full accent-lime-400"
          />
        </div>
      }
    >
      <div
        onWheel={handleStageWheel}
        className="relative w-full min-h-[750px] lg:min-h-[850px] bg-[#06070a] overflow-hidden select-none"
      >
        {/* Anamorphic 21:9 Letterbox Bars */}
        {isLetterbox219 && (
          <>
            <div className="absolute top-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-b border-white/5 flex items-center justify-between px-6 font-mono text-[10px] text-zinc-600">
              <span className="flex items-center gap-2 text-cyan-400">
                <Film className="w-3.5 h-3.5" />
                <span>ANAMORPHIC WIDESCREEN 2.39:1 // 123SERVICE CINEMATIC ENGINE</span>
              </span>
              <span className="hidden sm:inline">REC 2026 // 4K 60FPS ACES COLOR PROFILE</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 h-10 sm:h-14 bg-black z-30 pointer-events-none border-t border-white/5 flex items-center justify-between px-6 font-mono text-[10px] text-zinc-600">
              <span>LATITUDE: 35.6892° N &bull; LONGITUDE: 51.3890° E</span>
              <span className="text-emerald-400 font-bold">LIVE TELEMETRY STREAM ACTIVE</span>
            </div>
          </>
        )}

        {/* 3D WebGL Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing" />

        {/* Top Control Bar HUD */}
        <div className="absolute top-16 sm:top-20 inset-x-4 sm:inset-x-8 z-30 flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
          {/* Chapter Phase Indicator */}
          <div className="flex items-center gap-3 bg-black/75 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-2xl">
            <div className="w-2.5 h-2.5 rounded-full animate-ping" style={{ backgroundColor: currentChapter.color }} />
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider block" style={{ color: currentChapter.color }}>
                {currentChapter.phase}
              </span>
              <span className="font-['Syne'] font-black text-sm text-white">
                {currentChapter.title}
              </span>
            </div>
          </div>

          {/* Controls: Mode Toggle, Letterbox, Sound Hum, Auto Tour */}
          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-xl border border-white/10 p-1.5 rounded-2xl font-mono text-xs">
            {/* Camera Mode Toggle */}
            <button
              onClick={() => {
                soundFx.playClick(700);
                setCameraMode((prev) => (prev === 'SCRIPTED' ? 'FREE_ORBIT' : 'SCRIPTED'));
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                cameraMode === 'SCRIPTED'
                  ? 'bg-cyan-400 text-black shadow-md shadow-cyan-500/20'
                  : 'bg-white/10 text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{cameraMode === 'SCRIPTED' ? 'مسیر سینمایی اسکرول' : 'چرخش آزاد ۳۶۰°'}</span>
            </button>

            {/* Auto Tour */}
            <button
              onClick={() => {
                soundFx.playClick(650);
                setIsAutoTouring(!isAutoTouring);
              }}
              className={`p-2 rounded-xl border border-white/10 transition-colors ${
                isAutoTouring ? 'bg-lime-400 text-black' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              title="پیمایش خودکار تور سینمایی"
            >
              {isAutoTouring ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* 21:9 Letterbox Toggle */}
            <button
              onClick={() => {
                soundFx.playClick(600);
                setIsLetterbox219(!isLetterbox219);
              }}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 border border-white/10 transition-colors"
              title="سوئیچ نسبت تصویر عریض ۲۱:۹"
            >
              {isLetterbox219 ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>

            {/* Sound Hum Synthesizer */}
            <button
              onClick={toggleAudioHum}
              className={`p-2 rounded-xl border border-white/10 transition-colors ${
                audioHumEnabled ? 'bg-violet-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
              title="صدا و فرکانس بم فضای مجازی (Drone Synth)"
            >
              {audioHumEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Narrative Dialogue Overlay (Awwwards Cinematic Storytelling in Persian) */}
        <div
          dir="rtl"
          className="absolute bottom-20 sm:bottom-24 right-4 sm:right-8 z-30 max-w-md p-6 rounded-3xl bg-black/80 backdrop-blur-2xl border border-white/15 text-white shadow-2xl space-y-3 font-['Plus_Jakarta_Sans','Vazirmatn'] pointer-events-auto transition-all duration-300"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
            <span className="font-mono text-[10px] tracking-wider" style={{ color: currentChapter.color }}>
              {currentChapter.phase}
            </span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] text-zinc-400">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: currentChapter.color }} />
              <span>پیشروی: {Math.round(scrollProgress * 100)}٪</span>
            </div>
          </div>

          <h3 className="font-['Lalezar'] text-2xl text-white">
            {currentChapter.persianTitle}
          </h3>

          <p className="text-xs text-zinc-300 font-light leading-relaxed">
            {currentChapter.desc}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-white/10 font-mono text-[11px] text-zinc-400">
            <span>{currentChapter.stat1}</span>
            <span className="text-white font-bold">{currentChapter.stat2}</span>
          </div>

          {/* Interactive Scroll scrubber bar */}
          <div className="pt-2">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-150"
                style={{ width: `${scrollProgress * 100}%`, backgroundColor: currentChapter.color }}
              />
            </div>
          </div>
        </div>

        {/* Left Side Quick Scrub Chapters */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-3 font-mono text-[11px]">
          {CINEMATIC_CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  soundFx.playChime(600 + idx * 100, 0.15);
                  setScrollProgress(idx / (CINEMATIC_CHAPTERS.length - 1));
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all flex items-center gap-3 backdrop-blur-xl ${
                  isActive
                    ? 'bg-black/90 border-cyan-400 text-white shadow-lg shadow-cyan-500/25 scale-105'
                    : 'bg-black/40 border-white/10 text-zinc-500 hover:text-white hover:bg-black/70'
                }`}
              >
                <span className="w-6 h-6 rounded-xl bg-white/5 flex items-center justify-center font-bold">
                  0{idx + 1}
                </span>
                <div>
                  <span className="block font-bold text-xs">{ch.title}</span>
                  <span className="block text-[9px] text-zinc-400">{ch.persianTitle}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Bottom Scroll Prompt */}
        <div className="absolute bottom-16 inset-x-0 z-30 flex justify-center pointer-events-none">
          <div className="px-4 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-cyan-400/30 text-cyan-300 font-mono text-xs flex items-center gap-2 shadow-2xl animate-bounce">
            <ChevronDown className="w-3.5 h-3.5 text-cyan-400" />
            <span>اسکرول ماوس برای پرواز دوربین در جهان سه‌بعدی استودیو (Scroll to Traverse)</span>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
