import React from 'react';

const ContactUs = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center py-20">
            <header className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-800">Contactanos</h1>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                {/* Informacion tarjetas */}
                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                    <p className="text-gray-600 mt-2">support@example.com</p>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 text-center">
                    <h3 className="text-lg font-semibold text-gray-800">Contactanos</h3>
                    <p className="text-gray-600 mt-2">+2564-8932</p>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6 mt-10 w-full max-w-2xl">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Send Us a Message</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Write your message here..."
                            required
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
