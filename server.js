// server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/secure-chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('✅ MongoDB connected successfully');
}).catch(err => {
    console.error('❌ MongoDB connection failed:', err);
});

// Socket.IO Real-time Messaging
const connectedUsers = {};

io.on('connection', (socket) => {
    console.log('✅ User connected:', socket.id);
    
    // User joins
    socket.on('user_join', (userId) => {
        connectedUsers[userId] = socket.id;
        io.emit('user_status', { userId, status: 'online', connectedUsers: Object.keys(connectedUsers) });
    });

    // Send message
    socket.on('send_message', (data) => {
        io.emit('receive_message', {
            sender: data.sender,
            receiver: data.receiver,
            message: data.message,
            timestamp: new Date(),
            status: 'delivered'
        });
    });

    // Typing indicator
    socket.on('typing', (data) => {
        io.emit('user_typing', { userId: data.userId, isTyping: true });
    });

    // Stop typing
    socket.on('stop_typing', (data) => {
        io.emit('user_typing', { userId: data.userId, isTyping: false });
    });

    // User disconnects
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
        for (let userId in connectedUsers) {
            if (connectedUsers[userId] === socket.id) {
                delete connectedUsers[userId];
                io.emit('user_status', { userId, status: 'offline', connectedUsers: Object.keys(connectedUsers) });
            }
        }
    });
});

// Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'Server is running',
        timestamp: new Date(),
        connectedUsers: Object.keys(connectedUsers).length
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📡 WebSocket ready for real-time messaging`);
});
