'use client';

import { useEffect, useRef, useMemo } from 'react';
import type { Species } from '@/data/species';

interface OceanSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  onSpeciesClick: (species: Species) => void;
  isVisible: boolean;
}

export function OceanScene({ species, unlockedIds, onSpeciesClick, isVisible }: OceanSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate random movement parameters for each bubble
  const bubbleParams = useMemo(
    () =>
      species.map(() => ({
        floatDuration: 6 + Math.random() * 8,
        dx1: -5 + Math.random() * 10,
        dy1: -8 + Math.random() * 4,
        dx2: -5 + Math.random() * 10,
        dy2: -8 + Math.random() * 4,
        dx3: -5 + Math.random() * 10,
        dy3: -8 + Math.random() * 4,
        dx4: -5 + Math.random() * 10,
        dy4: -8 + Math.random() * 4,
      })),
    [species]
  );

  // Generate water ripples
  const ripples = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        top: 10 + Math.random() * 80,
        size: 30 + Math.random() * 60,
        delay: Math.random() * 4,
      })),
    []
  );

  // Generate fish shadows
  const fishShadows = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        top: 15 + Math.random() * 60,
        size: 15 + Math.random() * 25,
        duration: 15 + Math.random() * 15,
        delay: Math.random() * 10,
        opacity: 0.06 + Math.random() * 0.08,
      })),
    []
  );

  // Ambient ocean particles
  const ambientParticles = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2,
        duration: 6 + Math.random() * 10,
        px: -5 + Math.random() * 10,
        py: -8 + Math.random() * 4,
        opacity: 0.15 + Math.random() * 0.3,
        delay: Math.random() * 5,
      })),
    []
  );

  // Canvas for water caustics / current effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisible) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrame: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.003;

      // Draw caustic light patterns
      for (let i = 0; i < 12; i++) {
        const x = (Math.sin(time + i * 0.7) * 0.3 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.8 + i * 0.5) * 0.3 + 0.5) * canvas.height;
        const size = 80 + Math.sin(time + i) * 40;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(120, 160, 200, 0.03)`);
        gradient.addColorStop(1, `rgba(120, 160, 200, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Subtle current lines
      ctx.strokeStyle = 'rgba(184, 216, 232, 0.015)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const y = (0.2 + i * 0.1) * canvas.height + Math.sin(time + i) * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 20) {
          ctx.lineTo(x, y + Math.sin((x / canvas.width) * Math.PI * 4 + time + i) * 15);
        }
        ctx.stroke();
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
    <div className="absolute inset-0 ocean-bg">
      {/* Canvas for caustics & current */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Deep sea floor terrain */}
      <svg className="mountain-layer z-[1]" style={{ height: '35%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path
          d="M0,400 L0,340 Q80,300 160,320 Q280,280 400,310 Q520,260 640,300 Q760,270 880,290 Q1000,250 1120,280 Q1240,260 1360,290 Q1400,300 1440,310 L1440,400 Z"
          fill="rgba(15,25,45,0.9)"
        />
      </svg>

      {/* Coral formations */}
      <svg className="coral-pattern z-[2]" style={{ height: '25%' }} viewBox="0 0 1440 300" preserveAspectRatio="none">
        {/* Coral shapes */}
        <path d="M100,300 Q95,250 105,220 Q110,200 100,180 Q115,195 120,170 Q118,200 130,190 Q125,220 120,250 Q115,270 100,300 Z" fill="rgba(107,91,141,0.3)" />
        <path d="M300,300 Q290,260 310,230 Q315,210 305,190 Q320,205 325,185 Q322,210 335,200 Q330,230 325,260 Q315,280 300,300 Z" fill="rgba(107,91,141,0.25)" />
        <path d="M600,300 Q595,270 605,245 Q610,225 600,210 Q615,220 618,205 Q616,225 625,218 Q622,240 618,265 Q612,280 600,300 Z" fill="rgba(91,107,131,0.3)" />
        <path d="M900,300 Q890,255 910,225 Q915,200 905,185 Q920,195 925,175 Q922,200 935,190 Q930,220 925,255 Q918,275 900,300 Z" fill="rgba(107,91,141,0.25)" />
        <path d="M1200,300 Q1195,265 1205,240 Q1210,220 1200,205 Q1215,215 1218,200 Q1216,220 1225,213 Q1222,235 1218,260 Q1212,280 1200,300 Z" fill="rgba(91,107,131,0.3)" />
        {/* Sea floor */}
        <path
          d="M0,300 L0,280 Q120,270 240,275 Q400,265 560,272 Q720,260 880,268 Q1040,262 1200,270 Q1360,265 1440,275 L1440,300 Z"
          fill="rgba(20,35,55,0.7)"
        />
      </svg>

      {/* Water current layers */}
      <div className="water-current z-[3]" style={{ top: '20%', height: '60%' }}>
        <svg width="100%" height="100%" viewBox="0 0 2880 600" preserveAspectRatio="none">
          <path d="M0,100 Q200,80 400,100 Q600,120 800,90 Q1000,70 1200,100 Q1400,130 1600,95 Q1800,75 2000,105 Q2200,125 2400,90 Q2600,70 2880,100" stroke="rgba(184,216,232,0.06)" fill="none" strokeWidth="40" />
          <path d="M0,250 Q200,230 400,250 Q600,270 800,240 Q1000,220 1200,250 Q1400,280 1600,245 Q1800,225 2000,255 Q2200,275 2400,240 Q2600,220 2880,250" stroke="rgba(107,91,141,0.05)" fill="none" strokeWidth="30" />
          <path d="M0,400 Q200,380 400,400 Q600,420 800,390 Q1000,370 1200,400 Q1400,430 1600,395 Q1800,375 2000,405 Q2200,425 2400,390 Q2600,370 2880,400" stroke="rgba(184,216,232,0.04)" fill="none" strokeWidth="25" />
        </svg>
      </div>

      {/* Water ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="water-ripple z-[4]"
          style={{
            left: `${r.left}%`,
            top: `${r.top}%`,
            width: `${r.size}px`,
            height: `${r.size}px`,
            animationDelay: `${r.delay}s`,
          }}
        />
      ))}

      {/* Fish shadows */}
      {fishShadows.map((f) => (
        <div
          key={f.id}
          className="fish-shadow z-[5]"
          style={{
            top: `${f.top}%`,
            '--swim-duration': `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
          } as React.CSSProperties}
        >
          <svg width={f.size} height={f.size * 0.5} viewBox="0 0 40 20">
            <path
              d="M35,10 Q28,2 18,4 Q8,6 5,10 Q8,14 18,16 Q28,18 35,10 Z M5,10 L0,4 L0,16 Z"
              fill="rgba(184,216,232,0.6)"
            />
          </svg>
        </div>
      ))}

      {/* Ambient particles (small floating bits) */}
      {ambientParticles.map((p) => (
        <div
          key={p.id}
          className="ambient-particle z-[6]"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, rgba(184,216,232,0.6) 0%, rgba(184,216,232,0) 70%)`,
            '--particle-duration': `${p.duration}s`,
            '--px': `${p.px}px`,
            '--py': `${p.py}px`,
            '--particle-opacity': p.opacity,
            animationDelay: `${p.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Bubbles (interactive) */}
      {species.map((sp, idx) => {
        const params = bubbleParams[idx];
        const isUnlocked = unlockedIds.has(sp.id);

        return (
          <div
            key={sp.id}
            className={`absolute z-[7] ${isUnlocked ? 'pointer-events-none' : ''}`}
            style={{
              left: `${sp.position.x}%`,
              top: `${sp.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div
              className={`bubble bubble-float ${isUnlocked ? 'bubble-pop' : ''}`}
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
              <div className="bubble-body" />
              <div className="bubble-highlight" />
              {/* Inner glow */}
              <div
                className="absolute inset-[20%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 40%, rgba(184,216,232,0.15) 0%, transparent 70%)`,
                }}
              />
              {/* Unlocked indicator */}
              {isUnlocked && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs opacity-50">{sp.emoji}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Foreground water blur */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[8] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(10,22,40,0.8) 0%, rgba(10,22,40,0.3) 50%, transparent 100%)',
        }}
      />

      {/* Top water surface shimmer */}
      <div
        className="absolute top-0 left-0 right-0 h-32 z-[8] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(184,216,232,0.04) 0%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[9] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 35%, rgba(5,13,26,0.7) 100%)',
        }}
      />
    </div>
  );
}
