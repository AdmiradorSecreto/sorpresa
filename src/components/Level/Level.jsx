import React from 'react';
import './Level.css';

/**
 * Componente para la pantalla de introducción de cada nivel.
 * Muestra el título del nivel y un botón para empezar.
 * @param {object} props - Los props del componente.
 * @param {string} props.title - El título del nivel actual.
 * @param {function} props.onStart - La función para iniciar el nivel.
 */
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