const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

// Ruta: POST /api/auth/signup
router.post("/signup", AuthController.register);

// Ruta: POST /api/auth/signin
router.post("/signin", AuthController.login);

module.exports = router;
