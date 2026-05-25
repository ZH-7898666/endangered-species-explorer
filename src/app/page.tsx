'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Species } from '@/data/species';
import { ForestScene } from '@/components/forest-scene';
import OceanScene from '@/components/ocean-scene';
import { SpeciesCard } from '@/components/species-card';
import { forestSpecies, oceanSpecies } from '@/data/species';
import LoadingScreen from '@/components/loading-screen';

// World is 2x the viewport size - elements are spread across this larger space
const WORLD_SCALE = 2.0;

export default function Home() {
  const [currentScene, setCurrentScene] = useState<'forest' | 'ocean'>('forest');
  const [unlockedIds, setUnlockedIds] = useState<Set<string>>(new Set());
  const [recentlyClicked, setRecentlyClicked] = useState<Set<string>>(new Set());
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [burstingId, setBurstingId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Viewport camera: zoom and pan within the larger world
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOrigin = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setIsMounted(true); }, []);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Mouse position for parallax (normalized -1 to 1)
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

  // Auto-restore recently clicked items after 5 seconds
  useEffect(() => {
    if (recentlyClicked.size === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    recentlyClicked.forEach(id => {
      timers.push(setTimeout(() => {
        setRecentlyClicked(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }, 5000));
    });
    return () => timers.forEach(clearTimeout);
  }, [recentlyClicked]);

  const handleSpeciesClick = useCallback((species: Species) => {
    setBurstingId(species.id);
    setUnlockedIds(prev => new Set(prev).add(species.id));
    setRecentlyClicked(prev => new Set(prev).add(species.id));

    setTimeout(() => setBurstingId(null), 600);
    setTimeout(() => {
      setSelectedSpecies(species);
      setIsClosing(false);
    }, 350);
  }, []);

  const handleCloseCard = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setSelectedSpecies(null);
      setIsClosing(false);
    }, 300);
  }, []);

  // Zoom: adjust camera distance within the world
  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    setZoom(prev => {
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      const next = Math.min(2.5, Math.max(0.5, prev + delta));
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Pan: move viewport within the world (middle-click or ctrl+drag)
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      e.preventDefault();
      isPanning.current = true;
      panStart.current = { x: e.clientX, y: e.clientY };
      panOrigin.current = { ...pan };
    }
  }, [pan]);

  const handleMouseMovePan = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    const scale = 1 / zoom;
    setPan({
      x: panOrigin.current.x + dx * scale,
      y: panOrigin.current.y + dy * scale,
    });
  }, [zoom]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  // Constrain pan so viewport stays within world bounds
  const constrainPan = useCallback((p: { x: number; y: number }, z: number) => {
    // The visible world area is viewport / zoom
    // The world size is WORLD_SCALE * viewport
    // Pan offset is relative to center of world
    const maxPanX = (WORLD_SCALE - 1 / z) * 50; // percentage
    const maxPanY = (WORLD_SCALE - 1 / z) * 50;
    return {
      x: Math.max(-maxPanX, Math.min(maxPanX, p.x)),
      y: Math.max(-maxPanY, Math.min(maxPanY, p.y)),
    };
  }, []);

  const constrainedPan = constrainPan(pan, zoom);

  const currentSpecies = currentScene === 'forest' ? forestSpecies : oceanSpecies;
  const sceneLabel = currentScene === 'forest' ? '秘境森林' : '深海海域';
  const sceneDesc = currentScene === 'forest'
    ? '黄昏密林，萤火闪烁'
    : '深海秘境，荧光摇曳';

  if (!isMounted) {
    return <div className="w-screen h-screen bg-black" />;
  }

  if (isLoading) {
    return <LoadingScreen onComplete={handleLoadingComplete} />;
  }

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{ cursor: isPanning.current ? 'grabbing' : 'default' }}
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMovePan}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Scene container - this is the "world" that we navigate through */}
      <div
        className="absolute"
        style={{
          // World is larger than viewport
          width: `${WORLD_SCALE * 100}%`,
          height: `${WORLD_SCALE * 100}%`,
          // Position so center of world aligns with center of viewport at zoom=1
          left: `${-(WORLD_SCALE - 1) * 50}%`,
          top: `${-(WORLD_SCALE - 1) * 50}%`,
          // Camera transform: zoom + pan
          transform: `scale(${zoom}) translate(${constrainedPan.x}%, ${constrainedPan.y}%)`,
          transformOrigin: 'center center',
          transition: isPanning.current ? 'none' : 'transform 0.15s ease-out',
        }}
      >
        {currentScene === 'forest' ? (
          <ForestScene
            species={forestSpecies}
            unlockedIds={unlockedIds}
            recentlyClicked={recentlyClicked}
            onSpeciesClick={handleSpeciesClick}
            mousePos={mousePos}
            burstingId={burstingId}
          />
        ) : (
          <OceanScene
            species={oceanSpecies}
            unlockedIds={unlockedIds}
            recentlyClicked={recentlyClicked}
            onSpeciesClick={handleSpeciesClick}
            mousePos={mousePos}
            burstingId={burstingId}
          />
        )}
      </div>

      {/* UI Overlay - fixed on screen, not affected by zoom/pan */}
      {/* Scene name & description */}
      <div className="absolute bottom-8 left-8 z-50 select-none">
        <h2 className="text-white/70 text-lg font-medium tracking-wider" style={{ fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif" }}>
          {sceneLabel}
        </h2>
        <p className="text-white/30 text-xs mt-1 tracking-widest">
          {sceneDesc}
        </p>
        <p className="text-white/20 text-[10px] mt-2 tracking-wide">
          滚轮缩放 · Ctrl+拖拽平移 · 点击探索
        </p>
      </div>

      {/* Species counter */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 select-none">
        <div
          className="px-5 py-2 rounded-full flex items-center gap-2"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <span className="text-white/50 text-xs tracking-wider">已发现</span>
          <span className="text-white/90 text-sm font-medium">
            {unlockedIds.size}/{currentSpecies.length}
          </span>
        </div>
      </div>

      {/* Scene switch button */}
      <div className="absolute bottom-8 right-8 z-50">
        <button
          onClick={() => setCurrentScene(prev => prev === 'forest' ? 'ocean' : 'forest')}
          className="px-5 py-2.5 rounded-full text-white/80 text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'rgba(255,255,255,0.06)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            fontFamily: "'PingFang SC', 'Noto Sans SC', system-ui, sans-serif",
          }}
        >
          {currentScene === 'forest' ? '🌊 深海海域' : '🌿 秘境森林'}
        </button>
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 select-none">
        <span className="text-white/15 text-[10px] tracking-wider">
          {Math.round(zoom * 100)}%
        </span>
      </div>

      {/* Species card modal */}
      {selectedSpecies && (
        <SpeciesCard
          species={selectedSpecies}
          onClose={handleCloseCard}
        />
      )}
    </div>
  );
}
