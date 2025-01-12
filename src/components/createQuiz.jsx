import React, { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [professor, setProfessor] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleAddQuestion = () => {
    if (!currentQuestion || !correctAnswer || currentOptions.some((opt) => !opt)) {
      alert("Completa todos los campos antes de añadir la pregunta.");
      return;
    }

    const newQuestion = {
      question: currentQuestion,
      options: currentOptions,
      answer: correctAnswer,
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setCurrentOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleSubmitQuiz = async () => {
    if (!quizTitle || !professor || questions.length === 0) {
      alert("Completa todos los campos antes de guardar el cuestionario.");
      return;
    }

    const newQuiz = {
      theme: quizTitle,
      professor,
      questions,
    };

    try {
      const response = await axios.post("/api/quizzes", newQuiz);
      alert("Cuestionario creado con éxito");
    } catch (error) {
      console.error("Error al crear el cuestionario", error);
      alert("No se pudo crear el cuestionario.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Crear Cuestionario</h1>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Título del Cuestionario</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Escribe el título"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Profesor</label>
        <input
          type="text"
          value={professor}
          onChange={(e) => setProfessor(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Escribe el nombre del profesor"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Pregunta</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Escribe la pregunta"
        />
      </div>

      <div className="mb-4">
        {currentOptions.map((option, index) => (
          <div key={index} className="mb-2">
            <label className="block text-gray-700 font-medium mb-1">Opción {index + 1}</label>
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updatedOptions = [...currentOptions];
                updatedOptions[index] = e.target.value;
                setCurrentOptions(updatedOptions);
              }}
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder={`Escribe la opción ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Respuesta Correcta</label>
        <select
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>
            Selecciona la respuesta correcta
          </option>
          {currentOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mb-4"
      >
        Añadir Pregunta
      </button>

      <button
        onClick={handleSubmitQuiz}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
      >
        Guardar Cuestionario
      </button>

      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-2">Preguntas Añadidas:</h2>
          <ul className="list-disc pl-5">
            {questions.map((q, index) => (
              <li key={index} className="mb-1">
                {q.question}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CreateQuiz;
