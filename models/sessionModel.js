const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    startedAt: { type: Date, default: Date.now },
    endedAt: { type: Date }
});

module.exports = mongoose.models.Session || mongoose.model('Session', sessionSchema);
