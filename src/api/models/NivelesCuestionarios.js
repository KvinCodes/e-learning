const Cuestionario = require("./Cuestionario");
const Nivel = require("./Nivel");
const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');

const NivelesCuestionarios = sequelize.define("niveles_cuestionarios", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nivel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Nivel,
      key: "id",
    },
  },
  cuestionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Cuestionario,
      key: "id",
    },
  },
  fecha_asignacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, // Configuración global para desactivar createdAt y updatedAt
});

Nivel.hasMany(NivelesCuestionarios, { foreignKey: "nivel_id" });
NivelesCuestionarios.belongsTo(Nivel, { foreignKey: "nivel_id" });

Cuestionario.hasMany(NivelesCuestionarios, { foreignKey: "cuestionario_id" });
NivelesCuestionarios.belongsTo(Cuestionario, { foreignKey: "cuestionario_id" });

module.exports = NivelesCuestionarios;
