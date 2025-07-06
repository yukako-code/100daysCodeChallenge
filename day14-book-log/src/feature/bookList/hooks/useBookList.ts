import { useEffect, useMemo, useReducer } from "react";
import type { Book, BookListState, BookReadStatusType } from "../types"
import { bookListReducers } from "../reducers/bookListReducers";
import { bookListInit } from "../utilities";


type UseBookListReturnType = BookListState & {
    handleSubmit: (book: Book) => void;
    handleDelete: (id: Book['id']) => void;
    handleEdit: (book: Book) => void;
    filteredAndSortedBookList: Array<Book>;
    handleSortAndFilter: (type: string, value: string) => void
}

export const useBookList = (): UseBookListReturnType => {
    const [state, dispatch] = useReducer(bookListReducers, undefined, bookListInit);
    const filteredAndSortedBookList = useMemo(() => {
        const { bookList, filter, sort } = state;
        let displayBookList = bookList;
        if (filter !== 'all') {
            displayBookList = displayBookList.filter((book) => book.status === filter);
        }
        return displayBookList.sort((a, b) => {
            if (sort === 'title') {
                return a.title.localeCompare(b.title)
            } else {
                return a.status.localeCompare(b.status)
            }
        })
    }, [state])

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

    const handleSortAndFilter = (type: string, value: string) => {
        if (type === 'filter') {
            dispatch({ type: 'UPDATE_FILTER', payload: value as BookReadStatusType | "all" });
        } else {
            dispatch({ type: 'UPDATE_SORT', payload: value as "title" | "status" })
        }
    }

    useEffect(() => {
        localStorage.setItem("bookList", JSON.stringify(state.bookList));
    }, [state.bookList]);

    return {
        bookList: state.bookList,
        updatingBook: state.updatingBook,
        handleSubmit,
        handleDelete,
        handleEdit,
        filteredAndSortedBookList,
        handleSortAndFilter,
        filter: state.filter,
        sort: state.sort
    }
}