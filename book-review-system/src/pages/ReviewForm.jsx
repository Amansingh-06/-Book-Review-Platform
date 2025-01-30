import { useState } from "react";
import { useDispatch } from "react-redux";
import { addReviewByBookId } from "../redux/bookSlice"; // ✅ Correct Import

function ReviewForm({ bookId }) {
    const dispatch = useDispatch();
    const [comment, setcomment] = useState("");
    const [rating, setRating] = useState(5);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addReviewByBookId({ bookId, review: { text: reviewText, rating } }));
        setReviewText("");
        setRating(5);
    };

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <h2 className="text-xl font-bold">Add a Review</h2>
            <textarea
                value={comment}
                onChange={(e) => setReviewText(e.target.value)}
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
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-2">Submit Review</button>
        </form>
    );
}

export default ReviewForm;
