const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/usersController');

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 */
router.post('/users', usersController.createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *       500:
 *         description: Server error
 */
router.get('/users', usersController.getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
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
 *         description: User updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 */
router.put('/users/:id', usersController.updateUser);

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The user ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/users/:id', usersController.deleteUser);

/* =============================================
 * GitHub Authentication Routes
 ==============================================*/

// Redirect to GitHub login
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback route
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    console.log("Autenticación exitosa, redirigiendo a /api-docs");
    res.redirect('/api-docs');
  }
);


// Log out the user
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Profile route (only accessible if authenticated)
router.get('/profile', (req, res) => {
  if (!req.user) {
    return res.redirect('/auth/github');
  }
  res.json(req.user); // You can render a profile view here if needed
});

module.exports = router;
