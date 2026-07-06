import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { compareRows } from '../data/content'

type Mode = 'ais' | 'satellite'

export default function CompareToggle() {
  const [mode, setMode] = useState<Mode>('ais')

  return (
    <motion.section
      className="section"
      id="compare"
      aria-labelledby="compare-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section 2</span>
          <h2 className="section__title" id="compare-title">
            AIS vs 위성 단말기: 핵심 비교
          </h2>
          <p className="section__desc">
            같은 위치 데이터라도 전송 방식에 따라 누가, 어떻게 받는지가 완전히 달라집니다.
          </p>
        </header>

        <div className="compare-toggle" role="tablist" aria-label="통신 방식 비교">
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'ais'}
            className={`btn ${mode === 'ais' ? 'btn--active' : 'btn--outline'}`}
            onClick={() => setMode('ais')}
          >
            AIS (공개 방송)
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === 'satellite'}
            className={`btn ${mode === 'satellite' ? 'btn--active' : 'btn--outline'}`}
            onClick={() => setMode('satellite')}
          >
            위성 단말기 (암호화)
          </button>
        </div>

        <div className="compare-diagram" aria-live="polite">
          <AnimatePresence mode="wait">
            {mode === 'ais' ? (
              <motion.svg
                key="ais"
                className="compare-diagram__svg"
                viewBox="0 0 700 400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <text x="350" y="30" textAnchor="middle" fill="#8ba3c7" fontSize="14">
                  VHF 전파가 사방으로 퍼져나갑니다
                </text>

                {/* Ship center */}
                <g transform="translate(350, 200)">
                  <circle r="20" fill="#0a1628" stroke="#00e5ff" strokeWidth="2" />
                  <text y="5" textAnchor="middle" fill="#00e5ff" fontSize="10">선박</text>
                  <circle className="pulse-ring" cx="0" cy="0" r="20" />
                  <circle className="pulse-ring" cx="0" cy="0" r="20" />
                  <circle className="pulse-ring" cx="0" cy="0" r="20" />
                </g>

                {/* Receivers - all bright */}
                <g className="receiver">
                  <circle cx="120" cy="100" r="16" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="120" y="104" textAnchor="middle" fill="#00ff88" fontSize="9">타 선박</text>
                </g>
                <g className="receiver">
                  <circle cx="580" cy="100" r="16" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="580" y="104" textAnchor="middle" fill="#00ff88" fontSize="9">위성</text>
                </g>
                <g className="receiver">
                  <circle cx="120" cy="300" r="16" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="120" y="304" textAnchor="middle" fill="#00ff88" fontSize="9">지상국</text>
                </g>
                <g className="receiver">
                  <circle cx="580" cy="300" r="16" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="580" y="304" textAnchor="middle" fill="#00ff88" fontSize="9">해안국</text>
                </g>

                <line x1="350" y1="200" x2="120" y2="100" stroke="#00e5ff40" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="350" y1="200" x2="580" y2="100" stroke="#00e5ff40" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="350" y1="200" x2="120" y2="300" stroke="#00e5ff40" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="350" y1="200" x2="580" y2="300" stroke="#00e5ff40" strokeWidth="1" strokeDasharray="4 4" />
              </motion.svg>
            ) : (
              <motion.svg
                key="satellite"
                className="compare-diagram__svg"
                viewBox="0 0 700 400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <text x="350" y="30" textAnchor="middle" fill="#8ba3c7" fontSize="14">
                  암호화된 점대점 채널만 활성화됩니다
                </text>

                {/* Dim receivers */}
                <g className="receiver receiver--dim">
                  <circle cx="120" cy="100" r="16" fill="#0a1628" stroke="#5a7090" strokeWidth="1" />
                  <text x="120" y="104" textAnchor="middle" fill="#5a7090" fontSize="9">타 선박</text>
                </g>
                <g className="receiver receiver--dim">
                  <circle cx="120" cy="300" r="16" fill="#0a1628" stroke="#5a7090" strokeWidth="1" />
                  <text x="120" y="304" textAnchor="middle" fill="#5a7090" fontSize="9">지상국</text>
                </g>
                <g className="receiver receiver--dim">
                  <circle cx="580" cy="300" r="16" fill="#0a1628" stroke="#5a7090" strokeWidth="1" />
                  <text x="580" y="304" textAnchor="middle" fill="#5a7090" fontSize="9">해안국</text>
                </g>

                {/* Active satellite */}
                <g className="receiver">
                  <circle cx="580" cy="100" r="20" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="580" y="104" textAnchor="middle" fill="#00ff88" fontSize="9">위성</text>
                </g>

                {/* Ship */}
                <g transform="translate(350, 200)">
                  <circle r="20" fill="#0a1628" stroke="#00e5ff" strokeWidth="2" />
                  <text y="5" textAnchor="middle" fill="#00e5ff" fontSize="10">선박</text>
                </g>

                {/* Encrypted line */}
                <line
                  className="signal-line"
                  x1="370"
                  y1="190"
                  x2="560"
                  y2="110"
                />

                {/* Gateway */}
                <g className="receiver">
                  <rect x="520" y="320" width="80" height="40" rx="6" fill="#0a1628" stroke="#00ff88" strokeWidth="2" />
                  <text x="560" y="345" textAnchor="middle" fill="#00ff88" fontSize="9">관제 센터</text>
                </g>
                <line
                  className="signal-line"
                  x1="580"
                  y1="120"
                  x2="560"
                  y2="320"
                  style={{ stroke: '#00ff8860' }}
                />
              </motion.svg>
            )}
          </AnimatePresence>
        </div>

        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th scope="col">비교 항목</th>
                <th scope="col">AIS</th>
                <th scope="col">위성 단말기</th>
              </tr>
            </thead>
            <tbody>
              {compareRows.map((row) => (
                <tr key={row.label}>
                  <td>{row.label}</td>
                  <td>{row.ais}</td>
                  <td>{row.satellite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  )
}
