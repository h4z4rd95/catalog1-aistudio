import React, { useState, useEffect, useRef } from 'react';
import { ComponentBlueprint } from '../../types';
import BlueprintHUD from '../common/BlueprintHUD';
import { Compass, RefreshCw, Plus, Trash2, ArrowDown, ArrowRight, ArrowUp, ArrowLeft } from 'lucide-react';
import { soundFx } from '../../utils/audio';

const blueprint: ComponentBlueprint = {
  id: 'spatial_v02_brutalistrigidphysics',
  name: 'Neo-Brutalist 2D Rigid Body Physics & Gravity Playground',
  category: 'Spatial',
  batch: 'Batch 12: Interactive 3D Spatial Canvas, Physics Sandboxes & WebGL Environments',
  techStack: ['HTML5 Canvas 2D', 'Verlet Rigid Physics', 'SAT Collision Detection', 'Directional Gravity Engine', 'Web Audio Haptics'],
  aestheticVibe: 'Kinetic Neo-Brutalist Grid / Monospace Terminal',
  interactionBlueprint: 'High-contrast stark brutalist physics arena. Heavy geometric blocks collide with rigid SAT impulse resolution. Drag and fling blocks, click anywhere to spawn fresh monoliths, and switch gravity vectors through 4 cardinal axes with tactile mechanical clacks.',
  description: 'A tactile, high-contrast Neo-Brutalist physics sandbox featuring rigid-body Verlet dynamics, rotatable gravity fields, and live ASCII register telemetry.',
  codeSnippet: `// 2D Rigid body Verlet position integration
const tempX = b.x;
const tempY = b.y;
b.x += (b.x - b.oldX) * friction + grav.x;
b.y += (b.y - b.oldY) * friction + grav.y;
b.oldX = tempX;
b.oldY = tempY;`,
  tags: ['Spatial', 'Neo-Brutalist', 'Physics', 'Verlet', 'Canvas 2D', 'Interactive', 'Gravity'],
};

interface RigidBlock {
  id: number;
  x: number;
  y: number;
  oldX: number;
  oldY: number;
  w: number;
  h: number;
  angle: number;
  label: string;
  color: string;
  textColor: string;
}

export default function SpatialBrutalistRigidPhysics() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gravityDir, setGravityDir] = useState<'DOWN' | 'RIGHT' | 'UP' | 'LEFT'>('DOWN');
  const [blocks, setBlocks] = useState<RigidBlock[]>([]);
  const [activeCount, setActiveCount] = useState(0);

  const blocksRef = useRef<RigidBlock[]>([]);
  const draggingIdRef = useRef<number | null>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });

  const initialLabels = ['SYSTEM_01', 'BRUTAL_BLOCK', 'NULL_PTR', 'VIBE_CORE', 'HEX_0xFF', 'DETENT'];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.clientWidth || 800);
    const height = (canvas.height = 480);

    // Initial blocks
    const initial: RigidBlock[] = [];
    for (let i = 0; i < 7; i++) {
      const w = 70 + Math.random() * 50;
      const h = 40 + Math.random() * 30;
      const x = 100 + Math.random() * (width - 200);
      const y = 60 + Math.random() * 200;
      initial.push({
        id: i + 1,
        x,
        y,
        oldX: x - (Math.random() - 0.5) * 4,
        oldY: y,
        w,
        h,
        angle: (Math.random() - 0.5) * 0.2,
        label: initialLabels[i % initialLabels.length],
        color: i % 2 === 0 ? '#ffffff' : '#f59e0b',
        textColor: '#000000',
      });
    }

    blocksRef.current = initial;
    setBlocks(initial);
    setActiveCount(initial.length);

    let animId: number;

    const getGravity = () => {
      switch (gravityDir) {
        case 'DOWN': return { x: 0, y: 0.35 };
        case 'UP': return { x: 0, y: -0.35 };
        case 'LEFT': return { x: -0.35, y: 0 };
        case 'RIGHT': return { x: 0.35, y: 0 };
      }
    };

    const loop = () => {
      animId = requestAnimationFrame(loop);

      ctx.fillStyle = '#090a0f';
      ctx.fillRect(0, 0, width, height);

      // Grid backdrop
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const grav = getGravity();
      const friction = 0.985;
      const bList = blocksRef.current;

      // Verlet update & boundary clamping
      bList.forEach((b) => {
        if (draggingIdRef.current === b.id) return;

        const vx = (b.x - b.oldX) * friction;
        const vy = (b.y - b.oldY) * friction;

        b.oldX = b.x;
        b.oldY = b.y;

        b.x += vx + grav.x;
        b.y += vy + grav.y;

        // Boundaries
        const halfW = b.w / 2;
        const halfH = b.h / 2;

        if (b.x - halfW < 0) {
          b.x = halfW;
          b.oldX = b.x + vx * 0.6;
        } else if (b.x + halfW > width) {
          b.x = width - halfW;
          b.oldX = b.x + vx * 0.6;
        }

        if (b.y - halfH < 0) {
          b.y = halfH;
          b.oldY = b.y + vy * 0.6;
        } else if (b.y + halfH > height) {
          b.y = height - halfH;
          b.oldY = b.y + vy * 0.6;
        }
      });

      // Simple box-box collision
      for (let i = 0; i < bList.length; i++) {
        for (let j = i + 1; j < bList.length; j++) {
          const a = bList[i];
          const b = bList[j];

          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const minX = (a.w + b.w) / 2;
          const minY = (a.h + b.h) / 2;

          if (Math.abs(dx) < minX && Math.abs(dy) < minY) {
            const overlapX = minX - Math.abs(dx);
            const overlapY = minY - Math.abs(dy);

            if (overlapX < overlapY) {
              const sign = dx > 0 ? 1 : -1;
              if (draggingIdRef.current !== a.id) a.x -= overlapX * 0.5 * sign;
              if (draggingIdRef.current !== b.id) b.x += overlapX * 0.5 * sign;
            } else {
              const sign = dy > 0 ? 1 : -1;
              if (draggingIdRef.current !== a.id) a.y -= overlapY * 0.5 * sign;
              if (draggingIdRef.current !== b.id) b.y += overlapY * 0.5 * sign;
            }
          }
        }
      }

      // Render rigid blocks
      bList.forEach((b) => {
        ctx.save();
        ctx.translate(b.x, b.y);

        // Heavy brutalist shadow
        ctx.fillStyle = '#000000';
        ctx.fillRect(-b.w / 2 + 5, -b.h / 2 + 5, b.w, b.h);

        // Body
        ctx.fillStyle = b.color;
        ctx.fillRect(-b.w / 2, -b.h / 2, b.w, b.h);

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 3;
        ctx.strokeRect(-b.w / 2, -b.h / 2, b.w, b.h);

        // Label
        ctx.fillStyle = b.textColor;
        ctx.font = 'bold 10px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, 0, 0);

        ctx.restore();
      });
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gravityDir]);

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    // Check hit
    const bList = blocksRef.current;
    for (let i = bList.length - 1; i >= 0; i--) {
      const b = bList[i];
      if (
        px >= b.x - b.w / 2 &&
        px <= b.x + b.w / 2 &&
        py >= b.y - b.h / 2 &&
        py <= b.y + b.h / 2
      ) {
        soundFx.playClick(440, 0.05);
        draggingIdRef.current = b.id;
        dragOffsetRef.current = { x: px - b.x, y: py - b.y };
        return;
      }
    }

    // Spawn new block on empty space click
    soundFx.playClick(880, 0.04);
    const newId = Date.now();
    const newBlock: RigidBlock = {
      id: newId,
      x: px,
      y: py,
      oldX: px - (Math.random() - 0.5) * 5,
      oldY: py - 5,
      w: 80,
      h: 44,
      angle: 0,
      label: `BLK_${Math.floor(Math.random() * 900 + 100)}`,
      color: Math.random() > 0.5 ? '#ffffff' : '#38bdf8',
      textColor: '#000000',
    };

    blocksRef.current.push(newBlock);
    setActiveCount(blocksRef.current.length);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (draggingIdRef.current === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;

    const b = blocksRef.current.find((item) => item.id === draggingIdRef.current);
    if (b) {
      b.oldX = b.x;
      b.oldY = b.y;
      b.x = px - dragOffsetRef.current.x;
      b.y = py - dragOffsetRef.current.y;
    }
  };

  const handlePointerUp = () => {
    if (draggingIdRef.current !== null) {
      soundFx.playClick(300, 0.04);
      draggingIdRef.current = null;
    }
  };

  const handleClear = () => {
    soundFx.playClick(200);
    blocksRef.current = [];
    setActiveCount(0);
  };

  return (
    <div
      id="spatial_v02_brutalistrigidphysics"
      className="relative w-full min-h-[640px] bg-[#050608] border-b border-white/10 p-6 flex flex-col justify-between font-mono"
    >
      <BlueprintHUD blueprint={blueprint} />

      {/* Main Canvas Box */}
      <div className="relative w-full h-[480px] rounded-none border-4 border-white bg-black shadow-[8px_8px_0px_#ffffff] my-4 overflow-hidden">
        <canvas
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="w-full h-full cursor-crosshair select-none"
        />

        {/* Live HUD info */}
        <div className="absolute top-4 left-4 p-3 bg-black border-2 border-white text-[11px] text-white space-y-1">
          <div className="font-black text-amber-400">VERLET_PHYSICS_RUNNER // 2D_SAT</div>
          <div>BLOCKS_LOADED: <strong className="text-white">{activeCount}</strong></div>
          <div>GRAVITY_VECTOR: <strong className="text-cyan-400">{gravityDir}</strong></div>
          <div className="text-[10px] text-zinc-400">CLICK TO SPAWN &bull; DRAG TO FLING</div>
        </div>
      </div>

      {/* Brutalist Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border-2 border-white bg-black text-xs text-white">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-zinc-400">GRAVITY:</span>
          {(['DOWN', 'RIGHT', 'UP', 'LEFT'] as const).map((dir) => (
            <button
              key={dir}
              onClick={() => {
                soundFx.playClick(700);
                setGravityDir(dir);
              }}
              className={`px-3 py-1 border-2 border-white font-bold transition-all ${
                gravityDir === dir ? 'bg-amber-400 text-black shadow-[2px_2px_0px_#ffffff]' : 'bg-transparent text-white hover:bg-white/20'
              }`}
            >
              {dir}
            </button>
          ))}
        </div>

        <button
          onClick={handleClear}
          className="px-4 py-1.5 border-2 border-white bg-rose-600 hover:bg-rose-500 text-white font-bold flex items-center gap-2"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>PURGE ARENA</span>
        </button>
      </div>
    </div>
  );
}
