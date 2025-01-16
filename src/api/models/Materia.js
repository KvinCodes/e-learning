const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');

const Materia = sequelize.define("materias", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: "materias",
    timestamps: false,
});

module.exports = Materia;