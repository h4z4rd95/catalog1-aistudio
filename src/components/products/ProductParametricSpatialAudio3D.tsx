import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Headphones, Volume2, Radio, Activity, ShieldCheck, Sparkles, ShoppingBag } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'product_v05_parametricspatialaudio3d',
  name: 'Parametric 3D Spatial Audio Headphone & Frequency Resonator',
  category: 'Product',
  batch: 'Batch 7: Spatial E-Commerce & 3D Configurator Showcases',
  techStack: ['React 19', 'Three.js WebGL', 'Procedural Headphone Geometry', 'Concentric Audio Wave Particle Ring', 'Acoustic EQ Engine'],
  aestheticVibe: 'Immersive WebGL-First / 3D Spatial Acoustics',
  interactionBlueprint: 'Interactive 3D beryllium headphone model with continuous orbital pointer damping. Concentric surrounding particle wave rings dynamically deform based on real-time selected EQ resonant frequency profiles.',
  description: 'Parametric 3D spatial acoustics showroom featuring orbital mouse inertia, real-time audio wave ring deformations, ANC mode switches, and beryllium driver acoustics.',
  codeSnippet: `// 3D Concentric Frequency Wave Ring Displacement
const radius = baseRadius + Math.sin(angle * 8 + time * freqMultiplier) * amplitude;
particle.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, z);`,
  tags: ['Product', 'WebGL 3D', 'Three.js', 'Spatial Audio', 'Acoustics', 'Parametric'],
};

interface EQProfile {
  id: string;
  name: string;
  desc: string;
  freqMultiplier: number;
  amplitude: number;
  colorHex: string;
}

export default function ProductParametricSpatialAudio3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  const eqProfiles: EQProfile[] = [
    { id: 'ATMOS', name: 'Spatial 3D Dolby Atmos', desc: 'Spherical binaural immersion with wide soundstage', freqMultiplier: 2.5, amplitude: 0.6, colorHex: '#38bdf8' },
    { id: 'STUDIO', name: 'Mastering Flat Response', desc: 'Reference grade clinical clarity from 5Hz to 48kHz', freqMultiplier: 4.0, amplitude: 0.3, colorHex: '#a855f7' },
    { id: 'BASS', name: 'Sub-Bass Kinetic Punch', desc: 'High-displacement 45mm pure beryllium diaphragm punch', freqMultiplier: 1.2, amplitude: 0.9, colorHex: '#ec4899' },
  ];

  const [activeProfile, setActiveProfile] = useState<EQProfile>(eqProfiles[0]);
  const [ancMode, setAncMode] = useState<'ANC_ON' | 'TRANSPARENT' | 'OFF'>('ANC_ON');
  const [isRotating, setIsRotating] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const light1 = new THREE.DirectionalLight(0x38bdf8, 2.5);
    light1.position.set(6, 6, 8);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xa855f7, 2.0);
    light2.position.set(-6, -6, 5);
    scene.add(light2);

    // Headphone Group
    const headphoneGroup = new THREE.Group();
    scene.add(headphoneGroup);

    // 1. Headband Arc (Half Torus)
    const headbandGeo = new THREE.TorusGeometry(3.6, 0.25, 16, 64, Math.PI);
    const headbandMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      metalness: 0.8,
      roughness: 0.2,
    });
    const headband = new THREE.Mesh(headbandGeo, headbandMat);
    headband.rotation.z = 0;
    headphoneGroup.add(headband);

    // 2. Earcups (Left and Right)
    const earcupMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      metalness: 0.9,
      roughness: 0.15,
    });

    const cushionMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.8,
      metalness: 0.1,
    });

    // Left Cup
    const leftCupGroup = new THREE.Group();
    leftCupGroup.position.set(-3.6, 0, 0);

    const leftCupOuter = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.8, 32), earcupMat);
    leftCupOuter.rotation.z = Math.PI / 2;
    leftCupGroup.add(leftCupOuter);

    const leftCushion = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.35, 16, 32), cushionMat);
    leftCushion.position.x = 0.45;
    leftCushion.rotation.y = Math.PI / 2;
    leftCupGroup.add(leftCushion);
    headphoneGroup.add(leftCupGroup);

    // Right Cup
    const rightCupGroup = new THREE.Group();
    rightCupGroup.position.set(3.6, 0, 0);

    const rightCupOuter = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 0.8, 32), earcupMat);
    rightCupOuter.rotation.z = Math.PI / 2;
    rightCupGroup.add(rightCupOuter);

    const rightCushion = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.35, 16, 32), cushionMat);
    rightCushion.position.x = -0.45;
    rightCushion.rotation.y = Math.PI / 2;
    rightCupGroup.add(rightCushion);
    headphoneGroup.add(rightCupGroup);

    // 3. Concentric Spatial Frequency Wave Particle Ring
    const particleCount = 180;
    const waveGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const activeColor = new THREE.Color(activeProfile.colorHex);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const r = 5.2;
      positions[i * 3 + 0] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r;
      positions[i * 3 + 2] = 0;

      colors[i * 3 + 0] = activeColor.r;
      colors[i * 3 + 1] = activeColor.g;
      colors[i * 3 + 2] = activeColor.b;
    }

    waveGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    waveGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const waveParticles = new THREE.Points(waveGeo, particleMat);
    scene.add(waveParticles);

    // Pointer Drag Inertia
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;

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
    let time = 0;

    const animate = () => {
      time += 0.03;

      if (isRotating && !isDragging) {
        targetRotY += 0.004;
      }

      headphoneGroup.rotation.x += (targetRotX - headphoneGroup.rotation.x) * 0.08;
      headphoneGroup.rotation.y += (targetRotY - headphoneGroup.rotation.y) * 0.08;

      // Pulse wave particle ring
      const posAttr = waveGeo.attributes.position as THREE.BufferAttribute;
      const colAttr = waveGeo.attributes.color as THREE.BufferAttribute;
      const profileColor = new THREE.Color(activeProfile.colorHex);

      for (let i = 0; i < particleCount; i++) {
        const angle = (i / particleCount) * Math.PI * 2;
        const wave = Math.sin(angle * 6 + time * activeProfile.freqMultiplier) * activeProfile.amplitude;
        const r = 5.2 + wave;

        posAttr.setXYZ(i, Math.cos(angle) * r, Math.sin(angle) * r, Math.cos(time * 2 + angle) * 0.3);
        colAttr.setXYZ(i, profileColor.r, profileColor.g, profileColor.b);
      }
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

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
  }, [activeProfile, isRotating]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#05060b] text-zinc-100 font-sans">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono font-bold block">
                  PARAMETRIC SPATIAL ACOUSTICS // V7.5
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Synapse-Pro Beryllium Spatial Headphone
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-zinc-400">Flagship Edition:</span>
              <span className="text-xl font-bold text-white font-mono">$799 USD</span>
            </div>
          </div>

          {/* 3D WebGL Canvas Viewport + Acoustic Tuner Studio */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* 3D Canvas Viewport (Col 8) */}
            <div className="lg:col-span-8 relative rounded-2xl bg-gradient-to-b from-[#090b14] to-black border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between min-h-[500px]">
              <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

              {/* Viewport Overlay */}
              <div className="relative z-10 p-4 flex items-center justify-between pointer-events-none">
                <div className="px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: activeProfile.colorHex }} />
                  <span>EQ RESONANCE RING: {activeProfile.name}</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 backdrop-blur-md">
                  BERYLLIUM 45MM TRANSDUCER
                </div>
              </div>

              {/* Viewport Bottom Controls */}
              <div className="relative z-10 p-4 flex items-center justify-between">
                <button
                  onClick={() => {
                    soundFx.playClick(800);
                    setIsRotating(!isRotating);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-black/60 hover:bg-black/80 border border-white/15 text-xs font-mono text-zinc-300 transition-colors"
                  data-cursor="hover"
                >
                  AUTO-ORBIT: {isRotating ? 'ACTIVE' : 'PAUSED'}
                </button>

                <span className="font-mono text-xs text-zinc-500 hidden sm:inline">
                  THD &lt; 0.02% &bull; IMPEDANCE: 32Ω
                </span>
              </div>
            </div>

            {/* Acoustic Tuning Console (Col 4) */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-zinc-950/80 border border-white/10 flex flex-col justify-between space-y-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                    1. Select Spatial EQ Profile:
                  </h4>
                  <div className="space-y-2">
                    {eqProfiles.map((p) => {
                      const isSelected = activeProfile.id === p.id;
                      return (
                        <button
                          key={p.id}
                          onClick={() => {
                            soundFx.playChime(isSelected ? 900 : 750);
                            setActiveProfile(p);
                          }}
                          className={`w-full p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'bg-white/10 border-cyan-400 text-white shadow-lg'
                              : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                          }`}
                          data-cursor="hover"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">{p.name}</span>
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: p.colorHex }}
                            />
                          </div>
                          <p className="text-[11px] text-zinc-400 font-light mt-1">{p.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ANC Mode */}
                <div>
                  <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                    2. Acoustic Cancellation:
                  </h4>
                  <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                    {(['ANC_ON', 'TRANSPARENT', 'OFF'] as const).map((m) => (
                      <button
                        key={m}
                        onClick={() => {
                          soundFx.playClick(700);
                          setAncMode(m);
                        }}
                        className={`py-2 rounded-lg border text-center transition-all ${
                          ancMode === m
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 font-bold'
                            : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white'
                        }`}
                        data-cursor="hover"
                      >
                        {m === 'ANC_ON' ? 'ANC MAX' : m === 'TRANSPARENT' ? 'AMBIENT' : 'OFF'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Acquire Headphone CTA */}
              <button
                onClick={() => soundFx.playChime(950, 0.4)}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 hover:opacity-90 text-white font-bold font-mono text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-purple-500/20 transition-all"
                data-cursor="hover"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Acquire Synapse-Pro &bull; $799</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
