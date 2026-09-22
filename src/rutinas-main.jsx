import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Rutinas from './Rutinas.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutinas />
  </StrictMode>,
)
