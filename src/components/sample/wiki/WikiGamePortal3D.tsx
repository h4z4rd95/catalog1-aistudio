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

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060810, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.5, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 1. Central Holographic Gaming Polyhedron
    const coreGeom = new THREE.OctahedronGeometry(1.6, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.35,
      metalness: 0.9,
      roughness: 0.15,
      wireframe: false,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });
    const coreMesh = new THREE.Mesh(coreGeom, coreMat);
    scene.add(coreMesh);

    // 2. Outer Wireframe Matrix Cage
    const cageGeom = new THREE.IcosahedronGeometry(2.1, 1);
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const cageMesh = new THREE.Mesh(cageGeom, cageMat);
    scene.add(cageMesh);

    // 3. Orbital Data Rings
    const ringGroup = new THREE.Group();
    const ring1Geom = new THREE.TorusGeometry(2.8, 0.02, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x818cf8, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);

    const ring2Geom = new THREE.TorusGeometry(3.3, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xf43f5e, transparent: true, opacity: 0.5 });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ringGroup.add(ring2);

    scene.add(ringGroup);

    // 4. Floating Holographic Game Runes / Nodes
    const nodesGroup = new THREE.Group();
    const nodeGeom = new THREE.TetrahedronGeometry(0.25, 0);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
    });

    const nodeCount = 18;
    const nodes: THREE.Mesh[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const node = new THREE.Mesh(nodeGeom, nodeMat);
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 3.6 + (i % 3) * 0.4;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.sin(angle * 2) * 1.2),
        Math.sin(angle) * radius
      );
      nodesGroup.add(node);
      nodes.push(node);
    }
    scene.add(nodesGroup);

    // 5. Cyber Particle Field
    const particleCount = 450;
    const pos = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const cCyan = new THREE.Color(0x38bdf8);
    const cViolet = new THREE.Color(0xa855f7);
    const cRose = new THREE.Color(0xf43f5e);

    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const pick = Math.random();
      const c = pick < 0.5 ? cCyan : pick < 0.8 ? cViolet : cRose;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pLight1 = new THREE.PointLight(0x38bdf8, 3.5, 18);
    pLight1.position.set(4, 3, 5);
    scene.add(pLight1);

    const pLight2 = new THREE.PointLight(0xf43f5e, 3.0, 18);
    pLight2.position.set(-4, -3, 4);
    scene.add(pLight2);

    // Mouse tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.6;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    let clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.06;
      mouseY += (targetY - mouseY) * 0.06;

      coreMesh.rotation.x = elapsed * 0.3 + mouseY * 0.5;
      coreMesh.rotation.y = elapsed * 0.4 + mouseX * 0.5;
      cageMesh.rotation.x = -elapsed * 0.2;
      cageMesh.rotation.y = -elapsed * 0.35;

      ring1.rotation.z = elapsed * 0.5;
      ring2.rotation.z = -elapsed * 0.4;

      nodesGroup.rotation.y = elapsed * 0.25;
      nodes.forEach((n, idx) => {
        n.rotation.x += delta * 1.5;
        n.rotation.y += delta * 1.2;
      });

      particles.rotation.y = elapsed * 0.04;

      camera.position.x = mouseX * 1.2;
      camera.position.y = 1.5 + mouseY * 0.8;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container && renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [genre]);

  return (
    <div
      ref={mountRef}
      className="w-full h-full min-h-[360px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
    />
  );
}
