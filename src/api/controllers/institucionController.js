const Institucion = require('../models/Institucion');

const InstitucionController = {
  // Obtener todas las instituciones
  getAllInstituciones: async (req, res) => {
    try {
      const instituciones = await Institucion.findAll();
      res.status(200).json(instituciones);
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
      res.status(500).json({ error: 'Error al obtener instituciones' });
    }
  },

  // Obtener una institución por ID
  getInstitucionById: async (req, res) => {
    const { id } = req.params;
    try {
      const institucion = await Institucion.findByPk(id);
      if (!institucion) {
        return res.status(404).json({ error: 'Institución no encontrada' });
      }
      res.status(200).json(institucion);
    } catch (error) {
      console.error('Error al obtener institución:', error);
      res.status(500).json({ error: 'Error al obtener institución' });
    }
  },

  // Crear una nueva institución
  createInstitucion: async (req, res) => {
    const { nombre, direccion, municipio, departamento } = req.body;
    try {
      const nuevaInstitucion = await Institucion.create({
        nombre,
        direccion,
        municipio,
        departamento,
      });
      res.status(201).json(nuevaInstitucion);
    } catch (error) {
      console.error('Error al crear institución:', error);
      res.status(500).json({ error: 'Error al crear institución' });
    }
  },

  // Actualizar una institución
  updateInstitucion: async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, municipio, departamento } = req.body;

    try {
      const institucion = await Institucion.findByPk(id);
      if (!institucion) {
        return res.status(404).json({ error: 'Institución no encontrada' });
      }

      institucion.nombre = nombre || institucion.nombre;
      institucion.direccion = direccion || institucion.direccion;
      institucion.municipio = municipio || institucion.municipio;
      institucion.departamento = departamento || institucion.departamento;

      await institucion.save();
      res.status(200).json(institucion);
    } catch (error) {
      console.error('Error al actualizar institución:', error);
      res.status(500).json({ error: 'Error al actualizar institución' });
    }
  },

  // Eliminar una institución
  deleteInstitucion: async (req, res) => {
    const { id } = req.params;

    try {
      const institucion = await Institucion.findByPk(id);
      if (!institucion) {
        return res.status(404).json({ error: 'Institución no encontrada' });
      }

      await institucion.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar institución:', error);
      res.status(500).json({ error: 'Error al eliminar institución' });
    }
  },
};

module.exports = InstitucionController;
