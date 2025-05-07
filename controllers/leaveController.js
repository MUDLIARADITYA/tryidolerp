const Leave = require('../models/LeaveModel'); // Replace with the actual path to your model

// @desc   Create a new leave request
// @route  POST /api/leaves
// @access Protected (user only)
const createLeave = async (req, res) => {
    const { subject, message } = req.body;

    // Check if both subject and message are provided
    if (!subject || !message) {
        return res.status(400).json({ message: 'Subject and message are required.' });
    }

    try {
        // Create a new leave request
        const leave = new Leave({
            userId: req.user._id,
            subject,
            message,
        });

        // Save the leave request to the database
        await leave.save();
        res.status(201).json({ success: true, message: 'Leave request created successfully.', data: leave });
    } catch (error) {
        console.error('Error creating leave:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc   Fetch all leave requests
// @route  GET /api/leaves
// @access Protected (admin only)
const getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('userId', 'name email position') // Populate user details
            .populate('approvedBy', 'name email') // Populate admin approver details
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, count: leaves.length, data: leaves });
    } catch (error) {
        console.error('Error fetching leaves:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc   Approve or reject a leave request
// @route  PUT /api/leaves/:id
// @access Protected (admin only)
const updateLeaveStatus = async (req, res) => {
    const { status, reason } = req.body;

    // Validate the status
    if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value.' });
    }

    {/*    updated     */}
    if (!reason || reason.trim() === "") {
        return res.status(400).json({ message: 'Reason is required when approving or rejecting a leave.' });
    }

    try {
        const leave = await Leave.findById(req.params.id);

        if (!leave) {
            return res.status(404).json({ message: 'Leave request not found.' });
        }

        // Update the leave status and approvedBy fields
        leave.status = status;

        {/*  updated */}
        leave.reason = reason;

        leave.approvedBy = req.user._id; // Admin who approved/rejected the leave
        await leave.save();

        res.status(200).json({ 
            success: true, 
            message: `Leave request ${status}.`, 
            data: leave 
        });
    } catch (error) {
        console.error('Error updating leave status:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

// @desc   Get leave requests for a particular user
// @route  GET /api/leaves/my-leaves
// @access Protected (user only)
const getUserLeaves = async (req, res) => {
    try {
        // Fetch leaves where userId matches the logged-in user's ID
        const userId = req.user._id; // From protect middleware
        const leaves = await Leave.find({ userId })
            .populate('userId', 'name email position') // Optional: populate user details
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: leaves.length,
            data: leaves,
        });
    } catch (error) {
        console.error('Error fetching user leaves:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = { createLeave, getAllLeaves, updateLeaveStatus, getUserLeaves };
