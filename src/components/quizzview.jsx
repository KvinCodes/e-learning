import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const QuizView = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // Guardar las respuestas seleccionadas
  const [submissionStatus, setSubmissionStatus] = useState(null); // Estado del envío

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/api/quizzes/${quizId}`);
        setQuiz(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar el cuestionario", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleOptionChange = (questionIndex, selectedOption) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOption }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`/api/quizzes/${quizId}/submit`, { answers });
      setSubmissionStatus(response.data); // Respuesta del backend (p. ej., puntaje o feedback)
    } catch (error) {
      console.error("Error al enviar las respuestas", error);
      setSubmissionStatus({ error: "No se pudo enviar el cuestionario." });
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Cargando cuestionario...</p>;
  }

  if (!quiz) {
    return <p className="text-center text-gray-600">Cuestionario no encontrado.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{quiz.theme}</h1>
      <p className="text-gray-600 mb-6">
        Creado por: {quiz.professor} el {new Date(quiz.date).toLocaleDateString()}
      </p>

      <ul className="space-y-4">
        {quiz.questions.map((q, index) => (
          <li key={index} className="p-4 border rounded-lg">
            <p className="font-medium text-gray-800">{q.question}</p>
            <ul className="mt-2 space-y-1">
              {q.options.map((option, i) => (
                <li key={i}>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      onChange={() => handleOptionChange(index, option)}
                      className="form-radio"
                    />
                    <span>{option}</span>
                  </label>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
      >
        Enviar Respuestas
      </button>

      {submissionStatus && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          {submissionStatus.error ? (
            <p className="text-red-600">{submissionStatus.error}</p>
          ) : (
            <p className="text-green-600">Puntaje: {submissionStatus.score}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizView;
    