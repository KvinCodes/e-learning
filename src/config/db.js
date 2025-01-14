const { Sequelize } = require("sequelize");
require('dotenv').config({ path: './src/.env' });

const sequelize = new Sequelize("plataformaaprendizaje", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

/*
const sequelize = new Sequelize(
  "plataformaaprendizaje", // Nombre de la base de datos
  "root",                  // Usuario
  "contraseña",           // Contraseña
  {
    host: "localhost",
    dialect: "mysql",
  }
);
*/

sequelize
  .authenticate()
  .then(() => console.log("Conexión a la base de datos exitosa."))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

module.exports = sequelize;