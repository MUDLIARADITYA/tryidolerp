const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');
const {
    checkInAttendance,
    checkOutAttendance,
    getAllAttendance,
    getUserAttendance,
    updateAttendance,
    deleteAttendance,
    approveAttendance,
    getAttendance
} = require('../controllers/attendanceController');

// ✅ Check-in (User marks attendance)
router.post('/checkin', protect, checkInAttendance);

// ✅ Check-out (User updates checkout time, image, and description)
router.post('/checkout', protect, checkOutAttendance);

// ✅ Get all attendance records (Admin-only)
router.get('/', protect, adminOnly, getAllAttendance);

// ✅ Get specific user attendance
router.get('/:userId', protect, getUserAttendance);

// ✅ Get attendance of logged-in user
router.get('/user/attendance', protect, getAttendance);

// ✅ Update attendance record (Admin only)
router.put('/:id', protect, adminOnly, updateAttendance);

// ✅ Delete attendance record (Admin only)
router.delete('/:id', protect, adminOnly, deleteAttendance);

// ✅ Approve attendance (Admin only)
router.put('/approve/:id', protect, adminOnly, approveAttendance);

module.exports = router;
