const express = require('express');
const router = express.Router();
const { adminOnly } = require('../middlewares/roleMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const { createAlert, getAllAlerts, getUserAlerts, deleteAlert } = require('../controllers/alertController');

// Create an alert (Admin only)
router.post('/', protect, adminOnly, createAlert);

// Get all alerts (Admin only)
router.get('/all', protect, adminOnly, getAllAlerts);

// Get user-specific alerts
router.get('/my-alerts', protect, getUserAlerts);

// Delete an alert (Admin only)
router.delete('/:id', protect, adminOnly, deleteAlert);
module.exports = router;
