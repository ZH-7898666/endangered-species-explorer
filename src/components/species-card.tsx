'use client';

import type { Species } from '@/data/species';
import { useState, useEffect } from 'react';

interface SpeciesCardProps {
  species: Species;
  isClosing: boolean;
  onClose: () => void;
}

export function SpeciesCard({ species, isClosing, onClose }: SpeciesCardProps) {
  const [activeTab, setActiveTab] = useState<'info' | 'media'>('info');
  const [imgLoaded, setImgLoaded] = useState(false);
  const [videoImgLoaded, setVideoImgLoaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    setImgLoaded(false);
    setVideoImgLoaded(false);
    setActiveTab('info');
  }, [species.id]);

  const statusColors: Record<string, string> = {
    CR: '#ff7b7b',
    EN: '#ffb86c',
    VU: '#f1e05a',
  };

  const statusLabels: Record<string, string> = {
    CR: '极度濒危 CR',
    EN: '濒危 EN',
    VU: '易危 VU',
  };

  const isForest = species.scene === 'forest';
  const cardBg = isForest
    ? 'rgba(26, 40, 24, 0.85)'
    : 'rgba(14, 28, 50, 0.85)';
  const accentColor = isForest ? '#7ba69e' : '#B8D8E8';
  const warmAccent = isForest ? '#E8C840' : '#6B5B8D';

  return (
    <div
      className={`species-overlay ${isClosing ? 'closing' : ''}`}
      onClick={onClose}
    >
      <div
        className={`species-card ${isClosing ? 'closing' : ''}`}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: cardBg,
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: `0 0 60px ${isForest ? 'rgba(232,200,64,0.08)' : 'rgba(184,216,232,0.08)'}`,
          maxWidth: '520px',
          width: 'calc(100% - 48px)',
        }}
      >
        {/* Header with species image banner */}
        <div className="relative overflow-hidden" style={{ borderRadius: '20px 20px 0 0' }}>
          {/* Banner image */}
          <div className="w-full h-44 relative">
            {!imgLoaded && (
              <div
                className="absolute inset-0 video-shimmer"
                style={{
                  background: `linear-gradient(135deg, ${isForest ? 'rgba(45,59,45,0.5)' : 'rgba(27,40,69,0.5)'}, ${isForest ? 'rgba(26,35,24,0.8)' : 'rgba(10,22,40,0.8)'})`,
                }}
              />
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={species.imageUrl}
              alt={species.name}
              className={`w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-60' : 'opacity-0'}`}
              onLoad={() => setImgLoaded(true)}
            />
            {/* Gradient overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 0%, ${cardBg} 100%)`,
              }}
            />
          </div>

          {/* Header content overlaid */}
          <div className="absolute bottom-0 left-0 right-0 px-7 pb-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                {/* Species emoji avatar */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${isForest ? 'rgba(232,200,64,0.2)' : 'rgba(184,216,232,0.2)'}, ${isForest ? 'rgba(123,166,158,0.12)' : 'rgba(107,91,141,0.12)'})`,
                    border: `1px solid ${isForest ? 'rgba(232,200,64,0.25)' : 'rgba(184,216,232,0.25)'}`,
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {species.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-medium text-white/90 tracking-wide">
                    {species.name}
                  </h3>
                  <p className="text-sm text-white/40 italic mt-0.5">
                    {species.latinName}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors shrink-0"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Status badge */}
            <div className="flex items-center gap-3 mt-3">
              <span
                className={`status-badge-${species.statusLevel} px-3 py-1 rounded-full text-xs font-medium tracking-wider`}
              >
                {statusLabels[species.statusLevel]}
              </span>
              <span className="text-white/30 text-xs">{species.status}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-7 pt-3 flex gap-1 mb-4">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeTab === 'info'
                ? 'text-white/90'
                : 'text-white/40 hover:text-white/60'
            }`}
            style={{
              background: activeTab === 'info'
                ? isForest ? 'rgba(232,200,64,0.12)' : 'rgba(184,216,232,0.12)'
                : 'transparent',
            }}
          >
            物种档案
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`px-4 py-2 rounded-xl text-sm transition-all duration-300 ${
              activeTab === 'media'
                ? 'text-white/90'
                : 'text-white/40 hover:text-white/60'
            }`}
            style={{
              background: activeTab === 'media'
                ? isForest ? 'rgba(232,200,64,0.12)' : 'rgba(184,216,232,0.12)'
                : 'transparent',
            }}
          >
            影像记录
          </button>
        </div>

        {/* Tab Content */}
        <div className="px-7 pb-7">
          {activeTab === 'info' ? (
            <div className="space-y-5">
              {/* Description */}
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {species.description}
              </p>

              {/* Habitat & Population */}
              <div className="grid grid-cols-2 gap-3">
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="text-white/30 text-xs mb-1">栖息地</div>
                  <div className="text-white/70 text-sm font-light">{species.habitat}</div>
                </div>
                <div
                  className="p-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  <div className="text-white/30 text-xs mb-1">种群数量</div>
                  <div className="text-white/70 text-sm font-light">{species.population}</div>
                </div>
              </div>

              {/* Fun facts */}
              <div>
                <h4
                  className="text-sm font-medium mb-3"
                  style={{ color: accentColor }}
                >
                  趣味事实
                </h4>
                <div className="space-y-2">
                  {species.facts.map((fact, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-sm text-white/60 font-light"
                    >
                      <span
                        className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5"
                        style={{
                          background: isForest ? 'rgba(232,200,64,0.1)' : 'rgba(184,216,232,0.1)',
                          color: warmAccent,
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="leading-relaxed">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conservation status bar */}
              <div>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-white/30">保护紧迫度</span>
                  <span style={{ color: statusColors[species.statusLevel] }}>
                    {species.statusLevel === 'CR' ? '极高' : species.statusLevel === 'EN' ? '高' : '中高'}
                  </span>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.06)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{
                      width: species.statusLevel === 'CR' ? '90%' : species.statusLevel === 'EN' ? '65%' : '45%',
                      background: `linear-gradient(90deg, ${statusColors[species.statusLevel]}, ${statusColors[species.statusLevel]}88)`,
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Species image */}
              <div
                className="w-full aspect-video rounded-2xl overflow-hidden relative"
                style={{
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {!videoImgLoaded && (
                  <div
                    className="absolute inset-0 video-shimmer"
                    style={{
                      background: `linear-gradient(135deg, ${isForest ? 'rgba(45,59,45,0.5)' : 'rgba(27,40,69,0.5)'}, ${isForest ? 'rgba(26,35,24,0.8)' : 'rgba(10,22,40,0.8)'})`,
                    }}
                  />
                )}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={species.imageUrl}
                  alt={`${species.name} 野外影像`}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${videoImgLoaded ? 'opacity-80' : 'opacity-0'}`}
                  onLoad={() => setVideoImgLoaded(true)}
                />
                <div className="absolute inset-0 flex items-end">
                  <div
                    className="w-full px-4 py-2.5 text-xs text-white/50 font-light"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
                    }}
                  >
                    {species.name} · 野外实拍
                  </div>
                </div>
              </div>

              {/* Video section placeholder */}
              <div
                className="w-full aspect-video rounded-2xl overflow-hidden relative"
                style={{
                  background: `linear-gradient(135deg, ${isForest ? 'rgba(35,50,32,0.4)' : 'rgba(20,35,55,0.4)'}, ${isForest ? 'rgba(20,30,18,0.7)' : 'rgba(8,18,35,0.7)'})`,
                  border: '1px solid rgba(255,255,255,0.05)',
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    {/* Play button */}
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 cursor-pointer hover:scale-110 transition-transform"
                      style={{
                        background: isForest ? 'rgba(232,200,64,0.15)' : 'rgba(184,216,232,0.15)',
                        border: `1px solid ${isForest ? 'rgba(232,200,64,0.3)' : 'rgba(184,216,232,0.3)'}`,
                      }}
                    >
                      <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                        <path d="M3 1L14 9L3 17V1Z" fill={accentColor} opacity="0.7" />
                      </svg>
                    </div>
                    <p className="text-white/30 text-xs font-light">{species.name} · 纪录片片段</p>
                  </div>
                </div>
                <div className="absolute inset-0 video-shimmer" style={{ animationDelay: '1s' }} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
