// App.tsx or page.tsx
import React from 'react';
import ShoppingItemForm from './components/ShoppingItemForm';
import ShoppingItemList from './components/ShoppingItemList';
import { useShoppingList } from './hooks/useShoppingList';

const App: React.FC = () => {
  const { shoppingList, handleList, updatingItem, handleDelete, handleEdit } = useShoppingList();

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">🛒 買い物メモ</h1>
      <ShoppingItemForm handleList={handleList} updatingItem={updatingItem} />
      <ShoppingItemList shoppingList={shoppingList} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};

export default App;
