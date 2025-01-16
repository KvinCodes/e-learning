const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Institucion = require('./Institucion');
const EstudiantesNiveles = require('./EstudiantesNiveles');

const Estudiante = sequelize.define(
  'Estudiante',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id',
      },
    },
    contrasena: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true, 
    },
    genero: {
      type: DataTypes.ENUM('masculino', 'femenino'),
      allowNull: true, 
    },
    foto_perfil: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, 
    },
    institucion_id: {
      type: DataTypes.INTEGER,
      allowNull: true, 
      references: {
        model: 'instituciones',
        key: 'id',
      },
    },
    departamento: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    municipio: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
  },
  {
    tableName: 'estudiantes',
    timestamps: false,
  }
);

// Relación: Estudiante pertenece a una Institución
Estudiante.belongsTo(Institucion, {
  as: 'institucion',
  foreignKey: 'institucion_id',
});

// Relación: Estudiante tiene muchos niveles (a través de EstudiantesNiveles)
Estudiante.hasMany(EstudiantesNiveles, {
  as: 'nivelesRelacionados',
  foreignKey: 'estudiante_id',
});

// Métodos personalizados para reportes
Estudiante.prototype.toReporte = function () {
  return {
    id: this.id,
    nombreCompleto: `${this.nombre} ${this.apellido}`,
    correo: this.correo,
    institucion: this.institucion ? this.institucion.nombre : null,
    niveles: this.nivelesRelacionados || [],
    fechaRegistro: this.fecha_registro,
  };
};

// Métodos personalizados para perfiles
Estudiante.prototype.toPerfil = function () {
  return {
    id: this.id,
    nombre: this.nombre,
    apellido: this.apellido,
    correo: this.correo,
    genero: this.genero,
    fotoPerfil: this.foto_perfil,
    fechaNacimiento: this.fecha_nacimiento,
    institucion: this.institucion ? this.institucion.nombre : null,
    departamento: this.departamento,
    municipio: this.municipio,
  };
};

module.exports = Estudiante;
