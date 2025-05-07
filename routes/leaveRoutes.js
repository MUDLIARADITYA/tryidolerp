const express = require('express');
const router = express.Router();
const { createLeave, getAllLeaves, updateLeaveStatus, getUserLeaves } = require('../controllers/leaveController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');

// User: Create a leave request
router.post('/', protect, createLeave);

// Admin: Fetch all leave requests
router.get('/', protect, adminOnly, getAllLeaves);

// Admin: Approve or reject a leave request
router.put('/:id', protect, adminOnly, updateLeaveStatus);
router.get('/my-leaves', protect, getUserLeaves);

module.exports = router;
