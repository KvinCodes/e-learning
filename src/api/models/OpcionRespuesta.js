const sequelize = require('../../config/db');
const { DataTypes } = require("sequelize");
const Pregunta = require("./Pregunta");

const OpcionRespuesta = sequelize.define(
  "opciones_respuesta",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    contenido: {
      type: DataTypes.TEXT, // Matches `text` type in SQL
      allowNull: false,
    },
    es_correcta: {
      type: DataTypes.TINYINT, // Matches `tinyint(1)` in SQL
      allowNull: false,
    },
    pregunta_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Matches `NOT NULL` constraint
      references: {
        model: Pregunta,
        key: "id",
      },
    },
  },
  {
    tableName: "opciones_respuesta", // Explicitly set the table name
    timestamps: false, // Disable createdAt and updatedAt
  }
);

// Associations
Pregunta.hasMany(OpcionRespuesta, { foreignKey: "pregunta_id" });
OpcionRespuesta.belongsTo(Pregunta, { foreignKey: "pregunta_id" });

module.exports = OpcionRespuesta;
