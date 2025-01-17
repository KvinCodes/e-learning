import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizDetail = ({ studentId }) => {
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
      if (!studentId) {
        alert("No se encontró el ID del estudiante. Por favor, inicia sesión.");
        return;
      }

      const response = await axios.post(`http://localhost:3001/api/quizzes/${id}/submit`, {
        answers,
        studentId,
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
<div className="relative min-h-screen flex items-center justify-center">
  <div
    className="absolute inset-0 h-[170vh]"
    style={{
      backgroundImage: "url('./img/fondo.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  ></div>
  <div className="absolute inset-0 h-[170vh] bg-green-500/50"></div> {/* Transparencia encima */}
  <div className="relative max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg">
    <h1 className="text-center text-lime-700 text-2xl font-medium">Cargando...</h1>
  </div>
</div>

    );

  if (error)
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 h-[170vh]"
          style={{
            backgroundImage: "url('./img/fondo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 h-[170vh] bg-green-500/50"></div>
        <div className="relative max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-center text-red-700 text-2xl font-medium">{error}</h1>
        </div>
      </div>
    );

  if (!quiz)
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <div
          className="absolute inset-0 h-[170vh]"
          style={{
            backgroundImage: "url('./img/fondo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div className="absolute inset-0 h-[170vh] bg-green-500/50"></div>
        <div className="relative max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg">
          <h1 className="text-center text-gray-700 text-2xl font-medium">No se encontró el cuestionario</h1>
        </div>
      </div>
    );

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div
        className="absolute inset-0 h-[170vh]"
        style={{
          backgroundImage: "url('./img/fondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="absolute inset-0 h-[170vh] bg-green-500/50"></div>
      <div
        className="relative max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg mt-16"
        style={{ transform: "translateY(65px)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4" style={{ fontFamily: '"Lato", serif', fontWeight: 900, fontSize: '40px', color: '#052e16' }}>
          {quiz.titulo}
        </h1>

        <p className="text-center text-lime-700 mb-6">{quiz.descripcion}</p>

        <h2 className="text-xl font-bold mb-4">Preguntas</h2>

        {quiz.preguntas && quiz.preguntas.length > 0 ? (
          quiz.preguntas.map((pregunta, index) => (
            <div key={pregunta.id} className="mb-6">
              <p className="text-lime-700 mb-2 font-medium">{`${index + 1}. ${pregunta.contenido}`}</p>
              {pregunta.opciones_respuesta.map((opcion) => (
                <label key={opcion.id} className="block mb-2">
                  <input
                    type="radio"
                    name={`question-${pregunta.id}`}
                    value={opcion.id}
                    checked={answers[pregunta.id] === opcion.id}
                    onChange={() => handleAnswerChange(pregunta.id, opcion.id)}
                    className="mr-2"
                  />
                  {opcion.contenido}
                </label>
              ))}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No hay preguntas disponibles.</p>
        )}

        <div className="mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-800 w-full"
          >
            Enviar Respuestas
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;


