import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DnaHelixProps {
  className?: string;
  scrollProgress: number;
  activeServiceIndex: number;
  totalServices: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export default function DnaHelix({
  className = '',
  scrollProgress = 0,
  activeServiceIndex = 0,
  totalServices = 10,
  cardRef,
}: DnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // References to track animated values without triggering react re-renders
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

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.replaceChildren(renderer.domElement);

    // 2. Studio Lighting
    const ambientLight = new THREE.AmbientLight(0x0e1322, 2.8);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 6.0, 30);
    cyanLight.position.set(6, 4, 6);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0xa855f7, 6.0, 30);
    violetLight.position.set(-6, -4, 6);
    scene.add(violetLight);

    const frontLight = new THREE.DirectionalLight(0xffffff, 1.2);
    frontLight.position.set(0, 5, 8);
    scene.add(frontLight);

    // 3. DNA Assembly Group (Rotates and translates with scroll in true 3D space)
    const dnaGroup = new THREE.Group();
    scene.add(dnaGroup);

    // Position DNA in 3D: On desktop, offset slightly to the left/right; on mobile centered
    if (isMobile) {
      dnaGroup.position.set(0, 0, 0);
    } else {
      dnaGroup.position.set(-1.4, 0, 0);
    }
    dnaGroup.rotation.z = -0.05;

    // Geometric specs: Small, subtle nodes so DNA doesn't overpower the cards
    const NODE_PAIRS = 64;
    const HELIX_HEIGHT = 15.0;
    const RADIUS = isMobile ? 1.7 : 2.1; // Extends both behind (z < 0) and in front (z > 0)
    const TURNS = 3.0;

    // Subtler, smaller spheres (Prompt: "The circles/spheres should be smaller and more subtle")
    const sphereRadius = isMobile ? 0.036 : 0.042;
    const sphereGeom = new THREE.SphereGeometry(sphereRadius, 16, 16);

    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.95,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 1.0,
    });
    const violetMesh = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.95,
      metalness: 0.85,
      roughness: 0.25,
      clearcoat: 1.0,
    });
    const cyanMesh = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Hydrogen connecting rungs
    const rungGeom = new THREE.CylinderGeometry(0.009, 0.009, RADIUS * 2, 8);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x0f172a,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.3,
    });
    const rungMesh = new THREE.InstancedMesh(rungGeom, rungMat, NODE_PAIRS);

    const dummy = new THREE.Object3D();
    const strandAPoints: THREE.Vector3[] = [];
    const strandBPoints: THREE.Vector3[] = [];

    // Service anchor indices along the 64 pairs
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

    const lineAGeom = new THREE.BufferGeometry().setFromPoints(curveA.getPoints(200));
    const lineBGeom = new THREE.BufferGeometry().setFromPoints(curveB.getPoints(200));

    const lineAMat = new THREE.LineBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.75 });
    const lineBMat = new THREE.LineBasicMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.75 });

    dnaGroup.add(new THREE.Line(lineAGeom, lineAMat));
    dnaGroup.add(new THREE.Line(lineBGeom, lineBMat));

    // Active Node Holographic Reticle (Pulsing ring at active DNA node)
    const activeRingGeom = new THREE.RingGeometry(0.09, 0.14, 24);
    const activeRingMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
    });
    const activeRing = new THREE.Mesh(activeRingGeom, activeRingMat);
    dnaGroup.add(activeRing);

    // 4. Genuine 3D Spatial Depth Mask (Invisible Occlusion Plane)
    // This plane matches the card's exact 3D position and size.
    // It writes to WebGL depth buffer with colorWrite=false, so any DNA strands/nodes
    // with Z < cardZ naturally pass BEHIND the card, while strands with Z > cardZ pass IN FRONT!
    const CARD_DEPTH_Z = 0.45; // Physical card depth plane
    const cardOcclusionGeom = new THREE.PlaneGeometry(3.5, 4.2);
    const cardOcclusionMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
    });
    const cardOcclusionMesh = new THREE.Mesh(cardOcclusionGeom, cardOcclusionMat);
    scene.add(cardOcclusionMesh);

    // 5. Genuine 3D Connecting Bridge Spline (Prompt: "Connecting lines shouldn't just be drawn on the screen surface; they must genuinely exist in 3D space, bridging the DNA points and the boxes.")
    const BRIDGE_POINTS = 32;
    const bridgeCurvePoints: THREE.Vector3[] = [];
    for (let b = 0; b < BRIDGE_POINTS; b++) {
      bridgeCurvePoints.push(new THREE.Vector3());
    }
    const bridgeGeom = new THREE.BufferGeometry().setFromPoints(bridgeCurvePoints);
    const bridgeMat = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.85,
      linewidth: 2,
    });
    const bridgeLine = new THREE.Line(bridgeGeom, bridgeMat);
    scene.add(bridgeLine);

    // Energy Photons along the 3D bridge
    const photonGeom = new THREE.SphereGeometry(0.038, 12, 12);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xa5f3fc });
    const photonMesh = new THREE.Mesh(photonGeom, photonMat);
    scene.add(photonMesh);

    // Cybernetic Bracket Dock Sphere at the card's 3D anchor
    const dockSphereGeom = new THREE.SphereGeometry(0.07, 16, 16);
    const dockSphereMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      emissiveIntensity: 0.8,
      metalness: 0.9,
      roughness: 0.2,
    });
    const dockSphere = new THREE.Mesh(dockSphereGeom, dockSphereMat);
    scene.add(dockSphere);

    // Subtle background quantum floating dust
    const pCount = 80;
    const pPos = new Float32Array(pCount * 3);
    for (let p = 0; p < pCount; p++) {
      pPos[p * 3] = (Math.random() - 0.5) * 12;
      pPos[p * 3 + 1] = (Math.random() - 0.5) * 14;
      pPos[p * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.028,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(pGeom, pMat));

    // 6. Realtime Alignment & Animation Loop
    const clock = new THREE.Clock();
    let currentY = 0;
    let currentRotY = 0;

    const activeNodeWorld = new THREE.Vector3();
    const cardDockWorld = new THREE.Vector3();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      const progress = scrollProgressRef.current;
      const targetY = (progress - 0.5) * -4.5;
      const targetRotY = progress * Math.PI * 5 + elapsed * 0.12;

      // Smooth lerp
      currentY += (targetY - currentY) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      dnaGroup.position.y = currentY;
      dnaGroup.rotation.y = currentRotY;

      // Get Card's live screen position and align 3D Occlusion Plane & Docking Anchor
      const cardEl = cardRef.current;
      if (cardEl && container) {
        const cardRect = cardEl.getBoundingClientRect();
        const contRect = container.getBoundingClientRect();

        const cardCenterX = cardRect.left + cardRect.width / 2 - contRect.left;
        const cardCenterY = cardRect.top + cardRect.height / 2 - contRect.top;

        // Convert to Normalized Device Coordinates (NDC)
        const ndcX = (cardCenterX / contRect.width) * 2 - 1;
        const ndcY = -(cardCenterY / contRect.height) * 2 + 1;

        // Compute 3D world coordinates at CARD_DEPTH_Z
        const distToCard = camera.position.z - CARD_DEPTH_Z;
        const vHeightAtCard = 2 * Math.tan((camera.fov * Math.PI) / 360) * distToCard;
        const vWidthAtCard = vHeightAtCard * camera.aspect;

        const cardWorldX = ndcX * (vWidthAtCard / 2);
        const cardWorldY = ndcY * (vHeightAtCard / 2);

        const cardWidth3D = (cardRect.width / contRect.width) * vWidthAtCard;
        const cardHeight3D = (cardRect.height / contRect.height) * vHeightAtCard;

        // Position occlusion mesh exactly over the card in 3D
        cardOcclusionMesh.position.set(cardWorldX, cardWorldY, CARD_DEPTH_Z);
        cardOcclusionMesh.scale.set(cardWidth3D / 3.5, cardHeight3D / 4.2, 1);

        // Position card docking point: on the side/corner nearest to DNA
        // In RTL, DNA is to the left of the card
        const dockOffsetX = isMobile ? 0 : -cardWidth3D * 0.48;
        const dockOffsetY = isMobile ? cardHeight3D * 0.48 : cardHeight3D * 0.25;
        cardDockWorld.set(cardWorldX + dockOffsetX, cardWorldY + dockOffsetY, CARD_DEPTH_Z + 0.05);

        dockSphere.position.copy(cardDockWorld);
      }

      // Find active service anchor
      const activeIdx = activeIndexRef.current;
      const currentAnchor = serviceAnchors[activeIdx] || serviceAnchors[0];

      if (currentAnchor) {
        // Compute world position of the active DNA node
        activeNodeWorld.copy(currentAnchor.localPos);
        activeNodeWorld.applyMatrix4(dnaGroup.matrixWorld);

        // Position active glowing reticle
        activeRing.position.copy(currentAnchor.localPos);
        activeRing.scale.setScalar(1.0 + Math.sin(elapsed * 4.5) * 0.2);
        activeRing.lookAt(camera.position);

        const isCyan = currentAnchor.strand === 'B';
        const activeColor = isCyan ? 0x22d3ee : 0xa855f7;
        activeRingMat.color.setHex(activeColor);
        bridgeMat.color.setHex(activeColor);
        dockSphereMat.color.setHex(activeColor);
        dockSphereMat.emissive.setHex(isCyan ? 0x0891b2 : 0x7e22ce);

        // Update Genuine 3D Curved Bridge Spline between DNA Node and Card Dock!
        // Prompt: "as a box enters the viewport, the DNA lines curve toward or connect to it, and the box itself is positioned at that specific depth."
        const midPoint = new THREE.Vector3(
          (activeNodeWorld.x + cardDockWorld.x) / 2,
          (activeNodeWorld.y + cardDockWorld.y) / 2 + (isMobile ? 0.3 : 0.4),
          Math.max(activeNodeWorld.z, cardDockWorld.z) + 0.35
        );

        const bridgeSpline = new THREE.CatmullRomCurve3([
          activeNodeWorld,
          midPoint,
          cardDockWorld,
        ]);

        const samplePoints = bridgeSpline.getPoints(BRIDGE_POINTS - 1);
        bridgeGeom.setFromPoints(samplePoints);
        bridgeGeom.attributes.position.needsUpdate = true;

        // Animate photon moving along the 3D bridge
        const progressT = (elapsed * 1.4) % 1;
        const photonPos = bridgeSpline.getPoint(progressT);
        photonMesh.position.copy(photonPos);
        photonMat.color.setHex(isCyan ? 0x67e8f9 : 0xe9d5ff);
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
      camera.fov = 38;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      if (isMobile) {
        dnaGroup.position.set(0, 0, 0);
      } else {
        dnaGroup.position.set(-1.4, 0, 0);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container) container.innerHTML = '';
    };
  }, [totalServices, cardRef]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 ${className}`}
    />
  );
}
