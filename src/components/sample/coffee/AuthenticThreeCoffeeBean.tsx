import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface AuthenticThreeCoffeeBeanProps {
  roastLevel?: 'LIGHT' | 'MEDIUM' | 'DARK';
  interactive?: boolean;
  className?: string;
  enableScrollReaction?: boolean;
}

export default function AuthenticThreeCoffeeBean({
  roastLevel = 'MEDIUM',
  interactive = true,
  className = '',
  enableScrollReaction = true,
}: AuthenticThreeCoffeeBeanProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const beanGroupRef = useRef<THREE.Group | null>(null);
  const materialsRef = useRef<THREE.MeshPhysicalMaterial[]>([]);
  const mouseState = useRef({
    isDown: false,
    prevX: 0,
    prevY: 0,
    rotX: 0.3,
    rotY: 0.5,
    targetRotX: 0.3,
    targetRotY: 0.5,
  });

  const [activeRoast, setActiveRoast] = useState(roastLevel);

  // Sync prop changes
  useEffect(() => {
    setActiveRoast(roastLevel);
  }, [roastLevel]);

  // Color mapping based on roast spectrum
  const getRoastColor = (roast: 'LIGHT' | 'MEDIUM' | 'DARK') => {
    switch (roast) {
      case 'LIGHT':
        return {
          bean: new THREE.Color('#965a38'), // Cinnamon blonde
          cleft: new THREE.Color('#3d1e10'),
          roughness: 0.48,
          clearcoat: 0.25,
        };
      case 'DARK':
        return {
          bean: new THREE.Color('#24140e'), // Dark French roast
          cleft: new THREE.Color('#0d0604'),
          roughness: 0.22,
          clearcoat: 0.85, // High oil sheen
        };
      case 'MEDIUM':
      default:
        return {
          bean: new THREE.Color('#542e1b'), // Caramelized Viennese
          cleft: new THREE.Color('#1c0c06'),
          roughness: 0.35,
          clearcoat: 0.55,
        };
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 360;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup for Realistic Surface Oil Reflection
    const ambientLight = new THREE.AmbientLight(0xfff3e6, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffecd1, 2.8);
    keyLight.position.set(4, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4af8c, 1.4);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xff9d42, 2.2, 10);
    rimLight.position.set(0, -3, -3);
    scene.add(rimLight);

    const topGlow = new THREE.PointLight(0xfff8ee, 1.5, 8);
    topGlow.position.set(0, 4, 1);
    scene.add(topGlow);

    // 3. Procedural Three.js 3D Coffee Bean Geometry with Authentic Central Cleft
    // A coffee bean consists of two symmetrical convex lobes with a curved central cleft fissure
    const beanGroup = new THREE.Group();
    beanGroupRef.current = beanGroup;
    scene.add(beanGroup);

    const roastConfig = getRoastColor(activeRoast);

    // High quality Physical Material for realistic roasting sheen
    const beanMaterial = new THREE.MeshPhysicalMaterial({
      color: roastConfig.bean,
      roughness: roastConfig.roughness,
      metalness: 0.04,
      clearcoat: roastConfig.clearcoat,
      clearcoatRoughness: 0.2,
      reflectivity: 0.6,
    });

    const cleftMaterial = new THREE.MeshStandardMaterial({
      color: roastConfig.cleft,
      roughness: 0.85,
      metalness: 0.0,
    });

    materialsRef.current = [beanMaterial];

    // Function to create a realistic curved half-bean lobe
    const createBeanHalf = (isLeft: boolean) => {
      // Create deformed sphere geometry
      const geom = new THREE.SphereGeometry(1.2, 48, 48);
      const pos = geom.attributes.position;

      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        // Ellipsoidal stretch: elongated along Y (coffee bean length)
        y *= 1.45;
        x *= 0.95;
        z *= 0.68;

        // Flatten the inner cleft side facing the center (x = 0)
        const innerSide = isLeft ? x > 0 : x < 0;
        if (innerSide) {
          x *= 0.18; // Flatten inner cleft face
          // Create S-curve cleft indentation
          const cleftCurve = Math.sin(y * 1.5) * 0.12;
          z += cleftCurve * (isLeft ? 1 : -1) * 0.4;
          // Inward crease depression
          z = Math.min(z, 0.45);
        } else {
          // Convex outer back curve
          z += Math.sin((y + 1.5) * 1.1) * 0.15;
        }

        // Taper the ends (top and bottom tips of the bean)
        const taper = 1.0 - Math.pow(Math.abs(y) / 2.0, 2.2) * 0.35;
        x *= Math.max(0.2, taper);
        z *= Math.max(0.2, taper);

        pos.setXYZ(i, x, y, z);
      }

      geom.computeVertexNormals();
      const mesh = new THREE.Mesh(geom, beanMaterial);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      // Position lobe slightly apart to reveal natural cleft groove
      mesh.position.x = isLeft ? -0.12 : 0.12;
      return mesh;
    };

    const leftLobe = createBeanHalf(true);
    const rightLobe = createBeanHalf(false);
    beanGroup.add(leftLobe);
    beanGroup.add(rightLobe);

    // Dark organic interior cleft crease filler
    const cleftCurvePoints: THREE.Vector3[] = [];
    for (let t = -1.6; t <= 1.6; t += 0.1) {
      const x = Math.sin(t * 1.6) * 0.05;
      const y = t;
      const z = 0.08 + Math.cos(t * 1.8) * 0.04;
      cleftCurvePoints.push(new THREE.Vector3(x, y, z));
    }
    const cleftCurve = new THREE.CatmullRomCurve3(cleftCurvePoints);
    const cleftGeom = new THREE.TubeGeometry(cleftCurve, 32, 0.08, 12, false);
    const cleftMesh = new THREE.Mesh(cleftGeom, cleftMaterial);
    beanGroup.add(cleftMesh);

    // Initial orientation: angled slightly to showcase cleft and roast sheen
    beanGroup.rotation.x = mouseState.current.rotX;
    beanGroup.rotation.y = mouseState.current.rotY;

    // 4. WINDOW SCROLL LISTENER (The real page scroll effect requested by user)
    const handleWindowScroll = () => {
      if (!enableScrollReaction) return;
      const scrollY = window.scrollY;
      // Convert scroll position into dynamic 3D rotation and floating glide
      const scrollFactor = scrollY * 0.0028;
      mouseState.current.targetRotY = 0.5 + scrollFactor * 2.5;
      mouseState.current.targetRotX = 0.3 + Math.sin(scrollFactor) * 0.45;
    };

    window.addEventListener('scroll', handleWindowScroll, { passive: true });

    // 5. Interactive Drag Rotation
    const handleMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      mouseState.current.isDown = true;
      mouseState.current.prevX = e.clientX;
      mouseState.current.prevY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseState.current.isDown || !interactive) return;
      const deltaX = e.clientX - mouseState.current.prevX;
      const deltaY = e.clientY - mouseState.current.prevY;
      mouseState.current.prevX = e.clientX;
      mouseState.current.prevY = e.clientY;

      mouseState.current.targetRotY += deltaX * 0.01;
      mouseState.current.targetRotX += deltaY * 0.01;
    };

    const handleMouseUp = () => {
      mouseState.current.isDown = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Touch support for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (!interactive || e.touches.length === 0) return;
      mouseState.current.isDown = true;
      mouseState.current.prevX = e.touches[0].clientX;
      mouseState.current.prevY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (!mouseState.current.isDown || !interactive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - mouseState.current.prevX;
      const deltaY = e.touches[0].clientY - mouseState.current.prevY;
      mouseState.current.prevX = e.touches[0].clientX;
      mouseState.current.prevY = e.touches[0].clientY;

      mouseState.current.targetRotY += deltaX * 0.012;
      mouseState.current.targetRotX += deltaY * 0.012;
    };
    const handleTouchEnd = () => {
      mouseState.current.isDown = false;
    };

    domEl.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    // Resize handling
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertial damping towards target rotation
      mouseState.current.rotX += (mouseState.current.targetRotX - mouseState.current.rotX) * 0.08;
      mouseState.current.rotY += (mouseState.current.targetRotY - mouseState.current.rotY) * 0.08;

      if (!mouseState.current.isDown) {
        // Gentle organic levitation and slow idle rotation
        beanGroup.rotation.y = mouseState.current.rotY + Math.sin(elapsedTime * 0.6) * 0.1;
        beanGroup.rotation.x = mouseState.current.rotX + Math.cos(elapsedTime * 0.8) * 0.08;
        beanGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.08;
      } else {
        beanGroup.rotation.y = mouseState.current.rotY;
        beanGroup.rotation.x = mouseState.current.rotX;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleWindowScroll);
      domEl.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domEl.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update roast level materials dynamically
  useEffect(() => {
    if (materialsRef.current.length > 0) {
      const config = getRoastColor(activeRoast);
      materialsRef.current[0].color.copy(config.bean);
      materialsRef.current[0].roughness = config.roughness;
      materialsRef.current[0].clearcoat = config.clearcoat;
      materialsRef.current[0].needsUpdate = true;
    }
  }, [activeRoast]);

  return (
    <div
      className={`relative w-full h-full flex flex-col items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
    >
      <div ref={mountRef} className="w-full h-full min-h-[360px] flex items-center justify-center" />

      {/* Floating 3D Interaction Hint */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none">
        <div className="px-3 py-1 rounded-full bg-black/75 border border-amber-500/30 text-amber-300 font-mono text-[10px] backdrop-blur-md flex items-center gap-1.5 shadow-lg">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>Three.js WebGL &bull; چرخش ۳ بعدی با درگ و اسکرول ماوس</span>
        </div>
      </div>
    </div>
  );
}
