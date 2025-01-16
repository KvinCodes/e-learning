const express = require("express");
const quizController = require("../controllers/quizController"); // Importar el controlador

const router = express.Router();

// Ruta para crear un cuestionario
router.post("/", quizController.createQuiz);

//Ruta para procesar respuestas
router.post("/:id/submit", quizController.submitAnswers);


// Ruta para obtener todos los cuestionarios
router.get("/", quizController.getQuizzes); // Asegúrate de que getQuizzes esté definido

router.get("/:id", quizController.getQuizById);

module.exports = router;
