const express = require('express');
const { getRecentRooms } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/recent-rooms', protect, getRecentRooms);

module.exports = router;
