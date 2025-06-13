import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Calendar from './components/Calendar';

const App = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const handlePrevMonth = () => {
    setMonth((prev) => {
      console.log(`前の月: ${prev}`);

      if (prev === 1) {
        setYear((prevYear) => {
          return prevYear - 1; // 前の年に戻る
        });
        return 12; // 前の年の12月
      }
      return prev - 1; // 前の月
    });
  };
  const handleNextMonth = () => {
    setMonth((prev) => {
      if (prev === 12) {
        setYear((prevYear) => {
          return prevYear + 1; // 次の年に進む

        });
        return 1; // 次の年の1月 
      }
      return prev + 1; // 次の月
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handlePrevMonth}
        >
          前の月
        </button>
        <button
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          onClick={handleNextMonth}
        >
          次の月
        </button>
      </div>
      <Calendar year={year} month={month} />
    </div>
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
