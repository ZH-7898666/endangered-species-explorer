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

interface AnimalSilhouette {
  id: number;
  type: 'deer' | 'owl' | 'squirrel';
  fromX: number;
  toX: number;
  y: number;
  duration: number;
  startTime: number;
  direction: number; // 1 or -1
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
  const [animals, setAnimals] = useState<AnimalSilhouette[]>([]);
  const [nightCycle, setNightCycle] = useState(0.5); // 0=dark, 1=bright

  // Initialize floating spots
  useEffect(() => {
    const spots: FloatingSpot[] = species.map((sp) => ({
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
    setRenderTick((t) => t + 1);
  }, [species]);

  // Animate floating spots - free wandering like fireflies
  useEffect(() => {
    let lastTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      spotsRef.current.forEach((spot) => {
        spot.phase += dt * (0.3 + Math.abs(spot.vx) * 5);
        spot.vx += Math.sin(spot.phase) * 0.008;
        spot.vy += Math.cos(spot.phase * 0.7) * 0.006;
        spot.vx *= 0.995;
        spot.vy *= 0.995;

        const speed = Math.sqrt(spot.vx * spot.vx + spot.vy * spot.vy);
        const maxSpeed = 0.06;
        if (speed > maxSpeed) {
          spot.vx = (spot.vx / speed) * maxSpeed;
          spot.vy = (spot.vy / speed) * maxSpeed;
        }

        spot.x += spot.vx * dt * 60;
        spot.y += spot.vy * dt * 60;

        if (spot.x < 3) { spot.vx += 0.02; spot.x = 3; }
        if (spot.x > 95) { spot.vx -= 0.02; spot.x = 95; }
        if (spot.y < 5) { spot.vy += 0.02; spot.y = 5; }
        if (spot.y > 85) { spot.vy -= 0.02; spot.y = 85; }

        spot.breathPhase += dt * 1.2;
      });

      // Day/night cycle - very slow
      const cyclePos = (Math.sin(now * 0.0001) + 1) / 2; // 0-1 over ~60s
      setNightCycle(0.35 + cyclePos * 0.25); // range 0.35-0.6

      setRenderTick((t) => t + 1);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  // Occasional animal silhouettes (every 15-30s)
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const spawnAnimal = () => {
      const types: AnimalSilhouette['type'][] = ['deer', 'owl', 'squirrel'];
      const type = types[Math.floor(Math.random() * types.length)];
      const fromLeft = Math.random() > 0.5;
      const animal: AnimalSilhouette = {
        id: Date.now(),
        type,
        fromX: fromLeft ? -8 : 108,
        toX: fromLeft ? 108 : -8,
        y: type === 'owl' ? 15 + Math.random() * 20 : 68 + Math.random() * 15,
        duration: 8 + Math.random() * 6,
        startTime: Date.now(),
        direction: fromLeft ? 1 : -1,
      };
      setAnimals((prev) => [...prev, animal]);

      // Remove after animation
      setTimeout(() => {
        setAnimals((prev) => prev.filter((a) => a.id !== animal.id));
      }, animal.duration * 1000 + 500);

      // Schedule next animal (15-30s)
      timeoutId = setTimeout(spawnAnimal, 15000 + Math.random() * 15000);
    };

    // First animal after 8-15s
    timeoutId = setTimeout(spawnAnimal, 8000 + Math.random() * 7000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Pre-generate enhanced leaves (30, with light interaction)
  const leaves = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
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
      litColor: '#E8C840',
    }));
  }, []);

  // Pre-generate fireflies
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

  // Pre-generate glowing mushrooms
  const mushrooms = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      y: 82 + Math.random() * 10,
      capSize: 6 + Math.random() * 8,
      stemHeight: 4 + Math.random() * 6,
      color: i % 3 === 0 ? 'rgba(80,200,180,0.5)' : i % 3 === 1 ? 'rgba(100,180,220,0.45)' : 'rgba(140,120,220,0.4)',
      glowColor: i % 3 === 0 ? 'rgba(80,200,180,0.15)' : i % 3 === 1 ? 'rgba(100,180,220,0.12)' : 'rgba(140,120,220,0.1)',
      breathDuration: 3 + Math.random() * 3,
      breathDelay: Math.random() * -5,
    }));
  }, []);

  // God ray positions for leaf light detection
  const godRayPositions = useMemo(() => [
    { left: 10, width: 18 },
    { left: 35, width: 22 },
    { left: 60, width: 16 },
    { left: 80, width: 14 },
  ], []);

  // Check if a leaf is near a god ray
  const isLeafNearRay = useCallback((leafX: number, leafY: number): boolean => {
    if (leafY < 0 || leafY > 60) return false;
    return godRayPositions.some(
      (ray) => leafX > ray.left - 5 && leafX < ray.left + ray.width + 5
    );
  }, [godRayPositions]);

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

  // Parallax offset for background layers
  const px = mousePos.x;
  const py = mousePos.y;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ filter: `brightness(${nightCycle})` }}>
      {/* Background gradient */}
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

      {/* === MULTI-LAYER PARALLAX TREES === */}
      {/* Layer 1: Far distant mountains - coldest, most transparent */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 0.5}px, ${py * 0.3}px)`, transition: 'transform 1.2s ease-out' }}>
        <svg className="absolute bottom-0 left-[-5%] w-[110%] h-[55%]" viewBox="0 0 1500 500" preserveAspectRatio="none">
          <path d="M0,500 L0,280 Q60,220 120,260 Q180,180 280,220 Q360,140 480,190 Q560,120 680,170 Q760,100 880,150 Q960,90 1080,140 Q1160,80 1280,130 Q1360,70 1500,120 L1500,500 Z"
            fill="#152210" opacity="0.4" />
        </svg>
      </div>

      {/* Layer 2: Mid-far mountains */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 1}px, ${py * 0.5}px)`, transition: 'transform 1s ease-out' }}>
        <svg className="absolute bottom-0 left-[-3%] w-[106%] h-[58%]" viewBox="0 0 1500 550" preserveAspectRatio="none">
          <path d="M0,550 L0,320 Q80,260 160,300 Q240,200 360,250 Q440,180 560,230 Q640,160 760,210 Q840,150 960,200 Q1040,140 1160,190 Q1240,130 1360,180 Q1400,160 1500,200 L1500,550 Z"
            fill="#1E2E18" opacity="0.6" />
        </svg>
      </div>

      {/* Layer 3: Mid-range trees */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 1.5}px, ${py * 0.8}px)`, transition: 'transform 0.8s ease-out' }}>
        <svg className="absolute bottom-0 left-[-2%] w-[104%] h-[52%]" viewBox="0 0 1500 500" preserveAspectRatio="none">
          <path d="M0,500 L0,380 Q100,300 200,350 Q320,250 440,310 Q540,220 680,280 Q780,200 900,260 Q1000,190 1120,240 Q1220,180 1340,230 Q1400,210 1500,250 L1500,500 Z"
            fill="#23321E" opacity="0.8" />
        </svg>
      </div>

      {/* Layer 4: Near-mid trees - warmer green */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 2}px, ${py * 1}px)`, transition: 'transform 0.6s ease-out' }}>
        <svg className="absolute bottom-0 left-[-1%] w-[102%] h-[48%]" viewBox="0 0 1500 450" preserveAspectRatio="none">
          <path d="M0,450 L0,350 Q60,310 140,340 Q220,280 340,320 Q420,260 540,300 Q620,240 740,290 Q820,230 940,270 Q1020,220 1140,260 Q1220,210 1340,250 Q1420,220 1500,240 L1500,450 Z"
            fill="#2A3D20" opacity="0.85" />
        </svg>
      </div>

      {/* Layer 5: Close trees */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 3}px, ${py * 1.5}px)`, transition: 'transform 0.5s ease-out' }}>
        <svg className="absolute bottom-0 left-0 w-full h-[42%]" viewBox="0 0 1440 400" preserveAspectRatio="none">
          <path d="M0,400 L0,330 Q80,290 180,320 Q280,260 400,300 Q500,240 620,280 Q720,220 840,260 Q940,200 1060,240 Q1160,190 1280,230 Q1360,200 1440,220 L1440,400 Z"
            fill="#304826" />
        </svg>
      </div>

      {/* Layer 6: Nearest underbrush */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${px * 4}px, ${py * 2}px)`, transition: 'transform 0.4s ease-out' }}>
        <svg className="absolute bottom-0 left-0 w-full h-[20%]" viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path d="M0,180 L0,130 Q40,110 80,120 Q120,95 170,110 Q210,85 260,100 Q310,75 360,90 Q410,68 460,85 Q510,60 560,78 Q610,55 660,72 Q710,50 760,68 Q810,48 860,65 Q910,45 960,62 Q1010,42 1060,58 Q1110,40 1160,55 Q1210,38 1260,52 Q1310,35 1360,50 Q1410,38 1440,45 L1440,180 Z"
            fill="#3A5230" />
        </svg>
      </div>

      {/* God rays - warm golden light columns */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.8 }}>
        <div className="absolute" style={{ top: '-20%', left: '10%', width: '18%', height: '130%', background: 'linear-gradient(180deg, rgba(232,200,64,0.1) 0%, rgba(232,200,64,0.04) 35%, transparent 75%)', transform: 'skewX(-10deg)', animation: 'godRaySway 14s ease-in-out infinite' }} />
        <div className="absolute" style={{ top: '-15%', left: '35%', width: '22%', height: '120%', background: 'linear-gradient(180deg, rgba(232,200,64,0.08) 0%, rgba(200,180,60,0.025) 45%, transparent 80%)', transform: 'skewX(4deg)', animation: 'godRaySway 18s ease-in-out infinite reverse' }} />
        <div className="absolute" style={{ top: '-10%', left: '60%', width: '16%', height: '110%', background: 'linear-gradient(180deg, rgba(232,200,64,0.07) 0%, rgba(200,180,60,0.02) 50%, transparent 78%)', transform: 'skewX(-6deg)', animation: 'godRaySway 12s ease-in-out infinite', animationDelay: '-4s' }} />
        <div className="absolute" style={{ top: '-18%', left: '80%', width: '14%', height: '115%', background: 'linear-gradient(180deg, rgba(232,200,64,0.06) 0%, rgba(200,180,60,0.018) 40%, transparent 70%)', transform: 'skewX(8deg)', animation: 'godRaySway 16s ease-in-out infinite reverse', animationDelay: '-7s' }} />
      </div>

      {/* Ground gradient with moss */}
      <div className="absolute bottom-0 left-0 right-0 h-[25%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, #3E4E35 0%, #354A2D 25%, rgba(58,78,45,0.5) 55%, transparent 100%)' }} />

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

      {/* Tree branch from top-left - WIND SWAY */}
      <svg className="absolute top-0 left-0 w-[40%] h-[25%] pointer-events-none" viewBox="0 0 400 150" preserveAspectRatio="none" style={{ animation: 'canopySway 8s ease-in-out infinite', transformOrigin: 'left center' }}>
        <path d="M0,0 Q50,30 80,50 Q120,70 160,65 Q200,60 230,75 Q260,85 290,80"
          stroke="#1E2E18" strokeWidth="8" fill="none" opacity="0.6" />
        <path d="M80,50 Q100,40 110,55 Q130,50 140,65"
          stroke="#1E2E18" strokeWidth="4" fill="none" opacity="0.5" />
        <path d="M160,65 Q175,55 185,68 Q200,62 210,72"
          stroke="#1E2E18" strokeWidth="3" fill="none" opacity="0.4" />
        {/* Leaves on branches */}
        <ellipse cx="110" cy="52" rx="12" ry="6" fill="#2A3D20" opacity="0.5" style={{ animation: 'leafSway 4s ease-in-out infinite' }} />
        <ellipse cx="185" cy="64" rx="10" ry="5" fill="#2A3D20" opacity="0.4" style={{ animation: 'leafSway 5s ease-in-out -2s infinite' }} />
        <ellipse cx="250" cy="78" rx="8" ry="4" fill="#2A3D20" opacity="0.35" style={{ animation: 'leafSway 4.5s ease-in-out -1s infinite' }} />
      </svg>

      {/* Tree branch from top-right - WIND SWAY */}
      <svg className="absolute top-0 right-0 w-[35%] h-[20%] pointer-events-none" viewBox="0 0 350 120" preserveAspectRatio="none" style={{ transform: 'scaleX(-1)', animation: 'canopySway 10s ease-in-out -3s infinite', transformOrigin: 'left center' }}>
        <path d="M0,0 Q40,25 70,45 Q110,60 150,55 Q190,50 220,60 Q250,68 280,65"
          stroke="#1E2E18" strokeWidth="7" fill="none" opacity="0.5" />
        <path d="M150,55 Q160,45 170,58 Q185,50 195,60"
          stroke="#1E2E18" strokeWidth="3" fill="none" opacity="0.4" />
        <ellipse cx="170" cy="52" rx="10" ry="5" fill="#2A3D20" opacity="0.4" style={{ animation: 'leafSway 5s ease-in-out -1.5s infinite' }} />
        <ellipse cx="230" cy="58" rx="8" ry="4" fill="#2A3D20" opacity="0.35" style={{ animation: 'leafSway 4s ease-in-out -3s infinite' }} />
      </svg>

      {/* Undergrowth / fern silhouettes at bottom */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[15%] pointer-events-none" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path d="M0,120 L0,90 Q20,70 40,80 Q60,60 80,75 Q100,55 120,70 Q140,50 170,65 Q190,45 220,60 Q240,40 270,58 Q290,42 320,55 Q340,38 370,52 Q390,35 420,50 Q440,32 470,48 Q490,30 520,45 Q540,28 570,42 Q590,25 620,40 Q640,22 670,38 Q690,20 720,35 Q740,18 770,32 Q790,22 820,35 Q840,20 870,33 Q890,25 920,38 Q940,22 970,35 Q990,20 1020,33 Q1040,25 1070,38 Q1090,22 1120,35 Q1140,20 1170,32 Q1190,25 1220,38 Q1240,22 1270,35 Q1290,20 1320,33 Q1340,25 1370,38 Q1400,30 1440,35 L1440,120 Z"
          fill="#2A3D20" opacity="0.9" />
      </svg>

      {/* === GLOWING MUSHROOMS === */}
      <div className="absolute inset-0 pointer-events-none z-[3]">
        {mushrooms.map((m) => (
          <div
            key={m.id}
            className="absolute"
            style={{
              left: `${m.x}%`,
              bottom: `${100 - m.y}%`,
              transform: `translate(${px * 2}px, ${py * 1}px)`,
              transition: 'transform 0.6s ease-out',
            }}
          >
            {/* Glow aura */}
            <div
              className="absolute rounded-full"
              style={{
                width: `${m.capSize * 6}px`,
                height: `${m.capSize * 6}px`,
                left: `${-m.capSize * 2.5}px`,
                top: `${-m.capSize * 3}px`,
                background: `radial-gradient(circle, ${m.glowColor} 0%, transparent 70%)`,
                animation: `mushroomBreath ${m.breathDuration}s ease-in-out ${m.breathDelay}s infinite`,
              }}
            />
            {/* Cap */}
            <div
              style={{
                width: `${m.capSize}px`,
                height: `${m.capSize * 0.6}px`,
                background: m.color,
                borderRadius: '50% 50% 10% 10%',
                boxShadow: `0 0 ${m.capSize}px ${m.glowColor}, 0 0 ${m.capSize * 2}px ${m.glowColor}`,
                animation: `mushroomBreath ${m.breathDuration}s ease-in-out ${m.breathDelay}s infinite`,
              }}
            />
            {/* Stem */}
            <div
              style={{
                width: `${m.capSize * 0.25}px`,
                height: `${m.stemHeight}px`,
                background: 'rgba(180,170,140,0.3)',
                margin: '0 auto',
                borderRadius: '0 0 2px 2px',
              }}
            />
          </div>
        ))}
      </div>

      {/* Fog Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[5]" />

      {/* Green ground fog */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-[6]"
        style={{ background: 'linear-gradient(to top, rgba(100,140,60,0.07) 0%, rgba(80,120,40,0.035) 50%, transparent 100%)', animation: 'fogDrift 20s ease-in-out infinite' }} />

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
              transform: `translate(${px * ff.driftX * ff.parallaxFactor}px, ${py * ff.driftY * ff.parallaxFactor}px)`,
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

          const parallaxX = px * spot.size * 0.3 * spot.parallaxFactor;
          const parallaxY = py * spot.size * 0.25 * spot.parallaxFactor;
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
              <div className="absolute inset-0 rounded-full" style={{
                background: isDiscovered
                  ? `radial-gradient(circle, rgba(232,200,64,0.15) 0%, rgba(184,212,48,0.04) 50%, transparent 100%)`
                  : `radial-gradient(circle, rgba(232,200,64,0.5) 0%, rgba(184,212,48,0.2) 50%, transparent 100%)`,
                boxShadow: isDiscovered
                  ? `0 0 ${spot.size * 0.6}px rgba(232,200,64,0.08)`
                  : `0 0 ${spot.size * 2}px rgba(232,200,64,0.2), 0 0 ${spot.size * 4}px rgba(184,212,48,0.08)`,
              }} />
              <div className="absolute rounded-full" style={{
                top: '30%', left: '30%', width: '40%', height: '40%',
                background: isDiscovered
                  ? 'radial-gradient(circle, rgba(255,240,180,0.2) 0%, rgba(232,200,64,0.06) 100%)'
                  : 'radial-gradient(circle, rgba(255,240,180,0.85) 0%, rgba(232,200,64,0.35) 100%)',
                boxShadow: isDiscovered
                  ? `0 0 ${spot.size * 0.2}px rgba(255,240,180,0.06)`
                  : `0 0 ${spot.size * 0.6}px rgba(255,240,180,0.45)`,
              }} />
              {isDiscovered && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs opacity-25">{spot.emoji}</span>
                </div>
              )}
              <div className="absolute inset-[-6px] rounded-full border border-[rgba(232,200,64,0)] group-hover:border-[rgba(232,200,64,0.3)] transition-all duration-300" />
            </div>
          );
        })}
      </div>

      {/* Burst fragments */}
      {burstingId && (() => {
        const spot = spotsRef.current.find((s) => s.id === burstingId);
        if (!spot) return null;
        const parallaxX = px * spot.size * 0.3 * spot.parallaxFactor;
        const parallaxY = py * spot.size * 0.25 * spot.parallaxFactor;
        const fragments = Array.from({ length: 10 }, (_, i) => {
          const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.3;
          const distance = 30 + Math.random() * 50;
          return { angle, distance, size: 2 + Math.random() * 4, delay: Math.random() * 0.1 };
        });
        return (
          <div className="absolute inset-0 z-[9] pointer-events-none">
            {fragments.map((frag, i) => (
              <div key={i} className="absolute rounded-full" style={{
                left: `${spot.x}%`, top: `${spot.y}%`,
                width: `${frag.size}px`, height: `${frag.size}px`,
                marginLeft: `-${frag.size / 2}px`, marginTop: `-${frag.size / 2}px`,
                background: 'rgba(255,240,180,0.8)',
                boxShadow: `0 0 ${frag.size * 2}px rgba(232,200,64,0.5)`,
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                animation: `lightBurst ${0.5 + frag.delay}s ease-out forwards`,
                '--burst-x': `${Math.cos(frag.angle) * frag.distance}px`,
                '--burst-y': `${Math.sin(frag.angle) * frag.distance}px`,
              } as React.CSSProperties} />
            ))}
            <div className="absolute rounded-full" style={{
              left: `${spot.x}%`, top: `${spot.y}%`,
              width: `${spot.size * 2}px`, height: `${spot.size * 2}px`,
              marginLeft: `-${spot.size}px`, marginTop: `-${spot.size}px`,
              border: '2px solid rgba(232,200,64,0.4)',
              transform: `translate(${parallaxX}px, ${parallaxY}px)`,
              animation: 'glowRingExpand 0.6s ease-out forwards',
            }} />
          </div>
        );
      })()}

      {/* === ENHANCED FALLING LEAVES with light interaction === */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
        {leaves.map((leaf) => {
          // Check if leaf path crosses a god ray
          const nearRay = isLeafNearRay(leaf.x, 40);
          return (
            <div
              key={leaf.id}
              className="absolute"
              style={{
                left: `${leaf.x}%`,
                top: `${leaf.startY}%`,
                width: `${leaf.size}px`,
                height: `${leaf.size * 1.4}px`,
                background: nearRay ? leaf.litColor : leaf.color,
                borderRadius: '50% 0 50% 0',
                opacity: nearRay ? 0.6 : 0.3,
                boxShadow: nearRay ? `0 0 ${leaf.size}px rgba(232,200,64,0.3)` : 'none',
                animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
                transition: 'background 0.5s, opacity 0.5s, box-shadow 0.5s',
              }}
            >
              <div className="w-full h-full" style={{
                animation: `leafSway ${leaf.swayAmount / 10}s ease-in-out ${leaf.delay}s infinite, leafRotate ${leaf.rotationSpeed / 10}s linear infinite`,
                transformOrigin: 'center center',
              }} />
            </div>
          );
        })}
      </div>

      {/* === ANIMAL SILHOUETTES === */}
      <div className="absolute inset-0 pointer-events-none z-[10]">
        {animals.map((animal) => {
          const progress = Math.min(1, (Date.now() - animal.startTime) / (animal.duration * 1000));
          const currentX = animal.fromX + (animal.toX - animal.fromX) * progress;
          const fadeOpacity = progress < 0.1 ? progress / 0.1 : progress > 0.9 ? (1 - progress) / 0.1 : 0.25;

          return (
            <div
              key={animal.id}
              className="absolute"
              style={{
                left: `${currentX}%`,
                top: `${animal.y}%`,
                opacity: fadeOpacity,
                transform: `scaleX(${animal.direction})`,
                transition: 'opacity 0.5s',
              }}
            >
              {animal.type === 'deer' && (
                <svg width="80" height="60" viewBox="0 0 80 60" fill="#1A2814" opacity="0.8">
                  {/* Deer body */}
                  <ellipse cx="40" cy="38" rx="22" ry="12" />
                  {/* Neck */}
                  <ellipse cx="58" cy="26" rx="6" ry="14" transform="rotate(-15 58 26)" />
                  {/* Head */}
                  <ellipse cx="62" cy="16" rx="7" ry="5" />
                  {/* Antlers */}
                  <path d="M62,11 L58,2 L55,5 M58,2 L60,-1 M62,11 L66,3 L69,5 M66,3 L64,0" stroke="#1A2814" strokeWidth="1.5" fill="none" />
                  {/* Legs */}
                  <line x1="28" y1="48" x2="26" y2="58" stroke="#1A2814" strokeWidth="2.5" />
                  <line x1="35" y1="48" x2="33" y2="58" stroke="#1A2814" strokeWidth="2.5" />
                  <line x1="48" y1="48" x2="50" y2="58" stroke="#1A2814" strokeWidth="2.5" />
                  <line x1="54" y1="48" x2="56" y2="58" stroke="#1A2814" strokeWidth="2.5" />
                  {/* Tail */}
                  <ellipse cx="18" cy="34" rx="4" ry="3" />
                </svg>
              )}
              {animal.type === 'owl' && (
                <svg width="50" height="55" viewBox="0 0 50 55" fill="#1A2814" opacity="0.7">
                  {/* Body */}
                  <ellipse cx="25" cy="35" rx="14" ry="18" />
                  {/* Head */}
                  <circle cx="25" cy="16" r="11" />
                  {/* Ear tufts */}
                  <polygon points="17,8 14,0 20,6" />
                  <polygon points="33,8 36,0 30,6" />
                  {/* Eyes (glowing) */}
                  <circle cx="21" cy="15" r="3.5" fill="#1A2814" stroke="rgba(232,200,64,0.3)" strokeWidth="1" />
                  <circle cx="29" cy="15" r="3.5" fill="#1A2814" stroke="rgba(232,200,64,0.3)" strokeWidth="1" />
                  <circle cx="21" cy="15" r="1.5" fill="rgba(232,200,64,0.25)" />
                  <circle cx="29" cy="15" r="1.5" fill="rgba(232,200,64,0.25)" />
                  {/* Wings */}
                  <ellipse cx="12" cy="34" rx="6" ry="14" transform="rotate(10 12 34)" />
                  <ellipse cx="38" cy="34" rx="6" ry="14" transform="rotate(-10 38 34)" />
                </svg>
              )}
              {animal.type === 'squirrel' && (
                <svg width="40" height="40" viewBox="0 0 40 40" fill="#1A2814" opacity="0.7">
                  {/* Body */}
                  <ellipse cx="18" cy="25" rx="8" ry="10" />
                  {/* Head */}
                  <circle cx="26" cy="16" r="6" />
                  {/* Ears */}
                  <circle cx="23" cy="10" r="2" />
                  <circle cx="29" cy="10" r="2" />
                  {/* Tail (curled up) */}
                  <path d="M10,25 Q4,18 8,10 Q12,4 16,8" stroke="#1A2814" strokeWidth="4" fill="none" strokeLinecap="round" />
                  {/* Legs */}
                  <line x1="14" y1="34" x2="12" y2="39" stroke="#1A2814" strokeWidth="2" />
                  <line x1="22" y1="34" x2="24" y2="39" stroke="#1A2814" strokeWidth="2" />
                </svg>
              )}
            </div>
          );
        })}
      </div>

      {/* Top vignette */}
      <div className="absolute inset-0 pointer-events-none z-[11]"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(20,30,15,0.35) 100%)' }} />
    </div>
  );
}
