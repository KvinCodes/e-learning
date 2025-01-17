import React, { useContext } from "react"; // Importación corregida
import { Navigate } from "react-router-dom"; // Para redirigir a otras rutas
import { UserContext } from "../context/UserContext"; // Contexto de autenticación

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useContext(UserContext); // Acceso al contexto

  if (loading) {
    return <div className="text-center">Verificando autenticación...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" />; // Redirige si no está autenticado
  }

  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" />; // Redirige si el rol no está permitido
  }

  return children; // Renderiza el contenido protegido
};

export default ProtectedRoute;
