'use client';

import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import type { Species } from '@/data/species';

interface OceanSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  burstingId: string | null;
  mousePos: { x: number; y: number };
}

interface BubbleState {
  id: string;
  species: Species;
  // Current position (percentage of viewport)
  x: number;
  y: number;
  // Movement params
  riseSpeed: number; // px per frame
  wobbleAmp: number; // horizontal wobble amplitude
  wobbleSpeed: number; // wobble frequency
  wobblePhase: number; // starting phase offset
  size: number; // bubble radius in px
  parallaxFactor: number;
  color: string;
  emoji: string;
  // State
  active: boolean;
  respawnTimer: number | null; // countdown in ms
  opacity: number;
  scale: number;
}

const BUBBLE_COLORS: Record<string, { core: string; glow: string }> = {
  cyan: { core: 'rgba(0,220,240,0.5)', glow: 'rgba(0,220,240,0.15)' },
  blue: { core: 'rgba(100,180,240,0.5)', glow: 'rgba(100,180,240,0.12)' },
  purple: { core: 'rgba(160,120,240,0.4)', glow: 'rgba(160,120,240,0.10)' },
};

function BubbleBurst({ x, y, color }: { x: number; y: number; color: string }) {
  const fragments = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
      const dist = 30 + Math.random() * 60;
      const size = 3 + Math.random() * 6;
      const delay = Math.random() * 80;
      return { angle, dist, size, delay, id: i };
    }), []);

  return (
    <div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
      {/* Fragments */}
      {fragments.map((f) => (
        <div
          key={f.id}
          className="absolute rounded-full"
          style={{
            width: `${f.size}px`,
            height: `${f.size}px`,
            background: color.replace(/[\d.]+\)$/, '0.8)'),
            boxShadow: `0 0 ${f.size * 2}px ${color}`,
            animation: `fragmentScatter 0.5s ease-out ${f.delay}ms forwards`,
            '--frag-angle': `${f.angle}rad`,
            '--frag-dist': `${f.dist}px`,
          } as React.CSSProperties}
        />
      ))}
      {/* Ripple */}
      <div
        className="absolute rounded-full"
        style={{
          width: '10px',
          height: '10px',
          left: '-5px',
          top: '-5px',
          border: `2px solid ${color.replace(/[\d.]+\)$/, '0.4)')}`,
          animation: 'rippleExpand 0.6s ease-out forwards',
        }}
      />
    </div>
  );
}

export default function OceanScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  burstingId,
  mousePos,
}: OceanSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [burstPositions, setBurstPositions] = useState<Record<string, { x: number; y: number }>>({});
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const bubblesRef = useRef<BubbleState[]>([]);
  const [, forceUpdate] = useState(0);

  // Initialize bubbles
  useEffect(() => {
    const colorKeys = Object.keys(BUBBLE_COLORS);
    const initial: BubbleState[] = species.map((sp, i) => {
      const size = 22 + Math.random() * 28;
      return {
        id: sp.id,
        species: sp,
        x: 8 + (i / species.length) * 80 + (Math.random() - 0.5) * 12,
        y: 30 + Math.random() * 55, // Start scattered across the screen
        riseSpeed: 12 + Math.random() * 20, // px per second
        wobbleAmp: 8 + Math.random() * 18,
        wobbleSpeed: 0.3 + Math.random() * 0.6,
        wobblePhase: Math.random() * Math.PI * 2,
        size,
        parallaxFactor: 0.3 + Math.random() * 0.7,
        color: colorKeys[i % 3],
        emoji: sp.emoji,
        active: true,
        respawnTimer: null,
        opacity: 1,
        scale: 1,
      };
    });
    bubblesRef.current = initial;
    forceUpdate((n) => n + 1);
  }, [species]);

  // Animation loop - rise bubbles, handle respawn
  useEffect(() => {
    let destroyed = false;

    const animate = (timestamp: number) => {
      if (destroyed) return;
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1); // delta in seconds, capped
      lastTimeRef.current = timestamp;

      let needsUpdate = false;

      bubblesRef.current.forEach((b) => {
        if (!b.active && b.respawnTimer !== null) {
          // Countdown respawn timer
          b.respawnTimer -= dt * 1000;
          if (b.respawnTimer <= 0) {
            // Respawn from bottom
            b.active = true;
            b.respawnTimer = null;
            b.y = 102 + Math.random() * 10; // Below viewport
            b.x = 8 + Math.random() * 80;
            b.opacity = 0;
            b.scale = 0.5;
            needsUpdate = true;
          }
        }

        if (b.active) {
          // Rise upward
          b.y -= (b.riseSpeed * dt) / 10; // Convert to %/s roughly

          // Wobble horizontally
          b.x += Math.sin(timestamp * 0.001 * b.wobbleSpeed + b.wobblePhase) * b.wobbleAmp * dt * 0.1;

          // Fade in if just respawned
          if (b.opacity < 1) {
            b.opacity = Math.min(1, b.opacity + dt * 0.8);
            b.scale = Math.min(1, b.scale + dt * 0.8);
            needsUpdate = true;
          }

          // Reset when bubble floats off the top
          if (b.y < -8) {
            b.y = 102 + Math.random() * 10;
            b.x = 8 + Math.random() * 80;
            b.opacity = 0.8;
          }

          needsUpdate = true;
        }
      });

      if (needsUpdate) {
        forceUpdate((n) => n + 1);
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      destroyed = true;
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  // Handle bubble click
  const handleBubbleClick = useCallback((b: BubbleState) => {
    if (!b.active) return;

    // Record burst position
    setBurstPositions((prev) => ({ ...prev, [b.id]: { x: b.x, y: b.y } }));

    // Trigger species click
    onSpeciesClick(b.species);

    // Deactivate and start 5s respawn timer
    b.active = false;
    b.respawnTimer = 5000;
    b.opacity = 0;
    b.scale = 0;

    // Clean burst position after animation
    setTimeout(() => {
      setBurstPositions((prev) => {
        const next = { ...prev };
        delete next[b.id];
        return next;
      });
    }, 800);
  }, [onSpeciesClick]);

  // Track burst positions from parent
  useEffect(() => {
    if (burstingId) {
      const b = bubblesRef.current.find((b) => b.species.id === burstingId);
      if (b) {
        setBurstPositions((prev) => ({ ...prev, [burstingId]: { x: b.x, y: b.y } }));
        setTimeout(() => {
          setBurstPositions((prev) => {
            const next = { ...prev };
            delete next[burstingId];
            return next;
          });
        }, 800);
      }
    }
  }, [burstingId]);

  // Decorative background bubbles (small, non-interactive, always rising)
  const decoBubbles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      size: 3 + Math.random() * 10,
      riseDuration: 8 + Math.random() * 15,
      delay: Math.random() * -20,
      wobbleAmp: 2 + Math.random() * 8,
      opacity: 0.03 + Math.random() * 0.08,
    })), []);

  // Pre-generate fish shadows
  const fishShadows = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: 20 + Math.random() * 60,
      size: 10 + Math.random() * 20,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -25,
      direction: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.04 + Math.random() * 0.08,
    })), []);

  // Pre-generate bioluminescent particles
  const bioParticles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
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
    })), []);

  // Pre-generate jellyfish
  const jellyfish = useMemo(() =>
    Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 50,
      size: 30 + Math.random() * 50,
      duration: 10 + Math.random() * 15,
      delay: Math.random() * -15,
      driftX: 5 + Math.random() * 10,
      parallaxFactor: 0.15 + Math.random() * 0.2,
      opacity: 0.04 + Math.random() * 0.05,
    })), []);

  // Suspended particles in light beams
  const suspendedParticles = useMemo(() =>
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: 0.5 + Math.random() * 2,
      duration: 6 + Math.random() * 12,
      delay: Math.random() * -10,
      driftX: 1 + Math.random() * 4,
      driftY: 0.5 + Math.random() * 2,
      opacity: 0.15 + Math.random() * 0.4,
    })), []);

  // Caustic Canvas Animation
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

  const bubbles = bubblesRef.current;

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
          WATER SURFACE RIPPLES
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
          TYNDALL LIGHT BEAMS (JESUS LIGHT)
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.85 }}>
        <div className="absolute" style={{ top: '-5%', left: '35%', width: '18%', height: '115%', background: 'linear-gradient(180deg, rgba(200,235,255,0.2) 0%, rgba(160,215,245,0.08) 30%, rgba(140,200,240,0.03) 60%, transparent 85%)', transform: 'skewX(3deg)', animation: 'godRaySway 10s ease-in-out infinite', filter: 'blur(2px)' }} />
        <div className="absolute" style={{ top: '-8%', left: '15%', width: '14%', height: '110%', background: 'linear-gradient(180deg, rgba(180,225,250,0.15) 0%, rgba(140,200,240,0.06) 35%, rgba(120,180,220,0.02) 60%, transparent 85%)', transform: 'skewX(-5deg)', animation: 'godRaySway 13s ease-in-out infinite reverse', animationDelay: '-2s', filter: 'blur(3px)' }} />
        <div className="absolute" style={{ top: '-3%', left: '62%', width: '16%', height: '108%', background: 'linear-gradient(180deg, rgba(190,230,255,0.18) 0%, rgba(150,210,240,0.07) 30%, rgba(130,195,230,0.02) 60%, transparent 85%)', transform: 'skewX(4deg)', animation: 'godRaySway 11s ease-in-out infinite', animationDelay: '-4s', filter: 'blur(2px)' }} />
        <div className="absolute" style={{ top: '-5%', left: '80%', width: '8%', height: '100%', background: 'linear-gradient(180deg, rgba(200,235,255,0.12) 0%, rgba(160,215,245,0.04) 40%, transparent 75%)', transform: 'skewX(-3deg)', animation: 'godRaySway 15s ease-in-out infinite', animationDelay: '-6s', filter: 'blur(4px)' }} />
        <div className="absolute" style={{ top: '-6%', left: '5%', width: '10%', height: '105%', background: 'linear-gradient(180deg, rgba(180,225,250,0.1) 0%, rgba(140,200,240,0.03) 45%, transparent 80%)', transform: 'skewX(6deg)', animation: 'godRaySway 16s ease-in-out infinite reverse', animationDelay: '-8s', filter: 'blur(4px)' }} />
      </div>

      {/* ============================================
          SUSPENDED PARTICLES
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {suspendedParticles.map((p) => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            background: `rgba(220,240,255,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(200,230,255,${p.opacity * 0.3})`,
            animation: `suspendedParticleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            transform: `translate(${mousePos.x * p.driftX * 0.3}px, ${mousePos.y * p.driftY * 0.3}px)`,
            transition: 'transform 1s ease-out',
          }} />
        ))}
      </div>

      {/* ============================================
          SEABED TERRAIN
          ============================================ */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[35%] pointer-events-none z-[3]" viewBox="0 0 1440 350" preserveAspectRatio="none">
        <path d="M0,350 L0,260 Q80,230 160,250 Q280,200 400,230 Q520,180 640,210 Q760,170 880,200 Q1000,160 1120,190 Q1240,170 1360,200 Q1400,190 1440,210 L1440,350 Z" fill="#122845" opacity="0.8" />
        <path d="M0,350 L0,290 Q100,260 200,280 Q340,230 480,260 Q600,220 740,250 Q860,210 980,240 Q1100,210 1220,240 Q1340,220 1440,250 L1440,350 Z" fill="#1B2845" />
        <path d="M0,350 L0,310 Q60,290 120,300 Q200,270 300,290 Q400,260 500,280 Q600,255 700,275 Q800,250 900,270 Q1000,250 1100,270 Q1200,250 1300,270 Q1380,260 1440,275 L1440,350 Z" fill="#162240" />
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
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `bioParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite, bioParticleBlink ${p.blinkDuration}s ease-in-out ${p.blinkDelay}s infinite`,
            transform: `translate(${mousePos.x * p.driftX * p.parallaxFactor}px, ${mousePos.y * p.driftY * p.parallaxFactor}px)`,
            transition: 'transform 0.8s ease-out',
          }} />
        ))}
      </div>

      {/* ============================================
          JELLYFISH
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
        {jellyfish.map((jf) => (
          <div key={jf.id} className="absolute" style={{
            left: `${jf.x}%`, top: `${jf.y}%`,
            width: `${jf.size}px`, height: `${jf.size * 1.5}px`,
            background: `radial-gradient(ellipse at 50% 30%, rgba(140,120,220,${jf.opacity}) 0%, rgba(140,120,220,${jf.opacity * 0.3}) 50%, transparent 80%)`,
            borderRadius: '50% 50% 40% 40%',
            animation: `jellyfishFloat ${jf.duration}s ease-in-out ${jf.delay}s infinite`,
            transform: `translate(${mousePos.x * jf.driftX * jf.parallaxFactor}px, 0)`,
            transition: 'transform 1s ease-out',
          }}>
            <div className="absolute bottom-0 left-[15%] right-[15%] h-[60%]" style={{
              background: `linear-gradient(to bottom, rgba(140,120,220,${jf.opacity * 0.5}), transparent)`,
              borderRadius: '0 0 50% 50%',
              animation: `jellyfishTentacle ${jf.duration * 0.8}s ease-in-out ${jf.delay}s infinite`,
            }} />
          </div>
        ))}
      </div>

      {/* ============================================
          FISH SHADOWS
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[7]">
        {fishShadows.map((fish) => (
          <div key={fish.id} className="absolute" style={{
            top: `${fish.y}%`,
            left: fish.direction > 0 ? '-5%' : '105%',
            width: `${fish.size * 2}px`, height: `${fish.size}px`,
            background: `radial-gradient(ellipse, rgba(140,180,220,${fish.opacity}), transparent)`,
            borderRadius: '60% 40% 40% 60%',
            animation: `fishSwim ${fish.duration}s linear ${fish.delay}s infinite`,
            transform: fish.direction < 0 ? 'scaleX(-1)' : undefined,
          }} />
        ))}
      </div>

      {/* ============================================
          WATER CURRENT LIGHT BANDS
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[7]" style={{ opacity: 0.5 }}>
        <div className="absolute" style={{ top: '25%', left: '-10%', width: '40%', height: '3%', background: 'linear-gradient(90deg, transparent, rgba(140,180,220,0.08), transparent)', borderRadius: '50%', animation: 'currentFlow 20s linear infinite' }} />
        <div className="absolute" style={{ top: '55%', left: '70%', width: '35%', height: '2%', background: 'linear-gradient(90deg, transparent, rgba(107,91,141,0.06), transparent)', borderRadius: '50%', animation: 'currentFlow 25s linear infinite reverse' }} />
      </div>

      {/* ============================================
          DECORATIVE BACKGROUND BUBBLES (small, non-interactive, always rising)
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[7.5]">
        {decoBubbles.map((db) => (
          <div
            key={db.id}
            className="absolute rounded-full"
            style={{
              left: `${db.startX}%`,
              bottom: '-5%',
              width: `${db.size}px`,
              height: `${db.size}px`,
              background: `radial-gradient(circle at 35% 35%, rgba(224,240,255,${db.opacity * 2}) 0%, rgba(184,216,232,${db.opacity}) 50%, transparent 100%)`,
              boxShadow: `0 0 ${db.size}px rgba(140,200,240,${db.opacity})`,
              animation: `decoBubbleRise ${db.riseDuration}s linear ${db.delay}s infinite`,
              '--deco-wobble': `${db.wobbleAmp}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ============================================
          SPECIES BUBBLES — continuously rising from the bottom
          ============================================ */}
      <div className="absolute inset-0 z-[8]">
        {bubbles.map((b) => {
          if (!b.active && b.respawnTimer !== null && b.respawnTimer > 0) {
            // Hidden, waiting to respawn — don't render
            return <div key={b.id} />;
          }

          const bubbleColor = BUBBLE_COLORS[b.color] || BUBBLE_COLORS.cyan;
          const isDiscovered = unlockedIds.has(b.species.id) && recentlyClicked.has(b.species.id);
          const isBursting = burstingId === b.species.id;
          const parallaxX = mousePos.x * b.parallaxFactor * 8;
          const parallaxY = mousePos.y * b.parallaxFactor * 5;

          return (
            <div
              key={b.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: `translate(${parallaxX}px, ${parallaxY}px) scale(${b.scale})`,
                opacity: b.opacity,
                transition: 'opacity 0.7s ease-out, transform 0.5s ease-out',
                zIndex: 8 + Math.round(b.size / 15),
              }}
              onClick={() => handleBubbleClick(b)}
            >
              <div
                className={`
                  relative rounded-full
                  ${isBursting ? 'bubble-burst' : ''}
                  hover:scale-110
                  transition-transform duration-300 ease-out
                `}
                style={{
                  width: `${b.size * 2}px`,
                  height: `${b.size * 2}px`,
                  animation: `bubbleBreath ${3 + Math.random() * 3}s ease-in-out infinite`,
                }}
              >
                {/* Main bubble gradient */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-700"
                  style={{
                    background: `radial-gradient(circle at 35% 35%, rgba(224,240,255,0.3) 0%, rgba(184,216,232,0.18) 40%, rgba(140,190,220,0.06) 70%, transparent 100%)`,
                    boxShadow: `0 0 ${b.size * 1.5}px ${bubbleColor.glow}, 0 0 ${b.size * 3}px rgba(100,160,220,0.06), inset 0 0 ${b.size * 0.5}px rgba(224,240,255,0.08)`,
                  }}
                />
                {/* Color core glow */}
                <div
                  className="absolute inset-[15%] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${bubbleColor.core} 0%, transparent 70%)`,
                  }}
                />
                {/* Highlight reflection */}
                <div className="bubble-highlight" style={{ opacity: 0.8 }} />
                {/* Inner shimmer */}
                <div
                  className="absolute inset-[25%] rounded-full"
                  style={{
                    background: 'radial-gradient(circle at 40% 40%, rgba(200,230,255,0.15) 0%, transparent 70%)',
                  }}
                />
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
          FOREGROUND depth blur at bottom
          ============================================ */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-[11] pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(8,18,36,0.4) 0%, rgba(8,18,36,0.15) 50%, transparent 100%)',
      }} />

      {/* ============================================
          VIGNETTE
          ============================================ */}
      <div className="absolute inset-0 pointer-events-none z-[10]" style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 30%, rgba(6,14,30,0.35) 100%)',
      }} />
    </div>
  );
}
