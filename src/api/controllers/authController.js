const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");
const { validateEmail, validatePassword } = require("../../utils/validators");

const AuthController = {};

const roleAssignmentByEmail = (email) => {
  const domain = email.split("@")[1].toLowerCase();
  if (domain === "adminlearn.com") return "Administrador";
  return "Estudiante"; // Rol por defecto
};

// REGISTRO (SignUp)
AuthController.register = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    // Input validation
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Email inválido" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, message: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial" });
    }

    // Verificar si el usuario ya existe por email
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    // Hashear contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const role = roleAssignmentByEmail(email);

    // Crear usuario
    const newUser = await User.create({
      email,
      contrasena: hashedPassword,
      rol: role,
    });

    return res.status(201).json({
      success: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser.id,
        email: newUser.email,
        rol: newUser.rol,
      },
    });
  } catch (error) {
    console.error("Error en AuthController.register:", error);
    return res.status(500).json({ success: false, message: "Error al registrar el usuario" });
  }
};

// INICIO DE SESIÓN (SignIn)
AuthController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!validateEmail(email) || !password) {
      return res.status(400).json({ success: false, message: "Email o contraseña inválidos" });
    }

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Comparar password con el hash en la base
    const validPassword = await bcrypt.compare(password, user.contrasena);
    if (!validPassword) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Crear JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        rol: user.rol,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error en AuthController.login:", error);
    return res.status(500).json({ success: false, message: "Error al iniciar sesión" });
  }
};

module.exports = AuthController;