const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) { // Verifica si el usuario está autenticado
      return next(); // Si lo está, continúa con la siguiente función de la ruta
    }
    // Si no está autenticado, devuelve un error 401
    res.status(401).json({ message: 'Unauthorized' });
  };
  
  module.exports = isAuthenticated;
  