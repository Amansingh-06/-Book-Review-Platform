const User = require('../models/User'); // Assuming you have a User model

// Show user details by ID
exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from params
        const user = await User.findById(userId); // Find user by ID

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Send user data as response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update user details by ID
exports.updateUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from params
        const updatedData = req.body; // Get updated data from request body

        const user = await User.findByIdAndUpdate(userId, updatedData, { new: true }); // Update user

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user); // Send updated user data as response
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
