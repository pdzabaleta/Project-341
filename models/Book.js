const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationDate: { type: Date, required: true },
  isbn: { type: String, required: true, unique: true },
  synopsis: { type: String },
  availableCopies: { type: Number, required: true, min: 0 },
});

module.exports = mongoose.model('Book', BookSchema);
