import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
        <div className="border rounded-lg p-6 bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{book.title}</h2>
            <p className="text-lg text-gray-600 mb-1"><strong>Author:</strong> {book.author}</p>
            <p className="text-md text-gray-500 mb-1"><strong>Genre:</strong> {book.category}</p>
            <p className="text-md text-gray-500 mb-1"><strong>Published Year:</strong> {book.publishedYear}</p>

            <div className="mt-4">
                <Link
                    to={`/api/books/${book._id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold">
                    View Details
                </Link>
            </div>
        </div>
    );
}

export default BookCard;
