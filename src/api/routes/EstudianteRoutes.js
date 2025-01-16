const express = require('express');
const { body, param } = require('express-validator');
const EstudianteController = require('../controllers/EstudianteController');

const router = express.Router();

// Validaciones comunes
const validateIdParam = param('id').isInt().withMessage('El ID debe ser un número entero');
const validateCreateAndUpdate = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es obligatorio'),
  body('apellido')
    .notEmpty()
    .withMessage('El apellido es obligatorio'),
  body('correo')
    .isEmail()
    .withMessage('Debe ser un correo válido'),
  body('contrasena')
    .optional()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
];

// Rutas para operaciones CRUD del perfil de estudiante
router.get('/', EstudianteController.getAllEstudiantes); // Listar todos los estudiantes (perfil)
router.get('/:id', validateIdParam, EstudianteController.getEstudianteById); // Obtener un estudiante por ID (perfil)
router.post('/', validateCreateAndUpdate, EstudianteController.createEstudiante); // Crear un estudiante (perfil)
router.put('/:id', [validateIdParam, ...validateCreateAndUpdate], EstudianteController.updateEstudiante); // Actualizar un estudiante (perfil)
router.delete('/:id', validateIdParam, EstudianteController.deleteEstudiante); // Eliminar un estudiante (perfil)

// Ruta para el reporte de estudiantes
router.get('/reportes', EstudianteController.listarEstudiantes); // Generar reporte de estudiantes

module.exports = router;
