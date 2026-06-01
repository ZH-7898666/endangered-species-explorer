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

  const levelConfig: Record<string, { color: string; ink: string; seal: string }> = {
    CR: { color: '#c0392b', ink: '#8b1a1a', seal: '极危' },
    EN: { color: '#d4780a', ink: '#8b5e0a', seal: '濒危' },
    VU: { color: '#c9a800', ink: '#8b7d0a', seal: '易危' },
    NT: { color: '#5a8a3c', ink: '#3d5e28', seal: '近危' },
  };
  const lc = levelConfig[species.level] || levelConfig.VU;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      {/* Backdrop - dark with paper texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: species.category === 'forest'
            ? 'rgba(12,20,10,0.82)'
            : 'rgba(6,12,24,0.82)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      />

      {/* Card - Journal Page */}
      <div
        className="relative w-[92vw] max-w-[520px] max-h-[88vh] overflow-y-auto species-card-enter"
        style={{
          background: `linear-gradient(135deg, #f5e6c8 0%, #e8d5a8 30%, #f0ddb0 60%, #e5cfa0 100%)`,
          borderRadius: '4px',
          boxShadow: species.category === 'forest'
            ? '0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(232,200,64,0.06), inset 0 0 60px rgba(139,109,60,0.08)'
            : '0 4px 30px rgba(0,0,0,0.5), 0 0 80px rgba(100,180,240,0.06), inset 0 0 60px rgba(139,109,60,0.08)',
          border: '2px solid rgba(139,109,60,0.3)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative double border */}
        <div className="absolute inset-[6px] pointer-events-none" style={{
          border: '1px solid rgba(139,109,60,0.2)',
          borderRadius: '2px',
        }} />

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 pointer-events-none" style={{ borderTop: '2px solid rgba(139,109,60,0.35)', borderLeft: '2px solid rgba(139,109,60,0.35)' }} />
        <div className="absolute top-2 right-2 w-4 h-4 pointer-events-none" style={{ borderTop: '2px solid rgba(139,109,60,0.35)', borderRight: '2px solid rgba(139,109,60,0.35)' }} />
        <div className="absolute bottom-2 left-2 w-4 h-4 pointer-events-none" style={{ borderBottom: '2px solid rgba(139,109,60,0.35)', borderLeft: '2px solid rgba(139,109,60,0.35)' }} />
        <div className="absolute bottom-2 right-2 w-4 h-4 pointer-events-none" style={{ borderBottom: '2px solid rgba(139,109,60,0.35)', borderRight: '2px solid rgba(139,109,60,0.35)' }} />

        {/* Paper stain spots */}
        <div className="absolute top-[15%] right-[8%] w-16 h-16 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(160,130,70,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[20%] left-[5%] w-20 h-12 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse, rgba(160,130,70,0.05) 0%, transparent 70%)' }} />

        {/* Close button - wax seal style */}
        <button
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: 'radial-gradient(circle at 40% 35%, #c0392b, #8b1a1a)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)',
            border: '1px solid rgba(139,20,20,0.5)',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,220,200,0.8)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>

        {/* Header area with image and name */}
        <div className="relative">
          {/* Species Image - like a pasted photograph */}
          <div
            className="relative mx-4 mt-5 h-48 overflow-hidden cursor-pointer group"
            style={{
              borderRadius: '2px',
              border: '3px solid rgba(255,255,255,0.85)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.15), inset 0 0 0 1px rgba(0,0,0,0.05)',
              transform: 'rotate(-0.5deg)',
            }}
            onClick={() => setFullscreenImage(species.imageUrl)}
          >
            <img
              src={species.imageUrl}
              alt={species.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ filter: 'sepia(0.08) brightness(0.92) contrast(1.05) saturate(1.1)' }}
            />
            {/* Photo tape at top */}
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-14 h-4" style={{
              background: 'rgba(255,250,230,0.55)',
              transform: 'translateX(-50%) rotate(1deg)',
              boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
            }} />
            {/* Hover hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <span className="text-xs px-3 py-1 rounded" style={{ background: 'rgba(255,250,230,0.8)', color: '#5a4a2a', fontFamily: 'var(--font-journal)' }}>点击查看大图</span>
            </div>
          </div>

          {/* Species Name and Latin - handwritten annotation style */}
          <div className="px-5 pt-3 pb-1">
            <div className="flex items-start gap-2">
              <span className="text-2xl mt-0.5">{species.emoji}</span>
              <div>
                <h2 className="text-xl font-medium" style={{ color: '#3d2b1a', fontFamily: 'var(--font-journal)', letterSpacing: '0.01em' }}>
                  {species.name}
                </h2>
                <p className="text-xs italic mt-0.5" style={{ color: '#8b7355', fontFamily: 'Georgia, serif' }}>
                  {species.latinName}
                </p>
              </div>
            </div>
          </div>

          {/* Level Seal Badge */}
          <div className="flex items-center gap-2 px-5 pb-2">
            {/* Seal stamp */}
            <div className="relative flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{
                background: `radial-gradient(circle at 45% 40%, ${lc.color}44, ${lc.ink}66)`,
                border: `2px solid ${lc.color}88`,
                boxShadow: `0 1px 4px rgba(0,0,0,0.15), inset 0 0 8px ${lc.color}22`,
              }}>
                <div className="text-center">
                  <div className="text-[9px] font-bold leading-none" style={{ color: lc.color }}>{species.level}</div>
                  <div className="text-[7px] leading-none mt-0.5" style={{ color: lc.color }}>{lc.seal}</div>
                </div>
              </div>
              {/* Seal imprint texture */}
              <div className="absolute inset-0 rounded-full pointer-events-none" style={{
                background: 'radial-gradient(circle at 30% 25%, rgba(255,255,255,0.15) 0%, transparent 50%)',
              }} />
            </div>
            <div>
              <p className="text-[11px] font-medium" style={{ color: lc.ink, fontFamily: 'var(--font-journal)' }}>
                {species.levelName} {species.level}
              </p>
              {species.citesStatus && (
                <p className="text-[10px] mt-0.5" style={{ color: '#8b7355' }}>
                  {species.citesStatus}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative divider */}
        <div className="mx-5 my-1 flex items-center gap-2">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(139,109,60,0.3), rgba(139,109,60,0.08))' }} />
          <div className="w-1.5 h-1.5 rotate-45" style={{ background: 'rgba(139,109,60,0.3)' }} />
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(139,109,60,0.08), rgba(139,109,60,0.3))' }} />
        </div>

        {/* Tabs - like notebook tabs */}
        <div className="flex gap-0 mx-5 mt-2">
          {(['profile', 'media'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 text-sm transition-all duration-200"
              style={{
                fontFamily: 'var(--font-journal)',
                color: activeTab === tab ? '#3d2b1a' : '#8b7355',
                background: activeTab === tab ? 'rgba(139,109,60,0.1)' : 'transparent',
                borderBottom: activeTab === tab ? '2px solid rgba(139,109,60,0.5)' : '2px solid transparent',
              }}
            >
              {tab === 'profile' ? '📖 物种档案' : '📷 影像记录'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="px-5 py-4">
          {activeTab === 'profile' ? (
            <div className="space-y-4">
              {/* Description - handwritten annotation */}
              <div>
                <p className="text-sm leading-relaxed" style={{ color: '#4a3828', fontFamily: 'var(--font-journal)', lineHeight: '1.8' }}>
                  {species.description}
                </p>
              </div>

              {/* Info Grid - field note cards */}
              <div className="grid grid-cols-2 gap-3">
                <FieldNote
                  label="栖息地"
                  value={species.habitat}
                  icon="🌲"
                />
                <FieldNote
                  label="种群现状"
                  value={species.population}
                  icon="📊"
                />
              </div>

              {/* Threats - red ink annotation */}
              <div className="relative p-3" style={{
                background: 'rgba(180,40,40,0.06)',
                border: '1px solid rgba(180,40,40,0.15)',
                borderRadius: '2px',
              }}>
                {/* Red ink corner mark */}
                <div className="absolute -top-0.5 -left-0.5 w-3 h-3" style={{ borderLeft: '2px solid rgba(180,40,40,0.4)', borderTop: '2px solid rgba(180,40,40,0.4)' }} />
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs">⚠️</span>
                  <span className="text-[11px] font-medium" style={{ color: '#8b1a1a', fontFamily: 'var(--font-journal)' }}>主要威胁</span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#6b3030', fontFamily: 'var(--font-journal)' }}>{species.threats}</p>
              </div>

              {/* Fun Fact - annotated note */}
              <div className="relative p-3" style={{
                background: species.category === 'forest'
                  ? 'rgba(180,150,40,0.08)'
                  : 'rgba(60,120,180,0.06)',
                border: species.category === 'forest'
                  ? '1px solid rgba(180,150,40,0.15)'
                  : '1px solid rgba(60,120,180,0.12)',
                borderRadius: '2px',
              }}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs">💡</span>
                  <span className="text-[11px] font-medium" style={{
                    color: species.category === 'forest' ? '#6b5a10' : '#2a5a7a',
                    fontFamily: 'var(--font-journal)',
                  }}>
                    趣味冷知识
                  </span>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#4a3828', fontFamily: 'var(--font-journal)' }}>{species.funFact}</p>
              </div>

              {/* Protection Level - ink progress bar */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px]" style={{ color: '#8b7355', fontFamily: 'var(--font-journal)' }}>保护等级</span>
                  <span className="text-[11px] font-medium" style={{ color: lc.ink, fontFamily: 'var(--font-journal)' }}>
                    {species.levelName}
                  </span>
                </div>
                <div className="h-2 overflow-hidden" style={{ background: 'rgba(139,109,60,0.1)', border: '1px solid rgba(139,109,60,0.15)' }}>
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: species.level === 'CR' ? '95%' : species.level === 'EN' ? '70%' : species.level === 'NT' ? '30%' : '45%',
                      background: `repeating-linear-gradient(135deg, ${lc.color}, ${lc.color} 2px, ${lc.ink} 2px, ${lc.ink} 4px)`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-[9px]" style={{ color: '#8b735588' }}>NT 近危</span>
                  <span className="text-[9px]" style={{ color: '#8b735588' }}>VU 易危</span>
                  <span className="text-[9px]" style={{ color: '#8b735588' }}>EN 濒危</span>
                  <span className="text-[9px]" style={{ color: '#8b735588' }}>CR 极危</span>
                </div>
              </div>

              {/* Catalog number - bottom annotation */}
              <div className="flex items-center justify-between pt-2" style={{ borderTop: '1px dashed rgba(139,109,60,0.2)' }}>
                <span className="text-[9px] italic" style={{ color: '#8b735566' }}>
                  No. {species.id.split('-').map(s => s[0]).join('').toUpperCase()}-{Math.abs(species.name.charCodeAt(0) * 7 + species.name.charCodeAt(1) * 3) % 1000}
                </span>
                <span className="text-[9px]" style={{ color: '#8b735566' }}>
                  {species.category === 'forest' ? '陆生记录' : '水生记录'}
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Main Image */}
              <div
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  aspectRatio: '16/9',
                  border: '2px solid rgba(255,255,255,0.8)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                  transform: 'rotate(0.3deg)',
                }}
                onClick={() => setFullscreenImage(species.imageUrl)}
              >
                <img
                  src={species.imageUrl}
                  alt={species.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: 'sepia(0.06) brightness(0.92) contrast(1.05)' }}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.2)' }}>
                  <span className="text-xs px-3 py-1 rounded" style={{ background: 'rgba(255,250,230,0.8)', color: '#5a4a2a', fontFamily: 'var(--font-journal)' }}>点击查看大图</span>
                </div>
                <div className="absolute bottom-2 left-2 px-2 py-0.5" style={{
                  background: 'rgba(245,230,200,0.85)',
                  border: '1px solid rgba(139,109,60,0.2)',
                }}>
                  <p className="text-[10px]" style={{ color: '#5a4a2a', fontFamily: 'var(--font-journal)' }}>{species.name} · 实拍影像</p>
                </div>
              </div>

              {/* Photo annotation card */}
              <div className="p-3" style={{
                background: 'rgba(139,109,60,0.06)',
                border: '1px solid rgba(139,109,60,0.12)',
                borderRadius: '2px',
              }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{species.emoji}</span>
                  <div>
                    <h3 className="text-sm font-medium" style={{ color: '#3d2b1a', fontFamily: 'var(--font-journal)' }}>{species.name}</h3>
                    <p className="text-[10px] italic" style={{ color: '#8b7355' }}>{species.latinName}</p>
                  </div>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: '#4a3828', fontFamily: 'var(--font-journal)' }}>{species.funFact}</p>
              </div>

              {/* Status stamps */}
              <div className="grid grid-cols-3 gap-2">
                <StampCard label="保护等级" value={species.levelName ?? species.level} ink={lc.color} />
                <StampCard label="CITES" value={(species.citesStatus ?? '').replace('CITES ', '')} ink="#5a4a2a" />
                <StampCard
                  label="类群"
                  value={species.category === 'forest' ? '陆生' : '水生'}
                  ink={species.category === 'forest' ? '#6b5a10' : '#2a5a7a'}
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
          <button
            className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
            style={{
              background: 'radial-gradient(circle at 40% 35%, #c0392b, #8b1a1a)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.15)',
              border: '1px solid rgba(139,20,20,0.5)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="rgba(255,220,200,0.8)" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          <div className="absolute top-5 left-5 flex items-center gap-3 px-3 py-2" style={{
            background: 'rgba(245,230,200,0.12)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(245,230,200,0.15)',
            borderRadius: '2px',
          }}>
            <span className="text-2xl">{species.emoji}</span>
            <div>
              <p className="text-sm font-medium" style={{ color: '#f5e6c8', fontFamily: 'var(--font-journal)' }}>{species.name}</p>
              <p className="text-[10px] italic" style={{ color: 'rgba(245,230,200,0.5)' }}>{species.latinName}</p>
            </div>
          </div>

          <img
            src={fullscreenImage}
            alt={species.name}
            className="max-w-[90vw] max-h-[85vh] object-contain"
            style={{
              borderRadius: '2px',
              border: '3px solid rgba(255,255,255,0.15)',
              boxShadow: species.category === 'forest'
                ? '0 0 80px rgba(232,200,64,0.08)'
                : '0 0 80px rgba(140,200,240,0.08)',
            }}
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2" style={{
            background: 'rgba(245,230,200,0.08)',
            border: '1px solid rgba(245,230,200,0.1)',
            borderRadius: '2px',
          }}>
            <span className="text-[11px]" style={{ color: 'rgba(245,230,200,0.4)', fontFamily: 'var(--font-journal)' }}>点击空白处关闭</span>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldNote({ label, value, icon }: { label: string; value?: string; icon: string }) {
  return (
    <div className="p-3" style={{
      background: 'rgba(139,109,60,0.06)',
      border: '1px solid rgba(139,109,60,0.12)',
      borderRadius: '2px',
    }}>
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-xs">{icon}</span>
        <span className="text-[10px]" style={{ color: '#8b7355', fontFamily: 'var(--font-journal)' }}>{label}</span>
      </div>
      <p className="text-xs font-medium" style={{ color: '#3d2b1a', fontFamily: 'var(--font-journal)' }}>{value}</p>
    </div>
  );
}

function StampCard({ label, value, ink }: { label: string; value: string; ink: string }) {
  return (
    <div className="p-2 text-center" style={{
      background: 'rgba(139,109,60,0.06)',
      border: `1px solid ${ink}22`,
      borderRadius: '2px',
    }}>
      <p className="text-[9px] mb-1" style={{ color: '#8b7355', fontFamily: 'var(--font-journal)' }}>{label}</p>
      <p className="text-xs font-medium" style={{ color: ink, fontFamily: 'var(--font-journal)' }}>{value}</p>
    </div>
  );
}
