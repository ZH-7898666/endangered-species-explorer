'use client';

import { useMemo, useEffect, useRef } from 'react';
import type { Species } from '@/data/species';

interface OceanSceneProps {
  species: Species[];
  unlockedIds: Set<string>;
  recentlyClicked: Set<string>;
  onSpeciesClick: (species: Species) => void;
  isVisible: boolean;
  mousePos: { x: number; y: number };
}

const BUBBLE_COLORS = {
  cyan: { core: 'rgba(0,220,240,0.7)', glow: 'rgba(0,220,240,0.15)' },
  blue: { core: 'rgba(100,160,240,0.6)', glow: 'rgba(100,160,240,0.12)' },
  purple: { core: 'rgba(160,100,240,0.6)', glow: 'rgba(160,100,240,0.12)' },
} as const;

type BubbleColorKey = keyof typeof BUBBLE_COLORS;

export function OceanScene({
  species,
  unlockedIds,
  recentlyClicked,
  onSpeciesClick,
  isVisible,
  mousePos,
}: OceanSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  // Pre-generate fish shadows
  const fishShadows = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      y: 20 + Math.random() * 60,
      size: 10 + Math.random() * 20,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -25,
      direction: Math.random() > 0.5 ? 1 : -1,
      opacity: 0.03 + Math.random() * 0.06,
      yOffset: 10 + Math.random() * 30,
    }));
  }, []);

  // Pre-generate bioluminescent particles
  const bioParticles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
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
      color: ['rgba(0,220,240,0.6)', 'rgba(100,160,240,0.5)', 'rgba(160,100,240,0.5)', 'rgba(140,220,200,0.4)'][Math.floor(Math.random() * 4)] as string,
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
      opacity: 0.03 + Math.random() * 0.04,
    }));
  }, []);

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

    const causticPoints = Array.from({ length: 12 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 80 + Math.random() * 200,
      speedX: 0.2 + Math.random() * 0.4,
      speedY: 0.1 + Math.random() * 0.2,
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

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Background gradient - brighter, more luminous */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 15%, rgba(140,200,240,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 30% 70%, rgba(100,140,220,0.05) 0%, transparent 50%),
            radial-gradient(ellipse 50% 60% at 80% 50%, rgba(107,91,141,0.06) 0%, transparent 50%),
            linear-gradient(175deg, #0E2848 0%, #123558 20%, #1A4468 40%, #164060 60%, #0E2848 80%, #0A1E3A 100%)
          `,
        }}
      />

      {/* Light rays from surface */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity: 0.6 }}>
        <div
          className="absolute"
          style={{
            top: '-10%', left: '20%', width: '30%', height: '110%',
            background: 'linear-gradient(180deg, rgba(140,200,240,0.1) 0%, rgba(140,200,240,0.03) 50%, transparent 80%)',
            transform: 'skewX(6deg)',
            animation: 'godRaySway 14s ease-in-out infinite',
          }}
        />
        <div
          className="absolute"
          style={{
            top: '-15%', left: '55%', width: '25%', height: '120%',
            background: 'linear-gradient(180deg, rgba(140,200,240,0.07) 0%, rgba(100,180,220,0.02) 50%, transparent 80%)',
            transform: 'skewX(-4deg)',
            animation: 'godRaySway 18s ease-in-out infinite reverse',
          }}
        />
      </div>

      {/* Seabed terrain */}
      <svg className="absolute bottom-0 left-0 right-0 w-full h-[35%] pointer-events-none" viewBox="0 0 1440 350" preserveAspectRatio="none">
        <path d="M0,350 L0,260 Q80,230 160,250 Q280,200 400,230 Q520,180 640,210 Q760,170 880,200 Q1000,160 1120,190 Q1240,170 1360,200 Q1400,190 1440,210 L1440,350 Z"
          fill="#122845" opacity="0.8" />
        <path d="M0,350 L0,290 Q100,260 200,280 Q340,230 480,260 Q600,220 740,250 Q860,210 980,240 Q1100,210 1220,240 Q1340,220 1440,250 L1440,350 Z"
          fill="#1B2845" />
        {/* Coral shapes */}
        <circle cx="200" cy="300" r="12" fill="#1E3050" opacity="0.5" />
        <circle cx="500" cy="280" r="8" fill="#1E3050" opacity="0.4" />
        <circle cx="800" cy="290" r="15" fill="#1E3050" opacity="0.5" />
        <circle cx="1100" cy="275" r="10" fill="#1E3050" opacity="0.4" />
        <ellipse cx="350" cy="295" rx="20" ry="10" fill="#1A2E4A" opacity="0.4" />
        <ellipse cx="950" cy="285" rx="25" ry="12" fill="#1A2E4A" opacity="0.4" />
      </svg>

      {/* Caustic Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[3]" />

      {/* Bioluminescent particles */}
      <div className="absolute inset-0 pointer-events-none z-[4]">
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

      {/* Jellyfish */}
      <div className="absolute inset-0 pointer-events-none z-[5]">
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
            {/* Tentacles */}
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

      {/* Fish shadows */}
      <div className="absolute inset-0 pointer-events-none z-[6]">
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

      {/* Water current light bands */}
      <div className="absolute inset-0 pointer-events-none z-[6]" style={{ opacity: 0.4 }}>
        <div
          className="absolute"
          style={{
            top: '20%', left: '-10%', width: '40%', height: '3%',
            background: 'linear-gradient(90deg, transparent, rgba(107,91,141,0.08), transparent)',
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

      {/* Bubbles (unlockable) */}
      <div className="absolute inset-0 z-[8]">
        {bubbles.map((b) => {
          const isUnlocked = unlockedIds.has(b.species.id);
          const isRecent = recentlyClicked.has(b.species.id);
          const isDiscovered = isUnlocked && isRecent;
          const bubbleColor = BUBBLE_COLORS[b.color];

          // Mouse parallax offset
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
                  relative rounded-full transition-all duration-700 ease-out
                  ${isDiscovered ? 'scale-75' : 'scale-100 hover:scale-110'}
                `}
                style={{
                  width: `${b.bubbleSize * 2}px`,
                  height: `${b.bubbleSize * 2}px`,
                  animation: `bubbleFloat ${b.floatDuration}s cubic-bezier(0.25,0.46,0.45,0.94) ${b.floatDelay}s infinite, bubbleBreath ${b.breathDuration}s ease-in-out ${b.breathDelay}s infinite`,
                }}
              >
                {/* Main bubble gradient */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-700"
                  style={{
                    background: isDiscovered
                      ? `radial-gradient(circle at 35% 35%, rgba(184,216,232,0.1) 0%, rgba(140,190,220,0.05) 40%, transparent 80%)`
                      : `radial-gradient(circle at 35% 35%, rgba(224,240,255,0.25) 0%, rgba(184,216,232,0.15) 40%, rgba(140,190,220,0.06) 70%, transparent 100%)`,
                    boxShadow: isDiscovered
                      ? `0 0 ${b.bubbleSize}px rgba(140,200,240,0.06), inset 0 0 ${b.bubbleSize * 0.3}px rgba(184,216,232,0.03)`
                      : `0 0 ${b.bubbleSize * 1.5}px ${bubbleColor.glow}, 0 0 ${b.bubbleSize * 3}px rgba(100,160,220,0.05), inset 0 0 ${b.bubbleSize * 0.5}px rgba(224,240,255,0.06)`,
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
                  style={{ opacity: isDiscovered ? 0.2 : 0.7 }}
                />
                {/* Inner shimmer */}
                <div
                  className="absolute inset-[25%] rounded-full"
                  style={{
                    background: `radial-gradient(circle at 40% 40%, rgba(200,230,255,${isDiscovered ? 0.04 : 0.12}) 0%, transparent 70%)`,
                  }}
                />
                {/* Discovered indicator */}
                {isDiscovered && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm opacity-30">{b.emoji}</span>
                  </div>
                )}
                {/* Hover ring */}
                <div className="absolute inset-[-3px] rounded-full border border-[rgba(140,200,240,0)] group-hover:border-[rgba(140,200,240,0.25)] transition-all duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Foreground water blur */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 z-[11] pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(12,28,50,0.6) 0%, rgba(12,28,50,0.2) 50%, transparent 100%)',
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-[10]"
        style={{ background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(8,18,36,0.5) 100%)' }}
      />
    </div>
  );
}
