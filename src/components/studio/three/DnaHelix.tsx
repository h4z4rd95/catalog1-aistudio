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
  const [isVisible, setIsVisible] = useState(false);

  const scrollRef = useRef({ current: 0, target: 0 });
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update target rotation from parent scroll progress
  useEffect(() => {
    // Total rotation proportional to all services passing by (authentic 3D turn)
    scrollRef.current.target = scrollProgress * Math.PI * 5.8;
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

  // Track mouse for subtle spatial perspective parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 0.35;
      mouseRef.current.targetY = (e.clientY / innerHeight - 0.5) * 0.25;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 750;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0, 11.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Sophisticated Studio Lighting: Soft ambient + Dual neon rims + Top key
    const ambientLight = new THREE.AmbientLight(0x0a0c16, 1.8);
    scene.add(ambientLight);

    const violetRim = new THREE.PointLight(0x8b5cf6, 4.5, 22);
    violetRim.position.set(-6, 4, 3);
    scene.add(violetRim);

    const cyanRim = new THREE.PointLight(0x06b6d4, 4.5, 22);
    cyanRim.position.set(6, -4, 3);
    scene.add(cyanRim);

    const depthBacklight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    depthBacklight.position.set(0, 6, -6);
    scene.add(depthBacklight);

    // 3. DNA Helix Root Group
    const helixRoot = new THREE.Group();
    scene.add(helixRoot);

    // Initial cinematic angles
    helixRoot.rotation.z = -0.06;
    helixRoot.rotation.x = 0.08;

    // Subtle, Micro-Scale Double Helix Specifications
    // Small, subtle spheres so the DNA does NOT dominate the scene
    const NODE_PAIRS = 76;
    const HELIX_HEIGHT = 15.0;
    const RADIUS = 1.65;
    const TURNS = 3.4;

    const sphereGeom = new THREE.SphereGeometry(0.048, 16, 16);

    // Subtle Translucent Violet Strand Material
    const violetMat = new THREE.MeshPhysicalMaterial({
      color: 0x818cf8,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.45,
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.72,
    });
    const violetInstanced = new THREE.InstancedMesh(sphereGeom, violetMat, NODE_PAIRS);

    // Subtle Translucent Cyan Strand Material
    const cyanMat = new THREE.MeshPhysicalMaterial({
      color: 0x22d3ee,
      emissive: 0x0891b2,
      emissiveIntensity: 0.45,
      metalness: 0.8,
      roughness: 0.25,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.72,
    });
    const cyanInstanced = new THREE.InstancedMesh(sphereGeom, cyanMat, NODE_PAIRS);

    // Delicate Hydrogen Rungs
    const rungGeom = new THREE.CylinderGeometry(0.009, 0.009, RADIUS * 2, 8);
    const rungMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.4,
      metalness: 0.8,
      transparent: true,
      opacity: 0.45,
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
      dummy.scale.setScalar(1);
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

    helixRoot.add(violetInstanced);
    helixRoot.add(cyanInstanced);
    helixRoot.add(rungInstanced);

    // 4. GENUINE 3D CONNECTING LINES & DOCKING NODES BRIDGING DNA TO SERVICE BOXES
    // Each service has an authentic 3D spline curve bridging the DNA backbone to the box docking port!
    const cableGroup = new THREE.Group();
    helixRoot.add(cableGroup);

    interface ServiceCable {
      line: THREE.Line;
      geom: THREE.BufferGeometry;
      pulses: THREE.Mesh[];
      dockReticle: THREE.Group;
      anchorSphere: THREE.Mesh;
      isCyan: boolean;
      side: number;
      tService: number;
    }

    const serviceCables: ServiceCable[] = [];
    const anchorGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const pulseGeom = new THREE.SphereGeometry(0.038, 12, 12);
    const ringGeom = new THREE.RingGeometry(0.12, 0.16, 24);

    for (let s = 0; s < totalServices; s++) {
      const t = 0.08 + (s / (totalServices - 1)) * 0.84;
      const isCyan = s % 2 === 1;
      const side = isCyan ? 1 : -1; // Alternating sides of the double helix
      const baseAngle = t * Math.PI * 2 * TURNS + (isCyan ? Math.PI : 0);

      // 3D Anchor node on the DNA strand
      const anchorMat = new THREE.MeshPhysicalMaterial({
        color: isCyan ? 0x22d3ee : 0xa855f7,
        emissive: isCyan ? 0x06b6d4 : 0x7c3aed,
        emissiveIntensity: 0.9,
        metalness: 0.8,
        roughness: 0.2,
      });
      const anchorSphere = new THREE.Mesh(anchorGeom, anchorMat);
      cableGroup.add(anchorSphere);

      // Dynamic 3D Curve Geometry (24 sampled points along the 3D spline)
      const curvePointsCount = 24;
      const posArray = new Float32Array(curvePointsCount * 3);
      const colArray = new Float32Array(curvePointsCount * 3);

      const colorRoot = new THREE.Color(isCyan ? 0x06b6d4 : 0x7c3aed);
      const colorTip = new THREE.Color(isCyan ? 0x22d3ee : 0xc084fc);

      for (let p = 0; p < curvePointsCount; p++) {
        const factor = p / (curvePointsCount - 1);
        const col = colorRoot.clone().lerp(colorTip, factor);
        colArray[p * 3] = col.r;
        colArray[p * 3 + 1] = col.g;
        colArray[p * 3 + 2] = col.b;
      }

      const cableGeom = new THREE.BufferGeometry();
      cableGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      cableGeom.setAttribute('color', new THREE.BufferAttribute(colArray, 3));

      const cableMat = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.55,
        linewidth: 1.5,
      });
      const cableLine = new THREE.Line(cableGeom, cableMat);
      cableGroup.add(cableLine);

      // Energy pulses traveling along the 3D curve
      const pulses: THREE.Mesh[] = [];
      for (let k = 0; k < 2; k++) {
        const pulseMat = new THREE.MeshBasicMaterial({
          color: isCyan ? 0x67e8f9 : 0xd8b4fe,
          transparent: true,
          opacity: 0.85,
        });
        const pulseMesh = new THREE.Mesh(pulseGeom, pulseMat);
        cableGroup.add(pulseMesh);
        pulses.push(pulseMesh);
      }

      // 3D Docking Reticle at the card terminal
      const dockReticle = new THREE.Group();
      const ringMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x22d3ee : 0xa855f7,
        wireframe: true,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      dockReticle.add(ringMesh);
      cableGroup.add(dockReticle);

      serviceCables.push({
        line: cableLine,
        geom: cableGeom,
        pulses,
        dockReticle,
        anchorSphere,
        isCyan,
        side,
        tService: t,
      });
    }

    // 5. Subtle Ambient Quantum Dust (Enhances true 3D spatial depth & parallax)
    const particleCount = 180;
    const pPos = new Float32Array(particleCount * 3);
    const pCol = new Float32Array(particleCount * 3);
    const cV = new THREE.Color(0x818cf8);
    const cC = new THREE.Color(0x22d3ee);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = RADIUS * (0.6 + Math.random() * 2.0);
      const y = (Math.random() - 0.5) * HELIX_HEIGHT * 1.15;
      const zOffset = (Math.random() - 0.5) * 4.0;

      pPos[i * 3] = Math.cos(angle) * r;
      pPos[i * 3 + 1] = y;
      pPos[i * 3 + 2] = Math.sin(angle) * r + zOffset;

      const col = Math.random() < 0.5 ? cV : cC;
      pCol[i * 3] = col.r;
      pCol[i * 3 + 1] = col.g;
      pCol[i * 3 + 2] = col.b;
    }

    const pGeom = new THREE.BufferGeometry();
    pGeom.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeom.setAttribute('color', new THREE.BufferAttribute(pCol, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(pGeom, pMat);
    helixRoot.add(particles);

    // 6. Animation Loop with Real-time 3D Curve Morphing & Scroll Tracking
    const clock = new THREE.Clock();

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth damp rotation to scroll target
      scrollRef.current.current += (scrollRef.current.target - scrollRef.current.current) * 0.085;
      const currentRotation = scrollRef.current.current;

      // Mouse Parallax smooth dampening
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Helix rotation & dynamic emerging from depth
      helixRoot.rotation.y = currentRotation + mouseRef.current.x * 0.4;
      helixRoot.rotation.x = 0.08 - mouseRef.current.y * 0.3;

      // The DNA emerges from the background depth:
      // In the middle scroll it arches closer (z = -0.2), at top/bottom it recedes into depth (z = -1.2)
      const currentScrollRatio = Math.max(0, Math.min(1, currentRotation / (Math.PI * 5.8 || 1)));
      const depthCurve = Math.sin(currentScrollRatio * Math.PI);
      helixRoot.position.z = -1.1 + depthCurve * 0.85;

      // Update each 3D Connecting Cable bridging DNA and Service Box
      serviceCables.forEach((sc, sIdx) => {
        const t = sc.tService;
        const y = (t - 0.5) * HELIX_HEIGHT;
        const strandAngle = t * Math.PI * 2 * TURNS + (sc.isCyan ? Math.PI : 0);

        // Position on DNA backbone
        const startX = Math.cos(strandAngle) * RADIUS;
        const startY = y;
        const startZ = Math.sin(strandAngle) * RADIUS;
        sc.anchorSphere.position.set(startX, startY, startZ);

        // Check if this service is in focus or approaching viewport
        const isFocused = sIdx === highlightedIndex;
        const distFromFocus = Math.abs(currentScrollRatio * (totalServices - 1) - sIdx);
        const focusFactor = Math.max(0, 1 - distFromFocus * 0.85);

        // 3D Docking Port of the Service Box:
        // Positioned at specific 3D depth. As it enters viewport, it extends toward viewer
        const sideOffset = sc.side * (2.8 + focusFactor * 0.4);
        const endX = startX + sideOffset;
        const endY = y + (isFocused ? 0 : Math.sin(elapsed * 1.5 + sIdx) * 0.1);
        const endZ = startZ * 0.7 + (isFocused ? 0.75 : -0.2);

        // Dynamic 3D Curve points: Bezier arc bending in genuine 3D space
        const midX = (startX + endX) * 0.5 + sc.side * 0.6;
        const midY = (startY + endY) * 0.5 + Math.sin(strandAngle) * 0.4;
        const midZ = (startZ + endZ) * 0.5 + 0.5 * (focusFactor + 0.2);

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(startX, startY, startZ),
          new THREE.Vector3(midX, midY, midZ),
          new THREE.Vector3(endX, endY, endZ)
        );

        // Update 3D Line geometry
        const positions = sc.geom.attributes.position.array as Float32Array;
        const samplePoints = curve.getPoints(23);
        samplePoints.forEach((pt, pIdx) => {
          positions[pIdx * 3] = pt.x;
          positions[pIdx * 3 + 1] = pt.y;
          positions[pIdx * 3 + 2] = pt.z;
        });
        sc.geom.attributes.position.needsUpdate = true;

        // Line material responsiveness
        const lineMat = sc.line.material as THREE.LineBasicMaterial;
        lineMat.opacity = isFocused ? 0.95 : Math.max(0.18, 0.65 - distFromFocus * 0.25);

        // Update Docking Reticle position & spinning rotation
        sc.dockReticle.position.set(endX, endY, endZ);
        sc.dockReticle.rotation.z = elapsed * 2.0;
        const reticleScale = isFocused ? 1.0 + Math.sin(elapsed * 6.0) * 0.15 : 0.6;
        sc.dockReticle.scale.setScalar(reticleScale);

        // Animate traveling energy photons along the 3D curve
        sc.pulses.forEach((pulse, pIdx) => {
          const speed = isFocused ? 1.8 : 0.9;
          const u = ((elapsed * speed + (pIdx * 0.5) / speed) % 1);
          const pos = curve.getPoint(u);
          pulse.position.copy(pos);
          pulse.scale.setScalar(isFocused ? 1.4 : 0.8);
          (pulse.material as THREE.MeshBasicMaterial).opacity = isFocused ? 0.95 : 0.3;
        });

        // Anchor sphere pulse
        if (isFocused) {
          const pulseScale = 1.0 + Math.sin(elapsed * 5.0) * 0.25;
          sc.anchorSphere.scale.setScalar(pulseScale);
        } else {
          sc.anchorSphere.scale.setScalar(0.85);
        }
      });

      // Slowly drift quantum dust
      particles.rotation.y = elapsed * 0.04;

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
      className={`relative w-full h-full min-h-[500px] flex items-center justify-center select-none ${className}`}
    >
      {/* Background ambient radial depth vignette */}
      <div className="absolute inset-0 bg-radial from-violet-600/10 via-cyan-500/5 to-transparent pointer-events-none" />

      {/* Subtle 3D Telemetry HUD Badge */}
      <div className="absolute bottom-3 right-4 px-3 py-1.5 rounded-full bg-[#0c0d14]/85 border border-[#20202a] text-[10px] font-mono text-zinc-400 backdrop-blur-md z-10 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span>3D KINETIC HELIX // EMBEDDED STRUCTURAL TETHERS</span>
      </div>
    </div>
  );
}
