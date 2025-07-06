import React, { useEffect, useState } from 'react';
import { BookReadStatusType, type Book } from '../types';

type BookFormProps = {
    onSubmit: (book: Book) => void;
    updatingBook: Book | undefined;
}

const initialBook: Book = {
    id: crypto.randomUUID(),
    title: '',
    author: '',
    status: BookReadStatusType.UNREAD
}

export const BookForm: React.FC<BookFormProps> = ({ onSubmit, updatingBook }) => {
    console.log('updatingBook', updatingBook);

    const [book, setBook] = useState<Book>(updatingBook ?? initialBook)
    // TODO: useStateでtitle, author, statusを管理し、フォーム送信時にonSubmitへ渡す
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!book.title || !book.author) {
            alert('タイトル and 著者名 is mandatory!!! ');
            return;
        }
        onSubmit(book);
        setBook({
            id: crypto.randomUUID(),
            title: '',
            author: '',
            status: BookReadStatusType.UNREAD
        })//reset
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setBook({
            ...book,
            [name]: value
        })
    }

    useEffect(() => {
        if (updatingBook) {
            setBook(updatingBook)
        } else {
            setBook(initialBook)
        }
    }, [updatingBook])

    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <input type="text" placeholder="タイトル" className="input" name="title" value={book.title} onChange={handleChange} />
            <input type="text" placeholder="著者名" className="input" name='author' value={book.author} onChange={handleChange} />
            <select className="select" value={book.status} name='status' onChange={handleChange}>
                <option value="unread">未読</option>
                <option value="reading">読書中</option>
                <option value="finished">読了</option>
            </select>
            <button type='submit' className="btn">保存</button>
        </form>
    );
};
