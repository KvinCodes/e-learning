const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');
const Materia = require("./Materia");

const Nivel = sequelize.define("niveles", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  materia_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Materia, 
      key: "id",
    },
  },
}, {
  tableName: "niveles", // Asegura el uso del nombre correcto para la tabla
  timestamps: false, // Desactiva createdAt y updatedAt
});

// Relación: Materia tiene muchos Niveles
Materia.hasMany(Nivel, { foreignKey: "materia_id", as: "niveles" });

// Relación: Nivel pertenece a una Materia
Nivel.belongsTo(Materia, { foreignKey: "materia_id", as: "materia" });

module.exports = Nivel;
