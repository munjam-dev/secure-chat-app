# Secure Chat App

A secure, end-to-end encrypted messaging application built with Node.js, Express, Socket.IO, MongoDB, and Flutter.

## 🔐 Features

- ✅ **End-to-End Encryption** - All messages encrypted using AES-256-CBC
- ✅ **Real-time Messaging** - Socket.IO for instant message delivery
- ✅ **1-to-1 Chat** - Private conversations between users
- ✅ **Group Chat** - Create and manage group conversations
- ✅ **Message Status** - Track sent, delivered, and read status
- ✅ **User Authentication** - JWT-based authentication with phone OTP
- ✅ **Media Sharing** - Send images, videos, and files via Cloudinary
- ✅ **User Profiles** - Profile pictures, about sections, online status
- ✅ **Firebase Integration** - Phone OTP login and real-time database
- ✅ **Mobile Optimized** - Fully responsive Flutter frontend
- ✅ **Dark/Light Theme** - Theme switching with persistence

## 🏗️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Socket.IO** - Real-time communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Helmet** - Security headers

### Frontend
- **Flutter** - Cross-platform mobile app
- **Dart** - Programming language
- **Provider/GetX** - State management
- **Firebase** - Authentication & OTP

### Security
- **AES-256-CBC** - Message encryption
- **RSA** - Key management
- **libsignal-protocol** - Signal protocol implementation

## 📦 Installation

### Prerequisites
- Node.js 14+
- MongoDB
- Flutter SDK
- Firebase project setup

### Backend Setup

```bash
# Clone repository
git clone https://github.com/munjam-dev/secure-chat-app.git
cd secure-chat-app

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your credentials

# Start MongoDB
mongod

# Run server
npm start
