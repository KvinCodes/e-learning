const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Municipio = require('./Municipio');

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
      allowNull: true, // Se mantiene como opcional
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
    tableName: 'instituciones',
    timestamps: false,
  }
);

// Relación: Institución pertenece a un Municipio
Institucion.belongsTo(Municipio, { foreignKey: 'municipio_id', as: 'municipio' });
// Relación: Municipio tiene muchas Instituciones
Municipio.hasMany(Institucion, { foreignKey: 'municipio_id', as: 'instituciones' });

module.exports = Institucion;
