const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/authRoutes'); // Import the auth route
const bookRoute = require('./routes/bookRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const userRoutes = require('./routes/userRoutes')
dotenv.config(); // Load environment variables

const app = express();

// CORS Configuration
const corsOptions = {
    origin: "http://localhost:5173",  // Allow frontend's origin
    credentials: true,  // Allow cookies and credentials
};

app.use(cors(corsOptions));  // Apply CORS middleware with the configuration






app.use(express.json()); // To parse JSON bodies

// Use the auth route
app.use('/api/auth', authRoute);
app.use('/api/books', bookRoute)
app.use('/api/review', reviewRoutes)
app.use('/api/user',userRoutes)

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
