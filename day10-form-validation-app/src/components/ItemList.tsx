import React from 'react';
import type { FavoriteItem } from '../types';

type ItemListProps = {
    items: Array<FavoriteItem>;
};
const ItemList: React.FC<ItemListProps> = ({ items }) => {
    return (
        <ul className="space-y-2">
            {items.map(({ id, title, category, note }) => (
                <li key={id} className="border p-2 rounded shadow">
                    <div className="font-semibold">{title}</div>
                    <div className="text-sm text-gray-600">{category}</div>
                    <div className="text-sm text-gray-500 mt-1">{note}</div>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;