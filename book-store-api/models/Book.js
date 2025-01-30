const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedYear: { type: Number, required: true },
    description: { type: String },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review' // Reference to the Review model
    }],
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
