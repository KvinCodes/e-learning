import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-green-50 min-h-screen flex flex-col items-center py-20">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-green-800">Contáctanos</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Informacion tarjetas */}
                <div className="bg-green-100 shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800">Email</h3>
                    <p className="text-green-700 mt-2">support@example.com</p>
                </div>

                <div className="bg-green-100 shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-green-800">Teléfono</h3>
                    <p className="text-green-700 mt-2">+2564-8932</p>
                </div>
            </div>

            <div className="bg-green-100 shadow-lg rounded-lg p-6 mt-10 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-green-800 mb-4">Envíanos un Mensaje</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-green-700">Tu Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full border border-green-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Ingresa tu nombre"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-green-700">Tu Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full border border-green-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Ingresa tu email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-green-700">Tu Mensaje</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            className="mt-1 block w-full border border-green-300 rounded-md shadow-sm p-2 focus:ring-green-500 focus:border-green-500"
                            placeholder="Escribe tu mensaje aquí..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                        Enviar
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;

