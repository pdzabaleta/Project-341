// routes/booksRoutes.js
const express = require('express');
const router = express.Router();
const booksController = require('../controllers/booksController');
const isAuthenticated = require('../middlewares/authMiddleware'); 

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               publicationDate:
 *                 type: string
 *                 format: date
 *               isbn:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               availableCopies:
 *                 type: number
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - publicationDate
 *               - isbn
 *               - availableCopies
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/books', isAuthenticated, booksController.createBook);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *       500:
 *         description: Server error
 */
router.get('/books', booksController.getBooks);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Book not found
 */
router.put('/books/:id', isAuthenticated, booksController.updateBook);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The book ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
router.delete('/books/:id', isAuthenticated, booksController.deleteBook);

module.exports = router;
