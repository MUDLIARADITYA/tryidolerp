
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors'); // Import the CORS middleware
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const adminRoutes = require("./routes/adminRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const alertRoutes = require("./routes/alertRoutes");

const path = require('path');

const app = express();

// Connect to the database
connectDB();

// Enable CORS with default settings
app.use(cors());

// Middleware for parsing JSON
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express.json({ limit: '50mb' }));

// Serve static files (images) from the "public/images" directory
app.use('/uploads', express.static(path.join(process.cwd(), 'public/uploads')));


// Define routes

app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/leave', leaveRoutes);
app.use('/api/alert', alertRoutes);




module.exports = app;
