'use client';

import { useEffect, useState } from 'react';

interface PageFlipOverlayProps {
  /** Trigger the flip animation */
  isFlipping: boolean;
  /** Which scene is on the page being flipped away */
  sceneContent: 'forest' | 'ocean' | 'welcome';
  /** forward = right-to-left (next page), backward = left-to-right (previous page) */
  direction?: 'forward' | 'backward';
  /** Called when flip animation completes */
  onFlipComplete?: () => void;
}

export default function PageFlipOverlay({
  isFlipping,
  sceneContent,
  direction = 'forward',
  onFlipComplete,
}: PageFlipOverlayProps) {
  const [phase, setPhase] = useState<'idle' | 'flipping' | 'settling'>('idle');

  useEffect(() => {
    if (isFlipping && phase === 'idle') {
      // Start the flip after a tiny delay so the page renders first
      const startTimer = setTimeout(() => setPhase('flipping'), 50);
      return () => clearTimeout(startTimer);
    }
  }, [isFlipping, phase]);

  useEffect(() => {
    if (phase === 'flipping') {
      // After the flip animation duration, settle and notify
      const timer = setTimeout(() => {
        setPhase('settling');
        onFlipComplete?.();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [phase, onFlipComplete]);

  useEffect(() => {
    if (phase === 'settling') {
      // Fade out and reset
      const timer = setTimeout(() => {
        setPhase('idle');
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  if (!isFlipping && phase === 'idle') return null;

  const isForward = direction === 'forward';

  // Paper colors and textures
  const pageStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    background: `
      linear-gradient(135deg, #F5ECD7 0%, #E8DCC6 60%, #DED0B8 100%),
      repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,109,60,0.03) 28px, rgba(139,109,60,0.03) 29px),
      repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(139,109,60,0.02) 28px, rgba(139,109,60,0.02) 29px)
    `,
    transformOrigin: isForward ? 'left center' : 'right center',
    transform: phase === 'flipping'
      ? isForward
        ? 'perspective(2000px) rotateY(0deg)'
        : 'perspective(2000px) rotateY(0deg)'
      : isForward
        ? 'perspective(2000px) rotateY(-180deg)'
        : 'perspective(2000px) rotateY(180deg)',
    transition: phase === 'flipping'
      ? 'transform 0.9s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
      : 'transform 0.3s cubic-bezier(0.215, 0.610, 0.355, 1.000)',
    backfaceVisibility: 'hidden',
    zIndex: 100,
    overflow: 'hidden',
    opacity: phase === 'settling' ? 0 : 1,
    // Fade out during settling
  };

  // Add fade out transition for settling phase
  if (phase === 'settling') {
    pageStyle.transition = 'transform 0.3s ease, opacity 0.4s ease';
  }

  // Shadow on the page edge
  const shadowStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '40%',
    pointerEvents: 'none',
    zIndex: 101,
    ...(isForward
      ? { right: 0, background: 'linear-gradient(to left, rgba(0,0,0,0.25), transparent)' }
      : { left: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.25), transparent)' }
    ),
    opacity: phase === 'flipping' ? 0.6 : 0,
    transition: 'opacity 0.9s ease-in',
  };

  // Scene illustration gradient
  const getSceneGradient = () => {
    if (sceneContent === 'welcome') {
      return 'linear-gradient(180deg, #3D2B1F 0%, #2C1810 50%, #1A0F08 100%)';
    }
    return sceneContent === 'forest'
      ? 'linear-gradient(180deg, #2A3D20 0%, #1A2814 40%, #0F1A0A 100%)'
      : 'linear-gradient(180deg, #1A4468 0%, #0C2440 40%, #061428 100%)';
  };

  const illustrationStyle: React.CSSProperties = {
    position: 'absolute',
    inset: '12%',
    borderRadius: '4px',
    border: '2px solid rgba(139,109,60,0.15)',
    background: getSceneGradient(),
    boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.3)',
  };

  const getTitleText = () => {
    if (sceneContent === 'welcome') return '探险手记';
    return sceneContent === 'forest' ? '秘境森林' : '深海海域';
  };

  const getTitleColor = () => {
    if (sceneContent === 'welcome') return 'rgba(200,170,120,0.7)';
    return sceneContent === 'forest' ? 'rgba(232,200,64,0.7)' : 'rgba(140,200,240,0.7)';
  };

  const getPageNumber = () => {
    if (sceneContent === 'welcome') return '— 序 —';
    return sceneContent === 'forest' ? '— I —' : '— II —';
  };

  const getAccentColor = () => {
    if (sceneContent === 'welcome') return 'rgba(200,170,120,0.5)';
    return sceneContent === 'forest' ? 'rgba(232,200,64,0.6)' : 'rgba(140,200,240,0.5)';
  };

  const cornerMark = (position: 'tl' | 'tr' | 'bl' | 'br') => {
    const base: React.CSSProperties = {
      position: 'absolute',
      width: '20px',
      height: '20px',
      borderColor: 'rgba(139,109,60,0.2)',
      borderStyle: 'solid',
    };
    switch (position) {
      case 'tl': return { ...base, top: '6%', left: '6%', borderWidth: '2px 0 0 2px' };
      case 'tr': return { ...base, top: '6%', right: '6%', borderWidth: '2px 2px 0 0' };
      case 'bl': return { ...base, bottom: '6%', left: '6%', borderWidth: '0 0 2px 2px' };
      case 'br': return { ...base, bottom: '6%', right: '6%', borderWidth: '0 2px 2px 0' };
    }
  };

  return (
    <div style={pageStyle}>
      {/* Paper texture lines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139,109,60,0.03) 28px, rgba(139,109,60,0.03) 29px)',
        pointerEvents: 'none',
      }} />

      {/* Scene illustration */}
      <div style={illustrationStyle}>
        {/* Accent dots for forest */}
        {sceneContent === 'forest' && (
          <>
            <div style={{ position: 'absolute', top: '30%', left: '25%', width: '4px', height: '4px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 8px ${getAccentColor()}` }} />
            <div style={{ position: 'absolute', top: '45%', left: '60%', width: '3px', height: '3px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 6px ${getAccentColor()}` }} />
            <div style={{ position: 'absolute', top: '55%', left: '40%', width: '5px', height: '5px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 10px ${getAccentColor()}` }} />
          </>
        )}
        {/* Accent dots for ocean */}
        {sceneContent === 'ocean' && (
          <>
            <div style={{ position: 'absolute', top: '25%', left: '35%', width: '5px', height: '5px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 8px ${getAccentColor()}` }} />
            <div style={{ position: 'absolute', top: '50%', left: '55%', width: '4px', height: '4px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 6px ${getAccentColor()}` }} />
            <div style={{ position: 'absolute', top: '65%', left: '30%', width: '6px', height: '6px', borderRadius: '50%', background: getAccentColor(), boxShadow: `0 0 10px ${getAccentColor()}` }} />
          </>
        )}
        {/* Welcome page emblem */}
        {sceneContent === 'welcome' && (
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: '40px', height: '40px', borderRadius: '50%',
            border: '2px solid rgba(200,170,120,0.3)',
            boxShadow: `0 0 15px rgba(200,170,120,0.2)`,
          }} />
        )}
      </div>

      {/* Corner marks */}
      <div style={cornerMark('tl')} />
      <div style={cornerMark('tr')} />
      <div style={cornerMark('bl')} />
      <div style={cornerMark('br')} />

      {/* Scene title */}
      <div style={{
        position: 'absolute',
        bottom: '6%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontFamily: 'var(--font-journal), serif',
        fontSize: '14px',
        letterSpacing: '0.15em',
        color: getTitleColor(),
        textShadow: '0 1px 3px rgba(0,0,0,0.5)',
      }}>
        {getTitleText()}
      </div>

      {/* Page edge shadow */}
      <div style={shadowStyle} />

      {/* Page number */}
      <div style={{
        position: 'absolute', bottom: '3%', right: '8%',
        fontFamily: 'var(--font-journal), serif',
        fontSize: '10px', color: 'rgba(139,109,60,0.3)',
      }}>
        {getPageNumber()}
      </div>
    </div>
  );
}
