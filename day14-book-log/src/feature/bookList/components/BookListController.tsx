import React from 'react';
import { BookReadStatusType, type Book, type BookListState } from '../types';

type BookListControllerProps = {
    books: Array<Book>
    onSelect: (type: string, value: string) => void
    sort: BookListState['sort'],
    filter: BookListState['filter']
}
export const BookListController: React.FC<BookListControllerProps> = ({ sort, filter, onSelect }) => {

    return (
        <>
            <div className="mb-4">
                <label htmlFor="filter" className="mr-2 font-medium">フィルター:</label>
                <select id="filter" className="select" name="filter" value={filter} onChange={(e) => onSelect(e.target.name, e.target.value as BookReadStatusType)} >
                    <option value="all">すべて</option>
                    <option value={BookReadStatusType.UNREAD}>未読</option>
                    <option value={BookReadStatusType.READING}>読書中</option>
                    <option value={BookReadStatusType.FINISHED}>読了</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="sort" className="mr-2 font-medium">並び替え:</label>
                <select id="sort" className="select" name="sort" value={sort} onChange={(e) => onSelect(e.target.name, e.target.value)}>
                    <option value="title">タイトル順</option>
                    <option value="status">ステータス順</option>
                </select>
            </div>
        </>
    )
}