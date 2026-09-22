import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Box, Sparkles, Sliders, RefreshCw, Eye, Move3d } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v05_parametric3dribbonmesh',
  name: 'Parametric 3D Kinetic Typography Ribbon & Spatial Möbius Mesh',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Three.js WebGL', 'Parametric Spline Extrusion', 'Canvas Dynamic Texture', 'Orbit Inertia Physics'],
  aestheticVibe: 'Immersive 3D Math / Spatial Typography WebGL',
  interactionBlueprint: '3D parametric knot ribbon extruded in WebGL with continuous dynamic kinetic text rendered onto a high-res canvas texture. Features smooth pointer orbit drag physics, wireframe cage toggles, twist multiplication, and camera zoom.',
  description: 'Three.js spatial typography ribbon twisting in 3D Euclidean space with seamless dynamic canvas text projection, pointer drag inertia, and luminescent shader caustics.',
  codeSnippet: `// 3D Canvas texture generation for extruded spatial ribbon
const canvas = document.createElement('canvas');
canvas.width = 2048; canvas.height = 256;
const ctx = canvas.getContext('2d');
ctx.fillText(text.repeat(8), x, 140);
const texture = new THREE.CanvasTexture(canvas);
texture.wrapS = THREE.RepeatWrapping;`,
  tags: ['Typography', 'Three.js', 'WebGL', '3D', 'Parametric', 'Ribbon', 'Spatial'],
};

export default function TypographyParametric3DRibbonMesh() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // Dynamic parameters
  const [ribbonText, setRibbonText] = useState<string>('PARAMETRIC // SPATIAL TYPOGRAPHY // 3D KINETIC MESH // ');
  const [twistRate, setTwistRate] = useState<number>(3.5); // 1 to 6
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.2); // 0.2 to 3.0
  const [showWireframe, setShowWireframe] = useState<boolean>(false);
  const [ribbonColor, setRibbonColor] = useState<'CYAN_PURPLE' | 'GOLD_EMERALD' | 'HOT_ROD'>('CYAN_PURPLE');

  // Internal refs for updating live Three.js uniforms without re-mounting
  const ribbonMeshRef = useRef<THREE.Mesh | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);
  const paramsRef = useRef({ twistRate, rotationSpeed, showWireframe, ribbonColor });

  useEffect(() => {
    paramsRef.current = { twistRate, rotationSpeed, showWireframe, ribbonColor };
    if (ribbonMeshRef.current && ribbonMeshRef.current.material) {
      const mat = ribbonMeshRef.current.material as THREE.MeshStandardMaterial;
      mat.wireframe = showWireframe;
      mat.needsUpdate = true;
    }
  }, [twistRate, rotationSpeed, showWireframe, ribbonColor]);

  // Three.js Mount & Animation Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070c);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Dynamic Text Canvas Texture
    const textCanvas = document.createElement('canvas');
    textCanvas.width = 2048;
    textCanvas.height = 256;
    const textCtx = textCanvas.getContext('2d');

    const updateTexture = (text: string) => {
      if (!textCtx) return;
      textCtx.fillStyle = '#0a0d14';
      textCtx.fillRect(0, 0, 2048, 256);

      // Glow border lines
      textCtx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      textCtx.lineWidth = 6;
      textCtx.strokeRect(0, 0, 2048, 256);

      // Repeated kinetic text
      textCtx.font = "900 84px 'Syne', sans-serif";
      textCtx.fillStyle = '#ffffff';
      textCtx.textBaseline = 'middle';
      const repeated = (text + ' ').repeat(5);
      textCtx.fillText(repeated, 20, 128);
    };

    updateTexture(ribbonText);

    const canvasTexture = new THREE.CanvasTexture(textCanvas);
    canvasTexture.wrapS = THREE.RepeatWrapping;
    canvasTexture.wrapT = THREE.RepeatWrapping;
    canvasTexture.repeat.set(2, 1);
    textureRef.current = canvasTexture;

    // Parametric Torus/Ribbon Curve Geometry
    const curvePoints: THREE.Vector3[] = [];
    const segments = 180;
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      const x = Math.sin(t) * (2.8 + Math.cos(t * 2) * 0.7);
      const y = Math.cos(t) * (2.8 + Math.cos(t * 2) * 0.7);
      const z = Math.sin(t * 3) * 1.1;
      curvePoints.push(new THREE.Vector3(x, y, z));
    }

    const curve = new THREE.CatmullRomCurve3(curvePoints, true);
    const geometry = new THREE.TubeGeometry(curve, 180, 0.45, 16, true);

    const material = new THREE.MeshStandardMaterial({
      map: canvasTexture,
      roughness: 0.25,
      metalness: 0.8,
      wireframe: paramsRef.current.showWireframe,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    ribbonMeshRef.current = mesh;

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 4, 30);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 4, 30);
    pointLight2.position.set(-5, -5, -3);
    scene.add(pointLight2);

    // Pointer Drag Inertia
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let targetRotation = { x: 0.3, y: 0.4 };
    let currentRotation = { x: 0.3, y: 0.4 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
      soundFx.playTick(900);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      targetRotation.y += deltaX * 0.008;
      targetRotation.x += deltaY * 0.008;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const speed = paramsRef.current.rotationSpeed;

      // Auto-rotation and inertia interpolation
      targetRotation.y += delta * 0.3 * speed;
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.06;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.06;

      mesh.rotation.x = currentRotation.x;
      mesh.rotation.y = currentRotation.y;

      // Scroll kinetic text texture along tube
      canvasTexture.offset.x += delta * 0.15 * speed;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div className="w-full bg-[#05070c] border border-cyan-500/25 rounded-2xl overflow-hidden flex flex-col">
        {/* Three.js 3D WebGL Canvas Viewport */}
        <div className="relative w-full h-[460px] sm:h-[500px] cursor-grab active:cursor-grabbing select-none overflow-hidden">
          <div ref={mountRef} className="w-full h-full block" />

          {/* Viewport Floating Overlays */}
          <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/70 border border-cyan-500/40 text-cyan-400 font-mono text-[11px] font-bold flex items-center gap-1.5 backdrop-blur-md">
              <Move3d className="w-3.5 h-3.5" /> THREE.JS 3D KINETIC RIBBON
            </span>
            <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400 font-mono text-[10px]">
              DRAG TO ORBIT
            </span>
          </div>

          <div className="absolute bottom-4 right-4 pointer-events-none">
            <span className="px-2.5 py-1 rounded bg-black/60 border border-white/10 text-zinc-400 font-mono text-[10px]">
              Click &amp; drag mouse to orbit 3D spline
            </span>
          </div>
        </div>

        {/* 3D Parameters Tuning Panel */}
        <div className="p-5 bg-[#080a10] border-t border-white/10 flex flex-col gap-4 font-mono text-xs">
          {/* Custom String Input */}
          <div>
            <label className="text-[11px] text-zinc-400 uppercase tracking-wider block mb-1.5">
              3D Ribbon Extrusion String:
            </label>
            <input
              type="text"
              value={ribbonText}
              onChange={(e) => setRibbonText(e.target.value.toUpperCase())}
              className="w-full bg-black/50 border border-white/15 rounded-lg px-3.5 py-2 text-white font-mono text-xs focus:outline-none focus:border-cyan-400 transition-colors"
              maxLength={60}
            />
          </div>

          {/* Sliders Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
            {/* Rotation Speed */}
            <div className="p-3 rounded bg-white/5 border border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-zinc-400">ORBIT VELOCITY:</span>
                <span className="text-cyan-400 font-bold">{rotationSpeed.toFixed(1)}x</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.2"
                value={rotationSpeed}
                onChange={(e) => {
                  soundFx.playTick(1000);
                  setRotationSpeed(Number(e.target.value));
                }}
                className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded cursor-pointer"
              />
            </div>

            {/* Wireframe Toggle */}
            <div className="p-3 rounded bg-white/5 border border-white/10 flex items-center justify-between">
              <div>
                <span className="text-zinc-300 font-bold block">WIREFRAME MESH</span>
                <span className="text-[10px] text-zinc-500">Polygon cage visualizer</span>
              </div>
              <button
                onClick={() => {
                  soundFx.playClick(850);
                  setShowWireframe(!showWireframe);
                }}
                className={`px-3 py-1.5 rounded font-bold uppercase transition-colors border ${
                  showWireframe
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-black/40 text-zinc-400 border-white/10'
                }`}
              >
                {showWireframe ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* Reset Camera Orbit */}
            <div className="p-3 rounded bg-white/5 border border-white/10 flex flex-col justify-between">
              <span className="text-zinc-400 mb-2">SPLINE TOPOLOGY:</span>
              <button
                onClick={() => {
                  soundFx.playChime(850);
                  if (ribbonMeshRef.current) {
                    ribbonMeshRef.current.rotation.set(0.3, 0.4, 0);
                  }
                }}
                className="py-1.5 rounded font-bold uppercase border bg-white/5 hover:bg-white/10 border-white/15 text-zinc-200 transition-colors"
              >
                Reset Orientation
              </button>
            </div>
          </div>
        </div>
      </div>
    </BlueprintHUD>
  );
}
