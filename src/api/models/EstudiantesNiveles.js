const { DataTypes } = require("sequelize");
const sequelize = require('../../config/db');
const Nivel = require('./Nivel');

const EstudiantesNiveles = sequelize.define("estudiantes_niveles", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'estudiantes',
            key: 'id',
        },
    },
    nivel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'niveles',
            key: 'id',
        },
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: "estudiantes_niveles",
    timestamps: false,
});

EstudiantesNiveles.belongsTo(Nivel, { foreignKey: 'nivel_id', as: 'nivel' });

module.exports = EstudiantesNiveles;