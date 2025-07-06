import { mockBookList } from "../const/mock";
import type { BookListState } from "../types";

export const bookListInit = (): BookListState => {
    const storedBookList = localStorage.getItem('bookList');
    return {
        bookList: storedBookList && JSON.parse(storedBookList).length > 0 ? JSON.parse(storedBookList) : mockBookList,
        updatingBook: undefined,
        filter: 'all',
        sort: 'title'
    }
}