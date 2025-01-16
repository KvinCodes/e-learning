import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fontsource/poppins/700.css';


const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'stretch',
  width: '100%',
  height: '80vh',
  margin: 0,
  padding: 0,
  flexwrap: 'wrap',
  backgroundColor: '#e0f4f8',
  boxSizing: 'border-box',
};

const cardStyle = (isHovered) => ({
  backgroundColor: '#fff',
  flex: 1,
  border: 'none',
  flex: '1 1 calc(33.333% - 10px)', // Tres columnas en pantallas grandes
  margin: 0, // Eliminamos espacio entre tarjetas
  boxShadow: isHovered ? '0px 6px 10px rgba(0, 0, 0, 0.2)' : '0px 4px 6px rgba(0, 0, 0, 0.1)',
  transform: isHovered ? 'translateY(-10px)' : 'none',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
  '@media (max-width: 960px)': {
    flex: 'none',
    height: '300px',
  },
  '@media (max-width: 600px)': {
    height: '200px',
    marginBottom: '10px',
  },
});

const imageStyle = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  top: 0,
  left: 0,
  backfaceVisibility: 'hidden',
};

const backStyle = {
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  backgroundColor: 'rgba(144, 238, 144, 0.5)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  color: 'white',
  fontSize: '60px',
  textAlign: 'center',
  zIndex: 2,
  fontFamily: '"Poppins", sans-serif', // Fuente Poppins
  fontWeight: 700, // Peso en negrita
  padding: '20px',
  cursor: 'pointer',
  '@media (max-width: 960px)': {
    fontSize: '40px',
  },
  '@media (max-width: 600px)': {
    fontSize: '30px',
    padding: '15px',
  },
};


export default function HoverCards() {
  const [hoveredCard, setHoveredCard] = React.useState(null);
  const navigate = useNavigate();

  const handleMouseOver = (cardId) => setHoveredCard(cardId);
  const handleMouseOut = () => setHoveredCard(null);

  const handleCardClick = (cardId) => {
    if (cardId === 'card1') navigate('/BNiveles');
    if (cardId === 'card2') navigate('/FNiveles');
    if (cardId === 'card3') navigate('/CNiveles');
  };

  const cards = [
    { id: 'card1', image: './img/bio.jpeg', alt: 'Biología', text: 'Biología' },
    { id: 'card2', image: './img/fisicados.jpeg', alt: 'Física', text: 'Física' },
    { id: 'card3', image: './img/chemistry.jpeg', alt: 'Química', text: 'Química' },
  ];

  return (
    <div style={cardContainerStyle}>
      {cards.map((card) => (
        <div
          key={card.id}
          style={cardStyle(hoveredCard === card.id)}
          onMouseOver={() => handleMouseOver(card.id)}
          onMouseOut={handleMouseOut}
          onClick={() => handleCardClick(card.id)} // Clic en cualquier parte de la tarjeta
        >
          <img
            src={card.image}
            alt={card.alt}
            style={imageStyle}
          />
          {hoveredCard === card.id && (
            <div style={backStyle}>
              <h3>{card.alt}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
