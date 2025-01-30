import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addBook } from "../redux/bookSlice"; // Assuming you have an addBook action

function AddBookPage() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [publishedYear, setPublishedYear] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!title || !author || !genre || !publishedYear || !description) {
            setError("All fields are required");
            return;
        }

        try {
            // Send POST request to the backend API to add the book
            const newBook = {
                title,
                author,
                genre,
                publishedYear,
                description,
            };

            const response = await axios.post("http://localhost:5000/api/books", newBook); // Your API endpoint
            const { book } = response.data;

            // Dispatch the addBook action to store the book in Redux
            dispatch(addBook(book));

            // Reset the form and error state
            setTitle("");
            setAuthor("");
            setGenre("");
            setPublishedYear("");
            setDescription("");
            setError("");
        } catch (error) {
            setError("Failed to add book");
            console.error("Error adding book:", error);
        }
        navigate('/')
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Add New Book</h2>

            {error && <p className="text-red-500">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                {/* Form Inputs */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block text-sm font-medium text-gray-700">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
                        Genre
                    </label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="publishedYear" className="block text-sm font-medium text-gray-700">
                        Published Year
                    </label>
                    <input
                        type="number"
                        id="publishedYear"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded-md"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Add Book
                </button>
            </form>
        </div>
    );
}

export default AddBookPage;
