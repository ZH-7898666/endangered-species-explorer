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

  // Bubble movement params
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
        breathDuration: 3 + Math.random() * 4,
        breathDelay: Math.random() * 3,
      })),
    [species]
  );

  // Water ripples
  const ripples = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        top: 10 + Math.random() * 80,
        size: 30 + Math.random() * 60,
        delay: Math.random() * 4,
      })),
    []
  );

  // Fish shadows
  const fishShadows = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 15 + Math.random() * 60,
        size: 15 + Math.random() * 25,
        duration: 15 + Math.random() * 15,
        delay: Math.random() * 10,
        opacity: 0.08 + Math.random() * 0.12,
        isRight: Math.random() > 0.5,
      })),
    []
  );

  // Bioluminescent particles
  const bioLumi = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 3,
        duration: 4 + Math.random() * 8,
        delay: Math.random() * 6,
        px: -8 + Math.random() * 16,
        py: -5 + Math.random() * 10,
        hue: Math.random() > 0.6 ? 'cyan' : Math.random() > 0.3 ? 'blue' : 'purple',
      })),
    []
  );

  // Light beams from surface
  const lightBeams = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        id: i,
        left: 15 + i * 20 + Math.random() * 10,
        width: 60 + Math.random() * 100,
        opacity: 0.03 + Math.random() * 0.04,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 6,
      })),
    []
  );

  // Jellyfish-like floating elements
  const jellyfish = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        left: 10 + Math.random() * 80,
        top: 20 + Math.random() * 40,
        size: 20 + Math.random() * 30,
        duration: 10 + Math.random() * 12,
        delay: Math.random() * 8,
        opacity: 0.04 + Math.random() * 0.06,
      })),
    []
  );

  // Canvas for caustics & bioluminescence
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

      // Caustic light from above — brighter, bluer
      for (let i = 0; i < 16; i++) {
        const x = (Math.sin(time + i * 0.7) * 0.35 + 0.5) * canvas.width;
        const y = (Math.cos(time * 0.8 + i * 0.5) * 0.25 + 0.35) * canvas.height;
        const size = 100 + Math.sin(time + i) * 50;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(100, 180, 220, 0.04)`);
        gradient.addColorStop(0.5, `rgba(80, 140, 200, 0.02)`);
        gradient.addColorStop(1, `rgba(60, 120, 180, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bioluminescent blue-purple glows
      for (let i = 0; i < 8; i++) {
        const x = (Math.cos(time * 0.4 + i * 1.5) * 0.4 + 0.5) * canvas.width;
        const y = (Math.sin(time * 0.3 + i * 0.9) * 0.35 + 0.55) * canvas.height;
        const size = 60 + Math.sin(time * 0.8 + i) * 25;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(130, 100, 200, 0.04)`);
        gradient.addColorStop(0.5, `rgba(100, 80, 180, 0.02)`);
        gradient.addColorStop(1, `rgba(80, 60, 160, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Current lines — subtle blue
      ctx.strokeStyle = 'rgba(140, 190, 230, 0.02)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 6; i++) {
        const y = (0.15 + i * 0.12) * canvas.height + Math.sin(time + i) * 20;
        ctx.beginPath();
        ctx.moveTo(0, y);
        for (let x = 0; x < canvas.width; x += 15) {
          ctx.lineTo(x, y + Math.sin((x / canvas.width) * Math.PI * 3 + time + i * 0.7) * 12);
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
      {/* Canvas for caustics & bioluminescence */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* Light beams from water surface */}
      {lightBeams.map((beam) => (
        <div
          key={beam.id}
          className="absolute top-0 pointer-events-none z-[2]"
          style={{
            left: `${beam.left}%`,
            width: `${beam.width}px`,
            height: '75%',
            background: `linear-gradient(
              180deg,
              rgba(140,200,240,${beam.opacity * 2}) 0%,
              rgba(100,170,220,${beam.opacity * 1.2}) 30%,
              rgba(80,140,200,${beam.opacity * 0.5}) 60%,
              transparent 100%
            )`,
            filter: 'blur(25px)',
            animation: `lightBeamPulse ${beam.duration}s ease-in-out ${beam.delay}s infinite alternate`,
          }}
        />
      ))}

      {/* Top surface shimmer — lighter, more visible */}
      <div
        className="absolute top-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: '20%',
          background: 'linear-gradient(to bottom, rgba(140,200,240,0.08) 0%, rgba(100,170,220,0.03) 50%, transparent 100%)',
        }}
      />

      {/* Deep sea floor terrain — slightly lighter */}
      <svg className="mountain-layer z-[4]" style={{ height: '30%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path
          d="M0,400 L0,340 Q80,300 160,320 Q280,280 400,310 Q520,260 640,300 Q760,270 880,290 Q1000,250 1120,280 Q1240,260 1360,290 Q1400,300 1440,310 L1440,400 Z"
          fill="rgba(20,35,60,0.9)"
        />
      </svg>

      {/* Coral formations with bioluminescent hint */}
      <svg className="coral-pattern z-[5]" style={{ height: '22%' }} viewBox="0 0 1440 300" preserveAspectRatio="none">
        <path d="M100,300 Q95,250 105,220 Q110,200 100,180 Q115,195 120,170 Q118,200 130,190 Q125,220 120,250 Q115,270 100,300 Z" fill="rgba(107,91,141,0.3)" />
        <path d="M300,300 Q290,260 310,230 Q315,210 305,190 Q320,205 325,185 Q322,210 335,200 Q330,230 325,260 Q315,280 300,300 Z" fill="rgba(120,100,160,0.25)" />
        <path d="M600,300 Q595,270 605,245 Q610,225 600,210 Q615,220 618,205 Q616,225 625,218 Q622,240 618,265 Q612,280 600,300 Z" fill="rgba(91,107,131,0.3)" />
        <path d="M900,300 Q890,255 910,225 Q915,200 905,185 Q920,195 925,175 Q922,200 935,190 Q930,220 925,255 Q918,275 900,300 Z" fill="rgba(120,100,160,0.25)" />
        <path d="M1200,300 Q1195,265 1205,240 Q1210,220 1200,205 Q1215,215 1218,200 Q1216,220 1225,213 Q1222,235 1218,260 Q1212,280 1200,300 Z" fill="rgba(91,107,131,0.3)" />
        {/* Sea floor */}
        <path
          d="M0,300 L0,280 Q120,270 240,275 Q400,265 560,272 Q720,260 880,268 Q1040,262 1200,270 Q1360,265 1440,275 L1440,300 Z"
          fill="rgba(25,40,65,0.7)"
        />
      </svg>

      {/* Water current layers — more visible */}
      <div className="water-current z-[6]" style={{ top: '20%', height: '60%' }}>
        <svg width="100%" height="100%" viewBox="0 0 2880 600" preserveAspectRatio="none">
          <path d="M0,100 Q200,80 400,100 Q600,120 800,90 Q1000,70 1200,100 Q1400,130 1600,95 Q1800,75 2000,105 Q2200,125 2400,90 Q2600,70 2880,100" stroke="rgba(140,190,230,0.06)" fill="none" strokeWidth="40" />
          <path d="M0,250 Q200,230 400,250 Q600,270 800,240 Q1000,220 1200,250 Q1400,280 1600,245 Q1800,225 2000,255 Q2200,275 2400,240 Q2600,220 2880,250" stroke="rgba(120,100,180,0.05)" fill="none" strokeWidth="30" />
          <path d="M0,400 Q200,380 400,400 Q600,420 800,390 Q1000,370 1200,400 Q1400,430 1600,395 Q1800,375 2000,405 Q2200,425 2400,390 Q2600,370 2880,400" stroke="rgba(140,190,230,0.04)" fill="none" strokeWidth="25" />
        </svg>
      </div>

      {/* Water ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="water-ripple z-[7]"
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
          className="fish-shadow z-[8]"
          style={{
            top: `${f.top}%`,
            '--swim-duration': `${f.duration}s`,
            animationDelay: `${f.delay}s`,
            opacity: f.opacity,
            transform: f.isRight ? 'scaleX(-1)' : undefined,
          } as React.CSSProperties}
        >
          <svg width={f.size} height={f.size * 0.5} viewBox="0 0 40 20">
            <path
              d="M35,10 Q28,2 18,4 Q8,6 5,10 Q8,14 18,16 Q28,18 35,10 Z M5,10 L0,4 L0,16 Z"
              fill="rgba(140,190,230,0.5)"
            />
          </svg>
        </div>
      ))}

      {/* Bioluminescent particles */}
      {bioLumi.map((p) => {
        const colors: Record<string, { core: string; glow: string }> = {
          cyan: { core: 'rgba(0,220,240,0.7)', glow: 'rgba(0,200,230,0.3)' },
          blue: { core: 'rgba(80,140,240,0.7)', glow: 'rgba(60,120,220,0.3)' },
          purple: { core: 'rgba(160,100,240,0.6)', glow: 'rgba(140,80,220,0.25)' },
        };
        const color = colors[p.hue];

        return (
          <div
            key={p.id}
            className="ambient-particle z-[9]"
            style={{
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `radial-gradient(circle, ${color.core} 0%, ${color.glow} 40%, transparent 70%)`,
              '--particle-duration': `${p.duration}s`,
              '--px': `${p.px}px`,
              '--py': `${p.py}px`,
              '--particle-opacity': 0.6 + Math.random() * 0.4,
              animationDelay: `${p.delay}s`,
            } as React.CSSProperties}
          />
        );
      })}

      {/* Jellyfish-like floating elements */}
      {jellyfish.map((j) => (
        <div
          key={j.id}
          className="absolute pointer-events-none z-[9]"
          style={{
            left: `${j.left}%`,
            top: `${j.top}%`,
            width: `${j.size}px`,
            height: `${j.size * 1.5}px`,
            animation: `jellyfishFloat ${j.duration}s ease-in-out ${j.delay}s infinite`,
          }}
        >
          {/* Dome */}
          <div
            className="w-full rounded-t-full"
            style={{
              height: '40%',
              background: `radial-gradient(ellipse at 50% 80%, rgba(140,120,220,${j.opacity * 1.5}), rgba(100,140,200,${j.opacity}), transparent)`,
              borderTop: '1px solid rgba(140,180,240,0.08)',
            }}
          />
          {/* Tentacles */}
          <svg className="w-full" style={{ height: '60%' }} viewBox="0 0 40 30">
            <path d="M8,0 Q6,10 10,15 Q8,20 12,28" stroke={`rgba(140,180,240,${j.opacity * 0.8})`} strokeWidth="0.5" fill="none" />
            <path d="M16,0 Q14,12 18,18 Q16,22 20,28" stroke={`rgba(130,120,220,${j.opacity * 0.7})`} strokeWidth="0.5" fill="none" />
            <path d="M24,0 Q22,10 26,16 Q24,22 28,28" stroke={`rgba(140,180,240,${j.opacity * 0.8})`} strokeWidth="0.5" fill="none" />
            <path d="M32,0 Q30,12 34,18 Q32,22 36,28" stroke={`rgba(130,120,220,${j.opacity * 0.7})`} strokeWidth="0.5" fill="none" />
          </svg>
        </div>
      ))}

      {/* Bubbles (interactive) — always visible, discovered ones are dimmer */}
      {species.map((sp, idx) => {
        const params = bubbleParams[idx];
        const isDiscovered = unlockedIds.has(sp.id);

        return (
          <div
            key={sp.id}
            className="absolute z-[10]"
            style={{
              left: `${sp.position.x}%`,
              top: `${sp.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Outer glow halo */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: `-${sp.lightSize * 0.5}px`,
                background: `radial-gradient(circle, rgba(140,200,240,${isDiscovered ? 0.06 : 0.12}) 0%, rgba(100,160,220,${isDiscovered ? 0.02 : 0.05}) 40%, transparent 70%)`,
                animation: `haloBreath ${params.breathDuration}s ease-in-out ${params.breathDelay}s infinite`,
              }}
            />
            <div
              className={`bubble bubble-float ${isDiscovered ? 'bubble-discovered' : ''}`}
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
                onSpeciesClick(sp);
              }}
            >
              <div
                className="bubble-body"
                style={{
                  background: isDiscovered
                    ? `radial-gradient(circle at 35% 35%, rgba(184,216,232,0.15) 0%, rgba(140,190,220,0.08) 40%, rgba(100,160,200,0.03) 70%, transparent 100%)`
                    : `radial-gradient(circle at 35% 35%, rgba(224,240,255,0.25) 0%, rgba(184,216,232,0.15) 40%, rgba(140,190,220,0.06) 70%, transparent 100%)`,
                  boxShadow: isDiscovered
                    ? `0 0 ${sp.lightSize}px rgba(140,200,240,0.08), inset 0 0 ${sp.lightSize * 0.3}px rgba(184,216,232,0.05)`
                    : `0 0 ${sp.lightSize * 1.5}px rgba(140,200,240,0.15), 0 0 ${sp.lightSize * 3}px rgba(100,160,220,0.06), inset 0 0 ${sp.lightSize * 0.5}px rgba(224,240,255,0.08)`,
                }}
              />
              <div
                className="bubble-highlight"
                style={{
                  opacity: isDiscovered ? 0.3 : 0.7,
                }}
              />
              {/* Inner shimmer */}
              <div
                className="absolute inset-[25%] rounded-full"
                style={{
                  background: `radial-gradient(circle at 40% 40%, rgba(200,230,255,${isDiscovered ? 0.06 : 0.15}) 0%, transparent 70%)`,
                }}
              />
              {/* Discovered indicator */}
              {isDiscovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm opacity-40">{sp.emoji}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Foreground water blur — lighter */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[11] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(15,30,55,0.7) 0%, rgba(15,30,55,0.2) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
