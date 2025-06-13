import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calendar from './components/Calendar';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <Calendar />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
