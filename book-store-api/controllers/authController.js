const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');  // Ensure this line is present


// Register Route
exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            email,
            password: hashedPassword,
            name,
            isAdmin: email === "admin@example.com"
        });

        // Save the user to the database
        await newUser.save();

        // Return the response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                email: newUser.email,
                name: newUser.name,
                _id: newUser._id,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login Route
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Check if user is admin based on email (you can update this logic as per your needs)
        

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin }, // Add isAdmin flag to the token
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Set expiration time
        );
        // Send the token and user data back to the client
        res.json({ token, user: { ...user.toObject(), isAdmin: user.isAdmin } });
        console.log(token)

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token"); // 🔥 Token को remove कर दो
        res.json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Logout failed" });
    }
};