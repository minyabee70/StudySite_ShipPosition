import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const savedScale = localStorage.getItem('maritime-guide-font-scale')
if (savedScale) {
  document.documentElement.style.setProperty('--font-scale', savedScale)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
