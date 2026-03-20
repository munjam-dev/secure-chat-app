// encryption/encrypt.js

const crypto = require('crypto');

// AES-256-CBC Encryption Function
function encryptMessage(message, encryptionKey) {
    try {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
        
        let encrypted = cipher.update(message, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        
        // Return IV + encrypted message
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption failed:', error);
        throw error;
    }
}

// AES-256-CBC Decryption Function
function decryptMessage(encryptedMessage, encryptionKey) {
    try {
        const parts = encryptedMessage.split(':');
        const iv = Buffer.from(parts[0], 'hex');
        const encrypted = parts[1];
        
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(encryptionKey), iv);
        
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        
        return decrypted;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw error;
    }
}

// RSA Encryption with Public Key
function encryptWithPublicKey(message, publicKey) {
    try {
        const encrypted = crypto.publicEncrypt(
            {
                key: publicKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(message)
        );
        return encrypted.toString('hex');
    } catch (error) {
        console.error('RSA encryption failed:', error);
        throw error;
    }
}

// RSA Decryption with Private Key
function decryptWithPrivateKey(encryptedMessage, privateKey) {
    try {
        const decrypted = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(encryptedMessage, 'hex')
        );
        return decrypted.toString('utf8');
    } catch (error) {
        console.error('RSA decryption failed:', error);
        throw error;
    }
}

// Generate a 256-bit encryption key
function generateEncryptionKey() {
    return crypto.randomBytes(32);
}

module.exports = {
    encryptMessage,
    decryptMessage,
    encryptWithPublicKey,
    decryptWithPrivateKey,
    generateEncryptionKey
};
