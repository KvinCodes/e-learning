const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize("plataformaaprendizaje", process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => console.log("Conexión a la base de datos exitosa."))
  .catch((err) => console.error("Error al conectar a la base de datos:", err));

module.exports = sequelize;
