import { useState } from 'react'
import { motion } from 'framer-motion'

import { techNetworkTiers } from '../data/content'
import type { TechNetworkTier } from '../data/content'

const scaleMarkers = [
  { km: 0, label: '0 km', tier: null },
  { km: 50, label: '50 km', tier: 'short' as const },
  { km: 5000, label: '5,000 km', tier: 'long' as const },
  { km: 36000, label: '위성권', tier: 'satellite' as const },
]

export default function TechNetworkClassification() {
  const [activeTier, setActiveTier] = useState<TechNetworkTier['id']>('short')

  return (
    <motion.section
      className="section section--alt"
      id="tech-network"
      aria-labelledby="tech-network-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section B</span>
          <h2 className="section__title" id="tech-network-title">
            거리 기반 통신망 분류
          </h2>
          <p className="section__desc">
            물리적 거리에 따라 선박 위치 데이터가 전달되는 방식이 달라집니다. 카드를 클릭해 각 망의 범위를 확인하세요.
          </p>
        </header>

        <div className="tech-tier-grid">
          {techNetworkTiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              className={`tech-tier-card card glow-hover ${activeTier === tier.id ? 'tech-tier-card--active' : ''}`}
              onClick={() => setActiveTier(tier.id)}
              aria-pressed={activeTier === tier.id}
            >
              <span className="tech-tier-card__badge">{tier.range}</span>
              <h3 className="tech-tier-card__title">{tier.tier}</h3>
              <div className="chip-row">
                {tier.equipment.map((eq) => (
                  <span key={eq} className="chip chip--cyan">{eq}</span>
                ))}
              </div>
              <p className="tech-tier-card__analogy">&ldquo;{tier.analogy}&rdquo;</p>
            </button>
          ))}
        </div>

        <motion.div
          key={activeTier}
          className="card tech-tier-detail"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {techNetworkTiers
            .filter((t) => t.id === activeTier)
            .map((tier) => (
              <div key={tier.id}>
                <h3>{tier.tier}</h3>
                <p style={{ margin: '0.75rem 0' }}>{tier.mechanism}</p>
                <p className="caption" style={{ marginBottom: '0.75rem' }}>
                  <strong>한계:</strong> {tier.limitations}
                </p>
                <p className="caption">
                  <strong>법적 연결:</strong> {tier.legalLink}
                </p>
              </div>
            ))}
        </motion.div>

        <div className="distance-scale" aria-label="통신 거리 스케일">
          <svg className="distance-scale__svg" viewBox="0 0 700 80">
            <line x1="40" y1="40" x2="660" y2="40" stroke="#ffffff20" strokeWidth="4" />
            {scaleMarkers.map((marker, i) => {
              const x = 40 + (i / (scaleMarkers.length - 1)) * 620
              const isActive = marker.tier === activeTier
              return (
                <g key={marker.label}>
                  <circle
                    cx={x}
                    cy={40}
                    r={isActive ? 10 : 6}
                    fill={isActive ? 'var(--accent-cyan)' : '#0a1628'}
                    stroke={isActive ? 'var(--accent-cyan)' : '#ffffff40'}
                    strokeWidth="2"
                    className={isActive ? 'distance-scale__dot--active' : ''}
                  />
                  <text x={x} y="68" textAnchor="middle" fill={isActive ? '#00e5ff' : '#5a7090'} fontSize="10">
                    {marker.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </motion.section>
  )
}
