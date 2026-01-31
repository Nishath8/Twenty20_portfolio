const mongoose = require('mongoose');

// Define the User schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);
