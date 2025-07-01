
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '../types';

/**
 * useProductList is a custom hook that fetches product data and manages UI states.
 * It returns the filtered and sorted product list along with handler functions.
 */
export const useProductList = () => {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('price');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setAllProducts(data))
            .catch((err) => console.error('Fetch error:', err));
    }, []);

    const products = useMemo(() => {
        let filtered = [...allProducts];

        if (selectedCategory !== 'all') {
            filtered = filtered.filter((p) => p.category === selectedCategory);
        }

        if (searchTerm) {
            filtered = filtered.filter((p) =>
                p.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filtered.sort((a, b) => {
            const valA = sortKey === 'price' ? a.price : a.rating?.rate || 0;
            const valB = sortKey === 'price' ? b.price : b.rating?.rate || 0;
            return sortOrder === 'asc' ? valA - valB : valB - valA;
        });

        return filtered;
    }, [allProducts, selectedCategory, searchTerm, sortKey, sortOrder]);

    return {
        products,
        selectedCategory,
        searchTerm,
        sortKey,
        sortOrder,
        handleCategoryChange: setSelectedCategory,
        handleSearchChange: setSearchTerm,
        handleSortChange: (key: string, order: 'asc' | 'desc') => {
            setSortKey(key);
            setSortOrder(order);
        },
    };
};
