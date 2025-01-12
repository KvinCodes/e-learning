import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl font-extrabold text-green-600 dark:text-green-400 mb-8">
          Sobre Nosotros
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          Nuestra plataforma e-learning busca inspirar a estudiantes a explorar el fascinante mundo de la 
          ciencia, utilizando recursos innovadores y herramientas accesibles para su crecimiento académico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-green-50 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Exploración+Espacial"
              alt="Exploración Espacial"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                Nuestra Misión
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proporcionar herramientas y conocimientos que permitan a los estudiantes explorar el cosmos 
                y comprender los misterios del universo.
              </p>
            </div>
          </div>
          {/* Tarjeta 2 */}
          <div className="bg-green-50 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Innovación+Tecnológica"
              alt="Innovación Tecnológica"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                Nuestra Visión
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ser un puente entre el conocimiento científico y las futuras generaciones, 
                fomentando la innovación y el aprendizaje constante.
              </p>
            </div>
          </div>
          {/* Tarjeta 3 */}
          <div className="bg-green-50 dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Biología+en+Acción"
              alt="Biología en Acción"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">
                Nuestros Valores
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Promovemos la curiosidad, la inclusión y el desarrollo de habilidades críticas 
                para el mundo de la ciencia y la tecnología.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
