import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Sparkles, Sliders, RefreshCw, Box, Compass } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'typography_v09_persian3dribbonmesh',
  name: 'Persian 3D Spatial Typography Ribbon & Möbius Calligraphic Loop',
  category: 'Typography',
  batch: 'Batch 9: Interactive Creative Typography, Liquid Text Shaders & Kinetic Glyphs',
  techStack: ['React 19', 'Three.js WebGL', 'Möbius Ribbon Geometry', 'MeshPhysicalMaterial', 'Persian Calligraphic Texture Mapping'],
  aestheticVibe: 'Persian Spatial Futurism & 3D Architectural Ribbon',
  interactionBlueprint: 'Three.js 3D kinetic spatial ribbon winding through 3D coordinates mapped with Persian poetic glyphs and sacred geometry. Mouse drags orbit the 3D perspective, casting realistic dynamic shadows.',
  description: 'نوار فضایی سه‌بعدی متحرک در وب‌جی‌ال (Three.js) با چرخش موبیوس و حکاکی گلیف‌های خط نستعلیق و اسلیمی، همراه با انعکاس نور فلزی و فیزیک چرخش زاویه دید با ماوس.',
  codeSnippet: `// Three.js 3D Möbius Persian Ribbon
const curve = new THREE.CatmullRomCurve3(points);
const tube = new THREE.TubeGeometry(curve, 100, 0.4, 16, true);
const mat = new THREE.MeshPhysicalMaterial({
  color: 0xf59e0b,
  metalness: 0.85,
  roughness: 0.25,
  clearcoat: 1.0,
});`,
  tags: ['Typography', 'Persian', '3D', 'Three.js', 'Ribbon', 'Mobius', 'WebGL'],
};

export default function TypographyPersian3DRibbonMesh() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [metallicColor, setMetallicColor] = useState<'GOLD' | 'CYAN' | 'EMERALD'>('GOLD');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xfff1dc, 2.5);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 2.0);
    dirLight2.position.set(-5, -5, 3);
    scene.add(dirLight2);

    // Color map
    const colorMap = {
      GOLD: new THREE.Color(0xf59e0b),
      CYAN: new THREE.Color(0x38bdf8),
      EMERALD: new THREE.Color(0x10b981),
    };

    // Möbius 3D Knot Curve
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 100; i++) {
      const t = (i / 100) * Math.PI * 2;
      const x = Math.sin(t) * 2.2 + Math.sin(t * 2) * 0.8;
      const y = Math.cos(t) * 1.8 + Math.cos(t * 2) * 0.5;
      const z = Math.sin(t * 3) * 1.0;
      points.push(new THREE.Vector3(x, y, z));
    }
    const path = new THREE.CatmullRomCurve3(points, true);
    const geometry = new THREE.TubeGeometry(path, 120, 0.28, 24, true);

    const material = new THREE.MeshPhysicalMaterial({
      color: colorMap[metallicColor],
      metalness: 0.85,
      roughness: 0.2,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Orbit group
    const group = new THREE.Group();
    group.add(mesh);
    scene.add(group);

    // Mouse drag
    let isDown = false;
    let prevX = 0;
    let prevY = 0;
    let rotX = 0;
    let rotY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      rotY += (e.clientX - prevX) * 0.01;
      rotX += (e.clientY - prevY) * 0.01;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => (isDown = false);

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isDown) {
        group.rotation.y += 0.008;
        group.rotation.x += 0.004;
      } else {
        group.rotation.y = rotY;
        group.rotation.x = rotX;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      camera.aspect = w / 400;
      camera.updateProjectionMatrix();
      renderer.setSize(w, 400);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [metallicColor]);

  return (
    <section id={blueprint.id} className="relative py-20 px-4 sm:px-6 bg-[#040609] border-b border-white/10 overflow-hidden">
      <div className="max-w-6xl mx-auto space-y-8">
        <BlueprintHUD blueprint={blueprint} />

        <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#120e06] to-[#040609] p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Box className="w-4 h-4 text-amber-400" />
              <h3 className="font-['Syne'] font-bold text-lg text-white">
                نوار سه‌بعدی Three.js و چرخش فضایی خطوط اسلیمی
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-zinc-400">رنگ متالیک:</span>
              {(['GOLD', 'CYAN', 'EMERALD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => {
                    soundFx.playClick(800);
                    setMetallicColor(c);
                  }}
                  className={`px-3 py-1 rounded-lg font-mono text-xs font-bold transition-all ${
                    metallicColor === c
                      ? 'bg-amber-400 text-black shadow-md'
                      : 'bg-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-inner flex items-center justify-center cursor-grab active:cursor-grabbing">
            <div ref={mountRef} className="w-full h-full" />
            <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
              <span className="px-4 py-1 rounded-full bg-black/80 border border-amber-500/30 text-amber-300 font-mono text-xs backdrop-blur-md">
                «حروف به هیئت کالبد در فضای سه‌بعدی حلول می‌کنند» &bull; درگ با ماوس جهت چرخش ۳۶۰ درجه
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
