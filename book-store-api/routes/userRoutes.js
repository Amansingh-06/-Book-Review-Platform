const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user by ID
router.get('/:id', userController.getUserById);

// Route to update user by ID
router.put('/:id', userController.updateUserById);

module.exports = router;
