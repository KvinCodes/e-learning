const roleMiddleware = (rolesPermitidos) => {
    return (req, res, next) => {
      const userRole = req.user?.rol;
  
      if (!userRole || !rolesPermitidos.includes(userRole)) {
        return res.status(403).json({
          success: false,
          message: "No tienes permisos para acceder a esta ruta",
        });
      }
  
      next();
    };
  };
  
  module.exports = roleMiddleware;
  