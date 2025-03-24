const express = require('express');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use API routes
app.use('/api', booksRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
