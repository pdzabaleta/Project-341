// controllers/booksController.js
const Book = require('../models/Book');

exports.createBook = async (req, res, next) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};

exports.getBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      const err = new Error('Book not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      const err = new Error('Book not found');
      err.statusCode = 404;
      throw err;
    }
    res.status(200).json({ message: 'Book successfully deleted' });
  } catch (error) {
    next(error);
  }
};
