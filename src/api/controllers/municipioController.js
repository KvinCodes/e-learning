const Municipio = require('../models/Municipio');
const Departamento = require('../models/Departamento');

exports.getAllMunicipios = async (req, res) => {
  try {
    const municipios = await Municipio.findAll({ include: Departamento }); // Incluye el modelo Departamento
    res.json(municipios);
  } catch (error) {
    console.error("Error al obtener municipios:", error);
    res.status(500).json({ error: error.message });
  }
};
