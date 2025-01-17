const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');

const Departamento = sequelize.define('Departamento', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false, 
});

module.exports = Departamento;

