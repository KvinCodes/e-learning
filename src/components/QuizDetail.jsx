import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

const QuizDetail = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/quizzes/${id}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar el cuestionario:", err);
        setError("Error al cargar el cuestionario");
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (questionId, optionId) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3001/api/quizzes/${id}/submit`, {
        answers,
        studentId: 1, // Cambia esto con el ID real del estudiante si está disponible
      });

      const { correctCount, totalQuestions, incorrectCount } = response.data;

      alert(
        `Respuestas procesadas.\nCorrectas: ${correctCount}\nIncorrectas: ${incorrectCount}\nTotal: ${totalQuestions}`
      );
    } catch (error) {
      console.error("Error al enviar respuestas:", error);
      alert("Error al procesar las respuestas. Inténtalo de nuevo.");
    }
  };

  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );

  if (!quiz)
    return (
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography>No se encontró el cuestionario</Typography>
      </Box>
    );

  return (
    <Box sx={{ padding: 4, maxWidth: 800, margin: "auto" }}>
      <Typography variant="h4" textAlign="center" marginBottom={4}>
        {quiz.titulo}
      </Typography>

      <Typography variant="body1" textAlign="center" marginBottom={4}>
        {quiz.descripcion}
      </Typography>

      <Typography variant="h6" marginBottom={2}>
        Preguntas
      </Typography>

      {quiz.preguntas && quiz.preguntas.length > 0 ? (
        quiz.preguntas.map((pregunta, index) => (
          <Box key={pregunta.id} sx={{ marginBottom: 4 }}>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {`${index + 1}. ${pregunta.contenido}`}
            </Typography>
            {pregunta.opciones_respuesta &&
              pregunta.opciones_respuesta.map((opcion) => (
                <label key={opcion.id} style={{ display: "block", marginBottom: 4 }}>
                  <input
                    type="radio"
                    name={`question-${pregunta.id}`}
                    value={opcion.id}
                    checked={answers[pregunta.id] === opcion.id}
                    onChange={() => handleAnswerChange(pregunta.id, opcion.id)}
                    style={{ marginRight: 8 }}
                  />
                  {opcion.contenido}
                </label>
              ))}
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No hay preguntas disponibles.
        </Typography>
      )}

      <Divider sx={{ marginBottom: 4 }} />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
      >
        Enviar Respuestas
      </Button>
    </Box>
  );
};

export default QuizDetail;

