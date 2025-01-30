import { useState } from "react";
import { useSelector } from "react-redux";
import Filter from "../components/Filter";

function BookList() {
    const books = useSelector((state) => state.books.books);
    const [filters, setFilters] = useState({ category: "", rating: "" });

    // Filter Books Based on Selected Criteria
    const filteredBooks = books.filter((book) => {
        return (
            (filters.category === "" || book.category === filters.category) 
           
        );
    });

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Book List</h1>

            {/* Filter Component */}
            <Filter onFilterChange={setFilters} />

            {/* Display Filtered Books */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div key={book.id} className="border p-4 rounded shadow">
                            <h2 className="text-lg font-bold">{book.title}</h2>
                            <p>Author: {book.author}</p>
                            <p>Genre: {book.genre}</p>
                            <p>PublishedYear:  {book.publishedYear}</p>
                            <p>Description:{ book.description}</p>{/* Corrected this line */}
                        </div>
                    ))
                ) : (
                    <p>No books found</p>
                )}
            </div>
        </div>
    );
}

export default BookList;
