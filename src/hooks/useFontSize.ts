import { useEffect, useState } from 'react'

const STORAGE_KEY = 'maritime-guide-font-scale'
const MIN_SCALE = 0.85
const MAX_SCALE = 1.35
const STEP = 0.1
const DEFAULT_SCALE = 1

function clampScale(value: number) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, Number(value.toFixed(2))))
}

function applyScale(scale: number) {
  document.documentElement.style.setProperty('--font-scale', String(scale))
}

export function useFontSize() {
  const [scale, setScale] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsed = saved ? Number.parseFloat(saved) : DEFAULT_SCALE
    return Number.isFinite(parsed) ? clampScale(parsed) : DEFAULT_SCALE
  })

  useEffect(() => {
    applyScale(scale)
    localStorage.setItem(STORAGE_KEY, String(scale))
  }, [scale])

  const increase = () => setScale((prev) => clampScale(prev + STEP))
  const decrease = () => setScale((prev) => clampScale(prev - STEP))
  const reset = () => setScale(DEFAULT_SCALE)

  const percent = Math.round(scale * 100)

  return { scale, percent, increase, decrease, reset, canIncrease: scale < MAX_SCALE, canDecrease: scale > MIN_SCALE }
}
