const Room = require('../models/roomModel'); // Ensure this line is present

exports.getRecentRooms = async (req, res) => {
    try {
        const rooms = await Room.find().sort({ createdAt: -1 }).limit(10);
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ creator: req.user._id }).sort({ createdAt: -1 });
        res.json(rooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
