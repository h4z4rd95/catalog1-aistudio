import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Compass, RotateCw, Sparkles, Sliders, Volume2, Shield } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v05_parametricgimbalfield3d',
  name: 'Parametric 3D Gyroscopic Gimbal & Magnetic Particle Orbit Field',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas, Physics Sandboxes & WebGL Environments',
  techStack: ['Three.js WebGL', 'Quaternion Kinematics', 'Torus Geometries', 'GPU Particle Swarm', 'Parametric Resonance'],
  aestheticVibe: 'WebGL 3D Parametric / Procedural Spatial Math',
  interactionBlueprint: 'Three orthogonal nested gimbal rings (outer titanium, middle vermeil gold, inner cyan cipher) spinning with independent angular frequencies. 3,500 magnetic particles orbit the gyroscopic core. Drag in 3D to tilt gimbal pitch and yaw with inertial spring physics.',
  description: 'An astronomical gyroscopic mechanism demonstrating multi-axis orthogonal rotation, quaternion math, and gravitational magnetic particle attraction.',
  codeSnippet: `// Three-axis orthogonal gimbal quaternion rotations
ring1.rotation.x += speed * 0.7;
ring2.rotation.y += speed * 1.1;
ring3.rotation.z += speed * 1.5;
particleSystem.rotation.y += 0.002;`,
  tags: ['Spatial', 'Three.js', 'Gyroscope', 'Gimbal', 'Particle Swarm', 'Parametric', 'WebGL 3D'],
};

export default function SpatialParametricGimbalField3D() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [speedMultiplier, setSpeedMultiplier] = useState(1.0);
  const [ringTheme, setRingTheme] = useState<'ASTRONOMICAL' | 'CYBER_NEON'>('ASTRONOMICAL');

  const mousePosRef = useRef({ x: 0, y: 0, isDragging: false });
  const cameraAngleRef = useRef({ x: 0.3, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 800;
    const height = 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 15);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xfbbf24, 3, 30);
    pointLight1.position.set(8, 8, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 3, 30);
    pointLight2.position.set(-8, -8, 8);
    scene.add(pointLight2);

    // Group for gyroscopic rings
    const gyroGroup = new THREE.Group();
    scene.add(gyroGroup);

    // Ring 1: Outer Titanium
    const ring1Geo = new THREE.TorusGeometry(5.2, 0.15, 24, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: ringTheme === 'ASTRONOMICAL' ? 0xd4af37 : 0x06b6d4,
      metalness: 0.9,
      roughness: 0.15,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    gyroGroup.add(ring1);

    // Ring 2: Middle Gold
    const ring2Geo = new THREE.TorusGeometry(4.0, 0.14, 24, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: ringTheme === 'ASTRONOMICAL' ? 0xf59e0b : 0xa855f7,
      metalness: 0.95,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    gyroGroup.add(ring2);

    // Ring 3: Inner Cyan Core
    const ring3Geo = new THREE.TorusGeometry(2.8, 0.12, 24, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: ringTheme === 'ASTRONOMICAL' ? 0x38bdf8 : 0xf43f5e,
      metalness: 0.85,
      roughness: 0.2,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    gyroGroup.add(ring3);

    // Central Floating Core (Octahedron)
    const coreGeo = new THREE.OctahedronGeometry(1.2, 0);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.8,
      roughness: 0.1,
      ior: 1.6,
      thickness: 1.0,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    gyroGroup.add(coreMesh);

    // Particle Swarm Field
    const pCount = 2800;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCols = new Float32Array(pCount * 3);

    for (let i = 0; i < pCount; i++) {
      const radius = 2.0 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pPos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pPos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pPos[i * 3 + 2] = radius * Math.cos(phi);

      pCols[i * 3] = 0.5 + Math.random() * 0.5;
      pCols[i * 3 + 1] = 0.7 + Math.random() * 0.3;
      pCols[i * 3 + 2] = 0.9 + Math.random() * 0.1;
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCols, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particlePoints = new THREE.Points(pGeo, pMat);
    scene.add(particlePoints);

    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const baseSpeed = 0.015 * speedMultiplier;
      ring1.rotation.x += baseSpeed * 0.8;
      ring1.rotation.y += baseSpeed * 0.3;

      ring2.rotation.y += baseSpeed * 1.1;
      ring2.rotation.z += baseSpeed * 0.5;

      ring3.rotation.z += baseSpeed * 1.4;
      ring3.rotation.x += baseSpeed * 0.7;

      coreMesh.rotation.x += 0.02 * speedMultiplier;
      coreMesh.rotation.y += 0.03 * speedMultiplier;

      particlePoints.rotation.y += 0.0018 * speedMultiplier;
      particlePoints.rotation.x += 0.0009 * speedMultiplier;

      // Inertial camera tilt
      const targetCamX = Math.sin(cameraAngleRef.current.y) * 15;
      const targetCamZ = Math.cos(cameraAngleRef.current.y) * 15;
      const targetCamY = cameraAngleRef.current.x * 12;

      camera.position.x += (targetCamX - camera.position.x) * 0.05;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = 480;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [speedMultiplier, ringTheme]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    mousePosRef.current = { x: e.clientX, y: e.clientY, isDragging: true };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!mousePosRef.current.isDragging) return;
    const dx = e.clientX - mousePosRef.current.x;
    const dy = e.clientY - mousePosRef.current.y;

    cameraAngleRef.current.y += dx * 0.006;
    cameraAngleRef.current.x = Math.max(-0.8, Math.min(0.8, cameraAngleRef.current.x - dy * 0.006));

    mousePosRef.current.x = e.clientX;
    mousePosRef.current.y = e.clientY;
  };

  const handlePointerUp = () => {
    mousePosRef.current.isDragging = false;
  };

  return (
    <div
      id="spatial_v05_parametricgimbalfield3d"
      className="relative w-full min-h-[640px] bg-[#04060a] border-b border-white/10 p-6 flex flex-col justify-between font-mono"
    >
      <BlueprintHUD blueprint={blueprint} />

      {/* Main Viewport */}
      <div className="relative w-full h-[480px] rounded-3xl border border-amber-500/25 bg-black/70 my-4 overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* HUD Telemetry */}
        <div className="absolute top-4 left-4 p-3 bg-black/80 border border-white/10 rounded-xl text-[11px] text-zinc-300 space-y-1 backdrop-blur-md">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Compass className="w-3.5 h-3.5 animate-spin" />
            <span>PARAMETRIC GYRO MATRIX // QUATERNION ORTHOGONAL</span>
          </div>
          <div>SWARM PARTICLES: <strong className="text-white">2,800 MAGNETIC NODES</strong></div>
          <div>ANGULAR FREQUENCY: <strong className="text-cyan-400">{(speedMultiplier * 1.4).toFixed(2)} rad/s</strong></div>
          <div className="text-[10px] text-zinc-400">CLICK &amp; DRAG TO ORBIT VIEW CAMERA</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 text-xs text-white">
        <div className="flex items-center gap-3">
          <span className="text-zinc-400 uppercase text-[11px]">THEME:</span>
          {(['ASTRONOMICAL', 'CYBER_NEON'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                soundFx.playClick(720);
                setRingTheme(t);
              }}
              className={`px-3 py-1 rounded-lg border font-bold transition-all ${
                ringTheme === t ? 'bg-cyan-400 text-black border-cyan-400' : 'bg-white/5 border-white/15 text-zinc-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Sliders className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-zinc-400 uppercase text-[11px]">GYRO VELOCITY:</span>
          <input
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={speedMultiplier}
            onChange={(e) => setSpeedMultiplier(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className="text-white font-bold w-12 text-right">{speedMultiplier.toFixed(1)}x</span>
        </div>
      </div>
    </div>
  );
}
