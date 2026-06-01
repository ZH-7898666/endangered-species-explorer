'use client';

import { useState, useEffect, useCallback } from 'react';

interface CompassNavProps {
  currentScene: 'forest' | 'ocean';
  onSwitch: () => void;
}

export default function CompassNav({ currentScene, onSwitch }: CompassNavProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredScene, setHoveredScene] = useState<'forest' | 'ocean' | null>(null);

  const handleClick = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    onSwitch();
    setTimeout(() => setIsAnimating(false), 800);
  }, [isAnimating, onSwitch]);

  const isForest = currentScene === 'forest';

  // Compass needle rotation: 0° = North (forest), 180° = South (ocean)
  const [needleRotation, setNeedleRotation] = useState(isForest ? 0 : 180);
  useEffect(() => {
    setNeedleRotation(isForest ? 0 : 180);
  }, [isForest]);

  return (
    <div className="relative flex flex-col items-center gap-2 select-none">
      {/* Main compass - brass antique style */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHoveredScene(isForest ? 'ocean' : 'forest')}
        onMouseLeave={() => setHoveredScene(null)}
        className="relative w-[68px] h-[68px] rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #c9a84c, #8b6914 40%, #6b4f12 70%, #4a3508 100%)',
          boxShadow: `
            0 0 0 2px #3d2b08,
            0 0 0 4px #6b4f12,
            0 0 0 5px #3d2b08,
            0 2px 8px rgba(0,0,0,0.6),
            inset 0 1px 2px rgba(255,220,120,0.3)
          `,
        }}
      >
        {/* Inner aged metal ring */}
        <div
          className="absolute inset-[4px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #b8972e, #7a5c10 50%, #5a420c 80%)',
            boxShadow: 'inset 0 1px 3px rgba(255,220,120,0.2), inset 0 -1px 2px rgba(0,0,0,0.4)',
          }}
        />

        {/* Compass face */}
        <div
          className="absolute inset-[8px] rounded-full"
          style={{
            background: 'radial-gradient(circle at 45% 40%, #2a2010, #1a1508 60%, #0f0d06 100%)',
            boxShadow: 'inset 0 0 8px rgba(0,0,0,0.6)',
          }}
        />

        {/* Compass rose - decorative lines */}
        <div className="absolute inset-[10px] rounded-full" style={{ opacity: 0.25 }}>
          {/* Cardinal direction ticks */}
          {[0, 90, 180, 270].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-[1px] origin-bottom"
              style={{
                height: '42%',
                transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                background: 'linear-gradient(to top, transparent 20%, #c9a84c 80%)',
              }}
            />
          ))}
          {/* Intercardinal ticks */}
          {[45, 135, 225, 315].map((deg) => (
            <div
              key={deg}
              className="absolute top-1/2 left-1/2 w-[1px] origin-bottom"
              style={{
                height: '30%',
                transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                background: 'linear-gradient(to top, transparent 20%, #8b6914 80%)',
              }}
            />
          ))}
        </div>

        {/* N/S/E/W labels */}
        <span
          className="absolute top-[12px] left-1/2 -translate-x-1/2 text-[7px] font-bold tracking-wider"
          style={{ color: '#c9a84c', fontFamily: 'var(--font-journal)', opacity: 0.6 }}
        >
          N
        </span>
        <span
          className="absolute bottom-[12px] left-1/2 -translate-x-1/2 text-[7px] tracking-wider"
          style={{ color: '#8b6914', fontFamily: 'var(--font-journal)', opacity: 0.4 }}
        >
          S
        </span>
        <span
          className="absolute left-[12px] top-1/2 -translate-y-1/2 text-[7px] tracking-wider"
          style={{ color: '#8b6914', fontFamily: 'var(--font-journal)', opacity: 0.4 }}
        >
          W
        </span>
        <span
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[7px] tracking-wider"
          style={{ color: '#8b6914', fontFamily: 'var(--font-journal)', opacity: 0.4 }}
        >
          E
        </span>

        {/* Compass needle */}
        <div
          className="absolute top-1/2 left-1/2 transition-transform duration-700 ease-in-out"
          style={{
            width: '2px',
            height: '36px',
            transform: `translate(-50%, -50%) rotate(${needleRotation}deg)`,
          }}
        >
          {/* North end (red/warm) */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '4px solid transparent',
              borderRight: '4px solid transparent',
              borderBottom: '16px solid #c44a2f',
              filter: 'drop-shadow(0 0 2px rgba(196,74,47,0.5))',
            }}
          />
          {/* South end (blue/cool) */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '3px solid transparent',
              borderRight: '3px solid transparent',
              borderTop: '14px solid #4a7a8c',
            }}
          />
        </div>

        {/* Center pivot */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #d4af37, #8b6914)',
            boxShadow: '0 0 3px rgba(0,0,0,0.5)',
          }}
        />

        {/* Patina spots */}
        <div
          className="absolute top-[14px] right-[16px] w-[6px] h-[4px] rounded-full"
          style={{ background: 'rgba(80,120,80,0.15)' }}
        />
        <div
          className="absolute bottom-[16px] left-[18px] w-[4px] h-[3px] rounded-full"
          style={{ background: 'rgba(80,120,80,0.1)' }}
        />
      </button>

      {/* Scene label - hand-written style */}
      <div
        className="flex items-center gap-2 transition-all duration-500"
        style={{ fontFamily: 'var(--font-journal)' }}
      >
        <span
          className="text-[10px] tracking-wider transition-all duration-500"
          style={{
            color: isForest ? 'rgba(232,200,64,0.6)' : 'rgba(232,200,64,0.2)',
            textDecoration: isForest ? 'underline' : 'none',
            textUnderlineOffset: '2px',
            textDecorationColor: 'rgba(232,200,64,0.3)',
          }}
        >
          森林
        </span>
        <span className="text-[7px]" style={{ color: 'rgba(139,105,20,0.4)' }}>✦</span>
        <span
          className="text-[10px] tracking-wider transition-all duration-500"
          style={{
            color: !isForest ? 'rgba(100,200,240,0.6)' : 'rgba(100,200,240,0.2)',
            textDecoration: !isForest ? 'underline' : 'none',
            textUnderlineOffset: '2px',
            textDecorationColor: 'rgba(100,200,240,0.3)',
          }}
        >
          海域
        </span>
      </div>

      {/* Hover hint */}
      {hoveredScene && (
        <div
          className="absolute -top-9 whitespace-nowrap px-3 py-1 text-[10px] tracking-wider transition-all duration-300"
          style={{
            fontFamily: 'var(--font-journal)',
            background: 'linear-gradient(135deg, rgba(42,32,16,0.92), rgba(26,20,10,0.92))',
            border: '1px solid rgba(139,105,20,0.3)',
            borderRadius: '3px',
            color: hoveredScene === 'forest' ? 'rgba(232,200,64,0.8)' : 'rgba(100,200,240,0.8)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
          }}
        >
          {hoveredScene === 'forest' ? '→ 秘境森林' : '→ 深海海域'}
        </div>
      )}
    </div>
  );
}
