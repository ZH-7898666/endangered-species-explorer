'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import type { Species } from '@/data/species';

interface OceanSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  isVisible: boolean;
  mousePos: { x: number; y: number };
  burstingId: string | null;
}

const BUBBLE_COLORS = {
  cyan: { core: 'rgba(0,220,240,0.7)', glow: 'rgba(0,220,240,0.15)' },
  blue: { core: 'rgba(100,160,240,0.6)', glow: 'rgba(100,160,240,0.12)' },
  purple: { core: 'rgba(160,100,240,0.6)', glow: 'rgba(160,100,240,0.12)' },
} as const;

type BubbleColorKey = keyof typeof BUBBLE_COLORS;

// Bubble burst fragment component
function BubbleBurst({ x, y, color }: { x: number; y: number; color: string }) {
  const fragments = useMemo(() => {
    const count = 8 + Math.floor(Math.random() * 6);
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
      const distance = 30 + Math.random() * 60;
      const size = 3 + Math.random() * 5;
      const duration = 0.3 + Math.random() * 0.3;
      return { angle, distance, size, duration, delay: Math.random() * 0.05 };
    });
  }, [color]);

  return (
    <div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
      {/* Ripple ring */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
        style={{
          borderColor: color,
          animation: 'rippleExpand 0.6s ease-out forwards',
        }}
      />
      {/* Scattered fragments */}
      {fragments.map((f, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: color,
            boxShadow: `0 0 ${f.size * 2}px ${color}`,
            left: '50%',
            top: '50%',
            animation: `fragmentScatter 0.5s ease-out ${f.delay}s forwards`,
            '--frag-angle': `${f.angle}rad`,
            '--frag-distance': `${f.distance}px`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

export function OceanScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  isVisible,
  mousePos,
  burstingId,
}: OceanSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [burstPositions, setBurstPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Pre-generate bubble positions and animation params
  const bubbles = useMemo(() => {
    const colorKeys: BubbleColorKey[] = ['cyan', 'blue', 'purple'];
    return species.map((sp, i) => {
      const cols = 4;
      const rows = Math.ceil(species.length / cols);
      const col = i % cols;
      const row = Math.floor(i / cols);
      const cellW = 100 / cols;
      const cellH = 80 / rows;
      const baseX = cellW * col + cellW * 0.15 + Math.random() * cellW * 0.7;
      const baseY = 8 + cellH * row + cellH * 0.1 + Math.random() * cellH * 0.6;
      return {
        species: sp,
        baseX,
        baseY,
        bubbleSize: 22 + Math.random() * 26,
        floatDuration: 5 + Math.random() * 5,
        floatDelay: Math.random() * -10,
        breathDuration: 3.5 + Math.random() * 3,
        breathDelay: Math.random() * -6,
        driftX: 5 + Math.random() * 12,
        driftY: 3 + Math.random() * 8,
        driftDuration: 8 + Math.random() * 6,
        driftDelay: Math.random() * -8,
        parallaxFactor: 0.3 + Math.random() * 0.7,
        color: colorKeys[Math.floor(Math.random() * 3)],
        emoji: sp.emoji,
      };
    });
  }, [species]);

  // Track burst positions
  useEffect(() => {
    if (burstingId) {
      const b = bubbles.find((b) => b.species.id === burstingId);
      if (b) {
        setBurstPositions((prev) => ({ ...prev, [burstingId]: { x: b.baseX, y: b.baseY } }));
        // Clean up after animation
        setTimeout(() => {
          setBurstPositions((prev) => {
            const next = { ...prev };
            delete next[burstingId];
            return next;
          });
        }, 800);
      }
    }
  }, [burstingId, bubbles]);

  // Pre-generate fish shadows
  const fishShadows = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: 20 + Math.random() * 60,
      size: 10 + Math.random() * 20,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -25,
      direction: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.04 + Math.random() * 0.08,
      yOffset: 10 + Math.random() * 30,
    }));
  }, []);

  // Pre-generate bioluminescent particles - more of them, brighter
  const bioParticles = useMemo(() => {
    return Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 3,
      duration: 4 + Math.random() * 8,
      delay: Math.random() * -10,
      blinkDuration: 2 + Math.random() * 4,
      blinkDelay: Math.random() * -5,
      driftX: 3 + Math.random() * 10,
      driftY: 2 + Math.random() * 6,
      parallaxFactor: 0.1 + Math.random() * 0.3,
      color: ['rgba(0,220,240,0.7)', 'rgba(100,180,240,0.6)', 'rgba(160,120,240,0.5)', 'rgba(140,220,200,0.5)'][Math.floor(Math.random() * 4)] as string,
    }));
  }, []);

  // Pre-generate jellyfish
  const jellyfish = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 50,
      size: 30 + Math.random() * 50,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -15,
      driftX: 5 + Math.random() * 10,
      parallaxFactor: 0.15 + Math.random() * 0.2,
      opacity: 0.04 + Math.random() * 0.05,
    }));
  }, []);

  // Suspended particles in light beams (dust motes)
  const suspendedParticles = useMemo(() => {
    return Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: 0.5 + Math.random() * 2,
      duration: 6 + Math.random() * 12,
      delay: Math.random() * -10,
      driftX: 1 + Math.random() * 4,
      driftY: 0.5 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.4,
    }));
  }, []);

  // Caustic Canvas Animation - brighter
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

    const causticPoints = Array.from({ length: 15 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 100 + Math.random() * 250,
      speedX: 0.2 + Math.random() * 0.5,
      speedY: 0.1 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = Date.now() * 0.001;
      causticPoints.forEach((p) => {
        p.x += p.speedX;
        p.y += Math.sin(t + p.phase) * p.speedY;
        if (p.x - p.radius > canvas.width) p.x = -p.radius;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, `rgba(140, 200, 240, 0.07)`);
        gradient.addColorStop(0.5, `rgba(100, 180, 220, 0.03)`);
        gradient.addColorStop(1, 'rgba(80, 160, 200, 0)');
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
      {/* ============================================
          BACKGROUND - Bright luminous ocean with clear light/dark layers
          ============================================ */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 90% 40% at 50% 8%, rgba(180,220,250,0.18) 0%, rgba(140,200,240,0.06) 50%, transparent 80%),
            radial-gradient(ellipse 60% 30% at 30% 20%, rgba(160,210,245,0.1) 0%, transparent 60%),
            radial-gradient(ellipse 50% 30% at 70% 15%, rgba(140,200,240,0.08) 0%, transparent 60%),
            linear-gradient(180deg, 
              #1A5A80 0%, 
              #164A6A 15%, 
              #123858 35%, 
              #0E2E4A 55%, 
              #0C2440 75%, 
              #081830 100%
            )
          `,
        }}
      />

      {/* ============================================
          WATER SURFACE RIPPLES - top layer
          ============================================ */}
      <div className="absolute top-0 left-0 right-0 h-[12%] pointer-events-none overflow-hidden" style={{ opacity: 0.6 }}>
        <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="surfaceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(200,235,255,0.3)" />
              <stop offset="100%" stopColor="rgba(140,200,240,0)" />
            </linearGradient>
          </defs>
          <path d="M0,30 Q60,10 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 T1320,30 T1440,30 L1440,0 L0,0 Z"
            fill="url(#surfaceGrad)" opacity="0.5">
            <animate attributeName="d" dur="4s" repeatCount="indefinite"
              values="M0,30 Q60,10 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 T1320,30 T1440,30 L1440,0 L0,0 Z;
                      M0,20 Q60,40 120,20 T240,20 T360,20 T480,20 T600,20 T720,20 T840,20 T960,20 T1080,20 T1200,20 T1320,20 T1440,20 L1440,0 L0,0 Z;
                      M0,30 Q60,10 120,30 T240,30 T360,30 T480,30 T600,30 T720,30 T840,30 T960,30 T1080,30 T1200,30 T1320,30 T1440,30 L1440,0 L0,0 Z" />
          </path>
          <path d="M0,50 Q80,30 160,50 T320,50 T480,50 T640,50 T800,50 T960,50 T1120,50 T1280,50 T1440,50 L1440,0 L0,0 Z"
            fill="url(#surfaceGrad)" opacity="0.3">
            <animate attributeName="d" dur="6s" repeatCount="indefinite"
              values="M0,50 Q80,30 160,50 T320,50 T480,50 T640,50 T800,50 T960,50 T1120,50 T1280,50 T1440,50 L1440,0 L0,0 Z;
                      M0,40 Q80,60 160,40 T320,40 T480,40 T640,40 T800,40 T960,40 T1120,40 T1280,40 T1440,40 L1440,0 L0,0 Z;
                      M0,50 Q80,30 160,50 T320,50 T480,50 T640,50 T800,50 T960,50 T1120,50 T1280,50 T1440,50 L1440,0 L0,0 Z" />
          </path>
        </svg>
      </div>

      {/* ============================================
          TYNDALL LIGHT BEAMS (JESUS LIGHT) - The core visual element
          Clear, visible vertical light shafts from the surface
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.85 }}>
        {/* Main central beam */}
        <div
          className="absolute"
          style={{
            top: '-5%', left: '35%', width: '18%', height: '115%',
            background: 'linear-gradient(180deg, rgba(200,235,255,0.2) 0%, rgba(160,215,245,0.08) 30%, rgba(140,200,240,0.03) 60%, transparent 85%)',
            transform: 'skewX(3deg)',
            animation: 'godRaySway 10s ease-in-out infinite',
            filter: 'blur(2px)',
          }}
        />
        {/* Left beam */}
        <div
          className="absolute"
          style={{
            top: '-8%', left: '15%', width: '14%', height: '110%',
            background: 'linear-gradient(180deg, rgba(180,225,250,0.15) 0%, rgba(140,200,240,0.06) 35%, rgba(120,180,220,0.02) 60%, transparent 85%)',
            transform: 'skewX(-5deg)',
            animation: 'godRaySway 13s ease-in-out infinite reverse',
            animationDelay: '-2s',
            filter: 'blur(3px)',
          }}
        />
        {/* Right beam */}
        <div
          className="absolute"
          style={{
            top: '-3%', left: '62%', width: '16%', height: '108%',
            background: 'linear-gradient(180deg, rgba(190,230,255,0.18) 0%, rgba(150,210,240,0.07) 30%, rgba(130,195,230,0.02) 60%, transparent 85%)',
            transform: 'skewX(4deg)',
            animation: 'godRaySway 11s ease-in-out infinite',
            animationDelay: '-4s',
            filter: 'blur(2px)',
          }}
        />
        {/* Far right thin beam */}
        <div
          className="absolute"
          style={{
            top: '-5%', left: '80%', width: '8%', height: '100%',
            background: 'linear-gradient(180deg, rgba(200,235,255,0.12) 0%, rgba(160,215,245,0.04) 40%, transparent 75%)',
            transform: 'skewX(-3deg)',
            animation: 'godRaySway 15s ease-in-out infinite',
            animationDelay: '-6s',
            filter: 'blur(4px)',
          }}
        />
        {/* Far left thin beam */}
        <div
          className="absolute"
          style={{
            top: '-6%', left: '5%', width: '10%', height: '105%',
            background: 'linear-gradient(180deg, rgba(180,225,250,0.1) 0%, rgba(140,200,240,0.03) 45%, transparent 80%)',
            transform: 'skewX(6deg)',
            animation: 'godRaySway 16s ease-in-out infinite reverse',
            animationDelay: '-8s',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* ============================================
          SUSPENDED PARTICLES - Visible in light beams
          Small white dots that make light "visible"
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {suspendedParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: `rgba(220,240,255,${p.opacity})`,
              boxShadow: `0 0 ${p.size * 2}px rgba(200,230,255,${p.opacity * 0.3})`,
              animation: `suspendedParticleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
              transform: `translate(${mousePos.x * p.driftX * 0.3}px, ${mousePos.y * p.driftY * 0.3}px)`,
              transition: 'transform 1s ease-out',
            }}
          />
        ))}
      </div>

      {/* ============================================
          SEABED TERRAIN - More detailed with coral
          ============================================ */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[35%] pointer-events-none z-[3]" viewBox="0 0 1440 350" preserveAspectRatio="none">
        {/* Far reef */}
        <path d="M0,350 L0,260 Q80,230 160,250 Q280,200 400,230 Q520,180 640,210 Q760,170 880,200 Q1000,160 1120,190 Q1240,170 1360,200 Q1400,190 1440,210 L1440,350 Z"
          fill="#122845" opacity="0.8" />
        {/* Mid reef */}
        <path d="M0,350 L0,290 Q100,260 200,280 Q340,230 480,260 Q600,220 740,250 Q860,210 980,240 Q1100,210 1220,240 Q1340,220 1440,250 L1440,350 Z"
          fill="#1B2845" />
        {/* Fore reef */}
        <path d="M0,350 L0,310 Q60,290 120,300 Q200,270 300,290 Q400,260 500,280 Q600,255 700,275 Q800,250 900,270 Q1000,250 1100,270 Q1200,250 1300,270 Q1380,260 1440,275 L1440,350 Z"
          fill="#162240" />
        {/* Coral shapes */}
        <circle cx="150" cy="305" r="14" fill="#1A3050" opacity="0.6" />
        <circle cx="170" cy="310" r="8" fill="#1E3555" opacity="0.5" />
        <circle cx="450" cy="285" r="10" fill="#1A3050" opacity="0.5" />
        <circle cx="750" cy="290" r="16" fill="#1E3555" opacity="0.6" />
        <circle cx="770" cy="295" r="9" fill="#1A3050" opacity="0.5" />
        <circle cx="1050" cy="280" r="12" fill="#1A3050" opacity="0.5" />
        <ellipse cx="300" cy="300" rx="22" ry="10" fill="#1A2E4A" opacity="0.4" />
        <ellipse cx="900" cy="285" rx="28" ry="12" fill="#1A2E4A" opacity="0.4" />
        <ellipse cx="1300" cy="275" rx="18" ry="8" fill="#1A2E4A" opacity="0.4" />
      </svg>

      {/* Caustic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[4]" />

      {/* ============================================
          BIOLUMINESCENT PARTICLES
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {bioParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              animation: `bioParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite, bioParticleBlink ${p.blinkDuration}s ease-in-out ${p.blinkDelay}s infinite`,
              transform: `translate(${mousePos.x * p.driftX * p.parallaxFactor}px, ${mousePos.y * p.driftY * p.parallaxFactor}px)`,
              transition: 'transform 0.8s ease-out',
            }}
          />
        ))}
      </div>

      {/* ============================================
          JELLYFISH
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
        {jellyfish.map((jf) => (
          <div
            key={jf.id}
            className="absolute"
            style={{
              left: `${jf.x}%`,
              top: `${jf.y}%`,
              width: `${jf.size}px`,
              height: `${jf.size * 1.5}px`,
              background: `radial-gradient(ellipse at 50% 30%, rgba(140,120,220,${jf.opacity}) 0%, rgba(140,120,220,${jf.opacity * 0.3}) 50%, transparent 80%)`,
              borderRadius: '50% 50% 40% 40%',
              animation: `jellyfishFloat ${jf.duration}s ease-in-out ${jf.delay}s infinite`,
              transform: `translate(${mousePos.x * jf.driftX * jf.parallaxFactor}px, 0)`,
              transition: 'transform 1s ease-out',
            }}
          >
            <div className="absolute bottom-0 left-[15%] right-[15%] h-[60%]"
              style={{
                background: `linear-gradient(to bottom, rgba(140,120,220,${jf.opacity * 0.5}), transparent)`,
                borderRadius: '0 0 50% 50%',
                animation: `jellyfishTentacle ${jf.duration * 0.8}s ease-in-out ${jf.delay}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* ============================================
          FISH SHADOWS
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[7]">
        {fishShadows.map((fish) => (
          <div
            key={fish.id}
            className="absolute"
            style={{
              top: `${fish.y}%`,
              left: fish.direction > 0 ? '-5%' : '105%',
              width: `${fish.size * 2}px`,
              height: `${fish.size}px`,
              background: `radial-gradient(ellipse, rgba(140,180,220,${fish.opacity}), transparent)`,
              borderRadius: '60% 40% 40% 60%',
              animation: `fishSwim ${fish.duration}s linear ${fish.delay}s infinite`,
              transform: fish.direction < 0 ? 'scaleX(-1)' : undefined,
            }}
          />
        ))}
      </div>

      {/* ============================================
          WATER CURRENT LIGHT BANDS
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[7]" style={{ opacity: 0.5 }}>
        <div
          className="absolute"
          style={{
            top: '25%', left: '-10%', width: '40%', height: '3%',
            background: 'linear-gradient(90deg, transparent, rgba(140,180,220,0.08), transparent)',
            borderRadius: '50%',
            animation: 'currentFlow 20s linear infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '55%', left: '70%', width: '35%', height: '2%',
            background: 'linear-gradient(90deg, transparent, rgba(107,91,141,0.06), transparent)',
            borderRadius: '50%',
            animation: 'currentFlow 25s linear infinite reverse',
          }}
        />
      </div>

      {/* ============================================
          BUBBLES (unlockable) — with burst animation support
          ============================================ */}
      <div className="absolute inset-0 z-[8]">
        {bubbles.map((b) => {
          const isUnlocked = unlockedIds.has(b.species.id);
          const isRecent = recentlyClicked.has(b.species.id);
          const isDiscovered = isUnlocked && isRecent;
          const isBursting = burstingId === b.species.id;
          const bubbleColor = BUBBLE_COLORS[b.color];

          const parallaxX = mousePos.x * b.driftX * b.parallaxFactor;
          const parallaxY = mousePos.y * b.driftY * b.parallaxFactor;

          return (
            <div
              key={b.species.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${b.baseX}%`,
                top: `${b.baseY}%`,
                zIndex: 8 + Math.round(b.bubbleSize / 15),
                animation: `bubbleDrift ${b.driftDuration}s ease-in-out ${b.driftDelay}s infinite`,
                transform: `translate(${parallaxX}px, ${parallaxY}px)`,
                transition: 'transform 0.6s ease-out',
              }}
              onClick={() => onSpeciesClick(b.species)}
            >
              <div
                className={`
                  relative rounded-full
                  ${isBursting ? 'bubble-burst' : ''}
                  ${isDiscovered ? 'scale-75 opacity-50' : 'scale-100 hover:scale-110'}
                  transition-all duration-300 ease-out
                `}
                style={{
                  width: `${b.bubbleSize * 2}px`,
                  height: `${b.bubbleSize * 2}px`,
                  animation: isBursting ? 'none' : `bubbleFloat ${b.floatDuration}s cubic-bezier(0.25,0.46,0.45,0.94) ${b.floatDelay}s infinite, bubbleBreath ${b.breathDuration}s ease-in-out ${b.breathDelay}s infinite`,
                }}
              >
                {/* Main bubble gradient */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-700"
                  style={{
                    background: isDiscovered
                      ? `radial-gradient(circle at 35% 35%, rgba(184,216,232,0.1) 0%, rgba(140,190,220,0.05) 40%, transparent 80%)`
                      : `radial-gradient(circle at 35% 35%, rgba(224,240,255,0.3) 0%, rgba(184,216,232,0.18) 40%, rgba(140,190,220,0.06) 70%, transparent 100%)`,
                    boxShadow: isDiscovered
                      ? `0 0 ${b.bubbleSize}px rgba(140,200,240,0.06), inset 0 0 ${b.bubbleSize * 0.3}px rgba(184,216,232,0.03)`
                      : `0 0 ${b.bubbleSize * 1.5}px ${bubbleColor.glow}, 0 0 ${b.bubbleSize * 3}px rgba(100,160,220,0.06), inset 0 0 ${b.bubbleSize * 0.5}px rgba(224,240,255,0.08)`,
                  }}
                />
                {/* Color core glow */}
                <div
                  className="absolute inset-[15%] rounded-full transition-all duration-700"
                  style={{
                    background: isDiscovered
                      ? `radial-gradient(circle, ${bubbleColor.core.replace(/[\d.]+\)$/, '0.15)')}) 0%, transparent 70%)`
                      : `radial-gradient(circle, ${bubbleColor.core} 0%, transparent 70%)`,
                  }}
                />
                {/* Highlight reflection */}
                <div
                  className="bubble-highlight transition-all duration-700"
                  style={{ opacity: isDiscovered ? 0.15 : 0.8 }}
                />
                {/* Inner shimmer */}
                <div
                  className="absolute inset-[25%] rounded-full"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, rgba(200,230,255,${isDiscovered ? 0.03 : 0.15}) 0%, transparent 70%)`,
                  }}
                />
                {/* Discovered indicator */}
                {isDiscovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm opacity-30">{b.emoji}</span>
                  </div>
                )}
                {/* Hover ring */}
                <div className="absolute inset-[-3px] rounded-full border border-[rgba(140,200,240,0)] group-hover:border-[rgba(140,200,240,0.3)] transition-all duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* ============================================
          BUBBLE BURST EFFECTS
          ============================================ */}
      {burstingId && burstPositions[burstingId] && (
        <BubbleBurst
          x={burstPositions[burstingId].x}
          y={burstPositions[burstingId].y}
          color={BUBBLE_COLORS[bubbles.find(b => b.species.id === burstingId)?.color || 'cyan'].core}
        />
      )}

      {/* ============================================
          FOREGROUND - depth blur at bottom
          ============================================ */}
      <div
        className="absolute bottom-0 left-0 right-0 h-20 z-[11] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(8,18,36,0.4) 0%, rgba(8,18,36,0.15) 50%, transparent 100%)',
        }}
      />

      {/* ============================================
          VIGNETTE - subtle, not too dark
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[10]"
        style={{ background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 30%, rgba(6,14,30,0.35) 100%)' }}
      />
    </div>
  );
}
