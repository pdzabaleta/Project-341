const express = require('express');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');
const booksRoutes = require('./routes/booksRoutes');
const usersRoutes = require('./routes/usersRoutes');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const errorHandler = require('./middlewares/errorHandler');
const passportConfig = require('./config/passport'); // Importa la configuración de passport

dotenv.config();

const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Configuración de sesiones
app.use(session({
  secret: 'mysecret', // Cambia esto por algo más seguro en producción
  resave: false,
  saveUninitialized: false,
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Conecta a MongoDB
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
      },
    },
  },
  apis: ['./routes/*.js'], // Asegúrate de que tus archivos de rutas tengan las anotaciones Swagger
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
// console.log('Setting up Swagger docs...');

// Sirve la interfaz de Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Sirve el JSON de Swagger en /swagger.json
app.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpecs);
});

// Rutas de autenticación con GitHub
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs?login=success');
  }
);


// Rutas de API
app.use('/api', booksRoutes);
app.use('/api', usersRoutes);

// Global error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
