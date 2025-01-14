const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Municipio = require('./Municipio'); // Asegúrate de importar Municipio

const Institucion = sequelize.define(
  'Institucion',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    tipo: {
      type: DataTypes.ENUM('pública', 'privada'),
      allowNull: false,
    },
    municipio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Municipio,
        key: 'id',
      },
    },
  },
  {
    timestamps: false,
    tableName: 'instituciones',
  }
);

// Relación con Municipio
Institucion.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
Municipio.hasMany(Institucion, { foreignKey: 'municipio_id' });

module.exports = Institucion;
