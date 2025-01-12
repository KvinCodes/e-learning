import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed top-0 left-0 w-full z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
                {/* Logo */}
                <div className="flex items-center space-x-4">
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Logo"
                        className="h-10 w-10"
                    />
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                        E-Learning
                    </span>
                </div>

                {/* Barra de búsqueda */}
                <div
                    className={`flex items-center transition-all duration-300 ${
                        isSearchOpen ? "w-full max-w-lg" : "w-auto"
                    } flex-1 justify-end`}
                >
                    {isSearchOpen && (
                        <input
                            type="text"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="¿Qué estás buscando?"
                        />
                    )}
                    <button
                        className="p-2 text-green-600 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full ml-2"
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <i
                            className={`fas ${
                                isSearchOpen ? "fa-times" : "fa-search"
                            } text-xl`}
                        ></i>
                    </button>
                </div>

                {/* Menú */}
                <div className="hidden md:flex items-center space-x-8">
                    <Link
                        to="#"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200"
                    >
                        Mi aprendizaje
                    </Link>
                    <Link
                        to="/about"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200"
                    >
                        About Us
                    </Link>
                    <Link
                        to="/contact"
                        className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200"
                    >
                        Contáctanos
                    </Link>
                    {/* Perfil */}
                    <Link
                        to="/profile"
                        className="flex items-center p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full gap-2"
                    >
                        <span>Mi perfil</span>
                        <img
                            src="https://via.placeholder.com/40"
                            alt="Avatar"
                            className="h-10 w-10 rounded-full"
                        />
                    </Link>
                </div>

                {/* Menú hamburguesa */}
                <button
                    className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <i className="fas fa-bars text-xl"></i>
                </button>
            </div>

            {/* Menú desplegable en móvil */}
            {isMenuOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 shadow-md">
                    <div className="flex flex-col items-start space-y-2 p-4">
                        <Link
                            to="#"
                            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200 w-full"
                        >
                            Mi aprendizaje
                        </Link>
                        <Link
                            to="/about"
                            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200 w-full"
                        >
                            About Us
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-600 dark:text-gray-300 hover:text-green-600 transition duration-200 w-full"
                        >
                            Contáctanos
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
