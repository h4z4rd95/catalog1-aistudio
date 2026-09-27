import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface DnaHelixProps {
  className?: string;
  scrollProgress?: number;
  highlightedIndex?: number;
}

export default function DnaHelix({
  className = '',
  scrollProgress = 0,
  highlightedIndex = 0,
}: DnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const helixGroupRef = useRef<THREE.Group | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const scrollRef = useRef({ current: 0, target: 0 });

  // Update target rotation from parent scroll or window scroll
  useEffect(() => {
    scrollRef.current.target = scrollProgress * Math.PI * 4;
  }, [scrollProgress]);

  // Lazy initialize via IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 580;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup (Violet & Cyan Atmospheric Glow)
    const ambientLight = new THREE.AmbientLight(0x0e131f, 1.2);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0x7c3aed, 4.5, 14);
    violetLight.position.set(-3, 2, 4);
    scene.add(violetLight);

    const cyanLight = new THREE.PointLight(0x22d3ee, 4.5, 14);
    cyanLight.position.set(3, -2, 4);
    scene.add(cyanLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 1.5);
    topLight.position.set(0, 8, 2);
    scene.add(topLight);

    // 3. Instanced Double Helix Geometry
    const helixGroup = new THREE.Group();
    helixGroupRef.current = helixGroup;
    scene.add(helixGroup);

    const NODE_PAIRS = 48; // 96 total strand spheres
    const HELIX_HEIGHT = 9.0;
    const RADIUS = 1.6;
    const TURNS = 3.2;

    const sphereGeom = new THREE.SphereGeometry(0.12, 16, 16);

    // Violet Strand Instanced Mesh
    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x7c3aed,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.25,
      clearcoat: 0.6,
    });
    const violetInstanced = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    // Cyan Strand Instanced Mesh
    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x0e7490,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.25,
      clearcoat: 0.6,
    });
    const cyanInstanced = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Connecting Rungs (Hydrogen bonds between the two strands)
    const rungGeom = new THREE.CylinderGeometry(0.02, 0.02, RADIUS * 2, 8);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x202027,
      roughness: 0.5,
      metalness: 0.8,
      transparent: true,
      opacity: 0.75,
    });
    const rungInstanced = new THREE.InstancedMesh(rungGeom, rungMat, NODE_PAIRS);

    const dummy = new THREE.Object3D();

    for (let i = 0; i < NODE_PAIRS; i++) {
      const t = i / (NODE_PAIRS - 1);
      const y = (t - 0.5) * HELIX_HEIGHT;
      const angle = t * Math.PI * 2 * TURNS;

      // Strand A: Violet (cos, sin)
      const xA = Math.cos(angle) * RADIUS;
      const zA = Math.sin(angle) * RADIUS;
      dummy.position.set(xA, y, zA);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      violetInstanced.setMatrixAt(i, dummy.matrix);

      // Strand B: Cyan (opposite phase: angle + PI)
      const xB = Math.cos(angle + Math.PI) * RADIUS;
      const zB = Math.sin(angle + Math.PI) * RADIUS;
      dummy.position.set(xB, y, zB);
      dummy.updateMatrix();
      cyanInstanced.setMatrixAt(i, dummy.matrix);

      // Connecting rung between A and B
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

    // Initial slight tilt
    helixGroup.rotation.z = -0.15;

    // Window scroll sync
    const handleScroll = () => {
      const scrollY = window.scrollY;
      scrollRef.current.target = scrollY * 0.0035;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Smooth damp rotation to scroll target + subtle natural idle breathing
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.08;
      helixGroup.rotation.y = scrollRef.current.current + Math.sin(clock.getElapsedTime() * 0.5) * 0.05;

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
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isVisible]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[420px] flex items-center justify-center select-none ${className}`}
    >
      {/* Background ambient radial bloom */}
      <div className="absolute inset-0 bg-radial from-violet-600/10 via-cyan-500/5 to-transparent pointer-events-none" />

      {/* Floating 3D Metadata Badge */}
      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-black/80 border border-white/10 text-[9px] font-mono text-zinc-400 backdrop-blur-md z-10 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>THREE.JS // INSTANCED DOUBLE HELIX // 96 NODES</span>
      </div>
    </div>
  );
}
