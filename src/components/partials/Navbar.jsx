import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLoginRedirect = () => {
        if (isAuthenticated && user?.id) {
            navigate(user.rol === "Administrador" ? `/reports` : `/profile/${user.id}`);
        } else {
            navigate("/signin");
        }
    };


    const handleLogout = () => {
        logout(); // Llama al método de logout del contexto
        navigate("/signin"); // Redirige al usuario después de cerrar sesión
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
                className={`lato-regular fixed top-0 left-0 w-full z-50 transition-transform duration-300`}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
                    {/* Logo */}
                    <div className="flex items-center space-x-4">
                        <img
                            src="./img/logoE.png"
                            alt="Logo"
                            className="h-10 w-auto"
                            onClick={() => navigate("/")}
                        />
                    </div>

                    {/* Menú en desktop */}
                    <div className="hidden lg:flex items-center space-x-6 ml-auto">
                        <a
                            href="/BNiveles"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Cuestionarios
                        </a>
                        <a
                            href="/about"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Sobre Nosotros
                        </a>
                        <a
                            href="/contact"
                            className="text-white hover:text-lime-300 transition duration-200 border-b-2 border-transparent hover:border-lime-300"
                        >
                            Contacto
                        </a>
                        <div className="flex items-center space-x-4">
                            {isAuthenticated ? (
                                <>
                                    <button
                                        className="flex items-center p-2 text-white hover:bg-green-800 rounded-full gap-2"
                                        onClick={handleLoginRedirect}
                                    >
                                        Mi perfil
                                        {user?.profilePicture && (
                                            <img
                                                src={user.profilePicture}
                                                alt="Avatar"
                                                className="h-8 w-8 rounded-full"
                                            />
                                        )}
                                    </button>
                                    <button
                                        className="text-white hover:text-lime-300 transition duration-200"
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </button>
                                </>
                            ) : (
                                <button
                                    className="text-white hover:text-lime-300 transition duration-200"
                                    onClick={handleLoginRedirect}
                                >
                                    Iniciar sesión
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
