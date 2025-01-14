require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require("./config/db")
const authRoutes = require('./routes/authRoute');
const taskRoutes = require('./routes/taskRoute');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
