import type { FavoriteItem } from '../types';

type Props = {
    items: FavoriteItem[];
    onUpdate: (id: string) => void;
    onDelete: (id: string) => void;
};

export const ItemList = ({ items, onUpdate, onDelete }: Props) => {
    return (
        <ul className="space-y-2">
            {items.map(item => (
                <li key={item.id} className="border p-2 rounded shadow">
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.category}</div>

                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={() => onUpdate(item.id)}
                            className="px-3 py-1 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded"
                        >
                            編集
                        </button>
                        <button
                            onClick={() => onDelete(item.id)}
                            className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            削除
                        </button>
                    </div>
                </li>
            ))}

        </ul>
    );
};
