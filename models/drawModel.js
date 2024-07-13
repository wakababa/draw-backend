const mongoose = require('mongoose');

const drawSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    drawData: [{ x0: Number, y0: Number, x1: Number, y1: Number }]
});

module.exports = mongoose.models.Draw || mongoose.model('Draw', drawSchema);
