'use client';

import { useState } from 'react';
import type { Species } from '@/data/species';

interface SpeciesCardProps {
  species: Species;
  onClose: () => void;
}

export function SpeciesCard({ species, onClose }: SpeciesCardProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'media'>('profile');
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const levelColors: Record<string, { bg: string; text: string; bar: string }> = {
    CR: { bg: 'rgba(220,60,60,0.2)', text: '#ff6b6b', bar: 'linear-gradient(90deg, #ff6b6b, #ee5a24)' },
    EN: { bg: 'rgba(240,160,40,0.2)', text: '#ffa726', bar: 'linear-gradient(90deg, #ffa726, #f57c00)' },
    VU: { bg: 'rgba(240,200,60,0.2)', text: '#ffd54f', bar: 'linear-gradient(90deg, #ffd54f, #fbc02d)' },
    NT: { bg: 'rgba(120,200,120,0.2)', text: '#81c784', bar: 'linear-gradient(90deg, #81c784, #66bb6a)' },
  };
  const levelColor = levelColors[species.level] || levelColors.VU;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background: species.category === 'forest'
            ? 'rgba(15,25,12,0.75)'
            : 'rgba(8,16,32,0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* Card */}
      <div
        className="relative w-[92vw] max-w-[520px] max-h-[88vh] overflow-y-auto species-card-enter"
        style={{
          background: species.category === 'forest'
            ? 'rgba(30,40,28,0.88)'
            : 'rgba(10,22,40,0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderRadius: '20px',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: species.category === 'forest'
            ? '0 0 60px rgba(232,200,64,0.08)'
            : '0 0 60px rgba(140,200,240,0.08)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image - clickable */}
        <div
          className="relative w-full h-52 overflow-hidden cursor-pointer group"
          style={{ borderRadius: '20px 20px 0 0' }}
          onClick={() => setFullscreenImage(species.imageUrl)}
        >
          <img
            src={species.imageUrl}
            alt={species.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            style={{ filter: 'brightness(0.85) saturate(1.1)' }}
          />
          {/* Hover expand hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.25)' }}>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9" />
                <polyline points="9 21 3 21 3 15" />
                <line x1="21" y1="3" x2="14" y2="10" />
                <line x1="3" y1="21" x2="10" y2="14" />
              </svg>
              <span className="text-xs text-white/90 font-medium">查看大图</span>
            </div>
          </div>
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }}
          />
          {/* Close button */}
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            style={{
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          {/* Name overlay */}
          <div className="absolute bottom-3 left-4 right-4">
            <div className="flex items-end gap-3">
              <span className="text-3xl">{species.emoji}</span>
              <div>
                <h2 className="text-xl font-medium text-white" style={{ letterSpacing: '0.02em' }}>
                  {species.name}
                </h2>
                <p className="text-xs text-white/50 italic">{species.latinName}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Level + CITES Badge */}
        <div className="flex items-center gap-2 px-5 pt-4">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: levelColor.bg,
              color: levelColor.text,
              border: `1px solid ${levelColor.text}33`,
            }}
          >
            {species.levelName} {species.level}
          </span>
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
            style={{
              background: 'rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.6)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            {species.citesStatus}
          </span>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 mx-5 mt-4 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
          {(['profile', 'media'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200"
              style={{
                background: activeTab === tab ? 'rgba(255,255,255,0.1)' : 'transparent',
                color: activeTab === tab ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)',
              }}
            >
              {tab === 'profile' ? '物种档案' : '影像记录'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-5 py-4">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              {/* Description */}
              <p className="text-sm leading-relaxed text-white/75">
                {species.description}
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <InfoItem
                  label="栖息地"
                  value={species.habitat}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
                <InfoItem
                  label="种群现状"
                  value={species.population}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  }
                />
              </div>

              {/* Threats */}
              <div className="p-3 rounded-xl" style={{ background: 'rgba(255,80,80,0.06)', border: '1px solid rgba(255,80,80,0.1)' }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ff6b6b" strokeWidth="1.5">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="text-xs font-medium" style={{ color: '#ff8a80' }}>主要威胁</span>
                </div>
                <p className="text-xs leading-relaxed text-white/55">{species.threats}</p>
              </div>

              {/* Fun Fact */}
              <div className="p-3 rounded-xl" style={{
                background: species.category === 'forest'
                  ? 'rgba(232,200,64,0.06)'
                  : 'rgba(100,180,240,0.06)',
                border: species.category === 'forest'
                  ? '1px solid rgba(232,200,64,0.1)'
                  : '1px solid rgba(100,180,240,0.1)',
              }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-sm">💡</span>
                  <span className="text-xs font-medium" style={{
                    color: species.category === 'forest' ? '#e8c840' : '#64b5f6',
                  }}>
                    趣味冷知识
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-white/55">{species.funFact}</p>
              </div>

              {/* Protection Level Bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-white/40">保护等级</span>
                  <span className="text-xs font-medium" style={{ color: levelColor.text }}>
                    {species.levelName}
                  </span>
                </div>
                <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: species.level === 'CR' ? '95%' : species.level === 'EN' ? '70%' : species.level === 'NT' ? '30%' : '45%',
                      background: levelColor.bar,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[10px] text-white/25">NT 近危</span>
                  <span className="text-[10px] text-white/25">VU 易危</span>
                  <span className="text-[10px] text-white/25">EN 濒危</span>
                  <span className="text-[10px] text-white/25">CR 极危</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Main Image - clickable for fullscreen */}
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer group"
                style={{ aspectRatio: '16/9' }}
                onClick={() => setFullscreenImage(species.imageUrl)}
              >
                <img
                  src={species.imageUrl}
                  alt={species.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: 'brightness(0.9) saturate(1.1)' }}
                />
                {/* Hover expand hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.25)' }}>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9" />
                      <polyline points="9 21 3 21 3 15" />
                      <line x1="21" y1="3" x2="14" y2="10" />
                      <line x1="3" y1="21" x2="10" y2="14" />
                    </svg>
                    <span className="text-xs text-white/90 font-medium">查看大图</span>
                  </div>
                </div>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 50%)',
                  }}
                />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-white/70">{species.name} · 实拍影像</p>
                </div>
              </div>

              {/* Photo Info Card */}
              <div className="p-4 rounded-xl" style={{
                background: species.category === 'forest'
                  ? 'rgba(232,200,64,0.04)'
                  : 'rgba(100,180,240,0.04)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{species.emoji}</span>
                  <div>
                    <h3 className="text-sm font-medium text-white/80">{species.name}</h3>
                    <p className="text-[10px] text-white/35 italic">{species.latinName}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-white/50">{species.funFact}</p>
              </div>

              {/* Status Info */}
              <div className="grid grid-cols-3 gap-2">
                <StatusCard label="保护等级" value={species.levelName} accent={levelColor.text} />
                <StatusCard label="CITES" value={species.citesStatus.replace('CITES ', '')} accent="rgba(255,255,255,0.6)" />
                <StatusCard
                  label="类群"
                  value={species.category === 'forest' ? '陆生' : '水生'}
                  accent={species.category === 'forest' ? '#e8c840' : '#64b5f6'}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fullscreen Image Viewer */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center fullscreen-viewer-enter"
          onClick={() => setFullscreenImage(null)}
          style={{
            background: 'rgba(0,0,0,0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Species name label */}
          <div className="absolute top-5 left-5 flex items-center gap-3">
            <span className="text-2xl">{species.emoji}</span>
            <div>
              <p className="text-white/90 text-sm font-medium">{species.name}</p>
              <p className="text-white/40 text-xs italic">{species.latinName}</p>
            </div>
          </div>

          {/* Full image - object-contain to show complete animal */}
          <img
            src={fullscreenImage}
            alt={species.name}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            style={{
              filter: 'brightness(0.95) saturate(1.05)',
              boxShadow: species.category === 'forest'
                ? '0 0 80px rgba(232,200,64,0.1)'
                : '0 0 80px rgba(140,200,240,0.1)',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          {/* Zoom hint at bottom */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
            <span className="text-[11px] text-white/40">点击空白处关闭</span>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="flex items-center gap-1.5 mb-1 text-white/35">
        {icon}
        <span className="text-[10px]">{label}</span>
      </div>
      <p className="text-xs text-white/65 font-medium">{value}</p>
    </div>
  );
}

function StatusCard({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div className="p-2.5 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
      <p className="text-[10px] text-white/30 mb-1">{label}</p>
      <p className="text-xs font-medium" style={{ color: accent }}>{value}</p>
    </div>
  );
}
