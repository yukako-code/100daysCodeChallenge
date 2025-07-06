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
    handleChange: (name: string, value: string | BookReadStatusType) => void;
}
export const useBookFormHandler = (updatingBook: Book | undefined, onSubmit: (book: Book) => void): UseBookFormHandlerReturnType => {
    const [book, setBook] = useState<Book>(updatingBook ?? initialBook);

    const handleSubmit = () => {
        if (!book.title || !book.author) {
            alert('タイトル and 著者名 is mandatory!!! ');
            return;
        }
        onSubmit({
            ...book,
            id: crypto.randomUUID()
        });
        setBook({
            id: '',
            title: '',
            author: '',
            status: BookReadStatusType.UNREAD
        }) //reset
    }

    const handleChange = (name: string, value: string | BookReadStatusType) => {
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

    return {
        book,
        handleSubmit,
        handleChange
    }
}