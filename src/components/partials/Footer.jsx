import React from "react";


const Footer = () => {
    return (
        <>
            {/* Estilo en línea */}
            <style>
                {`
                    .lato-regular {
                        font-family: "Lato", serif;
                        font-weight: 600;
                        font-style: normal;
                    }
                `}
            </style>

            <footer className="lato-regular" style={{ backgroundColor: "#166534" }}>
                <div className="w-full max-w-screen-xl mx-auto px-4 py-4 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Logo y descripción */}
                        <div className="flex flex-col items-start max-w-xs">
                            <img
                                src="./img/logoE.png"
                                alt="Logo"
                                className="h-10 w-auto mb-4"
                            />
                        </div>

                        {/* Enlaces rápidos en una sola línea */}
                        <div className="flex flex-col items-center">
                            <ul className="flex space-x-4">
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-lime-300 transition duration-200"
                                    >
                                        Contáctanos
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="/about"
                                        className="text-gray-300 hover:text-lime-300 transition duration-200"
                                    >
                                        Sobre Nosotros
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-gray-300 hover:text-lime-300 transition duration-200"
                                    >
                                        Términos y Condiciones
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Línea divisoria */}
                    <hr className="my-4 border-gray-600" />

                    {/* Derechos reservados */}
                    <div className="flex justify-center">
                        <p className="text-gray-300 text-sm">
                            &copy; {new Date().getFullYear()} e-science. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
