const mongoose = require('mongoose');

const profileScheme = new mongoose.Schema({
    name: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
})

const AdminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: profileScheme,
        default: {}
    },
    password: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: null
    },
    role: {
        type: String,
        enum: ['superadmin', 'admin', 'moderator'],
        default: 'admin'
    }
}, {
    timestamps: true
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin