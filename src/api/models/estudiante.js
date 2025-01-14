const { Model, DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

class Estudiante extends Model {}

Estudiante.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fecha_nacimiento: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    genero: {
      type: DataTypes.ENUM('masculino', 'femenino', 'otro'),
      allowNull: true,
    },
    foto_perfil: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    },
    institucion_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'estudiantes', // Asegúrate de que el nombre coincide
    timestamps: false,
  },
);

module.exports = Estudiante;
