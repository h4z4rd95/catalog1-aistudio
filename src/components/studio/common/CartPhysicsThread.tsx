import React, { useEffect, useRef } from 'react';

export interface ThreadAnimationPayload {
  id: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  productTitle: string;
}

interface CartPhysicsThreadProps {
  activeThreads: ThreadAnimationPayload[];
  onThreadComplete: (id: string) => void;
}

export default function CartPhysicsThread({
  activeThreads,
  onThreadComplete,
}: CartPhysicsThreadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle spark array
    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
    }
    const sparks: Spark[] = [];

    const threadProgress: Record<string, { t: number; completed: boolean }> = {};
    activeThreads.forEach((th) => {
      if (!threadProgress[th.id]) {
        threadProgress[th.id] = { t: 0, completed: false };
      }
    });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      activeThreads.forEach((th) => {
        const state = threadProgress[th.id];
        if (!state) return;

        state.t += 0.035;

        // Quadratic Bezier Control Point (arching upwards)
        const cpX = (th.startX + th.endX) / 2;
        const cpY = Math.min(th.startY, th.endY) - 120;

        // Draw physical glowing thread
        ctx.beginPath();
        ctx.moveTo(th.startX, th.startY);
        ctx.quadraticCurveTo(cpX, cpY, th.endX, th.endY);
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.4)';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#22D3EE';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Calculate current packet position along curve
        const t = Math.min(1, state.t);
        const invT = 1 - t;
        const currentX = invT * invT * th.startX + 2 * invT * t * cpX + t * t * th.endX;
        const currentY = invT * invT * th.startY + 2 * invT * t * cpY + t * t * th.endY;

        // Glowing packet projectile
        ctx.beginPath();
        ctx.arc(currentX, currentY, 5.5, 0, Math.PI * 2);
        ctx.fillStyle = '#22D3EE';
        ctx.shadowColor = '#B8FF3D';
        ctx.shadowBlur = 16;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Spawn trailing sparks
        if (Math.random() < 0.6) {
          sparks.push({
            x: currentX,
            y: currentY,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            alpha: 1,
            color: Math.random() > 0.5 ? '#7C3AED' : '#22D3EE',
          });
        }

        // Arrival at cart anchor
        if (state.t >= 1.0 && !state.completed) {
          state.completed = true;
          // Spawn impact burst at destination
          for (let i = 0; i < 24; i++) {
            const angle = (i / 24) * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            sparks.push({
              x: th.endX,
              y: th.endY,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              alpha: 1,
              color: i % 2 === 0 ? '#22D3EE' : '#B8FF3D',
            });
          }
          setTimeout(() => {
            onThreadComplete(th.id);
          }, 350);
        }
      });

      // Render & update sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.035;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [activeThreads, onThreadComplete]);

  if (activeThreads.length === 0) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[80] w-full h-full"
    />
  );
}
