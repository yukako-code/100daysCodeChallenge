// components/ShoppingItemList.tsx
import React from 'react';
import type { ShoppingItem } from '../type';

interface ShoppingItemListProps {
    shoppingList: Array<ShoppingItem>
    handleEdit: (id: ShoppingItem['id']) => void
    handleDelete: (id: ShoppingItem['id']) => void
}
const ShoppingItemList: React.FC<ShoppingItemListProps> = ({ shoppingList, handleEdit, handleDelete }) => {
    return (
        <ul className="space-y-2">
            {
                shoppingList.map(({ id, title }) => (
                    <li key={id} className="flex justify-between items-center border p-2 rounded">
                        <span>{title}</span>
                        <div className="space-x-2">
                            <button className="text-sm text-green-600" onClick={() => handleEdit(id)}>編集</button>
                            <button className="text-sm text-red-600" onClick={() => handleDelete(id)}>削除</button>
                        </div>
                    </li>
                ))
            }
        </ul>
    );
};

export default React.memo(ShoppingItemList);