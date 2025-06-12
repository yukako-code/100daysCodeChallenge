import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import RadioGroup from './components/RadioGroup';
import { radioGroupOptions } from './constants/options';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RadioGroup options={radioGroupOptions} />
  </StrictMode>,
)
