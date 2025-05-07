const express = require('express');
const {
    registerUser,
    loginUser,
    logout,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById,
    getUserProfile,
    // createInitialAdmin
} = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { adminOnly } = require('../middlewares/roleMiddleware');
const router = express.Router();

// Routes for user registration and login
router.post('/register', protect, registerUser); // No protection for registration
router.post('/login', loginUser); // User login
router.post('/logout', protect, logout); // Protect logout route to clear token
router.get('/profile', protect, getUserProfile); // Protect profile route
// router.post('/create-initial-admin', createInitialAdmin);

// Admin routes with protection
router.put('/update/:id', protect, adminOnly, updateUser); // Update user by ID (admin only)
router.delete('/delete/:id', protect, adminOnly, deleteUser); // Delete user by ID (admin only)
router.get('/all', protect, adminOnly, getAllUsers); // Get all users (admin only)
router.get('/:id', protect, getUserById); // Get user by ID (protected)

module.exports = router;
