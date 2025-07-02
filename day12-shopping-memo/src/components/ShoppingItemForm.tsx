// components/ShoppingItemForm.tsx
import React, { useEffect, useState } from 'react';
import type { ShoppingItem } from '../type';


interface ShoppingItemFormProps {
    handleList: (item: ShoppingItem) => void
    updatingItem: ShoppingItem | undefined
}
const ShoppingItemForm = ({ handleList, updatingItem }: ShoppingItemFormProps) => {
    const [input, setInput] = useState<string>(() => updatingItem?.title ?? '');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setInput(value);

    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmedInput = input.trim();
        if (!trimmedInput) return;
        handleList({
            id: updatingItem ? updatingItem.id : `${Math.random()}`,
            title: input
        });
        setInput(''); //Reset
    }

    useEffect(() => {
        if (updatingItem) {
            setInput(updatingItem.title)
        }
    }, [updatingItem])
    return (
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
            <input
                type="text"
                className="border rounded px-2 py-1 flex-1"
                placeholder="買いたいもの"
                onChange={handleInput}
                value={input}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 rounded">
                追加
            </button>
        </form>
    );
};

export default React.memo(ShoppingItemForm);