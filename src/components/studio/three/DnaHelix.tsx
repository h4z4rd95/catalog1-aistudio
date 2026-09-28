import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DnaHelixProps {
  className?: string;
  scrollProgress?: number;
  highlightedIndex?: number;
  totalServices?: number;
}

export default function DnaHelix({
  className = '',
  scrollProgress = 0,
  highlightedIndex = 0,
  totalServices = 10,
}: DnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const helixGroupRef = useRef<THREE.Group | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollRef = useRef({ current: 0, target: 0 });

  // Update target rotation from parent scroll progress
  useEffect(() => {
    // Total rotation proportional to all services passing by
    scrollRef.current.target = scrollProgress * Math.PI * 6.5;
  }, [scrollProgress]);

  // Lazy initialize via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 700;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-End Studio Lighting (Dual Neon Accent Lights + Rim Light)
    const ambientLight = new THREE.AmbientLight(0x0e1322, 1.4);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 6, 18);
    violetLight.position.set(-4, 3, 5);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 6, 18);
    cyanLight.position.set(4, -3, 5);
    scene.add(cyanLight);

    const goldRimLight = new THREE.DirectionalLight(0xb8ff3d, 1.2);
    goldRimLight.position.set(0, 8, -3);
    scene.add(goldRimLight);

    // 3. DNA Instanced Double Helix Structure
    const helixGroup = new THREE.Group();
    helixGroupRef.current = helixGroup;
    scene.add(helixGroup);

    const NODE_PAIRS = 64; // 128 total strand spheres
    const HELIX_HEIGHT = 14.0;
    const RADIUS = 2.1;
    const TURNS = 3.6;

    const sphereGeom = new THREE.SphereGeometry(0.14, 20, 20);

    // Violet Strand Material (PBR with clearcoat)
    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      emissive: 0x5b21b6,
      emissiveIntensity: 0.9,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const violetInstanced = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    // Cyan Strand Material (PBR with clearcoat)
    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      emissive: 0x0891b2,
      emissiveIntensity: 0.9,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
    });
    const cyanInstanced = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Hydrogen Bond Rungs
    const rungGeom = new THREE.CylinderGeometry(0.025, 0.025, RADIUS * 2, 10);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x27273a,
      roughness: 0.35,
      metalness: 0.85,
      transparent: true,
      opacity: 0.85,
    });
    const rungInstanced = new THREE.InstancedMesh(rungGeom, rungMat, NODE_PAIRS);

    const dummy = new THREE.Object3D();

    for (let i = 0; i < NODE_PAIRS; i++) {
      const t = i / (NODE_PAIRS - 1);
      const y = (t - 0.5) * HELIX_HEIGHT;
      const angle = t * Math.PI * 2 * TURNS;

      // Strand A (Violet)
      const xA = Math.cos(angle) * RADIUS;
      const zA = Math.sin(angle) * RADIUS;
      dummy.position.set(xA, y, zA);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      violetInstanced.setMatrixAt(i, dummy.matrix);

      // Strand B (Cyan)
      const xB = Math.cos(angle + Math.PI) * RADIUS;
      const zB = Math.sin(angle + Math.PI) * RADIUS;
      dummy.position.set(xB, y, zB);
      dummy.updateMatrix();
      cyanInstanced.setMatrixAt(i, dummy.matrix);

      // Connecting Rung
      dummy.position.set((xA + xB) / 2, y, (zA + zB) / 2);
      dummy.rotation.set(0, -angle, Math.PI / 2);
      dummy.updateMatrix();
      rungInstanced.setMatrixAt(i, dummy.matrix);
    }

    violetInstanced.instanceMatrix.needsUpdate = true;
    cyanInstanced.instanceMatrix.needsUpdate = true;
    rungInstanced.instanceMatrix.needsUpdate = true;

    helixGroup.add(violetInstanced);
    helixGroup.add(cyanInstanced);
    helixGroup.add(rungInstanced);

    // 4. Special Service Anchors (10 Enlarged Glowing Pulsing Spheres along the Helix)
    const anchorGroup = new THREE.Group();
    const anchorGeom = new THREE.SphereGeometry(0.26, 24, 24);
    const anchorGlowGeom = new THREE.SphereGeometry(0.42, 16, 16);

    const anchorMeshes: THREE.Mesh[] = [];
    const anchorGlowMeshes: THREE.Mesh[] = [];

    for (let s = 0; s < totalServices; s++) {
      const t = 0.1 + (s / (totalServices - 1)) * 0.8;
      const y = (t - 0.5) * HELIX_HEIGHT;
      const angle = t * Math.PI * 2 * TURNS + (s % 2 === 0 ? 0 : Math.PI);
      const x = Math.cos(angle) * (RADIUS + 0.1);
      const z = Math.sin(angle) * (RADIUS + 0.1);

      const isCyan = s % 2 === 1;
      const anchorMat = new THREE.MeshPhysicalMaterial({
        color: isCyan ? 0x22d3ee : 0xa855f7,
        emissive: isCyan ? 0x00f0ff : 0x7c3aed,
        emissiveIntensity: 1.8,
        metalness: 0.9,
        roughness: 0.1,
        clearcoat: 1.0,
      });

      const anchorMesh = new THREE.Mesh(anchorGeom, anchorMat);
      anchorMesh.position.set(x, y, z);
      anchorGroup.add(anchorMesh);
      anchorMeshes.push(anchorMesh);

      // Outer Holographic Aura Ring/Sphere
      const glowMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x22d3ee : 0xa855f7,
        transparent: true,
        opacity: 0.35,
        wireframe: true,
      });
      const glowMesh = new THREE.Mesh(anchorGlowGeom, glowMat);
      glowMesh.position.set(x, y, z);
      anchorGroup.add(glowMesh);
      anchorGlowMeshes.push(glowMesh);
    }

    helixGroup.add(anchorGroup);

    // 5. Ambient Quantum Particles surrounding the DNA
    const particleCount = 280;
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);
    const cV = new THREE.Color(0x8b5cf6);
    const cC = new THREE.Color(0x06b6d4);
    const cG = new THREE.Color(0xb8ff3d);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = RADIUS * (0.8 + Math.random() * 1.5);
      const y = (Math.random() - 0.5) * HELIX_HEIGHT * 1.1;

      pPos[i * 3] = Math.cos(angle) * r;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * r;

      const pick = Math.random();
      const col = pick < 0.4 ? cV : pick < 0.8 ? cC : cG;
      pCol[i * 3] = col.r;
      pCol[i * 3 + 1] = col.g;
      pCol[i * 3 + 2] = col.b;
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    helixGroup.add(particles);

    // Initial tilt for cinematic perspective
    helixGroup.rotation.z = -0.1;
    helixGroup.rotation.x = 0.08;

    // Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damp rotation to scroll target + subtle idle breathing
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.075;
      helixGroup.rotation.y = scrollRef.current.current + Math.sin(elapsed * 0.4) * 0.04;

      // Pulse the active service anchor sphere
      anchorGlowMeshes.forEach((mesh, idx) => {
        if (idx === highlightedIndex) {
          const pulse = 1.0 + Math.sin(elapsed * 5.0) * 0.25;
          mesh.scale.setScalar(pulse);
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.65;
        } else {
          mesh.scale.setScalar(0.7);
          (mesh.material as THREE.MeshBasicMaterial).opacity = 0.15;
        }
      });

      // Slowly rotate particle field
      particles.rotation.y = elapsed * 0.05;

      renderer.render(scene, camera);
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
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible, totalServices, highlightedIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[460px] flex items-center justify-center select-none ${className}`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-0 bg-radial from-violet-600/15 via-cyan-500/10 to-transparent pointer-events-none" />

      {/* Floating 3D Telemetry Badge */}
      <div className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#111116]/80 border border-[#202027] text-[10px] font-mono text-zinc-400 backdrop-blur-md z-10 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>THREE.JS // DUAL-HELIX KINETIC ORBIT // 128 NODES</span>
      </div>
    </div>
  );
}
