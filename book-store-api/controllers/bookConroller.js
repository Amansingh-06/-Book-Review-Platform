const Book = require('../models/Book');

// Get all books with pagination
exports.getBooks = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        const books = await Book.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('reviews', "rating");;
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new book (admin only)
exports.addBook = async (req, res) => {
    const { title, author, genre, publishedYear, description } = req.body;

    try {
        const newBook = new Book({ title, author, genre, publishedYear, description });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
