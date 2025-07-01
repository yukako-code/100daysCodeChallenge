
import React from 'react';
import ProductList from './components/ProductList';
import Toolbar from './components/Toolbar';
import { useProductList } from './hooks/useProductList';

/**
 * App component is the root component of the Mini Product List Viewer.
 * It connects the Toolbar and ProductList, and manages shared state via a custom hook.
 */
const App: React.FC = () => {
    const {
        products,
        selectedCategory,
        searchTerm,
        sortKey,
        sortOrder,
        handleCategoryChange,
        handleSearchChange,
        handleSortChange,
    } = useProductList();

    return (
        <div>
            <h1>Mini Product List Viewer</h1>
            <Toolbar
                selectedCategory={selectedCategory}
                searchTerm={searchTerm}
                sortKey={sortKey}
                sortOrder={sortOrder}
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
                onSortChange={handleSortChange}
            />
            <ProductList products={products} />
        </div>
    );
};

export default App;
