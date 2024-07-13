const drawService = require('../services/drawService');
const Room = require('../models/roomModel'); // Ensure this line is present
const { v4: uuidv4 } = require('uuid');

exports.startSession = async (req, res) => {
    try {
        const session = await drawService.startSession(req.user._id);
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.saveDrawing = async (req, res) => {
    try {
        const drawing = await drawService.saveDrawing(req.body);
        res.status(200).json(drawing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.endSession = async (req, res) => {
    try {
        const session = await drawService.endSession(req.body.sessionId);
        res.status(200).json(session);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createRoom = async (req, res) => {
    try {
        const roomId = uuidv4();
        const room = new Room({ roomId, creator: req.user._id });
        await room.save();
        res.status(200).json({ roomId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
