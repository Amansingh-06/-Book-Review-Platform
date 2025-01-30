const express = require('express');
const { getBooks, getBookById, addBook } = require('../controllers/bookConroller');
const { protectRoute, protectAdminRoute } = require('../middleware/authMiddleware'); // Import the middleware
const router = express.Router();

// Get all books with pagination
router.get('/', getBooks);

// Get a specific book by ID
router.get('/:id', getBookById);

// Add a new book (admin only)
router.post('/', addBook); // Admin-only route

module.exports = router;
