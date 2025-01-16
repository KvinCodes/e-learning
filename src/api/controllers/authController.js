const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Usuario");
const Estudiante = require("../models/estudiante");
const Administrador = require("../models/Administrador");
const { validateEmail, validatePassword } = require("../../utils/validators");

const AuthController = {};

// Función para asignar roles
const roleAssignmentByEmail = (email) => {
  const domain = email.split("@")[1].toLowerCase();
  if (domain === "adminlearn.com") return "Administrador";
  return "Estudiante"; // Rol por defecto
};

// REGISTRO
AuthController.register = async (req, res) => {
  try {
    const { email, password, nombre, apellido, fechaNacimiento, genero, institucion_id } = req.body;

    // Validación de entrada
    if (!validateEmail(email)) {
      return res.status(400).json({ success: false, message: "Email inválido" });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ success: false, message: "Contraseña inválida" });
    }

    // Verificar existencia del usuario
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ success: false, message: "El usuario ya existe" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const role = roleAssignmentByEmail(email);
    const newUser = await User.create({ email, contrasena: hashedPassword, rol: role });

    // Crear perfil según el rol
    if (role === "Estudiante") {
      await Estudiante.create({
        usuario_id: newUser.id,
        nombre,
        apellido,
        correo: newUser.email,
        contrasena: newUser.contrasena,
        fecha_nacimiento: fechaNacimiento,
        genero,
        fecha_registro: new Date(),
        institucion_id,
      });
    } else if (role === "Administrador") {
      await Administrador.create({
        usuario_id: newUser.id,
        nombre,
        apellido,
        correo: newUser.email, // Pasa el correo del usuario aquí
        contrasena: newUser.contrasena, // Pasa la contraseña encriptada
      });
    }

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
    console.error("Error en registro:", error);
    return res.status(500).json({ success: false, message: "Error al registrar usuario" });
  }
};

// INICIO DE SESIÓN
AuthController.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.contrasena))) {
      return res.status(401).json({ success: false, message: "Credenciales inválidas" });
    }

    // Crear token JWT
    const token = jwt.sign({ userId: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "8h" });

    // Obtener perfil según el rol
    let perfil = null;
    if (user.rol === "Estudiante") {
      perfil = await Estudiante.findOne({ where: { usuario_id: user.id } });
    } else if (user.rol === "Administrador") {
      perfil = await Administrador.findOne({ where: { usuario_id: user.id } });
    }

    return res.status(200).json({ success: true, token, user: { id: user.id, rol: user.rol }, perfil });
  } catch (error) {
    console.error("Error en inicio de sesión:", error);
    return res.status(500).json({ success: false, message: "Error al iniciar sesión" });
  }
};

AuthController.verify = async (req, res) => {
  try {
      // Obtener el token del encabezado Authorization
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
          return res.status(401).json({ success: false, message: "No autorizado: Token no proporcionado" });
      }

      // Verificar el token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar al usuario en la base de datos
      const user = await User.findByPk(decoded.userId);

      if (!user) {
          return res.status(404).json({ success: false, message: "Usuario no encontrado" });
      }

      // Devolver la información del usuario
      return res.status(200).json({
          success: true,
          user: {
              id: user.id,
              email: user.email,
              rol: user.rol,
          },
      });
  } catch (error) {
      console.error("Error en la verificación del token:", error);
      return res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

module.exports = AuthController;
