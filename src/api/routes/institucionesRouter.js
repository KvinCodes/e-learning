const express = require('express');
const InstitucionController = require('../controllers/institucionController');

const router = express.Router();

// Rutas para instituciones
router.get('/', InstitucionController.getAllInstituciones);
router.get('/:id', InstitucionController.getInstitucionById);
router.post('/', InstitucionController.createInstitucion);
router.put('/:id', InstitucionController.updateInstitucion);
router.delete('/:id', InstitucionController.deleteInstitucion);

module.exports = router;
