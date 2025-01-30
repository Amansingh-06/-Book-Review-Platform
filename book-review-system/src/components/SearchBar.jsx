function SearchBar({ setSearch }) {
    return (
        <input
            type="text"
            placeholder="Search books..."
            className="border p-2 w-full"
            onChange={(e) => setSearch(e.target.value)}
        />
    );
}

export default SearchBar;
