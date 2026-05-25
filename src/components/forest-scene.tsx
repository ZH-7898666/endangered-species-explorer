'use client';

import { useMemo, useEffect, useRef } from 'react';
import type { Species } from '@/data/species';

interface ForestSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  isVisible: boolean;
  mousePos: { x: number; y: number };
}

export function ForestScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  isVisible,
  mousePos,
}: ForestSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Pre-generate light spot positions and animation params
  const lightSpots = useMemo(() => {
    return species.map((sp, i) => {
      const cols = 4;
      const rows = Math.ceil(species.length / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellW = 100 / cols;
      const cellH = 80 / rows;
      const baseX = cellW * col + cellW * 0.2 + Math.random() * cellW * 0.6;
      const baseY = 10 + cellH * row + cellH * 0.15 + Math.random() * cellH * 0.5;
      return {
        species: sp,
        baseX,
        baseY,
        lightSize: 18 + Math.random() * 22,
        floatDuration: 4 + Math.random() * 5,
        floatDelay: Math.random() * -10,
        breathDuration: 3 + Math.random() * 3,
        breathDelay: Math.random() * -6,
        driftX: 6 + Math.random() * 12,
        driftY: 4 + Math.random() * 10,
        driftDuration: 7 + Math.random() * 6,
        driftDelay: Math.random() * -8,
        parallaxFactor: 0.3 + Math.random() * 0.7, // how much it follows mouse
        emoji: sp.emoji,
      };
    });
  }, [species]);

  // Pre-generate leaves
  const leaves = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      startY: -5 - Math.random() * 20,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * -20,
      size: 6 + Math.random() * 10,
      rotation: Math.random() * 360,
      rotationSpeed: 40 + Math.random() * 80,
      swayAmount: 30 + Math.random() * 60,
      color: ['#6B7B3A', '#8B7355', '#9B8B45', '#5A6A2A', '#7B6B4A'][Math.floor(Math.random() * 5)],
    }));
  }, []);

  // Pre-generate fireflies
  const fireflies = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1.5 + Math.random() * 3,
      duration: 3 + Math.random() * 5,
      delay: Math.random() * -8,
      blinkDuration: 1.5 + Math.random() * 3,
      blinkDelay: Math.random() * -4,
      driftX: 5 + Math.random() * 15,
      driftY: 3 + Math.random() * 10,
      parallaxFactor: 0.1 + Math.random() * 0.3,
    }));
  }, []);

  // Fog Canvas Animation
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

    const fogParticles = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.4 + Math.random() * 0.5),
      radius: 120 + Math.random() * 250,
      speed: 0.15 + Math.random() * 0.3,
      opacity: 0.015 + Math.random() * 0.025,
      drift: 0.08 + Math.random() * 0.15,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      fogParticles.forEach((p) => {
        p.x += p.speed;
        p.y += Math.sin(Date.now() * 0.0003 + p.x * 0.001) * p.drift;
        if (p.x - p.radius > canvas.width) p.x = -p.radius;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(200, 190, 140, ${p.opacity})`);
        gradient.addColorStop(0.6, `rgba(200, 190, 140, ${p.opacity * 0.4})`);
        gradient.addColorStop(1, 'rgba(200, 190, 140, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient - warmer, more alive */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 70% 30%, rgba(232,200,64,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 30% 60%, rgba(140,180,80,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 100% 100% at 50% 100%, rgba(139,115,85,0.1) 0%, transparent 50%),
            linear-gradient(175deg, #1E3018 0%, #253A1E 20%, #2A4222 40%, #1E3018 70%, #1A2814 100%)
          `,
        }}
      />

      {/* God rays - warm golden light from above */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.7 }}>
        <div
          className="absolute"
          style={{
            top: '-20%', left: '15%', width: '25%', height: '120%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.08) 0%, rgba(232,200,64,0.03) 40%, transparent 80%)',
            transform: 'skewX(-8deg)',
            animation: 'godRaySway 12s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-15%', left: '55%', width: '20%', height: '110%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.06) 0%, rgba(200,180,60,0.02) 50%, transparent 80%)',
            transform: 'skewX(5deg)',
            animation: 'godRaySway 15s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-10%', left: '75%', width: '15%', height: '100%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.05) 0%, rgba(200,180,60,0.015) 50%, transparent 75%)',
            transform: 'skewX(-3deg)',
            animation: 'godRaySway 10s ease-in-out infinite',
            animationDelay: '-3s',
          }}
        />
      </div>

      {/* Far mountain silhouettes */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[60%] pointer-events-none" viewBox="0 0 1440 600" preserveAspectRatio="none">
        <path d="M0,600 L0,320 Q80,260 160,300 Q240,200 360,250 Q440,180 560,230 Q640,160 760,210 Q840,150 960,200 Q1040,140 1160,190 Q1240,130 1360,180 Q1400,160 1440,200 L1440,600 Z"
          fill="#1E2E18" opacity="0.7" />
        <path d="M0,600 L0,380 Q100,300 200,350 Q320,250 440,310 Q540,220 680,280 Q780,200 900,260 Q1000,190 1120,240 Q1220,180 1340,230 Q1400,210 1440,250 L1440,600 Z"
          fill="#23321E" opacity="0.85" />
        <path d="M0,600 L0,430 Q120,370 240,400 Q360,320 480,370 Q580,290 720,350 Q840,280 960,330 Q1060,270 1180,320 Q1280,260 1400,310 L1440,300 L1440,600 Z"
          fill="#2A3D20" />
        <path d="M0,600 L0,480 Q80,440 200,460 Q320,410 440,450 Q560,390 680,430 Q800,380 920,420 Q1040,370 1160,410 Q1280,360 1400,400 L1440,390 L1440,600 Z"
          fill="#304826" />
      </svg>

      {/* Ground gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #3E4E35 0%, #354A2D 30%, rgba(58,78,45,0.6) 60%, transparent 100%)',
        }}
      />

      {/* Side tree silhouettes */}
      <div className="absolute bottom-0 left-0 w-[18%] h-[70%] pointer-events-none" style={{
        background: 'linear-gradient(to top, #2A3D20 0%, rgba(42,61,32,0.6) 50%, transparent 100%)',
        clipPath: 'polygon(0% 100%, 0% 30%, 15% 10%, 30% 25%, 45% 5%, 55% 20%, 70% 8%, 80% 30%, 100% 15%, 100% 100%)',
      }} />
      <div className="absolute bottom-0 right-0 w-[15%] h-[65%] pointer-events-none" style={{
        background: 'linear-gradient(to top, #2A3D20 0%, rgba(42,61,32,0.5) 50%, transparent 100%)',
        clipPath: 'polygon(0% 100%, 0% 20%, 20% 8%, 35% 22%, 50% 5%, 65% 18%, 80% 10%, 100% 25%, 100% 100%)',
      }} />

      {/* Fog Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[5]" />

      {/* Green ground fog */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-[6]"
        style={{
          background: 'linear-gradient(to top, rgba(100,140,60,0.06) 0%, rgba(80,120,40,0.03) 50%, transparent 100%)',
          animation: 'fogDrift 20s ease-in-out infinite',
        }}
      />

      {/* Fireflies */}
      <div className="absolute inset-0 pointer-events-none z-[7]">
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="absolute rounded-full"
            style={{
              left: `${ff.x}%`,
              top: `${ff.y}%`,
              width: `${ff.size}px`,
              height: `${ff.size}px`,
              background: 'rgba(232,200,64,0.9)',
              boxShadow: `0 0 ${ff.size * 3}px rgba(232,200,64,0.5), 0 0 ${ff.size * 6}px rgba(232,200,64,0.2)`,
              animation: `fireflyFloat ${ff.duration}s ease-in-out ${ff.delay}s infinite, fireflyBlink ${ff.blinkDuration}s ease-in-out ${ff.blinkDelay}s infinite`,
              transform: `translate(${mousePos.x * ff.driftX * ff.parallaxFactor}px, ${mousePos.y * ff.driftY * ff.parallaxFactor}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
        ))}
      </div>

      {/* Light Spots (unlockable) */}
      <div className="absolute inset-0 z-[8]">
        {lightSpots.map((sp) => {
          const isUnlocked = unlockedIds.has(sp.species.id);
          const isRecent = recentlyClicked.has(sp.species.id);
          // Dimmed when recently clicked, full glow otherwise
          const isDiscovered = isUnlocked && isRecent;

          // Mouse parallax offset
          const parallaxX = mousePos.x * sp.driftX * sp.parallaxFactor;
          const parallaxY = mousePos.y * sp.driftY * sp.parallaxFactor;

          return (
            <div
              key={sp.species.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${sp.baseX}%`,
                top: `${sp.baseY}%`,
                zIndex: 8 + Math.round(sp.lightSize / 10),
                animation: `lightSpotDrift ${sp.driftDuration}s ease-in-out ${sp.driftDelay}s infinite`,
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                transition: 'transform 0.6s ease-out',
              }}
              onClick={() => onSpeciesClick(sp.species)}
            >
              <div
                className={`
                  relative rounded-full transition-all duration-700 ease-out
                  ${isDiscovered ? 'scale-75' : 'scale-100 hover:scale-110'}
                `}
                style={{
                  width: `${sp.lightSize * 2}px`,
                  height: `${sp.lightSize * 2}px`,
                  animation: `lightSpotFloat ${sp.floatDuration}s cubic-bezier(0.25,0.46,0.45,0.94) ${sp.floatDelay}s infinite, lightSpotBreath ${sp.breathDuration}s ease-in-out ${sp.breathDelay}s infinite`,
                }}
              >
                {/* Main glow */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-700"
                  style={{
                    background: isDiscovered
                      ? `radial-gradient(circle, rgba(232,200,64,0.2) 0%, rgba(184,212,48,0.06) 50%, transparent 100%)`
                      : `radial-gradient(circle, rgba(232,200,64,0.5) 0%, rgba(184,212,48,0.2) 50%, transparent 100%)`,
                    boxShadow: isDiscovered
                      ? `0 0 ${sp.lightSize * 0.8}px rgba(232,200,64,0.1)`
                      : `0 0 ${sp.lightSize * 2}px rgba(232,200,64,0.2), 0 0 ${sp.lightSize * 4}px rgba(184,212,48,0.08)`,
                  }}
                />
                {/* Core */}
                <div
                  className="absolute rounded-full transition-all duration-700"
                  style={{
                    top: '30%', left: '30%', width: '40%', height: '40%',
                    background: isDiscovered
                      ? 'radial-gradient(circle, rgba(255,240,180,0.25) 0%, rgba(232,200,64,0.08) 100%)'
                      : 'radial-gradient(circle, rgba(255,240,180,0.8) 0%, rgba(232,200,64,0.3) 100%)',
                    boxShadow: isDiscovered
                      ? `0 0 ${sp.lightSize * 0.3}px rgba(255,240,180,0.08)`
                      : `0 0 ${sp.lightSize * 0.6}px rgba(255,240,180,0.4)`,
                  }}
                />
                {/* Discovered indicator */}
                {isDiscovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs opacity-30">{sp.emoji}</span>
                  </div>
                )}
                {/* Hover ring */}
                <div className="absolute inset-[-4px] rounded-full border border-[rgba(232,200,64,0)] group-hover:border-[rgba(232,200,64,0.3)] transition-all duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Falling leaves */}
      <div className="absolute inset-0 pointer-events-none z-[9]">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute"
            style={{
              left: `${leaf.x}%`,
              top: `${leaf.startY}%`,
              width: `${leaf.size}px`,
              height: `${leaf.size * 1.4}px`,
              background: leaf.color,
              borderRadius: '50% 0 50% 0',
              opacity: 0.35,
              animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
            }}
          >
            <div
              className="w-full h-full"
              style={{
                animation: `leafSway ${leaf.swayAmount / 10}s ease-in-out ${leaf.delay}s infinite, leafRotate ${leaf.rotationSpeed / 10}s linear infinite`,
                transformOrigin: 'center center',
              }}
            />
          </div>
        ))}
      </div>

      {/* Top vignette */}
      <div className="absolute inset-0 pointer-events-none z-[10]"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(20,30,15,0.4) 100%)' }}
      />
    </div>
  );
}
