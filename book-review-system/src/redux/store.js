

import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice';
import bookReducer from "./bookSlice"; // Ensure this path is correct

const store = configureStore({
    reducer: {
        books: bookReducer,
        user: userReducer,
    },
});

export default store; // Yeh ensure karo ki export default hai

