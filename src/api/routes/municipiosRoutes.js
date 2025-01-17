const express = require('express');
const { getAllMunicipios } = require('../controllers/municipioController'); // Importa el controlador
const router = express.Router();

router.get('/', getAllMunicipios); 

module.exports = router;
