
const fs = require('fs');
const path = require('path');
const moment = require('moment-timezone');
const Attendance = require('../models/Attendance'); // Assuming your model is named Attendance
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const cron = require('node-cron');


//         const { location, image, checkin, checkout, description } = req.body;
//         const userId = req.user.id; // Assuming authentication middleware
//         if (!location || location.trim().toLowerCase() === 'null') {
//             return res.status(400).json({ status: 'error', message: 'Location is required', code: 400 });
//         }
//         if (!checkin) {
//             return res.status(400).json({ status: 'error', message: 'Check-in time is required', code: 400 });
//         }

//         // Convert check-in and checkout time to UTC for storage
//         const checkinTime = moment.tz(checkin, "Asia/Kolkata").utc().toDate();
//         const checkoutTime = checkout ? moment.tz(checkout, "Asia/Kolkata").utc().toDate() : null;

//         if (isNaN(checkinTime)) {
//             return res.status(400).json({ status: 'error', message: 'Invalid check-in time format', code: 400 });
//         }

//         if (checkout && isNaN(checkoutTime)) {
//             return res.status(400).json({ status: 'error', message: 'Invalid checkout time format', code: 400 });
//         }

//         // Image validation
//         if (!image) {
//             return res.status(400).json({ status: 'error', message: 'Image capture failed. Please try again.', code: 400 });
//         }

//         const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//             return res.status(400).json({ status: 'error', message: 'Invalid image format', code: 400 });
//         }

//         // Save Image
//         const imageBuffer = Buffer.from(matches[2], 'base64');
//         const imageName = `${Date.now()}.png`;
//         const imagePath = path.join(__dirname, '../public/uploads', imageName);
//         fs.mkdirSync(path.dirname(imagePath), { recursive: true });
//         fs.writeFileSync(imagePath, imageBuffer);

//         // Attendance rules
//         let attendanceStatus = 'Present';
//         let lateCount = 0;

//         // Convert stored UTC time back to IST for calculations
//         const checkinIST = moment(checkinTime).tz("Asia/Kolkata");
//         const checkinMinutes = checkinIST.hours() * 60 + checkinIST.minutes(); // Convert check-in time to total minutes

//         if (checkinMinutes > 630 && checkinMinutes <= 690) { // 10:31 AM - 11:30 AM
//             attendanceStatus = 'Late';
//         } else if (checkinMinutes > 690 && checkinMinutes <= 750) { // 11:31 AM - 12:30 PM
//             attendanceStatus = 'Halfday';
//         } else if (checkinMinutes > 750) { // After 12:30 PM
//             attendanceStatus = 'Absent';
//         }

//         // Late count logic (Check last 30 days)
//         if (attendanceStatus === 'Late') {
//             const thirtyDaysAgo = moment().subtract(30, 'days').toDate();
//             const userAttendance = await Attendance.find({
//                 userId,
//                 attendanceStatus: 'Late',
//                 checkin: { $gte: thirtyDaysAgo }
//             });

//             lateCount = userAttendance.length + 1;
//             if (lateCount % 3 === 0) { // Every 3 late = 1 Absent
//                 attendanceStatus = 'Absent';
//                 lateCount = 0;
//             }
//         }

//         // Save attendance
//         const attendance = new Attendance({
//             userId,
//             checkin: checkinTime, // Stored in UTC
//             checkout: checkoutTime,
//             location,
//             image: imageName,
//             description,
//             attendanceStatus,
//             lateCount,
//         });

//         await attendance.save();

//         return res.status(201).json({
//             status: 'success',
//             message: `Attendance marked successfully as ${attendanceStatus}.`,
//             code: 201,
//             attendance,
//         });

//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).json({
//             status: 'error',
//             message: 'Error marking attendance',
//             code: 500,
//             error: err.message,
//         });
//     }
// };

// Fetch attendance records and convert UTC to IST before sending
exports.getAttendance = async (req, res) => {
    try {
        const userId = req.user.id;
        const attendanceRecords = await Attendance.find({ userId });

        // Convert UTC to IST before sending response
        const formattedRecords = attendanceRecords.map(record => ({
            ...record._doc,
            checkin: moment(record.checkin).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss"),
            checkout: record.checkout ? moment(record.checkout).tz("Asia/Kolkata").format("YYYY-MM-DD HH:mm:ss") : null
        }));

        res.json({ status: "success", attendance: formattedRecords });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error fetching attendance records',
            code: 500,
            error: err.message,
        });
    }
};

exports.approveAttendance = async (req, res) => {
    const { id } = req.params;
    const { attendanceStatus } = req.body;

    try {
        // Validate attendance status
        if (!['Absent', 'Halfday', 'Present'].includes(attendanceStatus)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid attendance status. Choose Absent, Halfday, or Present.',
                code: 400,
            });
        }

        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ status: 'error', message: 'Attendance record not found', code: 404 });
        }

        // Update approval status and attendance status
        attendance.isApproved = true;
        attendance.attendanceStatus = attendanceStatus;

        await attendance.save();

        res.status(200).json({
            status: 'success',
            message: 'Attendance approved successfully',
            code: 200,
            attendance,
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({
            status: 'error',
            message: 'Error approving attendance',
            code: 500,
            error: err.message,
        });
    }
};


//     const { location, image, checkin, checkout, description } = req.body;

//     try {
//         // Validate that checkin and checkout times are valid ISO dates
//         const checkinTime = new Date(checkin);
//         const checkoutTime = checkout ? new Date(checkout) : null; // Optional checkout

//         if (isNaN(checkinTime)) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Invalid checkin time format',
//                 code: 400
//             });
//         }

//         if (checkout && isNaN(checkoutTime)) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Invalid checkout time format',
//                 code: 400
//             });
//         }

//         // Validate image existence
//         if (!image) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Image capture failed. Please try again.',
//                 code: 400
//             });
//         }

//         // Decode the Base64 image string
//         const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
//         if (!matches || matches.length !== 3) {
//             return res.status(400).json({
//                 status: 'error',
//                 message: 'Invalid image format',
//                 code: 400
//             });
//         }

//         // Convert Base64 image string to buffer and save it
//         const imageBuffer = Buffer.from(matches[2], 'base64');
//         const imageName = `${Date.now()}.png`;
//         const imagePath = path.join(__dirname, '../public/uploads', imageName);

//         // Ensure the upload directory exists
//         fs.mkdirSync(path.dirname(imagePath), { recursive: true });
//         fs.writeFileSync(imagePath, imageBuffer);

//         // Create attendance record
//         const attendance = new Attendance({
//             userId: req.user.id, // Assuming user ID comes from auth middleware
//             checkin: checkinTime,
//             checkout: checkoutTime,
//             location,
//             image: imageName,
//             description,
//         });

//         await attendance.save();

//         res.status(201).json({
//             status: 'success',
//             message: 'Attendance marked successfully',
//             code: 201,
//             attendance,
//         });
//     } catch (err) {
//         console.error('Error:', err);
//         res.status(500).json({
//             status: 'error',
//             message: 'Error marking attendance',
//             code: 500,
//             error: err.message,
//         });
//     }
// };

// Get all attendance records
exports.getAllAttendance = async (req, res) => {
    try {
        const attendanceRecords = await Attendance.find().populate('userId', 'name email employeeId'); // Populate user data including employeeId
        res.status(200).json({
            status: 'success',
            message: 'All attendance records fetched successfully',
            code: 200,
            attendanceRecords,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching attendance records',
            code: 500,
            error: err.message,
        });
    }
};

// Get user's attendance records
exports.getUserAttendance = async (req, res) => {
    try {
        const { userId } = req.params;
        const userAttendance = await Attendance.find({ userId }).populate('userId', 'name email employeeId'); // Populate user data including employeeId
        res.status(200).json({
            status: 'success',
            message: 'User attendance fetched successfully',
            code: 200,
            userAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error fetching user attendance',
            code: 500,
            error: err.message,
        });
    }
};

// Update attendance record
exports.updateAttendance = async (req, res) => {
    try {
        const { id } = req.params;
        const { location, checkout, description } = req.body;

        const updatedAttendance = await Attendance.findByIdAndUpdate(
            id,
            {
                location,
                checkout: checkout ? new Date(checkout) : undefined,
                description, // Update description
            },
            { new: true }
        ).populate('userId', 'name email employeeId'); // Populate user data including employeeId

        if (!updatedAttendance) {
            return res.status(404).json({
                status: 'error',
                message: 'Attendance record not found',
                code: 404,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Attendance record updated successfully',
            code: 200,
            updatedAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error updating attendance record',
            code: 500,
            error: err.message,
        });
    }
};

// Delete attendance record
exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedAttendance = await Attendance.findByIdAndDelete(id);

        if (!deletedAttendance) {
            return res.status(404).json({
                status: 'error',
                message: 'Attendance record not found',
                code: 404,
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Attendance record deleted successfully',
            code: 200,
            deletedAttendance,
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting attendance record',
            code: 500,
            error: err.message,
        });
    }
};

exports.checkInAttendance = async (req, res) => {
    try {
        const { location } = req.body;
        const userId = req.user.id; // Assuming authentication middleware
        const checkinTime = moment().tz("Asia/Kolkata").utc().toDate();

        if (!location) {
            return res.status(400).json({ status: 'error', message: 'Location is required', code: 400 });
        }

        // Check if user has already checked in today
        const todayStart = moment().startOf('day').toDate();
        const todayEnd = moment().endOf('day').toDate();
        const existingAttendance = await Attendance.findOne({ userId, checkin: { $gte: todayStart, $lte: todayEnd } });

        if (existingAttendance) {
            return res.status(400).json({ status: 'error', message: 'User has already checked in today.', code: 400 });
        }

        // Save new attendance record
        const attendance = new Attendance({
            userId,
            checkin: checkinTime,
            location,
            attendanceStatus: 'Present', // Default to 'Absent' if not checked out
        });

        await attendance.save();

        return res.status(201).json({
            status: 'success',
            message: 'Check-in recorded successfully.',
            code: 201,
            attendance,
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Error checking in',
            code: 500,
            error: err.message,
        });
    }
};

exports.checkOutAttendance = async (req, res) => {
    try {
        const { image, description } = req.body;
        const userId = req.user.id;

        // Get the current time in Asia/Kolkata
        const currentTime = moment().tz("Asia/Kolkata");

        // Set checkout time to the current time
        let checkoutTime = currentTime.toDate();

        // Find today's attendance record
        const todayStart = moment().startOf('day').toDate();
        const todayEnd = moment().endOf('day').toDate();
        const attendance = await Attendance.findOne({ userId, checkin: { $gte: todayStart, $lte: todayEnd } });

        if (!attendance) {
            return res.status(400).json({ status: 'error', message: 'Check-in record not found.', code: 400 });
        }
        if (attendance.checkout) {
            return res.status(400).json({ status: 'error', message: 'User has already checked out.', code: 400 });
        }

        // Ensure checkout is not before check-in
        if (moment(checkoutTime).isBefore(moment(attendance.checkin))) {
            return res.status(400).json({ status: 'error', message: 'Checkout time cannot be before check-in time.', code: 400 });
        }

        // Validate image
        if (!image) {
            return res.status(400).json({ status: 'error', message: 'Image is required for checkout.', code: 400 });
        }

        const matches = image.match(/^data:image\/(png|jpeg);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).json({ status: 'error', message: 'Invalid image format', code: 400 });
        }

        // Save Image
        const imageBuffer = Buffer.from(matches[2], 'base64');
        const imageName = `${Date.now()}.png`;
        const imagePath = path.join(__dirname, '../public/uploads', imageName);
        fs.mkdirSync(path.dirname(imagePath), { recursive: true });
        fs.writeFileSync(imagePath, imageBuffer);

        // Calculate total work hours
        const totalWorkSeconds = moment(checkoutTime).diff(moment(attendance.checkin), 'seconds');

        // Ensure non-negative work time
        if (totalWorkSeconds < 0) {
            return res.status(400).json({ status: 'error', message: 'Invalid checkout time.', code: 400 });
        }

        const totalWorkHours = (totalWorkSeconds / 3600).toFixed(2);

        // Convert to HH:mm:ss format
        const hours = Math.floor(totalWorkSeconds / 3600);
        const minutes = Math.floor((totalWorkSeconds % 3600) / 60);
        const seconds = totalWorkSeconds % 60;
        const totalWorkHoursFormatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

        // Determine attendance status
        let attendanceStatus = 'Absent';
        if (totalWorkSeconds >= 7.5 * 3600) {
            attendanceStatus = 'Present';
        } else if (totalWorkSeconds >= 4 * 3600) {
            attendanceStatus = 'Halfday';
        }

        // Update attendance record
        attendance.checkout = checkoutTime;
        attendance.image = imageName;
        attendance.description = description;
        attendance.totalWorkHours = parseFloat(totalWorkHours);
        attendance.attendanceStatus = attendanceStatus;

        await attendance.save();

        return res.status(200).json({
            status: 'success',
            message: `Checkout recorded successfully. Work hours: ${totalWorkHoursFormatted}`,
            code: 200,
            attendance: {
                ...attendance.toObject(),
                totalWorkHoursFormatted
            }
        });

    } catch (err) {
        console.error('Error:', err);
        return res.status(500).json({
            status: 'error',
            message: 'Error checking out',
            code: 500,
            error: err.message,
        });
    }
};


const markAbsentUsers = async () => {
    try {
        const todayStart = moment().startOf('day').toDate();
        const todayEnd = moment().endOf('day').toDate();

        // Find users who checked in but didn't check out
        const unattendedUsers = await Attendance.find({
            checkin: { $gte: todayStart, $lte: todayEnd },
            checkout: null, // No checkout recorded
        });

        for (const user of unattendedUsers) {
            user.attendanceStatus = 'Absent';
            user.description = 'User did not checkout'; // Updating description
            user.checkout = user.checkin; // Set checkout time same as checkin time
            await user.save();
        }

        console.log('Updated absent users with missing checkout.');
    } catch (err) {
        console.error('Error updating absent users:', err);
    }
};

cron.schedule('55 23 * * *', () => {  // Runs at 6:50 PM IST
    const now = moment().tz("Asia/Kolkata").format('MM/DD/YYYY, h:mm:ss A');


    markAbsentUsers()
        .then(() => console.log(`[CRON SUCCESS] markAbsentUsers completed at: ${moment().tz("Asia/Kolkata").format('MM/DD/YYYY, h:mm:ss A')}`))
        .catch(err => console.error(`[CRON ERROR] markAbsentUsers failed:`, err));
}, {
    timezone: 'Asia/Kolkata'
});


