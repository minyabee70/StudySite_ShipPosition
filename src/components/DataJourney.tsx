import { useState } from 'react'
import { motion } from 'framer-motion'

import { journeySteps } from '../data/content'

const nodes = [
  { id: 'ship', label: '선박', cx: 60, cy: 140 },
  { id: 'satellite', label: '위성', cx: 200, cy: 60 },
  { id: 'gateway', label: '지상국', cx: 340, cy: 140 },
  { id: 'server', label: '관제 서버', cx: 480, cy: 140 },
]

const links = [
  { from: 'ship', to: 'satellite', steps: [1, 2] },
  { from: 'satellite', to: 'gateway', steps: [2, 3] },
  { from: 'gateway', to: 'server', steps: [3, 4] },
]

function getNode(id: string) {
  return nodes.find((n) => n.id === id)!
}

export default function DataJourney() {
  const [activeStep, setActiveStep] = useState(1)
  const step = journeySteps.find((s) => s.id === activeStep)!

  const isLinkActive = (steps: number[]) => steps.includes(activeStep)

  const isNodeActive = (nodeId: string) => {
    if (activeStep === 1 && nodeId === 'ship') return true
    if (activeStep === 2 && nodeId === 'satellite') return true
    if (activeStep === 3 && nodeId === 'gateway') return true
    if (activeStep === 4 && nodeId === 'server') return true
    return false
  }

  return (
    <motion.section
      className="section section--alt"
      id="journey"
      aria-labelledby="journey-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section 3</span>
          <h2 className="section__title" id="journey-title">
            데이터 수집 과정
          </h2>
          <p className="section__desc">
            데이터는 어떤 여정을 거쳐 관제 센터에 도달할까요? 각 단계를 클릭해 신호 흐름을 따라가 보세요.
          </p>
        </header>

        <div className="journey-steps" role="tablist" aria-label="데이터 수집 단계">
          {journeySteps.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={activeStep === s.id}
              className={`journey-step-btn ${activeStep === s.id ? 'journey-step-btn--active' : ''}`}
              onClick={() => setActiveStep(s.id)}
            >
              {s.id}단계: {s.title}
            </button>
          ))}
        </div>

        <div className="journey-layout">
          <div className="journey-diagram" aria-hidden="true">
            <svg className="journey-diagram__svg" viewBox="0 0 540 200">
              {links.map((link) => {
                const from = getNode(link.from)
                const to = getNode(link.to)
                return (
                  <line
                    key={`${link.from}-${link.to}`}
                    className={`journey-link ${isLinkActive(link.steps) ? 'journey-link--active' : ''}`}
                    x1={from.cx}
                    y1={from.cy}
                    x2={to.cx}
                    y2={to.cy}
                  />
                )
              })}

              {nodes.map((node) => (
                <g
                  key={node.id}
                  className={`journey-node ${isNodeActive(node.id) ? 'journey-node--active' : ''}`}
                >
                  <circle cx={node.cx} cy={node.cy} r="28" />
                  <text x={node.cx} y={node.cy + 4} textAnchor="middle">
                    {node.label}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <motion.div
            key={activeStep}
            className="card journey-panel"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="journey-panel__title">
              [{activeStep}단계] {step.title}
            </h3>
            <p className="journey-panel__subtitle">{step.subtitle}</p>
            <p>{step.description}</p>
            {step.detail && <div className="journey-detail">{step.detail}</div>}

            {activeStep === 4 && (
              <div className="mini-map" aria-label="관제 화면 시뮬레이션">
                <span className="mini-map__dot" style={{ left: '20%', top: '30%', animationDuration: '8s' }} />
                <span className="mini-map__dot" style={{ left: '50%', top: '50%', animationDuration: '12s', animationDelay: '2s' }} />
                <span className="mini-map__dot" style={{ left: '70%', top: '25%', animationDuration: '10s', animationDelay: '4s' }} />
                <span className="mini-map__label">실시간 관제 대시보드 (시뮬레이션)</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
