const express = require('express');
const { getReviews, addReview } = require('../controllers/reviewController');
const { protectRoute } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/:id', getReviews);
router.post('/:id',protectRoute, addReview);

module.exports = router;
