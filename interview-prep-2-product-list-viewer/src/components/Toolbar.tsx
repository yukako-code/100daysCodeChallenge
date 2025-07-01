
import React from 'react';

const categories = ['all', "men's clothing", 'jewelery', 'electronics', "women's clothing"];
const sortOptions = ['price', 'rating'];

interface ToolbarProps {
    selectedCategory: string;
    searchTerm: string;
    sortKey: string;
    sortOrder: 'asc' | 'desc';
    onCategoryChange: (category: string) => void;
    onSearchChange: (term: string) => void;
    onSortChange: (key: string, order: 'asc' | 'desc') => void;
}

/**
 * Toolbar component provides filtering, searching, and sorting controls for the product list.
 */
const Toolbar: React.FC<ToolbarProps> = ({
    selectedCategory,
    searchTerm,
    sortKey,
    sortOrder,
    onCategoryChange,
    onSearchChange,
    onSortChange,
}) => {
    return (
        <form>
            <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)}>
                {categories.map((cat) => (
                    <option key={cat} value={cat}>
                        {cat}
                    </option>
                ))}
            </select>
            <select value={sortKey} onChange={(e) => onSortChange(e.target.value, sortOrder)}>
                {sortOptions.map((opt) => (
                    <option key={opt} value={opt}>
                        Sort by {opt}
                    </option>
                ))}
            </select>
            <button
                type="button"
                onClick={() => onSortChange(sortKey, sortOrder === 'asc' ? 'desc' : 'asc')}
            >
                {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
        </form>
    );
};

export default Toolbar;
