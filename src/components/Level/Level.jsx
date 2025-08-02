import './Level.css';

const Level = ({ title, onStart }) => {
  return (
    <div className="level-intro-container fade-in">
      <h2 className="level-intro-title">{title}</h2>
      <p className="level-intro-subtitle">
        ¡Prepárate para el desafío!
      </p>
      <button className="button" onClick={onStart}>
        Comenzar Nivel
      </button>
    </div>
  );
};

export default Level;
