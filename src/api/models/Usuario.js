const { DataTypes } = require("sequelize");
const sequelize = require("../../config/db"); 

const User = sequelize.define("usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  rol: {
    type: DataTypes.ENUM("Admin", "Estudiante"),
    defaultValue: "Estudiante",
  },
},

  {
    timestamps: false,
    freezeTableName: true
  }
);

module.exports = User;
