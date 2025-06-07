import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TabSwitcher from './TabSwitcher'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TabSwitcher />
  </StrictMode>,
)
