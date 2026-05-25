'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';

interface Particle {
  id: number;
  startX: number;
  startY: number;
  midX: number;
  midY: number;
  convergeX: number;
  convergeY: number;
  expandX: number;
  expandY: number;
  size: number;
  color: string;
  delay: number;
}

const COLORS_FOREST = [
  'rgba(232,200,64,0.9)',
  'rgba(184,212,48,0.8)',
  'rgba(232,180,40,0.7)',
  'rgba(200,220,80,0.6)',
];

const COLORS_OCEAN = [
  'rgba(0,220,240,0.8)',
  'rgba(140,200,240,0.7)',
  'rgba(160,100,240,0.6)',
  'rgba(184,216,232,0.7)',
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = useState<'gathering' | 'converging' | 'expanding' | 'fadeout'>('gathering');
  const [opacity, setOpacity] = useState(1);
  // Use ref for animation progress to avoid re-render spam
  const expandProgressRef = useRef(0);
  const [, forceUpdate] = useState(0);

  // Generate particles with all position phases pre-calculated
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    const totalParticles = 60;

    for (let i = 0; i < totalParticles; i++) {
      const edge = Math.floor(Math.random() * 4);
      let startX: number, startY: number;

      switch (edge) {
        case 0: startX = Math.random() * 100; startY = -5 - Math.random() * 10; break;
        case 1: startX = 105 + Math.random() * 10; startY = Math.random() * 100; break;
        case 2: startX = Math.random() * 100; startY = 105 + Math.random() * 10; break;
        default: startX = -5 - Math.random() * 10; startY = Math.random() * 100; break;
      }

      const convAngle = Math.random() * Math.PI * 2;
      const convDist = Math.random() * 8;
      const convergeX = 50 + Math.cos(convAngle) * convDist;
      const convergeY = 50 + Math.sin(convAngle) * convDist;

      // Expand outward in a random direction
      const expAngle = Math.random() * Math.PI * 2;
      const expDist = 35 + Math.random() * 45; // 35-80% from center
      const expandX = 50 + Math.cos(expAngle) * expDist;
      const expandY = 50 + Math.sin(expAngle) * expDist;

      const isForest = i < totalParticles / 2;
      const colorSet = isForest ? COLORS_FOREST : COLORS_OCEAN;
      const color = colorSet[Math.floor(Math.random() * colorSet.length)];

      const phi = i * 2.39996;
      result.push({
        id: i,
        startX,
        startY,
        midX: startX + (50 - startX) * 0.3 + Math.cos(phi) * 5,
        midY: startY + (50 - startY) * 0.3 + Math.sin(phi) * 5,
        convergeX,
        convergeY,
        expandX,
        expandY,
        size: 2 + Math.random() * 4,
        color,
        delay: Math.random() * 2000,
      });
    }
    return result;
  }, []);

  // Loading progress (gathering phase)
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (phase !== 'gathering') return;
    const startTime = Date.now();
    const totalDuration = 3500;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / totalDuration);
      const eased = 1 - Math.pow(1 - rawProgress, 2.5);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        setPhase('converging');
      }
    };

    requestAnimationFrame(tick);
  }, [phase]);

  // Converging phase: particles move to center via CSS animation
  useEffect(() => {
    if (phase !== 'converging') return;
    const timer = setTimeout(() => {
      setPhase('expanding');
    }, 1200);
    return () => clearTimeout(timer);
  }, [phase]);

  // Expanding phase: particles move outward from center via JS animation
  useEffect(() => {
    if (phase !== 'expanding') return;
    const startTime = Date.now();
    const duration = 1400;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / duration);
      // Eased: starts slow, accelerates, then decelerates at the end
      const eased = rawProgress < 0.5
        ? 4 * rawProgress * rawProgress * rawProgress
        : 1 - Math.pow(-2 * rawProgress + 2, 3) / 2;
      expandProgressRef.current = eased;
      forceUpdate(v => v + 1);

      if (rawProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        expandProgressRef.current = 1;
        setPhase('fadeout');
      }
    };

    requestAnimationFrame(tick);
  }, [phase]);

  // Fadeout phase
  useEffect(() => {
    if (phase !== 'fadeout') return;
    setOpacity(0);
    const timer = setTimeout(() => {
      onComplete();
    }, 1000);
    return () => clearTimeout(timer);
  }, [phase, onComplete]);

  // Calculate particle positions
  const getParticleStyle = useCallback((p: Particle): React.CSSProperties => {
    const gatherProgress = Math.max(0, Math.min(1, progress / 100));
    const appearAt = p.delay / 3500;
    const particleProgress = Math.max(0, Math.min(1, (gatherProgress - appearAt) / Math.max(0.01, 1 - appearAt)));

    if (phase === 'gathering') {
      const x = p.startX + (p.midX - p.startX) * particleProgress;
      const y = p.startY + (p.midY - p.startY) * particleProgress;
      const op = Math.min(1, particleProgress * 2) * 0.8;
      const scale = 0.5 + particleProgress * 0.5;

      return {
        position: 'absolute' as const,
        left: `${x}%`,
        top: `${y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        background: p.color,
        borderRadius: '50%',
        opacity: op,
        transform: `scale(${scale})`,
        boxShadow: op > 0.3
          ? `0 0 ${p.size * 2}px ${p.color}, 0 0 ${p.size * 4}px ${p.color.replace(/[\d.]+\)$/, '0.2)')}`
          : 'none',
        pointerEvents: 'none' as const,
      };
    }

    if (phase === 'converging') {
      return {
        position: 'absolute' as const,
        left: `${p.midX}%`,
        top: `${p.midY}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        background: p.color,
        borderRadius: '50%',
        opacity: 1,
        animation: `particleConverge 1.2s cubic-bezier(0.16,1,0.3,1) forwards`,
        boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color.replace(/[\d.]+\)$/, '0.3)')}`,
        pointerEvents: 'none' as const,
      };
    }

    if (phase === 'expanding') {
      // JS-driven: interpolate from convergeX/Y to expandX/Y
      const ep = expandProgressRef.current;
      const x = p.convergeX + (p.expandX - p.convergeX) * ep;
      const y = p.convergeY + (p.expandY - p.convergeY) * ep;
      const scale = 0.5 + ep * 1.8; // grows as it expands
      const op = ep < 0.5 ? 1 : 1 - (ep - 0.5) * 1.2; // starts fading after 50%

      return {
        position: 'absolute' as const,
        left: `${x}%`,
        top: `${y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        background: p.color,
        borderRadius: '50%',
        opacity: Math.max(0, op),
        transform: `scale(${scale})`,
        boxShadow: `0 0 ${p.size * 4}px ${p.color}, 0 0 ${p.size * 8}px ${p.color.replace(/[\d.]+\)$/, '0.3)')}`,
        pointerEvents: 'none' as const,
      };
    }

    // fadeout: particles at final expand positions, fading
    return {
      position: 'absolute' as const,
      left: `${p.expandX}%`,
      top: `${p.expandY}%`,
      width: `${p.size * 2}px`,
      height: `${p.size * 2}px`,
      background: p.color,
      borderRadius: '50%',
      opacity: 0,
      transform: 'scale(2.5)',
      transition: 'all 1s ease-out',
      pointerEvents: 'none' as const,
    };
  }, [progress, phase]);

  // Filter visible particles during gathering
  const visibleParticles = useMemo(() => {
    if (phase === 'gathering') {
      return particles.filter(p => {
        const appearAt = p.delay / 3500;
        return progress / 100 >= appearAt * 0.5;
      });
    }
    return particles;
  }, [particles, progress, phase]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        opacity,
        transition: phase === 'fadeout' ? 'opacity 1s ease-out' : 'none',
        background: phase === 'fadeout'
          ? 'transparent'
          : 'linear-gradient(135deg, #1A2814 0%, #0C2440 50%, #1A2814 100%)',
      }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(232,200,64,${0.03 + progress * 0.001}) 0%, transparent 40%)`,
        }}
      />

      {/* Expanding glow ring during expand phase */}
      {phase === 'expanding' && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${200 + expandProgressRef.current * 800}px`,
            height: `${200 + expandProgressRef.current * 800}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(232,200,64,${0.4 * (1 - expandProgressRef.current)}) 0%, rgba(0,220,240,${0.2 * (1 - expandProgressRef.current)}) 30%, transparent 70%)`,
            filter: 'blur(12px)',
            transition: 'none',
          }}
        />
      )}

      {/* Central convergence glow */}
      {phase === 'converging' && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '140px',
            height: '140px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,200,64,0.6) 0%, rgba(0,220,240,0.3) 30%, transparent 70%)',
            animation: 'convergeGlow 1.2s ease-out forwards',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Fadeout radial sweep */}
      {phase === 'fadeout' && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '120vmax',
            height: '120vmax',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,200,64,0.12) 0%, rgba(0,220,240,0.06) 30%, transparent 55%)',
            animation: 'loadingFadeSweep 1s ease-out forwards',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Floating particles */}
      <div className="absolute inset-0">
        {visibleParticles.map(p => (
          <div key={p.id} style={getParticleStyle(p)} />
        ))}
      </div>

      {/* Progress text */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: phase === 'gathering' ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        <div className="w-32 h-[1px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(232,200,64,0.6), rgba(0,220,240,0.6))',
              transition: 'width 0.1s ease-out',
            }}
          />
        </div>
        <span
          className="text-white/25 text-[10px] tracking-[0.3em]"
          style={{ fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif" }}
        >
          秘境觉醒中
        </span>
      </div>

      {/* Subtitle hint */}
      <div
        className="absolute top-12 left-1/2 -translate-x-1/2"
        style={{
          opacity: phase === 'gathering' ? Math.min(1, progress / 30) * 0.4 : 0,
          transition: 'opacity 1s ease-out',
        }}
      >
        <span
          className="text-white/20 text-xs tracking-[0.5em]"
          style={{ fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif" }}
        >
          每一种，都值得被看见
        </span>
      </div>
    </div>
  );
}
