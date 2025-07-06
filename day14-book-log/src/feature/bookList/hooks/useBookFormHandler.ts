import { useEffect, useState } from "react";
import { BookReadStatusType, type Book } from "../types"

const initialBook: Book = {
    id: '',
    title: '',
    author: '',
    status: BookReadStatusType.UNREAD
}
type UseBookFormHandlerReturnType = {
    book: Book;
    handleSubmit: () => void;
    handleChange: <K extends keyof Book>(name: K, value: Book[K]) => void;
}
export const useBookFormHandler = (updatingBook: Book | undefined, onSubmit: (book: Book, isEditing: boolean) => void): UseBookFormHandlerReturnType => {
    const [book, setBook] = useState<Book>(updatingBook ?? {
        ...initialBook,
        id: crypto.randomUUID()
    });

    const handleSubmit = () => {
        if (!book.title || !book.author) {
            alert('タイトル and 著者名 is mandatory!!! ');
            return;
        }
        onSubmit(book, !!updatingBook);
        setBook({
            id: crypto.randomUUID(),
            title: '',
            author: '',
            status: BookReadStatusType.UNREAD
        }) //reset
    }

    // handleChange(name, value) は柔軟だが、型安全性が低い
    const handleChange = <K extends keyof Book>(name: K, value: Book[K]) => {
        setBook(prev => ({ ...prev, [name]: value }));
    }

    useEffect(() => {
        if (updatingBook) {
            setBook(updatingBook)
        } else {
            setBook(initialBook)
        }
    }, [updatingBook])

    return {
        book,
        handleSubmit,
        handleChange
    }
}