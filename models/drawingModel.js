const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
    sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
    drawData: [{ x0: Number, y0: Number, x1: Number, y1: Number }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Drawing || mongoose.model('Drawing', drawingSchema);
