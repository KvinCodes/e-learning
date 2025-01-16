const Nivel = require('../models/Nivel');
const Materia = require('../models/Materia');

exports.listarNiveles = async (req, res) => {
  try {
    const niveles = await Nivel.findAll({
      include: {
        model: Materia,
        as: 'materia', // El alias que definiste en la relación
        attributes: ['nombre'], // Solo obtener el nombre de la materia
      },
    });
    
    res.json(niveles);
  } catch (error) {
    console.error('Error al obtener niveles:', error);
    res.status(500).send({ message: "Error al obtener los datos de los niveles" });
  }
};