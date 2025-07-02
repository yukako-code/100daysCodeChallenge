// components/BookmarkList.tsx
import React from 'react';
import type { Bookmark } from '../types/bookmarks';


type BookmarkListProps = {
    bookmarks: Bookmark[];
    onEdit: (bookmark: Bookmark) => void;
    onDelete: (id: string) => void;
};

const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onEdit, onDelete }) => {
    return (
        <ul className="space-y-2">
            {bookmarks.map(({ id, title, url, description }) => (
                <li key={id} className="border p-2 rounded shadow-sm">
                    <div className="flex justify-between items-center">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                            {title}
                        </a>
                        <div className="space-x-2">
                            <button onClick={() => onEdit({ id, title, url, description })} className="text-blue-500">編集</button>
                            <button onClick={() => onDelete(id)} className="text-red-500">削除</button>
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{description}</p>
                </li>
            ))}
        </ul>
    );
};

export default BookmarkList;
