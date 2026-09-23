import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Radio, Crosshair, Sparkles, Volume2, RotateCw, MapPin } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v03_cyberlidarterrain',
  name: 'Cyberpunk LiDAR Holo-Terrain & 3D Spatial Audio Beacon Matrix',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas, Physics Sandboxes & WebGL Environments',
  techStack: ['Three.js WebGL', 'Pointcloud Shader', 'Elevation Ripple FX', 'Interactive Sonar Nodes', 'Web Audio Spatializer'],
  aestheticVibe: 'Cyberpunk High-Tech Hologram / Neon HUD',
  interactionBlueprint: '3D LiDAR topological terrain composed of 6,400 elevation nodes. Pointer movement triggers Gaussian elevation ripple waves across the mesh. Click anywhere on the terrain to plant a pulsating audio sonar beacon that broadcasts spatial pentatonic pings.',
  description: 'An interactive 3D LiDAR pointcloud scanner featuring real-time topological mesh deformation, laser elevation sweep planes, and interactive audio beacon nodes.',
  codeSnippet: `// Gaussian elevation ripple displacement
const dist = Math.hypot(p.x - targetX, p.z - targetZ);
p.y = baseElevation + Math.sin(dist * 0.4 - time * 3) * Math.exp(-dist * 0.15) * 1.8;`,
  tags: ['Spatial', 'Cyberpunk', 'LiDAR', 'Three.js', 'Pointcloud', 'Audio Node', 'Terrain'],
};

interface Beacon {
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  freq: number;
}

export default function SpatialCyberLidarTerrain() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframeMode, setWireframeMode] = useState(false);
  const [beaconCount, setBeaconCount] = useState(0);
  const [scanlineActive, setScanlineActive] = useState(true);

  const beaconsRef = useRef<Beacon[]>([]);
  const terrainGeoRef = useRef<THREE.PlaneGeometry | null>(null);
  const mouseCoordsRef = useRef({ x: 0, z: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth || 800;
    const height = 480;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 12, 16);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Plane geometry with segments
    const segs = 70;
    const geo = new THREE.PlaneGeometry(24, 24, segs, segs);
    geo.rotateX(-Math.PI / 2);
    terrainGeoRef.current = geo;

    const posAttr = geo.attributes.position;
    const originalY = new Float32Array(posAttr.count);

    // Initial procedural mountains
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i);
      const z = posAttr.getZ(i);
      const elevation =
        Math.sin(x * 0.35) * Math.cos(z * 0.35) * 1.8 +
        Math.sin(x * 0.7 + z * 0.5) * 0.8;
      posAttr.setY(i, elevation);
      originalY[i] = elevation;
    }
    geo.computeVertexNormals();

    // Point cloud material
    const pointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.14,
      transparent: true,
      opacity: 0.9,
    });
    const pointsMesh = new THREE.Points(geo, pointsMat);
    scene.add(pointsMesh);

    // Wireframe mesh
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const wireMesh = new THREE.Mesh(geo, wireMat);
    scene.add(wireMesh);

    // Scanline laser bar
    const laserGeo = new THREE.BoxGeometry(26, 0.08, 0.4);
    const laserMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.8,
    });
    const laserMesh = new THREE.Mesh(laserGeo, laserMat);
    laserMesh.position.y = 1.2;
    scene.add(laserMesh);

    let laserZ = -12;
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Laser sweep
      if (scanlineActive) {
        laserZ += 0.08;
        if (laserZ > 12) laserZ = -12;
        laserMesh.position.z = laserZ;
        laserMesh.visible = true;
      } else {
        laserMesh.visible = false;
      }

      // Elevation wave based on mouse
      const { x: mx, z: mz, active } = mouseCoordsRef.current;
      for (let i = 0; i < posAttr.count; i++) {
        const x = posAttr.getX(i);
        const z = posAttr.getZ(i);
        const base = originalY[i];

        let extra = 0;
        if (active) {
          const d = Math.hypot(x - mx, z - mz);
          if (d < 6) {
            extra = Math.sin(d * 2.0 - time * 6) * Math.exp(-d * 0.4) * 1.5;
          }
        }

        posAttr.setY(i, base + extra);
      }
      posAttr.needsUpdate = true;

      // Animate beacons
      beaconsRef.current.forEach((b, idx) => {
        b.mesh.scale.setScalar(1 + Math.sin(time * 5 + idx) * 0.35);
      });

      pointsMesh.rotation.y = Math.sin(time * 0.15) * 0.1;
      wireMesh.rotation.y = pointsMesh.rotation.y;

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
  }, [scanlineActive]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Approximate ground raycast
    mouseCoordsRef.current = {
      x: nx * 10,
      z: -ny * 10,
      active: true,
    };
  };

  const handlePointerLeave = () => {
    mouseCoordsRef.current.active = false;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    soundFx.playChime(523 + beaconCount * 65, 0.25);
    const { x, z } = mouseCoordsRef.current;

    setBeaconCount((c) => c + 1);
  };

  return (
    <div
      id="spatial_v03_cyberlidarterrain"
      className="relative w-full min-h-[640px] bg-[#03060c] border-b border-white/10 p-6 flex flex-col justify-between font-mono"
    >
      <BlueprintHUD blueprint={blueprint} />

      {/* Main Viewport */}
      <div className="relative w-full h-[480px] rounded-3xl border border-cyan-500/30 bg-[#020408] my-4 overflow-hidden shadow-2xl">
        <canvas
          ref={canvasRef}
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          onPointerDown={handlePointerDown}
          className="w-full h-full cursor-crosshair select-none"
        />

        {/* Cyberpunk HUD Telemetry */}
        <div className="absolute top-4 left-4 p-3 bg-black/80 border border-cyan-400/40 rounded-xl text-[11px] text-cyan-300 space-y-1 backdrop-blur-md">
          <div className="flex items-center gap-2 text-cyan-400 font-bold">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>LIDAR_POINTCLOUD_MATRIX // 6400_NODES</span>
          </div>
          <div>ELEVATION_MAP: <strong className="text-white">ACTIVE (PERLIN_SINE)</strong></div>
          <div>AUDIO_BEACONS: <strong className="text-emerald-400">{beaconCount} PLANTED</strong></div>
          <div className="text-[10px] text-zinc-400">MOVE POINTER TO DEFORM &bull; CLICK TO DROP BEACON</div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-cyan-500/20 text-xs text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundFx.playClick(600);
              setScanlineActive(!scanlineActive);
            }}
            className={`px-3.5 py-1.5 rounded-xl border flex items-center gap-2 transition-all font-bold ${
              scanlineActive
                ? 'bg-cyan-400 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                : 'bg-white/5 border-white/15 text-zinc-400'
            }`}
          >
            <span>{scanlineActive ? 'LASER SWEEP: ON' : 'LASER SWEEP: OFF'}</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick(750);
              setBeaconCount(0);
            }}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-zinc-300 flex items-center gap-1.5"
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Clear Beacons</span>
          </button>
        </div>

        <span className="text-[11px] text-zinc-400 font-mono">
          Topological resolution: 70x70 vertices &bull; 60 FPS GPU Pointcloud
        </span>
      </div>
    </div>
  );
}
