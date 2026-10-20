import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import BlueprintHUD from '../common/BlueprintHUD';
import { ComponentBlueprint } from '../../types';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v06_gltfstudio',
  name: 'Universal 3D GLTF/GLB Drag & Drop Studio & PBR Inspector',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas & Physics Sandboxes',
  techStack: ['Three.js WebGL', 'GLTFLoader', 'OrbitControls', 'ACES Filmic', 'PBR Physical Shaders', 'File Drag & Drop'],
  aestheticVibe: 'Universal 3D Drag & Drop Studio & Mesh Inspector',
  interactionBlueprint: 'FileReader parses binary ArrayBuffer into GLTFLoader.parse(). Automatically centers geometry at origin, normalizes bounding box scales, and binds OrbitControls with dynamic ACES Filmic lighting rigs.',
  description: 'استودیوی جامع سه‌بعدی و بازرس فایل‌های GLTF/GLB با قابلیت درگ اند دراپ فایل‌های سه‌بعدی، پالت‌های نوری استودیویی و تغییر پارامترهای فیزیکال PBR.',
  codeSnippet: `// Ingest user dropped 3D model
const reader = new FileReader();
reader.onload = (e) => {
  const loader = new GLTFLoader();
  loader.parse(e.target.result, '', (gltf) => {
    scene.add(gltf.scene);
  });
};
reader.readAsArrayBuffer(file);`,
  tags: ['Spatial', '3D', 'GLTF', 'GLB', 'Three.js', 'WebGL', 'PBR', 'Inspector'],
};
import {
  Upload,
  Box,
  Eye,
  Sun,
  Layers,
  RotateCw,
  Camera,
  Maximize2,
  Check,
  RefreshCw,
  FileCode,
  Info,
  Sparkles,
  Sliders,
  Play,
  Pause
} from 'lucide-react';

type ShadingMode = 'PBR' | 'WIREFRAME' | 'NORMALS' | 'CLAY' | 'POINTS';
type LightingPreset = 'STUDIO' | 'CYBER' | 'GOLDEN_HOUR' | 'DEEP_SPACE';

interface ModelTelemetry {
  name: string;
  vertices: number;
  triangles: number;
  meshes: number;
  materials: number;
  hasAnimations: boolean;
  boundingBox: { x: number; y: number; z: number };
}

export default function SpatialGltfStudioInspector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Studio Controls State
  const [shadingMode, setShadingMode] = useState<ShadingMode>('PBR');
  const [lightingPreset, setLightingPreset] = useState<LightingPreset>('STUDIO');
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [roughness, setRoughness] = useState<number>(0.35);
  const [metalness, setMetalness] = useState<number>(0.2);
  const [activeModelKey, setActiveModelKey] = useState<string>('COFFEE_BEAN');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isPlayingAnim, setIsPlayingAnim] = useState<boolean>(true);
  const [telemetry, setTelemetry] = useState<ModelTelemetry>({
    name: '123 Coffee Roast Bean',
    vertices: 4892,
    triangles: 9780,
    meshes: 1,
    materials: 1,
    hasAnimations: false,
    boundingBox: { x: 2.1, y: 1.4, z: 1.2 },
  });

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);
  const gridHelperRef = useRef<THREE.GridHelper | null>(null);
  const lightsGroupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const clockRef = useRef<THREE.Clock>(new THREE.Clock());

  // Set up Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 560;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x06070a);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 2.5, 5.5);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 25;
    controls.minDistance = 1;
    controlsRef.current = controls;

    // Grid Floor
    const grid = new THREE.GridHelper(12, 24, 0x06b6d4, 0x1e293b);
    grid.position.y = -1.2;
    scene.add(grid);
    gridHelperRef.current = grid;

    // Lights Group
    const lightsGroup = new THREE.Group();
    scene.add(lightsGroup);
    lightsGroupRef.current = lightsGroup;
    updateLightingPreset(lightingPreset, lightsGroup);

    // Model Group container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    modelGroupRef.current = modelGroup;

    // Load initial sample model (Parametric 123 Coffee Bean)
    loadSampleModel('COFFEE_BEAN');

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clockRef.current.getDelta();

      if (mixerRef.current && isPlayingAnim) {
        mixerRef.current.update(delta);
      }

      if (autoRotate && modelGroupRef.current) {
        modelGroupRef.current.rotation.y += 0.008;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 560;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Lighting according to preset
  const updateLightingPreset = (preset: LightingPreset, group: THREE.Group) => {
    // Clear old lights
    while (group.children.length > 0) {
      group.remove(group.children[0]);
    }

    if (preset === 'STUDIO') {
      const hemi = new THREE.HemisphereLight(0xffffff, 0x0f172a, 1.2);
      group.add(hemi);

      const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.5);
      keyLight.position.set(5, 8, 6);
      keyLight.castShadow = true;
      group.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
      fillLight.position.set(-6, 2, -4);
      group.add(fillLight);

      const rimLight = new THREE.DirectionalLight(0xa855f7, 1.5);
      rimLight.position.set(0, -4, -6);
      group.add(rimLight);
    } else if (preset === 'CYBER') {
      const ambient = new THREE.AmbientLight(0x0a0a20, 0.8);
      group.add(ambient);

      const cyanPoint = new THREE.PointLight(0x06b6d4, 5, 20);
      cyanPoint.position.set(4, 3, 3);
      group.add(cyanPoint);

      const magentaPoint = new THREE.PointLight(0xec4899, 4.5, 20);
      magentaPoint.position.set(-4, 2, -3);
      group.add(magentaPoint);

      const limeLight = new THREE.DirectionalLight(0x84cc16, 1.8);
      limeLight.position.set(0, 6, 0);
      group.add(limeLight);
    } else if (preset === 'GOLDEN_HOUR') {
      const ambient = new THREE.AmbientLight(0x451a03, 1.0);
      group.add(ambient);

      const sun = new THREE.DirectionalLight(0xf59e0b, 3.5);
      sun.position.set(8, 3, 4);
      group.add(sun);

      const bounce = new THREE.DirectionalLight(0x9a3412, 1.4);
      bounce.position.set(-6, -1, -3);
      group.add(bounce);
    } else if (preset === 'DEEP_SPACE') {
      const faintAmb = new THREE.AmbientLight(0x0f172a, 0.4);
      group.add(faintAmb);

      const starLight = new THREE.DirectionalLight(0xffffff, 2.8);
      starLight.position.set(6, 6, 6);
      group.add(starLight);

      const nebulaGlow = new THREE.PointLight(0x8b5cf6, 2.2, 18);
      nebulaGlow.position.set(-3, -2, 2);
      group.add(nebulaGlow);
    }
  };

  useEffect(() => {
    if (lightsGroupRef.current) {
      updateLightingPreset(lightingPreset, lightsGroupRef.current);
    }
  }, [lightingPreset]);

  // Update Grid
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // Apply Shading Mode to currently loaded meshes
  const applyShadingMode = (mode: ShadingMode, meshRoughness: number, meshMetalness: number) => {
    if (!modelGroupRef.current) return;

    modelGroupRef.current.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mode === 'WIREFRAME') {
          mesh.material = new THREE.MeshBasicMaterial({
            color: 0x06b6d4,
            wireframe: true,
          });
        } else if (mode === 'NORMALS') {
          mesh.material = new THREE.MeshNormalMaterial({
            wireframe: false,
          });
        } else if (mode === 'CLAY') {
          mesh.material = new THREE.MeshStandardMaterial({
            color: 0xeeeeee,
            roughness: 0.9,
            metalness: 0.05,
          });
        } else if (mode === 'PBR') {
          // If original material exists or fallback standard
          if (mesh.userData.originalMaterial) {
            mesh.material = mesh.userData.originalMaterial;
            if ((mesh.material as THREE.MeshStandardMaterial).isMeshStandardMaterial) {
              const std = mesh.material as THREE.MeshStandardMaterial;
              std.roughness = meshRoughness;
              std.metalness = meshMetalness;
              std.needsUpdate = true;
            }
          } else {
            mesh.material = new THREE.MeshPhysicalMaterial({
              color: 0x4f46e5,
              roughness: meshRoughness,
              metalness: meshMetalness,
              clearcoat: 0.8,
              clearcoatRoughness: 0.1,
            });
          }
        }
      }
    });
  };

  useEffect(() => {
    applyShadingMode(shadingMode, roughness, metalness);
  }, [shadingMode, roughness, metalness]);

  // Calculate and Update Telemetry for any loaded Object3D
  const inspectLoadedModel = (root: THREE.Object3D, name: string) => {
    let vertices = 0;
    let triangles = 0;
    let meshes = 0;
    const materialSet = new Set<string>();

    root.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        meshes++;
        const mesh = child as THREE.Mesh;
        const geom = mesh.geometry;

        if (!mesh.userData.originalMaterial) {
          mesh.userData.originalMaterial = mesh.material;
        }

        if (geom) {
          if (geom.index) {
            triangles += geom.index.count / 3;
          } else if (geom.attributes.position) {
            triangles += geom.attributes.position.count / 3;
          }
          if (geom.attributes.position) {
            vertices += geom.attributes.position.count;
          }
        }

        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((m) => materialSet.add(m.uuid));
        } else if (mesh.material) {
          materialSet.add(mesh.material.uuid);
        }
      }
    });

    // Compute bounding box
    const box = new THREE.Box3().setFromObject(root);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);

    // Auto-center and normalize scale so it fits viewport nicely
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = maxDim > 0 ? 2.8 / maxDim : 1;
    root.scale.setScalar(targetScale);
    root.position.sub(center.multiplyScalar(targetScale));

    setTelemetry({
      name,
      vertices,
      triangles: Math.round(triangles),
      meshes,
      materials: materialSet.size,
      hasAnimations: false,
      boundingBox: {
        x: parseFloat(size.x.toFixed(2)),
        y: parseFloat(size.y.toFixed(2)),
        z: parseFloat(size.z.toFixed(2)),
      },
    });

    // Re-apply current shading
    applyShadingMode(shadingMode, roughness, metalness);
  };

  // Generate Procedural High-Detail 3D Models
  const loadSampleModel = (key: string) => {
    if (!modelGroupRef.current) return;
    setLoading(true);
    setLoadError(null);
    setActiveModelKey(key);

    // Clear existing children
    while (modelGroupRef.current.children.length > 0) {
      modelGroupRef.current.remove(modelGroupRef.current.children[0]);
    }

    setTimeout(() => {
      if (!modelGroupRef.current) return;

      if (key === 'COFFEE_BEAN') {
        // High-Poly Parametric 123 Coffee Bean with organic roast cleft
        const geom = new THREE.SphereGeometry(1.4, 64, 48);
        const pos = geom.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          let x = pos.getX(i);
          let y = pos.getY(i);
          let z = pos.getZ(i);

          // Flatten into elongated bean shape
          x *= 1.35;
          y *= 0.85;
          z *= 0.65;

          // Cleft incision down front face
          if (z > 0 && Math.abs(x) < 0.4) {
            const depth = Math.cos((x / 0.4) * (Math.PI / 2)) * 0.45;
            z -= depth;
          }

          // Organic surface turbulence
          const noise = Math.sin(x * 5) * Math.cos(y * 5) * 0.04;
          pos.setXYZ(i, x + noise, y + noise, z + noise);
        }
        geom.computeVertexNormals();

        const mat = new THREE.MeshPhysicalMaterial({
          color: 0x2e1810,
          roughness: 0.35,
          metalness: 0.15,
          clearcoat: 0.7,
          clearcoatRoughness: 0.25,
        });

        const mesh = new THREE.Mesh(geom, mat);
        modelGroupRef.current.add(mesh);
        inspectLoadedModel(modelGroupRef.current, '123 Coffee Roast Bean (Parametric PBR)');
      } else if (key === 'CHRONOMETER') {
        // Luxury Watch Case & Chronometer Mechanism
        const group = new THREE.Group();

        // Bezel & Case
        const caseGeom = new THREE.CylinderGeometry(1.5, 1.45, 0.45, 48);
        const caseMat = new THREE.MeshPhysicalMaterial({
          color: 0xe2e8f0,
          metalness: 0.95,
          roughness: 0.15,
          clearcoat: 1.0,
        });
        const caseMesh = new THREE.Mesh(caseGeom, caseMat);
        group.add(caseMesh);

        // Fluted Golden Bezel Ring
        const ringGeom = new THREE.TorusGeometry(1.52, 0.08, 16, 64);
        const goldMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          metalness: 0.9,
          roughness: 0.2,
        });
        const ringMesh = new THREE.Mesh(ringGeom, goldMat);
        ringMesh.rotation.x = Math.PI / 2;
        group.add(ringMesh);

        // Dial Face
        const dialGeom = new THREE.CircleGeometry(1.38, 48);
        const dialMat = new THREE.MeshStandardMaterial({
          color: 0x09090b,
          roughness: 0.3,
        });
        const dialMesh = new THREE.Mesh(dialGeom, dialMat);
        dialMesh.rotation.x = -Math.PI / 2;
        dialMesh.position.y = 0.23;
        group.add(dialMesh);

        // Subdials & Hands
        const handGeom = new THREE.BoxGeometry(0.06, 0.02, 1.0);
        const handMat = new THREE.MeshStandardMaterial({ color: 0x06b6d4, metalness: 0.8 });
        const handMesh = new THREE.Mesh(handGeom, handMat);
        handMesh.position.set(0, 0.25, 0.3);
        group.add(handMesh);

        modelGroupRef.current.add(group);
        inspectLoadedModel(modelGroupRef.current, 'Chronometer Luxury Timepiece');
      } else if (key === 'CYBER_DRONE') {
        // Cyberpunk Modular Tactical Drone
        const group = new THREE.Group();

        // Central Fuselage
        const bodyGeom = new THREE.OctahedronGeometry(1.1, 2);
        const bodyMat = new THREE.MeshStandardMaterial({
          color: 0x0f172a,
          metalness: 0.85,
          roughness: 0.25,
        });
        const bodyMesh = new THREE.Mesh(bodyGeom, bodyMat);
        bodyMesh.scale.set(1.4, 0.5, 1.2);
        group.add(bodyMesh);

        // Glowing Core Eye
        const eyeGeom = new THREE.SphereGeometry(0.4, 24, 24);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
        const eyeMesh = new THREE.Mesh(eyeGeom, eyeMat);
        eyeMesh.position.set(0, 0, 0.9);
        group.add(eyeMesh);

        // 4 Quad Thruster pods
        for (let i = 0; i < 4; i++) {
          const angle = (i * Math.PI) / 2 + Math.PI / 4;
          const px = Math.cos(angle) * 1.6;
          const pz = Math.sin(angle) * 1.6;

          const podGeom = new THREE.CylinderGeometry(0.3, 0.25, 0.6, 16);
          const podMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
          const podMesh = new THREE.Mesh(podGeom, podMat);
          podMesh.position.set(px, 0.1, pz);
          group.add(podMesh);

          // Neon thruster ring
          const thrusterRing = new THREE.TorusGeometry(0.28, 0.04, 8, 24);
          const ringMat = new THREE.MeshBasicMaterial({ color: 0xec4899 });
          const ring = new THREE.Mesh(thrusterRing, ringMat);
          ring.position.set(px, -0.2, pz);
          ring.rotation.x = Math.PI / 2;
          group.add(ring);
        }

        modelGroupRef.current.add(group);
        inspectLoadedModel(modelGroupRef.current, 'Cyberpunk Recon Drone MK-IV');
      } else if (key === 'NEO_MONOLITH') {
        // Neo-Brutalist Architectural Monolith
        const group = new THREE.Group();

        const baseGeom = new THREE.BoxGeometry(1.6, 2.8, 1.6);
        const baseMat = new THREE.MeshStandardMaterial({
          color: 0x27272a,
          roughness: 0.85,
          metalness: 0.1,
        });
        const baseMesh = new THREE.Mesh(baseGeom, baseMat);
        group.add(baseMesh);

        // Cantilevered Glass Bridge
        const bridgeGeom = new THREE.BoxGeometry(2.6, 0.4, 0.8);
        const glassMat = new THREE.MeshPhysicalMaterial({
          color: 0x06b6d4,
          transmission: 0.88,
          roughness: 0.1,
          thickness: 0.5,
        });
        const bridgeMesh = new THREE.Mesh(bridgeGeom, glassMat);
        bridgeMesh.position.set(0.3, 0.6, 0);
        group.add(bridgeMesh);

        modelGroupRef.current.add(group);
        inspectLoadedModel(modelGroupRef.current, 'Brutalist Monolith & Cantilever');
      }

      setLoading(false);
    }, 150);
  };

  // Handle Drag & Drop / File Upload of custom .gltf / .glb files
  const handleFileUpload = (file: File) => {
    if (!file) return;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension !== 'glb' && extension !== 'gltf') {
      setLoadError('Please drop a valid .glb or .gltf 3D file.');
      return;
    }

    setLoading(true);
    setLoadError(null);
    soundFx.playChime(600, 0.2);

    const reader = new FileReader();
    reader.onload = (e) => {
      const contents = e.target?.result;
      if (!contents) {
        setLoading(false);
        setLoadError('Unable to read 3D file buffer.');
        return;
      }

      const loader = new GLTFLoader();
      loader.parse(
        contents,
        '',
        (gltf: any) => {
          if (!modelGroupRef.current) return;

          // Clear previous model
          while (modelGroupRef.current.children.length > 0) {
            modelGroupRef.current.remove(modelGroupRef.current.children[0]);
          }

          // Check for animations
          if (gltf.animations && gltf.animations.length > 0) {
            mixerRef.current = new THREE.AnimationMixer(gltf.scene);
            const action = mixerRef.current.clipAction(gltf.animations[0]);
            action.play();
          } else {
            mixerRef.current = null;
          }

          modelGroupRef.current.add(gltf.scene);
          inspectLoadedModel(modelGroupRef.current, file.name);
          setActiveModelKey('CUSTOM_UPLOAD');
          setLoading(false);
          soundFx.playChime(950, 0.3);
        },
        (error: any) => {
          console.error('GLTF Parsing Error:', error);
          setLoadError('Failed to parse 3D GLTF structure.');
          setLoading(false);
        }
      );
    };

    reader.readAsArrayBuffer(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const captureSnapshot = () => {
    if (!rendererRef.current) return;
    soundFx.playClick(900);
    const dataURL = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `${telemetry.name.toLowerCase().replace(/\s+/g, '_')}_render.png`;
    link.href = dataURL;
    link.click();
  };

  return (
    <BlueprintHUD blueprint={blueprint}>
      <div id="spatial_v06_gltfstudio" className="relative w-full py-16 bg-[#040508] border-b border-white/10 text-zinc-100 overflow-hidden font-['Plus_Jakarta_Sans']">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest mb-1.5">
              <Box className="w-4 h-4 animate-spin text-cyan-400" />
              <span>SPATIAL WEBGL // GLTF &amp; GLB DRAG &amp; DROP STUDIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Syne']">
              Universal 3D Model Studio &amp; PBR Inspector
            </h2>
            <p className="text-sm text-zinc-400 mt-1 max-w-2xl">
              Real-time WebGL GLTF/GLB parser with drag &amp; drop file ingestion, ACES Filmic lighting presets, PBR physical material tuning, mesh hierarchy diagnostics, and high-res snapshot export.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={captureSnapshot}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-sm"
            >
              <Camera className="w-4 h-4 text-cyan-400" />
              <span>Snapshot PNG</span>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black font-bold font-mono text-xs flex items-center gap-2 transition-all shadow-lg shadow-cyan-500/20"
            >
              <Upload className="w-4 h-4" />
              <span>Upload .GLB / .GLTF</span>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".glb,.gltf"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>

        {/* Studio Viewport & Multi-Inspector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
          {/* Main 3D Viewport (3 Columns) */}
          <div
            className={`lg:col-span-3 relative h-[560px] rounded-3xl overflow-hidden border transition-all ${
              isDragging
                ? 'border-cyan-400 bg-cyan-950/20 shadow-2xl shadow-cyan-500/30'
                : 'border-white/10 bg-[#06070a]'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {/* Three.js Canvas Mount */}
            <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

            {/* Drag & Drop Overlay */}
            {isDragging && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md border-2 border-dashed border-cyan-400 animate-pulse">
                <Upload className="w-16 h-16 text-cyan-400 mb-3 animate-bounce" />
                <h3 className="text-xl font-bold text-white font-['Syne']">Drop your .GLB or .GLTF file here</h3>
                <p className="text-sm font-mono text-cyan-300 mt-1">Instant client asset rendering &amp; PBR shader analysis</p>
              </div>
            )}

            {/* Loading / Error Indicator */}
            {loading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
                <RefreshCw className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">Parsing 3D Geometry...</span>
              </div>
            )}

            {loadError && (
              <div className="absolute top-4 left-4 z-20 px-4 py-2.5 rounded-xl bg-rose-950/80 border border-rose-500/50 text-rose-300 font-mono text-xs flex items-center gap-2">
                <Info className="w-4 h-4 text-rose-400" />
                <span>{loadError}</span>
              </div>
            )}

            {/* Floating Top Controls Overlay */}
            <div className="absolute top-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              {/* Presets Switcher */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md pointer-events-auto shadow-xl">
                {[
                  { key: 'COFFEE_BEAN', label: '123 Coffee' },
                  { key: 'CHRONOMETER', label: 'Watch 3D' },
                  { key: 'CYBER_DRONE', label: 'Drone MK-IV' },
                  { key: 'NEO_MONOLITH', label: 'Monolith' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      soundFx.playClick(750);
                      loadSampleModel(item.key);
                    }}
                    className={`px-3 py-1.5 rounded-xl font-mono text-[11px] font-semibold transition-all ${
                      activeModelKey === item.key
                        ? 'bg-cyan-400 text-black shadow-md shadow-cyan-400/20'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Shading Mode Chips */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md pointer-events-auto shadow-xl">
                {(['PBR', 'WIREFRAME', 'NORMALS', 'CLAY'] as ShadingMode[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => {
                      soundFx.playClick(650);
                      setShadingMode(mode);
                    }}
                    className={`px-2.5 py-1 rounded-lg font-mono text-[10px] font-bold uppercase transition-all ${
                      shadingMode === mode
                        ? 'bg-amber-400 text-black shadow-md'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Viewport HUD Info Bar */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-md font-mono text-[11px] text-zinc-300">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-cyan-300 font-bold">
                  <Box className="w-3.5 h-3.5" />
                  {telemetry.name}
                </span>
                <span className="text-zinc-500">|</span>
                <span>▲ {telemetry.triangles.toLocaleString()} polys</span>
                <span className="text-zinc-500">|</span>
                <span>● {telemetry.vertices.toLocaleString()} verts</span>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={autoRotate}
                    onChange={(e) => setAutoRotate(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Orbit Spin</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer hover:text-white">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="accent-cyan-400 rounded"
                  />
                  <span>Floor Grid</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Inspector & Shader Parameters Panel (1 Column) */}
          <div className="space-y-4">
            {/* Lighting Environment Selector */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5" /> Lighting Rig
                </span>
                <span className="text-[10px] font-mono text-zinc-500">ACES Filmic</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'STUDIO', label: 'Studio Lux', color: 'border-cyan-500/30' },
                  { key: 'CYBER', label: 'Cyberpunk', color: 'border-pink-500/30' },
                  { key: 'GOLDEN_HOUR', label: 'Golden Hour', color: 'border-amber-500/30' },
                  { key: 'DEEP_SPACE', label: 'Deep Space', color: 'border-purple-500/30' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => {
                      soundFx.playClick(700);
                      setLightingPreset(item.key as LightingPreset);
                    }}
                    className={`p-2.5 rounded-xl border text-left font-mono text-[11px] transition-all ${
                      lightingPreset === item.key
                        ? 'bg-white/10 border-cyan-400 text-white font-bold shadow-md'
                        : 'bg-white/5 border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* PBR Physical Material Sliders */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> PBR Overrides
                </span>
                <span className="text-[10px] font-mono text-zinc-400">Rough / Metal</span>
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Roughness</span>
                  <span className="text-cyan-300">{roughness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={roughness}
                  onChange={(e) => setRoughness(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
                  <span>Metalness</span>
                  <span className="text-cyan-300">{metalness.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={metalness}
                  onChange={(e) => setMetalness(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 h-1.5 bg-zinc-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Geometry Hierarchy & Telemetry Dossier */}
            <div className="p-4 rounded-2xl bg-[#090b10] border border-white/10 space-y-2.5 font-mono text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <FileCode className="w-3.5 h-3.5 text-zinc-400" /> Model Telemetry
              </span>

              <div className="space-y-1.5 pt-1 text-[11px] text-zinc-300 divide-y divide-white/5">
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Sub-Meshes:</span>
                  <span className="text-white font-bold">{telemetry.meshes}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Materials:</span>
                  <span className="text-white font-bold">{telemetry.materials}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Bounding Box:</span>
                  <span className="text-cyan-400">
                    {telemetry.boundingBox.x}m × {telemetry.boundingBox.y}m × {telemetry.boundingBox.z}m
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">File Ingestion:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Ready for Drop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        </div>
      </div>
    </BlueprintHUD>
  );
}
