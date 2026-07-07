import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const STORAGE_KEY = 'maritime-guide-simulation'

const SPEED_STEPS = [0.5, 0.75, 1, 1.5, 2] as const

type SimulationContextValue = {
  playing: boolean
  speed: number
  speedLabel: string
  togglePlay: () => void
  decreaseSpeed: () => void
  increaseSpeed: () => void
  canDecreaseSpeed: boolean
  canIncreaseSpeed: boolean
}

const SimulationContext = createContext<SimulationContextValue | null>(null)

function loadSaved(): { playing: boolean; speed: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { playing: true, speed: 1 }
    const parsed = JSON.parse(raw) as { playing?: boolean; speed?: number }
    const speed = SPEED_STEPS.includes(parsed.speed as (typeof SPEED_STEPS)[number])
      ? (parsed.speed as number)
      : 1
    return { playing: parsed.playing ?? true, speed }
  } catch {
    return { playing: true, speed: 1 }
  }
}

export function SimulationProvider({ children }: { children: ReactNode }) {
  const saved = loadSaved()
  const [playing, setPlaying] = useState(saved.playing)
  const [speed, setSpeed] = useState(saved.speed)

  const speedIndex = SPEED_STEPS.indexOf(speed as (typeof SPEED_STEPS)[number])
  const currentIndex = speedIndex === -1 ? 2 : speedIndex

  useEffect(() => {
    document.documentElement.classList.toggle('simulation-paused', !playing)
    document.documentElement.style.setProperty('--animation-speed', String(speed))
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ playing, speed }))
  }, [playing, speed])

  const togglePlay = () => setPlaying((prev) => !prev)
  const decreaseSpeed = () => {
    if (currentIndex > 0) setSpeed(SPEED_STEPS[currentIndex - 1])
  }
  const increaseSpeed = () => {
    if (currentIndex < SPEED_STEPS.length - 1) setSpeed(SPEED_STEPS[currentIndex + 1])
  }

  return (
    <SimulationContext.Provider
      value={{
        playing,
        speed,
        speedLabel: `${speed}x`,
        togglePlay,
        decreaseSpeed,
        increaseSpeed,
        canDecreaseSpeed: currentIndex > 0,
        canIncreaseSpeed: currentIndex < SPEED_STEPS.length - 1,
      }}
    >
      {children}
    </SimulationContext.Provider>
  )
}

export function useSimulation() {
  const ctx = useContext(SimulationContext)
  if (!ctx) throw new Error('useSimulation must be used within SimulationProvider')
  return ctx
}
