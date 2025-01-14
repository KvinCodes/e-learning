const Institucion = require('../models/Institucion');
const Municipio = require('../models/Municipio');

const InstitucionController = {
  // Obtener todas las instituciones
  getAllInstituciones: async (req, res) => {
    try {
      const instituciones = await Institucion.findAll({
        include: [{ model: Municipio, as: 'municipio' }],
      });

      if (!instituciones || instituciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron instituciones' });
      }

      res.status(200).json(instituciones);
    } catch (error) {
      console.error('Error al obtener instituciones:', error);
      res.status(500).json({ error: 'Error al obtener instituciones' });
    }
  },

  // Obtener instituciones por municipio
  getInstitucionesByMunicipio: async (req, res) => {
    const { municipioId } = req.params;

    try {
      const instituciones = await Institucion.findAll({
        where: { municipio_id: municipioId },
        include: [{ model: Municipio, as: 'municipio' }],
      });

      if (!instituciones || instituciones.length === 0) {
        return res.status(404).json({ message: 'No se encontraron instituciones para este municipio' });
      }

      res.status(200).json(instituciones);
    } catch (error) {
      console.error('Error al obtener instituciones por municipio:', error);
      res.status(500).json({ error: 'Error al obtener instituciones por municipio' });
    }
  },

  // Crear una nueva institución
  createInstitucion: async (req, res) => {
    const { nombre, direccion, municipio_id, tipo } = req.body;

    try {
      const nuevaInstitucion = await Institucion.create({
        nombre,
        direccion,
        municipio_id,
        tipo,
      });

      res.status(201).json(nuevaInstitucion);
    } catch (error) {
      console.error('Error al crear institución:', error);
      res.status(500).json({ error: 'Error al crear institución' });
    }
  },

  // Actualizar una institución existente
  updateInstitucion: async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, municipio_id, tipo } = req.body;

    try {
      const institucion = await Institucion.findByPk(id);

      if (!institucion) {
        return res.status(404).json({ message: 'Institución no encontrada' });
      }

      institucion.nombre = nombre || institucion.nombre;
      institucion.direccion = direccion || institucion.direccion;
      institucion.municipio_id = municipio_id || institucion.municipio_id;
      institucion.tipo = tipo || institucion.tipo;

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
        return res.status(404).json({ message: 'Institución no encontrada' });
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
