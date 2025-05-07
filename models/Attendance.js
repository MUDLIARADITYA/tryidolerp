const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        checkin: { type: Date, required: true },
        checkout: { type: Date },
        location: { type: String, required: true },
        image: { type: String },
        description: { type: String },
        attendanceStatus: {
            type: String,
            enum: ['Present', 'Halfday', 'Absent'],
            default: 'Absent',
            required: true
        },
        totalWorkHours: { type: Number, default: 0 } // Track total working hours
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

module.exports = mongoose.model('Attendance', attendanceSchema);
