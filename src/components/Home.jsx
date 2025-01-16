import React, { useState } from 'react';
import ColorTabs from './ColorTabs';
import Cards from './Card';

// Inyectamos dinámicamente estilos responsivos en el <head>
const responsiveStyles = `
  /* Ajuste del header para pantallas medianas y pequeñas */
  @media (max-width: 1024px) {
    .header-text h1 {
      font-size: 150px; /* Reducimos tamaño */
    }
  }
  
  @media (max-width: 768px) {
    .header-text h1 {
      font-size: 100px;
    }
    .find-out-text {
      font-size: 14px;
    }
    .icon-arrow {
      font-size: 28px;
    }
  }

  @media (max-width: 600px) {
    .header-container {
      height: 70vh; /* Ajustamos la altura */
    }
    .header-text h1 {
      font-size: 70px; /* Letra más pequeña en móviles */
    }
    .text-background {
      background-color: rgba(181, 230, 159, 0.2); /* Ajuste de transparencia */
    }
    .find-out-text {
      font-size: 12px;
    }
    .icon-arrow {
      font-size: 24px;
    }
  }

  @media (max-width: 400px) {
    .header-container {
      height: 60vh; 
    }
    .header-text h1 {
      font-size: 50px; 
    }
    .text-background {
      padding: 3px;
    }
  }
`;

// Insertamos el bloque de estilos en el head
document.head.insertAdjacentHTML('beforeend', `<style>${responsiveStyles}</style>`);

const Home = () => {
  // Definir el estado para el hover de cada tarjeta
  const [hoveredCard, setHoveredCard] = useState(null);

  // Función para manejar el mouse over
  const handleMouseOver = (cardId) => {
    setHoveredCard(cardId);
  };

  // Función para manejar el mouse out
  const handleMouseOut = () => {
    setHoveredCard(null);
  };

  // -- Estilos base (inline) --
  const headerStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    // Clase extra para sobrescribir en media queries
  };

  const headerVideoStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -2,
    objectFit: 'cover',
  };

  const headerTextStyle = {
    fontFamily: '"Lato", serif',
    fontWeight: 900,
    fontStyle: 'normal',
    fontSize: '200px',
    color: 'rgb(255, 255, 255)',
    textAlign: 'center',
    margin: 0, // para evitar saltos
  };

  const textBackgroundStyle = {
    display: 'inline-block',
    backgroundColor: 'rgba(181, 230, 159, 0.3)',
    padding: '5px',
    borderRadius: '15px',
  };

  const findOutContainerStyle = {
    position: 'absolute',
    bottom: '20px',
    textAlign: 'center',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const findOutStyle = {
    fontSize: '16px',
    color: 'white',
    fontFamily: "'Lato', serif",
    fontWeight: '700',
    fontStyle: 'normal',
    marginBottom: '5px',
  };

  const iconStyle = {
    fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
    color: 'white',
    fontSize: '32px',
  };

  return (
    <div>
      {/* Header */}
      <header style={headerStyle} className="header-container">
        {/* Video de fondo */}
        <video style={headerVideoStyle} autoPlay muted loop>
          <source src="./img/header.mp4" type="video/mp4" />
        </video>

        {/* Fondo semitransparente detrás del texto */}
        <div style={textBackgroundStyle} className="text-background">
          <div style={headerTextStyle} className="header-text">
            <h1>e-science</h1>
          </div>
        </div>

        {/* Contenedor para el texto "Descubre nuestros cuestionarios" y flecha */}
        <div style={findOutContainerStyle}>
          <div style={findOutStyle} className="find-out-text">
            Descubre nuestros cuestionarios
          </div>
          <span className="material-symbols-outlined icon-arrow" style={iconStyle}>
            arrow_drop_down
          </span>
        </div>
      </header>

      {/* Instrucciones (Tabs) */}
      <section>
        <ColorTabs />
      </section>

      {/* Cards Section */}
      <div>
        <Cards
          hoveredCard={hoveredCard}     // Pasa el estado de la tarjeta que está en hover
          onMouseOver={handleMouseOver} // Maneja el hover
          onMouseOut={handleMouseOut}   // Maneja el mouse out
        />
      </div>
    </div>
  );
};

export default Home;






