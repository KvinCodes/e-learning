import { Routes, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Reports from "./ReportsPage";
import ProfileIndex from "./profileindex";
import UpdateProfile from "./updateProfile";
import AboutUs from "./aboutUs";
import ContactUs from "./ContactUS";
import QuizList from "./quizzList";
import QuizView from "./quizzview";
import CreateQuiz from "./createQuiz";
import React from "react";
import SelectDepartamentoMunicipio from "./SelectDepartamentoMunicipio";

const Router = () => {
    const [quizQuestions, setQuizQuestions] = React.useState([]);

    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile" element={<ProfileIndex />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/list" element={<QuizList />} />
            <Route path="/quizview" element={<QuizView />} />
            <Route path="/create" element={<CreateQuiz setQuizQuestions={setQuizQuestions} />} />
            <Route path="/profile" element={<ProfileIndex />} />
            <Route path="/update" element={<UpdateProfile />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/select" element={<SelectDepartamentoMunicipio />} />

        </Routes>
    );
};

export default Router;