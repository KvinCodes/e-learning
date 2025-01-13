const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');

const EstudianteController = {
  // Obtener todos los estudiantes
  getAllEstudiantes: async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll({
        attributes: [
          'id',
          'nombre_completo',
          'correo',
          'foto_perfil',
          'fecha_nacimiento',
          'genero',
          'institucion_id',
          'fecha_registro',
        ],
      });
      res.status(200).json(estudiantes);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      res.status(500).json({ error: 'Error al obtener estudiantes' });
    }
  },

  // Obtener un estudiante por ID
  getEstudianteById: async (req, res) => {
    const { id } = req.params;
    try {
      const estudiante = await Estudiante.findByPk(id, {
        attributes: [
          'id',
          'nombre_completo',
          'correo',
          'foto_perfil',
          'fecha_nacimiento',
          'genero',
          'institucion_id',
          'fecha_registro',
        ],
      });
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }
      res.status(200).json(estudiante);
    } catch (error) {
      console.error('Error al obtener estudiante:', error);
      res.status(500).json({ error: 'Error al obtener estudiante' });
    }
  },

  // Crear un nuevo estudiante
  createEstudiante: async (req, res) => {
    try {
      const {
        nombre_completo,
        correo,
        contrasena,
        fecha_nacimiento,
        genero,
        institucion_id,
        foto_perfil,
      } = req.body;

      // Validación básica
      if (!nombre_completo || !correo || !contrasena) {
        return res.status(400).json({ error: 'Los campos obligatorios son: nombre_completo, correo y contrasena' });
      }

      // Hashea la contraseña
      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const nuevoEstudiante = await Estudiante.create({
        nombre_completo,
        correo,
        contrasena: hashedPassword, // Almacena la contraseña hasheada
        fecha_nacimiento,
        genero,
        institucion_id,
        foto_perfil,
      });

      res.status(201).json(nuevoEstudiante);
    } catch (error) {
      console.error('Error al crear estudiante:', error);
      res.status(500).json({ error: 'Error al crear estudiante' });
    }
  },

  // Actualizar un estudiante
  updateEstudiante: async (req, res) => {
    const { id } = req.params;
    const {
      nombre_completo,
      correo,
      contrasena,
      fecha_nacimiento,
      genero,
      institucion_id,
      foto_perfil,
    } = req.body;

    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }

      // Actualiza solo los campos proporcionados
      estudiante.nombre_completo = nombre_completo || estudiante.nombre_completo;
      estudiante.correo = correo || estudiante.correo;

      // Si se proporciona una nueva contraseña, hashearla antes de almacenarla
      if (contrasena) {
        estudiante.contrasena = await bcrypt.hash(contrasena, 10);
      }

      estudiante.fecha_nacimiento = fecha_nacimiento || estudiante.fecha_nacimiento;
      estudiante.genero = genero || estudiante.genero;
      estudiante.institucion_id = institucion_id || estudiante.institucion_id;
      estudiante.foto_perfil = foto_perfil || estudiante.foto_perfil;

      await estudiante.save();

      res.status(200).json(estudiante);
    } catch (error) {
      console.error('Error al actualizar estudiante:', error);
      res.status(500).json({ error: 'Error al actualizar estudiante' });
    }
  },

  // Eliminar un estudiante
  deleteEstudiante: async (req, res) => {
    const { id } = req.params;

    try {
      const estudiante = await Estudiante.findByPk(id);
      if (!estudiante) {
        return res.status(404).json({ error: 'Estudiante no encontrado' });
      }

      await estudiante.destroy();
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar estudiante:', error);
      res.status(500).json({ error: 'Error al eliminar estudiante' });
    }
  },
};

module.exports = EstudianteController;
