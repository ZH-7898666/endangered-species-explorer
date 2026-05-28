'use client';

import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import type { Species } from '@/data/species';

interface OceanSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  mousePos: { x: number; y: number };
  burstingId: string | null;
}

const BUBBLE_COLORS = {
  cyan: { core: 'rgba(0,220,240,0.6)', glow: 'rgba(0,220,240,0.25)' },
  blue: { core: 'rgba(100,160,240,0.6)', glow: 'rgba(100,160,240,0.25)' },
  teal: { core: 'rgba(0,200,180,0.6)', glow: 'rgba(0,200,180,0.25)' },
  purple: { core: 'rgba(160,100,240,0.6)', glow: 'rgba(160,100,240,0.25)' },
} as const;

type BubbleColorKey = keyof typeof BUBBLE_COLORS;

interface BubbleState {
  id: number;
  species: Species;
  x: number;
  y: number;
  targetY: number;  // final resting Y position
  size: number;
  scale: number;
  opacity: number;
  color: BubbleColorKey;
  emoji: string;
  wobbleAmp: number;
  riseSpeed: number;
  breathDuration: number;
  active: boolean;
  respawnTimer: number | null;
  emerged: boolean;    // whether bubble has finished rising to targetY
  emergeDelay: number; // seconds before starting to rise
  emerging: boolean;   // currently rising from bottom
}

function BubbleBurst({ x, y, color }: { x: number; y: number; color: string }) {
  const fragments = useMemo(() =>
    Array.from({ length: 10 }, (_, i) => {
      const angle = (Math.PI * 2 / 10) * i + (Math.random() - 0.5) * 0.4;
      const dist = 30 + Math.random() * 50;
      return { angle, dist, size: 3 + Math.random() * 5, duration: 0.4 + Math.random() * 0.3 };
    }), []);

  return (
    <div className="absolute pointer-events-none" style={{ left: `${x}%`, top: `${y}%`, zIndex: 50 }}>
      {fragments.map((f, i) => (
        <div key={i} className="absolute rounded-full" style={{
          width: f.size, height: f.size,
          background: color,
          boxShadow: `0 0 ${f.size * 2}px ${color}`,
          animation: `fragmentScatter ${f.duration}s ease-out forwards`,
          '--frag-tx': `${Math.cos(f.angle) * f.dist}px`,
          '--frag-ty': `${Math.sin(f.angle) * f.dist}px`,
        } as React.CSSProperties} />
      ))}
      <div className="absolute" style={{
        width: 60, height: 60, left: -30, top: -30,
        border: '1px solid rgba(140,200,240,0.3)',
        borderRadius: '50%',
        animation: 'rippleExpand 0.6s ease-out forwards',
      }} />
    </div>
  );
}

export default function OceanScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  mousePos,
  burstingId,
}: OceanSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bubblesRef = useRef<BubbleState[]>([]);
  const [bubbles, setBubbles] = useState<BubbleState[]>([]);
  const [burstPositions, setBurstPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [dayNightPhase, setDayNightPhase] = useState(0);

  // ====== DAY-NIGHT CYCLE (60s period) ======
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const t = (Date.now() - start) / 1000;
      setDayNightPhase(Math.sin(t * Math.PI / 30) * 0.08); // ±8% brightness
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // ====== FISH SCHOOL (occasional V-formation) ======
  const [fishSchool, setFishSchool] = useState<{ id: number; fish: { x: number; y: number; delay: number }[]; direction: number; startTime: number } | null>(null);

  useEffect(() => {
    const scheduleSchool = () => {
      const delay = 20000 + Math.random() * 25000; // 20-45s
      const timer = setTimeout(() => {
        const dir = Math.random() > 0.5 ? 1 : -1;
        const baseY = 15 + Math.random() * 40;
        const fishCount = 5 + Math.floor(Math.random() * 4);
        setFishSchool({
          id: Date.now(),
          direction: dir,
          startTime: Date.now(),
          fish: Array.from({ length: fishCount }, (_, i) => ({
            x: dir > 0 ? -8 - i * 3 : 108 + i * 3,
            y: baseY + (i - fishCount / 2) * 3 + Math.random() * 2,
            delay: i * 0.15,
          })),
        });
        setTimeout(() => setFishSchool(null), 12000);
        scheduleSchool();
      }, delay);
      return timer;
    };
    const timer = scheduleSchool();
    return () => clearTimeout(timer);
  }, []);

  // ====== WHALE RIPPLE (occasional) ======
  const [whaleRipple, setWhaleRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const scheduleRipple = () => {
      const delay = 30000 + Math.random() * 30000;
      const timer = setTimeout(() => {
        setWhaleRipple({ x: 20 + Math.random() * 60, y: 30 + Math.random() * 40, id: Date.now() });
        setTimeout(() => setWhaleRipple(null), 4000);
        scheduleRipple();
      }, delay);
      return timer;
    };
    const timer = scheduleRipple();
    return () => clearTimeout(timer);
  }, []);

  // ====== ABYSS EYES (occasional) ======
  const [abyssEyes, setAbyssEyes] = useState<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    const scheduleEyes = () => {
      const delay = 35000 + Math.random() * 40000;
      const timer = setTimeout(() => {
        const side = Math.random() > 0.5;
        setAbyssEyes({ x: side ? 3 + Math.random() * 12 : 85 + Math.random() * 12, y: 70 + Math.random() * 20, id: Date.now() });
        setTimeout(() => setAbyssEyes(null), 4000);
        scheduleEyes();
      }, delay);
      return timer;
    };
    const timer = scheduleEyes();
    return () => clearTimeout(timer);
  }, []);

  // ====== SEAWEED ======
  const seaweeds = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: 8 + i * 15 + Math.random() * 8,
      height: 120 + Math.random() * 100,
      width: 8 + Math.random() * 6,
      swayDuration: 4 + Math.random() * 4,
      swayDelay: Math.random() * -5,
      segments: 4 + Math.floor(Math.random() * 3),
      color: i % 2 === 0 ? 'rgba(30,80,60,0.35)' : 'rgba(20,70,55,0.3)',
      glowColor: i % 3 === 0 ? 'rgba(60,180,140,0.08)' : 'transparent',
    })), []);

  // ====== CORAL ======
  const corals = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      id: i,
      x: 10 + i * 18 + Math.random() * 10,
      type: i % 3 as 0 | 1 | 2, // 0=branch, 1=fan, 2=brain
      size: 20 + Math.random() * 30,
      glowColor: ['rgba(180,100,200,0.06)', 'rgba(200,80,150,0.05)', 'rgba(100,150,220,0.06)', 'rgba(220,120,160,0.05)', 'rgba(140,100,220,0.06)'][i],
      breathDuration: 3 + Math.random() * 3,
      breathDelay: Math.random() * -4,
    })), []);

  // ====== BUBBLE SYSTEM (progressive emergence from bottom) ======
  const colorKeys = useMemo(() => Object.keys(BUBBLE_COLORS) as BubbleColorKey[], []);
  const mountTimeRef = useRef<number>(0);
  const hiddenTimersRef = useRef<Record<number, number>>({});

  useEffect(() => {
    mountTimeRef.current = Date.now();
    const targetYs = species.map((_, i) => 10 + ((i * 29 + 7) % 70)); // deterministic target positions
    const initial: BubbleState[] = species.map((sp, i) => ({
      id: i,
      species: sp,
      x: 8 + ((i * 37 + 13) % 84),
      y: 110 + Math.random() * 20,  // start below screen
      targetY: targetYs[i],
      size: 18 + Math.random() * 16,
      scale: 1,
      opacity: 0,  // invisible until emergence starts
      color: colorKeys[Math.floor(Math.random() * colorKeys.length)],
      emoji: sp.emoji || '🐠',
      wobbleAmp: 4 + Math.random() * 8,
      riseSpeed: 0.15 + Math.random() * 0.1,  // rise speed (faster than drift)
      breathDuration: 4 + Math.random() * 2,
      active: false,
      respawnTimer: null,
      emerged: false,
      emergeDelay: 1 + i * 0.3 + Math.random() * 2,  // stagger: 1s ~ 20s
      emerging: false,
    }));
    bubblesRef.current = initial;
    setBubbles(initial);
  }, [species, colorKeys]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      Object.values(hiddenTimersRef.current).forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (bubblesRef.current.length === 0) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - mountTimeRef.current) / 1000;
      bubblesRef.current = bubblesRef.current.map(b => {
        // Emergence phase: bubble rises from bottom to targetY
        if (!b.emerged && !b.emerging && elapsed >= b.emergeDelay) {
          return { ...b, emerging: true, active: true, opacity: 0.8 };
        }
        if (b.emerging && !b.emerged) {
          const newY = b.y - b.riseSpeed * 3; // rise faster during emergence
          if (newY <= b.targetY) {
            return { ...b, y: b.targetY, emerged: true, emerging: false, opacity: 1 };
          }
          return { ...b, y: newY };
        }
        // Normal drift phase (emerged bubbles)
        if (!b.active) return b;
        const newY = b.y - b.riseSpeed * 0.3;  // very slow normal drift
        if (newY < -8) {
          return { ...b, y: 105, x: 8 + Math.random() * 84 };
        }
        return { ...b, y: newY };
      });
      setBubbles([...bubblesRef.current]);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleBubbleClick = useCallback((bubble: BubbleState) => {
    setBurstPositions(prev => ({ ...prev, [bubble.species.id]: { x: bubble.x, y: bubble.y } }));
    onSpeciesClick(bubble.species);

    // Hide the bubble (burst effect)
    setBubbles(prev => prev.map(b =>
      b.id === bubble.id ? { ...b, scale: 0, opacity: 0, active: false, emerged: false, emerging: false, respawnTimer: 0 } : b
    ));
    bubblesRef.current = bubblesRef.current.map(b =>
      b.id === bubble.id ? { ...b, scale: 0, opacity: 0, active: false, emerged: false, emerging: false, respawnTimer: 0 } : b
    );

    // After 8-12 seconds, re-emerge from bottom
    const reemergeDelay = 8000 + Math.random() * 4000;
    if (hiddenTimersRef.current[bubble.id]) {
      clearTimeout(hiddenTimersRef.current[bubble.id]);
    }
    hiddenTimersRef.current[bubble.id] = window.setTimeout(() => {
      const newY = 110 + Math.random() * 20;
      const newTargetY = 10 + Math.random() * 70;
      const newX = 8 + Math.random() * 84;
      setBubbles(prev => prev.map(b =>
        b.id === bubble.id ? { ...b, y: newY, targetY: newTargetY, x: newX, scale: 1, opacity: 0.8, active: true, emerging: true, emerged: false, respawnTimer: null } : b
      ));
      bubblesRef.current = bubblesRef.current.map(b =>
        b.id === bubble.id ? { ...b, y: newY, targetY: newTargetY, x: newX, scale: 1, opacity: 0.8, active: true, emerging: true, emerged: false, respawnTimer: null } : b
      );
    }, reemergeDelay);
  }, [onSpeciesClick]);

  // ====== EXISTING MEMO DATA ======
  const fishShadows = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: 20 + Math.random() * 50,
      size: 8 + Math.random() * 18,
      duration: 12 + Math.random() * 20,
      delay: Math.random() * -15,
      direction: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.04 + Math.random() * 0.06,
    })), []);

  const bioParticles = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * -10,
      blinkDuration: 3 + Math.random() * 5,
      blinkDelay: Math.random() * -5,
      driftX: 3 + Math.random() * 8,
      driftY: 2 + Math.random() * 5,
      parallaxFactor: 0.1 + Math.random() * 0.3,
      color: ['rgba(0,220,240,0.5)', 'rgba(100,180,240,0.4)', 'rgba(160,120,240,0.35)', 'rgba(140,220,200,0.35)'][Math.floor(Math.random() * 4)] as string,
    })), []);

  const jellyfish = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      y: 15 + Math.random() * 50,
      size: 30 + Math.random() * 50,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * -15,
      driftX: 5 + Math.random() * 10,
      parallaxFactor: 0.15 + Math.random() * 0.2,
      opacity: 0.03 + Math.random() * 0.04,
    })), []);

  const suspendedParticles = useMemo(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: 0.5 + Math.random() * 1.5,
      duration: 8 + Math.random() * 14,
      delay: Math.random() * -10,
      driftX: 1 + Math.random() * 3,
      driftY: 0.5 + Math.random() * 1.5,
      opacity: 0.1 + Math.random() * 0.25,
    })), []);

  const decoBubbles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      startX: Math.random() * 100,
      size: 3 + Math.random() * 8,
      opacity: 0.08 + Math.random() * 0.12,
      riseDuration: 8 + Math.random() * 14,
      delay: Math.random() * -12,
      wobbleAmp: 5 + Math.random() * 10,
    })), []);

  // ====== CAUSTIC CANVAS ======
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

    const causticPoints = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 120 + Math.random() * 280,
      speedX: 0.15 + Math.random() * 0.35,
      speedY: 0.08 + Math.random() * 0.2,
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
        gradient.addColorStop(0, `rgba(140, 200, 240, 0.05)`);
        gradient.addColorStop(0.5, `rgba(100, 180, 220, 0.02)`);
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

  const currentBubbles = bubblesRef.current;

  // Day-night brightness filter
  const brightnessFilter = `brightness(${1 + dayNightPhase})`;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ filter: brightnessFilter, transition: 'filter 1s ease' }}>
      {/* BACKGROUND */}
      <div className="absolute inset-0" style={{
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
      }} />

      {/* WATER SURFACE RIPPLES */}
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

      {/* TYNDALL LIGHT BEAMS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.85 }}>
        <div className="absolute" style={{ top: '-5%', left: '35%', width: '18%', height: '115%', background: 'linear-gradient(180deg, rgba(200,235,255,0.2) 0%, rgba(160,215,245,0.08) 30%, rgba(140,200,240,0.03) 60%, transparent 85%)', transform: 'skewX(3deg)', animation: 'godRaySway 10s ease-in-out infinite', filter: 'blur(2px)' }} />
        <div className="absolute" style={{ top: '-8%', left: '15%', width: '14%', height: '110%', background: 'linear-gradient(180deg, rgba(180,225,250,0.15) 0%, rgba(140,200,240,0.06) 35%, rgba(120,180,220,0.02) 60%, transparent 85%)', transform: 'skewX(-5deg)', animation: 'godRaySway 13s ease-in-out infinite reverse', animationDelay: '-2s', filter: 'blur(3px)' }} />
        <div className="absolute" style={{ top: '-3%', left: '62%', width: '16%', height: '108%', background: 'linear-gradient(180deg, rgba(190,230,255,0.18) 0%, rgba(150,210,240,0.07) 30%, rgba(130,195,230,0.02) 60%, transparent 85%)', transform: 'skewX(4deg)', animation: 'godRaySway 11s ease-in-out infinite', animationDelay: '-4s', filter: 'blur(2px)' }} />
        <div className="absolute" style={{ top: '-5%', left: '80%', width: '8%', height: '100%', background: 'linear-gradient(180deg, rgba(200,235,255,0.12) 0%, rgba(160,215,245,0.04) 40%, transparent 75%)', transform: 'skewX(-3deg)', animation: 'godRaySway 15s ease-in-out infinite', animationDelay: '-6s', filter: 'blur(4px)' }} />
        <div className="absolute" style={{ top: '-6%', left: '5%', width: '10%', height: '105%', background: 'linear-gradient(180deg, rgba(180,225,250,0.1) 0%, rgba(140,200,240,0.03) 45%, transparent 80%)', transform: 'skewX(6deg)', animation: 'godRaySway 16s ease-in-out infinite reverse', animationDelay: '-8s', filter: 'blur(4px)' }} />
      </div>

      {/* SUSPENDED PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        {suspendedParticles.map((p) => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            background: `rgba(220,240,255,${p.opacity})`,
            boxShadow: `0 0 ${p.size * 2}px rgba(200,230,255,${p.opacity * 0.3})`,
            animation: `suspendedParticleDrift ${p.duration}s ease-in-out ${p.delay}s infinite`,
            transform: `translate(${mousePos.x * p.driftX * 0.3}px, ${mousePos.y * p.driftY * 0.3}px)`,
            transition: 'transform 1.2s ease-out',
          }} />
        ))}
      </div>

      {/* SEABED TERRAIN */}
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

      {/* ====== SEAWEED FOREST ====== */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] pointer-events-none z-[3.5] overflow-hidden">
        {seaweeds.map((sw) => (
          <div key={sw.id} className="absolute" style={{
            left: `${sw.x}%`,
            bottom: '8%',
            width: `${sw.width}px`,
            height: `${sw.height}px`,
          }}>
            <svg width={sw.width} height={sw.height} viewBox={`0 0 ${sw.width} ${sw.height}`} style={{ overflow: 'visible' }}>
              <path
                d={`M${sw.width / 2},${sw.height} Q${sw.width / 2 - sw.width * 0.3},${sw.height * 0.6} ${sw.width / 2},${sw.height * 0.3} Q${sw.width / 2 + sw.width * 0.2},${sw.height * 0.1} ${sw.width / 2},0`}
                fill="none"
                stroke={sw.color}
                strokeWidth={sw.width * 0.4}
                strokeLinecap="round"
                style={{
                  animation: `seaweedSway ${sw.swayDuration}s ease-in-out ${sw.swayDelay}s infinite`,
                  transformOrigin: 'bottom center',
                  filter: sw.glowColor !== 'transparent' ? `drop-shadow(0 0 8px ${sw.glowColor})` : 'none',
                }}
              />
              {/* Leaf details */}
              {Array.from({ length: sw.segments }, (_, j) => {
                const yPct = (j + 1) / (sw.segments + 1);
                const side = j % 2 === 0 ? -1 : 1;
                return (
                  <ellipse
                    key={j}
                    cx={sw.width / 2 + side * sw.width * 0.3 * yPct}
                    cy={sw.height * (1 - yPct)}
                    rx={sw.width * 0.25}
                    ry={sw.width * 0.12}
                    fill={sw.color}
                    opacity={0.6}
                    style={{
                      animation: `seaweedSway ${sw.swayDuration}s ease-in-out ${sw.swayDelay + j * 0.2}s infinite`,
                      transformOrigin: `${sw.width / 2}px ${sw.height * (1 - yPct)}px`,
                    }}
                  />
                );
              })}
            </svg>
            {/* Tiny bubbles from seaweed */}
            <div className="absolute bottom-[60%] left-1/2 -translate-x-1/2" style={{
              width: 3, height: 3, borderRadius: '50%',
              background: 'rgba(140,200,240,0.2)',
              animation: `seaweedBubble ${3 + sw.id * 0.5}s ease-in-out ${sw.swayDelay}s infinite`,
            }} />
          </div>
        ))}
      </div>

      {/* ====== CORAL BIOLUMINESCENCE ====== */}
      <div className="absolute bottom-0 left-0 right-0 h-[30%] pointer-events-none z-[3.6]">
        {corals.map((c) => (
          <div key={c.id} className="absolute" style={{ left: `${c.x}%`, bottom: '12%' }}>
            {c.type === 0 && ( /* Branch coral */
              <svg width={c.size * 1.5} height={c.size * 1.2} viewBox="0 0 60 48">
                <path d="M30,48 L30,30 M30,30 L15,15 M30,30 L45,18 M15,15 L8,8 M15,15 L20,5 M45,18 L52,10 M45,18 L38,8"
                  stroke="rgba(180,80,120,0.15)" strokeWidth="3" strokeLinecap="round" fill="none" />
                <circle cx="8" cy="8" r="3" fill="rgba(180,80,120,0.2)" />
                <circle cx="20" cy="5" r="2.5" fill="rgba(200,100,150,0.15)" />
                <circle cx="52" cy="10" r="3" fill="rgba(180,80,120,0.2)" />
                <circle cx="38" cy="8" r="2.5" fill="rgba(200,100,150,0.15)" />
              </svg>
            )}
            {c.type === 1 && ( /* Fan coral */
              <svg width={c.size} height={c.size * 0.8} viewBox="0 0 40 32">
                <ellipse cx="20" cy="12" rx="18" ry="12" fill="rgba(100,150,200,0.1)" />
                <path d="M20,32 L20,12" stroke="rgba(100,150,200,0.12)" strokeWidth="2" />
              </svg>
            )}
            {c.type === 2 && ( /* Brain coral */
              <svg width={c.size * 0.9} height={c.size * 0.7} viewBox="0 0 36 28">
                <ellipse cx="18" cy="14" rx="16" ry="12" fill="rgba(140,100,180,0.1)" />
                <path d="M6,14 Q10,10 14,14 Q18,18 22,14 Q26,10 30,14" stroke="rgba(140,100,180,0.08)" strokeWidth="1.5" fill="none" />
              </svg>
            )}
            {/* Bioluminescent glow */}
            <div className="absolute inset-0" style={{
              background: `radial-gradient(circle, ${c.glowColor} 0%, transparent 70%)`,
              animation: `coralBreath ${c.breathDuration}s ease-in-out ${c.breathDelay}s infinite`,
              filter: 'blur(6px)',
            }} />
          </div>
        ))}
      </div>

      {/* Caustic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[4]" />

      {/* BIOLUMINESCENT PARTICLES */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
        {bioParticles.map((p) => (
          <div key={p.id} className="absolute rounded-full" style={{
            left: `${p.x}%`, top: `${p.y}%`,
            width: `${p.size}px`, height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animation: `bioParticleFloat ${p.duration}s ease-in-out ${p.delay}s infinite, bioParticleBlink ${p.blinkDuration}s ease-in-out ${p.blinkDelay}s infinite`,
            transform: `translate(${mousePos.x * p.driftX * p.parallaxFactor}px, ${mousePos.y * p.driftY * p.parallaxFactor}px)`,
            transition: 'transform 1s ease-out',
          }} />
        ))}
      </div>

      {/* JELLYFISH */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
        {jellyfish.map((jf) => (
          <div key={jf.id} className="absolute" style={{
            left: `${jf.x}%`, top: `${jf.y}%`,
            width: `${jf.size}px`, height: `${jf.size * 1.5}px`,
            background: `radial-gradient(ellipse at 50% 30%, rgba(140,120,220,${jf.opacity}) 0%, rgba(140,120,220,${jf.opacity * 0.3}) 50%, transparent 80%)`,
            borderRadius: '50% 50% 40% 40%',
            animation: `jellyfishFloat ${jf.duration}s ease-in-out ${jf.delay}s infinite`,
            transform: `translate(${mousePos.x * jf.driftX * jf.parallaxFactor}px, 0)`,
            transition: 'transform 1.2s ease-out',
          }}>
            <div className="absolute bottom-0 left-[15%] right-[15%] h-[60%]" style={{
              background: `linear-gradient(to bottom, rgba(140,120,220,${jf.opacity * 0.5}), transparent)`,
              borderRadius: '0 0 50% 50%',
              animation: `jellyfishTentacle ${jf.duration * 0.8}s ease-in-out ${jf.delay}s infinite`,
            }} />
          </div>
        ))}
      </div>

      {/* FISH SHADOWS */}
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

      {/* ====== FISH SCHOOL (V-formation) ====== */}
      {fishSchool && (
        <div className="absolute inset-0 pointer-events-none z-[7.5]">
          {fishSchool.fish.map((f, i) => (
            <div key={`${fishSchool.id}-${i}`} className="absolute" style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: '14px', height: '7px',
              background: `radial-gradient(ellipse, rgba(180,220,255,0.2), transparent)`,
              borderRadius: '60% 40% 40% 60%',
              transform: fishSchool.direction < 0 ? 'scaleX(-1)' : undefined,
              animation: `fishSchoolSwim 10s linear ${f.delay}s forwards`,
              '--swim-dir': fishSchool.direction,
              opacity: 0.2,
            } as React.CSSProperties} />
          ))}
        </div>
      )}

      {/* ====== WHALE RIPPLE ====== */}
      {whaleRipple && (
        <div className="absolute pointer-events-none z-[7.6]" style={{
          left: `${whaleRipple.x}%`, top: `${whaleRipple.y}%`,
          transform: 'translate(-50%, -50%)',
        }}>
          {[0, 1, 2].map((ring) => (
            <div key={ring} className="absolute" style={{
              width: 60 + ring * 60, height: 30 + ring * 30,
              left: -(30 + ring * 30), top: -(15 + ring * 15),
              border: `1px solid rgba(100,180,220,${0.15 - ring * 0.04})`,
              borderRadius: '50%',
              animation: `whaleRippleExpand ${2 + ring * 0.5}s ease-out forwards`,
              animationDelay: `${ring * 0.3}s`,
            }} />
          ))}
        </div>
      )}

      {/* ====== ABYSS EYES ====== */}
      {abyssEyes && (
        <div className="absolute pointer-events-none z-[7.7]" style={{
          left: `${abyssEyes.x}%`, top: `${abyssEyes.y}%`,
          animation: 'abyssEyesAppear 4s ease-in-out forwards',
        }}>
          <div className="flex gap-[14px]" style={{ opacity: 0.12 }}>
            <div style={{
              width: 10, height: 6, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(180,220,140,0.6), transparent)',
              boxShadow: '0 0 12px rgba(180,220,140,0.2)',
            }} />
            <div style={{
              width: 10, height: 6, borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(180,220,140,0.6), transparent)',
              boxShadow: '0 0 12px rgba(180,220,140,0.2)',
            }} />
          </div>
        </div>
      )}

      {/* WATER CURRENT LIGHT BANDS */}
      <div className="absolute inset-0 pointer-events-none z-[7]" style={{ opacity: 0.5 }}>
        <div className="absolute" style={{ top: '25%', left: '-10%', width: '40%', height: '3%', background: 'linear-gradient(90deg, transparent, rgba(140,180,220,0.08), transparent)', borderRadius: '50%', animation: 'currentFlow 20s linear infinite' }} />
        <div className="absolute" style={{ top: '55%', left: '70%', width: '35%', height: '2%', background: 'linear-gradient(90deg, transparent, rgba(107,91,141,0.06), transparent)', borderRadius: '50%', animation: 'currentFlow 25s linear infinite reverse' }} />
      </div>

      {/* DECORATIVE BACKGROUND BUBBLES */}
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

      {/* SPECIES BUBBLES */}
      <div className="absolute inset-0 z-[8]">
        {currentBubbles.map((b) => {
          // Hidden bubbles (just clicked, waiting to re-emerge)
          if (!b.active && !b.emerging) {
            return <div key={b.id} />;
          }

          const bubbleColor = BUBBLE_COLORS[b.color] || BUBBLE_COLORS.cyan;
          const isDiscovered = unlockedIds.has(b.species.id) && recentlyClicked.has(b.species.id);
          const isBursting = burstingId === b.species.id;

          // Fade in effect during emergence
          const emergenceOpacity = b.emerging ? Math.min(1, (110 - b.y) / 30) : b.opacity;

          return (
            <div
              key={b.id}
              className="absolute cursor-pointer group"
              style={{
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: `scale(${b.scale})`,
                opacity: isBursting ? 0 : emergenceOpacity,
                transition: isBursting ? 'opacity 0.15s, transform 0.15s' : 'opacity 0.8s ease-out, transform 0.7s ease-out',
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
                  animation: `bubbleBreath ${b.breathDuration}s ease-in-out infinite`,
                }}
              >
                <div className="absolute inset-0 rounded-full transition-all duration-700" style={{
                  background: `radial-gradient(circle at 35% 35%, rgba(224,240,255,0.3) 0%, rgba(184,216,232,0.18) 40%, rgba(140,190,220,0.06) 70%, transparent 100%)`,
                  boxShadow: `0 0 ${b.size * 1.5}px ${bubbleColor.glow}, 0 0 ${b.size * 3}px rgba(100,160,220,0.06), inset 0 0 ${b.size * 0.5}px rgba(224,240,255,0.08)`,
                }} />
                <div className="absolute inset-[15%] rounded-full" style={{
                  background: `radial-gradient(circle, ${bubbleColor.core} 0%, transparent 70%)`,
                  opacity: isDiscovered ? 0.4 : 1,
                  transition: 'opacity 0.7s ease-out',
                }} />
                <div className="bubble-highlight" style={{ opacity: 0.8 }} />
                <div className="absolute inset-[25%] rounded-full" style={{
                  background: 'radial-gradient(circle at 40% 40%, rgba(200,230,255,0.15) 0%, transparent 70%)',
                }} />
                <div className="absolute inset-[-3px] rounded-full border border-[rgba(140,200,240,0)] group-hover:border-[rgba(140,200,240,0.3)] transition-all duration-300" />
                {isDiscovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-lg opacity-60 select-none">{b.emoji}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* BUBBLE BURST EFFECTS */}
      {burstingId && burstPositions[burstingId] && (
        <BubbleBurst
          x={burstPositions[burstingId].x}
          y={burstPositions[burstingId].y}
          color={BUBBLE_COLORS[currentBubbles.find(b => b.species.id === burstingId)?.color || 'cyan'].core}
        />
      )}

      {/* FOREGROUND depth blur */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-[11] pointer-events-none" style={{
        background: 'linear-gradient(to top, rgba(8,18,36,0.4) 0%, rgba(8,18,36,0.15) 50%, transparent 100%)',
      }} />

      {/* VIGNETTE */}
      <div className="absolute inset-0 pointer-events-none z-[10]" style={{
        background: 'radial-gradient(ellipse 120% 100% at 50% 30%, transparent 30%, rgba(6,14,30,0.35) 100%)',
      }} />
    </div>
  );
}
