import React from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Router from './components/router';
import Navbar from './components/partials/Navbar';
import Footer from './components/partials/Footer';
import { UserProvider } from './context/UserContext'; // Importa el UserProvider
import './App.css';
import './index.css';

function App() {
  // Componente que controla la visibilidad del Navbar y Footer
  const Layout = () => {
    const location = useLocation();

    // Rutas donde no quieres mostrar el Navbar y Footer
    const noLayoutRoutes = ["/signin", "/signup"];
    const hideLayout = noLayoutRoutes.includes(location.pathname);

    return (
      <>
        {!hideLayout && <Navbar />}
        <Router />
        {!hideLayout && <Footer />}
      </>
    );
  };

  return (
    <div>
      <BrowserRouter>
        {/* Envolvemos toda la aplicación dentro del UserProvider */}
        <UserProvider>
          <Layout />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
