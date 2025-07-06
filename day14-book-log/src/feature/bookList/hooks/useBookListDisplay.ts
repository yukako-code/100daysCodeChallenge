// filter/sort 状態と、filteredAndSortedBookListの計算
import { useMemo } from 'react';
import type { BookListState, Book } from '../types';

export const useBookListDisplay = (state: BookListState): Book[] => {
    return useMemo(() => {
        const { bookList, filter, sort } = state;
        let result = bookList;

        if (filter !== 'all') {
            result = result.filter((book) => book.status === filter);
        }

        return result.sort((a, b) => {
            if (sort === 'title') return a.title.localeCompare(b.title);
            return a.status.localeCompare(b.status);
        });
    }, [state.bookList, state.filter, state.sort]);
};