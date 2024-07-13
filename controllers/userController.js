const User = require('../models/userModel');

exports.getRecentRooms = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('recentRooms');
        res.json(user.recentRooms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
