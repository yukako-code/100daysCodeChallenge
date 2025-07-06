import type { BookListActionType, BookListState } from "../types";


export const bookListReducers = (state: BookListState, action: BookListActionType) => {
    switch (action.type) {
        case 'ADD_BOOK':
            return {
                ...state,
                bookList: [
                    ...state.bookList,
                    action.payload
                ]
            }
        case 'EDIT_BOOK':
            return {
                ...state,
                updatingBook: action.payload
            }
        case 'DELETE_BOOK':
            return {
                ...state,
                bookList: state.bookList.filter((book) => book.id !== action.payload)
            }
        case 'UPDATE_BOOK_LIST':
            return {
                ...state,
                bookList: state.bookList.map((book) => book.id === action.payload.id ? { ...book, ...action.payload } : book)
            }

        case 'UPDATE_FILTER':
            return {
                ...state,
                filter: action.payload
            }

        case 'UPDATE_SORT':
            return {
                ...state,
                sort: action.payload
            }

        default:
            return state;
    }

}