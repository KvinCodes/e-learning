require('dotenv').config({ path: './src/.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('../config/db');
const departamentoRoutes = require('../api/routes/departamentosRoutes');
const municipioRoutes = require('../api/routes/municipiosRoutes');
const authRoutes = require("../api/routes/authRoutes");
const estudianteRoutes = require('../api/routes/EstudianteRoutes');
const materiasRoutes = require('../api/routes/materiaRoutes');
const nivelesRoutes = require('../api/routes/nivelesRoutes');
const institucionRoutes = require('../api/routes/institucionesRoutes');
const quizRoutes = require("./routes/quizRoutes");

console.log("Variables de entorno cargadas correctamente");

const app = express();

// Configuración de CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Middleware para manejar JSON
app.use(bodyParser.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use('/api/departamentos', departamentoRoutes);
app.use('/api/municipios', municipioRoutes);
app.use('/api/instituciones', institucionRoutes);
app.use('/api/estudiantes', estudianteRoutes);
app.use('/api/niveles', nivelesRoutes);
app.use('/api/materias', materiasRoutes);
app.use("/api/quizzes", quizRoutes);

// Conexión y sincronización con la base de datos
sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada correctamente');
  app.listen(process.env.API_PORT || 3001, () => {
    console.log(`Servidor ejecutándose en el puerto ${process.env.API_PORT || 3001}`);
  });
}).catch((error) => {
  console.error('Error al conectar con la base de datos:', error);
});
