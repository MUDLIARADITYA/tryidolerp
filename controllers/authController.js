const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to generate a JWT
const generateToken = (user) => {
    return jwt.sign({ id: user._id, userType: user.userType }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// Only for initial setup — remove after first use
// exports.createInitialAdmin = async (req, res) => {
//     try {
//         const existingAdmin = await User.findOne({ email: 'admin@example.com' });
//         if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

//         const admin = new User({
//             name: 'Super Admin',
//             email: 'admin@example.com',
//             password: 'admin123',
//             employeeId: 'A0001',
//             position: 'Administrator',
//             userType: 'admin'
//         });

//         await admin.save();
//         res.status(201).json({ message: 'Initial admin created successfully', admin });
//     } catch (err) {
//         res.status(500).json({ message: 'Error creating initial admin', error: err.message });
//     }
// };

// Admin-only: Register a user
exports.registerUser = async (req, res) => {
    try {

        // console.log("Received registration payload:", req.body);

        const { name, email, password, employeeId, position, userType } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Create and save the new user
        const user = new User({ name, email, password, employeeId, position, userType });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        console.error("Error in registerUser:", err);

        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
};



exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID from the request URL
        const { name, email, position, userType } = req.body; // Fields to update

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Update user details
        user.name = name || user.name;
        user.email = email || user.email;
        user.position = position || user.position;
        user.userType = userType || user.userType;
        // user.employeeId = employeeId || user.employeeId;     // As we dont want to update EmployeeId

        await user.save();
        res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error updating user', error: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // User ID from the request URL

        // Find the user by ID and delete
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
                code: 404
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully',
            code: 200
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Error deleting user',
            code: 500,
            error: err.message
        });
    }
};



exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users and exclude the password field
        const users = await User.find().select('-password');

        res.status(200).json({ message: 'Users fetched successfully', users });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching users', error: err.message });
    }
};



exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params; // User ID from the request URL

        const user = await User.findById(id).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user', error: err.message });
    }
};





// Login user
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Compare provided password with hashed password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate and return token
        const token = generateToken(user);
        res.json({ token, userType: user.userType });
    } catch (err) {
        res.status(500).json({ message: 'Error logging in', error: err.message });
    }
};
// Logout route (JWT-based authentication)
exports.logout = (req, res) => {
    // If using cookies, clear the token from the cookies
    res.clearCookie('token');  // Clear the cookie where the JWT is stored

    // Optionally, you can also invalidate the JWT by adding it to a blacklist in the database
    res.status(200).json({ message: 'Logged out successfully.' });
};






// controllers/userController.js
exports.getUserProfile = async (req, res) => {
    try {
        const user = req.user; // Access the user from the request object, set by the `protect` middleware

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user profile data
        res.status(200).json({
            message: 'User profile fetched successfully',
            user,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching user profile', error: err.message });
    }
};
