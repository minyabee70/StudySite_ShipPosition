import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import {
  darkVesselTimeline,
  caseStudies,
  regulatorySystems,
  surveillanceConclusion,
} from '../data/content'

export default function DarkVessel() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const progressHeight = useTransform(scrollYProgress, [0.1, 0.8], ['0%', '100%'])

  return (
    <motion.section
      ref={sectionRef}
      className="section"
      id="dark-vessel"
      aria-labelledby="dark-vessel-title"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <header className="section__header">
          <span className="section__label">Section 4</span>
          <h2 className="section__title" id="dark-vessel-title">
            숨은 배를 찾아라 (Dark Vessel)
          </h2>
          <p className="section__desc">
            AIS를 강제로 끈 불법 선박은 어떻게 찾을까요? 스크롤하며 다중 센서 탐지 과정을 따라가 보세요.
          </p>
        </header>

        <div className="timeline" style={{ position: 'relative' }}>
          <motion.div
            style={{
              position: 'absolute',
              left: '0.5rem',
              top: 0,
              width: '2px',
              height: progressHeight,
              background: 'var(--accent-cyan)',
              transformOrigin: 'top',
              zIndex: 1,
            }}
            aria-hidden="true"
          />

          {darkVesselTimeline.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        <div className="case-studies">
          {caseStudies.map((study) => (
            <motion.article
              key={study.title}
              className="card case-study glow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="case-study__title">{study.title}</h3>
              <p style={{ marginBottom: '0.75rem' }}>{study.context}</p>
              <p className="caption">{study.outcome}</p>
            </motion.article>
          ))}
        </div>

        <hr className="regulatory-divider" />

        <header className="section__header">
          <span className="section__label">Section 5</span>
          <h2 className="section__title">국가별 의무 장비 제도</h2>
          <p className="section__desc">
            VMS와 SSAS는 선박이 원하지 않아도 국가가 위치를 수집할 수 있는 구조입니다.
          </p>
        </header>

        <div className="regulatory-grid">
          {regulatorySystems.map((sys, index) => (
            <motion.article
              key={sys.id}
              className="card glow-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>
                {sys.name}{' '}
                <span className="caption" style={{ display: 'block', marginTop: '0.25rem' }}>
                  {sys.fullName}
                </span>
              </h3>
              <p className="regulatory-card__analogy">&ldquo;{sys.analogy}&rdquo;</p>
              <p className="caption">{sys.description}</p>
              <ul className="regulatory-features">
                {sys.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

        <div className="surveillance-diagram">
          <h3 style={{ marginBottom: '1.5rem' }}>{surveillanceConclusion.title}</h3>

          <svg className="surveillance-diagram__svg" viewBox="0 0 400 200" aria-hidden="true">
            <circle cx="160" cy="100" r="70" fill="#00e5ff15" stroke="#00e5ff" strokeWidth="2" opacity="0.8" />
            <text x="160" y="105" textAnchor="middle" fill="#00e5ff" fontSize="12" fontWeight="600">AIS</text>

            <circle cx="240" cy="100" r="70" fill="#00ff8815" stroke="#00ff88" strokeWidth="2" opacity="0.8" />
            <text x="240" y="105" textAnchor="middle" fill="#00ff88" fontSize="12" fontWeight="600">위성</text>

            <circle cx="200" cy="130" r="70" fill="#ff6b6b15" stroke="#ff6b6b" strokeWidth="2" opacity="0.8" />
            <text x="200" y="135" textAnchor="middle" fill="#ff6b6b" fontSize="11" fontWeight="600">VMS/SSAS</text>
          </svg>

          <div className="surveillance-layers">
            {surveillanceConclusion.layers.map((layer) => (
              <span
                key={layer.label}
                className={`surveillance-layer surveillance-layer--${
                  layer.type === '공개' ? 'public' : layer.type === '비공개' ? 'private' : 'mandatory'
                }`}
              >
                {layer.label} ({layer.type})
              </span>
            ))}
          </div>

          <p style={{ maxWidth: '600px', margin: '0 auto' }}>{surveillanceConclusion.summary}</p>
        </div>
      </div>
    </motion.section>
  )
}

type TimelineItemProps = {
  item: (typeof darkVesselTimeline)[number]
  index: number
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress']
}

function TimelineItem({ item, index, scrollYProgress }: TimelineItemProps) {
  const threshold = 0.15 + index * 0.15
  const isActive = useTransform(scrollYProgress, (v) => v >= threshold)

  return (
    <motion.div
      className="timeline__item"
      style={{ opacity: useTransform(isActive, (active) => (active ? 1 : 0.4)) }}
    >
      <motion.span
        className="timeline__dot"
        style={{
          borderColor: useTransform(isActive, (active) => (active ? 'var(--accent-cyan)' : 'var(--border-subtle)')),
          background: useTransform(isActive, (active) => (active ? 'var(--accent-cyan)' : 'var(--bg-deep)')),
        }}
        aria-hidden="true"
      />
      <h3 className="timeline__title">{item.title}</h3>
      <p>{item.description}</p>
    </motion.div>
  )
}
