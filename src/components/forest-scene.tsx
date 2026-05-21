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

  // Light spot movement params
  const spotParams = useMemo(
    () =>
      species.map(() => ({
        floatDuration: 4 + Math.random() * 6,
        dx1: -8 + Math.random() * 16,
        dy1: -10 + Math.random() * 8,
        dx2: -8 + Math.random() * 16,
        dy2: -10 + Math.random() * 8,
        dx3: -8 + Math.random() * 16,
        dy3: -10 + Math.random() * 8,
        dx4: -8 + Math.random() * 16,
        dy4: -10 + Math.random() * 8,
        breathDuration: 3 + Math.random() * 4,
        breathDelay: Math.random() * 3,
      })),
    [species]
  );

  // Falling leaves
  const leaves = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 10,
        size: 8 + Math.random() * 12,
        sway: 20 + Math.random() * 30,
        hue: Math.random() > 0.5 ? '#C8A040' : '#8B7355',
      })),
    []
  );

  // Fireflies
  const fireflies = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: 5 + Math.random() * 90,
        top: 10 + Math.random() * 75,
        size: 2 + Math.random() * 3,
        duration: 3 + Math.random() * 5,
        delay: Math.random() * 6,
        dx: -15 + Math.random() * 30,
        dy: -10 + Math.random() * 20,
      })),
    []
  );

  // Light rays (god rays through canopy)
  const lightRays = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        id: i,
        left: 10 + i * 18 + Math.random() * 10,
        width: 40 + Math.random() * 80,
        opacity: 0.04 + Math.random() * 0.06,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 5,
      })),
    []
  );

  // Fog particles
  const fogParticles = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        top: 30 + Math.random() * 50,
        width: 200 + Math.random() * 400,
        height: 40 + Math.random() * 80,
        duration: 20 + Math.random() * 25,
        delay: Math.random() * 15,
        opacity: 0.03 + Math.random() * 0.04,
      })),
    []
  );

  // Canvas for fog/mist effect
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
      time += 0.002;

      // Warm golden fog layers
      for (let i = 0; i < 6; i++) {
        const x = Math.sin(time * 0.5 + i * 1.2) * canvas.width * 0.3 + canvas.width * 0.5;
        const y = canvas.height * (0.3 + i * 0.1) + Math.cos(time + i) * 30;
        const size = 200 + Math.sin(time + i * 0.8) * 60;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(200, 190, 140, 0.035)`);
        gradient.addColorStop(0.5, `rgba(180, 170, 120, 0.015)`);
        gradient.addColorStop(1, `rgba(160, 150, 100, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Green mist near ground
      for (let i = 0; i < 4; i++) {
        const x = Math.cos(time * 0.3 + i * 2) * canvas.width * 0.4 + canvas.width * 0.5;
        const y = canvas.height * 0.85 + Math.sin(time * 0.5 + i) * 20;
        const size = 300 + Math.sin(time + i) * 50;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        gradient.addColorStop(0, `rgba(140, 170, 100, 0.03)`);
        gradient.addColorStop(1, `rgba(100, 140, 80, 0)`);
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
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
      {/* Canvas for fog */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />

      {/* God rays through canopy */}
      {lightRays.map((ray) => (
        <div
          key={ray.id}
          className="absolute top-0 pointer-events-none z-[2]"
          style={{
            left: `${ray.left}%`,
            width: `${ray.width}px`,
            height: '100%',
            background: `linear-gradient(
              180deg,
              rgba(232,200,64,${ray.opacity * 1.5}) 0%,
              rgba(200,180,80,${ray.opacity * 0.8}) 30%,
              rgba(180,160,60,${ray.opacity * 0.3}) 60%,
              transparent 100%
            )`,
            filter: 'blur(20px)',
            animation: `godRayPulse ${ray.duration}s ease-in-out ${ray.delay}s infinite alternate`,
            transform: 'skewX(-5deg)',
          }}
        />
      ))}

      {/* Far mountains - warm twilight silhouette */}
      <svg className="mountain-layer z-[1]" style={{ height: '45%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path
          d="M0,400 L0,280 Q60,240 120,260 Q200,220 300,250 Q380,200 480,230 Q560,180 680,210 Q780,170 880,200 Q960,160 1060,190 Q1160,150 1260,180 Q1340,170 1440,200 L1440,400 Z"
          fill="rgba(35,50,30,0.7)"
        />
      </svg>

      {/* Mid mountains with warm tones */}
      <svg className="mountain-layer z-[2]" style={{ height: '55%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path
          d="M0,400 L0,320 Q80,280 160,300 Q280,240 400,270 Q520,220 640,260 Q760,230 880,250 Q1000,210 1120,240 Q1240,220 1360,250 L1440,260 L1440,400 Z"
          fill="rgba(50,65,40,0.8)"
        />
      </svg>

      {/* Near foliage with warm brown-green tones */}
      <svg className="mountain-layer z-[3]" style={{ height: '65%' }} viewBox="0 0 1440 400" preserveAspectRatio="none">
        <path
          d="M0,400 L0,340 Q40,320 80,330 Q140,300 200,320 Q280,290 360,310 Q440,280 520,300 Q600,270 680,295 Q760,265 840,285 Q920,260 1000,280 Q1080,255 1160,275 Q1240,260 1320,280 Q1380,270 1440,290 L1440,400 Z"
          fill="rgba(62,74,53,0.9)"
        />
      </svg>

      {/* Ground with warm earth tone */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none"
        style={{
          height: '25%',
          background: 'linear-gradient(to top, rgba(80,65,40,0.95) 0%, rgba(62,74,53,0.6) 50%, transparent 100%)',
        }}
      />

      {/* Tree silhouettes on sides */}
      <svg className="absolute bottom-0 left-0 w-1/3 h-[70%] z-[4] pointer-events-none" viewBox="0 0 500 700" preserveAspectRatio="xMidYMax slice">
        {/* Left side trees */}
        <path d="M80,700 L80,200 Q60,180 70,160 Q50,150 65,130 Q45,120 60,100 L80,80 L100,100 Q115,120 95,130 Q110,150 90,160 Q100,180 80,200 Z" fill="rgba(25,35,20,0.8)" />
        <path d="M150,700 L150,280 Q130,260 140,240 Q120,230 135,210 L150,190 L165,210 Q180,230 160,240 Q170,260 150,280 Z" fill="rgba(30,42,25,0.7)" />
        <path d="M30,700 L30,320 Q15,300 25,280 Q10,270 20,250 L30,230 L40,250 Q50,270 35,280 Q45,300 30,320 Z" fill="rgba(20,30,18,0.6)" />
        {/* Branches */}
        <path d="M80,250 Q50,240 30,250" stroke="rgba(25,35,20,0.5)" strokeWidth="3" fill="none" />
        <path d="M80,300 Q110,285 140,295" stroke="rgba(25,35,20,0.4)" strokeWidth="2" fill="none" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-1/3 h-[70%] z-[4] pointer-events-none" viewBox="0 0 500 700" preserveAspectRatio="xMidYMax slice">
        {/* Right side trees */}
        <path d="M420,700 L420,220 Q400,200 410,180 Q390,170 405,150 L420,130 L435,150 Q450,170 430,180 Q440,200 420,220 Z" fill="rgba(25,35,20,0.8)" />
        <path d="M350,700 L350,300 Q335,280 345,260 Q330,250 340,230 L350,215 L360,230 Q370,250 355,260 Q365,280 350,300 Z" fill="rgba(30,42,25,0.7)" />
        <path d="M470,700 L470,350 Q460,335 465,320 Q455,310 462,295 L470,280 L478,295 Q485,310 475,320 Q480,335 470,350 Z" fill="rgba(20,30,18,0.6)" />
      </svg>

      {/* Warm ambient glow from top */}
      <div
        className="absolute top-0 left-0 right-0 z-[5] pointer-events-none"
        style={{
          height: '40%',
          background: 'linear-gradient(to bottom, rgba(200,180,80,0.06) 0%, rgba(180,160,60,0.02) 50%, transparent 100%)',
        }}
      />

      {/* Fog particles drifting */}
      {fogParticles.map((fog) => (
        <div
          key={fog.id}
          className="absolute pointer-events-none z-[6]"
          style={{
            top: `${fog.top}%`,
            left: '-20%',
            width: `${fog.width}px`,
            height: `${fog.height}px`,
            background: `radial-gradient(ellipse, rgba(200,190,150,${fog.opacity}) 0%, transparent 70%)`,
            filter: 'blur(30px)',
            animation: `fogDrift ${fog.duration}s linear ${fog.delay}s infinite`,
          }}
        />
      ))}

      {/* Fireflies */}
      {fireflies.map((ff) => (
        <div
          key={ff.id}
          className="absolute pointer-events-none z-[7]"
          style={{
            left: `${ff.left}%`,
            top: `${ff.top}%`,
            width: `${ff.size}px`,
            height: `${ff.size}px`,
            background: `radial-gradient(circle, rgba(232,200,64,0.9) 0%, rgba(232,200,64,0.3) 40%, transparent 70%)`,
            borderRadius: '50%',
            animation: `fireflyFloat ${ff.duration}s ease-in-out ${ff.delay}s infinite, fireflyGlow 2s ease-in-out ${ff.delay}s infinite alternate`,
            '--ff-dx': `${ff.dx}px`,
            '--ff-dy': `${ff.dy}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Falling leaves */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none z-[8]"
          style={{
            left: `${leaf.left}%`,
            top: '-20px',
            animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            '--leaf-sway': `${leaf.sway}px`,
          } as React.CSSProperties}
        >
          <svg width={leaf.size} height={leaf.size * 0.6} viewBox="0 0 20 12">
            <path
              d="M10,0 Q15,3 18,6 Q15,9 10,12 Q5,9 2,6 Q5,3 10,0 Z"
              fill={leaf.hue}
              opacity={0.5}
            />
            <line x1="10" y1="1" x2="10" y2="11" stroke={leaf.hue} strokeWidth="0.5" opacity={0.3} />
          </svg>
        </div>
      ))}

      {/* Light spots (interactive) — always visible, discovered ones are dimmer */}
      {species.map((sp, idx) => {
        const params = spotParams[idx];
        const isDiscovered = unlockedIds.has(sp.id);

        return (
          <div
            key={sp.id}
            className="absolute z-[9]"
            style={{
              left: `${sp.position.x}%`,
              top: `${sp.position.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Outer glow halo — always present */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                inset: `-${sp.lightSize * 0.6}px`,
                background: `radial-gradient(circle, rgba(232,200,64,${isDiscovered ? 0.08 : 0.15}) 0%, rgba(184,212,48,${isDiscovered ? 0.03 : 0.06}) 40%, transparent 70%)`,
                animation: `haloBreath ${params.breathDuration}s ease-in-out ${params.breathDelay}s infinite`,
              }}
            />
            <div
              className={`light-spot light-spot-float ${isDiscovered ? 'light-spot-discovered' : ''}`}
              style={{
                width: `${sp.lightSize}px`,
                height: `${sp.lightSize}px`,
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
              {/* Core glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: isDiscovered
                    ? `radial-gradient(circle at 40% 40%, rgba(232,200,64,0.35) 0%, rgba(184,212,48,0.15) 40%, rgba(184,212,48,0.05) 70%, transparent 100%)`
                    : `radial-gradient(circle at 40% 40%, rgba(255,230,100,0.7) 0%, rgba(232,200,64,0.4) 30%, rgba(184,212,48,0.15) 60%, transparent 100%)`,
                  boxShadow: isDiscovered
                    ? `0 0 ${sp.lightSize * 0.5}px rgba(232,200,64,0.15)`
                    : `0 0 ${sp.lightSize}px rgba(232,200,64,0.3), 0 0 ${sp.lightSize * 2}px rgba(184,212,48,0.15)`,
                }}
              />
              {/* Specular highlight */}
              <div
                className="absolute rounded-full"
                style={{
                  top: '15%',
                  left: '25%',
                  width: '30%',
                  height: '25%',
                  background: `radial-gradient(ellipse, rgba(255,255,220,${isDiscovered ? 0.2 : 0.6}) 0%, transparent 70%)`,
                }}
              />
              {/* Discovered: emoji indicator */}
              {isDiscovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm opacity-50">{sp.emoji}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Foreground ground mist */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[10] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(50,65,40,0.6) 0%, rgba(50,65,40,0.2) 50%, transparent 100%)',
        }}
      />
    </div>
  );
}
