const Departamento = require('../models/Departamento');

exports.getAllDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll();
    res.json(departamentos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
