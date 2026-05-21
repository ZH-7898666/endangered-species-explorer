'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { forestSpecies, oceanSpecies } from '@/data/species';
import type { Species } from '@/data/species';
import { ForestScene } from '@/components/forest-scene';
import { OceanScene } from '@/components/ocean-scene';
import { SpeciesCard } from '@/components/species-card';

type SceneType = 'forest' | 'ocean';

export default function Home() {
  const [currentScene, setCurrentScene] = useState<SceneType>('forest');
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCardClosing, setIsCardClosing] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const currentSpeciesList = currentScene === 'forest' ? forestSpecies : oceanSpecies;
  const unlockedCount = currentSpeciesList.filter((s) => unlockedIds.has(s.id)).length;
  const totalCount = currentSpeciesList.length;

  // Allow re-clicking discovered species — they stay visible and clickable
  const handleSpeciesClick = useCallback(
    (species: Species) => {
      if (isCardOpen) return;
      setUnlockedIds((prev) => new Set([...prev, species.id]));
      setSelectedSpecies(species);
      setIsCardOpen(true);
      setIsCardClosing(false);
    },
    [isCardOpen]
  );

  const handleCloseCard = useCallback(() => {
    setIsCardClosing(true);
    setTimeout(() => {
      setIsCardOpen(false);
      setIsCardClosing(false);
      setSelectedSpecies(null);
    }, 300);
  }, []);

  const switchScene = useCallback(
    (target: SceneType) => {
      if (target === currentScene || isTransitioning) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentScene(target);
        setZoom(1);
        setPanOffset({ x: 0, y: 0 });
        setTimeout(() => setIsTransitioning(false), 800);
      }, 400);
    },
    [currentScene, isTransitioning]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      setZoom((prev) => {
        const delta = e.deltaY > 0 ? -0.08 : 0.08;
        return Math.min(Math.max(prev + delta, 0.6), 2.5);
      });
    },
    []
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (zoom <= 1) return;
      isDragging.current = true;
      dragStart.current = { x: e.clientX, y: e.clientY };
      panStart.current = { ...panOffset };
    },
    [zoom, panOffset]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPanOffset({
        x: panStart.current.x + dx,
        y: panStart.current.y + dy,
      });
    },
    []
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Scene Container with Zoom & Pan */}
      <div
        className="absolute inset-0 transition-transform duration-200 ease-out"
        style={{
          transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
        }}
      >
        {/* Forest Scene */}
        <div
          className={`absolute inset-0 ${
            isTransitioning && currentScene === 'ocean' ? 'scene-exit' : ''
          }`}
          style={{
            opacity: currentScene === 'forest' ? (isTransitioning ? 0 : 1) : 0,
            transition: isTransitioning ? 'opacity 0.4s ease' : 'opacity 0.8s ease',
          }}
        >
          <ForestScene
            species={forestSpecies}
            unlockedIds={unlockedIds}
            onSpeciesClick={handleSpeciesClick}
            isVisible={currentScene === 'forest' && !isTransitioning}
          />
        </div>

        {/* Ocean Scene */}
        <div
          className={`absolute inset-0 ${
            isTransitioning && currentScene === 'forest' ? 'scene-exit' : ''
          }`}
          style={{
            opacity: currentScene === 'ocean' ? (isTransitioning ? 0 : 1) : 0,
            transition: isTransitioning ? 'opacity 0.4s ease' : 'opacity 0.8s ease',
          }}
        >
          <OceanScene
            species={oceanSpecies}
            unlockedIds={unlockedIds}
            onSpeciesClick={handleSpeciesClick}
            isVisible={currentScene === 'ocean' && !isTransitioning}
          />
        </div>
      </div>

      {/* UI Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Top Center - Unlock Counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2">
          <div
            className={`
              px-5 py-2.5 rounded-full
              backdrop-blur-xl border border-white/10
              ${currentScene === 'forest' ? 'bg-[rgba(30,40,28,0.6)]' : 'bg-[rgba(10,22,40,0.6)]'}
              text-white/80 text-sm tracking-wider font-light
            `}
          >
            <span className="text-white/50">已发现</span>{' '}
            <span className="font-medium text-white/90">{unlockedCount}</span>
            <span className="text-white/50"> / {totalCount}</span>
          </div>
        </div>

        {/* Bottom Left - Scene Info */}
        <div className="absolute bottom-8 left-8">
          <h2
            className={`text-2xl font-light tracking-wide mb-1.5 ${
              currentScene === 'forest' ? 'text-[#C8D890]' : 'text-[#B8D8E8]'
            }`}
          >
            {currentScene === 'forest' ? '秘境森林' : '深海海域'}
          </h2>
          <p className="text-white/40 text-sm font-light max-w-64 leading-relaxed">
            {currentScene === 'forest'
              ? '暮色中的密林，荧光光斑中隐藏着珍稀生灵'
              : '幽蓝深海，气泡里封存着来自深渊的秘密'}
          </p>
          <p className="text-white/25 text-xs mt-2 font-light">
            滚轮缩放 · 点击探索 · 拖拽平移
          </p>
        </div>

        {/* Bottom Right - Scene Switch */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-3 pointer-events-auto">
          <button
            onClick={() => switchScene('forest')}
            className={`
              scene-switch-btn px-5 py-3 rounded-2xl
              border text-sm font-light tracking-wide
              ${currentScene === 'forest'
                ? 'bg-[rgba(232,200,64,0.12)] border-[rgba(232,200,64,0.25)] text-[#E8C840]'
                : 'bg-[rgba(30,40,28,0.4)] border-white/10 text-white/50 hover:text-white/70'
              }
            `}
          >
            🌿 秘境森林
          </button>
          <button
            onClick={() => switchScene('ocean')}
            className={`
              scene-switch-btn px-5 py-3 rounded-2xl
              border text-sm font-light tracking-wide
              ${currentScene === 'ocean'
                ? 'bg-[rgba(140,180,220,0.12)] border-[rgba(140,180,220,0.25)] text-[#B8D8E8]'
                : 'bg-[rgba(10,22,40,0.4)] border-white/10 text-white/50 hover:text-white/70'
              }
            `}
          >
            🌊 深海海域
          </button>
        </div>

        {/* Zoom indicator */}
        {zoom !== 1 && (
          <div className="absolute top-6 right-8">
            <div
              className={`
                px-3 py-1.5 rounded-full text-xs text-white/50
                backdrop-blur-xl border border-white/10
                ${currentScene === 'forest' ? 'bg-[rgba(30,40,28,0.6)]' : 'bg-[rgba(10,22,40,0.6)]'}
              `}
            >
              {Math.round(zoom * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Species Card Modal */}
      {isCardOpen && selectedSpecies && (
        <SpeciesCard
          species={selectedSpecies}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}
