import React, { useState, useEffect, useRef } from 'react';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { Terminal, Shield, Crosshair, Zap, RotateCcw, Radio } from 'lucide-react';
import * as THREE from 'three';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'Scroll_V05_CyberRaycastTunnel',
  name: 'Cyberpunk Raycast Spline Tunnel & Waypoint Scrub',
  category: 'Scroll',
  batch: 'Batch 4: Scroll Choreography & Infinite Canvas Pinning',
  techStack: ['Next.js / React', 'Three.js WebGL', 'Camera Spline Scrub', 'Wireframe Tunnel Shader'],
  aestheticVibe: 'Cyberpunk & High-Density UI / Holographic HUD',
  interactionBlueprint: 'Scrolling scrubs the camera down a 3D hexagonal neon wireframe cyber tunnel; passing through 4 checkpoint holographic security gates triggers telemetry scans, hex dumps, and sound-reactive beacon bursts.',
  description: 'An immersive 3D cyberpunk spline tunnel where scrolling drives camera position through glowing wireframe ring gates with interactive radar HUD telemetry and security waypoint inspections.',
  tags: ['3D WebGL Tunnel', 'Spline Camera Scrub', 'Wireframe Neon', 'Cyberpunk HUD', 'Waypoints'],
  codeSnippet: `// Camera Z-depth scrub along tunnel
const updateTunnelCamera = (scrub: number) => {
  const targetZ = scrub * maxTunnelDepth;
  camera.position.z += (targetZ - camera.position.z) * 0.1;
  // Tunnel rolls subtly with scroll momentum
  camera.rotation.z = Math.sin(scrub * Math.PI * 4) * 0.15;
  
  // Check gate intersection
  gates.forEach((gate, idx) => {
    if (Math.abs(camera.position.z - gate.z) < 10) {
      triggerGateScan(idx);
    }
  });
};`,
};

const gates = [
  { id: '01', name: 'GATE_01: FIREWALL_PERIMETER', z: 30, stat: 'PACKET_FILTER: ACTIVE', ip: '192.168.0.1' },
  { id: '02', name: 'GATE_02: NEURAL_CORE_BRIDGE', z: 90, stat: 'SYNAPSE_LINK: 100Gb/s', ip: '10.0.4.128' },
  { id: '03', name: 'GATE_03: QUANTUM_CIPHER_VAULT', z: 150, stat: 'RSA_4096: LOCKED', ip: '172.16.8.9' },
  { id: '04', name: 'GATE_04: ROOT_MAINFRAME_COCKPIT', z: 210, stat: 'ROOT_ACCESS: GRANTED', ip: '127.0.0.1' },
];

export default function ScrollCyberRaycastTunnel() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [activeGateIndex, setActiveGateIndex] = useState(0);

  // Tunable parameters
  const [tunnelSpeed, setTunnelSpeed] = useState(1.4);
  const [wireframeGlow, setWireframeGlow] = useState(1.2);

  const targetZ = useRef(0);
  const currentZ = useRef(0);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // Wheel interaction within component
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    targetZ.current = Math.max(0, Math.min(1, targetZ.current + e.deltaY * 0.0008));
  };

  // Drag interaction
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startVal = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startVal.current = targetZ.current;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const delta = (e.clientY - startY.current) * 0.0018;
    targetZ.current = Math.max(0, Math.min(1, startVal.current - delta));
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Jump to gate
  const jumpToGate = (idx: number) => {
    soundFx.playCyberBlip();
    targetZ.current = idx / (gates.length - 1);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x04060c, 0.008);

    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    mountRef.current.appendChild(renderer.domElement);

    // Create a series of hexagonal wireframe tunnel rings along Z
    const ringCount = 80;
    const ringGroup = new THREE.Group();
    const ringGeo = new THREE.CircleGeometry(12, 6);
    // Convert to wireframe edges
    const edgesGeo = new THREE.EdgesGeometry(ringGeo);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.4,
    });

    for (let i = 0; i < ringCount; i++) {
      const line = new THREE.LineSegments(edgesGeo, ringMat);
      line.position.z = i * 4;
      line.rotation.z = i * 0.05;
      ringGroup.add(line);
    }
    scene.add(ringGroup);

    // Add Checkpoint Security Gates (glowing thick rings)
    const gateGroup = new THREE.Group();
    gates.forEach((g) => {
      const gateRingGeo = new THREE.TorusGeometry(12, 0.35, 8, 6);
      const gateMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
      });
      const gateMesh = new THREE.Mesh(gateRingGeo, gateMat);
      gateMesh.position.z = g.z;
      gateGroup.add(gateMesh);
    });
    scene.add(gateGroup);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      currentZ.current += (targetZ.current - currentZ.current) * 0.1;
      const scrub = currentZ.current;
      setScrubProgress(scrub);

      // Camera flies down Z axis (max distance 240)
      const camZ = scrub * 230;
      camera.position.z = camZ;
      camera.rotation.z = Math.sin(scrub * Math.PI * 4) * 0.15;

      // Determine nearest active gate
      let nearest = 0;
      let minDiff = 999;
      gates.forEach((g, idx) => {
        const diff = Math.abs(camZ - g.z);
        if (diff < minDiff) {
          minDiff = diff;
          nearest = idx;
        }
      });
      setActiveGateIndex(nearest);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      ringGeo.dispose();
      edgesGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  const activeGate = gates[activeGateIndex];

  return (
    <BlueprintHUD
      blueprint={blueprint}
      controls={
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Tunnel Traversal Velocity ({tunnelSpeed.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={tunnelSpeed}
              onChange={(e) => setTunnelSpeed(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div>
            <label className="block text-zinc-400 font-mono mb-1">
              Wireframe Luminescence ({wireframeGlow.toFixed(1)}x)
            </label>
            <input
              type="range"
              min="0.6"
              max="2.2"
              step="0.1"
              value={wireframeGlow}
              onChange={(e) => setWireframeGlow(parseFloat(e.target.value))}
              className="w-full accent-cyan-400"
            />
          </div>

          <div className="flex items-end gap-1.5">
            {gates.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => jumpToGate(idx)}
                className={`flex-1 py-1.5 rounded font-mono text-[10px] font-bold border transition-colors ${
                  activeGateIndex === idx
                    ? 'bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-zinc-800 text-zinc-400 border-white/10 hover:text-white'
                }`}
              >
                G{idx + 1}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className="relative w-full h-[90vh] bg-[#04060c] text-white flex flex-col justify-between overflow-hidden select-none border-y border-white/10 cursor-ns-resize"
      >
        {/* Three.js WebGL Tunnel Canvas */}
        <div ref={mountRef} className="absolute inset-0 z-10" />

        {/* Scanlines & Crosshair HUD Layer */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30 z-15" />

        {/* Top Header Bar */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 pt-8 flex items-center justify-between pointer-events-none font-mono text-xs">
          <div className="flex items-center gap-3 text-cyan-400">
            <Radio className="w-4 h-4 animate-pulse" />
            <span className="font-bold tracking-widest uppercase">
              RAYCAST_TUNNEL // V05
            </span>
          </div>

          <div className="flex items-center gap-4 text-zinc-400 bg-black/60 px-4 py-1.5 rounded-full border border-cyan-500/30 backdrop-blur-md">
            <span>TRAVERSAL_SCRUB:</span>
            <span className="text-cyan-400 font-bold">{Math.round(scrubProgress * 100)}%</span>
          </div>
        </div>

        {/* Center Target Waypoint HUD Box */}
        <div className="relative z-20 w-full max-w-md mx-auto my-auto p-6 rounded-xl bg-black/75 border border-cyan-500/40 backdrop-blur-xl pointer-events-none shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 border-b border-cyan-900/60 pb-2 mb-3">
            <span className="text-cyan-400 font-bold flex items-center gap-1.5">
              <Crosshair className="w-3.5 h-3.5" />
              <span>CURRENT WAYPOINT</span>
            </span>
            <span>IP: {activeGate.ip}</span>
          </div>

          <h3 className="font-mono text-lg font-bold text-white tracking-wide uppercase">
            {activeGate.name}
          </h3>

          <div className="mt-3 flex items-center justify-between font-mono text-xs text-zinc-300">
            <span>STATUS:</span>
            <span className="text-emerald-400 font-bold">{activeGate.stat}</span>
          </div>

          {/* Miniature Traversal Meter */}
          <div className="mt-4 w-full h-1 bg-cyan-950 rounded-full overflow-hidden border border-cyan-500/20">
            <div
              className="h-full bg-cyan-400 shadow-[0_0_10px_#06b6d4] transition-all duration-75"
              style={{ width: `${scrubProgress * 100}%` }}
            />
          </div>
        </div>

        {/* Bottom Rail Controls */}
        <div className="relative z-20 w-full max-w-6xl mx-auto px-8 pb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-80">
            <span className="font-mono text-[10px] text-zinc-500 whitespace-nowrap">
              TUNNEL SCRUB
            </span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.005"
              value={scrubProgress}
              onChange={(e) => {
                targetZ.current = parseFloat(e.target.value);
              }}
              className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2">
            {gates.map((g, idx) => (
              <button
                key={g.id}
                onClick={() => jumpToGate(idx)}
                className={`px-3 py-1 rounded font-mono text-xs transition-all border ${
                  activeGateIndex === idx
                    ? 'bg-cyan-400 text-black font-bold border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                    : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                }`}
                data-cursor="hover"
              >
                Gate 0{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
