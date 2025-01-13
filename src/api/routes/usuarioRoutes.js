const express = require('express');
const UsuarioController = require('../controllers/usuarioController');

const router = express.Router();

// Rutas para CRUD de usuarios
router.get('/', UsuarioController.getAllUsuarios);
router.get('/:id', UsuarioController.getUsuarioById);
router.post('/', UsuarioController.createUsuario);
router.put('/:id', UsuarioController.updateUsuario);
router.delete('/:id', UsuarioController.deleteUsuario);

module.exports = router;
