import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Datos del usuario
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true); // Estado de carga

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_URL}/auth/verify`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    setUser(response.data.user); // Incluye el perfil completo
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setUser(null);
                    setIsAuthenticated(false);
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, []);


    const login = (token, userData) => {
        localStorage.setItem("token", token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <UserContext.Provider
            value={{ user, isAuthenticated, loading, login, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};
