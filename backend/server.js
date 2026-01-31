const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
// Middleware
app.use(express.json());

// Enhanced CORS to allow Vercel frontend
app.use(cors({
    origin: '*', // For debugging: allow all. Change to specific domain later.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request Logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Root Route
app.get('/', (req, res) => {
    res.json({ message: 'API is running', time: new Date().toISOString() });
});

// DB Config
const db = process.env.MONGO_URI;

// Connect to MongoDB with better error logging
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected successfully to Atlas'))
    .catch(err => {
        console.error('MongoDB Connection Error:', err);
        console.error('Make sure your IP is whitelisted in MongoDB Atlas (0.0.0.0/0)');
    });

// Routes
app.use('/api/auth', require('./routes/auth'));

// Export for Vercel
module.exports = app;

// Start server locally
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
}

