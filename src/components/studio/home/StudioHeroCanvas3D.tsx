import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default function StudioHeroCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth || 800;
    let height = container.clientHeight || window.innerHeight || 600;
    let isMobile = width < 768;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.032);

    const camera = new THREE.PerspectiveCamera(isMobile ? 48 : 42, width / height, 0.1, 100);
    camera.position.set(0, 0, isMobile ? 12 : 11);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 1. High-Tech Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 5.0, 24);
    cyanLight.position.set(5, 3, 5);
    scene.add(cyanLight);

    const violetLight = new THREE.PointLight(0x8b5cf6, 5.0, 24);
    violetLight.position.set(-5, -3, 4);
    scene.add(violetLight);

    const limeLight = new THREE.PointLight(0xb8ff3d, 4.0, 16);
    limeLight.position.set(0, 5, 2);
    scene.add(limeLight);

    // 2. Load Authentic 3D Centerpiece Model: Primary Ion Drive
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    let loadedMesh: THREE.Group | null = null;
    const gltfLoader = new GLTFLoader();

    gltfLoader.load(
      '/models/PrimaryIonDrive.glb',
      (gltf) => {
        loadedMesh = gltf.scene;
        loadedMesh.scale.setScalar(0.72);
        loadedMesh.position.set(0, 0, 0);
        loadedMesh.rotation.set(0.3, 0.5, 0);

        loadedMesh.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        modelGroup.add(loadedMesh);
        setModelLoaded(true);
      },
      undefined,
      (err) => {
        console.warn('Fallback to procedural core:', err);
      }
    );

    // 3. Orbital Holographic Gimbal Rings
    const ringGroup = new THREE.Group();
    const ringGeom = new THREE.TorusGeometry(3.6, 0.025, 16, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, transparent: true, opacity: 0.35 });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.3 });
    const ring1 = new THREE.Mesh(ringGeom, ringMat1);
    const ring2 = new THREE.Mesh(ringGeom, ringMat2);
    ring2.rotation.x = Math.PI / 3;
    ringGroup.add(ring1);
    ringGroup.add(ring2);
    scene.add(ringGroup);

    // 4. Ambient High-Tech Floating Particle Sparks
    const particleCount = 400;
    const posArray = new Float32Array(particleCount * 3);
    const colorArray = new Float32Array(particleCount * 3);
    const c1 = new THREE.Color(0x00f0ff);
    const c2 = new THREE.Color(0x8b5cf6);
    const c3 = new THREE.Color(0xb8ff3d);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 18;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 14;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 14;

      const pick = Math.random();
      const c = pick < 0.45 ? c1 : pick < 0.8 ? c2 : c3;
      colorArray[i * 3] = c.r;
      colorArray[i * 3 + 1] = c.g;
      colorArray[i * 3 + 2] = c.b;
    }

    const particleGeom = new THREE.BufferGeometry();
    particleGeom.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeom.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Mouse Tracking Parallax
    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotY = x * 0.45;
      targetRotX = -y * 0.35;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse lerp
      currentRotX += (targetRotX - currentRotX) * 0.05;
      currentRotY += (targetRotY - currentRotY) * 0.05;

      modelGroup.rotation.x = currentRotX + Math.sin(elapsed * 0.5) * 0.05;
      modelGroup.rotation.y = currentRotY + elapsed * 0.2;

      // Animate rings
      ring1.rotation.z = elapsed * 0.15;
      ring2.rotation.y = -elapsed * 0.12;

      // Slowly rotate particle field
      particles.rotation.y = elapsed * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth || 800;
      const h = container.clientHeight || window.innerHeight || 600;
      const mobile = w < 768;
      camera.aspect = w / h;
      camera.fov = mobile ? 48 : 42;
      camera.position.set(0, 0, mobile ? 12 : 11);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full pointer-events-none">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 bg-radial from-violet-600/15 via-cyan-500/10 to-transparent pointer-events-none" />

      {/* Futuristic Telemetry HUD Badge */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-full bg-[#111116]/85 border border-[#202027] backdrop-blur-md text-[10px] font-mono text-zinc-400 flex items-center gap-2 pointer-events-auto">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-ping" />
        <span>123SERVICE // 3D HIGH-TECH PROPULSION CORE // GLTF PBR</span>
      </div>
    </div>
  );
}
