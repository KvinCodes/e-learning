import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);

    const navigate = useNavigate();

    // Manejo del scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [lastScrollY]);

    // Verificar si el usuario está autenticado
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("/api/auth/verify", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
                .then((response) => {
                    setIsLoggedIn(true);
                    setUserProfile(response.data.user);
                })
                .catch(() => {
                    setIsLoggedIn(false);
                    setUserProfile(null);
                });
        }
    }, []);

    const handleLoginRedirect = () => {
        if (isLoggedIn) {
            navigate("/profile");
        } else {
            navigate("/signin");
        }
    };

    return (
        <>
            <style>
                {`
                    .lato-regular {
                        font-family: "Lato", serif;
                        font-weight: 600;
                        font-style: normal;
                    }
                `}
            </style>

            <nav
                className={`lato-regular fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
                    isVisible ? "translate-y-0" : "-translate-y-full"
                }`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img
                            src="./img/logoE.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                    </div>

                    {/* Menú en desktop */}
                    <div className="hidden lg:flex items-center space-x-6 ml-auto">
                        <a
                            href="#"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Cuestionarios
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Sobre Nosotros
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Contacto
                        </a>
                        <div className="flex items-center space-x-4">
                            <button
                                className="flex items-center p-2 text-white hover:bg-green-800 rounded-full gap-2"
                                onClick={handleLoginRedirect}
                            >
                                {isLoggedIn ? (
                                    <>
                                        Mi perfil
                                        {userProfile && (
                                            <img
                                                src="https://via.placeholder.com/40"
                                                alt="Avatar"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        )}
                                    </>
                                ) : (
                                    "Iniciar sesión"
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Menú hamburguesa para móviles */}
                    <div className="lg:hidden flex items-center space-x-4">
                        <button
                            className="p-2 text-white hover:bg-green-800 rounded-full"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                        >
                            {isSearchOpen ? (
                                <i className="fas fa-times text-xl"></i>
                            ) : (
                                <i className="fas fa-search text-xl"></i>
                            )}
                        </button>
                        {isSearchOpen && (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 text-gray-100 bg-lime-100 sm:bg-transparent"
                                />
                            </div>
                        )}

                        <button
                            className="p-2 text-white hover:text-white hover:bg-green-800 rounded-full"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? (
                                <i className="fas fa-times text-xl"></i>
                            ) : (
                                <i className="fas fa-bars text-xl"></i>
                            )}
                        </button>
                    </div>
                </div>

                {/* Menú desplegable en móvil */}
                {isMenuOpen && (
                    <div className="lg:hidden color: bg-green-900">
                        <div className="flex flex-col items-start space-y-2 p-4">
                            <a
                                href="#"
                                className="text-white hover:text-white hover:bg-green-800 transition duration-200 w-full px-4 py-2 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Cuestionarios
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-white hover:bg-green-700 transition duration-200 w-full px-4 py-2 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sobre Nosotros
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-white hover:bg-green-700 transition duration-200 w-full px-4 py-2 rounded-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contacto
                            </a>
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
};

export default Navbar;
