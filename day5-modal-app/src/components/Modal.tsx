import { useEffect } from 'react';
import { createPortal } from 'react-dom';
type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    initialFocusRef: React.RefObject<HTMLButtonElement | null>
};

//TODO: Escキー押下で onClose() を発火させる useEffect を追加する
//TODO: createPortal を使ってモーダル内容を document.body に描画するようにする
const Modal = ({ isOpen, onClose, children, initialFocusRef }: ModalProps) => {

    useEffect(() => {
        const onESCClick = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose(); // 最新の関数がここにくる
            }
        };
        document.addEventListener("keydown", onESCClick);
        return () => document.removeEventListener("keydown", onESCClick);
    }, [onClose]);


    if (!isOpen) return null;

    return createPortal(
        <div role="dialog"
            aria-modal="true" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div
                className="bg-white p-6 rounded-lg shadow-lg"
                onClick={(e) => e.stopPropagation()}
            >
                {/* TODO: コンテンツ部分 */}
                {children}
                <button ref={initialFocusRef} onClick={onClose} className="mt-4 text-sm text-gray-500">閉じる</button>
            </div>
        </div>
        , document.body);
};

export default Modal;
