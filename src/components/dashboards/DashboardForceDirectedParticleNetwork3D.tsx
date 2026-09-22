import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Share2, Globe2, Eye, RefreshCw, Zap, Sliders, Play, Pause } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'dashboard_v05_forcedirectedparticlenetwork3d',
  name: 'Force-Directed 3D Particle Network & Neural Flow',
  category: 'Dashboard',
  batch: 'Batch 6: Dashboards & Node Visualizers',
  techStack: ['React 19', 'Three.js WebGL', '3D Force Simulation Math', 'Dynamic BufferGeometry Lines', 'Harmonic Web Audio'],
  aestheticVibe: 'Immersive WebGL-First / 3D Parametric Graph',
  interactionBlueprint: '3D spatial particle graph with N-body gravitational repulsion. Pointer drag orbits camera with damped rotational inertia. Real-time dynamic vertex line calculation dynamically renders edge matrices based on proximity distance.',
  description: 'Interactive 3D force-directed node graph in WebGL. Features mouse orbit inertia, dynamic energy connection lines, tunable node repulsion, and real-time edge density thresholds.',
  codeSnippet: `// Dynamic 3D Edge connectivity buffer
const positions: number[] = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    if (nodes[i].distanceTo(nodes[j]) < threshold) {
      positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z);
    }
  }
}
lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));`,
  tags: ['Dashboard', 'WebGL 3D', 'Three.js', 'Force-Directed', 'Node Graph', 'Network'],
};

interface NodeData {
  pos: THREE.Vector3;
  vel: THREE.Vector3;
  mass: number;
  color: THREE.Color;
}

export default function DashboardForceDirectedParticleNetwork3D() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Tuner states
  const [nodeCount, setNodeCount] = useState<number>(36);
  const [connectThreshold, setConnectThreshold] = useState<number>(38);
  const [repulsionForce, setRepulsionForce] = useState<number>(1.2);
  const [rotationSpeed, setRotationSpeed] = useState<number>(0.005);
  const [activeEdgeCount, setActiveEdgeCount] = useState<number>(0);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 120;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Generate Nodes
    const nodes: NodeData[] = [];
    const sphereRadius = 40;

    const palette = [
      new THREE.Color('#38bdf8'), // Cyan
      new THREE.Color('#a855f7'), // Purple
      new THREE.Color('#ec4899'), // Pink
      new THREE.Color('#facc15'), // Gold
    ];

    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * sphereRadius;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      nodes.push({
        pos: new THREE.Vector3(x, y, z),
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1, (Math.random() - 0.5) * 0.1),
        mass: 1 + Math.random() * 2,
        color: palette[i % palette.length],
      });
    }

    // Instanced Mesh for Nodes
    const sphereGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const instancedMesh = new THREE.InstancedMesh(sphereGeo, sphereMat, nodeCount);
    scene.add(instancedMesh);

    const dummy = new THREE.Object3D();
    nodes.forEach((node, i) => {
      dummy.position.copy(node.pos);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
      instancedMesh.setColorAt(i, node.color);
    });
    if (instancedMesh.instanceColor) instancedMesh.instanceColor.needsUpdate = true;
    instancedMesh.instanceMatrix.needsUpdate = true;

    // Line Geometry for Dynamic Edges
    const maxLines = 400;
    const linePositions = new Float32Array(maxLines * 6);
    const lineColors = new Float32Array(maxLines * 6);
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });

    const linesMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(linesMesh);

    // Mouse drag interaction for orbital inertia
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      targetRotY += deltaX * 0.006;
      targetRotX += deltaY * 0.006;
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
      time += 0.01;

      // Inertial damping
      targetRotY += rotationSpeed;
      rotX += (targetRotX - rotX) * 0.08;
      rotY += (targetRotY - rotY) * 0.08;

      instancedMesh.rotation.x = rotX;
      instancedMesh.rotation.y = rotY;
      linesMesh.rotation.x = rotX;
      linesMesh.rotation.y = rotY;

      // Update node positions with harmonic Brownian motion
      nodes.forEach((node, i) => {
        node.pos.add(node.vel);

        // Spring restitution toward origin
        const dist = node.pos.length();
        if (dist > 50) {
          node.vel.sub(node.pos.clone().normalize().multiplyScalar(0.04));
        }

        dummy.position.copy(node.pos);
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      });
      instancedMesh.instanceMatrix.needsUpdate = true;

      // Recalculate dynamic edges
      let lineIndex = 0;
      let edges = 0;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = nodes[i].pos.distanceTo(nodes[j].pos);
          if (d < connectThreshold && lineIndex < maxLines) {
            edges++;
            const p1 = nodes[i].pos;
            const p2 = nodes[j].pos;

            linePositions[lineIndex * 6 + 0] = p1.x;
            linePositions[lineIndex * 6 + 1] = p1.y;
            linePositions[lineIndex * 6 + 2] = p1.z;
            linePositions[lineIndex * 6 + 3] = p2.x;
            linePositions[lineIndex * 6 + 4] = p2.y;
            linePositions[lineIndex * 6 + 5] = p2.z;

            // Color gradient between connected nodes
            const c1 = nodes[i].color;
            const c2 = nodes[j].color;
            lineColors[lineIndex * 6 + 0] = c1.r;
            lineColors[lineIndex * 6 + 1] = c1.g;
            lineColors[lineIndex * 6 + 2] = c1.b;
            lineColors[lineIndex * 6 + 3] = c2.r;
            lineColors[lineIndex * 6 + 4] = c2.g;
            lineColors[lineIndex * 6 + 5] = c2.b;

            lineIndex++;
          }
        }
      }

      lineGeometry.attributes.position.needsUpdate = true;
      lineGeometry.attributes.color.needsUpdate = true;
      lineGeometry.setDrawRange(0, lineIndex * 2);

      if (Math.random() < 0.05) {
        setActiveEdgeCount(edges);
      }

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
  }, [nodeCount, connectThreshold, repulsionForce, rotationSpeed]);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <section className="relative w-full py-12 px-4 sm:px-6 lg:px-8 bg-[#05060a] text-zinc-100 font-mono">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/20">
                <Share2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-purple-400 font-bold block">
                  3D FORCE-DIRECTED NEURAL GRAPH // V6.5
                </span>
                <h3 className="font-['Syne'] text-xl sm:text-2xl font-bold text-white tracking-tight">
                  WebGL Parametric Node Constellation
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>ACTIVE EDGES: <strong className="text-cyan-300">{activeEdgeCount}</strong></span>
              </div>
            </div>
          </div>

          {/* 3D WebGL Canvas Viewport */}
          <div className="relative w-full h-[520px] rounded-2xl bg-gradient-to-b from-[#0a0a14] to-black border border-white/10 overflow-hidden shadow-2xl">
            <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Instruction Overlay Tag */}
            <div className="absolute top-4 left-4 pointer-events-none p-3 rounded-lg bg-black/60 border border-white/10 backdrop-blur-md text-[11px] text-zinc-300 space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <Globe2 className="w-3.5 h-3.5" /> 3D SPHERICAL PROJECTION
              </div>
              <p className="text-zinc-400">Click and drag inside canvas to orbit constellation</p>
            </div>

            {/* Interactive Physics Tuners Bar */}
            <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-black/80 border border-white/15 backdrop-blur-xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                  <span>Connect Distance Threshold</span>
                  <span className="text-cyan-400">{connectThreshold} px</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="60"
                  value={connectThreshold}
                  onChange={(e) => setConnectThreshold(parseInt(e.target.value))}
                  className="w-full accent-cyan-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-zinc-400 text-[11px] mb-1">
                  <span>Auto-Orbit Velocity</span>
                  <span className="text-purple-400">{(rotationSpeed * 1000).toFixed(1)} m/s</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.015"
                  step="0.001"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  className="w-full accent-purple-400 h-1 bg-zinc-800 rounded appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    soundFx.playChime(800, 0.4);
                    setConnectThreshold((prev) => (prev >= 50 ? 25 : prev + 10));
                  }}
                  className="w-full py-1.5 px-3 rounded bg-purple-500/20 hover:bg-purple-500/30 border border-purple-400/40 text-purple-300 font-bold transition-all text-center"
                  data-cursor="hover"
                >
                  ⚡ Restructure Topology
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </BlueprintHUD>
  );
}
