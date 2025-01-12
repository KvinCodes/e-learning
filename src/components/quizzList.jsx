import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get("/api/quizzes"); // Cambiar al endpoint real de tu API
        setQuizzes(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los cuestionarios", error);
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando cuestionarios...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div
            key={quiz.id}
            onClick={() => navigate(`/quiz/${quiz.id}`)}
            className="cursor-pointer p-6 bg-white border border-gray-300 rounded-lg shadow-md hover:bg-blue-50 hover:shadow-lg transition duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">{quiz.theme}</h2>
            <p className="text-gray-600">Profesor: {quiz.professor}</p>
            <p className="text-gray-600">Fecha: {new Date(quiz.date).toLocaleDateString()}</p>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-600">No hay cuestionarios disponibles.</p>
      )}
    </div>
  );
};

export default QuizList;
