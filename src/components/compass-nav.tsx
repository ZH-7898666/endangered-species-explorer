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

  // Forest = green side (left), Ocean = blue side (right)
  const isForest = currentScene === 'forest';

  // Active highlight position: 0 = left (forest), 1 = right (ocean)
  const [highlightPos, setHighlightPos] = useState(isForest ? 0 : 1);

  useEffect(() => {
    setHighlightPos(isForest ? 0 : 1);
  }, [isForest]);

  // Outer ring gradient rotation based on scene
  const ringRotation = isForest ? 0 : 180;

  return (
    <div className="relative flex flex-col items-center gap-2 select-none">
      {/* Main compass */}
      <button
        onClick={handleClick}
        onMouseEnter={() => setHoveredScene(isForest ? 'ocean' : 'forest')}
        onMouseLeave={() => setHoveredScene(null)}
        className="relative w-16 h-16 rounded-full transition-transform duration-300 hover:scale-110 active:scale-95"
        style={{
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Rotating gradient ring */}
        <div
          className="absolute inset-[3px] rounded-full"
          style={{
            background: `conic-gradient(
              from ${ringRotation}deg,
              rgba(232,200,64,0.5) 0deg,
              rgba(184,212,48,0.3) 90deg,
              rgba(100,200,240,0.3) 180deg,
              rgba(140,120,220,0.5) 270deg,
              rgba(232,200,64,0.5) 360deg
            )`,
            animation: 'compassRingSpin 12s linear infinite',
            opacity: 0.6,
          }}
        />

        {/* Inner dark circle */}
        <div
          className="absolute inset-[5px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(20,30,20,0.9) 0%, rgba(12,24,40,0.9) 100%)',
          }}
        />

        {/* Highlight indicator dot - slides between left (forest) and right (ocean) */}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{
            left: highlightPos === 0 ? '7px' : 'calc(100% - 17px)',
            background: highlightPos === 0
              ? 'radial-gradient(circle, rgba(232,200,64,0.9), rgba(184,212,48,0.6))'
              : 'radial-gradient(circle, rgba(100,200,240,0.9), rgba(140,120,220,0.6))',
            boxShadow: highlightPos === 0
              ? '0 0 8px rgba(232,200,64,0.6), 0 0 20px rgba(232,200,64,0.2)'
              : '0 0 8px rgba(100,200,240,0.6), 0 0 20px rgba(100,200,240,0.2)',
          }}
        />

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-lg transition-all duration-500"
            style={{
              filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.3))',
            }}
          >
            {isForest ? '🌿' : '🌊'}
          </span>
        </div>

        {/* Outer glow ring */}
        <div
          className="absolute -inset-1 rounded-full transition-all duration-500"
          style={{
            background: isForest
              ? 'radial-gradient(circle, rgba(232,200,64,0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(100,200,240,0.08) 0%, transparent 70%)',
          }}
        />
      </button>

      {/* Scene label below compass */}
      <div
        className="flex items-center gap-1 transition-all duration-500"
        style={{ fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif" }}
      >
        <span
          className="text-[10px] tracking-widest transition-colors duration-500"
          style={{
            color: isForest ? 'rgba(232,200,64,0.5)' : 'rgba(232,200,64,0.2)',
          }}
        >
          森林
        </span>
        <span className="text-[8px] text-white/15">·</span>
        <span
          className="text-[10px] tracking-widest transition-colors duration-500"
          style={{
            color: !isForest ? 'rgba(100,200,240,0.5)' : 'rgba(100,200,240,0.2)',
          }}
        >
          海域
        </span>
      </div>

      {/* Hover hint for target scene */}
      {hoveredScene && (
        <div
          className="absolute -top-8 whitespace-nowrap px-3 py-1 rounded-full text-[10px] tracking-wider transition-all duration-300"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: hoveredScene === 'forest' ? 'rgba(232,200,64,0.7)' : 'rgba(100,200,240,0.7)',
            fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif",
          }}
        >
          {hoveredScene === 'forest' ? '🌿 前往秘境森林' : '🌊 前往深海海域'}
        </div>
      )}
    </div>
  );
}
