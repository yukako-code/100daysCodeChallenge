import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Modal from './components/Modal.tsx'

// TODO: triggerButtonRef, closeButtonRef を定義して focus 制御を useEffect 内に追加
const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const openModal = () => {
    // TODO: モーダル開く
    setIsOpen(true);
  };

  const closeModal = () => {
    // TODO: モーダル閉じる
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else {
      triggerButtonRef.current?.focus();
    }
  }, [isOpen]);

  return (
    <div className="p-4">
      <button ref={triggerButtonRef} onClick={openModal} className="bg-blue-500 text-white px-4 py-2 rounded">
        モーダルを開く
      </button>
      <Modal isOpen={isOpen} onClose={closeModal} closeButtonRef={closeButtonRef}>
        <p>ここにモーダルの内容が入ります。</p>
      </Modal>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
