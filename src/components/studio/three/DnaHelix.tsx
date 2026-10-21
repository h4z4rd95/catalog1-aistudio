import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DnaHelixProps {
  className?: string;
  scrollProgress: number;
  scrollOffset?: number;
  activeServiceIndex: number;
  totalServices: number;
  cardRef?: React.RefObject<HTMLDivElement | null>;
}

export default function DnaHelix({
  className = '',
  scrollProgress = 0,
  activeServiceIndex = 0,
  totalServices = 10,
}: DnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const activeIndexRef = useRef(activeServiceIndex);
  activeIndexRef.current = activeServiceIndex;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || window.innerHeight || 600;
    let isMobile = width < 768;

    // 1. Scene & Camera Setup (Spacious, pulled back camera for grand view)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    // Camera placed sufficiently back so the entire upright double-helix is majestic
    camera.position.set(0, 0, isMobile ? 16.5 : 18.0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.replaceChildren(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1322, 3.4);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 9.0, 40);
    cyanLight.position.set(6, 6, 8);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 9.0, 40);
    violetLight.position.set(-6, -6, 8);
    scene.add(violetLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(0, 8, 12);
    scene.add(keyLight);

    // 3. DNA Assembly Group: Upright, straight, mathematically pristine double-helix
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // In RTL layout, cards are on the right, so DNA is on the left
    if (isMobile) {
      dnaGroup.position.set(0, 0, -2.5);
    } else {
      dnaGroup.position.set(-2.4, 0, 0);
    }
    dnaGroup.rotation.z = 0; // Perfectly upright, strictly vertical (no crooked tilt)

    // Geometric specs (Thicker, more substantial DNA molecular strands and rungs)
    const NODE_PAIRS = 72;
    const HELIX_HEIGHT = 18.0;
    const RADIUS = isMobile ? 1.9 : 2.5;
    const TURNS = 3.2;

    // Thicker molecular sphere geometry
    const sphereRadius = isMobile ? 0.095 : 0.13;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 20, 20);

    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 1.1,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
    });
    const violetMesh = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.1,
      metalness: 0.85,
      roughness: 0.22,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
    });
    const cyanMesh = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Thicker, solid metallic connecting rungs (Hydrogen bonds)
    const rungRadius = isMobile ? 0.026 : 0.038;
    const rungGeom = new THREE.CylinderGeometry(rungRadius, rungRadius, RADIUS * 2, 12);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x3b4252,
      emissive: 0x1e293b,
      emissiveIntensity: 0.7,
      metalness: 0.88,
      roughness: 0.25,
    });
    const rungMesh = new THREE.InstancedMesh(rungGeom, rungMat, NODE_PAIRS);

    const dummy = new THREE.Object3D();
    const strandAPoints: THREE.Vector3[] = [];
    const strandBPoints: THREE.Vector3[] = [];

    // Service anchor indices along the 72 pairs (one anchor for each service)
    const serviceAnchors: {
      index: number;
      strand: 'A' | 'B';
      localPos: THREE.Vector3;
    }[] = [];

    const step = Math.floor(NODE_PAIRS / totalServices);
    for (let s = 0; s < totalServices; s++) {
      const idx = Math.min(NODE_PAIRS - 1, s * step + Math.floor(step / 2));
      serviceAnchors.push({
        index: idx,
        strand: s % 2 === 0 ? 'A' : 'B',
        localPos: new THREE.Vector3(),
      });
    }

    // Build the mathematically pristine double-helix geometry
    for (let i = 0; i < NODE_PAIRS; i++) {
      const t = i / (NODE_PAIRS - 1);
      const y = (t - 0.5) * HELIX_HEIGHT;
      const angle = t * Math.PI * 2 * TURNS;

      // Strand A (Violet)
      const xA = Math.cos(angle) * RADIUS;
      const zA = Math.sin(angle) * RADIUS;
      dummy.position.set(xA, y, zA);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      violetMesh.setMatrixAt(i, dummy.matrix);
      strandAPoints.push(new THREE.Vector3(xA, y, zA));

      // Strand B (Cyan)
      const xB = Math.cos(angle + Math.PI) * RADIUS;
      const zB = Math.sin(angle + Math.PI) * RADIUS;
      dummy.position.set(xB, y, zB);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      cyanMesh.setMatrixAt(i, dummy.matrix);
      strandBPoints.push(new THREE.Vector3(xB, y, zB));

      // Connecting Rung between Strand A and Strand B
      dummy.position.set((xA + xB) / 2, y, (zA + zB) / 2);
      dummy.rotation.set(0, -angle, Math.PI / 2);
      dummy.scale.setScalar(1);
      dummy.updateMatrix();
      rungMesh.setMatrixAt(i, dummy.matrix);

      // Save local positions for service anchors
      for (const sa of serviceAnchors) {
        if (sa.index === i) {
          sa.localPos.copy(sa.strand === 'A' ? new THREE.Vector3(xA, y, zA) : new THREE.Vector3(xB, y, zB));
        }
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

    const lineAGeom = new THREE.BufferGeometry().setFromPoints(curveA.getPoints(240));
    const lineBGeom = new THREE.BufferGeometry().setFromPoints(curveB.getPoints(240));

    const lineAMat = new THREE.LineBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.85,
    });
    const lineBMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.85,
    });

    const lineMeshA = new THREE.Line(lineAGeom, lineAMat);
    const lineMeshB = new THREE.Line(lineBGeom, lineBMat);
    dnaGroup.add(lineMeshA);
    dnaGroup.add(lineMeshB);

    // Active Node Holographic Beacon (Pulsing ring at active DNA node)
    const activeRingGeom = new THREE.RingGeometry(0.12, 0.20, 32);
    const activeRingMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.95,
    });
    const activeRing = new THREE.Mesh(activeRingGeom, activeRingMat);
    dnaGroup.add(activeRing);

    // Secondary concentric ping ring
    const pingRingGeom = new THREE.RingGeometry(0.24, 0.28, 32);
    const pingRingMat = new THREE.MeshBasicMaterial({
      color: 0x67e8f9,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const pingRing = new THREE.Mesh(pingRingGeom, pingRingMat);
    dnaGroup.add(pingRing);

    // Ambient subtle floating molecular particles
    const pCount = 90;
    const pPos = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 12;
      pPos[p * 3 + 1] = (Math.random() - 0.5) * 16;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.032,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(pGeom, pMat));

    // 4. Smooth Animation Loop
    const clock = new THREE.Clock();
    let currentY = 0;
    let currentRotY = 0;

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const progress = scrollProgressRef.current;
      // Synchronized vertical glide: as user scrolls down, DNA glides up bringing subsequent nodes into view
      const targetY = (progress - 0.5) * -4.8;
      // Continuous rotation synced with scroll and subtle ambient drift
      const targetRotY = progress * Math.PI * 4.5 + elapsed * 0.15;

      // Smooth interpolation
      currentY += (targetY - currentY) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      dnaGroup.position.y = currentY;
      dnaGroup.rotation.y = currentRotY;

      // Position active holographic rings over the active service anchor
      const activeIdx = activeIndexRef.current;
      const currentAnchor = serviceAnchors[activeIdx] || serviceAnchors[0];

      if (currentAnchor) {
        activeRing.position.copy(currentAnchor.localPos);
        pingRing.position.copy(currentAnchor.localPos);

        const pulseScale = 1.0 + Math.sin(elapsed * 4.5) * 0.18;
        activeRing.scale.setScalar(pulseScale);

        const pingScale = 1.0 + ((elapsed * 2.0) % 1.0) * 0.8;
        pingRing.scale.setScalar(pingScale);
        pingRingMat.opacity = Math.max(0, 0.7 * (1.0 - ((elapsed * 2.0) % 1.0)));

        activeRing.lookAt(camera.position);
        pingRing.lookAt(camera.position);

        const isCyan = currentAnchor.strand === 'B';
        const activeColor = isCyan ? 0x22d3ee : 0xa855f7;
        activeRingMat.color.setHex(activeColor);
        pingRingMat.color.setHex(activeColor);
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
      camera.fov = 40;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (isMobile) {
        dnaGroup.position.set(0, 0, -2.5);
      } else {
        dnaGroup.position.set(-2.4, 0, 0);
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
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 ${className}`}
    />
  );
}
