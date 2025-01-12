const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Municipio = require('./Municipio');

const Institucion = sequelize.define('Institucion', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
  },
});

Institucion.belongsTo(Municipio, { foreignKey: 'municipio_id' });

module.exports = Institucion;
