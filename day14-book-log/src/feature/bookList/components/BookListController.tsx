import React from 'react';
import { BookReadStatusType, type Book, type BookListState } from '../types';

type BookListControllerProps = {
    books: Array<Book>
    // 単純なコードではあるが、将来的にフィルターとソートで処理を分けたい場合、コールバックは個別にしておいた方がわかりやすい。
    // onSelect: (type: string, value: string) => void
    onChangeFilter: (value: BookReadStatusType | "all") => void;
    onChangeSort: (value: "title" | "status") => void;
    sort: BookListState['sort'],
    filter: BookListState['filter']
}
export const BookListController: React.FC<BookListControllerProps> = ({ sort, filter, onChangeFilter, onChangeSort }) => {

    return (
        <>
            <div className="mb-4">
                <label htmlFor="filter" className="mr-2 font-medium">フィルター:</label>
                <select id="filter" className="select" name="filter" value={filter} onChange={(e) => onChangeFilter(e.target.value as BookReadStatusType)} >
                    <option value="all">すべて</option>
                    <option value={BookReadStatusType.UNREAD}>未読</option>
                    <option value={BookReadStatusType.READING}>読書中</option>
                    <option value={BookReadStatusType.FINISHED}>読了</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="sort" className="mr-2 font-medium">並び替え:</label>
                <select id="sort" className="select" name="sort" value={sort} onChange={(e) => onChangeSort(e.target.value as 'title' | 'status')}>
                    <option value="title">タイトル順</option>
                    <option value="status">ステータス順</option>
                </select>
            </div>
        </>
    )
}