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
      type: DataTypes.TEXT, 
      allowNull: false,
    },
    es_correcta: {
      type: DataTypes.TINYINT, 
      allowNull: false,
    },
    pregunta_id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      references: {
        model: Pregunta,
        key: "id",
      },
    },
  },
  {
    tableName: "opciones_respuesta", 
    timestamps: false, 
  }
);

// Associations
Pregunta.hasMany(OpcionRespuesta, { foreignKey: "pregunta_id" });
OpcionRespuesta.belongsTo(Pregunta, { foreignKey: "pregunta_id" });

module.exports = OpcionRespuesta;
