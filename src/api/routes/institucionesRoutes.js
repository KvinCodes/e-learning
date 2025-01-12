const express = require('express');
const Institucion = require('../models/Institucion');
const Municipio = require('../models/Municipio');
const router = express.Router();

// Obtener todas las instituciones con su municipio
router.get('/', async (req, res) => {
  try {
    const instituciones = await Institucion.findAll({ include: Municipio });
    res.json(instituciones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
