'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'text' | 'ready' | 'exiting'>('text');
  const [visibleLines, setVisibleLines] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse tracking for orb
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  // Reveal text lines one by one
  useEffect(() => {
    if (phase !== 'text') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delays = [400, 1800, 3200, 4600, 6400];
    delays.forEach((delay, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), delay));
    });
    timers.push(setTimeout(() => setPhase('ready'), 7800));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleEnter = useCallback(() => {
    setPhase('exiting');
    setTimeout(onComplete, 1200);
  }, [onComplete]);

  // Ambient particles around the orb
  const ambientParticles = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => ({
      id: i,
      angle: (i / 24) * Math.PI * 2,
      distance: 80 + (i % 3) * 40,
      size: 2 + (i % 4) * 1.5,
      speed: 0.3 + (i % 5) * 0.15,
      color: i % 2 === 0
        ? 'rgba(232,200,64,0.6)'  // forest gold
        : 'rgba(100,200,240,0.5)', // ocean blue
      phaseOffset: i * 0.5,
    }));
  }, []);

  const lines = [
    { text: '在这片被遗忘的秘境中', className: 'text-white/60' },
    { text: '荧光光斑藏着森林深处最后的居民', className: 'text-white/50' },
    { text: '在那片沉默的深海里', className: 'text-white/60' },
    { text: '渐变气泡封存着大洋之心最珍贵的秘密', className: 'text-white/50' },
    { text: '81种濒危生灵等你来探索', className: 'text-white/70' },
    { text: '它们正在消失，而我们可以学会守护', className: 'text-white/80' },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0C1A12 0%, #0A1520 40%, #081018 100%)',
        opacity: phase === 'exiting' ? 0 : 1,
        transition: phase === 'exiting' ? 'opacity 1.2s ease-out' : 'none',
      }}
    >
      {/* Background subtle gradient orbs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #E8C840 0%, transparent 70%)',
          left: '30%',
          top: '20%',
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #64C8F0 0%, transparent 70%)',
          right: '20%',
          bottom: '25%',
          transform: `translate(${mousePos.x * 8}px, ${mousePos.y * 8}px)`,
        }}
      />

      {/* Central glowing orb */}
      <div className="relative mb-16">
        {/* Orb glow layers */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            width: '120px',
            height: '120px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            background: 'radial-gradient(circle, rgba(232,200,64,0.15) 0%, rgba(100,200,240,0.08) 40%, transparent 70%)',
            filter: 'blur(20px)',
            animation: 'orbBreath 4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: '50px',
            height: '50px',
            left: '50%',
            top: '50%',
            transform: `translate(-50%, -50%) translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
            background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(232,200,64,0.6) 30%, rgba(100,200,240,0.3) 60%, transparent 80%)',
            filter: 'blur(2px)',
            animation: 'orbBreath 4s ease-in-out infinite',
          }}
        />

        {/* Ambient particles */}
        {ambientParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: p.color,
              left: '50%',
              top: '50%',
              animation: `orbParticle ${3 + p.speed * 4}s ease-in-out infinite`,
              animationDelay: `${p.phaseOffset}s`,
              transform: `translate(${Math.cos(p.angle) * p.distance}px, ${Math.sin(p.angle) * p.distance}px)`,
              opacity: 0.6,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* Text content */}
      <div
        className="flex flex-col items-center gap-3 px-6 max-w-lg"
        style={{ fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif" }}
      >
        {lines.map((line, i) => (
          <p
            key={i}
            className={`text-center text-sm leading-relaxed tracking-wide transition-all duration-1000 ${line.className}`}
            style={{
              opacity: visibleLines > i ? 1 : 0,
              transform: visibleLines > i ? 'translateY(0)' : 'translateY(12px)',
              fontWeight: i === 4 ? 500 : 300,
              fontSize: i === 4 ? '15px' : '13px',
              letterSpacing: i === 4 ? '0.05em' : '0.03em',
            }}
          >
            {line.text}
          </p>
        ))}
      </div>

      {/* Enter button */}
      <button
        onClick={handleEnter}
        className="mt-12 px-8 py-3 rounded-full text-white/90 text-sm tracking-widest transition-all duration-500 hover:scale-105 active:scale-95"
        style={{
          opacity: phase === 'ready' ? 1 : 0,
          transform: phase === 'ready' ? 'translateY(0)' : 'translateY(10px)',
          background: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.12)',
          fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif",
          animation: phase === 'ready' ? 'enterBtnGlow 2.5s ease-in-out infinite' : 'none',
          pointerEvents: phase === 'ready' ? 'auto' : 'none',
        }}
      >
        踏入秘境
      </button>

      {/* Subtle hint */}
      <p
        className="mt-6 text-white/20 text-[10px] tracking-widest transition-all duration-1000"
        style={{
          opacity: phase === 'ready' ? 1 : 0,
          fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif",
        }}
      >
        点击开始探索
      </p>
    </div>
  );
}
