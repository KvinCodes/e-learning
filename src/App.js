import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../src/components/SignIn";
import SignUp from "../src/components/SignUp";
import Reports from "../src/components/ReportsPage";
import './App.css';
import './index.css';


function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      
    </Router>
  );
}

export default App;
