// models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        sparse: true
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    username: String,
    profilePicture: String,
    about: {
        type: String,
        default: 'Hey there!'
    },
    lastSeen: Date,
    isOnline: {
        type: Boolean,
        default: false
    },
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark'],
            default: 'light'
        },
        notificationsEnabled: {
            type: Boolean,
            default: true
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);
