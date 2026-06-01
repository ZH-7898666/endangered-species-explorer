'use client';

import { useState, useEffect, useCallback } from 'react';

interface WelcomeScreenProps {
  onComplete: () => void;
}

export default function WelcomeScreen({ onComplete }: WelcomeScreenProps) {
  const [phase, setPhase] = useState<'text' | 'ready' | 'exiting'>('text');
  const [visibleLines, setVisibleLines] = useState(0);
  const [pageTurn, setPageTurn] = useState(false);

  // Reveal text lines one by one like writing
  useEffect(() => {
    if (phase !== 'text') return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const delays = [600, 2200, 3800, 5400, 7200, 9000];
    delays.forEach((delay, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), delay));
    });
    timers.push(setTimeout(() => setPhase('ready'), 10500));
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  const handleEnter = useCallback(() => {
    setPageTurn(true);
    setTimeout(() => setPhase('exiting'), 400);
    setTimeout(onComplete, 1400);
  }, [onComplete]);

  const journalLines = [
    { text: '在这片被遗忘的秘境中', style: 'journal' },
    { text: '荧光光斑藏着森林深处最后的居民', style: 'journal' },
    { text: '在那片沉默的深海里', style: 'journal' },
    { text: '渐变气泡封存着大洋之心最珍贵的秘密', style: 'journal' },
    { text: '138种濒危生灵等你来探索', style: 'title' },
    { text: '它们正在消失，而我们可以学会守护', style: 'emphasis' },
  ];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #0C1A12 0%, #0A1520 40%, #081018 100%)',
        opacity: phase === 'exiting' ? 0 : 1,
        transition: phase === 'exiting' ? 'opacity 1s ease-out' : 'none',
      }}
    >
      {/* Subtle background texture - old paper stain */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(200,180,120,1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(200,180,120,1) 0%, transparent 50%)
          `,
        }}
      />

      {/* The Journal / Notebook */}
      <div
        className="relative flex flex-col items-center"
        style={{
          width: 'min(520px, 88vw)',
          minHeight: 'min(580px, 75vh)',
          perspective: '1200px',
        }}
      >
        {/* Notebook container */}
        <div
          className="relative w-full h-full rounded-sm overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2A2418 0%, #1E1A12 50%, #221E14 100%)',
            border: '2px solid rgba(200,180,120,0.2)',
            boxShadow: `
              0 0 60px rgba(200,180,120,0.08),
              0 20px 40px rgba(0,0,0,0.5),
              inset 0 0 80px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(200,180,120,0.15)
            `,
            padding: 'clamp(32px, 6vw, 56px) clamp(28px, 5vw, 48px)',
            transform: pageTurn ? 'rotateY(-8deg) scale(0.97)' : 'none',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center',
            transition: pageTurn ? 'transform 0.8s cubic-bezier(0.4,0,0.2,1)' : 'none',
          }}
        >
          {/* Paper texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 27px,
                  rgba(200,180,120,0.04) 27px,
                  rgba(200,180,120,0.04) 28px
                )
              `,
            }}
          />

          {/* Leather spine on the left */}
          <div
            className="absolute left-0 top-0 bottom-0 w-5 pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(60,40,20,0.6) 0%, rgba(40,30,15,0.3) 60%, transparent 100%)',
              boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.3)',
            }}
          />

          {/* Binding holes */}
          {[0.15, 0.35, 0.55, 0.75, 0.9].map((pos, i) => (
            <div
              key={i}
              className="absolute left-2 w-2 h-2 rounded-full"
              style={{
                top: `${pos * 100}%`,
                background: 'radial-gradient(circle, #1a1510 40%, rgba(60,40,20,0.5) 70%, transparent 100%)',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
              }}
            />
          ))}

          {/* Notebook title - embossed */}
          <div className="relative text-center mb-8">
            <h1
              className="text-2xl tracking-[0.15em] mb-2"
              style={{
                fontFamily: "'Noto Serif SC', 'PingFang SC', serif",
                color: 'rgba(212,186,128,0.9)',
                fontWeight: 600,
                textShadow: '0 0 20px rgba(212,186,128,0.15)',
              }}
            >
              秘 境 手 记
            </h1>
            {/* Decorative line under title */}
            <div className="flex items-center justify-center gap-3">
              <div
                className="h-px w-16"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(200,180,120,0.4), transparent)',
                }}
              />
              <div
                className="w-1.5 h-1.5 rotate-45"
                style={{
                  background: 'rgba(200,180,120,0.3)',
                }}
              />
              <div
                className="h-px w-16"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(200,180,120,0.4), transparent)',
                }}
              />
            </div>
            <p
              className="mt-3 text-[10px] tracking-[0.2em]"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                color: 'rgba(200,180,120,0.35)',
              }}
            >
              FIELD JOURNAL OF ENDANGERED SPECIES
            </p>
          </div>

          {/* Journal text lines */}
          <div
            className="relative flex flex-col gap-4 mb-10"
            style={{
              fontFamily: "'Noto Serif SC', 'PingFang SC', serif",
            }}
          >
            {journalLines.map((line, i) => (
              <div
                key={i}
                className="relative transition-all duration-1000"
                style={{
                  opacity: visibleLines > i ? 1 : 0,
                  transform: visibleLines > i ? 'translateY(0)' : 'translateY(8px)',
                }}
              >
                <p
                  style={{
                    color: line.style === 'title'
                      ? 'rgba(212,186,128,0.85)'
                      : line.style === 'emphasis'
                        ? 'rgba(232,200,64,0.75)'
                        : 'rgba(200,180,120,0.5)',
                    fontSize: line.style === 'title' ? '15px' : '13px',
                    fontWeight: line.style === 'title' ? 600 : 400,
                    letterSpacing: line.style === 'title' ? '0.06em' : '0.03em',
                    lineHeight: '1.8',
                  }}
                >
                  {line.text}
                </p>
                {/* Hand-drawn underline for title line */}
                {line.style === 'title' && visibleLines > i && (
                  <div
                    className="mt-1 h-px"
                    style={{
                      width: '80%',
                      marginLeft: '10%',
                      background: 'linear-gradient(90deg, transparent, rgba(212,186,128,0.3), transparent)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,180,120,0.15))' }} />
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L10 6L15 8L10 10L8 15L6 10L1 8L6 6Z" fill="rgba(200,180,120,0.25)" />
            </svg>
            <div className="h-px flex-1" style={{ background: 'linear-gradient(270deg, transparent, rgba(200,180,120,0.15))' }} />
          </div>

          {/* Enter button - wax seal style */}
          <div className="flex flex-col items-center">
            <button
              onClick={handleEnter}
              className="relative px-10 py-3 cursor-pointer transition-all duration-500 hover:scale-105 active:scale-95"
              style={{
                opacity: phase === 'ready' ? 1 : 0,
                transform: phase === 'ready' ? 'translateY(0)' : 'translateY(10px)',
                pointerEvents: phase === 'ready' ? 'auto' : 'none',
                background: 'linear-gradient(135deg, rgba(140,60,40,0.7) 0%, rgba(100,35,20,0.8) 50%, rgba(140,60,40,0.7) 100%)',
                border: '1px solid rgba(200,120,80,0.3)',
                borderRadius: '24px',
                boxShadow: `
                  0 0 20px rgba(140,60,40,0.2),
                  0 2px 8px rgba(0,0,0,0.3),
                  inset 0 1px 0 rgba(255,200,150,0.15)
                `,
                fontFamily: "'Noto Serif SC', serif",
                color: 'rgba(255,220,180,0.9)',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.2em',
                animation: phase === 'ready' ? 'sealGlow 3s ease-in-out infinite' : 'none',
              }}
            >
              踏入秘境
            </button>

            <p
              className="mt-4 text-[10px] tracking-[0.15em] transition-all duration-1000"
              style={{
                opacity: phase === 'ready' ? 1 : 0,
                fontFamily: "'Noto Serif SC', serif",
                color: 'rgba(200,180,120,0.2)',
              }}
            >
              ── 点击开始探索 ──
            </p>
          </div>

          {/* Corner decorative elements */}
          {/* Top-left corner */}
          <div
            className="absolute top-4 left-6 w-8 h-8 pointer-events-none"
            style={{
              borderTop: '1px solid rgba(200,180,120,0.15)',
              borderLeft: '1px solid rgba(200,180,120,0.15)',
            }}
          />
          {/* Bottom-right corner */}
          <div
            className="absolute bottom-4 right-6 w-8 h-8 pointer-events-none"
            style={{
              borderBottom: '1px solid rgba(200,180,120,0.15)',
              borderRight: '1px solid rgba(200,180,120,0.15)',
            }}
          />

          {/* Page number */}
          <div
            className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[9px] tracking-[0.15em] pointer-events-none"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              color: 'rgba(200,180,120,0.15)',
            }}
          >
            — Ⅰ —
          </div>
        </div>
      </div>
    </div>
  );
}
