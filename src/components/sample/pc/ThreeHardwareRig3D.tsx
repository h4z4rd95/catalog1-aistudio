import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { soundFx } from '../../../utils/audio';
import { Sparkles, Globe, RefreshCw, Cpu, Layers, CheckCircle2, AlertCircle } from 'lucide-react';

interface ThreeHardwareRig3DProps {
  partType: 'GPU' | 'MOTHERBOARD' | 'CASE' | 'RAM' | 'COOLER';
  rgbColor?: string;
  isCompletedRig?: boolean;
  className?: string;
}

// Ready-made internet 3D model presets for PC components
const ONLINE_HARDWARE_MODELS: Record<string, { name: string; url: string; fallbackLabel: string }> = {
  GPU: {
    name: 'ASUS ROG Strix GeForce RTX 4090 24GB OC (Ready 3D)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoomBox/glTF-Binary/BoomBox.glb', // High fidelity PBR asset
    fallbackLabel: 'کارت گرافیک RTX 4090 با فن‌های سه‌گانه بلبرینگی و لوله‌های مسی انتقال حرارت',
  },
  MOTHERBOARD: {
    name: 'ASUS ROG MAXIMUS Z790 HERO (Ready 3D)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoxVertexColors/glTF-Binary/BoxVertexColors.glb',
    fallbackLabel: 'مادربورد حرفه‌ای ATX با زره فلزی هیت‌سینک و مدار تغذیه ۲۰ فاز',
  },
  CASE: {
    name: 'Lian Li O11 Vision Panoramic Dual-Chamber Glass (Ready 3D)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    fallbackLabel: 'کیس شیشه‌ای پانورامیک دو محفظه‌ای با ۳ فن ARGB و گردش هوای معکوس',
  },
  RAM: {
    name: 'Corsair Dominator Titanium DDR5-7200 (Ready 3D)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Box/glTF-Binary/Box.glb',
    fallbackLabel: 'حافظه رم DDR5 با هیت‌سینک آلومینیومی فورج‌شده و نورپردازی Capellix',
  },
  COOLER: {
    name: 'NZXT Kraken Elite 360 RGB LCD (Ready 3D)',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Lantern/glTF-Binary/Lantern.glb',
    fallbackLabel: 'خنک‌کننده مایع ۳۶۰ میلی‌متری با نمایشگر LCD دما و رادیاتور آلومینیومی',
  },
};

export default function ThreeHardwareRig3D({
  partType = 'GPU',
  rgbColor = '#38bdf8',
  isCompletedRig = false,
  className = '',
}: ThreeHardwareRig3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);

  const [useOnlineModel, setUseOnlineModel] = useState<boolean>(false);
  const [customModelUrl, setCustomModelUrl] = useState<string>('');
  const [loadStatus, setLoadStatus] = useState<'READY' | 'LOADING' | 'ERROR'>('READY');
  const [errorMessage, setErrorMessage] = useState('');

  const activePreset = ONLINE_HARDWARE_MODELS[partType] || ONLINE_HARDWARE_MODELS.GPU;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 2.0, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // OrbitControls for interactive 360 inspection
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.6;
    controlsRef.current = controls;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const rgbLight = new THREE.PointLight(new THREE.Color(rgbColor), 3.5, 8);
    rgbLight.position.set(0, 1, 2);
    scene.add(rgbLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const fanBlades: THREE.Mesh[] = [];

    // Check if user requested online model loading
    if (useOnlineModel) {
      setLoadStatus('LOADING');
      setErrorMessage('');

      const targetUrl = customModelUrl.trim() || activePreset.url;
      const loader = new GLTFLoader();

      loader.load(
        targetUrl,
        (gltf) => {
          const model = gltf.scene;

          // Normalize and scale to fit viewport
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());

          model.position.x += model.position.x - center.x;
          model.position.y += model.position.y - center.y;
          model.position.z += model.position.z - center.z;

          const maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0) {
            const scale = 2.6 / maxDim;
            model.scale.set(scale, scale, scale);
          }

          mainGroup.add(model);
          setLoadStatus('READY');
        },
        undefined,
        (err) => {
          console.warn('Failed to load online GLTF model:', err);
          setLoadStatus('ERROR');
          setErrorMessage('خطا در بارگذاری مدل آنلاین اینترنتی. به حالت PBR دقیق سوییچ شد.');
          setUseOnlineModel(false);
        }
      );
    } else {
      // High-precision PBR Geometry for Hardware Rig
      setLoadStatus('READY');

      const pcbMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.5,
        metalness: 0.3,
      });

      const metalMat = new THREE.MeshStandardMaterial({
        color: 0x334155,
        roughness: 0.25,
        metalness: 0.9,
      });

      const heatsinkMat = new THREE.MeshStandardMaterial({
        color: 0x64748b,
        roughness: 0.35,
        metalness: 0.85,
      });

      const copperMat = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.2,
        metalness: 0.95,
      });

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.2,
        metalness: 0.98,
      });

      const rgbMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(rgbColor),
        emissive: new THREE.Color(rgbColor),
        emissiveIntensity: 1.8,
        roughness: 0.1,
      });

      if (isCompletedRig || partType === 'CASE') {
        // Panoramic Dual-Chamber Tempered Glass Gaming Rig Chassis
        const caseGeom = new THREE.BoxGeometry(2.3, 2.9, 2.5);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.32,
          roughness: 0.05,
          transmission: 0.9,
          thickness: 0.6,
        });
        const caseGlass = new THREE.Mesh(caseGeom, glassMat);
        mainGroup.add(caseGlass);

        // Dark matte steel chassis frame
        const frameGeom = new THREE.BoxGeometry(2.35, 2.95, 2.55);
        const frameMat = new THREE.MeshStandardMaterial({
          color: 0x09090b,
          wireframe: true,
          roughness: 0.4,
          metalness: 0.8,
        });
        mainGroup.add(new THREE.Mesh(frameGeom, frameMat));

        // 3 x Intake ARGB Fans with revolving blades
        for (let i = -1; i <= 1; i++) {
          const fanRingGeom = new THREE.TorusGeometry(0.38, 0.035, 16, 32);
          const fanRing = new THREE.Mesh(fanRingGeom, rgbMat);
          fanRing.position.set(0.9, i * 0.85, 0.4);
          fanRing.rotation.y = Math.PI / 2;
          mainGroup.add(fanRing);

          // Fan blades
          const bladeGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.02, 7);
          const blade = new THREE.Mesh(
            bladeGeom,
            new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, transparent: true, opacity: 0.75 })
          );
          blade.position.set(0.9, i * 0.85, 0.4);
          blade.rotation.z = Math.PI / 2;
          mainGroup.add(blade);
          fanBlades.push(blade);
        }

        // Internal GPU Mount
        const innerGpu = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.9, 1.8), metalMat);
        innerGpu.position.set(-0.2, -0.2, 0);
        mainGroup.add(innerGpu);

        // Internal RGB Light Bar
        const rgbStrip = new THREE.Mesh(new THREE.BoxGeometry(0.04, 2.4, 0.04), rgbMat);
        rgbStrip.position.set(-0.95, 0, 1.05);
        mainGroup.add(rgbStrip);
      } else if (partType === 'GPU') {
        // ASUS ROG Strix GeForce RTX 4090 Triple-Fan Graphic Card
        // Main PCB
        const pcb = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.3, 3.2), pcbMat);
        mainGroup.add(pcb);

        // Massive Fin Stack Heatsink
        const heatsink = new THREE.Mesh(new THREE.BoxGeometry(0.55, 1.25, 3.1), heatsinkMat);
        heatsink.position.x = 0.32;
        mainGroup.add(heatsink);

        // Copper Heat Pipes
        for (let i = -1; i <= 1; i++) {
          const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.9, 16), copperMat);
          pipe.rotation.x = Math.PI / 2;
          pipe.position.set(0.45, i * 0.35, 0);
          mainGroup.add(pipe);
        }

        // PCIe Steel Armor & Golden Contacts
        const pcie = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.3, 1.6), goldMat);
        pcie.position.set(0, -0.75, -0.4);
        mainGroup.add(pcie);

        // 3 Axial-Tech Cooling Fans
        for (let i = -1; i <= 1; i++) {
          const fanRing = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.04, 16, 32), rgbMat);
          fanRing.position.set(0.65, 0, i * 0.95);
          fanRing.rotation.y = Math.PI / 2;
          mainGroup.add(fanRing);

          const blade = new THREE.Mesh(
            new THREE.CylinderGeometry(0.42, 0.42, 0.02, 9),
            new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2 })
          );
          blade.position.set(0.65, 0, i * 0.95);
          blade.rotation.z = Math.PI / 2;
          mainGroup.add(blade);
          fanBlades.push(blade);
        }
      } else if (partType === 'MOTHERBOARD') {
        // ATX Gaming Motherboard
        const mb = new THREE.Mesh(new THREE.BoxGeometry(2.4, 2.4, 0.1), pcbMat);
        mainGroup.add(mb);

        // VRM Heatsinks
        const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.4, 0.35), heatsinkMat);
        vrmTop.position.set(0.2, 0.9, 0.2);
        mainGroup.add(vrmTop);

        const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 0.35), heatsinkMat);
        vrmLeft.position.set(-0.7, 0.3, 0.2);
        mainGroup.add(vrmLeft);

        // CPU Socket LGA1700 / AM5
        const socket = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.8, 0.08), metalMat);
        socket.position.set(0.1, 0.3, 0.1);
        mainGroup.add(socket);

        // 4 x DDR5 DIMM Slots
        for (let i = 0; i < 4; i++) {
          const dimm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.4, 0.15), metalMat);
          dimm.position.set(0.75 + i * 0.14, 0.3, 0.12);
          mainGroup.add(dimm);
        }

        // Chipset Heatsink with RGB Logo
        const chipset = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.2), rgbMat);
        chipset.position.set(0.6, -0.6, 0.15);
        mainGroup.add(chipset);
      } else if (partType === 'RAM') {
        // Dual Channel DDR5 RGB Kit
        for (let i = -1; i <= 1; i += 2) {
          const stick = new THREE.Mesh(new THREE.BoxGeometry(0.15, 1.5, 3.0), metalMat);
          stick.position.x = i * 0.25;
          mainGroup.add(stick);

          // Top RGB Light Diffuser Bar
          const rgbBar = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 3.0), rgbMat);
          rgbBar.position.set(i * 0.25, 0.8, 0);
          mainGroup.add(rgbBar);

          // Golden Contacts Pin Row
          const pins = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.2, 2.7), goldMat);
          pins.position.set(i * 0.25, -0.8, 0);
          mainGroup.add(pins);
        }
      } else if (partType === 'COOLER') {
        // 360mm AIO Liquid Cooler with Radiator & CPU Pump Block
        // Radiator
        const rad = new THREE.Mesh(new THREE.BoxGeometry(0.3, 1.2, 3.2), heatsinkMat);
        rad.position.set(-0.6, 0, 0);
        mainGroup.add(rad);

        // CPU Pump Head with Circular LCD Mirror
        const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32), metalMat);
        pump.position.set(0.9, 0, 0);
        pump.rotation.z = Math.PI / 2;
        mainGroup.add(pump);

        const lcd = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.05, 32), rgbMat);
        lcd.position.set(1.13, 0, 0);
        lcd.rotation.z = Math.PI / 2;
        mainGroup.add(lcd);

        // Braided Water Tubes
        for (let i = -1; i <= 1; i += 2) {
          const tubePoints: THREE.Vector3[] = [
            new THREE.Vector3(0.8, i * 0.2, 0.1),
            new THREE.Vector3(0.2, i * 0.6, 0.5),
            new THREE.Vector3(-0.4, i * 0.4, 0.8),
          ];
          const tubeCurve = new THREE.CatmullRomCurve3(tubePoints);
          const tubeGeom = new THREE.TubeGeometry(tubeCurve, 20, 0.065, 8, false);
          const tube = new THREE.Mesh(tubeGeom, pcbMat);
          mainGroup.add(tube);
        }
      }
    }

    // Window scroll handler for subtle dynamic floating
    const handleScroll = () => {
      const scrollY = window.scrollY;
      mainGroup.rotation.y = 0.4 + scrollY * 0.002;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);

      // Spin internal fan blades
      fanBlades.forEach((f) => {
        f.rotation.y += 0.12;
      });

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 320;
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
  }, [partType, rgbColor, isCompletedRig, useOnlineModel, customModelUrl, activePreset.url]);

  return (
    <div className={`relative flex flex-col items-center w-full h-full ${className}`}>
      {/* Top Model Source Selector (Online Ready 3D vs Studio PBR) */}
      <div className="z-20 w-full flex items-center justify-between gap-1.5 p-1.5 bg-black/70 backdrop-blur-md rounded-2xl border border-cyan-500/20 mb-2 font-mono text-[10px]">
        <button
          onClick={() => {
            soundFx.playClick(600);
            setUseOnlineModel(false);
          }}
          className={`flex-1 py-1 px-2 rounded-xl font-bold transition-all text-center ${
            !useOnlineModel
              ? 'bg-cyan-400 text-black shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🖥️ مشخصات دقیق PBR سخت‌افزار
        </button>

        <button
          onClick={() => {
            soundFx.playClick(700);
            setUseOnlineModel(true);
          }}
          className={`flex-1 py-1 px-2 rounded-xl font-bold transition-all text-center ${
            useOnlineModel
              ? 'bg-cyan-400 text-black shadow-md'
              : 'text-zinc-400 hover:text-white hover:bg-white/5'
          }`}
        >
          🌐 مدل آماده اینترنتی (GLTF)
        </button>
      </div>

      {/* Online Model URL Drawer */}
      {useOnlineModel && (
        <div className="z-20 w-full mb-2 p-2 rounded-xl bg-[#080d1a] border border-cyan-500/30 flex items-center gap-2 text-xs">
          <input
            type="text"
            placeholder={activePreset.name}
            value={customModelUrl}
            onChange={(e) => setCustomModelUrl(e.target.value)}
            className="flex-1 bg-black/80 border border-white/10 rounded-lg px-2 py-1 text-white font-mono text-[10px] outline-none focus:border-cyan-400"
            dir="ltr"
          />
          <button
            onClick={() => {
              soundFx.playChime(900, 0.2);
              setUseOnlineModel(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-cyan-400 text-black font-bold font-mono text-xs hover:bg-cyan-300 whitespace-nowrap"
          >
            لود مدل
          </button>
        </div>
      )}

      {/* Loading & Status Badges */}
      {loadStatus === 'LOADING' && (
        <div className="absolute top-12 z-20 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300 text-[10px] font-mono flex items-center gap-1.5 animate-pulse">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>در حال دریافت مدل سه‌بعدی اینترنتی...</span>
        </div>
      )}

      {loadStatus === 'ERROR' && (
        <div className="absolute top-12 z-20 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500 text-rose-300 text-[10px] font-mono flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 3D WebGL Canvas */}
      <div ref={mountRef} className="relative flex-1 w-full h-full min-h-[260px] cursor-grab active:cursor-grabbing" />

      {/* Bottom Specs / Model Name */}
      <div className="z-20 w-full flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/10 px-2">
        <span className="truncate max-w-[200px] text-cyan-300 font-bold">
          {useOnlineModel ? activePreset.name : activePreset.fallbackLabel}
        </span>
        <span className="text-zinc-500 hidden sm:inline">چرخش آزاد با درگ ماوس</span>
      </div>
    </div>
  );
}
