const bcrypt = require('bcryptjs');
const Estudiante = require('../models/estudiante');
const Institucion = require('../models/Institucion');
const Municipio = require('../models/Municipio');
const EstudiantesNiveles = require('../models/EstudiantesNiveles');
const Nivel = require('../models/Nivel');
const Materia = require('../models/Materia');

const EstudianteController = {
  // Obtener todos los estudiantes
  getAllEstudiantes: async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll({
        attributes: [
          'id',
          'nombre',
          'apellido',
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
          'nombre',
          'apellido',
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
        nombre,
        apellido,
        correo,
        contrasena,
        fecha_nacimiento,
        genero,
        institucion_id,
        foto_perfil,
      } = req.body;

      if (!nombre || !apellido || !correo || !contrasena) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const hashedPassword = await bcrypt.hash(contrasena, 10);

      const nuevoEstudiante = await Estudiante.create({
        nombre,
        apellido,
        correo,
        contrasena: hashedPassword,
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
      nombre,
      apellido,
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

      estudiante.nombre = nombre || estudiante.nombre;
      estudiante.apellido = apellido || estudiante.apellido;
      estudiante.correo = correo || estudiante.correo;

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

  // Listar estudiantes para reportes
  listarEstudiantes: async (req, res) => {
    try {
      const estudiantes = await Estudiante.findAll({
        include: [
          {
            model: Institucion,
            as: 'institucion',
            include: [
              {
                model: Municipio,
                as: 'municipio',
                attributes: ['nombre'],
              },
            ],
            attributes: ['nombre', 'tipo'],
          },
          {
            model: EstudiantesNiveles,
            as: 'nivelesRelacionados',
            include: [
              {
                model: Nivel,
                as: 'nivel',
                include: [
                  {
                    model: Materia,
                    as: 'materia',
                    attributes: ['nombre'],
                  },
                ],
                attributes: ['nombre'],
              },
            ],
          },
        ],
      });

      const estudiantesConEdad = estudiantes.map(estudiante => {
        const today = new Date();
        const birthDate = new Date(estudiante.fecha_nacimiento);
        const age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        const edad = m < 0 || (m === 0 && today.getDate() < birthDate.getDate()) ? age - 1 : age;

        return {
          ...estudiante.toJSON(),
          edad,
        };
      });

      res.json(estudiantesConEdad);
    } catch (error) {
      console.error('Error al obtener estudiantes:', error);
      res.status(500).json({ error: `Error al obtener los datos de los estudiantes: ${error.message}` });
    }
  },
};

module.exports = EstudianteController;
