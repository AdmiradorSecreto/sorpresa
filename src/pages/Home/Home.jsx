import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h1 className="home-title">¡Bienvenida al Escape Room!</h1>
      <p className="home-subtitle">Una experiencia personalizada solo para ti</p>
      <button className="start-button" onClick={startGame}>Comenzar Escape Room</button>
    </div>
  );
};

export default Home;
