'use client';

import { useMemo, useEffect, useRef, useState, useCallback } from 'react';
import type { Species } from '@/data/species';

interface FloatingSpot {
  id: string;
  species: Species;
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  phase: number;
  breathPhase: number;
  parallaxFactor: number;
  emoji: string;
  born: number;
  opacity: number;
}

interface ForestSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  mousePos: { x: number; y: number };
  burstingId: string | null;
}

export function ForestScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  mousePos,
  burstingId,
}: ForestSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const spotsRef = useRef<FloatingSpot[]>([]);
  const [renderTick, setRenderTick] = useState(0);

  // Initialize floating spots
  useEffect(() => {
    const spots: FloatingSpot[] = species.map((sp, i) => ({
      id: sp.id,
      species: sp,
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      size: 24 + Math.random() * 28,
      vx: (Math.random() - 0.5) * 0.04,
      vy: (Math.random() - 0.5) * 0.03,
      phase: Math.random() * Math.PI * 2,
      breathPhase: Math.random() * Math.PI * 2,
      parallaxFactor: 0.4 + Math.random() * 0.6,
      emoji: sp.emoji,
      born: Date.now() - Math.random() * 10000,
      opacity: 1,
    }));
    spotsRef.current = spots;
    setRenderTick(t => t + 1);
  }, [species]);

  // Animate floating spots - free wandering like fireflies
  useEffect(() => {
    let lastTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      spotsRef.current.forEach(spot => {
        // Wander: slowly change direction randomly
        spot.phase += dt * (0.3 + Math.abs(spot.vx) * 5);
        spot.vx += Math.sin(spot.phase) * 0.008;
        spot.vy += Math.cos(spot.phase * 0.7) * 0.006;

        // Dampen velocity
        spot.vx *= 0.995;
        spot.vy *= 0.995;

        // Clamp speed
        const speed = Math.sqrt(spot.vx * spot.vx + spot.vy * spot.vy);
        const maxSpeed = 0.06;
        if (speed > maxSpeed) {
          spot.vx = (spot.vx / speed) * maxSpeed;
          spot.vy = (spot.vy / speed) * maxSpeed;
        }

        // Move
        spot.x += spot.vx * dt * 60;
        spot.y += spot.vy * dt * 60;

        // Bounce off edges softly
        if (spot.x < 3) { spot.vx += 0.02; spot.x = 3; }
        if (spot.x > 95) { spot.vx -= 0.02; spot.x = 95; }
        if (spot.y < 5) { spot.vy += 0.02; spot.y = 5; }
        if (spot.y > 85) { spot.vy -= 0.02; spot.y = 85; }

        // Breath phase
        spot.breathPhase += dt * 1.2;
      });

      setRenderTick(t => t + 1);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Pre-generate leaves
  const leaves = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
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

  // Pre-generate fireflies (decorative, non-interactive)
  const fireflies = useMemo(() => {
    return Array.from({ length: 45 }, (_, i) => ({
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

    const fogParticles = Array.from({ length: 10 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: canvas.height * (0.3 + Math.random() * 0.5),
      radius: 150 + Math.random() * 300,
      speed: 0.12 + Math.random() * 0.25,
      opacity: 0.018 + Math.random() * 0.025,
      drift: 0.06 + Math.random() * 0.12,
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

  const handleClick = useCallback((spot: FloatingSpot) => {
    onSpeciesClick(spot.species);
  }, [onSpeciesClick]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient - warm, alive forest */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 70% 25%, rgba(232,200,64,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 25% 55%, rgba(140,180,80,0.06) 0%, transparent 50%),
            radial-gradient(ellipse 50% 50% at 50% 80%, rgba(100,140,60,0.06) 0%, transparent 50%),
            linear-gradient(175deg, #1E3018 0%, #253A1E 15%, #2A4222 35%, #1F3518 55%, #1A2814 100%)
          `,
        }}
      />

      {/* God rays - warm golden light columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.8 }}>
        <div
          className="absolute"
          style={{
            top: '-20%', left: '10%', width: '18%', height: '130%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.1) 0%, rgba(232,200,64,0.04) 35%, transparent 75%)',
            transform: 'skewX(-10deg)',
            animation: 'godRaySway 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-15%', left: '35%', width: '22%', height: '120%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.08) 0%, rgba(200,180,60,0.025) 45%, transparent 80%)',
            transform: 'skewX(4deg)',
            animation: 'godRaySway 18s ease-in-out infinite reverse',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-10%', left: '60%', width: '16%', height: '110%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.07) 0%, rgba(200,180,60,0.02) 50%, transparent 78%)',
            transform: 'skewX(-6deg)',
            animation: 'godRaySway 12s ease-in-out infinite',
            animationDelay: '-4s',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-18%', left: '80%', width: '14%', height: '115%',
            background: 'linear-gradient(180deg, rgba(232,200,64,0.06) 0%, rgba(200,180,60,0.018) 40%, transparent 70%)',
            transform: 'skewX(8deg)',
            animation: 'godRaySway 16s ease-in-out infinite reverse',
            animationDelay: '-7s',
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

      {/* Ground gradient with moss */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #3E4E35 0%, #354A2D 25%, rgba(58,78,45,0.5) 55%, transparent 100%)',
        }}
      />

      {/* Large tree trunk silhouettes - left side */}
      <div className="absolute bottom-0 left-0 w-[22%] h-[80%] pointer-events-none" style={{
        background: 'linear-gradient(to top, #1A2614 0%, #1E2E18 40%, rgba(30,46,24,0.5) 70%, transparent 100%)',
        clipPath: 'polygon(0% 100%, 0% 20%, 8% 5%, 12% 15%, 18% 0%, 22% 10%, 30% 3%, 35% 12%, 42% 2%, 48% 8%, 55% 0%, 60% 10%, 68% 5%, 75% 15%, 82% 8%, 90% 18%, 100% 10%, 100% 100%)',
      }} />

      {/* Large tree trunk silhouettes - right side */}
      <div className="absolute bottom-0 right-0 w-[18%] h-[75%] pointer-events-none" style={{
        background: 'linear-gradient(to top, #1A2614 0%, #1E2E18 40%, rgba(30,46,24,0.5) 70%, transparent 100%)',
        clipPath: 'polygon(0% 100%, 0% 15%, 10% 5%, 18% 12%, 25% 0%, 32% 8%, 40% 2%, 50% 10%, 58% 0%, 65% 6%, 72% 12%, 80% 3%, 88% 10%, 95% 5%, 100% 12%, 100% 100%)',
      }} />

      {/* Tree branch from top-left */}
      <svg className="absolute top-0 left-0 w-[40%] h-[25%] pointer-events-none" viewBox="0 0 400 150" preserveAspectRatio="none">
        <path d="M0,0 Q50,30 80,50 Q120,70 160,65 Q200,60 230,75 Q260,85 290,80" 
          stroke="#1E2E18" strokeWidth="8" fill="none" opacity="0.6" />
        <path d="M80,50 Q100,40 110,55 Q130,50 140,65" 
          stroke="#1E2E18" strokeWidth="4" fill="none" opacity="0.5" />
        <path d="M160,65 Q175,55 185,68 Q200,62 210,72" 
          stroke="#1E2E18" strokeWidth="3" fill="none" opacity="0.4" />
      </svg>

      {/* Tree branch from top-right */}
      <svg className="absolute top-0 right-0 w-[35%] h-[20%] pointer-events-none" viewBox="0 0 350 120" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)' }}>
        <path d="M0,0 Q40,25 70,45 Q110,60 150,55 Q190,50 220,60 Q250,68 280,65" 
          stroke="#1E2E18" strokeWidth="7" fill="none" opacity="0.5" />
        <path d="M150,55 Q160,45 170,58 Q185,50 195,60" 
          stroke="#1E2E18" strokeWidth="3" fill="none" opacity="0.4" />
      </svg>

      {/* Undergrowth / fern silhouettes at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[15%] pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,120 L0,90 Q20,70 40,80 Q60,60 80,75 Q100,55 120,70 Q140,50 170,65 Q190,45 220,60 Q240,40 270,58 Q290,42 320,55 Q340,38 370,52 Q390,35 420,50 Q440,32 470,48 Q490,30 520,45 Q540,28 570,42 Q590,25 620,40 Q640,22 670,38 Q690,20 720,35 Q740,18 770,32 Q790,22 820,35 Q840,20 870,33 Q890,25 920,38 Q940,22 970,35 Q990,20 1020,33 Q1040,25 1070,38 Q1090,22 1120,35 Q1140,20 1170,32 Q1190,25 1220,38 Q1240,22 1270,35 Q1290,20 1320,33 Q1340,25 1370,38 Q1400,30 1440,35 L1440,120 Z"
          fill="#2A3D20" opacity="0.9" />
      </svg>

      {/* Fog Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[5]" />

      {/* Green ground fog */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-[6]"
        style={{
          background: 'linear-gradient(to top, rgba(100,140,60,0.07) 0%, rgba(80,120,40,0.035) 50%, transparent 100%)',
          animation: 'fogDrift 20s ease-in-out infinite',
        }}
      />

      {/* Decorative fireflies */}
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

      {/* Floating Light Spots (interactive, freely drifting) */}
      <div className="absolute inset-0 z-[8]">
        {spotsRef.current.map((spot) => {
          const isUnlocked = unlockedIds.has(spot.id);
          const isRecent = recentlyClicked.has(spot.id);
          const isDiscovered = isUnlocked && isRecent;
          const isBursting = burstingId === spot.id;

          // Mouse parallax offset
          const parallaxX = mousePos.x * spot.size * 0.3 * spot.parallaxFactor;
          const parallaxY = mousePos.y * spot.size * 0.25 * spot.parallaxFactor;

          // Breathing scale
          const breathScale = 1 + Math.sin(spot.breathPhase) * 0.08;

          return (
            <div
              key={spot.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.size * 2}px`,
                height: `${spot.size * 2}px`,
                transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${isBursting ? 1.3 : isDiscovered ? 0.7 * breathScale : breathScale})`,
                transition: isBursting ? 'transform 0.15s ease-out' : 'transform 0.6s ease-out, opacity 0.7s ease-out',
                opacity: isBursting ? 0 : isDiscovered ? 0.35 : 1,
                marginLeft: `-${spot.size}px`,
                marginTop: `-${spot.size}px`,
              }}
              onClick={() => handleClick(spot)}
            >
              {/* Outer glow */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: isDiscovered
                    ? `radial-gradient(circle, rgba(232,200,64,0.15) 0%, rgba(184,212,48,0.04) 50%, transparent 100%)`
                    : `radial-gradient(circle, rgba(232,200,64,0.5) 0%, rgba(184,212,48,0.2) 50%, transparent 100%)`,
                  boxShadow: isDiscovered
                    ? `0 0 ${spot.size * 0.6}px rgba(232,200,64,0.08)`
                    : `0 0 ${spot.size * 2}px rgba(232,200,64,0.2), 0 0 ${spot.size * 4}px rgba(184,212,48,0.08)`,
                }}
              />
              {/* Core bright spot */}
              <div
                className="absolute rounded-full"
                style={{
                  top: '30%', left: '30%', width: '40%', height: '40%',
                  background: isDiscovered
                    ? 'radial-gradient(circle, rgba(255,240,180,0.2) 0%, rgba(232,200,64,0.06) 100%)'
                    : 'radial-gradient(circle, rgba(255,240,180,0.85) 0%, rgba(232,200,64,0.35) 100%)',
                  boxShadow: isDiscovered
                    ? `0 0 ${spot.size * 0.2}px rgba(255,240,180,0.06)`
                    : `0 0 ${spot.size * 0.6}px rgba(255,240,180,0.45)`,
                }}
              />
              {/* Discovered indicator */}
              {isDiscovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs opacity-25">{spot.emoji}</span>
                </div>
              )}
              {/* Hover ring */}
              <div className="absolute inset-[-6px] rounded-full border border-[rgba(232,200,64,0)] group-hover:border-[rgba(232,200,64,0.3)] transition-all duration-300" />
            </div>
          );
        })}
      </div>

      {/* Burst fragments (when spot is clicked) */}
      {burstingId && (() => {
        const spot = spotsRef.current.find(s => s.id === burstingId);
        if (!spot) return null;
        const parallaxX = mousePos.x * spot.size * 0.3 * spot.parallaxFactor;
        const parallaxY = mousePos.y * spot.size * 0.25 * spot.parallaxFactor;
        const fragments = Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
          const distance = 30 + Math.random() * 50;
          return { angle, distance, size: 2 + Math.random() * 4, delay: Math.random() * 0.1 };
        });
        return (
          <div className="absolute inset-0 z-[9] pointer-events-none">
            {fragments.map((frag, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${spot.x}%`,
                  top: `${spot.y}%`,
                  width: `${frag.size}px`,
                  height: `${frag.size}px`,
                  marginLeft: `-${frag.size / 2}px`,
                  marginTop: `-${frag.size / 2}px`,
                  background: 'rgba(255,240,180,0.8)',
                  boxShadow: `0 0 ${frag.size * 2}px rgba(232,200,64,0.5)`,
                  transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                  animation: `lightBurst ${0.5 + frag.delay}s ease-out forwards`,
                  '--burst-x': `${Math.cos(frag.angle) * frag.distance}px`,
                  '--burst-y': `${Math.sin(frag.angle) * frag.distance}px`,
                } as React.CSSProperties}
              />
            ))}
            {/* Expanding glow ring */}
            <div
              className="absolute rounded-full"
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.size * 2}px`,
                height: `${spot.size * 2}px`,
                marginLeft: `-${spot.size}px`,
                marginTop: `-${spot.size}px`,
                border: '2px solid rgba(232,200,64,0.4)',
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                animation: 'glowRingExpand 0.6s ease-out forwards',
              }}
            />
          </div>
        );
      })()}

      {/* Falling leaves */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
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
              opacity: 0.3,
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
      <div className="absolute inset-0 pointer-events-none z-[11]"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(20,30,15,0.35) 100%)' }}
      />
    </div>
  );
}
