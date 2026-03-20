// models/Group.js

const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true
    },
    groupIcon: String,
    description: String,
    admin: {
        type: String,
        required: true
    },
    members: [{
        userId: String,
        joinedAt: {
            type: Date,
            default: Date.now
        }
    }],
    groupPublicKey: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Group', groupSchema);
