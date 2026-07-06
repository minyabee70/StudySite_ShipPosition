import { useMemo } from 'react'
import { motion } from 'framer-motion'

import { introContent } from '../data/content'

const PARTICLE_COUNT = 40

function createParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    dx: `${(Math.random() - 0.5) * 200}px`,
    dy: `${(Math.random() - 0.5) * 200}px`,
    duration: `${15 + Math.random() * 20}s`,
    delay: `${Math.random() * 10}s`,
    size: `${2 + Math.random() * 3}px`,
  }))
}

export default function Intro() {
  const particles = useMemo(() => createParticles(), [])

  const scrollToEquipment = () => {
    document.getElementById('equipment')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="intro" id="intro" aria-label="인트로">
      <div className="intro__particles" aria-hidden="true">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              ['--dx' as string]: p.dx,
              ['--dy' as string]: p.dy,
              animationDuration: p.duration,
              animationDelay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="intro__content container">
        <motion.p
          className="intro__subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {introContent.subtitle}
        </motion.p>

        <motion.h1
          className="intro__hook"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {introContent.hook}
        </motion.h1>

        <motion.p
          className="intro__question"
          style={{ fontSize: 'var(--text-2xl)', fontWeight: 600 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {introContent.question}
        </motion.p>

        <motion.p
          className="caption"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          스크롤하여 선박 위치 수집의 원리를 탐험하세요
        </motion.p>
      </div>

      <button
        type="button"
        className="intro__scroll"
        onClick={scrollToEquipment}
        aria-label="다음 섹션으로 스크롤"
      >
        <span>탐험 시작</span>
        <svg className="intro__scroll-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </button>
    </section>
  )
}
