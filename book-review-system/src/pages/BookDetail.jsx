import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBookById, fetchReviewsByBookId, addReviewByBookId } from "../redux/bookSlice";

function BookDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [comment, setcomment] = useState("");
    const [rating, setRating] = useState(5); // Default rating

    // Fetch the book and reviews when the component mounts
    useEffect(() => {
        dispatch(fetchBookById(id));
        dispatch(fetchReviewsByBookId(id));
    }, [dispatch, id]);

    const book = useSelector((state) => state.books.selectedBook);
    const reviews = useSelector((state) => state.books.reviews);
    const user = useSelector((state) => state.user); // Get user data to check login status
    const isLoggedIn = user  // Check if user is logged in
    const userId = isLoggedIn ? user.id : ""; // Get logged-in user's ID
    const userName = isLoggedIn ? user.name : ""; // Get the logged-in user's name

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        console.log("Review Data:", { comment, rating }); // Log the data
        if (isLoggedIn) {
            dispatch(addReviewByBookId({
                bookId: id,
                review: { text: comment, rating}
            }));
            setcomment(""); // Clear input after submission
            setRating(5); // Reset rating to default
        } else {
            alert("You must be logged in to submit a review.");
        }
    };


    if (!book) return <p>Loading book details...</p>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <p className="text-lg text-gray-600"><strong>Author:</strong> {book.author}</p>
            <p className="text-md text-gray-500"><strong>Genre:</strong> {book.category}</p>
            <p className="text-md text-gray-500 mb-4"><strong>Published Year:</strong> {book.publishedYear}</p>
            <p className="text-md text-gray-600">{book.description}</p>

            {/* Review Submission Form */}
            {isLoggedIn && (
                <form onSubmit={handleReviewSubmit} className="mt-4">
                    <h2 className="text-xl font-bold">Add a Review</h2>
                    <textarea
                        value={comment}
                        onChange={(e) => setcomment(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Write your review..."
                        required
                    ></textarea>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        min="1"
                        max="5"
                        className="p-2 border rounded mt-2"
                        required
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
                        Submit Review
                    </button>
                </form>
            )}

            {/* If not logged in, display message */}
            {!isLoggedIn && (
                <p className="text-red-500 mt-4">Please log in to add a review.</p>
            )}

            {/* Display Reviews */}
            <h2 className="text-xl font-bold mt-4">Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className="border p-2 my-2">
                        <p><strong>Rating:</strong> ⭐ {review.rating}/5</p>
                        <p><strong>By:</strong> {user.name}</p> {/* Display userName */}
                        <p>{review.text}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
}

export default BookDetail;
