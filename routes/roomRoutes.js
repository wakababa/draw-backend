const express = require('express');
const { getRecentRooms, getMyRooms } = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/recent', protect, getRecentRooms);
router.get('/myrooms', protect, getMyRooms);

module.exports = router;
