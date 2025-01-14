const express = require('express');
const InstitucionController = require('../controllers/institucionController');

const router = express.Router();

// Rutas para instituciones
router.get('/', InstitucionController.getAllInstituciones); // Obtener todas las instituciones
router.get('/municipio/:municipioId', InstitucionController.getInstitucionesByMunicipio); // Instituciones por municipio
router.post('/', InstitucionController.createInstitucion); // Crear institución
router.put('/:id', InstitucionController.updateInstitucion); // Actualizar institución
router.delete('/:id', InstitucionController.deleteInstitucion); // Eliminar institución

module.exports = router;
