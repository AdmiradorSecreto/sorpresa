import './Home.css';
import { useNavigate } from 'react-router-dom';

/**
 * Componente de la página de inicio.
 * Muestra el título y un botón para comenzar el juego.
 */
const Home = () => {
  const navigate = useNavigate();

  // Función para redirigir a la página del juego
  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container fade-in">
      <h1 className="home-title">¡Bienvenida al Escape Room!</h1>
      <p className="home-subtitle">Una experiencia personalizada solo para ti</p>
      {/* Usamos la clase global 'button' para los estilos */}
      <button className="button" onClick={startGame}>
        Comenzar Escape Room
      </button>
    </div>
  );
};

export default Home;