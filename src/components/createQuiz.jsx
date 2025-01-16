import React, { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState(""); // Campo de descripción
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const levelMap = {
    septimo: "septimo",
    octavo: "octavo",
    noveno: "noveno",
    primer_ano: "primer_ano",
    segundo_ano: "segundo_ano",
  };

  const handleAddQuestion = () => {
    if (!currentQuestion || !correctAnswer || currentOptions.some((opt) => !opt)) {
      alert("Completa todos los campos antes de añadir la pregunta.");
      return;
    }

    const newQuestion = {
      question: currentQuestion,
      type: "opcion_multiple",
      options: currentOptions.map((option) => ({
        text: option,
        isCorrect: option === correctAnswer,
      })),
    };

    setQuestions([...questions, newQuestion]);
    setCurrentQuestion("");
    setCurrentOptions(["", "", "", ""]);
    setCorrectAnswer("");
  };

  const handleSubmitQuiz = async () => {
    if (!quizTitle || !description || !level || !subject || questions.length === 0) {
      alert("Completa todos los campos antes de guardar el cuestionario.");
      return;
    }

    const mappedLevel = levelMap[level];
    if (!mappedLevel) {
      alert("Nivel inválido seleccionado.");
      return;
    }

    const newQuiz = {
      theme: quizTitle,
      description, // Agregar la descripción
      level: mappedLevel,
      subject,
      questions: questions.map((q) => ({
        question: q.question,
        type: q.type,
        options: q.options,
      })),
    };

    try {
      const response = await axios.post("http://localhost:3001/api/quizzes", newQuiz);
      alert("Cuestionario creado con éxito");
      console.log("Respuesta de la API:", response.data);

      // Reiniciar el formulario
      setQuizTitle("");
      setDescription(""); // Reiniciar descripción
      setLevel("");
      setSubject("");
      setQuestions([]);
    } catch (error) {
      console.error("Error al crear el cuestionario:", error);
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
        <label className="block text-gray-700 font-medium mb-2">Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Escribe una descripción del cuestionario"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Nivel</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Selecciona el nivel</option>
          <option value="septimo">Séptimo Grado</option>
          <option value="octavo">Octavo Grado</option>
          <option value="noveno">Noveno Grado</option>
          <option value="primer_ano">Primer Año</option>
          <option value="segundo_ano">Segundo Año</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Materia</label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
        >
          <option value="" disabled>Selecciona la materia</option>
          <option value="fisica">Física</option>
          <option value="quimica">Química</option>
          <option value="biologia">Biología</option>
        </select>
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










