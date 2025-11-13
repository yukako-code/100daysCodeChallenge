function SearchBar({
    value,
    onChange,
    onSearch,
}: {
    value: string;
    onChange: (v: string) => void;
    onSearch: () => void;
}) {
    return (
        <div className="flex gap-2">
            <input
                className="flex-1 rounded-md border px-3 py-2"
                placeholder="Search repositories… (e.g. react)"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="rounded-md bg-black px-4 py-2 text-white" onClick={onSearch}>
                Search
            </button>
        </div>
    );
}
export default SearchBar;