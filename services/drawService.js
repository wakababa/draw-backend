const Room = require('../models/roomModel');
const Session = require('../models/sessionModel');
const Drawing = require('../models/drawingModel');

exports.startSession = async (userId) => {
    const session = new Session({ userId });
    await session.save();
    return session;
};

exports.saveDrawing = async (data) => {
    const drawing = new Drawing(data);
    await drawing.save();
    return drawing;
};

exports.endSession = async (sessionId) => {
    const session = await Session.findByIdAndUpdate(sessionId, { endedAt: new Date() }, { new: true });
    return session;
};
