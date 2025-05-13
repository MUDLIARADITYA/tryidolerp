


// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

exports.protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from "Authorization: Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Ensure you have JWT_SECRET in your environment variables

        // Fetch the user from the database using the decoded token's ID
        // const user = await User.findById(decoded.id).select('-password'); // Exclude password field
        const user = await User.findById(decoded.id).select('name email employeeId position userType createdAt').lean(); // Exclude password field
        console.log(user.userType);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Attach user object to the request for access in subsequent routes
        req.user = user;
        next(); // Proceed to the next middleware/controller
    } catch (err) {
        console.error('Token verification error:', err.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};
