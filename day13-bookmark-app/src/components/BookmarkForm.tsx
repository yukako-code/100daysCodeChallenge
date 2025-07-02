import React, { useEffect, useState, type FormEvent } from 'react';
import type { Bookmark } from '../types/bookmarks';


type BookmarkFormProps = {
    onSubmit: (bookmark: Bookmark) => void;
    updatingBookmark: Bookmark | undefined;
};

const BookmarkForm: React.FC<BookmarkFormProps> = ({ onSubmit, updatingBookmark }) => {
    const [form, setForm] = useState<Partial<Bookmark>>({}); // id をまだ持たない状態でもOK

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!form.title?.trim() || !form.url?.trim()) {
            alert('タイトルとURLは必須項目です');
            return;
        }
        onSubmit({
            ...form,
            id: form.id ?? crypto.randomUUID(), // idが無ければ新規生成
        } as Bookmark);
        setForm({});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (updatingBookmark) {
            setForm(updatingBookmark);
        } else {
            setForm({});
        }
    }, [updatingBookmark]);
    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <input name='title' type="text" placeholder="タイトル" className="w-full p-2 border rounded" onChange={handleChange} value={form?.title ?? ''} />
            <input name='url' type="url" placeholder="URL" className="w-full p-2 border rounded" onChange={handleChange} value={form?.url ?? ''} />
            <textarea name="description" placeholder="メモ（任意）" className="w-full p-2 border rounded" onChange={handleChange} value={form?.description ?? ''} />
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                {updatingBookmark ? '更新' : '追加'}
            </button>
        </form>
    );
};

export default BookmarkForm;
