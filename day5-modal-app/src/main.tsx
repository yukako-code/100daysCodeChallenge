import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Modal from './components/Modal.tsx'

// TODO: triggerButtonRef, closeButtonRef を定義して focus 制御を useEffect 内に追加
const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [message, setMessage] = useState("初期メッセージ");

  const openModal = () => {
    // TODO: モーダル開く
    setIsOpen(true);
  };

  const closeModal = () => {
    alert(message);
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
      <Modal isOpen={isOpen} onClose={closeModal} initialFocusRef={closeButtonRef}>
        <button onClick={() => setMessage("更新されたメッセージ")}>
          onCloseの内容を更新
        </button>
      </Modal>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
