const express = require('express');
const { startSession, saveDrawing, endSession, createRoom } = require('../controllers/drawerController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/start-session', protect, startSession);
router.post('/save-drawing', protect, saveDrawing);
router.post('/end-session', protect, endSession);
router.post('/create-room', protect, createRoom);

module.exports = router;
