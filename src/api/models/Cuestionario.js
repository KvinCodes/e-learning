const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');
const Materia = require("./Materia");

const Cuestionario = sequelize.define(
  "cuestionarios",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(150), 
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.TEXT, 
      allowNull: true, 
    },
    nivel: {
      type: DataTypes.ENUM('septimo', 'octavo', 'noveno', 'primer_ano', 'segundo_ano'), // Cambiado a ENUM
      allowNull: false,
    },
    materia_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: Materia,
        key: "id",
      },
    },
  },
  {
    tableName: "cuestionarios", 
    timestamps: false, 
  }
);

// Associations
Materia.hasMany(Cuestionario, { foreignKey: "materia_id" });
Cuestionario.belongsTo(Materia, { foreignKey: "materia_id" });

module.exports = Cuestionario;

