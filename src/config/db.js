const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

// Obtiene el entorno actual (por defecto "development")
const env = process.env.NODE_ENV || 'development';
const { username, password, database, host, dialect } = config[env];

// Crea la conexión Sequelize
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((err) => console.error('Error al conectar a la base de datos:', err));

module.exports = sequelize;
