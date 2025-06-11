import { useEffect } from 'react';
import { createPortal } from 'react-dom';
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    closeButtonRef: React.RefObject<HTMLButtonElement>;
};

//TODO: Escキー押下で onClose() を発火させる useEffect を追加する
//TODO: createPortal を使ってモーダル内容を document.body に描画するようにする
const Modal = ({ isOpen, onClose, children, closeButtonRef }: ModalProps) => {

    const onESCClick = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            onClose();
        }
    }
    useEffect(() => {
        document.addEventListener("keydown", onESCClick, false);
    }, [])

    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* TODO: コンテンツ部分 */}
                {children}
                <button ref={closeButtonRef} onClick={onClose} className="mt-4 text-sm text-gray-500">閉じる</button>
            </div>
        </div>
        , document.body);
};

export default Modal;
