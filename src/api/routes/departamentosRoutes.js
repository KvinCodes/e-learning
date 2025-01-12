const express = require('express');
const Departamento = require('../models/Departamento');
const router = express.Router();

// Obtener todos los departamentos
router.get('/', async (req, res) => {
  try {
    const departamentos = await Departamento.findAll();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
