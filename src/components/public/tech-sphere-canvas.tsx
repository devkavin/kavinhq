'use client';

import * as React from 'react';
import {
  CSharp,
  Docker,
  GitHubLight,
  Laravel,
  MicrosoftSQLServer,
  NextJs,
  NodeJs,
  PHP,
  PostgreSQL,
  React as ReactIcon,
  Supabase,
  Swagger,
  TailwindCSS,
  TypeScript,
  VercelLight,
} from 'developer-icons';
import type { DeveloperIconProps } from 'developer-icons/dist/icon';

type StackTech = {
  name: string;
  color: string;
  Icon: React.ComponentType<DeveloperIconProps>;
};

const STACK_TECHNOLOGIES: StackTech[] = [
  { name: 'Next.js', color: '#ffffff', Icon: NextJs },
  { name: 'React', color: '#61dafb', Icon: ReactIcon },
  { name: 'TypeScript', color: '#3178c6', Icon: TypeScript },
  { name: 'Tailwind CSS', color: '#38bdf8', Icon: TailwindCSS },
  { name: 'Laravel', color: '#ff2d20', Icon: Laravel },
  { name: 'PHP', color: '#777bb4', Icon: PHP },
  { name: 'ASP.NET Core', color: '#8b5cf6', Icon: CSharp },
  { name: 'C#', color: '#a179dc', Icon: CSharp },
  { name: 'Node.js', color: '#68a063', Icon: NodeJs },
  { name: 'PostgreSQL', color: '#336791', Icon: PostgreSQL },
  { name: 'SQL Server', color: '#cc2927', Icon: MicrosoftSQLServer },
  { name: 'Supabase', color: '#3ecf8e', Icon: Supabase },
  { name: 'Docker', color: '#2496ed', Icon: Docker },
  { name: 'Vercel', color: '#f8fafc', Icon: VercelLight },
  { name: 'GitHub', color: '#e5e7eb', Icon: GitHubLight },
  { name: 'REST APIs', color: '#f59e0b', Icon: Swagger },
];

type SpherePoint = StackTech & {
  x: number;
  y: number;
  z: number;
};

const buildSpherePoints = (technologies: StackTech[]) => {
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const count = technologies.length;

  return technologies.map((tech, index) => {
    const y = 1 - (index / (count - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * index;

    return {
      ...tech,
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
    };
  });
};

const rotatePoint = (point: SpherePoint, rotationX: number, rotationY: number) => {
  const cosX = Math.cos(rotationX);
  const sinX = Math.sin(rotationX);
  const cosY = Math.cos(rotationY);
  const sinY = Math.sin(rotationY);

  const y = point.y * cosX - point.z * sinX;
  const zAfterX = point.y * sinX + point.z * cosX;
  const x = point.x * cosY + zAfterX * sinY;
  const z = -point.x * sinY + zAfterX * cosY;

  return { x, y, z };
};

export function TechSphereCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const iconRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const points = React.useMemo(() => buildSpherePoints(STACK_TECHNOLOGIES), []);
  const stateRef = React.useRef({
    rotationX: -0.22,
    rotationY: 0.28,
    velocityX: 0.0012,
    velocityY: 0.0023,
    pointerX: 0,
    pointerY: 0,
    isPointerInside: false,
  });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;

    if (!canvas || !wrapper) {
      return;
    }

    const context = canvas.getContext('2d');

    if (!context) {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let radius = 0;

    const resize = () => {
      const rect = wrapper.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = Math.max(320, rect.width);
      height = Math.max(320, rect.height);
      radius = Math.min(width, height) * 0.36;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      const state = stateRef.current;

      context.clearRect(0, 0, width, height);

      if (!reduceMotion) {
        state.rotationX += state.velocityX;
        state.rotationY += state.velocityY;

        state.velocityX += ((state.isPointerInside ? state.pointerY * -0.006 : 0.0012) - state.velocityX) * 0.08;
        state.velocityY += ((state.isPointerInside ? state.pointerX * 0.008 : 0.0023) - state.velocityY) * 0.08;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const sortedPoints = points
        .map((point, index) => ({ index, point, rotated: rotatePoint(point, state.rotationX, state.rotationY) }))
        .sort((a, b) => a.rotated.z - b.rotated.z);

      const gradient = context.createRadialGradient(centerX, centerY, radius * 0.1, centerX, centerY, radius * 1.55);
      gradient.addColorStop(0, 'rgba(45, 212, 191, 0.12)');
      gradient.addColorStop(0.54, 'rgba(245, 158, 11, 0.045)');
      gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');

      context.beginPath();
      context.arc(centerX, centerY, radius * 1.32, 0, Math.PI * 2);
      context.fillStyle = gradient;
      context.fill();

      context.strokeStyle = 'rgba(148, 163, 184, 0.14)';
      context.lineWidth = 1;

      for (const item of sortedPoints) {
        const { rotated } = item;
        const scale = 0.78 + (rotated.z + 1) * 0.22;
        const x = centerX + rotated.x * radius * scale;
        const y = centerY + rotated.y * radius * scale;

        context.beginPath();
        context.arc(x, y, Math.max(1, 2.2 * scale), 0, Math.PI * 2);
        context.fillStyle = `rgba(45, 212, 191, ${0.1 + scale * 0.16})`;
        context.fill();

        for (const neighbor of sortedPoints) {
          if (neighbor === item) {
            continue;
          }

          const dx = item.rotated.x - neighbor.rotated.x;
          const dy = item.rotated.y - neighbor.rotated.y;
          const dz = item.rotated.z - neighbor.rotated.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 0.82 && item.rotated.z > -0.2 && neighbor.rotated.z > -0.2) {
            const neighborScale = 0.78 + (neighbor.rotated.z + 1) * 0.22;
            context.globalAlpha = Math.max(0, (0.82 - distance) * 0.18);
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(
              centerX + neighbor.rotated.x * radius * neighborScale,
              centerY + neighbor.rotated.y * radius * neighborScale,
            );
            context.stroke();
            context.globalAlpha = 1;
          }
        }
      }

      for (const { index, rotated } of sortedPoints) {
        const depth = (rotated.z + 1) / 2;
        const scale = 0.78 + depth * 0.44;
        const x = centerX + rotated.x * radius * scale;
        const y = centerY + rotated.y * radius * scale;
        const icon = iconRefs.current[index];

        if (icon) {
          const iconSize = 30 + depth * 34;

          icon.style.opacity = `${0.28 + depth * 0.72}`;
          icon.style.zIndex = `${Math.round(depth * 100)}`;
          icon.style.filter = `drop-shadow(0 16px ${Math.round(12 + depth * 18)}px rgba(0, 0, 0, ${0.24 + depth * 0.2}))`;
          icon.style.transform = `translate3d(${x - iconSize / 2}px, ${y - iconSize / 2}px, 0) scale(${0.74 + depth * 0.34})`;
        }
      }

      animationFrame = window.requestAnimationFrame(draw);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const state = stateRef.current;
      const isNearSphere =
        event.clientX >= rect.left - 120 &&
        event.clientX <= rect.right + 120 &&
        event.clientY >= rect.top - 120 &&
        event.clientY <= rect.bottom + 120;

      state.isPointerInside = isNearSphere;
      state.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      state.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handlePointerMove = (event: PointerEvent) => {
      updatePointer(event);
    };

    const handlePointerLeave = () => {
      stateRef.current.isPointerInside = false;
    };

    resize();
    draw();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(wrapper);
    window.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [points]);

  return (
    <div
      ref={wrapperRef}
      className="pointer-events-none relative h-[320px] w-full overflow-hidden sm:h-[420px] lg:h-[min(720px,calc(100vh-6rem))]"
    >
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        aria-label="Interactive technology sphere that responds to pointer movement"
      />
      <div aria-hidden="true" className="absolute inset-0">
        {STACK_TECHNOLOGIES.map((tech, index) => {
          const Icon = tech.Icon;

          return (
            <div
              key={tech.name}
              ref={(node) => {
                iconRefs.current[index] = node;
              }}
              className="absolute left-0 top-0 flex h-14 w-14 items-center justify-center rounded-md border border-white/[0.08] bg-background/55 p-2.5 shadow-2xl backdrop-blur-sm will-change-transform"
              style={{ color: tech.color }}
            >
              <Icon className="h-full w-full" size={40} />
            </div>
          );
        })}
      </div>
      <ul className="sr-only">
        {STACK_TECHNOLOGIES.map((tech) => (
          <li key={tech.name}>{tech.name}</li>
        ))}
      </ul>
    </div>
  );
}
