const Review = require('../models/Review');
const Book = require('../models/Book');


// Get reviews for a specific book
exports.getReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'username');
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a review for a book



exports.addReview = async (req, res) => {
    const { rating, comment } = req.body;

    // Check if rating and comment are provided
    if (!rating || !comment) {
        return res.status(400).json({ message: 'Rating and comment are required.' });
    }

    try {
        // Log the req.params to verify the bookId
        console.log('Request Book ID:', req.params.id);
        console.log("user", req.user._id)

        // Validate the book ID format


        // Check if the book exists first
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Ensure that the user is authenticated


        // Check if the user has already reviewed the book


        // Create the new review
        const newReview = new Review({
            bookId: req.params.id,
            userId: req.user.id,  // assuming logged-in user
            rating,
            comment,
        });


        // Save the new review
        await newReview.save();

        // Add review _id to the Book's reviews array
        book.reviews.push(newReview._id);
        await book.save();

        res.status(201).json({ message: 'Review added successfully', review: newReview });

    } catch (error) {
        console.error('Error adding review:', error);  // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while adding the review', error: error.message });
    }
};
