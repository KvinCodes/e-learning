const express = require('express');
const { getAllMunicipios } = require('../controllers/municipioController'); // Importa el controlador
const router = express.Router();

router.get('/', getAllMunicipios); // Usa el controlador para manejar la solicitud GET

module.exports = router;
