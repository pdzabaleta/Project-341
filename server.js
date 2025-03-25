const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');
const usersRoutes = require('./routes/usersRoutes');
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
    // Usa BASE_URL si está definida, de lo contrario usa localhost
    servers: [
      { url: process.env.BASE_URL || `http://localhost:${process.env.PORT || 8080}` }
    ],
    components: {
      schemas: {
        Book: {
          type: 'object',
          properties: {
            _id: { type: 'string', description: 'ID of the book' },
            title: { type: 'string', description: 'Title of the book' },
            author: { type: 'string', description: 'Author of the book' },
            genre: { type: 'string', description: 'Genre of the book' },
            publicationDate: { type: 'string', format: 'date', description: 'Publication date of the book' },
            isbn: { type: 'string', description: 'ISBN of the book' },
            synopsis: { type: 'string', description: 'Synopsis of the book' },
            availableCopies: { type: 'number', description: 'Number of available copies' },
          },
        },
        // Puedes agregar también el esquema de User si lo deseas.
      },
    },
  },
  apis: ['./routes/*.js'], // Asegúrate de que tus archivos de rutas tengan las anotaciones Swagger
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
console.log('Setting up Swagger docs...');

// Sirve la interfaz de Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Sirve el JSON de Swagger en /swagger.json
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// Use API routes for both collections
app.use('/api', booksRoutes);
app.use('/api', usersRoutes);

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
