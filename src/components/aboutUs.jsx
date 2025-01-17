import React from 'react';

const AboutUs = () => {
  const videoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    objectFit: 'cover',
  };

  const overlayStyle = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'rgba(34, 139, 34, 0.6)', // Fondo semitransparente verde
    color: 'white',
    padding: '50px 20px',
    textAlign: 'center',
    maxWidth: '100%',
    borderRadius: '10px',
  };

  const sectionStyle = {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const paragraphStyle = {
    textAlign: 'justify', // Justificación de texto
  };

  return (
    <section style={sectionStyle}>
      {/* Video de fondo */}
      <video style={videoStyle} autoPlay muted loop>
        <source src="./img/header.mp4" type="video/mp4" />
      </video>

      {/* Contenido con superposición */}
      <div style={overlayStyle} className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-green-400 mb-8">
          Sobre Nosotros
        </h2>
        <p style={paragraphStyle} className="text-gray-300 text-lg mb-12 max-w-3xl mx-auto">
          Nuestra plataforma e-learning busca inspirar a estudiantes a explorar el fascinante mundo de la 
          ciencia, utilizando recursos innovadores y herramientas accesibles para su crecimiento académico.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tarjeta 1 */}
          <div className="bg-emerald-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Exploraci%C3%B3n+Espacial"
              alt="Exploración Espacial"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-100 mb-2">
                Nuestra Misión
              </h3>
              <p style={paragraphStyle} className="text-gray-100">
                Proporcionar herramientas y conocimientos que permitan a los estudiantes explorar el cosmos 
                y comprender los misterios del universo.
              </p>
            </div>
          </div>
          {/* Tarjeta 2 */}
          <div className="bg-emerald-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Innovaci%C3%B3n+Tecnol%C3%B3gica"
              alt="Innovación Tecnológica"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-100 mb-2">
                Nuestra Visión
              </h3>
              <p style={paragraphStyle} className="text-gray-100">
                Ser un puente entre el conocimiento científico y las futuras generaciones, 
                fomentando la innovación y el aprendizaje constante.
              </p>
            </div>
          </div>
          {/* Tarjeta 3 */}
          <div className="bg-emerald-800 shadow-lg rounded-lg overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Biolog%C3%ADa+en+Acci%C3%B3n"
              alt="Biología en Acción"
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-green-100 mb-2">
                Nuestros Valores
              </h3>
              <p style={paragraphStyle} className="text-gray-100">
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
