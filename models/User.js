const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String, required: false, default: '' },
  profileUrl: { type: String },
  avatarUrl: { type: String },
});

// Aquí definimos un modelo de usuario que va a interactuar con la base de datos de MongoDB
module.exports = mongoose.model('User', userSchema, 'users');
