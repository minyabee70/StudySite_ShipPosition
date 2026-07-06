import { useState } from 'react'
import { motion } from 'framer-motion'

import { policyTiers, multiClassificationExample } from '../data/content'
import type { PolicyTier } from '../data/content'

const badgeClass: Record<PolicyTier['id'], string> = {
  public: 'policy-badge--public',
  private: 'policy-badge--private',
  mandatory: 'policy-badge--mandatory',
}

export default function PolicyClassification() {
  const [selected, setSelected] = useState<PolicyTier['id']>('public')
  const active = policyTiers.find((t) => t.id === selected)!

  return (
    <motion.section
      className="section"
      id="policy-class"
      aria-labelledby="policy-class-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section C</span>
          <h2 className="section__title" id="policy-class-title">
            운영 목적 기반 분류
          </h2>
          <p className="section__desc">
            같은 위치 데이터라도 &lsquo;누가, 왜, 어떤 법으로&rsquo; 수집하느냐에 따라 세 가지 성격으로 나뉩니다.
          </p>
        </header>

        <div className="policy-layout">
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr>
                  <th scope="col">분류</th>
                  <th scope="col">주요 장비</th>
                  <th scope="col">핵심 성격</th>
                  <th scope="col">목적</th>
                </tr>
              </thead>
              <tbody>
                {policyTiers.map((tier) => (
                  <tr
                    key={tier.id}
                    className={`policy-table__row ${selected === tier.id ? 'policy-table__row--active' : ''}`}
                    onClick={() => setSelected(tier.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setSelected(tier.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected === tier.id}
                  >
                    <td>
                      <span className={`policy-badge ${badgeClass[tier.id]}`}>{tier.tier}</span>
                    </td>
                    <td>{tier.equipment.join(', ')}</td>
                    <td>{tier.nature}</td>
                    <td>{tier.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div
            key={selected}
            className="card policy-detail-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <span className={`policy-badge ${badgeClass[active.id]}`}>{active.tier}</span>
            <h3 style={{ margin: '1rem 0 0.5rem' }}>{active.equipment.join(' · ')}</h3>
            <dl className="policy-detail-list">
              <div><dt>법적 근거</dt><dd>{active.legalBasis}</dd></div>
              <div><dt>수신자</dt><dd>{active.receivers}</dd></div>
              <div><dt>실제 사례</dt><dd>{active.caseExample}</dd></div>
            </dl>
          </motion.div>
        </div>

        <div className="card multi-class-example">
          <h3>{multiClassificationExample.title}</h3>
          <p className="caption" style={{ margin: '0.5rem 0 1rem' }}>
            <strong>예시 선박:</strong> {multiClassificationExample.ship}
          </p>
          <div className="chip-row" style={{ marginBottom: '1rem' }}>
            {multiClassificationExample.systems.map((sys) => (
              <span key={sys} className="chip chip--green">{sys}</span>
            ))}
          </div>
          <p>{multiClassificationExample.explanation}</p>
        </div>
      </div>
    </motion.section>
  )
}
