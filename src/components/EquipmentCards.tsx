import { useState } from 'react'
import { motion } from 'framer-motion'

import { equipmentList } from '../data/content'
import type { AttributeIcon } from '../data/content'

const iconPaths: Record<AttributeIcon, string> = {
  purpose: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  direction: 'M5 12h14M12 5l7 7-7 7',
  cost: 'M12 2v20M17 7H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7',
  security: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  receiver: 'M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 100-6 3 3 0 000 6z',
}

function AttributeIconSvg({ type }: { type: AttributeIcon }) {
  return (
    <svg className="attribute-list__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={iconPaths[type]} />
    </svg>
  )
}

function EquipmentIcon({ id }: { id: string }) {
  const paths: Record<string, string> = {
    ais: 'M2 18h20M4 14l8-10 8 10H4z',
    satellite: 'M12 2a4 4 0 014 4v2h2v8h-4v2H10v-2H6V8h2V6a4 4 0 014-4z',
    'vms-ssas': 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  }
  return (
    <svg className="flip-card__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d={paths[id] ?? paths.ais} />
    </svg>
  )
}

export default function EquipmentCards() {
  const [flippedId, setFlippedId] = useState<string | null>(null)

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
            선박의 통신 장비 종류
          </h2>
          <p className="section__desc">
            배에는 위치를 알리는 장비가 여러 종류 설치됩니다. 카드를 뒤집어 각 장비의 특성을 비교해 보세요.
          </p>
        </header>

        <div className="equipment-grid">
          {equipmentList.map((eq, index) => (
            <motion.div
              key={eq.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
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
                    <EquipmentIcon id={eq.id} />
                    <p className="flip-card__analogy">&ldquo;{eq.analogy}&rdquo;</p>
                    <h3 className="flip-card__name">{eq.shortName}</h3>
                    <p className="caption" style={{ marginTop: '0.5rem' }}>
                      클릭하여 상세 보기
                    </p>
                  </div>

                  <div className="flip-card__face flip-card__face--back">
                    <h3 className="flip-card__name" style={{ marginBottom: '0.75rem' }}>
                      {eq.name}
                    </h3>
                    <p className="caption" style={{ marginBottom: '1rem' }}>
                      {eq.description}
                    </p>
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
