
export const BookReadStatusType = {
    UNREAD: 'unread',
    READING: 'reading',
    FINISHED: 'finished',
} as const;

export type BookReadStatusType = typeof BookReadStatusType[keyof typeof BookReadStatusType];

export type Book = {
    id: string;
    title: string;
    author: string;
    status: BookReadStatusType
}

export type BookListState = {
    bookList: Array<Book>,
    updatingBook: Book | undefined,
    filter: 'all' | BookReadStatusType,
    sort: 'title' | 'status'
}

export type BookListActionType =
    // Add new book
    | { type: 'ADD_BOOK', payload: Book }
    // Edit one of the existing book
    | { type: 'EDIT_BOOK', payload: Book | undefined }
    // Delete a book
    | { type: 'DELETE_BOOK', payload: Book['id'] }
    // Update one of the existing book
    | { type: 'UPDATE_BOOK_LIST', payload: Book }
    // Update filter
    | { type: 'UPDATE_FILTER', payload: BookListState['filter'] }
    // Update sort
    | { type: 'UPDATE_SORT', payload: BookListState['sort'] }