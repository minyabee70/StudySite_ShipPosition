import { useState } from 'react'
import { motion } from 'framer-motion'

import {
  regulatoryPillars,
  shipCategories,
  legalStatuses,
  surveillanceMatrix,
} from '../data/content'

export default function RegulatoryFramework() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [openAccordion, setOpenAccordion] = useState<string | null>('fishing')

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id))
    setActiveCategory(id)
  }

  const filteredMatrix = activeCategory
    ? surveillanceMatrix.filter((row) => row.shipCategoryId === activeCategory)
    : surveillanceMatrix

  return (
    <motion.section
      className="section"
      id="regulatory"
      aria-labelledby="regulatory-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section A</span>
          <h2 className="section__title" id="regulatory-title">
            국가 관제의 두 가지 축
          </h2>
          <p className="section__desc">
            국가가 선박을 관제하는 방식은 &lsquo;어떤 법으로&rsquo;와 &lsquo;어떤 기술로&rsquo;라는 두 축으로 이해할 수 있습니다.
          </p>
        </header>

        <div className="pillar-diagram" aria-hidden="true">
          <svg className="pillar-diagram__svg" viewBox="0 0 700 220">
            <rect x="80" y="20" width="220" height="120" rx="8" fill="#0a1628" stroke="#00e5ff" strokeWidth="1.5" />
            <text x="190" y="55" textAnchor="middle" fill="#00e5ff" className="diagram-text diagram-text--lg diagram-text--bold">법적 근거</text>
            <text x="190" y="75" textAnchor="middle" fill="#8ba3c7" className="diagram-text diagram-text--sm">관제 대상</text>
            <text x="190" y="95" textAnchor="middle" fill="#5a7090" className="diagram-text diagram-text--xs">선박종류·법적지위·국제/국가 요구</text>

            <rect x="400" y="20" width="220" height="120" rx="8" fill="#0a1628" stroke="#00ff88" strokeWidth="1.5" />
            <text x="510" y="55" textAnchor="middle" fill="#00ff88" className="diagram-text diagram-text--lg diagram-text--bold">기술적 구현</text>
            <text x="510" y="75" textAnchor="middle" fill="#8ba3c7" className="diagram-text diagram-text--sm">전송 경로</text>
            <text x="510" y="95" textAnchor="middle" fill="#5a7090" className="diagram-text diagram-text--xs">기지국→운영국 / 위성→지상국</text>

            <line x1="190" y1="140" x2="350" y2="185" stroke="#ffffff30" strokeWidth="1.5" />
            <line x1="510" y1="140" x2="350" y2="185" stroke="#ffffff30" strokeWidth="1.5" />

            <rect x="250" y="175" width="200" height="40" rx="8" fill="#00e5ff20" stroke="#00e5ff" strokeWidth="1.5" />
            <text x="350" y="200" textAnchor="middle" fill="#00e5ff" className="diagram-text diagram-text--md diagram-text--bold">국가 관제 서버</text>
          </svg>
        </div>

        <div className="pillar-cards">
          {regulatoryPillars.map((pillar) => (
            <article key={pillar.id} className="card pillar-card">
              <h3 className="pillar-card__title">{pillar.title}</h3>
              <p className="caption" style={{ marginBottom: '1rem' }}>{pillar.description}</p>
              <ul className="pillar-card__list">
                {pillar.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <h3 className="subsection-title">선박 종류별 관제 요건</h3>
        <p className="caption subsection-desc">아코디언을 열어 각 선박 종류의 의무 장비를 확인하고, 하단 매트릭스에서 하이라이트를 확인하세요.</p>

        <div className="accordion">
          {shipCategories.map((cat) => (
            <div key={cat.id} className="accordion__item">
              <button
                type="button"
                className={`accordion__trigger ${openAccordion === cat.id ? 'accordion__trigger--open' : ''}`}
                onClick={() => toggleAccordion(cat.id)}
                aria-expanded={openAccordion === cat.id}
              >
                <span>{cat.name}</span>
                <span className="accordion__icon" aria-hidden="true">{openAccordion === cat.id ? '−' : '+'}</span>
              </button>
              {openAccordion === cat.id && (
                <motion.div
                  className="accordion__panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="caption" style={{ marginBottom: '0.75rem' }}>
                    <strong>예시:</strong> {cat.examples}
                  </p>
                  <p style={{ marginBottom: '0.75rem' }}>{cat.surveillanceNotes}</p>
                  <div className="chip-row">
                    {cat.mandatorySystems.map((sys) => (
                      <span key={sys} className="chip chip--cyan">{sys}</span>
                    ))}
                  </div>
                  <p className="caption" style={{ marginTop: '0.75rem' }}>
                    관할: {cat.regulatingBodies.join(', ')} | 근거: {cat.keyLaws.join(', ')}
                  </p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <h3 className="subsection-title">법적 지위와 관할 국가</h3>
        <div className="legal-status-grid">
          {legalStatuses.map((status, index) => (
            <motion.article
              key={status.id}
              className="card legal-status-card glow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <h4 className="legal-status-card__name">{status.name}</h4>
              <p className="legal-status-card__analogy">&ldquo;{status.analogy}&rdquo;</p>
              <p className="caption" style={{ marginBottom: '1rem' }}>{status.definition}</p>
              <dl className="role-list">
                <div><dt>기국(Flag)</dt><dd>{status.flagStateRole}</dd></div>
                <div><dt>연안국(Coastal)</dt><dd>{status.coastalStateRole}</dd></div>
                <div><dt>항만국(Port)</dt><dd>{status.portStateRole}</dd></div>
              </dl>
            </motion.article>
          ))}
        </div>

        <h3 className="subsection-title">교차 매트릭스: 선박 × 의무 장비</h3>
        <div className="matrix-filter">
          <button
            type="button"
            className={`btn btn--outline ${activeCategory === null ? 'btn--active' : ''}`}
            onClick={() => setActiveCategory(null)}
          >
            전체
          </button>
          {shipCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`btn btn--outline ${activeCategory === cat.id ? 'btn--active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="matrix-table-wrap">
          <table className="matrix-table">
            <thead>
              <tr>
                <th scope="col">선박 유형</th>
                <th scope="col">법적 지위</th>
                <th scope="col">의무 장비</th>
                <th scope="col">선택 장비</th>
                <th scope="col">관할 기관</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatrix.map((row) => (
                <tr
                  key={`${row.shipCategoryId}-${row.shipCategory}`}
                  className={activeCategory === row.shipCategoryId ? 'matrix-table__row--active' : ''}
                >
                  <td>{row.shipCategory}</td>
                  <td>{row.legalStatus}</td>
                  <td>
                    {row.mandatorySystems.map((s) => (
                      <span key={s} className="chip chip--green">{s}</span>
                    ))}
                  </td>
                  <td>
                    {row.optionalSystems.map((s) => (
                      <span key={s} className="chip">{s}</span>
                    ))}
                  </td>
                  <td>{row.regulatingAuthority}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  )
}
