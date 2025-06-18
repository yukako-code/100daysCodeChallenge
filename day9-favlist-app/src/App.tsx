import { useState } from 'react';
import { ItemForm } from './components/ItemForm';
import { ItemList } from './components/ItemList';
import type { FavoriteItem } from './types';

const initialItems: FavoriteItem[] = [
    {
        id: '1',
        title: 'React Documentation',
        category: 'Documentation',
        note: 'Official React documentation',
    },
    {
        id: '2',
        title: 'Tailwind CSS',
        category: 'CSS Framework',
        note: 'Utility-first CSS framework',
    },
];

const App = () => {
    const [items, setItems] = useState<FavoriteItem[]>(initialItems);
    const [updatingItem, setUpdatingItem] = useState<FavoriteItem | null>(null);

    const handleAdd = (newItem: FavoriteItem) => {
        if (updatingItem) {
            setItems((prev) => {
                prev.map(item => item.id === newItem.id ? { ...item, ...newItem } : item);
                return prev;
            })
        } else {
            console.log('Adding new item:', newItem);
            setItems([...items, newItem])
        }

    };

    const onUpdateClick = (id: string) => {
        setUpdatingItem(items.find(item => item.id === id) || null);
    };

    const handleDelete = (id: string) => {
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
    };

    return (
        <div className="max-w-xl mx-auto mt-10 px-4">
            <h1 className="text-2xl font-bold mb-4">お気に入り管理</h1>
            <ItemForm onSubmit={handleAdd} updatingItem={updatingItem} />
            <ItemList items={items} onUpdate={onUpdateClick} onDelete={handleDelete} />
        </div>
    );
};

export default App;
