import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Reports from "./ReportsPage";
import StudentProfile from "./StudentProfile";
import UpdateProfile from "./StudentProfileEdit";
import AboutUs from "./aboutUs";
import ContactUs from "./ContactUS";
import QuizView from "./quizzview";
import CreateQuiz from "./createQuiz";
import React from "react";
import Home from "./Home";
import FNiveles from "./FNiveles";
import BNiveles from "./BNiveles";
import CNiveles from "./CNiveles";
import DisplayQuizUI from "./QuizDetail";
import SelectDepartamentoMunicipio from "./SelectDepartamentoMunicipio";
import ProtectedRoute from "./ProtectedRoute"; // Importar el componente ProtectedRoute

const Router = () => {
    const [quizQuestions, setQuizQuestions] = React.useState([]);

    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile/:id" element={<StudentProfile />} />
            {/* Rutas protegidas */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            {/* <Route
                path="/reports"
                element={
                    <ProtectedRoute allowedRoles={["administrador"]}>
                        <Reports />
                    </ProtectedRoute>
                }
            /> */}
            {/* <Route
                path="/profile/:id"
                element={
                    <ProtectedRoute allowedRoles={["estudiante"]}>
                        <StudentProfile />
                    </ProtectedRoute>
                }
            /> */}
            <Route
                path="/update"
                element={
                    <ProtectedRoute allowedRoles={["estudiante"]}>
                        <UpdateProfile />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/create"
                element={
                    <ProtectedRoute allowedRoles={["administrador"]}>
                        <CreateQuiz setQuizQuestions={setQuizQuestions} />
                    </ProtectedRoute>
                }
            />
            {/* Rutas adicionales */}
            <Route path="/quizview" element={<QuizView />} />
            <Route path="/BNiveles" element={<BNiveles />} />
            <Route path="/FNiveles" element={<FNiveles />} />
            <Route path="/CNiveles" element={<CNiveles />} />
            <Route path="/quiz/:id" element={<DisplayQuizUI />} />
            <Route path="/select" element={<SelectDepartamentoMunicipio />} />
        </Routes>
    );
};

export default Router;