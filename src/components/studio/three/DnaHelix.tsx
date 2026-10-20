import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface DnaHelixProps {
  className?: string;
  scrollProgress: number;
  scrollOffset?: number;
  activeServiceIndex: number;
  totalServices: number;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * computeZIndexDepthMap:
 * Dynamically shifts a 3D sphere's Z coordinate and scale based on its proximity
 * to the active view center (where the active service card is docked).
 *
 * As the user scrolls:
 * - Spheres that intersect the card's readable body are dynamically shifted BEHIND the card (zShift < 0),
 *   causing them to physically plunge and weave behind the service card.
 * - Spheres along the outer flank or top/bottom curves rise forward in front of the card (zShift > 0),
 *   creating an authentic 3D spatial ribbon weave.
 */
function computeZIndexDepthMap(
  baseWorldPos: THREE.Vector3,
  cardCenter: THREE.Vector3,
  cardWidth3D: number,
  cardHeight3D: number,
  cardDepthZ: number
): { zShift: number; scale: number; isBehind: boolean } {
  const dx = Math.abs(baseWorldPos.x - cardCenter.x);
  const dy = Math.abs(baseWorldPos.y - cardCenter.y);
  const halfW = (cardWidth3D / 2) * 1.08;
  const halfH = (cardHeight3D / 2) * 1.08;

  // Proximity to active view center (1.0 at center, falling smoothly to 0.0 outside influence radius)
  const normX = Math.min(1.0, dx / (halfW * 1.5));
  const normY = Math.min(1.0, dy / (halfH * 1.5));
  const distNorm = Math.hypot(normX, normY);
  const proximity = Math.max(0, 1.0 - distNorm / 1.35);
  const smoothProximity = proximity * proximity * (3 - 2 * proximity); // Smooth cubic hermite curve

  // Is the sphere physically overlapping the card's 2D footprint?
  const isOverCard = dx < halfW && dy < halfH;
  const isNaturallyBehind = baseWorldPos.z < cardDepthZ;

  let zShift = 0;
  let scale = 1.0;

  if (smoothProximity > 0.001) {
    if (isOverCard) {
      if (isNaturallyBehind) {
        // Deepen the backward weave so it travels cleanly behind the card
        zShift = -1.4 * smoothProximity;
        scale = 0.88;
      } else {
        // Sphere would pass in front of card text: dynamically shift it BEHIND the card plane!
        zShift = -1.25 * smoothProximity;
        const centerDist = Math.hypot(dx / halfW, dy / halfH);
        scale = 0.55 + 0.35 * Math.min(1.0, centerDist);
      }
    } else {
      // Along the card's perimeter / outer flanks:
      // Creates an authentic interwoven ribbon where some points rise forward in front
      // and others plunge behind
      const strandPhase = Math.sin(baseWorldPos.y * 1.6 + (baseWorldPos.z > 0 ? Math.PI : 0));
      if (strandPhase > 0) {
        // Weaves in front of the card plane on the outer flank
        zShift = 0.85 * smoothProximity;
        scale = 1.0 + 0.15 * smoothProximity;
      } else {
        // Weaves behind the card plane
        zShift = -0.95 * smoothProximity;
        scale = 0.85;
      }
    }
  }

  const finalZ = baseWorldPos.z + zShift;
  const isBehind = finalZ < cardDepthZ;

  return { zShift, scale, isBehind };
}

export default function DnaHelix({
  className = '',
  scrollProgress = 0,
  scrollOffset = 0,
  activeServiceIndex = 0,
  totalServices = 10,
  cardRef,
}: DnaHelixProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const scrollProgressRef = useRef(scrollProgress);
  scrollProgressRef.current = scrollProgress;

  const scrollOffsetRef = useRef(scrollOffset);
  scrollOffsetRef.current = scrollOffset;

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

    if (isMobile) {
      dnaGroup.position.set(0, 0, 0);
    } else {
      dnaGroup.position.set(-1.4, 0, 0);
    }
    dnaGroup.rotation.z = -0.05;

    // Geometric specs
    const NODE_PAIRS = 64;
    const HELIX_HEIGHT = 15.0;
    const RADIUS = isMobile ? 1.7 : 2.1;
    const TURNS = 3.0;

    // Base sphere geometry
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

    const lineMeshA = new THREE.Line(lineAGeom, lineAMat);
    const lineMeshB = new THREE.Line(lineBGeom, lineBMat);
    dnaGroup.add(lineMeshA);
    dnaGroup.add(lineMeshB);

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

    // 4. Genuine 3D Spatial Depth Mask (Invisible Occlusion Plane at Card Depth)
    const CARD_DEPTH_Z = 0.45; // Physical card depth plane
    const cardOcclusionGeom = new THREE.PlaneGeometry(3.5, 4.2);
    const cardOcclusionMat = new THREE.MeshBasicMaterial({
      colorWrite: false,
      depthWrite: true,
    });
    const cardOcclusionMesh = new THREE.Mesh(cardOcclusionGeom, cardOcclusionMat);
    scene.add(cardOcclusionMesh);

    // 5. Genuine 3D Connecting Bridge Spline
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
    const cardCenterWorld = new THREE.Vector3();
    const tempSphereWorldA = new THREE.Vector3();
    const tempSphereWorldB = new THREE.Vector3();
    const shiftedLocalPosA = new THREE.Vector3();
    const shiftedLocalPosB = new THREE.Vector3();

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
      dnaGroup.updateMatrixWorld(true);

      // Get Card's live screen position and align 3D Occlusion Plane & Docking Anchor
      const cardEl = cardRef.current;
      let cardWorldX = 0;
      let cardWorldY = 0;
      let cardWidth3D = 3.5;
      let cardHeight3D = 4.2;

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

        cardWorldX = ndcX * (vWidthAtCard / 2);
        cardWorldY = ndcY * (vHeightAtCard / 2);

        cardWidth3D = (cardRect.width / contRect.width) * vWidthAtCard;
        cardHeight3D = (cardRect.height / contRect.height) * vHeightAtCard;

        cardCenterWorld.set(cardWorldX, cardWorldY, CARD_DEPTH_Z);

        // Position occlusion mesh exactly over the card in 3D
        cardOcclusionMesh.position.set(cardWorldX, cardWorldY, CARD_DEPTH_Z);
        cardOcclusionMesh.scale.set(cardWidth3D / 3.5, cardHeight3D / 4.2, 1);

        // Position card docking point
        const dockOffsetX = isMobile ? 0 : -cardWidth3D * 0.48;
        const dockOffsetY = isMobile ? cardHeight3D * 0.48 : cardHeight3D * 0.25;
        cardDockWorld.set(cardWorldX + dockOffsetX, cardWorldY + dockOffsetY, CARD_DEPTH_Z + 0.05);

        dockSphere.position.copy(cardDockWorld);
      }

      // 7. Dynamic Z-Index Map Calculation for 3D Spheres
      // Dynamically shifts each sphere's Z coordinate based on proximity to the active view center (cardCenterWorld)
      // causing spheres to physically move behind or in front of the service cards during scroll events.
      for (let i = 0; i < NODE_PAIRS; i++) {
        // --- Strand A (Violet) ---
        const ptA = strandAPoints[i];
        tempSphereWorldA.copy(ptA).applyMatrix4(dnaGroup.matrixWorld);

        const zMapA = computeZIndexDepthMap(
          tempSphereWorldA,
          cardCenterWorld,
          cardWidth3D,
          cardHeight3D,
          CARD_DEPTH_Z
        );

        // Apply dynamic Z-shift to world position
        tempSphereWorldA.z += zMapA.zShift;

        // Convert shifted world position back into dnaGroup local coordinate space
        shiftedLocalPosA.copy(dnaGroup.worldToLocal(tempSphereWorldA));

        dummy.position.copy(shiftedLocalPosA);
        dummy.scale.setScalar(zMapA.scale);
        dummy.updateMatrix();
        violetMesh.setMatrixAt(i, dummy.matrix);

        // --- Strand B (Cyan) ---
        const ptB = strandBPoints[i];
        tempSphereWorldB.copy(ptB).applyMatrix4(dnaGroup.matrixWorld);

        const zMapB = computeZIndexDepthMap(
          tempSphereWorldB,
          cardCenterWorld,
          cardWidth3D,
          cardHeight3D,
          CARD_DEPTH_Z
        );

        tempSphereWorldB.z += zMapB.zShift;
        shiftedLocalPosB.copy(dnaGroup.worldToLocal(tempSphereWorldB));

        dummy.position.copy(shiftedLocalPosB);
        dummy.scale.setScalar(zMapB.scale);
        dummy.updateMatrix();
        cyanMesh.setMatrixAt(i, dummy.matrix);
      }

      violetMesh.instanceMatrix.needsUpdate = true;
      cyanMesh.instanceMatrix.needsUpdate = true;

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

        // Update Genuine 3D Curved Bridge Spline between DNA Node and Card Dock
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
