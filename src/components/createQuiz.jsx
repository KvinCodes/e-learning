import React, { useState } from "react";
import axios from "axios";

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("");
  const [subject, setSubject] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentOptions, setCurrentOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [showLevelDropdown, setShowLevelDropdown] = useState(false);
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

  const levels = [
    { value: "septimo", label: "Séptimo Grado" },
    { value: "octavo", label: "Octavo Grado" },
    { value: "noveno", label: "Noveno Grado" },
    { value: "primer_ano", label: "Primer Año" },
    { value: "segundo_ano", label: "Segundo Año" },
  ];

  const subjects = [
    { value: "fisica", label: "Física" },
    { value: "quimica", label: "Química" },
    { value: "biologia", label: "Biología" },
  ];

  const handleSelect = (value, type) => {
    if (type === "level") {
      setLevel(value);
      setShowLevelDropdown(false);
    } else if (type === "subject") {
      setSubject(value);
      setShowSubjectDropdown(false);
    }
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

    const newQuiz = {
      theme: quizTitle,
      description,
      level,
      subject,
      questions,
    };

    try {
      const response = await axios.post("http://localhost:3001/api/quizzes", newQuiz);
      alert("Cuestionario creado con éxito");
      console.log("Respuesta de la API:", response.data);

      setQuizTitle("");
      setDescription("");
      setLevel("");
      setSubject("");
      setQuestions([]);
    } catch (error) {
      console.error("Error al crear el cuestionario:", error);
      alert("No se pudo crear el cuestionario.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Imagen de fondo */}
      <div
        className="absolute inset-0 h-[170vh]"
        style={{
          backgroundImage: "url('./img/fondo.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Superposición con transparencia */}
      <div className="absolute inset-0 h-[170vh] bg-green-500/50"></div>

      {/* Contenido principal */}
      <div
        className="relative max-w-3xl w-full bg-white p-4 rounded-lg shadow-lg mt-16"
        style={{ transform: "translateY(65px)" }}
      >
        <h1 className="text-2xl font-bold text-center mb-4" style={{ fontFamily: '"Lato", serif', fontWeight: 900, fontSize: '40px', color: '#052e16' }}>
          Crear Cuestionario
        </h1>

        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Título del Cuestionario</label>
          <input
            type="text"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            className="w-full p-2 border border-green-400 rounded-lg"
            placeholder="Escribe el título"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Descripción</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-green-400 rounded-lg"
            placeholder="Escribe una descripción del cuestionario"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Pregunta</label>
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="w-full p-2 border border-green-400 rounded-lg"
            placeholder="Escribe la pregunta"
          />
        </div>



        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Nivel</label>
          <div
            onClick={() => setShowLevelDropdown(!showLevelDropdown)}
            className="w-full p-2 border border-green-400 rounded-lg cursor-pointer bg-white"
          >
            {level ? levels.find((l) => l.value === level)?.label : "Selecciona el nivel"}
          </div>
          {showLevelDropdown && (
            <ul className="absolute w-full bg-white border border-green-400 rounded-lg mt-1 z-10">
              {levels.map((l) => (
                <li
                  key={l.value}
                  onClick={() => handleSelect(l.value, "level")}
                  className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                >
                  {l.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Materia</label>
          <div
            onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}
            className="w-full p-2 border border-green-400 rounded-lg cursor-pointer bg-white"
          >
            {subject ? subjects.find((s) => s.value === subject)?.label : "Selecciona la materia"}
          </div>
          {showSubjectDropdown && (
            <ul className="absolute w-full bg-white border border-green-400 rounded-lg mt-1 z-10">
              {subjects.map((s) => (
                <li
                  key={s.value}
                  onClick={() => handleSelect(s.value, "subject")}
                  className="p-2 hover:bg-green-600 hover:text-white cursor-pointer"
                >
                  {s.label}
                </li>
              ))}
            </ul>
          )}
        </div>



        <div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Pregunta</label>
          <input
            type="text"
            value={currentQuestion}
            onChange={(e) => setCurrentQuestion(e.target.value)}
            className="w-full p-2 border border-green-400 rounded-lg"
            placeholder="Escribe la pregunta"
          />
        </div>

        <div className="mb-4">
  {currentOptions.map((option, index) => (
    <div key={index} className="mb-2">
      <label className="block text-lime-700 font-medium mb-1">
        Opción {index + 1}
      </label>
      <input
        type="text"
        value={option}
        onChange={(e) => {
          const updatedOptions = [...currentOptions];
          updatedOptions[index] = e.target.value;
          setCurrentOptions(updatedOptions);
        }}
        className="w-full p-2 border border-green-400 rounded-lg"
        placeholder={`Escribe la opción ${index + 1}`}
      />
    </div>
  ))}
</div>

<div className="mb-4">
          <label className="block text-lime-700 font-medium mb-2">Respuesta Correcta</label>
          <select
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            className="w-full p-2 border border-green-400 rounded-lg"
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

        <div className="mt-4 flex items-center space-x-4">
  <button
    onClick={handleAddQuestion}
    className="bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-800"
  >
    Añadir Pregunta
  </button>
  <button
    onClick={handleSubmitQuiz}
    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-800"
  >
    Guardar Cuestionario
  </button>
</div>


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
    </div>
  );
};

export default CreateQuiz;










