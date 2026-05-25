'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';

interface Particle {
  id: number;
  // Start position (edges of screen)
  startX: number;
  startY: number;
  // Mid position (scattered across screen during gathering)
  midX: number;
  midY: number;
  // End position (converge toward center)
  endX: number;
  endY: number;
  // Visual
  size: number;
  color: string;
  // Animation timing
  delay: number;
}

const COLORS_FOREST = [
  'rgba(232,200,64,0.9)',   // 萤火暖黄
  'rgba(184,212,48,0.8)',   // 黄绿
  'rgba(232,180,40,0.7)',   // 琥珀
  'rgba(200,220,80,0.6)',   // 浅绿
];

const COLORS_OCEAN = [
  'rgba(0,220,240,0.8)',    // 生物荧光蓝
  'rgba(140,200,240,0.7)',  // 冰浅蓝
  'rgba(160,100,240,0.6)',  // 雾紫
  'rgba(184,216,232,0.7)',  // 浅蓝
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'gathering' | 'converging' | 'burst' | 'fadeout'>('gathering');
  const [opacity, setOpacity] = useState(1);

  // Generate particles from edges
  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    const totalParticles = 60;

    for (let i = 0; i < totalParticles; i++) {
      // Spawn from random edge
      const edge = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left
      let startX: number, startY: number;

      switch (edge) {
        case 0: startX = Math.random() * 100; startY = -5 - Math.random() * 10; break;
        case 1: startX = 105 + Math.random() * 10; startY = Math.random() * 100; break;
        case 2: startX = Math.random() * 100; startY = 105 + Math.random() * 10; break;
        default: startX = -5 - Math.random() * 10; startY = Math.random() * 100; break;
      }

      // Converge point: near center with slight randomness
      const angle = Math.random() * Math.PI * 2;
      const dist = Math.random() * 15; // within 15% of center
      const endX = 50 + Math.cos(angle) * dist;
      const endY = 50 + Math.sin(angle) * dist;

      // Mix forest and ocean colors
      const isForest = i < totalParticles / 2;
      const colorSet = isForest ? COLORS_FOREST : COLORS_OCEAN;
      const color = colorSet[Math.floor(Math.random() * colorSet.length)];

      result.push({
        id: i,
        startX,
        startY,
        // Mid-point: scattered around the screen (30% toward center + random offset)
        midX: startX + (50 - startX) * 0.3 + (Math.cos(i * 2.39996) * 5),
        midY: startY + (50 - startY) * 0.3 + (Math.sin(i * 2.39996) * 5),
        endX,
        endY,
        size: 2 + Math.random() * 4,
        color,
        delay: Math.random() * 2000, // stagger entry over 2s
      });
    }
    return result;
  }, []);

  // Simulate loading progress over ~3.5s
  useEffect(() => {
    const startTime = Date.now();
    const totalDuration = 3500;

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(1, elapsed / totalDuration);
      // Eased progress - start fast, slow at end
      const eased = 1 - Math.pow(1 - rawProgress, 2.5);
      setProgress(Math.round(eased * 100));

      if (rawProgress < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Start convergence phase
        setPhase('converging');
      }
    };

    requestAnimationFrame(tick);
  }, []);

  // Convergence → burst → fadeout sequence
  useEffect(() => {
    if (phase === 'converging') {
      const timer = setTimeout(() => {
        setPhase('burst');
      }, 1200);
      return () => clearTimeout(timer);
    }

    if (phase === 'burst') {
      const timer = setTimeout(() => {
        setPhase('fadeout');
      }, 500);
      return () => clearTimeout(timer);
    }

    if (phase === 'fadeout') {
      setOpacity(0);
      const timer = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [phase, onComplete]);

  // Calculate particle positions based on progress and phase
  const getParticleStyle = useCallback((p: Particle): React.CSSProperties => {
    const gatherProgress = Math.max(0, Math.min(1, progress / 100));

    // Each particle starts appearing based on its delay relative to total loading time
    const appearAt = p.delay / 3500; // when this particle starts appearing (0-1 of total progress)
    const particleProgress = Math.max(0, Math.min(1, (gatherProgress - appearAt) / Math.max(0.01, 1 - appearAt)));

    if (phase === 'gathering') {
      // Float from edge to scattered positions
      const x = p.startX + (p.midX - p.startX) * particleProgress;
      const y = p.startY + (p.midY - p.startY) * particleProgress;
      const opacity = Math.min(1, particleProgress * 2) * 0.8;
      const scale = 0.5 + particleProgress * 0.5;

      return {
        position: 'absolute' as const,
        left: `${x}%`,
        top: `${y}%`,
        width: `${p.size}px`,
        height: `${p.size}px`,
        background: p.color,
        borderRadius: '50%',
        opacity,
        transform: `scale(${scale})`,
        boxShadow: opacity > 0.3
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
        transform: 'scale(1)',
        animation: `particleConverge 1.2s cubic-bezier(0.16,1,0.3,1) forwards`,
        boxShadow: `0 0 ${p.size * 3}px ${p.color}, 0 0 ${p.size * 6}px ${p.color.replace(/[\d.]+\)$/, '0.3)')}`,
        pointerEvents: 'none' as const,
      };
    }

    // burst or fadeout
    return {
      position: 'absolute' as const,
      left: `${p.endX}%`,
      top: `${p.endY}%`,
      width: `${p.size}px`,
      height: `${p.size}px`,
      background: p.color,
      borderRadius: '50%',
      opacity: 0,
      transform: 'scale(1.5)',
      transition: 'all 0.5s ease-out',
      pointerEvents: 'none' as const,
    };
  }, [progress, phase]);

  // Determine which particles to render
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
        transition: phase === 'fadeout' ? 'opacity 0.8s ease-out' : 'none',
        background: phase === 'fadeout'
          ? 'transparent'
          : 'linear-gradient(135deg, #1A2814 0%, #0C2440 50%, #1A2814 100%)',
      }}
    >
      {/* Ambient background glow that intensifies with progress */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(232,200,64,${0.03 + progress * 0.001}) 0%, transparent 40%)`,
        }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {visibleParticles.map(p => (
          <div key={p.id} style={getParticleStyle(p)} />
        ))}
      </div>

      {/* Central convergence glow - appears during convergence */}
      {(phase === 'converging' || phase === 'burst') && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: phase === 'burst' ? '300px' : '100px',
            height: phase === 'burst' ? '300px' : '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(232,200,64,0.6) 0%, rgba(0,220,240,0.3) 30%, transparent 70%)',
            transition: phase === 'burst' ? 'all 0.4s ease-out' : 'all 1s ease-out',
            opacity: phase === 'burst' ? 0.9 : 0.4,
            filter: 'blur(8px)',
          }}
        />
      )}

      {/* Burst flash */}
      {phase === 'burst' && (
        <div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 60%)',
            animation: 'loadingBurst 0.5s ease-out forwards',
          }}
        />
      )}

      {/* Progress text - minimal, atmospheric */}
      <div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        style={{
          opacity: phase === 'gathering' ? 1 : 0,
          transition: 'opacity 0.5s ease-out',
        }}
      >
        {/* Thin progress line */}
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

        {/* Subtle text */}
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
