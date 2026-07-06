import { motion } from 'framer-motion'

import { footerContent } from '../data/content'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container">
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: '1.5rem' }}>
          이 페이지에서 배운 것
        </h2>

        <ul className="footer__summary">
          {footerContent.summary.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <nav className="footer__refs" aria-label="참고 자료">
          {footerContent.references.map((ref) => (
            <a key={ref.url} href={ref.url} target="_blank" rel="noopener noreferrer">
              {ref.label} ↗
            </a>
          ))}
        </nav>

        <p className="footer__credit">{footerContent.credit}</p>
      </div>
    </motion.footer>
  )
}
