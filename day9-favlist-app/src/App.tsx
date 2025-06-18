import { ItemForm } from './components/ItemForm';
import { ItemList } from './components/ItemList';
import { useItems } from './hooks';

const App = () => {
    const { items, handleSubmitItem, handleEditClick, handleDelete, updatingItem } = useItems();

    return <div className="max-w-xl mx-auto mt-10 px-4">
        <h1 className="text-2xl font-bold mb-4">お気に入り管理</h1>
        <ItemForm onSubmit={handleSubmitItem} updatingItem={updatingItem} />
        <ItemList items={items} onUpdate={handleEditClick} onDelete={handleDelete} />
    </div>;
};

export default App;
