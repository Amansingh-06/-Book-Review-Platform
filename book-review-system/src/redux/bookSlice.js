import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all books
export const fetchBooks = createAsyncThunk("books/fetchBooks", async () => {
    const response = await axios.get("http://localhost:5000/api/books");
    return response.data;
});

// Fetch a single book by ID
export const fetchBookById = createAsyncThunk("books/fetchBookById", async (id) => {
    const response = await axios.get(`http://localhost:5000/api/books/${id}`);
    return response.data;
});

// Add a new book
export const addBook = createAsyncThunk("books/addBook", async (newBook) => {
    const response = await axios.post("http://localhost:5000/api/books", newBook);
    return response.data.book; // Assuming the API returns the added book
});

// Fetch reviews for a specific book (by book ID)
export const fetchReviewsByBookId = createAsyncThunk("books/fetchReviewsByBookId", async (Id) => {
    const response = await axios.get(`http://localhost:5000/api/review/${Id}`);
    return response.data;
});

// Add a review for a specific book (by book ID)
export const addReviewByBookId = createAsyncThunk(
    "reviews/addReviewByBookId",
    async ({ bookId, review }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/review/${bookId}`, review);
            return response.data;  // Assuming response.data contains the new review
        } catch (error) {
            return rejectWithValue(error.response.data);  // Return error if fails
        }
    }
);

const bookSlice = createSlice({
    name: "books",
    initialState: { books: [], selectedBook: null, reviews: [], loading: false, error: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch all books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch single book by ID
            .addCase(fetchBookById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBookById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBook = action.payload;
            })
            .addCase(fetchBookById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add new book
            .addCase(addBook.pending, (state) => {
                state.loading = true;
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.loading = false;
                state.books.push(action.payload); // Add the newly added book to the state
            })
            .addCase(addBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Fetch reviews by book ID
            .addCase(fetchReviewsByBookId.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchReviewsByBookId.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchReviewsByBookId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // Add review by book ID
            .addCase(addReviewByBookId.fulfilled, (state, action) => {
                state.reviews.push(action.payload);
            })
            .addCase(addReviewByBookId.rejected, (state, action) => {
                state.error = action.payload || action.error.message;
            });
    },
});

export default bookSlice.reducer;
