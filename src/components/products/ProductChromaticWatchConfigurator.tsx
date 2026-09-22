import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Watch, ShieldCheck, Sparkles, Droplets, RotateCcw, Check, ShoppingBag, Eye } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'product_v01_chromaticwatchconfigurator',
  name: 'Chromatic Liquid Glassmorphic 3D Chronometer Configurator',
  category: 'Product',
  batch: 'Batch 7: Spatial E-Commerce & 3D Configurator Showcases',
  techStack: ['React 19', 'Three.js WebGL', 'Procedural 3D Watch Geometry', 'Interactive Material Shader', 'Chime Audio Engine'],
  aestheticVibe: 'Chromatic Liquid Gradient / Luxury High-Tech Horology',
  interactionBlueprint: 'Real-time WebGL 3D watch model with interactive orbital drag. Dynamic material switching swaps procedural roughness, metalness, and dial caustics in real-time. Ticking mechanical second hand and interactive depth test.',
  description: 'Ultra-luxurious 3D horological timekeeper configurator. Customize case alloy (Rose Gold, Obsidian Ceramic, Grade 5 Titanium), dial finishes, bezel markers, and strap textures with tactile sound feedback.',
  codeSnippet: `// Dynamic material roughness & metalness transition
mesh.material.color.set(alloy.color);
mesh.material.roughness = alloy.roughness;
mesh.material.metalness = alloy.metalness;`,
  tags: ['Product', 'Configurator', 'Three.js', '3D Horology', 'Chromatic', 'WebGL'],
};

interface MaterialOption {
  id: string;
  name: string;
  color: string;
  hex: string;
  roughness: number;
  metalness: number;
  priceDelta: number;
  weight: string;
}

export default function ProductChromaticWatchConfigurator() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Configuration state
  const materials: MaterialOption[] = [
    { id: 'titanium', name: 'Brushed Grade-5 Titanium', color: '#94a3b8', hex: '#94a3b8', roughness: 0.35, metalness: 0.85, priceDelta: 0, weight: '98g' },
    { id: 'rosegold', name: '18k Sedna™ Rose Gold', color: '#f43f5e', hex: '#fb7185', roughness: 0.2, metalness: 0.95, priceDelta: 3400, weight: '142g' },
    { id: 'obsidian', name: 'Obsidian Black Ceramic', color: '#09090b', hex: '#18181b', roughness: 0.1, metalness: 0.3, priceDelta: 1800, weight: '88g' },
  ];

  const [selectedMaterial, setSelectedMaterial] = useState<MaterialOption>(materials[0]);
  const [bezelRotated, setBezelRotated] = useState<number>(0);
  const [depthTestActive, setDepthTestActive] = useState<boolean>(false);
  const [basePrice] = useState<number>(8900);

  const watchMeshRef = useRef<THREE.Group | null>(null);
  const secondHandRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.5);
    keyLight.position.set(5, 8, 7);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xf43f5e, 2.0);
    rimLight.position.set(-5, -6, 5);
    scene.add(rimLight);

    // Watch Group
    const watchGroup = new THREE.Group();
    scene.add(watchGroup);
    watchMeshRef.current = watchGroup;

    // 1. Watch Case (Cylinder with bevel)
    const caseGeo = new THREE.CylinderGeometry(3.2, 3.2, 0.8, 48);
    const caseMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(selectedMaterial.color),
      roughness: selectedMaterial.roughness,
      metalness: selectedMaterial.metalness,
    });
    const caseMesh = new THREE.Mesh(caseGeo, caseMat);
    caseMesh.rotation.x = Math.PI / 2;
    watchGroup.add(caseMesh);

    // 2. Bezel Ring
    const bezelGeo = new THREE.TorusGeometry(3.1, 0.25, 16, 64);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x222226),
      roughness: 0.2,
      metalness: 0.9,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.z = 0.42;
    watchGroup.add(bezelMesh);

    // 3. Dial Face
    const dialGeo = new THREE.CircleGeometry(2.85, 48);
    const dialMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x06080d),
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const dialMesh = new THREE.Mesh(dialGeo, dialMat);
    dialMesh.position.z = 0.43;
    watchGroup.add(dialMesh);

    // 4. Hour Markers (12 ticks around perimeter)
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const markerGeo = new THREE.BoxGeometry(0.12, i % 3 === 0 ? 0.45 : 0.25, 0.08);
      const markerMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
      const marker = new THREE.Mesh(markerGeo, markerMat);
      marker.position.x = Math.sin(angle) * 2.4;
      marker.position.y = Math.cos(angle) * 2.4;
      marker.position.z = 0.46;
      marker.rotation.z = -angle;
      watchGroup.add(marker);
    }

    // 5. Watch Hands (Hour, Minute, Sweeping Second)
    const hourHandGeo = new THREE.BoxGeometry(0.18, 1.4, 0.06);
    const handMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.9, roughness: 0.1 });
    const hourHand = new THREE.Mesh(hourHandGeo, handMat);
    hourHand.position.set(0, 0.7, 0.48);
    const hourPivot = new THREE.Group();
    hourPivot.add(hourHand);
    hourPivot.rotation.z = -Math.PI / 4;
    watchGroup.add(hourPivot);

    const minuteHandGeo = new THREE.BoxGeometry(0.12, 2.1, 0.06);
    const minuteHand = new THREE.Mesh(minuteHandGeo, handMat);
    minuteHand.position.set(0, 1.05, 0.5);
    const minutePivot = new THREE.Group();
    minutePivot.add(minuteHand);
    minutePivot.rotation.z = Math.PI / 3;
    watchGroup.add(minutePivot);

    // Red Chronometer Second Hand
    const secondHandGeo = new THREE.BoxGeometry(0.06, 2.5, 0.04);
    const secondMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const secondHand = new THREE.Mesh(secondHandGeo, secondMat);
    secondHand.position.set(0, 0.8, 0.52);
    const secondPivot = new THREE.Group();
    secondPivot.add(secondHand);
    watchGroup.add(secondPivot);
    secondHandRef.current = secondPivot as unknown as THREE.Mesh;

    // 6. Luxury Textured Rubber Strap (Top & Bottom segments)
    const strapGeo = new THREE.BoxGeometry(2.4, 3.5, 0.4);
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.8, metalness: 0.1 });
    const topStrap = new THREE.Mesh(strapGeo, strapMat);
    topStrap.position.set(0, 3.8, -0.1);
    watchGroup.add(topStrap);

    const bottomStrap = new THREE.Mesh(strapGeo, strapMat);
    bottomStrap.position.set(0, -3.8, -0.1);
    watchGroup.add(bottomStrap);

    // Pointer Drag Interaction
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotX = 0.2;
    let targetRotY = -0.3;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      prevX = e.clientX;
      prevY = e.clientY;

      targetRotY += dx * 0.008;
      targetRotX += dy * 0.008;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    // Animation Loop
    let animId: number;
    let clock = 0;

    const animate = () => {
      clock += 0.02;

      // Smooth inertia rotation
      watchGroup.rotation.x += (targetRotX - watchGroup.rotation.x) * 0.1;
      watchGroup.rotation.y += (targetRotY - watchGroup.rotation.y) * 0.1;

      // Mechanical second hand tick
      if (secondHandRef.current) {
        secondHandRef.current.rotation.z = -clock * 1.5;
      }

      // Update case material
      caseMat.color.set(selectedMaterial.color);
      caseMat.roughness = selectedMaterial.roughness;
      caseMat.metalness = selectedMaterial.metalness;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
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
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [selectedMaterial]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#06070b] text-zinc-100 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
                <Watch className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold block">
                  CHRONO-SPATIAL CONFIGURATOR // V7.1
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Aura Tourbillon Chronometer 3D
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-400">Total Price:</span>
              <span className="text-xl font-bold text-cyan-300 font-mono">
                ${(basePrice + selectedMaterial.priceDelta).toLocaleString()} USD
              </span>
            </div>
          </div>

          {/* 3D Viewport + Configurator Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Three.js Interactive Stage (Col 8) */}
            <div className="lg:col-span-8 relative rounded-2xl bg-gradient-to-b from-[#0b0f19] to-black border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[480px]">
              <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

              {/* Viewport Top Badges */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>360° DRAG ORBIT ENGINE</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-xs font-mono text-cyan-300 backdrop-blur-md">
                  SWISS COSC CERTIFIED
                </div>
              </div>

              {/* Depth Pressure Indicator */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFx.playChime(700);
                    setDepthTestActive(!depthTestActive);
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all flex items-center gap-2 ${
                    depthTestActive
                      ? 'bg-cyan-500 text-black border-cyan-400'
                      : 'bg-black/60 text-zinc-300 border-white/10 hover:border-cyan-400/40'
                  }`}
                  data-cursor="hover"
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>{depthTestActive ? 'DEPTH SIMULATION: 300M (ACTIVE)' : 'TEST 300M WATER RESISTANCE'}</span>
                </button>

                <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
                  CALIBRE 9400 &bull; 72H POWER RESERVE
                </span>
              </div>
            </div>

            {/* Customizer Drawer (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider mb-3">
                    1. Select Case Alloy:
                  </h4>
                  <div className="space-y-2.5">
                    {materials.map((mat) => {
                      const isSelected = selectedMaterial.id === mat.id;
                      return (
                        <button
                          key={mat.id}
                          onClick={() => {
                            soundFx.playChime(isSelected ? 900 : 750);
                            setSelectedMaterial(mat);
                          }}
                          className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_rgba(34,211,238,0.15)]'
                              : 'bg-white/5 border-white/5 text-zinc-400 hover:border-white/20 hover:text-white'
                          }`}
                          data-cursor="hover"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className="w-5 h-5 rounded-full border border-white/20 shadow-inner"
                              style={{ backgroundColor: mat.hex }}
                            />
                            <div>
                              <span className="text-xs font-bold block text-white">{mat.name}</span>
                              <span className="text-[10px] text-zinc-500 font-mono">Weight: {mat.weight}</span>
                            </div>
                          </div>

                          <div className="text-right font-mono text-xs">
                            {mat.priceDelta > 0 ? (
                              <span className="text-cyan-400 font-bold">+${mat.priceDelta}</span>
                            ) : (
                              <span className="text-zinc-500">Standard</span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Horological Specs */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Case Diameter:</span>
                    <span className="text-white font-bold">42.5 mm</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Crystal:</span>
                    <span className="text-white font-bold">Domed Anti-Reflective Sapphire</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Movement:</span>
                    <span className="text-cyan-300 font-bold">In-House Co-Axial Escapement</span>
                  </div>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => soundFx.playChime(950, 0.4)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
                data-cursor="hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Reserve Bespoke Piece</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
