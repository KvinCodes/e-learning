const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddlewares");
const roleMiddleware = require("../middlewares/roleMiddleware");

// Rutas públicas
router.post("/signup", AuthController.register);
router.post("/signin", AuthController.login);

// Ruta para verificar el token y obtener información del usuario
router.get("/verify", AuthController.verify);

// Rutas protegidas
router.get(
  "/admin-dashboard",
  authMiddleware,
  roleMiddleware(["Admin"]),
  (req, res) => {
    res.status(200).json({ message: "Bienvenido al panel de administrador" });
  }
);

router.get(
  "/instructor-dashboard",
  authMiddleware,
  roleMiddleware(["Instructor"]),
  (req, res) => {
    res.status(200).json({ message: "Bienvenido al panel de instructor" });
  }
);

module.exports = router;

