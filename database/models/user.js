const mongoose = require('mongoose');

// * create user schema in database
const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  passwordHash: {
    type: String,
    required: [true, 'Password is required'],
  },
  avatar: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  emailVerified: {
    type: Boolean,
    default: false,
  },
  token: {
    type: String
  }
});

// * create user model and export it
module.exports = mongoose.model('User', userSchema);