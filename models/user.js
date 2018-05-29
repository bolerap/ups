const mongoose = require('mongoose');

// schema definition
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    username: String,
    password: String,
    rank: String,
    created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
