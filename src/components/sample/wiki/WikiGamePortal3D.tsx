import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface WikiGamePortal3DProps {
  genre?: string;
  isFa?: boolean;
}

export default function WikiGamePortal3D({
  genre = 'All',
  isFa = true,
}: WikiGamePortal3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 400;
    let height = container.clientHeight || 450;
    let isMobile = width < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060810, 0.05);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Root Group: Compact, refined scale positioned elevated in upper chamber
    // so it NEVER overlaps or hides the search box or headline!
    const portalGroup = new THREE.Group();
    portalGroup.position.set(0, isMobile ? 2.3 : 2.5, -3.5);
    portalGroup.scale.setScalar(isMobile ? 0.2 : 0.3);
    scene.add(portalGroup);

    // 1. Central Holographic Gaming Artifact (Translucent Obsidian with Rose Glow)
    const coreGeom = new THREE.OctahedronGeometry(0.65, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x090b14,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.15,
      transparent: true,
      opacity: 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    portalGroup.add(coreMesh);

    // 2. Delicate Wireframe Matrix Cage (Rose/Gold accent)
    const cageGeom = new THREE.IcosahedronGeometry(0.95, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    portalGroup.add(cageMesh);

    // 3. Orbital Data Rings (Matching WikiGame brand colors: Rose & Amber Gold)
    const ringGroup = new THREE.Group();
    const ring1Geom = new THREE.TorusGeometry(1.3, 0.012, 16, 80);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.35 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(1.6, 0.012, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.3 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    portalGroup.add(ringGroup);

    // 4. Subtle Floating Micro-Nodes
    const nodesGroup = new THREE.Group();
    const nodeGeom = new THREE.TetrahedronGeometry(0.09, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0xf43f5e,
      emissive: 0xe11d48,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodeCount = 10;
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.9 + (i % 2) * 0.2;
      node.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle * 2) * 0.4,
        Math.sin(angle) * radius
      );
      nodesGroup.add(node);
      nodes.push(node);
    }
    portalGroup.add(nodesGroup);

    // 5. Delicate Ambient Starfield (Gentle, low-intensity background specks)
    const particleCount = 120;
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cRose = new THREE.Color(0xf43f5e);
    const cAmber = new THREE.Color(0xfbbf24);
    const cViolet = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;

      const pick = Math.random();
      const c = pick < 0.6 ? cRose : pick < 0.85 ? cViolet : cAmber;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.4);
    scene.add(ambientLight);

    const roseLight = new THREE.PointLight(0xf43f5e, 2.0, 14);
    roseLight.position.set(3, 3, 3);
    scene.add(roseLight);

    const amberLight = new THREE.PointLight(0xfbbf24, 1.5, 14);
    amberLight.position.set(-3, -2, 3);
    scene.add(amberLight);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      coreMesh.rotation.y = elapsed * 0.35;
      coreMesh.rotation.x = Math.sin(elapsed * 0.25) * 0.2;

      cageMesh.rotation.y = -elapsed * 0.25;
      cageMesh.rotation.z = elapsed * 0.15;

      ring1.rotation.z = elapsed * 0.4;
      ring2.rotation.x = -elapsed * 0.3;

      nodesGroup.rotation.y = elapsed * 0.2;
      nodes.forEach((n, idx) => {
        n.rotation.y = elapsed + idx;
        n.position.y += Math.sin(elapsed * 2 + idx) * 0.002;
      });

      particles.rotation.y = elapsed * 0.015;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 450;
      isMobile = width < 768;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);

      portalGroup.position.set(0, isMobile ? 2.3 : 2.5, -3.5);
      portalGroup.scale.setScalar(isMobile ? 0.2 : 0.3);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [genre]);

  return <div ref={mountRef} className="w-full h-full pointer-events-none select-none" />;
}
