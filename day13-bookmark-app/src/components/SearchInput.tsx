import React from 'react';

type SearchInputProps = {
    searchTerm: string;
    handleSearchBookmark: (searchVal: string) => void;
}
const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, handleSearchBookmark }) => {

    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleSearchBookmark(e.target.value);
    }
    return (
        <section className="mb-6">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                🔍 ブックマーク検索
            </label>
            <input
                id="search"
                type="text"
                value={searchTerm}
                placeholder="タイトルまたはメモで検索..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                onChange={handleSearchInput}
            />
        </section>
    )
}
export default SearchInput;
