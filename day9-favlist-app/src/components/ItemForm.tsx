import { useEffect, useState } from 'react';
import type { FavoriteItem } from '../types';
import { v4 as uuidv4 } from 'uuid';

type Props = {
    onSubmit: (item: FavoriteItem) => void;
    updatingItem?: FavoriteItem | null;
};

const initialForm: FavoriteItem = {
    title: '',
    category: '',
    note: '',
    id: '',
}
export const ItemForm = ({ onSubmit, updatingItem }: Props) => {
    const [item, setItem] = useState<FavoriteItem>(updatingItem ?? initialForm);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const name = e.target.name;
        setItem({
            ...item,
            [name]: e.target.value,
        })

    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!item.title || !item.category) {
            alert('タイトルとカテゴリは必須です。');
            return;
        }
        if (updatingItem) {
            onSubmit({
                ...item,
                id: updatingItem.id, // 更新時は既存のIDを使用
            })
        } else {
            onSubmit({
                ...item,
                id: uuidv4(), // 新しいIDを生成
            });
        }
        setItem(initialForm); // フォームをリセット
    };

    useEffect(() => {
        if (updatingItem) {
            setItem(updatingItem);
        }
    }, [updatingItem])
    return (
        <form className="space-y-4 mb-4" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    タイトル
                </label>
                <input
                    type="text"
                    name="title"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="例：千と千尋の神隠し"
                    value={item.title}
                    onChange={handleChange}
                />
            </div>

            {/* カテゴリ入力 */}
            <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    カテゴリ
                </label>
                <input
                    type="text"
                    name="category"
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="例：映画 / 本 / カフェ"
                    value={item.category}
                    onChange={handleChange}
                />
            </div>

            {/* 備考入力（任意） */}
            <div>
                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                    備考（任意）
                </label>
                <textarea
                    id="note"
                    name="note"
                    rows={3}
                    className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="メモや感想などを記入..."
                    value={item.note}
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                {updatingItem ? '更新' : '追加'}
            </button>
        </form>

    );
};
