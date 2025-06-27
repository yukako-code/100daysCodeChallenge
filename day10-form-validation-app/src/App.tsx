import React from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import { useItems } from './hooks';

const App: React.FC = () => {
    const { items, form } = useItems();
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Form Validation Example</h1>
            <ItemForm
                onSubmit={(item) => {
                    console.log('Submitted item:', item);
                }}
                initialValues={form}
            />
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Items List</h2>
                <ItemList items={items} />
            </div>
        </div>
    )
}

export default App;