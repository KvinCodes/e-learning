const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // Obtener el header Authorization: Bearer <token>
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // quitar "Bearer"

  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Guardar la info del token decodificada en req.user
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;