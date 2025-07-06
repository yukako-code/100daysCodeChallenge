import type { BookListState } from "../types";

export const bookListInit = (): BookListState => {
    const storedBookList = localStorage.getItem('bookList');
    return {
        bookList: storedBookList ? JSON.parse(storedBookList) : [],
        updatingBook: undefined,
    }
}