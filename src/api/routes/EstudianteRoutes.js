const express = require('express');
const { body, param } = require('express-validator');
const EstudianteController = require('../controllers/EstudianteController');

const router = express.Router();

// Validaciones comunes
const validateIdParam = param('id').isInt().withMessage('El ID debe ser un número entero');
const validateCreateAndUpdate = [
  body('nombre_completo').notEmpty().withMessage('El nombre completo es obligatorio'),
  body('correo').isEmail().withMessage('Debe ser un correo válido'),
  body('contrasena')
    .optional()
    .isLength({ min: 8 })
    .withMessage('La contraseña debe tener al menos 8 caracteres'),
];

// Rutas para estudiantes
router.get('/', EstudianteController.getAllEstudiantes);
router.get('/:id', validateIdParam, EstudianteController.getEstudianteById);
router.post('/', validateCreateAndUpdate, EstudianteController.createEstudiante);
router.put('/:id', [validateIdParam, ...validateCreateAndUpdate], EstudianteController.updateEstudiante);
router.delete('/:id', validateIdParam, EstudianteController.deleteEstudiante);

module.exports = router;
