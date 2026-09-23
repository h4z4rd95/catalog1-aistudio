import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Play, Pause, RefreshCw, Volume2, Shield, Eye, Layers } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v01_chromaticorbssandbox',
  name: 'Chromatic Liquid Glass Orbs & Inertia Collision Sandbox',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas, Physics Sandboxes & WebGL Environments',
  techStack: ['Three.js WebGL', 'Spatial Inertia Physics', 'Snell Glass Shaders', 'Pointer Raycaster', 'Procedural Audio'],
  aestheticVibe: 'Chromatic Liquid Gradient / Spatial Glassmorphism',
  interactionBlueprint: 'Interactive 3D viewport containing buoyant refractive glass spheres. Click and drag orbs to fling them across spatial boundaries with momentum and kinetic damping. Wall bounces produce harmonic musical pitch resonant with sphere velocity.',
  description: 'A tactile 3D physics sandbox featuring chromatic refractive spheres bouncing in a zero-gravity or gravitational bounding box with acoustic audio synthesis.',
  codeSnippet: `// 3D Kinetic drag & spatial boundary collision
orb.velocity.add(gravity);
orb.position.add(orb.velocity);
if (Math.abs(orb.position.x) > boundaryX) {
  orb.velocity.x *= -restitution;
  soundFx.playChime(300 + Math.abs(orb.velocity.x) * 120, 0.08);
}`,
  tags: ['Spatial', 'Three.js', 'Physics', 'Sandbox', 'Glassmorphism', 'Collision', 'WebGL'],
};

interface Orb {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  radius: number;
  colorHex: number;
  baseFreq: number;
}

export default function SpatialChromaticOrbsSandbox() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gravityEnabled, setGravityEnabled] = useState(true);
  const [orbCount, setOrbCount] = useState(6);
  const [restitution, setRestitution] = useState(0.85);
  const [isHovered, setIsHovered] = useState(false);
  const [collisionsCount, setCollisionsCount] = useState(0);

  const orbsRef = useRef<Orb[]>([]);
  const draggingOrbRef = useRef<Orb | null>(null);
  const mousePlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, 0, 1), 0));
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mousePosRef = useRef<THREE.Vector2>(new THREE.Vector2());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 800;
    const height = 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x38bdf8, 3, 30);
    pointLight1.position.set(6, 6, 8);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xf43f5e, 2.5, 30);
    pointLight2.position.set(-6, -5, 6);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xfbbf24, 2, 25);
    pointLight3.position.set(0, 8, -4);
    scene.add(pointLight3);

    // Bounding Box Visualizer
    const boxGeo = new THREE.BoxGeometry(16, 9.5, 6);
    const boxMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    });
    const boxMesh = new THREE.Mesh(boxGeo, boxMat);
    scene.add(boxMesh);

    // Create Spheres
    const colors = [0x38bdf8, 0x818cf8, 0xf43f5e, 0xfbbf24, 0x34d399, 0xa855f7, 0x38bdf8, 0xf472b6];
    const notes = [330, 392, 440, 523, 587, 659, 784, 880];

    const orbs: Orb[] = [];
    for (let i = 0; i < orbCount; i++) {
      const radius = 0.8 + Math.random() * 0.45;
      const geo = new THREE.SphereGeometry(radius, 32, 32);
      const color = colors[i % colors.length];

      const mat = new THREE.MeshPhysicalMaterial({
        color: color,
        roughness: 0.08,
        metalness: 0.1,
        transmission: 0.85,
        ior: 1.5,
        thickness: 1.2,
        specularIntensity: 1.0,
        specularColor: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 2
      );

      scene.add(mesh);

      orbs.push({
        mesh,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.1,
          (Math.random() - 0.5) * 0.05
        ),
        radius,
        colorHex: color,
        baseFreq: notes[i % notes.length],
      });
    }

    orbsRef.current = orbs;

    // Bounds limit
    const boundX = 7.2;
    const boundY = 4.2;
    const boundZ = 2.5;

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      const grav = gravityEnabled ? -0.006 : 0;

      orbs.forEach((orb) => {
        if (draggingOrbRef.current === orb) return;

        orb.velocity.y += grav;
        orb.velocity.multiplyScalar(0.994); // Air damping

        orb.mesh.position.add(orb.velocity);

        // X Collision
        if (orb.mesh.position.x + orb.radius > boundX) {
          orb.mesh.position.x = boundX - orb.radius;
          orb.velocity.x = -Math.abs(orb.velocity.x) * restitution;
          soundFx.playClick(orb.baseFreq, 0.04);
          setCollisionsCount((c) => c + 1);
        } else if (orb.mesh.position.x - orb.radius < -boundX) {
          orb.mesh.position.x = -boundX + orb.radius;
          orb.velocity.x = Math.abs(orb.velocity.x) * restitution;
          soundFx.playClick(orb.baseFreq, 0.04);
          setCollisionsCount((c) => c + 1);
        }

        // Y Collision
        if (orb.mesh.position.y + orb.radius > boundY) {
          orb.mesh.position.y = boundY - orb.radius;
          orb.velocity.y = -Math.abs(orb.velocity.y) * restitution;
          soundFx.playChime(orb.baseFreq * 1.2, 0.08);
          setCollisionsCount((c) => c + 1);
        } else if (orb.mesh.position.y - orb.radius < -boundY) {
          orb.mesh.position.y = -boundY + orb.radius;
          orb.velocity.y = Math.abs(orb.velocity.y) * restitution;
          if (Math.abs(orb.velocity.y) > 0.02) {
            soundFx.playChime(orb.baseFreq, 0.08);
          }
          setCollisionsCount((c) => c + 1);
        }

        // Z Collision
        if (orb.mesh.position.z + orb.radius > boundZ) {
          orb.mesh.position.z = boundZ - orb.radius;
          orb.velocity.z = -Math.abs(orb.velocity.z) * restitution;
        } else if (orb.mesh.position.z - orb.radius < -boundZ) {
          orb.mesh.position.z = -boundZ + orb.radius;
          orb.velocity.z = Math.abs(orb.velocity.z) * restitution;
        }

        orb.mesh.rotation.x += orb.velocity.y * 0.5;
        orb.mesh.rotation.y += orb.velocity.x * 0.5;
      });

      // Sphere-to-sphere collision resolution
      for (let i = 0; i < orbs.length; i++) {
        for (let j = i + 1; j < orbs.length; j++) {
          const a = orbs[i];
          const b = orbs[j];
          const diff = new THREE.Vector3().subVectors(b.mesh.position, a.mesh.position);
          const dist = diff.length();
          const minDist = a.radius + b.radius;

          if (dist < minDist && dist > 0.001) {
            const normal = diff.clone().normalize();
            const overlap = minDist - dist;

            // Separate
            a.mesh.position.addScaledVector(normal, -overlap * 0.5);
            b.mesh.position.addScaledVector(normal, overlap * 0.5);

            // Elastic bounce impulse
            const vRel = new THREE.Vector3().subVectors(b.velocity, a.velocity);
            const impulse = vRel.dot(normal);

            if (impulse < 0) {
              const impulseVec = normal.clone().multiplyScalar(impulse * 0.85);
              a.velocity.add(impulseVec);
              b.velocity.sub(impulseVec);

              soundFx.playChime((a.baseFreq + b.baseFreq) / 2, 0.1);
              setCollisionsCount((c) => c + 1);
            }
          }
        }
      }

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
  }, [gravityEnabled, orbCount, restitution]);

  // Pointer Interaction: Drag & Throw Orbs
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    mousePosRef.current.set(x, y);

    const camera = new THREE.PerspectiveCamera(50, rect.width / rect.height, 0.1, 100);
    camera.position.set(0, 0, 14);

    raycasterRef.current.setFromCamera(mousePosRef.current, camera);
    const meshes = orbsRef.current.map((o) => o.mesh);
    const intersects = raycasterRef.current.intersectObjects(meshes);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object as THREE.Mesh;
      const targetOrb = orbsRef.current.find((o) => o.mesh === hitMesh);
      if (targetOrb) {
        soundFx.playClick(680, 0.05);
        draggingOrbRef.current = targetOrb;
        targetOrb.velocity.set(0, 0, 0);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!draggingOrbRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    const targetX = x * 7;
    const targetY = y * 4;

    const orb = draggingOrbRef.current;
    const vx = (targetX - orb.mesh.position.x) * 0.35;
    const vy = (targetY - orb.mesh.position.y) * 0.35;

    orb.velocity.set(vx, vy, 0);
    orb.mesh.position.set(targetX, targetY, orb.mesh.position.z);
  };

  const handlePointerUp = () => {
    if (draggingOrbRef.current) {
      soundFx.playChime(draggingOrbRef.current.baseFreq, 0.15);
      draggingOrbRef.current = null;
    }
  };

  const handleResetOrbs = () => {
    soundFx.playChime(600, 0.2);
    orbsRef.current.forEach((orb) => {
      orb.mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5,
        0
      );
      orb.velocity.set(
        (Math.random() - 0.5) * 0.15,
        (Math.random() - 0.5) * 0.15,
        0
      );
    });
    setCollisionsCount(0);
  };

  return (
    <div
      id="spatial_v01_chromaticorbssandbox"
      ref={containerRef}
      className="relative w-full min-h-[640px] bg-gradient-to-b from-[#06080e] via-[#090b14] to-[#040508] border-b border-white/10 p-6 flex flex-col justify-between overflow-hidden"
    >
      <BlueprintHUD blueprint={blueprint} />

      {/* Main Interactive 3D Viewport */}
      <div className="relative w-full h-[480px] rounded-3xl overflow-hidden border border-white/15 bg-black/60 shadow-2xl my-4 flex items-center justify-center">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        />

        {/* Real-time Telemetry Overlay */}
        <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/70 border border-white/15 backdrop-blur-md font-mono text-[11px] text-zinc-300 pointer-events-none space-y-1">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>KINETIC THREE.JS RAYCASTER</span>
          </div>
          <div>ACTIVE ORBS: <strong className="text-white">{orbCount}</strong></div>
          <div>COLLISION EVENTS: <strong className="text-emerald-400">{collisionsCount}</strong></div>
          <div>GRAVITY VECTOR: <strong className="text-amber-400">{gravityEnabled ? '-9.8 m/s²' : '0.0 G (FLOAT)'}</strong></div>
        </div>

        {/* Instructions pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-cyan-950/70 border border-cyan-400/40 font-mono text-[11px] text-cyan-300 pointer-events-none backdrop-blur-md">
          <span>Click &amp; fling spheres with mouse momentum &bull; Audio chime triggers on impact</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-white/10 font-mono text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              setGravityEnabled(!gravityEnabled);
            }}
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 transition-all font-bold ${
              gravityEnabled
                ? 'bg-amber-400 text-black border-amber-400 shadow-md'
                : 'bg-white/5 border-white/15 text-zinc-400 hover:text-white'
            }`}
          >
            <span>{gravityEnabled ? 'Gravity: ON' : 'Gravity: ZERO-G'}</span>
          </button>

          <button
            onClick={handleResetOrbs}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Scatter Orbs</span>
          </button>
        </div>

        {/* Restitution slider */}
        <div className="flex items-center gap-3 text-zinc-400">
          <span className="text-[11px] uppercase">Elasticity:</span>
          <input
            type="range"
            min="0.4"
            max="0.98"
            step="0.02"
            value={restitution}
            onChange={(e) => setRestitution(parseFloat(e.target.value))}
            className="w-24 accent-cyan-400 cursor-pointer"
          />
          <span className="text-white font-bold w-10 text-right">{Math.round(restitution * 100)}%</span>
        </div>
      </div>
    </div>
  );
}
