const User = require('../models/User');

// Create the first admin user
exports.createFirstAdmin = async (req, res) => {
    try {
        // Check if any admin already exists
        const existingAdmin = await User.findOne({ userType: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'An admin user already exists.' });
        }

        const { name, email, password, employeeId, position } = req.body;

        // Validate required fields
        if (!name || !email || !password || !employeeId || !position) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Create the admin user
        const admin = new User({
            name,
            email,
            password,
            employeeId,
            position,
            userType: 'admin', // Set as admin
        });

        await admin.save();
        res.status(201).json({ message: 'Admin user created successfully.', admin });
    } catch (err) {
        res.status(500).json({ message: 'Error creating admin user.', error: err.message });
    }
};


