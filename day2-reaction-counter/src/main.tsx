import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ReactionCounter from './ReactionCounter'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactionCounter />
  </StrictMode>,
)
