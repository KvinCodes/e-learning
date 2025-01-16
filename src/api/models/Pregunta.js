const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');
const Cuestionario = require("./Cuestionario");

const Pregunta = sequelize.define(
  "preguntas",
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
    tipo: {
      type: DataTypes.STRING, // Cambiado de ENUM a VARCHAR
      allowNull: false,
    },

    cuestionario_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Matches `NOT NULL` constraint
      references: {
        model: Cuestionario,
        key: "id",
      },
    },
  },
  {
    tableName: "preguntas", // Explicitly set the table name
    timestamps: false, // Disable createdAt and updatedAt
  }
);

// Associations
Cuestionario.hasMany(Pregunta, { foreignKey: "cuestionario_id" });
Pregunta.belongsTo(Cuestionario, { foreignKey: "cuestionario_id" });

module.exports = Pregunta;
