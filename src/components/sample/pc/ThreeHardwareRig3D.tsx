import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ThreeHardwareRig3DProps {
  partType: 'GPU' | 'MOTHERBOARD' | 'CASE' | 'RAM' | 'COOLER';
  rgbColor?: string;
  isCompletedRig?: boolean;
  className?: string;
}

export default function ThreeHardwareRig3D({
  partType = 'GPU',
  rgbColor = '#38bdf8',
  isCompletedRig = false,
  className = '',
}: ThreeHardwareRig3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(2.8, 2.2, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rgbLight = new THREE.PointLight(new THREE.Color(rgbColor), 4.0, 8);
    rgbLight.position.set(0, 1, 2);
    scene.add(rgbLight);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    const fanBlades: THREE.Mesh[] = [];

    // Materials
    const pcbMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.6,
      metalness: 0.2,
    });
    const metalShine = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.25,
      metalness: 0.85,
    });
    const heatsinkMaterial = new THREE.MeshStandardMaterial({
      color: 0x64748b,
      roughness: 0.3,
      metalness: 0.9,
    });
    const rgbEmissive = new THREE.MeshStandardMaterial({
      color: new THREE.Color(rgbColor),
      emissive: new THREE.Color(rgbColor),
      emissiveIntensity: 1.8,
      roughness: 0.1,
    });

    if (isCompletedRig || partType === 'CASE') {
      // -----------------------------------------------------------------------
      // Panoramic Dual-Chamber Tempered Glass Gaming Rig Chassis
      // -----------------------------------------------------------------------
      const caseGeom = new THREE.BoxGeometry(2.2, 2.8, 2.4);
      const glassMat = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.35,
        roughness: 0.05,
        transmission: 0.9,
        thickness: 0.5,
      });
      const caseGlass = new THREE.Mesh(caseGeom, glassMat);
      mainGroup.add(caseGlass);

      // Chassis Frame
      const frameGeom = new THREE.BoxGeometry(2.25, 2.85, 2.45);
      const frameMat = new THREE.MeshStandardMaterial({
        color: 0x05070a,
        wireframe: true,
        roughness: 0.5,
      });
      const frame = new THREE.Mesh(frameGeom, frameMat);
      mainGroup.add(frame);

      // Inside GPU
      const internalGpu = new THREE.BoxGeometry(1.6, 0.45, 0.7);
      const gpuMesh = new THREE.Mesh(internalGpu, metalShine);
      gpuMesh.position.set(0, -0.4, 0.2);
      mainGroup.add(gpuMesh);

      // Inside ARGB strips
      const stripGeom = new THREE.BoxGeometry(0.08, 2.4, 0.08);
      const stripMesh = new THREE.Mesh(stripGeom, rgbEmissive);
      stripMesh.position.set(-0.95, 0, 1.05);
      mainGroup.add(stripMesh);

      // Inside 3 Top Fans
      for (let i = -1; i <= 1; i++) {
        const fanGeom = new THREE.CylinderGeometry(0.32, 0.32, 0.08, 24);
        const fan = new THREE.Mesh(fanGeom, rgbEmissive);
        fan.position.set(i * 0.65, 1.25, 0);
        mainGroup.add(fan);
        fanBlades.push(fan);
      }
    } else if (partType === 'GPU') {
      // -----------------------------------------------------------------------
      // High-Fidelity GeForce RTX 4090 GPU Model
      // -----------------------------------------------------------------------
      // Shroud Body
      const shroudGeom = new THREE.BoxGeometry(3.0, 1.1, 0.7);
      const shroud = new THREE.Mesh(shroudGeom, pcbMaterial);
      mainGroup.add(shroud);

      // Metal Backplate
      const backplateGeom = new THREE.BoxGeometry(2.95, 1.05, 0.06);
      const backplate = new THREE.Mesh(backplateGeom, metalShine);
      backplate.position.set(0, 0, -0.38);
      mainGroup.add(backplate);

      // Heatsink Fins Array
      const finGeom = new THREE.BoxGeometry(2.8, 0.8, 0.4);
      const fins = new THREE.Mesh(finGeom, heatsinkMaterial);
      fins.position.set(0, 0, 0.05);
      mainGroup.add(fins);

      // Dual Axial Fans with ARGB rings
      [-0.75, 0.75].forEach((xPos) => {
        const ringGeom = new THREE.TorusGeometry(0.42, 0.03, 16, 32);
        const ring = new THREE.Mesh(ringGeom, rgbEmissive);
        ring.position.set(xPos, 0, 0.36);
        mainGroup.add(ring);

        // Fan rotor
        const bladeGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 16);
        const fan = new THREE.Mesh(bladeGeom, metalShine);
        fan.rotation.x = Math.PI / 2;
        fan.position.set(xPos, 0, 0.36);
        mainGroup.add(fan);
        fanBlades.push(fan);
      });

      // Illuminated GeForce RTX Logo bar
      const logoGeom = new THREE.BoxGeometry(1.2, 0.12, 0.04);
      const logoMesh = new THREE.Mesh(logoGeom, rgbEmissive);
      logoMesh.position.set(0, 0.58, 0.2);
      mainGroup.add(logoMesh);
    } else if (partType === 'MOTHERBOARD') {
      // -----------------------------------------------------------------------
      // ATX Gaming Motherboard
      // -----------------------------------------------------------------------
      const boardGeom = new THREE.BoxGeometry(2.6, 2.6, 0.08);
      const board = new THREE.Mesh(boardGeom, pcbMaterial);
      mainGroup.add(board);

      // CPU Socket
      const socketGeom = new THREE.BoxGeometry(0.7, 0.7, 0.06);
      const socket = new THREE.Mesh(socketGeom, metalShine);
      socket.position.set(0, 0.4, 0.07);
      mainGroup.add(socket);

      // VRM Heatsinks
      const vrm1 = new THREE.BoxGeometry(0.4, 1.2, 0.3);
      const vrmMesh1 = new THREE.Mesh(vrm1, heatsinkMaterial);
      vrmMesh1.position.set(-0.7, 0.4, 0.2);
      mainGroup.add(vrmMesh1);

      // PCIe Metal Slots
      [-0.3, -0.8].forEach((yPos) => {
        const pcieGeom = new THREE.BoxGeometry(1.6, 0.12, 0.15);
        const pcie = new THREE.Mesh(pcieGeom, metalShine);
        pcie.position.set(-0.1, yPos, 0.1);
        mainGroup.add(pcie);
      });

      // M.2 Armor heatsink with RGB line
      const m2Geom = new THREE.BoxGeometry(1.4, 0.22, 0.08);
      const m2 = new THREE.Mesh(m2Geom, rgbEmissive);
      m2.position.set(-0.1, -0.55, 0.1);
      mainGroup.add(m2);
    } else if (partType === 'COOLER') {
      // -----------------------------------------------------------------------
      // 360mm AIO Liquid Cooler with Infinity Mirror Pump
      // -----------------------------------------------------------------------
      // Pump Block
      const pumpGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 32);
      const pump = new THREE.Mesh(pumpGeom, metalShine);
      pump.position.set(0, 0, 0);
      mainGroup.add(pump);

      // Infinity Mirror Head
      const mirrorGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.05, 32);
      const mirror = new THREE.Mesh(mirrorGeom, rgbEmissive);
      mirror.position.set(0, 0.21, 0);
      mainGroup.add(mirror);

      // Radiator block
      const radGeom = new THREE.BoxGeometry(2.8, 0.9, 0.25);
      const rad = new THREE.Mesh(radGeom, heatsinkMaterial);
      rad.position.set(0, 1.5, -0.5);
      mainGroup.add(rad);
    } else {
      // -----------------------------------------------------------------------
      // RAM Sticks with RGB Lightbar
      // -----------------------------------------------------------------------
      [-0.2, 0.2].forEach((xPos) => {
        const ramGeom = new THREE.BoxGeometry(0.12, 1.8, 0.45);
        const ram = new THREE.Mesh(ramGeom, metalShine);
        ram.position.set(xPos, 0, 0);
        mainGroup.add(ram);

        const lightbarGeom = new THREE.BoxGeometry(0.14, 0.2, 0.46);
        const lightbar = new THREE.Mesh(lightbarGeom, rgbEmissive);
        lightbar.position.set(xPos, 0.95, 0);
        mainGroup.add(lightbar);
      });
    }

    // Dynamic rotation & mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 2;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Spin fans
      fanBlades.forEach((fan) => {
        fan.rotation.y += 0.08;
      });

      // Smooth 3D tilt reaction
      mainGroup.rotation.y = elapsed * 0.45 + mouseX * 0.6;
      mainGroup.rotation.x = Math.sin(elapsed * 0.6) * 0.15 - mouseY * 0.4;
      mainGroup.position.y = Math.sin(elapsed * 1.2) * 0.08;

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
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [partType, rgbColor, isCompletedRig]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full min-h-[220px] flex items-center justify-center select-none ${className}`}
    />
  );
}
