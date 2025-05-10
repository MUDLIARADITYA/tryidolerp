const Alert = require('../models/alert');

// Create an alert (Admin only)
const createAlert = async (req, res) => {
    console.log('Authenticated user:', req.user); 
    const { title, message, targetUser } = req.body;

    if (!title || !message) {
        return res.status(400).json({ message: 'Title and message are required.' });
    }

    try {
        // Admin creates an alert
        const alert = new Alert({
            title,
            message,
            createdBy: req.user._id, // Admin ID from protect middleware
            targetUser: targetUser || null, // If no targetUser, it is for all users
        });

        await alert.save();
        res.status(201).json({
            success: true,
            message: 'Alert created successfully.',
            data: alert,
        });
    } catch (error) {
        console.error('Error creating alert:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get all alerts (Admin only)
const getAllAlerts = async (req, res) => {
    try {
        const alerts = await Alert.find()
            .populate('createdBy', 'name email') // Populate admin details
            .sort({ createdAt: -1 });

        console.log(alerts);  // Log alerts to check the array content
        res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts,
        });
    } catch (error) {
        console.error('Error fetching alerts:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// Get alerts for a specific user
const getUserAlerts = async (req, res) => {
    try {
        const userId = req.user._id; // From protect middleware

        // Find alerts meant for the specific user or for all users
        const alerts = await Alert.find({
            $or: [{ targetUser: userId }, { targetUser: null }],
        })
            .populate('createdBy', 'name email') // Populate admin details
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: alerts.length,
            data: alerts,
        });
    } catch (error) {
        console.error('Error fetching user alerts:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};





// Delete an alert (Admin only)
const deleteAlert = async (req, res) => {
    const { id } = req.params;

    try {
        const alert = await Alert.findById(id);

        if (!alert) {
            return res.status(404).json({ success: false, message: 'Alert not found' });
        }

        // Delete the alert
        await alert.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Alert deleted successfully',
        });
    } catch (error) {
        console.error('Error deleting alert:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { createAlert, getAllAlerts, getUserAlerts, deleteAlert };


