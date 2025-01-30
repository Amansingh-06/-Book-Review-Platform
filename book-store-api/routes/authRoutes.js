const express = require('express');
const router = express.Router();
const { register, login,logout } = require('../controllers/authController');

const { protectRoute } = require('../middleware/authMiddleware');

// Register endpoint
router.post('/register', register);

// Login endpoint
router.post('/login', login);
router.post('/logout',logout)

module.exports = router;
