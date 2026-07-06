import { useState } from 'react'
import { motion } from 'framer-motion'

import { equipmentList, equipmentGroupLabels } from '../data/content'
import type { AttributeIcon, EquipmentNetworkGroup } from '../data/content'

const iconPaths: Record<AttributeIcon, string> = {
  purpose: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  direction: 'M5 12h14M12 5l7 7-7 7',
  cost: 'M12 2v20M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7',
  security: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  receiver: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z',
}

const equipmentIcons: Record<string, string> = {
  ais: 'M2 18h20M4 14l8-10 8 10H4z',
  vpass: 'M12 2v4M8 6h8M6 10h12v10H6z',
  vhf: 'M12 2a3 3 0 00-3 3v6a3 3 0 006 0V5a3 3 0 00-3-3z M8 14h8v6H8z',
  hf: 'M4 12h16M8 8c2 4 0 8 0 8M16 8c-2 4 0 8 0 8',
  satellite: 'M12 2a4 4 0 014 4v2h2v8h-4v2H10v-2H6V8h2V6a4 4 0 014-4z',
  lrit: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z M12 6v6l4 2',
  vms: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  ssas: 'M12 9v4M12 17h.01 M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z',
}

const filterGroups: (EquipmentNetworkGroup | 'all')[] = ['all', 'short', 'long', 'satellite', 'mandatory']

function AttributeIconSvg({ type }: { type: AttributeIcon }) {
  return (
    <svg className="attribute-list__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={iconPaths[type]} />
    </svg>
  )
}

function EquipmentIcon({ id }: { id: string }) {
  return (
    <svg className="flip-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={equipmentIcons[id] ?? equipmentIcons.ais} />
    </svg>
  )
}

export default function EquipmentCards() {
  const [flippedId, setFlippedId] = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState<EquipmentNetworkGroup | 'all'>('all')

  const filtered = activeFilter === 'all'
    ? equipmentList
    : equipmentList.filter((eq) => eq.networkGroup === activeFilter)

  const toggleFlip = (id: string) => {
    setFlippedId((prev) => (prev === id ? null : id))
  }

  return (
    <motion.section
      className="section section--alt"
      id="equipment"
      aria-labelledby="equipment-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section 1</span>
          <h2 className="section__title" id="equipment-title">
            선박 통신 장비 상세
          </h2>
          <p className="section__desc">
            근거리·원거리·위성·강제 관제망에 속하는 8종 장비를 카드로 살펴보세요. 필터로 분류별로 좁혀 볼 수 있습니다.
          </p>
        </header>

        <div className="equipment-filter" role="tablist" aria-label="장비 분류 필터">
          {filterGroups.map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={activeFilter === group}
              className={`btn ${activeFilter === group ? 'btn--active' : 'btn--outline'}`}
              onClick={() => setActiveFilter(group)}
            >
              {group === 'all' ? '전체' : equipmentGroupLabels[group]}
            </button>
          ))}
        </div>

        <div className="equipment-grid equipment-grid--wide">
          {filtered.map((eq, index) => (
            <motion.div
              key={eq.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div
                className={`flip-card glow-hover ${flippedId === eq.id ? 'flip-card--flipped' : ''}`}
                onClick={() => toggleFlip(eq.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleFlip(eq.id)
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`${eq.shortName} 카드 뒤집기`}
                aria-pressed={flippedId === eq.id}
              >
                <div className="flip-card__inner">
                  <div className="flip-card__face">
                    <span className="chip chip--cyan" style={{ alignSelf: 'flex-start', marginBottom: '0.5rem' }}>
                      {equipmentGroupLabels[eq.networkGroup]}
                    </span>
                    <EquipmentIcon id={eq.id} />
                    <p className="flip-card__analogy">&ldquo;{eq.analogy}&rdquo;</p>
                    <h3 className="flip-card__name">{eq.shortName}</h3>
                    <p className="caption" style={{ marginTop: '0.5rem' }}>클릭하여 상세 보기</p>
                  </div>

                  <div className="flip-card__face flip-card__face--back">
                    <h3 className="flip-card__name" style={{ marginBottom: '0.75rem' }}>{eq.name}</h3>
                    <p className="caption" style={{ marginBottom: '1rem' }}>{eq.description}</p>
                    <ul className="attribute-list">
                      {eq.attributes.map((attr) => (
                        <li key={attr.icon} className="attribute-list__item">
                          <AttributeIconSvg type={attr.icon} />
                          <span className="attribute-list__label">{attr.label}</span>
                          <span className="attribute-list__value">{attr.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
