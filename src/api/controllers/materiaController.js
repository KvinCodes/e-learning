const Materia = require('../models/Materia');

exports.listarMaterias = async (req, res) => {
  try {
    const materias = await Materia.findAll();
    res.json(materias);
  } catch (error) {
    console.error('Error al obtener materias:', error);
    res.status(500).send({ message: "Error al obtener los datos de las materias" });
  }
};