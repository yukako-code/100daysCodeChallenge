import { useEffect, useReducer } from "react";
import type { Book, BookListState } from "../types"
import { bookListReducers } from "../reducers/bookListReducers";
import { bookListInit } from "../utilities";

type UseBookListReturnType = BookListState & {
    handleSubmit: (book: Book) => void;
    handleDelete: (id: Book['id']) => void;
    handleEdit: (book: Book) => void;
}

export const useBookList = (): UseBookListReturnType => {
    const [state, dispatch] = useReducer(bookListReducers, undefined, bookListInit);

    const handleSubmit = (book: Book) => {
        if (state.updatingBook) {
            dispatch({ type: 'UPDATE_BOOK_LIST', payload: book });
            dispatch({ type: 'EDIT_BOOK', payload: undefined });
        } else {
            dispatch({ type: 'ADD_BOOK', payload: book });
        }
    }

    const handleDelete = (id: Book['id']) => {
        dispatch({ type: 'DELETE_BOOK', payload: id })
    }

    const handleEdit = (book: Book) => {
        dispatch({ type: 'EDIT_BOOK', payload: book })
    }

    useEffect(() => {
        localStorage.setItem("bookList", JSON.stringify(state.bookList));
    }, [state.bookList]);
    return {
        bookList: state.bookList,
        updatingBook: state.updatingBook,
        handleSubmit,
        handleDelete,
        handleEdit

    }
}