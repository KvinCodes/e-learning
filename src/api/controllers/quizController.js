const Materia = require("../models/Materia");
const Cuestionario = require("../models/Cuestionario");
const Pregunta = require("../models/Pregunta");
const OpcionRespuesta = require("../models/OpcionRespuesta");
const Nivel = require("../models/Nivel");
const NivelesCuestionarios = require("../models/NivelesCuestionarios");

// Crear un cuestionario
exports.createQuiz = async (req, res) => {
  const { theme, level, subject, description, questions } = req.body;

  if (!theme || !level || !subject || !description || !questions || questions.length === 0) {
    return res.status(400).json({ error: "Todos los campos son requeridos." });
  }

  try {
    const [materia] = await Materia.findOrCreate({
      where: { nombre: subject },
    });

    const [nivel] = await Nivel.findOrCreate({
      where: { nombre: level, materia_id: materia.id },
      defaults: { descripcion: `Nivel para ${subject}` },
    });

    const newQuiz = await Cuestionario.create({
      titulo: theme,
      nivel: level,
      descripcion: description,
      materia_id: materia.id,
    });

    await NivelesCuestionarios.create({
      nivel_id: nivel.id,
      cuestionario_id: newQuiz.id,
    });

    for (const question of questions) {
      const newQuestion = await Pregunta.create({
        contenido: question.question,
        tipo: question.type,
        cuestionario_id: newQuiz.id,
      });

      for (const option of question.options) {
        await OpcionRespuesta.create({
          contenido: option.text,
          es_correcta: option.isCorrect,
          pregunta_id: newQuestion.id,
        });
      }
    }

    res.status(201).json({ message: "Cuestionario creado con éxito." });
  } catch (error) {
    console.error("Error al crear el cuestionario:", error.message);
    res.status(500).json({ error: `No se pudo crear el cuestionario: ${error.message}` });
  }
};

// Obtener todos los cuestionarios
exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Cuestionario.findAll({
      include: [
        {
          model: Pregunta,
          include: [
            {
              model: OpcionRespuesta,
              attributes: ["id", "contenido", "es_correcta", "pregunta_id"],
            },
          ],
          attributes: ["id", "contenido", "tipo", "cuestionario_id"],
        },
      ],
      attributes: ["id", "titulo", "descripcion", "nivel", "materia_id"],
    });

    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error al obtener los cuestionarios:", error);
    res.status(500).json({ error: "No se pudieron obtener los cuestionarios." });
  }
};

// Obtener un cuestionario por ID
exports.getQuizById = async (req, res) => {
  try {
    const quizId = req.params.id;
    const quiz = await Cuestionario.findByPk(quizId, {
      include: [
        {
          model: Pregunta,
          include: [
            {
              model: OpcionRespuesta,
              attributes: ['id', 'contenido', 'es_correcta'],
            },
          ],
        },
        {
          model: Materia,
          attributes: ['nombre'],
        },
      ],
    });

    if (!quiz) {
      return res.status(404).json({ error: "Cuestionario no encontrado." });
    }

    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error al obtener el cuestionario:", error);
    res.status(500).json({ error: "No se pudo obtener el cuestionario." });
  }
};

// Enviar respuestas y calcular resultados
exports.submitAnswers = async (req, res) => {
  const quizId = req.params.id;
  const { answers, studentId } = req.body;

  try {
    let correctCount = 0;
    let totalQuestions = 0;

    // Obtener todas las preguntas y opciones correctas del cuestionario
    const questions = await Pregunta.findAll({
      where: { cuestionario_id: quizId },
      include: [
        {
          model: OpcionRespuesta,
          attributes: ["id", "es_correcta"],
        },
      ],
    });

    totalQuestions = questions.length;

    // Validar respuestas del estudiante
    questions.forEach((question) => {
      const correctOption = question.opciones_respuesta.find((opt) => opt.es_correcta === 1);
      if (answers[question.id] == correctOption.id) {
        correctCount++;
      }
    });

    res.status(200).json({
      message: "Respuestas procesadas con éxito",
      correctCount,
      totalQuestions,
      incorrectCount: totalQuestions - correctCount,
    });
  } catch (error) {
    console.error("Error al procesar las respuestas:", error);
    res.status(500).json({ error: "Error al procesar las respuestas." });
  }
};


    