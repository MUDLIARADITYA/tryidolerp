const express = require('express');
const { createFirstAdmin } = require('../controllers/adminController');
const router = express.Router();

// Route to create the first admin
router.post('/create-first-admin', createFirstAdmin);

module.exports = router;
