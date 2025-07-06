import type { Book, BookReadStatusType } from '../types';
import type { Dispatch } from 'react';
import type { BookListActionType } from '../types';

export const useBookListActions = (dispatch: Dispatch<BookListActionType>) => {
    const handleSubmit = (book: Book, isEditing: boolean) => {
        if (isEditing) {
            dispatch({ type: 'UPDATE_BOOK_LIST', payload: book });
            dispatch({ type: 'EDIT_BOOK', payload: undefined });
        } else {
            dispatch({ type: 'ADD_BOOK', payload: book });
        }
    };

    const handleDelete = (id: Book['id']) => {
        dispatch({ type: 'DELETE_BOOK', payload: id });
    };

    const handleEdit = (book: Book) => {
        dispatch({ type: 'EDIT_BOOK', payload: book });
    };

    const handleSort = (value: 'title' | 'status') => {

        dispatch({ type: 'UPDATE_SORT', payload: value as 'title' | 'status' });
    }

    const handleFilter = (value: BookReadStatusType | 'all') => {
        dispatch({ type: 'UPDATE_FILTER', payload: value });
    }


    return { handleSubmit, handleDelete, handleEdit, handleSort, handleFilter };
};