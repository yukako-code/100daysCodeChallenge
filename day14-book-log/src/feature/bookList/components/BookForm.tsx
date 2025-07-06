import React from 'react';
import type { Book } from '../types';
import { useBookFormHandler } from '../hooks';


type BookFormProps = {
    onSubmit: (book: Book) => void;
    updatingBook: Book | undefined;
}

export const BookForm: React.FC<BookFormProps> = ({ onSubmit, updatingBook }) => {
    const { book, handleChange, handleSubmit } = useBookFormHandler(updatingBook, onSubmit);

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit();
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        handleChange(name, value);
    }

    return (
        <form className="mb-4" onSubmit={submit}>
            <input type="text" placeholder="タイトル" className="input" name="title" value={book.title} onChange={onChange} />
            <input type="text" placeholder="著者名" className="input" name='author' value={book.author} onChange={onChange} />
            <select className="select" value={book.status} name='status' onChange={onChange}>
                <option value="unread">未読</option>
                <option value="reading">読書中</option>
                <option value="finished">読了</option>
            </select>
            <button type='submit' className="btn">保存</button>
        </form>
    );
};
