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

// Cached connection variable
let cachedDb = null;

// Function to connect to MongoDB
async function connectToDatabase() {
    if (cachedDb) {
        return cachedDb;
    }

    try {
        const connection = await mongoose.connect(db, {
            serverSelectionTimeoutMS: 5000, // Fail fast if IP is blocked
        });
        cachedDb = connection;
        console.log('MongoDB Connected successfully to Atlas');
        return connection;
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        throw error;
    }
}

// Middleware to ensure DB is connected before handling requests
app.use(async (req, res, next) => {
    // Skip DB connection for root route and OPTIONS
    if (req.path === '/' || req.method === 'OPTIONS') return next();

    try {
        await connectToDatabase();
        next();
    } catch (err) {
        console.error("Failed to connect to DB in middleware");
        res.status(500).json({ message: "Database Connection Failed", error: err.message });
    }
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

