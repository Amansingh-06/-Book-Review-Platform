import { useState } from "react";

function Filter({ onFilterChange }) {
    const [category, setCategory] = useState("");
    const [rating, setRating] = useState("");

    const handleFilter = () => {
        onFilterChange({ category, rating });
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <h2 className="text-lg font-bold">Filter Books</h2>

            {/* Category Filter */}
            <label className="block mt-2">Category:</label>
            <select
                className="p-2 border w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">All</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
            </select>

           

            {/* Apply Filter Button */}
            <button
                className="bg-blue-500 text-white p-2 mt-3 w-full"
                onClick={handleFilter}
            >
                Apply Filter
            </button>
        </div>
    );
}

export default Filter;
