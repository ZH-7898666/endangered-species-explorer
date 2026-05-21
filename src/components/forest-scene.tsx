'use client';

import { useEffect, useRef, useMemo } from 'react';
import type { Species } from '@/data/species';

interface ForestSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  onSpeciesClick: (species: Species) => void;
  isVisible: boolean;
}

export function ForestScene({ species, unlockedIds, onSpeciesClick, isVisible }: ForestSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random movement parameters for each light spot
  const lightSpotParams = useMemo(
    () =>
      species.map(() => ({
        floatDuration: 5 + Math.random() * 6,
        dx1: -8 + Math.random() * 16,
        dy1: -10 + Math.random() * 20,
        dx2: -8 + Math.random() * 16,
        dy2: -10 + Math.random() * 20,
        dx3: -8 + Math.random() * 16,
        dy3: -10 + Math.random() * 20,
        dx4: -8 + Math.random() * 16,
        dy4: -10 + Math.random() * 20,
      })),
    [species]
  );

  // Generate falling leaves
  const leaves = useMemo(
    () =>
      Array.from({ length: 15 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 15,
        duration: 10 + Math.random() * 10,
        drift: -30 + Math.random() * 60,
        rotation: 180 + Math.random() * 360,
        size: 6 + Math.random() * 10,
        hue: 30 + Math.random() * 50,
      })),
    []
  );

  // Generate ambient particles (fireflies)
  const ambientParticles = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 3,
        duration: 4 + Math.random() * 8,
        px: -10 + Math.random() * 20,
        py: -10 + Math.random() * 20,
        opacity: 0.2 + Math.random() * 0.4,
        delay: Math.random() * 5,
      })),
    []
  );

  // Canvas for subtle fog/particle effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      life: number;
      maxLife: number;
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new fog particles
      if (particles.length < 50 && Math.random() < 0.1) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height * 0.5 + Math.random() * canvas.height * 0.5,
          vx: -0.2 + Math.random() * 0.4,
          vy: -0.1 - Math.random() * 0.2,
          size: 40 + Math.random() * 80,
          opacity: 0.01 + Math.random() * 0.02,
          life: 0,
          maxLife: 300 + Math.random() * 400,
        });
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const lifeRatio = p.life / p.maxLife;
        const alpha = lifeRatio < 0.2
          ? p.opacity * (lifeRatio / 0.2)
          : lifeRatio > 0.8
          ? p.opacity * ((1 - lifeRatio) / 0.2)
          : p.opacity;

        ctx.beginPath();
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(180, 200, 180, ${alpha})`);
        gradient.addColorStop(1, `rgba(180, 200, 180, 0)`);
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
        }
      }

      animFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, [isVisible]);

  return (
    <div className="absolute inset-0 forest-bg">
      {/* Fog Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Mountain silhouettes - back layer */}
      <svg className="mountain-layer z-[1]" style={{ height: '45%' }} viewBox="0 0 1440 500" preserveAspectRatio="none">
        <path
          d="M0,500 L0,350 Q120,200 240,300 Q360,180 480,280 Q600,150 720,250 Q840,120 960,230 Q1080,100 1200,220 Q1320,160 1440,280 L1440,500 Z"
          fill="rgba(25,35,22,0.7)"
        />
      </svg>

      {/* Mountain silhouettes - mid layer */}
      <svg className="mountain-layer z-[2]" style={{ height: '50%' }} viewBox="0 0 1440 500" preserveAspectRatio="none">
        <path
          d="M0,500 L0,380 Q100,280 200,340 Q350,220 500,320 Q600,240 720,300 Q850,200 960,290 Q1100,220 1200,300 Q1350,260 1440,320 L1440,500 Z"
          fill="rgba(35,50,30,0.6)"
        />
      </svg>

      {/* Tree silhouettes - front layer */}
      <svg className="mountain-layer z-[3]" style={{ height: '60%' }} viewBox="0 0 1440 600" preserveAspectRatio="none">
        {/* Trees */}
        <g className="tree-sway" style={{ animationDelay: '0s' }}>
          <path d="M80,600 L80,380 Q70,360 60,340 Q80,350 90,320 Q85,340 100,330 Q90,350 95,340 L100,380 Z" fill="rgba(20,30,18,0.8)" />
        </g>
        <g className="tree-sway" style={{ animationDelay: '1s' }}>
          <path d="M250,600 L250,350 Q235,320 220,290 Q250,310 260,270 Q255,300 275,280 Q265,310 270,300 L280,350 Z" fill="rgba(18,28,16,0.9)" />
        </g>
        <g className="tree-sway" style={{ animationDelay: '2s' }}>
          <path d="M500,600 L500,320 Q480,280 460,250 Q500,280 510,230 Q505,270 530,240 Q520,280 525,260 L540,320 Z" fill="rgba(22,32,18,0.85)" />
        </g>
        <g className="tree-sway" style={{ animationDelay: '3s' }}>
          <path d="M780,600 L780,340 Q765,310 750,280 Q780,300 790,260 Q785,290 800,270 Q793,300 798,290 L810,340 Z" fill="rgba(20,30,16,0.9)" />
        </g>
        <g className="tree-sway" style={{ animationDelay: '4s' }}>
          <path d="M1050,600 L1050,360 Q1035,330 1020,300 Q1050,325 1060,280 Q1055,315 1075,290 Q1068,325 1072,310 L1085,360 Z" fill="rgba(18,28,14,0.85)" />
        </g>
        <g className="tree-sway" style={{ animationDelay: '5s' }}>
          <path d="M1300,600 L1300,350 Q1285,320 1270,290 Q1300,315 1310,270 Q1305,305 1325,280 Q1318,315 1322,300 L1335,350 Z" fill="rgba(20,28,16,0.8)" />
        </g>
        {/* Ground */}
        <path
          d="M0,600 L0,480 Q120,460 240,475 Q400,455 560,470 Q720,450 880,465 Q1040,448 1200,462 Q1360,455 1440,470 L1440,600 Z"
          fill="rgba(30,42,26,0.9)"
        />
      </svg>

      {/* Fog layers */}
      <div className="fog-layer fog-drift-1 z-[4]" style={{ top: '30%', height: '40%' }}>
        <svg width="100%" height="100%" viewBox="0 0 2880 400" preserveAspectRatio="none">
          <ellipse cx="400" cy="200" rx="500" ry="120" fill="rgba(180,200,180,0.04)" />
          <ellipse cx="1200" cy="150" rx="600" ry="100" fill="rgba(180,200,180,0.03)" />
          <ellipse cx="2200" cy="180" rx="550" ry="110" fill="rgba(180,200,180,0.04)" />
          <ellipse cx="3200" cy="200" rx="500" ry="120" fill="rgba(180,200,180,0.04)" />
        </svg>
      </div>

      <div className="fog-layer fog-drift-2 z-[5]" style={{ top: '50%', height: '30%' }}>
        <svg width="100%" height="100%" viewBox="0 0 2880 300" preserveAspectRatio="none">
          <ellipse cx="300" cy="150" rx="450" ry="90" fill="rgba(180,200,180,0.05)" />
          <ellipse cx="1100" cy="120" rx="500" ry="80" fill="rgba(180,200,180,0.04)" />
          <ellipse cx="2000" cy="140" rx="480" ry="95" fill="rgba(180,200,180,0.05)" />
          <ellipse cx="2900" cy="150" rx="450" ry="90" fill="rgba(180,200,180,0.05)" />
        </svg>
      </div>

      {/* Falling leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="leaf z-[6]"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            '--fall-duration': `${leaf.duration}s`,
            '--leaf-drift': `${leaf.drift}px`,
            '--leaf-rotation': `${leaf.rotation}deg`,
          } as React.CSSProperties}
        >
          <svg width={leaf.size} height={leaf.size * 0.7} viewBox="0 0 20 14">
            <path
              d="M10,0 Q15,4 14,8 Q12,12 10,14 Q8,12 6,8 Q5,4 10,0 Z"
              fill={`hsl(${leaf.hue}, 30%, 35%)`}
              opacity="0.6"
            />
            <line x1="10" y1="1" x2="10" y2="13" stroke={`hsl(${leaf.hue}, 25%, 40%)`} strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>
      ))}

      {/* Ambient particles (small fireflies) */}
      {ambientParticles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle z-[7]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(232,200,64,0.8) 0%, rgba(232,200,64,0) 70%)`,
            '--particle-duration': `${p.duration}s`,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
            '--particle-opacity': p.opacity,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Light Spots (interactive) */}
      {species.map((sp, idx) => {
        const params = lightSpotParams[idx];
        const isUnlocked = unlockedIds.has(sp.id);

        return (
          <div
            key={sp.id}
            className={`absolute z-[8] ${isUnlocked ? 'pointer-events-none' : ''}`}
            style={{
              left: `${sp.position.x}%`,
              top: `${sp.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`light-spot light-spot-float ${isUnlocked ? 'light-spot-bloom' : ''}`}
              style={{
                width: `${sp.lightSize * 2}px`,
                height: `${sp.lightSize * 2}px`,
                '--float-duration': `${params.floatDuration}s`,
                '--dx1': `${params.dx1}px`,
                '--dy1': `${params.dy1}px`,
                '--dx2': `${params.dx2}px`,
                '--dy2': `${params.dy2}px`,
                '--dx3': `${params.dx3}px`,
                '--dy3': `${params.dy3}px`,
                '--dx4': `${params.dx4}px`,
                '--dy4': `${params.dy4}px`,
              } as React.CSSProperties}
              onClick={(e) => {
                e.stopPropagation();
                if (!isUnlocked) onSpeciesClick(sp);
              }}
            >
              <div className="light-spot-glow" style={{ animationDelay: `${idx * 0.5}s` }} />
              <div className="light-spot-core" />
              {/* Unlocked indicator */}
              {isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs opacity-60">{sp.emoji}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Foreground vegetation blur */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[9] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(26,35,24,0.9) 0%, rgba(26,35,24,0.4) 40%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[10] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(10,15,10,0.6) 100%)',
        }}
      />
    </div>
  );
}
