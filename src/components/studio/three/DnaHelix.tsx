import React, { useEffect, useRef } from 'react';
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

  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const activeIdxRef = useRef(highlightedIndex);
  activeIdxRef.current = highlightedIndex;

  // Target rotation mapped smoothly from scroll progress or highlighted index
  useEffect(() => {
    const target = scrollProgress > 0
      ? scrollProgress * Math.PI * 4
      : (highlightedIndex / (totalServices - 1 || 1)) * Math.PI * 4;
    targetRotationRef.current = target;
  }, [scrollProgress, highlightedIndex, totalServices]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || window.innerHeight || 600;
    let isMobile = width < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(isMobile ? 42 : 36, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 10.5 : 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.replaceChildren(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1222, 2.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 5.0, 24);
    cyanLight.position.set(5, 4, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 5.0, 24);
    violetLight.position.set(-5, -4, 5);
    scene.add(violetLight);

    // DNA Root Group
    // On desktop: offset to the left/right in 3D space
    // On mobile: centered in background depth so it acts as an atmospheric kinetic backbone
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    if (isMobile) {
      dnaGroup.position.set(0, 0.6, -1.8);
    } else {
      dnaGroup.position.set(-3.0, 0, -0.6);
    }
    dnaGroup.rotation.z = -0.06;

    // Geometric specs
    const NODE_PAIRS = 54;
    const HELIX_HEIGHT = isMobile ? 12.0 : 13.0;
    const RADIUS = isMobile ? 1.45 : 1.55;
    const TURNS = 2.6;

    // Elegant, refined sphere nodes
    const sphereRadius = 0.058;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 16, 16);

    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const violetMesh = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.9,
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 1.0,
    });
    const cyanMesh = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Hydrogen rungs
    const rungGeom = new THREE.CylinderGeometry(0.012, 0.012, RADIUS * 2, 8);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      emissive: 0x1e293b,
      emissiveIntensity: 0.5,
      metalness: 0.8,
      roughness: 0.3,
    });
    const rungMesh = new THREE.InstancedMesh(rungGeom, rungMat, NODE_PAIRS);

    const dummy = new THREE.Object3D();
    const strandAPoints: THREE.Vector3[] = [];
    const strandBPoints: THREE.Vector3[] = [];

    // Service anchor positions mapped along the helix
    const serviceAnchors: { pos: THREE.Vector3; isCyan: boolean }[] = [];

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
      violetMesh.setMatrixAt(i, dummy.matrix);
      strandAPoints.push(new THREE.Vector3(xA, y, zA));

      // Strand B (Cyan)
      const xB = Math.cos(angle + Math.PI) * RADIUS;
      const zB = Math.sin(angle + Math.PI) * RADIUS;
      dummy.position.set(xB, y, zB);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      cyanMesh.setMatrixAt(i, dummy.matrix);
      strandBPoints.push(new THREE.Vector3(xB, y, zB));

      // Rungs
      dummy.position.set((xA + xB) / 2, y, (zA + zB) / 2);
      dummy.rotation.set(0, -angle, Math.PI / 2);
      dummy.updateMatrix();
      rungMesh.setMatrixAt(i, dummy.matrix);

      // Distribute 10 service nodes evenly along the helix
      const step = Math.floor(NODE_PAIRS / totalServices);
      if (i % step === 0 && serviceAnchors.length < totalServices) {
        const isCyan = serviceAnchors.length % 2 === 1;
        serviceAnchors.push({
          pos: isCyan ? new THREE.Vector3(xB, y, zB) : new THREE.Vector3(xA, y, zA),
          isCyan,
        });
      }
    }

    violetMesh.instanceMatrix.needsUpdate = true;
    cyanMesh.instanceMatrix.needsUpdate = true;
    rungMesh.instanceMatrix.needsUpdate = true;

    dnaGroup.add(violetMesh);
    dnaGroup.add(cyanMesh);
    dnaGroup.add(rungMesh);

    // Continuous glowing double-helix spline lines
    const curveA = new THREE.CatmullRomCurve3(strandAPoints);
    const curveB = new THREE.CatmullRomCurve3(strandBPoints);

    const lineAGeom = new THREE.BufferGeometry().setFromPoints(curveA.getPoints(180));
    const lineBGeom = new THREE.BufferGeometry().setFromPoints(curveB.getPoints(180));

    const lineAMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.85 });
    const lineBMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.85 });

    dnaGroup.add(new THREE.Line(lineAGeom, lineAMat));
    dnaGroup.add(new THREE.Line(lineBGeom, lineBMat));

    // Active Node Holographic Reticle (Pulsing ring indicator on the active node)
    const activeRingGeom = new THREE.RingGeometry(0.12, 0.18, 24);
    const activeRingMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const activeRing = new THREE.Mesh(activeRingGeom, activeRingMat);
    dnaGroup.add(activeRing);

    // Subtle background quantum particles
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 12;
      pPos[p * 3 + 1] = (Math.random() - 0.5) * 12;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(pGeom, pMat));

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damping to rotation target
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.08;
      // Idle spin + rotation
      dnaGroup.rotation.y = currentRotationRef.current + elapsed * 0.12;

      // Update active node reticle
      const idx = Math.min(serviceAnchors.length - 1, Math.max(0, activeIdxRef.current));
      const currentAnchor = serviceAnchors[idx];

      if (currentAnchor) {
        activeRing.position.copy(currentAnchor.pos);
        activeRing.scale.setScalar(1.0 + Math.sin(elapsed * 4) * 0.2);
        activeRing.lookAt(camera.position);
        activeRingMat.color.setHex(currentAnchor.isCyan ? 0x22d3ee : 0xa855f7);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      isMobile = width < 768;

      camera.aspect = width / height;
      camera.fov = isMobile ? 42 : 36;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (isMobile) {
        dnaGroup.position.set(0, 0.6, -1.8);
      } else {
        dnaGroup.position.set(-3.0, 0, -0.6);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [totalServices]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none ${className}`}
    />
  );
}
