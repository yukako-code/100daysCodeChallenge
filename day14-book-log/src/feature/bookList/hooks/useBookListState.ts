import { useEffect, useReducer } from "react";
import { bookListReducers } from "../reducers/bookListReducers";
import { bookListInit } from "../utilities";


// useReducer, localStorageだけ
export const useBookListState = () => {
    const [state, dispatch] = useReducer(bookListReducers, undefined, bookListInit);

    // 永続化
    useEffect(() => {
        localStorage.setItem('bookList', JSON.stringify(state.bookList));
    }, [state.bookList]);

    return { state, dispatch };
};