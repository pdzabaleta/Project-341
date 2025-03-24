const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Connect to MongoDB
connectDB();

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Digital Library API',
      version: '1.0.0',
      description: 'API for managing a digital library with CRUD operations',
    },
    // Use BASE_URL if provided, otherwise fallback to localhost
    servers: [
      { url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}` }
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'ID of the book',
            },
            title: {
              type: 'string',
              description: 'Title of the book',
            },
            author: {
              type: 'string',
              description: 'Author of the book',
            },
            genre: {
              type: 'string',
              description: 'Genre of the book',
            },
            publicationDate: {
              type: 'string',
              format: 'date',
              description: 'Publication date of the book',
            },
            isbn: {
              type: 'string',
              description: 'ISBN of the book',
            },
            synopsis: {
              type: 'string',
              description: 'Synopsis of the book',
            },
            availableCopies: {
              type: 'number',
              description: 'Number of available copies',
            },
          },
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Ensure your route files contain Swagger annotations
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
console.log('Setting up Swagger docs...');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Use API routes
app.use('/api', booksRoutes);

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
