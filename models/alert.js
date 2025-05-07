const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Admin who created the alert
        targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, // Null means alert for all users
    },
    { timestamps: true } // Automatically add createdAt and updatedAt
);

module.exports = mongoose.model('Alert', alertSchema);
