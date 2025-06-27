import React, { useState } from "react";
import type { FavoriteItem } from "../types";
import { isValidateString } from "../utils";

type ItemFormProps = {
    onSubmit: (item: FavoriteItem) => void;
    initialValues?: FavoriteItem;
};

const ItemForm = ({ onSubmit, initialValues }: ItemFormProps) => {
    const [title, setTitle] = useState(initialValues?.title || "");
    const [category, setCategory] = useState(initialValues?.category || "");
    const [note, setNote] = useState(initialValues?.note || "");
    const [error, setError] = useState("");

    const resetForm = () => {
        setTitle("");
        setCategory("");
        setNote("");
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidateString(title) || !isValidateString(category)) {
            setError("タイトルとカテゴリは必須です");
            return;
        }
        setError("");
        onSubmit({ id: `uuID_install_later_${Math.random()}`, title, category, note });
        resetForm();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-medium">タイトル</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label className="block font-medium">カテゴリ</label>
                <input
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            <div>
                <label className="block font-medium">メモ（任意）</label>
                <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="border p-2 w-full"
                />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                保存
            </button>
        </form>
    );
};

export default ItemForm;
