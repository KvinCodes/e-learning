const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db');
const Departamento = require('./Departamento'); // Importa el modelo Departamento

const Municipio = sequelize.define('Municipio', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: false,
});

Municipio.belongsTo(Departamento, { foreignKey: 'departamento_id' }); 
Departamento.hasMany(Municipio, { foreignKey: 'departamento_id' }); 

module.exports = Municipio;
