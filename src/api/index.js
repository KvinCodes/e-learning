require('dotenv').config({ path: './src/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../config/db');
const departamentoRoutes = require('../api/routes/departamentosRoutes');
const municipioRoutes = require('../api/routes/municipiosRoutes');
const institucionRoutes = require('../api/routes/institucionesRoutes');
const authRoutes = require("../api/routes/authRoutes");
const authMiddleware = require("../api/middlewares/authMiddlewares");

console.log("Variables de entorno:", process.env);

const app = express();

//app.use(cors());
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:3000' })); // Configura el origen


// Rutas
app.use("/api/auth", authRoutes);
app.use(authMiddleware); // Middleware global para proteger rutas
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/instituciones', institucionRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
  app.listen(process.env.API_PORT || 3001, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.API_PORT || 3001}`);
  });
});
