const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: String, required: false },  // No obligatorio para registro manual
  username: { type: String, required: false },    // No obligatorio para registro manual
  displayName: { type: String },
  email: { type: String, required: true, unique: true }, // Obligatorio para todos los usuarios
  password: { type: String },  // Solo para registro manual (se almacena cifrado)
  profileUrl: { type: String },
  avatarUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema, 'users');
